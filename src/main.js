import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import Vuelidate from 'vuelidate';

// global components
import AppArrow from './components/arrow/Arrow.vue';

Vue.use(Vuelidate);

Vue.component('app-arrow', AppArrow);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
