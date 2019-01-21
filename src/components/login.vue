<template>

  <div id="login" align="center">

    <el-row :gutter="20">


      <el-col :span="6" :offset="8">
        <div class="grid-content bg-purple" style="margin-top:500px;margin-left: 100px">

          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">

            <el-form-item  prop="account" class="account">
              <img slot="label" src="/static/img/account.png"></img>
              <el-input type="text" v-model="ruleForm2.account" autocomplete="off" id="account" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pass">
              <img slot="label" src="/static/img/pass.png"></img>
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" id="pass" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
            </el-form-item>

              <el-button type="primary"  @click="submitForm('ruleForm2')" style="background-color: #68B709;width: 89%;margin-left:11%">提交</el-button>
              <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>

              <el-button type="success" @click="register">注册</el-button>-->
          </el-form>
        </div>
      </el-col>
    </el-row>
    </div>

</template>

<script>

import {mapMutations} from 'vuex'

export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        /* if (this.ruleForm2.pass !== '') {
          this.$refs.ruleForm2.validateField('pass')
        } */
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户名'))
      } else {
        /* if (this.ruleForm2.account !== '') {
           this.$refs.ruleForm2.validateField('account')
         } */
        callback()
      }
    }
    return {
      userToken: '',
      ruleForm2: {
        pass: '',
        account: '',
        show2: true
      },
      rules2: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/login',
            data: {
              "username": this.ruleForm2.account,
              "password": this.ruleForm2.pass
            },
            headers: {
              'Authorization': ' '
            }
          }).then(res => { // res是返回结果
            if (res.data.code === '401') {
              this.$alert('账号或密码错误，请重新输入')
            } else {
              console.log(res.data)
              // 将token存储到浏览器请求头
              /*this.userToken = 'Bearer ' + res.data.token*/
              this.userToken = res.headers.authorization
              this.changeLogin({Authorization: this.userToken})
              // 将用户姓名存储到localStorage(只能存储字符串信息)，以便在菜单栏top.vue中使用
              sessionStorage.setItem('userInfo', res.data.name)
              sessionStorage.setItem('userId', res.data.id)
              sessionStorage.setItem('userPicture', res.data.picture)
              sessionStorage.setItem('userType', res.data.type)
              this.$router.push('/rxrk')
              // this.$alert('登陆成功')
              this.open7(res.data.name)
            }
          }).catch(err => { // 请求失败就会捕获报错信息
            console.log('服务正在维护，请稍后再试！')
            console.log(err)
          })
        } else {
          console.log('用户信息错误')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    register () {
      this.$router.push('/register')
    },
    open7 (data) {
      this.$notify.success({
        title: '登录提示',
        message: '欢迎使用航天长峰人脸侦察平台！',
        offset: 80,
        showClose: true
      })
    }
  }
}
</script>
<!--QQ登录-->

<style scoped>
#login{
  height: 1080px;
  background-image: url('/static/img/login2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: azure;
}
#account{
  height:48px!important;
  background-color:transparent!important;
}
#pass{
  height:48px!important;
  background-color:transparent!important;
}
.accountinput{
  background-image: url('/static/img/qmy1.jpg');
  background-size: auto 18px;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 80% 80%;
}
.bg-purple{
  background: transparent!important;
}
.enterInput{
  opacity:0!important;;
}
</style>
