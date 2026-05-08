// When Load the HTML

import { dragNDrop, handleReset, handleSubmit } from "./features.ts"
import { splitImages } from "./index.ts"
import { loadShuffleImages } from "./utility.ts"

const imageSelectionEle = document.querySelector<HTMLDivElement>('.image-selection')

const submitBtnEle = document.querySelector<HTMLButtonElement>('.submit-btn')

const resetBtnEle = document.querySelector<HTMLButtonElement>('.reset-btn')

document.addEventListener('DOMContentLoaded',()=>{
    // insert the shuffle images
    loadShuffleImages(splitImages)
})

if(imageSelectionEle instanceof HTMLDivElement)
{
    imageSelectionEle.addEventListener('mousedown',dragNDrop)
}
else{
    console.log("vbjkg")
}

if(submitBtnEle instanceof HTMLButtonElement)
{
    submitBtnEle.addEventListener('click',handleSubmit)
}


if(resetBtnEle instanceof HTMLButtonElement)
{
    resetBtnEle.addEventListener('click',handleReset)
}

