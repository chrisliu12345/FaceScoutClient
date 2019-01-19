<template>
  <div class="zhcx">
    <el-row :gutter="24">
      <el-col :span="8" :offset="0">
        <el-card class="box-card box-card_zhcx">
          <div class="highLine_zhcx"><span>模糊/精确查询</span></div>
          <div align="left" style="font-size: 14px"><br>
            <el-row class="zhcx_xm">
              <el-col :span="14" :offset="2">
                <el-input v-model="sums.name"  placeholder="请输入姓名" style="width: 90%;" class="zhcx_input"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <div style="margin-top: 5%;color:rgba(87,154,255,1);">模糊查询&nbsp;&nbsp;<el-checkbox v-model="nameMHCX" ref="nameMHCX" class="zhcx_checkbox"></el-checkbox>
                </div>
              </el-col>
            </el-row>
            <br>
            <el-row>
              <el-col :span="14" :offset="2">
                <el-input v-model="sums.idcard" placeholder="请输入身份证号" style="width: 90%;color:white;" class="zhcx_input" ></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <div style="margin-top: 5%;color:rgba(87,154,255,1);">模糊查询&nbsp;&nbsp;<el-checkbox v-model="idcardMHCX" id="idcardMHCX" class="zhcx_checkbox"></el-checkbox>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card box-card_zhcx" >
          <div class="highLine_zhcx"><span>高级筛选</span></div>
          <br>
          <div align="left" style="margin-left: 5%;margin-bottom: 15px; font-size: 14px" >
            <el-row :gutter="24">
              <el-col :span="22">
                性别:&nbsp;&nbsp;&nbsp;<el-radio-group v-model="highData.sex" style="margin-right: 10%">
                <el-radio :label="1" class="zhcx_radio">男</el-radio>
                <el-radio :label="2" class="zhcx_radio">女</el-radio>
              </el-radio-group>
                籍贯:&nbsp;<el-select v-model="highData.jgsheng" value-key="v" @change="selectJgPro" placeholder="请选择" style="width: 150px" class="zhcxSelect">
                <el-option
                  v-for="item,index in prooptionsjg"
                  :key="index"
                  :label="item.n"
                  :value="item">
                </el-option>
              </el-select>
                <el-select v-model="highData.jgshi" value-key="v" @change="selectJgShi" placeholder="请选择" style="width: 150px" class="zhcxSelect">
                  <el-option
                    v-for="item in shioptionsjg"
                    :key="item.v"
                    :label="item.n"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="highData.jgqu" value-key="v"  placeholder="请选择" style="width: 150px" class="zhcxSelect">
                  <el-option
                    v-for="item in quoptionsjg"
                    :key="item.v"
                    :label="item.n"
                    :value="item">
                  </el-option>
                </el-select>
                <br><br>
                出生地:&nbsp;<el-select v-model="highData.csdsheng" value-key="v" @change="selectCsdPro" placeholder="请选择" style="width: 150px" class="zhcxSelect">
                <el-option
                  v-for="item,index in prooptionscsd"
                  :key="index"
                  :label="item.n"
                  :value="item">
                </el-option>
              </el-select>
                <el-select v-model="highData.csdshi" value-key="v" @change="selectCsdShi" placeholder="请选择" style="width: 150px" class="zhcxSelect">
                  <el-option
                    v-for="item in shioptionscsd"
                    :key="item.v"
                    :label="item.n"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="highData.csdqu" value-key="v"  placeholder="请选择" style="width: 150px" class="zhcxSelect">
                  <el-option
                    v-for="item in quoptionscsd"
                    :key="item.v"
                    :label="item.n"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <br><br>
                <el-button type="success" style="width: 70px;height: 50px;position:relative;left:-60px;" @click="goSearch">查询</el-button>
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
            height="432px"
            ref="filterTable"
            :data="tableData"
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
              prop="tname"
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
              prop="idcard"
              label="身份证号码"
              >
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              >
            </el-table-column>
<!--            <el-table-column
              prop="predecessor"
              label="是否有前科"
              >
            </el-table-column>-->
            <el-table-column
              prop="np"
              label="出生地"
              >
            </el-table-column>
            <el-table-column
              prop="pcc"
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
                :current-page="currentPage"
                :page-sizes="[8, 20, 50, 100]"
                :pager-size="pageSize"
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
  import {citydata} from "@/basedata/citydata-debug.js";
  import {IceIdcard} from '@/utils/IceIdcard.js';
  import {TypeData} from '@/utils/TypeData.js';
  import {NationData} from '@/utils/NationData.js';
  export default {
    name: "zhcx",
    data() {
      return {
        prooptionsjg:citydata,
        shioptionsjg:[],
        quoptionsjg:[],
        prooptionscsd:citydata,
        shioptionscsd:[],
        quoptionscsd:[],
        sums: {
          name: '',
          idCard: ''
        },
        tableData: [/*{
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
          idcard: '110224199112100339',
          type: "？？？",
          predecessor: "否",
          birth: "北京市大兴区",
          place: "北京市大兴区"
        }*/],
        highData: {
          sex: 1,
          jgsheng:'',
          jgshi:'',
          jgqu:'',
          csdsheng:'',
          csdshi:'',
          csdqu:''
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
        currentPage: 1,
        pageSize:8,
        tableSizeSum: 50,
        idcardMHCX:false,
        nameMHCX:false
      }
    },
    mounted:function(){
        this.goSearch();
    },
    methods:{
      getAddr:function(code){
        try{
          return IceIdcard.getAreaBycode(code.toString()) + '(' + code + ')';
        }catch(e){
          return '未知地区 (' + code + ')';
        }
      },
      getType:function(code){
          return TypeData.getTypeBycode(code.toString());
      },
      getNation:function(code){
          return NationData.getNationBycode(code.toString());
      },
      handleSelectionChange(){

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.goSearch();
      },
      //更换当前显示页时触发
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //this.tableDataSum=this.tableData.slice((val-1)*10,(val-1)*10+10);
        this.currentPage=val;
        this.goSearch();
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
      goSearch(){
          console.log(this.idcardMHCX);
          var postdata={};
          if(this.idcardMHCX){
            postdata.queryidCardString=this.sums.idcard;
            postdata.idcard='';
          }else{
            postdata.queryidCardString='';
            postdata.idcard=this.sums.idcard;
          }
          if(this.nameMHCX){
            postdata.queryNameString=this.sums.name;
            postdata.name='';
          }else{
            postdata.queryNameString='';
            postdata.name=this.sums.name;
          }
        postdata.sex =this.highData.sex;
        postdata.pcc = (this.highData.jgsheng==''?'':this.highData.jgsheng.v)+(this.highData.jgshi==''?'':this.highData.jgshi.v)+(this.highData.jgqu==''?'':this.highData.jgqu.v);
        postdata.np = (this.highData.csdsheng==''?'':this.highData.csdsheng.v)+(this.highData.csdshi==''?'':this.highData.csdshi.v)+(this.highData.csdqu==''?'':this.highData.csdqu.v);

        postdata.pageNum=this.currentPage;
        postdata.pageSize = this.pageSize;

        this.$axios({
          method: 'post',
          url: '/ma/face/facePersonInfo/list',
          data: postdata,
          headers: {
            'Authorization': sessionStorage.getItem('Authorization')
          }
        }).then(res => { // res是返回结果
          if(res.data.code=="200"){
            console.log(res.data)
            //此处用来处理添加成功信息
            this.tableData=res.data.page.list;
            this.tableSizeSum=res.data.page.totalCount;
            for(var i=0;i<this.tableData.length;i++){
                var jg = this.tableData[i].pcc;
                var csd = this.tableData[i].np;
                var lx = this.tableData[i].type;
                var xb = this.tableData[i].sex;
                var mz = this.tableData[i].nation;
                this.tableData[i].pcc = this.getAddr(jg);
                this.tableData[i].np = this.getAddr(csd);
                this.tableData[i].type=this.getType(lx);
                this.tableData[i].sex=(xb==1?'男':'女');
                this.tableData[i].nation=this.getNation(mz);
            }


          }else{
            //this.$alert('提交失败！');
            this.$message.error('提交失败');
          }
          /*if (res.data.code === '401') {
           this.$alert('账号或密码错误，请重新输入')
           }*/
        }).catch(err => { // 请求失败就会捕获报错信息
          console.log('服务正在维护，请稍后再试！')
          console.log(err)
        })
      },
      selectJgPro(){
        this.highData.jgshi = ''
        this.highData.jgqu = ''
        this.shioptionsjg = this.highData.jgsheng['c']
        this.quoptionsjg = []
      },
      selectJgShi(){
        this.highData.jgqu = ''
        this.quoptionsjg = this.highData.jgshi['c']
      },
      selectCsdPro(){
        this.highData.csdshi = ''
        this.highData.csdqu = ''
        this.shioptionscsd = this.highData.csdsheng['c']
        this.quoptionscsd = []
      },
      selectCsdShi(){
        this.highData.csdqu = ''
        this.quoptionscsd = this.highData.csdshi['c']
      },
    }
  }
</script>

<style >
.zhcx{
  overflow:hidden!important;
  min-width: 1600px!important;
  height: 880px!important;
  background-image: url(/static/img/zhcx_back.png)!important;
  background-repeat: no-repeat!important;
  background-size: 90% 90%!important;
  color: azure!important;
  z-index: 9!important;
  margin:5% 0% 5% 10%!important;
}
 .box-card_zhcx{
   border:0px!important;
   background: transparent!important;
   margin: 0px 50px 00px 0px!important;
   padding-bottom: 7%!important;
   color: white!important;
 }
.zhcx_input > .el-input__inner{
  height:34px!important;
  background:rgba(39,138,194,1)!important;
  border-radius:5px!important;
  border: 0px!important;
  color:white;
}
  .zhcxSelect> .el-input--suffix .el-input__inner{
    width: 150px!important;
    background-color: rgba(255,255,255,0)!important;
    border: 2px solid rgba(47,123,165,1)!important;
    color:white!important;
  }
.zhcx_radio>.el-radio__input>.el-radio__inner{
  background-color: rgba(255,255,255,0) !important;
  border: 1px solid rgba(47,123,165,1)!important;
  color:white;
}
.zhcx_radio>.el-radio__label{
  color: white!important;
}
.zhcx_input > .el-input__inner::-webkit-input-placeholder{
  color:rgba(204,232,255,1)!important;
}
.box-card_zhcxlist{
  position: relative!important;
  left:-32px!important;
  top:-50px!important;
}
  .box-card_zhcx .box-card_body{
    padding-top: 0px!important;
    padding-left: 20px!important;
    padding-right: 10px!important;
  }
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: rgba(255,255,255,0.3)!important;
}

.el-table, .el-table__expanded-cell{
  background-color: transparent!important;
}
.el-table th, .el-table tr{
  background-color: transparent!important;
}

.zhcx_checkbox .el-checkbox__inner{
  background-color:rgba(87,154,255,1)!important;
  border-color: rgba(87,154,255,1)!important;
}
.highLine_zhcx {
  background:url(/static/img/highLine.png) no-repeat center top!important;
  z-index: 2!important;
  height: 36px!important;
  background-position-y: bottom!important;
}
.zhcx_xm{
  margin-bottom: 0px!important;
}
</style>
