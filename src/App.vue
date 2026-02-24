<script setup lang="js">
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Side_bar from './components/Side_bar.vue';

const route = useRoute();

// 현재 페이지가 로그인/회원가입 페이지인지 확인
const isAuthPage = computed(() => route.meta.isAuthPage === true);
</script>

<template>
  <div v-if="isAuthPage" class="w-full h-screen bg-[#F8FAFC]">
    <RouterView />
  </div>

  <div v-else class="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
    <Side_bar class="shrink-0" />
    <div class="flex flex-col flex-1 min-w-0">
      <Header />
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>