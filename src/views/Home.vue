<template>

<v-container fill-height fluid>
   <v-overlay
      :opacity="1"
      :value="this.$store.state.overlay"
    >
      <v-progress-circular indeterminate size="90" :width="7">
      </v-progress-circular>
    </v-overlay>
  <v-row align="center" style="height:90vh"
      justify="center">
      <v-col>
  <v-card
    class="mx-auto"
    max-width="1000"    
  >
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ title }}</span>
      <v-avatar
        color="warning lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>
<v-form v-model="valid">
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
         <v-row>
         <v-col cols=6>
            <v-select
            :rules="rule"
            :items="sms"
            label="Sms Site"
            outlined
            v-model="options.settings.provider"
         ></v-select>                  
            </v-col>
            <v-col cols=6>
         <v-text-field :rules=rule required
            label="API Key"
            outlined
            v-model="options.settings.apiKey"
         ></v-text-field>    
         </v-col>
       <v-col cols=3>
         <v-text-field :rules=rule required
            label="Number Account"
            outlined
            v-model="options.settings.numOfAccounts"
         ></v-text-field>
         <v-checkbox
            v-model="options.accountSettings.fullActive"
            label="Full Activate"
            :value="true"
         ></v-checkbox>
         <v-checkbox
            v-model="options.settings.sms_mail"
            label="Sms + Email"
            :value="true"
         ></v-checkbox> 
         <v-checkbox
            v-model="options.settings.manuel"
            label="Manuel"
            :value="true"
         ></v-checkbox> 
         </v-col>
         <v-col>
            <v-radio-group
               v-model="options.settings.vpnRestart"
               row
               >
            <template v-slot:label>
               <div class="text-h7">Restart Vpn After  :</div>
               </template>
            <v-radio class="mr-7 ml-5"
            label="Each Account"
            value="account"
            ></v-radio>
            <v-radio
            label="Checkpoint"
            value="checkpoint"
            ></v-radio>
            </v-radio-group> 
            
         </v-col>
         </v-row>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text>
         <v-row>
         <v-col cols=6>
            <v-autocomplete
            :rules="rule"
            :items="countries"
            label="Country"
            outlined
            v-model="options.accountSettings.country"
         ></v-autocomplete>                  
            </v-col>
            <v-col cols=6>
         <v-autocomplete
         :rules="rule"
         :items="currency"
         label="Currency"
         outlined
         v-model="options.accountSettings.currency"
      ></v-autocomplete>  
         </v-col>
         <v-col cols=6>
         <v-autocomplete
         :rules="rule"
         :items="timezone"
         label="Timezone"
         outlined
         v-model="options.accountSettings.timezone"
      ></v-autocomplete>  
         </v-col>
         <v-col cols=6>
            <v-text-field :rules=rule required
            label="Budget"
            outlined
            v-model="options.boost.budget"
         ></v-text-field>                  
            </v-col>
         </v-row>
        </v-card-text>
      </v-window-item>
     <v-window-item :value="2">
        <v-card-text>
         <v-row>
            <v-col cols=3>
            <v-checkbox
            v-model="selected"
            label="Random Page Info"
            value="randPage"
         ></v-checkbox>                 
            </v-col>
            <v-col cols=6>
            <v-radio-group
               v-model="options.boost.post"
               row
               >
            <template v-slot:label>
               <div>Boost Post  :</div>
               </template>
            <v-radio class="mr-7 ml-5"
            label="Post"
            value="post"
            ></v-radio>
            <v-radio
            label="Photo"
            value="photo"
            ></v-radio>
            </v-radio-group>               
            </v-col>
         <v-col cols=6>
            <v-text-field :rules=rule required
            label="Page Name"
            outlined
            v-model="options.page.name"
         ></v-text-field>                  
            </v-col>
            <v-col cols=6>
         <v-select
         :items="cats"
         label="Category"
         outlined
         v-model="options.page.cat"
      ></v-select>  
         </v-col>
         <v-col cols=6>
            <v-radio-group
               v-model="options.page.type"
               row
               >
            <template v-slot:label>
               <div>Page Create  :</div>
               </template>
            <v-radio class="mr-7 ml-5"
            label="WWW"
            value="www"
            ></v-radio>
            <v-radio
            label="Mobile"
            value="m"
            ></v-radio>
            </v-radio-group>               
            </v-col>
         <v-col>
            <v-text-field :rules=rule required
            label="Number of Posts"
            outlined
            v-model="options.page.postsNum"
         ></v-text-field>                  
            </v-col>
         </v-row>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="3">
        <v-card-text>
         <v-row>
            <v-col>
            <v-checkbox
            v-model="options.fullActive.pages.send"
            label="Like Pages"
            :value="true"
         ></v-checkbox>  
            <v-text-field :rules=rule required
            :disabled="!options.fullActive.pages.send"
            label="Like Pages"
            outlined
            v-model="options.fullActive.pages.num"
         ></v-text-field>                 
            </v-col>
            <v-col >
            <v-checkbox
            v-model="options.fullActive.groups.send"
            label="Join Groups"
            :value="true"
         ></v-checkbox>  
            <v-text-field :rules=rule required
            :disabled="!options.fullActive.groups.send"
            label="Join Groups"
            outlined
            v-model="options.fullActive.groups.num"
         ></v-text-field>                 
            </v-col>
            <v-col >
            <v-checkbox
            v-model="options.fullActive.friends.send"
            label="Add Friends"
            :value="true"
         ></v-checkbox>  
            <v-text-field :rules=rule required
            :disabled="!options.fullActive.friends.send"
            label="Add Friends"
            outlined
            v-model="options.fullActive.friends.num"
         ></v-text-field>                
            </v-col>
         </v-row>
         <v-row>
            <v-col cols=6>
         <v-text-field :rules=rule required
            label="Number Of Account Posts"
            outlined
            v-model="options.accountSettings.numPosts"
         ></v-text-field>                  
            </v-col>
         </v-row>
        </v-card-text>
      </v-window-item>
    </v-window>
</v-form>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        depressed
        @click="go()"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Home',

  computed:{
     title(){
        switch (this.step) {
           case 1:
              return 'General';
           case 2:
              return 'Page and Boost';
            case 3:
              return 'Activate Info';
        }

     }
  },
  data(){
    return {
      valid:false,
      rule: [
        v => !v == '' || 'required',
      ],
      step:1,
      sms:['5Sim','online sms pro'],
      options:{
      settings:{provider:'',apiKey:'',vpnRestart:'account',manuel:false,numOfAccounts:1,sms_mail:false},
      page:{type:'m',name:'',cat:'',postsNum:2},
      boost:{post:'post',budget:400},
      accountSettings:{country:'',currency:'',timezone:'',numPosts:2,fullActive:false},
      fullActive:{pages:{send:false,num:2},groups:{send:false,num:2},friends:{send:false,num:2}},
      },
      countries:this.$store.state.countries,
      selected: [],
      currency:this.$store.state.curr,
      timezone:this.$store.state.timezones,
      cats:["Beauty services","Books magazines","Brands products","Companies organisations","Event sources","Films","Local businesses","Music","Other","People","Sports","Television","Websites blogs"],
    }
  },
  watch:{
     selected(old,newV){
        if(this.selected.includes('randPage')){
           this.random()
        }
     }
  },
  methods:{
     random(){
        var cats = ["Beauty services","Books magazines","Brands products","Companies organisations","Event sources","Films","Local businesses","Music","Other","People","Sports","Television","Websites blogs"]
         var name   = '';
         var characters   = 'abcdefghijklmnopqrstuvwxyz';
         var charactersLength = characters.length;
         for ( var i = 0; i < 7; i++ ) {
            name += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
         this.options.page.name = name
         this.options.page.cat = cats[Math.floor(Math.random() * cats.length)]
     },
     go(){
        if(!this.valid){
         this.$store.commit("alert",{type:'error',text:'Fill All Options Please'})
         return
        }
        if(this.step == 2){
           if(this.options.accountSettings.fullActive){
              this.step++
           } else {
              this.$store.commit('setOptions',this.options)
              this.$router.push('/dash')
           }
        } else if(this.step == 3) {
           this.$store.commit('setOptions',this.options)
           this.$router.push('/dash')
           
        } else {
           this.step++
        }
     }
  }

}
</script>
