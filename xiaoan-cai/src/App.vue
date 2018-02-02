<template>
  <div id="app" ref="appDom">
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
              <!--<keep-alive>-->
              <router-view></router-view>
              <!--</keep-alive>-->
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
    name: "app",
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
    destroyed() {
      window.localStorage.removeItem("reload");
    },
    mounted() {
      this.$nextTick(() => {
        console.log(document.documentElement.clientHeight);
        document.body.addEventListener('touchstart', function () {
        }, false);
        $(document).ready(function () {
          $('body').height(document.documentElement.clientHeight);
        });
        if (this.$const.userAgent().weixin === true) {
        } else {
          this.heightTop = this.$refs.xaheader.$el.clientHeight;
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.xaheader.$el.clientHeight;
        }
      });
      this.$weixin.wxconfig(this);
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
  .mint-msgbox-wrapper {
    .mint-msgbox {
      color: #323232 !important;
      .mint-msgbox-content {
        position: relative;
        padding: 35px 12px;
        min-height: auto;
        font-size: 15px;
        box-sizing: border-box;
        /*border-bottom: 0;*/
        /*border-bottom: 1px solid #D9D9D9;*/
        .mint-msgbox-message {
          color: #323232 !important;
          line-height: 1.4;
          font-size: 15px;
        }
        .mint-msgbox-input {
        }
      }
      .mint-msgbox-btns {
        position: relative;
        display: table !important;
        width: 100%;
        box-sizing: border-box;
        font-size: 0;
        line-height: 1;
        .mint-msgbox-btn {
          border: 0;
          display: table-cell;
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          flex: none !important;
          line-height: 1;
        }
        .mint-msgbox-btn.mint-msgbox-cancel {
          background-color: white !important;
          color: #ffb148 !important;
          font-size: 15px;
          font-weight: normal !important;
        }
        .mint-msgbox-btn.mint-msgbox-confirm {
          background-color: #ffb148 !important;
          color: white !important;
          font-size: 15px;
          font-weight: normal !important;
        }
      }
    }
  }
  @import "assets/css/transition.css";
  .vux-loading {
    .weui-toast {
      top: 50%;
      // transform: translate3d(-50%, -50%, 0);
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
<style lang="scss">
  .mint-toast {
    z-index: 3100 !important;
  }
  .mint-popup {
    position: absolute !important;
  }
  .iconfont {
    color: #8d8d8d;
  }
  .mint-button::after {
    background-color: #f0f1f5 !important;
  }
  .mint-cell {
    background-color: #f0f1f5;
  }
  .mint-cell-wrapper {
    background: none !important;
    background-size: 120% 0 !important;
    height: 100% !important;
    padding: 0 12px;
    /*line-height: 55px !important;*/
  }
  .mint-cell-text {
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 15px !important;
    vertical-align: inherit !important;
  }
  .mint-cell-value {
    height: 100% !important;
    width: 100% !important;
    display: block !important;
    padding: 0;
    box-sizing: border-box;
    background-color: white;
    border-radius: 2px;
  }
  .mint-cell-title {
    flex: 0;
    flex: none;
  }
  .mint-cell:last-child {
    background-size: 100% 0 !important;
    height: 100% !important;
  }
  .mint-cell-swipe-button {
    padding: 0 39px 0 !important;
    box-sizing: border-box;
    line-height: 67px !important;
    text-decoration: none;
    height: 100% !important;
    display: flex;
    align-items: center;
    float: left;
  }
  .mint-cell-swipe-button + .mint-cell-swipe-button {
    padding: 14% 26.5px !important;
  }
  // *加载更多的提示样式*/
  .infinite-loading {
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #8d8d8d;
    font-size: 13px;
  }
  .infinite-drop {
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #aeaeae !important;
    font-size: 13px !important;
  }
</style>
