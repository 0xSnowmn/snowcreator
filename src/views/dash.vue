<template>
  <div class="dash">
    <v-container>
        <v-row class="mt-3" justify="center" align="end">
          <!-- <v-col cols="4">
            <status/>
          </v-col> -->
          <v-col>
          <v-sheet class="mt-1 mx-auto pa-5" min-height="85vh" rounded="lg">
        <v-container>
          <v-row justify="center" align="end">
          <v-col>
              <v-data-table
              :headers="headers"
              :items="accounts"
              :options="options"
              sort-by="calories"
              class="elevation-1">
              <template v-slot:top>
                <v-icon class="mb-3" @click="$router.go(-1)">mdi-keyboard-backspace</v-icon>
                <v-toolbar flat>
                  <div class="text-center"><span class="mr-4">Attempts: {{ attempts }}</span><span class="mr-4">Created: {{ created }}</span></div>
                  <v-spacer></v-spacer>
                    <template>
                      <v-btn @click="stop = !stop"
                        :class="{'success' : stop,'deep-orange darken-4':!stop}"
                        dark
                        class="mb-2">
                        {{ !stop ? 'Stop' : 'Start' }}
                      </v-btn>
                    </template>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-col>
          </v-row>
        </v-container>
        </v-sheet>
      </v-col>
     </v-row>
    </v-container>
  </div>
</template>

<script>
import status from '@/components/status.vue'
const ipc = require("electron").ipcRenderer
export default {
  name:'Dash',
    data(){
    return {
      stop:true,
      accounts:[],
      attempts:0,
      created:0,
      options:{
        itemsPerPage:6
      },
      headers: [
        { text: 'Name', value: 'name' },
          { text: 'Profile Id', value: 'id' },
          { text: 'Password', value: 'pass' },
          { text: 'Page Id', value: 'pgId' },
          { text: 'Country', value: 'country' },
          { text: 'Currency', value: 'curr' },
          { text: 'Post Id', value: 'pId' },
        ],
    }
  },
  components:{
    status
  },
  created(){
    ipc.on('profile_id',(event,arg) => {
      this.accounts.push({id:arg})
    })
    ipc.on('status',(event,arg) => {
      if(arg == "Check"){
        this.$store.commit("alert",{type:'error',text:'Account CheckPoint!!'})
        this.attempts = this.attempts + 1
      }
    })
    ipc.on('finishedAll',(event) => {
        this.stop = !this.stop
        this.$store.commit("alert",{type:'success',text:`Script Finished His Work, ${this.created} Account Created `})
    })
    ipc.on('push',(event,arg) => {
      console.log(arg)
      var theObject = this.accounts.length - 1
      var mm = {}
      mm.id = this.accounts[theObject].id
      mm.pass = arg.password
      mm.pgId = arg.page
      mm.pId = arg.post
      mm.pass = arg.password
      mm.country = arg.country
      mm.curr = arg.curr
      mm.name = arg.first + ' ' +  arg.last
      this.accounts[theObject] = mm
      this.created = this.created + 1
      this.attempts = this.attempts + 1
      this.$store.commit("alert",{type:'info',text:'Account Created !!'})
    })
  },
  watch:{
    stop(){
      if(this.stop == true){
        this.$store.commit("alert",{type:'error',text:'Script Stopped'})
        ipc.sendSync('Stop')
      } else{
        this.start()
        this.$store.commit("alert",{type:'warning',text:'Script Started Success'})
      }
    }
  },
  methods:{
    async start() {
      console.log(this.$store.state.options)
      ipc.sendSync('Start',this.$store.state.options)
    }
  }
}
</script>
