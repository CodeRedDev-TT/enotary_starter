import { createRouter, createWebHistory } from 'vue-router';
import store from "../store/index";


import MainLayout from "../views/shared/MainLayout";
import AuthLayout from "../views/shared/AuthLayout";
import Home from '../views/Home.vue';
import About from '../views/About';

const routes = [
  {
    // authenticated routes
    path: "/",
    component: MainLayout,
    children: [{
      path: "/",
      name: "Home",
      component: Home,
    },{
      path: "/about",
      name: "About",
      component: About,
      meta: {requiresAuth: true}
    }]
  },
 /* {
    component: AuthLayout,
    children: [{
      // unauthenticated routes
      path: '/authenticate',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    }]
  },*/
  {
    path: '/:catchAll(.*)*',
    redirect: "/authenticate",
    meta:{is404: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// GLOBAL Client Side Middleware
router.beforeEach((to, from) => {
  // redirect to login if not authenticated
  if (to.meta["requiresAuth"] && store.state.Auth.token === null) {
    return {
      path: '/authenticate',
      // save the location we were at to come back later
      query: {redirect: to.fullPath},
    };
  }
  // DISABLE AS WE DON"T HAVE LOGIN applied yet
  // redirect to dashboard if logged in
 /* if(store.state.Auth.token !== null && to.path === "/authenticate"){
    let location = to.query["redirect"] || "/";
    return {
      path: location,
    };
  }*/
});

export default router
