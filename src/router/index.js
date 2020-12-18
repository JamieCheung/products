import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import editProduct from '../views/editProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editProduct',
    name: 'editProduct',
    component: editProduct
  },
]

const router = new VueRouter({
  routes
})

export default router
