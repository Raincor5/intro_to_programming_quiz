const rl = require("readline-sync");
const { addPlayer } = require("../../player");


async function addPlayerOption() {
    let isRunning = true;
    while (isRunning) {
        console.clear();
        console.log("Add Player");
        const helpString1 = " To open emoji picker, press Ctrl + Alt + < on Windows 10+,\n";
        let helpString2 =  "or Control + Cmd + Space on macOS."
        const numOfSpaces = (helpString1.length - helpString2.length) / 2;
        let helpString2WithSpaces = " ".repeat(numOfSpaces) + helpString2;
        console.log("=".repeat(helpString1.length));
        console.log(helpString1 + helpString2WithSpaces);
        console.log("=".repeat(helpString1.length));
        let name = rl.question("Enter player name: ");
        let avatar = rl.question("Enter player avatar: ");
        let score = rl.question("Enter initial player score, in case of a handicap (leave blank for 0): ");
        score = parseInt(score.trim());
        score = isNaN(score) ? 0 : score;
        let buzzerKey = rl.question("Enter buzzer key (a, b, c, d): ");
        let newPlayer = addPlayer(name, avatar, score || 0, buzzerKey);
        if (newPlayer) {
            let answer = rl.question("Do you want to add another player? (y/N): ");
            answer = answer.toLowerCase();
            if (answer === "y") {
                isRunning = true;
            } else {
                isRunning = false;
                break;
            }
        } else {
            console.log("Player not added. Please try again.");
        }
    }

}

module.exports = {addPlayerOption};