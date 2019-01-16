<template>
  <div class="bmd">
    <br>
    <el-row :gutter="24">
      <el-col :span="8" :offset="2">
        <el-card class="box-card box_card_bmd box_card_bmdform" style="padding-bottom: 50%">
          <div class="bmd_font"><label>添加或修改白名单</label></div>
          <br><br>
          <div align="left" style="font-size: 13px"><br>
            <el-row>
              <el-col :span="4" :offset="2">
                <div style="margin-top: 15%" class="bmd_font" >姓名:&nbsp;&nbsp;</div>
              </el-col>
              <el-col :span="18">
                <el-input v-model="whiteDate.name" class="bmd_inputType"></el-input>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="4" :offset="2">
                <div style="margin-top: 15%" class="bmd_font">身份证号码:&nbsp;&nbsp;</div>
              </el-col>
              <el-col :span="18">
                <el-input v-model="whiteDate.name" class="bmd_inputType" ></el-input>
              </el-col>
            </el-row>
          </div>
          <br>
          <br>
          <div align="center">
            <el-button type="primary" plain class="bmd_button">添加</el-button>
            <el-button type="primary" plain class="bmd_button">更新</el-button>
          </div>
          <div style="padding-top: 25%" class="bmd_font">
            添加成功!
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
              :data="tableDataChange"
              @current-change="handleCurrentChange"
              :row-style="getRowClass"
              :header-row-style="getheaderClass"
              :fit="true"

              >
              <el-table-column>
              </el-table-column>

              <el-table-column
                property="date"
                label="姓名"
               >
              </el-table-column>

              <el-table-column
                property="name"
                label="身份证号"
                >
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
      },getRowClass({row, column, rowIndex, columnIndex}) {
        console.log("rowIndex="+rowIndex);
        if(rowIndex%2==0){
          return "color:white;opacity: 1;background-color: rgba(255,255,255,0.1)!important";
        }else{
          return "color:white;opacity: 1;background-color: rgba(255,255,255,0.2)!important";
        }

      },
      getheaderClass({row, column, rowIndex, columnIndex}) {
        return "color:white;opacity: 1;background-color: rgba(255,255,255,0.5)!important";
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
    left:-180px;
  }
  .bmd_inputType{
    width: 80%!important;
  }
  .bmd_inputType input{
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }
.bmd_font{
  color: white;
  /*font-size: 14px;*/
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
    /*padding-right: 0px;*/
  }
  .box_card_bmdlist .el-card__body{
      padding-right: 12px;
    padding-left: 12px;
  }
  .box_card_bmdform .el-card__body{
    margin-left: 30px;
  }
</style>
