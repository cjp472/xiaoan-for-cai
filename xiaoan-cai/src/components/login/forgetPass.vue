<template>
  <div>
    <p class="phone">
      <span>您绑定的手机号码是：</span>
      <span>{{ phone }}</span>
    </p>
    <div class="regbox">
      <div class="regsitor">
                <span>
                  验证码
                </span>
        <input type="text" placeholder="请输入验证码" v-model="regNum" @change="Regnum">
        <p class="regnum" @click="getNum()" ref="regNum">
          {{ getNumber }}
        </p>
      </div>
      <p class="regErr" v-show="isReg">
        验证码输入有误
      </p>
    </div>
    <div class="next">
      <button :class="{pass:!isReg && this.regNum.length>0}" @click="next()">
        下一步
      </button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "forgetPass",
    data() {
      return {
        regNum: "",
        phone: "",
        getNumber: "获取验证码",
        isReg: false
      }
    },
    created: function () {
      this.phone = this.$route.query.phone;
    },
    methods: {
      Regnum() {
        console.log(this.regNum)
        if (this.regNum.length > 0) {
          this.isReg = false;
        } else {
          this.isReg = true;
        }
      },
      getNum() {
        this.$http.get(this.$api.host + 'sendSmsCode?mobile=' + this.phone).then((res) => {
          console.log(res)
          let _this = this;
          let countDown = 10;
          for (let i = 0; i <= 10; i++) {
            window.setTimeout(function () {
              if (countDown != 0) {
                _this.getNumber = countDown + "s后重发验证";
                countDown--;
              } else {
                countDown = 10;//如果倒计时结束就让  获取验证码显示出来
                _this.getNumber = "重新获取验证码"
              }
            }, i * 1000)
          }
        }).catch((err) => {
          console.error(err)
        })

      },
      next() {
        if (this.isReg == false && this.regNum.length > 0) {

          this.$router.push("/reset")
        }
      }
    }
  }

</script>

<style scoped>
  .phone {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    font-family: PingFangSC-Regular, sans-serif;
    color: #323232;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .regbox {
    width: 100%;
    height: auto;
    padding: 0 15px;
    box-sizing: border-box;
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
    margin-top: 7.5px;
  }
  .next {
    width: 100%;
    height: 73.5px;
    text-align: center;
    padding: 7.5px 15px 15px;
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
  }
  .next button.pass {
    background: #ffb148;
  }
</style>
