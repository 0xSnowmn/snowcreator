<template>
<div>
  <v-overlay
      :opacity="1"
      :value="this.$store.state.overlay"
    >
      <v-progress-circular indeterminate size="90" :width="7">
      </v-progress-circular>
    </v-overlay>
  <!-- <waiting v-if="this.$store.state.requested"/> -->
<v-container fluid>
   <login v-if="this.$store.state.requested" />

  <v-row v-else-if="!this.$store.state.activated || !this.$store.state.requested " align="center" style="height:80vh"
      justify="center">
      <v-col>
  <v-card
    class="mx-auto mt-15"
    max-width="900"   
    min-height="300" 
  >
  <v-card-title class="text-h4 text-center font-weight-light justify-center">
      <span class="mt-5 ">YOUR ACTIVATION KEY</span>
    </v-card-title>
    <v-card-text class="mt-15">
    <v-row justify="center" align="center">
         <v-col align-self="center" cols=10>
           <div class="text-center active_div text-h5"><span class="">{{ this.$store.state.active_req }}</span></div>
         </v-col>
         <v-col class="text-center" justify="center" align-self="center" sm="8">
                  <v-btn 
                  :disabled="this.$store.state.btnload"
                  :loading="this.$store.state.btnload"
                  class="ma-15"
                  color="indigo darken-2"
                  @click="$store.dispatch('requestActivate')"
                >
                  Request Activate
                </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</div>
</template>
<style scoped>
.active_div {
  font-weight:700;
}
</style>
<script>
import login from '../components/login.vue'
export default {
  components:{login},
  data(){
    return {
      active:this.$store.state.active_req,
    }
  },
  methods:{
    login(){
      this.$store.dispatch('login',{name:this.user,pass:this.pass})
    },
  },
  created(){
    
  }
}
</script>