<template>
  <div class="search" id="search" ref="searchDom">
    <div class="searchs">
      <div class="seabox">
        <form action="" onsubmit=" return false;">
          <input ref="ipvtextDom" id="ipvtext" type="search" class="text" :placeholder="placeholder"
                 @blur="searchBlur()" v-model="titleIncludes" @input="searchInput()" @keyup.13="searchList()"/>
          <i class="icon iconfont icon-X closeInputVals " @click="closeInputVal()"
             v-show="titleIncludes.length != 0"></i>
        </form>
      </div>
      <div class="" @click="searchList()"><i class="icon iconfont icon-tripsousuo"></i></div>
    </div>
    <div class="groupDsearch" :style="{height:perHeight+'px'}" ref="groupDom">
      <!--最近搜索-->
      <div class="dsearch">
        <div class="dseText" id="dseText"><span class="dsearchbox"></span>{{dsearch}}</div>
        <div class="dseClear" @click="dseClear()">
          <span>{{cleartext}}&nbsp;</span>
          <i class="icon iconfont icon-shanchu"></i>
        </div>
      </div>
      <div class="HistoryS" v-show="HistoryS">{{HistoryText}}</div>
      <div class="dseResult dseMixHeight" v-show="!HistoryS">
        <button type="button" v-for="(list,index) in Newarr" @click="dseResultOne(index)">
          {{newBtnArr(list)}}
        </button>
        <div class="desResBox"></div>
      </div>
      <!--相关推荐-->
      <div class="dsearch dseOver">
        <div class="dseText">
          <span class="dsearchbox"></span>{{hotSearch}}
        </div>
        <div class="dseClear" @click="getHotSearch()">
          <span>{{InAbatch}}&nbsp;</span>
          <i class="icon iconfont icon-huanyipi2"></i>
        </div>
      </div>
      <div class="dseResult dseResultDsearch">
        <button type="button" v-for="(list,index) in hotResult" @click="dseResultTwo(index)">
          {{list}}
        </button>
        <xiaoan-loading v-show="showLoading" borderWidth="2px" width="18px"></xiaoan-loading>
      </div>
    </div>
    <!--提示搜索-->
    <ul class="prestrains" id="preStar" v-show="prestrains" :style="{height:perHeight+'px'}">
      <li v-for="(list,index) in prestrain" @click="toRuleClick(index)">
        <p class="prestrains_div" v-html="key(list.title)"></p>
      </li>
    </ul>
  </div>
</template>

<script>
  import loading from "../../components/warning/loading.vue"

  export default {
    name: 'search',
    data() {
      return {
        close: '../../static/img/personal/collect/close.png',
        loading: '../../static/img/rules/loading.gif',
        promptclose: '../../static/img/rules/promptclose.png',
        clear: '../../static/img/rules/clear.png',
        InABatch: '../../static/img/rules/InABatch.png',
        titleIncludes: '',
        dsearch: "最近搜索",
        hotSearch: '热门推荐',
        InAbatch: '换一批',
        cleartext: '清除',
        HistoryText: "您还没有历史记录！",
        value: '',
        values: "",
        prestrain: [],
        placeholder: "搜索法规名称，多个关键字空格隔开",
        defaultResult: [],
        hotResult: [],
        Newarr: [],
        showLoading: false,
        prestrains: false,
        HistoryS: true,
        perHeight: '',
        ruleKeyword: {}
      }
    },
    watch: {},
    components: {
      'xiaoan-loading': loading
    },
    created() {
      //
      this.getHotSearch();
      this.Newarr = this.$storage.localStorage.get('rule-history');
      if (this.Newarr.length == 0) {
        this.HistoryS = true;
      } else {
        this.HistoryS = false;
      }
      //
      console.log('1234567', this.$storage.localStorageAll('rule-history'));
    },
    mounted() {
      this.$nextTick(() => {
        this.perHeight = this.$refs.searchDom.clientHeight - this.$refs.groupDom.offsetTop;
        setTimeout(() => {
          this.$refs.ipvtextDom.focus();
          this.$refs.ipvtextDom.addEventListener('click', function (event) {
            (this || delegate.obj).focus();
          }, false);
        }, 2000)
      })
    },
    methods: {
      // 存储搜索参数
      storage(key) {
        this.$nextTick(() => {
          let newkey = {
            pageNo: 1, // 页码
            pageSize: 10, // 每页行数
            unitIds: '', // 发文单位
            timelinessIds: '', // 时效性
            sortType: '', // 搜索排序，时间排序time
            releaseStart: '', // 发布日期（起）
            releaseEnd: '', // 发布日期（止）
            scopeId: '',
            cateIds: '', // 分类ID
            titleIncludes: '', // 标题包含
            titleExcludes: '', // 标题不包含
            titleMaybeIncludes: '', // 标题可能包含
            fullTextIncludes: '', // 正文包含
            fullTextExcludes: '', // 正文不包含
            fullTextMaybeIncludes: '', // 正文可能包含
            type: "law", // 类型, law, case, qa, 默认是law
            key: "" // key 暂时不启用
          }
          if (window.localStorage.getItem('rule-keyword')) {
            // 有
            let ruleKeyword = this.$storage.localStorage.get('rule-keyword');
            ruleKeyword.titleIncludes = key;
            let winnew = window.JSON.stringify(ruleKeyword);
            this.$storage.localStorage.set('rule-keyword', winnew)
          } else {
            // 没有
            newkey.titleIncludes = key;
            let winnew = window.JSON.stringify(newkey)
            this.$storage.localStorage.set('rule-keyword', winnew)
          }
        })
      },
      //
      newBtnArr(str) {
        if (str.length >= 10) {
          return (str.substring(0, 10) + '...')
        } else {
          return str
        }
      },
      // 获取热门推荐
      getHotSearch() {
        this.$http({
          method: "GET",
          url: this.$api.host + "getHotSearch",
          params: {}
        }).then((res) => {
          if (res.data.returnCode === 1) {
            this.hotResult = res.data.returnObject;
          }
        }).catch((err) => {
          console.error(err);
        });
      },
      // 存储 history
      history(name, value) {
        if (window.localStorage.getItem(name)) {
          // you
          let ruleHistory = this.$storage.localStorageAll(name);
          ruleHistory.unshift(value);
          ruleHistory = this.$array.unique(ruleHistory);
          if (ruleHistory.length >= 20) {
            ruleHistory.slice(0, 20);
          }
          this.$storage.localStorageSystem(name, ruleHistory);
          // console.log('123213', ruleHistory);
        } else {
          // meiyou
          let ruleHistory = [];
          ruleHistory.unshift(value);
          console.log('23123123213', ruleHistory, value);
          this.$storage.localStorageSystem('rule-history', ruleHistory);
        }
      },
      // 点击按钮搜索
      searchList() {
        let value = this.$array.ImpArr(this.titleIncludes.split(' '));
        this.storage(value.join(','));
        // 存储 history
        this.history('rule-history', (value.join(' ')));
        //
        if (this.titleIncludes.trim().length != 0) {
          this.$router.push({path: '/ruleslist', query: {titleIncludes: value.join(',')}});
        }
      },
      // 搜索
      searchInput() {
        this.titleIncludes = this.$array.ltrim(this.titleIncludes);
        let value = this.titleIncludes;
        this.autoComplete(value);
      },
      //
      autoComplete(value) {
        this.$http({
          method: "GET",
          url: this.$api.host + "law/autoComplete",
          params: {
            title: value
          }
        }).then((res) => {
          if (res.data.returnObject.length == 0) {
            this.prestrains = false;
            this.prestrain = [];
          } else {
            this.prestrain = res.data.returnObject;
            this.prestrains = true;
          }
          // 关键词高亮
        }).catch((err) => {
          console.error(err);
        });
      },
      // 高亮方法
      key(str) {
        let star = [];
        star = this.titleIncludes.trim().split(" ");
        for (let i = 0; i < star.length; i++) {
          if (star[i] == "" || typeof (star[i]) == "undefined" || star[i] == 0 || star[i] == 1 || star[i] == 2 || star[i] == 3 || star[i] == 4 || star[i] == 5 || star[i] == 6 || star[i] == 7 || star[i] == 8 || star[i] == 9) {
            star.splice(i, 1);
            i = i - 1;
          }
        }
        // *console.log("432453", star);*/
        for (let i = 0; i < star.length; i++) {
          let fen = str.split(star[i]);
          str = fen.join('<span style="color:#ffc051;">' + star[i] + '</span>');
        }
        return str;
      },
      // input失去焦点
      searchBlur() {
        if (this.titleIncludes.length === 0) {
          this.titleIncludes = "";
          $('.groupDsearch').show();
          this.prestrains = false;
        }
      },
      // 搜索的预提示
      toRuleClick(index) {
        let value = this.$array.ImpArr(this.titleIncludes.split(' '));
        this.storage(value.join(','));
        // 存储 history
        this.history('rule-history', (value.join(' ')));
        //
        this.$refs.ipvtextDom.blur();
        //
        setTimeout(() => {
          this.$router.push({path: '/rulesCount', query: {id: this.prestrain[index].id}});
        }, 500)
      },
      // 清除按钮
      dseClear() {
        this.$storage.localStorage.del("HistorySearch");
        this.Newarr = [];
        this.HistoryS = true;
      },
      // 最近搜索按钮
      dseResultOne(index) {
        this.titleIncludes = this.Newarr[index];
        this.searchInput();
        this.$refs.ipvtextDom.focus();
      },
      // 相关推荐按钮
      dseResultTwo(index) {
        this.titleIncludes = this.hotResult[index];
        this.searchInput();
        this.$refs.ipvtextDom.focus();
      },
      // input清除按钮
      closeInputVal() {
        this.titleIncludes = '';
        this.prestrains = false;
        this.$refs.ipvtextDom.focus();
      }
    }
  }
</script>
<style lang="scss">
  .search {
    height: 100%;
    width: 100%;
    background-color: white;
    overflow: hidden;
  }
  #search {
    .searchs {
      width: 100%;
      height: 50px;
      background: #f0f1f5;
      padding: 7.5px 12px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .seabox {
        // width: expression(document.body.clientWidth<600?"600px":"auto");
        width: 90%;
        height: 100%;
        position: relative;
        background: white;
        border-radius: 2px;
        overflow: hidden;
        form {
          input {
            width: 92%;
            height: 100%;
            background: #fff;
            color: #8d8d8d;
            display: inline-block;
            box-sizing: border-box;
            -webkit-appearance: none;
            border-radius: 2px;
            border: 0;
            font-size: 15px;
            padding: 7px 8px;
            outline: none;
          }
          input[type=search]::-webkit-search-cancel-button {
            -webkit-appearance: none; /*//此处就是去掉默认的小×*/
          }
          input::-webkit-input-placeholder {
            font-weight: lighter !important;
          }
          i {
            color: #c1c1c1;
          }
        }
      }
      div {
        .icon-tripsousuo {
          font-size: 26px;
          color: #8d8d8d;
        }
      }
    }
    .groupDsearch {
      padding-top: 10px;
      box-sizing: border-box;
      .dsearch {
        height: 45px;
        line-height: 45px;
        padding: 0 12px;
        box-sizing: border-box;
        background-color: white;
        z-index: 20;
        .icon-shanchu, .icon-huanyipi2 {
          font-size: 16px;
        }
        .dseText {
          font-size: 15px;
          color: #ffb148;
          display: inline-block;
          height: 45px;
        }
        .dseClear {
          display: inline-block;
          float: right;
          height: 45px;
          font-size: 15px;
          color: #ffb148;
          img {
            float: right;
            padding: 14.5px 0 0 3px;
            height: 15px;
            width: 15px;
            margin-top: 1px;
          }
          * {
            color: #ffb148;
          }
        }
        .dseClear:active {
          /*background-color: #f0f1f5;*/
          opacity: 0.4;
        }
        .dsearchbox {
          display: inline-block;
          height: 15px;
          width: 2px;
          background-color: #ffb148;
          float: left;
          margin: 15px 3px 16px 0;
        }

      }
      .dseOver {
        border-top: 1px solid #f0f1f5;
      }
      .HistoryS {
        padding: 10px 0 24px 0;
        text-align: center;
        font-size: 15px;
        color: #8d8d8d;
      }
      .dseResult {
        padding: 1px 12px 0 12px;
        box-sizing: border-box;
        position: relative;
        button {
          display: inline-block;
          height: 30px;
          text-align: center;
          padding: 0 10px;
          font-size: 13px;
          border: 1px solid #e3e3e3;
          background-color: white;
          border-radius: 2px;
          color: #8d8d8d;
          margin: 0 10px 9px 0;
          z-index: 100;
          -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        button:last-child {
          margin-right: 0 !important;
        }
        button:active {
          background-color: #f0f1f5;
          border-color: #f0f1f5;
          -webkit-transition: background-color 0s cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: background-color 0s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .desResBox {
          padding-right: 12px;
        }
      }
      .dseResultDsearch {
        height: 180px;
      }
      .dseMixHeight {
        font-weight: lighter !important;
        max-height: 116px !important;
        z-index: 10 !important;
        overflow: hidden !important;
      }
    }
    .prestrains {
      position: absolute;
      left: 0;
      width: 100%;
      top: 50px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: white;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      z-index: 1000;
      list-style-type: none;
      li {
        padding: 0 12px;
        list-style-type: none;
        width: 100%;
        height: 45px;
        line-height: 1;
        font-size: 15px;
        background-color: white;
        box-sizing: border-box;
        -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        .prestrains_div {
          float: left;
          height: 45px;
          line-height: 45px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: justify;
          border-bottom: 1px solid #e3e3e3;
        }
      }
      li:active {
        background-color: #f0f1f5;
        -webkit-transition: background-color 0.02s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: background-color 0.02s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
    .highlight {
      background: rgba(255, 255, 255, 0.4);
      color: #ffb148;
    }
  }
</style>
