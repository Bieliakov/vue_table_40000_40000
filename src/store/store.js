import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import table from './modules/table/table';

export default new Vuex.Store({
  state: {
    scrollSize: 16
  },
  getters: {
    scrollSize(state) {
      return state.scrollSize
    }
  },

  modules: {
    table
  }
});
