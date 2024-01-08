// 요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
let todoArr = []; //할일배열

//할일추가하기, 할일보여주기, 할일 수정하기, 할일 삭제하기 구현

// displayTodos 함수
// 2. 할일보여주기
function displayTodos(){
  todoList.innerHTML = "" // 원래 써져있던것을 지우고 시작한다. (할일을 추가할때마다, 반복해서 출력이 되어서 필요함. ex) 공부. 공부,밥. 공부,밥,자기
  todoArr.forEach((aTodo) => { //todoArr 배열의 요소 수가 곧 내가 보여줄려할 할일의 수. 그래서 foreach. 그럼 할일을 받아서 처리가 된다.
    const todoItem = document.createElement('li') //추가를 할때는 리스트로 추가를 할것이기에 li를 만들어서 추가한다.
    const todoDelBtn = document.createElement('span') //삭제하겠다는 버튼, span태그를 li에다가 넣어주면 된다.
    todoDelBtn.innerText = 'x'
    todoDelBtn.title = '클릭시 삭제'
    todoItem.innerText = aTodo.todoText
    todoItem.title = '클릭시 완료'
    if(aTodo.todoDone){
      todoItem.classList.add("done")
    }else{
      todoItem.classList.add("yet")
    }
   /* todoItem.classList.add(aTodo.todoDone ? 'done' : 'yet') //css적용을 위해. 상태에 따라 값을 줄지 말지 결정이 필요함. */
    todoItem.appendChild(todoDelBtn)
    
    //5번을 완료하고 해주면된다. 
    todoDelBtn.addEventListener('click', function(){
      handleTodoDelBtnClick(aTodo.todoId)
    })
    
    //todoItem을 클릭했을때
    todoItem.addEventListener('click', function(){
      handleTodoItemClick(aTodo.todoId)
    }) // 4. 위 목록을 클릭을 할때마다 콘솔내 true/false값 바뀌는것 확인 가능함
    todoList.appendChild(todoItem)
  });
}

// handleTodoDelBtnClick 함수
//5. 할일 삭제하기
function handleTodoDelBtnClick(clickedId){
  todoArr = todoArr.filter(function(aTodo){ //filter: 대충 10개의 목록이 있을때 1개를 필터링, 즉 남겨야된다. 클릭된 애만 제외하고 나머지 아이는 남긴다는 뜻.
    return aTodo.todoId !== clickedId //클릭 된것이랑 다르다. 달라야 true. 그래서 필터링해서 남긴다.
  })
  displayTodos()
  saveTodos()
}

// handleTodoItemClick 함수
// 3. 어떤 할일을 클릭을 했을때 아이디를 받아서 그 아이디에 해당하는 아이디만 수정하는 처리를 해줄 것임. > 할일 수정하기
function handleTodoItemClick(clickedId){
  todoArr = todoArr.map(function(aTodo){ //map을 이용해서 클릭한 거에 해당하는 친구만 todoDone의 상태를 바꾼다. //아래 코드를 다 완성을 하고 todoArr =으로 todoArr의 조작 결과를 다시 todoArr에 덮어쓰워준다.
    if(aTodo.todoId === clickedId){// 만약 해당 ID의 값이 클릭된 ID와 같을 경우에는
      return {
        ...aTodo, todoDone : !aTodo, todoDone //기존의 aTodo내용에다가  todoDone을 (!aTodo, todoDone)을 반전시켜서 추가한다. !: true>false, false>true를 뒤집어서 덮어쓴다.
      }
    } else{ //클릭 아이디와 일치하지 않으면 원래상태 그대로 반환한다.
      return aTodo
    }
  })
  displayTodos() //4의 함수가 잘 바뀌는것을 확인을 하고 display todo를 이때도 계속 해주면 된다.
  saveTodos() //6번 부분 완료 후 저장하고 출력하기
}

// saveTodos 함수
// 6. 로컬 저장소에 저장하기
function saveTodos(){
  const todoSting = JSON.stringify(todoArr) //배열의 객체 저장이 필요하기에 JSON.stringify으로 해주기
  localStorage.setItem('myTodos', todoSting)
} //그리고 호출을 위해 할일 추가하기 부분에 넣기

// loadTodos 함수
// 7. 로컬 저장소에서 가져오기. 할일 가져오기
function loadTodos(){
  const myTodos = localStorage.getItem('myTodos') 
  if(myTodos !== null){ //myTodos가 없을 수도 있으니 null이 아닐때만 parse와 display를 한다.
    todoArr = JSON.parse(myTodos)
    displayTodos() //그럼 새로고침을 해도 여전히 목록들이 남아있다.
    }
}
loadTodos()

// 1. 할일 입력 후 제출하면 발생하는 이벤트 핸들링. 할일 추가하기 
todoForm.addEventListener('submit', function(e){
  e.preventDefault()
  const toBeAdded = { //toBeAdded > 작업 할일이라는 데이터가 표현이 되어야되서 객체로 생성을 해야되서 객체 리터럴 사용
    todoText: todoForm.todo.value, //html input내용을 읽어들이다
    todoId: new Date().getTime(), //new Date()할일에 대한 주민등록번호라고 생각을 하면 된다. getTime(): 숫자 정보로 가지게끔
    todoDone: false // 다 하지 않은 상태이기에 false
  }
  todoForm.todo.value = ""
  todoArr.push(toBeAdded) //배열에는 추가가 되나, 없어지지 않는다. 그래서 todoForm.todo.value = ""를 통해서 할일을 추가할때마다 input도 지워지게 해준다.
  displayTodos()
  saveTodos() //6번 부분 완료 후 저장하고 출력하기
})

loadTodos() // 시작할 때 한번만!


//과제:할수있을만큼해서 올리기