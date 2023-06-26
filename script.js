const sketchPad = document.querySelector('.sketch-pad');
const sketchPadSize = 640;
let radios = document.querySelectorAll('.resolution');
let brushColor = document.querySelector('#brush-colorpicker');
let padColor = document.querySelector('#pad-colorpicker');
sketchPad.style.backgroundColor = padColor.value;
let basicResolution = document.querySelector('button[id="1"]').value;
console.log(basicResolution);
const pixel = document.createElement('div');
pixel.classList.add('pixel');
let clearButton = document.querySelector('.clear-button');
let shadingButton = document.querySelector('.shading-button');
let flag;
let pixels;

function paint(pixel, color){
    window.onmouseup = () => { flag = false; }
    pixel.onmouseover = () => { if(flag) pixel.style.backgroundColor = color }
    pixel.onmousedown = () => { pixel.style.backgroundColor = color; flag = true; }
}

function shading(pixel, count = 1){
    window.onmouseup = () => { flag = false; }
    pixel.onmouseover = () => { if(flag) count -= 0.1; pixel.style.filter = `brightness(${count})`; }
    pixel.onmousedown = () => { count -= 0.1; pixel.style.filter = `brightness(${count})`; flag = true; }
}

function renderPad(resolution){
    pixel.style.width = `${sketchPadSize/resolution}px`;
    pixel.style.height = `${sketchPadSize/resolution}px`;
    let color = brushColor.value;

    for(i = 0; i < resolution**2; i++){
        sketchPad.appendChild(pixel.cloneNode(true))
    };
    
    pixels = document.querySelectorAll('.pixel')
    pixels.forEach(pixel => {
        paint(pixel, color);
        pixel.style.backgroundColor = padColor.value;
    });

}

function deletePad(){
    pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.remove();        
    });
}

renderPad(basicResolution);

radios.forEach(radio => {
    radio.addEventListener('click', (e) => {
        deletePad();
        renderPad(parseInt(e.target.value));
    });
});

brushColor.addEventListener('change', (e) => {
    pixels = document.querySelectorAll('.pixel')
    pixels.forEach(pixel => {
        paint(pixel, e.target.value)
    });
})

clearButton.addEventListener('click', (e) =>{
    deletePad();
    renderPad(basicResolution);
})

padColor.addEventListener('change', (e) => {
    sketchPad.style.backgroundColor = e.target.value;
    pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = e.target.value;
    });
});

shadingButton.addEventListener('click', () =>{
    if(!(shadingButton.classList.contains('active'))){
        shadingButton.classList.add('active')
        pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            shading(pixel);
        }); 
    }else{
        shadingButton.classList.remove('active');
        pixels.forEach(pixel =>{
            pixels.forEach(pixel => {
                paint(pixel, brushColor.value);
            });
        })
    }
})