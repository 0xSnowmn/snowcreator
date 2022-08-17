<template>
  <div class="home d-flex">
    <v-sheet class="mt-15 mx-auto" min-height="80vh" min-width="60%" rounded="lg">
       <v-row justify="center" align="center"><v-card-title><div class="mt-15 mb-12 text-center text-h3 font-weight-light">Login</div></v-card-title></v-row>
        <v-row justify="center" align="center">
        <v-col cols="10" align-self="center" sm="10">
          <v-text-field class="mb-7" v-model="user" :disabled="this.$store.state.btnload" label="User" outlined></v-text-field>
          <v-text-field v-model="pass" :disabled="this.$store.state.btnload" label="Password" outlined></v-text-field>
        </v-col>
    </v-row>
    <v-row justify="center" align="center">
    <v-card-actions>
       <v-btn :disabled="this.$store.state.btnload"
                  :loading="this.$store.state.btnload" @click="login()" width="200px" class="mt-10" large color="secondary">Login<v-icon right dark>mdi-cloud-upload</v-icon></v-btn>
    </v-card-actions>
    </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted(){
    this.$store.state.overlay = false
  },
  data(){
    return {
      key:'',
      user:'',
      pass:''
    }
  },
  methods:{
    login(){
      this.$store.dispatch('login',{user:this.user,pass:this.pass}); 
    }
  }
}
</script>
