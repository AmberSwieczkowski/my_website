const textElement = document.getElementById('main__adv__text');
const optionButtonsElement = document.getElementById('adv__option__buttons');

let state = {}

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('adv__button');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo and a bowl of black berries near you.',
        options: [
            {
                text: 'Take goo',
                setState: {blueGoo: true},
                nextText: 2
            },
            {
                text: 'Take the berries',
                setState: {blackBerries: true},
                nextText: 2
            },
            {
                text: 'Leave them both',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant',
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Trade the berries for a frying pan',
                requiredState: (currentState) => currentState.blackBerries,
                setState: { blackBerries: false, pan: true },
                nextText: 3
            },
            {
                text: 'Trade the berries for a rope',
                requiredState: (currentState) => currentState.blackBerries,
                setState: { blackBerries: false, rope: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon an island next to a dangerous looking abandoned treehouse',
        options: [
            {
                text: 'Explore the treehouse',
                nextText: 4
            },
            {
                text: 'Find a tent to sleep in on the island',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the treehouse and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without any money to buy a tent, you break into the nearest shelter and fall asleep. After a few hours of sleep, the owner finds you and has the town guard lock you in a cell.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby treehouse.',
        options: [
          {
            text: 'Explore the treehouse',
            nextText: 7
          }
        ]
      },
      {
        id: 7,
        text: 'While exploring the treehouse you come across a horrible monster in your path.',
        options: [
          {
            text: 'Try to run',
            nextText: 8
          },
          {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
          },
          {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
          },
          {
            text: 'Hit him with your frying pan',
            requiredState: (currentState) => currentState.pan,
            nextText: 10
          },
          {
            text: 'Offer to cook him steak',
            requiredState: (currentState) => currentState.pan,
            nextText: 10
          },
          {
            text: 'Offer to cook him steak',
            requiredState: (currentState) => currentState.pan,
            nextText: 10
          },
          {
            text: 'Throw the blue goo at it',
            requiredState: (currentState) => currentState.blueGoo,
            nextText: 11
          }
        ]
      },
      {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches you.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
              text: 'Restart',
              nextText: -1
            }
          ]
        },
        {
          id: 10,
          text: 'The monster laughed as you hid behind your shield and ate you.',
          options: [
            {
              text: 'Restart',
              nextText: -1
            }
          ]
        },
        {
          id: 11,
          text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you are voted Defender of the USA and live out the rest of your days in the white house.',
          options: [
            {
              text: 'Congratulations. Play Again.',
              nextText: -1
            }
          ]
        }
      ]

startGame()