// Library imports
const cl = require("colorette");
const rl = require("readline-sync");

// Module imports
const quiz = require("./quiz/quiz");
const delay = require("./quiz/utils/delay");
const playerScreen = require("./players/playerScreen/playerScreen");


async function main() {
    let isRunning = true;
    while (isRunning) {
        console.log("Welcome to the Quiz Game!");
        // MENU
        await delay(1000);
        console.log("1. Start Quiz");
        await delay(1000);
        console.log("2. Show Highscores");
        await delay(1000);
        console.log("3. Manage Players");
        await delay(1000);
        console.log("Q. Exit");

        let answer = rl.question("Choose the option:");
        switch (answer) {
            case "1":
                console.log("You chose option 1!");
                await quiz();
                break;
            case "2":
                console.log("You chose option 2!");
                // todo: show highscores
                break;
            case "3":
                console.log("You chose option 3!");
                playerScreen();
                break;
            default:
                if (answer === "q" || answer === "Q") {
                    console.log("Goodbye!");
                    isRunning = false;
                }
        }
    }
}

main();