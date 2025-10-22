const data = require('./data.js');


let getAllLevels = (data) => {
    return Object.keys(data);
}

let getQuestionsByTopic = (data, topic) => {
    let levels = getAllLevels(data);
    for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < data[levels[i]].length; j++) {
            if (data[levels[i]][j].topic === topic) {
                return data[levels[i]][j].questions;
            }
        }
    }
}

let getAllTopics = (data) => {
    let levels = getAllLevels(data);
    let topics = [];
    for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < data[levels[i]].length; j++) {
            topics.push(data[levels[i]][j].topic);
        }
    }
    return topics;
}

let getQuestionsByLevel = (data, level) => {
    let questions = [];
    for (let i = 0; i < getAllLevels(data).length; i++) {
        data[level][i].questions.forEach(question => questions.push(question));
    }
    return questions;
}

let getTopicByLevel = (data, levelIndex) => {
    let topics = [];
    let level = getAllLevels(data)[levelIndex];
    data[level].forEach(topicObj => {
        topics.push(topicObj.topic)
    });
    return topics;
}

let getOptionsForQuestion = (data, level, topic, questionIndex) => {
    return data[level][topic].options[questionIndex];
}

let getAnswersForQuestion = (data, level, topic, questionIndex) => {
    return data[level][topic].answers[questionIndex];
}

let validateAnswer = (data, level, topic, questionIndex, answerIndex) => {
    return getAnswersForQuestion(data, level, topic, questionIndex) === getOptionsForQuestion(data, level, topic, questionIndex)[answerIndex];
}

let getAllQuestions = (data) => {
    let levels = getAllLevels(data);
    let questions = [];
    for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < data[levels[i]].length; j++) {
            data[levels[i]][j].questions.forEach(question => questions.push(question));
        }
    }
    return questions;
}

module.exports = { getAllLevels, getQuestionsByTopic, getAllTopics, getQuestionsByLevel, getTopicByLevel,
    getOptionsForQuestion, validateAnswer, getAllQuestions };