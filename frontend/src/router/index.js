import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import createArticle from "../views/BuatArtikel.vue";
import detailArticle from "../views/DetailArtikel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/create_article",
    name: "CreateArticle",
    component: createArticle,
  },
  {
    path: "/article/:id",
    name: "DetailArticle",
    component: detailArticle,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register", "/"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next("/");
//   } else {
//     next();
//   }
// });
