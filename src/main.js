import Vue from 'vue'
import App from './App.vue'
import { Icon } from 'ant-design-vue'

Vue.use(Icon)

new Vue({
  el: '#app',
  render: h => h(App)
})
