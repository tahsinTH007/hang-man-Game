const keyboardDiv = document.querySelector('.keybord')
const wordDisplay = document.querySelector('.word-display')
const guessText = document.querySelector('.guesses-text b')
const hangImage = document.querySelector('.hangman-box img')
const gameModule = document.querySelector('.game-model')
const playAgainBtn = document.querySelector('.play-again')


let currentWord,currentLetter, worngGuessCount;
const maxCount = 6;

const resetGame = () => {
    currentLetter=[];
    worngGuessCount = 0;
    hangImage.src = `/img/hangman-${worngGuessCount}.svg`
    guessText.innerText = `${worngGuessCount} / ${maxCount}`
    keyboardDiv.querySelectorAll('button').forEach((btn) => btn.disabled = false) 
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("")
    gameModule.classList.remove("show")
}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word;
    document.querySelector('.hint-text b').innerHTML = hint;
    resetGame()
}

const gameover = (isVectory) => {
    setTimeout(() => {
        const modelText = isVectory ? `You found the word:`:`The correct word was:`
        gameModule.querySelector('img').src = `img/${isVectory?`victory`:`lost`}.gif`
        gameModule.querySelector('h4').innerText = `${isVectory?`Congrats!`:`Gameover!`}`
        gameModule.querySelector('p').innerHTML = `${modelText} <b>${currentWord}</b>`
        gameModule.classList.add("show")
    },300)
}

const initGame = (button, clickedLetter) =>{
    if(currentWord.includes(clickedLetter)){

        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                currentLetter.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText= letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        worngGuessCount++;
        hangImage.src = `/img/hangman-${worngGuessCount}.svg`     
    }
    button.disabled = true;
    guessText.innerText = `${worngGuessCount} / ${maxCount}`
    if(worngGuessCount === maxCount) return gameover(false);
    if(currentLetter.length === currentWord.length) return gameover(true);
} 

for (let i = 97; i < 122; i++) {
    const button = document.createElement('button')
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button) 
    button.addEventListener("click",e => initGame(e.target,String.fromCharCode(i))) 
}

getRandomWord()

playAgainBtn.addEventListener('click', getRandomWord)