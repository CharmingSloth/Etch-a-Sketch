const sketchPad = document.querySelector('.sketch-pad');
const pixel = document.createElement('div');
pixel.classList.add('pixel');
let flag = false;



function paintBlack(pixel){
    window.onmouseup = () => { flag = false; }
    pixel.onmouseover = () => { if(flag) pixel.classList.add('black'); }
    pixel.onmousedown = () => { pixel.classList.add('black'); flag = true; }
}



for(i = 0; i < 160*160; i++){
    sketchPad.appendChild(pixel.cloneNode(1));
}
const pixels = document.querySelectorAll('.pixel')



pixels.forEach(pixel => {
    paintBlack(pixel);                  
});