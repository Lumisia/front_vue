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
  ],
})

router.beforeEach((to, from, next) => {
  console.log('vue에서 링크를 이동할 때 매번 실행되는 함수')

  document.title = to.meta.title || '하위'

  // if (to.meta.requiresAuth) {
  //   if (localStorage.getItem('USERINFO') === null) {
  //     next({ name: 'login' })
  //   }
  // }
  next() 
})

export default router
