import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from "@/views/auth/RegisterView.vue";
import NotFound from "@/components/NotFound.vue";
import { isAuthenticated } from '@/stores/api';
import KRLView from "@/views/KRLView.vue";
import MRTView from "@/views/MRTView.vue";
import BalanceView from "@/views/BalanceView.vue";
import TopupView from "@/views/TopupView.vue";
import TopupPayView from "@/views/TopupPayView.vue";
import PayView from "@/views/PayView.vue";
import OrdersView from "@/views/OrdersView.vue";


async function authenticated(to, from, next) {
  if(!await isAuthenticated()) {
      return next({name: 'login'});
  }
  next();
}

async function notAuthenticated(to, from, next) {
  if(await isAuthenticated()) {
      return next({name: 'home'});
  }
  next();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: authenticated
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
      beforeEnter: notAuthenticated
    },
    {
        path: '/auth/register',
        name: 'register',
        component: RegisterView,
        beforeEnter: notAuthenticated
    },
    {
      path: '/pay',
      name: 'pay',
      component: PayView,
      beforeEnter: authenticated
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      beforeEnter: authenticated
    },
    {
      path: '/topup',
      name: 'topup',
      component: TopupView,
      beforeEnter: authenticated
    },
    {
      path: '/topup/:id',
      name: 'topupId',
      component: TopupPayView,
      beforeEnter: authenticated
    },
    {
      path: '/track/krl',
      name: 'KRLView',
      component: KRLView,
      beforeEnter: authenticated
    },
    {
      path: '/track/mrt',
      name: 'MRTView',
      component: MRTView,
      beforeEnter: authenticated
    },
    {
      path: "/balance",
      name: "BalanceView",
      component: BalanceView,
      beforeEnter: authenticated
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
