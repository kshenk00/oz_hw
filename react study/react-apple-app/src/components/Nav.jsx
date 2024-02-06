import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Nav = () => {

  //1.Nav bar 색상바꿔주기
  const [show, setShow] = useState("false");

    //2 함수 만들어주기. 
  const listener = () => {
    if (window.scrollY > 50) {
      setShow("true");
    } else {
      setShow("false");
    }
  }

  //3.위 함수가 scroll이 발생했을때 일어나게 하기 위해. 등록은 컴포넌트가 마운트 되었을때 한번 해주면된다
  //한번만 해주면 된기에 빈걸로 해주다
  useEffect(() => {
    window.addEventListener('scroll', listener); //scroll 이벤트가 발생했을때 lister함수를 등록
    return () => { //이 컴포넌트가 더이상 사용이 되지 않으면
      window.removeEventListener('scroll', listener);
    }
  }, [])



  return (
    //4. 내부 wrapper에 props내려주기. show={show}을 해주면 show가 트루 아니면 false
    <NavWrapper show={show}>
        <Logo>
          <img alt="logo" 
          src="/images/apple-logo.png" 
          
          //↓애플로고를 누를시 새로고침된다
          onClick={() => window.location.href = '/'}  /> 
        </Logo>
     </NavWrapper>
  )
}

//애플티비 로고
const Logo = styled.a`
  padding: 0;
  width: 70px;
  font-size: 0;
  display: inline-block;
  margin-bottom: 10px;

  img{
    display: block;
    width: 100%;
  }
`

//상단 검정색 바
//5. background컬라에 추가해주기
const NavWrapper = styled.nav`
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: ${props => props.show === 'true' ? '#000000' : '#000000'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`

export default Nav