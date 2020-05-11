import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify';
import router from './router/index'
import store from './store/index'
import * as fb from 'firebase'
import BuyDialogComponent from './components/Common/BuyDialog'

Vue.use(VueRouter);
Vue.component('app-buy-dialog',BuyDialogComponent)
Vue.use(Vuetify);

Vue.config.productionTip = false;

let firebaseConfig = {
  apiKey: 'AIzaSyB9Br4t6sTrBUjQahMdxmZlCF-SpNYrqR4',
  authDomain: 'onlinestore-edd8c.firebaseapp.com',
  databaseURL: 'https://onlinestore-edd8c.firebaseio.com',
  projectId: 'onlinestore-edd8c',
  storageBucket: 'onlinestore-edd8c.appspot.com',
  messagingSenderId: '143893200588',
  appId: '1:143893200588:web:71047533dace14f1a64c69'
}
// Initialize Firebase
fb.initializeApp(firebaseConfig)

let app;
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      vuetify,
      store,
      router,
      created(){
        fb.auth().onAuthStateChanged(user => {
          if (user) {
            this.$store.dispatch('autoLoginUser', user)
          }
          this.$store.dispatch('fetchProducts')
        })
      }
    }).$mount('#app');
  }
})

