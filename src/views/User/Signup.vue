<template>
  <div class="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
    
    <div class="w-full max-w-[480px] bg-white rounded-[40px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
      
      <div class="p-10 md:p-14">
        <div class="flex flex-col items-center mb-10">
          <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <div class="w-5 h-5 bg-white rounded-sm rotate-45"></div>
          </div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tighter">Create Account</h1>
          <p class="text-slate-400 mt-2 font-medium text-sm text-center">
            Lumina의 멤버가 되어 <br/>멋진 기록을 시작해보세요.
          </p>
        </div>

        <form @submit.prevent="handleSignUp" class="space-y-5">
          
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div class="relative group">
              <i data-lucide="mail" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
              <input 
                v-model="signUpData.email"
                type="email" 
                placeholder="example@mail.com"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[20px] font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-50 transition-all placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
            <div class="relative group">
              <i data-lucide="user" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
              <input 
                v-model="signUpData.username"
                type="text" 
                placeholder="unique_id"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[20px] font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-50 transition-all placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <div class="relative group">
              <i data-lucide="lock" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"></i>
              <input 
                v-model="signUpData.password"
                type="password" 
                placeholder="••••••••"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[20px] font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-50 transition-all placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="flex items-center gap-2 ml-1 py-2">
            <input type="checkbox" id="terms" class="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer" required>
            <label for="terms" class="text-xs font-bold text-slate-500 cursor-pointer select-none">
              <span class="text-indigo-500 underline">이용약관</span> 및 <span class="text-indigo-500 underline">개인정보취급방침</span>에 동의합니다.
            </label>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-4 bg-indigo-600 text-white rounded-[20px] font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Create Account</span>
            <div v-else class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </form>

        <div class="mt-10 text-center">
          <p class="text-sm text-slate-400 font-medium">
            이미 계정이 있으신가요? 
            <RouterLink to="/login" class="text-indigo-600 font-black hover:underline ml-1 text-base">Login</RouterLink>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);

const signUpData = reactive({
  email: '',
  username: '',
  password: ''
});

const handleSignUp = async () => {
  loading.value = true;
  
  try {
    console.log('Signing up with:', signUpData);
    // 여기에 Axios 회원가입 요청 로직을 추가하세요.
    
    setTimeout(() => {
      loading.value = false;
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    }, 1500);
  } catch (error) {
    loading.value = false;
    alert('회원가입 처리 중 오류가 발생했습니다.');
  }
};

onMounted(async () => {
  await nextTick();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
</script>