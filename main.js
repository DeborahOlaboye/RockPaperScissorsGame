document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const scoreElement = document.querySelector(".score");
    const loseButton = document.querySelector(".lose-play"); 
    const playAgainButton = document.querySelector(".win-play"); 
    const rulesButton = document.querySelector(".rules");
    const rulesContainer = document.querySelector(".rules-container");
    const closeRules = document.querySelector(".close-btn");
    let score = 0

    
    const step1Game = document.querySelector(".step1-game");
    const step2Game = document.querySelector(".step2-game");
    const step3Game = document.querySelector(".step3-game");
    const step4Game = document.querySelector(".step4-game");

    
    const playerPickButton = document.querySelector(".playerChoice");
    const housePickButton = document.querySelector(".houseChoice");

    
   

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
    

    function displayResult(playerChoice, houseChoice) {
        
        let winElement = document.querySelector(".win");
        let loseElement = document.querySelector(".lose");
        let scoreElement = document.querySelectorAll(".score");

        winElement.style.display = "none";
        loseElement.style.display = "none";

        if (playerChoice === houseChoice) {
            winElement.style.display = "block";
            score += 1
        } else {
            loseElement.style.display = "block";
        }

        scoreElement.forEach(el => {
            el.textContent = score;
        });

        localStorage.setItem("score", score);
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


                displayResult(playerChoice, houseChoice);
            }, 200);
        }, 200);
    }

    function resetGame() {
        step4Game.style.display = "none";
        step1Game.style.display = "flex";
    }

    loseButton.addEventListener("click", resetGame);
    playAgainButton.addEventListener("click", resetGame);

    // Rules Popup
    rulesButton.addEventListener("click", () => {
        rulesContainer.style.display = "block";
    });

    closeRules.addEventListener("click", () => {
        rulesContainer.style.display = "none";
    });
});
