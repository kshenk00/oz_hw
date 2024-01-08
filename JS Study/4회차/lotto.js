// 요소 선택 및 상수 선언
const todaySpan = document.querySelector("#today")
const numbersDiv = document.querySelector('.numbers')
const drawButton = document.querySelector('#draw')
const resetButton = document.querySelector('#reset')

const lottoNumbers = [] //배열에 랜덤 숫자를 넣기위해 drawButton.addEventListener('click', function(){}을 해주다.
const colors = ['orange', 'skyblue', 'red', 'purple', 'green']

//날짜를 표시해주게 한다.
const today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1
let date = today.getDate()
todaySpan.textContent = `${year}년 ${month}월 ${date}일 `

// paintNumber 함수
function paintNumber(number){
  const eachNumDiv = document.createElement('div')
  eachNumDiv.classList.add('eachnum')
  eachNumDiv.textContent = number //주어진 숫자를 표시해준다
  numbersDiv.appendChild(eachNumDiv) // 숫자가 들어갈 div에 append 해주기
  let colorIndex = Math.floor(number / 10)
  eachNumDiv.style.backgroundColor = colors[colorIndex]
  
}

// 추첨 버튼 클릭 이벤트 핸들링. 클릭을 하면 랜덤숫자 6개가 배열에 추가된다. 1~45까지. 그래서 조건부로 해주기
drawButton.addEventListener('click', function(){
  while(lottoNumbers.length < 6){ //6보다 작으면 6이 될때까지 채우는 작업이 필요하여 while
    let ran = Math.floor(Math.random() * 45) + 1 // 이 배열을 위 const lottoNumbers = []에 추가를 하고 싶을때 push 사용
    if(lottoNumbers.indexOf(ran) === -1){ //반복된 숫자가 나오지 않게 하기 위해 indexOf 사용. indexOf: 이 배열안에 들어있는지 인덱스번호로 확인하는 메소드
      //if(lottoNumbers.indexOf(ran))은 lottoNumbers가 이 랜덤숫자가 있을때는 인덱스번호를, 없을때는 -1을 반환하게 된다.
      //indexOf에서 -1이 반환 됬다는 것은 아직 그 숫자가 들어있지 않다는 뜻
      lottoNumbers.push(ran) //그래서 결과가 -1일때 그때 push하겠다.
      paintNumber(ran) //함수를 만들어서 화면에 보일수 있도록 호출해보기. 위 function paintNumber(number){}를 작성을 해줘야된다.
    }
  }
})

// 다시 버튼 클릭 이벤트 핸들링
resetButton.addEventListener('click', function(){
  lottoNumbers.splice(0, 6) //splice를 사용하여 숫자를 싹 사라지게 하기. (시작하는 인덱스위치-0, 몇개를 지울지-6)
  numbersDiv.innerHTML = "" //다시를 눌렀을때 화면에서도 없애게 해준다.
})



//과제: 추첨 버튼을 누른 후 다시 버튼을 누르지 않는 채 추첨 버튼을 또 눌러도 새롭게 번호가 추첨되도록 기능을 수정해보자!
