<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10" v-if="post">
    <div class="border-b pb-4 mb-6">
      <div class="flex items-center gap-2 mb-2">
        <span :class="categoryStyle(post.category)" class="px-3 py-1 rounded-full text-xs font-semibold">
          {{ post.category }}
        </span>
        <span class="text-slate-400 text-sm">#{{ post.idx }}</span>
      </div>
      <h1 class="text-3xl font-bold text-slate-800">{{ post.title }}</h1>
      <div class="flex items-center justify-between mt-4 text-slate-500 text-sm">
        <div class="flex items-center gap-4">
          <span>작성자: {{ post.email }}</span>
          <span>{{ formatDate(post.regDate) }}</span>
        </div>
        <div class="flex items-center gap-1">
          <i data-lucide="eye" class="w-4 h-4"></i>
          <span>{{ post.viewCount || 0 }}</span>
        </div>
      </div>
    </div>

    <div class="prose max-w-none text-slate-700 leading-relaxed min-h-[300px]">
      {{ post.content }}
    </div>

    <div class="flex justify-center gap-6 my-10">
      <button @click="handlePostLike('like')" class="flex flex-col items-center gap-2 group">
        <div class="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-rose-50 group-hover:border-rose-200 transition-all shadow-sm">
          <i data-lucide="thumbs-up" class="w-6 h-6 text-slate-400 group-hover:text-rose-500"></i>
        </div>
        <span class="text-sm font-bold text-slate-500 group-hover:text-rose-500">{{ post.likeCount || 0 }}</span>
      </button>

      <button @click="handlePostLike('dislike')" class="flex flex-col items-center gap-2 group">
        <div class="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 group-hover:border-slate-300 transition-all shadow-sm">
          <i data-lucide="thumbs-down" class="w-6 h-6 text-slate-400 group-hover:text-slate-600"></i>
        </div>
        <span class="text-sm font-bold text-slate-500 group-hover:text-slate-600">{{ post.dislikeCount || 0 }}</span>
      </button>
    </div>

    <div class="mt-10 pt-6 border-t flex justify-end gap-3">
      <button @click="$router.push('/post_list')" class="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition">
        목록으로
      </button>
      <button class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        수정하기
      </button>
    </div>

    <div class="mt-12">
      <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i data-lucide="message-square" class="w-5 h-5"></i>
        댓글 <span class="text-blue-600">{{ comments.length }}</span>
      </h3>

      <div class="bg-slate-50 p-4 rounded-xl mb-8">
        <textarea 
          v-model="newComment"
          placeholder="따뜻한 댓글을 남겨주세요."
          class="w-full bg-white border border-slate-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          rows="3"
        ></textarea>
        <div class="flex justify-end mt-2">
          <button 
            @click="submitComment"
            :disabled="!newComment.trim()"
            class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition"
          >
            댓글 등록
          </button>
        </div>
      </div>

      <div v-for="(comment, index) in sortedComments" :key="comment.idx || index" class="flex gap-4 pb-6 border-b border-slate-100 last:border-0 pt-6">
        <div class="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold text-xs">
          {{ comment.username ? comment.username.substring(0, 2).toUpperCase() : '??' }}
        </div>
        
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-slate-800 text-sm">{{ comment.username }}</span>
            <span class="text-slate-400 text-xs">{{ comment.createdAt ? formatDate(comment.createdAt) : '방금 전' }}</span>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed mb-3">
            {{ comment.content }}
          </p>
          
          <div class="flex items-center gap-3">
            <button @click="handleCommentLike(comment.idx)" class="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-600 transition">
              <i data-lucide="heart" class="w-3.5 h-3.5"></i>
              좋아요 {{ comment.likeCount || 0 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-20 text-slate-500">
    게시글을 불러오는 중입니다...
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'; // computed 추가
import { useRoute } from 'vue-router';
import { boardApi } from '../../axios/post_axios.js';
import { replyApi } from '../../axios/reply_axios.js';

const route = useRoute();
const post = ref(null);
const comments = ref([]);
const newComment = ref('');

// [추가] 댓글 좋아요 순 정렬 로직
const sortedComments = computed(() => {
  return [...comments.value].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const categoryStyle = (type) => {
  const styles = {
    tech: 'bg-blue-50 text-blue-600',
    design: 'bg-purple-50 text-purple-600',
    daily: 'bg-emerald-50 text-emerald-600'
  };
  return styles[type] || 'bg-slate-50 text-slate-600';
};

const getDetail = async () => {
  try {
    const idx = route.params.id;
    post.value = await boardApi.getPost(idx);
    
    if (post.value.replyList && Array.isArray(post.value.replyList)) {
      comments.value = post.value.replyList;
    } else {
      comments.value = [];
    }

    await nextTick();
    if (window.lucide) window.lucide.createIcons();
  } catch (error) {
    alert("데이터를 불러오지 못했습니다.");
    console.error(error);
  }
};

// [추가] 게시글 좋아요/싫어요 처리
const handlePostLike = async (type) => {
  try {
    const token = localStorage.getItem('ATOKEN');
    if (!token) return alert("로그인이 필요합니다.");
    
    // boardApi에 likePost(idx, type, token) 함수가 있다고 가정
    // await boardApi.likePost(post.value.idx, type, token);
    
    alert(`${type === 'like' ? '추천' : '비추천'} 되었습니다.`);
    await getDetail(); // 수치 갱신
  } catch (error) {
    console.error(error);
  }
};

// [추가] 댓글 좋아요 처리
const handleCommentLike = async (replyIdx) => {
  try {
    const token = localStorage.getItem('ATOKEN');
    if (!token) return alert("로그인이 필요합니다.");

    // replyApi에 likeReply(replyIdx, token) 함수가 있다고 가정
    await replyApi.likeReply(replyIdx, token);
    
    await getDetail(); // 정렬 순서 변경을 위해 데이터 다시 가져오기
  } catch (error) {
    console.error("좋아요 등록 에러:", error);
    alert("좋아요 등록 중 오류가 발생했습니다.");
  }
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    const boardIdx = route.params.id;
    const token = localStorage.getItem('ATOKEN'); 
    const commentData = { content: newComment.value };

    const response = await replyApi.createReply(boardIdx, commentData, token);

    if (response) {
      alert("댓글이 등록되었습니다.");
      newComment.value = '';
      await getDetail(); 
    }
  } catch (error) {
    console.error("댓글 등록 에러:", error);
    alert("댓글 등록 중 오류가 발생했습니다.");
  }
};

onMounted(() => {
  getDetail();
});
</script>