import Vue from 'vue'
import App from './App.vue'
import c from './components'
import './home/asstes/base.css'
// import r from '../src/home/router'
Vue.use(c)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // router: r
}).$mount('#app')
