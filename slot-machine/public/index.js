const timeout = (delay) => new Promise((res) => setTimeout(res, delay));

window.addEventListener('DOMContentLoaded', () => {

  // Example 5:
  // Slot Machine
  let force;
  let direct = 'up';

  const casino1Element = document.querySelector('#casino1');
  const casino2Element = document.querySelector('#casino2');
  const casino3Element = document.querySelector('#casino3');

  const play = document.getElementById('play');
  const audio = document.getElementById('previewaudio');
  const cheat = document.getElementById('cheat');
  const direction = document.getElementById('direction');


  direction?.addEventListener('change' ,(event)=> {
    direct = event.target.value;
  })

  cheat?.addEventListener('keyup', (event) => {
    force = +event.target.value;
  })

  play?.addEventListener('click', () => {
    playTheGame();
  })

  const playEventCallBack = (event) => {
    console.log('======evetnt=========', event)
  }

  const casino1 = new SlotMachine(casino1Element, {
    active: 0,
    delay: 500,
    direction: 'up'
  });
  const casino2 = new SlotMachine(casino2Element, {
    active: 1,
    delay: 600,
    direction: 'up'
  });
  const casino3 = new SlotMachine(casino3Element, {
    active: 2,
    delay: 700,
    direction: 'up',
    callback: playEventCallBack
  });


 let interval;

  const playAudio = () => {
    audio.src = './slot.wav.wav';
    audio.play();
    // navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
    if(!interval) {
      interval = setInterval(() => {
        navigator.vibrate(20)
      },200)
    }
  }

  const stopAudio = () => {
    setTimeout(() => {
      audio.pause();
      clearInterval(interval);
      interval = null;
    }, 3000);
  }

  const start = () => {
    count = 3;
    playAudio();
    casino1.shuffle(Infinity, force, direct);
    casino2.shuffle(Infinity, force, direct);
    casino3.shuffle(Infinity, force, direct);
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
