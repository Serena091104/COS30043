import { createApp } from 'vue';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//import Vue from 'vue'
import App from './App.vue';
import router from './router';
createApp(App)
.use(router) //Ensure the router is used 'in the app'
.mount('#app');


