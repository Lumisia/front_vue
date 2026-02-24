<template>
  <div class="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
    
    <div class="w-full max-w-[480px] bg-white rounded-[40px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
      
      <div class="p-10 md:p-14">
        <div class="flex flex-col items-center mb-12">
          <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <div class="w-5 h-5 bg-white rounded-sm rotate-45"></div>
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter">Lumina</h1>
          <p class="text-slate-400 mt-2 font-medium text-sm text-center">
            다시 만나서 반가워요! <br/>계정에 로그인하여 시작하세요.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div class="relative group">
              <i data-lucide="mail" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
              <input 
                v-model="loginData.email"
                type="email" 
                placeholder="name@example.com"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[20px] font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-50 transition-all placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center ml-1">
              <label class="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
            </div>
            <div class="relative group">
              <i data-lucide="lock" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
              <input 
                v-model="loginData.password"
                type="password" 
                placeholder="••••••••"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[20px] font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-50 transition-all placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="flex items-center gap-2 ml-1">
            <input type="checkbox" id="remember" class="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
            <label for="remember" class="text-sm font-bold text-slate-500 cursor-pointer select-none">로그인 상태 유지</label>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-4 bg-indigo-600 text-white rounded-[20px] font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Login</span>
            <div v-else class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </form>

        <RouterLink to="/signup">
        <div class="mt-10 text-center">
          <p class="text-sm text-slate-400 font-medium">
            계정이 없으신가요? 
            <a href="#" class="text-indigo-600 font-black hover:underline ml-1 text-base">Sign Up</a>
          </p>
        </div>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);

const loginData = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  loading.value = true;
  
  // 실제 로그인 로직 (Axios 등)이 들어갈 자리
  try {
    console.log('Logging in with:', loginData);
    // 성공 가정 후 메인으로 이동
    setTimeout(() => {
      loading.value = false;
      router.push('/post_list');
    }, 1500);
  } catch (error) {
    loading.value = false;
    alert('로그인에 실패했습니다.');
  }
};

onMounted(async () => {
  await nextTick();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
</script>