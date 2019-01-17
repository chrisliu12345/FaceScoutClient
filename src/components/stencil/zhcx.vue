<template>
  <div class="zhcx">
    <el-row :gutter="24">
      <el-col :span="8" :offset="0">
        <el-card class="box-card box-card_zhcx">
          <div><span>模糊/精确查询</span></div>
          <div align="left" style="font-size: 14px"><br>
            <el-row>
              <el-col :span="14" :offset="2">
                <el-input v-model="sums.name"  placeholder="请输入姓名" style="width: 90%" class="zhcx_input"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <div style="margin-top: 5%">模糊查询&nbsp;&nbsp;<el-checkbox v-model="checked"></el-checkbox>
                </div>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="14" :offset="2">
                <el-input v-model="sums.idCard" placeholder="请输入身份证号" style="width: 90%;color:white;" class="zhcx_input" ></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <div style="margin-top: 5%">模糊查询&nbsp;&nbsp;<el-checkbox v-model="checked"></el-checkbox>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card box-card_zhcx" >
          <div><span>高级筛选</span></div>
          <br>
          <div align="left" style="margin-left: 5%;margin-bottom: 15px; font-size: 14px" >
            <el-row :gutter="24">
              <el-col :span="22">
                性别:&nbsp;&nbsp;&nbsp;<el-radio-group v-model="highData.sex" style="margin-right: 10%">
                <el-radio :label="1" class="zhcx_radio">男</el-radio>
                <el-radio :label="2" class="zhcx_radio">女</el-radio>
              </el-radio-group>
                籍贯:&nbsp;<el-select v-model="highData.place1" placeholder="请选择"  class="zhcxSelect">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
                <el-select v-model="highData.place2" placeholder="请选择"  class="zhcxSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="highData.place3" placeholder="请选择"  class="zhcxSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <br><br>
                出生地:&nbsp;<el-select v-model="highData.place1" placeholder="请选择"  class="zhcxSelect">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
                <el-select v-model="highData.place2" placeholder="请选择"  class="zhcxSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="highData.place3" placeholder="请选择"  class="zhcxSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <br><br>
                <el-button type="success" style="width: 70px;height: 50px;position:relative;left:-60px;">查询</el-button>
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23" >
        <el-card class="box-card_zhcx box-card_zhcxlist">
          <div align="left" style="margin-left: 2%">查询结果</div>
          <br>
          <div><el-table
            ref="filterTable"
            :data="tableDataSum"
            @selection-change="handleSelectionChange"
            @select="selectRow()"
            @select-all="selectAllRow()"
            :fit="true"
            :row-style="getRowClass" :header-row-style="getheaderClass"
            style="width: 100%">
            <el-table-column
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
            <div align="right" style="margin-top: 10px">
              <span class="demonstration"></span>
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :pager-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableSizeSum">
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
    name: "zhcx",
    data() {
      return {
        sums: {
          name: '',
          idCard: ''
        },
        tableData: [{
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }, {
          name: '郄梦岩',
          sex: '女',
          nation: '汉族',
          idCard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }],
        highData: {
          sex: 1,
          place1: '',
          place2: '',
          place3: '',
        },
        options: [{
          value: 1,
          label: '黄金糕'
        }, {
          value: 2,
          label: '双皮奶'
        }, {
          value: 3,
          label: '蚵仔煎'
        }, {
          value: 4,
          label: '龙须面'
        }, {
          value: 5,
          label: '北京烤鸭'
        }],
        tableDataSum:[],
        currentPage4: 1,
        tableSizeSum: 50,
      }
    },
    mounted:function(){
      this.tableDataSum=this.tableData;
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //更换当前显示页时触发
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.tableDataSum=this.tableData.slice((val-1)*10,(val-1)*10+10);
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
    }
  }
</script>

<style >
.zhcx{
  overflow:hidden;
  min-width: 1600px;
  height: 880px;
  background-image: url(/static/img/zhcx_back.png);
  background-repeat: no-repeat;
  background-size: 90% 90%;
  color: azure;
  z-index: 9;
  margin:5% 0% 5% 10%;
}
 .box-card_zhcx{
   border:0px!important;
   background: transparent;
   margin: 0px 50px 00px 0px;
   padding-bottom: 7%;
   color: white;
 }
.zhcx_input > .el-input__inner{
  height:34px;
  background:rgba(39,138,194,1);
  border-radius:5px;
  border: 0px;
}
  .zhcxSelect .el-input--suffix .el-input__inner{
    width: 150px;
    background-color: rgba(255,255,255,0);
    border: 2px solid rgba(47,123,165,1);
    color:white;
  }
.zhcx_radio>.el-radio__input>.el-radio__inner{
  background-color: rgba(255,255,255,0) !important;
  border: 1px solid rgba(47,123,165,1);
  color:white;
}
.zhcx_input > .el-input__inner::-webkit-input-placeholder{
  color:rgba(204,232,255,1);
}
.box-card_zhcxlist{
  position: relative;
  left:-32px;
  top:-50px;
}
  .box-card_zhcx .box-card_body{
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 10px;
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
</style>
