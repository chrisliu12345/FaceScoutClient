<template>
  <div class="bmd">
    <br>
    <el-row :gutter="24">
      <el-col :span="8" :offset="2">
        <el-card class="box-card box_card_bmd box_card_bmdform" style="padding-bottom: 50%">
          <div class="bmd_font"><label>添加或修改白名单</label></div>
          <br><br>
          <div align="left" style="font-size: 13px"><br>

            <el-form ref="whiteDate" :label-position="labelPosition" :model="whiteDate" label-width="80px" style="color:white;">
              <el-form-item v-if="false" :label-position="labelPosition" label="姓名:" label-width="100px" style="margin-bottom: 10px;" prop="name">
                <el-input v-model="whiteDate.id" id="bmd_id" type="hidden" class="bmd_inputType"></el-input>
              </el-form-item>
              <el-form-item :label-position="labelPosition" label="姓名:" label-width="100px" style="margin-bottom: 10px;" prop="name">
                <el-input v-model="whiteDate.name" placeholder="请输入姓名" id="bmd_name" class="bmd_inputType"></el-input>
              </el-form-item>
              <el-form-item :label-position="labelPosition" label="身份证号码:" label-width="100px" style="margin-bottom: 10px;" prop="sfID">
                <el-input v-model="whiteDate.idCard" placeholder="请输入18位身份证号" id="bmd_idCard" class="bmd_inputType"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <br>
          <br>
          <div align="center">
            <el-button type="primary" plain class="bmd_button" @click="submitForm('whiteDate','add')">添加</el-button>
            <el-button type="primary" plain class="bmd_button" @click="submitForm('whiteDate','update')">更新</el-button>
          </div>
          <div style="padding-top: 25%" class="bmd_font" v-show="bmdSuccess">
            添加成功!
          </div>
          <div style="padding-top: 25%" class="bmd_font" v-show="bmdFail">
            添加失败!
          </div>
        </el-card>
      </el-col>
      <el-col :span="13">
        <el-card class="box-card box_card_bmd box_card_bmdlist" >
          <div class="bmd_font"><label>白名单列表</label></div>
          <br>
          <br>
          <div align="left">
            <el-table
              ref="singleTable"
              height="528"
              :data="tableData"
              @current-change="handleCurrentChange"
              :row-style="getRowClass"
              :header-row-style="getheaderClass"
              :fit="true">
              <el-table-column>
              </el-table-column>

              <el-table-column
                property="id"
                v-if="false">
              </el-table-column>

              <el-table-column
                property="name"
                label="姓名"
               >
              </el-table-column>

              <el-table-column
                property="idcard"
                label="身份证号"
                >
              </el-table-column>

              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-circle-close-outline" style="margin-left: 2%" v-on:click="deleteRow(scope.row.id,scope.$index,whiteDate)"></i>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <br>
            <div align="right">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageCount">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "bmd",
    data(){
      return {
        labelPosition: 'right',
        bmdSuccess:false,
        bmdFail:false,
        pageCount:0,
        whiteDate: {
            id:'',
          name: '',
          idCard: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize:10
      }
    },
    mounted: function () {
      this.getBmdList();
    },
    methods: {
        getBmdList(){
            var param = {};
            param.pageNum=this.currentPage;
            param.pageSize=this.pageSize;
            var paramJson = JSON.stringify(param);
          this.$axios({
            method: 'post',
            url: '/face/whitelist/list',
            data: paramJson,
            headers: {
              'Authorization': sessionStorage.getItem('Authorization'),
              'content-Type':'application/json'
            }
          }).then(res => { // res是返回结果
            if(res.data.code==200){
              console.log(res.data)
              //此处用来处理添加成功信息
             this.pageCount=res.data.page.totalCount;
              this.tableData=res.data.page.list;
            }else{

            }
            /*if (res.data.code === '401') {
             this.$alert('账号或密码错误，请重新输入')
             }*/
          }).catch(err => { // 请求失败就会捕获报错信息
            console.log('服务正在维护，请稍后再试！')
            console.log(err)
          })
        },
      selectRow(row, event, column){
          console.log(row);

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.getBmdList();
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        //this.tableData = this.tableData.slice((val - 1) * 10, (val - 1) * 10 + 10);

/*        this.whiteDate.id=val.id;
        this.whiteDate.name=val.name;
        this.whiteDate.idCard=val.idcard;*/
        if(typeof(val)=='number'){
          this.currentPage=val;
          this.getBmdList();
        }else{
          this.whiteDate.id=val.id;
          this.whiteDate.name=val.name;
          this.whiteDate.idCard=val.idcard;
        }

      },
      deleteRow(id,index,rows) {
          this.$axios({
          method: 'get',
          url: '/face/whitelist/delete/'+id,
          headers: {
            'Authorization': sessionStorage.getItem('Authorization'),
          }
        }).then(res => { // res是返回结果
          if(res.data.code==200){
            console.log(res.data)
            //此处用来处理添加成功信息
            rows.splice(index, 1);
            this.getBmdList();
          }else{

          }
        }).catch(err => { // 请求失败就会捕获报错信息
          console.log('服务正在维护，请稍后再试！')
          console.log(err)
        })
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        console.log("rowIndex="+rowIndex);
        if(rowIndex%2==0){
          return "color:white;opacity: 1;background-color: rgba(255,255,255,0.1)!important";
        }else{
          return "color:white;opacity: 1;background-color: rgba(255,255,255,0.2)!important";
        }

      },
      getheaderClass({row, column, rowIndex, columnIndex}) {
        return "color:white;opacity: 1;background-color: rgba(255,255,255,0.5)!important";
      },
      submitForm (formName,type) {
          if(type=='add'){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$axios({
                  method: 'post',
                  url: '/face/whitelist/save',
                  data: {
                    'idcard': this.whiteDate.idCard,
                    'name': this.whiteDate.name
                  },
                  headers: {
                    'Authorization': sessionStorage.getItem('Authorization')
                  }
                }).then(res => { // res是返回结果
                  if(res.data.msg=="1"){
                    console.log(res.data)
                    //此处用来处理添加成功信息
                    /*this.$alert('添加成功！');*/
                    this.bmdSuccess=true;
                    this.bmdFail=false;
                    this.getBmdList();
                  }else{
                    this.bmdSuccess=false;
                    this.bmdFail=true;
                  }
                  /*if (res.data.code === '401') {
                   this.$alert('账号或密码错误，请重新输入')
                   }*/
                }).catch(err => { // 请求失败就会捕获报错信息
                  console.log('服务正在维护，请稍后再试！')
                  console.log(err)
                })
              } else {
                console.log('用户信息错误')
                return false
              }
            })
          }else{
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$axios({
                  method: 'post',
                  url: '/face/whitelist/update',
                  data: {
                      'id':this.whiteDate.id,
                    'idcard': this.whiteDate.idCard,
                    'name': this.whiteDate.name
                  },
                  headers: {
                    'Authorization': sessionStorage.getItem('Authorization')
                  }
                }).then(res => { // res是返回结果
                  if(res.data.msg=="1"){
                    console.log(res.data)
                    //此处用来处理添加成功信息
                    /*this.$alert('添加成功！');*/
                    this.bmdSuccess=true;
                    this.bmdFail=false;
                    this.getBmdList();
                  }else{
                    this.bmdSuccess=false;
                    this.bmdFail=true;
                  }
                  /*if (res.data.code === '401') {
                   this.$alert('账号或密码错误，请重新输入')
                   }*/
                }).catch(err => { // 请求失败就会捕获报错信息
                  console.log('服务正在维护，请稍后再试！')
                  console.log(err)
                })
              } else {
                console.log('用户信息错误')
                return false
              }
            })
          }

      }
    }
  }

</script>

<style>
  .bmd{
    overflow:hidden;
    min-width: 1600px;
    height: 880px;
    background-image: url(/static/img/bmd_back.png);
    background-repeat: no-repeat;
    background-size: 84% 84%;
    color: azure;
   /* z-index: 9;*/
    margin:5% 0% 5% 15%;
  }
  .box_card_bmd{
    border:0px!important;
    background-color:rgba(255,255,255,0)!important;
    margin-top:20px;
    position:relative;
    left:-181px;
  }
  .bmd_inputType{
    width: 80%!important;
  }
  .bmd_inputType input{
    color:white;
    background:rgba(0,46,76,0.42);
    border:1px solid rgba(47,123,165,1);
    border-radius:2px;
  }
.bmd_font{
  color: white;
}
.bmd_button{
  width: 120px;
  background:rgba(51,135,221,1)!important;
  border:1px solid rgba(51,135,221,1)!important;
  border-radius:2px!important;
  color: white!important;
}

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgba(255,255,255,0.3)!important;
  }

  .el-table, .el-table__expanded-cell{
    background-color: transparent;
  }
  .el-table th, .el-table tr{
    background-color: transparent;
  }
  .box_card_bmdlist{
    padding-bottom: 50%;
  }
  .box_card_bmdlist .el-card__body{
      padding-right: 12px;
    padding-left: 12px;
  }
  .box_card_bmdform .el-card__body{
    margin-left: 30px;
  }
.el-icon-circle-close-outline:hover{
  cursor: pointer;
}
</style>
