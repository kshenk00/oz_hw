//제출 이벤트를 받는다.(이벤트 핸들링)
//제출된 입력값들을 참조한다.
//입력값에 문제가 있는 경우 이를 감지한다. 예) ID가 짧으면 안된다는 부분을 구현해볼것이다.비번2개가 일치하지 않으면 문제가 된다는것을 감지할것.
//해당 문제들이 모두 해결이 되면 가입 환영인사를 제공하는 화면을 구현해보자

const form = document.getElementById("form") //ID가 form인 요소를 선택한다.

form.addEventListener("submit", function(e){ //위에서 제출 이벤트가 발생하면
  e.preventDefault(); //submit이벤트에서 특성 제거필요가 있음. SUBMIT은 제출이 일어나면 새로고침이 일어난다. 그래서 새로고침을 차단하는 기능

  //입력객체를 읽어드릴수 있게 해주는 작업이 필요. e.target.id.value > let userId = e.target.id.value 변수로 저장을 해주는 작업

  let userId = e.target.id.value  //id 부분은 name의 값임.
  let userPw1 = e.target.pw1.value
  let userPw2 = e.target.pw2.value
  let userName = e.target.name.value
  let userPhone = e.target.phone.value
  let userPosition = e.target.position.value
  let userGender = e.target.gender.value
  let userEmail = e.target.email.value
  let userIntro = e.target.intro.value

  console.log(userId, userPw1, userPw2, userName,
    userPhone, userPosition, userGender, userEmail, userIntro) //모든 내용을 연달아서 출력을 한다. 그럼 콘솔에 입력한 모든 내용들이 다 나오는것을 확인 가능

    // 아이디가 너무 짧으면 안된다는 것은 조건으로 해줄수있음. userId.length 문자열의 length는 문자의 갯수이다.
  if(userId.length < 6){
    alert("아이디가 너무 짧습니다. 6자 이상 입력해주세요.")
    return; //return은 함수에서 값을 반환할때 쓰는 키워드인데, 이 부분 외에도 함수를 강제 종료하는 기능도 포함하다. 문제가 발생하면 submit이벤트를 강제 종료할수있음.
            //예를 들어 id,pw둘다 틀려도 하나만 틀렸다하고 종료가 된다.
  }

  if(userPw1 !== userPw2){
    alert("비밀번호가 일치하지 않습니다.")
    return;
  }

    //아무런 문제 없이 통과거 됬을시 가입이 잘 되었다는 환영인사. 그렇기에 위에 쓰여져있는 부분들을 싹 다 삭제해줄 필요가 있음
  document.body.innerHTML = ""  // innerHTML에 쓰여진 코드를 부르는 속성이다. 그래서 여기서는 아무것도 없는 것을 불러오갰다는 의미
  document.write(`<p>${userId}님 환영합니다</p>`)

  /* 과졔:
  회원 가입 시 입력하신 내역은 다음과 같습니다.
  아이디: userId
  이름: userName
  전화번호: userPhone
  원하는직무: userPosition
  
  */
})