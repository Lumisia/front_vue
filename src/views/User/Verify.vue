<template>
  <div class="wait-container">
    <div class="wait-card">
      <div class="icon-mail">✉️</div>
      <h2>이메일 인증 대기</h2>
      <p class="email-text"><strong>{{ userEmail }}</strong>로 인증 메일을 보냈습니다.</p>
      
      <div class="timer-section">
        <p>인증 유효 시간</p>
        <div class="timer-display" :class="{ 'warning': timeLeft < 60 }">
          {{ formattedTime }}
        </div>
      </div>

      <div class="status-msg">
        <p v-if="timeLeft > 0">메일함의 인증 링크를 클릭하면 자동으로 페이지가 이동합니다.</p>
        <p v-else class="error-msg">인증 시간이 만료되었습니다. 다시 회원가입 해주세요.</p>
      </div>

      <button @click="router.push('/signup')" class="btn-back">다시 시도하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../axios/axios.js';

const route = useRoute();
const router = useRouter();
const userEmail = ref(route.query.email || '');

// 5분 설정 (300초)
const timeLeft = ref(300);
let timer = null;
let checkInterval = null;

// 시간 표시 형식 (05:00)
const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
});

// 백엔드에 인증 완료(enable=true) 여부를 확인하는 함수
const verifyStatus = async () => {
  try {
    // 백엔드: ResponseEntity.ok("성공") 또는 ok("실패") 반환
    const res = await api.checkStatus(userEmail.value);
    
    // 1. res.data가 "성공" 문자열인지 직접 비교합니다.
    if (res.data === "성공") {
      // 2. 인증이 확인되었으므로 폴링(주기적 확인)을 멈춥니다.
      if (checkInterval) clearInterval(checkInterval);
      if (timer) clearInterval(timer);
      
      alert('인증 성공! 로그인 페이지로 이동합니다.');
      router.push('/login');
    } else {
      // "실패"인 경우 아무것도 하지 않고 다음 5초 뒤의 확인을 기다립니다.
      console.log("아직 인증되지 않았습니다.");
    }
  } catch (e) {
    // 405 에러가 발생한다면 api.checkStatus가 axios.get인지 꼭 확인하세요!
    console.error("인증 상태 확인 중 오류", e);
  }
};

onMounted(() => {
  if (!userEmail.value) {
    router.push('/signup');
    return;
  }

  // 1초마다 시간 감소
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      clearInterval(checkInterval);
    }
  }, 1000);

  // 5초마다 백엔드 DB 체크 (사용자가 메일을 클릭했는지 확인)
  checkInterval = setInterval(verifyStatus, 5000);
});

onUnmounted(() => {
  clearInterval(timer);
  clearInterval(checkInterval);
});
</script>

<style scoped>
.wait-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f7f6; }
.wait-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; }
.icon-mail { font-size: 60px; margin-bottom: 20px; }
.timer-section { margin: 30px 0; padding: 20px; background: #eef2f3; border-radius: 10px; }
.timer-display { font-size: 40px; font-weight: bold; color: #2c3e50; }
.timer-display.warning { color: #e74c3c; animation: blink 1s infinite; }
.error-msg { color: #e74c3c; font-weight: bold; }
.btn-back { margin-top: 20px; background: none; border: none; text-decoration: underline; color: #7f8c8d; cursor: pointer; }

@keyframes blink {
  50% { opacity: 0.5; }
}
</style>