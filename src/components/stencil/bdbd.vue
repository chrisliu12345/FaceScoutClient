<template>
<div class="bdbd">
  <el-card class="box-card box-card_bddb" style="">
    <el-row class="notice-row">
      <el-col :span="12" :offset="6" v-show="noticeFlag" class="notice-col">
        <div  style="color:#C22037"><img src="/static/img/warntag.png" style="height: 47px;vertical-align:middle;"/>  {{warnInfo}}</div>
      </el-col>
      <el-col :span="12" :offset="6" v-show="resempFlag" class="notice-col" >
        <div  style="color:#FFC23F"><img src="/static/img/bdcgtag.png" style="height: 47px;vertical-align:middle;"/>  比对成功,两张图像的相似率为{{resemp}}%</div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="7" :offset="1">
        <div style="margin-bottom: 13%;margin-top: 23%" class="highLine_bdbd">
          <span>请选择对比图像A</span>
        </div>
        <img :src="imageUrl1" class="image avatar">
        <div style="padding: 16px;">
          <span style="font-size: 14px;">请上传单人图片</span>
          <div style="margin-top: 15%" >
            <el-upload
              class="upload-demo"
              action="/face/common/checkPhoto"
              auto-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload">
              <el-button  type="primary" style="width: 150px;font-size: 16px;">浏览图片</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
      <el-col :span="7" ><div style="border-color: #0074D9">
        <div style="margin-bottom: 5%;margin-top: 11%" class="highLine_bdbd">
          <span>人脸图像A</span>
        </div>
        <div ><img :src="localImgUrl1" class="image2 avatar"></div>
        <div style="margin-top: 10%;margin-bottom: 10%" >
          <el-button type="success" style="width: 180px; height: 50px;font-size: 17px;" @click="bddb_ksdb">开始对比</el-button>
        </div>
        <div ><img :src="localImgUrl2" class="image2 avatar"></div>
        <div style="margin-top: 7%" class="highLine_bdbd">
          <span>人脸图像B</span>
        </div>
      </div>
      </el-col>
      <el-col :span="7" >
        <div style="border-color: #0074D9">
          <div style="margin-bottom: 13%;margin-top: 23%" class="highLine_bdbd">
        <span>请选择对比图像B</span>
      </div>
        <img :src="imageUrl2" class="image avatar">
        <div style="padding: 14px;font-size: 14px;">
          <span>请上传单人图片</span>
          <div style="margin-top: 15%" >
            <el-upload
              class="upload-demo"
              action="/face/common/checkPhoto"
              auto-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload">
              <el-button  type="primary" style="width: 150px;font-size: 16px;">浏览图片</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
  export default {
    name: 'bdbd',
    data () {
      return {
        imageUrl1:'/static/img/people.jpg',
        imageUrl2:'/static/img/people.jpg',
        localImgUrl1:'/static/img/people.jpg',
        localImgUrl2:'/static/img/people.jpg',
        warnInfo:'比对失败，请检查系统服务是否开启',
        resempFlag:false,
        noticeFlag:false,
        resemp:0,
        queryForm:{
          filea:'',
          fileb:''
        }
      }
    },
    methods: {
      handleChange (val) {
        // console.log(val);
      },
      bddb_ksdb(){
        //this.$router.push('/rxrk')
        if(this.queryForm.filea ==''){
          return this.$message.error('请选择人脸图像A');
        }
        if(this.queryForm.fileb ==''){
          return this.$message.error('请选择人脸图像B');
        }
        var _this= this
        this.$axios({
          method: 'post',
          url: '/face/compare/oto',
          data: this.queryForm,
          headers: {
            'Authorization': sessionStorage.getItem('Authorization')
          }
        }).then(res => {
          if(res.data.code === 200){
            this.resemp = res.data.data
            this.noticeFlag = false
            this.resempFlag = true
          }else{
            this.resempFlag = false
            this.noticeFlag = true
          }
        })
      },
      handleAvatarSuccess1(res, file) {
        this.resempFlag = false
        this.noticeFlag = false
        if (res.code == 200) {
          if (res.msg === 0) {
            this.queryForm.filea = res.imgPath
            this.imageUrl1 = URL.createObjectURL(file.raw)
            this.localImgUrl1 = URL.createObjectURL(file.raw)
          } else {
            this.$message.error('检测人脸失败,请重新上传!');
          }
        }else{
          this.$message.error('上传失败!');
        }
      },
      handleAvatarSuccess2(res, file) {
        this.resempFlag = false
        this.noticeFlag = false
        if (res.code == 200) {
          if (res.msg === 0) {
              this.queryForm.fileb = res.imgPath
              this.imageUrl2 = URL.createObjectURL(file.raw)
              this.localImgUrl2 = URL.createObjectURL(file.raw)
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
      }
    }

  }
</script>

<style>
  .el-collapse-item div {
    margin-left: 8px;
    text-align: left;
    font-size: 16px
  }
  .icon-right {
    margin-right: 15px;
  }
  .image {
    margin-left: 30%;
    width: 220px;
    height: 240px;
    display: block;
  }
  .image2 {
    margin-left: 34%;
    width: 160px;
    height: 180px;
    display: block;
  }
  .avatar {
    vertical-align: middle;
    /* display: inline-block;*/
    transform: translateY(4px);
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
  }
 .box-card_bddb{
   border:0px!important;
  background: transparent;
   margin: 20px 50px 20px 50px;
   padding-bottom: 7%;
   color: white;
   /*z-index: 99;*/
  }
  .bdbd{
    height: 900px;
    min-width: 1600px;
    border:0px!important;
    background-image: url(/static/img/bdbd_back.png)!important ;
    background: center 10px  no-repeat;
    display: block;
    background-size: 85% 85%;
    color: azure;
    margin-top: 50px;
  }
  .notice-col{
    margin-top: 20px;
    background: #4399CA;
    height: 50px;
    line-height: 50px;
    border-radius:8px;
    opacity:0.9;
  }
  .highLine_bdbd {
    background:url(/static/img/highLine.png) no-repeat center top;
    z-index: 2;
    height: 36px;
    background-position-y: bottom;
  }
</style>
