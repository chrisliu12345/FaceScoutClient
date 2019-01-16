<template>
    <div>

    <el-row>
      <el-col>
        <!--<div  style="font-size: 9px" class="personID">{{cardData.id}}</div>-->
        <el-row>
          <el-col :span="4" style="font-size: 9px" class="personID">{{cardData.id}}</el-col>
          <el-col :span="3" :offset="17"><el-checkbox v-model="cardData.select" @change="$emit('handleCheckedCard',cardData.id,cardData.select)" class="cardCheckBox"></el-checkbox></el-col>
        </el-row>
      </el-col>
      <el-col>
        <el-row>
          <el-col :span="3" :offset="2"> <img :src="cardData.img" class="imgCard"></el-col>
          <el-col :span="14" :offset="5" style="font-size: 10px;margin-left: 40px;">
            <div align="left">
              <el-row>相似度:&nbsp;&nbsp;{{cardData.sim}}</el-row>
              <el-row>姓&nbsp;&nbsp;&nbsp;名:&nbsp;&nbsp;{{cardData.name}}</el-row>
              <el-row>性&nbsp;&nbsp;&nbsp;别:&nbsp;&nbsp;{{cardData.sex}}</el-row>
              <el-row>类&nbsp;&nbsp;&nbsp;型:&nbsp;&nbsp;{{cardData.type}}</el-row>
              <el-row>身份证号:&nbsp;{{cardData.idCard}}</el-row>
            </div>
      </el-col>
        </el-row>
      </el-col>
      <el-col>
        <div align="left" style="font-size: 14px"><br>
        <el-row>
          <el-col :offset="2">籍贯:&nbsp;&nbsp;{{cardData.birth}}</el-col>
        </el-row>
          <el-row>
          <el-col :offset="2">户籍地:&nbsp;&nbsp;{{cardData.place}}</el-col>
          </el-row>
          </div>
      </el-col>
    </el-row>

    </div>
</template>

<script>
export default {
    name: "rxbdcard",
    props:['cardData'],
    data(){
      return {
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
