import Vue from 'vue'

import App from './App.vue'

// import nav from './nav.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import systemIndex from './views/systemIndex'
import paperList from './components/administrators/paperManagement/paperList'
import login from './views/login'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  login,
  axios,
  render: h => h(App)
}).$mount('#app')
