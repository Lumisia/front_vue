<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 1. 경로와 표시될 이름 매핑 (메뉴 데이터와 일치시켜주세요)
const pageNames = {
  '/post_list': '게시글 목록',
  '/post': '게시글 작성',
  '/manage': '게시글 관리'
};

// 2. 현재 경로에 해당하는 이름을 계산 (없을 경우 기본값 'Dashboard')
const currentTitle = computed(() => {
  return pageNames[route.path] || '게시글 관리';
});
</script>

<template>
  <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
    <div class="flex items-center gap-4 text-slate-400">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Pages</span>
      <span class="text-slate-200 text-lg">/</span>
      <span class="text-sm text-slate-800 font-bold transition-all duration-300">
        {{ currentTitle }}
      </span>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex flex-col items-end mr-2 hidden md:flex">
        <span class="text-xs font-black text-slate-800 leading-none">Admin User</span>
        <span class="text-[10px] font-bold text-emerald-500 uppercase">Online</span>
      </div>
      <div class="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 텍스트가 바뀔 때 부드러운 효과를 원한다면 추가 */
span {
  display: inline-block;
}
</style>