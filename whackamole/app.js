const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent

//making the mole appear in a random square
function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

//setting the hitPosition equal to the randomPosition id so it can register when it is hit/clicked
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
      if(id.id === hitPosition){
        result = result + 1
        score.textContent = result
        hitPosition = null
        }
    })
})


function moveMole(){
    let timerId = null
    timerId = setInterval(randomSquare, 800)
}

moveMole()

function countDown(){
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0) {
        clearInterval(timerId)
        alert('Game Over! Your final score is...' + result + '!')
    }
}

let timerId = setInterval(countDown, 1000)
