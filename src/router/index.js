import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './../components/Register'
import Dashboard from './../components/Dashboard'
import Login from './../components/Login'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        }
    ]
})