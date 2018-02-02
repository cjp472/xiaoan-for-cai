<template>
  <div class="lawlist" ref="componentDom">
    <div class="lawlist-header border-bottom">
      <button class="lawlist-head-list" @click="getHome()">
        <i class="icon iconfont icon-shouye1"></i>
      </button>
      <button class="lawlist-head-btn">
        <div class="searchScroll-infinite">
          <ul class="searchScroll-ul">
            <li class="searchScroll-li" v-for="i in 7">
              <span>{{params.key + i}}</span>
              <i class="icon iconfont promptClose icon-X" @click=""></i>
            </li>
          </ul>
        </div>
      </button>
    </div>
    <div class="lawlist-nav border-bottom">

    </div>
    <div class="lawlist-content" ref="scrollbox" :style="{height:scrollHeight+'px'}">
      <ul class="list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" :infinite-scroll-distance="0">
        <li v-for="(item,index) in lawcontent" class="listitem" @click="linkDetail(index)">
          <div class="item-border border-bottom">
            <p class="item-title" v-html="item.title"></p>
            <p class="item-doc">
              <span v-show="item.referenceNumber">{{item.referenceNumber}}&ensp;|&ensp;</span>
              <span v-show="item.timeliness">{{item.timeliness}}&ensp;|&ensp;</span>
              <span v-show="item.publishDate">{{item.publishDate}}</span>
            </p>
          </div>
        </li>
      </ul>
      <p class="loading">
        <load-more :tip="'正在加载'"></load-more>
        <!--<load-more :show-loading="false" :tip="'我是有底线的'" background-color="#f0f1f5"></load-more>-->
      </p>
    </div>
  </div>
</template>

<script>
  import {Box, Drawer, Flexbox, FlexboxItem, Loading, LoadMore, Radio, Scroller, Search, ViewBox, XButton} from 'vux'
  export default {
    computed: {},
    data() {
      return {
        scrollHeight: '',
        loading: false,
        lawcontent: [],
        totalPage: 0,
        params: {
          pageNo: 1,
          pageSize: 10,
          key: '上市'
        }
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
      Scroller,
      LoadMore
    },
    activated() {
      this.params.key = decodeURI(this.$route.query.titleIncludes);
      if (window.localStorage.getItem('lawDetail') === this.$route.query.titleIncludes) {
        console.log('有缓存');
      } else {
        this.params.pageNo = 1;
        this.lawcontent = [];
        window.localStorage.setItem('lawDetail', this.$route.query.titleIncludes);
        this.lawSearch();
      }
    },
    created() {
      this.params.key = this.$route.query.titleIncludes;
      this.lawSearch();
    },
    methods: {
      getHome() {
        this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: true});
      },
      linkDetail(index) {
        this.$router.push({path: '/lawDetail', query: {id: this.lawcontent[index].id}});
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
            this.lawcontent = this.$array.loadMore(this.lawcontent, res.data.returnObject.list);
            //
            console.log(this.lawcontent, this.totalPage, this.params.pageNo);
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
    },
    mounted() {
      this.$nextTick(() => {
        this.scrollHeight = this.$refs.componentDom.clientHeight - this.$refs.scrollbox.offsetTop;
        // console.log('1212121', this.$refs.scrollbox.clientWidth);
        // this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: true});
      })
    }
  }
</script>

<style lang="scss">
  .lawlist {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .lawlist-nav {
      height: 30px;
      background-color: #f0f1f5;
    }
    .lawlist-header {
      width: 100%;
      height: 50px;
      padding: 7.5px;
      background-color: #f0f1f5;
      font-size: 0;
      display: flex;
      text-align: center;
      align-items: center;
      position: relative;
      /*flex-direction: column;*/
      flex-wrap: wrap;
      .lawlist-head-list {
        width: 12.5%;
        height: 100%;
        border: 0;
        background-color: white;
        flex: 0 0 12.5%;
        margin-right: 2.5%;
      }
      .lawlist-head-btn {
        width: 85%;
        height: 100%;
        border: 0;
        background-color: white;
        flex: 0 0 85%;
      }
      .vux-flexbox {
        height: 100%;
        .vux-flexbox-item {
          height: 100%;
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
      .newhome {
        width: 20%;
        font-size: 15px;
        height: 100%;
        background-color: white;
        border: 0;
      }
      .searchScroll-infinite {
        height: 35px;
        width: 100%;
        padding: 5px 5px;
        background-color: white;
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
          -webkit-overflow-scrolling: touch;
          .searchScroll-li {
            background-color: #fff2e1;
            border-radius: 2px;
            color: #8d8d8d;
            font-weight: lighter !important;
            display: inline-block !important;
            height: 25px;
            font-size: 15px;
            line-height: 25px;
            z-index: 170;
            margin-right: 8px;
            padding: 0 5px;
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
            margin-right: 0;
          }
        }
      }
    }
    .lawlist-content {
      background-color: white;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
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
</style>
