import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    i18nText: string;
    transition?: string;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '登录',
      i18nText: 'login',
      transition: 'animate__backInLeft'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/index/data',
        meta: {
          title: '首页',
          i18nText: 'index',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/data.vue')
      },
      {
        path: '/index/list',
        meta: {
          title: '列表',
          i18nText: 'list',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/list/index.vue')
      },
      {
        path: '/index/complexList',
        meta: {
          title: '复杂列表',
          i18nText: 'complexList',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/complexList/index.vue')
      },
      {
        path: '/index/packageList',
        meta: {
          title: '封装列表',
          i18nText: 'packageList',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/packageList/index.vue')
      },
      {
        path: '/index/signList',
        meta: {
          title: '掘金签到列表',
          i18nText: 'signList',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/signList/index.vue')
      },
      {
        path: '/error/401',
        meta: {
          title: '401',
          i18nText: 'fourHundredAndOne',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/error/401.vue')
      },
      {
        path: '/error/404',
        meta: {
          title: '404',
          i18nText: 'fourHundredAndFour',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/error/404.vue')
      },
      {
        path: '/bigdata/index',
        meta: {
          title: '流程图',
          i18nText: 'trendCharts',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/bigdata/index.vue')
      },
      {
        path: '/tool/screenshotTool',
        meta: {
          title: '截图工具',
          i18nText: 'screenshotTool',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/tool/screenshotTool.vue')
      },
      {
        path: '/ai/index',
        meta: {
          title: '聊天机器人',
          i18nText: 'chatbot',
          transition: 'animate__backInLeft'
        },
        component: () => import('@/views/ai/index.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: 'Error',
        component: () => import('@/views/error/404.vue')
      }
    ]
  },
  //redirect
  {
    path: '/:catchAll(.*)',
    redirect: '/index/data'
  }
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0
      };
    }
  },
  routes
});

export default router;
