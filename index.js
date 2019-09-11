let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
   $el.classList.remove('hide');
}

function hide($el) {
   $el.classList.add('hide')
}

function startGame() {
   score = 0;
   setGameTime();
   $gameTime.setAttribute('disabled', 'true');
   show($timeHeader);
   hide($resultHeader);
   isGameStarted = true;
   $game.style.backgroundColor = '#fff';
   hide($start);

   let interval = setInterval(function() {
      let time = parseFloat($time.textContent)
      
      if (time <= 0) {
        clearInterval(interval);
         endGame()
      } else {
         $time.textContent = (time - 0.1).toFixed(1);
      }     
   }, 100)

   renderBox();
}

function setGameScore() {
   $result.textContent = score.toString();
}

function setGameTime() {
   let time = +$gameTime.value
   $time.textContent = time.toFixed(1);
   show($timeHeader);
   hide($resultHeader);
}

function endGame() {
   isGameStarted = false;
   setGameScore();
   $game.innerHTML = ''; //! clear div elements
   $gameTime.removeAttribute('disabled');
   show($start);
   game.style.backgroundColor = getRandomcolor();
   hide($timeHeader);
   show($resultHeader);
}

function handleBoxClick(event){
   if (!isGameStarted) {
      return
   }

   if (event.target.dataset.box){
      score++;
      renderBox();
   }
}

function renderBox() { //! BOX logic
   $game.innerHTML = ''; //! clear div elements
   let box = document.createElement('div');
   let boxSize = getRandom(30, 100); //! random box-size
   let gameSize = $game.getBoundingClientRect();
   let maxTop = gameSize.height - boxSize;
   let maxLeft = gameSize.width - boxSize;
   

   box.style.height = box.style.width = boxSize + 'px'; //! generate random-size box
   box.style.position = 'absolute';
   box.style.backgroundColor = getRandomcolor();
   box.style.left = getRandom(0, maxTop) + 'px';
   box.style.top = getRandom(0, maxLeft) + 'px'
   box.style.cursor = 'pointer';
   box.setAttribute('data-box', 'true');

   $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) { //! generete a random num.
   return Math.floor(Math.random() * (max - min) + min);
}

function getRandomcolor() { //! generete a random color creating a hex code.
   let letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random()*16)];
   }
   return color;
}

