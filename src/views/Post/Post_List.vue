<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { boardApi } from '../../axios/post_axios.js'; // 분리한 파일 임포트

const posts = ref([]);

// 날짜 포맷팅 함수 (에러 해결 핵심)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 게시글 목록 가져오기 로직
const fetchPosts = async () => {
  try {
    // 이제 직접 axios를 쓰지 않고 분리한 함수를 호출합니다.
    posts.value = await boardApi.getList();
    
    await nextTick();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  } catch (error) {
    console.error(error);
    alert("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// 카테고리 스타일 지정 로직
const categoryStyle = (type) => {
  const styles = {
    tech: 'bg-blue-50 text-blue-600',
    design: 'bg-purple-50 text-purple-600',
    daily: 'bg-emerald-50 text-emerald-600'
  };
  return styles[type] || 'bg-slate-50 text-slate-600';
};

// 마운트 시 데이터 로드 및 아이콘 생성
onMounted(async () => {
  await fetchPosts();
  
  // Lucide 아이콘 초기화 (데이터 로드 후 확실히 실행)
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// 수정/삭제 함수 (필요 시 로직 추가)
const handleEdit = (idx) => {
  console.log("수정:", idx);
  // router.push(`/board/edit/${idx}`);
};

const handleDelete = (idx) => {
  if(confirm("정말 삭제하시겠습니까?")) {
    console.log("삭제:", idx);
  }
};
</script>

<template>
  <div class="w-full min-h-screen bg-[#F8FAFC] flex overflow-hidden font-sans">
    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <div class="flex-1 overflow-y-auto p-8 md:p-12">
        <div class="max-w-[1400px] mx-auto">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 class="text-4xl font-black text-slate-900 tracking-tight">게시글 목록</h2>
              <p class="text-slate-500 mt-3 text-lg font-medium">총 {{ posts.length }}개의 포스트가 있습니다.</p>
            </div>
          </div>

          <div class="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
            <table class="w-full border-collapse text-left">
              <thead>
                <tr class="border-b border-slate-50 bg-slate-50/30 text-slate-400 text-xs font-black uppercase tracking-[0.1em]">
                  <th class="py-6 px-8 w-16">ID</th>
                  <th class="py-6 px-4">게시글 정보</th>
                  <th class="py-6 px-4">작성자</th>
                  <th class="py-6 px-4">카테고리</th>
                  <th class="py-6 px-4 text-center">작성일</th>
                  <th class="py-6 px-4 text-center">조회수</th>
                  <th class="py-6 px-4 text-center">좋아요 수</th>
                  <th class="py-6 px-4 text-center">댓글 수</th>
                  <th class="py-6 px-8 text-right">관리</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="post in posts" :key="post.idx" class="group hover:bg-slate-50/50 transition-colors cursor-pointer" @click="$router.push(`/board/detail/${post.idx}`)">
                  <td class="py-6 px-8 text-slate-300 font-bold text-sm">#{{ post.idx }}</td>
                  <td class="py-6 px-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-slate-800 font-black text-lg group-hover:text-indigo-600 transition-colors">
                        {{ post.title }}
                      </span>
                      <span class="text-slate-400 text-sm font-medium line-clamp-1 max-w-md">
                        {{ post.content }}
                      </span>
                    </div>
                  </td>
                  <td class="py-6 px-4 text-slate-600 font-bold text-sm">{{ post.username || 'qwer1234' }}</td>
                  <td class="py-6 px-4">
                    <span :class="categoryStyle(post.category)" class="px-4 py-1.5 rounded-full text-xs font-black tracking-tighter">
                      {{ post.category || '일반' }}
                    </span>
                  </td>
                  <td class="py-6 px-4 text-center text-slate-500 font-semibold text-sm">
                    {{ formatDate(post.createdAt) }}
                  </td>
                  <td class="py-6 px-4 text-center">
                    <div class="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-sm">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i> {{ (post.viewcount || 0).toLocaleString() }}
                    </div>
                  </td>
                  <td class="py-6 px-4 text-center text-slate-400 font-bold text-sm">
                    {{ (post.likeCount || 0).toLocaleString() }}
                  </td>
                  <td class="py-6 px-4 text-center text-slate-400 font-bold text-sm">
                    {{ (post.replySize || 0).toLocaleString() }}
                  </td>
                  <td class="py-6 px-8 text-right">
                    <div class="opacity-0 group-hover:opacity-100 transition-all duration-200 flex justify-end gap-3">
                      <button @click.stop="handleEdit(post.idx)" class="text-indigo-600 font-black text-xs hover:text-indigo-800 transition-colors">수정</button>
                      <button @click.stop="handleDelete(post.idx)" class="text-rose-500 font-black text-xs hover:text-rose-700 transition-colors">삭제</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="posts.length === 0" class="py-20 text-center text-slate-400">
            게시글이 존재하지 않습니다.
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>