import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
            meta: {
        title: 'Home',
      },
    },

    {
      path: '/add-post',
      name: 'add-post',
      component: AddPost
    },

    {
      path: '/post/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: EditPost
    },
  ]
})



export default router
