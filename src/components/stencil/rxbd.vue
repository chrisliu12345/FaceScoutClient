<template>
  <div class="rxbd"   >
    <el-row :gutter="21">
      <el-col :span="7" :offset="0">
        <div>
          <el-card class="box-card box_card_rxbd">
            <div align="center" class="highLine_rxbd"><span>请选择对比图像</span></div>
            <div>
              <img :src="imageUrl1" class="img1">
              <div style="padding: 14px;">
                <span style="font-size: 12px;">请上传单人图片</span>
                <div style="margin-top: 40px">
                  <el-upload
                    class="upload-demo"
                    action="/face/common/checkPhoto"
                    auto-upload
                    :headers="myHeaders"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload">
                    <el-button type="primary" style="width: 150px; margin-top: 20%;margin-bottom: 50%;font-size: 16px;">浏览图片</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-card class="box-card box_card_rxbd ">
          <div align="center" class="highLine_rxbd"><span >人脸图像</span><br>

          </div>
          <div align="center">
            <img :src="imageUrl2" class="img2">
          </div>
        </el-card>
        <div class="sctpwc" ><span>上传图片完成，请选择条件或者直接点击开始对比</span></div>
        <el-card class="box-card box_card_rxbd">
          <div align="center"><span>筛选条件</span><br><br><br></div>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            年龄段: &nbsp;&nbsp;<el-input v-model="ruleForm.agemin" style="width: 55px" maxlength="3" class="rxbd_sxtj"></el-input>
            ～
            <el-input v-model="ruleForm.agemax" style="width: 55px;margin-right: 10%" maxlength="3" class="rxbd_sxtj"></el-input>
            性别:&nbsp;&nbsp;<el-radio-group v-model="ruleForm.sex" style="margin-right: 10%">
            <el-radio :label="1"  class="rxbd_sxtj">男</el-radio>
            <el-radio :label="0"  class="rxbd_sxtj">女</el-radio>
          </el-radio-group>
            民族:&nbsp;&nbsp;
            <el-select v-model="ruleForm.nation" placeholder="请选择民族" style="width: 135px" class="rxbd_sxtj">
              <el-option
                v-for="item in mzoptions"
                :key="item.v"
                :label="item.n"
                :value="item.v">
              </el-option>
            </el-select>
          </div>
          <br>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            相似度:&nbsp;&nbsp;相似度大于
            <el-input v-model="ruleForm.per" style="width: 75px" maxlength="3" class="rxbd_sxtj"></el-input>
            %&nbsp;的前
            <el-select v-model="ruleForm.maxcount" placeholder="请选择" style="width: 95px" class="rxbd_sxtj">
              <el-option
                v-for="item in mxoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>&nbsp;条
          </div>
          <br>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            籍贯:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="sheng" value-key="v" @change="selectPro" placeholder="请选择省" style="width: 150px" class="rxbd_sxtj">
            <el-option
              v-for="item,index in prooptions"
              :key="index"
              :label="item.n"
              :value="item">
            </el-option>
          </el-select>
            <el-select v-model="shi" value-key="v" @change="selectShi" placeholder="请选择市" style="width: 150px" class="rxbd_sxtj">
              <el-option
                v-for="item in shioptions"
                :key="item.v"
                :label="item.n"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="qu" value-key="v"  placeholder="请选择区" style="width: 150px" class="rxbd_sxtj">
              <el-option
                v-for="item in quoptions"
                :key="item.v"
                :label="item.n"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <br>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            <el-form>
              <el-form-item label="类型:" class="type-label">
                <el-checkbox-group v-model="ruleForm.type">
                  <div align="left">
                  <el-checkbox v-for="ct in types" :label="ct.value" :key="ct.value"  class="rxbd_sxtj">{{ct.label}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-form-item>

            </el-form>
          </div>
        </el-card>
        <el-button  @click="goSearch" class="tjbutton">普通比对</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>

  import {StatusData} from "@/basedata/statusData.js"
  import {citydata} from "@/basedata/citydata-debug.js"

  export default {
    name: "rxbd",
    props:['cardData'],
    data() {
      return {
        myHeaders:{
          Authorization:sessionStorage.getItem('Authorization')
        },
        prooptions:citydata,
        shioptions:[],
        quoptions:[],
        mzoptions:StatusData['Nationality'],
        imageUrl1: '/static/img/people.jpg',
        imageUrl2: '/static/img/people.jpg',
        sheng:'',
        shi:'',
        qu:'',
        uploadimg :'',
        ruleForm: {
          agemin: '',
          agemax: '',
          per:10,
          maxcount:10,
          sex: 1,
          nation: '',
          pcc:'',
          type: ['0'],
          file:'',
          pageSize:8,
          pageNum:1
        },
        mxoptions: [
          {value: 5},
          {value: 10},
          {value: 20},
          {value: 50},
          {value: 100},
          {value: 500}
          ],
        types: [{
          value: '0',
          label: '常住'
        }, {
          value: '1',
          label: '流动'
        }, {
          value: '2',
          label: '重点'
        }, {
          value: '3',
          label: '黄赌毒'
        },
          {
            value: '9',
            label: '扒窃入口'
          }, {
            value: '4',
            label: '诈骗犯'
          },
          {
            value: '7',
            label: '非法集资'
          },
          {
            value: '8',
            label: '外地飞抢'
          },
          {
            value: '6',
            label: '出所'
          }],

      }
    },
    methods: {
      handleAvatarSuccess2(res, file) {
        if (res.code == 200) {
          if (res.msg === 0) {
            this.ruleForm.file = res.imgPath
            this.uploadimg = res.img
            this.imageUrl1 = URL.createObjectURL(file.raw)
            this.imageUrl2 = URL.createObjectURL(file.raw)
          } else {
            this.$message.error('检测人脸失败,请重新上传!');
          }
      }else{
          this.$message.error('上传失败!');
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
        this.shi = ''
        this.qu = ''
        this.shioptions = this.sheng['c']
        this.quoptions = []
      },
      selectShi(){
        this.qu = ''
        this.quoptions = this.shi['c']
      },
      goSearch(){
        if(this.ruleForm.file === ''){
          return this.$message.error('请先上传人脸照片!');
        }
        if(parseInt(this.ruleForm.agemin)<0||parseInt(this.ruleForm.agemax)<0){
          return this.$message.error('年龄必须大于0!');
        }
        if(parseInt(this.ruleForm.agemin)>parseInt(this.ruleForm.agemax)){
          return this.$message.error('年龄段最小值不能大于最大值！');
        }
        if(this.ruleForm.type.length === 0){
          return this.$message.error('请选择人员类型!');
        }
        if(this.sheng !== ''){
          this.ruleForm.pcc = this.sheng['v']
        }
        if(this.shi !== ''){
          this.ruleForm.pcc = this.sheng['v'] + this.shi['v']
        }
        if(this.qu !== ''){
          this.ruleForm.pcc = this.sheng['v'] + this.shi['v'] + this.qu['v']
        }
        var _this= this
        this.$axios({
          method: 'post',
          url: '/face/compare/otn',
          data: this.ruleForm,
          headers: {
            'Authorization': sessionStorage.getItem('Authorization')
          }
        }).then(res => {
          if(res.data.code === 200){
            this.$message.success('查询成功');
            this.$store.state.ruleForm=this.ruleForm
            sessionStorage.setItem("qparams",JSON.stringify(this.$store.state.ruleForm))
            this.$emit("getsearchdata",res.data.data,_this.uploadimg,_this.ruleForm.file,_this.sheng,_this.shi,_this.qu)
            this.$emit("changepage")
          }else{
            this.$message.error('请求失败');
          }
        })
        }
    }
  }
</script>

<style>
  .rxbd{
    overflow:hidden!important;
    min-width: 1600px!important;
    height: 880px!important;
    background-image: url(/static/img/rxbd_back.png)!important;
    background-repeat: no-repeat!important;
    background-size: 85% 85%!important;
    color: azure!important;
    z-index: 9!important;
    margin:5% 0% 5% 15%!important;
  }
  .img1 {
    vertical-align: middle;
    transform: translateY(4px);
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    margin-left: 25%;
    margin-top: 20%;
    width: 207px;
    height: 290px;
    display: block;
  }

  .img2 {
    vertical-align: middle;
    /* display: inline-block;*/
    transform: translateY(4px);
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 75px;
    height: 105px;
    display: block;
  }
  .notdisplay{
    display: none;
  }
  .box_card_rxbd{
    border:0px!important;
    background: transparent!important;
    color: white!important;
    margin-top:20px!important;
  }
  .sctpwc{
    margin-bottom: 1%;
    font-size: 13px;
    margin-top:30px;
  }
  .tjbutton{
    width: 200px;
    margin-top:70px!important;
    background-color:rgba(93,148,56,1) !important;
    border-color: rgba(165,215,131,1)!important;
    z-index: 333;
    color: white;
  }
  .tjbutton span{
    color: white!important;
  }
  .rxbd_sxtj>.el-input--suffix>.el-input__inner{
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }
  .rxbd_sxtj>.el-input__inner{
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }

  .rxbd_sxtj>span[aria-checked="mixed"]>.el-checkbox__inner{
    background-color: rgba(255,255,255,0) !important;
    border: 1px solid rgba(47,123,165,1);
    color:white;
  }
  .rxbd_sxtj>.el-radio__input>.el-radio__inner{
    background-color: rgba(255,255,255,0) !important;
    border: 1px solid rgba(47,123,165,1);
    color:white!important;
  }
  .rxbd_sxtj>.el-radio__label{
    color:white;
  }
  .type-label /deep/ .el-form-item__label{
    color:white;
  }
  .highLine_rxbd {
    background:url(/static/img/highLine.png) no-repeat center top;
    z-index: 2;
    height: 36px;
    background-position-y: bottom;
  }

  .el-checkbox+.el-checkbox{
    margin-left: 30px!important;
  }
</style>
