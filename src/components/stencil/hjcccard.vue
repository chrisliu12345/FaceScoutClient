<template>

      <el-dialog title="更正信息" :visible.sync="dialogFormVisible" status-icon :show-close="closeModel" :close-on-click-modal="closeOnClick"
                 :close-on-press-escape="closeEscape" width="30%">
        <div v-show="resultMessage">
          <el-alert
            title="更正成功！"
            type="success"
            show-icon>
          </el-alert>
        </div>
        <div v-show="errorMessage">
          <el-alert
            title="信息提交失败！"
            type="error"
            show-icon>
          </el-alert>
        </div>
        <el-form align="left">
          <el-form-item >
           <label>姓名A:</label> <el-input v-model="dataList.namea" disabled style="width: 160px"></el-input>&nbsp;&nbsp;
            <label>身份证号A:</label> <el-input v-model="dataList.codea" disabled style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item>
            <label>姓名B:</label> <el-input v-model="dataList.nameb" disabled style="width: 160px"></el-input>&nbsp;&nbsp;
            <label>身份证号B:</label> <el-input v-model="dataList.codeb" disabled style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item>
            <label>相似度:</label> <el-input v-model="dataList.resemblep" disabled style="width: 160px"></el-input>
            <label>时间:</label> <el-input v-model="dataList.time" disabled style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item>
            <label>类型:</label> <el-select v-model="type" placeholder="请选择类型"  style="width: 80%">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <label>备注:</label>  <el-input type="textarea" v-model="remark" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit">更正</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-dialog>

</template>

<script>
export default {
  name: 'hjcccard',
  created(){
    this.dataList=this.$route.params.dd;
    console.log(this.dataList);
    this.dialogFormVisible=true;
  },
  data(){
    return {
      dialogFormVisible: false,
      closeModel: false, // 隐藏右上角的关闭按钮
      closeOnClick: false, // 禁止点击modal关闭模态框
      closeEscape: false, // 禁止ESC关闭模态框
      resultMessage: false, // 修改成功返回结果
      errorMessage: false, // 修改失败返回结果
      dataList:{},
      type:'',
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
    cancel () {
      this.dialogFormVisible = false
      this.$router.go(-1)
    },
    onSubmit(){
      if(this.type=''){
        this.$message.error('请选择更正的类型！');
      }else{
      this.$axios({
        method: 'post',
        url: '/face/repeat/update',
        data: {
          id:this.dataList.id,
          state:this.type,
          remark:this.remark
        }
      }).then(res => { // res是返回结果
        console.log(res);
        if (res.data === 1) {
          this.resultMessage = true
        } else {
          this.errorMessage = true
        }
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log(err)
      })
      }
    },
  }
}
</script>

<style scoped>

</style>
