import axios from "axios"; //방금 설치한 모듈을 불러오기

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '13e7c5af1860002c9899d359860b91ee', //일전에 사이트에 받아두었던 key 입력하기 
    language: 'ko-KR'
  }
});

export default instance; //instance를 다른곳에서도 사용을 하기를 원하여