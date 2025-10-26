const highscores = require('../highscore.js');
const rl = require("readline-sync");
const cl = require("colorette");

let highscoresScreen = () => {
    console.clear();
    console.log(cl.cyan(cl.bold("╔════════════════════════════╗")));
    console.log(cl.cyan(cl.bold("║       HIGHSCORES          ║")));
    console.log(cl.cyan(cl.bold("╚════════════════════════════╝")));
    for (let i = 0; i < highscores().length; i++) {
        let trophiesBank = ["🏆", "🥈", "🥉"];
        let prize = trophiesBank[i];
        let player = highscores()[i];
        if (prize !== undefined) {
            console.log(cl.yellow(trophiesBank[i]) + " " +
                cl.bold(player.name) + " " +
                player.avatar + " " +
                cl.cyan(player.score));
        } else {
            console.log(cl.bold(player.name) + " " +
                player.avatar + " " +
                cl.cyan(player.score));
        }
    }
    let answer = rl.question("Press any key to go back to the main menu: ");
    return answer;
}

module.exports = highscoresScreen;