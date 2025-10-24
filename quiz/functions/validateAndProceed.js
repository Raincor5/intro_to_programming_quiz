const {validateAnswer} = require("../../data/dataManager");
const data = require("../../data/data");
const {markAsUsedQuestion} = require("../utils/checkUsed");
const delay = require("../utils/delay");

let validateAndProceed = async (selectedLevel, originalTopicIndex, originalQuestionIndex, randomQuestion, answer) => {
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

 module.exports = validateAndProceed;