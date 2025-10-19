// Library imports
const cl = require("colorette");
const rl = require("readline-sync");

// Module imports
const quiz = require("./quiz/quiz");


function main() {
    let isRunning = true;
    while (isRunning) {
        console.log("This is a quiz!");
        // MENU
        console.log("1. Start Quiz");
        console.log("2. Show Highscores");
        console.log("3. Manage players");
        console.log("Q. Exit");
        let answer = rl.question("Choose the option:");
        switch (answer) {
            case "1":
                console.log("You chose option 1!");
                quiz();
                break;
            case "2":
                console.log("You chose option 2!");
                break;
            case "3":
                console.log("You chose option 3!");
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