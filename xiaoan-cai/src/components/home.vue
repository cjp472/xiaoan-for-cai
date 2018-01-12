<template>
  <div class="xa-drawer-home">
    <blur :blur-amount=40 :url="url" class="xa-blur-header" :height="150">
      <p class="center"><img :src="url"></p>
      <p class="title"><b>Evans</b></p>
    </blur>
    <grid>
      <grid-item v-for="i in 3" :key="i">
        <span slot="label">Grid</span>
        <img slot="icon" src="https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg">
      </grid-item>
    </grid>
    <group class="xa-islink">
      <cell :title="'法规'" :link="'/law'" @click.native="cellClick" is-link></cell>
      <cell :title="'公告'" :link="'/affiche'" :is-loading="!money" :value="money" is-link></cell>
      <cell :title="'研报'" :link="'/report'" is-link></cell>
      <cell :title="'个人中心'" :link="'/my'" is-link></cell>
    </group>
    <box style="padding:10px 10px;box-sizing: border-box;width:100%;position: absolute;bottom: 0;">
      <x-button :gradients="['#FF5E3A', '#FF9500']">登 录</x-button>
    </box>
  </div>
</template>

<script>
  import {Badge, Blur, Box, Cell, Grid, GridItem, Group, GroupTitle, XButton} from 'vux'
  export default {
    components: {
      Blur, Grid,
      GridItem,
      GroupTitle, Group, Cell, Badge, XButton, Box
    },
    name: "home",
    data() {
      return {
        money: '1',
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],
        url: 'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg'
      }
    },
    watch: {
      '$route': function () {

      }
    },
    methods: {
      cellClick() {

      }
    },
    destroyed() {

    }
  }
</script>

<style lang="scss">
  .xa-drawer-home {
    width: 100%;
    .weui-grids {
      background-color: whitesmoke;
    }
    .xa-blur-header {
      // height: 160px !important;
      .center {
        text-align: center;
        padding-top: 10px;
        color: #fff;
        font-size: 18px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #ececec;
        }
      }
      .title {
        text-align: center;
        font-size: 16px;
      }
    }
    .xa-islink {
      .weui-cells {
        background-color: whitesmoke;
      }
    }

  }
</style>
