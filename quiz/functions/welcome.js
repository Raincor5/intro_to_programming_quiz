const delay = require("../utils/delay");
const {getAllLevels, getAllTopics} = require("../../data/dataManager");
const getRandomNumber = require("../utils/getRNG");
const data = require('../../data/data.js');
const cl = require('colorette');

let welcomeMessage = async () => {
    console.clear();
    console.log("Welcome to the quiz!");
    await delay(1000);
    console.clear();
    console.log("Levels!");
    await delay(1000);
    console.clear();
    for (const level of getAllLevels(data)) {
        const index = getAllLevels(data).indexOf(level);
        let funnyPhrases = [
            cl.yellow("This one!"),
            cl.yellow("And another!"),
            cl.yellow("And yet another!"),
            cl.yellow("And a final one! (No?)")
        ];
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
}


module.exports = welcomeMessage;