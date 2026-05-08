// When Load the HTML

import { dragNDrop } from "./features.ts"
import { splitImages } from "./index.ts"
import { loadShuffleImages } from "./utility.ts"

const imageSelectionEle = document.querySelector<HTMLDivElement>('.image-selection')!


document.addEventListener('DOMContentLoaded',()=>{
    // insert the shuffle images
    loadShuffleImages(splitImages)
})

imageSelectionEle.addEventListener('mousedown',dragNDrop)