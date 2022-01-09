'use strict';

const CATTOY_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const filedRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
//팝업에 관련된 것들 받아옴
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpContainer = document.querySelector('.pop-up__container');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  console.log('click');
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function stopGame() {
  //타이머가 먼저 멈춰야!
  stopGameTimer();
  // 버튼 안보이기
  hideGameButton();
  //팝업창 보이기
  showPopUpWithText('Replay?');
  //이때 팝업은 텍스트를 받아서 보여줌
}

function startGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;

  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function showStopButton() {
  const icon = document.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  //게임 버튼의 스타일 변경
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  //startGameTimer에서 타이머를 할당했음
  //clearInterval이용해서 우리가 만든 타이머를 전달
  clearInterval(timer);
  // 중지가 되면 버튼을 없애고 팝업을 보여줘야함
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  //우리가 전달한 text입력
  popUpText.innerText = text;
  // 팝업창 보이기
  popUp.classList.remove('pop-up--hide');
}

function initGame() {
  addItem('carror', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = filedRect.width - CATTOY_SIZE;
  const y2 = filedRect.height - CATTOY_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
