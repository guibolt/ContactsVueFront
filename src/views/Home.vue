<template>
  <v-container>
            <h1 class="font-weight-light white--text body mt-8">
                Agenda Online
            </h1>
               <v-btn icon @click="sair" color="white" style="float:right;">
          Sair
          <v-icon  >exit_to_app</v-icon>
        </v-btn>
      <v-layout justify-center="">
          <div>
            <v-btn @click="abrirMenu">
                    Adicionar novo contato
            </v-btn>

              <v-card v-for="contato in lstContatos" :key="contato.idContato" class="mt-5" width="500" @click="mostrarMais(contato)">
                    <v-card-title>
                        <v-avatar color="blue" class="white--text mr-2">
                             {{contato.nome[0]}}
                        </v-avatar>
                          {{contato.nome}}
                    </v-card-title>
                    <v-card-subtitle v-if="contato.nota">
                            Observação: {{contato.nota}}
                    </v-card-subtitle>
              </v-card>
          </div>
      </v-layout>
      <v-dialog v-model="mostrar" width="400">
        
          <v-card height=auto width="400">

              <v-row justify="center">
              <h1 class="title">Detalhes</h1>
              </v-row>
                         <h2 class="font-weight-light mb-5" v-if="contatoEscolhido&& contatoEscolhido.contatoTelefones.length > 0">

                  Telefones
                </h2>

                    <v-banner color="blue" width="250" height="50"
                     v-for="contato in contatoEscolhido.contatoTelefones" :key="contato.id"  class="mb-2" style="margin-left:18%;">
                        <p class="white--text">
                            Número: {{contato.teleFone}}
                        </p>
                    </v-banner>

                <h2 class="font-weight-light mt-8" v-if="contatoEscolhido &&contatoEscolhido.contatosEmails.length > 0">

                  Emails
                </h2>
                    <v-banner color="blue" width="250" height="50" v-for="contato in contatoEscolhido.contatosEmails" :key="contato.id"  class="mb-2" style="margin-left:18%;">
                        <p class="white--text">
                            Email: {{contato.email}}
                        </p>
                    </v-banner>
                     <v-btn color="blue" class="white--text mb-5 ml-5" outlined="" @click="cadastarNovo" style="margin-top:25%;">
                      Cadastrar novo email ou Telefone
                  </v-btn>
          </v-card>
      </v-dialog>

         <v-dialog v-model="mostrarContato" width="600">
             <v-card width="600" height="250">
                   <v-text-field
                    name="name"
                    label="Nome"
                    type="text"
                    color="primary"
                    v-model="usuario.nome"

                  ></v-text-field>
                  <v-text-field
                    name="email"
                    label="Nota"
                    type="email"
                    color="primary"
                 v-model="usuario.nota"
                  ></v-text-field>
                  <v-btn color="blue" class="white--text mb-5" @click="cadastarNovoContato" block="">
                      Cadastrar
                  </v-btn>
             </v-card>
         </v-dialog>
      <v-dialog v-model="mostrarCadastro" width="600">
          <v-card width="600">

          <v-select :items="tipos" label="Selecione o tipo" v-model="tipo">
                
          </v-select>
           <v-text-field
           v-if="tipo == 'Telefone'"

                    name="name"
                    label="Telefone"
                    type="text"
                    color="primary"
                    v-model="telefone"

                  ></v-text-field>
                  <v-text-field
                     v-if="tipo == 'Email'"
                    name="email"
                    label="email"
                    type="email"
                    color="primary"
                 v-model="email"
                  ></v-text-field>
                   <v-btn color="blue" class="white--text mb-5" @click="cadastrar" block="">
                      Cadastrar
                  </v-btn>
          </v-card>
      </v-dialog>
    
  </v-container>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    data:()=>({
        mostrar: false,
        mostrarContato : false,
        mostrarCadastro: false,
        id: '',
        telefone: '',
        email: '',
        usuario: {
            nota: '',
            nome: ''
        },
        tipo: '',
        tipos:[
            'Telefone',
            'Email'
        ]
    }),
    computed:{
        ...mapState('moduloContatos', [
             "loading",
        "mensagem",
        "sucesso",
        "lstContatos",
        "contatoEscolhido",
        ])
        
    },
methods:{
    ...mapActions('moduloContatos',['buscarContato','cadastrarTelefone','cadastrarEmail','cadastraContato','buscaContatos']),
      ...mapMutations('moduloContatos',['setaState']),
    async mostrarMais(item){
        this.mostrar = !this.mostrar

        await this.buscarContato(item.idContato)
        this.id = this.contatoEscolhido.id
          console.log(this.contatoEscolhido)
    },
    abrirMenu(){
        this.mostrarContato = !this.mostrarContato
    },
    async cadastarNovoContato(){
        await this.cadastraContato(this.usuario)

          this.mostrarContato = !this.mostrarContato
          this.usuario = {
            nota: '',
            nome: ''
        }
           await this.buscaContatos()
    },
     cadastarNovo(){
        this.mostrarCadastro = !this.mostrarCadastro
    },
    async cadastrar(){
       if(this.tipo == 'Telefone'){
           await this.cadastrarTelefone({
              idContato : this.id,
              Telefone : this.telefone 
           })
          this.telefone = ''
       }
       else {
           console.log(this.contatoEscolhido.id)
               await this.cadastrarEmail({
              idContato : this.id,
              email : this.email 
           })
           this.email = ''
       }

        this.mostrarCadastro =  false
         this.mostrarContato =  false
         this.mostrar = false 
            this.tipo = ''
           this.buscaContatos()
    },
    sair(){
        this.setaState()
        localStorage.removeItem('token')
        this.$router.push('/')
    }
},
async mounted(){
    await this.buscaContatos()
    console.log(this.lstContatos)
},
}
</script>

<style>

</style>