<template>
  <transition name="bounce">
    <div class="lawSearch" id="lawSearch" ref="lawSearch">
      <div class="xa-search" ref="xaSearch">
        <form action="">
          <label for="">
            <input autofocus type="search" placeholder="placeholder" @focus="searchFocus"
                   @blur="searchBlur" v-model="keys" @input="searchInput" @keyup.13="searchList"/>
            <transition name="bounce">
              <i class="icon iconfont icon-X" @click="closeInput" v-show="iconX"></i>
            </transition>
          </label>
          <i class="icon iconfont icon-tripsousuo"></i>
        </form>
      </div>
      <div class="xa-content" v-show="xaContent" :style="{height:heightT}">
        <div class="xa-History">
          <p class="history-title">
            <span class="ac"><i></i><span>最近搜索</span></span>
            <span class="as">清除</span>
          </p>
          <p class="history-button">
            <button v-for="(list,index) in buttonHistory" @click="buttonClick('history',index)">{{list}}</button>
          </p>
        </div>
        <div class="xa-dseOver">
          <p class="history-title">
            <span class="ac"><i></i><span>最近搜索</span></span>
            <span class="as" @click="getHotSearch()">换一批</span>
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
  </transition>
</template>

<script>
  export default {
    name: "law-search",
    data() {
      return {
        keys: '',
        iconX: false,
        xaContent: true,
        heightT: '',
        buttonDseOver: ["上市公司与私募基金合作", "异常波动", "员工持股", "公司债券", "高比例送转", "扶贫工作", "优先股", "独立董事", "证券发行"],
        buttonHistory: ["上市公司与私募基金合作", "异常波动", "员工持股", "公司债券", "高比例送转", "扶贫工作", "优先股", "独立董事", "证券发行"],
        xaAutoCom: false,
        buttonText: '',
        dataAjax: []
      }
    },
    created() {
      this.getHotSearch();
    },
    mounted() {
      /*
      * dom 处理在 mounted方法中
      * */
      this.heightT = (this.$refs.lawSearch.clientHeight - this.$refs.xaSearch.clientHeight) + "px";
      setTimeout(() => {
        this.$nextTick(() => {
          document.querySelector('input').focus();
        })
      }, 300);
    },
    methods: {
      buttonClick(key, index) {
        if (key == 'history') {
          this.keys = this.buttonHistory[index];
        } else if (key == 'dseOver') {
          this.keys = this.buttonDseOver[index];
        } else {

        }
      },
      getHotSearch() {
        this.$http({
          method: 'GET',
          url: this.$api.rule.getHotSearch,
          params: {}
        }).then((res) => {
          if (res.data.returnCode == 1) {
            this.buttonText = res.data.returnObject;
          }
        }).catch((err) => {
        })
      },
      searchBlur() {
        this.iconX = false;
      },
      searchInput() {

      },
      searchFocus() {
        setTimeout(() => {
          this.iconX = true;
        }, 400);
      },
      searchList() {

      },
      closeInput() {

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
    .xa-search {
      height: 100px;
      width: 100%;
      box-sizing: border-box;
      background-color: #f0f1f5;
      form {
        height: 100%;
        box-sizing: border-box;
        padding: 15px 15px;
        position: relative;
        white-space: nowrap;
        label {
          position: relative;
          input {
            width: 89%;
            height: 100%;
            background: #fff;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 30px;
            color: #8d8d8d;
            -webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
          input:focus {
            width: 100%;
            -webkit-transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
          .icon-X {
            font-size: 30px;
            position: absolute;
            right: 24px;
            top: 50%;
            transform: translateY(-50%); /*向左向上分别平移自身的一半*/
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            color: #8d8d8d;
            background-color: white;
          }
        }
        .icon-tripsousuo {
          display: inline-block;
          font-size: 53px;
          margin-left: 20px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%); /*向左向上分别平移自身的一半*/
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
        }

      }
    }
    .xa-content {
      height: auto;
      position: relative;
      .xa-History, .xa-dseOver {
        padding: 20px 15px;
        .history-title {
          display: table;
          width: 100%;
          height: 100px;
          box-sizing: border-box;
          font-size: 0;
          .ac {
            font-size: 30px;
            height: 100%;
            display: table-cell;
            color: #ffb148;
            vertical-align: middle;
            line-height: 1;
            i {
              font-size: 0;
              display: inline-block;
              height: 29%;
              width: 6px;
              background-color: #ffb148;
              float: left;
              margin-right: 6px;
            }
            span {
              display: inline-block;
            }
          }
          .as {
            font-size: 30px;
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
          min-height: 250px;
          max-height: 250px;
          width: 100%;
          overflow: hidden;
          button {
            border: 1px solid #e3e3e3;
            height: 60px;
            box-sizing: border-box;
            padding: 0 20px;
            border-radius: 4px;
            color: #8d8d8d;
            background-color: white;
            margin: 0 30px 20px 0;
            outline: none;
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
            font-size: 30px;
            color: #8d8d8d;
            padding: 0 15px;
            -webkit-transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: background-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
            p {
              padding: 15px 0;
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
