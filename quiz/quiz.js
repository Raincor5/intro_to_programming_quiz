// Module imports
const welcomeMessage = require("./functions/welcome");
const levelSelector = require("./functions/levelSelector");
const topicSelector = require("./functions/topicSelector");
const questionSelector = require("./functions/questionSelector");
const optionsSelector = require("./functions/optionsSelector");
const validateAndProceed = require("./functions/validateAndProceed");
const player = require("../players/player");

async function quiz() {
    let isRunning;
    await welcomeMessage();
    let currentPlayer = "Player 1"; // placeholder
    player.addPlayer(currentPlayer, "??", 0, "t");
    isRunning = true;
    while (isRunning) {
        // show scores - todo: implement
        let [originalLevelIndex, selectedLevel, level] = levelSelector();
        let [originalTopicIndex, selectedTopic, topic] = topicSelector(originalLevelIndex, selectedLevel);

        let [originalQuestionIndex, randomQuestion] = questionSelector(originalLevelIndex, originalTopicIndex, selectedTopic);

        let [answer, answerText] = optionsSelector(selectedLevel, originalTopicIndex, originalQuestionIndex);

        await validateAndProceed(selectedLevel, selectedTopic, originalTopicIndex, originalQuestionIndex,
            randomQuestion, answer, answerText, currentPlayer);
    }
}

module.exports = quiz;