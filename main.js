import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'
//注册全局组件
import ItemFoot from './components/ItemFoot.vue'
Vue.component('ItemFoot',ItemFoot)
Vue.prototype.$store = store


const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif