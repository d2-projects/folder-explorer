import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'flex.css'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router'
import store from './store'
import './component'
import Notify from './plugin/vue.notify'
import './assets/style/public.scss'

Vue.use(Antd)
Vue.use(VueClipboard)
Vue.use(Notify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
