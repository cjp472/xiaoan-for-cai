<template>
  <transition name="bounce">
    <div class="pdfReport" id="pdfReport">
      <xiaoan-ioframe :src="pdfUrl"></xiaoan-ioframe>
    </div>
  </transition>
</template>

<script>
  import iframe from "./iframe"

  export default {
    name: "pdfReport",
    data() {
      return {
        pdfUrl: "",
        pdfIframe: "/static/pdf/web/viewer.html?file=",
        loaded: false,
        errored: false,
        affId: ''
      }
    },
    components: {
      "xiaoan-ioframe": iframe,
    },
    created() {

    },
    mounted() {
      this.affId = this.$route.query.id;
      window.document.title = decodeURI(this.$route.query.title);
      let protocol = document.location.protocol == 'https:' ? 'https:' : 'http:';
      let url = decodeURI(this.$route.query.url).replace('http:', protocol).replace('https:', protocol);
      this.pdfUrl = global.currentIp + "/static/pdf/web/viewer.html?file=" + url;
      // this.pdfUrl = 'http://192.168.52.98:8082' + "/static/pdf/web/viewer.html?file=" + 'http://192.168.52.98:8082/static/pdf/web/1.pdf';
      // this.loaded = true;
      /**************************************/
      this.$weixin.wxconfig(this);  // 11.1 修改  wx。config调用
      let adverttitle = decodeURI(window.document.title);
      let sharelink2 = decodeURI(global.currentIp + '#/detailReport?id=' + this.affId);// 分享链接
      let shareDesc = ""; // 描述
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
    },
    methods: {}
  }
</script>

<style lang="scss">
  #pdfReport {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
</style>
