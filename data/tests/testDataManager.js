const { getAllLevels, getQuestionsByTopic, getAllTopics, getQuestionsByLevel, getTopicByLevel, validateAnswer }
    = require('../dataManager.js');
const data = require('../data.js');
const test = require("node:test");
const assert = require("node:assert/strict");
const {getAllQuestions, getOptionsForQuestion} = require("../dataManager");

test('getAllLevels', (t) => {
    assert.strictEqual(getAllLevels(data).length, 3);
});

test('getQuestionsByTopic', (t) => {
    assert(getQuestionsByTopic(data, 'Sports').length > 0);
})

test('getAllTopics', (t) => {
    assert(getAllTopics(data).length > 0);
})

test('getQuestionsByLevel', (t) => {
    assert(getQuestionsByLevel(data, 'easy').length > 0);
})

test('getTopicsByLevel', (t) => {
    assert(getTopicByLevel(data, 0).length > 0);
})

test('validateAnswerCorrect', (t) => {
    assert(validateAnswer(data, 'easy', 0, 0, 3) === true);
})

test('validateAnswerIncorrect', (t) => {
    assert(validateAnswer(data, 'easy', 0, 2) === false);
})

test('getAllQuestions', (t) => {
    assert(getAllQuestions(data).length > 0)
})

test('getOptionsForQuestion', (t) => {
    console.log(getOptionsForQuestion(data, 'easy', 0, 0));
    assert(getOptionsForQuestion(data, 'easy', 0, 0).length > 0);
})