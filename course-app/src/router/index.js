import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores/index.js'
import { createPinia } from 'pinia';
import HomeView from '@/views/HomeView.vue'

const pinia = createPinia();
const store = useStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/UsersView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {  
      // path: "/:pathMatch(.*)*",
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
      meta: {
        title: 'Page not found'
      }
    },
  ],
})

//Dynamically Change Page Title
router.beforeEach((to, from) => {

  document.title = to.meta?.title ?? 'Default Title'

  const validated = !store.getAuthentication || store.authentication.active == false

  if(to.path == '/' && validated ) {
    return "/login";
  }
  
  if(to.path == '/about' && validated) {
    return "/login";
  }
  
  if( to.path == '/users' && store.authentication.type !== 'admin'){
    return "/";
  } else if(to.path == '/users' && validated) {
    return "/login";
  } 
  
  console.log('testing', store.authentication)
})

export default router
