<template>
  <div>
    <RXBD v-show="myShow"  @changepage="changepage" @getsearchdata="getsearchdata"></RXBD>
    <RXBDRES v-show="myShow2"  ></RXBDRES>
  </div>
</template>

<script>
  import RXBD from  '@/components/stencil/rxbd'
  import RXBDRES from  '@/components/stencil/rxbdres'
export default {
  name: 'rxbdzh',
  data() {
    return {
        myShow:true,
        myShow2:false,
      datas:[]
    };
  },
  components:{
    RXBD,
    RXBDRES
  },
  methods:{
      changepage(){
          this.myShow=false;
          this.myShow2=true;
      },
      getsearchdata(data){
        this.datas = data
        this.$children[1].renderdata(data)
      }
  }
}
</script>

