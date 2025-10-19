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
    for (let i = 0; i < data[level].length; i++) {
        questions.push(data[level][i].questions);
    }
    return questions;
}

let getTopicByLevel = (data, levelIndex) => {
    let topics = [];
    let level = getAllLevels(data)[levelIndex];
    for (let i = 0; i < getAllLevels(data).length; i++) {
        topics.push(data[level][i].topic);
    }
    return topics;
}

let getOptionsForQuestion = (data, level, topic, questionIndex) => {
    return data[level][topic].options[questionIndex];
}

module.exports = { getAllLevels, getQuestionsByTopic, getAllTopics, getQuestionsByLevel, getTopicByLevel, getOptionsForQuestion };