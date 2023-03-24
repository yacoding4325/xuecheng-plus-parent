import Layout from '../pages/layout.vue'

export default [
  {
    path: '/entering',
    component: Layout,
    children: [
      // 机构入驻
      {
        name: 'company-entering',
        path: 'company-entering',
        component: () => import('../pages/entering/index.vue')
      },
      // 个人入驻
      {
        name: 'personal-entering',
        path: 'personal-entering',
        component: () => import('../pages/entering/index.vue')
      }
    ]
  }
]
