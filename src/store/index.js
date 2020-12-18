import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    setEditVo: function(state, vo) {
      localStorage.setItem("itemvo", JSON.stringify(vo));
      state.editVo = vo;
    },
  },
  actions: {
  },
  modules: {
  }
})
