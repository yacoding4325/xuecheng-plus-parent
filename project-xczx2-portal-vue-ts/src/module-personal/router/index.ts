import Layout from '../pages/layout.vue'

export default [
  {
    path: '/personal',
    component: Layout,
    children: [
      // 我的课程
      {
        path: 'my-course',
        component: () => import('../pages/my-course/course-list.vue')
      },
      // 我的订单
      {
        path: 'my-order',
        component: () => import('../pages/my-orders/orders-list.vue')
      },
      // 我的设置
      {
        path: 'setting',
        component: () => import('../pages/setting/setting.vue')
      },
      // 修改密码
      {
        path: 'change-password',
        component: () => import('../pages/change-password/index.vue')
      }
    ]
  }
]
