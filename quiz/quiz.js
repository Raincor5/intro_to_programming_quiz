const data = require('../data/data.js');
const rl = require('readline-sync');

// Notes
// data structure: questions[level][topic].questions[index] OR questions.levelName[topic].questions[index]

// Module imports
const getRandomNumber = require('./utils/getRNG.js');
const {getAllTopics, getAllLevels, getTopicByLevel, getOptionsForQuestion, validateAnswer, getQuestionsByTopic} = require("../data/dataManager");
const delay = require('./utils/delay.js');
const { markAsUsedQuestion, markAsUsedLevel,
    markAsUsedTopic, validateUsedQuestion, validateUsedLevel,
    validateUsedTopic, checkAllQuestionsUsedForTopic, checkAllQuestionsUsedForLevel, checkAllLevelsUsed,
    usedQuestions, usedLevels, usedTopics} = require('./utils/checkUsed.js');
const {getAvailableQuestions, getAvailableTopics, getAvailableLevels} = require("./utils/checkUsed");

async function quiz() {
    let isRunning = false;
    console.log("Welcome to the quiz!");
    await delay(1000);
    console.clear();
    console.log("Levels!");
    await delay(1000);
    console.clear();
    for (const level of getAllLevels(data)) {
        const index = getAllLevels(data).indexOf(level);
        let funnyPhrases = ["This one!", "And another!", "And yet another!", "And a final one! (No?)"];
        console.log(funnyPhrases[getRandomNumber(0, funnyPhrases.length - 1)]);
        console.log(`${index + 1}. ${level}`);
        await delay(1000);
        console.clear();
    }
    console.log("Topics!");
    await delay(1000);
    console.clear();
    for (const topic of getAllTopics(data)) {
        const index = getAllTopics(data).indexOf(topic);
        let funnyPhrases = ["This one!", "And another!", "And yet another!", "And a final one! (No?)"];
        console.log(funnyPhrases[getRandomNumber(0, funnyPhrases.length - 1)]);
        console.log(`${index + 1}. ${topic}`);
        await delay(1000);
        console.clear();
    }
    console.log("Let's start!");
    await delay(1000);
    console.clear();
    isRunning = true;
    while (isRunning) {
        // check question pool - todo: implement
        let availableLevels = getAvailableLevels(data);
        let currentPlayer = "Player 1"; // placeholder
        // show scores - todo: implement
        console.log(availableLevels);
        availableLevels.forEach(((level, index) => console.log(`${ index+1 }. ` + level)));
        let level = rl.question("Choose a level: ");
        level = parseInt(level);
        if (level < 1 || level > availableLevels.length || isNaN(level)) {
            console.log("Invalid level selected. Please try again.");
            continue;
        }
        let selectedLevel = availableLevels[level-1];
        let allLevels = getAllLevels(data);
        let originalLevelIndex = -1;
        for (let i = 0; i < allLevels.length; i++) {
            if (allLevels[i] === selectedLevel) {
                originalLevelIndex = i;
                break;
            }
        }
        let availableTopics = getAvailableTopics(data, originalLevelIndex);
        availableTopics.forEach((topic, index) => console.log(`${index+1}. ` + topic));
        let topic = rl.question("Choose a topic: ");
        topic = parseInt(topic);
        if (topic < 1 || topic > availableTopics.length || isNaN(topic)) {
            console.log("Invalid topic selected. Please try again.");
            continue;
        }
        let selectedTopic = availableTopics[topic-1];
        let allTopicsForLevel = getTopicByLevel(data, originalLevelIndex);
        let originalTopicIndex = -1;
        for (let i = 0; i < allTopicsForLevel.length; i++) {
            if (allTopicsForLevel[i] === selectedTopic) {
                originalTopicIndex = i;
                break;
            }
        }
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

        let options = getOptionsForQuestion(data, selectedLevel, originalTopicIndex, originalQuestionIndex);
        console.log(options);
        options.forEach((option, index) => console.log(`${index+1}. ` + option));
        let answer = rl.question("Choose an answer: ");
        answer = parseInt(answer);
        let validate = validateAnswer(data, selectedLevel, originalTopicIndex, originalQuestionIndex, answer-1);

        if (validate) {
            console.log("Correct!");
            // Here goes the point addition
        } else {
            console.log("Wrong!");
            // Here goes the point subtraction
        }
        markAsUsedQuestion(randomQuestion);
        console.log("Next question!");
        await delay(1000);
        console.clear();
    }
};

module.exports = quiz;