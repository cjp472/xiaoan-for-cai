<template>
    <div id="searchPower">
        <div class="headSearch" @click="goSearch" style="z-index: 2000;">
            <div><i class="icon iconfont icon-tripsousuo"></i>&nbsp;{{searchTxt}}</div>
        </div>
        <div class="powerTitles">
            <div>
                <div class="powerTitlesOne">证券简称</div>
                <span class="powerDataTypeNext"></span>
                <div class="powerTitlesTwo">
                    <div class="demoscroll" id="toScrollHead">
                        <ul class="powerDataTypeTitle">
                            <li v-for="list in dataType" class="powerDataTypeTitleLi">{{list.content}}</li>
                        </ul>
                    </div>
                </div>
                <span class="powerDataTypePrev"></span>
            </div>
        </div>
        <div class="powerContent" v-show="powerShow">
            <div class="powerContentName" style="position: absolute;left: 0;top: 0;z-index: 10000;height: auto">
                <div class="powerStock">
                    <ul>
                        <li v-for="(list,index) in listScroll" class="powerStockName" @click="GoTable(index)">
                            <div class="powerStockTitle">{{list.name}}</div>
                            <div class="powerStockCode" v-if="list.stockMarket == 'SH'">
                                <img class="showSH" :src="SH"/><span class="powerDataSHSZ">{{list.code}}</span>
                            </div>
                            <div class="powerStockCode" v-else>
                                <img class="showSZ" :src="SZ"/><span class="powerDataSHSZ">{{list.code}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="powerContentTitle" v-show="scrollShow" style="">
                <div class="demoscroll powerDataType" id="toScroll" style="height: auto;">
                    <!-- <div v-for="(list,index) in listScroll" @click="GoTable(index)">-->
                    <div class="powerDataTypeCont" v-for="(list,index) in listScroll" @click="GoTable(index)">
                        <div class="yearD" v-if="list.year == 1">自定义</div>
                        <div class="yearD" v-else>{{list.year+"年报"}}</div>
                        <div class="powerDataTypeContList">
                            {{unitWan(list.totalAssets)}}
                        </div>
                        <div class="powerDataTypeContList">
                            {{unitWan(list.netAssets)}}
                        </div>
                        <div class="powerDataTypeContList">
                            {{unitWan(list.netProfit)}}
                        </div>
                        <div class="powerDataTypeContList">
                            {{unitWan(list.totalOperatingIncome)}}
                        </div>
                        <div class="line" style="display: none"></div>
                    </div>
                    <!--</div>-->
                </div>
            </div>
            <div class="powerFoo" style="float: right;height: auto">
                <div></div>
                <div class="powerStock">
                    <ul>
                        <li v-for="list in listScroll" class="powerStockName"></li>
                    </ul>
                </div>
            </div>
        </div>

        <!--没有关注显示-->
        <div id="focus-warning" v-show="searchWaring">
            <div class="focus-waringImg"></div>
            <div class="focus-waringText">{{waringText}}</div>
            <mt-button class="focus-waringBtn" @click="waringBin">{{waringBtn}}</mt-button>
        </div>
        <v-returnHome bottom="6%" routeUrl="My"></v-returnHome>
    </div>
    <!---->
</template>
<script>
  import returnHome from "../warning/returnHome.vue"
  export default {
    name: "searchPower",
    data() {
      return {
        position: 0,
        positionHead: 0,
        searchTxt: '搜索/添加更多股票',
        searchIon: '../../static/img/personal/search@3x.png',
        searchWaring: false,
        waringBtn: '去关注',
        waringText: '你暂时还没有关注！',
        displayShow: false,
        unitCode: '',
        list: [],
        powerShow: true,
        CodeName: [],
        scrollShow: false,
        listScroll: [],
        dataType: [
          {"id": "0", "content": "数据来源"},
          {"id": "1", "content": "年末总资产"},
          {"id": "2", "content": "年末净资产"},
          {"id": "3", "content": "年度净利润"},
          {"id": "4", "content": "营业总收入"},
        ],
        scroll: '',
        SH: '../../static/img/lookupTables/SH@3x.png',
        SZ: '../../static/img/lookupTables/SZ@3x.png',
      }
    },
    watch: {
      '$route'(to, from) {
        window.location.reload();
      }
    },
    updated() {
      var hei = document.body.clientHeight;
      var head = (hei - (document.querySelector(".headSearch").clientHeight) - (document.querySelector(".powerTitles").clientHeight)) + "px";
      $(".powerContent").css({"height": head});
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.log('是否是iOS：', isiOS, '是否是Android：', isAndroid);
      if (isAndroid == true) {
        $("#searchPower .powerDataTypeCont:last-child div").css("border-width", "2px");
      } else if (isiOS == true) {
        $("#searchPower .powerDataTypeCont:last-child div").css("border-width", "1px");
      } else {

      }
    },
    created() {
      this.getPermissionInsideList();
    },
    mounted() {
      window.localStorage.removeItem("swiperRealIndex");
      this.positionHead = 10;
      this.position = 10;

      let preview = document.querySelector('#toScrollHead');
      let editor = document.querySelector('#toScroll');

      preview.addEventListener('scroll', (e) => {
        e.stopPropagation();
        editor.scrollLeft = preview.scrollLeft;
      });

      editor.addEventListener('scroll', (e) => {
        e.stopPropagation();
        preview.scrollLeft = editor.scrollLeft;
      });
      setTimeout(() => {
        this.$nextTick(() => {
          preview.scrollLeft = 1;
          editor.scrollLeft = 1;
        })
      }, 500)
    },
    components: {
      "v-returnHome": returnHome
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      goSearch() {
        this.$router.push({path: "/searchInner", query: {MathTime: global.timestamp}});
      },
      waringBin() {
        this.$router.push({path: "/searchInner", query: {MathTime: global.timestamp}});
      },
      /* 以 亿 为单位 */
      yiUnit(str) {
        console.log('万亿', str);
        if (!isNaN(str) && str.length < 12 && str.length >= 8) {
          var x = (str / 10000).toFixed(2);
          var y = x.toString().split('.');
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          console.log(y.join(".") + '万');
          return y.join(".") + '万';
        } else if (str.length >= 12 && !isNaN(str)) {
          var x = (str / 100000000).toFixed(2);
          var y = x.toString().split('.');
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          console.log(y.join(".") + '亿');
          return y.join(".") + '亿';

        } else if (str.length < 8 || isNaN(str)) {
          console.log(str);
          return str

        }

      },
      //小数点后保留两位 没有两位填0
      toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      /* 自适应 */
      unitWan(str) {
        str = this.toDecimal2(str.toString());
        //console.log(str.length, this.toDecimal2(str));
        if (str.length < 10 && str.length >= 5 && !isNaN(str)) {
          //console.log(1);
          var x = (str / 10000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return (y.join(".") + '万');
        } else if (str.length >= 10 && !isNaN(str)) {
          //console.log(2);
          var x = (str / 100000000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return (y.join(".") + '亿');
        } else if (str.length < 8 || isNaN(str)) {
          //console.log(3);
          return (str)
        } else {
          //console.log(4);
        }
      },
      powerInputFocus(ele) {
        var elt = ele.currentTarget;
        $(elt).removeClass("backImg");
        $(elt).css({"padding-left": "10px"});
        this.powerShow = false
        this.displayShow = true;
        if (this.inputVal.trim().length == 0) {
          this.unitCode = [];
        } else {

        }
      },
      powerInputBlur(ele) {
        var elt = ele.currentTarget;
        $(elt).addClass("backImg");
        $(elt).css({"padding-left": "8%"});
        if (this.inputVal.trim().length == 0) {
          this.powerShow = true
          this.displayShow = false;
        } else {
          this.powerShow = false;
          this.displayShow = true;
        }
      },
      /*搜索股票*/
      checkIsAttend() {
        if (this.inputVal.trim().length == 0) {
          this.unitCode = [];
        } else {
          this.$http({
            method: 'GET',
            url: this.$api.host + "permission/checkIsAttend",
            params: {
              key: this.inputVal,
            }
          }).then((res) => {
            //console.log("getPermissionInsideList==>", res);
            if (res.data.returnCode == 1) {
              console.log("", res);
              this.unitCode = res.data.returnObject;
            } else if (res.data.returnCode == -1) {
            } else {
            }
          }).catch((err) => {
            console.log(err)
            this.$toast({message: err.message, position: 'middle', duration: 1500});
          })
        }
      },
      /*获取*/
      getPermissionInsideList() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "permission/getPermissionInsideList",
          params: {}
        }).then((res) => {
          //console.log("getPermissionInsideList==>", res);
          if (res.data.returnCode == 1) {
            this.scrollShow = true;
            this.listScroll = res.data.returnObject;
            var unitssStr = [];
            for (var i = 0; i < this.listScroll.length; i++) {
              unitssStr.push({
                code: this.listScroll[i].code,
                name: this.listScroll[i].name,
                stockMarket: this.listScroll[i].stockMarket,
              });
            }
            //console.log("this.unitss", unitssStr, "weqwe");
            this.CodeName = unitssStr;
            let preview = document.querySelector('#toScrollHead');
            let editor = document.querySelector('#toScroll');
            setTimeout(() => {
              this.$nextTick(() => {
                preview.scrollLeft = 1;
                editor.scrollLeft = 1;
              })
            }, 300)
          } else if (res.data.returnCode == -1) {
            this.searchWaring = true
          } else {

          }
          var u = navigator.userAgent, app = navigator.appVersion;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          //console.log('是否是iOS：', isiOS, '是否是Android：', isAndroid);
          if (isAndroid == true) {
            $(".line:last-child").css({"width": "100%", "height": "1px", "background": "red", "display": "block"})
          }

        }).catch((err) => {
          console.log(err)
            this.$toast({message: err.message, position: 'middle', duration: 1500});
        })
      },
      GoTable(index) {
        //console.log("GoTable", index, this.listScroll.length);
        this.$router.push({
          path: '/internalTables',
          query: {numberVal: this.listScroll.length, index: index, MathTime: global.timestamp}
        });
      }
    },
  }
</script>

<style>

</style>

<style scoped>
    /* 分页 */
    .content-Box {
        width: 100%;
        height: 78%;
        overflow: scroll;
        /*padding-bottom: 51px;*/
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
    /**/

    #searchPower .headSearch {
        height: 50px;
        background-color: #f0f1f5;
        padding: 0 12px;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        /*box-sizing: border-box;*/
    }
    #searchPower .icon-tripsousuo {
        font-size: 18px;
    }
    #searchPower .headSearch div {
        height: 35px;
        background-color: white;
        padding-left: 10px;
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
    #searchPower .headSearch div img {
        height: 15px;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
    #searchPower {

    }
    #searchPower .powerTitles {
        width: 100%;
        height: 40px;
        background-color: rgba(255, 177, 72, 0.2);
        line-height: 40px;
        font-size: 15px;
    }
    #searchPower .powerTitles > div {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-size: 0;
        position: relative;
    }
    #searchPower .powerTitles .powerTitlesOne {
        width: 33%;
        display: inline-block;
        height: 40px;
        font-size: 15px;
        float: left;
        padding-left: 12px;
        box-sizing: border-box;
        color: #ffb148;

    }
    #searchPower .powerTitles .powerTitlesTwo {
        display: inline-block;
        width: 60%;
        height: 40px;
        font-size: 15px;
        float: left;
    }
    #searchPower .powerTitlesTwo div {
        display: block;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        /*-webkit-overflow-scrolling: touch;*/
    }
    #searchPower .powerTitlesTwo li {
        width: 50%;
        height: 40px;
        display: inline-block;
        text-align: right;
        box-sizing: border-box;
        padding-right: 12px;
    }
    ul, ol, li {
        list-style: none;
    }
    #searchPower .powerContent {
        box-sizing: border-box;
        width: 100%;
        font-size: 0;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    #searchPower .powerContentName {
        display: block;
        width: 33%;
        float: left;
    }
    #searchPower .powerContentTitle {
        width: 60%;
        position: absolute;
        left: 33%;
        top: 0;
        height: auto;
        /*position: relative;*/
        /* box-sizing: border-box;*/
    }
    #searchPower .powerDataTypeCont {
        box-sizing: border-box;
        height: 60px;
        position: relative;
    }
    /*#searchPower .powerDataTypeContList {
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    }*/
    #searchPower .powerFoo {
        display: inline-block;
        width: 7%;
        float: left;
        /* position: relative;*/
        box-sizing: border-box;
    }
    #searchPower .powerStock {
        display: block;
        white-space: normal;
    }
    #searchPower .showSH {
        /**/
        height: 11px;
        margin-right: 2px;

    }
    #searchPower .showSZ {
        height: 11px;
        margin-right: 2px;

    }
    #searchPower .powerDataSHSZ {
        position: relative;
        top: -1px;
    }
    #searchPower .powerDataType {
        display: block;
        white-space: nowrap;
        overflow-x: auto;
        /*overflow-y: hidden;*/
        /* -webkit-overflow-scrolling: auto;*/
        box-sizing: border-box;
    }
    #searchPower .powerDataType::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        background-color: #000000;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    #searchPower .powerDataTypeNext {
        position: absolute;
        left: 31%;
        top: 15px;
        width: 9px;
        height: 9px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY4QjIxQkQ3ODYzMTExRTdBMkE5RDNEQkM4OURBNkJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY4QjIxQkQ4ODYzMTExRTdBMkE5RDNEQkM4OURBNkJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjhCMjFCRDU4NjMxMTFFN0EyQTlEM0RCQzg5REE2QkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjhCMjFCRDY4NjMxMTFFN0EyQTlEM0RCQzg5REE2QkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7puWjyAAABaklEQVR42pyUuUrEUBiFjaZQ3AYUwcLdxkpIxAWxE0YsFEQfQ1CwELXQQsTCQtDGZxiZQiwUrEZkXGLh8gC+grUQv8iJXJjl3pmBw8n9bz7Of/9M4sVx3FDPz68VCMMwg7X7dYS9oV6/xrQC1ufcKkATVkQTKm24JkZoXNebURSdetWmSpKHPaBplfaBDlxafTLa2wE6SjcqJpJ2j81quQV0Yu6XgABJFwWjvXWgM5c/QJI0lU6vHFSSSNojNqnlHtBhpcP/g0DJ9GZU3wY6rjY1LwiCbvxaST9q79z2YBtR3mjvwgVKwV30rfUyLWddwL8zcvMI1y8oo/oKyXkrqOEMYB+oTXurwJdWUPCo3rcWlRaAb6yg4DHsGbWqNA98ZwWN5OTMnSplgW+toOB+7B11qLQEfGUFBQ9hr8a014BzVlDwMPaJms22PZfvqgZWNNpe9Fw/yMCDGliXU6tlBvZVMyh4Duv5FWAA0rCcY7hzySIAAAAASUVORK5CYII=");
        background-repeat: no-repeat;
        background-size: contain;
    }
    #searchPower .powerDataTypePrev {
        position: absolute;
        top: 15px;
        right: 2%;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ0OUIzRkZDODYzNTExRTc4QjA2RkNDNENBMTg3Nzc3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ0OUIzRkZEODYzNTExRTc4QjA2RkNDNENBMTg3Nzc3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDQ5QjNGRkE4NjM1MTFFNzhCMDZGQ0M0Q0ExODc3NzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDQ5QjNGRkI4NjM1MTFFNzhCMDZGQ0M0Q0ExODc3NzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4tWYd0AAABQ0lEQVR42pzUzSsFURzGcSM7f4SFhf1MlKTExstCUjYsrNS1kFteSkReNldeSsLKwkpZWMjdkZIos7fwr2h8jx63cZP7jKkzz/lNfTr3N3fOibIsa/rP1RxuSZK0F4agEvlOnhVdcUzzGfCBC6PQI+CS+YSenaZpWrKg+rwlhlwc5d9qHd4Gr1lQ+JoYVVkBL1tQON/zHnjBgsJXxLjKE/CsBYWrxKDKI/CcBYVviBGVu+AlC/7S8yG4HLkfOfiCmFJ5HBXZHeA3oqO2O0wUemtT+dBioh1i5RvRY5/zVsOOmVd5Bxpw/sd9oqzyGdT94wT44+fVEKPH+VbXiQ2Vj6zU6+yOLWK1vqdG+7FCLKqsgoadEyCPXkGdzvG4mUMvjK6GZ04cx+fktOp7Vup3j8cPzZ9c9HWFHll1ktEa5u74FGAAXGjFR48833oAAAAASUVORK5CYII=");
        background-size: contain;
        background-repeat: no-repeat;
        width: 9px;
        height: 9px;
    }
    #searchPower .powerDataType ul {
        list-style-type: none;
    }
    #searchPower .powerDataType .powerDataTypeTitle li {
        width: 50%;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        display: inline-block;
        list-style-type: none;
        text-align: right;
        box-sizing: border-box;
    }
    #searchPower .powerDataType .powerDataTypeCont div {
        width: 50%;
        height: 60px;
        line-height: 60px;
        font-size: 15px;
        display: inline-block;
        text-align: right;
        box-sizing: border-box;
        border-bottom: 1px solid #e3e3e3;
        padding-right: 15px;
        /*z-index: 1000;*/
    }

    #searchPower .powerDataType .powerDataTypeCont .yearD {
        padding-right: 15px;
    }
    /**/
    #searchPower .powerStock ul {
        list-style-type: none;
    }
    #searchPower .powerStock .powerStockName {
        height: 60px;
        font-size: 15px;
        box-sizing: border-box;
        list-style-type: none;
        padding: 0 0 0 12px;
        background-color: white;
    }
    /*#searchPower .powerDataType > div:last-child .powerDataTypeCont > div{
        height: 60.5px;
    }*/
    #searchPower .powerStock .powerColor {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        box-sizing: border-box;
        list-style-type: none;
        padding-left: 12px;
    }
    #searchPower .powerStockName {
        border-bottom: 1px solid #e3e3e3;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
        position: relative;
    }
    #searchPower .powerStockTitle {
        padding-top: 12px;
        display: inline-block;
        word-break: keep-all;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        width: 98%;
        font-size: 15px;

    }
    #searchPower .powerStockCode {
        color: #aeaeae;
        font-size: 12px;
        display: inline-block;
        position: absolute;
        bottom: 8px;
        left: 12px;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    #searchPower .powerDataTypeTitle li {
        font-size: 15px;
        color: #ffb148;
    }
    #searchPower .powerDataTypeTitle {
        height: 40px;
    }
    #searchPower .powerColor {
        border-bottom: none;
    }
    /**/
    /*warning页面*/
    #focus-warning {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 1);
        z-index: 3000;
        overflow: hidden;
        text-align: center;
    }
    #focus-warning > .focus-waringImg {
        height: 110px;
        width: 118.25px;
        margin: 38.2% auto 0 auto;
        background-image: url("/static/img/personal/focus/toFocus.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #focus-warning .focus-waringText {
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        color: #ffb148;
        padding: 20px 0 0 0;
        text-align: center;
    }
    #focus-warning .focus-waringBtn {
        box-shadow: none;
        color: white;
        border: 0;
        width: 90px;
        margin-top: 20px;
        font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
        height: 30px;
        background: #ffb148;
    }
    /*#searchPower .showYearD{
        background-color: rgba(255, 0, 0, 1);
        display: inline-block;
        color: white;
        height: 22.5px;
        text-align: center;
        font-size: 15px;
        width: 60px;
        line-height: 22.5px;
        box-sizing: border-box;
        border-radius: 2px;
    }*/
</style>

