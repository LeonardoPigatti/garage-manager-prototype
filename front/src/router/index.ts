import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 proteção
router.beforeEach((to) => {
  const isAuth = localStorage.getItem('auth')
  if (to.path === '/dashboard' && !isAuth) {
    return '/login'
  }
})

export default router