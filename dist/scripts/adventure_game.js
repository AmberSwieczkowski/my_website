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
  text: 'You wake up in a strange place and you see a small jar of blue goo and a giant bag of berries near you.',
  options: [
      {
          text: 'Take goo',
          setState: {blueGoo: true},
          nextText: 2
      },
      {
          text: 'Take the berries',
          setState: {berries: true},
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
          text: 'Trade the goo for a rope',
          requiredState: (currentState) => currentState.blueGoo,
          setState: { blueGoo: false, rope: true },
          nextText: 3
      },
      {
          text: 'Trade the berries for a frying pan',
          requiredState: (currentState) => currentState.berries,
          setState: { berries: false, pan: true },
          nextText: 3
      },
      {
          text: 'Sell the berries for cash',
          requiredState: (currentState) => currentState.berries,
          setState: { berries: false, cash: true },
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
  text: 'After leaving the merchant you walk down a tropical dirt road and notice a key on the ground. You pick up the key.',
  options: [
      {
          text: 'Pick up the key and keep walking',
          setState: { key: true },
          nextText: 5
      },
      {
          text: 'Pick up the key and go back to the merchant',
          setState: { key: true },
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
      requiredState: (currentState) => currentState.key,
      setState: { key: false, backpack: true },
      nextText: 5
    },
    {
      text: 'Ignore the kid',
      requiredState: (currentState) => currentState.key,
      setState: { key: false },
      nextText: 5
    }
  ]
},
{
  id: 5,
  text: 'You head further down the tropical dirt road when you come across an old jeep next to a giant mud hut. It starts to rain.',
  options: [
      {
          text: 'Take the jeep',
          requiredState: (currentState) => currentState.key,
          nextText: 6
      },
      {
          text: 'Enter the mud hut',
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
      nextText: 7
    },
    {
      text: 'Keep driving',
      nextText: 8
    }
  ]
},
{
  id: 7,
  text: 'Inside the mud hut you start to get hungry',
  options: [
    {
      text: 'Go hunting',
      nextText: 9
    },
    {
      text: 'Attack it with your sword',
      requiredState: (currentState) => currentState.sword,
      nextText: 9
    }
  ]
},
{
  id: 8,
  text: 'The monster laughed as you hid behind your shield and ate you.',
  options: [
    {
      text: 'Restart',
      nextText: -1
    }
  ]
},
{
  id: 9,
  text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you are voted Defender of the USA and live out the rest of your days ithe whithouse.',
  options: [
    {
      text: 'Congratulations. Play Again.',
      nextText: -1
    }
  ]
}
]
startGame()