const {getAvailableLevels} = require("../utils/checkUsed");
const data = require("../../data/data");
const rl = require("readline-sync");
const {getAllLevels} = require("../../data/dataManager");

let levelSelector =  () => {
    while (true) {
        let availableLevels = getAvailableLevels(data);
        console.log(availableLevels);
        availableLevels.forEach(((level, index) => console.log(`${ index+1 }. ` + level)));
        let level = rl.question("Choose a level: ");
        level = parseInt(level);
        if (level < 1 || level > availableLevels.length || isNaN(level)) {
            console.log("Invalid level selected. Please try again.");
            continue;
        }
        let selectedLevel = availableLevels[level-1];
        let allLevels = getAllLevels(data);
        let originalLevelIndex = -1;
        for (let i = 0; i < allLevels.length; i++) {
            if (allLevels[i] === selectedLevel) {
                originalLevelIndex = i;
                break;
            }
        }
        return [originalLevelIndex, selectedLevel, level];
    }
}

module.exports = levelSelector;