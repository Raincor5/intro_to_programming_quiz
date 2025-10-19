//Easy level section - Displaying topics, questions and available answer options.
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
        {
            topic: "Animals",
            questions: [
                'What is the largest mammal in the world?',
                'How many hearts does an Octopus have?',
                'Which bird can fly backwards?',
                'Which animal has no vocal cords?'
            ],
            answers: ['Blue Whale', '3', 'Hummingbird', 'Giraffe'],
            options: [
                ["African Elephant", "Polar Bear", "Blue Whale", "Rhinoceros"],
                ["1", "4", "3", "2"],
                ["Blue Jay", "Hummingbird", "Cuckoo", "Osprey"],
                ["Sloth", "Sting Ray", "Giraffe", "Zebra"]
            ]
        },
        {
            topic: "Basic Science",
            questions: [
                'What is the only metal that is liquid at room temperature?',
                'How many elements are in the periodic table?',
                'How much of the human body is made out of water?',
                'Roughly, how many times is the Earth bigger than the Moon?'
            ],
            answers: ['Mercury', '118', '60%', '4'],
            options: [
                ["Copper", "Mercury", "Nickel", "Zinc"],
                ["120", "88", "117", "118"],
                ["77%", "60%", "75%", "65%"],
                ["10", "3", "26", "4"]
            ]
        }
    ],


//Medium level section - Displaying topics, questions and available answer options.
    medium: [
        {
            topic: "Politics",
            questions: [
                'How many prime ministers did Britain have in 2022?',
                'How many consecutive terms can a president of Russia have?',
                'Which actor became the 38th Governor of California, USA in 2003?',
                'What year was the British Labour party founded?'
            ],
            answers: ['3', '2', 'Arnold Schwarzenegger', '1900'],
            options: [
                ["3", "2", "1", "4"],
                ["3", "1", "4", "2"],
                ["Tom Hanks", "Bruce Willis", "Arnold Schwarzenegger", "Jack Nicholson"],
                ["1899", "1900", "1872", "1880"]
            ]
        },
        {
            topic: "History",
            questions: [
                'How many years did the 100 Year War last?',
                'The ancient city of Rome was built on how many hills?',
                'What is the name of the first car ever made?',
                'What year was The Berlin Wall torn down?'
            ],
            answers: ['116', '7', 'The Motorwagen', '1989'],
            options: [
                ["100", "101", "116", "120"],
                ["8", "16", "9", "7"],
                ["The Wagonwheel", "The Rambler", "The Motorwagen", "The Standardwagon"],
                ["1989", "1980", "1981", "1986"]
            ]
        },
        {
            topic: "Geography",
            questions: [
                'What country has the most natural lakes?',
                'What is the name of the smallest country in the world?',
                'Which country has 7000 islands?',
                'What is the world\'s smallest ocean?'
            ],
            answers: ['Canada', 'The Vatican City', 'Philippines', 'Arctic Ocean'],
            options: [
                ["Russia", "Sweden", "Norway", "Canada"],
                ["Tuvalu", "The Vatican City", "Liechtenstein", "Malta"],
                ["Cuba", "China", "Philippines", "Japan"],
                ["Southern Ocean", "Indian Ocean", "Arctic Ocean", "Atlantic Ocean"]
            ]
        }
    ],


//Hard level - Displaying topics, questions and available answer options.
    hard: [
        {
            topic: "Advanced Science",
            questions: [
                'Increase in the temperature of an aqueous solution will cause.',
                'Pick out which is not a hormone',
                'Equal currents are passing through very long and straight parallel wires in the same direction. They will..',
                'The law which gives the direction of induced current in the coil is',
                'A converging lens is used to form an image on a screen. When the upper half of the lens is covered by an opaque screen,'
            ],
            answers: [
                'Decrease in molarity',
                'Cytosine',
                'Attract each other',
                "Lenz's law",
                'Intensity of image will decrease'
            ],
            options: [
                ["Decrease in molarity", "Decrease in molality", "Decrease in mole fraction", "Decrease in mass % (w/w)"],
                ["Cytosine", "Glucagon", "Steroid", "Epinephrine"],
                ["Attract each other", "Repel each other", "Lean towards each other", "Neither attract nor repel each other"],
                ["Lenz's law", "Faraday's law", "Ampere's law", "Gauss's law"],
                ["Half the image will disappear", "Complete image will disappear", "Intensity of image will decrease", "Intensity of image will increase"]
            ]
        },
        {
            topic: "Computer Science",
            questions: [
                'Collection of parallel wires that form a pathway to carry address, data and control signals.',
                'Which software is neither open nor freely available?',
                'Which is a non linear data structure?',
                'Karnaugh map is used to',
                'ODBC stands for'
            ],
            answers: [
                'Bus',
                'Proprietary Software',
                'Trees',
                'Reduce Expression',
                'Open DataBase Connection'
            ],
            options: [
                ["Bus", "CMOS", "Processor", "Disk Controllers"],
                ["Free Software", "Proprietary Software", "Shareware", "Open Source"],
                ["Arrays", "Stack", "Trees", "Queue"],
                ["Reduce Expression", "Increase Expression", "Format Expression", "All"],
                ["One Database Connection", "Open DataBase Connection", "Oracle DataBase Connection", "Oracle DataBase Connectivity"]
            ]
        },
        {
            topic: "Mathematics",
            questions: [
                'The conjugate of I-2 is',
                'If A and B are matrices of same order then (AB-BA) is',
                'The function f(x)=|x|, where |x| denotes the modulus function is not differentiable at',
                'Which of the following relation in the set {1,2,3} is symmetric and transitive but not reflexive?',
                'Which of the following x belongs to domain of the greatest integer function f(x)=[x], 0<x<3, is not differentiable'
            ],
            answers: ['-I+2', 'Skew-symmetric', '0', '(1,2)(2,1)', '1 & 2'],
            options: [
                ["I+2", "-2+I", "-2-i", "-I+2"],
                ["Null", "Unit", "Symmetric", "Skew-symmetric"],
                ["0", "1", "2.5", "3"],
                ["(1,2)(2,1)(1,1)", "(1,2)(2,1)", "(2,3)", "(1,2)(2,1)(1,1)(2,2)"],
                ["2 & 3", "1 & 2", "0 & 2", "1 & 3"]
            ]
        }
    ]
};

module.exports = questions;