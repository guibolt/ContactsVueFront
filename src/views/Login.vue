<template>
  <v-app
    id="inspire"
    style="
background: linear-gradient(to right, #1488cc, #6dd5ed); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
"
  >
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <h1 class="display-1 text-center font-weight-light white--text mb-3">
              Contacts
              <strong>App</strong>
            </h1>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title class="font-weight-bold">{{ texts.toolbar }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter="submit">
                  <v-text-field
                    v-if="!isLogin"
                    prepend-icon="person"
                    name="name"
                    label="Nome"
                    type="text"
                    color="primary"
                    v-model="usuario.nome"

                  ></v-text-field>
                  <v-text-field
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="email"
                    color="primary"
                       v-model="usuario.email"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Senha"
                    type="password"
                    color="primary"
                       v-model="usuario.senha"
                  ></v-text-field>
                  <v-text-field
                    v-if="!isLogin"
                    prepend-icon="lock"
                    name="password"
                    label="Confirma Senha"
                    type="password"
                    color="primary"
                 v-model="usuario.confirmaSenha"
                  ></v-text-field>
                </v-form>
                <v-btn
                  color="primary"
                  block
                  outlined
                  :loading="loading"
                  @click="submit"
                >{{ texts.toolbar }}</v-btn>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined color="secondary" @click="isLogin = !isLogin">{{ texts.button }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
      data: () => ({
         isLogin: true, //isso que diferencia,
         usuario:{
             nome: '',
             email:'guzzz@email.com',
             senha: '123456',
             confirmaSenha: ''
         }
  }),
    computed:{
        ...mapState('moduloUsuario',['mensagem','loading']),
           texts() {
      return this.isLogin
        ? { toolbar: "Login", button: "Criar conta" }
        : { toolbar: "Criar conta", button: "Já tenho uma conta" };
    }
    },
    methods:{
        ...mapActions('moduloUsuario',['Logar','cadastrarUsuario','sucesso']),
        ...mapMutations('moduloUsuario',['setaLoading']),
      
        async submit(){
         if(this.isLogin){
              await this.Logar(this.usuario)

              this.$router.push('/Home')
              console.log(this.mensagem)
              
             
        }
        else {
            await this.cadastrarUsuario(this.usuario)
            
            this. usuario = {
             nome: '',
             email:'',
             senha: '',
             confirmaSenha: ''
         
            }
            if(this.sucesso){

                this.$toast.success("Cadastro efetuado faça o login.", "Sucesso", {
               position: "topRight"
             });
            }
            this.isLogin = true
            this.setaLoading(false)
        }
      
        }
    }
}
</script>
