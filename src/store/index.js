import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
const getmac = require('getmac')
import router from '../router/index'
axios.defaults.baseURL = 'https://snoworg.herokuapp.com/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert:{
      visable:false,
      type:'success',
      text:'Message',
    },
    isLogged:true,
    key:null,
    version:'v1',
    requested:false,
    activated:false,
    active_req:'',
    countries:[],
    curr:[],
    program:'creator',
    timezones:[],
    btnload:false,
    options:null,
    overlay:true
  },
  mutations: {
    alert:(state,payload) => {
      state.alert.visable = true
      setTimeout(() => {
        state.alert.visable = false
      }, 5000)
      state.alert.type = payload.type
      state.alert.text = payload.text
    },
    setOptions:(state,payload) => {
      state.options = payload
    },
    changeKey:(state,payload) => {
      state.key = payload
      state.isLogged = true
    }
  },
  actions: {
    login: async (context,pay) => {
      const mac = getmac.default().toLowerCase()
      const active_key = localStorage.getItem('active_key')
      context.state.btnload = true
      await axios.post('/activates/login',
      {mac:mac,program:context.state.program,version:context.state.version,user:pay.user,pass:pay.pass,active_request:active_key})
      .then(res => {
        localStorage.setItem('info',pay.user + ':' + pay.pass)
        localStorage.setItem('activated',true)
        context.state.overlay = false
        context.commit('alert',{type:'success',text:'Logged In Successfully'})
        router.push('/home')
      }).catch(err => {
        router.push('/')
        context.commit('alert',{type:'error',text:err.response.data.message})
        context.state.overlay = false
        context.state.btnload = false
      })
    },
    getActiveRequest: async (context) => {
      const mac = getmac.default().toLowerCase()
      await axios.post('/activates/active_request',{mac:mac,program:context.state.program,version:context.state.version}).then(res => {
        context.state.active_req = res.data.data
        localStorage.setItem('active_key',res.data.data)
        context.state.overlay = false
      })
    },
    requestActivate: async (context) => {
      const mac = getmac.default().toLowerCase()
      context.state.btnload = true

      await axios.post('/activates/request',{mac:mac,program:context.state.program,version:context.state.version,active_request:context.state.active_req}).then(res => {
        context.commit('alert',{type:'success',text:'Your Activate Request Requested Successfuly'})
        context.state.requested = true
        localStorage.setItem('requested',true)
        context.state.btnload = false
        context.state.activated = true
      }).catch(err => {
          if(err.response.data.errors.active_request[0].includes('already been taken')){
            context.state.requested = true
            context.commit('alert',{type:'success',text:'Your Activate Requested Successfuly'})
            context.state.btnload = false
            localStorage.setItem('requested',true)
            context.state.activated = true
            return
          }
          context.commit('alert',{type:'error',text:err.response.data.message})
          context.state.btnload = false
      })
    },
    checkKey:async (context,key) => {
      const mac = getmac.default().toLowerCase()
      axios.get('/keys/check?key=' + key + '&mac=' + mac + '&prog=Creator').then(async (res) => {
                if(res.data.isExpired === "false" && res.data.mac === mac) {
                  localStorage.setItem('key',key)
                  context.commit("changeKey",key)
                  router.push('/')
                }
            }).catch(rr => {
              if(rr.response.status === 401) {
                return
              } else if(rr.response.data.isExpired === "true") {
                return
              } else if(rr.response.data.msg == 'error'){
                return
              }
            })
    },
    getCountries(context){
      axios.get('https://raw.githubusercontent.com/yghonem14/pkgs/main/countries.txt').then(res => {
      var countries =  res.data.trim().split('\n')    
      countries.forEach(country => {
        context.state.countries.push(country)
        })
      })
      axios.get('https://raw.githubusercontent.com/yghonem14/pkgs/main/curr.txt').then(res => {
      var curr =  res.data.trim().split('\n')    
      curr.forEach(cur => {
        context.state.curr.push(cur)
        })
      })
      axios.get('https://raw.githubusercontent.com/yghonem14/pkgs/main/time').then(res => {
      var timezones =  res.data.trim().split('\n')    
      timezones.forEach(timezone => {
        context.state.timezones.push(timezone)
        })
      })
    }
  },
  modules: {
  }
})
