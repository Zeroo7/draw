const canvasContainer = document.getElementById('canvas-container')
const start = document.getElementById('start')
const exit = document.getElementById('close')
const main = document.getElementById('main-page')
const width = document.getElementById('line-width')
const color = document.getElementById('color')
const eraser = document.getElementById('eraser')
const pen = document.getElementById('pen')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
let drawing;
let erase;

start.addEventListener('click', () => {
    canvasContainer.classList.replace('hidden', 'show-canvas')
    main.classList.add('hidden')
})

exit.addEventListener('click', () => {
    main.classList.replace('hidden', 'show-content')
    canvasContainer.classList.add('hidden')
})

const size = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
size()
window.addEventListener('resize', ()=> {if (!is_touch()) size()})

const draw = (e) => {
    e.preventDefault()
    if (drawing && !erase) {
        context.lineWidth = width.value
        context.lineCap = 'round'
        context.lineJoin = 'round'
        drawLine(e)
        context.stroke()
        context.beginPath()
        drawLine(e)
        context.strokeStyle = color.value
    } else if (drawing && erase) {
        // context.clearRect(e.clientX, e.clientY, width.value, width.value)
        context.lineWidth = width.value
        context.lineCap = 'round'
        drawLine(e)
        context.stroke()
        context.beginPath()
        drawLine(e)
        context.strokeStyle = 'white'
    }
}

canvas.addEventListener('mousedown', (e) => {
    drawing = true
    draw(e)
})
canvas.addEventListener('mouseup', () => {
    drawing = false
    context.beginPath()
})
canvas.addEventListener('mousemove', draw)

canvas.addEventListener('touchstart', (e) => {
    drawing = true
    draw(e)
})
canvas.addEventListener('touchend', () => {
    drawing = false
    context.beginPath()
})
canvas.addEventListener('touchmove', draw)

eraser.addEventListener('click', () => erase = true)
pen.addEventListener('click', () => erase = false)

const is_touch = () => {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

const drawLine = (e)=> {
    if (is_touch()) { 
        context.lineTo(e.touches[0].clientX, e.touches[0].clientY)
    } else {
        context.lineTo(e.clientX, e.clientY)
    }
}
