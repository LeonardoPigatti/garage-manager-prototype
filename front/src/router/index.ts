import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Login from '../pages/Login.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../pages/Dashboard.vue'
import AllServices from '../pages/AllServices.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'all-services', component: AllServices }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isAuth = localStorage.getItem('auth')
  if (to.meta.requiresAuth && !isAuth) {
    return '/login'
  }
})

export default router