<template>
  <div id="manage" class="manage">
    <header class="line1">
      <span>小安头像</span>
      <img v-lazy="headerImg" alt="">
    </header>
    <ul class="wapper">
      <li v-for="(item,index) in itemList" :key="index" class="router-link" @click="itemlink(index)">
        <div class="select">
          <span>{{ item.title }}</span>
          <i class="icon iconfont icon-xiangyoujiantou"></i>
        </div>
      </li>
    </ul>
    <footer class="exit">
      <button class="exitbox" @click="appExit()">
        退出登录
      </button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "manage",
    data() {
      return {
        headerImg: "",
        toRightImg: "../../static/img/personal/Toleft.jpg",
        itemList: [
          {
            title: "修改个人信息",
            link: "manage/reviseInfo"
          },
          {
            title: "修改绑定手机",
            link: "manage/revisePhone"
          },
          {
            title: "修改登录密码",
            link: "manage/revisePassword"
          }
        ],
        userId: ""
      }
    },
    created() {
      let user_id = this.$cookie.getCookie("userId");
      this.userId = user_id;
      if (user_id) {
        console.log("有userId");
        this.userHome();
      } else {
        console.log("没有userId");
        this.$router.replace({path: '/My', query: {MathTime: global.timestamp}});
      }
    },
    mounted() {
    },
    methods: {
      // 获取用户信息
      userHome() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "userHome",
          params: {}
        }).then((res) => {
          if (res.data.returnCode == 1) {
            console.log(res);
            this.Register = true;   //授权登录
            if (res.data.returnObject.weixinAvatar == null || res.data.returnObject.weixinAvatar == "") {
              this.headerImg = '/static/img/personal/timg@2x.png';
            } else {
              this.headerImg = res.data.returnObject.weixinAvatar;
            }
          }
        }).catch((err) => {
          console.error(err);
        });
      },
      // 跳转
      itemlink(index) {
        console.log(this.itemList[index].link);
        this.$router.push({path: this.itemList[index].link, query: {id: 2}});
      },
      // 退出登录
      appExit() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "exit",
          params: {
            userId: this.userId
          }
        }).then((res) => {
          if (res.data.returnCode == 1) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("weixinId");
            window.localStorage.removeItem("wixAccreditCode");
            this.$cookie.deleteCookie('token');
            window.localStorage.removeItem('wx-auth');
            window.localStorage.setItem('exit', true);
            this.$router.replace({path: '/My'});
          } else {
            console.log(res.data.returnMsg)
          }
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .manage {
    .line1 {
      width: 100%;
      height: 59px;
      border-bottom: 0.5px solid #e3e3e3;
      padding: 0 12px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #323232;
      font-size: 15px;
      font-family: PingFangSC-Regular, sans-serif;
      img {
        width: 45px;
        height: 45px;
        display: block;
        border-radius: 50%;
        border: 1px solid #ffb149;
      }
      span {
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 15px;
        color: #323232;
      }
    }
    .wapper {
      .router-link {
        text-decoration: none;
        color: #323232;
        .select {
          width: 100%;
          height: 45px;
          border-bottom: 0.5px solid #e3e3e3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px 0 12px;
          box-sizing: border-box;
          span {
            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            font-size: 15px;
            color: #323232;
          }
          i {
            font-size: 13px;
            font-weight: 600;
          }
        }
        .select:active {
          background-color: #f0f1f5;
        }
      }
    }
    .exit {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0;
      .exitbox {
        border: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 50px;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 18px;
        color: #fff;
        background: #ffc051;
      }
      .exitbox:active {
        background-color: rgba(255, 192, 81, 0.9);
      }
    }
  }
  img[src=""] {
    opacity: 0 !important;
  }
</style>
