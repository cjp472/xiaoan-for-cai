<template>
    <div id="revisePhone">
        <div class="phone">
            <div class="enter" id="sss">
                <label>手机号</label>
                <input type="number" placeholder="请输入大陆手机号" v-model="phoneNumber" @focus="show" @blur="hide"
                       @change="showPhone">
                <b v-show="this.phoneNumber.length>0" @click="()=>{this.phoneNumber=''}" class="bbb1"></b>
            </div>
            <p class="error" v-show="!valid && phoneNumber.length>0">
                手机号码输入有误!
            </p>
        </div>

        <div class="regbox">
            <div class="regsitor">
                <label>验证码</label>
                <input type="number" placeholder="请输入验证码" v-model="regNum" @input="TextArea(4)" @change="Regnum"
                       @focus="show1" @blur="hide1">
                <p class="regnum" @click="getNum()" ref="regNum">{{ getNumber }}
                <div class="shadow" style="display: none"></div>
                </p>
                <b v-show="this.regNum.length>0 && !this.showss" @click="()=>{this.regNum=''}" style="right:37%"
                   class="bbb2"></b>
            </div>
            <p class="regErr" v-show="isReg">
                验证码输入有误！
            </p>
        </div>

        <div class="next">
            <button class="pass"
                    @click="nextm()">保存
            </button>
        </div>

    </div>
</template>

<script>
  export default {
    name: "revisePhone",
    data() {
      return {
        phoneNumber: '', //手机号
        valid: false,
        displayClear: false,
        regNum: "",  //验证码
        getNumber: "获取验证码",
        isReg: false,
        showss: false
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.machine();
      })
    },
    methods: {
      TextArea(maxlength) {
        if (this.regNum.length > maxlength) {
          this.regNum = this.regNum.substring(0, maxlength);
        }
      },
      machine() {
        var user = "";
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";

        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0"
          $("input").css('line-height', '20px')
        }
      },
      clear() {
        this.phoneNumber = '';
      },
      showPhone() {
        $(".bbb1").css('display', 'none');
      },
      show() {
        $("#sss").css("border", "1px solid #ffb249");
        this.valid = true;
        if (this.phoneNumber.length > 0) {
          $(".bbb1").show();
        }
        $(".error").hide();
      },
      hide() {
        $("#sss").css("border", "1px solid #f0f1f5");
        if (this.phoneNumber.length == 0) {
          $(".error").text('请输入手机号码！').show();
        } else if (this.phoneNumber.length !== 0) {
          $(".error").text('手机号码输入有误！')
          this.displayClear = true;
          let regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
          this.valid = regExp.test(this.phoneNumber);
          console.log(this.valid)
        }
      },
      show1() {
        $(".regsitor").css("border", "1px solid #ffb249");
        if (this.regNum.length > 0) {
          $(".bbb2").show();
        }
        $(".regErr").hide();
      },
      hide1() {
        $(".regsitor").css("border", "1px solid #f0f1f5");
        console.log(this.regNum)
        if (this.regNum.length == 4) {
          this.isReg = false;
        } else {
          this.isReg = true;
        }
      },
      Regnum() {
        $(".bbb2").css('display', 'none')
      },
      getNum() {
        let _this = this;
        if (this.phoneNumber.length == 0) {
          $(".error").text('请输入手机号码！').show();
        } else {
          $(".error").hide();

          $(".shadow").show();
          this.$http.get(this.$api.host + 'sendSmsCode?mobile=' + this.phoneNumber + '&type=register').then(function (res) {
            if (res.data.returnCode == -1) {
              $(".regErr").text(res.data.returnMsg).show();
              $(".regErr").text(res.data.returnMsg).show();
              $(".shadow").show();
            } else if (res.data.returnCode == 1) {
              let countDown = 60;
              for (let i = 0; i <= 60; i++) {
                window.setTimeout(function () {
                  if (countDown != 0) {
                    _this.getNumber = countDown + "s";
                    countDown--;
                  } else {
                    countDown = 60;//如果倒计时结束就让  获取验证码显示出来
                    _this.getNumber = "重新获取"
                    $(".shadow").hide();
                  }
                }, i * 1000)
                /*
                 _this.$router.push("/my")*/
              }
              $(".regErr").hide();
            }
            console.log(res)
          }).catch(function (err) {
            console.log(err);
          })
        }

      },
      nextm() {
        if (this.phoneNumber.length == 0 || this.regNum.length == 0) {
          this.$toast({message: "请完善未填信息！", position: 'middle', duration: 1500});
        }
        var _this = this;
        if (this.valid && this.isReg == false && this.regNum.length == 4) {
          console.log(this.phoneNumber)
          this.$http({
            method: "POST",
            url: this.$api.host + 'bindMobile',
            params: {
              mobile: this.phoneNumber,
              code: this.regNum
            }
          }).then((res) => {
            console.log(res)
            if (res.data.returnCode == 1) {
              window.sessionStorage.setItem("register", 2);
              this.$router.push('/loadPass');
            } else if (res.data.returnCode == -1) {
              if (res.data.returnMsg == "短信验证码不正确！") {
                $(".regErr").text(res.data.returnMsg).show();
              } else {
                this.$toast({message: res.data.returnMsg, position: 'middle', duration: 1500});
              }
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
        right: 7px;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        background-image: url("/static/img/personal/close.png");
        background-size: contain;
    }
    .phone {
        width: 100%;
        height: auto;
        font-size: 0;
        padding: 15px 15px 7.5px;
        box-sizing: border-box;
    }
    .enter {
        width: 100%;
        font-size: 0;
        height: 40px;
        border-radius: 2px;
        background: #f0f1f5;
        padding: 0 7.5px;
        box-sizing: border-box;
        position: relative;
        border: 1px solid #f0f1f5;
        overflow: hidden;
    }
    .enter label {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 22%;
        float: left;
        /*  padding-right: 19px;*/
        box-sizing: border-box;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    .enter input {
        display: inline-block;
        box-sizing: border-box;
        float: left;
        border: 0;
        width: 78%;
        height: 40px;
        padding: 0;
        outline: none;
        background: #f0f1f5;
        color: #323232;
        font-size: 15px;
        font-family: PingFangSC-Light, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    .error {
        display: block;
        color: #fb4319;
        margin: 0;
        font-size: 13px;
        margin-top: 7.5px;
    }
    .regbox {
        width: 100%;
        height: auto;
        font-size: 0;
        padding: 0 15px 0 15px;
        box-sizing: border-box;
        border-radius: 2px;
        overflow: hidden;
    }
    .regsitor {
        width: 100%;
        height: auto;
        font-size: 0;
        background: #f0f1f5;
        border-radius: 2px;
        margin-bottom: 7.5px;
        box-sizing: border-box;

        /*display: flex;
        align-items: center;*/
        position: relative;
        overflow: hidden;
        border: 1px solid #f0f1f5;
    }
    .regsitor label {
        width: 22%;
        height: 40px;
        font-size: 15px;
        color: #323232;
        padding-left: 7.5px;
        display: inline-block;
        line-height: 40px;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    .regsitor input {
        width: 43%;
        height: 40px;
        background: #f0f1f5;
        box-sizing: border-box;
        font-size: 15px;
        color: #323232;
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    .regnum {
        width: 30%;
        border-left: 1px solid #ffb249;
        margin: 0;
        padding: 0;
        padding-left: 7.5px;
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        font-size: 15px;
        color: #ffb249;
        position: relative;
    }
    #revisePhone .shadow {
        width: 34%;
        height: 80%;
        background: rgba(0, 0, 0, 0);
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    input[type=checkbox] {
        width: 15px;
        height: 15px;
        border: 0.5px solid #8d8d8d;
        background-color: #f0f1f5;
    }
    .regErr {
        margin: 0;
        color: #fb4319;
        font-size: 13px;
        margin-top: -1px;
        margin-bottom: 7px;
    }
    .next {
        width: 100%;
        height: 50px;
        text-align: center;
        padding: 0 15px;
        box-sizing: border-box;

    }
    .next button {
        width: 100%;
        height: 100%;
        line-height: 50px;
        color: #fff;
        font-family: PingFangSC-Medium, sans-serif;
        font-size: 18px;
        background: #ffd59c;
        border: 0;
        outline: none;
        border-radius: 2px;
    }
    .next button.pass {
        background: #ffb148;
    }
</style>
