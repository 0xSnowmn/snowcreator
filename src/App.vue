<template>
<v-app>
<v-main>
  <v-container>
      <router-view />
  </v-container>
      <v-fade-transition leave-absolute>
        <v-alert v-if="this.$store.state.alert.visable" elevation="999" :type="this.$store.state.alert.type" width="30%">
          {{ this.$store.state.alert.text }}
        </v-alert>
     </v-fade-transition>
    </v-main>
  </v-app>
</template>
<style scoped>
.v-alert {
  position: fixed;
  left: 82%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;  
}
</style>
<script>
export default {
  name: 'App',
    created(){
      document.title = "Fb Creator Tool Created By Snowman";
      const activated = localStorage.getItem('activated')
      var requested = localStorage.getItem('requested')
      if(requested)  this.$store.state.requested = true
        if(activated !== null) {
          const [user,pass] = localStorage.getItem('info').split(':')
          this.$store.dispatch('login',{user:user,pass:pass}); 
          this.$store.dispatch('getCountries')
          return
        }
      if(requested == null || activated == null ){
          this.$store.dispatch('getActiveRequest')
          this.$router.push('/')
          return
        }
  },
  data: () => ({
    
  }),
};
</script>
