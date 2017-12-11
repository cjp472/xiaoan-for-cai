<template>
  <div id="app">
    <transition name="bounce">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      document.body.addEventListener('touchstart', function () {
        // ...空函数即可
        // console.log('touchstart事件注册成功！');
      }, false);
    }
  }
</script>

<style lang="scss">
  .bounce-enter-active {
    animation: bounce-in .4s;
  }
  .bounce-leave-active {
    animation: bounce-in .4s reverse;
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
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(100%);
    opacity: 0;
  }
  #app {
    margin: 0;
    padding: 0;
    background-color: white;
    /*background: #f0f1f5;*/
    min-width: auto;
    min-height: auto;
    color: #323232;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
