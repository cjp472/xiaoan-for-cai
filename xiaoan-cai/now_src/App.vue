<template>
  <div id="app">
    <x-header v-if="this.$const.userAgent().weixin === false"
              ref="xaheader" :right-options="{showMore: true}" @on-click-more="showMenus = true">
      {{this.$route.meta.title}}
    </x-header>
    <box class="app-box" :style="{height: wrapperHeight + 'px'}">
      <drawer :show.sync="drawerVisibilit" :show-mode="showModeValue" :placement="showPlacementValue"
              :drawer-style="{'background-color':'#f0f1f5', width: '65%'}">
        <!-- drawer content -->
        <box slot="drawer">
          <xa-home></xa-home>
        </box>
        <view-box ref="viewBox" class="xa-drawer-container">
          <div class="xa-box">
            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </view-box>
      </drawer>
    </box>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import XaHeader from '../src/components/XaHeader'
  import {mapState} from 'vuex'
  import {Box, Drawer, Loading, TransferDom, ViewBox, XHeader} from 'vux'
  import XaHome from './components/home'

  export default {
    name: 'app',
    data() {
      return {
        wrapperHeight: '',
        showMore: false,
        showMenu: false,
        drawerVisibilit: false,
        showModeValue: 'push',
        showPlacementValue: 'left',
        heightTop: ''
      }
    },
    watch: {
      '$route': function (to, form, next) {
        if (to.name !== form.name) {
          this.drawerVisibilit = false;
        }
        // chuli 错误的路由跳回（主页）law
        setTimeout(() => {
          this.$nextTick(() => {
            this.redirectRoute();
          })
        }, 1000);
        console.log('', this.$route);
      },
      'drawerVisibility': function () {
        this.drawerVisibilit = this.drawerVisibility;
      },
      'drawerVisibilit': function () {
        if (this.drawerVisibilit) {
          this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: true});
        } else {
          this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: false});
        }
      }
    },
    directives: {
      TransferDom
    },
    computed: {
      ...mapState({
        direction: state => state.mutations.direction,
        isLoading: state => state.mutations.isLoading,
        drawerVisibility: state => state.mutations.isHomeShow
      })
    },
    components: {
      Box,
      ViewBox,
      Drawer,
      XaHeader,
      XHeader,
      XaHome,
      Loading
    },
    created() {
      this.redirectRoute();
    },
    mounted() {
      console.log(this.$const.userAgent());
      this.$nextTick(() => {
        if (this.$const.userAgent().weixin === true) {
        } else {
          this.heightTop = this.$refs.xaheader.$el.clientHeight;
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.xaheader.$el.clientHeight;
        }
      })
    },
    methods: {
      redirectRoute() {
        // 防止空路由 不跳转
        if (this.$route.name === null) {
          this.$router.replace({path: '/law'});
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/css/transition.css";
  .vux-loading {
    .weui-toast {
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .vux-header.v-transfer-dom {
    width: 100%;
    z-index: 1000;
    position: fixed !important;
    top: 0;
    left: 0;
    // background-color: #ffbc61 !important;
  }
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .app-box {
      height: 100%;
      width: 100%;
    }
    .vux-drawer {
      .vux-drawer-body {
        .xa-drawer-container {
          height: 100%;
          width: 100%;

          .weui-tab__panel {
            padding-bottom: 0;
          }
          .xa-box {
            box-sizing: border-box;
            height: 100%;
            background-color: #f0f1f5;
            width: 100%;
            position: relative;
            top: 0;
            left: 0;
          }
          .weui-tab {
            .weui-tab__panel {
              height: 100%;
              box-sizing: border-box;
              padding-bottom: 0;
            }
          }
        }
      }
    }

  }
</style>
