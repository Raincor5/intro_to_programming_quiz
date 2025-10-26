const {getOptionsForQuestion} = require("../../data/dataManager");
const data = require("../../data/data");
const rl = require("readline-sync");

let optionsSelector = (selectedLevel, originalTopicIndex, originalQuestionIndex) => {
    console.clear();
    let options = getOptionsForQuestion(data, selectedLevel, originalTopicIndex, originalQuestionIndex);
    options.forEach((option, index) => console.log(`${index+1}. ` + option));
    let answer = rl.question("Choose an answer: ");
    answer = parseInt(answer);
    let answerText = options[answer-1];
    return [answer, answerText];
}

module.exports = optionsSelector;