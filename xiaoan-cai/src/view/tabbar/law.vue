<template>
  <div id="law">
    <div class="logo">
      <img :src="bgImg" alt="">
    </div>
    <div class="search" @click="indexTo('/lawsearch')">
      <div class="searchVal">搜索法规名称</div>
    </div>
    <div class="law-slo">
      <div>董秘智能移动工具，触手可及</div>
    </div>
    <div class="link">
      <div class="linkitem" @click="indexTo('/lawlates')">
        <img :src="newImg" alt="newrule">
        <p>新规</p>
      </div>
      <div class="linkitem" @click="indexTo('new')">
        <img :src="adsImg" alt="footer">
        <p>精选</p>
      </div>
      <div class="linkitem" @click="indexTo('new')">
        <img :src="mokaoImg" alt="roadShow">
        <p>模考</p>
      </div>
      <div class="linkitem" @click="indexTo('new')">
        <img :src="schoolImg" alt="footer" id="adsidImg">
        <p>学院</p>
      </div>
    </div>
    <div class="law-show" v-show="GuidePages">
      <button class="law-show-sh" @click="lawshowsh">知道了</button>
    </div>
  </div>
</template>

<script>
  import lawBaseSvg from "@/assets/image/law_icon.js"

  export default {
    name: "law",
    data() {
      return {
        GuidePages: false,
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
      // 每次打开页面只执行一次。
      // document.title = "信公小安";
    },
    mounted() {
    },
    methods: {
      lawshowsh() {
        window.localStorage.setItem('lawGuidePages', false);
        this.GuidePages = false;
      },
      indexTo(path) {
        console.log('index', path);
        this.$router.push({path: path});
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
      height: 235px;
      padding: 64px 0 25px 0;
      box-sizing: border-box;
      img {
        display: block;
        height: 100%;
        padding-left: 25px;
      }
    }
    .search {
      width: 100%;
      height: 45px;
      padding: 0 25px;
      box-sizing: border-box;
      position: relative;
      .searchVal {
        height: 45px;
        border: 1px solid #cbcbcb;
        color: #cbcbcb;
        border-radius: 2px;
        line-height: 44px;
        padding-left: 15px;
        font-size: 15px;
      }
    }
    .law-slo {
      font-size: 12px;
      color: #e3e3e3;
      font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
      padding: 0 24px;
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
        height: 32.5px;
        width: 200px;
        background-color: rgba(0, 0, 0, 0.01);
        color: #ffb148;
        border-radius: 2px;
        font-size: 15px;
        position: absolute;
        bottom: 17%;
        left: 50%;
        margin-left: -50px;
        text-align: center;
        line-height: 32.5px;
        border: 1px dashed #ffb148;
      }
    }
    .link {
      width: 80%;
      height: auto;
      font-size: 0;
      margin: 0 auto;
      padding-top: 54px;
      box-sizing: border-box;
      display: flex;
      .linkitem {
        flex: 1;
        // width: 25%; /* 精选栏目 */
        /* width:33.333%;*/
        height: auto;
        display: inline-block;
        text-decoration: none;
        position: relative;
        img, .aa img {
          display: block;
          height: 25px;
          margin: 0 auto 10px;
          overflow: hidden;
        }
        p {
          margin: 0;
          width: 100%;
          font-size: 13px;
          color: #b1b1b1;
          text-align: center;
        }
        #newTip {
          height: 14px;
          position: absolute;
          top: -14px;
          right: 2px;
          width: auto;
        }
      }
    }
  }
  #law .GuidePages {
    position: relative;
    top: -112.5px;
    left: 4px;
    z-index: 1007;
  }
  #law .GuidePage {
    position: absolute;
    top: -13.5px;
    left: -17.5px;
    width: 358%;
    color: white;
    font-size: 9px;
  }
  #law .GuidePages img {
    height: 117px;
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
