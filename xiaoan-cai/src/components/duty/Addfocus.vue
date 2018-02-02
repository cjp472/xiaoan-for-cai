<template>
  <div id="addfocus" class="addfocus">
    <div class="searchs">
      <div class="seabox">
        <form action="" onsubmit=" return false">
          <input ref="boxDom" type="search" class="text" :placeholder="placeholder" @focus="searchs"
                 id="searchCode"
                 @blur="searchBlur" v-model.trim="values" @input="AddFocsch" @keyup.13="AddFocsch">
          <img v-lazy="close" alt="" @click="closeInputVal" class="closeInputVal">
        </form>
      </div>
      <div class="icon" @click="AddFocsch"></div>
    </div>
    <div class="chooseall">
      <div class="choose">
        <div class="AddChoose choosegl">为您推荐：{{DefName}}</div>
        <span class="AddGlub">
                    <img :src="includes" class="includess" @click="includeS">
                </span>
      </div>
      <div class="addfocus-box" ref="addfocusbox" :style="{height:boxHeight+'px'}">
        <ul class="choosegle">
          <li v-for="(list,index) in remDefL">
            <div class="choose">
              <div class="AddChoose">{{list.name}} <span
                style="margin-left: 8px">{{list.code}}</span>
              </div>
              <span class="Addglfoc addfoc" :key="index">
                 <img v-show="list.status" :src="closefoc" class="focimg" @click="addfoc(index)">
                 <img v-show="!list.status" :src="foc" class="focimg" @click="addfoc(index)">
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!---->
    <div class="addsearch-box" ref="addsearchbox" :style="{height:boxsearchHeight+'px'}">
      <ul class="choosegle">
        <li v-for="(lists,index) in adds" :key="index">
          <div class="choose">
            <div class="AddChoose">
              {{lists.name}}<span style="margin-left: 8px" v-html="key(lists.code)"></span>
            </div>
            <span class="Addglfoc addfoc" :key="index">
                            <img v-show="lists.status" :src="closefoc" class="focimg" @click="addfoc(index)">
                            <img v-show="!lists.status" :src="foc" class="focimg" @click="addfoc(index)">
                        </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="Addshow">
      <img v-lazy="wingl" alt="" class="addshowImg">
      <div>搜索不到相关内容！</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addfocus',
    data() {
      return {
        wingl: '../../static/img/rules/trySenior.png',
        close: '../../static/img/personal/collect/close.png',
        show: '你还未完善信息',
        placeholder: "搜索证券简称/代码/拼音缩写",
        search: '../../static/img/personal/focus/search.png',
        closefoc: '../../static/img/personal/focus/closefoc.png',
        foc: '../../static/img/personal/focus/foc.png',
        includes: '../../static/img/personal/focus/include.png',
        offIncludes: '../../static/img/personal/focus/offInclude.png',
        adds: [],
        remDefL: [],
        DefName: '',
        number: '',
        top: 1,
        bottom: 20,
        values: '',
        counts: 0,
        user_id: '',
        companyIds: [],
        searchStatus: true,
        focusStatus: true,
        type: "",
        companyids: "",
        boxHeight: '',
        boxsearchHeight: ''
      }
    },
    updated() {
      this.$nextTick(() => {
        this.boxsearchHeight = document.body.clientHeight - this.$refs.addsearchbox.offsetTop
      })
    },
    created() {
      let user_id = this.$cookie.getCookie("userId");
      this.user_id = user_id;
      console.log('user_id', user_id, 'this.user_id', this.user_id);
      this.infinite();
    },
    mounted() {
      this.$nextTick(() => {
        this.boxHeight = document.body.clientHeight - this.$refs.addfocusbox.offsetTop;
      })
    },
    beforeDestroy() {
      // 离开页面销毁focus事件
      this.$refs.boxDom.blur();
      this.$indicator.close();
    },
    methods: {
      //关键字高亮
      key(str) {
        var star = [];
        star = this.values.trim().split(" ");
        for (var i = 0; i < star.length; i++) {
          if (star[i] == "" || typeof(star[i]) == "undefined") {
            star.splice(i, 1);
            i = i - 1;
          }
        }
        for (var i = 0; i < star.length; i++) {
          var fen = str.split(star[i]);
          str = fen.join('<span style="color:#ffc051;">' + star[i] + '</span>');
          if (/android/i.test(navigator.userAgent)) { //  android
            str = fen.join('<span style="color:#ffc051;">' + star[i] + '</span>');
          }
        }
        return str;
      },
      /**/
      //小按钮
      closeInputVal() {
        if (this.values.length != 0) {
          this.values = '';
          document.querySelector('.closeInputVal').style.display = 'none';
          document.querySelector('.text').focus();
        } else {
          this.adds = [];
          /*$('.Addshow').show();*/
        }
      },
      //提示关闭‘加载中’
      openIndicatorWithText() {
        console.log("未搜索到相关公司")
        this.$toast({message: '未搜索到相关公司', position: 'top', duration: 1500});
        this.values = '';
        $(".loading-layer").hide();
        $(".chooseall").show();
        /*this.$indicator.open('加载中...');*/
      },
      //推荐股票代码
      infinite() {
        this.$http({
          methods: "GET",
          url: this.$api.host + "attention/getIndustry", /*http://192.168.52.80:8080/v1/*/
          params: {
            userId: this.user_id,
            pageSize: this.bottom,
            pageIndex: this.top,
          }
        }).then((res) => {
          console.log("123123213", res)
          var idarr = [];
          for (var i in res.data.returnObject.data) {
            /*this.companyids*/
            idarr.push(res.data.returnObject.data[i].code)
          }
          console.log('idarr', idarr)
          this.companyids = idarr.join(',')
          this.type = res.data.returnObject.type;
          if (res.data.returnCode == -1) {
            this.DefName = this.show;
            return
          } else if (res.data.returnCode == 1) {
            console.log("滚动加载" + ".......")
            if (res.data.returnObject.type == "1") {
              this.DefName = '沪深涨幅前十';
            } else if (res.data.returnObject.type == "0") {
              this.DefName = res.data.returnObject.industry;
            }
            /**/
            this.remDefL = res.data.returnObject.data;
            this.adds = this.remDefL;
            this.number = res.data.returnObject.totalCount;
          }
        }).catch((err) => {
          this.$toast({message: '网络异常', position: 'middle', duration: 1000});
        })
      },
      includeS() {
        this.$http({
          methods: "GET",
          url: this.$api.host + "attention/oneKeyAttention", /*http://192.168.52.97:8080/v1/*/
          params: {
            userId: this.user_id,
            pageSize: this.bottom,
            pageIndex: this.top,
            type: this.type,
            companyIds: this.companyids,
          }
        }).then((res) => {
          console.log(res.data.returnCode);
          if (res.data.returnCode == 1 || this.focusStatus == true) {
            document.querySelector('.includess').src = this.offIncludes;  //变为 取消所有
            this.$toast({message: '一键关注成功', position: 'middle', duration: 1500});
            this.counts++;
            this.infinite();
            console.log('一键关注成功', res.data.returnCode)
            this.focusStatus = false;
            console.log('关注成功后的focusStatus', this.focusStatus)

          } else if (res.data.returnCode == 2 || this.focusStatus == false) {      //取消关注所有
            //console.log('>>>---<<<', res.data.returnCode, '关注成功后的focusStatus', this.focusStatus)
            for (var i in this.adds) {
              this.companyIds.push(this.adds[i].code)
            }
            var str = this.companyIds.join(',');
            this.$http({
              methods: "GET",
              url: this.$api.host + "attention/oneKeyCancel", /*http://192.168.52.80:8080/v1/*/
              params: {
                userId: this.user_id,
                companyIds: str
              }
            }).then((res) => {
              if (res.data.returnCode == 1) {
                this.$toast({message: '取消关注成功', position: 'middle', duration: 1500});
                document.querySelector('.includess').src = this.includes;  //变为 关注所有
                $(".includess").attr('src', this.includes)
                this.infinite();
                this.focusStatus = true;
              }
            }).catch((err) => {
              console.log(err)
              this.$toast({message: '网络异常', position: 'middle', duration: 1500});
            })
          } else {
            this.$toast({message: '网络异常', position: 'middle', duration: 1500});
          }
        }).catch((err) => {
          console.log(err + "一键关注所有");
        })
      },
      searchInput() {
        if (this.values.length == 0) {
          document.querySelector('.closeInputVal').style.display = 'none';
        } else if (this.values.length != 0) {
          document.querySelector('.closeInputVal').style.display = 'block';
        }
      },
      // input 失焦
      searchBlur() {
        if (this.values.trim().length == 0) {
          this.adds = [];
          $('.Addshow').show();
        }
        this.placeholder = '搜索股票代码/简称/拼音缩写';
        var that = this;
        $("#searchCode").on('keypress', function (e) {
          var keycode = e.keyCode;
          var searchName = $(this).val();
          if (keycode == '13') {
            e.preventDefault();
            //请求搜索接口
            that.AddFocsch();
          }
        });

      },
      // input 聚焦   /*placeholder='搜索股票代码/简称/拼音缩写'*/
      searchs() {
        document.querySelector('.chooseall').style.display = 'none';
        /*document.querySelector('.choosegleoll').style.display = 'block';*/
        var that = this;
        $("#searchCode").on('keypress', function (e) {
          var keycode = e.keyCode;
          var searchName = $(this).val();
          if (keycode == '13') {
            e.preventDefault();
            //请求搜索接口
            that.AddFocsch();
          }
        });
      },
      //
      andriodInput() {
        var user = "";
        var h = document.body.clientHeight;
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";
          window.onresize = function () {
            if (document.body.clientHeight < h) {
              $('body').height($('body')[0].clientHeight);
              /* $('.choosegleoll').css('padding-top', '10px');*/
            } else {
              /*$('.choosegleoll').css('padding-top', '2px');*/
            }
          };

        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0"
          /*alert(user)*/
        }
      },
      // 点击提交搜索按钮
      AddFocsch() {
        this.searchInput();
        this.searchStatus = false;
        if (this.values.length !== 0) {
          $('.Addshow').hide();
          this.$http({
            methods: "GET",
            url: this.$api.host + "attention/searchStock", /*http://192.168.52.80:8080/v1/*/
            params: {
              searchStr: this.values.trim(),
              userId: this.user_id
            }
          }).then((res) => {
            if (res.data.returnCode == 1) {
              this.adds = res.data.returnObject;
              var arr = [];
              for (var i in $(".AddChoose")) {
                var text = $(".AddChoose").eq(i).text();
                if (text.indexOf(this.values) > 0) {
                  text = text.replace(/this.values/g, "<span style='color:red'>" + this.values + "</span>");
                }
              }
              if (this.adds.length == 0) {
                document.querySelector('._cloo').style.display = 'none';
                document.querySelector('._def').style.display = 'block';
                this.openIndicatorWithText();
              }
            } else if (res.data.returnCode == -1) {
              this.adds = [];
              $('.Addshow').show();
            } else {
              this.openIndicatorWithText();
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.adds = [];
          /*this.$toast({message: '不能为空', position: 'top', duration: 1500});*/
        }
      },
      // *根据用户填的股票代码的到他的行业分类在以此来推荐*/
      addAttention(index) {
        this.$http({
          methods: "GET",
          url: this.$api.host + "attention/addAttention", /*http://192.168.52.80:8080/v1/*/
          params: {
            companyId: this.adds[index].code,
            companyFullCode: this.adds[index].fullCode,
            userId: this.user_id
          }
        }).then((res) => {
          if (res.data.returnCode == 1) {
            this.$toast({message: '关注成功', position: 'middle', duration: 1500});
            $('.focimg')[index].src = this.closefoc;
            $(".choosegle").find('img').eq(index).attr('src', this.closefoc)
            if (this.searchStatus == true) {
              this.infinite();
            } else if (this.searchStatus == false) {
              this.AddFocsch();
            }
          }
        }).catch((err) => {
        });
      },
      //
      deleteAttention(index) {
        this.$http({
          methods: "GET",
          url: this.$api.host + "attention/deleteAttention", /*http://192.168.52.80:8080/v1/*/
          params: {
            companyId: this.adds[index].code,
            companyFullCode: this.adds[index].fullCode,
            userId: this.user_id
          }
        }).then((res) => {
          this.$toast({message: '取消关注', position: 'middle', duration: 1500});
          $('.focimg')[index].src = this.foc;

          $(".choosegle").find('img').eq(index).attr('src', this.foc);

          if (this.searchStatus == true) {
            this.infinite();
          } else if (this.searchStatus == false) {
            this.AddFocsch();
          }
        }).catch((err) => {
          this.$toast({message: '网络异常', position: 'middle', duration: 1500});
        });
      },
      //
      addfoc(index) {
        if (this.adds[index].status == false) {
          //
          this.addAttention(index);
        } else if (this.adds[index].status == true) {
          //
          this.deleteAttention(index);
        }
      }
    }
  }
</script>

<style>
  #addfocus ._v-container > ._v-content > .loading-layer {
    display: none !important;
  }
</style>
<style lang="scss" scoped>
  .addfocus {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .searchs {
      width: 100%;
      height: 50px;
      background: #f0f1f5;
      padding: 7.5px 12px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 500;
      .seabox {
        width: 91%;
        height: 100%;
        position: relative;
        form {
          height: 100%;
          width: 100%;
          input.text {
            font-size: 15px;
            font-family: PingFangSC-Light, sans-serif;
            width: 100%;
            height: 100%;
            background: #fff;
            color: #323232;
            display: inline-block;
            box-sizing: border-box;
            -webkit-appearance: none;
            border-radius: 2px;
            border: 0;
            padding: 8px;
            -webkit-box-sizing: border-box;
            outline: none;
          }
          input.text::-webkit-search-cancel-button {
            display: none;
            opacity: 0;
          }

          .closeInputVal {
            position: absolute;
            top: 28%;
            right: 8px;
            height: 16px;
            display: none;
          }
        }
      }
      .icon {
        width: 26px;
        height: 26px;
        display: inline-block;
        background-image: url("/static/img/personal/search@3x.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
    .chooseall {
      .choose {
        height: 50px;
        border: none;
        padding-left: 12px;
        padding-right: 12px;
        border-bottom: 0.5px solid #e3e3e3;
        overflow: hidden;
        color: #323232;
        position: relative;
        z-index: 500;
        background-color: white;
        box-sizing: border-box;
        .AddChoose {
          display: inline-block;
          line-height: 50px;
          color: #323232;
          font-size: 15px;
          font-weight: 600;
        }
        .choosegl {
          width: 77%;
          height: 100%;
          overflow: hidden;
          font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
          font-size: 15px;
          color: #323232;
          float: left;
        }
        .AddGlub {
          float: left;
          height: 50px;
          width: 23%;
          vertical-align: middle;
          box-sizing: border-box;
          justify-content: center;
          img.includess {
            height: 24px;
            vertical-align: middle;
            float: right;
            margin: 13px 0 13px 13px;
          }
        }
      }
      .addfocus-box {
        position: relative;
        width: 100%;
        .choosegle {
          overflow-y: scroll;
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
      }
    }
    .addsearch-box {
      position: relative;
      width: 100%;
      .choosegle {
        overflow-y: scroll;
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;
        .choose {
          height: 50px;
          border: none;
          padding-left: 12px;
          padding-right: 12px;
          border-bottom: 0.5px solid #e3e3e3;
          overflow: hidden;
          color: #323232;
          position: relative;
          z-index: 500;
          background-color: white;
          .AddChoose {
            display: inline-block;
            line-height: 50px;
            color: #323232;
            font-size: 15px;
            font-weight: 600;
          }
          .choosegl {
            width: 77%;
            height: 100%;
            overflow: hidden;
            font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
            font-size: 15px;
            color: #323232;
            float: left;
          }
          .AddGlub {
            float: left;
            height: 50px;
            width: 23%;
            vertical-align: middle;
            box-sizing: border-box;
            justify-content: center;
            img.includess {
              height: 24px;
              vertical-align: middle;
              float: right;
              margin: 13px 0 13px 13px;
            }
          }
        }
      }
    }
  }
</style>

<style scoped>
  #addfocus .Addshow {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    display: none;
  }
  #addfocus .Addshow div {
    text-align: center;
    color: #ffb148;
    padding-top: 15px;
    font-size: 15px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
  }
  #addfocus .Addshow img {
    width: 110px;
    display: block;
    height: 95px;
    margin: auto;
    padding-top: 45%;
  }
  .AddChoose span {
    color: #a2a2a2;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    font-weight: normal;
  }
  .Addglfoc {
    float: right;
    vertical-align: middle;
    margin: 12px 0 12px 12px;
  }
  .addfoc img {
    width: auto;
    height: 24px;
  }

</style>
