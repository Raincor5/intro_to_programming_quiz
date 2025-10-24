const {getAvailableTopics} = require("../utils/checkUsed");
const {getTopicByLevel} = require("../../data/dataManager");
const data = require("../../data/data");
const {question} = require("readline-sync");

let topicSelector =  (originalLevelIndex) => {
    while (true) {
        let availableTopics = getAvailableTopics(data, originalLevelIndex);
        availableTopics.forEach((topic, index) => console.log(`${index+1}. ` + topic));
        let topic = question("Choose a topic: ");
        topic = parseInt(topic);
        if (topic < 1 || topic > availableTopics.length || isNaN(topic)) {
            console.log("Invalid topic selected. Please try again.");
            continue;
        }
        let selectedTopic = availableTopics[topic-1];
        let allTopicsForLevel = getTopicByLevel(data, originalLevelIndex);
        let originalTopicIndex = -1;
        for (let i = 0; i < allTopicsForLevel.length; i++) {
            if (allTopicsForLevel[i] === selectedTopic) {
                originalTopicIndex = i;
                break;
            }
        }
        return [originalTopicIndex, selectedTopic, topic];
    }

}

module.exports = topicSelector;