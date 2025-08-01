/*-------------------------------- Constants --------------------------------*/
const letters = document.querySelectorAll(".letter")
const messageElm = document.querySelector('.message')
const wordUnderscores = document.querySelector("#word-undercores")
const livesElement = document.querySelector(".lives")
const image = document.querySelector("#hangman-img")
const gameOverContainer = document.querySelector("#game-over")
const gameWinCont = document.querySelector("#game-win")
const resetGameBtn = document.querySelector('.reset')
const hintText = document.querySelector('#hint')
const winAudioElm = document.querySelector('#jsr')
const gameOverAudioElm = document.querySelector('#sadge')
const word = ['pstwo', 'sanandreas', 'gameboy', 'pokemon', 'tamagotchi', 'sonic', 'mario', 'pepsiman', 'ds', 'parappa', 'crash']
const hints = ['Hint: The best selling console of all time',
    'Hint: The GTA game that has `Grove Street` in it',
    'Hint: A Nintedo Handheld that came out in 1989',
    'Hint: Gotta catch em all',
    'Hint: A digital pet toy that you keep in your pocket',
    'Hint: A blue hedgehog, debuted on the sega genesis in 1991',
    'Hint: The main mascot of Nintendo',
    'Hint: A Pepsi themed game on ps1',
    'Hint: A Nintendo handheld with two screens',
    'Hint: A PS1 rhythm game about a `rapping dog`',
    'Hint: he is a bandicoot'
]
/*---------------------------- Variables (state) ----------------------------*/
//word shown on the screen
let displayedWord = []
//hint corresponding to the word
let selectedHint
//randomly selected word by the computer
let selectedWord = ""
//the user picks a letter 
let pickedLetter;
//wrong guesses
let wrongLetter = []
//amount of guesses
let lives = 6
//the index of the word in the array 
let wordIndex = 0
/*-------------------------------- Functions --------------------------------*/
//calls all fucntions i made for game to start - think like windows boot up sound
function init() {
    pickRandomWord()
    playGame()
    showHint()
    
}


function playGame() {
    pickRandomWord()
    //i put the word i want to show on the screen in an array 
    displayedWord = []
    //created a loop to push underscores corresponding to the number of letters in each word
    for (let i = 0; i < selectedWord.length; i++) {
        displayedWord.push('_')
        pElement = document.createElement("p")
        pElement.textContent = "_"
        wordUnderscores.appendChild(pElement)
    }
    //made an html element to display remaining lives 
    livesElement.textContent = ` Remaning lives: ${lives}`
    
}


//picks random word from word array 
function pickRandomWord() {
    wordIndex = Math.floor(Math.random() * word.length)
    selectedWord = word[wordIndex]
}

//picks the hint corresponding to the word from arrays 
function showHint() {
    const hintIndex = word.findIndex(function (oneWord) {
        return oneWord === selectedWord
    })

    selectedHint = hints[hintIndex]
    hintText.textContent = selectedHint
    

}

//this shows the guessed letters picked by the player
letters.forEach((oneLetter) => {
    oneLetter.addEventListener("click", (event) => {
        pickedLetter = event.target.id.toLowerCase()
        if (selectedWord.includes(pickedLetter)) {
            showWord(pickedLetter)
            //if the picked letter is wrong 
        } else { lifePoints() }
    })
})

// shows underscores for the letters to go into 
function showUnderscores() {
    //i makde it loop through my word array
    for (i = 0; i < word.length; i++)
        //i create a new element for the underscores
        pElement = document.createElement("p")
    pElement.textContent = "_"
    //fills that new html element with underscores 
    wordUnderscores.appendChild(pElement)
    
}



//shows correct letter in the screen 
function showWord(pickedLetter) {
    //i empty the underscore element from the html
    wordUnderscores.textContent = ""
    //i loop through every letter in the selected word
    selectedWord.split('').forEach((letter, idx) => {
    // if the user picks the correct word
        if (letter === pickedLetter) {
            //it will pick it
            displayedWord[idx] = letter
        }
    });
    // and show the picked letter on the screen 
    displayedWord.forEach((element) => {
        //by creating a new p element 
        let pElement = document.createElement("p")
        //and filling it with the picked letter
        pElement.textContent = element
        wordUnderscores.appendChild(pElement)

    })
    GameWin()
}



//to check if the letter isnt in the word - will take a point from available lives 
function lifePoints() {
    lives -= 1
    
    //shows the appropriate image when i lose a life 
    image.src = `./images/strike-${lives}.png`
    //shows text for remaining lives 
    livesElement.textContent = `Reamining lives ${lives}`



    gameOver()
}

function gameOver() {
    //if i run out of lives - game over - i make an if statement
    if (lives == 0) {
        // if lives = 0 - make a new paragraph element in html 
        let gameOverText = document.createElement('p')
        //make it say game over 
        gameOverText.textContent = 'Game over! Better luck next time!'
        //show it on screen 
        gameOverContainer.appendChild(gameOverText)
        hintText.textContent = ""
        //play audio
        gameOverAudioElm.play()

    }
}

function GameWin() {
    // loop through the entire displayWords
    //i check if all my underscores are filled 
    let hasWon = displayedWord.every((element) => {
        return element !== "_"
    })
    //if the above condition is fullfilled
    if (hasWon) {
        //i make computer do some dom event magic
        let gameWinText = document.createElement('p')
        //make that element say you won and make it visible if palayer guesses the word corectly 
        gameWinText.textContent = "Nice! you have great taste in games!"
        gameWinCont.appendChild(gameWinText)
        //i add win audio that trigger on win 
        winAudioElm.play()
    }


}



function resetGame() {
    lives = 6
    image.src = 'images/start.png'
    selectedHint = ""
    displayedWord = []
    selectedWord = ""
    wrongLetter = []

    wordUnderscores.textContent = ""
    gameWinCont.textContent = ""
    gameOverContainer.textContent = ""

    playGame()
    showHint()

}



/*----------------------------- Event Listeners -----------------------------*/
// add event listener to all your buttons
document.addEventListener('DOMContentLoaded', init)
resetGameBtn.addEventListener('click', resetGame)





