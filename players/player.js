const {getAllLevels} = require("../data/dataManager");
const data = require("../data/data");
const rl = require("readline-sync");
let players = [];


let nextPlayerId = 0;

// THIS CHUNK WAS AI-GENERATED TO PROVIDE EMOJI OPTIONS FOR AVATARS
const EMOJI_POOL = [
    '😀','😁','😂','🤣','😎','🧐','🤓','🥳','🤖','👾',
    '🐶','🐱','🦊','🐼','🐨','🐯','🦁','🐸','🐵','🦄',
    '⚽','🏀','🏈','⚾','🎾','🏐','🎲','🧩','🚀','⭐'
];

function pickRandomEmoji() {
    return EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]; // Could use the getRandomNUmber function from utils
}

function ensureAvatar(input) {
    const s = typeof input === 'string' ? input.trim() : '';
    if (!s) return pickRandomEmoji();

    // Prefer a single grapheme; fall back to any non-empty string
    try {
        const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
        const clusters = [...seg.segment(s)];
        return clusters.length === 1 ? s : pickRandomEmoji();
    } catch {
        return s; // Simple fallback without Segmenter
    }
}
// END OF THE AI-GENERATED CODE

let validator = (player) => {
    // Type validation
    if (typeof player.name !== 'string' || player.name.trim().length < 2 || player.name.trim().length > 20) {
        console.log("Name must be a string!");
        return false;
    }

    player.avatar = ensureAvatar(player.avatar);

    if (typeof player.score !== 'number' || isNaN(player.score)) {
        console.log("Score must be a number!");
        return false;
    }

    if (typeof player.buzzerKey !== 'string' || player.buzzerKey.trim().length === 0) {
        console.log("Buzzer key must be a string!");
        return false;
    }

    return true;
}

let addPlayer = (name, avatar, score, buzzerKey) => {
    const normalizerBuzzer = String(buzzerKey || '').toUpperCase().trim()[0];
    let playerConstructor = {
        id: nextPlayerId++,
        name: name,
        avatar: avatar,
        score: score, // In case of a handicap, this will be the initial score
        buzzerKey: normalizerBuzzer,
        questionsAnswered: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        answeredCorrectly:[],
        answeredIncorrectly: [],
    }
    let validate = validator(playerConstructor);
    if (!validate) {
        console.log("Invalid player data!");
        return false;
    }
    const duplicate = players.find(player => player.name === name || player.buzzerKey === normalizerBuzzer);
    if (duplicate) {
        console.log("Player with the same name or buzzer key already exists!");
        return false;
    }
    players.push(playerConstructor);
    console.log("Player added successfully!");
    return true;
}

let getPlayerById = (id) => {
    const numId = Number(id);
    return players.find(player => player.id === numId) || null;
}

let getPlayerByName = (name) => {
    return players.find(player => player.name === name);
}

let getPlayerByBuzzerKey = (buzzerKey) => {
    return players.find(player => player.buzzerKey === buzzerKey.toUpperCase().trim()[0]);
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

let updatePlayerBasicInfo = (playerId, name, avatar, score, buzzerKey) => {
    const id = Number(playerId);
    const player = getPlayerById(id);
    if (!player) {
        console.log("Player not found!");
        return false;
    }

    const nextName = (typeof name === 'string' && name.trim() !== '') ? name : player.name;
    const nextAvatar = (typeof avatar === 'string' && avatar.trim() !== '') ? avatar : player.avatar;

    let nextScore;
    if (score === '' || score === undefined || score === null) {
        nextScore = player.score;
    } else {
        const n = Number(score);
        nextScore = n;
    }

    const nextBuzzer = (typeof buzzerKey === 'string' && buzzerKey.trim() !== '')
        ? String(buzzerKey).toUpperCase().trim()[0]
        : player.buzzerKey;

    const candidate = {
        name: nextName,
        avatar: nextAvatar,
        score: nextScore,
        buzzerKey: nextBuzzer,
    };
    let validate = validator(candidate);
    if (!validate) {
        console.log("Invalid player data!");
        return false;
    }

    const nameChanged = nextName !== player.name;
    const buzzerChanged = nextBuzzer !== player.buzzerKey;
    const duplicate = players.some(p => p.id !== id && (
        (nameChanged && p.name === nextName) ||
        (buzzerChanged && p.buzzerKey === nextBuzzer)
    ));
    if (duplicate) {
        console.log("Player already exists!");
        return false;
    }

    player.name = nextName;
    player.avatar = nextAvatar;
    player.score = nextScore;
    player.buzzerKey = nextBuzzer;

    console.log("Player updated successfully!");
    return true;
};

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
        const s = typeof buzzerKey === 'string' ? buzzerKey.trim() : '';
        if (!s) return; // ignore empty input
        player.buzzerKey = s.toUpperCase()[0];
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

let playerBuzzer = () => {
    let currentPlayer = '';
    let players = getPlayers();
    console.log("Available buzzers: ")
    players.forEach(player => console.log(
        player.buzzerKey + " - " + player.name
        )
    )
    let buzzer = rl.question("Press your buzzer key to answer: ");
    let player = getPlayerByBuzzerKey(buzzer);
    if (player) {
        currentPlayer = player.name;
    }
    return currentPlayer;
}



let updatePlayerOnAnswer = (playerName, selectedLevel, selectedTopic, randomQuestion, answerText, validated) => {
    let player = getPlayerByName(playerName);
    let levels = getAllLevels(data);
    let levelIndex = levels.indexOf(selectedLevel);
    let points = [];
    for (let i = 0; i < levels.length; i++) {
        points.push((i+1) * 100);
    }
    let metadata = {isCorrect: validated, previousScore: player.score, level: selectedLevel, question: randomQuestion, answer: answerText, time: new Date().getTime()}
    if (validated) {
        player.answeredCorrectly.push(metadata);
        addPlayerCorrectAnswer(player.id);
        addPlayerScore(player.id, points[levelIndex]);
    }  else {
        player.answeredIncorrectly.push(metadata);
        addPlayerIncorrectAnswer(player.id);
        deductPlayerScore(player.id, points[levelIndex]);
    }
    addPlayerQuestionsAnswered(player.id);
    // Score debugging
    console.log("Player: " + player.name + " - Score: " + player.score);
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
    updatePlayerOnAnswer,
    updatePlayerBasicInfo,
    playerBuzzer,
};

