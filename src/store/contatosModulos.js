import {http} from '@/plugins/axiosToken'
import store from './index'


export default {
    namespaced: true,
    state: {
        loading: false,
        mensagem: '',
        sucesso: false,
        lstContatos: [],
        contatoEscolhido: ''
    },
    mutations:{
        setaLoading:(state, payload) => state.loading = payload,
        setaMensagem: (state,payload) => state.mensagem = payload,
        setaSucesso: (state,payload) => state.sucesso = payload,
        setaListaContatos: (state,payload) => state.lstContatos = payload,
        setacontatoEscolhido: (state,payload) => state.contatoEscolhido = payload,
        setaState(state) {
            state.lstContatos = []
            state.loading= false,
            state.mensagem =  '',
            state.sucesso =false,
            state.contatoEscolhido = ''
        }
        },
    actions:{
        async buscarContato({commit}, contatoId){
            commit('setaLoading',true)
            await http.get(`/contatos/busca/contato?tokenUsuario=${store._modules.root.state.moduloUsuario.token}&contatoId=${contatoId}`).then((resp)=>{
                if(resp.status == 200){
                    commit('setaSucesso',true)
                    commit('setaMensagem',resp.data.mensagem)
                    commit('setacontatoEscolhido',resp.data.objetoRetorno)
                }
                else 
                    commit('setaSucesso',false)
                
            }).catch(err => {
                console.log('erro', err)
                commit('setaSucesso',false)
            })
        },
        async cadastrarTelefone({commit}, telefone){
            commit('setaLoading',true)
            await http.post(`/contatos/cadastra/telefone?tokenUsuario=${store._modules.root.state.moduloUsuario.token}`,telefone).then((resp) =>{
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
        async cadastrarEmail({commit}, email){
            commit('setaLoading',true)
            await http.post(`/contatos/cadastra/email?tokenUsuario=${store._modules.root.state.moduloUsuario.token}`,email).then((resp) =>{
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
        async cadastraContato({commit},contato){
            commit('setaLoading',true)
            await http.post(`/contatos/cadastra?tokenUsuario=${store._modules.root.state.moduloUsuario.token}`,contato).then((resp)=>{
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
        async buscaContatos({commit}){
            commit('setaLoading',true)
            await http.get(`/contatos/busca?tokenUsuario=${store._modules.root.state.moduloUsuario.token}`).then((resp)=>{
                if(resp.status == 200){
                    commit('setaSucesso',true)
                    commit('setaMensagem',resp.data.mensagem)
                    commit('setaListaContatos',resp.data.objetoRetorno)
                }
                else 
                    commit('setaSucesso',false)
            }).catch(err => {
                console.log('erro', err)
                commit('setaSucesso',false)
            })
        }
    },
    
}