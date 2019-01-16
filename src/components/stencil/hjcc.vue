<template>
  <div class="census">
  <el-row style="margin-top: 50px">
    <el-col :span="21" :offset="1" style=" border-style: solid;
      border-width: 1px;
  border-color: #62c1ff;" >
      <div align="left" style="margin-top: 40px;margin-bottom: 20px;margin-left:90px; " >
       省份:
      <el-select v-model="form.value1" placeholder="请选择省" class="hjinput_inner">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        &nbsp;&nbsp;市区:
      <el-select v-model="form.value2" placeholder="请选择市" class="hjinput_inner">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        &nbsp;&nbsp;区/县:
      <el-select v-model="form.value3" placeholder="请选择区/县" class="hjinput_inner">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        &nbsp;&nbsp;类型:
      <el-select v-model="form.value4" placeholder="请选择类型" class="hjinput_inner">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
        <el-button type="success" style="margin-left: 15px;" size="small">查询</el-button>
        <label style="margin-left: 25px">(已选择2项)</label>
        <el-button type="primary" plain   size="small" @click="toggleSelection()">取消</el-button>
        <el-button type="primary" plain   size="small">确认导出</el-button>
      </div>
      <el-table
        ref="filterTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        @select="selectRow()"
        @select-all="selectAllRow()" :row-style="getRowClass" :header-row-style="getheaderClass"
        :header-cell-style="getRowClass"
        :fit="true"
        style="background-color:transparent;margin-left:65px;padding-right: 50px;">

      <el-table-column
          type="selection"
         >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          >
        </el-table-column>
        <el-table-column
          prop="nation"
          label="民族"
          >
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
         >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          >
        </el-table-column>
        <el-table-column
          prop="predecessor"
          label="是否有前科"
          >
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生地"
          >
        </el-table-column>
        <el-table-column
          prop="place"
          label="籍贯"
          >
        </el-table-column>

      </el-table>

      <div align="right"  style="margin-top: 10px">
        <span class="demonstration"></span>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :pager-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableSizeSum">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "hjcc",
  data() {
    return {
        pageSize:10,
      tableData: [{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"1",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"2",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"3",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"4",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"5",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"6",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"7",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"8",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"9",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"10",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      }],
      tableDataSelect:[{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"1",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"2",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"3",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"4",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"5",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"6",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"7",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"8",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"9",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"10",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"11",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"12",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"13",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      },{
        name: '郄梦岩',
        sex: '女',
        nation: '汉族',
        idCard: '110224199112100339',
        type:"14",
        predecessor:"否",
        birth:"北京市大兴区",
        place:"北京市大兴区"
      }],
      options: [{
        label: '刘部长',
        value:'1'
      }, {
        label: '张博士',
        value:'2'
      }, {
        label: '李经理',
        value:'3'
      }, {
        label: '王组长',
        value:'4'
      }],
      currentPage4: 1,
      tableSizeSum:50,
      multipleSelection: [],
      form:[{
        value1:'',
        value2:'',
        value3:'',
        value4:''
      }]
    }
  },
  methods: {
    //表格选择checkbox时，获取选中行数据对象，val为选中的行数据对象
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //取消按钮，取消所有选中状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.filterTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.filterTable.clearSelection();
      }
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
    //表格格式化
    formatter(row, column) {
      return row.name;
    },
    //更改每页显示条数时出发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //更换当前显示页时触发
       handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
         this.fetchData(val, this.pageSize);
    },
    //单选一行数据时的方法
    selectRow(){
      console.log("单个选择执行的方法");
    },
    //全选时的方法
    selectAllRow(){
      console.log("全选执行的方法")
    },
    fetchData(val,pageSize){ //获取数据
      this.tableData=[];
      for(var i=0;i<pageSize&&((val-1)*pageSize+i)<this.tableDataSelect.length;i++){
        this.tableData[i]=this.tableDataSelect[(val-1)*pageSize+i];
      }
    }
  }
}
</script>

<style>

  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgba(255,255,255,0.3)!important;
  }
  .el-col{
    border: 0px!important;
  }
  .el-table::before{
    height: 0px!important;
  }

  .hjinput_inner>.el-input>.el-input__inner{
  background-color: rgba(255,255,255,0);
  border: 1px solid rgba(70,129,219,1)
}
  .el-button--primary.is-plain{
  background-color:rgba(51,135,221,0.49);
   color:white;
  }
  .census{
    height: 900px;
    border:0px!important;
    background-image: url(/static/img/census_back.png)!important ;
    background: center 10px  no-repeat;
    display: block;
    background-size: 85% 85%;
    color: azure;
    min-width: 1400px;
    margin-top: 5%;
  }

</style>
