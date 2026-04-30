const board = document.querySelector('.board')
const blockHeight = 30
const blockWidth = 30
const modal = document.querySelector('.modal');
const startButton = document.querySelector('.btn-start')
const startGameModal = document.querySelector('.start-game')
const gameOverModal = document.querySelector('.game-over')
const restartButton = document.querySelector('.btn-restart')

const highScoreElem = document.querySelector('#high-score')
const scoreElem = document.querySelector('#score')
const timeElem = document.querySelector("#time")

let highScore = localStorage.getItem('highScore') || 0;
highScoreElem.innerText = highScore


let score = 0
let time = `00-00`

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
let food = { x: Math.floor(Math.random () * rows), y: Math.floor(Math.random () * cols) }

const blocks = []
let snake = [ {x : 1, y: 3},]
let direction = 'down'

let intervalId = null;
let timerIntervalId = null;

for (let row = 0; row < rows ; row++){
     for(let col = 0; col < cols; col ++){
        const block = document.createElement('div');
        block.classList.add('block')
        board.appendChild(block);
        blocks[`${row}-${col}`] = block
     }
} 

function render(){
   let head = null

   blocks[`${food.x}-${food.y}`].classList.add('food') 
   

   if (direction === 'left'){
      head = {x:snake[0].x, y: snake[0].y - 1 }
   }
   else if(direction === "right"){
      head = {x:snake[0].x, y:snake[0].y + 1}
   }
   else if(direction === "down"){
      head = {x:snake[0].x + 1, y:snake[0].y}
   }
   else if(direction === "up"){
      head = {x:snake[0].x -1 , y:snake[0].y }
   }

   if(head.x <0 || head.x >= rows || head.y <0 || head.y >= cols ){
      clearInterval(intervalId)
      modal.style.display = 'flex'
      startGameModal.style.display = 'none'
      gameOverModal.style.display = 'flex'
      return;
   }
   if (head.x == food.x & head.y == food.y){
   blocks[`${food.x}-${food.y}`].classList.remove('food') 
   food = { x: Math.floor(Math.random () * rows), y: Math.floor(Math.random () * cols) }
   blocks[`${food.x}-${food.y}`].classList.add('food') 
   snake.unshift(head)
   score += 10;
   scoreElem.innerText = score;
   if(score > highScore){
      highScore = score
      localStorage.setItem("highScore", highScore.toString())
   }
   }
      snake.forEach(segment =>{
      blocks[`${segment.x}-${segment.y}`].classList.remove('fill','head') 
   })   
      snake.unshift(head)
      snake.pop()
   //   snake.forEach(segment =>{
      
   //   blocks[`${segment.x}-${segment.y}`].classList.add('fill') 
   //  })
   snake.forEach((segment, index) => {
  if (index === 0) {
    blocks[`${segment.x}-${segment.y}`].classList.add('head') // head color
  } else {
    blocks[`${segment.x}-${segment.y}`].classList.add('fill') // body color
  }
})
 
}

startButton.addEventListener('click', () =>{
      modal.style.display ="none";
      intervalId = setInterval(() =>{render()},500)
      timerIntervalId = setInterval(() =>{
         let [min, sec] = time.split("-").map(Number)
         if(sec ==59){
            min += 1
            sec = 0
         } else{
            sec += 1;
         }
         time = `${min}-${sec}`
         timeElem.innerText = time
      },1000)
} )

restartButton.addEventListener('click', restartGame)
function restartGame() {

   blocks[`${food.x}-${food.y}`].classList.remove('food') 

   snake.forEach(segment =>{
      blocks[`${segment.x}-${segment.y}`].classList.remove('fill','head') 
   })  

   direction = 'right'  
   score = 0
   time =`00-00`

   scoreElem.innerText = score
   timeElem.innerText  = time
   highScoreElem.innerText = highScore
   modal.style.display ="none";
   snake = [ {x : 1, y: 3},]
   food = { x: Math.floor(Math.random () * rows), y: Math.floor(Math.random () * cols) }
   intervalId = setInterval(() =>{render()}, 500)
}



addEventListener("keydown", (event) =>{
   if(event.key == "ArrowDown" ){
      direction = "down"
   }
   else if(event.key == "ArrowUp" ){
      direction = "up"
   }
   else if(event.key == "ArrowLeft" ){
      direction = "left"
   }
   else if(event.key == "ArrowRight" ){
      direction = "right"
   }
} )