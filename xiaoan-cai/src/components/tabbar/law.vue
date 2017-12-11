<template>
  <transition name="bounce">
    <div id="law">
      <div class="logo">
        <img v-lazy="bgImg" alt="">
      </div>
      <div class="search" @click="indexTo('search')">
        <div class="searchVal">搜索法规名称</div>
      </div>
      <div class="law-slo">
        <div>董秘智能移动工具，触手可及</div>
      </div>
      <div class="link">
        <div class="linkitem">
          <div class="aa" @click="indexTo('new')">
            <img :src="newImg" alt="newrule">
            <p>新规</p>
          </div>
          <div class="GuidePages" v-show="GuidePages">
            <div class="GuidePage">点击查看最新法规</div>
            <img :src="GuidePagesLow" alt="">
          </div>
        </div>
        <div class="linkitem ads" @click="indexTo('new')">
          <img :src="adsImg" alt="footer">
          <p>精选</p>
        </div>
        <div class="linkitem" @click="indexTo('new')">
          <img :src="mokaoImg" alt="roadShow">
          <p>模考</p>
          <img :src="newIcon" alt="new" id="newTip">
        </div>

        <div class="linkitem ads" @click="indexTo('new')">
          <img :src="schoolImg" alt="footer" id="adsidImg">
          <p>学院</p>
        </div>
      </div>
      <div class="law-show" v-show="GuidePages">
        <button class="law-show-sh" @click="lawshowsh">知道了</button>
      </div>
    </div>
  </transition>
</template>

<script>
  import lawBaseSvg from "@/assets/image/law_icon.js"

  export default {
    name: "law",
    data() {
      return {
        GuidePages: true,
        GuidePagesLow: "",
        bgImg: lawBaseSvg.law[0].img,
        collectImg: lawBaseSvg.law[1].img,
        newImg: lawBaseSvg.law[2].img,
        footImg: lawBaseSvg.law[3].img,
        adsImg: lawBaseSvg.law[5].img,
        schoolImg: lawBaseSvg.law[6].img,
        roadShowImg: lawBaseSvg.law[7].img,
        yanbaoImg: lawBaseSvg.law[9].img,
        newIcon: lawBaseSvg.law[8].img,
        mokaoImg: lawBaseSvg.law[10].img,
        isOnload: true,
        file: "",
        error: false
      }
    },
    watch: {},
    created() {
      if (window.localStorage.getItem('lawGuidePages')) {
        this.GuidePages = false;
      } else {
        this.GuidePages = true;
      }
      // 每次打开页面只执行一次。
      document.title = "信公小安";
      this.$nextTick(() => {
        window.sessionStorage.clear();
        let local = ["guizeIdStatus", "value2", "marketIdStatus", "value0",
          "adsActive", "fawenIdStatus", "value1", "titleIME", "contentIME",
          "keyIME", "colorBtn", "BtnMany", "DateStartEnd", "timeIdStatus"
        ];
        // this.$storage.localStorageRemove(local);
      });
    },
    mounted() {
      if (this.$cookie.get()) {
        this.isOnload = false;//  未授权登录
      } else {
        this.isOnload = true;//  授权登录
        if (window.localStorage.getItem("wixAccreditCode") == null || window.localStorage.getItem("wixAccreditCode") == undefined) {
          window.localStorage.setItem("wixAccreditCode", 'true');
          //   window.location.href = global.wixAccreditLaw; // 小安 cai 11：27 ===》20：11
        }
      }
    },
    methods: {
      lawshowsh() {
        window.localStorage.setItem('lawGuidePages', false);
        this.GuidePages = false;
      },
      indexTo(index) {
        console.log('index', index);
        if (index == 'search') {
          this.$router.push({path: '/lawSearch', query: {}});

        } else if (index == 'new') {

        }
      }
    }

  }
</script>

<style lang="scss">
  #law {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .logo {
      width: 100%;
      height: 470px;
      padding: 128px 0 50px 0;
      box-sizing: border-box;
      img {
        display: block;
        height: 100%;
        padding-left: 50px;
      }
    }
    .search {
      width: 100%;
      height: 90px;
      padding: 0 50px;
      box-sizing: border-box;
      position: relative;
      .searchVal {
        height: 90px;
        border: 1px solid #cbcbcb;
        color: #cbcbcb;
        border-radius: 4px;
        line-height: 88px;
        padding-left: 30px;
        font-size: 30px;
      }
    }
    .law-slo {
      font-size: 24px;
      color: #e3e3e3;
      font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
      padding: 0 48px;
      display: none;
    }
    .law-show {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 3000;
      .law-show-sh {
        height: 65px;
        width: 200px;
        background-color: rgba(0, 0, 0, 0.01);
        color: #ffb148;
        border-radius: 4px;
        font-size: 30px;
        position: absolute;
        bottom: 17%;
        left: 50%;
        margin-left: -100px;
        text-align: center;
        line-height: 65px;
        border: 1px dashed #ffb148;
      }
    }
    .link {
      width: 80%;
      height: 200px;
      font-size: 0;
      margin: 0 auto;
      padding-top: 108px;
      box-sizing: border-box;
      .linkitem {
        width: 25%; /* 精选栏目 */
        /* width:33.333%;*/
        height: auto;
        display: inline-block;
        text-decoration: none;
        position: relative;
        img, .aa img {
          display: block;
          height: 50px;
          margin: 0 auto 20px;
          overflow: hidden;
        }
        p {
          margin: 0;
          width: 100%;
          font-size: 26px;
          color: #b1b1b1;
          text-align: center;
        }
        #newTip {
          height: 28px;
          position: absolute;
          top: -28px;
          right: 4px;
          width: auto;
        }
      }
    }
  }
  #law .GuidePages {
    position: relative;
    top: -225px;
    left: 8px;
    z-index: 1007;
  }
  #law .GuidePage {
    position: absolute;
    top: -27px;
    left: -35px;
    width: 358%;
    color: white;
    font-size: 18px;
  }
  #law .GuidePages img {
    height: 234px;
  }
  .bounce-enter-active {
    animation: bounce-in .4s;
  }
  .bounce-leave-active {
    animation: bounce-in .4s reverse;
  }
  @-moz-keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @-webkit-keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @-o-keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(100%);
    opacity: 0;
  }
</style>
