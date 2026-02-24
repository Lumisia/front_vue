<script setup>
import { onMounted, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 1. 라우터 객체 가져오기
const route = useRoute();
const router = useRouter();

// 2. 메뉴 데이터 정의 (경로는 실제 router 설정과 일치해야 함)
const menuItems = [
  { name: '게시글 목록', icon: 'layout-dashboard', path: '/post_list' },
  { name: '새 글 작성', icon: 'pen-tool', path: '/post' },
  { name: '게시글 관리', icon: 'files', path: '/post_manage' }, // 경로가 없다면 적절히 수정
];

// 3. 현재 경로가 메뉴의 경로와 일치하는지 확인 (파란색 칸 로직)
const isActive = (path) => {
  return route.path === path;
};

// 4. 클릭 시 페이지 이동
const navigateTo = (path) => {
  router.push(path);
};

// 5. Lucide 아이콘 렌더링 (CDN 방식 대응)
const initIcons = async () => {
  await nextTick();
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

// 페이지 변경될 때마다 아이콘 다시 그려주기 (아이콘 색상 변경 대응)
watch(() => route.path, () => {
  initIcons();
});

onMounted(() => {
  initIcons();
});
</script>

<template>
  <aside class="w-72 bg-white border-r border-slate-200 hidden xl:flex flex-col shrink-0 h-screen">
    <div class="p-8">
      <h1 class="text-2xl font-black text-indigo-600 tracking-tighter flex items-center gap-2">
        <div class="w-7 h-7 bg-indigo-600 rounded-lg"></div>
        Lumina
      </h1>
    </div>

    <nav class="flex-1 px-4 space-y-2">
      <div 
        v-for="menu in menuItems" 
        :key="menu.path"
        @click="navigateTo(menu.path)"
        :class="[
          'flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 group',
          isActive(menu.path) 
            ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100' 
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
        ]"
      >
        <i 
          :data-lucide="menu.icon" 
          :class="['w-5 h-5', isActive(menu.path) ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600']"
        ></i>
        
        <span class="font-bold">{{ menu.name }}</span>
      </div>
    </nav>

    <div class="p-6 border-t border-slate-50">
      <div class="flex items-center gap-3 p-4 rounded-2xl text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
        <i data-lucide="settings" class="w-5 h-5"></i>
        <span class="font-bold">설정</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 작성 */
</style>