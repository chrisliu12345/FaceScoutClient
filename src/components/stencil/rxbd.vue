<template>
  <div>

    <el-tabs :tab-position="tabPosition" style="height: 50px;margin-left: 10px;margin-right: 10px"
             v-for="item in menuList" :index="item.id" :key="item.id">

      <el-tab-pane :label="item.name" >
      <index :uuname="item"></index>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import index from '@/components/stencil/productsVideo/index'
export default {
  name: 'rxbd',
  data () {
    return {
      tabPosition: 'top',
      menuList:[]
    }
  },
  mounted:function(){
    this.getMenuList()
  },
  methods:{
    getMenuList(){
      this.$axios({
        method: 'GET',
        url: '/product/productVideoList',
      }).then(res => {
        console.log(res.data);
         this.menuList=res.data;
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log('error access')
      })
    }
  },
  components: {
    index
  }

}
</script>

<style scoped>

</style>
