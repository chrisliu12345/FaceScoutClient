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
              <p style="font-size: 13px" ref="tssctu" v-if="showtssc">请上传单人图片</p>
              <img :src="upsuUrl" v-if="showtssucc">
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
            <el-form ref="baseInfoForm" :label-position="labelPosition" status-icon :rules="rules2" :model="baseInfoForm" label-width="80px" style="color:white;">
              <el-form-item label="入库类型:" style="margin-left: 20px;margin-top:5%;margin-bottom: 10px;" prop="rktype">
                <el-select v-model="baseInfoForm.rktype" placeholder="请选择类型" style="width:265px;height:36px;" class="rxrkSelect">
                  <el-option
                    v-for="(item,index) in rkType"
                    :key="index"
                    :label="item.n"
                    :value="item.v">
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
                <el-radio v-model="baseInfoForm.gender" label="0" class="rxrk_radio">女</el-radio>
              </el-form-item>
              <el-form-item :label-position="labelPosition" label="出生年月:" label-width="100px" style="margin-bottom: 10px;" prop="birthday">
                <el-date-picker
                  :picker-options="pickerBeginDateBefore"
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
              <img :src="effectivImageUrl" class="image avatar effective_image" style="width: 43px; height: 60px;">
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
  import {IceIdcard} from '@/utils/IceIdcard.js'

  export default {
    name: "rxrk",
    components: {
    },
    data() {
      var checkName = (rule, value, callback) => {
        console.log(value.length);
        var regHan = /[\u4e00-\u9fa5]/;
        var regYing = /[a-zA-z]/;
        var han = true;
        var ying = true;
        var valueArray = value.split('');
        valueArray.forEach(v => {
          if (!regHan.test(v)) {
            han = false;
          } else if (!regYing.test(v)) {
            ying = false;
          }
        });
      };
        var checksfzh = (rule, value, callback) => {
          var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
          var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
          var sfzh = this.baseInfoForm.sfID;
          var birthdate = sfzh.substring(6,10)+'-'+sfzh.substring(10,12)+'-'+sfzh.substring(12,14);
          if(reg.test(sfzh)==false){
            callback(new Error('身份证格式输入有误'));
          }else if(!city[sfzh.substr(0,2)]){
            callback(new Error('地址编码错误'));
          }else if(birthdate>this.formatDate(new Date())){
            callback(new Error('身份证格式输入有误'));
          }else{
            callback();
          }
        };
      return {
        myHeaders:{
          Authorization:sessionStorage.getItem('Authorization')
        },
        errorinfo:'',
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
        },
        pickerBeginDateBefore:this.endDate(),
        upsuUrl:'/static/img/succ.png',
        showtssc:true,
        showtssucc:false,
        rules2: {
          name: [
            { validator: checkName, trigger: 'blur' }
          ],
          sfID:[
            { validator: checksfzh, trigger: 'blur' }
          ]
        },
      }
    },
    mounted() {

    },
    methods: {
      endDate(){
        return {
          disabledDate(time){
            return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      },
      handleAvatarSuccess1(res, file) {
        if(res.msg=='1'){
          this.$message.error('未检测到人脸');
          this.$refs.tssctu.style.color='red';
        }else if(res.msg=='2'){
          //this.$message.error('照片中检测到多个人像！');
          this.$refs.tssctu.innerText='照片中检测到多个人像';
          this.$refs.tssctu.style.color='red';
        }else{
          /*this.$message.success('单人照片上传成功');*/
          this.$refs.tssctu.innerText='照片上传成功';
          this.$refs.tssctu.style.color='green';
          /*this.showtssc=false;
           this.showtssucc=true;*/
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
        if(this.imgageName==''){
          this.$message.error('请先上传人脸照片');
          return;
        }
        if(! this.errorinfo ==''){
          // this.$message.error(this.errorinfo);
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: '/face/add/putin',
              data: {
                type: this.baseInfoForm.rktype,
                idcard: this.baseInfoForm.sfID,
                tName: this.baseInfoForm.name,
                sex: this.baseInfoForm.gender,
                /*birthday: this.baseInfoForm.birthday,*/
                pcc:(this.baseInfoForm.sheng==''?'':this.baseInfoForm.sheng.v)+(this.baseInfoForm.shi==''?'':this.baseInfoForm.shi.v)+(this.baseInfoForm.qu==''?'':this.baseInfoForm.qu.v),
                nation: this.baseInfoForm.nation,
                rcb: this.baseInfoForm.faith,
                ccb:this.baseInfoForm.educationDegree,
                file:this.imgageName,
                np:this.baseInfoForm.sfID.substr(0,6)
              },
              headers: {
                'Authorization': sessionStorage.getItem('Authorization')
              }
            }).then(res => { // res是返回结果
              if(res.data.msg=="1"){
                console.log(res.data)
                //此处用来处理添加成功信息
                //this.$alert('提交成功！');
                this.$message.success('提交成功');
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
      pdcsny(){//从输入身份证号码来判断出生年月
        var sfzh = this.baseInfoForm.sfID;
        var param = IceIdcard.checkIdcard(sfzh)
        if(param.result != 1){
          this.errorinfo = param.error
          //this.$message.error(param.error);
          return;
        }
        this.errorinfo = ''
        var birthdate = sfzh.substring(6,10)+'-'+sfzh.substring(10,12)+'-'+sfzh.substring(12,14);
        this.baseInfoForm.birthday=birthdate;
        let sex = sfzh.substring(16,17);
        if(sex%2==0){
          this.baseInfoForm.gender='0';
        }else{
          this.baseInfoForm.gender='1';
        }
        for (let i = 0; i < citydata.length; i++) {
          if (citydata[i]['v'] === (sfzh.substr(0, 2) + '')) {
            this.baseInfoForm.sheng = citydata[i];
            this.shioptions = this.baseInfoForm.sheng['c']
            for (let j = 0; j < citydata[i]['c'].length; j++) {
              if (citydata[i]['c'][j]['v'] === (sfzh.substr(2, 2) + '')) {
                this.baseInfoForm.shi = citydata[i]['c'][j];
                this.quoptions = this.baseInfoForm.shi['c']
                for (let k = 0; k < this.quoptions.length; k++) {
                  if (this.quoptions[k]['v'] === (sfzh.substr(4, 2) + '')) {
                    this.baseInfoForm.qu = this.quoptions[k];
                    return;
                  }
                }
                return;
              }
            }
            return;
          }
        }

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      formatDate (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      }
    },

  }
</script>
<style>
  .rxrk{
    overflow:hidden!important;
    min-width: 1600px!important;
    height: 880px!important;
    background-image: url(/static/img/rxrk_back.png)!important;
    background-repeat: no-repeat!important;
    background-size: 85% 85%!important;
    color: azure!important;
    z-index: 9!important;
    margin:5% 0% 5% 15%!important;
  }
  .box-card_rxrk{
    border:0px!important;
    background: transparent!important;
    margin: 20px 50px 20px 50px!important;
    padding-bottom: 7%!important;
    color: white!important;
    /*z-index: 99;*/
  }
  .image_rxrk{
    margin-left: 38%!important;
    margin-top: 40%!important;
    width: 178px!important;
    height: 250px!important;
    display: block!important;
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
  .rxrk_radio > .el-radio__input>.el-radio__inner{
    background-color: rgba(255,255,255,0) !important;
    border: 1px solid rgba(47,123,165,1)!important;
  }
  .rxrk_radio > .el-radio__label{
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
