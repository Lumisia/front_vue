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
          <span>작성자: {{ post.writer }}</span>
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

    <div class="mt-10 pt-6 border-t flex justify-end gap-3">
      <button @click="$router.push('/post_list')" class="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition">
        목록으로
      </button>
      <button class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        수정하기
      </button>
    </div>
  </div>
  
  <div v-else class="text-center py-20 text-slate-500">
    게시글을 불러오는 중입니다...
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { boardApi } from '../../axios/post_axios.js';

const route = useRoute();
const post = ref(null);

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
    const idx = route.params.id; // URL 파라미터에서 ID 추출
    post.value = await boardApi.getPost(idx);
    
    await nextTick();
    if (window.lucide) window.lucide.createIcons();
  } catch (error) {
    alert("게시글을 불러오지 못했습니다.");
    console.error(error);
  }
};

onMounted(() => {
  getDetail();
});
</script>