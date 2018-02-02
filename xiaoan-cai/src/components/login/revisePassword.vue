<template>
    <div>
        <form>
            <div class="oldPassword">
                <span>旧密码</span>
                <input type="password" placeholder="请输入旧密码" v-model="oldPassword" @focus="show1" @blur="hide1"
                       @change="b1"><!---->
                <b @click="()=>{this.oldPassword=''}" v-show="this.oldPassword.length>0" class="bbb"></b>
            </div>
            <p class="passErr oldpassErr" v-show="!oldPasswordvalid && oldPassword.length>0">
                旧密码输入有误！
            </p>
            <p class="passErr1">
                请输入旧密码！
            </p>
            <div class="password">
                <span>新密码</span>
                <input type="password" placeholder="请输入6-20位新密码" v-model="password" @focus="show2" @blur="hide2"
                       @change="b2">
                <b @click="()=>{this.password=''}" v-show="this.password.length>0" class="bbb2"></b>
            </div>
            <p class="passErr newPassErr" v-show="!passvalid && password.length>0">
                请输入6-20位密码！
            </p>
            <p class="repeat" v-show="isRepeat">
                不要使用近期使用过的密码！
            </p>
            <div class="again">
                <span>再次输入</span>
                <input type="password" placeholder="请再次输入新密码" v-model="apassword" @focus="show3" @blur="hide3"
                       @change="b3">
                <b @click="()=>{this.apassword=''}" v-show="this.apassword.length>0" class="bbb3"></b>
            </div>
            <p class="apassErr" v-show="!apassvalid && apassword.length>0">
                两次输入不一致！
            </p>
            <!--*****************************************-->
            <div class="regnum">
                <div class="regbox">
                    <span>
                        验证码
                    </span>
                    <input type="text" v-model="regnumber" @input="regNum" placeholder="请输入验证码" @focus="show4"
                           @blur="hide4" @change="b4">
                    <img v-lazy="ImageCode" alt="验证码" @click="changeReg()" id="changeRegimg">
                    <b @click="()=>{this.regnumber=''}" v-show="this.regnumber.length>0" style="right:37%"
                       class="bbb4"></b>
                </div>
            </div>
            <p class="error regerr" style="display: none"><!--v-show="showregErr"-->
                验证码输入有误！
            </p>
            <!--*****************************************-->
            <!--<p class="next" @click="next"
               :class="{pass:passvalid && this.oldPassword.length>=6 && apassvalid  && this.password.length>=6 &&!showregErr && this.apassword.length>=6  && this.regnumber.length>=1 && !isRepeat}">
                保&emsp;存</p>-->
          <p class="next pass" @click="next()">
            保&emsp;存</p>
        </form>
    </div>
</template>
<script>
  export default {
    name: "revisePassword",
    data() {
      return {
        phoneNumber: "",
        oldPassword: "",
        password: "",
        apassword: "",
        getNumber: "获取验证码",
        reg: "",
        oldPasswordvalid: true,
        passvalid: true,
        apassvalid: false,
        regvalid: false,
        isRepeat: false,
        regnumber: "",
        imgSrc: "/static/img/personal/yizhuce.jpg",
        ImageCode: "",
        showregErr: false
      }
    },
    created() {
      this.ImageCode = this.$api.host + 'getImageCode';
    },
    mounted: function () {
      var user_id = this.$cookie.getCookie("userId");
      this.$http.get(this.$api.host + 'userHome?userId=' + user_id).then((res) => {
        console.log(res.data.returnObject.mobile)
        this.phoneNumber = res.data.returnObject.mobile;
      }).catch((err) => {
        console.error(err)
      })
      this.$nextTick(() => {
        this.iosInput();
      })
    },
    methods: {
      /* 设置cookie*/
      V_setCookie: function (name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
      },
      /*读取cookie*/
      V_getCookie: function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : "";
      },
      /*清空Cookie*/
      V_deleteCookie: function (name) {
        this.set(name, '', -1);
      },
      /**/
      iosInput() {
        console.log('65463515165', $("input").length)
        var user = "";
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";
        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0";
          $("input").css('line-height', '20px')
        }

      },
      changeReg() {
        this.ImageCode = this.$api.host + 'getImageCode';
        console.log(this.ImageCode)
        $("#changeRegimg").attr({src: this.ImageCode, alt: "验证码"});
      },
      regNum: function () {
        if (this.regnumber.length == 4) {
          this.showregErr = false;
        } else {
          this.showregErr == true;
        }
        console.log(this.showregErr)
        console.log(this.regnumber);

      },
      next() {
        if(this.oldPassword.length == 0 || this.password.length == 0  || this.apassword.length == 0 || this.regnumber.length == 0){
          // this.$toast({message: "请完善未填信息！", position: 'middle', duration: 1500});
            return false
        }
        if (this.passvalid == true && this.apassvalid == true && this.showregErr == false && this.isRepeat == false) {
          if (this.oldPassword.length == 0) {
            $(".passErr1").show();
          } else if (this.oldPassword.length !== 0 && this.oldPasswordvalid == true && this.isRepeat == false) {
            $(".passErr1").hide();
            $(".next").css("background", "#ffb148");
            this.$http({
              method: "POST",
              url: this.$api.host + 'modifyLoginPassword',
              params: {
                oldPassword: this.oldPassword,
                newPassword: this.password,
                code: this.regnumber
              }
            }).then((res) => {
              console.log(res)
              if (res.data.returnCode == '1') {
                this.$router.push('/passwordSusscess');
              } else if (res.data.returnCode == '-1') {
                this.regvalid = true;
                if (res.data.returnMsg == "验证码不正确！") {
                  $(".regerr").text(res.data.returnMsg).show();
                } else if (res.data.returnMsg == "验证码不正确！") {
                  $(".regerr").text(res.data.returnMsg).show();
                } else {
                  $('.oldpassErr').text(res.data.returnMsg).show();
                }
              }
            }).catch((err) => {
              console.error(err)
            })
          }
        } else {
          /*console.log("no submit");*/
        }
      },
      show4() {
        $('.regnum').css('border', '1px solid #ffb148');
        if (this.regnumber.length > 0) {
          $(".bbb4").show();
        }
        $(".regerr").text('验证码输入有误！').hide();
      },
      b4() {
        $(".bbb4").hide();
      },
      hide4() {
        $('.regnum').css('border', '1px solid #f0f1f5');
        if (this.regnumber.length == 0) {
          $(".regerr").text('请输入验证码！').show();
        }
      },
      show3() {
        $('.again').css('border', '1px solid #ffb148');
        this.apassvalid = true;
        if (this.apassword.length > 0) {
          $(".bbb3").show();
        }
        $(".apassErr").text('两次输入不一致！').hide();
      },
      b3() {
        $(".bbb3").hide();
      },
      hide3() {
        $('.again').css('border', '1px solid #f0f1f5');

        if (this.apassword.length == 0) {
          $(".apassErr").text('请再次输入新密码！').show();
        } else if (this.apassword.length !== 0) {
          let _this = this;
          if (_this.apassword !== this.password) {
            _this.apassvalid = false;
            /* console.log(_this.apassvalid)*/
          } else {
            _this.apassvalid = true;
            this.password = this.apassword;
          }
        }
      },
      show1() {
        $('.oldPassword').css('border', '1px solid #ffb148');
        this.oldPasswordvalid = true;
        if (this.oldPassword.length > 0) {
          $(".bbb").show();
        }
        $(".passErr1").text('旧密码输入有误！').hide();
        $('.oldpassErr').hide();
      },
      b1() {
        $(".bbb").hide();
      },
      hide1() {
        if (this.oldPassword.length == 0) {
          $(".passErr1").text('请输入旧密码！').show();
        } else if (this.oldPassword.length !== 0) {
          $(".passErr1").text('旧密码输入有误！')
          let regExp1 = /^([a-z0-9\，\。\,\.\@\!\#\$\%\^\&\-\_\=\+\<\>\/\*\(\)]){6,20}$/i;
          this.oldPasswordvalid = regExp1.test(this.oldPassword);
          console.log(this.oldPasswordvalid)
          if (this.password == this.oldPassword && this.oldPassword.length !== 0) {
            this.isRepeat = true;
            console.log(this.isRepeat)
          } else {
            this.isRepeat = false;
          }
        }

        $('.oldPassword').css('border', '1px solid #f0f1f5');

      },
      show2() {
        $('.password').css('border', '1px solid #ffb148');
        this.passvalid = true;
        if (this.password.length > 0) {
          $(".bbb2").show();
        }
        $(".newPassErr").text('请输入6-20位密码！').hide();
        $(".repeat").hide();
      },
      b2() {
        $(".bbb2").hide();
      },
      hide2() {
        $('.password').css('border', '1px solid #f0f1f5');

        if (this.password.length == 0) {
          $(".newPassErr").text('请输入新密码！').show();
          $(".repeat").hide();
        } else if (this.password.length !== 0) {
          console.log(this.password, this.oldPassword)
          if (this.password == this.oldPassword && this.oldPassword.length !== 0) {
            this.isRepeat = true;
            console.log(this.isRepeat)
            /*$(".repeat").show()*/
          } else {
            this.isRepeat = false;
          }
          let regExp = /^([a-z0-9\，\。\,\.\@\!\#\$\%\^\&\-\_\=\+\<\>\/\*\(\)]){6,20}$/i;
          this.passvalid = regExp.test(this.password);
          /*console.log(this.passvalid)*/
          console.log(this.isRepeat)
          let _this = this;
          if (_this.apassword !== this.password) {
            _this.apassvalid = false;
            /* console.log(_this.apassvalid)*/
          } else {
            _this.apassvalid = true;
            this.password = this.apassword;
          }
        }


      }
    }
  }
</script>

<style scoped>
    b{
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
    }
    form{
        width: 100%;
        height: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
    .oldPassword, .password, .again, .regnum{
        width: 100%;
        height: auto;
        background: #f0f1f5;
        font-size: 0;
        border-radius: 2px;
        margin-bottom: 7.5px;
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        border: 1px solid #f0f1f5;
    }
    .oldPassword span, .password span, .again span, .regsitor span, .regnum span{
        width: 22%;
        font-size: 0;
        height: 40px;
        font-size: 15px;
        color: #323232;

        box-sizing: border-box;
        padding-left: 7.5px;
        display: inline-block;
        line-height: 40px;
    }
    .password input, .again input, .oldPassword input{
        width: 78%;
        font-size: 0;
        height: 38px;
        background: #f0f1f5;
        font-size: 15px;
        color: #8d8d8d;
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    .passErr, .apassErr, .passErr1, .repeat{
        margin: 5px 0;
        color: #fb4319;
        font-size: 13px;
    }
    .passErr1{
        display: none;
    }
    .error{
        margin: -2px 0 5px 0;
        color: #fb4319;
        font-size: 13px;
    }
    .passErr, .apassErr{
        margin-top: -3px;
    }
    .regsitor input{
        width: 43%;
        height: 40px;
        background: #f0f1f5;
        font-size: 15px;
        color: #8d8d8d;
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
    }
    .regnum{
        width: 35%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        display: block;
        font-size: 15px;
        color: #ffb249;
    }
    input[type=checkbox]{
        width: 15px;
        height: 15px;
        border: 0.5px solid #8d8d8d;
        background-color: #f0f1f5;
    }
    .next{
        width: 100%;
        height: 50px;
        margin: 0;
        background: #ffd59c;
        text-align: center;
        line-height: 50px;
        border: 0;
        color: #fff;
        font-size: 18px;
        border-radius: 2px;
        font-family: PingFangSC-Medium, sans-serif;
    }
    .pass{
        background: #ffb148;
    }
    .regnum{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        margin-bottom: 7.5px;
    }
    .regbox{
        width: 100%;
        height: 40px;
        border-radius: 2px;
        padding: 10px 10px 10px 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        background: #f0f1f5;
        border: 1px solid #f0f1f5;
    }
    .regbox span{

    }
    .enter span, .regnum span{
        width: 22%;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    .enter input, .regnum input{
        border: 0;
        width: 80%;
        height: 38px;
        padding: 0;
        padding-left: 2px;
        outline: none;
        background: #f0f1f5;
        box-sizing: border-box;
        font-size: 15px;
        font-family: PingFangSC-Light, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    .regnum input{
        width: 48%;
        hieght: 38px !important;
    }
    .regnum img{
        width: 30%;
        height: 36px;
        display: block;
        border: 0;
        position: absolute;
        right: 2px;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    input{
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica !important;
        color: #323232;
    }

</style>
