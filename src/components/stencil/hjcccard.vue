<template>

      <el-dialog title="更正信息" :visible.sync="dialogFormVisible1" status-icon :show-close="closeModel" :close-on-click-modal="closeOnClick"
                 :close-on-press-escape="closeEscape"
                 width="30%" class="hjcccard">
        <el-form align="left">
          <el-form-item>
           <label>姓名A:</label> <el-input v-model="dataList.namea" disabled style="width: 160px" class="hjcccard_input"></el-input>&nbsp;&nbsp;
            <label>身份证号A:</label> <el-input v-model="dataList.codea" disabled style="width: 200px" class="hjcccard_input"></el-input>
          </el-form-item>
          <el-form-item>
            <label>姓名B:</label> <el-input v-model="dataList.nameb" disabled style="width: 160px" class="hjcccard_input"></el-input>&nbsp;&nbsp;
            <label>身份证号B:</label> <el-input v-model="dataList.codeb" disabled style="width: 200px" class="hjcccard_input"></el-input>
          </el-form-item>
          <el-form-item>
            <label>相似度:</label> <el-input v-model="dataList.resemblep" disabled style="width: 155px" class="hjcccard_input"></el-input>&nbsp;&nbsp;
            <label style="margin-left: 38px">时间:</label> <el-input v-model="dataList.time" disabled style="width: 200px" class="hjcccard_input"></el-input>
          </el-form-item>
          <el-form-item>
            <label>类型:</label> <el-select v-model="type" placeholder="请选择类型"  style="width: 80%" class="hjcccard_input">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <label>备注:</label>  <el-input type="textarea" v-model="remark" style="width: 80%" class="hjcccard_input"></el-input>
          </el-form-item>
        </el-form>
        <div v-if="beforeUpdata===true"> <el-button type="primary" @click="onSubmit">更正</el-button>
        <el-button @click="cancel">取消</el-button>
        </div>
        <div v-else><el-button @click="cancel">关闭</el-button></div>
      </el-dialog>

</template>

<script>
export default {
  name: 'hjcccard',
  props:['hjdata'],
/*  created(){

  },*/
  mounted:function(){
    this.dataList=this.hjdata;/*this.$route.params.dd;*/
    console.log(this.dataList);
    this.dialogFormVisible1 = true;
  },
  data(){
    return {
      dialogFormVisible1: true,
      closeModel: false, // 隐藏右上角的关闭按钮
      closeOnClick: false, // 禁止点击modal关闭模态框
      closeEscape: false, // 禁止ESC关闭模态框
      beforeUpdata:true, //切换显示下方按钮组
      dataList:{},
      type:null,
      remark:'',
      types: [{
        value: 0,
        label: '未处理'
      }, {
        value: 1,
        label: '确认一人多证'
      }, {
        value: 2,
        label: '确认不是同一人'
      }, {
        value: 3,
        label: '确认其他'
      }],
      formLabelWidth: '50px'
    }
  },
  methods:{
    //取消按钮
    cancel () {
      this.dialogFormVisible1 = false
      /*this.$router.go(-1)*/
      this.$emit('myEvent');
    },
    //更正按钮
    onSubmit(){
      if(this.type===null){
        this.$message.error('请选择更正的类型！');
      }else{
      this.$axios({
        method: 'post',
        url: '/face/repeat/mod',
        data: {
          id:this.dataList.id,
          state:this.type,
          remark:this.remark
        }
      }).then(res => { // res是返回结果
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('更新成功')
          this.beforeUpdata=false;
        } else {
          this.$message.error('请求失败')
        }
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log(err)
      })
      }
    },
  }
}
</script>

<style>
.hjcccard .el-dialog{
  background:url("/static/img/tck_back.png") no-repeat;
  background-size:100% 100%;
  font-color: white;
}

.hjcccard .el-dialog .el-dialog__body{
  margin-left: 20px;
  color: white;
}

.hjcccard .el-dialog .el-dialog__header .el-dialog__title{
  color: white;
}
.hjcccard_input .el-input__inner,.el-textarea__inner{
  background: transparent!important;
  color: white;
}
</style>
