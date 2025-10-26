const {getPlayers} = require("../players/player");

let highscores = () => {
    let players = getPlayers();
    players.sort((a, b) => b.score - a.score);
    return players;
}

module.exports = highscores;