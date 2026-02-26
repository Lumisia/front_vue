import { api } from '@/plugins/axiosinterceptor'; // 기존에 만든 axios 인스턴스 임포트

export const likesApi = {

  // 게시글 작성 (필요할 경우 미리 만들어둡니다)
  replyLikes: async (board_idx, replyData, token) => {
    const res = await api.post(`/board/reply/${board_idx}`, replyData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        return res.data;
    } catch (error) {
      console.error("댓글 작성 에러:", error);
      throw error;
    }
  },
  
  postLikes: async (board_idx) => {
    const res = await api.post(`/board/reply/${board_idx}`, replyData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        return res.data;
    } catch (error) {
      console.error("댓글 작성 에러:", error);
      throw error;
    }
  }
};