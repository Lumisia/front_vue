<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { boardApi } from '@/axios/post_axios.js';

const router = useRouter();

const post = reactive({
  title: '',
  category: 'daily',
  content: ''
});

const isValid = computed(() => post.title.trim() && post.content.trim());

const submitPost = async () => {
  if (!isValid.value) return;

  try {
    // 이제 writerIdx를 수동으로 보내지 않습니다.
    await boardApi.createPost({
      title: post.title,
      content: post.content,
      category: post.category
    });

    alert('🚀 포스트가 성공적으로 발행되었습니다!');
    router.push('/post_list');
  } catch (error) {
    if (error.response?.status === 403) {
      alert('권한이 없습니다. 다시 로그인해주세요.');
    } else {
      alert('발행 실패!');
    }
  }
};

const handleCancel = () => {
  if(confirm('작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠나요?')) {
    router.back(); // 뒤로 가기
  }
};

onMounted(() => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800">

    <main class="flex-1 flex flex-col">

      <div class="p-8 md:p-12 overflow-y-auto flex justify-center">
        <div class="w-full max-w-5xl"> <div class="mb-8 flex justify-between items-end">
            <div>
              <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">새 포스트 작성</h2>
              <p class="text-slate-500 mt-2 text-lg">생각을 정리하고 멋진 글을 발행해 보세요.</p>
            </div>
            <div class="flex gap-3">
              <button @click="handleCancel" class="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-white hover:shadow-sm transition-all">
                임시저장
              </button>
              <button @click="submitPost" :disabled="!isValid" class="px-8 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transition-all">
                발행하기
              </button>
            </div>
          </div>

          <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-8 md:p-10 space-y-8">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                    <i data-lucide="tag" class="w-4 h-4"></i> 카테고리
                  </label>
                  <select v-model="post.category" class="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none appearance-none">
                    <option value="daily">🌿 일상 에세이</option>
                    <option value="tech">💻 기술 및 개발</option>
                    <option value="design">🎨 디자인 인사이트</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                    <i data-lucide="hash" class="w-4 h-4"></i> 태그
                  </label>
                  <input type="text" placeholder="쉼표(,)로 구분" class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
                </div>
              </div>

              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <i data-lucide="type" class="w-4 h-4"></i> 제목
                </label>
                <input 
                  type="text" 
                  v-model="post.title" 
                  placeholder="멋진 제목을 입력하세요" 
                  class="w-full text-2xl font-bold bg-transparent border-b-2 border-slate-100 py-4 focus:border-indigo-500 transition-colors outline-none"
                />
              </div>

              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <i data-lucide="align-left" class="w-4 h-4"></i> 본문 내용
                </label>
                <div class="border border-slate-100 rounded-2xl bg-slate-50/50">
                  <div class="flex items-center gap-4 px-4 py-2 border-b border-slate-100">
                    <button class="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><i data-lucide="bold" class="w-4 h-4"></i></button>
                    <button class="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><i data-lucide="italic" class="w-4 h-4"></i></button>
                    <button class="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><i data-lucide="image" class="w-4 h-4"></i></button>
                    <button class="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><i data-lucide="link" class="w-4 h-4"></i></button>
                  </div>
                  <textarea 
                    v-model="post.content" 
                    placeholder="여기에 당신의 이야기를 들려주세요..." 
                    class="w-full min-h-[400px] p-6 bg-transparent border-none focus:ring-0 text-lg leading-relaxed outline-none resize-none"
                  ></textarea>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Pretendard 폰트 적용 시 더 깔끔해집니다. */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
  font-family: 'Pretendard', sans-serif;
}

/* 스크롤바 커스텀 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>