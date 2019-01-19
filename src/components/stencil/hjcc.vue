<template>
  <div class="census">
    <el-row style="margin-top: 50px">
      <el-col :span="21" :offset="1" style=" border-style: solid;
      border-width: 1px;
  border-color: #62c1ff;">
        <div align="left" style="margin-top: 40px;margin-bottom: 20px;margin-left:90px; ">
          省份:
          <el-select v-model="sheng" value-key="v" placeholder="请选择省" @change="selectPro" class="hjinput_inner" style="width: 120px">
            <el-option
              v-for="item,index in prooptions"
              :key="index"
              :label="item.n"
              :value="item">
            </el-option>

          </el-select>
          &nbsp;&nbsp;市区:
          <el-select v-model="shi" value-key="v" placeholder="请选择市" @change="selectShi" class="hjinput_inner" style="width: 120px">
            <el-option
              v-for="item in shioptions"
              :key="item.v"
              :label="item.n"
              :value="item">
            </el-option>
          </el-select>
          &nbsp;&nbsp;区/县:
          <el-select v-model="qu" value-key="v" placeholder="请选择区/县" class="hjinput_inner" style="width: 120px">
            <el-option
              v-for="item in quoptions"
              :key="item.v"
              :label="item.n"
              :value="item">
            </el-option>
          </el-select>
          &nbsp;&nbsp;类型:
          <el-select v-model="type" placeholder="请选择类型" class="hjinput_inner" style="width: 120px">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="success" style="margin-left: 15px;" size="small" @click="startSearch">查询</el-button>
          <label style="margin-left: 25px">(已选择2项)</label>
          <el-button type="primary" plain size="small" @click="toggleSelection()">取消</el-button>
          <el-button type="primary" plain size="small" @click="exportData">确认导出</el-button>
          <label style="margin-left: 25px">每</label>
          <el-select v-model="dateH"  class="hjinput_inner" style="width: 60px">
          <el-option
            v-for="item in dateOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
          <label>天</label>
          <el-select v-model="timeH"  class="hjinput_inner" style="width: 60px">
          <el-option
            v-for="item in timeOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
          <label>点更新特征</label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" plain size="small" @click="updateTime">修改</el-button>
          <el-button type="primary" plain size="small" @click="updatedoNow">立即更新</el-button>
        </div>
        <el-table
          ref="filterTable"
          :data="tableData"
          @selection-change="handleSelectionChange"
          :row-style="getRowClass"
          :header-row-style="getheaderClass"
          :header-cell-style="getRowClass"
          style="background-color:transparent;margin-left:65px;padding-right: 50px;">
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            prop="namea"
            label="姓名A"
          >
          </el-table-column>
          <el-table-column
            prop="nameb"
            label="姓名B"
          >
          </el-table-column>
          <el-table-column
            prop="codea"
            label="身份证号A"
          >
          </el-table-column>
          <el-table-column
            prop="codeb"
            label="身份证号B"
          >
          </el-table-column>
          <el-table-column
            prop="resemblep"
            label="相似率"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
          >
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <i class="el-icon-refresh" style="margin-left: 2%" v-on:click="updatehjcc(scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            type="expand"
          >
          </el-table-column>
        </el-table>

        <div align="right" style="margin-top: 10px">
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
    <div v-if="dialogFormVisible===true">
    <Hjcccard :hjdata="Myind" v-on:myEvent="dialogFormVisible=false"></Hjcccard>
    </div>
  </div>
</template>

<script>
import {StatusData} from '@/basedata/statusData.js'
import {citydata} from '@/basedata/citydata-debug.js'
import Hjcccard from  '@/components/stencil/hjcccard'
export default {
  name: 'hjcc',
  data () {
    return {
      prooptions: citydata,
      shioptions: [],
      quoptions: [],
      Myind:[],
      dialogFormVisible:false,
      mzoptions: StatusData['Nationality'],
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
      sheng: '',
      shi: '',
      qu: '',
      type: '',
      tableData: [],
      pageSize: 10,
      currentPage4: 1,
      tableSizeSum: 50,
      multipleSelection: [],
      selectResult:[],
      modId:'',//特征ID
      timeH:'',
      timeOptions:[],
      dateH:'',
      dateOptions:[]
    }
  },
  components:{
    Hjcccard
  },
  mounted: function () {
    this.updateTraitData();
  },
  methods: {
    //初始化更新特征的时间和默认显示的数据
    updateTraitData(){
      //默认显示的数据
      this.$axios({
        method: 'post',
        url: '/face/repeat/list',
        data: {
          pageNum: 1,
          pageSize: 10
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.tableSizeSum = res.data.page.totalCount
          this.tableData = res.data.page.list
          this.tableData.forEach(d =>{
            d.time= new Date(parseInt(d.time)).toLocaleString('chinese',{hour12:false});
          })
        } else {
          this.$message.error('请求失败')
        }
      });
      //特征的时间
      this.$axios({
        method: 'get',
        url: '/face/update/getConfig',
      }).then(res => {
        this.dateH = res.data.data.daysSum;
        this.timeH=res.data.data.setHour;
         this.modId=res.data.data.id;
      });
      for(var i=0;i<24;i++){
        this.timeOptions.push(i);
      }
      for(var j=1;j<=5;j++){
        this.dateOptions.push(j);
      }

    },
    //表格选择checkbox时，获取选中行数据对象，val为选中的行数据对象
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection=val;

    },
    //取消按钮
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.filterTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.filterTable.clearSelection()
      }
    },
    //更改行样式
    getRowClass ({row, column, rowIndex, columnIndex}) {
      console.log('rowIndex=' + rowIndex)
      if (rowIndex % 2 == 0) {
        return 'color:white;opacity: 1;background-color: rgba(255,255,255,0.1)!important'
      } else {
        return 'color:white;opacity: 1;background-color: rgba(255,255,255,0.2)!important'
      }

    },
    //更改表头样式
    getheaderClass ({row, column, rowIndex, columnIndex}) {
      return 'color:white;opacity: 1;background-color: rgba(255,255,255,0.5)!important'
    },
    //表格格式化
    formatter (row, column) {
      return row.name
    },
    //更改每页显示条数时出发
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    //更换当前显示页时触发
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
    },
    //选择省份时触发
    selectPro () {
      this.shi = ''
      this.qu = ''
      this.shioptions = this.sheng['c']
      this.quoptions = []
    },
    //选择市时触发
    selectShi () {
      this.qu = ''
      this.quoptions = this.shi['c']
    },
    //开始查询
    startSearch () {
      let locationData = this.sheng + this.shi + this.qu
      this.$axios({
        method: 'post',
        url: '/face/repeat/list',
        data: {
          location: locationData,
          type: this.type,
          pageNum: this.currentPage4,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('查询成功')
          this.tableSizeSum = res.data.page.totalCount
          this.tableData = res.data.page.list
          this.tableData.forEach(d =>{
            d.time= new Date(parseInt(d.time)).toLocaleString('chinese',{hour12:false});
          })
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    //数据导出
    exportData () {
      this.multipleSelection.forEach(row => {
        if (this.selectResult.indexOf(row.id) > -1) {
          console.log('包含ID')
        } else {
          console.log('不包含ID')
          this.selectResult.push(row.id)
        }
        console.log(this.selectResult);
      })
      if(this.selectResult.length>0){
      this.$axios({
        method: 'post',
        url: '/face/repeat/export',
        data: {ids: this.selectResult},
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success('导出成功');
          let fileName = "户籍查重结果.xls";
          const link = document.createElement('a')
          link.download = fileName
          link.href =  res.data.path;
          link.click();
        } else {
          this.$message.error('请求失败')
        }
      })
        this.selectResult=[];
      }else{
        this.$message.error('请选择导出的数据行');
      }
    },
    //修改特征时间按钮
    updateTime(){
      this.$axios({
        method: 'post',
        url: '/face/update/config',
        data:{
          id:this.modId,
          daysSum:this.dateH,
          setHour:this.timeH
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('请求失败')
        }
      })
    },
    //立即更新
    updatedoNow(){
      this.$axios({
        method: 'post',
        url: '/face/update/doNow',
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败，后端服务未启动')
        }
      })
    },
    //表格中的“操作”按钮
    updatehjcc(data){
      console.log("jinrucaozuo");
      //this.$router.push({name: 'hjcccard',params:{dd:data}});
      this.dialogFormVisible=true;
      this.Myind=data;

    }
  }
}
</script>

<style>

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }

  .el-col {
    border: 0px !important;
  }

  .el-table::before {
    height: 0px !important;
  }

  .hjinput_inner > .el-input > .el-input__inner {
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(70, 129, 219, 1);
    color: white;
  }

  .el-button--primary.is-plain {
    background-color: rgba(51, 135, 221, 0.49);
    color: white;
  }

  .census {
    height: 900px;
    border: 0px !important;
    background-image: url(/static/img/census_back.png) !important;
    background: center 10px no-repeat;
    display: block;
    background-size: 85% 85%;
    color: azure;
    min-width: 1400px;
    margin-top: 5%;
  }

</style>
