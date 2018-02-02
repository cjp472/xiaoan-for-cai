<template id="completeInfo">
  <div class="register">
    <div class="success">
      <img src="/static/img/personal/register.png" alt="">
    </div>
    <div class="text">
      <p class="text1">{{ completeInfoText1 }}</p>
      <p class="time"><span class="two">{{ timer +'秒'}}</span>{{completeInfoTime}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "completeInfo",
    data() {
      return {
        completeInfoTime: '后转至个人信息！',
        completeInfoText1: '请先完善个人信息！',
        timer: 3,
        myMobile: '',
      }
    },
    created() {
      //window.sessionStorage.clear();
    },
    mounted: function () {
      this.$http({
        method: 'GET',
        url: this.$api.host + "userHome",
        params: {}
      }).then((res) => {
        var myMobile = res.data.returnObject.mobile;
        let that = this;
        this.interval = setInterval(function () {
          that.timer--;
          if (that.timer == 0) {
            that.$router.push({path: "/manage/reviseInfo", query: {mobile: myMobile}});
          }
        }, 1000);
      }).catch((err) => {
        console.error(err);
      });

    },
    //离开当前页面后
    destroyed() {
      clearInterval(this.interval);
    },
  }
</script>

<style scoped>
  #completeInfo {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
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
