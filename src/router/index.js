import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        name: 'home',
        path: '/',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
        children: [{
            name: 'users',
            path: '/users',
            component: () =>
                import ( /* webpackChunkName: "about" */ '@/components/users/users.vue')

        }]


    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router