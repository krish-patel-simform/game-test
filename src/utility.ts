const imageSelectionEle = document.querySelector<HTMLDivElement>('.image-selection')!

function shuffle(arr:string[])
{
    for(let i=arr.length-1;i>0;i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        //Swap
        if(arr[1] && arr[j])
        {
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp!  
        }
    }
    return arr
}

export function loadShuffleImages(splitImages:string[])
{
    const shuffleImages = shuffle(splitImages)
    // console.log(shuffleImages)
    
    // now put these into selection part
    const children  = imageSelectionEle.children
    // console.log(children[0]?.getBoundingClientRect())
    for(let i=0;i<children.length;i++)
    {        
        const child = children[i]
        if(child)
        {
            const divHeight = child.getBoundingClientRect().height;
            const divWidth= child.getBoundingClientRect().width
            // console.log(i,divHeight)
            const img = document.createElement('img')
            img.src = `./images/${shuffleImages[i]!}`;
            img.alt = `Part_${i}`
            img.style.aspectRatio = `1/1`;
            img.style.width = `${divWidth}px`;

            child.append(img)
        }
    }
}