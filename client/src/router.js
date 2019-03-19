import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Test from './views/Test.vue';
import register from './views/register.vue';
import login from "./views/login.vue";
import header from "./views/header.vue"
import list from "./views/list.vue"
import cart from "./views/cart.vue"
import checkout from "./views/checkout.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/header',
      name: 'header',
      component: header,
    },
    {
      path: '/list',
      name: 'list',
      component: list,
    }, {
      path: '/cart',
      name: 'cart',
      component: cart,
    }, {
      path: '/checkout',
      name: 'checkout',
      component: checkout,
    }
  ],
});
