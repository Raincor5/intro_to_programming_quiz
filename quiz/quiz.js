// Module imports
const welcomeMessage = require("./functions/welcome");
const levelSelector = require("./functions/levelSelector");
const topicSelector = require("./functions/topicSelector");
const questionSelector = require("./functions/questionSelector");
const optionsSelector = require("./functions/optionsSelector");
const validateAndProceed = require("./functions/validateAndProceed");

async function quiz() {
    let isRunning;
    await welcomeMessage();
    isRunning = true;
    while (isRunning) {
        let currentPlayer = "Player 1"; // placeholder
        // show scores - todo: implement
        let [originalLevelIndex, selectedLevel, level] = levelSelector();
        let [originalTopicIndex, selectedTopic, topic] = topicSelector(originalLevelIndex, selectedLevel);

        let [originalQuestionIndex, randomQuestion] = questionSelector(originalLevelIndex, originalTopicIndex, selectedTopic);

        let answer = optionsSelector(selectedLevel, originalTopicIndex, originalQuestionIndex);

        await validateAndProceed(selectedLevel, originalTopicIndex, originalQuestionIndex, randomQuestion, answer);
    }
}

module.exports = quiz;