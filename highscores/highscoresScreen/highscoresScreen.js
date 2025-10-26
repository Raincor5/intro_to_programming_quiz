const highscores = require('../highscore.js');
const rl = require("readline-sync");

let highscoresScreen = () => {
    console.clear();
    console.log("Highscores");
    console.log("======================");
    for (let i = 0; i < highscores().length; i++) {
        let trophiesBank = ["🏆", "🥈", "🥉"];
        let prize = trophiesBank[i];
        let player = highscores()[i];
        if (prize !== undefined) {
            console.log(`${trophiesBank[i]} ${player.name} ${player.avatar} ${player.score}`);
        } else {
            console.log(`${player.name} ${player.avatar} ${player.score}`);
        }
    }
    console.log("======================");
    let answer = rl.question("Press any key to go back to the main menu: ");
    return answer;
}

module.exports = highscoresScreen;