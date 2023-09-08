import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'

NProgress.configure({ showSpinner: false })

//设置路由白名单
const whileList = ['/', '/error/401', '/error/404']

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/');
    }
    NProgress.start()
})

router.afterEach(() => {
    NProgress.done()
})

