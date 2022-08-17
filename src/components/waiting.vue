<template>
<v-container  fluid>
  <v-row align="center" style="height:80vh"
      justify="center">
      <v-col>

    <v-card-text class="mt-15">
           <div class="text-h3 text-center font-weight-light justify-center"><span class="">Waiting Owner To Confirm Your Activation</span></div>
            </v-card-text>
        </v-col>
      </v-row>
    </v-container>
</template>
<style scoped>
.active_div {
  font-weight:700;
}
</style>
<script>
export default {
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
    this.$store.dispatch('getActiveRequest')
  }
}
</script>