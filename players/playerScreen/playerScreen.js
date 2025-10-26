const rl = require("readline-sync");
const cl = require("colorette");
const {addPlayerOption} = require("./options/addPlayer");
const showPlayersOption = require("./options/showPlayersOption");
const editPlayerOption = require("./options/editPlayerScreen");

async function playerScreen() {
    let isRunning = true;
    while (isRunning) {
        console.clear();
        console.log(cl.cyan(cl.bold("PLAYER MANAGER")));
        let options = ["Add Player", "Show Players", "Edit player", "Exit"];
        options.forEach((option, index) => console.log(cl.yellow(`${index+1}. `) + option));
        let answer = rl.question("Choose an option: ");
        answer = parseInt(answer);
        switch (answer) {
            case 1:
                await addPlayerOption();
                break;
            case 2:
                showPlayersOption();
                break;
            case 3:
                editPlayerOption();
                break;
            case 4:
                isRunning = false;
                break;
            default:
                console.log(cl.red("✗ Invalid option. Please try again."));
                break;
        }
    }
}

module.exports = playerScreen;