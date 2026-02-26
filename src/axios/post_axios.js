import { api } from '@/plugins/axiosinterceptor'; // 기존에 만든 axios 인스턴스 임포트

export const boardApi = {
  // 게시글 전체 목록 가져오기
  getList: async () => {
    try {
      const res = await api.get('/board/list');
      return res.data; // 컨트롤러가 주는 List<Board> 반환
    } catch (error) {
      console.error("게시글 목록 호출 에러:", error);
      throw error;
    }
  },

  // 게시글 작성 (필요할 경우 미리 만들어둡니다)
  createPost: async (postData, token) => {
    const res = await api.post('/board/save', postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
  },

  // 상세 조회 추가 🔥
 getPost: async (idx) => {
    try {
      // 백엔드의 @GetMapping("/detail/{idx}") 주소로 호출
      const response = await api.get(`/board/detail/${idx}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};