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
      redirect: '/jobs'
    },
    // {
    //   path: '/:username',
    //   name: 'profile',
    //   component: () => import('@/views/ProfileView.vue'),
    //   beforeEnter: (to, from, next) => {
    //     const isNotAuthenticated = !store.getAuthentication || !store.authentication.active ;
    //     if (isNotAuthenticated) {
    //       next('/'); // Redirect to
    //     } else {
    //       next(); // Proceed to the route
    //     }
    //   },
    // },
    {
      path: '/jobs',
      name: 'jobs',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',

      component: () => import('@/views/SignupView.vue'),    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !store.getAuthentication || !store.authentication.active || store.authentication.type !== 'admin';
        if (isAuthenticated) {
          next('/'); // Redirect to
        } else {
          next(); // Proceed to the route
        }
      },
    },
    {
      path: '/:username',
      name: 'user',
      component: () => import('@/views/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        // const isNotAuthenticated = !store.getAuthentication || !store.authentication.active || store.authentication.type !== 'admin';
        const isNotAuthenticated = !store.getAuthentication || !store.authentication.active;
        if (isNotAuthenticated) {
          next('/'); // Redirect to
        } else {
          next(); // Proceed to the route
        }
      },
      // meta: {
      //   title: store.getAuthentication.user.firstName + ' ' + store.getAuthentication.user.lastName
      // }
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
      path: '/jobs/add-job',
      name: 'Add Job',
      component: () => import('@/views/AddJob.vue'),
    },
    {  
      path: "/:pathMatch(.*)*",
      // path: "/:catchAll(.*)",
      name: "page-not-found",
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

  const validated = !store.getAuthentication || !store.authentication.active

  if(to.path == '/jobs' && validated ) {
    return "/login";
  }
  
  if(to.path == '/about' && validated) {
    return "/login";
  }
  
  if(to.path == '/jobs/add-job' && validated) {
    return "/login";
  }
  
  console.log('testing', store.authentication)
})

export default router
