<template>
    <transition name="bounce">
    <div class="ads" id="ads">
        <div class="nav">
            <div class="nav-scroll">
                <button class="linkScroll" v-for="(list,index) in adsCont" :id="'add'+index"
                        @click.prevent="switchCut(index,$event)">{{list.advertType}}
                    <span class="nav-head-sin"></span></button>
            </div>
        </div>
        <div class="nav-content">
            <mt-tab-container v-model="active" swipeable class="nav-tab">
                <mt-tab-container-item v-for="(list,index) in adsCont" :id="index" :key="index" class="wrapper">
                    <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                        infinite-scroll-distance="0">
                        <li v-for="(list,index) in adsCont[index].lists" class="nav-content-list"
                            @click="navContent(index)">
                            <img :src="list.advertImgUrl" alt="">
                            <div class="nav-content-list-title">{{list.advertTitle}}</div>
                            <div class="nav-content-list-doc">
                                <span>{{list.advertType}}</span><span>&ensp;|&ensp;</span><span>{{$const.format(list.createTime)}}</span>
                            </div>
                        </li>
                    </ul>
                    <p v-show="infLoading" class="infinite-loading">
                        <mt-spinner type="snake" v-show="allLoaded"></mt-spinner>
                        <span v-if="allLoaded">加载中...</span>
                        <xiaoan-drop v-else></xiaoan-drop>
                    </p>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <v-returnHome position="fixed" bottom="6%"></v-returnHome>
    </div>
    </transition>
</template>

<script>
  import returnHome from "../warning/returnHome.vue"
  import drop from "../warning/drop"

  export default {
    name: 'ads',
    data() {
      return {
        active: 0,
        adsCont: [],
        offScroll: [],
        page: 1,
        bottomStatus: '',
        getAdvert: [],
        totalPage: "",
        reft: false,
        loading: false,
        allLoaded: true,
        wrapperHeight: 0,
        infLoading: true,
      };
    },
    watch: {
      active: "scroll",
    },
    components: {
      "v-returnHome": returnHome,
      "xiaoan-drop": drop
    },
    mounted() {
      this.getAdvertType();
      var adverttitle = "信公精选，干货收录";
      var sharelink2 = decodeURI(window.location.href); // 分享链接
      var shareDesc = "信息披露、资本市场精选资讯，点击了解更多"; // 描述
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
    },
    methods: {
      // 定位
      offsetLeft(index) {
        let hei = document.body.clientWidth, arr = [], office = $(".linkScroll");
        // 判断初次进入是 "this.offScroll"是否赋值成功
        if (this.offScroll == "" || this.offScroll.length == 0 || this.offScroll == undefined) {
          this.$nextTick(() => {
            for (let i = 0; i < office.length; i++) {
              arr.push(office[i].offsetLeft);
            }
            this.offScroll = arr;
            console.log("111");
          });
        } else {
          let clientWidth = $("#add" + index)[0].clientWidth;
          let clientW = (clientWidth / 2);
          let liLeft = ((this.offScroll[index]) + clientW);
          var heiS = (hei / 2);
          console.log("222", clientWidth, clientW, liLeft, heiS);
          $(".nav-scroll").animate({scrollLeft: liLeft - heiS});
        }
      },
      //加载更多
      loadMore() {
        let lastValue = this.adsCont[this.active].pages;
        if (lastValue < this.adsCont[this.active].totalPage) {
          this.loading = true;
        }
        setTimeout(() => {
          let lastValue = this.adsCont[this.active].pages;
          if (lastValue < this.adsCont[this.active].totalPage) {
            this.adsCont[this.active].pages += 1;
            if (this.active == 0) {
              this.getInfo();
            } else {
              this.getAdvertByType(this.adsCont[this.active].advertType);
            }
          } else {
            this.allLoaded = false;
          }
          this.loading = false;
          console.log("<=====>\"/", this.loading, this.allLoaded);
        }, 2500);
      },
      //跳转页面
      navContent(index) {
        //console.log(index, this.adsCont[this.active].lists[index]);
        window.localStorage.setItem("adsActive", this.active);
        if (this.adsCont[this.active].lists[index].advertUrl == "" || this.adsCont[this.active].lists[index].advertUrl == null) {
          this.$router.push({
            path: 'brief',
            query: {
              advert_Id: this.adsCont[this.active].lists[index].advertId,
              advert_Title: this.adsCont[this.active].lists[index].advertTitle,
              MathTime: global.timestamp
            }
          });
        }/* else if (this.adsCont[this.active].lists[index].advertx == 10) {
          this.$router.push({path: 'roadShow'});
          // 埋点勿删
          /!*MtaH5.clickStat('Vv55tXYlcJIhB0Xm',{'ro489h8oip0836c9':'true'})*!/
        } */else {
          window.location.href = this.adsCont[this.active].lists[index].advertUrl;
        }
      },
      //获取分类
      getAdvertType() {
        this.$http({
          method: "GET",
          url: this.$api.host + "getAdvertType",
          params: {}
        }).then((res) => {
          //console.log(res);
          if (res.data.returnCode == 1) {
            //this.adsCont.push(res.data.returnObject);
            var arr = res.data.returnObject;
            arr = arr.filter(function (item) {
              return item.count != '0';
            });
            var adst = [{"advertType": "全部", count: '110', lists: []}];
            var adsCont = adst.concat(arr);
            for (var i = 0; i < adsCont.length; i++) {
              adsCont[i].pages = 1;
              adsCont[i].totalPage = "";
              adsCont[i].index = false;
            }
            this.adsCont = adsCont;
            this.$nextTick(() => {
              setTimeout(() => {
                if (window.localStorage.getItem("adsActive") == "" || window.localStorage.getItem("adsActive") == null || window.localStorage.getItem("adsActive") == undefined || window.localStorage.getItem("adsActive") == "0" || window.localStorage.getItem("adsActive") == 0) {
                  this.active = 0;
                  this.getInfo();
                  this.lineHeight();
                  this.offsetLeft(this.active);
                } else {
                  this.active = window.localStorage.getItem("adsActive");
                  this.lineHeight();
                  this.offsetLeft(this.active);
                  $("#add" + this.active).click();
                }
              })
            })
          }
        }).catch((err) => {

        })
      },
      ///监听active的方法
      scroll() {
        this.$nextTick(() => {
          $(".linkScroll").css({
            "color": "#8d8d8d",
            "font-family": "PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica"
          });
          $(".nav-head-sin").css({"display": "none"});
          $("#add" + this.active).css({
            "color": "#ffb148",
            "font-family": "PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica"
          });
          $("#add" + this.active).children().show();
          console.log("1213133dsfsf", this.adsCont[this.active].index);
          this.offsetLeft(this.active);
          ////===============>
          ///Evans for 9.30//===>挂载时重置数组
          console.log("45435345", this.adsCont);
          this.adsCont[this.active].lists = [];
          for (var i = 0; i < this.adsCont.length; i++) {
            this.adsCont[i].pages = 1;
          }
          this.loading = false;
          this.allLoaded = true;
          if (this.active == 0) {
            this.getInfo();
          } else {
            this.getAdvertByType(this.adsCont[this.active].advertType);
          }
          this.lineHeight();
          this.adsCont[this.active].index = true;
        })

      },
      //计算高度
      lineHeight: function () {
        var hei = document.body.clientHeight;
        var head = document.querySelector(".nav").clientHeight;
        var ghg = (hei - head) + "px";
        document.querySelector(".nav-content").style.height = ghg;
        document.querySelector(".mint-tab-container-item").style.height = ghg;
        document.querySelector(".mint-tab-container-wrap").style.height = ghg;
        document.querySelector(".wrapper").style.height = ghg;
        document.querySelector(".nav-tab").style.height = ghg;
      },
      switchCut(index, event) {
        var el = event.currentTarget;
        console.log(index, this.adsCont[index], el, $(el).parent().scrollLeft());
        $(".linkScroll").css({
          "color": "#8d8d8d",
          "font-family": "PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica"
        });
        $(".nav-head-sin").css({"display": "none"});
        $(el).css({
          "color": "#ffb148",
          "font-family": "PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica"
        });
        $(el).children().show();
        this.active = index;
      },
      //根据种类来获取广告
      getAdvertByType: function (index) {
        this.$http({
          method: "GET",
          url: this.$api.host + "getAdvertByType",
          params: {
            type: index,
            page: this.adsCont[this.active].pages,
          }
        }).then((res) => {
          console.log(res);
          if (res.data.returnCode == 1) {
            this.adsCont[this.active].totalPage = res.data.returnObject.totalPage;
            //控制下拉刷新
            if (this.adsCont[this.active].lists.length > 0 && res.data.returnObject.list !== null) {
              for (var i in res.data.returnObject.list) {
                this.adsCont[this.active].lists.push(res.data.returnObject.list[i]);
              }
            } else if (this.adsCont[this.active].lists.length == 0 && res.data.returnObject.list !== null) {
              this.adsCont[this.active].lists = res.data.returnObject.list;
            } else {
              this.adsCont[this.active].lists = [];
            }
            if (this.adsCont[this.active].lists.length != 0) {
              this.adsCont[this.active].lists = this.adsCont[this.active].lists.filter(function (item) {
                return item.advertType == index;
              });
            }
          } else {

          }
        }).catch((err) => {

        })
      },
      //所有的广告
      getInfo() {
        //console.log("this.adsCont[this.active].page", this.active, this.adsCont, this.adsCont[0].pages);
        this.$nextTick(() => {
          this.$http({
            methods: "GET",
            url: this.$api.host + "getAdvertInfo",
            params: {
              page: this.adsCont[this.active].pages,
            }
          }).then((res) => {
            if (res.data.returnCode == 1) {
              this.adsCont[this.active].totalPage = res.data.returnObject.totalPage;
              //this.getAdvert = res.data.returnObject.list;
              //控制下拉刷新
              if (this.adsCont[this.active].lists.length > 0 && res.data.returnObject.list !== null) {
                for (var i in res.data.returnObject.list) {
                  this.adsCont[this.active].lists.push(res.data.returnObject.list[i]);
                }
              } else if (this.adsCont[this.active].lists.length == 0 && res.data.returnObject.list !== null) {
                this.adsCont[this.active].lists = res.data.returnObject.list;
                /*this.adsCont[this.active].lists = res.data.returnObject.list;
                var arrObj = {
                  advertUrl: "http://www.roadshowchina.cn/Wap/company/applyFlagshipStore.html",
                  advertImgUrl: 'http://an-announcement.oss-cn-shanghai.aliyuncs.com/advertImage/advert3554754203864190896.png',
                  advertTitle: "信公小安×路演中",
                  advertType: "置顶推荐",
                  createTime: 1507737600000,
                  advertx: 10
                };
                this.adsCont[this.active].lists.splice(0, 0, arrObj)*/
              } else {
                this.adsCont[this.active].lists = [];
              }
              //过滤小安指南
              this.adsCont[this.active].lists = this.adsCont[this.active].lists.filter(function (item) {
                return item.advertId != '4';
              });

            } else {
            }
          }).catch((err) => {
            console.log(err)
          })
        })
      },
    }
  };
</script>

<style>
    /***********加载动画****************/
    #ads .mint-spinner-snake {
        border: 2px solid transparent;
        border-top-color: rgb(252, 199, 127) !important;
        border-left-color: rgb(252, 199, 127) !important;
        border-bottom-color: rgb(252, 199, 127) !important;
        height: 14px !important;
        width: 14px !important;
        -webkit-animation: mint-spinner-rotate 0.8s infinite linear !important;
        animation: mint-spinner-rotate 0.8s infinite linear !important;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        /*margin-bottom: 7.5px;*/
    }
    .infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .infinite-drop {
        font-size: 15px;
        color: #323232;
    }
    .snake {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #535353;
        height: 50px;
        box-sizing: border-box;
        text-align: center;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    }
</style>

<style lang="css" scoped>
    #ads {
        background-color: #f0f1f5;
    }
    #ads .nav {
        height: 45px;
        /*line-height: 45px;*/
        width: 100%;
        box-sizing: border-box;
        background-color: rgba(255, 255, 255, 1);
        /*display: inline-block;*/
        white-space: nowrap;
        border-bottom: 0.5px solid #e3e3e3;
        padding: 0 12px;
    }
    #ads .nav .nav-scroll {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
    }
    #ads .linkScroll {
        position: relative;
        height: 45px;
        line-height: 45px;
    }
    #ads .nav-head-sin {
        position: absolute;
        bottom: 1px;
        left: 50%;
        border-radius: 2px;
        /*// height: 2px;*/
        border-top: 2px solid #ffb148;
        width: 30px;
        /*display: inline-block;*/
        background-color: #ffb148;
        -webkit-transform: translateX(-50%);
        display: none;
        z-index: 1000;

    }
    #ads .linkScroll:first-child {
        color: #ffb148;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    }
    #ads .linkScroll:first-child .nav-head-sin {
        display: block;
    }
    #ads .nav .nav-scroll::-webkit-scrollbar {
        display: none;
        opacity: 0;
    }
    #ads .nav .NewBtnScroll {
        display: table-cell;
        /*margin-right: 0;*/
        /*width: 25%;*/
        /*text-align: left;*/
    }
    #ads .nav button {
        font-size: 15px;
        border: 0;
        margin-right: 30px;
        background-color: rgba(255, 255, 255, 0);
        color: #8d8d8d;
    }
    #ads .nav button:last-child {
        margin-right: 0;
    }
    #ads .nav-content {
        box-sizing: border-box;
        width: 100%;
        height: auto;
    }
    #ads .nav-content .nav-content-list {
        font-size: 0;
        background-color: white;
        border-radius: 4px;
        border: 0.5px solid #e3e3e3;
        margin: 0 12px 15px 12px;
    }
    #ads .nav-content .nav-content-list:first-child {
        margin-top: 15px;
    }
    #ads .nav-content .nav-content-list .nav-content-list-title {
        font-size: 15px;
        margin: 11px 0 3px 0;
        padding: 0 8px;
        box-sizing: border-box;
    }
    #ads .nav-content .nav-content-list .nav-content-list-doc {
        font-size: 12px;
        padding: 0 8px 11px 8px;
        box-sizing: border-box;
        color: #8d8d8d;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    #ads .nav-content .nav-content-list img {
        width: 100%;
        height: 195px;
        border-bottom: 0.5px solid #e3e3e3;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
    }
    #ads .nav-content .nav-tab {
        box-sizing: border-box;
        /*padding: 0 12px 0 12px;*/
    }
    #ads .wrapper {
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

</style>
