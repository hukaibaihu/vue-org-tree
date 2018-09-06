import Vue from 'vue'
import App from './App.vue'
import Vue2OrgTree from 'vue2-org-tree'

Vue.use(Vue2OrgTree)

console.log(Vue2OrgTree)

new Vue({
  el: '#app',
  render: h => h(App)
})
