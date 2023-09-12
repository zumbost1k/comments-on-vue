import { createRouter, createWebHashHistory } from 'vue-router'
import TotalPage from '../components/totalPage'
const routes = [
  {
    path: '/',
    name: 'home',
    component: TotalPage
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
