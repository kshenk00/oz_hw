
import { styled } from 'styled-components';
import './App.css'
import Nav from './components/Nav'

function App() {
  

  return (
    //2. Container으로 감싸주기
    <Container>
      <Nav />
      
    </Container>
  )
}

//1.main 페이지 컨테이너 만들기
const Container = styled.main`
position: relative;
display: block;
top: 70px;
padding: 0 calc(3.5vw + 5px);
`

export default App
