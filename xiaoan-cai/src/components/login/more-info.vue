<template>
  <div class="cont" id="moreInfo">
    <div class="box">
      <div class="baseinfo">
        <div class="nickname">
          <span>昵&emsp;称<i>*</i></span>
          <input type="text" v-model="nickname" @input="nick" placeholder="默认微信名">
          <b @click="()=>{this.nickname='';this.isnickname=false;}" v-show="this.nickname.length>0"
             class="bbb"></b>
        </div>
        <div class="username">
                    <span>
                        姓&emsp;名
                        <i>*</i>
                    </span>
          <input type="text" placeholder="请输入真实姓名" id="username" @input="user" v-model="realname">
          <!--<b @click="()=>{this.realname=''}" v-show="this.realname.length>0">&times;</b>-->
          <b @click="()=>{this.realname='';this.isusername=false;}" v-show="this.realname.length>0"
             class="bbb1"></b>
        </div>
        <p class="userErr must" v-show="!username"><!--v-show="username.length>0 && username.length<20"-->
          请输入真实姓名
        </p>
        <div class="email">
                    <span>
                        邮&emsp;箱
                        <i style="opacity: 0">*</i>
                    </span>
          <input type="email" placeholder="请输入工作邮箱" id="email" @input="regEmail" v-model="emailAddress">
          <!--<b @click="()=>{this.emailAddress=''}" v-show="this.emailAddress.length>0">&times;</b>-->
          <b @click="()=>{this.emailAddress=''}" v-show="this.emailAddress.length>0" class="bbb2"></b>
        </div>
        <p class="emailErr" v-show="!email && this.emailAddress.length>0">
          邮箱格式错误
        </p>
      </div>
      <hr>
      <div class="company">
        <div class="company-sort">
                    <span>
                        公司类型
                        <i>*</i>
                    </span>
          <div class="sortbox">
            <select id="company-1" @change="getValue">
              <option value="">请选择</option>
              <option :value="item.attr" v-model="sortCompany" v-for="item in companysortList">{{
                item.attr }}
              </option>
            </select>
            <select id="company-2" @change="getValue2" v-model="selected2">
              <option value="">请选择</option>
              <option :value="item.attr" v-if="companysort=='上市公司'" v-for="item in companyList">
                {{ item.attr }}
              </option>
              <option :value="item1.attr" v-if="companysort=='其他机构及个人'" v-for="item1 in otherList">
                {{ item1.attr }}
              </option>
              <option :value="item2.attr" v-if="companysort=='非上市公司'" v-for="item2 in nonList">
                {{ item2.attr }}
              </option>
            </select>
          </div>

        </div>
        <p class="sortErr must"
           v-show="this.comSort && this.companysort.length==0 && this.companysort2.length==0">
          请输入公司类型
        </p>
        <div class="ccode" v-show="codeShow">
          <div class="company-code">
            <span>公司代码<i>*</i></span>
            <input type="text" placeholder="请输入公司代码" id="companyCode" @change="codeReg" v-model="comCode">
            <!--<b @click="()=>{this.comCode=''}" v-show="this.comCode.length>0">&times;</b>-->
            <b @click="()=>{this.comCode='';this.code=false}" v-show="this.comCode.length>0"
               class="bbb3"></b>
          </div>
          <p class="codeErr must" v-show="!code">请输入正确的公司代码</p>
        </div>
        <div class="company-all">
          <span>公司名称<i>*</i></span>
          <input type="text" placeholder="请输入公司全称" id="fullname" @input="isFull" v-model="allname">
          <!--<b @click="()=>{this.allname=''}" v-show="this.allname.length>0">&times;</b>-->
          <b @click="()=>{this.allname='';this.fullname=false}" v-show="this.allname.length>0"
             class="bbb4"></b>
        </div>
        <p class="fullErr must" v-show="!fullname">请输入正确的公司名称</p>
      </div>
      <hr>
      <div class="address">
        <div class="position">
          <span>职&emsp;位<i style="opacity: 0">*</i></span>
          <div class="jobsort">
            <select @change="getJobname" id="getJob">
              <option value="">请选择</option>
              <option :value="item.job" v-for="item in jobList">{{ item.job }}</option>
            </select>
          </div>
        </div>
        <div class="company-address">
          <span>公司地址<i style="opacity: 0">*</i></span>
          <div class="areabox">
            <select class="pro" v-model="pid" @change="prochange()">
              <option :value="v.id" v-for="v in pro">{{v.name}}</option>
            </select>
            <select class="city" v-model="cid" @change="citychange()">
              <option :value="v.id" v-for="v in city">{{v.name}}</option>
            </select>
            <template v-if="county.length>0">
              <select class="county" v-model="ccid" @change="districtChange()">
                <option :value="v.id" v-for="v in county">{{v.name}}</option>
              </select>
            </template>
          </div>
        </div>
        <textarea class="textarea" placeholder="请收入公司详细地址" v-model="fullAdress"></textarea>
      </div>
    </div>
    <div class="complete" v-if="codeShow"
         :class="{pass:username && realname.length>0 && code && comCode.length>0 && fullname && allname.length>0 && comSort && email}"
         @click="complete()">
      完成注册
    </div>
    <div class="complete" v-else-if="!codeShow"
         :class="{pass:username && realname.length>0 && fullname && allname.length>0 && comSort && email}"
         @click="complete()">
      完成注册
    </div>
  </div>
</template>

<script>
  import area_data from '../../assets/area_data.js'

  export default {
    name: "more-info",
    data() {
      return {
        sortCompany: "",
        selected2: "",
        all: area_data,
        pro: "",
        city: "",
        county: "",
        pid: "",
        cid: "",
        ccid: "",
        nickname: "",
        realname: "",
        emailAddress: "",
        companysort: "",
        companysort2: "",
        comCode: "", //公司代码
        allname: "", //公司全称
        jobname: "",
        province: "",
        selectcity: "",
        district: "",
        fullAdress: "",
        fullname: true,
        code: true,
        username: true,
        email: true,
        codeShow: true,
        comSort: false,
        fromUserIds: "",
        companysortList: [
          {
            attr: "上市公司"
          }, {
            attr: "其他机构及个人"
          }, {
            attr: "非上市公司"
          }
        ],
        companyList: [
          {attr: "沪市主板"},
          {attr: "深市主板"},
          {attr: "深市中小板"},
          {attr: "深市创业板"},
          {attr: "新三板"}],
        otherList: [
          {attr: "监管机构"},
          {attr: "研究机构"},
          {attr: "个人"},
          {attr: "其他"}
        ],
        nonList: [
          {attr: "拟上市公司"},
          {attr: "会计师事务所"},
          {attr: "证券公司"},
          {attr: "律师事务所"},
          {attr: "其他"}
        ],
        jobList: [
          {job: "董秘"},
          {job: "证代"},
          {job: "其他"}
        ]
      }
    },
    created: function () {
      this.pro = this.all.pro;
      this.pid = this.pro[0]['id'];
      this.prochange();
    },
    updated() {

    },
    mounted() {
      function getCookie(cookieName) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
          var arr = arrCookie[i].split("=");
          if (cookieName == arr[0]) {
            return arr[1];
          }
        }
        return "";
      }

      var user_id = getCookie("userId");
      //console.log(user_id)
      /**/
      /*var hei = document.querySelector('#moreInfo').clientHeight;
      var hgt = document.querySelector('.complete').clientHeight;
      var scroll = (hei - hgt) + "px";
      console.log( hei,hgt, scroll);
      $('.box').css('height', scroll);*/
      /**/
      this.$http({
        method: "GET",
        url: this.$api.host + "userHome",
        params: {}
      }).then((res) => {
          console.log(res.data.returnObject);
          let info = res.data.returnObject;
          console.log(info.companyName);
          this.allname = info.companyName;
          this.nickname = info.weixinNickname;
        }
      ).catch((err) => {
        console.error(err);
      });
      /**/
      this.$http.get(this.$api.host + 'getWxInfo').then((res) => {
        console.log("getWxInfo", res);
        this.nickname = res.data.returnObject.weixinNickname;
      }).catch((err) => {
        console.error(err);
      })
      /**/

      this.$nextTick(function () {
        this.pid = '0';
        this.cid = '001';
        this.ccid = '0001';
        this.prochange(this.cid, this.ccid);
        this.machine();
      });
      //**/
      /*var hei = document.body.clientHeight;
      var hgt = $('.complete').height();
      var scroll = (hei - hgt) + "px";
      console.log(hgt, hei, scroll);
      $('.box').css('height', scroll);*/
    },
    methods: {
      machine: function () {
        var user = "";
        var h = document.body.scrollHeight;
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";
          $("input").css('padding', '10px 5px')
          window.onresize = function () {
            if (document.body.scrollHeight < h) {
              $('.complete').hide();
            } else {
              $('.complete').show();
            }
            $(".sortbox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
            $(".jobsort>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
            $(".areabox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          };
        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0"
          /*alert(user)*/
          $(".sortbox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".jobsort>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".areabox>select").css({color: '#323232', fontFamily: " PingFangSC-Light, sans-serif"})
          $(".sortbox").css({padding: '10px 5px 10px 5px'})
          $(".jobsort").css({padding: '10px 5px 10px 0px'})
          $(".areabox").css({padding: '10px 5px 10px 5px'})
          $('input').css({'padding': '8px 8px 8px 5px', 'color': "#323232"})
          $("select").css({'padding-right': "17px", "margin-top": '0px', 'line-height': '18px'})
        }
      }
      ,
      prochange: function () {
        this.city = this.all.city[this.pid];
        this.cid = this.city[0]['id'];
        console.log(this.city)
        this.county = this.all.county[this.cid];
        if (this.county.length > 0) {
          this.ccid = this.county[0]['id'];
        }
        this.province = $(".pro option:selected").text();
        this.$nextTick(() => {
          this.citychange();
          console.log(this.pid, this.province)
        });
      }
      ,
      citychange: function () {
        this.county = this.all.county[this.cid];
        if (this.county.length > 0) {
          this.ccid = this.county[0]['id'];
        }
        this.selectcity = $(".city option:selected").text();
        this.$nextTick(() => {
          this.districtChange();
          console.log(this.cid, this.selectcity)
        })
      }
      ,
      districtChange() {
        this.district = $(".county option:selected").text();
        console.log(this.ccid, this.district)
      }
      ,
      nick() {
        let value = this.nickname;
        this.nickname = value;
        console.log("微信昵称" + this.nickname)
      }
      ,
      user() {
        let content = $("#username").val();
        let sum = content.length;
        if (sum > 0 && sum < 20) {
//                    console.log("不显示")
          this.username = true;
        } else {
          this.username = false;
        }
      }
      ,
      regEmail() {
        let emailtext = $("#email").val();
        console.log(emailtext);
        let regExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        this.email = regExp.test(emailtext);
        /*console.log(this.email)*/
      }
      ,
      isFull() {
        let text = $("#fullname").val();
        let textLength = text.length;
        console.log(textLength)
        if (textLength > 0 && textLength < 50) {
          console.log("hide")
          this.fullname = true;
        } else {
          this.fullname = false;
        }
      }
      ,
      codeReg() {
        let codetext = $("#companyCode").val();
        let regExp = /^[0-9]{6}$/;
        this.code = regExp.test(codetext);
        console.log(this.comCode);
        if (this.comCode.length !== 0 && this.code) {
          this.$http({
            method: "GET",
            url: this.$api.host + "getStockCode",
            params: {
              companyCode: this.comCode
            }
          }).then((res) => {
            if (res.data.returnCode == 1) {
              console.log("查询成功！");
              this.allname = res.data.returnObject;
            }
          }).catch((err) => {
            console.error(err);
          })
        }
      }
      ,
      getValue() {
        let options = $("#company-1 option:selected");
        let optionTxt = options.val();
        this.companysort = optionTxt;
        console.log('公司类型：' + this.companysort)
        if (this.companysort == "上市公司") {
          this.codeShow = true;
        } else {
          this.codeShow = false;
        }
      }
      ,
      getValue2() {
        let options = $("#company-2 option:selected");
        let optionTxt = options.val();
        this.compangysort2 = optionTxt;
        if (this.compangysort2.length > 0) {
          this.comSort = true;
          console.log("entry")
        }
        console.log(this.compangysort2);
      }
      ,
      getJobname() {
        let options = $("#getJob option:selected");
        let optionTxt = options.val();
        this.jobname = optionTxt;
        console.log(this.jobname);
      }
      ,
      complete() {
        var modelArr = [this.realname, this.allname, this.comCode, this.selected2];
        let must = $(".must");
        console.log(modelArr[1].length)
        //console.log(this.selected2.length)
        for (var i = 0; i < modelArr.length; i++) {
          if (modelArr[i].length == 0) {
            must.eq(i).show();
          } else {
            must.eq(i).hide();
          }
        }
        if (window.sessionStorage.getItem("fromUserId") === null) {
          this.fromUserIds = '';
        } else {
          this.fromUserIds = window.sessionStorage.getItem("fromUserId");
        }
        if (this.username && this.realname.length > 0 && this.code && this.comCode.length > 0 && this.fullname
          && this.allname.length > 0 && this.comSort && this.email) {
          this.$http({
            method: "POST",
            url: this.$api.host + "completePersonInfo",
            params: {
              userName: this.nickname,//昵称
              realName: this.realname,//用户名
              email: this.emailAddress,//邮箱
              position: this.jobname,//职位
              companyName: this.allname,//公司名
              companyProvince: this.province,//省份名称
              companyCity: this.selectcity,//城市名称
              companyTown: this.district,//地区名称
              companyStreet: this.fullAdress,//详细地址
              provinceId: this.pid,//省份ID
              cityId: this.cid,//城市ID
              areaId: this.ccid,//地区ID
              companyTypeOne: this.companysort,//公司类型1
              companyTypeTwo: this.compangysort2,//公司类型2
              companyCode: this.comCode,//股票代码
              fromUserId: this.fromUserIds
            }
          }).then((res) => {
            console.log(res);
            if (res.data.returnCode == 1) {
              console.log("返回值为1");
              this.$router.push({path: '/loadPass'});
              /*todo
              *
              * */
              /*MtaH5.clickShare('dongminenglicep-1', {reginfo: true});*/
              this.$MTAmethod.mtaShare('dongminenglicep-1', {reginfo: true})
              /**/
              window.sessionStorage.setItem("register", true);
            } else {
              alert(res.data.returnMsg)
            }
          }).catch((err) => {
            console.error(err);
          })

        } else if (this.username && this.realname.length > 0 && this.fullname
          && this.allname.length > 0 && this.comSort && this.email) {
          //alert("非上市公司")
          this.$http({
            method: "POST",
            url: this.$api.host + "completePersonInfo",
            params: {
              userName: this.nickname,//昵称
              realName: this.realname,//用户名
              email: this.emailAddress,//邮箱
              position: this.jobname,//职位
              companyName: this.allname,//公司名
              companyProvince: this.province,//省份名称
              companyCity: this.selectcity,//城市名称
              companyTown: this.district,//地区名称
              companyStreet: this.fullAdress,//详细地址
              provinceId: this.pid,//省份ID
              cityId: this.cid,//城市ID
              areaId: this.ccid,//地区ID
              companyTypeOne: this.companysort,//公司类型1
              companyTypeTwo: this.compangysort2,//公司类型2
              companyCode: this.comCode,//股票代码
              fromUserId: this.fromUserIds//

            }
          }).then((res) => {
            console.log(res);
            if (res.data.returnCode == 1) {
              console.log("返回值为1");
              this.$router.push('/loadPass');
              window.sessionStorage.setItem("register", true);
              /*todo
              *
              * */
              /*MtaH5.clickShare('dongminenglicep-2', {reginfo: true});*/
              this.$MTAmethod.mtaShare('dongminenglicep-2', {reginfo: true})
              /**/
            } else {
              // alert(res.data.returnMsg)
            }
          }).catch((err) => {
            console.error(err);
          })
        }
      }
    }
  }
</script>

<style scoped>
  b {
    width: 15px;
    height: 15px;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    background-image: url("/static/img/personal/close.png");
    background-size: contain;
    /* display: none;*/
  }
  #moreInfo {
  }
  .box {
    height: 90%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* b{
       width: 15px;
       height: 15px;
       background: #c1c1c1;
       color: #fff;
       position: absolute;
       right: 7px;
       top: 0;
       bottom: 0;
       margin: auto;
       border-radius: 50%;
       justify-content: center;
       display: flex;
       align-items: center;
       font-size: 15px;
   }*/
  input, textarea {
    -webkit-appearance: none;
  }
  .cont {
    width: 100%;
    height: 100%;
    background: #fff;
    margin: 0 auto;
  }
  .baseinfo, .company, .address {
    width: 100%;
    height: auto;
    background: #fff;
    padding: 15px 12px;
    box-sizing: border-box;
  }
  .nickname, .username, .email, .company-sort, .company-all, .position, .company-address, .company-code {
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 10px;
    position: relative;
  }
  .close {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 0;
    right: 7.5px;
    width: 15px !important;
    height: 15px !important;
    background: #c1c1c1;
    color: #f0f1f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-style: normal;
  }
  .email, .company-all {
    margin-bottom: 0;
  }
  .nickname span, .username span, .email span, .company-sort span, .company-all span, .position span, .company-address span, .company-code span {
    width: 25%;
    height: 40px;
    display: inline-block;
    text-align: right;
    line-height: 40px;
    padding-right: 5px;
    box-sizing: border-box;
    letter-spacing: 1px;
    font-size: 15px;
    color: #535353;
  }
  .nickname input, .username input, .email input, .company-all input, .position input, .company-address input, .company-code input {
    display: inline-block;
    width: 75%;
    height: 40px;
    outline: none;
    font-size: 15px;
    padding: 10px 10px;
    box-sizing: border-box;
    color: #8d8d8d;
    font-family: PingFangSC-Light, sans-serif;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
  }
  .textarea {
    font-family: PingFangSC-Light, sans-serif;
    display: block;
    color: #8d8d8d;
    font-size: 15px;
    width: 75%;
    height: 67px;
    border-radius: 2px;
    float: right;
    resize: none;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    padding: 5px 4px;
  }
  .nickname i, .username i, .company-all i, .company-sort i, .company-code i {
    width: auto;
    height: 100%;
    color: #ffb148;
    font-style: normal;
  }
  hr {
    width: 100%;
    height: 7.5px;
    background: #f0f1f5;
    border: 0;
    margin: 0;
  }
  .complete {
    width: 100%;
    height: 50px;
    background: #ffd59c; /*#ffb148*/
    line-height: 50px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 18px;
    color: #fff;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .pass {
    background: #ffb148;
  }
  .userErr, .emailErr, .fullErr, .codeErr, .sortErr {
    width: 100%;
    height: auto;
    padding-left: 25%;
    box-sizing: border-box;
    font-size: 13px;
    color: #fb4319;
    margin: -8px 0 2px 0;
  }
  .fullErr {
    margin: 0px 0 -5px 0;
  }
  .codeErr {
    margin: -8px 0 2px 0;
  }
  .emailErr {
    margin: 0px 0 -5px 0;
  }
  .sortbox, .jobsort, .areabox {
    display: inline-block;
    width: 75%;
    height: 40px;
    outline: none;
    padding: 5px 5px;
    box-sizing: border-box;
    color: #8d8d8d;
    font-family: PingFangSC-Light, sans-serif;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
  }
  .areabox {
    display: flex;
    justify-content: space-between;
  }
  .areabox select {
    width: 31%;
    height: 100%;
    box-sizing: border-box;
    border: 0;
  }
  /*.jobsort{
      padding:5px 5px 5px 0;
  }*/
  .jobsort select {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    /*background-size: 5%;*/
    color: #8d8d8d;
    font-size: 15px;
    /* padding-right: 3px;box-sizing: border-box;*/
    font-family: PingFangSC-Light, sans-serif;
    float: right;
  }
  #company-1, #company-2 {
    width: 55%;
    height: 100%;
    border: 0;
    float: left;
    text-align: center;
    outline: none; /*background: #fff;*/
    color: #8d8d8d;
    /*margin-left: -5px;*/
  }
  #company-2 {
    width: 45%;
    float: right;
    padding-left: 5px;
    box-sizing: border-box;
  }
  #company-2 option {
    text-align: center;
  }
  input {
    font-family: PingFangSC-Light, sans-serif !important;
    outline: none !important;
    font-size: 15px !important;
    color: #8d8d8d !important;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  select {
    font-family: PingFangSC-Light, sans-serif;
    outline: none;
    font-size: 15px;
    color: #8d8d8d;
    /* margin-left: -5px;*/
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    border: solid 1px #000;
    /*很关键：将默认的select选择框样式清除*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("/static/img/personal/toDownimg.jpg") no-repeat scroll right center transparent;
    background-size: 17px;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
  }
  input, select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
