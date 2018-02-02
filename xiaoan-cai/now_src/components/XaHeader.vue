<template>
  <header class="xa-header">
    <div class="xa-header-list xa-header-close">
      <span @click="routergo"><i class="icon iconfont icon-xiangzuojiantou"></i><span>返回</span></span>
    </div>
    <button class="xa-header-list xa-header-title">{{title}}</button>
    <div class="xa-header-list"></div>
  </header>
</template>

<script>
  export default {
    name: "xa-header",
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        required: false,
        default: '标题'
      }
    },
    watch: {
      '$route': function () {

      }
    },
    methods: {
      routergo() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss">
  .xa-header {
    width: 100%;
    height: 88px;
    position: fixed;
    z-index: 350;
    top: 0;
    left: 0;
    display: flex;
    background-color: #323232;
    .xa-header-list {
      flex: 1;
      vertical-align: middle;
    }
    .xa-header-close {
      color: white;
      vertical-align: middle;
      box-sizing: border-box;
      font-size: 30px;
      i {
        font-size: 30px;
        line-height: 88px;
        font-weight: 700;
        padding-left: 15px;
      }
    }
    .xa-header-title {
      border: 0;
      padding: 0;
      font-size: 30px;
      background-color: rgba(0, 0, 0, 0);
      outline: none;
      color: white;
      text-align: center;
      vertical-align: middle;
    }
  }
</style>
