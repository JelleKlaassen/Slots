'use strict';

var tempArray,shouldPlay,audioInterval;

shouldPlay = false;

function SlotMachine(container, reels, callback, options) {

  const sSound = new Audio();
  sSound.src = './sounds/reelsBegin1.mp3';

  const self = this;

  const REEL_SEGMENT_TOTAL = 24;

  const defaults = {
    reelHeight: 1200,
    reelWidth:  144,
    reelOffset: 20,
    slotYAxis: 20,
    animSpeed:  1000,
    sounds: {
      reelsBegin: null,
      reelsEnd: null
    },
    rngFunc: function() {

      return Math.random();
    },
  };

  (function() {
    self.options = Object.assign(defaults, options);

    if (reels.length > 0) {
      initGame();
    } else {
      throw new Error('Failed to initialize (missing reels)');
    }
  })();

  function initGame() {
    createDisplayElm();
    createSlotElm();
  }

  function createDisplayElm() {
    const div = document.createElement('div');
    div.classList.add('display');

    for (let i = 0; i < reels.length; i++) {
      const elm = document.createElement('div');
      elm.style.transform = `rotateY(${self.options.slotYAxis}deg)`;
      elm.classList.add('reel');

      div.appendChild(elm);
    }

    container.appendChild(div);
  }

  function createSlotElm() {
    const div = document.createElement('div');
    div.classList.add('slots');

    reels.forEach(reel => {
      const elm = createReelElm(reel, reel.symbols[0].position);

      div.appendChild(elm);
    });

    container.appendChild(div);
  }

  function createReelElm(config, startPos = 0) {
    const div = document.createElement('div');
    div.style.transform = `rotateY(${self.options.slotYAxis}deg)`;
    div.classList.add('reel');

    const elm = createStripElm(config, config.symbols[0].position);

    config['element'] = elm;

    div.appendChild(elm);

    return div;
  }

  function createStripElm(config, startPos = 0) {
    const stripHeight = getStripHeight();
    const stripWidth  = getStripWidth();

    const segmentDeg = 360 / REEL_SEGMENT_TOTAL;

    const transZ = Math.trunc(
      Math.tan(90 / Math.PI - segmentDeg) * (stripHeight * 0.5) * 4
    );

    const marginTop = transZ + stripHeight / 2;

    const ul = document.createElement('ul');
    ul.style.height    = stripHeight + 'px';
    ul.style.marginTop = marginTop   + 'px';
    ul.style.width     = stripWidth  + 'px';
    ul.classList.add('strip');

    for (let i = 0; i < REEL_SEGMENT_TOTAL; i++) {
      const li = document.createElement('li');
      li.append(i.toString());

      const imgPosY = getImagePosY(i, startPos);
      const rotateX = (REEL_SEGMENT_TOTAL * segmentDeg) - (i * segmentDeg);

      li.style.background = `url(${config.imageSrc}) -10px ${imgPosY}px`;
      li.style.height     = stripHeight + 'px';
      li.style.width      = stripWidth +36+ 'px';
      li.style.transform  = `rotateX(${rotateX}deg) translateZ(${transZ}px)`;

      ul.appendChild(li);
    }

    return ul;
  }

  function selectRandSymbol(symbols) {
    let totalWeight = 0;

    const symbolTotal = symbols.length;

    for (let i = 0; i < symbolTotal; i++) {
      const symbol = symbols[i];
      const weight = symbol.weight;

      totalWeight += weight;
    }

    let randNum = getRandom() * totalWeight;

    for (let j = 0; j < symbolTotal; j++) {
      const symbol = symbols[j];
      const weight = symbol.weight;

      if (randNum < weight) {
        return symbol;
      }

      randNum -= weight;
    }
  }

  function spinReels() {
    const payLine = [];

    if (callback) {

      payLine.push = function() {
        Array.prototype.push.apply(this, arguments);

        if (payLine.length === reels.length) {
          const timer = window.setTimeout(() => {
            self.isAnimating = false;

            callback(payLine);

            window.clearTimeout(timer);
          }, self.options.animSpeed);
        }
      };
    }

    playSound(self.options.sounds.reelsBegin);
    tempArray = [];
    reels.forEach(reel => {

      const selected = selectRandSymbol(reel.symbols);
      const startPos = selected.position;

      tempArray.push(selected);

      const elm = reel.element;
      elm.classList.remove('stop');
      elm.classList.toggle('spin');
      sSound.play();

      elm.childNodes.forEach((li, index) => {
        li.style.backgroundPositionY = getImagePosY(index, startPos) + 'px';
      });

      const timer = window.setTimeout(() => {
        elm.classList.replace('spin', 'stop');

        playSound(self.options.sounds.reelsEnd);

        payLine.push(selected);

        window.clearTimeout(timer);
      }, self.options.animSpeed * getRandomInt(1, 4));
    });
  }

  function getRandom() {
    return self.options.rngFunc();
  }

  function getRandomInt(min = 1, max = 10) {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);

    return Math.floor(getRandom() * (Math.floor(maxNum) - minNum)) + minNum;
  }

  function getImagePosY(index, position) {
    return -Math.abs(
      (getStripHeight() * index) + (position - self.options.reelOffset)
    );
  }

  function getStripHeight() {
    return self.options.reelHeight / REEL_SEGMENT_TOTAL;
  }

  function getStripWidth() {
    return self.options.reelWidth;
  }

  function playSound(url) {
    if (url) {
      const audio = new Audio();
      audio.src = url;
      audio.onerror = () => console.warn(`Failed to load audio: ${url}`);
      audio.play();

    }
  }

  function spinLoop() {

    if (document.querySelectorAll(".strip")[0].classList.contains("spin") || document.querySelectorAll(".strip")[1].classList.contains("spin") || document.querySelectorAll(".strip")[2].classList.contains("spin") || document.querySelectorAll(".strip")[3].classList.contains("spin") || document.querySelectorAll(".strip")[4].classList.contains("spin")) {
      shouldPlay = true;
    } else {
      shouldPlay = false;
      sSound.pause();
    }
    if (shouldPlay == true) {sSound.load();sSound.play()} else {sSound.pause()};
  }
  function stopLoop() {
    if (!document.querySelectorAll(".strip")[0].classList.contains("spin") && !document.querySelectorAll(".strip")[1].classList.contains("spin") && !document.querySelectorAll(".strip")[2].classList.contains("spin") && !document.querySelectorAll(".strip")[3].classList.contains("spin") && !document.querySelectorAll(".strip")[4].classList.contains("spin")) {
      shouldPlay = false;
      sSound.load();
    }
  }
  window.setInterval(spinLoop,1222);
  window.setInterval(stopLoop,100);

  function dispatch(func) {
    if (!self.isAnimating) {
      self.isAnimating = true;

      func.call(self);
    }
  }

  this.play = function() {
    dispatch(spinReels);
  };
}

window.slotMachine = function(container, reels, callback, options) {
  return new SlotMachine(container, reels, callback, options);
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SlotMachine;
}