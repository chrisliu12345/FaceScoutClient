<template>
  <div class="census">
    <el-row style="margin-top: 50px">
      <el-col :span="21" :offset="1" style=" border-style: solid;
      border-width: 1px;
  border-color: #62c1ff;">
        <div align="left" style="margin-top: 40px;margin-bottom: 20px;margin-left:90px; ">
          省份:
          <el-select v-model="sheng" value-key="v" placeholder="请选择省" @change="selectPro" class="hjinput_inner">
            <el-option
              v-for="item,index in prooptions"
              :key="index"
              :label="item.n"
              :value="item">
            </el-option>

          </el-select>
          &nbsp;&nbsp;市区:
          <el-select v-model="shi" value-key="v" placeholder="请选择市" @change="selectShi" class="hjinput_inner">
            <el-option
              v-for="item in shioptions"
              :key="item.v"
              :label="item.n"
              :value="item">
            </el-option>
          </el-select>
          &nbsp;&nbsp;区/县:
          <el-select v-model="qu" value-key="v" placeholder="请选择区/县" class="hjinput_inner">
            <el-option
              v-for="item in quoptions"
              :key="item.v"
              :label="item.n"
              :value="item">
            </el-option>
          </el-select>
          &nbsp;&nbsp;类型:
          <el-select v-model="type" placeholder="请选择类型" class="hjinput_inner">
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
  </div>
</template>

<script>
import {StatusData} from '@/basedata/statusData.js'
import {citydata} from '@/basedata/citydata-debug.js'

export default {
  name: 'hjcc',
  data () {
    return {
      prooptions: citydata,
      shioptions: [],
      quoptions: [],
      mzoptions: StatusData['Nationality'],
      types: [{
        value: '0',
        label: '常住'
      }, {
        value: '1',
        label: '流动'
      }, {
        value: '2',
        label: '重点'
      }, {
        value: '3',
        label: '黄赌毒'
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
      selectResult:[]
    }
  },
  mounted: function () {
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
      } else {
        this.$message.error('请求失败')
      }
    })
  },
  methods: {
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
        responseType: 'arraybuffer'
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success('导出成功')
          var blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) //创建下载的链接
          downloadElement.href = href
          downloadElement.download = '导出文件.xls' //下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() //点击下载
          document.body.removeChild(downloadElement) //下载完成移除元素
          window.URL.revokeObjectURL(href) //释放掉blob对象
        } else {
          this.$message.error('请求失败')
        }
      })
        this.selectResult=[];
      }else{
        this.$message.error('请选择导出的数据行');
      }
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
