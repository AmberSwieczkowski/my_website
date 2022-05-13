/* The chat const defines the Peekobot conversation.
 * 
 * It should be an object with numerical property names, and each property is an entry
 * in the conversation.
 * 
 * A conversation entry should have:
 *  - A "text" property that is what the chatbot says at this point in the conversation
 *  - Either:
 *     - A "next" property, which defines the next chat entry by stating a numerical key
 *       of the chat object and is used when the chatbot needs to say several things
 *       without input from the user
 *    OR
 *     - An "options" property that defines the choices a user can take this is an
 *       array of option objects
 * 
 * An options object should have:
 *  - a "text" property that is the label for the user's choice
 *  AND EITHER
 *  - a "next" property that defines the next chat entry by stating a numerical key of
 *    the chat object and is used when the user selects this option
 *  OR
 *  - a "url" property that defines a link for the user to be taken to
 */
const chat = {
    1: {
        text: 'Hi! My name is Doctor Professor Sir Captain Claudimuffis. Click the orange bubble to begin.',
        options: [
            {
                text: 'Hello!',
                next: 2
            }
        ]
    },
    2: {
        text: "Not too fast there... If we become friends, I'll let you call me Claudius.",
        next: 3
    },
    3: {
        text: "I'm here to either judge or help you.",
        options: [
            {
                text: "<strong>Judge</strong> me if you can.",
                next: 4
            },
            {
                text: "I need serious <strong>Help</strong>",
                next: 5
            },
            {
                text: "<strong>Idk dude</strong>, that's why I came to you...",
                next: 5
            }
        ]
    },
    4: {
        text: 'You need a challenge and an adventure.',
        options: [
            {
                text: 'Take the challenge.',
                url: '/projects/adventure_game.html'
            },
            {
                text: 'Go on an adventure.',
                url: '/projects/adventure_game.html'
            }
        ]
    },
    5: {
        text: 'Go to the river just before sunrise and sit under the giant fruit tree. Further instructions will be given to you there. Do you understand?',
        options: [
            {
                text: 'Yes, of course.',
                next: 6
            },
            {
                text: 'Which river?',
                next: 7
            },
            {
                text: 'Which tree?',
                next: 7
            },
            {
                text: 'I don\'t need your help, thank you very much...',
                next: 4
            }
        ]
    },
    6: {
        text: 'It\'s my bedtime now. Goodnight!',
        options: [
            {
                text: "<strong>Wait</strong> come back. I love you!",
                url: "/claudius.html"
            },
            {
                text: "Self-Destruct",
                url: "./index.html"
            }
        ]
    },
    7: {
        text: 'There is a sparkling river that brings life. Follow it East until you find the oldest tree. You will recognize it by its wisdom. Your potential will be waiting for you at sunrise.',
        next: 6
    }
};
