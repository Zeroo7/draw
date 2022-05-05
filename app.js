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
window.addEventListener('resize', size)

const draw = (e) => {
    if (drawing && !erase) {
        context.lineWidth = width.value
        context.lineCap = 'round'
        context.lineTo(e.clientX, e.clientY)
        context.stroke()
        context.beginPath()
        context.lineTo(e.clientX, e.clientY)
        context.strokeStyle = color.value
    } else if (drawing && erase) {
        // context.clearRect(e.clientX, e.clientY, width.value, width.value)
        context.lineWidth = width.value
        context.lineCap = 'round'
        context.lineTo(e.clientX, e.clientY)
        context.stroke()
        context.beginPath()
        context.lineTo(e.clientX, e.clientY)
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