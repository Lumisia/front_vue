import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/post',
      name: 'post',
      component: () => import('@/views/Post/Post.vue'),
    },
    {
      path: '/post_list',
      name: 'post_list',
      component: () => import('@/views/Post/Post_List.vue'),
    },
    {
      path: '/post_manage',
      name: 'post_manage',
      component: () => import('@/views/Post/Post_manage.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
