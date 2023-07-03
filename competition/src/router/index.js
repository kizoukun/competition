import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import { isAuthenticated } from '@/stores/api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
        beforeEnter: async (to, from, next) => {
            if(!await isAuthenticated()) {
                return next({name: 'login'});
            }
            next();
        }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
      beforeEnter: async (to, from, next) => {
        if(await isAuthenticated()) {
            return next({name: 'home'});
        }
        next();
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
