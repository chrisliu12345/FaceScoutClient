import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    // 存储token
    Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
    ruleForm: {
      agemin: '',
      agemax: '',
      per:10,
      maxcount:20,
      sex: 1,
      nation: '',
      pcc:'',
      type: [0],
      file:'',
      pageSize:8,
      pageNum:1
    }
  },
  /* actions: {
   changeLogin(ctx,Authorization){
     ctx.commit('changeLogin',Authorization);
   }
 }, */
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      sessionStorage.setItem('Authorization', user.Authorization)
    }
  }
})
