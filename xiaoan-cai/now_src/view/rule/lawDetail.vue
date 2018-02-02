<template>
  <div class="law-details" ref="windowHeight">
    <!--<div class="view-bar" @click="visibility()">个人中心</div>-->
    <header class="lawdetails-header" v-show="AllTitle">
      <p>{{this.$route.meta.title}}</p>
    </header>
    <!---->
    <div id="law-details-right-popup" v-transfer-dom>
      <popup v-model="popupRight" position="right" width="61.8%">
        <box class="warp-scroll" ref="popupwarp">
          <header class="" :style="{height: paddingTop + 'px' }">{{this.$route.meta.title}}</header>
          <p></p>
        </box>
      </popup>
    </div>
    <!---->
    <div id="law-details-bottom-popup" v-transfer-dom>
      <popup v-model="popupBottom">
        <div class="warp-scroll">
          <group>
            <x-switch title="Multi Popup (first)" v-model="popupBottom"></x-switch>
            <x-switch title="Multi Popup (second)" v-model="popupBottom"></x-switch>
          </group>
        </div>
      </popup>
    </div>
    <!---->
    <div class="details-color border-bottom">
      <tab v-model="isSelected" :line-width="2" :custom-bar-width="getBarWidth" @on-before-index-change="switchTabItem">
        <tab-item @click.native="visibility" disabled>
          <i class="icon iconfont icon-shouye1"></i>
        </tab-item>
        <tab-item v-for="(list, index) in itemBtn" :key="index" @click.native="colorClick(index)">
          <i class="icon iconfont" :class="list.typeData"></i>
        </tab-item>
        <tab-item @click.native="popupBottomClick" disabled>
          <i class="icon iconfont icon-xiangguan"></i>
        </tab-item>
        <tab-item @click.native="popupRightClick" disabled>
          <i class="icon iconfont icon-caidan"></i>
        </tab-item>
      </tab>
    </div>
    <div class="law-content" ref="contentabs" :style="{height: contentHeader + 'px'}" :class="addColor"
         @click="maskClick()">
      <div class="lwa-contentABS" v-html="this.content.content"></div>
    </div>
    <!--<div class="all-shdow" v-show="AllTitle" @click="maskClick()"></div>-->
    <footer></footer>
  </div>
</template>

<script>
  import {Box, Flexbox, FlexboxItem, Group, Popup, Tab, TabItem, TransferDom, XButton, XSwitch} from 'vux'
  export default {
    name: "law-details",
    data() {
      return {
        content: {},
        isSelected: 1,
        contentHeader: '',
        AllTitle: false,
        paddingTop: '',
        itemBtn: [
          {id: 0, type: 'daylight', typeData: 'icon-baitianmoshi', name: '白天', isActive: true},
          {id: 1, type: 'darkness', typeData: 'icon-yejianmoshi-copy', name: '夜晚', isActive: false},
          {id: 2, type: 'EyeCare', typeData: 'icon-huyanmoshi', name: '护眼', isActive: false}
        ],
        itemColor: {backgroundColor: '', color: ''},
        addColor: 'daylight',
        popupRight: false,
        popupBottom: false,
        getBarWidth: function (index) {
          return (1) * 26 + 'px'
        },
        isScrollTop: ''
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Tab, TabItem, Box, XButton, Flexbox, FlexboxItem, Group, XSwitch, Popup
    },
    activated() {
      if (window.localStorage.getItem('lawDetail') === this.$route.query.id) {
        console.log('有缓存');
      } else {
        window.localStorage.setItem('lawDetail', this.$route.query.id);
        // this.$vux.loading.show({text: 'loading'});
        this.getDetails();
        this.AllTitle = false;
      }
      // 更新数据
      // console.log('324324234');
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
      })
    },
    destroyed() {
      // this.
      this.$vux.loading.hide();
    },
    watch: {
      "$route": function (to, form) {
      },
      "popupRight": function () {
        for (let i in this.itemBtn) {
          if (this.addColor == this.itemBtn[i].type) {
          }
        }
        console.log(this.addColor);
      }
    },
    beforeCreate() {

    },
    created() {
      // this.$vux.loading.show({text: 'loading'});
      this.getDetails();
    },
    mounted() {
      // console.log('3242423', document.documentElement.clientHeight)
      // console.log('13231323', this.$refs.windowHeight.clientHeight);
      // console.log('1323', this.$refs.contentabs.offsetTop);
      this.$nextTick(() => {
        // 监听 滚动
        this.$refs.contentabs.addEventListener('scroll', (e) => {
          e.stopPropagation();
          this.isScrollTop = this.$refs.contentabs.scrollTop;
          console.log(this.isScrollTop);
        });
        // 计算距离
        this.paddingTop = document.body.clientHeight - this.$refs.windowHeight.clientHeight;
        this.contentHeader = (this.$refs.windowHeight.clientHeight - this.$refs.contentabs.offsetTop - 1);
      })

    },
    methods: {
      visibility() {
        console.log(213321313);
        this.$store.commit('UPDATE_HOMESHOW', {isHomeShow: true});
      },
      switchTabItem(index) {
        console.log('on-before-index-change', index)
        // this.$vux.loading.show({text: 'loading'})
        setTimeout(() => {
          this.$vux.loading.hide()
          this.isSelected = index
        }, 1000)
      },
      popupRightClick() {
        this.popupRight = true;
      },
      popupBottomClick() {
        this.popupBottom = true;
      },
      colorClick(index) {
        this.$nextTick(() => {
          // console.log(this.itemBtn[index]);
          this.addColor = this.itemBtn[index].type;
          //  console.log('3234', this.itemColor);
        })

      },
      maskClick() {
        console.log('121212');
        this.AllTitle == true ? this.AllTitle = false : this.AllTitle = true;
      },
      getDetails() {
        this.$http({
          method: "GET",
          url: this.$api.rule.getDetails,
          params: {
            id: this.$route.query.id,
            type: 'law'
          }
        }).then((res) => {
          console.log(res);
          if (res.data.returnCode === 1) {
            this.content = res.data.returnObject;
            // 异步等数据渲染后处理
            this.$nextTick(() => {
              document.title = this.content.title;
              this.$route.meta.title = this.content.title;
              console.log('123title', this.$route.meta.title);
              $('.lwa-contentABS table').wrap('<div class="new-wrap"><div class="new-scroll"></div></div>');
              // 处理完成后 1s 调用关闭 loading
              setTimeout(() => {
                this.$vux.loading.hide();
              }, 1500)
            })
          }
        }).catch((err) => {
        })
      }
    }
  }
</script>

<style lang="scss">
  #law-details-right-popup {
    .vux-popup-dialog.vux-popup-right {
      background-color: white;
      .warp-scroll {
        min-height: 100%;
        width: 100%;
        background-color: white;
      }
    }
  }
  #law-details-bottom-popup {
  }
  .law-details {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    .view-bar {
      position: absolute;
      left: 0;
      top: 61.8%;
      z-index: 3000;
      width: 25px;
      background-color: rgba(0, 0, 0, 0.7);
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      padding: 5px 5px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      opacity: 1;
    }
    .all-shdow {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      z-index: 600;
    }

    .lawdetails-header {
      width: 100%;
      position: absolute;
      top: 0;left: 0;
      padding: 12px 12px;
      font-size: 20px;
      color: white;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.8);
      p {
        text-align: justify;
      }
    }
    .details-color {
      height: 36px;
      .vux-tab {
        height: 36px;
        background-color: #f0f1f5;
        .vux-tab-item {
          line-height: 36px;
        }
        .vux-tab-selected {
          color: #ffbc61;
          border-bottom-color: #ffbc61;
        }
        .vux-tab-ink-bar {
          .vux-tab-bar-inner {
            background-color: #ffbc61;
          }
        }
        .vux-tab-disabled {
          color: #545454;
        }
      }
    }
    .daylight {
      background-color: white;
      color: #545454;
      -webkit-transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .darkness {
      background-color: rgba(0, 0, 0, 0.5);
      color: #FFFFFF;
      -webkit-transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .EyeCare {
      background-color: rgba(204, 232, 207, 1);
      color: rgba(0, 0, 0, 0.5);
      -webkit-transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      //  color: rgba(255, 255, 255, 1);
    }
    .law-content {
      min-height: 100%;
      width: 100%;
      font-size: 16px;
      -webkit-transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .lwa-contentABS {
        width: 100%;
        padding: 12px;
        text-align: justify;
        * {
          font-size: 16px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          margin: 5px 0;
          line-height: 20px;
          font-weight: normal;
        }
        p {
          margin: 10px 0 0 0;
          text-align: justify;
          box-sizing: border-box;
          text-indent: 2em;
          word-break: break-all;
          line-height: 28px;
        }
        h1, h1 * {
          font-weight: 500;
          padding: 0;
          margin: 0;
          line-height: 25px;
          text-align: center;
        }
        h1 {
          padding: 10px 0 0 0;
        }
        h1 + p {
          margin: 0;
        }
        div {
        }
        h2, h2 * {
          margin: 5px 0 0 0;
          font-weight: 500;
        }
        h3, h3 * {
          box-sizing: border-box;
          margin: 5px 0 5px 0;
          font-weight: 500;
        }
        h4, h4 * {
          border-radius: 2px;
          margin: 5px 0;
          text-indent: 2em;
          text-decoration: line-through;
          font-weight: 500;
        }
        h5, h5 * {
          margin: 0;
          text-align: right;
          font-weight: normal;
        }
        h6, h6 * {
          font-size: 14px;
          font-style: oblique;
          margin: 15px 0;
        }
        a {
          text-decoration: none;
          word-wrap: break-word;
        }
        a:hover, a:visited, a:link, a:active {
          color: #3D3DF2;
          text-decoration: none;
        }
        p cite, p cite * {
          color: #3D3DF2;
          font-style: italic;
        }
        img {
          width: 100%;
        }
        i {
          font-style: normal;
        }
        .new-wrap {
          width: 100%;
          overflow: hidden;
          .new-scroll {
            box-sizing: border-box;
            height: auto;
            overflow-x: scroll;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            table {
              min-width: 200%;
              border-collapse: collapse;
              tr {
              }
              td {
                border: 1px solid #8d8d8d;
              }
              p {
                text-indent: 0;
                margin: 0;
                line-height: 1.1;
                padding: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
