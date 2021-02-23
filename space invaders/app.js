document.addEventListener('DOMContentLoaded' , () => {
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let invadersDown = []
    let result = 0
    let direction = 1
    let invaderId

    //defining where the invaders will be
    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9, 
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]
    
    //creating the invader characters
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))

    //creating the shooter character
    squares[currentShooterIndex].classList.add('shooter')

    //moving the shooter along the bottom row
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.keyCode) {
            case 37:
                if(currentShooterIndex % width !== 0) currentShooterIndex -=1
                break
            case 39:
                if(currentShooterIndex % width < width - 0) currentShooterIndex +=1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }

    document.addEventListener('keydown', moveShooter)

    //movement for the invaders
    function moveInvaders(){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width
        } else if (direction === width) {
            if(leftEdge) direction = 1
            else direction = -1
        }
    for (let i = 0; i <= alienInvaders.length -1; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
    for (let i = 0; i <= alienInvaders.length -1; i++) {
        alienInvaders[i] += direction  
    }
    for (let i = 0; i <= alienInvaders.length -1; i++) {
        if (!invadersDown.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')
        }
    }

    //creating the end of the game

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.textContent = 'Game Over'
        squares[currentShooterIndex].classList.add('boom')
        clearInterval(invaderId)
    }

    for(let i = 0; i <= alienInvaders.length -1; i++) {
        if(alienInvaders[i] > (squares.length - (width - 1))) {
            resultDisplay.textContent = 'Game Over'
            clearInterval(invaderId)
        }
    }

    //determine if the user won
    if(invadersDown.length === alienInvaders.length){
        resultDisplay.textContent = 'You have taken down all the invaders, Congrats!'
        clearInterval(invaderId)
    }
}
    invaderId = setInterval(moveInvaders, 500)

    //shooting animation
    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex
        //movement from leaving the shooter to the invader
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                clearInterval(laserId)

                //creating array to keep track of the aliens destroyed
                const aliensTakenDown = alienInvaders.indexOf(currentLaserIndex)
                invadersDown.push(aliensTakenDown)
                result++
                resultDisplay.textContent = result
            }

            if(currentLaserIndex < width) {
                clearInterval(laserId)
                setTimeout(() =>  squares[currentLaserIndex].classList.remove('laser'), 100)
            }
        }
        switch(e.keyCode) {
            case 32:
                laserId = setInterval(moveLaser,300)
                break
        }
    } 
document.addEventListener('keyup', shoot)
})
