import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import logout from '@/components/logout'
import Bddb from '@/components/stencil/bddb'
import Zhcx from '@/components/stencil/zhcx'
import Bmd from '@/components/stencil/bmd'
import Rxrk from '@/components/stencil/rxrk'
import Rxbd from '@/components/stencil/rxbd'
import register from '@/components/register'
import UserInfo from '@/components/layout/user/userinfo'
import Password from '@/components/layout/user/changePassword'
import Help from '@/components/layout/user/help'
import Home from '@/components/home'
import ProductAdd from '@/components/stencil/resource/productAdd'
import InterfaceAdd from '@/components/stencil/resource/interfaceAdd'
import Census from '@/components/stencil/intelligence/census'
Vue.use(Router)

const router = new Router({
  routes: [
    // 登录
    {
      path: '/',
      name: 'login',
      component: login
    },
    // 注册
    {
      path: '/register',
      name: register,
      component: register
    },
    // 主界面
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
      children: [
        {
          path: '/rxrk',
          name: 'rxrk',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Rxrk
        },
        {
          path: '/bddb',
          name: 'bddb',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Bddb
        },
        {
          path: '/rxbd',
          name: 'rxbd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Rxbd
        },
        {
          path: '/zhcx',
          name: 'zhcx',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Zhcx
        },
        {
          path: '/bmd',
          name: 'bmd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Bmd
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: UserInfo
        },
        {
          path: '/changePassword',
          name: 'changePassword',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Password
        },
        {
          path: '/help',
          name: 'help',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Help
        },
        {
          path: '/productAdd',
          name: 'productAdd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: ProductAdd
        },
        {
          path: '/interfaceAdd',
          name: 'interfaceAdd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: InterfaceAdd
        },
        {
          path: '/census',
          name: 'census',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Census
        }

      ]
    },
    // 退出
    {
      path: '/logout',
      name: 'logout',
      component: logout
    }

  ]

})
// 异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    let token = sessionStorage.getItem('Authorization')
    if (token === null || token === '') {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
