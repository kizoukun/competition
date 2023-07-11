import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from "@/views/auth/RegisterView.vue";
import NotFound from "@/components/NotFound.vue";
import { isAuthenticated } from '@/stores/api';
import KRLView from "@/views/KRLView.vue";
import MRTView from "@/views/MRTView.vue";
import BalanceView from "@/views/BalanceView.vue";

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
        path: '/auth/register',
        name: 'register',
        component: RegisterView,
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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/topup',
      name: 'topup',
      component: () => import('../views/TopupView.vue'),
        beforeEnter: async (to, from, next) => {
            if(!await isAuthenticated()) {
                return next({name: 'login'});
            }
            next();
        }
    },
    {
      path: '/topup/:id',
      name: 'topupId',
      component: () => import('../views/TopupPayView.vue'),
      beforeEnter: async (to, from, next) => {
          if(!await isAuthenticated()) {
              return next({name: 'login'});
          }
          next();
      }
    },
    {
      path: '/track/krl',
      name: 'KRLView',
      component: KRLView
    },
    {
      path: '/track/mrt',
      name: 'MRTView',
      component: MRTView
    },
    {
      path: "/balance",
      name: "BalanceView",
      component: BalanceView
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFound,
      props: route => ({ message: route.query.message })
    },
  ]
})

export default router
