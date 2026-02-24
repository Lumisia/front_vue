import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/post',
      name: 'post',
      component: () => import('@/views/Post/Post.vue'),
      meta: { title: '게시글 작성', requiresAuth: true, isAuthPage: false},
    },
    {
      path: '/post_list',
      name: 'post_list',
      component: () => import('@/views/Post/Post_List.vue'),
      meta: { title: '게시글 목록', requiresAuth: true, isAuthPage: false},
    },
    {
      path: '/post_manage',
      name: 'post_manage',
      component: () => import('@/views/Post/Post_manage.vue'),
      meta: { title: '게시글 관리', requiresAuth: true, isAuthPage: false},
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/User/Signup.vue'),
      meta: { title: '회원가입', requiresAuth: false, isAuthPage: true},
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/User/Login.vue'),
      meta: { title: '로그인', requiresAuth: false, isAuthPage: true},
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/User/Verify.vue'),
      meta: { title: '이메일 인증', requiresAuth: false, isAuthPage: true},
    },
    {
      path: '/board/detail/:id', // :id 가 변수 역할
      name: 'PostDetail',
      component: () => import('../views/Post/Post_View.vue')
    }
  ],
})

router.beforeEach((to, from) => {
  console.log('vue에서 링크를 이동할 때 매번 실행되는 함수');

  // 페이지 타이틀 설정
  document.title = to.meta.title || '하위';

  // 인증이 필요한 페이지 접근 제어 (주석 해제 시 참고하세요)
  // if (to.meta.requiresAuth) {
  //   const userInfo = localStorage.getItem('USERINFO');
  //   if (userInfo === null) {
  //     // ❌ next({ name: 'login' }) 대신
  //     // ✅ 이동할 경로를 직접 return 합니다.
  //     return { name: 'login' };
  //   }
  // }

  // ✅ 아무것도 return하지 않으면 원래 가려던 곳(to)으로 자연스럽게 이동합니다.
  // next() 호출은 이제 필요 없습니다.
});

export default router
