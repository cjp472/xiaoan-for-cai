<template>
  <div class="law-index">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "law-index",
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapState({
        direction: state => state.mutations.direction
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/transition.css";
  .law-index {
    width: 100%;
    height: 100%;
    background: #f0f1f5;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
