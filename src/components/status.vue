<template>
    <div>
        <v-sheet class="mt-5 px-6 mx-auto" min-height="85vh" rounded="lg">
              <v-card-text class="py-0">
                <v-timeline align-top dense>
                  <v-timeline-item :color="(this.done.includes('createMail')) ? 'green darken-1' : this.progress == 'createMail' ? 'warning' : 'grey darken-2'" small >
                    <v-row class="pt-3">
                      <v-col class="">
                        <strong>Creating MailBox</strong>
                      </v-col>
                    </v-row>
                  </v-timeline-item>
                  <v-timeline-item :color="(this.done.includes('generateInfo')) ? 'green darken-1' : this.progress == 'generateInfo' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col class="">
                      <strong>Generate Names</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('FillData')) ? 'green darken-1' : this.progress == 'FillData' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col class="">
                      <strong>Fill Form</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('getConfirmCode')) ? 'green darken-1' : this.progress == 'getConfirmCode' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Waiting Code</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('typeConfirmCode')) ? 'green darken-1' : this.progress == 'typeConfirmCode' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Write Code</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('chnageCover')) ? 'green darken-1' : this.progress == 'chnageCover' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Change Cover</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('newPost')) ? 'green darken-1' : this.progress == 'newPost' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Create Post</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('chnageProfile')) ? 'green darken-1' : this.progress == 'chnageProfile' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Change Profile</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('ExtractCookie')) ? 'green darken-1' : this.progress == 'ExtractCookie' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Extract Cookies</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
                <v-timeline-item :color="(this.done.includes('Finish')) ? 'green darken-1' : this.progress == 'Finish' ? 'warning' : 'grey darken-2'" small >
                  <v-row class="pt-3">
                    <v-col>
                      <strong>Clean Device</strong>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
        </v-sheet>
    </div>
</template>
<script>
const ipc = require("electron").ipcRenderer
export default {
    data(){
        return{
          done:[],
          progress:''
        }
    },
    created(){
    ipc.on('progress',(event,arg) => {
      this.progress = arg
        if(this.arg == "Finish") {
        this.progress = ''
      }
    })
    ipc.on('done',(event,arg) => {
      this.done.push(arg)
      if(this.arg == "Finish") {
        this.done = []
      }
    })
    ipc.on('push',(event,arg) => {
      this.done = []
    })
  },
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  color:#111;
}

</style>