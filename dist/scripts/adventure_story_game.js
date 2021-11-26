const mainTextElement = document.getElementById('main__adv__text');
const inventoryListElement = document.getElementById('inventory__list');

inventory__list = []
inventory = `Inventory: ${inventory__list}`

function startGame() {
    inventoryListElement.innerText = inventory;
    mainTextElement.innerText = chapter1.beginning.situation;
}

const chapter1 = {
    beginning: {
        situation: "You wake up in your recliner after a restful nap. As you get up to get  some water you realize this is not your house. You can't remember how you got here   and you start to panic.",
        choices:
        [ 
            {
                goTo: 'explore_the_house',
                text: 'Explore the house',
                inventory: 'none'
            },
            {
                goTo: 'leave_the_house',
                text: 'Leave the house',
                inventory: 'none'
            }
        ]
    },
    explore_the_house: {
        situation: 'The only thing in the kitchen is a small jar of blue goo and a giant bag of berries.',
        choices:
        [
            {
                goTo: 'the_merchant',
                text: 'Take goo',
                inventory: 'goo'
            },
            {
                goTo: 'the_merchant',
                text: 'Take berries',
                inventory: 'berries'
            }
        ]

    }

}
startGame();