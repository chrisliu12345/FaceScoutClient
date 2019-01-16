<template >
<div class="backImg">
  <el-container class="home">
    <el-header><Top  @input="input"></Top></el-header>
    <el-main class="home_el-main" style="padding: 0" ><Stencil :ind = 'ind'></Stencil></el-main>
    <el-footer style="padding: 0;height:0"><Foot></Foot></el-footer>
  </el-container>
</div>
</template>

<script>
import Top from '@/components/layout/top'
import Stencil from '@/components/layout/stencil'
import Foot from '@/components/layout/foot'
export default {
  name: 'home',
  data () {
    return {
      msg: '这里是主界面',
      ind: '主页'
    }
  },
  components: {
    Top,
    Stencil,
    Foot
  },
  methods: {
    input (data) {
      this.ind = data
    }
  }

}

</script>
<style>
  .el-header {
    /*background-color: #2c3e50;
    color: #333;*/
    text-align: center;
    line-height: 20px;

  }
  .el-footer {
    /*background-color: #2c3e50;
    color: #333;*/
    text-align: center;
    /*line-height: 30px;*/
    /*height: 30px!important;*/
  }
 /* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }*/

  .el-main {
    /*background-color: #F2F6FC;
    color: #333;*/
    text-align: center;
    line-height: normal;
    height: 890px;
  }
  .el-container {
    height: 1080px;
    background-image: url(/static/img/qjt.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: azure;
    z-index: -1;
  }
  body > .el-container {
    margin-bottom: 0px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .backImg{
    overflow: hidden;
  }
  .home_el-main{
    overflow: hidden;
  }




  .el-pagination__total{
    color: rgba(255,255,255,1)!important;
  }
  .btn-prev{
    background-color: rgba(255,255,255,0)!important;
    border: 1px solid rgba(255,255,255,1)!important;
    color: white!important;
  }
  .number{
    background-color: rgba(255,255,255,0)!important;
    border: 1px solid rgba(255,255,255,1)!important;
    color: white!important;
  }
  .active{
    background:rgba(31,97,143,1)!important;
  }
  .btn-next{
    background-color: rgba(255,255,255,0)!important;
    border: 1px solid rgba(255,255,255,1)!important;
    color: white!important;
  }
  .el-input--mini>.el-input__inner{
    background-color: rgba(255,255,255,0)!important;
    border: 1px solid rgba(255,255,255,1)!important;
    color: white!important;
  }
  .el-pagination__editor>.el-input__inner {
    background-color: rgba(255, 255, 255, 0) !important;
    border: 1px solid rgba(255, 255, 255, 1) !important;
    color: white !important;
  }
  .el-pagination__jump{
    color: white;
  }
</style>
