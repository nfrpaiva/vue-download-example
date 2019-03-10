import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//Axios precisa disso para funcionar no IE
import es6Promise from 'es6-promise';
es6Promise.polyfill();
//Axios precisa disso para funcionar no IE
//Hack para o fetch funcionar no IE
import 'whatwg-fetch';
//Hack para o fetch funcionar no IE
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
	render: (h) => h(App)
}).$mount('#app');
