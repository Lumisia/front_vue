import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소
  timeout: 60000,
  withCredentials: true,
})

const postApi = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    console.log('요청 보내기 전에 실행')
    return config
  },
  (error) => {
    console.log('요청 보낼 때 에러 발생')
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (config) => {
    console.log('응답 받아서 화면에 띄우기 전에 실행')
    return config
  },
  (error) => {
    console.log('응답 받을 때 에러 발생')
    return Promise.reject(error)
  },
)
// axios 설정 예시
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // 백엔드 필터가 'Authorization'을 읽는다면:
    config.headers.Authorization = `Bearer ${token}`; 
    // 만약 백엔드가 'ATOKEN'을 직접 읽는다면:
    // config.headers.ATOKEN = token;
  }
  return config;
});