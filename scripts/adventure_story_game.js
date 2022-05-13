const mainTextElement = document.getElementById('main__adv__text');
const inventoryListElement = document.getElementById('inventory__list');
const choicesElement = document.getElementById('adv__option__buttons');

let inventory_list = {};
let inventory_display = `Inventory: ${inventory_list}`;

function startGame() {
    inventory_list = {};
    inventoryListElement.innerText = inventory_display;
    showNextSituation("beginning");
}

function showNextSituation(goTo) {
    const currentSituation = chapter1[goTo]
    mainTextElement.innerText = currentSituation.situation;
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild)
      }
    

    currentSituation.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        btn.classList.add('adv__button');
        btn.addEventListener('click', () => {
            selectChoice(choice);
        })
        choicesElement.appendChild(btn);
    })
}

function updateInventory(newItem) {
    inventory_list = Object.assign(inventory_list, newItem)
    // inventory_list.push(newItem)
    console.log(inventory_list);
}

function selectChoice(choice) {
    const nextSituation = choice.goTo;
    if (nextSituation == 'end_of_chapter1') {
        return startGame();
    }
    updateInventory(choice.inventory);
    showNextSituation(nextSituation);
}

const chapter1 = {
    beginning: {
        situation: "You wake up in your recliner after a restful nap. As you get up to get  some water you realize this is not your house. You can't remember how you got here and you start to panic.",
        choices:
        [ 
            {
                goTo: 'explore_the_house',
                text: 'Explore the house',
            },
            {
                goTo: 'explore_the_house',
                text: 'Leave the house',
            }
        ]
    },
    explore_the_house: {
        situation: 'The only thing in the kitchen is a small jar of blue goo and a giant bag of berries.',
        choices:
        [
            {
                goTo: 'go_to_merchant',
                text: 'Take goo',
                inventory: {'goo': true}
            },
            {
                goTo: 'go_to_merchant',
                text: 'Take berries',
                inventory: {'berries': true}
            }
        ]

    },
    go_to_merchant: {
        situation: 'Trade merchant for key',
        choices:
        [
            {
                goTo: 'go_on_adventure',
                text: 'Trade goo for key',
                inventory: { 'goo': false, 'key': true}
                
            },
            {
                goTo: 'go_on_adventure',
                text: 'Trade berries for key',
                inventory: { 'berries': false, 'key': true}
                
            },
            {
                goTo: 'go_on_adventure',
                text: "Don't trade"
            }
        ]
    },
    go_on_adventure: {
        situation: 'Go to Merchant',
        choices:
        [
            {
                goTo: 'end_of_chapter1',
                text: 'End'
                
            }
        ]
    }

}
startGame();
