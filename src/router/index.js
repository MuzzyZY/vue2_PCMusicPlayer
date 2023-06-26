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
        // 懒加载写法
        component: () => import(/* webpackChunkName: "discoverChunk" */ '../pages/recommendPage.vue')
      },
      {
        path: 'songlist',
        name: 'songlist',
        component: () => import(/* webpackChunkName: "discoverChunk" */ '../components/songList.vue')
      },
      {
        path: 'totallist',
        name: 'totallist',
        component: () => import(/* webpackChunkName: "discoverChunk" */ '../components/totalList.vue')
      },
      {
        path: 'artists',
        name: 'artists',
        component: () => import(/* webpackChunkName: "discoverChunk" */ '../components/artist/artistsList.vue')
      },
      {
        path: 'newsongs',
        name: 'newsongs',
        component: () => import(/* webpackChunkName: "discoverChunk" */ '../components/newSongs.vue')
      }
    ],
    component: () => import('../views/discoverView.vue')
  },
  {
    path: '/searchlist',
    name: 'searchList',
    component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../pages/showSearchList.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../pages/detailSearch.vue')
  },
  {
    path: '/listdetail',
    name: 'listDetail',
    component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../pages/listDetail.vue')
  },
  {
    path: '/seelyric',
    name: 'seelyric',
    component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../components/showLyric.vue')
  },
  {
    path: '/artistdetail',
    name: 'artistdetail',
    component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../components/artist/artistDetail.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../components/video/videoPlayer.vue'),
    children: [
      {
        path: 'program',
        component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../components/video/programPlayer.vue')
      },
      {
        path: 'mv',
        component: () => import(/* webpackChunkName: "laterSeeChunk" */ '../components/video/mvPlayer.vue')
      }
    ]
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
