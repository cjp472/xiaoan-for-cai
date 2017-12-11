<template>
  <div class="home">
    <router-view/>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="law">
        <i slot="icon" class="icon iconfont icon-fagui"></i>
        法规
      </mt-tab-item>
      <mt-tab-item id="affiche">
        <div slot="icon">
          <i class="icon iconfont icon-gonggao1"></i>
        </div>
        公告
      </mt-tab-item>
      <mt-tab-item id="report">
        <i slot="icon" class="icon iconfont icon-yanbao1"></i>
        研报
      </mt-tab-item>
      <mt-tab-item id="my">
        <i slot="icon" class="icon iconfont icon-gerenzhongxin1"></i>
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        selected: '',
        slide: 'slide-left'
      }
    },
    watch: {
      '$route': function (val, old) {
        this.selected = val.name;
      },
      selected: function (newV, oldVal) {
        this.$router.push({path: newV});
      }
    },
    mounted() {
      console.log(this.$route.name);
      this.selected = this.$route.name;
    }
  }
</script>

<style lang="scss">
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @-moz-keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @-webkit-keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @-o-keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  @keyframes bounce-in {
    0% {
      opacity: 0
    }
    100% {
      opacity: 1
    }
  }
  .home {
    height: 100%;
    width: 100%;
    position: relative;
    background-color: white;
    .mint-tabbar {
      background-color: #fff;
      color: #8d8d8d;
      box-shadow: 0px -5px 13px rgba(0, 0, 0, .06);
      box-sizing: border-box;
      background-image: none;
      z-index: 2000;
      .mint-tab-item {
        padding: 9px 0;
        .mint-tab-item-icon {
          width: 50px;
          height: 50px;
          i {
            background-color: rgba(0, 0, 0, 0);
            font-size: 44px;
            color: #8d8d8d;
          }
        }
        .mint-tab-item-label {
          font-size: 20px;
          color: #8d8d8d;
        }
      }
      .is-selected {
        background-color: rgba(0, 0, 0, .01);
        color: #ffb148;
        -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        .mint-tab-item-icon {
          i {
            background-color: rgba(0, 0, 0, 0);
            font-size: 44px;
            color: #ffb148;
          }
        }
        .mint-tab-item-label {
          color: #ffb148;
        }
        * {
          background-color: rgba(0, 0, 0, .01);
          color: #ffb148;
          -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
      .mint-tab-item:active {
        background-color: #f0f1f5;
      }
    }
  }
</style>
