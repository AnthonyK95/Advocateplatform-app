import Vue from 'vue'
import Router from 'vue-router'
import landing from '@/views/landing'
import login from '@/views/login'
import register from '@/views/register'
import dashboard from '@/views/dashboard'
import company from '@/views/company'
Vue.use(Router)

let router =  new Router({

  routes: [
    {
      // Default route for home page
      path: '/',
      name: 'landing',
      component: landing
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/company',
      name: 'company',
      component: company
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta:{
        requiresAuth:true
      }
    }
  ],
  mode: 'history',
})

// Define the routes that not require authentication
const allowedRoutes = ['login','register','landing','company','dashboard']
router.beforeEach((to, from, next) => {


  if(allowedRoutes.includes(to.name) ){
    next()
  }
  else if(localStorage.getItem('token')){
    next()
  }
  else{
   next('login')
  }

})


export default router;
