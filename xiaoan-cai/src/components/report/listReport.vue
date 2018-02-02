<template>
    <transition name="bounce">
    <div id="listReport">
        <div class="searchs">
            <div class="seabox">
                <div class="searchPrompt"></div>
                <ul class="searchScroll">
                    <li class="searchScrollSpan" v-for="(list,index) in routeValArr" id="searchScrollSpan">
                        {{newBtnArr(list)}}
                        <span class="searchClosed" @click="searchClose(index)">
                            <i class="icon iconfont promptClose icon-X"></i>
                        </span>
                    </li>
                </ul>
                <div class="goSearch" @click='goSearch'>
                    <div class="rulesNum" v-show="num>1">{{num+"条"}}</div>
                </div>
            </div>
        </div>
        <div class="listReportGlobal">
            <div class="listReportContent" ref="wrapper">
                <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                    infinite-scroll-distance="0">
                    <li v-for="(list,index) in contenta" @click="goToDetailReport(index)">
                        <p class="infinite-list-title" v-html="key(list.subject)"></p>
                        <p class="infinite-list-bottom">
                            <span class="infinite-list-type"
                                  v-show="list.securitiesCompany">{{list.securitiesCompany}}</span>
                            <span v-show="list.securitiesCompany">&ensp;|&ensp;</span>
                            <span class="infinite-list-name">{{list.author}}</span>
                            <span v-show="list.levelTwo">&ensp;|&ensp;</span>
                            <span class="infinite-list-form">{{list.levelTwo}}</span>
                            <span class="infinite-list-date"
                                  v-show="list.sentDate">{{$const.format(list.sentDate)}}</span>
                        </p>
                    </li>
                </ul>
                <p v-show="infLoading" class="infinite-loading">
                    <mt-spinner type="snake" v-show="allLoaded"></mt-spinner>
                    <span v-if="allLoaded" class="snake-text">加载中...</span>
                    <xiaoan-drop v-else></xiaoan-drop>
                </p>
            </div>
            <div class="listHint" v-show="noList">
                <xiaoan-hint :message=hintText :imgSrc=hintImg :isShowBtn=isShowMyReportBtn></xiaoan-hint>
            </div>
        </div>
        <xiaoan-loading v-show="loadingDis"></xiaoan-loading>
    </div>
    </transition>
</template>
<script>
  import loading from "../warning/loading"
  import drop from "../warning/drop"
  import hint from "../warning/hint"

  export default {
    name: 'listReport',
    data: function () {
      return {
        num: 0,
        loadingDis: false,
        infLoading: true,
        loading: false,
        allLoaded: true,
        wrapperHeight: "",
        contenta: [],
        $routeVal: "",
        routeValArr: [],

        LastWeek: "",
        nextd0: "",
        nextd30: "",
        bottom: 10,
        top: 1,
        hintText: "搜索不到相关内容！",
        hintImg: "../static/img/rules/trySenior.png",
        isShowMyReportBtn: false,
        noList: false,
      }
    },
    watch: {},
    components: {
      "xiaoan-loading": loading,
      "xiaoan-drop": drop,
      "xiaoan-hint": hint,
    },
    mounted: function () {
      /**/
      let userId = this.$cookie.getCookie("userId");
      if (userId == "") {
        this.loadingDis = true;
        this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
      }
      this.textHeight();
      /**/
      let adverttitle = "信公小安 x 天风证券研究所";
      let sharelink2 = decodeURI(window.location.href);//分享链接
      let shareDesc = "用信公小安，随时掌握最新研报";//描述
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, false);
      /**/
      this.LastWeek = this.$const.getTimestamp(this.$const.getBeforeDate(7));
      this.nextd0 = this.$const.getBeforeDate(89);//距离当前时间
      this.nextd30 = this.$const.getNewDate();//当前
      console.log("前90天" + this.nextd0, "当前" + this.nextd30, "最近7天", this.LastWeek);
      ///
      /**/
      this.routeWork();
      var hei =
        //this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        setTimeout(() => {
          this.$nextTick(() => {
            this.searchRules();
          })
        }, 500)
    },
    methods: {
      textHeight() {
        let winHeight = document.body.clientHeight;
        let search = document.querySelector(".searchs").clientHeight;
        let toheight = (winHeight - (search)) + "px";
        document.querySelector(".listReportContent").style.height = toheight;
      },
      key(str) {
        /*var hei = document.body.clientWidth;
        var nowH = parseInt((hei - 39) / 16) * 2;
        if (str.length >= nowH) {
          str = str.substring(0, nowH) + '...';
        } else {
          str
        }*/
        let array = this.routeValArr;
        array = this.$array.ImpArr(array);//数组去除空元素
        array = this.$array.unique(array);
        for (let i = 0; i < array.length; i++) {
          let fen = str.split(array[i]);
          str = fen.join('<span style="color: #ffc051;">' + array[i] + '</span>');
        }
        return str;
      },
      routeWork() {
        this.$routeVal = this.$route.query.value;
        console.log(this.$route.query.value);
        if (this.$routeVal.indexOf(",") > -1) {
          this.routeValArr = this.$routeVal.split(",");
        } else {
          this.routeValArr.push(this.$routeVal);
        }
      },
      loadMore() {
        this.allLoaded = true;
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
          } else {
            this.allLoaded = false;
          }
          this.loading = false;
        }, 1500);
      },
      //
      searchClose(index) {
        //console.log('去除关键词');
        if (this.routeValArr.length > 1) {
          /*if (isNaN(index) || index >= this.routeValArr.length) {
            return false;
          }
          for (let i = 0, n = 0; i < this.routeValArr.length; i++) {
            if (this.routeValArr[i] !== this.routeValArr[index]) {
              this.routeValArr[n++] = this.routeValArr[i];//
            }
          }
          this.routeValArr.length -= 1;*/
          this.$array.closeArr(this.routeValArr, index);
          console.log("====>", this.routeValArr);
          this.top = 1;
          this.contenta = [];
          this.$routeVal = this.routeValArr.join(",");
          //console.log(this.routeValArr);
          this.searchRules();
        } else {
          this.$router.push({path: '/searchReport', query: {MathTime: global.timestamp}});
        }
        //console.log("还有：", this.routeValArr);
      },
      //最近30天
      searchRules() {
        this.$http({
          method: 'GET',
          url: global.host + 'report/searchReports',
          params: {
            pageNum: this.top,
            pageSize: this.bottom,
            keyWord: this.$routeVal,
          }
        }).then((res) => {
          /* console.log(res);*/
          if (res.data.returnCode == 1) {
            //根据总条数 判断有多少页
            let number = res.data.total;
            this.num = number;
            this.shuliang = this.$array.totalPage(number, this.bottom);
            //控制下拉刷新
            let rat = res.data.returnObject;
            this.contenta = this.$array.loadMore(this.contenta, rat);
            console.log(this.contenta, this.shuliang);
            this.noList = false;
          } else {
            this.contenta = [];
            this.num2 = "0";
            this.shuliang = 0;
            this.noList = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //回到search页
      goSearch() {
        console.log("===>", this.$route.query.value);
        this.$router.push({
          path: "/searchReport",
          query: {value: this.routeValArr.join(","), MathTime: global.timestamp}
        })
      },
      //控制显示的搜索条件的字符长度
      newBtnArr(str) {
        if (str.length >= 10) {
          return str = str.substring(0, 10) + '...';
        } else {
          return str
        }
      },
      //
      goToDetailReport(index) {
        console.log(this.contenta[index]);
        //return false
        this.$router.push({path: "/detailReport", query: {id: this.contenta[index].id, MathTime: global.timestamp}});

      }
    }
  }
</script>
<style>
    #listReport .mint-spinner-snake {
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
    #listReport .snake-text {
        margin-left: 5px;
        vertical-align: middle;
    }
</style>
<style scoped>
    #listReport {
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: #f0f1f5;
    }
    #listReport .searchs {
        width: 100%;
        height: 50px;
        background-color: #f0f1f5;
        padding: 7.5px 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 800;
    }
    #listReport .seabox {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: white;
        border-radius: 2px;
    }
    /*搜索栏关键字样式*/
    .searchPrompt {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 35px;
        line-height: 35px;
    }
    .searchScroll {
        margin: 0;
        padding: 0;
        background-color: white;
        display: inline;
        white-space: nowrap;
        overflow-x: scroll;
        float: left;
        overflow-y: hidden;
        max-width: 87%;
        height: 35px;
        z-index: 150;
        -webkit-overflow-scrolling: touch;
    }
    .searchScroll .searchScrollSpan {
        background-color: #fff2e1;
        border-radius: 2px;
        color: #8d8d8d;
        font-weight: lighter !important;
        display: inline-block !important;
        margin: 5px 0 5px 8px;
        height: 25px;
        font-size: 15px;
        line-height: 25px;
        padding-left: 5px;
        padding-right: 5px;
        z-index: 170;
    }
    .searchScroll .searchScrollSpan:last-child {
        margin-right: 8px;
    }
    .searchScroll .promptClose {
        font-size: 15px;
        color: #c1c1c1;
        position: relative;
        top: 0;
    }
    .searchClosed {
        display: inline-block;
        height: 25px;
        position: relative;
        top: 0;
        width: 16px;
        z-index: 200;
    }
    .goSearch {
        display: flex;
        width: auto;
        height: 35px
    }
    .goSearch .rulesNum {
        position: absolute;
        top: 9px;
        right: 8px;
        color: #8d8d8d;
        font-size: 12px;
        font-weight: normal;
    }
    #listReport .listReportGlobal {
        height: 100%;
        width: 100%;
        position: relative;
    }
    #listReport .listReportContent {
        height: auto;
        width: 100%;
        box-sizing: border-box;
        padding: 0 12px;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
    .infinite-list {

    }
    .infinite-list li {
        list-style-type: none;
        background-color: white;
        margin-bottom: 10px;
        border-radius: 2px;
        padding: 0 16px;
    }
    .infinite-list .infinite-list-title {
        box-sizing: border-box;
        padding: 16px 0 16px 0;
        border-bottom: 0.5px solid #e3e3e3;
        color: #323232;
        font-size: 15px;
    }
    .infinite-list .infinite-list-bottom {
        display: table;
        width: 100%;
        padding: 10px 0;
        color: #8d8d8d;
        font-size: 11px;
    }
    .infinite-list .infinite-list-bottom span {
        font-size: 11px;
    }
    .infinite-list .infinite-list-date {
        display: table-cell;
        width: auto;
        text-align: right;
    }
    .listHint {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: hidden;
        z-index: 100;
    }
    .infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
</style>
