<template>
  <div class="law-lates">
    <!--<box class="view-bar" @click.native="visibility()">个人中心</box>-->
    <box class="xa-scroller">
      <div class="wrapper" ref="wrapper" :style="{height: wrapperHeight + 'px'}">
        <ul class="list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading"
            :infinite-scroll-distance="0">
          <li v-for="(item,index) in contenta" class="listitem">
            <router-link :to="'/lawdetail?id='+item.id">
              <div class="item-border">
                <p class="item-title" v-html="item.title"></p>
                <p class="item-doc">
                  <span v-show="item.referenceNumber">{{item.referenceNumber}}&ensp;|&ensp;</span>
                  <span v-show="item.timeliness">{{item.timeliness}}&ensp;|&ensp;</span>
                  <span v-show="item.publishDate">{{item.publishDate}}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
        <p class="loading">
          <load-more :tip="'正在加载'"></load-more>
          <!--<load-more :show-loading="false" :tip="'我是有底线的'" background-color="#f0f1f5"></load-more>-->
        </p>
      </div>
    </box>
  </div>
</template>

<script>
  import {Box, Drawer, Flexbox, FlexboxItem, LoadMore, ViewBox, XButton} from 'vux'
  import XaHome from '../../components/home'
  export default {
    name: "law-lates",
    data() {
      return {
        showMenu: false,
        drawerVisibility: false,
        showMode: 'push',
        showModeValue: 'push',
        showPlacement: 'left',
        showPlacementValue: 'left',
        /**/
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        results: [],
        value: 'test',
        contenta: [],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0,
        params: {
          pageNo: 1,
          pageSize: 10,
          key: '上市'
        },
        totalPage: '',
        isScrollTop: ''
      }
    },
    watch: {
      '$route': function (to, form, next) {

        if (to.name != form.name) {
          window.sessionStorage.setItem('lawLateScrollBehavior', this.isScrollTop);
        }
      }
    },
    destroyed() {
    },
    beforeDestroy() {
    },
    components: {
      Box, XButton, LoadMore, Drawer, Flexbox,
      FlexboxItem, ViewBox, XaHome
    },
    created() {
      this.lawSearch();
    },
    mounted() {
      this.$nextTick(() => {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        // 监听 滚动
        this.$refs.wrapper.addEventListener('scroll', (e) => {
          e.stopPropagation();
          this.isScrollTop = this.$refs.wrapper.scrollTop;
          console.log(this.isScrollTop);
        });
        //
        this.$refs.wrapper.scrollTo();
      })
    },
    methods: {
      visibility() {
        this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: true});
      },
      lawSearch() {
        this.$http({
          method: 'GET',
          url: this.$api.rule.lawSearch,
          params: this.params
        }).then((res) => {
          if (res.data.returnCode == 1) {
            // 根据总条数 判断有多少页
            this.totalPage = this.$array.totalPage(res.data.returnObject.count, this.params.pageSize);
            // 控制下拉刷新
            this.contenta = this.$array.loadMore(this.contenta, res.data.returnObject.list);
            //
            console.log(this.contenta, this.totalPage, this.params.pageNo);
          }
        }).catch((err) => {

        })
      },
      loadMore() {
        // if (this.params.pageNo < this.totalPage) {
        //   this.loading = true;
        // } else {
        //   this.loading = false;
        // }
        this.loading = true;
        setTimeout(() => {
          if (this.params.pageNo < this.totalPage) {
            this.params.pageNo += 1;
            this.lawSearch();
          }
          this.loading = false;
        }, 500);
      }
    }
  }
</script>

<style lang="scss">
  .law-lates {
    width: 100%;
    height: 100%;
    position: relative;
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
    .header {
      height: 44px;
      width: 100%;
      padding: 7.5px 12px 7.5px 7.5px;
      z-index: 1000;
      div {
        background-color: white;
        height: 100%;width: 100%;
        border-radius: 2px;
        text-align: center;
        line-height: 28px;
        font-size: 15px;
        i {
          font-size: 17.5px;
        }
        span {
          padding-left: 4px;
          line-height: 1;
        }
      }
    }
    .weui-btn:after {
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    .view-bar {
      position: absolute;
      left: 0;
      top: 61.8%;
      z-index: 100;
      width: 25px;
      background-color: rgba(0, 0, 0, 0.7);
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      padding: 5px 5px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      opacity: 1;
    }
    .xa-scroller {
      width: 100%;
      height: 100%;
      position: relative;
      .wrapper {
        // overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
        .list {
          -webkit-text-size-adjust: 100%;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          background-color: white;
          .listitem {
            width: 100%;
            background-color: white;
            padding: 12px 12px 0 12px;
            font-size: 15px;
            .item-border {
              padding-bottom: 7.5px;
              border-bottom: 1px solid #f0f1f5;
              -webkit-transform: scale(1);
              transform: scale(1);
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              .item-title {
                padding-bottom: 2.5px;
                text-align: justify;
              }
              .item-doc {
                font-size: 12px;
                color: #aeaeae;
              }
            }
          }
          .listitem:active {
            background-color: #f0f1f5;
          }
        }
        .loading {
          .weui-loadmore {
            .weui-loading {
              height: 20px;
              width: 20px;
              .weui-loadmore__tips {
                color: #aeaeae;
              }
            }
          }
        }
      }
    }
  }
</style>
