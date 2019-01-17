<template>
  <div class="rxbdres">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card class="box-card box-card_rxbdres" >
          <div align="center"><span>上传原图</span><br><br><br></div>
          <div>
            <el-row>
              <el-col :span="8">
              <img :src="imageOne" class="img11"><div style="font-size: 14px"><span>原图</span></div>
              </el-col>
              <el-col :span="7">
                <div align="center" style="margin-top: 30%">
                  <i class="el-icon-d-arrow-left"></i>
                  <i class="el-icon-d-arrow-left"></i>
                  <i class="el-icon-d-arrow-left"></i>
                </div>
              </el-col>
              <el-col :span="8">
                <el-upload
                  class="avatar-uploader"
                  action="/face/common/checkPhoto"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imgUpload" :src="imgUpload" class="img11">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div style="font-size: 10px"><span>支持上传2M以内的图片<br>(最小分辨率360*480)</span></div>
            </el-col>
            </el-row>
          </div>
          <div style="margin-top: 8px">
            <el-row>
              <el-col :span="15" :offset="2"> <div align="left" style="font-size: 13px">选择相似度:</div>
                <processSlider :min=10 :max=99 v-model = "ruleForm.per"  @tfVue="getsonVue"></processSlider>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card box-card_rxbdres" style="font-size: 10px">
          <div ><span style="font-size: 16px;margin-right: 30%;">高级筛选</span><br><br></div>
          <div align="left" style="margin-left: 5%">
            年龄段: &nbsp;&nbsp;<el-input v-model="ruleForm.agemin" style="width: 55px" maxlength="3" class="rxbd_sxtj"></el-input>
            ～
            <el-input v-model="ruleForm.agemax" style="width: 55px;margin-right: 10%" maxlength="3" class="rxbd_sxtj"></el-input>
            性别:&nbsp;&nbsp;<el-radio-group v-model="ruleForm.sex" style="margin-right: 10%">
            <el-radio :label="1" class="rxbd_sxtj">男</el-radio>
            <el-radio :label="2" class="rxbd_sxtj">女</el-radio>
          </el-radio-group>
            民族:&nbsp;&nbsp;
            <el-select v-model="ruleForm.nation" placeholder="请选择" style="width: 95px" class="rxbd_sxtj">
              <el-option
                v-for="item in mzoptions"
                :key="item.v"
                :label="item.n"
                :value="item.v">
              </el-option>
            </el-select>
          </div>
          <br>
          <br>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            籍贯:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="sheng" value-key="v" @change="selectPro" placeholder="请选择"style="width: 150px" class="rxbd_sxtj">
            <el-option
              v-for="item,index in prooptions"
              :key="index"
              :label="item.n"
              :value="item">
            </el-option>
          </el-select>
            <el-select v-model="shi" value-key="v" @change="selectShi" placeholder="请选择" style="width: 150px" class="rxbd_sxtj">
              <el-option
                v-for="item,index in shioptions"
                :key="index"
                :label="item.n"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="qu" placeholder="请选择" style="width: 150px" class="rxbd_sxtj">
              <el-option
                v-for="item,index in quoptions"
                :key="index"
                :label="item.n"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <br>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            <el-row>
              <el-col :span="16">
                <el-form>
                  <el-form-item label="类型:" class="rxbd_sxtj">
                    <el-checkbox-group v-model="ruleForm.type">
                      <el-checkbox v-for="ct in types" :label="ct.value" :key="ct.value" class="rxbd_sxtj">
                        {{ct.label}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-button plain @click="goSearch" class="rxbdres_search">查询</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="24" style="width: 90%;">
      <el-card class="box-card box-card_rxbdres" style="margin-top: 0px;margin-right: 40px;">
       <el-col :span="24">
         <el-form  style="padding: 0px 0 0 5px;">
           <el-form-item>
               <span style="float:left;font-size:16px; font-family:MicrosoftYaHei; font-weight:400; color:#D8EDFF;" >普通对比结果
                 <span style="font-size: 14px;color:#D8EDFF;"> ( 共有{{ tableSizeSum }}条结果 )</span>
               </span>
               <el-button  type="primary" class="cancel-btn" style="font-size:14px;float:right;" @click="cancelExport()">
                 取消
               </el-button>
               <el-button  type="primary" class="export-btn" style="font-size:14px;float:right;" @click="doExportPerson()">
                 确认导出
               </el-button>
               <span style="float:right;font-size:15px; font-family:MicrosoftYaHei; font-weight:400; color:#FFFFFF;" >(已选择{{idsSize}}条)
               </span>
           </el-form-item>
         </el-form>
       </el-col>
      <el-col :span="24" style="margin-top: 0%">
        <el-row >
          <el-checkbox-group v-model="indexs"  class="check-group" style="color: #51A2ED !important;font-size: 16px;" @change="checkedChange">
          <el-col :span="6" v-for="it,index in datas" :key="it.id">
            <el-card class="box-card box-card_rxbdres box-card_rxbdcard" >
           <CompareCard :cardData="it" :pageSize="pageSize" :pageNum="currentPage4" :index="index" v-on:handleCheckedCard="handleCheckedCard"></CompareCard>
          </el-card>
          </el-col>
          </el-checkbox-group>
        </el-row>
      </el-col>
        <el-col :span="12" :offset="11">
          <div align="right"  style="margin-top: 10px">
            <span class="demonstration"></span>
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[4, 8, 16, 32]"
              :pager-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableSizeSum">
            </el-pagination>
          </div>
        </el-col>
      </el-card>
    </el-row>


  </div>
</template>

<script>
import CompareCard from  '@/components/stencil/rxbdcard'
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";
import {StatusData} from "@/basedata/statusData.js"
import {citydata} from "@/basedata/citydata-debug.js"
import processSlider from '@/components/stencil/ProcessSlider'

export default {
  name: "rxbdres",
  components:{
    ElCol,
    ElRow,
    CompareCard,
    processSlider
  },
   data(){
      return {
        prooptions:citydata,
        shioptions:[],
        quoptions:[],
        mzoptions:StatusData['Nationality'],
        sheng:'',
        shi:'',
        qu:'',
        exportPerson:[],
        ids:[],
        indexs:[],
        idsSize:0,
        pageSize:8,
        currentPage4: 1,
        tableSizeSum:0,
        imageOne:'/static/img/people.jpg',
        imgUpload:'',
        ruleForm: {
          agemin: '',
          agemax: '',
          per:10,
          maxcount:10,
          sex: 1,
          nation: '',
          pcc:'',
          type: [0],
          file:'',
          pageSize:8,
          pageNum:1
        },
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
        checkList:[],
        datas:[]

      }
   },
  methods:{
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        if (res.msg === 0) {
          this.ruleForm.file = res.imgPath
          this.imgUpload = URL.createObjectURL(file.raw)
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
    handleCheckedCard(value,checked) {
      if(checked===true){
        this.checkList.push(value);
      }else{
        this.checkList.splice(this.checkList.indexOf(value),1);
      }
    },
    cancelCheckedCard(){
     this.items.forEach(function (data) {
       data.select=false;
     });
      this.checkList=[];
    },
    //更改每页显示条数时出发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //更换当前显示页时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.fetchData(val, this.pageSize);
    },
    fetchData(val,pageSize){ //获取数据
      this.tableData=[];
      for(var i=0;i<pageSize&&((val-1)*pageSize+i)<this.tableDataSelect.length;i++){
        this.tableData[i]=this.tableDataSelect[(val-1)*pageSize+i];
      }
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
    getsonVue(data){
      this.per = data;
    },
    renderdata(data){
      if (sessionStorage.getItem("qparams") ) {
        // this.$store.replaceState(Object.assign({}, this.$store.state.fqParams,JSON.parse(sessionStorage.getItem("fqParams"))))
        this.$store.state.ruleForm = JSON.parse(sessionStorage.getItem("qparams"))
        this.ruleForm = this.$store.state.ruleForm
      }
      this.tableSizeSum = data.totalCount
      this.pageSize = data.pageSize
      this.currentPage4 = data.currPage
      this.datas = data.list
    },
    pushimgdata(data,imageName){
      this.imageOne = "data:image/png;base64,"+data;
      this.ruleForm.file = imageName
    },
    checkedChange(){
      this.idsSize = this.indexs.length
    },
    doExportPerson(){
      //
      if(this.indexs.length == 0)
        return this.$message.warning('请选择导出人员')
      this.ids = []
      for(let idsIndex of this.indexs){
        this.ids.push(this.datas[idsIndex]['idcard'])
        this.exportPerson.push(this.datas[idsIndex])
      }
      this.$axios({
        method: 'post',
        url: '/face/compare/export',
        data: this.exportPerson,
        headers: {
          'Authorization': sessionStorage.getItem('Authorization')
        }
      }).then(res => {
        let fileName = "比对结果人员信息.xls"
        // 获取文件名// 文件地址
        const link = document.createElement('a')
        link.download = fileName
        console.log(res.data.data);
        let returnUrl = "" + res.data.data;
        link.href =  res.data.path
        console.log(link.href );
        link.click()
      })
    },
    cancelExport(){
      this.exportPerson = []
      this.ids = []
      this.indexs = []
      this.idsSize = 0
    },
    goSearch(){
      if(this.sheng != ''){
        this.ruleForm.pcc = this.sheng['v']
      }
      if(this.shi != ''){
        this.ruleForm.pcc = this.sheng['v'] + this.shi['v']
      }
      if(this.qu != ''){
        this.ruleForm.pcc = this.sheng['v'] + this.shi['v'] + this.qu['v']
      }
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
          this.tableSizeSum = res.data.data.totalCount
          this.pageSize = res.data.data.pageSize
          this.currentPage4 = res.data.data.currPage
          this.datas = res.data.data.list
        }else{
          this.$message.error('请求失败');
        }
      })
    }
  }

}
</script>

<style>
.img11{
  width: 80px;
  height: 104px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 104px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.rxbdres{
  overflow:hidden;
  min-width: 1200px;
  height: 1023px;
  background-image: url(/static/img/rxbdres_back.png);
  background-repeat: no-repeat;
  background-size: 85% 85%;
  color: azure;
  z-index: 9;
  margin:5% 0% 0% 8%;
}
.box-card_rxbdres{
  border:0px!important;
  background: transparent;
  color: white;
  margin-top: 20px;
}
  .el-form-item__label .el-checkbox{
    color:white;
  }

.rxbd_sxtj>.el-form-item__label{
  color: white;
}
  .rxbd_sxtj>.el-checkbox__label{
    color: white;
  }
  .rxbd_sxtj>.el-radio__input{
    color: rgba(255,255,255,1);
  }
  .box-card_rxbdcard{
    height: 250px;
    background-image: url(/static/img/rxbdcard_back.png);
    background-repeat: no-repeat;
    background-size: 90% 90%;
    color: azure;
    z-index: 9;
    margin:2% 3% 0% 1%;
    height:205px;
  }
  .rxbdres_bluebutton>.el-button{
    background:rgba(51,135,221,0.49);
    border:1px solid rgba(70,129,219,1);
    color:rgba(216,237,255,1);
  }
  .rxbdres_search{
    margin-top: 30px;
    background:rgba(93,148,56,1);
    border:1px solid rgba(165,215,131,1);
    border-radius:2px;
    color: rgba(255,255,255,1);

  }
  .box-card_rxbdres>.el-card__body{
    position: relative;
    top:-20px;
    left:-15px;
    padding-top: 20px;
  }
  .avatar-uploader-icon{
    width: 82px;
    height: 106px;
  }
.export-btn{
  width: 103px;
  height:40px;
  margin-right: 10px;
}
.cancel-btn{
  width: 80px;
  height:40px;
  margin-right: 10px;
}
</style>
