import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import Home from '../components/Home'

import store from '../store/store'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.requiresAuth)
  const authed = store.state.isUserLoggedIn
  if (authRequired && !authed) {
    next('/login')
  } else if (authed && to.name == 'Login') {
    next('/')
  } else {
    next()
  }
})

export default router;