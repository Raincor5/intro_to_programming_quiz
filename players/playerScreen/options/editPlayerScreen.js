const { getPlayers, getPlayerById, updatePlayerBasicInfo } = require("../../player");
const rl = require("readline-sync");
const cl = require("colorette");

function editPlayerScreen () {
    let isRunning = true;
    let players = getPlayers();
    while (isRunning) {
        console.clear();
        console.log(cl.cyan(cl.bold("EDIT PLAYER")));
        players.forEach(player => console.log(
            player.id + ". " + player.name + " " + player.avatar + " Score: " + player.score + " Buzzer key: " + player.buzzerKey + "\n"
        ));
        let getSelectedPlayer = rl.question("Select a player to edit (ID): ");
        if (!getPlayerById(parseInt(getSelectedPlayer))) {
            console.log(cl.red("✗ Invalid player selected. Please try again."));
            continue;
        } else {
            console.log(cl.green("✓ Player selected!"));
        }
        let newPlayerName = rl.question("Enter new player name: ");
        let newPlayerAvatar = rl.question("Enter new player avatar: ");
        let newPlayerScore = rl.question("Enter new player score: ");
        let newPlayerBuzzerKey = rl.question("Enter new buzzer key: ");
        if(updatePlayerBasicInfo(getSelectedPlayer, newPlayerName, newPlayerAvatar, newPlayerScore, newPlayerBuzzerKey)) {
            console.log(cl.green("✓ Player updated successfully!"));
            isRunning = false;
        } else {
            console.log(cl.red("✗ Failed to update player. Please try again."));
        }
    }
}

module.exports = editPlayerScreen;