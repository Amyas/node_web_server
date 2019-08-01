import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      component: () => import('./views/detail')
    },
    {
      path: '/admin',
      component: () => import('./views/admin')
    },
    {
      path: '/edit/:id',
      component: () => import('./views/edit')
    },
    {
      path: '/login',
      component: () => import('./views/login')
    },
    {
      path: '/new',
      component: () => import('./views/new')
    }
  ]
})
