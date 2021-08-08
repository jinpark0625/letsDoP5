"use strict";

import audio from "./audio.js";

const playBtn = document.querySelector(".play");

playBtn.addEventListener("click", (playBtn) => {
  audio(playBtn);
  // kinetic.dropBoom();
  introStart();
  musicStart();
});

const main = document.querySelector("main");
const screenWidth = main.getBoundingClientRect().width;
const screenHeight = main.getBoundingClientRect().height;

const colorLists = [
  "#312b4e",
  "#f49924",
  "#eb733a",
  "#776f91",
  "#e2bdb6",
  "#ea999a",
];

// doh
const doh = document.querySelector(".doh");
const dohD = document.querySelector(".doh_d");
const dohO = document.querySelector(".doh_o");
const dohH = document.querySelector(".doh_h");

let dohCount = 0;

const dohIteration = document.querySelector(".doh_iteration");
const dohWidth = dohIteration.getBoundingClientRect().width;
const dohHeight = dohIteration.getBoundingClientRect().height;

// boombox
const boomboxWrap = document.querySelector(".boombox_wrap");
const boombox = document.querySelector("#boombox");
const boomboxShadow = document.querySelector(".boombox_shadow");
const smokeL = document.querySelector(".smokeL");
const smokeR = document.querySelector(".smokeR");
const smokeBackId = document.querySelector("#smoke_back");
const smokeLine = document.querySelector(".smoke_line");
const smokeBack = document.querySelector(".smokeBack");
const soundWave = document.querySelector("#soundWave");

const boomboxBodyParts = document.getElementsByClassName("bodyComponets");

const boomboxAniLists = [
  "boomboxClapFirst",
  "boomboxClapSecond",
  "boomboxClapThird",
  "boomboxClapFourth",
  "boomboxClapFifth",
  "boomboxClapSixth",
  "boomboxClapSeventh",
  "boomboxClapEighth",
  "boomboxClapNineth",
  "boomboxClapTenth",
  "boomboxClapEleventh",
  "boomboxClapTwelfth",
  "boomboxClapThirteenth",
];

// aow

const aow = document.querySelector(".aow");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dropBoombox() {
  await delay(3000);
  return showBoombox();
}

async function intro() {
  await delay(1500);
  return showDoh();
}

async function clap() {
  await delay(1400);
  return clapAnimation();
}

function dohIterate() {
  const repeat = setInterval(() => {
    randomDoh(repeat);
  }, 350);
}

function dohIterateTwo() {
  setTimeout(() => {
    const repeat = setInterval(() => {
      randomDoh(repeat);
    }, 350);
  }, 1000);
}

function introStart() {
  return dropBoombox().then(() => {
    return intro().then(() => {
      clap().then(() => {
        return dohIterate();
      });
    });
  });
}

function musicStart() {
  return aowAnimate();
}

async function aowAnimate() {
  await delay(19000);
  boomboxWrap.style.animation =
    "zoomOut 1.6s forwards cubic-bezier(0.680, -0.550, 0.265, 1.550)";
  aow.style.animation = "zoomIn 1.4s .6s forwards ease-in";
}

function showBoombox() {
  boombox.style.animation = "dropBoombox 1s ease-in forwards";
  boomboxShadow.style.animation = "boombox_shadow .4s .4s forwards ease-in";
  smokeL.style.animation = "smokeL 1.3s .6s forwards ease-out";
  smokeR.style.animation = "smokeR 1.3s .6s forwards ease-out";
  smokeBackId.style.animation = "smokeB .4s .6s forwards ease-in-out";
  smokeLine.style.animation = "smokeLine 1s .6s infinite ease-in-out";
  smokeBack.style.animation = "smokeBackMove 1s .6s infinite ease-in-out";
}

function showDoh() {
  doh.style = "opacity:1";
  soundWave.style.animation = "soundWave .5s forwards ease-in-out";
  dohD.style.animation = "dohD .6s forwards ease-out";
  dohH.style.animation = "dohH .6s forwards ease-out";
  dohO.style.animation = "dohO .6s forwards ease-out";
  for (let i = 0; i < 13; i++) {
    boomboxBodyParts[
      i
    ].style.animation = `${boomboxAniLists[i]} .6s .3s forwards`;
  }
}

function clapAnimation() {
  for (let i = 0; i < boomboxBodyParts.length; i++) {
    boomboxBodyParts[
      i
    ].style.animation = `${boomboxAniLists[i]} 1.03s infinite `;
  }
  // main.style.animation = "changeBg 1s infinite";
  // boomboxWrap.style.animation = "changeBg 1s infinite";
}

let newDurationCount = 0;
let newDuration = 0;
let alter = false;

function randomDoh(repeat) {
  const x1 = 0;
  const y1 = 0;
  const x2 = screenWidth - dohWidth;
  const y2 = screenHeight - dohHeight;
  const x = randomNumber(x1, x2);
  const y = randomNumber(y1, y2);
  const colorRandom = Math.floor(randomNumber(5, 0));

  newDurationCount++;

  switch (newDurationCount) {
    case 1:
      newDuration = 150;
      dohIteration.style.display = "flex";
      break;
    case 2:
      newDuration = 400;
      break;
    case 3:
      newDuration = 150;
      break;
    case 4:
      newDuration = 150;
      break;
    case 5:
      newDuration = 400;
      break;
    case 6:
      newDuration = 150;
      break;
    case 7:
      newDuration = 100;
      break;
    case 8:
      newDuration = 100;
      break;
    case 9:
      alter = true;
      newDurationCount = 0;
      clearInterval(repeat);
      dohIteration.style.display = "none";
      dohIterateTwo();
      break;
    default:
      console.log("what??");
      break;
  }

  dohIteration.animate(
    [
      {
        transform: `translate(${x}px, ${y}px) scale(0.5)`,
        color: `${colorLists[colorRandom]}`,
      },
      {
        transform: `translate(${x}px, ${y}px) scale(1)`,
        opacity: 1,
        color: `${colorLists[colorRandom]}`,
      },
    ],
    {
      duration: newDuration,
      // fill: "forwards",
      fill: "forwards",
      // iterations: 0,
      // direction: "alternate",
    }
  );
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
