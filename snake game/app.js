document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let fruitIndex = 0
    let currentSnake = [2,1,0] //creating the head, body and tail of the snake

    let direction = 3
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //starting the game and reseting positions
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[fruitIndex].classList.remove('fruit')
        clearInterval(interval)
        score = 0
        //reseting the position of the fruit
        randomFruit()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }
 
    function moveOutcomes(){
        if( //setting the boundries of the snakes movement
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === width -1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains('snake')//if snake runs into itself
        ){
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)
        
        //if the snake gets the fruit
        if(squares[currentSnake[0]].classList.contains('fruit')){
            
            squares[currentSnake[0]].classList.remove('fruit') 
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            //create new fruit and add to the score
            randomFruit()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    //generating a random fruit position

    function randomFruit() {
        do {
            fruitIndex = Math.floor(Math.random() * squares.length)  
        } while(squares[fruitIndex].classList.contains('snake'))
        squares[fruitIndex].classList.add('fruit')
    }

    //assigning controls 
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            direction = 1  //move right
        } else if(e.keyCode === 38){
            direction = -width //move up
        } else if(e.keyCode === 37) {
            direction = - 1  //move left
        } else if(e.keyCode === 40){
            direction = +width //move down
        }
    }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)

})


  
