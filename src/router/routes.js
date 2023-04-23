const routes = [
    { path: '/', name: 'sign-in', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'sign-up', component: () => import('../views/RegisterView.vue') },
    { path: '/home', name: 'home', meta: { authRequired: true }, component: () => import('../views/HomeView.vue') },
    { path: '/new-candidate', name: 'new-candidate', meta: { authRequired: true }, component: () => import('../views/NewCandidate.vue') },
    { path: '/edit-candidate', name: 'edit-candidate', meta: { authRequired: true }, component: () => import('../views/EditCandidate.vue') },
    {
      path: '/:catchAll(.*)*',
      component: () => import('../views/AboutView.vue')
    }
]
  
export default routes