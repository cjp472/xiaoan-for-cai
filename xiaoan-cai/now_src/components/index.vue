<template>
  <div class="index">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <xa-footer></xa-footer>
  </div>
</template>

<script>
  import footer from './xaFooter.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'index',
    data() {
      return {
        active: 'law'
      }
    },
    watch: {
      /* '$route': function (val, old) {
        console.log(val);
      } */
    },
    computed: {
      ...mapState({
        direction: state => state.mutations.direction
      })
    },
    components: {
      'xa-footer': footer
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/transition.css";
  .index {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 0;
    i {
      color: #8d8d8d;
      -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
</style>
