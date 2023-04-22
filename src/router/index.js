import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '../store'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('token')) {
    store.dispatch('setToken', JSON.parse(window.sessionStorage.getItem('token')))
  }
  
    const isAuthenticated = store.getters.isAuthenticated
    const authRequired = to.matched.some(route => route.meta.authRequired)

    if (authRequired) {
      if (isAuthenticated) {
        next()
      } else {
        next({ name: 'sign-in' })
      }
    } else {
      if (isAuthenticated) {
        if (to.name === 'sign-in') {
          next({ name: 'home' })
        } else {
          next()
        }
      } else {
        next()
      }
    }
  })

export default router
