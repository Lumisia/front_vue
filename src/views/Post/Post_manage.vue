<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// 상태 관리
const posts = ref([]);
const loading = ref(true);
const searchQuery = ref('');

// 사용자 ID (임시: 실제로는 로그인 정보나 로컬스토리지에서 가져옴)
const currentUserId = 'user123'; 

// 1. 데이터 가져오는 로직 (Axios)
// const fetchUserPosts = async () => {
//   try {
//     loading.ref = true;
//     // API 주소는 환경에 맞게 수정하세요
//     const response = await axios.get(`http://your-api-url.com/posts/user/${currentUserId}`);
//     posts.value = response.data;
//   } catch (error) {
//     console.error('데이터 로드 실패:', error);
//     // 에러 발생 시 더미 데이터 (테스트용)
//     posts.value = [
//       { id: 1, title: '첫 번째 게시글입니다.', category: 'daily', createdAt: new Date(), views: 12 },
//       { id: 2, title: 'Vue3와 Tailwind 조합은 최고네요.', category: 'tech', createdAt: new Date(), views: 45 },
//     ];
//   } finally {
//     loading.value = false;
//     refreshIcons();
//   }
// };

// 2. 검색 필터링 로직
const filteredPosts = computed(() => {
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 카테고리별 배지 스타일
const getCategoryBadge = (cat) => {
  if (cat === 'tech') return 'bg-blue-50 text-blue-600';
  if (cat === 'daily') return 'bg-emerald-50 text-emerald-600';
  return 'bg-slate-50 text-slate-600';
};

// 날짜 포맷
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

// 작업 함수들
const editPost = (id) => console.log(`${id}번 글 수정`);
const deletePost = async (id) => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    try {
      await axios.delete(`http://your-api-url.com/posts/${id}`);
      posts.value = posts.value.filter(p => p.id !== id);
    } catch (e) {
      alert('삭제 실패');
    }
  }
};

// Lucide 아이콘 초기화
const refreshIcons = async () => {
  await nextTick();
  if (window.lucide) window.lucide.createIcons();
};

// onMounted(fetchUserPosts);
</script>

<template>
  <div class="flex-1 p-8 md:p-12 bg-[#F8FAFC] min-h-screen overflow-y-auto">
    <div class="max-w-[1400px] mx-auto">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 class="text-4xl font-black text-slate-900 tracking-tight">게시글 관리</h2>
          <p class="text-slate-500 mt-3 text-lg font-medium">작성하신 글을 수정하거나 삭제할 수 있습니다.</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <i data-lucide="search" class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="글 제목 검색..." 
              class="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 w-64 outline-none font-medium transition-all"
            >
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-slate-400">
        <div class="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
        <p class="font-bold">데이터를 불러오는 중입니다...</p>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="bg-white rounded-[32px] p-20 text-center border border-slate-100">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6">
          <i data-lucide="folder-open" class="w-10 h-10 text-slate-300"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-800">작성된 게시글이 없습니다.</h3>
        <p class="text-slate-400 mt-2">첫 번째 멋진 글을 작성해보세요!</p>
      </div>

      <div v-else class="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="border-b border-slate-50 bg-slate-50/30 text-slate-400 text-xs font-black uppercase tracking-[0.1em]">
              <th class="py-6 px-8">No.</th>
              <th class="py-6 px-4">제목</th>
              <th class="py-6 px-4">카테고리</th>
              <th class="py-6 px-4 text-center">작성일</th>
              <th class="py-6 px-4 text-center">상태</th>
              <th class="py-6 px-8 text-right">작업</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="(post, index) in filteredPosts" :key="post.id" class="group hover:bg-slate-50/50 transition-colors">
              <td class="py-6 px-8 text-slate-300 font-bold text-sm">{{ filteredPosts.length - index }}</td>
              <td class="py-6 px-4">
                <div class="flex flex-col">
                  <span class="text-slate-800 font-black text-lg group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1">
                    {{ post.title }}
                  </span>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-slate-400 text-xs font-medium flex items-center gap-1">
                      <i data-lucide="eye" class="w-3 h-3"></i> {{ post.views || 0 }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="py-6 px-4">
                <span :class="getCategoryBadge(post.category)" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  {{ post.category }}
                </span>
              </td>
              <td class="py-6 px-4 text-center text-slate-500 font-semibold text-sm">{{ formatDate(post.createdAt) }}</td>
              <td class="py-6 px-4 text-center">
                <span class="inline-flex items-center gap-1.5 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Published
                </span>
              </td>
              <td class="py-6 px-8 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="editPost(post.id)" class="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all">
                    <i data-lucide="edit-3" class="w-4 h-4"></i>
                  </button>
                  <button @click="deletePost(post.id)" class="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 shadow-sm transition-all">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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