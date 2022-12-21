const timeout = (delay) => new Promise((res) => setTimeout(res, delay));

window.addEventListener('DOMContentLoaded', () => {
  // Example 1:
  // Travel to...
  // const planeMachineElement = document.querySelector('#planeMachine');
  // const planeMachine = new SlotMachine(planeMachineElement, {
  //   active: 1,
  //   delay: 450,
  //   randomize() {
  //     return this.nextIndex;
  //   },
  // });

  // (async function runPlaneMachine() {
  //   await planeMachine.shuffle(5)
  //   await timeout(1000);
  //   runPlaneMachine();
  // })();

  // Example 2:
  // Randomize
  // const randomizeButton = document.querySelector('#randomizeButton');
  // const slotMachineResults = [
  //   document.querySelector('#machine0Result'),
  //   document.querySelector('#machine1Result'),
  //   document.querySelector('#machine2Result'),
  // ];
  // const slotMachineContainers = [
  //   document.querySelector('#machine0'),
  //   document.querySelector('#machine1'),
  //   document.querySelector('#machine2'),
  // ];
  // const slotMachines = slotMachineContainers.map(
  //   (element, index) => new SlotMachine(element, { active: index }),
  // );

  // function onComplete() {
  //   const index = this.element.id.replace(/[a-z]/g, '');

  //   slotMachineResults[index].innerText = `Index: ${this.active}`;
  // }

  // randomizeButton.addEventListener('click', () => {
  //   slotMachines[0].shuffle(5, onComplete);
  //   setTimeout(() => slotMachines[1].shuffle(5, onComplete), 500);
  //   setTimeout(() => slotMachines[2].shuffle(5, onComplete), 1000);
  // });

  // Example 3:
  // Watch
  // const direction = 'down';
  // const watchSwitchButton = document.querySelector('#watchBtnSwitch');
  // const watchNextButton = document.querySelector('#watchBtnNext');
  // const watchPrevButton = document.querySelector('#watchBtnPrev');
  // const watchElement = document.querySelector('#watchContainer');
  // const watch = new SlotMachine(watchElement, {
  //   direction,
  // });

  // watchSwitchButton.addEventListener('click', () => watch.setOptions({
  //   direction: watch.options.direction === 'up' ? 'down' : 'up'
  // }));
  // watchPrevButton.addEventListener('click', () => watch.prev());
  // watchNextButton.addEventListener('click', () => watch.next());

  // Example 4:
  // Triky
  // const trikyButton = document.querySelector('#trikyShuffle');
  // const trikyElement = document.querySelector('#triky1');
  // const triky = new SlotMachine(trikyElement, {
  //   randomize() {
  //     return 0;
  //   },
  // });

  // trikyButton.addEventListener('click', () => triky.shuffle(5));

  // Example 5:
  // Slot Machine
  let count = 0;
  let force;
  const shuffleButton = document.querySelector('#casinoShuffle');
  const stopButton = document.querySelector('#casinoStop');
  const casino1Element = document.querySelector('#casino1');
  const casino2Element = document.querySelector('#casino2');
  const casino3Element = document.querySelector('#casino3');

  const play = document.getElementById('play');
  const audio = document.getElementById('previewaudio');
  const cheat = document.getElementById('cheat');

  cheat?.addEventListener('keyup', (event) => {
    force = +event.target.value;
  })

  play?.addEventListener('click', () => {
    playTheGame();
  })

  const casino1 = new SlotMachine(casino1Element, {
    active: 0,
    delay: 500,
    direction: 'up'
  });
  const casino2 = new SlotMachine(casino2Element, {
    active: 1,
    delay: 600,
  });
  const casino3 = new SlotMachine(casino3Element, {
    active: 2,
    delay: 700,
    direction: 'up'
  });


  const playAudio = () => {
    audio.src = './slot.wav.wav';
    audio.play();

    // var audio_file = new Audio('./slot.wav.wav')
    // audio_file.addEventListener('timeupdate', function () {
    //   var buffer = 0.94
    //   if (this.currentTime > this.duration - buffer) {
    //     this.currentTime = 0;
    //     audio_file.play()
    //   }
    // });
  }

  const stopAudio = () => {
    setTimeout(() => {

      audio.pause();
    }, 3000);
  }

  const start = () => {
    count = 3;
    playAudio();
    casino1.shuffle(Infinity, force);
    casino2.shuffle(Infinity, force);
    casino3.shuffle(Infinity, force);
  };

  const stop = () => {
    setTimeout(() => {

      for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
          switch (i) {
            case 1:
              casino1.stop(3);
              break;
            case 2:
              casino2.stop(4);
              break;
            case 3:
              casino3.stop(5);

              stopAudio();

              break;
          }
        }, 1000 * i)
      }
    });
  };

  const playTheGame = () => {
    start();

    setTimeout(() => {
      stop();
    }, 1000)
  }
});
