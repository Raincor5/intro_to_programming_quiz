// Module imports
const welcomeMessage = require("./functions/welcome");
const levelSelector = require("./functions/levelSelector");
const topicSelector = require("./functions/topicSelector");
const questionSelector = require("./functions/questionSelector");
const optionsSelector = require("./functions/optionsSelector");
const validateAndProceed = require("./functions/validateAndProceed");
const player = require("../players/player");

async function quiz() {
    console.clear();
    let isRunning;
    await welcomeMessage();
    isRunning = true;
    while (isRunning) {
        let [originalLevelIndex, selectedLevel, quitCheck] = levelSelector();
        if (quitCheck) {
            isRunning = false;
            break;
        }
        let [originalTopicIndex, selectedTopic] = topicSelector(originalLevelIndex, selectedLevel);

        let [originalQuestionIndex, randomQuestion] = questionSelector(originalLevelIndex, originalTopicIndex, selectedTopic);
        let currentPlayer = player.playerBuzzer();
        let [answer, answerText] = optionsSelector(selectedLevel, originalTopicIndex, originalQuestionIndex);

        await validateAndProceed(selectedLevel, selectedTopic, originalTopicIndex, originalQuestionIndex,
            randomQuestion, answer, answerText, currentPlayer);
    }
}

module.exports = quiz;