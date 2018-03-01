<template>
  <footer class="xa-Footer" ref="tabbarDom">
    <tabbar>
      <tabbar-item link="/law" :selected="$route.meta.tabName === 'law'">
        <i slot="icon" class="icon iconfont icon-fagui"></i>
        <span slot="label">法规</span>
      </tabbar-item>
      <tabbar-item link="/affiche" :selected="$route.meta.tabName === 'affiche'">
        <i slot="icon" class="icon iconfont icon-gonggao1"></i>
        <span slot="label">公告</span>
      </tabbar-item>
      <tabbar-item link="/report" :selected="$route.meta.tabName === 'report'">
        <i slot="icon" class="icon iconfont icon-yanbao1"></i>
        <span slot="label">研报</span>
      </tabbar-item>
      <tabbar-item link="/my" :selected="$route.meta.tabName === 'my'">
        <i slot="icon" class="icon iconfont icon-gerenzhongxin1"></i>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </footer>
</template>

<script>
  import {Cell, Group, Tabbar, TabbarItem} from 'vux'
  export default {
    name: "xafooter",
    data() {
      return {}
    },
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    watch: {},
    created() {

    },
    mounted() {
      this.$style.tabbar.height = this.$refs.tabbarDom.clientHeight;
    },
    methods: {}

  }
</script>
<style lang="scss">
  .xa-Footer {
    position: absolute;
    bottom: 0;
    left: 0;
    min-height: 50px;
    width: 100%;
    z-index: 500;
    background-color: white;
    .weui-tabbar {
      height: 100%;
      .weui-tabbar__item {
        padding-top: 5px;
        .weui-tabbar__icon {
          height: 22px;
          width: 22px;
          i {
            font-size: 22px;
          }
        }
        .weui-tabbar__label {
          font-size: 13px;
        }
      }
      .weui-bar__item_on {
        color: #ffb148;
        .weui-tabbar__icon {
          i {
            color: #ffb148;
          }
        }
        * {
          color: #ffb148 !important;
        }
      }
    }
  }
</style>
