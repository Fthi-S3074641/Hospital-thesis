import Vue from 'vue'
import App from './App.vue'
import Hospital from './orcale/hospital'
import store from './store'
import router from './router'

Object.defineProperty(Vue.prototype, '$Hospital', {value: Hospital})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})


