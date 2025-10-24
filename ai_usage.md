# AI Usage Log

This document tracks prompts given to an AI assistant and the corresponding responses.

## Fields
- Prompt: The exact user prompt.
- AI Response: A brief summary or the delivered outcome.
- AI Model: The AI system used.
- Type: Category of interaction (e.g., Agent, Completion, Chat).
- Date: ISO date (YYYY-MM-DD).

## Entries

| Prompt                                                                                                                                                                                                                  | AI Response     | AI Model                           | Type       | Date |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|------------------------------------|------------|---|
| "Style this ai_usage.md file in markdown format"                                                                                                                                                                        | Styled this file into a clean Markdown layout with sections and a tabular log. | GitHub Copilot - GPT-5             | Agent      | 2025-10-18 |
| "Format the links in the external_sources.md to match the harvard referencing style"                                                                                                                                    | Formatted the link to match the Harvard referencing style. | GitHub Copilot - GPT-5             | Agent      | 2025-10-18 |
| "Assess the current implementation logic; without providing the code, suggest ideas for implementation for sorting out used questions, topics, levels. Can the existing logic work if finished" Context: See Appendix B | See Appendix A. | GitHub Copilot - Claude Sonnet 4.5 | Ask (chat) | 2025-10-18 |
| "Help me with the data file structure. But do not porivde any code." Context: See Appendix D.                                                                                                                           | See Appendix C. | Claude Sonnet 4.5                  | Chat       | 2025-10-18 |
| "What's the javascript's euqivalent of python's sleep()?"                                                                                                                                                               | See Appendix E. | Claude Sonnet 4.5                  | Chat       | 2025-10-18 |
| "Help me debug the code. I assume there is a logical error with preserving indices." Context: See Appendix F. | See Appendix G. | Claude Sonnet 4.5                  | Chat       | 2025-10-18 |
| "Where is the logical error? Why am I failing to modularize the loop functions?" Context: See Appendx H.| See Appendix I. | GitHub Copilot (GPT-5 mini)        | Ask (Chat) | 2025-10-18 |



## Appendices

### Appendix A

```md
Assessment of Current Implementation
Issues with Existing Logic
1. checkIfQuestionsExhausted
The logic is inverted — it returns true if it finds any unused question, but the name suggests it should return true when questions are exhausted
The nested loop exits early and doesn't properly check if all questions have been used
2. appendUsedQuestion
Uses the incorrectly-behaving checkIfQuestionsExhausted, so it won't append questions at the right time
The condition logic seems backwards for typical "mark as used" behavior
3. checkUsedTopic vs appendUsedTopic
checkUsedTopic has no return statement for the false case
appendUsedTopic checks if topic is already used, then only appends if topics aren't exhausted — this logic seems inverted
4. checkIfTopicsExhausted
Only checks length equality, which might not be sufficient if topics can be repeated or if the data structure differs
5. General Design
No handling for what happens when questions/topics are truly exhausted (reset? error?)
Arrays use .push() but appendUsedTopic incorrectly uses .append() (not a JS array method)
<hr></hr>
Implementation Ideas
Conceptual Improvements
Track used items correctly:
Maintain a "used" list that grows as items are consumed
Check if an item is in the used list before selecting it
When all items are used, either reset the list or flag exhaustion
Separation of concerns:
checkUsed*: returns boolean if item is already used
markAsUsed*: adds item to used list (simpler than "append")
isExhausted*: checks if used list length equals total available items
getUnused*: returns items not yet used
reset*: clears used list when exhausted
Handle exhaustion gracefully:
Option 1: Auto-reset used lists and start over
Option 2: Throw/return an error state
Option 3: Return a random item even if used (with a flag indicating repetition)
Data structure considerations:
Use Set instead of arrays for O(1) lookup performance
Consider tracking used items per session/quiz instance
Store metadata (timestamps, frequency) for smarter selection
<hr></hr>
Can the Existing Logic Work if Finished?
Short answer: Partially, but it needs significant corrections.
What's salvageable:
The basic concept of tracking used items in arrays
The modular function structure
The check-before-append pattern
What must be fixed:
Reverse the logic in checkIfQuestionsExhausted and appendUsedQuestion
Add proper return statements to checkUsedTopic
Fix .append() to .push() in appendUsedTopic
Rethink the condition logic in appendUsedTopic
Add exhaustion handling (reset or error state)
Recommended approach: Simplify the API to markAsUsed, isUsed, and hasUnused, then build higher-level selection logic on top of those primitives.
```

### Appendix B

```js
let appendUsedQuestion = (question, array, data) => {
    if (checkIfQuestionsExhausted(array, data)) {
        if (!checkUsedQuestion(question, array)) {
            array.push(question);
        }
    }
}

let checkUsedQuestion = (question, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === question) {
            return true;
        }
    }
    return false;
}

let checkIfQuestionsExhausted = (array, data) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (array[i] !== data[j]) {
                return true;
            }
        }
    }
}

let appendUsedTopic = (topic, array, data) => {
    if (checkUsedTopic(topic, array)) {
        if (!checkIfTopicsExhausted(array, data)) {
            array.append(topic);
        }
    }
}

let checkUsedTopic = (topic, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === topic) {
            return true;
        }
    }
}

let checkIfTopicsExhausted = (array, data) => {
    if (array.length === data.length) {
        return true;
    }
}

let appendUsedLevel = (level, array) => {
    array.push(level);
}

module.exports = { appendUsedQuestion, checkUsedQuestion, checkIfQuestionsExhausted, appendUsedTopic, checkUsedTopic, checkIfTopicsExhausted, appendUsedLevel };
```

### Appendix C

```markdown
questions
  ├── easy: [array]
  ├── medium: [array]  
  └── hard: [array]

Each level contains an array of topic objects
```

---

**What you need:**

1. **Access each level** (easy, medium, hard)
2. **Check the length** of that level (how many topic objects)

---

**HINTS:**

**Remember:**
- You recently asked about `Object.keys()`, `Object.entries()` 💡
- Each level (easy/medium/hard) = **an array**
- Arrays have `.length` property

**Logic:**
1. Iterate through levels (`Object.keys(questions)` gives you `["easy", "medium", "hard"]`)
2. For each level → `questions[level]` gives you the array
3. `questions[level].length` gives the number of topics in that level

---

**Pseudocode (not real code):**
```
for each level in questions:
  get topics array = questions[level]
  length = array.length
  print level + length
```

### Appendix D

```js
const questions = {
    easy: [
        {
            topic: "Sports",
            questions: [
                'How long is a marathon?',
                'What term is used in tennis for "40-40"?',
                'What is the score of zero called in tennis?',
                'How many rings are in the Olympic\'s logo?'
            ],
            answers: ['26.2 Miles', 'Deuce', 'Love', '5'],
            options: [
                ["28 Miles", "20 Miles", "27.2 Miles", "26.2 Miles"],
                ["Love", "Tie-Break", "Deuce", "Ace"],
                ["Zero", "Love", "Double Fault", "Nul Points"],
                ["3", "7", "4", "5"]
            ]
        },
```

### Appendix E

**JavaScript doesn't have a direct `sleep()` like Python!**

---

**Python:**
```python
import time
time.sleep(5)  # pauses for 5 seconds
```

**JavaScript equivalent:**

**Option 1: Using `setTimeout()` (callback-based):**
```javascript
setTimeout(() => {
  console.log("After 5 seconds");
}, 5000);
```

**Option 2: Using async/await (modern, cleaner):**
```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage:
await sleep(5000); // pause for 5 seconds
console.log("After 5 seconds");
```

**Option 3: One-liner:**
```javascript
await new Promise(resolve => setTimeout(resolve, 5000));
```

---

**Key difference:**
- **Python's sleep():** Synchronous (blocks everything)
- **JavaScript:** Asynchronous (doesn't block, uses event loop)

**For your quiz app:** If you need delays (e.g., showing answer before next question), use the `async/await` approach.

Need help integrating this into your code? 💪

### Appendix F

```terminal
/Users/raincor/PythonProject/quiz/quiz.js:104 options.forEach((option, index) => console.log(${index+1}. + option)); ^
TypeError: Cannot read properties of undefined (reading 'forEach') at quiz (/Users/raincor/PythonProject/quiz/quiz.js:104:17) at async main (/Users/raincor/PythonProject/main.js:28:17)
Node.js v24.2.0
Process finished with exit code 1
```

```js
const data = require('../data/data.js');
const rl = require('readline-sync');

// Notes
// data structure: questions[level][topic].questions[index] OR questions.levelName[topic].questions[index]

// Module imports
const getRandomNumber = require('./utils/getRNG.js');
const {getAllTopics, getAllLevels, getTopicByLevel, getOptionsForQuestion, validateAnswer, getQuestionsByTopic} = require("../data/dataManager");
const delay = require('./utils/delay.js');
const { markAsUsedQuestion, markAsUsedLevel,
    markAsUsedTopic, validateUsedQuestion, validateUsedLevel,
    validateUsedTopic, checkAllQuestionsUsedForTopic, checkAllQuestionsUsedForLevel, checkAllLevelsUsed,
    usedQuestions, usedLevels, usedTopics} = require('./utils/checkUsed.js');
const {getAvailableQuestions, getAvailableTopics, getAvailableLevels} = require("./utils/checkUsed");

async function quiz() {
    let isRunning = false;
    console.log("Welcome to the quiz!");
    await delay(1000);
    console.clear();
    console.log("Levels!");
    await delay(1000);
    console.clear();
    for (const level of getAllLevels(data)) {
        const index = getAllLevels(data).indexOf(level);
        let funnyPhrases = ["This one!", "And another!", "And yet another!", "And a final one! (No?)"];
        console.log(funnyPhrases[getRandomNumber(0, funnyPhrases.length - 1)]);
        console.log(`${index + 1}. ${level}`);
        await delay(1000);
        console.clear();
    }
    console.log("Topics!");
    await delay(1000);
    console.clear();
    for (const topic of getAllTopics(data)) {
        const index = getAllTopics(data).indexOf(topic);
        let funnyPhrases = ["This one!", "And another!", "And yet another!", "And a final one! (No?)"];
        console.log(funnyPhrases[getRandomNumber(0, funnyPhrases.length - 1)]);
        console.log(`${index + 1}. ${topic}`);
        await delay(1000);
        console.clear();
    }
    console.log("Let's start!");
    await delay(1000);
    console.clear();
    isRunning = true;
    while (isRunning) {
        // check question pool - todo: implement
        let availableLevels = getAvailableLevels(data);
        let currentPlayer = "Player 1"; // placeholder
        // show scores - todo: implement
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
        let availableTopics = getAvailableTopics(data, originalLevelIndex);
        availableTopics.forEach((topic, index) => console.log(`${index+1}. ` + topic));
        let topic = rl.question("Choose a topic: ");
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
        let availableQuestions = getAvailableQuestions(data, level-1, originalTopicIndex);
        let randomQuestionIndex = getRandomNumber(0, availableQuestions.length - 1);
        let randomQuestion = availableQuestions[randomQuestionIndex];
        console.log(randomQuestion);

        // Find the original index in the full questions array
        let allQuestionsForTopic = getQuestionsByTopic(data, selectedTopic);
        let originalQuestionIndex = -1;
        for (let i = 0; i < allQuestionsForTopic.length; i++) {
            if (allQuestionsForTopic[i] === randomQuestion) {
                originalQuestionIndex = i;
                break;
            }
        }

        let options = getOptionsForQuestion(data, availableLevels[originalLevelIndex], originalTopicIndex, originalQuestionIndex);
        console.log(options);
        options.forEach((option, index) => console.log(`${index+1}. ` + option));
        let answer = rl.question("Choose an answer: ");
        answer = parseInt(answer);
        let validate = validateAnswer(data, getAllLevels(data)[originalLevelIndex], originalTopicIndex, originalQuestionIndex, answer-1);

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
};

module.exports = quiz;
```

### Appendix G


The problem is on line 104 where options is undefined. Looking at your code:

```js
let options = getOptionsForQuestion(data, availableLevels[originalLevelIndex], originalTopicIndex, originalQuestionIndex);
```

The issue is here: availableLevels[originalLevelIndex]
You're using originalLevelIndex (which is the index in the full levels array) to access availableLevels (which is the filtered array). This causes an out-of-bounds access.
The Fix:
You should use selectedLevel directly instead:

```js
let options = getOptionsForQuestion(data, selectedLevel, originalTopicIndex, originalQuestionIndex);
```

Similarly, on the validation line:

```js
let validate = validateAnswer(data, selectedLevel, originalTopicIndex, originalQuestionIndex, answer-1);
```

The root cause: You correctly found originalLevelIndex for use with functions that need the original index, but then incorrectly used it to index into the filtered availableLevels array instead of using the selectedLevel string you already extracted.

---

Looking at your output, I can now see the actual problem. When you select level 1 from availableLevels which is ['medium', 'hard'], you get 'medium' (index 0 in the filtered array).
But then you're using level-1 (which is 0) to get available questions:

```js
let availableQuestions = getAvailableQuestions(data, level-1, originalTopicIndex);
```

This level-1 should be originalLevelIndex instead:

```js
let availableQuestions = getAvailableQuestions(data, originalLevelIndex, originalTopicIndex);
```

The issue: You're using the filtered array position (level-1 = 0) instead of the original data position (originalLevelIndex = 1 for 'medium').
The Fix:
Change line 94 from:
```js
let availableQuestions = getAvailableQuestions(data, level-1, originalTopicIndex);
```

to:

```js
let availableQuestions = getAvailableQuestions(data, originalLevelIndex, originalTopicIndex);
```

This ensures you're passing the correct index that corresponds to the actual position in the original data structure.

### Appendix H

#### Console Output

```terminaloutput
[ 'easy', 'medium', 'hard' ]
easy
medium
hard Choose a level: 1 [ 'easy', 'medium', 'hard' ]
easy
medium
hard Choose a level: 1 /Users/raincor/PythonProject/data/dataManager.js:41 data[level].forEach(topicObj => { ^
TypeError: Cannot read properties of undefined (reading 'forEach') at Object.getTopicByLevel (/Users/raincor/PythonProject/data/dataManager.js:41:17) at getAvailableQuestions (/Users/raincor/PythonProject/quiz/utils/checkUsed.js:40:30) at quiz (/Users/raincor/PythonProject/quiz/quiz.js:29:34) at async main (/Users/raincor/PythonProject/main.js:28:17)
Node.js v24.2.0
Process finished with exit code 1
```


#### quiz.js
```js
const data = require('../data/data.js');
const rl = require('readline-sync');

// Notes
// data structure: questions[level][topic].questions[index] OR questions.levelName[topic].questions[index]

// Module imports
const getRandomNumber = require('./utils/getRNG.js');
const {getAllTopics, getAllLevels, getTopicByLevel, getOptionsForQuestion, validateAnswer, getQuestionsByTopic} = require("../data/dataManager");
const delay = require('./utils/delay.js');
const { markAsUsedQuestion, markAsUsedLevel,
    markAsUsedTopic, validateUsedQuestion, validateUsedLevel,
    validateUsedTopic, checkAllQuestionsUsedForTopic, checkAllQuestionsUsedForLevel, checkAllLevelsUsed,
    usedQuestions, usedLevels, usedTopics} = require('./utils/checkUsed.js');
const {getAvailableQuestions, getAvailableTopics, getAvailableLevels} = require("./utils/checkUsed");
const welcomeMessage = require("./functions/welcome");
const levelSelector = require("./functions/levelSelector");
const topicSelector = require("./functions/topicSelector");

async function quiz() {
    let isRunning = false;
    await welcomeMessage();
    isRunning = true;
    while (isRunning) {
        let currentPlayer = "Player 1"; // placeholder
        // show scores - todo: implement
        let [originalLevelIndex, selectedLevel, level] = levelSelector();
        let [originalTopicIndex, selectedTopic, topic] = topicSelector(originalLevelIndex, selectedLevel);

        let availableQuestions = getAvailableQuestions(data, originalLevelIndex, originalTopicIndex);
        let randomQuestionIndex = getRandomNumber(0, availableQuestions.length - 1);
        let randomQuestion = availableQuestions[randomQuestionIndex];
        console.log(randomQuestion);

        // Find the original index in the full questions array
        let allQuestionsForTopic = getQuestionsByTopic(data, selectedTopic);
        let originalQuestionIndex = -1;
        for (let i = 0; i < allQuestionsForTopic.length; i++) {
            if (allQuestionsForTopic[i] === randomQuestion) {
                originalQuestionIndex = i;
                break;
            }
        }

        let options = getOptionsForQuestion(data, selectedLevel, originalTopicIndex, originalQuestionIndex);
        console.log(options);
        options.forEach((option, index) => console.log(`${index+1}. ` + option));
        let answer = rl.question("Choose an answer: ");
        answer = parseInt(answer);
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
};

module.exports = quiz;
```

### Appendix I

The error is caused by incorrect variable assignment when calling levelSelector. This line:
let originalLevelIndex, selectedLevel, level = levelSelector();
only assigns the return value to level — originalLevelIndex and selectedLevel remain undefined. You then pass undefined into getTopicByLevel (via getAvailableQuestions), causing the data[level] lookup to fail.
Fix: use array (or object) destructuring to receive all returned values, and call the correct selector for topic selection (if you intended a separate topic selector).
Brief fix examples for quiz/quiz.js:

```js
// javascript
// If levelSelector returns an array [originalLevelIndex, selectedLevel, level]
const [originalLevelIndex, selectedLevel, level] = levelSelector();

// Then, for topic selection: either a topicSelector or levelSelector used with args
// If you have a separate topicSelector(levelIndex, levelName):
const [originalTopicIndex, selectedTopic, topic] = topicSelector(originalLevelIndex, selectedLevel);

// OR if levelSelector is reused and returns topic info when given level args:
const [originalTopicIndex, selectedTopic, topic] = levelSelector(originalLevelIndex, selectedLevel);
```

Summary: use proper destructuring when a function returns multiple values, and ensure you're calling the intended selector function for topics instead of reusing the level selector with wrong/undefined arguments.
