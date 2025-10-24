const { getPlayers } = require("../../player");
const rl = require("readline-sync");

function showPlayersOption() {
    console.clear();
    console.log("All players: ");
    let players = getPlayers();
    players.forEach(player => console.log(
        player.id + ". " + player.name + " " + player.avatar + " Score: " + player.score + " Buzzer key: " + player.buzzerKey + "\n"
    ));
    return rl.question("Press any key to come back to the player menu: ");
}

module.exports = showPlayersOption;