import { gameState, splitImages } from "./index.ts";
import { loadShuffleImages, resetGameEle, resetGameState } from "./utility.ts";

const gamePart1Ele = document.querySelector<HTMLDivElement>('.game-container__part1')!


export function dragNDrop(e:MouseEvent)
{
    console.log(e)
    e.preventDefault()
    const target = e.target as Element
    if(!target)
        return;

    const imageEle = target.closest('img')
    if(!imageEle)
        return;

    let shiftX = e.clientX - imageEle.getBoundingClientRect().left;
    let shiftY = e.clientY - imageEle.getBoundingClientRect().top;

    // make an absolute
    imageEle.style.position = 'absolute';
    imageEle.style.zIndex = "1000";

    function onMoveAt(pageX:number,pageY:number)
    {
        if(imageEle)
        {
            imageEle.style.left = pageX - shiftX  + 'px';
            imageEle.style.top = pageY - shiftY  + 'px';
        }
    }

    function onMouseMove(e:MouseEvent)
    {
        onMoveAt(e.pageX,e.pageY)
    }

    // attach a mousemove listener
    gamePart1Ele.addEventListener('mousemove',onMouseMove)

    //Listener for drop the Image
    function onMouseUp(e:MouseEvent)
    {
        //remove the mouse move listener
        gamePart1Ele.removeEventListener('mousemove',onMouseMove)
        
        if(imageEle)
        {
            imageEle.removeEventListener('mouseup',onMouseUp)
            imageEle.hidden = true
            const eleBelow = document.elementFromPoint(e.clientX,e.clientY)
            imageEle.hidden = false;

            if(!eleBelow)            
                return;

            const droppableEle = eleBelow.closest<HTMLElement>('.droppable')
            if(!droppableEle)
            {
                imageEle.style.position = 'static';
            }
            else
            {
                droppableEle.append(imageEle)
                imageEle.style.position = ''
                droppableEle.classList.remove('droppable')
                
                //drop successfully
                //update the game state
                const index = Number(droppableEle.dataset.index)
                const imageURL = imageEle.getAttribute('src')

                if(index != undefined && imageURL != undefined)
                {
                    gameState[index] = imageURL
                    console.log(gameState)
                }
            }
        }
    }

    imageEle.addEventListener('mouseup',onMouseUp)
}   

export function handleSubmit(e:PointerEvent)
{
    for(let index=0;index<gameState.length;index++)
    {
        const state = gameState[index];
        if(state == "" || state == undefined)
        {
            alert("Please Fill all the boxes first")
            return;
        }

        
        const imageIndex = Number(state.split('_').at(-1)?.[0])
        
        console.log(imageIndex)
        if(index !== imageIndex)
        {
            alert("Wrong try again")
            //need to reset the game
            return;
        }
    }
    return; 
}

export function handleReset(e:PointerEvent)
{
    // reset the gameimages
    resetGameEle()

    // reset the game State
    resetGameState()

    // load the shuffle images
    loadShuffleImages(splitImages)

    console.log(gameState)
}