const data = require('../data/data.js');
const rl = require('readline-sync');

// Notes
// data structure: questions[level][topic].questions[index] OR questions.levelName[topic].questions[index]

// Module imports
const getRandomNumber = require('./utils/getRNG.js');
const {getAllTopics, getAllLevels, getTopicByLevel, getOptionsForQuestion} = require("../data/dataManager");
const delay = require('./utils/delay.js');

async function quiz() {
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
    getAllLevels(data).forEach(((level, index) => console.log(`${ index+1 }. ` + level)));
    let level = rl.question("Choose a level: ");
    getTopicByLevel(data, level-1).forEach((topic, index) => console.log(`${index+1}. ` + topic));
    let topic = rl.question("Choose a topic: ");
    let randomQuestionIndex = getRandomNumber(0, data[getAllLevels(data)[level-1]][topic-1].questions.length - 1);
    let randomQuestion = data[getAllLevels(data)[level-1]][topic-1].questions[randomQuestionIndex];
    console.log(randomQuestion);
    let options = getOptionsForQuestion(data, getAllLevels(data)[level-1], topic-1, randomQuestionIndex);
    options.forEach((option, index) => console.log(`${index+1}. ` + option));
    let answer = rl.question("Choose an answer: ");
    console.log(answer);
};

quiz();
module.exports = quiz;