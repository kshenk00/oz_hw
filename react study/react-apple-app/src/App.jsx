
import { styled } from 'styled-components';
import './App.css'
import Banner from './components/Banner';
import Nav from './components/Nav'

function App() {
  

  return (
    
    // ④Banner.jsx컴포논트에서 banner 아직 app에서 import 안되어서, import를 해주겠다.
    <Container>
      <Nav />
      <Banner /> 
    </Container>
  )
}

//main 페이지 컨테이너 만들기
const Container = styled.main`
position: relative;
display: block;
top: 70px;
padding: 0 calc(3.5vw + 5px);
`

export default App
