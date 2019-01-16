<template>
  <div class="bmd">
    <br>
    <el-row :gutter="24">
      <el-col :span="8" :offset="2">
        <el-card class="box-card box_card_bmd" style="padding-bottom: 50%">
          <div><label>添加或修改白名单</label></div>
          <br><br>
          <div align="left" style="font-size: 14px"><br>
            <el-row>
              <el-col :span="4" :offset="2">
                <div style="margin-top: 15%">姓名:&nbsp;&nbsp;</div>
              </el-col>
              <el-col :span="18">
                <el-input v-model="whiteDate.name" class="bmd_inputType"></el-input>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="4" :offset="2">
                <div style="margin-top: 15%">身份证号码:&nbsp;&nbsp;</div>
              </el-col>
              <el-col :span="18">
                <el-input v-model="whiteDate.name" class="bmd_inputType" ></el-input>
              </el-col>
            </el-row>
          </div>
          <br>
          <br>
          <div align="center">
            <el-button type="primary" plain style="width: 120px">添加</el-button>
            <el-button type="primary" plain style="width: 120px">更新</el-button>
          </div>
          <div style="padding-top: 25%">
            添加成功!
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card box_card_bmd" style="padding-bottom: 50%">
          <div><label>白名单列表</label></div>
          <br>
          <br>
          <div align="center">
            <el-table
              ref="singleTable"
              :data="tableDataChange"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%;">
              <el-table-column
                width="130">
              </el-table-column>
              <el-table-column
                property="date"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                width="100">
              </el-table-column>
              <el-table-column
                property="name"
                label="身份证号"
                width="120">
              </el-table-column>
              <el-table-column
                width="100">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-error" style="margin-left: 2%" v-on:click="deleteRow(scope.$index, tableData)"></i>
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
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="50">
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
        whiteDate: {
          name: '',
          idCard: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableDataChange: [],
        currentPage: 1
      }
    },
    mounted: function () {
      this.tableDataChange = this.tableData;
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.tableDataChange = this.tableData.slice((val - 1) * 10, (val - 1) * 10 + 10);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }

</script>

<style>
  .bmd{
    overflow:hidden;
    min-width: 1200px;
    height: 880px;
    background-image: url(/static/img/bmd_back.png);
    background-repeat: no-repeat;
    background-size: 85% 85%;
    color: azure;
    z-index: 9;
    margin:5% 0% 5% 10%;
  }
  .box_card_bmd{
    border:0px!important;
    background-color:rgba(255,255,255,0);
    margin-top:20px;
    position:relative;
    left:-150px;
  }
  .bmd_inputType{
    width: 80%;
  }
  .bmd_inputType input{
    background-color: rgba(255,255,255,0)!important;
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }

</style>
