// When Load the HTML

import { splitImages } from "./index.ts"
import { shuffle } from "./utility.ts"

document.addEventListener('DOMContentLoaded',()=>{
    // insert the shuffle images
    const shuffleImages = shuffle(splitImages)
    console.log(shuffleImages)
})