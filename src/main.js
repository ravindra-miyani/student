import Vue from 'vue'
import VueRouter from 'vue-router';
import VeeValidate from "vee-validate";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import App from './App.vue'
import studentList from './components/studentList.vue';
import Edit from './components/Edit.vue';
import Index from './components/Index.vue';

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VeeValidate);

Vue.config.productionTip = false

const routes = [
  {
    name: 'List',
    path: '/list',
    component: studentList
  },
  {
    name: 'Edit',
    path: '/edit',
    component: Edit
  },
  {
    name: 'Index',
    path: '/index',
    component: Index
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
