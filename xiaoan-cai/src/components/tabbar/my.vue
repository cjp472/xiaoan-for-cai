<template>
  <transition name="bounce">
    <div id="my">

    </div>
  </transition>
</template>

<script>
  export default {
    name: "law"
  }
</script>

<style lang="scss">
  #my {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
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
</style>
