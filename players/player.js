const {getAllLevels} = require("../data/dataManager");
const data = require("../data/data");
let players = [];

let nextPlayerId = 0;
let currentPlayerName = '';

let addPlayer = (name, avatar, score, buzzerKey) => {
    let playerConstructor = {
        id: nextPlayerId++,
        name: name,
        avatar: avatar,
        score: score, // In case of a
        buzzerKey: buzzerKey,
        questionsAnswered: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        answeredCorrectly:[],
        answeredIncorrectly: [],
    }

    let validator = (player) => {
        // Type validation
        if (typeof player.name !== 'string' || player.name.length < 2 || player.name.length > 20) {
            console.log("Name must be a string!");
            return false;
        }

        if (typeof player.avatar !== 'string' || player.avatar.length < 2 || player.avatar.length > 2) {
            console.log("Avatar must be a single unicode emoji character! \nFor windows: 'WIN + <'. \nFor mac: 'CMD + OPT + SPACE'");
            return false;
        }

        if (typeof player.score !== 'number') {
            console.log("Score must be a number!");
            return false;
        }

        if (player.score < 0) {
            console.log("Score must be a positive number!");
            return false;
        }

        if (typeof player.buzzerKey !== 'string') {
            console.log("Buzzer key must be a string!");
            return false;
        }

        // Duplicate validation
        if (players.some(p => p.name === player.name) || players.some(p => p.buzzerKey === player.buzzerKey)) {
            console.log("Player already exists!");
            return false;
        }
        return true;
    }

    if (!validator(playerConstructor)) {
        console.log("Invalid player data!");
        return false;
    } else {
        console.log("Player added successfully!");
        players.push(playerConstructor);
        return true;
    }
}

let getPlayerById = (id) => {
    return players.find(player => player.id === id);
}

let getPlayerByName = (name) => {
    return players.find(player => player.name === name);
}

let getPlayerByBuzzerKey = (buzzerKey) => {
    return players.find(player => player.buzzerKey === buzzerKey);
}

let getPlayers = () => {
    return players;
}

let getPlayersNames = () => {
    let playerNames = [];
    players.forEach(player => playerNames.push(player.name));
    return playerNames;
}

let getPlayersAvatars = () => {
    let playerAvatars = [];
    players.forEach(player => playerAvatars.push(player.avatar));
    return playerAvatars;
}

let getPlayersScores = () => {
    let playerScores = [];
    players.forEach(player => playerScores.push(player.score));
    return playerScores;
}

let getPlayersCorrectAnswers = () => {
    let playerCorrectAnswers = [];
    players.forEach(player => playerCorrectAnswers.push(player.correctAnswers));
    return playerCorrectAnswers;
}

let getPlayersIncorrectAnswers = () => {
    let playerIncorrectAnswers = [];
    players.forEach(player => playerIncorrectAnswers.push(player.incorrectAnswers));
    return playerIncorrectAnswers;
}

let updatePlayerScore = (playerId, score) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.score = score;
    }
}

let updatePlayerCorrectAnswers = (playerId, correctAnswers) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.correctAnswers = correctAnswers;
    }
}

let updatePlayerIncorrectAnswers = (playerId, incorrectAnswers) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.incorrectAnswers = incorrectAnswers;
    }
}

let updatePlayerQuestionsAnswered = (playerId, questionsAnswered) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.questionsAnswered = questionsAnswered;
    }
}

let updatePlayerBuzzerKey = (playerId, buzzerKey) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.buzzerKey = buzzerKey;
    }
}

let updatePlayerAvatar = (playerId, avatar) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.avatar = avatar;
    }
}

let updatePlayerName = (playerId, name) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.name = name;
    }
}

let addPlayerScore = (playerId, score) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.score += score;
    }
}

let removePlayer = (playerId) => {
    let playerIndex = players.findIndex(player => player.id === playerId);
    if (playerIndex !== -1) {
        players.splice(playerIndex, 1);
    }
}

let deductPlayerScore = (playerId, score) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.score -= score;
    }
}

let addPlayerCorrectAnswer = (playerId) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.correctAnswers++;
    }
}

let deductPlayerCorrectAnswer = (playerId) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.correctAnswers--;
    }
}

let addPlayerQuestionsAnswered = (playerId) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.questionsAnswered++;
    }
}

let deductPlayerQuestionsAnswered = (playerId) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.questionsAnswered--;
    }
}

let addPlayerIncorrectAnswer = (playerId) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.incorrectAnswers++;
    }
}

let deductPlayerIncorrectAnswer = (playerId) => {
    let player = getPlayerById(playerId);
    if (player) {
        player.incorrectAnswers--;
    }
}

let resetPlayers = () => {
    players = [];
    nextPlayerId = 0;
}

let updatePlayerIfCorrect = (playerName, selectedLevel, selectedTopic, randomQuestion, answer) => {
    let player = getPlayerByName(playerName);
    let levels = getAllLevels(data);
    let points = [];
    for (let i = 0; i < levels.length; i++) {
        points.push(i * 100);
    }
    let metadata = {previousScore: player.score, level: selectedLevel, question: randomQuestion, answer: answer, time: new Date().getTime()}
    player.answeredCorrectly.push(metadata);
    addPlayerScore(player.id, points[selectedLevel]);
    addPlayerCorrectAnswer(player.id);
    addPlayerQuestionsAnswered(player.id);
}

let updatePlayerIfIncorrect = (playerName, selectedLevel, selectedTopic, randomQuestion, answer) => {
    let player = getPlayerByName(playerName);
    let levels = getAllLevels(data);
    let points = [];
    for (let i = 0; i < levels.length; i++) {
        points.push(i * 100);
    }
    let metadata = {previousScore: player.score, level: selectedLevel, question: randomQuestion, answer: answer, time: new Date().getTime()}
    player.answeredIncorrectly.push(metadata);
    deductPlayerScore(player.id, points[selectedLevel]);
    deductPlayerIncorrectAnswer(player.id);
    addPlayerQuestionsAnswered(player.id);
}

module.exports = {
    addPlayer,
    getPlayerById,
    getPlayerByName,
    getPlayerByBuzzerKey,
    getPlayers,
    getPlayersNames,
    resetPlayers,
    getPlayersAvatars,
    getPlayersScores,
    getPlayersCorrectAnswers,
    getPlayersIncorrectAnswers,
    updatePlayerScore,
    updatePlayerCorrectAnswers,
    updatePlayerIncorrectAnswers,
    updatePlayerQuestionsAnswered,
    updatePlayerBuzzerKey,
    updatePlayerAvatar,
    updatePlayerName,
    addPlayerScore,
    removePlayer,
    deductPlayerScore,
    addPlayerCorrectAnswer,
    deductPlayerCorrectAnswer,
    addPlayerQuestionsAnswered,
    deductPlayerQuestionsAnswered,
    addPlayerIncorrectAnswer,
    deductPlayerIncorrectAnswer,
};

