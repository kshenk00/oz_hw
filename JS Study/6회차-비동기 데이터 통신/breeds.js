//2가지 요청을 해볼것이다: 여러마리를 불러올것이다. 어떤 견종으로 불러올것인지에 대한 요청

const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42" //뒤에 42는 사진의 숫자. 최대 50장까지 불러올수 았다고 사이트 내에 기재되어있다.
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text")
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")
const more = document.getElementById("more")
const tothetop = document.getElementById("tothetop")

const currentDogs = []

//기능 추가해보기
//강아지 사진을 싹 가져오기. 그리고 견종을 가져와서 select에 표시하는것
//1. 페이지가 딱 펼쳐졌을 때 정의하는 방법이 있다. > window.addEventListener: window객체를 load라는 이벤트를 발생시켰을때 내가 어떤 동작을 할지 정의하면 웹페이지가 최초 로드했을 때 처음 할 일을 결정해준다.
//2. 처음 로드 되었을때 처음으로는 강아지 사진 뿌리기로 해보겠음

function displayDogs(item){
  const dogImgDiv = document.createElement("div")
  dogImgDiv.classList.add("flex-item")
  dogImgDiv.innerHTML = `
    <img src=${item}>
  `
  main.appendChild(dogImgDiv)
}

//1.
window.addEventListener("load", function(){

  // 2. 강아지 사진 뿌리기
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", function(){//응답을 받으면 무엇을 할것인지도 같이 적어주기
    const response = JSON.parse(request1.response)//응답이 로드됬을때 응답을 먼저 읽고 객체의 응답을 parse해서 저장을 해준다.
    response.message.forEach(function(item){ // forEach로 모든 기능에다가 한번씩 수행하게 한다. 기능은 함수로.
      currentDogs.push(item) // 그럼 위 const currentDogs = []에 42개의 강아지 사진이 채워진다.
      const dogImgDiv = document.createElement("div")
      dogImgDiv.classList.add("flex-item") //css를 위해 클래스 하나를 추가해준다. flex layout을 위해.
      dogImgDiv.innerHTML = //innerHTML으로 dogImgDiv에 실제 사진을 넣기.
      `<img src=${item}>`//템플릿 리터럴로 소스에서 item을 녹여넣을것이다. 그럼 개별 이미지가 계속 만들어질거다.
    });
  })
  request1.send()

  // 3. 셀렉트에 견종 텍스트 뿌리기
  request2.open("GET", apiAllBreeds)
  request2.addEventListener("load", function(){
    const response = JSON.parse(request2.response)
    Object.keys(response.message).forEach(function(item){ //Object: 데이터 객체 > keys에다가 데이터를 넣게되면 객체의 key값만 모아서 데이터를 받게 된다.
      const option = document.createElement("option")
      option.textContent = item
      option.value = item
      select.appendChild(option)
    });
  })
  request2.send()
})

button.addEventListener("click", function(){
  main.innerHTML = ""
  let filteredDogs = currentDogs.filter(function(item){
    return item.indexOf(input.value) !== -1
  })
  input.value = ""
  filteredDogs.forEach(function(item){
    displayDogs(item)
  });
})

select.addEventListener("change", function(){
  main.innerHTML = ""
  let filteredDogs = currentDogs.filter(function(item){
    return item.indexOf(select.value) !== -1
  })
  
  filteredDogs.forEach(function(item){
    displayDogs(item)
  });
})

more.addEventListener("click", function(){
  // 강아지 사진 더 불러와서 추가하고 뿌리기
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", function(){
    const response = JSON.parse(request1.response)
    response.message.forEach(function(item){
      currentDogs.push(item)
      displayDogs(item)
    });
  })
  request1.send()
})

tothetop.addEventListener("click", function(){
  window.scrollTo({ top: 0 })
})