import Vue from 'vue'
import App from '@/App.vue'
import c from '@/package/components'
import '@/home/asstes/base.css'
import router from '@/home/router'
Vue.use(c)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
