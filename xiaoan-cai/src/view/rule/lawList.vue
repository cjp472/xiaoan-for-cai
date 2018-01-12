<template>
  <div class="lawlist">
    <div class="lawlist-header">
      <flexbox :gutter="10" wrap="wrap">
        <flexbox-item :span="1/8">
          <div class="newhome">
            <i class="icon iconfont icon-shouye1"></i>
          </div>
        </flexbox-item>
        <flexbox-item>
          <ul class="searchScroll-ul" ref="scrollbox" :style="{height:scrollHeight+'px'}">
            <li class="searchScroll-li" v-for="i in 10">
              <span>{{"是地方萨芬是的冯绍峰"+i}}</span>
              <i class="icon iconfont promptClose icon-X"></i>
            </li>
          </ul>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import {Box, Drawer, Flexbox, FlexboxItem, Loading, Radio, Scroller, Search, ViewBox, XButton} from 'vux'
  export default {
    computed: {},
    data() {
      return {
        scrollHeight: ''
      }
    },
    watch: {},
    components: {
      Box,
      XButton,
      Radio,
      Drawer,
      ViewBox,
      Loading,
      Flexbox,
      FlexboxItem,
      Search,
      Scroller
    },
    methods: {},
    mounted() {
      this.$nextTick(() => {
        console.log('1212121', this.$refs.scrollbox.clientWidth);
        // this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: true});
      })
    }
  }
</script>

<style lang="scss">
  .box1 {
    height: 100px;
    position: relative;
    width: 2135px;
    white-space: nowrap;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .box2-wrap {
    height: 300px;
    overflow: hidden;
  }
  .lawlist {
    width: 100%;
    height: 100%;
    position: relative;
    .lawlist-header {
      width: 100%;
      height: 35px;
      background-color: #f0f1f5;
      font-size: 0;
      .vux-flexbox {
        height: 100%;
        .vux-flexbox-item {
          height: 100%;
          .newhome {
            width: 100%;
            font-size: 15px;
            height: 100%;
            background-color: white;
            border: 0;
          }
        }
      }

      .newpopup {
        display: inline-block;
        width: 20%;
      }
      .newScroll {
        display: inline-block;
        width: 60%;
      }
      .searchScroll-ul {
        margin: 0;
        width: 100%;
        background-color: white;
        display: inline;
        white-space: nowrap;
        overflow-x: scroll;
        float: left;
        overflow-y: hidden;
        max-width: 100%;
        height: 100%;
        z-index: 150;
        padding: 0 8px;
        -webkit-overflow-scrolling: touch;
        .searchScroll-li {
          background-color: #fff2e1;
          border-radius: 2px;
          color: #8d8d8d;
          font-weight: lighter !important;
          display: inline-block !important;
          margin: 5px 0 5px 0;
          height: 25px;
          font-size: 15px;
          line-height: 25px;
          padding-left: 5px;
          padding-right: 5px;
          z-index: 170;
          .searchClose {
            display: inline-block;
            height: 25px;
            position: relative;
            top: 0;
            width: 16px;
            z-index: 200;
            .promptClose {
              font-size: 15px;
              color: #c1c1c1;
              position: relative;
              top: 0;
              border-radius: 100%;
              background-color: white;
            }
          }
        }
        .searchScroll-li:last-child {
          margin-right: 5px;
        }
      }
    }
  }
</style>
