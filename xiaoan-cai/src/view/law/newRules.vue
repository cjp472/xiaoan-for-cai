<template>
  <div class="newrules" id="newRules" ref="newLawDom">
    <div class="headSearch" @click="goSearch()" style="z-index: 2000;">
      <div><i class="icon iconfont icon-tripsousuo"></i>{{searchTxt}}</div>
    </div>
    <div class="wrapper" id="wrapper" ref="wrapperDom" :style="{ height: wrapperHeight + 'px' }">
      <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
          infinite-scroll-distance="0">
        <li class="medCont" v-for="(list,index) in contenta" @click="goCount(index)">
          <div class="medTil">{{nuwNumber(list.name)}}</div>
          <div class="medCondition">
            <span v-show="list.referenceNumber">{{list.referenceNumber}}</span>
            <span v-show="list.referenceNumber">|</span>
            <span v-show="list.timeliness">{{list.timeliness}}</span>
            <span v-show="list.PublishDate">|</span>
            <span v-show="list.PublishDate">{{$const.format(list.PublishDate)}}</span>
            <span class="medNew" v-if="list.PublishDate > LastWeek">New</span>
            <span v-else></span>
          </div>
          <div class="medP"></div>
        </li>
      </ul>
      <p v-show="infLoading" class="infinite-loading">
        <mt-spinner type="snake" v-show="allLoaded"></mt-spinner>
        <span v-if="allLoaded" style="vertical-align: middle">加载中...</span>
        <xiaoan-drop v-else></xiaoan-drop>
        <!--<span v-else class="infinite-drop">没有更多了</span>-->
      </p>
    </div>
    <div class="goTrack" @click="goTrack()"><img v-lazy="track" alt=""></div>
    <div class="showPrompt">仅显示最近三个月发布的新规</div>
  </div>
</template>

<script>
  import drop from "../../components/warning/drop"

  export default {
    name: 'newrules',
    data() {
      return {
        amli: '../../static/img/rules/anli.png',
        searchIon: '../../static/img/personal/search@3x.png',
        searchTxt: '搜索',
        top: 1,
        bottom: 15,
        NowDate: '', // 当前元素
        contenta: [], // 数组
        nextd30: '', // 倒数第三十天
        nextd0: '', // 当天
        track: '../../static/img/track@3x.png',
        isOnload: true,
        LastWeek: '',
        /**/
        num1: '',
        num2: '',
        bottomStatus: '', // 下拉状态
        rulesListNum: '',
        shuliang: '',
        //
        infLoading: true,
        loading: false,
        allLoaded: true,
        wrapperHeight: ''
      }
    },
    components: {
      "xiaoan-drop": drop
    },
    created() {
      /**/
      this.LastWeek = this.$const.getTimestamp(this.$const.getBeforeDate(7));
      this.nextd0 = this.$const.getBeforeDate(89);// 距离当前时间
      this.nextd30 = this.$const.getNewDate();// 当前
      console.log("前90天" + this.nextd0, "当前" + this.nextd30, "最近7天", this.LastWeek);
      /**/
      let user_id = this.$cookie.getCookie("userId");
      if (user_id == '') {
        this.isOnload = false; // 未授权登录
      } else {
        this.isOnload = true; // 授权登录
      }
      this.searchRules();
    },
    mounted() {
      this.$nextTick(() => {
        console.log('=====', this.$style.tabbar.height);
        // this.$style.tabbar.height 为底部栏的高度
        this.wrapperHeight = (this.$refs.newLawDom.clientHeight - this.$refs.wrapperDom.offsetTop - this.$style.tabbar.height);
      })
      //
      setTimeout(() => {
        this.$nextTick(() => {
          $('.showPrompt').animate({bottom: "0", opacity: 0});
        })
      }, 2500);
      //
      let adverttitle = document.title;
      let sharelink2 = decodeURI(window.location.href); // 分享链接
      let shareDesc = ""; // 描述
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
    },
    methods: {
      // /处理。。
      nuwNumber(str) {
        let hei = document.body.clientWidth;
        let nowH = parseInt((hei - 39) / 16) * 2;
        if (str.length >= nowH) {
          return (str.substring(0, nowH) + '...')
        } else {
          return str
        }
      },
      goTrack() {
        if (this.isOnload) {
          this.$router.push({path: '/track', query: {MathTime: global.timestamp}});
        } else {
          let refer_title = "我的足迹";
          let refer_url = global.currentIp + "#/track?MathTime=" + global.timestamp;
          this.$storage.loginStatus(this, refer_title, refer_url);
        }
      },
      goSearch() {
        this.$router.push({path: '/search', query: {MathTime: global.timestamp}});
      },
      //
      goCount(index) {
        console.log(this.contenta[index]);
        if (this.contenta[index].id == 1) {
          this.$router.push({
            path: 'brief',
            query: {
              advert_Id: this.contenta[index].id,
              advert_Title: this.contenta[index].title,
              MathTime: global.timestamp
            }
          });
        } else if (this.contenta[index].id == 2) {
          this.$router.push({
            path: 'pledge',
            query: {
              advert_Id: this.contenta[index].id,
              advert_Title: this.contenta[index].title,
              MathTime: global.timestamp
            }
          });
        } else if (this.contenta[index].id == 3) {
          window.location.href = this.contenta[index].url;
        } else if (this.contenta[index].id == 5) {
          window.location.href = this.contenta[index].url;
        } else if (this.contenta[index].id == 6) {
          window.location.href = this.contenta[index].url;
        } else {
          this.$router.push({
            path: '/rulesCount',
            query: {id: this.contenta[index].id, MathTime: global.timestamp}
          });
        }
      },
      //
      loadMore() {
        let lastValue = this.top;
        if (lastValue < this.shuliang) {
          this.loading = true;
        } else {
          this.loading = false;
        }
        setTimeout(() => {
          if (lastValue < this.shuliang) {
            this.top += 1;
            this.searchRules();
            console.log("123", this.loading);
          } else {
            if (this.shuliang) {
              this.allLoaded = false;
            }
          }
          this.loading = false;
          console.log(lastValue, this.top, this.loading);
        }, 1300);
      },
      // 最近30天
      searchRules() {
        this.$http({
          method: 'GET',
          url: this.$api.host + 'law/search',
          params: {
            pageNo: this.top,
            pageSize: this.bottom,
            releaseStart: this.nextd0,
            releaseEnd: this.nextd30,
            sortType: "发布日期",
            type: 'law'
          }
        }).then((res) => {
          // * console.log(res);*/
          if (res.data.returnCode == 1) {
            // 根据总条数 判断有多少页
            if (res.data.returnObject.count > 0) {
              let number = res.data.returnObject.count;
              this.shuliang = this.$array.totalPage(number, this.bottom);
              // 控制下拉刷新
              let rat = res.data.returnObject.list;
              this.contenta = this.$array.loadMore(this.contenta, rat);
              console.log(this.contenta, this.shuliang);
            } else {
              this.contenta = [];
              this.num2 = "0";
              this.shuliang = 0;
              this.allLoaded = false;
            }
          } else {
            this.contenta = [];
            this.num2 = "0";
            this.shuliang = 0;
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="scss">
  .newrules {
    height: 100%;
    width: 100%;
    background-color: white;
  }
  /***********加载动画****************/
  #newRules .mint-spinner-snake {
    height: 14px !important;
    width: 14px !important;
    border: 2px solid transparent;
    border-top-color: rgb(252, 199, 127) !important;
    border-left-color: rgb(252, 199, 127) !important;
    border-bottom-color: rgb(252, 199, 127) !important;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }
  .infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .snake {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #535353;
    height: 50px;
    box-sizing: border-box;
    text-align: center;
  }
</style>

<style scoped>
  #newRules .headSearch {
    height: 50px;
    background-color: #f0f1f5;
    padding: 0 12px;
    /*box-sizing: border-box;*/
  }
  #newRules .wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  #newRules .headSearch div {
    height: 35px;
    background-color: white;
    text-align: center;
    line-height: 35px;
    font-size: 15px;
    position: relative;
    border: none;
    top: 7.5px;
    box-sizing: border-box;
    color: #8d8d8d;
    border-radius: 2px;
    font-weight: lighter;
  }
  #newRules .headSearch .icon-tripsousuo {
    font-size: 18px;
  }
  #newRules .headSearch div img {
    height: 15px;
    position: relative;
    top: 2px;
    margin-right: 10px;
  }
  #newRules .medCont {
    font-size: 0;
  }
  #newRules .medCont:active {
    background-color: #f0f1f5;
  }
  #newRules .medCont .medTil {
    padding: 18px 12px 0 12px;
    overflow: hidden;
    text-overflow: clip;
    /*display: -webkit-box;*/
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /*line-height: 19px;*/
    font-size: 15px;
    font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
  }
  #newRules .medCont .medCondition {
    padding: 7px 12px 20px 12px;
    font-size: 12px;
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    color: #8d8d8d;
  }
  #newRules .medCont .medCondition .medNew {
    float: right;
    border: 1px solid #faa02a;
    border-radius: 2px;
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    box-sizing: border-box;
    width: 32.5px;
    color: #f6900c;
    height: 17px;
    line-height: 17px;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  #newRules .medCont .medP {
    height: 7px;
    background-color: #f0f1f5;
  }
  #newRules .goTrack {
    display: inline-block;
    position: absolute;
    bottom: 95px;
    right: 12px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.9;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    padding: 8px 12px;
  }
  #newRules .goTrack img {
    height: 25px;
    width: 25px;
    padding-top: 4px;
  }
  /* .snake{
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 12px;
       font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
       color: #535353;
       height: 50px;
       box-sizing: border-box;
       vertical-align: middle;
   }
   .snake-circle{
       height: 14px;
       width: 14px;
       -webkit-animation: snake-rotate 0.8s infinite linear;
       animation: snake-rotate 0.8s infinite linear;
       border: 2px solid transparent;
       border-radius: 50%;
       border-top-color: rgb(252, 199, 127);
       border-left-color: rgb(252, 199, 127);
       border-bottom-color: rgb(252, 199, 127);

       margin: 0 auto;
       !*position: absolute;
       left: 0;
       top: 0;
       right: 0;
       bottom: 0;
       margin: auto;*!
   }
   @keyframes snake-rotate{
       0%{
           -webkit-transform: rotate(0deg);
           transform: rotate(0deg);
       }
       100%{
           -webkit-transform: rotate(360deg);
           transform: rotate(360deg);
       }
   }*/
  /**********************************/
  .showPrompt {
    height: 45px;
    width: 100%;
    color: #ffffff;
    background-color: rgba(255, 153, 51, 0.85);
    position: absolute;
    bottom: 49.5px;
    text-align: center;
    line-height: 45px;
    font-size: 15px;
  }
</style>

