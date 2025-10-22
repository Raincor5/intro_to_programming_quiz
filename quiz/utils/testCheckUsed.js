const data = require('../../data/data.js');
const {markAsUsedQuestion, markAsUsedLevel, markAsUsedTopic, validateUsedQuestion, validateUsedLevel,
    validateUsedTopic, checkAllQuestionsUsedForTopic, checkAllQuestionsUsedForLevel, checkAllLevelsUsed,
    getAvailableQuestions, getAvailableTopics, getAvailableLevels, usedQuestions, usedLevels, usedTopics} = require('./checkUsed.js');
const dataManager = require("../../data/dataManager");

// Test 1: Simulate one exhausted topic
// let level = 'easy';
// let topic = 'Sports';
// let question = 'How long is a marathon?';
// checkUsed.markAsUsedQuestion(question);
// question = 'What term is used in tennis for "40-40"?';
// checkUsed.markAsUsedQuestion(question);
// question = 'What is the score of zero called in tennis?';
// checkUsed.markAsUsedQuestion(question);
// question = 'How many rings are in the Olympic\'s logo?';
// checkUsed.markAsUsedQuestion(question);
// console.log(checkUsed.checkAllQuestionsUsedForTopic(data, topic)); // Expect true

// Test 2: Simulate one not exhausted topic
// let level = 'easy';
// let topic = 'Sports';
// let question = 'How long is a marathon?';
// checkUsed.markAsUsedQuestion(question);
// question = 'What term is used in tennis for "40-40"?';
// checkUsed.markAsUsedQuestion(question);
// question = 'What is the score of zero called in tennis?';
// checkUsed.markAsUsedQuestion(question);
// console.log(checkUsed.checkAllQuestionsUsedForTopic(data, topic)); // Expect false

// Test 3: Simulate the 'easy' level exhausted
// let levelQuestions = getQuestionsByLevel(data, 'easy');
// levelQuestions.forEach(question => {
//     checkUsed.markAsUsedQuestion(question);
// });
// console.log(checkUsed.checkAllQuestionsUsedForLevel(data, 'easy')); // Expect true

// Test 4: Simulate the 'easy' level not exhausted
// let levelQuestions = getQuestionsByLevel(data, 'easy');
// levelQuestions.pop();
// levelQuestions.forEach(question => {
//     checkUsed.markAsUsedQuestion(question);
// });
// console.log(checkUsed.checkAllQuestionsUsedForLevel(data, 'easy')); // Expect false

// Test 5: Test the getAvailableQuestions function if not all questions are used

// let allQuestions = dataManager.getAllQuestions(data);
// markAsUsedQuestion(allQuestions[0]);
// markAsUsedQuestion(allQuestions[1]);
// markAsUsedQuestion(allQuestions[2]);
// markAsUsedQuestion(allQuestions[3]);
// markAsUsedQuestion(allQuestions[4]);
// console.log(allQuestions);
// console.log(getAvailableQuestions(data));

// Test 6: Test the getAvailableQuestions function if all questions are used
// let allQuestions = dataManager.getAllQuestions(data);
// allQuestions.forEach(question => {
//     markAsUsedQuestion(question);
// });
// console.log(getAvailableQuestions(data)); // Expect an empty array

// Test 7: Check getAv