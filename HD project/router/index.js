import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import News from '../components/News.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Dashboard from '../components/Dashboard.vue'
import Footer from '../components/Footer.vue'

const routes = [
  { name: 'Home', path: '/', component: Home, props: true },
  { name: 'About', path: '/about', component: About },
  { name: 'News', path: '/news', component: News },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Signup', path: '/signup', component: Signup },
  { name: 'Dashboard', path: '/dashboard', component: Dashboard },
  {name : 'Footer', path: '/footer', component: Footer}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router