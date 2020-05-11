import Vue from 'vue';
import Router from 'vue-router';
import Login from "../components/Auth/Login";
import Home from "../components/Home";
import Register from "../components/Auth/Register";
import Product from "../components/Products/Product";
import NewProduct from "../components/Products/NewProduct";
import ProductList from "../components/Products/ProductList";
import Checkout from "../components/User/Checkout";
import fb from 'firebase'

Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'',
            name:'Home',
            component: Home
        },
        {
            path:'/login',
            name:'login',
            component: Login
        },
        {
            path:'/register',
            name:'register',
            component: Register
        },
        {
            path:'/product/:id',
            props: true,
            name:'product',
            component: Product
        },
        {
            path:'/new',
            name:'new',
            component: NewProduct,
            meta: {
                auth: true
            }
        },
        {
            path:'/list',
            name:'list',
            component: ProductList,
            meta: {
                auth: true
            }
        },
        {
            path:'/checkout',
            name:'checkout',
            component: Checkout,
            meta: {
                auth: true
            }
        }
    ],
    mode:'history'
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.auth);
    const currentUset = fb.auth().currentUser

    if (requiresAuth && !currentUset) {
        next('/login?loginError=true')
    } else if (requiresAuth && currentUset) {
        next()
    } else {
        next()
    }
})

export default router;