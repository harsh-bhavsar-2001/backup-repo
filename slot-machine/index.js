const timeout = (delay) => new Promise((res) => setTimeout(res, delay));

window.addEventListener('DOMContentLoaded', () => {
  // Example 5:
  // Slot Machine
  let count = 0;
  const shuffleButton = document.querySelector('#casinoShuffle');
  const stopButton = document.querySelector('#casinoStop');
  const casino1Element = document.querySelector('#casino1');
  const casino2Element = document.querySelector('#casino2');
  const casino3Element = document.querySelector('#casino3');
  const casino1 = new SlotMachine(casino1Element, {
    active: 0,
    delay: 500,
    direction: 'up'
  });
  const casino2 = new SlotMachine(casino2Element, {
    active: 1,
    delay: 500,
  });
  const casino3 = new SlotMachine(casino3Element, {
    active: 2,
    delay: 500,
    direction: 'up'
  });

  shuffleButton.addEventListener('click', () => {
    count = 3;
    casino1.shuffle(Infinity);
    casino2.shuffle(Infinity);
    casino3.shuffle(Infinity);
  });

  stopButton.addEventListener('click', () => {
    switch (count) {
      case 3:
        casino1.stop(2);
        break;
      case 2:
        casino2.stop(3);
        break;
      case 1:
        casino3.stop(4);
        break;
    }
    count--;
  });

});
