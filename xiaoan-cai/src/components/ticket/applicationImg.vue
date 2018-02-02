<template>
    <div id="applicationImg">
        <ul>
            <li v-for="list in listImg"><img :src="list.img" alt=""></li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'applicationImg',
    data() {
      return {
        listImg: [
          {
            img: '../../static/img/ticket/apption3x.png',
          }, {
            img: '../../static/img/ticket/apption2.png',
          }
        ],
      }
    },
    mounted() {
      /*todo
        * */
      var adverttitle = "信公商学院";
      var sharelink2 = "https://wx006d673ce5a4a44b.h5.xiaoe-tech.com/";//分享链接
      var shareDesc = "";//描述
      /**/
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
      /**/
    },
    watch: {},
    methods: {
      /* 设置cookie*/
    },
  }
</script>
/**/
<style>
    /**/
</style>

<style scoped>
    /**/
    #applicationImg {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        background-color: #f0f1f5;
    }
    #applicationImg img {
        width: 100%;
    }
</style>
