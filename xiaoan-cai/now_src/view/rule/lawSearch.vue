<template>
  <div class="lawSearch" id="lawSearch" ref="lawSearch">
    <div class="xa-search border-bottom" ref="xaSearch">
      <form action="" onsubmit=" return false">
        <div class="xa-input">
          <input ref="inputDom" @click="inputClick" type="text" v-model.trim="keys" @keyup.13="goLink()"
                 :placeholder="placeholder"/>
          <i class="icon iconfont icon-X" v-show="keys.length != 0" @click="clearVal()"></i>
        </div>
      </form>
    </div>
    <div class="xa-content" v-show="xaContent" :style="{height:heightT+'px'}">
      <div class="xa-History">
        <p class="history-title">
          <span class="ac"><i></i><span>最近搜索</span></span>
          <span class="as"><span @click="removeHistory">清除<i class="icon iconfont icon-shanchu"></i></span></span>
        </p>
        <p class="history-button">
          <button class="" v-for="(list,index) in buttonHistory" @click="buttonClick('history',index)">{{list}}</button>
        </p>
      </div>
      <div class="xa-dseOver">
        <p class="history-title">
          <span class="ac"><i></i><span>最近搜索</span></span>
          <span class="as"><span @click="getHotSearch()">换一批<i class="icon iconfont icon-huanyipi2"></i></span></span>
        </p>
        <p class="history-button">
          <button v-for="(list,index) in buttonDseOver" @click="buttonClick('dseOver',index)">{{list}}</button>
        </p>
      </div>
      <transition name="bounce">
        <div class="xa-autoCom" v-show="xaAutoCom">
          <ul>
            <li v-for="(list,index) in buttonText"><p>{{list}}</p></li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import XButton from "vux/src/components/x-button/index";
  import {Search, Toast} from 'vux'

  export default {
    components: {
      XButton, Search, Toast
    },
    name: "law-search",
    data() {
      return {
        iconX: false,
        xaContent: true,
        heightT: '',
        buttonDseOver: [],
        buttonHistory: [],
        buttonText: [],
        xaAutoCom: false,
        dataAjax: [],
        results: [],
        keys: '',
        placeholder: "搜索法规名称，多个关键字空格隔开"
      }
    },
    created() {
      this.getHotSearch();
      this.$nextTick(() => {
        this.buttonHistory = this.$storage.getLocalStorage('lawHistory');
        console.log('123', this.buttonHistory);
      })
    },
    activated() {
      this.getHotSearch();
      this.$nextTick(() => {
        this.buttonHistory = this.$storage.getLocalStorage('lawHistory');
        console.log('123', this.buttonHistory);
      });
      setTimeout(() => {
        this.$refs.inputDom.focus();
      }, 1000)
    },
    mounted() {
      /*
      * dom 处理在 mounted方法中
      * */
      this.$nextTick(() => {
        this.heightT = (this.$refs.lawSearch.clientHeight - this.$refs.xaSearch.clientHeight);
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.inputDom.focus();
          })
        }, 1300);
      });
    },
    methods: {
      clearVal() {
        this.keys = '';
        this.$nextTick(() => {
          this.$refs.inputDom.focus();
        })
      },
      removeHistory() {
        window.localStorage.removeItem('lawHistory');
        this.$nextTick(() => {
          this.buttonHistory = this.$storage.getLocalStorage('lawHistory');
          console.log('123', this.buttonHistory);
        })
      },
      inputClick() {
        this.$nextTick(() => {
          this.$refs.inputDom.focus();
        })
      },
      //
      setlocalStorage() {
        let storage = this.$storage.getLocalStorage('lawHistory');

        storage.unshift(this.keys);
        storage = this.$array.unique(storage);
        storage = this.$array.ImpArr(storage);
        this.$storage.setLocalStorage('lawHistory', storage, false);
      },
      //
      goLink() {
        if (this.keys.trim()) {
          this.$nextTick(() => {
            this.setlocalStorage();
          });
          this.$router.push({path: '/lawlist', query: {titleIncludes: this.keys}});
        } else {
          console.log('没有输入的值');
        }
      },
      //
      buttonClick(key, index) {
        if (key == 'history') {
          this.keys = this.buttonHistory[index];
        } else if (key == 'dseOver') {
          this.keys = this.buttonDseOver[index];
        }
        this.goLink();
      },
      //
      getHotSearch() {
        this.$http({
          method: 'GET',
          url: this.$api.rule.getHotSearch,
          params: {}
        }).then((res) => {
          if (res.data.returnCode == 1) {
            this.buttonDseOver = res.data.returnObject;
          }
        }).catch((err) => {
        })
      }
    }
  }
</script>

<style lang="scss">
  .lawSearch {
  }
  #lawSearch {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: white;
    .xa-search {
      height: 44px;
      width: 100%;
      box-sizing: border-box;
      background-color: #f0f1f5;
      overflow: hidden;
      position: relative;
      form {
        font-size: 0;
        height: 100%;
        width: 100%;
        padding: 7.5px 12px;
        .xa-input {
          height: 100%;
          width: 100%;
          position: relative;
          input {
            width: 100%;
            height: 100%;
            background-color: white;
            font-size: 15px;
            color: #545454;
            padding: 0 28px 0 7.5px;
          }
          i {
            font-size: 15px;
            line-height: 1;
            position: absolute;
            color: rgba(0, 0, 0, 0.5);
            right: 7.5px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .xa-content {
      height: auto;
      position: relative;
      .xa-History, .xa-dseOver {
        padding: 10px 12px;
        .history-title {
          display: table;
          width: 100%;
          height: 50px;
          box-sizing: border-box;
          font-size: 0;
          .ac {
            font-size: 15px;
            height: 100%;
            display: table-cell;
            color: #ffb148;
            vertical-align: middle;
            line-height: 1;
            i {
              font-size: 0;
              display: inline-block;
              height: 29%;
              width: 3px;
              background-color: #ffb148;
              float: left;
              margin-right: 3px;
            }
            span {
              display: inline-block;
            }
          }
          .as {
            font-size: 15px;
            height: 100%;
            line-height: 1;
            display: table-cell;
            color: #ffb148;
            vertical-align: middle;
            text-align: right;
            -webkit-transition: color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: color 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
          .as:active {
            color: rgba(255, 170, 72, 0.5);
            -webkit-transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
        }
        .history-button {
          min-height: 110px;
          max-height: 110px;
          width: 100%;
          overflow: hidden;
          button {
            font-size: 15px;
            border: 1px solid #D9D9D9;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(1);
            transform: scaleY(1);
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 30px;
            padding: 0 10px;
            border-radius: 2px;
            color: #8d8d8d;
            background-color: white;
            margin: 0 15px 10px 0;
            outline: none;
          }
          button:last-child {
            margin-right: 0;
          }
          button:active {
            background-color: #f0f1f5;
          }
        }
      }
      .xa-dseOver {
        padding-top: 0;
        .history-title {
          border-top: 1px solid #f0f1f5;
        }
      }
      .xa-autoCom {
        position: absolute;
        background-color: white;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        ul {
          outline: none;
          width: 100%;
          height: 100%;
          padding: 0 0 0 0;
          background-color: white;
          box-shadow: 0 0 1px white;
          li {
            outline: none;
            font-size: 15px;
            color: #8d8d8d;
            padding: 0 12px;
            -webkit-transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
            p {
              padding: 7.5px 0;
              border-bottom: 1px solid #f0f1f5;
              -webkit-transition: border-bottom 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-bottom 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
          li:active {
            background-color: #f0f1f5;
            -webkit-transition: background-color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: background-color 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
            p {
              border-bottom: 1px solid rgba(0, 0, 0, 0);
              -webkit-transition: border-bottom 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
              transition: border-bottom 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
          }
        }
      }
    }
  }
</style>
