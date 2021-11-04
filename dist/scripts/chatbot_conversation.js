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
        text: "But if we become friends, I'll let you call me Claudius.",
        next: 3
    },
    3: {
        text: "I'm here to either judge or help you.",
        options: [
            {
                text: "<strong>Judge</strong> me if you can",
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
        text: 'You are very attractive.',
        next: 6
    },
    5: {
        text: 'Go to the river at midnight and there will be a bag under the big oak tree with everything you need to improve yourself.',
        next: 6
    },
    6: {
        text: 'It\'s my bedtime now. Goodnight!',
        options: [
            {
                text: "<strong>Wait</strong> come back",
                url: "./index.html"
            },
            {
                text: "Self-Destruct",
                url: "./index.html"
            }
        ]
    }
};
