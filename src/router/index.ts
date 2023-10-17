/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2022-07-19 14:51:08
 * @LastEditors: 程
 * @LastEditTime: 2023-09-12 11:44:54
 */
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
          transition: 'animate__bounceInLeft'
        },
        component: () => import('@/views/data.vue')
      },
      {
        path: '/index/list',
        meta: {
          title: '列表',
          i18nText: 'list',
          transition: 'animate__bounceInLeft'
        },
        component: () => import('@/views/list/index.vue')
      },
      {
        path: '/index/test',
        meta: {
          title: 'test',
          i18nText: 'list',
          transition: 'animate__bounceInLeft'
        },
        component: () => import('@/views/test/index.vue')
      },
      {
        path: '/error/401',
        meta: {
          title: '401',
          i18nText: 'fourHundredAndOne',
          transition: 'animate__bounceInLeft'
        },
        component: () => import('@/views/error/401.vue')
      },
      {
        path: '/error/404',
        meta: {
          title: '404',
          i18nText: 'fourHundredAndFour',
          transition: 'animate__bounceInLeft'
        },
        component: () => import('@/views/error/404.vue')
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
