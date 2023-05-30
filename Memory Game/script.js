//Ori Farkash 208985341
//Chen Amrani 206577645

const symbols = ['🍕','🍿','🥚','🥙','🍟','🍔','🍳','🍗','🌭','🧆','🥪','🫕','🥗','🥣','🍝','🥘','🧈','🍱','🍩','🍭','🍪','🍫','🍯','🍦','🍣','🧋','🍺','🍷','🧊','🧁'];

let flippedCards = [];
let numMatches = 0;
let allowClick = true;

document.getElementById("game-form").addEventListener("submit", startGame);
//---------------------------------------------------------------------------------------------------------------
// Get the audio element and toggle button
const backgroundAudio = document.getElementById("background-audio");
const toggleSoundBtn = document.getElementById("toggle-sound");
const finishGameAudio = document.getElementById("endGame-sound");

// Add click event listener to the toggle button
toggleSoundBtn.addEventListener("click", toggleSound);
// Function to toggle sound on/off
function toggleSound() {
  if (backgroundAudio.paused) {
    backgroundAudio.play();
    toggleSoundBtn.textContent = "Mute Sound";
  } else {
    backgroundAudio.pause();
    toggleSoundBtn.textContent = "Unmute Sound";
  }
}

//---------------------------------------------------------------------------------------------------------------
function startGame(event) {
  backgroundAudio.play();
  event.preventDefault();

  const playerName = document.getElementById("player-name").value;
  const numCards = parseInt(document.getElementById("num-cards").value);
  // Validate the input values (optional)
  if (numCards % 2 != 0) {
    alert("Please enter an even number");
    return;
  }

  // Hide the registration form
  document.getElementById("game-form").style.display = "none";

  // Display the player's name
  const playerInfo = document.getElementById("player-info");
  playerInfo.textContent = "Player: " + playerName + "   " + "Number of pairs: " +" " + numCards/2;

  // Timer
  startTimer();

  // Generate the game board
  generateGameBoard(numCards);
}

//---------------------------------------------------------------------------------------------------------------
const timerElement = document.getElementById("timer");
let seconds = 0;
function startTimer() {
  
  const timerElement = document.getElementById("timer");

  setInterval(() => {
    seconds++;
    timerElement.textContent = "Time: " + formatTime(seconds);
  }, 1000);
}

//---------------------------------------------------------------------------------------------------------------
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

//---------------------------------------------------------------------------------------------------------------
const foundpair = document.getElementById("num");
var num = 0;

function generateGameBoard(numCards) {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";
  const finishbutton = document.createElement("button");
  finishbutton.id="finishbutton";
  finishbutton.textContent="Finish The Game";
  finishbutton.addEventListener("click",function(){
    const finish = document.getElementById("finish");
    if(backgroundAudio.play)
    {
    backgroundAudio.pause();
    }
    finishGameAudio.play();
    document.getElementById("game-container").style.display = "none";
    document.getElementById("player-info").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("num").style.display = "none";
    finish.textContent = "Finish The Game" + "  " + "Time: " + formatTime(seconds) + "  " + "Pairs found: " + num;
  })
  const foundpair = document.getElementById("num");
  foundpair.textContent = "pairs found: " + num;
  // Calculate the number of pairs
  const numPairs = numCards / 2;

  // Shuffle the symbols array
  const shuffledSymbols = shuffleArray(symbols.slice(0, numPairs));
  
  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = '<div class="symbol">' + shuffledSymbols[i % numPairs] + '</div>';
    card.addEventListener("click", () => flipCard(card));
    
    gameContainer.appendChild(card);
    gameContainer.appendChild(finishbutton);
  }
}


//---------------------------------------------------------------------------------------------------------------

function flipCard(card) {  
  if (!allowClick || card.classList.contains("flipped")) {
    return;
  }
  
  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    allowClick = false;
    setTimeout(checkForMatch, 1000);
  }
  
  // Show symbol and hide question mark
  const symbolElement = card.querySelector(".symbol");
  const questionMarkElement = card.querySelector(".question-mark");
  symbolElement.classList.add("show");
  questionMarkElement.classList.remove("show");
}

//---------------------------------------------------------------------------------------------------------------
var flag=false;
const pairSound = document.getElementById("pair-sound");
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.innerHTML === card2.innerHTML) {
    pairSound.play();
    flag=true;
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    
    
    
  } else {
    flag=false;
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  if(flag===true){
    num++;
    foundpair.textContent = "pairs found: " + num;
  }

  flippedCards = [];
  allowClick = true;
}

//--------------------------------------------------------------------------------------------------------


function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

