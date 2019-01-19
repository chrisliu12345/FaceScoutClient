<template  >
  <div class="rxrk">
    <el-card class="box-card box-card_rxrk">
      <el-row>
      <el-col :span="6" :offset="0" style="color:white;">
        <!--<el-row>
          <el-col :span="11" :offset="3" >
            <p class="highLine" >请选择图像</p>
          </el-col>
        </el-row>-->
        <div class="highLine">
          <span>请选择图像</span>
        </div>
        <el-row>
          <el-col :span="11" :offset="2" >
            <img :src="imageUrl1" class="image_rxrk">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" :offset="6" >
            <p style="font-size: 13px">请上传单人图片!</p>
          </el-col>
        </el-row>

       <el-row >
        <el-upload
          class="upload-demo"
          action="/face/common/checkPhoto"
          :headers="myHeaders"
          auto-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload">
          <el-button  type="primary" style="width: 150px;margin-top: 50px;">浏览图片</el-button>
        </el-upload>
      </el-row>


      </el-col>
      <el-col :span="6" :offset="5">
        <el-row>

          <el-row>
            <el-col :span="11" :offset="7" >
              <p class="highLine" >基础信息</p>
            </el-col>
          </el-row>
          <el-form ref="baseInfoForm" :label-position="labelPosition" :model="baseInfoForm" label-width="80px" style="color:white;">
            <el-form-item label="入库类型:" style="margin-left: 20px;margin-top:5%;margin-bottom: 10px;" prop="rktype">
              <el-select v-model="baseInfoForm.rktype" placeholder="请选择类型" style="width:265px;height:36px;" class="rxrkSelect">
                <el-option
                  v-for="item in rkType"
                  :key="item.v"
                  :label="item.n"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label-position="labelPosition" label="身份证号码:" label-width="100px" style="margin-bottom: 10px;" prop="sfID">
              <el-input v-model="baseInfoForm.sfID" placeholder="请输入18位身份证号" class="rxrk_jcxx" id="idcard" @blur="pdcsny"></el-input>
            </el-form-item>
            <el-form-item :label-position="labelPosition" label="姓名:" label-width="100px" style="margin-bottom: 10px;" prop="name">
              <el-input v-model="baseInfoForm.name" placeholder="请输入姓名" class="rxrk_jcxx"></el-input>
            </el-form-item>
            <el-form-item :label-position="labelPosition" label="性别:" label-width="100px" style="margin-bottom: 10px;" prop="gender">
              <el-radio v-model="baseInfoForm.gender" label="1" class="rxrk_radio">男</el-radio>
              <el-radio v-model="baseInfoForm.gender" label="2" class="rxrk_radio">女</el-radio>
            </el-form-item>
            <el-form-item :label-position="labelPosition" label="出生年月:" label-width="100px" style="margin-bottom: 10px;" prop="birthday">
              <el-date-picker
                v-model="baseInfoForm.birthday"
                type="date"
                placeholder="请输入出生年月"
                style="width:265px;"
              class="rxrkDate">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="籍贯:" style="margin-left: 20px;margin-bottom:10px;" prop="nativePlace">

              <el-select v-model="baseInfoForm.sheng" value-key="v" @change="selectPro" placeholder="请选择"  class="rxrkSelect jgSelect">
                <el-option
                  v-for="item,index in prooptions"
                  :key="index"
                  :label="item.n"
                  :value="item">
                </el-option>
              </el-select>
              <el-select v-model="baseInfoForm.shi" value-key="v" @change="selectShi" placeholder="请选择"  class="rxrkSelect jgSelect">
                <el-option
                  v-for="item in shioptions"
                  :key="item.v"
                  :label="item.n"
                  :value="item">
                </el-option>
              </el-select>
              <el-select v-model="baseInfoForm.qu" value-key="v"  placeholder="请选择" class="rxrkSelect jgSelect">
                <el-option
                  v-for="item in quoptions"
                  :key="item.v"
                  :label="item.n"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>



            <el-form-item label="民族:" style="margin-left: 20px;margin-bottom: 10px;" prop="nation">
              <el-select v-model="baseInfoForm.nation" placeholder="请选择民族" style="width:265px;" class="rxrkSelect">
                <el-option
                  v-for="(item,index) in mzoptions"
                  :key="index"
                  :label="item.n"
                  :value="item.v"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宗教信仰:" style="margin-left: 20px;margin-bottom: 10px;" prop="faith">
              <el-select v-model="baseInfoForm.faith" placeholder="请选择宗教信仰" style="width:265px;" class="rxrkSelect">
                <el-option
                  v-for="(item,index) in zjoptions"
                  :key="index"
                  :label="item.n"
                  :value="item.v"
                 ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文化程度:" style="margin-left: 20px;margin-bottom: 10px;" prop="educationDegree">
              <el-select v-model="baseInfoForm.educationDegree" placeholder="请选择文化程度" style="width:265px;" class="rxrkSelect">
                <el-option
                  v-for="(item,index) in whcdoptions"
                  :key="index"
                  :label="item.n"
                  :value="item.v"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>

        <el-row>
          <el-col :span="11" :offset="8" >
            <p class="highLine" >有效人脸</p>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <img :src="effectivImageUrl" class="image avatar effective_image" style="width: 60px; height: 60px;">
          </el-col>
          <el-col :span="8">
            <el-button  type="primary" @click="submitForm('baseInfoForm')" style="width: 80px;margin-top:10px;">提交</el-button>
          </el-col>
          <el-col :span="8">
            <el-button  type="primary" style="width:80px;margin-top:10px;" @click="resetForm('baseInfoForm')">重置</el-button>
          </el-col>
        </el-row>

      </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import {StatusData} from "@/basedata/statusData.js"
  import {citydata} from "@/basedata/citydata-debug.js"

  export default {
    name: "rxrk",
    components: {
    },
    data() {
      return {
          myHeaders:{
            Authorization:sessionStorage.getItem('Authorization')
          },
        prooptions:citydata,
        shioptions:[],
        quoptions:[],
        imgageName:'',
        whcdoptions:StatusData['Culturallv'],
        navtivePlaces:StatusData['Nativeplace'],
        mzoptions:StatusData['Nationality'],
        zjoptions:StatusData['Religiousbl'],
        rkType:StatusData['RKType'],
        effectivImageUrl:'/static/img/people.jpg',
        imageUrl1:'/static/img/people.jpg',
        labelPosition: 'right',
        baseInfoForm: {
          rktype: '',
          sfID: '',
          name: '',
          gender: '',
          birthday: '',
          nation: '',
          faith: '',
          educationDegree:'',
          sheng:'',
          shi:'',
          qu:''
        }
      }
    },
    mounted() {

    },
    methods: {
      handleAvatarSuccess1(res, file) {
          if(res.msg='1'){
            this.$message.error('照片中未检测到人像！');
          }else if(res.msg='2'){
            this.$message.error('照片中检测到多个人像！');
          }else{
              this.$message('单人照片上传成功');
            this.imageUrl1 = URL.createObjectURL(file.raw);
            this.effectivImageUrl="data:image/jpeg;base64,"+res.img;
            this.imgageName=res.imgPath;
          }

      },
      beforeAvatarUpload(file) {

        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      selectPro(){
        this.baseInfoForm.shi = ''
        this.baseInfoForm.qu = ''
        this.shioptions = this.baseInfoForm.sheng['c']
        this.quoptions = []
      },
      selectShi(){
        this.baseInfoForm.qu = ''
        this.quoptions = this.baseInfoForm.shi['c']
      },
      submitForm (formName) {
          /*if(this.imgageName==''){
            this.$message.error('请先上传人脸照片');
            return;
          }*/
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: '/face/add/putin',
              data: {
                'type': this.baseInfoForm.rktype,
                'idcard': this.baseInfoForm.sfID,
                'tName': this.baseInfoForm.name,
                'sex': this.baseInfoForm.gender,
                /*birthday: this.baseInfoForm.birthday,*/
                'pcc':this.baseInfoForm.sheng+this.baseInfoForm.shi+this.baseInfoForm.qu,
                'nation': this.baseInfoForm.nation,
                'rcb': this.baseInfoForm.faith,
                'ccb':this.baseInfoForm.educationDegree,
                'file':this.imgageName,
                'np':this.baseInfoForm.sfID.substr(0,6)
              },
              headers: {
                'Authorization': sessionStorage.getItem('Authorization')
              }
            }).then(res => { // res是返回结果
              if(res.data.msg=="1"){
                console.log(res.data)
                //此处用来处理添加成功信息
                //this.$alert('提交成功！');
                this.$message('提交成功');
              }else{
                //this.$alert('提交失败！');
                this.$message.error('提交失败');
              }
              /*if (res.data.code === '401') {
                this.$alert('账号或密码错误，请重新输入')
              }*/
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
      pdcsny(){
        var sfzh = this.baseInfoForm.sfID;
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(sfzh)==false){
            this.$message.error("身份证格式输入有误!");
            return;
        }
        var birthdate = sfzh.substring(6,10)+'-'+sfzh.substring(10,12)+'-'+sfzh.substring(12,14);
        this.baseInfoForm.birthday=birthdate;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },

  }
</script>
<style>
  .rxrk{
    overflow:hidden;
    min-width: 1600px;
    height: 880px;
    background-image: url(/static/img/rxrk_back.png);
    background-repeat: no-repeat;
    background-size: 85% 85%;
    color: azure;
    z-index: 9;
    margin:5% 0% 5% 15%;
  }


  .box-card_rxrk{
    border:0px!important;
    background: transparent;
    margin: 20px 50px 20px 50px;
    padding-bottom: 7%;
    color: white;
    /*z-index: 99;*/
  }
  .image_rxrk{
    margin-left: 10%;
    margin-top: 40%;
    width: 250px;
    height: 250px;
    display: block;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
  }
  .highLine {
    background:url(/static/img/highLine.png) no-repeat center top;
    z-index: 2;
    height: 36px;
    background-position-y: bottom;
  }
  .rxrkSelect>.el-input--suffix>.el-input__inner{
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }
  .jgSelect{
    width: 85px;
  }
  .jgSelect>.el-input--suffix>.el-input__inner{
    font-size: 12px;
  }
  .rxrkDate>.el-input__inner{
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }
  .rxrk_jcxx>.el-input__inner{
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }
  div{
    white-space:nowrap;
  }
  .effective_image{
    width: 60px;
    height: 60px;
    border-radius:0.5em;
    margin: auto;
  }
  .rxrk_radio .el-radio__input>.el-radio__inner{
    background-color: rgba(255,255,255,0) !important;
    border: 1px solid rgba(47,123,165,1);
  }
  .rxrk_radio  .el-radio__label{
    color: white;
  }
  .el-message-box{
    background:rgba(5,22,30,1);
    opacity:0.9;
    border-radius:10px;
    align:center;
    border-color: transparent;
  }
  .el-message-box p{
    font-size:25px;
    font-family:MicrosoftYaHei;
    font-weight:300;
    color:rgba(255,255,255,1);
  }
</style>
