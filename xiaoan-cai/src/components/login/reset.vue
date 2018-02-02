<template>
  <div>
    <form>
      <p class="phone">
        <span>您绑定的手机号码是：</span>
        <span>{{ phone }}</span>
      </p>
      <div class="password">
        <span>新密码</span>
        <input type="password" placeholder="请输入6-20位密码" v-model="password" @input="entry" @focus="show"
               @blur="hide">
        <b @click="()=>{this.password='';this.passvalid=false;}" v-show="this.password.length>0"
           class="bbb"></b>
      </div>
      <p class="passErr" v-show="!passvalid">
        密码错误，6-20位密码！
      </p>
      <div class="again" :class="{focus:this.apassword.length>0}">
        <span>再次输入</span>
        <input type="password" placeholder="请确认登录密码" v-model="apassword" @input="regpassword" @focus="show1"
               @blur="hide1">
        <b @click="()=>{this.apassword='';this.apassvalid=false;}" v-show="this.apassword.length>0"
           class="bbb2"></b>
      </div>
      <p class="apassErr" v-show="!apassvalid">
        两次输入不一致！
      </p>

      <div class="regbox">
        <div class="regsitor">
                <span>
                  验证码
                </span>
          <input type="text" placeholder="请输入验证码" v-model="regNum" @input="Regnum" @focus="show2"
                 @blur="hide2">
          <b @click="()=>{this.regNum=''}" v-show="this.regNum.length>0" style="right:37%" class="bbb3"></b>
          <p class="regnum" @click="getNum" ref="regNum">
            {{ getNumber }}
          <div class="shadow" style="display: none"></div>
          </p>
        </div>
        <p class="regErr" v-show="isReg">
          验证码输入有误！
        </p>
      </div>
      <p class="next" @click="next" style="margin:0" :class="{pass:passvalid && apassvalid && this.regNum.length>=1}">
        重置</p>
    </form>
  </div>
</template>

<script>
  export default {
    name: "reset",
    data() {
      return {
        phone: "",
        password: "",
        passvalid: true,
        apassword: "",
        apassvalid: true,
        regNum: "",
        getNumber: "获取验证码",
        isReg: false
      }
    },
    created: function () {
      this.phone = this.$route.query.phone;
    },
    methods: {
      getNum() {
        $('.shadow').show();
        let _this = this;
        this.$http.get(this.$api.host + 'sendSmsCode?mobile=' + this.phone + '&type=findPwd').then(function (res) {
          if (res.data.returnCode == -1) {
            $(".regErr").text(res.data.returnMsg).show();
            $('.shadow').show();
          } else if (res.data.returnCode == 1) {
            $(".regErr").hide();
            let countDown = 60;
            for (let i = 0; i <= 60; i++) {
              window.setTimeout(function () {
                if (countDown != 0) {
                  _this.getNumber = countDown + "s";
                  countDown--;
                } else {
                  countDown = 60;//如果倒计时结束就让  获取验证码显示出来
                  _this.getNumber = "重新获取"
                  $('.shadow').hide();
                }
              }, i * 1000)
            }

          }
          console.log(res)
        }).catch((err) => {
          console.error(err);
        })
      },
      Regnum() {
        $(".bbb3").css('display', 'none')
        console.log(this.regNum)
        if (this.regNum.length > 0) {
          $(".next").css("background", "#ffb148");
        }
      },
      entry() {
        $(".bbb").css('display', 'none')
        if (this.password == this.apassword) {
          this.passvalid = true;
          if (this.apassvalid == true && this.isReg == false && this.regNum.length == 4) {
            $(".next").css("background", "#ffb148");
          }
        }
      },
      regpassword() {
        $(".bbb2").css('display', 'none')
        if (this.apassword == this.password) {
          this.apassvalid = true;
          if (this.passvalid == true && this.isReg == false && this.regNum.length == 4) {
            $(".next").css("background", "#ffb148");
          }
        }
      },
      show() {
        $(".password").css("border", "1px solid #ffb148");
        this.passvalid = true;
        if (this.password.length > 0) {
          $(".bbb").show();
        }
      },
      hide() {
        $(".password").css("border", "0");
        let regExp = /^([a-z0-9\，\。\,\.\@\!\#\$\%\^\&\-\_\=\+\<\>\/\*\(\)]){6,20}$/i;
        let regshow = regExp.test(this.password);
        console.log("regshow" + regshow)
        if (this.password.length !== 0) {
          this.passvalid = regshow;
          console.log('passvalid:' + this.passvalid)
        } else if (this.password.length == 0) {
          this.passvalid = false;
          console.log('passvalid:' + this.passvalid)
          $(".next").css("background", "#ffd59c");
        }
        /*else{
         this.passvalid=true;
         console.log('passvalid:'+this.passvalid)
         }*/

        //console.log(this.passvalid)
        let _this = this;
        if (_this.apassword !== this.password && this.apassword.length !== 0) {
          _this.apassvalid = false;
          console.log('apassvalid:' + _this.apassvalid)
          $(".next").css("background", "#ffd59c");
        } else if (_this.apassword == this.password && this.apassword.length !== 0) {
          _this.apassvalid = true;
          console.log('apassvalid:' + _this.apassvalid)
          if (this.apassvalid == true && this.isReg == false && this.regNum.length == 4) {
            $(".next").css("background", "#ffb148");
          }
        }
      },
      show1() {
        $(".again").css("border", "1px solid #ffb148");
        this.apassvalid = true;
        if (this.apassword.length > 0) {
          $(".bbb2").show();
        }
      },
      hide1() {
        $(".again").css("border", "0");
        let _this = this;
        if (_this.apassword !== this.password && this.password.length !== 0) {
          _this.apassvalid = false;
          console.log('apassvalid:' + _this.apassvalid)
          $(".next").css("background", "#ffd59c");
        } else if (_this.apassword == this.password && this.password.length !== 0) {
          _this.apassvalid = true;
          console.log('apassvalid:' + _this.apassvalid)
          if (this.passvalid == true && this.isReg == false && this.regNum.length == 4) {
            $(".next").css("background", "#ffb148");
          }
        } else if (_this.apassword.length == 0) {
          _this.apassvalid = false;
        }
      },
      show2() {
        $(".regsitor").css("border", "1px solid #ffb148");
        $(".regErr").hide();
        if (this.regNum.length > 0) {
          $(".bbb3").show();
        }
      },
      hide2() {
        $(".regsitor").css("border", "0");
        console.log('regNum:' + this.regNum, 'isReg:' + this.isReg)
        if (this.regNum.length == 4) {
          this.isReg = false;
          if (this.apassvalid == true && this.passvalid == true && this.password.length > 0 && this.apassword.length > 0) {
            $(".next").css("background", "#ffb148");
          } else {
            $(".next").css("background", "#ffd59c");
          }
        } else if (this.regNum.length == 0 || this.regNum.length > 4 || this.regNum.length < 4) {
          this.isReg = true;
          $(".next").css("background", "#ffd59c");
        }
      },
      next() {
        let that = this;
        if (this.password.length == 0) {
          this.passvalid = false;
          return;
        }
        if (this.apassword.length == 0) {
          this.apassvalid = false;
          return;
        }
        if (this.password.length !== 0 && this.apassword.length !== 0 && this.passvalid == true && this.apassvalid == true && this.regNum.length > 0 && this.isReg == false) {
          this.$http.post(this.$api.host + '/findLoginPassword?mobile=' + this.phone + '&code=' + this.regNum + '&password=' + this.apassword)
            .then((res) => {
              console.log(res.data)
              if (res.data.returnCode == -1) {
                this.regNum = "";
                if (res.data.returnMsg = '验证码不正确！') {
                  this.isReg = true;
                } else {
                  console.log(res.data.returnMsg)
                  // alert(res.data.returnMsg)
                }
                $(".next").css("background", "#ffd59c");
              } else if (res.data.returnCode == 1) {
                console.log("密码修改成功！")
                this.$router.push('/passwordSusscess?from=reset');
              }
            }).catch((err) => {
            console.error(err);
          })
          $(".next").css("background", "#ffb148");
        } else {
          console.log("no info")
          $(".next").css("background", "#ffd59c");
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
  }
  .phone {
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-family: PingFangSC-Regular, sans-serif;
    color: #323232;
    margin: 0;
    display: flex;
    align-items: center;
  }
  form {
    width: 100%;
    height: 100%;
    padding: 0 15px 15px 15px;
    box-sizing: border-box;
  }
  .password, .again {
    width: 100%;
    height: auto;
    background: #f0f1f5;
    border-radius: 2px;
    margin-bottom: 7.5px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .password span, .again span, .regsitor span {
    width: 22%;
    height: 40px;
    font-size: 15px;
    color: #323232;
    padding-left: 7.5px;
    display: block;
    line-height: 40px;
    /*box-sizing: border-box;*/
  }
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
  }
  .focus {
    border: 1px solid #ffb148;
  }
  .password input, .again input {
    width: 78%;
    height: 40px;
    background: #f0f1f5;
    font-size: 15px;
    color: #8d8d8d;
    line-height: 20px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
  }
  .passErr, .apassErr {
    margin: 5px 0;
    color: #fb4319;
    font-size: 13px;
  }
  .regbox {
    width: 100%;
    height: auto;
    position: relative;
  }
  .regsitor {
    width: 100%;
    height: auto;
    background: #f0f1f5;
    border-radius: 2px;
    margin-bottom: 7.5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .regsitor span {
    width: 22%;
    height: 40px;
    font-size: 15px;
    color: #323232;
    padding-left: 7.5px;
    display: block;
    line-height: 40px;
  }
  .regsitor input {
    width: 43%;
    height: 40px;
    background: #f0f1f5;
    font-size: 15px;
    color: #8d8d8d;
    line-height: 20px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
  }
  .regnum {
    width: 35%;
    border-left: 1px solid #ffb249;
    margin: 0;
    padding: 0;
    padding-left: 7.5px;
    box-sizing: border-box;
    text-align: center;
    display: block;
    font-size: 15px;
    color: #ffb249;
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
    margin-top: -2px;
    margin-bottom: 7.5px;
  }
  .next {
    width: 100%;
    height: 50px;
    background: #ffd59c;
    text-align: center;
    line-height: 50px;
    border: 0;
    color: #fff;
    font-size: 18px;
    border-radius: 2px;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .pass {
    background: #ffb148;
  }
  .regsitor {
    position: relative;
  }
  .shadow {
    width: 34%;
    height: 80%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  input {
    font-family: "PingFangSC-Light, sans-serif", Microsoft Yahei, Helvetica !important;
    color: #323232 !important;
    line-height: 20px;
  }
</style>
