<template>
  <div class="register">
    <div class="success">
      <img src="/static/img/personal/register.png" alt="">
    </div>
    <div class="text">
      <p class="text1">{{test}}</p>
      <p class="time"><span class="two">{{ timer }}</span><span>秒</span>后转至个人中心！</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        test: '注册成功',
        timer: 3
      }
    },
    mounted: function () {
      let that = this;
      this.interval = setInterval(function () {
        that.timer--;
        if (that.timer == 0) {
          that.$router.push("/my")
        }
      }, 1000)
    }
  }
</script>

<style scoped>
  .register {
    width: 100%;
    height: 100%;
    background: #fff;
    padding-top: 150px;
    box-sizing: border-box;
  }
  .success {
    width: 63px;
    height: 63px;
    margin: 0 auto;
  }
  .success img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .text {
    width: 100%;
    height: auto;
    margin-top: 40px;
  }
  .text1, .time {
    width: 100%;
    height: auto;
    text-align: center;
    font-family: PingFangSC-Regular, sans-serif;
    font-size: 15px;
    color: #323232;
    margin: 12px 0;
  }
  .text1 {
    font-weight: bold;
  }
  .time span {
    color: #ffb148;
  }
</style>
