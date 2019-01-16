<template>
  <div class="rxbd"   >
    <el-row :gutter="21">
      <el-col :span="7" :offset="0">
        <div>
          <el-card class="box-card box_card_rxbd">
            <div align="center"><span>请选择对比图像</span></div>
            <div>
              <img :src="imageUrl2" class="img1">
              <div style="padding: 14px;">
                <span style="font-size: 12px">请上传单人图片</span>
                <div style="margin-top: 10%">
                  <el-upload
                    class="upload-demo"
                    action="/user/uploadPic"
                    auto-upload
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload">
                    <el-button type="primary" style="width: 150px; margin-top: 20%;margin-bottom: 50%">浏览图片</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-card class="box-card box_card_rxbd ">
          <div align="center"><span>人脸图像</span><br>
            <img :src="imageUrl2" class="img2">
          </div>
        </el-card>
        <div class="sctpwc" ><span>上传图片完成，请选择条件或者直接点击开始对比!</span></div>
        <el-card class="box-card box_card_rxbd">
          <div align="center"><span>筛选条件</span><br><br><br></div>
          <div align="left" style="font-size: 15px;margin-left: 5%">
            年龄段: &nbsp;&nbsp;<el-input v-model="ruleForm.age1" style="width: 55px" maxlength="3" class="rxbd_sxtj"></el-input>
            ～
            <el-input v-model="ruleForm.age2" style="width: 55px;margin-right: 10%" maxlength="3" class="rxbd_sxtj"></el-input>
            性别:&nbsp;&nbsp;<el-radio-group v-model="ruleForm.sex" style="margin-right: 10%">
            <el-radio :label="1"  class="rxbd_sxtj">男</el-radio>
            <el-radio :label="2"  class="rxbd_sxtj">女</el-radio>
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
          <div align="left" style="font-size: 15px;margin-left: 5%">
            相似度:&nbsp;&nbsp;相似度大于
            <el-input v-model="ruleForm.age1" style="width: 75px" maxlength="3" class="rxbd_sxtj"></el-input>
            %&nbsp;的前
            <el-select v-model="ruleForm.nation" placeholder="请选择" style="width: 95px" class="rxbd_sxtj">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>&nbsp;条
          </div>
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
            <el-form>
              <el-form-item label="类型:">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox v-for="ct in types" :label="ct.value" :key="ct.value" class="rxbd_sxtj">{{ct.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-button  @click="$emit('changePage')" class="tjbutton">普通比对</el-button>
      </el-col>
    </el-row>
  </div>






</template>

<script>

  export default {
    name: "rxbd",
    props:['cardData'],
    data() {
      return {
        imageUrl2: '/static/img/people.jpg',
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
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        types: [{
          value: '选项1',
          label: '常住'
        }, {
          value: '选项2',
          label: '流动'
        }, {
          value: '选项3',
          label: '重点'
        }, {
          value: '选项4',
          label: '黄赌毒'
        },
          {
            value: '选项5',
            label: '扒窃入口'
          }, {
            value: '选项6',
            label: '诈骗犯'
          },
          {
            value: '选项7',
            label: '非法集资'
          },
          {
            value: '选项8',
            label: '外地飞抢'
          },
          {
            value: '选项9',
            label: '出所'
          }],

      }
    },
    methods: {
      handleAvatarSuccess2(res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw)
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
      }
    }
  }
</script>

<style>
  .rxbd{
    overflow:hidden;
    min-width: 1200px;
    height: 880px;
    background-image: url(/static/img/rxbd_back.png);
    background-repeat: no-repeat;
    background-size: 85% 85%;
    color: azure;
    z-index: 9;
    margin:5% 0% 5% 15%;
  }
  .img1 {
    vertical-align: middle;
    /* display: inline-block;*/
    transform: translateY(4px);
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    margin-left: 25%;
    margin-top: 20%;
    width: 220px;
    height: 220px;
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
    margin-top: 5%;
    margin-bottom: 3%;
    width: 100px;
    height: 100px;
    display: block;
  }
  .notdisplay{
    display: none;
  }
  .box_card_rxbd{
    border:0px!important;
    background: transparent;
    color: white;
    margin-top:20px;
  }
  .sctpwc{
    margin-bottom: 1%;
    font-size: 13px;
    margin-top:30px;
  }
  .tjbutton{
    width: 200px;
    margin-top:50px;
    background-color:rgba(93,148,56,1) !important;
    border-color: rgba(165,215,131,1)!important;
    z-index: 333;
    color: white;
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
    color:white;
  }

</style>
