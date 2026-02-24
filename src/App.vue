<script setup lang="js">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Side_bar from './components/Side_bar.vue';
</script>

<template>
  <div class="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
    
    <Side_bar class="shrink-0" />

    <div class="flex flex-col flex-1 min-w-0">
      
      <Header class="shrink-0" />
      
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
      
    </div>
  </div>
</template>

<style>
/* 중요: html, body가 꽉 차있어야 레이아웃이 안 깨집니다. */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>