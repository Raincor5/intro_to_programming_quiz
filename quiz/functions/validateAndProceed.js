const {validateAnswer} = require("../../data/dataManager");
const data = require("../../data/data");
const {markAsUsedQuestion} = require("../utils/checkUsed");
const delay = require("../utils/delay");
const {updatePlayerOnAnswer} = require("../../players/player");

let validateAndProceed = async (selectedLevel, selectedTopic, originalTopicIndex, originalQuestionIndex, randomQuestion, answer, answerText, playerName) => {
     let validate = validateAnswer(data, selectedLevel, originalTopicIndex, originalQuestionIndex, answer-1);

     if (validate) {
         console.log("Correct!");
         updatePlayerOnAnswer(playerName, selectedLevel, selectedTopic, randomQuestion, answerText, validate);
     } else {
         console.log("Wrong!");
         updatePlayerOnAnswer(playerName, selectedLevel, selectedTopic, randomQuestion, answerText, validate);
     }
     markAsUsedQuestion(randomQuestion);
     console.log("Next question!");
     await delay(1000);
     console.clear();
 }

 module.exports = validateAndProceed;