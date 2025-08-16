import {type RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router'

import {RouteName} from '../utils/RouteName'

const routes = [
  {
    path: '/',
    redirect: {name: RouteName.USER_SCRIPT_LIST},
    children: [
      {
        path: 'user-script',
        children: [
          {
            path: '',
            name: RouteName.USER_SCRIPT_LIST,
            component: () => import('@popup/views/UserScript/UserScriptListView.vue'),
          },
          {
            path: ':userScriptId',
            name: RouteName.USER_SCRIPT,
            component: () => import('@popup/views/UserScript/UserScriptView.vue'),
          },
        ],
      },
    ],
  },
] as const satisfies RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from) {
    if (to.name === from.name) return

    return {top: 0}
  },
  routes,
})

export default router