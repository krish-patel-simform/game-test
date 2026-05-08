import { timerId } from "./events.ts";
import { gameState, splitImages, timeOut } from "./index.ts";
import {
    createPreviewImage,
    loadShuffleImages,
    resetGameEle,
    resetGameState,
} from "./utility.ts";

const fileInput = document.querySelector<HTMLInputElement>("#file-upload");

const gamePart1Ele = document.querySelector<HTMLDivElement>(
    ".game-container__part1",
)!;

const previewImageEle = document.querySelector<HTMLDivElement>('.preview-image')

const timerEle = document.querySelector<HTMLSpanElement>(".header__timer");

export function dragNDrop(e: MouseEvent) {
    console.log(e);
    e.preventDefault();
    const target = e.target as Element;
    if (!target) return;

    const imageEle = target.closest("img");
    if (!imageEle) return;

    let shiftX = e.clientX - imageEle.getBoundingClientRect().left;
    let shiftY = e.clientY - imageEle.getBoundingClientRect().top;

    // make an absolute
    imageEle.style.position = "absolute";
    imageEle.style.zIndex = "1000";

    function onMoveAt(pageX: number, pageY: number) {
        if (imageEle) {
            imageEle.style.left = pageX - shiftX + "px";
            imageEle.style.top = pageY - shiftY + "px";
        }
    }

    function onMouseMove(e: MouseEvent) {
        onMoveAt(e.pageX, e.pageY);
    }

    // attach a mousemove listener
    gamePart1Ele.addEventListener("mousemove", onMouseMove);

    //Listener for drop the Image
    function onMouseUp(e: MouseEvent) {
        //remove the mouse move listener
        gamePart1Ele.removeEventListener("mousemove", onMouseMove);

        if (imageEle) {
            imageEle.removeEventListener("mouseup", onMouseUp);
            imageEle.hidden = true;
            const eleBelow = document.elementFromPoint(e.clientX, e.clientY);
            imageEle.hidden = false;

            if (!eleBelow) return;

            const droppableEle = eleBelow.closest<HTMLElement>(".droppable");
            if (!droppableEle) {
                imageEle.style.position = "static";
            } else {
                droppableEle.append(imageEle);
                imageEle.style.position = "";
                droppableEle.classList.remove("droppable");

                //drop successfully
                //update the game state
                const index = Number(droppableEle.dataset.index);
                const imageURL = imageEle.getAttribute("src");

                if (index != undefined && imageURL != undefined) {
                    gameState[index] = imageURL;
                    console.log(gameState);
                }
            }
        }
    }

    imageEle.addEventListener("mouseup", onMouseUp);
}

export function handleSubmit(e: PointerEvent) {
    for (let index = 0; index < gameState.length; index++) {
        const state = gameState[index];
        if (state == "" || state == undefined) {
            alert("Please Fill all the boxes first");
            return;
        }

        const imageIndex = Number(state.split("_").at(-1)?.[0]);

        console.log(imageIndex);
        if (index !== imageIndex) {
            alert("Wrong try again");
            //need to reset the game
            return;
        }
    }
    alert("Successfully completed game");
    handleReset();
    return;
}

export function handleReset() {
    //reset Timeout
    if (timerEle instanceof HTMLSpanElement) {
        timerEle.textContent = timeOut;
    }

    // reset the gameimages
    resetGameEle();

    // reset the game State
    resetGameState();

    // load the shuffle images
    loadShuffleImages(splitImages);

    console.log(gameState);
}

export function handleTimer() {
    // reduce the time
    if (timerEle instanceof HTMLSpanElement) {
        let strTime: string | string[] = timerEle.textContent;
        if (strTime) {
            strTime = strTime.split(":");
            let minutes = Number(strTime[0]);
            let seconds = Number(strTime[1]);

            // * base case
            if (minutes == 0 && seconds == 0) {
                // call end game
                if (timerId) {
                    clearInterval(timerId);
                    timerEle.textContent = timeOut;
                    handleReset();
                    // timerId = setInterval(handleTimer,1000)
                }
            } else if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }

            // render the on screen
            timerEle.textContent = `${minutes}:${seconds}`;
        }
    }
}

export function handleUploadImage() {
    if (fileInput instanceof HTMLInputElement) {
        console.log(fileInput.files);
        // const [file:File] = fileInput.files;
        const files = fileInput.files
        if(files && files[0])
        {
            const file:File = files[0]
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const target = e.target;
                if (target) {
                    const base64 = target.result?.toString();
                    if (base64) {
                        base64ToFile(base64, "image/jpeg", file.name);
                        console.log(target.result);
                    }
                }
            };
    
            reader.onerror = (err) => {
                console.error("Error reading file:", err);
                alert("An error occurred while reading the file.");
            };
    
            reader.readAsDataURL(file);
        }
    }
}

function base64ToFile(
    base64String: string,
    mimeType: string,
    fileName: string,
) {
    // Remove data URL scheme if present
    const base64Data = base64String.replace(/^data:.+;base64,/, "");
    const byteCharacters = atob(base64Data); // Decode Base64 string
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);

    //create an URL
    createPreviewImage(url);

    // Create a link element to download the file
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = fileName;
    // link.click();

    // // Cleanup
    // URL.revokeObjectURL(url);
}

export function handleCrop() {

    if (previewImageEle instanceof HTMLDivElement) {
        const source = previewImageEle.nextElementSibling
        let cx = 0;
        let cy = 0;
        if (source instanceof HTMLImageElement) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // create an canvas
                    const canvas = document.createElement("canvas");
                    //create context
                    const context = canvas.getContext("2d");
                    cx = cx * j;
                    cy = cy * i;
                    context?.drawImage(source, cx, cy, 300, 300, 0, 0, 300, 300);
    
                    canvas.dataset.index = ((i * 3) + j).toString()
    
                    // insert the canvas to 
                }
            }
        }
        else{
            console.log("handle Crop error ")
        }
    }
}
