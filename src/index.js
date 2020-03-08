import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/Home.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin)

export default new Router({
  routes: [
  {path: '/', component: Home},
  // otherwise redirect to home
  { path: '*', redirect: '/home' }
  ]
});