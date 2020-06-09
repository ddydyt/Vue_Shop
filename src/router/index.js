import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/index.vue'
import Home from '../components/home/index.vue'
import Welcome from '../components/welcome/index.vue'
import Users from '../components/user/users.vue'
import PubMessage from '../components/pubmessage/pubmessage.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/home', 
    component: Home, 
    redirect: '/welcome', 
    children:[
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/pubMessage',component: PubMessage}
    ] 
  }
]

const router = new VueRouter({
  routes
})


// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/login')
    return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login')
  next()
})

export default router
