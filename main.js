document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const scoreElement = document.querySelector(".score");
    const playAgainButton = document.querySelector(".lose-play"); 
    const rulesButton = document.querySelector(".rules");
    const rulesContainer = document.querySelector(".rules-container");
    const closeRules = document.querySelector(".close-btn");

    
    const step1Game = document.querySelector(".step1-game");
    const step2Game = document.querySelector(".step2-game");
    const step3Game = document.querySelector(".step3-game");
    const step4Game = document.querySelector(".step4-game");

    
    const playerPickButton = document.querySelector(".playerChoice");
    const housePickButton = document.querySelector(".houseChoice");
    const playerPickImage = document.querySelector(".playerChoice img");
    const housePickImage = document.querySelector(".houseChoice img");
    

    let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
    scoreElement.textContent = score;

    
    const gameRules = {
        rock: "images/icon-rock.svg",
        paper: "images/icon-paper.svg",
        scissors: "images/icon-scissors.svg"
    };

    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            const playerChoice = choice.dataset.choice;
            const houseChoice = getHouseChoice();
            playRound(playerChoice, houseChoice);
        });
    });

    function getHouseChoice() {
        const choicesArray = ["rock", "paper", "scissors"];
        return choicesArray[Math.floor(Math.random() * choicesArray.length)];
    }

    function playRound(playerChoice, houseChoice) {
        step1Game.style.display = "none";
        step2Game.style.display = "flex";

        setTimeout(() => {
            step2Game.style.display = "none";
            step3Game.style.display = "flex";

            setTimeout(() => {
                step3Game.style.display = "none";
                step4Game.style.display = "flex";

                // Update button borders and images
                playerPickButton.setAttribute("data-choice", playerChoice);
                housePickButton.setAttribute("data-choice", houseChoice);

                playerPickImage.src = gameRules[playerChoice];
                housePickImage.src = gameRules[houseChoice];

                displayResult(playerChoice, houseChoice);
            }, 200);
        }, 200);
    }


    function getWinner(player, house) {
        if (player === house) return {result: "draw", score };

        if (
            (player === "rock" && house === "scissors") ||
            (player === "scissors" && house === "paper") ||
            (player === "paper" && house === "rock")
        ) {
            score++;
            return "You Win";
        } else {
            score--;
            return "You Lose";
        }
    }
    
    function displayResult(playerChoice, houseChoice) {
        const { result, updatedScore } = getWinner(playerChoice, houseChoice, score);
        
        let winElement = document.getElementById("win");
        let loseElement = document.getElementById("lose");
        let resultText = document.getElementById("resultText");

        winElement.style.display = "none";
        loseElement.style.display = "none";
        resultText.style.display = "none";

        if (result === "win") {
            winElement.style.display = "block";
        } else if (result === "lose") {
            loseElement.style.display = "block";
        } else {
            resultText.textContent = "It's a Draw";
            resultText.style.display = "block";
        }

        score = updatedScore
        scoreElement.textContent = score;
        localStorage.setItem("score", score);
    }

    function resetGame() {
        step4Game.style.display = "none";
        step1Game.style.display = "flex";
    }

    playAgainButton.addEventListener("click", resetGame);

    // Rules Popup
    rulesButton.addEventListener("click", () => {
        rulesContainer.style.display = "block";
    });

    closeRules.addEventListener("click", () => {
        rulesContainer.style.display = "none";
    });
});
