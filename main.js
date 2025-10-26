// Library imports
const cl = require("colorette");
const rl = require("readline-sync");

// Module imports
const quiz = require("./quiz/quiz");
const delay = require("./quiz/utils/delay");
const playerScreen = require("./players/playerScreen/playerScreen");
const highscoresScreen = require("./highscores/highscoresScreen/highscoresScreen");


async function main() {
    let isRunning = true;
    while (isRunning) {
        console.clear();
        console.log(cl.cyan(cl.bold("╔════════════════════════════╗")));
        console.log(cl.cyan(cl.bold("║  WELCOME TO QUIZ GAME!    ║")));
        console.log(cl.cyan(cl.bold("╚════════════════════════════╝")));
        // MENU
        await delay(1000);
        console.log(cl.yellow("1. ") + "Start Quiz");
        await delay(1000);
        console.log(cl.yellow("2. ") + "Show Highscores");
        await delay(1000);
        console.log(cl.yellow("3. ") + "Manage Players");
        await delay(1000);
        console.log(cl.gray("Q. ") + "Exit");

        let answer = rl.question("Choose the option:");
        switch (answer) {
            case "1":
                console.log(cl.green("✓ Starting quiz..."));
                await quiz();
                break;
            case "2":
                console.log(cl.green("✓ Showing highscores..."));
                highscoresScreen();
                break;
            case "3":
                console.log(cl.green("✓ Showing player manager..."));
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