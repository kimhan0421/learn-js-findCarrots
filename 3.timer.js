'use strict';

const CATTOY_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
//게임을 얼마나 오랫동안 할 건지 정의
// 초 단위로 만들어서 우선 5초로
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const filedRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

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

function stopGame() {}
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

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  //나중에 타이머를 이용해서 중지해야하기때문에 지역변수가 아니라 전역변수로 지정했다
  // setinterval함수를 이용해서 콜백함수로
  //1초동안 함수를 부르면서 업데이트하자
  // 더불어 남아있는 시간동안 인터벌이 발생할 수 있도록 만들어야함
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec); // 시작하기 전에 업데이트를 해줘야 함
  // 5초부터 시작해서 하나하나 줄어들 수 있도록
  timer = setInterval(() => {
    //인터벌이 1초마다 불려질때
    //만약 남아있는 시간이 0초보다 작거나 같다면
    if (remainingTimeSec <= 0) {
      //인터벌 중지
      clearInterval(timer);
      return;
    }
    //게임이 진행중이라면 똑같이
    updateTimerText(--remainingTimeSec); //하나씩 줄어들어야 함
  }, 1000);
}

function updateTimerText(time) {
  //지정된 초가 들어오면
  const minutes = Math.floor(time / 60); // 시간을 분단위로
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`; //시간 보이기
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
