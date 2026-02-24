<script setup>
import { onMounted, nextTick } from 'vue';

// 더미 데이터
const posts = [
  { id: 105, title: '2026년 프론트엔드 트렌드 분석', excerpt: 'AI 기반 개발 환경이 어떻게 변화하고 있는지 확인해보세요...', category: 'tech', categoryName: '💻 기술', date: '2026-02-24', views: '1,240' },
  { id: 104, title: '깔끔한 UI 디자인을 위한 5가지 원칙', excerpt: '여백과 타이포그래피만으로 세련된 대시보드를 만드는 방법', category: 'design', categoryName: '🎨 디자인', date: '2026-02-23', views: '850' },
  { id: 103, title: '주말 제주도 여행 브이로그 후기', excerpt: '오랜만에 떠난 제주도 여행, 생각보다 더 좋았던 카페 리스트', category: 'daily', categoryName: '🌿 일상', date: '2026-02-22', views: '2,100' },
  { id: 102, title: 'Vue 3와 Tailwind CSS의 찰떡 궁합', excerpt: '생산성을 극대화하는 컴포넌트 설계 방식에 대하여...', category: 'tech', categoryName: '💻 기술', date: '2026-02-21', views: '540' },
];

const categoryStyle = (type) => {
  const styles = {
    tech: 'bg-blue-50 text-blue-600',
    design: 'bg-purple-50 text-purple-600',
    daily: 'bg-emerald-50 text-emerald-600'
  };
  return styles[type] || 'bg-slate-50 text-slate-600';
};

onMounted(async () => {
  await nextTick();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
</script>

<template>
  <div class="w-full min-h-screen bg-[#F8FAFC] flex overflow-hidden font-sans">

    <main class="flex-1 flex flex-col h-screen overflow-hidden">

      <div class="flex-1 overflow-y-auto p-8 md:p-12">
        <div class="max-w-[1400px] mx-auto">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 class="text-4xl font-black text-slate-900 tracking-tight">게시글 관리</h2>
              <p class="text-slate-500 mt-3 text-lg font-medium">총 {{ posts.length }}개의 포스트가 있습니다.</p>
            </div>
            <div class="flex gap-3">
              <button class="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                <i data-lucide="filter" class="w-4 h-4"></i> 필터
              </button>
              <RouterLink to="/post">
              <button @click="$router.push('/post')" class="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
                <i data-lucide="plus" class="w-5 h-5"></i> 게시글 작성
              </button>
              </RouterLink>
            </div>
          </div>

          <div class="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
            <table class="w-full border-collapse text-left">
              <thead>
                <tr class="border-b border-slate-50 bg-slate-50/30 text-slate-400 text-xs font-black uppercase tracking-[0.1em]">
                  <th class="py-6 px-8 w-16">ID</th>
                  <th class="py-6 px-4">게시글 정보</th>
                  <th class="py-6 px-4">카테고리</th>
                  <th class="py-6 px-4 text-center">작성일</th>
                  <th class="py-6 px-4 text-center">조회수</th>
                  <th class="py-6 px-8 text-right">관리</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="post in posts" :key="post.id" class="group hover:bg-slate-50/50 transition-colors">
                  <td class="py-6 px-8 text-slate-300 font-bold text-sm">#{{ post.id }}</td>
                  <td class="py-6 px-4">
                    <div class="flex flex-col gap-1">
                      <span class="text-slate-800 font-black text-lg group-hover:text-indigo-600 transition-colors cursor-pointer">{{ post.title }}</span>
                      <span class="text-slate-400 text-sm font-medium line-clamp-1 max-w-md">{{ post.excerpt }}</span>
                    </div>
                  </td>
                  <td class="py-6 px-4">
                    <span :class="categoryStyle(post.category)" class="px-4 py-1.5 rounded-full text-xs font-black tracking-tighter">
                      {{ post.categoryName }}
                    </span>
                  </td>
                  <td class="py-6 px-4 text-center text-slate-500 font-semibold text-sm">{{ post.date }}</td>
                  <td class="py-6 px-4 text-center">
                    <div class="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-sm">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i> {{ post.views }}
                    </div>
                  </td>
                  <td class="py-6 px-8 text-right">
                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 shadow-sm"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                      <button class="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 shadow-sm"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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