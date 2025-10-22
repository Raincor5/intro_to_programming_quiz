const dataManager = require("../../data/dataManager");

let usedLevels = [];
let usedQuestions = [];
let usedTopics = [];

let markAsUsedQuestion = (question) => {usedQuestions.push(question)};
let markAsUsedLevel = (level) => {usedLevels.push(level)};
let markAsUsedTopic = (topic) => {usedTopics.push(topic)};

let validateUsedQuestion = (question) => {
    return usedQuestions.includes(question);
}

let validateUsedLevel = (level) => {
    return usedLevels.includes(level);
};

let validateUsedTopic = (topic) => {
    return usedTopics.includes(topic);
};

let checkAllQuestionsUsedForTopic = (data, topic) => {
    let allTopicQuestions = dataManager.getQuestionsByTopic(data, topic);
    return allTopicQuestions.every(question => usedQuestions.includes(question));
};

let checkAllQuestionsUsedForLevel = (data, level) => {
    let allLevelQuestions = dataManager.getQuestionsByLevel(data, level);
    return allLevelQuestions.every(question => usedQuestions.includes(question));
};

let checkAllLevelsUsed = (data) => {
    let allLevels = dataManager.getAllLevels(data);
    return allLevels.every(level => usedLevels.includes(level));
};

let getAvailableQuestions = (data, levelIndex, topicIndex) => {
    let level = dataManager.getAllLevels(data)[levelIndex];
    let topics = dataManager.getTopicByLevel(data, levelIndex);
    let topicQuestions = dataManager.getQuestionsByTopic(data, topics[topicIndex]);

    let availableQuestions = [];
    topicQuestions.forEach(question => {
        if (!usedQuestions.includes(question)) {
            availableQuestions.push(question);
        }
    });
    return availableQuestions;
};


let getAvailableTopics = (data, levelIndex) => {
    let allTopics = dataManager.getTopicByLevel(data, levelIndex);
    let availableTopics = [];

    for (let i = 0; i < allTopics.length; i++) {
        let topicQuestions = dataManager.getQuestionsByTopic(data, allTopics[i]);
        let hasAvailableQuestions = false;

        for (let j = 0; j < topicQuestions.length; j++) {
            if (!usedQuestions.includes(topicQuestions[j])) {
                hasAvailableQuestions = true;
                break;
            }
        }

        if (hasAvailableQuestions) {
            availableTopics.push(allTopics[i]);
        }
    }
    return availableTopics;
}



let getAvailableLevels = (data) => {
    let allLevels = dataManager.getAllLevels(data);
    let availableLevels = [];

    for (let i = 0; i < allLevels.length; i++) {
        let levelTopics = dataManager.getTopicByLevel(data, i);
        let availableTopics = getAvailableTopics(data, i);

        // Check if at least one topic is available for this level
        if (availableTopics.length > 0) {
            availableLevels.push(allLevels[i]);
        }
    }
    return availableLevels;
}


module.exports = {markAsUsedQuestion, markAsUsedLevel, markAsUsedTopic, validateUsedQuestion, validateUsedLevel,
    validateUsedTopic, checkAllQuestionsUsedForTopic, checkAllQuestionsUsedForLevel, checkAllLevelsUsed,
    getAvailableQuestions, getAvailableTopics, getAvailableLevels};

