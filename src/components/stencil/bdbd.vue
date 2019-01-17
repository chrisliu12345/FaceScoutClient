<template>
<div class="bdbd">
  <el-card class="box-card box-card_bddb" style="">
    <el-row :gutter="24">
      <el-col :span="7" :offset="1">
        <div style="margin-bottom: 13%;margin-top: 23%">
          <span>请选择对比图像A</span>
        </div>
        <img :src="imageUrl1" class="image avatar">
        <div style="padding: 14px;">
          <span>请上传单人图片</span>
          <div style="margin-top: 10%" >
            <el-upload
              class="upload-demo"
              action="/user/uploadPic"
              auto-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload">
              <el-button  type="primary" style="width: 150px">浏览图片</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
      <el-col :span="7" ><div style="border-color: #0074D9">
        <div style="margin-bottom: 5%;margin-top: 11%">
          <span>人脸图像A</span>
        </div>
        <div ><img :src="localImgUrl1" class="image2 avatar"></div>
        <div style="margin-top: 10%;margin-bottom: 10%" >
          <el-button type="success" style="width: 180px; height: 50px" @click="bddb_ksdb">开始对比</el-button>
        </div>
        <div ><img :src="localImgUrl2" class="image2 avatar"></div>
        <div style="margin-top: 7%">
          <span>人脸图像B</span>
        </div>
      </div>
      </el-col>
      <el-col :span="7" ><div style="border-color: #0074D9"><div style="margin-bottom: 13%;margin-top: 23%">
        <span>请选择对比图像B</span>
      </div>
        <img :src="imageUrl2" class="image avatar">
        <div style="padding: 14px;">
          <span>请上传单人图片</span>
          <div style="margin-top: 10%" >
            <el-upload
              class="upload-demo"
              action="/user/uploadPic"
              auto-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload">
              <el-button  type="primary" style="width: 150px">浏览图片</el-button>
            </el-upload>
          </div>
        </div></div>
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
      }
    },
    methods: {
      handleChange (val) {
        // console.log(val);
      },
      bddb_ksdb(){
        //this.$router.push('/rxrk')

      },
      handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw),
          this.localImgUrl1 = URL.createObjectURL(file.raw)
      },
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
  .el-collapse-item div {
    margin-left: 8px;
    text-align: left;
    font-size: 16px
  }
  .icon-right {
    margin-right: 15px;
  }
  .image {
    margin-left: 25%;
    width: 250px;
    height: 250px;
    display: block;
  }
  .image2 {
    margin-left: 32%;
    width: 180px;
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
</style>
