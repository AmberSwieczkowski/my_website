const textElement = document.getElementById('main__adv__text');
const inventoryElement = document.getElementById('inventory__list');
const optionButtonsElement = document.getElementById('adv__option__buttons');

let state = [];
let inventory__items = [];
let inventory__list = `Inventory: ${state}`;

function startGame() {
  state = [];
  inventory__items = [];
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text;
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
  updateInventory();

}

function updateInventory() {
  inventory__items = [];
  all__items = Object.entries(state)
  for (each__item of all__items) {
    if (each__item[1]) {
      inventory__items.push(each__item[0]);
    }
    console.log(inventory__items);
  }

  inventory__list = `Inventory: ${inventory__items}`;
  inventoryElement.innerText = inventory__list;
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
    text: 'You wake up on a strange island and you see a small jar of blue goo and a giant bag of berries near you.',
    inventory: inventory__list,
    options: [
      {
        text: 'Take goo',
        inventory: 'Blue Goo',
        setState: { "Blue Goo": true },
        nextText: 2
      },
      {
        text: 'Take the berries',
        setState: { "Berries": true },
        nextText: 2
      },
      {
        text: 'Leave them both',
        nextText: 2
      }
    ],
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    inventory: inventory__list,
    options: [
      {
        text: 'Trade the goo for a sword',
        requiredState: (currentState) => currentState["Blue Goo"],
        inventory: 'Sword',
        setState: { "Blue Goo": false, "Sword": true },
        nextText: 3
      },
      {
        text: 'Trade the goo for a rope',
        requiredState: (currentState) => currentState["Blue Goo"],
        setState: { "Blue Goo": false, "Rope": true },
        nextText: 3
      },
      {
        text: 'Trade the berries for a frying pan',
        requiredState: (currentState) => currentState["Berries"],
        setState: { "Berries": false, "Pan": true },
        nextText: 3
      },
      {
        text: 'Sell the berries for cash',
        requiredState: (currentState) => currentState["Berries"],
        setState: { "Berries": false, "Cash": true },
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
    text: 'After leaving the merchant you follow a beaten path and notice a key on the ground.',
    options: [
      {
        text: 'Pick up the key and keep walking',
        setState: { "Key": true },
        nextText: 5
      },
      {
        text: 'Pick up the key and go back to the merchant',
        setState: { "Key": true },
        nextText: 4
      },
      {
        text: 'Leave the key',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'You return to where you were but strangely everything seems unfamiliar. A kid runs up to you and urgently tries to trade you his backpack for the key.',
    options: [
      {
        text: 'Trade the kid',
        requiredState: (currentState) => currentState["Key"],
        setState: { "Key": false, "Backpack": true },
        nextText: 5
      },
      {
        text: 'Ignore the kid',
        requiredState: (currentState) => currentState["Key"],
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'You head further down the road when you come across an old jeep next to a small hut. It starts to rain.',
    options: [
      {
        text: 'Take the jeep',
        requiredState: (currentState) => currentState["Key"],
        nextText: 6
      },
      {
        text: 'Enter the hut',
        nextText: 7
      },
      {
        text: 'Keep walking',
        nextText: 8
      }
    ]
  },
  {
    id: 6,
    text: 'You turn down a freshly paved road. The rain quickly picks up and becomes so strong that you can barely see the road in front of you. You slow down and notice a small cave to your right.',
    options: [
      {
        text: 'Take shelter in the cave',
        nextText: 9
      },
      {
        text: 'Keep driving',
        nextText: 10
      }
    ]
  },
  {
    id: 7,
    text: 'The floor of the hut is quicksand and you sink quickly to your death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'You are struck by lightening and turn into to dust.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'A family of bears live in the cave. They tie you up and roast you over the fire for dinner.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The rain disappears as quickly as it came. You notice the road dead ends at a giant fortified castle. You park the jeep behind a tree.',
    options: [
      {
        text: 'Wait in the jeep',
        nextText: 11
      },
      {
        text: 'Walk through the front door',
        nextText: 13
      },
      {
        text: 'Sneak in a side door',
        nextText: 12
      }
    ]
  },
  {
    id: 11,
    text: 'The jeep was hit by a rocket launcher.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'You step on a land mine and explode.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 13,
    text: 'The servants recognize you as the reigning monarch and you live the rest of your life ruling over the island!',
    options: [
      {
        text: 'Congratulations! Play again.',
        nextText: -1
      }
    ]
  }
]
startGame()
