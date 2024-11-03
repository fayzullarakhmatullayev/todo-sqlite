import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import TodoDetailView from '@/views/TodoDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoView,
    },
    {
      path: '/todo/:id',
      name: 'todo-detail',
      component: TodoDetailView,
    },
  ],
})

export default router
