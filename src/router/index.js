import { createRouter, createWebHashHistory } from 'vue-router'
import TotalPage from '../components/TotalPage'
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
