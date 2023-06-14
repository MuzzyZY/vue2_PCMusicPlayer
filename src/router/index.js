import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'discover',
    component: () => import(/* webpackChunkName: "about" */ '../views/discoverView.vue')
  },
  {
    path: '/discover',
    name: 'discover',
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
