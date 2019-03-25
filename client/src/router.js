import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      componen: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      componen: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/troli',
      componen: 'troli',
      component: () => import('./views/Troli.vue')
    },
    {
      path: '/checkout',
      componen: 'checkout',
      component: () => import('./views/Checkout.vue')
    },
    {
      path: '/transaksi',
      componen: 'transaksi',
      component: () => import('./views/Transaksi.vue')
    },
    {
      path: '/admin',
      componen: 'admin',
      component: () => import('./views/Admin.vue')
    },
    {
      path: '/edit',
      componen: 'edit',
      component: () => import('@/components/edit.vue')
    }
  ]
});
