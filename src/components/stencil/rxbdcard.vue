<template>
    <div>
    <el-row>
      <el-col>
        <!--<div  style="font-size: 9px" class="personID">{{cardData.id}}</div>-->
        <el-row>
          <div style=" float:left; font-size: 12px; width: 14px; height:14px;background:#3496A4; margin: 0px 5px 7px 5px;color: #ffffff" >
            {{(pageSize*(pageNum-1)+(index + 1))}}</div>
          <el-col :span="3" :offset="17">
            <el-checkbox :label="index" style="float: right;margin: 5px 0 5px 0" ><span></span></el-checkbox>
          </el-col>
        </el-row>
      </el-col>
      <el-col>
        <el-row>
          <el-col :span="3" :offset="2"> <img :src="dataimg+cardData.photo" class="imgCard"></el-col>
          <el-col :span="14" :offset="5" style="font-size: 10px;margin-left: 40px;">
            <div align="left">
              <el-row>相似度:&nbsp;&nbsp;{{cardData.resemblep}}</el-row>
              <el-row>姓&nbsp;&nbsp;&nbsp;名:&nbsp;&nbsp;{{cardData.tName}}</el-row>
              <el-row>性&nbsp;&nbsp;&nbsp;别:&nbsp;&nbsp;{{cardData.sex == 1 ? '男':'女'}}</el-row>
              <el-row>类&nbsp;&nbsp;&nbsp;型:&nbsp;&nbsp;{{cardData.type}}</el-row>
              <el-row>身份证号:&nbsp;{{cardData.idcard}}</el-row>
            </div>
      </el-col>
        </el-row>
      </el-col>
      <el-col>
        <div align="left" style="font-size: 14px"><br>
        <el-row>
          <el-col :offset="2">籍贯:&nbsp;&nbsp;{{getAddr(cardData.np)}}</el-col>
        </el-row>
          <el-row>
          <el-col :offset="2">户籍地:&nbsp;&nbsp;{{getAddr(cardData.pcc)}}</el-col>
          </el-row>
          </div>
      </el-col>
    </el-row>

    </div>
</template>

<script>

  import {IceIdcard} from '@/utils/IceIdcard.js' //注意路径
   export default {
    name: "rxbdcard",
    props:['cardData','pageSize','pageNum','index'],
    data(){
      return {
        dataimg : "data:image/png;base64,",
        formCard: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      }
    },
  methods:{
    getAddr:function(code){
      try{
        return IceIdcard.getAreaBycode(code.toString()) + '(' + code + ')';
      }catch(e){
        return '未知地区 (' + code + ')';
      }
    }
  }
}
</script>

<style>
.imgCard{
  width:60px;
  height: 80px;
  margin-top: 5px;
}
.personID{
 position: relative;
  left: -15px;
  top:5px;
}
.cardCheckBox>.el-checkbox__input>.el-checkbox__inner{
  background:rgba(51,135,221,0.49);
  border:1px solid rgba(70,129,219,1);
}
.cardCheckBox{
/*  margin-right: 5px;*/
  margin-top: 5px;
}
</style>
