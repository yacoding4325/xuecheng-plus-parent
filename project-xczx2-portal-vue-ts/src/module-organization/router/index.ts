import Layout from '../pages/layout.vue'

export default [
  {
    path: '/organization',
    component: Layout,
    children: [
      // 课程列表
      {
        path: 'course-list',
        component: () => import('../pages/course-manage/course-list.vue')
      },
      // 课程添加
      {
        path: 'course-add',
        component: () => import('../pages/course-manage/course-add.vue')
      },
      // 机构详情
      {
        path: 'company',
        component: () => import('../pages/teaching-company/company.vue')
      },
      // 机构成员
      {
        path: 'member',
        component: () => import('../pages/learning-member/member.vue')
      },
      // 直播管理
      {
        path: 'live-list',
        component: () => import('../pages/live-manage/live-list.vue')
      },
      // 媒资管理
      {
        path: 'media-list',
        component: () => import('../pages/media-manage/media-list.vue')
      },
      // 作业管理
      {
        path: 'work-list',
        component: () => import('../pages/work-manage/work-list.vue')
      },
      // 评价管理
      {
        path: 'course-comment-list',
        component: () =>
          import('../pages/course-comment-manage/course-comment-list.vue')
      },
      // 作业批改
      {
        path: 'work-record-list',
        component: () =>
          import('../pages/work-record-manage/work-record-list.vue')
      },
      // 批阅详情
      {
        path: 'work-record-overall',
        component: () =>
          import('../pages/work-record-manage/work-record-overall.vue')
      },
      // 财务管理
      {
        path: 'order-list',
        component: () => import('../pages/order-manage/order-list.vue')
      }
    ]
  }
]
