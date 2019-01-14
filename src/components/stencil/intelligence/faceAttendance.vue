<template>
  <el-row :gutter="24">
    <el-col :span="2"><div class="grid-content bg-purple" >
      <h5>导航
        <i class="el-icon-location-outline"></i>
      </h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#99CCFF"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1" >
          <span slot="title">
            <a v-on:click="handleCous('1')">产品概述</a>
            </span>
        </el-menu-item>
        <el-menu-item index="2" >
          <span slot="title">
             <a v-on:click="handleCous('2')">产品功能</a>
            </span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">
            <a v-on:click="handleCous('3')">产品优势</a>
            </span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">
            <a v-on:click="handleCous('4')">产品定价</a>
            </span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">
             <a v-on:click="handleCous('5')">产品下载</a>
            </span>
        </el-menu-item>
      </el-menu>
    </div>
    </el-col>
    <h3>人脸考勤系统</h3>
    <el-col :span="22"><div class="grid-content bg-purple">
      <el-row :gutter="24">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1" id="1">
          <template slot="title">
            <i class="header-icon el-icon-location icon-right"></i>
            产品概述

          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item  name="2">
          <template slot="title">
            <i class="header-icon el-icon-tickets icon-right"></i>产品功能
          </template>
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item  name="3">
          <template slot="title">
            <i class="header-icon el-icon-star-on icon-right"></i>产品优势
          </template>
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item name="4" id="4">
          <template slot="title">
            <i class="header-icon el-icon-edit icon-right"></i>产品定价
          </template>
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <i class="header-icon el-icon-download icon-right"></i>产品下载
          </template>
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
      </el-row>
    </div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'faceAttendance',
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      exitNames: ['1', '2', '3', '4', '5'],
      isCollapse: true
    }
  },
  methods: {
    handleChange (val) {
      // console.log(val);
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleCous (id) {
      this.activeNames = [id]
    }

  }

}
</script>

<style scoped>
  .el-collapse-item div {
    margin-left: 8px;
    text-align: left;
    font-size: 16px
  }
  .icon-right {
    margin-right: 15px;
  }

</style>
