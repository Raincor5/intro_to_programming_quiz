const {getOptionsForQuestion} = require("../../data/dataManager");
const data = require("../../data/data");
const rl = require("readline-sync");

let optionsSelector = (selectedLevel, originalTopicIndex, originalQuestionIndex) => {
    let options = getOptionsForQuestion(data, selectedLevel, originalTopicIndex, originalQuestionIndex);
    console.log(options);
    options.forEach((option, index) => console.log(`${index+1}. ` + option));
    let answer = rl.question("Choose an answer: ");
    answer = parseInt(answer);
    return answer;
}

module.exports = optionsSelector;