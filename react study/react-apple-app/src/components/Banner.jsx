import './Banner.css';
import React, { useEffect, useState } from 'react' //여기 적어주기
import axios from '../api/axios'; //②
import requests from '../api/requests'; //③
import styled from 'styled-components'

const Banner = () => {
  //⑤ useState snippet로 선택해주면 기본틀이 생성
  const [movie, setMovie] = useState(null); //⑩null으로 바꿔주기
  //⑯play눌렀을때 동영상페이지를 위해
  const [isClicked, setIsClicked] = useState(false);

  // ①
  useEffect(() => {
    fetchData();
  }, [])

  // ②axios.js에서 instance를 해놓았기에 중복으로 들어오는것은 해주지 않아도 된다.
  const fetchData = async () => {
    //⑥현재 상영중인 여러 영화 정보를 가져오기
   const response = await axios.get(requests.fetchNowPlaying)
   console.log(response);
   
    // ⑦여러 영화중 랜덤으로 하나의 영화 id 가져오기
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)].id;
      console.log(movieId);

       // ⑧특정 영화의 더 상세한 정보룰 가져오기 (비디오 정보 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      // params 이 부분은 이 영화의 정보룰 달라고 요청하는 부분이다.
      params: {append_to_response: 'videos'}
    })
    //⑨
    console.log('movieDetail', movieDetail);
    setMovie(movieDetail);
  }

  //⑭영화 설명이 100자가 넘으면...으로 표기해주기
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + '...' : str;
  }

  //⑩위에서 null으로 바꿔줬을 경우 그냥 바로 movie가 없을때는 그리고 아닐때는으로 처리를 해주면 된다.
  if (!movie) {
    return (
      <div>
        loading...
      </div>
    )
  } 
  //⑯-1
  if (!isClicked) {
    return ( //⑪
      <div //⑬배너에 사진을 벌러오고 스타일 주기
        className='banner'
        style={{            //⑬${movie.backdrop_path} :콘솔에서 확인 가능한 경로
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`, 
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }} >
        <div className='banner_contents'>
        <h1 className='banner_title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className='banner_buttons'>
            {movie.videos?.results[0]?.key ? //⑫results[0]?.key  —> ?는 영상이 있을때만 다음으로 이동을 한다는것
            <button className='banner_button play' //⑫play라는 버튼. 해당 영화의 비디오가 있을때만 이 버튼을 보여준다. 
            //⑯-3아래 onclick추가해주기
            onClick={() => setIsClicked(true)}> 
            Play
          </button>
          : null  //⑫비디오에 대한 데이터가 없을 경우 null
          }
          </div>
          <p className='banner_description'> 
          {/*⑭*/truncate(movie.overview, 100)}
          </p>

        </div> 
        <div className='banner--fadeBottom' />
      </div>
    )
  } else { //⑯-2
    return ( //⑰-1 컨테이너 만들어주기. <HomeContainer>안에는 iframe태그를 이용해서 비디오를 보여주다. 그러면 다른 페이지를 불러와서 삽입 가능
      //⑱비디오 영상 다 보고 나서 돌아가기 위한 버튼 만들어주기. <></> 생성 후 아래 <button>x</button>
      <>
      <Container>
        <HomeContainer> 
          <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}></Iframe>
        </HomeContainer>
      </Container>
      <button  onClick={() => setIsClicked(false)}>
        X
      </button>
      </>
    )
  }
}

//⑰-2 styled 컴포넌트를 이용해서 생성을 해주기
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`

//⑰스타일링 해주기
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height : 100vh;
`
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`



export default Banner
