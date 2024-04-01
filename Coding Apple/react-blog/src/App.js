import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  // 변수 만들어서 서버에서 가져왔다고 가정하고 진행해보기. 이렇게 변수 만들어주기. 그럼 post를 입력할때마다 '강남..' 내용이 보일거다.
  let post = '강남 우동 맛집'
  //h3 블로그 그 제목에 post 내용을 넣기 위해서 <h3> { } </h3> 대괄호를 이용해주면 된다. 

  //잠시 자료 저장을 위한 state
  let [title, setTitle] = useState(['맛집 추천', '카페 추천', '과자 추천']);

  return (
    <div className="App">
      
      {/* 상단메뉴 만들기 */}
      <div className="black-nav">
        <h4 style={ { color : 'skyblue', fontSize : '17px' }}>나의 블로그</h4>
      </div>

      <div className='list'> 
        <h4> { title[0] } </h4>
        <p>4월 2일 발행</p>
      </div>

      <div className='list'> 
        <h4> { title[1] } </h4>
        <p>4월 2일 발행</p>
      </div>

      <div className='list'> 
        <h4> { title[2] } </h4>
        <p>4월 2일 발행</p>
      </div>


    
      
    </div>
  );
}

export default App;
