import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Login from '../pages/Login.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../pages/Dashboard.vue'
import AllServices from '../pages/AllServices.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import NewServiceOrder from '../pages/NewServiceOrder.vue'
// import ServiceOrderDetail from '../pages/ServiceOrderDetail.vue' ← descomentar quando criar

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'all-services', component: AllServices },
      { path: 'service-orders/new', component: NewServiceOrder },
      // { path: 'service-orders/:id', component: ServiceOrderDetail },
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