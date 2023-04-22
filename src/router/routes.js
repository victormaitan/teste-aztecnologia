import MainLayout from '../layouts/MainLayout.vue'

const routes = [
    { path: '', component: () => import('../views/LoginView.vue') },
    {
      path: '/home',
      name: 'home',
      component: MainLayout,
      children: [
        { path: '/', name: 'sign-in', component: () => import('../views/LoginView.vue') },
      ]
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
  
export default routes