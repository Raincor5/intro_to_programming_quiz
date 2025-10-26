const { getPlayers } = require("../../player");
const rl = require("readline-sync");
const cl = require("colorette");

function showPlayersOption() {
    console.clear();
    console.log(cl.cyan(cl.bold("ALL PLAYERS:")));
    let players = getPlayers();
    players.forEach(player => console.log(
        cl.yellow(player.id) + ". " +
        cl.bold(player.name) + " " +
        player.avatar + " " +
        "Score: " + cl.cyan(player.score) + " " +
        "Buzzer: " + cl.magenta(player.buzzerKey) + "\n"
    ));
    return rl.question("Press any key to come back to the player menu: ");
}

module.exports = showPlayersOption;