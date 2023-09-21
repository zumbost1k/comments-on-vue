import { createRouter, createWebHashHistory } from 'vue-router'
import CommentSection from '../components/CommentSection.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: CommentSection
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
