import Vue from 'vue'
import Vuex from 'vuex'
import moduloUsuario from './usuarioModulo'
import moduloContatos from './contatosModulos'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    moduloUsuario,
    moduloContatos
  }
})
