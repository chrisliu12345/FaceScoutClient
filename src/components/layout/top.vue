<template>
  <el-row>
    <!-- <h2>
        <span style="color: #e1e5f0">新版本前端框架</span> &lt;!&ndash; 标题&ndash;&gt;
      </h2>-->
    <el-col :span="4">
      <h2>
        <span style="color: #E7F0FA;font-family:hyling;">人脸侦查系统</span>
      </h2>
    </el-col>
    <el-col :span="20">
     <el-menu
      :default-active="activeIndex"
        mode="horizontal"
      class="el-menu-demo"
        @select="handleSelect"
     >
        <el-menu-item :index="item.id" :id="item.idname" v-for="item in itemss" :key="item.id" @click="handleClick(this,item.id)">
          <router-link :to="item.router" class="Underline ele-menu-item-font" >{{item.title}}</router-link>
        </el-menu-item>

      </el-menu>
      <!--<el-col :span="6">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#2c3e50"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="999">
            <el-dropdown size="small" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white">
                  {{language}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">中文</el-dropdown-item>
                <el-dropdown-item command="en">Engilsh</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
          <el-submenu index="1000">
            <template slot="title">个人中心</template>
            <el-menu-item index="1000-1" @click="person">个人信息</el-menu-item>
            <el-menu-item index="1000-2" @click="changePassword">密码修改</el-menu-item>
            <el-menu-item index="1000-3" @click="myHelp">帮助</el-menu-item>
            <el-menu-item index="1000-4" @click="onLogout">退出</el-menu-item>
          </el-submenu>
          <el-menu-item index="1001" class="hidden-md-and-down">
            <img  v-if="imageUrl" :src="imageUrl" class="picture1">
            <el-tag type="warning">{{userInfo}}</el-tag>
          </el-menu-item>
        </el-menu>
      </el-col>-->
    </el-col>


  </el-row>

</template>
<script>

export default {
  data () {
    return {
      itemss: [
         {title: '人像入库', count: 1, locked: true, id: '1', idname:'rxrk',router: '/rxrk' ,dis:true},
        {title: '人像比对', count: 1, locked: true, id: '2', idname:'rxbd',router: '/rxbdzh',dis:true},
        {title: '白名单', count: 1, locked: true, id: '3', idname:'bmd',router: '/bmd',dis:true}, //菜单的模拟数据
        {title: '本地比对', count: 2, locked: true, id: '4', idname:'bddb',router: '/bdbd',dis:true},
        {title: '综合查询', count: 3, locked: false, id: '5',idname:'zhcx', router: '/zhcx',dis:true},
        {title: '户籍查重', count: 3, locked: false, id: '6', idname:'census',router: '/hjcc',dis:true}
      ],
      activeIndex: '1',
      search: '',
      state2: '',
      restaurants: [],
      language: sessionStorage.language || '中文',
      userInfo: sessionStorage.getItem('userInfo'),
      imageUrl: '',
      isSelect:1
    }
  },
  mounted: function () {
    this.restaurants = this.loadAll();
    this.selectPicture();
    this.isSelect=1;
    console.log(this.$route.path);
    if(this.$route.path=='/rxbdzh'){
        this.activeIndex='2';
    }else if(this.$route.path=='/bmd'){
      this.activeIndex='3';
    }else if(this.$route.path=='/bdbd'){
      this.activeIndex='4';
    }else if(this.$route.path=='/zhcx'){
      this.activeIndex='5';
    }else if(this.$route.path=='/hjcc'){
      this.activeIndex='6';
    }else{
      this.activeIndex=1;
    }
  },
  methods: {
    onLogout () {
      sessionStorage.removeItem('Authorization')// 移除token
      this.$router.push({path: '/'})
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        {'value': '视频联网平台', 'address': '长宁区新渔路144号'},
        {'value': 'Camera1', 'address': '上海市长宁区淞虹路661号'},
        {'value': '产品部', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '航天长峰', 'address': '天山西路438号'},
        {'value': '北京航天', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'},
        {'value': '中国航天二院', 'address': '上海市长宁区金钟路633号'},
        {'value': '永定路全景摄像机', 'address': '上海市嘉定区曹安公路曹安路1685号'},
        {'value': '32号楼大门口', 'address': '上海市普陀区同普路1435号'},
        {'value': '长峰大厦', 'address': '上海市北翟路1444弄81号B幢-107'},
        {'value': '北京航天长峰科技工业集团有限公司', 'address': '上海市嘉定区新郁路817号'},
        {'value': '人脸识别', 'address': '嘉定区曹安路1611号'},
        {'value': '语音识别', 'address': '嘉定区曹安公路2383弄55号'}
      ]
    },
    handleSelect (item) {
      console.log(item.value)
      this.isSelect = item.id
    },
    handleClick (obj,id) {
      console.log(id)
      this.isSelect = id
      console.log(obj)
    },
    handleCommand (command) {
      if (command === 'en') {
        this.language = 'English'// 设置标签显示文字
        this.$i18n.locale = 'en'// 设置加载i18n显示语言
        sessionStorage.setItem('lang', 'en')// 塞入标签到缓存
        sessionStorage.setItem('language', 'English')// 指定初始化标签显示文字
      } else {
        this.language = '中文'
        this.$i18n.locale = 'cn'
        sessionStorage.setItem('lang', 'cn')
        sessionStorage.setItem('language', '中文')
      }
    },
    person () {
      this.$router.push({path: '/userInfo'})
    },
    changePassword () {
      this.$router.push('/changePassword')
    },
    myHelp () {
      this.$router.push('/help')
    },
    selectPicture () {
      // 判断当前登录用户是否已注册头像
      let picture = sessionStorage.getItem('userPicture')
      if (parseInt(picture) === 200) {
        this.imageUrl = '/user/download?id=' + sessionStorage.getItem('userId')
        this.pictureClass = 'picture1'
      } else if (parseInt(picture) === 404) {
        this.imageUrl = '/static/img/b5.ico'
        this.pictureClass = 'picture2'
      } else {
        console.log('server error')
      }
    }

  }

}
</script>
<style>
  .Underline {
    text-decoration: none
  }

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;

  }
  .el-menu-demo{
    border-bottom-width: 0px!important;
    background-color:transparent;
  }
  .ele-menu-item-font{
    font-size:18px!important;
    font-family:hyling;
    font-weight:400!important;
    color:rgba(46,90,121,1)!important;
  }
  .router-link-active{
    color:rgba(255,255,255,1)!important;

  }
  #rxrk > .ele-menu-item-font:before{
    -webkit-mask: url(/static/img/rxrk.svg) no-repeat 50% 50%;
    mask: url(/static/img/rxrk.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#305A79;
    vertical-align: middle;
  }
  #rxrk > .router-link-active:before{
    -webkit-mask: url(/static/img/rxrk.svg) no-repeat 50% 50%;
    mask: url(/static/img/rxrk.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#ffffff;
    vertical-align: middle;
  }
  #rxbd > .ele-menu-item-font:before{
    -webkit-mask: url(/static/img/rxbd.svg) no-repeat 50% 50%;
    mask: url(/static/img/rxbd.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#305A79;
    vertical-align: middle;
  }
  #rxbd > .router-link-active:before{
    -webkit-mask: url(/static/img/rxbd.svg) no-repeat 50% 50%;
    mask: url(/static/img/rxbd.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#ffffff;
    vertical-align: middle;
  }
  #bmd > .ele-menu-item-font:before{
    -webkit-mask: url(/static/img/bmd.svg) no-repeat 50% 50%;
    mask: url(/static/img/bmd.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#305A79;
    vertical-align: middle;
  }
  #bmd > .router-link-active:before{
    -webkit-mask: url(/static/img/bmd.svg) no-repeat 50% 50%;
    mask: url(/static/img/bmd.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#ffffff;
    vertical-align: middle;
  }
  #bddb > .ele-menu-item-font:before{
    -webkit-mask: url(/static/img/bdbd.svg) no-repeat 50% 50%;
    mask: url(/static/img/bdbd.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#305A79;
    vertical-align: middle;
  }
  #bddb > .router-link-active:before{
    -webkit-mask: url(/static/img/bdbd.svg) no-repeat 50% 50%;
    mask: url(/static/img/bdbd.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#ffffff;
    vertical-align: middle;
  }
  #zhcx > .ele-menu-item-font:before{
    -webkit-mask: url(/static/img/zhcx.svg) no-repeat 50% 50%;
    mask: url(/static/img/zhcx.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#305A79;
    vertical-align: middle;
  }
  #zhcx > .router-link-active:before{
    -webkit-mask: url(/static/img/zhcx.svg) no-repeat 50% 50%;
    mask: url(/static/img/zhcx.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#ffffff;
    vertical-align: middle;
  }
  #census > .ele-menu-item-font:before{
    -webkit-mask: url(/static/img/census.svg) no-repeat 50% 50%;
    mask: url(/static/img/census.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#305A79;
    vertical-align: middle;
  }
  #census > .router-link-active:before{
    -webkit-mask: url(/static/img/census.svg) no-repeat 50% 50%;
    mask: url(/static/img/census.svg) no-repeat 50% 50%;
    display: inline-block;
    content:'';
    mask-size: cover;
    width: 25px;
    height: 25px;
    background-color:#ffffff;
    vertical-align: middle;
  }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
    background-color:#007AB4;
    width: 174px;
    height: 73px;
  }

  .picture1 {
    width: 38px;
    height: 50px;
    /*display: block;*/
    vertical-align: middle;
    display: inline-block;
    transform: translateY(2px);
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-right-radius: 2em;
    border-bottom-left-radius: 2em;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    border:0px;
    background:rgba(0,109,171,1);
    width: 174px;
    height: 73px;
  }
  .el-form-item__label{
    color: white;
  }
</style>
