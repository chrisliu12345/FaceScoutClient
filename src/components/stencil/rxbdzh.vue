<template>
  <div>
    <RXBD v-show="myShow" v-on:changePage="changePageFun"></RXBD>
    <RXBDRES v-show="myShow2"></RXBDRES>
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
        myShow2:false
    };
  },
  components:{
    RXBD,
    RXBDRES
  },
  methods:{
      changePageFun(){
          this.myShow=false;
          this.myShow2=true;
      }
  }
}
</script>

