import { api } from '@/plugins/axiosinterceptor'

const signup = async (req) => {
  const res = await api.post('/user/signup', req)

  return res
}


const userApi = async (req) => {
  // GET 요청 시 데이터를 params에 담아 보냅니다.
  const res = await api.post('/login', {
      email: req.email,
      password: req.password
  });

  // 로그인 성공 시 서버에서 보낸 토큰을 저장
  if (res.data && res.data.token) {
    localStorage.setItem('token', res.data.token);
  }

  return res;
};

const checkStatus = async (userEmail) => {
  // GET 요청은 데이터를 보낼 때 { params: { 키: 값 } } 형식을 써야 합니다.
  const res = await api.get('/user/check-enable', {
    params: { email: userEmail }
  });

  return res;
};

export default { signup, checkStatus, userApi }