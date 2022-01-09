'use strict';

const CATTOY_SIZE = 80;

//당근과 벌래의 개수를 지정
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const filedRect = field.getBoundingClientRect();

// 스코어 같은 것들을 받아오겠다
//게임 버튼
const gameBtn = document.querySelector('.game__button');
//게임 타이머
const gameTimer = document.querySelector('.game__timer');
//게임 스코어
const gameScore = document.querySelector('.game__score');

//게임의 상태를 기억하는 변수
let started = false; // 게임의 시작여부를 알고있는 변수
let score = 0; // 게임의 스코어를 알고 있는 변수
let timer = undefined; // 타이의 남은 시간을 알고있는 변수
// timer 변수의 경우, 게임이 시작되지 않으면 타이머가 없는 undefined이었다가 게임이 시작되면 타이머가 기억되어야 한다

// 게임 버튼에 클릭하는 함수를 만들자
//클릭이 되면 우리가 등록한 콜백이 호출되도록

// document.addEventListener('DOMContentLoaded', function() {
//   el.addEventListener('click', swapper, false);
// });
gameBtn.addEventListener('click', () => {
  console.log('click');
  //게임이 시작되었다면 게임을 끝내야하고
  // 게임이 끝났다면 다음은 게임을 시작해야한다
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started; // 불리언 값 변경
});

function stopGame() {}
function startGame() {
  // showTimerAndScore() 하고나서 요소가 계속 생성
  // 초기에는 빈 값으로 넣어주자
  // 그렇게되면 새롭게 리셋되면 추가가 된다
  field.innerHTML = '';
  //그 후에 타이머가 시작되면서 점수가 나와야 한다
  // 앞서 선언했던 당근의 개수가 되야한다
  gameScore.innerText = CARROT_COUNT;

  //게임이 시작되었을때 초기화 하도록 변경
  initGame();
  //게임이 시작되면 stop버튼이 보이도록 만들기
  showStopButton();
  //게임이 시작되면 타이머와 스코어가 보이도록
  showTimerAndScore();

  //  gameScore.innerText = CARROT_COUNT를 하고 타이머 실행
  startGameTimer();
}

function showStopButton() {
  const icon = document.querySelector('.fa-play');
  //우리가 사용했던 버튼 아이콘을 가져와서
  //아이콘의 클래스 리스트를 add할거다
  icon.classList.add('fa-stop');
  //그리고 아이콘 클래스 리스트에 fa-play를 없애주고 fa-stop아이콘을 사용할 것
  icon.classList.remove('fa-play');
  //이때 타이머와 스코어는 처음에 보이면 안되서 css에서 display:none추가하면되는데
  //사이즈에 문제가 생길수있으니 visibility:hidden으로 추가할게요
}

function showTimerAndScore() {
  // visibility는 visible로 하도록한다
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {}

function initGame() {
  //개수를 상수로 사용함
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
    const x = randomNumber(x1, x2); // x1부터 x2까지 렌덤하게 받아오고 추후에 랜덤함수를 만들거에요
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
