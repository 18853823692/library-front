import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import BookInfoManage from "../views/BookInfoManage";
import ReaderInfoManage from "../views/ReaderInfoManage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/bookManage',
    name: 'BookManage',
    component: BookInfoManage
  },
  {
    path: '/readerManage',
    name: 'ReaderManage',
    component: ReaderInfoManage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
