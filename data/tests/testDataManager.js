const { getAllLevels, getQuestionsByTopic, getAllTopics, getQuestionsByLevel, getTopicByLevel } = require('../dataManager.js');
const data = require('../data.js');
const test = require("node:test");
const assert = require("node:assert/strict");

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