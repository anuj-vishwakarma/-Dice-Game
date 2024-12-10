'use-stric';


const rollDiceButton = document.querySelector('.roll-dice');
const newGameButton = document.querySelectorAll('.new-game-btn');
const continueButton = document.querySelector('.continue-btn');
const holdButton = document.querySelector('.hold');
const player1Container = document.querySelector('.player1-container');
const player1CurrentScore = document.querySelector('.player1-current-score');
const player1TotalScore = document.querySelector('.total-score-p1');
const dice = document.querySelector('.dice');

const player2Container = document.querySelector('.player2-container');
const player2CurrentScore = document.querySelector('.player2-current-score');
const player2TotalScore = document.querySelector('.total-score-p2');
const player1CurrentScoreContainer = document.querySelector('.player1-current-score-container');
const player2CurrentScoreContainer = document.querySelector('.player2-current-score-container');
const playerWonSpan = document.querySelector('.player-won-span');

let isPlayerOneTurn = true;

let currentScoreGenerated = 0;
const switchTurns = function () {
    let player = isPlayerOneTurn ? player1CurrentScore : player2CurrentScore;
    currentScoreGenerated = 0;
    player.textContent = '0';
    if (isPlayerOneTurn) colorLogicPlayer1();
    else colorLogicPlayer2();
    isPlayerOneTurn = !isPlayerOneTurn;
}
const colorLogicPlayer1 = function () {
    player1Container.style.backgroundColor = '#deadbb63';
    player2Container.style.backgroundColor = '#deadbbdb';
    player1TotalScore.style.color = '#ffc4c4';
    player2TotalScore.style.color = '#BF2F57';
    player2CurrentScoreContainer.style.backgroundColor = '#DC3F6B';
    player1CurrentScoreContainer.style.backgroundColor = '#bc3c60';
}

const colorLogicPlayer2 = function () {
    player2Container.style.backgroundColor = '#deadbb63';
    player1Container.style.backgroundColor = '#deadbbdb';
    player1TotalScore.style.color = '#BF2F57';
    player2TotalScore.style.color = '#ffc4c4';
    player1CurrentScoreContainer.style.backgroundColor = '#DC3F6B';
    player2CurrentScoreContainer.style.backgroundColor = '#BC3C60';
}
const takeActions = function (isPlayerOneTurn) {

}
//                  1  2
let playersScore = [0, 0];
rollDiceButton.addEventListener('click', function () {
    let diceValue = Math.trunc(Math.random() * 6) + 1; // generated diceValue
    dice.src = `./assets/dice-${diceValue}.png`;
    let player = isPlayerOneTurn ? player1CurrentScore : player2CurrentScore;
    currentScoreGenerated += diceValue;
    player.textContent = `${currentScoreGenerated}`;
    if (diceValue == 1) {
        switchTurns();
    }
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
holdButton.addEventListener('click', function () {

    if (isPlayerOneTurn) {
        playersScore[0] = playersScore[0] + currentScoreGenerated;
        player1TotalScore.textContent = `${playersScore[0]}`;
        currentScoreGenerated = 0;
    } else {
        playersScore[1] = playersScore[1] + currentScoreGenerated;
        player2TotalScore.textContent = `${playersScore[1]}`;
        currentScoreGenerated = 0;

    }
    let playerWon = (playersScore[0] > playersScore[1]) ? 1 : 2;
    playerWonSpan.textContent = `${playerWon}`;
    if (playersScore[0] >= 100 || playersScore[1] >= 100) {
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
        modal.classList.add('hidden');

    }
    switchTurns();
    console.log(playersScore);
});
const closeModal = function () {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
}
overlay.addEventListener('click', function () {
    closeModal();
})
document.addEventListener('keydown', function (keyPressEvent) {
    if (keyPressEvent.key == 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

for (let i = 0; i < 2; ++i) {
    newGameButton[i].addEventListener('click', function () {
        currentScoreGenerated = 0;
        playersScore = [0, 0];
        player1CurrentScore.textContent = '0';
        player2CurrentScore.textContent = '0';
        player1TotalScore.textContent = '0';
        player2TotalScore.textContent = '0';
        dice.src = './assets/dice-1.png';
        colorLogicPlayer2();
        isPlayerOneTurn = true;
        closeModal();
    });
}

const buttonAnimation = function (button) {
    button.classList.add("animate");
    // Remove the animation class after the animation duration
    setTimeout(function () {
        button.classList.remove("animate");
    }, 150); // This should match the duration in the CSS transition
};
continueButton.addEventListener('click', function () {
    console.log('clicked');
    closeModal();
}); 