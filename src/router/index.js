import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'wq',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/wq',
        name: 'wq',
        component: () => import('@/views/wq/index.vue')
      },
      {
        path: '/view',
        name: 'view',
        component: () => import('@/views/view/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
