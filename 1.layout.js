'use strict';

//당근 사이즈 80
// const CATTOY_SIZE=80

//게임 필드 가져오기
const field = document.querySelector('.game__field');

//필드가 있는 위치인 x,y그리고 width와 height
const filedRect = field.getBoundingClientRect();
//그러면 필드의 전체적인 사이즈와 포지션까지 알 수 있다

//벌레와 당근을 생성하고 필드를 추가해줄 함수를 만들자
function initGame() {
  console.log(filedRect);
  //getBoundingClientRect null에러 발생 => html에서 defer 추가

  addItem('carror', 4, 'img/carrot.png');
  addItem('bug', 4, 'img/bug.png');
}

// 아이템 추가할 것을 파라미터로 넘겨줌
// 몇개를 넣을건지, 이미지 경로가 어딨는지
function addItem(className, count, imgPath) {
  //여기서 우리가 할 일은 x1과 y1 그리고 x2y2 값을 알아서 그 사이 값을 랜덤하게 넣어주면 되요
  const x1 = 0;
  const y1 = 0;
  // const x2 = filedRect.width - CATTOY_SIZE;
  // const y2 = filedRect.height - CATTOY_SIZE;
  const x2 = filedRect.width;
  const y2 = filedRect.height;

  //아이템 배치 함수 만들기
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    // img태그 사용해서 아이템을 만들고
    item.setAttribute('class', className);
    //우리가 지정한 클래스 네임(당근과 벌레)
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    //absolute는 서로서로 어디에 들어있든지 상관없이 우리가 지정하는 포지션에 맞게 아이템이 배치되도록 만들어준다

    //우리가 배치할 포지션은
    const x = randomNumber(x1, x2); // x1부터 x2까지 렌덤하게 받아오고 추후에 랜덤함수를 만들거에요
    const y = randomNumber(y1, y2);
    //이렇게 받아온 숫자를 아이템에 있는 style의 left는 픽셀을 적기
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    //스타일에 있는 top을 랜덤하게 받아온 y값에 픽셀로 부여해서
    //우리가 만든 아이템을 추가해볼거에요
    field.appendChild(item);
  }
}

//랜덤함수 지정
//min부터 max사이 숫자를 리턴하는 함수
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
  //이 함수는 min에서 max를 포함시키지 않는 범위에서 랜덤하게 숫자를 리턴
}
initGame();
