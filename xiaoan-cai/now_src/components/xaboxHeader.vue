<template>
  <box class="header-box">
    <flexbox :gutter="0" :wrap="'wrap'">
      <flexbox-item :span="1/8">
        <box class="xa-button-box">
          <x-button mini action-type="button" @click.native="visibility">
            <i class="icon iconfont icon-caidan"></i>
          </x-button>
        </box>
      </flexbox-item>
      <flexbox-item :span="7/8">
        <router-link :to="link">
          <header class="header" ref="header">
            <box><i class="icon iconfont icon-tripsousuo"></i><span>搜索</span></box>
          </header>
        </router-link>
      </flexbox-item>
    </flexbox>
  </box>
</template>

<script>
  import {Box, Flexbox, FlexboxItem, XButton} from 'vux'

  export default {
    name: "xabox-header",
    data() {
      return {}
    },
    components: {
      Box, XButton, Flexbox, FlexboxItem
    }
  }
</script>

<style lang="scss">
  .header-box {
    position: relative;
    height: 44px;
    .vux-flexbox {
      .vux-flexbox-item {
        .xa-button-box {
          height: 44px;
          width: 100%;
          padding: 7.5px 0 7.5px 12px;
          box-sizing: border-box;
          .weui-btn {
            height: 100%;
            width: 100%;
            background-color: white;
            border-radius: 2px;
            padding: 0;
            line-height: 1;
            i {
              font-size: 24px;
              color: #8d8d8d;
            }
          }
          .weui-btn:after {
            border: none;
          }
        }
      }
    }
  }
</style>
