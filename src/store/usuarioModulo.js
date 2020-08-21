import {http} from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        loading: false,
        mensagem: '',
        sucesso: false,
        token: ''
    },
    mutations:{
        setaLoading:(state, payload) => state.loading = payload,
        setaMensagem: (state,payload) => state.mensagem = payload,
        setaSucesso: (state,payload) => state.sucesso = payload,
        salvaToken:(state,payload) => state.token = payload
      
    },
    actions: {
        async cadastrarUsuario({commit}, novoUsuario){
            commit('setaLoading',true)
            await http.post('/usuarios/cadastra',novoUsuario).then((resp) =>{
                commit('setaLoading',false)
                if(resp.status == 201){
                    commit('setaSucesso',true)
                    commit('setaMensagem',resp.data.mensagem)
                }
                else
                commit('setaSucesso',false)

                

            }).catch(err => {
                console.log('erro', err)
                commit('setaSucesso',false)
            })
        },
        async Logar({commit}, usuario){
            commit('setaLoading',true)
            await http.post('/usuarios/login',usuario).then((resp) =>{
                commit('setaLoading',false)
                if(resp.status == 200){
                    console.log(resp.data)
                    commit('setaSucesso',true)
                    commit('salvaToken',resp.data.objetoRetorno.token)
                    
                    console.log('token', localStorage.getItem('token'))
                }
                else
                commit('setaSucesso',false)

            }).catch(err => {
                console.log('erro', err)
                commit('setaSucesso',false)
            })
        }
    }
}