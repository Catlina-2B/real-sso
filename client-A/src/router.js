import { createRouter, createWebHistory } from 'vue-router'

import Cookies from 'js-cookie'

import Back from './components/back.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: () => import("./components/Root.vue"),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('./components/Home.vue')
      },
      {
        path: '/callback',
        component: Back
      },
    ]
  }]
})

const whiteList = ['/callback']

router.beforeEach((to, from, next) => {

  const identity = Cookies.get('identity');
  const sid = Cookies.get('sid');

  if (identity && sid) {
    if (to.path == '/callback') {
      next('/')
    }
  } else {
    if (whiteList.indexOf(to.path) < 0) {
      console.log(to)
      const redirect_url = to.fullPath
      window.location.href = `http://127.0.0.1:6001/?redirect_url=${encodeURIComponent(redirect_url)}&name=a`
    }
  }
  next();
})

export default router;