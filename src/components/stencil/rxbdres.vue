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
                  action="/user/uploadPic"
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
             <el-progress :text-inside="true" :stroke-width="15" :percentage="80"></el-progress>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card box-card_rxbdres" style="font-size: 10px">
          <div ><span style="font-size: 16px;margin-right: 30%;">高级筛选</span><br><br></div>
          <div align="left" style="margin-left: 5%">
            年龄段: &nbsp;&nbsp;<el-input v-model="ruleForm.age1" style="width: 55px" maxlength="3" class="rxbd_sxtj"></el-input>
            ～
            <el-input v-model="ruleForm.age2" style="width: 55px;margin-right: 10%" maxlength="3" class="rxbd_sxtj"></el-input>
            性别:&nbsp;&nbsp;<el-radio-group v-model="ruleForm.sex" style="margin-right: 10%">
            <el-radio :label="1" class="rxbd_sxtj">男</el-radio>
            <el-radio :label="2" class="rxbd_sxtj">女</el-radio>
          </el-radio-group>
            民族:&nbsp;&nbsp;
            <el-select v-model="ruleForm.nation" placeholder="请选择" style="width: 95px" class="rxbd_sxtj">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <br>
          <br>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            籍贯:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-select v-model="ruleForm.place1" placeholder="请选择"
                                                        style="width: 150px" class="rxbd_sxtj">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            <el-select v-model="ruleForm.place2" placeholder="请选择" style="width: 150px" class="rxbd_sxtj">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="ruleForm.place3" placeholder="请选择" style="width: 150px" class="rxbd_sxtj">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
                      <el-checkbox v-for="ct in types" :label="ct.value" :key="ct.value" class="rxbd_sxtj">{{ct.label}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-button plain @click="" class="rxbdres_search">查询</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="24" style="width: 1600px;">
      <el-card class="box-card box-card_rxbdres" style="margin-top: 0px;margin-right: 40px;">
       <el-col :span="24">
           <el-row>
           <el-col :span="4">普通对比结果（共234条结果）</el-col>
           <el-col :span="6" :offset="14" class="rxbdres_bluebutton">(已选择{{checkList.length}}条)
             <el-button plain @click="cancelCheckedCard" >取消</el-button>
             <el-button plain>确认导出</el-button>
           </el-col>
           </el-row>
       </el-col>
      <el-col :span="24" style="margin-top: 0%">
        <el-row >
          <el-col :span="6" v-for="it in items" :key="it.label">
            <el-card class="box-card box-card_rxbdres box-card_rxbdcard" >
           <CompareCard :cardData="it" v-on:handleCheckedCard="handleCheckedCard"></CompareCard>
          </el-card>
          </el-col>
        </el-row>
      </el-col>
        <el-col :span="12" :offset="11">
          <div align="right"  style="margin-top: 10px">
            <span class="demonstration"></span>
            <el-pagination
              background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 50, 100]"
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
export default {
    name: "rxbdres",
   data(){
      return {
        pageSize:10,
        currentPage4: 1,
        tableSizeSum:50,
        imageOne:'/static/img/people.jpg',
        imgUpload:'',
        ruleForm: {
          age1: '',
          age2: '',
          sex: 1,
          nation: '',
          place1: '',
          place2: '',
          place3: '',
          type: []
        },
        options: [{
          value: 1,
          label: '黄金糕'
        }, {
          value: 2,
          label: '双皮奶'
        }, {
          value: 3,
          label: '蚵仔煎'
        }, {
          value:4,
          label: '龙须面'
        }, {
          value: 5,
          label: '北京烤鸭'
        }],
        items: [{
          id:'01',
          select:false,
          img:'/static/img/people.jpg',
          sim:'90%',
          name:'孔令远',
          sex:'男',
          type:'诈骗犯',
          idCard:'110224198909292038',
          birth:'山东省青岛市永定路乙2号',
          place:'北京海淀区永定路'
        },
          {
            id:'02',
            select:false,
            img:'/static/img/people.jpg',
            sim:'80%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'未知地区（0）'
          },
          {
            id:'03',
            select:false,
            img:'/static/img/people.jpg',
            sim:'80%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'未知地区（0）'
          },
          {
            id:'04',
            select:false,
            img:'/static/img/people.jpg',
            sim:'80%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'未知地区（0）'
          },
          {
            id:'05',
            select:false,
            img:'/static/img/people.jpg',
            sim:'92%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'北京海淀区永定路'
          },
          {
            id:'06',
            select:false,
            img:'/static/img/people.jpg',
            sim:'95%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'未知地区（0）'
          },
          {
            id:'07',
            select:false,
            img:'/static/img/people.jpg',
            sim:'78%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'未知地区（0）'

          },
          {
            id:'08',
            select:false,
            img:'/static/img/people.jpg',
            sim:'88%',
            name:'孔令远',
            sex:'男',
            type:'诈骗犯',
            idCard:'110224198909292038',
            birth:'山东省青岛市永定路乙2号',
            place:'北京海淀区永定路甲51号'
          },],
        types: [{
          value: 1,
          label: '常住'
        }, {
          value: 2,
          label: '流动'
        }, {
          value: 3,
          label: '重点'
        }, {
          value: 4,
          label: '黄赌毒'
        },
          {
            value:5,
            label: '扒窃入口'
          }, {
            value: 6,
            label: '诈骗犯'
          },
          {
            value: 7,
            label: '非法集资'
          },
          {
            value: 8,
            label: '外地飞抢'
          },
          {
            value: 9,
            label: '出所'
          }],
        checkList:[]

      }
   },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imgUpload = URL.createObjectURL(file.raw);
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
    }
  },

  components:{
    ElCol,
    ElRow,
    CompareCard
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
  }
  .avatar-uploader-icon{
    width: 82px;
    height: 106px;
  }

</style>
