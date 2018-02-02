<template>
    <div id="brief">
        <div class="returnHomeb">
            <div v-for="(list,index) in imgs">
                <img v-lazy="list" alt="">
            </div>
        </div>
        <div class="returnHome" @click="return_Home">
            <span>主页</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'briefs',
    data() {
      return {
        briefs: '',
        imgs: [
          "//an-announcement.oss-cn-shanghai.aliyuncs.com/image/advert_2_1.png",
          "//an-announcement.oss-cn-shanghai.aliyuncs.com/image/advert_2_2.png",
          "//an-announcement.oss-cn-shanghai.aliyuncs.com/image/advert_2_3.png",
        ],
      }
    },
    created() {
      //取到路由传值
      if (this.$route.query.advert_Title !== undefined) {
        var adverttitles = this.$route.query.advert_Title;
        /*$('title').text(adverttitles);*/
        document.title = adverttitles;
      } else {
        var adverttitles = "小安指南";
      }

      this.briefs = this.$route.query.advert_Id;
    },
    mounted() {
      /*/!*todo
      * *!/*/
      var adverttitle = document.title;
      var sharelink2 = window.location.href;//分享链接
      var shareDesc = "上市公司、专业机构移动董办工具首选！";//描述
      var that = this;
      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: adverttitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: sharelink2, // 分享链接
          imgUrl: global.shareImg1, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) {
            //用户确认分享后执行的回调函数
            /*MtaH5.clickShare('wechat_friend');  //这里加上h5分享代码*/
            that.$MTAmethod.mtaShare('wechat_friend')
            console.log("成功分享微信好友");
          },
          cancel: function (err) {
            //用户取消分享后执行的回调函数
            console.log(err)
          },
          complete: function () {
            console.log('已调用该方法！');
          }
        });
        wx.onMenuShareTimeline({
          title: adverttitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: sharelink2, // 分享链接
          imgUrl: global.shareImg1, // 分享图标
          success: function (res) {
            // 用户确认分享后执行的回调函数
            /*MtaH5.clickShare('wechat_moments');*/
            that.$MTAmethod.mtaShare('wechat_moments')
            console.log(res)
            console.log("成功分享朋友圈");
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          },
          complete: function () {
            console.log('已调用该方法！');
          }
        });
        wx.onMenuShareQQ({
          title: adverttitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: sharelink2, // 分享链接
          imgUrl: global.shareImg1, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log("成功分享QQ好友");
            /*MtaH5.clickShare('qq');*/
            that.$MTAmethod.mtaShare('qq')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('已调用方法！');
          }
        });
        wx.onMenuShareQZone({
          title: adverttitle, // 分享标题
          desc: shareDesc, // 分享描述
          link: sharelink2, // 分享链接
          imgUrl: global.shareImg1, // 分享图标
          success: function () {
            //用户确认分享后执行的回调函数
            console.log("成功分享QQ空间");
            /*MtaH5.clickShare('qzone');*/
            that.$MTAmethod.mtaShare('qzone')
          },
          cancel: function () {
            //用户取消分享后执行的回调函数
            console.log('已调用方法！');
          }
        })
      });
      /**/
    },
    methods: {
      //详情跳转到法规的主页
      return_Home() {
        this.$router.push({path: "/Law", query: {MathTime: global.timestamp}});
      }
    }
  }
</script>

<style>
    image[lazy=loading]{
        width: 40px;
        height: 40px;
        margin: auto;
        opacity: 0;
    }
</style>

<style scoped>
    #brief{
        width: 100%;
        height: 100%;
        font-size: 0;
        vertical-align: middle;
    }
    #brief img{
        background-color: white;
        width: 100%;
        height: 100%;
        z-index: 100;
    }
    .returnHomeb{
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        vertical-align: middle;
    }
    /*返回首页*/
    .returnHome{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .44);
        color: #fff;
        text-align: center;
        position: absolute;
        bottom: 65px;
        line-height: 33px;
        right: 25px;
        z-index: 10;
        font-family: PingFangSC-Semibold, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 11px;
        overflow: hidden;
    }
    /*home的返回按钮*/
    .returnHome span{
        display: block;
        width: 24px;
        padding-top: 13px;
        height: 8.5px;
        margin: 6px auto 0;
        background-image: url(/static/img/rules/home.png);
        background-size: contain;
        background-repeat: no-repeat;
    }

</style>
