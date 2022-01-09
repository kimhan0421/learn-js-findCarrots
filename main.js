'use strict';

const CATTOY_SIZE=80
const CARROT_COUNT = 5
const BUG_COUNT = 5
const GAME_DURATION_SEC = 5 

const field = document.querySelector('.game__field');
const filedRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up')
const popUpText = document.querySelector('.pop-up__message');
const popUpContainer = document.querySelector('.pop-up__container');

let started = false 
let score = 0 
let timer = undefined

//필드의 클릭이 발생하면, onFiledClick함수 호출할 수 있도록 실행
field.addEventListener('click',onFiledClick)
// field.addEventListener('click',(event)=>onFiledClick(event))

  gameBtn.addEventListener('click', () => {
    console.log('click');
    if (started) {
      stopGame();
    } else {
      startGame();
    }
    //삭제해주기
    // started = !started; 
  });
//팝업창에서 다시시작하기 버튼
  popUpContainer.addEventListener('click',()=>{
    //게임 시작하기 함수 호출
    startGame()
    //팝업창 숨기기 함수 호출
    hidePopup()
  })

  //팝업창 함수 생성
  function hidePopup(){
    popUp.classList.add('pop-up--hide');
  }

function stopGame() {
  started = false; //게임 끝 상태
  stopGameTimer()
  hideGameButton()
  showPopUpWithText('Replay?')
}


function startGame() {
  started = true //게임 시작 상테
  field.innerHTML = '' 
  gameScore.innerText = CARROT_COUNT

  initGame(); 
  showStopButton();
  showTimerAndScore();
  startGameTimer()
}

function finishGame(win) {
  //게임에서 이겼는지 아닌지의 인자를 받아와서
  //게임이 끝났다면
  started = false;
  //게임버튼 없애고
  hideGameButton();
  //팝업창 보여주기
  showPopUpWithText(win ? 'WON' : 'LOSE');
}

function showStopButton(){
  //  const icon = document.querySelector('.fa-play');
   const icon = document.querySelector('.fas');
   icon.classList.add('fa-stop');
   icon.classList.remove('fa-play');
 }


function hideGameButton(){
  gameBtn.style.visibility = 'hidden'

}

function showTimerAndScore(){
  gameTimer.style.visibility = 'visible'
  gameScore.style.visibility = 'visible'

}

function startGameTimer(){
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec); 
  timer = setInterval(()=>{
    if(remainingTimeSec<=0){
      clearInterval(timer)
      //타이머의 시간이 끝난다면 타이머 종료해주고 게임을 멈춰야한다
      //파라미터는 캐럿의 개수만큼 스코어의 점수면 이겼다고 표시한다
      finishGame(score === CARROT_COUNT);
      return;
    }
    updateTimerText(--remainingTimeSec); 
  },1000)
}

function stopGameTimer() {
  clearInterval(timer);
}


function updateTimerText(time){
  const minutes = Math.floor(time/60) 
  const seconds = time % 60
  gameTimer.innerHTML = `${minutes}:${seconds}` 
}

function showPopUpWithText(text) {
  popUpText.innerText = text
  popUp.classList.remove('pop-up--hide')

}

function initGame() {
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFiledClick(event){
  //event를 전달받아서, 전달받는것 확인
  // console.log('event', event); 
  //게임이 시작하지 않으면 클릭해도 이벤트가 일어나면 안되서 함수를 나간다
  if(!started){return}

  //타겟으로 당근인지 벌레인지의 기능을 각기 다르게 수행할거다
  const target = event.target 
  //클릭된 타겟인 css셀렉터가 캐럿이 맞으면 
  if(target.matches('.carrot')){
    //당근
    // 필드에서 당근지우고 
    target.remove()
    // 점수 변수 증가
    score++
    //score를 ui에 업데이트
    updateScoreBoard()
    
    //만약에 당근을 모두 클릭하면 게임을 끝내고 싶어요
    if(score===CARROT_COUNT){
    finishGame(true);//게임에서 이김
    }
  }else if(target.matches('.bug')){
    //벌레
    //벌레를 클릭하면 게임을 멈추고싶다
    stopGameTimer()
    //타이머를 멈추고
    finishGame(false)//게임에서 짐
  }

}


function updateScoreBoard(){
  gameScore.innerText = CARROT_COUNT - score;
  // 그런데 우리는 남은 당근의 개수를 보여주고 싶다
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = filedRect.width - CATTOY_SIZE;
  const y2 = filedRect.height - CATTOY_SIZE;

  for(let i=0;i<count;i++){
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1,x2) 
    const y = randomNumber(y1,y2)
    item.style.left=`${x}px`;
    item.style.top=`${y}px`;
    field.appendChild(item)
  }
}

function randomNumber(min,max){
  return Math.random() * (max - min) + min
}




