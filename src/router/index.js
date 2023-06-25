import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'discover',
    redirect: '/discover'
  },
  {
    path: '/discover',
    name: 'discover',
    children: [
      {
        path: '/',
        name: 'recommend',
        component: () => import(/* webpackChunkName: "about" */ '../pages/recommendPage.vue')
      },
      {
        path: 'songlist',
        name: 'songlist',
        component: () => import(/* webpackChunkName: "about" */ '../components/songList.vue')
      },
      {
        path: 'totallist',
        name: 'totallist',
        component: () => import(/* webpackChunkName: "about" */ '../components/totalList.vue')
      },
      {
        path: 'artists',
        name: 'artists',
        component: () => import(/* webpackChunkName: "about" */ '../components/artist/artistsList.vue')
      },
      {
        path: 'newsongs',
        name: 'newsongs',
        component: () => import(/* webpackChunkName: "about" */ '../components/newSongs.vue')
      }
    ],
    component: () => import(/* webpackChunkName: "about" */ '../views/discoverView.vue')
  },
  {
    path: '/myinfo',
    name: 'myinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/myInfoView.vue')
  },
  {
    path: '/searchlist',
    name: 'searchList',
    component: () => import(/* webpackChunkName: "about" */ '../pages/showSearchList.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '../pages/detailSearch.vue')
  },
  {
    path: '/listdetail',
    name: 'listDetail',
    component: () => import(/* webpackChunkName: "about" */ '../pages/listDetail.vue')
  },
  {
    path: '/seelyric',
    name: 'seelyric',
    component: () => import(/* webpackChunkName: "about" */ '../components/showLyric.vue')
  },
  {
    path: '/artistdetail',
    name: 'artistdetail',
    component: () => import(/* webpackChunkName: "about" */ '../components/artist/artistDetail.vue')
  }
]
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
