// When Load the HTML

import { dragNDrop, handleCrop, handleReset, handleSubmit, handleTimer, handleUploadImage } from "./features.ts"
import { splitImages } from "./index.ts"
import { createPreviewImage, loadShuffleImages } from "./utility.ts"

const imageSelectionEle = document.querySelector<HTMLDivElement>('.image-selection')

const submitBtnEle = document.querySelector<HTMLButtonElement>('.submit-btn')

const resetBtnEle = document.querySelector<HTMLButtonElement>('.reset-btn')

const uploadImageEle = document.querySelector<HTMLButtonElement>('#upload-image');

export let timerId:number|null = null

document.addEventListener('DOMContentLoaded',()=>{

    // create an preview image
    createPreviewImage('./images/original_image.jpg')

    // crop images
    handleCrop()

    // insert the shuffle images
    loadShuffleImages(splitImages)
    
    // start timer
    timerId = setInterval(handleTimer,1000)
})

if(imageSelectionEle instanceof HTMLDivElement)
{
    imageSelectionEle.addEventListener('mousedown',dragNDrop)
}


if(submitBtnEle instanceof HTMLButtonElement)
{
    submitBtnEle.addEventListener('click',handleSubmit)
}


if(resetBtnEle instanceof HTMLButtonElement)
{
    resetBtnEle.addEventListener('click',handleReset)
}


if(uploadImageEle instanceof HTMLButtonElement)
{
    uploadImageEle.addEventListener('click',handleUploadImage)
}