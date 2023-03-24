// import Layout from '../pages/layout.vue';

export default [
  {
    path: '/',
    // component: Layout,
    // redirect: '/organization/course-list',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/menu',
    component: () => import('../pages/menu/index.vue')
  },
  {
    path: '/forget-password',
    component: () => import('../pages/forget-password/index.vue')
  }
]
