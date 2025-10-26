
const data = require("../../data/data");
const rl = require("readline-sync");
const {getAvailableQuestions} = require("../utils/checkUsed");
const getRandomNumber = require("../utils/getRNG");
const {getQuestionsByTopic} = require("../../data/dataManager");

let questionSelector = (originalLevelIndex, originalTopicIndex, selectedTopic) => {
    console.clear();
    let availableQuestions = getAvailableQuestions(data, originalLevelIndex, originalTopicIndex);
    let randomQuestionIndex = getRandomNumber(0, availableQuestions.length - 1);
    let randomQuestion = availableQuestions[randomQuestionIndex];
    console.log(randomQuestion);

    // Find the original index in the full questions array
    let allQuestionsForTopic = getQuestionsByTopic(data, selectedTopic);
    let originalQuestionIndex = -1;
    for (let i = 0; i < allQuestionsForTopic.length; i++) {
        if (allQuestionsForTopic[i] === randomQuestion) {
            originalQuestionIndex = i;
            break;
        }
    }
    return [originalQuestionIndex, randomQuestion];
}

module.exports = questionSelector;