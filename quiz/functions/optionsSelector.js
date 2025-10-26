const {getOptionsForQuestion} = require("../../data/dataManager");
const data = require("../../data/data");
const rl = require("readline-sync");
const cl = require('colorette');

let optionsSelector = (selectedLevel, originalTopicIndex, originalQuestionIndex) => {
    console.clear();
    let options = getOptionsForQuestion(data, selectedLevel, originalTopicIndex, originalQuestionIndex);
    options.forEach((option, index) => console.log(cl.yellow(`${index+1}. `) + option));
    let answer = rl.question("Choose an answer: ");
    answer = parseInt(answer);
    let answerText = options[answer-1];
    return [answer, answerText];
}

module.exports = optionsSelector;