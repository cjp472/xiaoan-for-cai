<template>
  <div class="ruleslist" id="ruleslist" ref="ruleslistDom">
    <!--搜索栏-->
    <div ref="searchsDom" class="searchs">
      <div class="seabox">
        <div class="searchPrompt" @click="searchPro"></div>
        <ul class="searchScroll">
          <li class="searchScrollSpan" v-for="(list,index) in Newarr" id="searchScrollSpan">
            {{newBtnArr(list)}}
            <span class="searchClose" @click="searchClose(index)">
              <i class="icon iconfont promptClose icon-X"></i>
            </span>
          </li>
        </ul>
        <div class="goSearch" @click='goSearch'>
          <div class="rulesNum" v-show="totalNumber>1">{{totalNumber+numtext}}</div>
        </div>
      </div>
      <button @click="popupShow" class="expert_s" id="experts">{{experts}}</button>
      <i class="smx_item" v-show="redCircleExpert"></i>
    </div>
    <!--筛选栏-->
    <div ref="searchBoxDom" class="searchBox">
      <ul class="search-wrapper">
        <li class="search-mrpx" v-for="(list, index) in preparationBox" :class="{pass: list.isActive}" v-if="list.show"
            @click="preparationClick(index)">
          <span class="search-mrpx-name">{{list.name}}</span>
          <span class="imgBox">
            <i class="icon iconfont icon-xiangxiajiantou iconBottom"></i>
          </span>
        </li>
      </ul>
      <div class="search-sx">
        <div class="redCircle" v-show="redCircleDis"></div><!--筛选栏选中条件状态标识-->
        <button @click="preparationPopupClick" class="expert_s">筛选</button>
        <!--筛选-->
      </div>
      <div v-show="searchBoxTrue" class="searchBoxDis"></div>
    </div>
    <!----正面 市场类型 筛选条件---->
    <transition name="bounce">
      <div class="filter-box" :style="{height:filterBoxHeight+'px'}" v-show="preparationBox[0].isActive">
        <ul class="item-box">
          <li class="item-list" v-for="(list,index) in preparationBox[0].select" @click="MRselect(index)">
            <div class="item-tip" :class="{selected:list.isActive}"></div>
            <div class="item-Text">{{ list.name }}</div>
            <div :class="{'item-Hline': index % 2 == 0}"></div>
          </li>
          <li class="item-foo" v-if="preparationBox[0].select.length %2 != 0">
            <div class=""></div>
            <div class="item-Text"></div>
            <div></div>
          </li>
        </ul>
        <div class="bottomBox">
          <button class="reset" @click="screenReset(0)">重置</button>
          <button class="yeah" @click="screenCertain(0)">确认</button>
        </div>
      </div>
    </transition>
    <!----正面 发文单位 筛选条件---->
    <transition name="bounce">
      <div class="filter-box" :style="{height:filterBoxHeight+'px'}" v-show="preparationBox[1].isActive">
        <ul class="item-box">
          <li class="item-list" v-for="(list,index) in preparationBox[1].select" @click="FWselect(index)">
            <div class="item-tip" :class="{selected:list.isActive}"></div>
            <div class="item-Text">{{ list.name }}</div>
            <div :class="{'item-Hline': (index % 2 == 0)}"></div>
          </li>
          <li class="item-foo" v-if="preparationBox[1].select.length % 2 != 0">
            <div class=""></div>
            <div class="item-Text"></div>
            <div></div>
          </li>
        </ul>
        <div class="bottomBox">
          <button class="reset" @click="screenReset(1)">重置</button>
          <button class="yeah" @click="screenCertain(1)">确认</button>
        </div>
      </div>
    </transition>
    <!----正面 规则类别 筛选条件---->
    <transition name="bounce">
      <div class="filter-box" :style="{height:filterBoxHeight+'px'}" v-show="preparationBox[2].isActive">
        <ul class="item-box">
          <li class="item-list" v-for="(list,index) in preparationBox[2].select" @click="GZselect(index)">
            <div class="item-tip" :class="{selected:list.isActive}"></div>
            <div class="item-Text">{{ list.name }}</div>
            <div :class="{'item-Hline': index % 2 == 0}"></div>
          </li>
          <li class="item-foo" v-if="preparationBox[2].select.length %2 != 0">
            <div class=""></div>
            <div class="item-Text"></div>
            <div></div>
          </li>
        </ul>
        <div class="bottomBox">
          <button class="reset" @click="screenReset(2)">重置</button>
          <button class="yeah" @click="screenCertain(2)">确认</button>
        </div>
      </div>
    </transition>
    <!--右侧筛选栏-->
    <div v-transfer-dom>
      <popup v-model="preparationPopup" position="right" width="61.8%" class="xiaoan-right-popup">
        <div class="xiaoan-popup-wrapper">
          <x-header>
            <span :slot="'overwrite-left'" style="width: 30px;height: 30px;display: inline-block">
              <i class="icon iconfont icon-x expert_g" @click="preparationPopup = false"></i>
            </span>
            <span>筛选</span>
          </x-header>
          <!----侧边栏各筛选条件---->
          <div class="xiaoan-popup-content">
            <ul class="sxList">
              <li class="sxitemBox" v-for="(item, k1) in preparationBox">
                <div class="sxlistItem" @click="preparationListClick(k1)">
                  <div class="sxlistItem-title">
                    <div class="sxlistItem-tip">
                      <span>{{item.name}}</span>
                    </div>
                    <div class="sxlistItem-tip">
                      <span></span>
                    </div>
                    <div class="sxlistItem-tip">
                      <i class="icon iconfont icon-xiangyoujiantou" :class="{'icon-angstrom':item.isRightActive}"></i>
                    </div>
                  </div>
                </div>
                <ul class="sxList" v-show="item.isRightActive">
                  <li class="sxitemBox" v-for="(list, k2) in item.select">
                    <div class="sxlistItem" @click="preparationSelect(k1,k2)">
                      <div class="listText">{{list.name}}</div>
                      <div class="sxlistItem-checkbox">
                        <span class="itemTip" :class="{selected:list.isActive}"></span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <!---->
              <li class="sxitemBox">
                <div class="sxlistItem" @click="showItem(4)">
                  <div class="sxlistItem-title">
                    <div class="sxlistItem-tip">
                      <span>发布日期</span>
                    </div>
                    <div class="sxlistItem-tip">
                      <span></span>
                    </div>
                    <div class="sxlistItem-tip">
                      <i class="icon iconfont icon-xiangyoujiantou"></i>
                    </div>
                  </div>
                </div>
                <div class="itemconBOX" isOpen="close" style="display: none;">
                  <div class="itemContent">
                    <div class="itemList">
                      <div class="listText">起始日期</div>
                      <div class="inputBox aa">
                        <input type="date" required min="1991-11-15" :max="todate" v-model="timesDate1"
                               placeholder="年 / 月 / 日" @change="timeStart">
                        <b class="closeDate" @click="timesClose1"
                           v-show="timesDate1 !== ''"><i style="color: #c1c1c1"
                                                         class="icon iconfont icon-X"></i></b>
                      </div>
                    </div>
                    <div class="itemList">
                      <div class="listText">结束日期</div>
                      <div class="inputBox bb">
                        <input type="date" required :min="timesDate1" :max="todate" v-model="timesDate2"
                               placeholder="年 / 月 / 日" @change="timeEnd">
                        <b class="closeDate" @click="timesClose2"
                           v-show="timesDate2 !== ''"><i style="color: #c1c1c1"
                                                         class="icon iconfont icon-X"></i></b>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="xiaoan-popup-footer">
            <!----侧边栏确认重置按钮---->
            <button class="sxReset">重置</button>
            <button class="sxYeah">确认</button>
          </div>
        </div>
      </popup>
    </div>
    <!--右滑高级-->
    <mt-popup v-model="popupVisible" :modal="false" position="right" class="mint-popup-3">
      <div class="rulExpert">
        <i @click="popupHide" class="icon iconfont icon-x expert_g"></i>
        <span>高级搜索</span>
      </div>
      <div class="rangeGkipt">
        <div class="range">{{range}}</div>
        <div class="rangeBtn">
          <div>
            <button class="rangeBtn1 colorBtn" @click="sea1">标题</button>
          </div>
          <div>
            <button class="rangeBtn2" @click="sea2">全文</button>
          </div>
        </div>
        <div class="range">{{accuracy}}</div>
        <div class="rangeBtn_2">
          <div>
            <button class="rangeBtn3 colorBtn" @click="sea3">精确</button>
          </div>
          <div>
            <button class="rangeBtn4" @click="sea4">模糊</button>
          </div>
        </div>
        <div class="rangeMoregl">
          <div class="rangeMore" @click="matter">{{More}}
            <i class="icon iconfont icon-xiangyoujiantou rangeMoreTop" v-show="this.sw == 0"></i>
            <i class="icon iconfont icon-xiangxiajiantou rangeMoreButton" v-show="this.sw != 0"></i>
          </div>
        </div>
        <div class="rulesMatter">
          <div class="serachTitle">
            <div class="searchTitle">标题关键字</div>
            <div class="inputA">
              <span class="Matter-span">必须包含</span>
              <input type="text" v-model="titleIncludes" @focus="entrybug($event)" @input="entryText"
                     class="inputTil" id="mustInput" @keyup.13="Toblur">
              <i class="Expert_close Expert_5"></i>
            </div>
            <p class="titleTip">必须输入至少一个关键字</p>
            <div class="inputB">
              <span class="Matter-span">可能包含</span>
              <input type="text" v-model="titleMaybeIncludes" @focus="entrybug($event)"
                     class="inputTil"
                     id="titleMay" @keyup.13="Toblur">
              <i class="Expert_close Expert_5"></i>
            </div>
            <div class="inputC">
              <span class="Matter-span">不包含</span>
              <input type="text" v-model="titleExcludes" @focus="entrybug($event)" class="inputTil"
                     id="titleExc" @keyup.13="Toblur">
              <i class="Expert_close Expert_5"></i>
            </div>
          </div>
          <div class="serachCont">
            <div class="searchCont">全文关键字</div>
            <div class="inputA">
              <span class="Matter-span">必须包含</span>
              <input type="text" v-model="contentIncludes" @focus="entrybug($event)" class="inputCont"
                     id="contentInc" @input="entryText1" @keyup.13="Toblur">
              <i class="Expert_close Expert_5"></i>
            </div>
            <p class="titleTip1">必须输入至少一个关键字</p>
            <div class="inputB">
              <span class="Matter-span">可能包含</span>
              <input type="text" v-model="contentMaybeIncludes" @focus="entrybug($event)"
                     id="contentMay" class="inputCont"
                     @keyup.13="Toblur">
              <i class="Expert_close Expert_5"></i>
            </div>
            <div class="inputC">
              <span class="Matter-span">不包含</span>
              <input type="text" v-model="contentExcludes" @focus="entrybug($event)" class="inputCont"
                     id="contentExc" @keyup.13="Toblur">
              <i class="Expert_close Expert_5"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="footBtn">
        <button type="button" @click="goReset">重置</button>
        <mt-button @click.native="searchMany">确认</mt-button>
      </div>
      <!---->
    </mt-popup>
    <!---->
    <xiaoan-loading v-show="shadowLoading" bgColor="rgba(0,0,0,0.5)" borderWidth="2px"></xiaoan-loading>
    <!--内容页-->
    <div class="wrapper" id="wrapper" ref="wrapperDom" :style="{height: heightDom.wrapperHeight+'px'}">
      <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
          infinite-scroll-distance="0">
        <li class="anList" v-for="(list,index) in ruleslist" @click="goCount(index)">
          <div class="anListName" :style="{color: list.timeliness == '失效'?'#8d8d8d':'#323232'}">
            <div style="letter-spacing: 0;" v-html="key(list.name)"></div>
          </div>
          <div class="anListState">
            <span v-show="list.referenceNumber">{{list.referenceNumber}}</span>
            <span v-show="list.referenceNumber">|</span>
            <span>{{list.timeliness}}</span>
            <span v-show="list.PublishDate">|</span>
            <span v-show="list.PublishDate">{{$const.format(list.PublishDate)}}</span>
          </div>
        </li>
        <li class="seniorText" v-show="seniorTextShow">
          <span class="trytext scroll-trytext" @click="showSenior">搜索不到想要的内容，试试看全文检索吧！</span>
          <span class="tryimg"></span>
        </li>
      </ul>
      <!--9yue 25日 cai 改-->
      <p v-show="infLoading" class="infinite-loading">
        <mt-spinner type="snake" v-show="allLoadeded"></mt-spinner>
        <span v-if="allLoadeded" style="vertical-align: middle">加载中...</span>
        <xiaoan-drop v-else></xiaoan-drop>
      </p>
    </div>
    <div class="noTrySenior" v-show="trySeniorDis">
      <div class="trySenior">
        <img src="/static/img/rules/trySenior.png" alt="全文检索">
        <div class="tryText" @click="popupShow">
          <span class="trytext scroll-trytext">搜索不到想要的内容，试试看全文检索吧！</span>
          <span class="tryimg"></span>
        </div>
      </div>
    </div>
    <div class="noInfo" v-show="noInfoShow">
      <div class="trySenior" style="width:100%" :class="{trySeniorShow:noInfoShow}">
        <img src="/static/img/rules/trySenior.png" alt="全文检索">
        <div class="tryText" style="display: flex;justify-content: center;width:100%;">
          <span class="trytext" style="margin-left:0;">搜索不到相关内容，试试别的</span>
        </div>
        <div class="tryText" style="margin-top:-2px">
          <span class="trytext" style="margin-left:0;">关键字或使用高级搜索吧！</span>
        </div>
        <div class="seniorButton" @click="popupShow">高级搜索</div>
      </div>
    </div>
    <div @click="popupHide" slot="icon" class="showOp" v-show="showPopup"></div><!--高级 阴影隐藏-->
    <div @click="SXhide" slot="icon" class="shadow" v-show="shadowPopup"></div>  <!--筛选 阴影隐藏-->
    <div class="showPrompt">上滑加载更多内容</div>
  </div>
</template>
<script>
  import loading from "../../components/warning/loading"
  import drop from "../../components/warning/drop"
  import {Popup, TransferDom, XHeader} from 'vux'
  export default {
    name: 'ruleslist',
    directives: {
      TransferDom
    },
    components: {
      "xiaoan-loading": loading,
      "xiaoan-drop": drop,
      Popup,
      XHeader
    },
    data() {
      return {
        preparationBox: [
          {
            id: 0,
            alt: 'Marketplace',
            name: '市场类型',
            select: [],
            selected: [],
            isActive: false,
            show: true,
            isRightActive: false
          },
          {
            id: 1,
            alt: 'DispatchUnit',
            name: '发文单位',
            select: [],
            selected: [],
            isActive: false,
            show: true,
            isRightActive: false
          },
          {
            id: 2,
            alt: 'RuleClass',
            name: '规则类别',
            select: [],
            selected: [],
            isActive: false,
            show: true,
            isRightActive: false
          },
          {
            id: 3,
            alt: 'Timeliness',
            name: '时效性',
            select: [],
            selected: [],
            isActive: false,
            show: false,
            isRightActive: false
          }
        ],
        sxlistItem: [
          {name: '市场类型', item: []},
          {name: '发文单位', item: []},
          {name: '规则类别', item: []},
          {name: '时效性', item: []}
        ],
        totalNumber: 0,
        preparationPopup: false,
        filterBoxHeight: '',

        timesDate1: "",
        timesDate2: "",
        More: '更多搜索选项',
        accuracy: '搜索精度',
        range: '搜索范围',
        off: '../../static/img/rules/off.png',
        right: '../../static/img/rules/right.png',
        button: '../../static/img/rules/bottom.png',
        experts: '高级',
        num: 1,
        numtext: '条',
        values: '',
        placeholder: "搜索法规名称，多个关键字空格隔开",
        popupVisible: false,
        top: 1,
        bottom: 15,
        sortType: '',
        ruleslist: [],  // 搜索结果列表数组
        prompting: [],
        promptclose: '../../static/img/personal/collect/close.png',
        sw: 0,
        titleIncludes: "", // 标题包含
        titleMaybeIncludes: "", // 标题可能包含
        titleExcludes: "", // 标题不包含
        contentIncludes: "",
        contentMaybeIncludes: "",
        contentExcludes: "",
        nuwUrl: '',
        popupVisible1: false,
        shadowLoading: false,
        showPopup: false,
        shadowPopup: false,
        noInfoShow: false,
        selectItems: [
          {
            name: "市场类型",
            item: []
          },
          {
            name: "发文单位",
            item: []
          },
          {
            name: "规则类别",
            item: []
          },
          {
            name: '时效性',
            item: []
          }
        ],
        xianshi: false, // 默认排序筛选条件下拉是否弹出
        xianshi1: false, // 发文单位筛选条件下拉是否弹出
        xianshi2: false, // 规则类别筛选条件下拉是否弹出
        frontStatus: false, // 加一个状态判断是否是正面筛选栏出来的条件
        value0: [], // 市场类型arr
        value1: [], // 发文单位arr
        value2: [], // 规则类别Name arr
        value3: [], // 时效性arr
        dateStart: '', // 发布日期arr
        dateEnd: "", // 发布日期
        idarr0: [], // 市场类型idarr
        idarr1: [], // 发文单位idarr
        idarr2: [], // 规则类别idarr
        idarr3: [], // 时效性idarr
        paixuid: '', // 排序ID
        guizeArr: [], // 规则数组 四个类别idarr
        gzObjarr: [], // 选中状态规则类别arr
        Newarr: [], /* Newarrs: ["上市规则", '规则规则规则', "海洋规则规则规则规则"], */
        titleKey: [],
        newTitleKey: [],
        onloadOpen: true,  // 加载更多的开关  上滑加载的时候让它关闭 内容加载完成后让它开启
        yeahFlag: false, // 点击确认提交筛选条件开关  选择完筛选条件后 点击确认yeahFlag为true 没有点击则为false 此时选中状态的样式是不应该有的 重置后再次设为false
        marketStatus: [], // 保存市场类型的筛选条件
        marketIdStatus: [],
        trueMarketWord: [], // 保存的市场类型的筛选条件文字
        fawenStatus: [], // 保存发文单位的筛选条件
        fawenIdStatus: [],
        trueFawenWord: [], // 保存发文单位的筛选条件文字
        guizeStatus: [], // 保存规则类别的筛选条件
        guizeSortAll: [], // 保存所有规则类别
        guizeHu: [], // 保存沪市主板的规则类别
        guizeShen: [], // 保存深市主板的规则类别
        guizeSGem: [], // 保存深市中小板的规则类别
        guizeSSme: [], // 保存深市创业板的规则类别
        guizeIdStatus: [],
        guizeStatusA: [],
        timeStatus: [], // 保存时效性的筛选条件
        timeIdStatus: [], // 保存时效性的筛选条件文字
        trueTimeWord: [],
        inputDateS: [], // 保存点击确认后的起始时间
        inputDateE: [], // 保存点击确认后的终止时间
        keys: '',
        gunflag: true, // 滚动触发 1->10
        toright: '../../static/img/rules/toright.png',
        tobutton: '../../static/img/rules/tobutton.png',
        dateARR: '',
        dateARR2: '',
        valInput: '',
        todate: '',
        bottomStatus: '', // 下拉状态
        Number: '',
        infLoading: true,
        loading: false,
        allLoaded: false,
        allLoadeded: true,
        heightDom: {
          wrapperHeight: '',
          ruleslistHeight: ''
        },
        redCircleDis: false, // 筛选的小红点显示
        redCircleExpert: false,
        // shan
        showSearch: false,
        showSearch1: false,
        showSearch2: false,
        //
        trySeniorShow: false, // 没有搜索结果时候
        seniorTextShow: false, // 没有搜索结果时候
        trySeniorDis: false, // 没有搜索结果时候
        searchBoxTrue: false,
        // ////
        ruleParams: {}
      }
    },

    watch: {
      popupVisible1: function () {
        if (this.popupVisible1 == false) {
          setTimeout(() => {
            this.shadowPopup = false;
            $('#wrapper').css({'overflow-y': 'auto'});
          }, 250);
        } else {
          setTimeout(() => {
            this.shadowPopup = true;
            $('#wrapper').css({'overflow-y': 'hidden'});
          }, 250);
        }
      },
      popupVisible: function () {
        if (this.popupVisible == false) {
          setTimeout(() => {
            this.showPopup = false;
            $('#wrapper').css({'overflow-y': 'auto'});
          }, 250);
        } else {
          setTimeout(() => {
            this.showPopup = true;
            $('#wrapper').css({'overflow-y': 'hidden'});
          }, 250);
        }
      }
    },
    created() {
      this.valInput = this.$route.query.titleIncludes;

      let date = new Date();
      this.todate = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
      //
      this.ruleParams = this.$storage.localStorageAll('rule-keyword');
      console.log('从localStorage取出来的数据', this.ruleParams);
      //
      this.ApiLawSearch();
      //
    },
    updated() {
    },
    mounted() {
      //
      // 页面加载完调用
      this.multipleKeyRetrieval();// 第一个字符串，第二个生成的新字符串
      // 高级默认状态
      this.sea();
      this.gaoji("colorBtn");// 调用localS
      // 获取筛选
      this.Newarr = this.newTitleKey;
      this.preparation();
      this.lineHeight();
      this.$nextTick(() => {
        this.anlist();
      });
      /**/
      this.newgaoji();
      this.localstrol();
      /**/
      setTimeout(() => {
        this.$nextTick(() => {
          // this.ApiLawSearch();
          this.lineheight();
        })
      }, 500)

    },
    methods: {
      lineheight() {
        this.filterBoxHeight = this.$refs.ruleslistDom.clientHeight - this.$refs.searchsDom.clientHeight - this.$refs.searchBoxDom.clientHeight;
        console.log(this.$refs.ruleslistDom.clientHeight);
        console.log(this.$refs.searchsDom.clientHeight);
        console.log(this.$refs.searchBoxDom.clientHeight);
      },
      // 获取筛选
      preparation() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "getalllmappingrules"
        }).then((res) => {
          let content = res.data.returnObject;
          this.fawenStatus = content.filter((item) => {
            return item.mappingTypeLable === "organization";
          });
          this.guizeStatus = content.filter((item) => {
            return item.mappingTypeLable === "range";
          });
          this.marketStatus = content.filter((item) => {
            return item.mappingTypeLable === "market";
          });
          for (let i = 0; i < this.fawenStatus.length; i++) {
            let name = this.fawenStatus[i].mapplingVaule;
            if (name.length > 9) {
              name = name.substring(0, 9) + '...';
            }
            let obj = {id: this.fawenStatus[i].mappingOriginalItems[0].id, name: name, isActive: false};
            this.selectItems[1].item.push(obj);    // 发文单位
            this.sxlistItem[1].item.push(obj)// 筛选栏 发文单位
          }
          this.fawenStatus = this.sxlistItem[1].item;
          // feizhi
          this.preparationBox[1].select = this.sxlistItem[1].item;
          //
          for (let i = 0; i < this.marketStatus.length; i++) {
            let obj = {
              id: this.marketStatus[i].mappingOriginalItems[0].id,
              name: this.marketStatus[i].mapplingVaule,
              isActive: false
            };
            this.selectItems[0].item.push(obj);
            this.sxlistItem[0].item.push(obj)// 规则类别
          }
          this.marketStatus = this.sxlistItem[0].item;
          this.preparationBox[0].select = this.sxlistItem[0].item;
          //
          let sss = [];
          for (let i = 0; i < this.guizeStatus.length; i++) {
            sss.push(this.guizeStatus[i].mappingOriginalItems)
          }
          let strarr = [];
          for (let i = 0; i < sss.length; i++) {
            let idarr = [];
            for (let j = 0; j < sss[i].length; j++) {
              idarr.push(sss[i][j].id)
            }
            strarr.push(idarr.join(','));
          }
          let mappingOriginalItems = [], GZLBMapping = [];
          for (let j = 0; j < strarr.length; j++) {
            let obj = {
              id: strarr[j],
              name: this.guizeStatus[j].mapplingVaule,
              isActive: false
            };
            mappingOriginalItems.push(obj);
            GZLBMapping.push(obj);
          }
          this.selectItems[2].item = mappingOriginalItems;
          this.sxlistItem[2].item = mappingOriginalItems;
          this.preparationBox[2].select = this.sxlistItem[2].item;
          //
          let objy = [
            {"id": "现行有效", "name": "现行有效", isActive: false},
            {"id": "部分失效", "name": "部分失效", isActive: false},
            {"id": "待生效", "name": "待生效", isActive: false},
            {"id": "失效", "name": "失效", isActive: false}
          ];
          // 因为新版没有有效期的参数
          this.selectItems[3].item = objy;
          this.sxlistItem[3].item = objy;
          this.preparationBox[3].select = this.sxlistItem[3].item;
          this.timeStatus = objy;
          // console.log('<====筛选条件======>', this.marketStatus, this.fawenStatus, this.guizeStatus, this.selectItems[1].item, this.sxlistItem[2].item);
          // 基础数据处理完成
          this.guizeStatus = mappingOriginalItems;
          this.guizeArr.push((GZLBMapping).splice(0, 14));
          this.guizeArr.push(GZLBMapping);
          this.guizeArr.push(GZLBMapping);
          this.guizeArr.push(GZLBMapping);
          // console.log('沪市主板规则类别', this.guizeArr[0]);
          this.guizeHu = mappingOriginalItems;
          this.guizeShen = mappingOriginalItems;
          this.guizeSGem = mappingOriginalItems;
          this.guizeSSme = mappingOriginalItems;
          this.guizeStatusA = mappingOriginalItems; // 规则类别筛选匹配ShangHaiBoard(1/4)
          // console.log("=====>", this.guizeStatus, this.guizeStatusA);
        }).catch((err) => {
          // console.log(err);
        })
      },
      // 点击筛选栏
      preparationClick(index) {
        console.log(this.preparationBox[index]);
        if (this.preparationBox[index].isActive) {
          this.preparationBox[index].isActive = false;
        } else {
          for (let i in this.preparationBox) {
            this.preparationBox[i].isActive = false;
          }
          this.preparationBox[index].isActive = true;
        }

        let a = '';
        switch (index) {
          case 0:
            a = '执行代码块 0';

            break;
          case 1:
            a = '执行代码块 1';
            break;
          case 2:
            a = '执行代码块 2';
            break;
          default:
            a = 'n 与 case 1 和 case 2 不同时执行的代码';
        }
      },
      // 正面筛选条件 市场类型
      MRselect(index) {
        console.log(index, this.preparationBox[0].select[index]);
        if (this.preparationBox[0].select[index].isActive) {
          this.preparationBox[0].select[index].isActive = false;
        } else {
          this.preparationBox[0].select[index].isActive = true;
        }
      },
      // 正面筛选条件 发文单位
      FWselect(index) {
        console.log(index, this.preparationBox[1].select[index]);
        if (this.preparationBox[1].select[index].isActive) {
          this.preparationBox[1].select[index].isActive = false;
        } else {
          this.preparationBox[1].select[index].isActive = true;
        }
      },
      // 正面筛选条件 规则类别
      GZselect(index) {
        console.log(index, this.preparationBox[2].select[index]);
        if (this.preparationBox[2].select[index].isActive) {
          this.preparationBox[2].select[index].isActive = false;
        } else {
          this.preparationBox[2].select[index].isActive = true;
        }
      },
      // 筛选重置
      screenReset(index) {
        for (let i in this.preparationBox[index].select) {
          this.preparationBox[index].select[i].isActive = false;
        }
        this.preparationBox[index].selected = [];
        console.log(this.preparationBox[index]);
      },
      // 筛选确认
      screenCertain(index) {
        this.preparationBox[index].isActive = false;
        this.preparationBox[index].selected = this.preparationBox[index].select.filter((item) => {
          return item.isActive === true;
        });
        console.log('123456', this.preparationBox[index].selected);
        this.ruleParamFun(this.preparationBox[index]);
      },
      // 处理搜索的数据对接
      ruleParamFun(selected) {
        let select = []
        for (let i in selected.selected) {
          select.push(selected.selected[i].id);
        }
        /*
        {id: 0, alt: 'Marketplace', name: '市场类型', select: [], selected: [], isActive: false, show: true},
          {id: 1, alt: 'DispatchUnit', name: '发文单位', select: [], selected: [], isActive: false, show: true},
          {id: 2, alt: 'RuleClass', name: '规则类别', select: [], selected: [], isActive: false, show: true},
          {id: 3, alt: 'Timeliness', name: '时效性', select: [], selected: [], isActive: false, show: false},
          {id: 4, alt: 'ReleaseDate', name: '发布日期', select: [], selected: [], isActive: false, show: false}
          */
        if (selected.alt == 'Marketplace') {
          // name: '市场类型'
          this.ruleParams.scopeId = select.toString();
        } else if (selected.alt == 'DispatchUnit') {
          // name: '发文单位'
          this.ruleParams.unitIds = select.toString()
        } else if (selected.alt == 'RuleClass') {
          // name: '规则类别'
          this.ruleParams.cateIds = select.toString()
        } else {
          // 未知错误
        }
        this.ruleslist = [];
        this.ruleParams.pageNo = 1;
        this.ApiLawSearch();
      },
      // 搜索接口
      ApiLawSearch() {
        this.$http({
          method: "GET",
          url: this.$api.host + "law/search",
          params: this.ruleParams
        }).then((res) => {
          console.log(res);
          if (res.data.returnObject.count == "" || res.data.returnObject.count == null) {
            this.totalNumber = 0;
          } else {
            this.totalNumber = res.data.returnObject.count;
          }
          let content = res.data.returnObject.list;
          this.ruleslist = this.$array.loadMore(this.ruleslist, content); // 数据push
        }).catch((err) => {
          console.log(err);
        })
      },
      // 上拉加载器
      loadMore() {
        if (this.ruleslist.length < this.totalNumber) {
          this.loading = true;
        }
        setTimeout(() => {
          let lastValue = this.ruleslist.length;
          if (lastValue < this.totalNumber) {
            this.ruleParams.pageNo += 1;
            this.allLoadeded = true;
            this.ApiLawSearch();
          } else {
            if (this.totalNumber && lastValue) {
              this.allLoadeded = false;
            }
          }
          this.loading = false;
        }, 80);
      },
      // 点击筛选
      preparationPopupClick() {
        this.preparationPopup === true ? this.preparationPopup = false : this.preparationPopup = true;
      },
      //
      preparationListClick(index) {
        console.log(this.preparationBox[index].isRightActive);
        this.preparationBox[index].isRightActive === true ? this.preparationBox[index].isRightActive = false : this.preparationBox[index].isRightActive = true;
      },
      //
      preparationSelect(k1, k2) {
        console.log(this.preparationBox[k1].select[k2]);
        if (this.preparationBox[k1].select[k2].isActive) {
          this.preparationBox[k1].select[k2].isActive = false;
        } else {
          this.preparationBox[k1].select[k2].isActive = true;
        }
      },
      // 数据回显
      localstrol() {
        // *板块*/
        this.idarr0 = this.$storage.localStorageAll("marketIdStatus");
        this.value0 = this.$storage.localStorageAll("value0");
        this.value0text();
        // *发文单位*/
        this.idarr1 = this.$storage.localStorageAll("fawenIdStatus");
        this.value1 = this.$storage.localStorageAll("value1");
        console.log("this.value1", this.value1);
        this.value1text();
        // *规则*/
        this.idarr2 = this.$storage.localStorageAll("guizeIdStatus");
        this.value2 = this.$storage.localStorageAll("value2");
        this.value2text();
        // *有效期*/
        this.idarr3 = this.$storage.localStorageAll("timeIdStatus");
        this.value3 = this.$storage.localStorageAll("value3");
        this.value3text();
        // *开始时间结束时间*/
        let DateStartEnd = this.$storage.localStorageAll("DateStartEnd");
        if (DateStartEnd == [] || DateStartEnd == null || DateStartEnd.length == 0) {
          this.timesDate1 = '';
          this.timesDate2 = '';
        } else {
          this.timesDate1 = DateStartEnd[0];
          this.timesDate2 = DateStartEnd[1];
          if (this.timesDate1 == '' || this.timesDate1 == '') {
          } else {
            let data1 = DateStartEnd[0].split("-").join("");
            this.dateARR = data1;
          }
          if (this.timesDate2 == '') {
          } else {
            let data2 = DateStartEnd[1].split("-").join("");
            this.dateARR2 = data2;
          }
        }
        let localAdd = ["marketIdStatus", "guizeIdStatus", "fawenIdStatus", "value0", "value1", "value2", "value3",
          "timeIdStatus", "DateStartEnd"];
        this.$storage.localStorageRemove(localAdd);
      },
      lineHeight() {
        console.log('213131', this.$refs.wrapperDom.offsetTop, this.$refs.ruleslistDom.clientHeight);
        this.heightDom.ruleslistHeight = this.$refs.ruleslistDom.clientHeight - document.querySelector(".xa-Footer").clientHeight;

        this.heightDom.wrapperHeight = this.heightDom.ruleslistHeight - this.$refs.wrapperDom.offsetTop;
        let hei = document.body.clientHeight;
        let searchs = document.querySelector(".searchs").clientHeight;
        let searchBox = document.querySelector(".searchBox").clientHeight;
        let mintTabbar = document.querySelector(".xa-Footer").clientHeight;
        let heig = (hei - (searchs + searchBox + mintTabbar)) + "px";
        let couHeight = (hei - (searchs + searchBox)) + "px";
        $(".rangeGkipt").css('height', couHeight);
        $('.itembox').css({'height': this.heightDom.wrapperHeight + 'px'});
        $(".ruleList").css('height', couHeight);
      },
      // 初始高级赋值
      newgaoji() {
        let colorBtn2 = $('.rangeBtn_2 div .colorBtn').text();
        let colorBtn = $('.rangeBtn div .colorBtn').text();
        if (colorBtn2 == "模糊" && colorBtn == "全文") {
          if (window.localStorage.getItem("keyIME") == null) {
          } else {
            this.keys = window.localStorage.getItem("keyIME");
          }
        } else if (colorBtn2 == "精确" && colorBtn == "全文") {
          if (window.localStorage.getItem("titleIME") == null && window.localStorage.getItem("contentIME") == null) {
          } else {
            let titlea = window.localStorage.getItem("titleIME");
            let contenta = window.localStorage.getItem("contentIME");
            let titleb = titlea.split("$#");
            let contentb = contenta.split("$#");
            this.titleIncludes = titleb[0];
            this.titleMaybeIncludes = titleb[1];
            this.titleExcludes = titleb[2];
            this.contentIncludes = contentb[0];
            this.contentMaybeIncludes = contentb[1];
            this.contentExcludes = contentb[2];
          }
        } else {
          if (window.localStorage.getItem("titleIME") == null) {
            this.titleIncludes = this.noep(this.valInput);
          } else {
            let titlea = window.localStorage.getItem("titleIME");
            let titleb = titlea.split("$#");
            this.titleIncludes = titleb[0];
            this.titleMaybeIncludes = titleb[1];
            this.titleExcludes = titleb[2];
          }
        }
      },
      // 全文状态
      quanwen() {
        let titleI = [], contentI = [];
        if (window.localStorage.getItem("titleIME") == null) {
          // console.log("titleIME");
          this.titleIncludes = this.noep(this.valInput);
        } else {
          titleI = window.localStorage.getItem("titleIME").split("$#");
          this.titleIncludes = titleI[0];
          this.titleMaybeIncludes = titleI[1];
          this.titleExcludes = titleI[2];
        }
        /**/
        if (window.localStorage.getItem("contentIME") == null) {
          // console.log("contentIME");
          this.contentIncludes = "";
          this.contentMaybeIncludes = "";
          this.contentExcludes = "";
        } else {
          contentI = window.localStorage.getItem("contentIME").split("$#");
          this.contentIncludes = contentI[0];
          this.contentMaybeIncludes = contentI[1];
          this.contentExcludes = contentI[2];
        }
      },
      // 高级状态
      gaoji(colorBtn) {
        if (window.localStorage.getItem(colorBtn) !== null) {
          let co = window.localStorage.getItem(colorBtn);
          let costr = co.split('$#');
          if (costr[0] == "标题" && costr[1] == "精确") {
            $('.rangeBtn1').addClass('colorBtn');
            $('.rangeBtn2').removeClass('colorBtn');
            $('.rangeBtn3').addClass('colorBtn');
            $('.rangeBtn4').removeClass('colorBtn').addClass('rangeBtnHide');
            this.redCircleExpert = false;
            this.sea1();
            //console.log("11111111111111", 1, costr[0], costr[1]);
          } else if (costr[0] == "全文" && costr[1] == "精确") {
            $('.rangeBtn2').addClass('colorBtn');
            $('.rangeBtn1').removeClass('colorBtn');
            $('.rangeBtn3').addClass('colorBtn');
            $('.rangeBtn4').removeClass('colorBtn').removeClass('rangeBtnHide');
            this.redCircleExpert = true;
            /* this.sea2();*/
            this.seaColor2_1();
            this.quanwen();
            //console.log("22222222222222222", 2, costr[0], costr[1]);
          } else {
            $('.rangeBtn2').addClass('colorBtn');
            $('.rangeBtn1').removeClass('colorBtn');
            $('.rangeBtn3').removeClass('colorBtn');
            $('.rangeBtn4').addClass('colorBtn').removeClass('rangeBtnHide');
            this.redCircleExpert = true;
            this.sea4();
            //console.log("22222222222222222", 2, costr[0], costr[1]);
          }
        } else {
          this.sea();
        }
      },
      // 规则类别正面筛选框 确认后保存状态
      xianshiThree() {
        let arr = [];
        let idarr = [];
        for (let i in this.guizeStatus) {
          for (let j in this.guizeIdStatus) {
            if (this.guizeIdStatus[j] == this.guizeStatus[i]['id']) {
              //console.log(i, this.fawenStatus[i]['name'])
              arr.push(this.guizeStatus[i]['name']);
              idarr.push(this.guizeStatus[i]['id']);
            }
          }
        }
        console.log("console.log(idArr);", this.guizeIdStatus, this.guizeStatus);
        for (let i in $(".showSearch2").find('.aaa')) {
          //关闭当前筛选条件栏后 首先重置所有的选中样式
          $(".showSearch2").find('.aaa').eq(i).attr('select', 'true').removeClass('selected');
        }
        this.value2 = arr;
        this.trueGuizeWord = arr;
        this.idarr2 = idarr;
        ////console.log("此时发文单位的文字arr为", this.value1, this.idarr1)
        //为点击确认按钮后的选中筛选条件显示
        for (let i = 0; i < this.value1.length; i++) {
          $(".search3").find('span').text(this.value1[0].substring(0, 3) + '...')
          $(".tip2").text(this.value1.join(',').substring(0, 8) + '...')
        }
        if (this.value2.length == 0) {
          $(".search3").find('span').text('规则类别');
          $(".tip2").text('')
        }

        for (let i = 0; i < this.value2.length; i++) {       //然后 发文单位条件选中状态 只有确认提交过的条件才能显示
          for (let j in $(".showSearch2").find('.bbb')) {
            if (this.value2[i] == $(".showSearch2").find('.bbb').eq(j).text()) {
              $(".showSearch2").find('.aaa').eq(j).attr('select', 'false').addClass('selected');
            }
          }
        }
        let idArr = [];
        for (let i = 0; i < this.value2.length; i++) {
          $(".search3").find('span').text(this.value2[0].substring(0, 3) + '...');
          $(".tip2").text(this.value2.join(',').substring(0, 8) + '...');
          for (let j = 0; j < this.sxlistItem[2].item.length; j++) {
            if (this.value1[i] == this.sxlistItem[2].item[j].name) {
              idArr.push(this.sxlistItem[2].item[j].id)
            }
          }
        }
      },
      // 发文单位正面筛选框 确认后保存状态
      xianshiTwo() {
        let arr = [];
        let idarr = [];
        for (let i in this.fawenStatus) {
          for (let j in this.fawenIdStatus) {
            if (this.fawenIdStatus[j] == this.fawenStatus[i]['id']) {
              //console.log(i, this.fawenStatus[i]['name'])
              arr.push(this.fawenStatus[i]['name']);
              idarr.push(this.fawenStatus[i]['id']);
            }
          }
        }
        for (let i in $(".showSearch1").find('.aaa')) {       //关闭当前筛选条件栏后 首先重置所有的选中样式
          $(".showSearch1").find('.aaa').eq(i).attr('select', 'true').removeClass('selected');
        }
        this.value1 = arr;
        this.trueFawenWord = arr;
        this.idarr1 = idarr;
        ////console.log("此时发文单位的文字arr为", this.value1, this.idarr1)
        //为点击确认按钮后的选中筛选条件显示
        for (let i = 0; i < this.value1.length; i++) {
          $(".search2").find('span').text(this.value1[0].substring(0, 3) + '...');
          $(".tip1").text(this.value1.join(',').substring(0, 8) + '...');
        }
        if (this.value1.length == 0) {
          $(".search2").find('span').text('发文单位');
          $(".tip1").text('');
        }
        for (let i = 0; i < this.value1.length; i++) {       //然后 发文单位条件选中状态 只有确认提交过的条件才能显示
          for (let j in $(".showSearch1").find('.bbb')) {
            if (this.value1[i] == $(".showSearch1").find('.bbb').eq(j).text()) {
              $(".showSearch1").find('.aaa').eq(j).attr('select', 'false').addClass('selected');
            }
          }
        }
        let idArr = [];
        for (let i = 0; i < this.value1.length; i++) {
          $(".search2").find('span').text(this.value1[0].substring(0, 3) + '...');
          $(".tip1").text(this.value1.join(',').substring(0, 8) + '...');
          for (let j = 0; j < this.sxlistItem[1].item.length; j++) {
            if (this.value1[i] == this.sxlistItem[1].item[j].name) {
              idArr.push(this.sxlistItem[1].item[j].id)
            }
          }
        }
      },
      // 市场类型正面筛选框 确认后保存状态
      xianshiOne() {
        let arr = [];
        let idarr = [];
        for (let i in this.marketStatus) {
          for (let j in this.marketIdStatus) {
            if (this.marketIdStatus[j] == this.marketStatus[i]['id']) {
              //console.log('name++name', i, this.marketStatus[i]['name']);
              arr.push(this.marketStatus[i]['name']);
              idarr.push(this.marketStatus[i]['id']);
            }
          }
        }
        for (let i in $(".showSearch").find('.aaa')) {       //关闭当前筛选条件栏后 首先重置所有的选中样式
          $(".showSearch").find('.aaa').eq(i).attr('select', 'true').removeClass('selected');
        }
        this.value0 = arr;
        this.trueMarketWord = arr;
        this.idarr0 = idarr;
        //console.log("此时市场类型的文字arr为", this.value0, this.idarr0);
        //为点击确认按钮后的选中筛选条件显示
        for (let i = 0; i < this.value0.length; i++) {
          $(".search1").find('span').text(this.value0[0].substring(0, 3) + '...')
          $(".tip").text(this.value0.join(',').substring(0, 8) + '...')
        }
        if (this.value0.length == 0) {
          $(".search1").find('span').text('市场类型');
          $(".tip").text('')
        }
        for (let i = 0; i < this.value0.length; i++) {       //然后 市场类型条件选中状态 只有确认提交过的条件才能显示
          for (let j in $(".showSearch").find('.bbb')) {
            if (this.value0[i] == $(".showSearch").find('.bbb').eq(j).text()) {
              $(".showSearch").find('.aaa').eq(j).attr('select', 'false').addClass('selected');
            }
          }
        }
        let idArr = [];
        for (let i = 0; i < this.value0.length; i++) {
          $(".search1").find('span').text(this.value0[0].substring(0, 3) + '...')
          $(".tip").text(this.value0.join(',').substring(0, 8) + '...')
          for (let j = 0; j < this.sxlistItem[0].item.length; j++) {
            if (this.value0[i] == this.sxlistItem[0].item[j].name) {
              idArr.push(this.sxlistItem[0].item[j].id)
            }
          }
        }
      },
      // 路由传值 去空格加逗号
      noep(texts) {
        if (texts.indexOf(" ") == -1) {
          return texts;
        } else {
          let textss = [];
          textss = texts.split(' ');
          for (let i = 0; i < textss.length; i++) {
            if (textss[i] == "" || typeof(textss[i]) == "undefined") {
              textss.splice(i, 1);
              i = i - 1;
            }
          }
          return texts = textss.join(",");
        }
      },
      // 筛选确认调用接口
      shaixuanY() {
        this.ruleslist = [];
        this.top = 1;
        this.shadowLoading = true; // 加载中出现
        this.targetStr();
        this.allLoaded = true;
        this.yeah();
        this.value0text();
        this.value1text();
        this.value2text();
        this.value3text();
        console.log("00012301", this.value0.length, this.value2, this.value3, this.idarr0, this.idarr1, this.idarr2);
      },

      // 时效性 回显状态
      value3text() {
        console.log("this.value3", this.value3);
        // console.log('sldkj', this.value3);
        if (this.value3 == [] && this.value3.length == 0) {
          $(".tip3").text('');
        } else {
          for (let i = 0; i < this.value3.length; i++) {
            $(".tip3").text(this.value3.join(',').substring(0, 8) + '...')
          }
        }
      },
      // 规则类别 回显状态
      value2text() {
        console.log("this.value2", this.value2);
        if (this.value2 == [] && this.value2.length == 0) {
          $(".search3").find('span').text('规则类别');
          $(".tip2").text('');
        } else {
          for (let i = 0; i < this.value2.length; i++) {
            $(".search3").find('span').text(this.value2[0].substring(0, 3) + '...');
            $(".tip2").text(this.value2.join(',').substring(0, 8) + '...');
          }
        }
        // console.log("value2text", this.value2, idArr);
      },
      // 发文单位 回显状态
      value1text() {
        console.log("this.value1", this.value1);
        if (this.value1 == [] && this.value1.length == 0) {
          $(".search2").find('span').text('发文单位');
          $(".tip1").text('');
        } else {
          for (let i = 0; i < this.value1.length; i++) {
            $(".search2").find('span').text(this.value1[0].substring(0, 3) + '...');
            $(".tip1").text(this.value1.join(',').substring(0, 8) + '...');
          }
        }
      },
      // 市场类型 回显状态
      value0text() {
        console.log("this.value0", this.value0);
        if (this.value0 == [] && this.value0.length == 0) {
          $(".search1").find('span').text('市场类型');
          $(".tip").text('');
          // console.log("-===----==>", this.value0);
        } else {
          for (let i = 0; i < this.value0.length; i++) {
            $(".search1").find('span').text(this.value0[0].substring(0, 3) + '...');
            $(".tip").text(this.value0.join(',').substring(0, 8) + '...');
          }
        }
        // console.log("-----==>", this.value0, $(".search1").find('span').text());
      },
      //
      anlist() {
        // 筛选 时间控件
        let user = "";
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";
          $(".inputBox").css('width', '70%');
        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0";
          $(".inputBox").css('width', '65%');
        }
      },
      // 路由传值多个关键词拆分搜索
      multipleKeyRetrieval() {
        let titleI = [], contentI = [], key = "";
        if (window.localStorage.getItem("titleIME") == null) {
          // console.log("titleIME");
        } else {
          titleI = window.localStorage.getItem("titleIME").split("$#");
        }
        /**/
        if (window.localStorage.getItem("contentIME") == null) {
          // console.log("contentIME");
        } else {
          contentI = window.localStorage.getItem("contentIME").split("$#");
        }
        /**/
        if (window.localStorage.getItem("keyIME") == null) {
          // console.log("keyIME");
        } else {
          key = window.localStorage.getItem("keyIME");
        }
        /**/
        // console.log(titleI, contentI, key);
        /**/
        if (window.localStorage.getItem("colorBtn") == null) {
          // console.log("123colorBtn", 2132432523);
        } else {
          let colorBt = window.localStorage.getItem("colorBtn");
          let scolorBtn = colorBt.split("$#");
          if (scolorBtn[0] == "标题" && scolorBtn[1] == "精确") {
            if (titleI[0].indexOf(",") == -1) {
              this.titleKey = titleI[0].split(',');
            } else {
              this.titleKey = titleI[0].split(",");
            }
            //console.log("675657657", titleI[0]);
          } else if (scolorBtn[0] == "全文" && scolorBtn[1] == "精确") {
            if (contentI[0].indexOf(",") == -1) {
              this.titleKey = contentI[0].split(',');
            } else {
              this.titleKey = contentI[0].split(",");
            }
            // console.log("675657657", contentI[0]);
          } else {
            this.titleKey = key.split(",");
            // console.log("675657657", key.split(" "));
          }
        }
        // console.log("");
        let newTitleKey = this.titleKey.join(",").split(",");
        this.newTitleKey = newTitleKey;
        this.ImpArr(this.newTitleKey); // 数组去除空元素
        // *this.titleIncludes = this.titleKey.join(",");*/
        // console.log(newTitleKey, "-------------", this.newTitleKey, this.titleKey, "=====", this.titleIncludes);
      },
      // 控制字块长度
      strLength(read, Newarr, num) {
        // 传入的数组，//处理后的数组
        let sArr = '';
        for (let i = 0; i < read.length; i++) {
          if (read[i].length > num) {
            sArr = read[i].substring(0, num) + "...";
          } else {
            sArr = read[i];
          }
          Newarr.push(sArr);
        }
      },
      // 点击推荐使用高级搜索 弹出高级搜索侧边栏
      showSenior() {
        this.popupVisible = true;
      },
      entryText() {
        let colorBtn = $('.rangeBtn div .colorBtn');
        let colorBtn2 = $('.rangeBtn_2 div .colorBtn');
        if (colorBtn.text() == "全文" && colorBtn2.text() == "精确") {
          $(".titleTip").hide();
        } else {
          if (this.titleIncludes.trim() == "" || this.titleIncludes.trim().length == 0) {
            $(".titleTip").show();
          } else {
            $(".titleTip").hide();
          }
        }
      },
      entryText1() {
        if (this.contentIncludes.trim() == "" || this.contentIncludes.trim().length == 0) {
          $(".titleTip1").show();
        } else {
          $(".titleTip1").hide();
        }
      },
      entrybug(event) {     //安卓弹起输入框时 隐藏确定重置按钮 footBtn
        let el = event.currentTarget;
        let elId = $(el)[0].id;
        this.$const.androidTop(elId);
      },
      hideMarket() {  //关闭侧边栏后发文单位筛选设置样式
        let marketText = $('.sxitemBox:nth-child(1)').find(".listText");
        let arr = [];
        let idarr = [];
        for (let i in this.marketStatus) {
          for (let j in this.marketIdStatus) {
            if (this.marketIdStatus[j] == this.marketStatus[i]['id']) {
              arr.push(this.marketStatus[i]['name']);
              idarr.push(this.marketStatus[i]['id']);
            }
          }
        }
        this.value0 = arr;
        if (arr.length == 0) {
          $(".search1").find('span').text('市场类型');
        }
        this.idarr0 = idarr;
        for (let i in marketText) {
          for (let j in arr) {
            if (marketText.eq(i).text() == arr[j]) {
              marketText.eq(i).parent().find('.itemTip').addClass('selected').attr('select', 'false');
            } else {
              marketText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
          }
        }
        console.log("this.marketIdStatus", this.marketStatus, this.marketIdStatus);
      },
      hideFawen() {
        let unitsText = $('.sxitemBox:nth-child(2)').find(".listText");
        let arr = [];
        let idarr = [];
        for (let i in this.fawenStatus) {
          for (let j in this.fawenIdStatus) {
            if (this.fawenIdStatus[j] == this.fawenStatus[i]['id']) {
              //console.log(i, this.fawenStatus[i]['name']);
              arr.push(this.fawenStatus[i]['name']);
              idarr.push(this.fawenStatus[i]['id']);
            }
          }
        }
        //console.log("this.fawenIdStatus==>", this.fawenStatus, this.fawenIdStatus);
        this.value1 = arr;
        if (arr.length == 0) {
          $(".search2").find('span').text('发文单位');
        }
        this.idarr1 = idarr;
        for (let i in unitsText) {
          for (let j in arr) {   //unitsText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            if (unitsText.eq(i).text() == arr[j]) {
              unitsText.eq(i).parent().find('.itemTip').addClass('selected').attr('select', 'false'); //marketText.eq(i).text(),'应该是有样式的'
            } else {
              unitsText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');// unitsText.eq(i).text(),'应该是没样式的'
            }
          }
        }
      },
      hideGuize() {
        let guizeText = $('.sxitemBox:nth-child(3)').find(".listText");
        let arr = [];
        let idarr = [];
        for (let i in this.guizeStatus) {
          for (let j in this.guizeIdStatus) {
            if (this.guizeIdStatus[j] == this.guizeStatus[i]['id']) {
              console.log("===123123===>", i, this.guizeStatus[i]['name']);
              arr.push(this.guizeStatus[i]['name']);
              idarr.push(this.guizeStatus[i]['id']);
            }
          }
        }
        //console.log("", guizeText,);
        this.value2 = arr;
        this.trueGuizeWord = arr;
        this.idarr2 = idarr;
        if (arr.length == 0) {
          $(".search3").find('span').text('规则类别')
        }
        for (let i in guizeText) {
          for (let j in arr) {   //unitsText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            if (guizeText.eq(i).text() == arr[j]) {
              guizeText.eq(i).parent().find('.itemTip').addClass('selected').attr('select', 'false'); //marketText.eq(i).text(),'应该是有样式的'
            } else {
              guizeText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');// unitsText.eq(i).text(),'应该是没样式的'
            }
          }
        }
      },
      hideTime() {
        let timeText = $('.sxitemBox:nth-child(4)').find(".listText");
        let arr = [];
        let idarr = [];
        //console.log('时效性条件', this.timeStatus, this.timeIdStatus)
        for (let i in this.timeStatus) {
          for (let j in this.timeIdStatus) {
            if (this.timeIdStatus[j] == this.timeStatus[i]['id']) {
              arr.push(this.timeStatus[i]['name']);
              idarr.push(this.timeStatus[i]['id']);
            }
          }
        }
        this.value3 = arr;
        this.idarr3 = idarr;
        for (let i in timeText) {
          if (arr.length !== 0) {
            for (let j in arr) {
              if (timeText.eq(i).text() == arr[j]) {
                timeText.eq(i).parent().find('.itemTip').addClass('selected').attr('select', 'false'); //marketText.eq(i).text(),'应该是有样式的'
              }
            }
          } else {
            timeText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            $(".tip3").text('');
          }
        }
        console.log("", this.value3, this.idarr3);
      },
      hideDate() {
        if (this.inputDateS == '') {
          this.timesClose1();
        }
        if (this.inputDateE == '') {
          this.timesClose2();
        }
      },
      // 开始日期
      timeStart() {
        // console.log(this.timesDate1);
        if (this.timesDate1 != '' && this.timesDate1.indexOf("/") < -1) {
          console.log("==123", this.timesDate1);
        } else {
          let data1 = this.timesDate1.split("-").join("");
          this.dateARR = data1;
          console.log("this.timesDate1", this.timesDate1, data1);
        }
        // this.dateARR =
      },
      // 结束日期
      timeEnd() {
        // console.log(this.timesDate2);
        if (this.timesDate2 != '' && this.timesDate2.indexOf("/") < -1) {
          console.log("==123", this.timesDate2);
        } else {
          let data2 = this.timesDate2.split("-").join("");
          this.dateARR2 = data2;
          console.log("this.timesDate2", this.timesDate2, data2);
        }
      },
      timesClose1() {
        this.timesDate1 = '';
        this.dateARR = "";
      },
      timesClose2() {
        this.timesDate2 = '';
        this.dateARR2 = "";
      },
      // 关闭侧边筛选
      SXhide() {
        //筛选侧边栏hide
        this.popupVisible1 = false;
        /**/
        let stausArr1 = this.value0.concat(this.value1);
        let stausArr2 = this.value2.concat(this.value3);
        let stausArr = stausArr1.concat(stausArr2);
        if (stausArr.length == 0 && this.inputDateS == '' && this.inputDateE == '') {
          //console.log('没有筛选条件');
          this.redCircleDis = false;
        } else if (stausArr.length !== 0 || this.inputDateS !== '' || this.inputDateE !== '') {
          //console.log('筛选条件', stausArr[i]);
          this.redCircleDis = true;
        } else {
          this.redCircleDis = true;
        }
        /**/
        this.$nextTick(() => {
          this.value0text();
          this.value1text();
          this.value2text();
          this.value3text();

        });
        /*筛选按钮红点状态显示*/

        /**/
        console.log("===!", $(".search1").find('span').text(), $(".search2").find('span').text(), $(".search3").find('span').text());
      },
      // 打开侧边筛选
      SXshow() {
        this.xianshi = false;
        this.xianshi1 = false;
        this.xianshi2 = false;
        this.frontStatus = false; //当侧边筛选栏显示出来之后，重置正面筛选栏状态
        this.popupVisible1 = true;//筛选侧边栏show
        $(".search-mrpx").removeClass('pass');
        this.showSearch = false;
        this.showSearch1 = false;
        this.showSearch2 = false;
        if (this.value3.length == 0) {
          $(".tip3").text('');
        } else {
          for (let i = 0; i < this.value3.length; i++) {
            $(".tip3").text(this.value3.join(',').substring(0, 8) + '...');
          }
        }
        console.log("=====>", this.value3);
        let unitsText = $('.sxitemBox:nth-child(2)').find(".listText");
        let guizeText = $('.sxitemBox:nth-child(3)').find(".listText");
        let marketText = $('.sxitemBox:nth-child(1)').find(".listText");
        this.$nextTick(() => {
          //console.log("规则类别数组--------", this.value2)
          for (let i = 0; i < this.value2.length; i++) {      //规则类别同步状态
            for (let j = 0; j < guizeText.length; j++) {
              if (this.value2[i] == guizeText.eq(j).text()) {
                guizeText.eq(j).parent().find('.itemTip').addClass('selected').attr('select', 'false');
              }
            }
          }
          let trueArr2 = [];            //侧边栏 规则类别属性select=false选中的数组
          for (let i = 0; i < guizeText.length; i++) {
            if (guizeText.eq(i).parent().find('.itemTip').attr('select') == 'false') {
              trueArr2.push(guizeText.eq(i).text());
            }
          }
          let a3 = this.value2;
          let a4 = trueArr2;
          let shao1 = [];
          let duo1 = [];
          let hebing1 = a3.concat(a4);
          hebing1.sort();
          hebing1.reverse();
          let quchong1 = $.unique(hebing1);
          console.info(a3, a4, quchong1);
          quchong1.forEach(function (qitem, index, array) {
            if (a3.every(function (item, qindex, array) {
                return qitem != item;
              })) {
              duo1.push(qitem);
            }
            if (a4.every(function (item, qindex, array) {
                return qitem != item;
              })) {
              shao1.push(qitem);
            }
          });
          console.info("a4比a3多的元素" + duo1, "少的元素" + shao1);
          for (let i = 0; i < guizeText.length; i++) {        //多余的数组元素 去掉选中状态
            if (guizeText.eq(i).text() == duo1) {
              guizeText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
          }
          if (this.value2.length == 0) {        //规则类别数组为空时 去掉选中状态
            for (let i = 0; i < guizeText.length; i++) {
              guizeText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
            $(".tip2").text('');  //规则类别数组为空时 去掉提示信息
          }
        });
        this.$nextTick(() => {
          //console.log("发文单位数组--------", this.value1)
          for (let i = 0; i < this.value1.length; i++) {       //发文单位同步状态
            for (let j = 0; j < unitsText.length; j++) {
              if (this.value1[i] == unitsText.eq(j).text()) {
                unitsText.eq(j).parent().find('.itemTip').addClass('selected').attr('select', 'false');
              }
            }
          }
          let trueArr = [];             //侧边栏 发文单位属性select=false选中的数组
          for (let i = 0; i < unitsText.length; i++) {
            if (unitsText.eq(i).parent().find('.itemTip').attr('select') == 'false') {
              trueArr.push(unitsText.eq(i).text());
            }
          }
          //console.log('a1赋值的this.value1', this.value1);
          let a1 = this.value1;
          let a2 = trueArr;
          let shao = [];
          let duo = [];
          let hebing = a1.concat(a2);
          hebing.sort();
          hebing.reverse();
          let quchong = $.unique(hebing);
          console.info(a1, a2, quchong);
          quchong.forEach(function (qitem, index, array) {
            if (a1.every(function (item, qindex, array) {
                return qitem != item;
              })) {
              duo.push(qitem);
            }
            if (a2.every(function (item, qindex, array) {
                return qitem != item;
              })) {
              shao.push(qitem);
            }
          });
          console.info("a2比a1多的元素" + duo, "少的元素" + shao);
          //console.log('筛选打开这里的this.value1是', this.value1);
          for (let i = 0; i < unitsText.length; i++) {        //多余的数组元素 去掉选中状态
            if (unitsText.eq(i).text() == duo) {
              unitsText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
          }
          if (this.value1.length == 0) {
            for (let i = 0; i < unitsText.length; i++) {
              unitsText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
            $(".tip1").text('');
          }
        });
        this.$nextTick(() => {
          for (let i = 0; i < this.value0.length; i++) {       //发文单位同步状态
            for (let j = 0; j < marketText.length; j++) {
              if (this.value0[i] == marketText.eq(j).text()) {
                marketText.eq(j).parent().find('.itemTip').addClass('selected').attr('select', 'false');
              }
            }
          }
          let trueArr = [];             //侧边栏 发文单位属性select=false选中的数组
          for (let i = 0; i < marketText.length; i++) {
            if (marketText.eq(i).parent().find('.itemTip').attr('select') == 'false') {
              trueArr.push(marketText.eq(i).text());
            }
          }
          let a1 = this.value0;
          let a2 = trueArr;
          let shao = [];
          let duo = [];
          let hebing = a1.concat(a2);
          hebing.sort();
          hebing.reverse();
          let quchong = $.unique(hebing);
          console.info(a1, a2, quchong);
          quchong.forEach(function (qitem, index, array) {
            if (a1.every(function (item, qindex, array) {
                return qitem != item;
              })) {
              duo.push(qitem);
            }
            if (a2.every(function (item, qindex, array) {
                return qitem != item;
              })) {
              shao.push(qitem);
            }
          });
          console.info("a2比a1多的元素" + duo, "少的元素" + shao);
          //console.log('筛选打开这里的this.value0是', this.value0)
          for (let i = 0; i < unitsText.length; i++) {        //多余的数组元素 去掉选中状态
            if (marketText.eq(i).text() == duo) {
              marketText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
          }
          if (this.value0.length == 0) {
            for (let i = 0; i < marketText.length; i++) {
              marketText.eq(i).parent().find('.itemTip').removeClass('selected').attr('select', 'true');
            }
            $(".tip").text('');
          }
        });
        this.hideTime();
      },
      SXReset(event) {     //筛选栏重置按钮
        let el = event.currentTarget;
        /**/
        this.value0 = [];
        this.value1 = [];
        this.value2 = [];
        this.value3 = [];
        this.idarr0 = [];
        this.idarr1 = [];
        this.idarr2 = [];
        this.idarr3 = [];
        this.guizeArr = [];
        this.gzObjarr = [];
        this.timesDate1 = '';
        this.timesDate2 = '';
        //console.log($(".sxLists").find('.itemTip').length);
        $(".sxLists").find('.itemTip').attr('select', 'true').removeClass('selected');
        $(".sxLists").find('.tipText').text('');
        $(".search3").find('span').text('规则类别');
        $(".search2").find('span').text('发文单位');
        $(".search1").find('span').text('市场类型');
        $("input[type=date]").val('');
      },
      MarketSH(event) {
        let el = event.currentTarget;
        $(el).find('.itemTip').addClass('selected');
        if ($(el).find('.itemTip').attr('select') == 'true') {
          this.value0.push($(el).find('.listText').text())
          $(el).find('.itemTip').attr("select", 'false')
        } else if ($(el).find('.itemTip').attr('select') == 'false') {
          $(el).find('.itemTip').removeClass('selected');
          $(el).find('.itemTip').attr("select", 'true')
          for (let i = 0; i < this.value0.length; i++) {
            if ($(el).find('.listText').text() == this.value0[i]) {
              this.value0.splice(i, 1)
            }
          }
        }
        let idArr = [];
        for (let i = 0; i < this.value0.length; i++) {
          $(".tip").text(this.value0.join(',').substring(0, 8) + '...')
          for (let j = 0; j < this.sxlistItem[0].item.length; j++) {
            if (this.value0[i] == this.sxlistItem[0].item[j].name) {
              idArr.push(this.sxlistItem[0].item[j].id)
            }
          }
        }
        if (this.value0.length == 0) {
          $(".tip").text('')
        }
        this.idarr0 = idArr;
        //console.log('市场类型idArr', idArr)

        //若是在没有填写市场类型的情况下 先行填写了规则类别
        if (this.value0.length == 1) {
          let newidarr = [];
          //console.log("之前没填过市场类型")
          console.log("之前没填过市场类型", this.idarr2);
          for (let i = 0; i < this.value0.length; i++) {
            for (let j = 0; j < this.sxlistItem[0].item.length; j++) {
              if (this.value0[i] == this.sxlistItem[0].item[j].name) {
                for (let x = 0; x < this.guizeArr[j].length; x++) {
                  for (let y = 0; y < this.idarr2.length; y++) {
                    if (this.idarr2[y] == this.guizeArr[j][x].id) {
                      newidarr.push(this.idarr2[y]);
                    }
                  }
                }
              }
            }
          }
          this.idarr2 = newidarr;
          //console.log("经过市场类型筛选后的规则类别", this.idarr2)
        } else if (this.value0.length > 1) {
          let selectText = $(el).find('.listText').text()
          //console.log("增加市场类型,此时的规则类别id数组", this.idarr2)
          for (let i = 0; i < this.sxlistItem[0].item.length; i++) {
            if (selectText == this.sxlistItem[0].item[i].name) {
              for (let x = 0; x < this.guizeArr[i].length; x++) {
                for (let j = 0; j < this.value2.length; j++) {
                  if (this.guizeArr[i][x].name == this.value2[j]) {
                    this.idarr2.push(this.guizeArr[i][x].id)
                  }
                }
              }
            }
          }
        }
      },
      // 侧边筛选 时效性
      TimeSH(event) {
        let el = event.currentTarget;
        $(el).find('.itemTip').addClass('selected');
        if ($(el).find('.itemTip').attr('select') == 'true') {
          this.value3.push($(el).find('.listText').text());
          $(el).find('.itemTip').attr("select", 'false');
        } else if ($(el).find('.itemTip').attr('select') == 'false') {
          $(el).find('.itemTip').removeClass('selected');
          $(el).find('.itemTip').attr("select", 'true');
          for (let i = 0; i < this.value3.length; i++) {
            if ($(el).find('.listText').text() == this.value3[i]) {
              this.value3.splice(i, 1);
            }
          }
        }
        let idArr = [];
        for (let i = 0; i < this.value3.length; i++) {
          $(".tip3").text(this.value3.join(',').substring(0, 8) + '...');
          for (let j = 0; j < this.sxlistItem[3].item.length; j++) {
            if (this.value3[i] == this.sxlistItem[3].item[j].name) {
              idArr.push(this.sxlistItem[3].item[j].id);
            }
          }
        }
        if (this.value3.length == 0) {
          $(".tip3").text('');
        }
        this.idarr3 = idArr;
        console.log('时效性idArr', this.value3, this.idarr3, idArr);
      },
      // 侧边栏规则类别选中
      SortSH(event) {
        let el = event.currentTarget;
        $(el).find('.itemTip').addClass('selected');
        // console.log('1111', $(el).find('.itemTip').attr('select'))
        if ($(el).find('.itemTip').attr('select') == 'true') {
          this.value2.push($(el).find('.listText').text());
          $(el).find('.itemTip').attr("select", 'false');
        } else if ($(el).find('.itemTip').attr('select') == 'false') {
          $(el).find('.itemTip').removeClass('selected');
          $(el).find('.itemTip').attr("select", 'true');
          for (let i = 0; i < this.value2.length; i++) {
            if ($(el).find('.listText').text() == this.value2[i]) {
              this.value2.splice(i, 1);
            }
          }
        }
        let idArr = [];
        // //console.log('市场类型', this.value0, '-----------', '规则类别数组', this.guizeArr);
        if (this.value0.length == 0) {
          // //console.log('并未选中市场类型')
          for (let i = 0; i < this.value2.length; i++) {
            $(".search3").find('span').text(this.value2[0].substring(0, 3) + '...')
            $(".tip2").text(this.value2.join(',').substring(0, 8) + '...')
            for (let j = 0; j < this.guizeArr.length; j++) {
              for (let x = 0; x < this.guizeArr[j].length; x++) {
                if (this.value2[i] == this.guizeArr[j][x].name) {
                  let obj = {id: this.guizeArr[j][x].id, name: this.guizeArr[j][x].name};
                  this.gzObjarr.push(obj);
                  idArr.push(this.guizeArr[j][x].id);
                }
              }
            }
          }
          if (this.value2.length == 0) {
            $(".search3").find('span').text('规则类别');
            $(".tip2").text('');
          }
          // //console.log('未选中市场类型情况下', this.gzObjarr);
          this.idarr2 = idArr;
          // //console.log('规则类别idArr', this.idarr2);       //未选中市场类型情况下 规则类别的id数组
        } else {                                              //选中市场类型情况下 规则类别的id数组
          for (let i = 0; i < this.value2.length; i++) {
            $(".search3").find('span').text(this.value2[0].substring(0, 3) + '...')
            $(".tip2").text(this.value2.join(',').substring(0, 8) + '...')
            for (let j = 0; j < this.guizeArr.length; j++) {
              for (let x = 0; x < this.guizeArr[j].length; x++) {
                if (this.value2[i] == this.guizeArr[j][x].name) {
                  let obj = {id: this.guizeArr[j][x].id, name: this.guizeArr[j][x].name};
                  this.gzObjarr.push(obj);
                  idArr.push(this.guizeArr[j][x].id);
                }
              }
            }
          }
          if (this.value2.length == 0) {
            $(".search3").find('span').text('规则类别');
            $(".tip2").text('');
          }
          // //console.log('未选中市场类型情况下', this.gzObjarr);
          this.idarr2 = idArr;
          // //console.log('选中状态开启!');
          for (let i = 0; i < this.value2.length; i++) { // 首先循环选中状态的规则类别值
            $(".search3").find('span').text(this.value2[0].substring(0, 3) + '...');
            $(".tip2").text(this.value2.join(',').substring(0, 8) + '...');
            for (let q = 0; q < this.sxlistItem[0].item.length; q++) {  // 循环市场类型数组
              for (let n = 0; n < this.value0.length; n++) {      // 循环是否选中的市场类型
                if (this.value0[n] == this.sxlistItem[0].item[q].name) {    // 若选中市场类型则返回其在guizeArr中的下标值
                  // //console.log('选中的市场类型的下标值', q);
                  for (let j = 0; j < this.guizeArr[q].length; j++) { // 然后循环选中的市场类型下的规则类别数组
                    if (this.value2[i] == this.guizeArr[q][j].name) {   // 若选中规则类别值等于选中市场类型下规则类别数组的name值 返回其id值
                      let obj = {id: this.guizeArr[q][j].id, name: this.guizeArr[q][j].name};
                      this.gzObjarr.push(obj);
                      idArr.push(this.guizeArr[q][j].id);
                    }
                  }
                }
              }
            }
          }
          if (this.value2.length == 0) {
            $(".search3").find('span').text('规则类别');
            $(".tip2").text('');
          }
          // //console.log('-----------', this.gzObjarr);
          this.idarr2 = idArr;
          // //console.log('规则类别idArr:', this.idarr2);
          // //console.log('选中市场类型下的规则类别idArr', this.idarr2);
        }
      },
      UnitSH(event) {
        let el = event.currentTarget;
        // console.log($(el));
        $(el).find('.itemTip').addClass('selected');
        // console.log('1111', $(el).find('.itemTip').attr('select'));
        if ($(el).find('.itemTip').attr('select') == 'true') {
          this.value1.push($(el).find('.listText').text());
          $(el).find('.itemTip').attr("select", 'false');
        } else if ($(el).find('.itemTip').attr('select') == 'false') {
          // console.log('2222', $(el).find('.itemTip').attr('select'));
          $(el).find('.itemTip').removeClass('selected');
          $(el).find('.itemTip').attr("select", 'true');
          for (let i = 0; i < this.value1.length; i++) {
            if ($(el).find('.listText').text() == this.value1[i]) {
              this.value1.splice(i, 1);
            }
          }
        }
        let idArr = [];
        for (let i = 0; i < this.value1.length; i++) {
          $(".search2").find('span').text(this.value1[0].substring(0, 3) + '...');
          $(".tip1").text(this.value1.join(',').substring(0, 8) + '...');
          for (let j = 0; j < this.sxlistItem[1].item.length; j++) {
            if (this.value1[i] == this.sxlistItem[1].item[j].name) {
              idArr.push(this.sxlistItem[1].item[j].id);
            }
          }
        }
        if (this.value1.length == 0) {
          $(".search2").find('span').text('发文单位');
          $(".tip1").text('');
        }
        this.idarr1 = idArr;
        // console.log('发文单位idArr', idArr);
      },
      showItem(i) {
        // let itemCon = $(".itemconBOX[isOpen]").eq(index);
        // console.log(itemCon.parent().find("i"));
        if ($(".itemconBOX[isOpen]").eq(i).attr('isOpen') == 'close') {
          $(".itemconBOX[isOpen]").eq(i).show().parent().siblings().find(".itemconBOX[isOpen]").hide();
          $(".itemconBOX[isOpen]").eq(i).attr('isOpen', 'open');
        } else {
          $(".itemconBOX[isOpen]").eq(i).hide();
          $(".itemconBOX[isOpen]").eq(i).attr('isOpen', 'close');
        }
        console.log($(".itemconBOX[isOpen]").eq(i).attr('isOpen'));
      },

      // 正面筛选条件 市场类型 重置
      MRreset(event) {
        let el = event.currentTarget;
        let father = $(el).parent().parent();
        for (let i in father.find('.aaa')) {
          if (father.find('.aaa').eq(i).attr('select') == 'false') {
            father.find('.aaa').eq(i).attr('select', 'true').removeClass('selected');
          }
        }
        this.value0 = [];
        this.idarr0 = [];//重置市场类型数组
        $(".search1").find('span').text('市场类型')
        // //console.log('12', this.guizeStatus);
      },
      // 正面筛选条件 规则类别 重置
      GZreset(event) {
        this.yeahFlag = false; // 重置后确认按钮恢复为false
        let el = event.currentTarget;
        let father = $(el).parent().parent();
        for (let i in father.find('.aaa')) {
          if (father.find('.aaa').eq(i).attr('select') == 'false') {
            father.find('.aaa').eq(i).attr('select', 'true').removeClass('selected');
          }
        }
        this.value2 = [];
        this.idarr2 = [];//重置规则类别数组
        $(".search3").find('span').text('规则类别');
        this.redCircleStatus();
      },
      // 没有筛选条件的时候让小红点消失
      redCircleStatus() {
        let stausArr1 = this.value0.concat(this.value1);
        let stausArr2 = this.value2.concat(this.value3);
        let stausArr = stausArr1.concat(stausArr2);
        if (stausArr.length == 0 && this.inputDateS == '' && this.inputDateE == '') {
          this.redCircleDis = false;
        } else {
          this.redCircleDis = true;
        }
        // console.log("redCircleStatus===>",stausArr,this.inputDateS,this.inputDateE);
      },
      // 正面筛选条件 发文单位 重置
      reset(event) {  // 重置发文单位筛选条件
        this.fawenStatus = [];// 重置保存发文单位的筛选条件
        this.fawenIdStatus = [];
        this.yeahFlag = false; // 重置后确认按钮恢复为false
        let el = event.currentTarget;
        let father = $(el).parent().parent();
        for (let i in father.find('.aaa')) {
          if (father.find('.aaa').eq(i).attr('select') == 'false') {
            father.find('.aaa').eq(i).attr('select', 'true').removeClass('selected');
          }
        }
        this.value1 = [];
        this.idarr1 = [];// 重置发文单位数组
        $(".search2").find('span').text('发文单位');
        this.redCircleStatus();
      },
      // 筛选\高级\初始化\控制的ajax
      yeah() {        // 点击确定发送请求数据
        this.noInfoShow = false;
        $("#LoadScroll").css("margin-bottom", "0.8rem");
        this.gunflag = false;
        this.yeahFlag = true; // 点击确认按钮后 yeahFlag开关打开 此时还有一种情况为加载更多的触发情况
        let markerIds = this.idarr0.join(',');
        let unitIds = this.idarr1.join(','); // 发文单位
        this.idarr2 = this.$array.unique(this.idarr2);
        let cateIds = this.idarr2.join(',');
        let idarr3Id = this.$array.ImpArr(this.idarr3);
        let timelinessIds = idarr3Id.join(',');
        // console.log("====", idarr3Id, this.idarr3, timelinessIds);
        // 规则类别id值 如果只选了市场类型 cateIds就填市场类型的id  如果市场类型和规则类别都填了 cateIds只写规则类别的id
        // console.log('this.idarr0', this.idarr0,"this.idarr1",this.idarr1, 'this.idarr2', this.idarr2);
        /**/
        let releaseStart = this.timesDate1;
        let releaseEnd = this.timesDate2;
        this.timesDate1 ? releaseStart = this.timesDate1 : releaseStart = "";
        this.timesDate2 ? releaseEnd = this.timesDate2 : releaseEnd = "";
        if (releaseStart.indexOf("-") > -1) {
          console.log("====1=>");
        } else {
          releaseStart = "";
        }
        if (releaseEnd.indexOf("-") > -1) {
          console.log("====2=>");
        } else {
          releaseEnd = "";
        }
        // console.log("=====>", this.timesDate1, this.timesDate2, releaseStart, releaseEnd);
        if (Array.isArray(this.titleIncludes)) {
          this.titleIncludes = this.titleIncludes.join(",");
        }
        /**/
        // *********************高级选项************************ */
        this.$http({
          method: "GET",
          url: this.$api.host + "law/search",
          params: this.ruleParams
        }).then((res) => {
          // console.log('返回结果', res);
          // 保存筛选条件状态
          this.fawenIdStatus = this.idarr1;     // 保存 提交的发文单位的筛选条件
          this.guizeIdStatus = this.idarr2;  // 保存 提交的规则类别的筛选条件
          this.timeIdStatus = timelinessIds.split(','); // 保存 提交的时效性的筛选条件
          this.marketIdStatus = this.idarr0; // 保存 提交的市场类型的筛选条件
          releaseStart ? this.inputDateS = releaseStart : this.inputDateS = "";
          releaseEnd ? this.inputDateE = releaseEnd : this.inputDateE = "";
          // this.inputDateE = releaseEnd;
          this.yeahFlag = false; // 点击确认按钮获取到内容后 yeahFlag开关关闭false
          if (res.data.returnCode == 1) {
            this.onloadOpen = true;// 返回内容后 打开上滑加载的开关
            if (res.data.returnObject.list == null || res.data.returnObject.list == []) {
              this.noInfoShow = true;
            } else {
              this.noInfoShow = false;// 有筛选结果的提示页面消失
            }
            if (res.data.returnObject.count == "" || res.data.returnObject.count == null) {
              this.num = 0;
            } else {
              this.num = res.data.returnObject.count;
            }
            // res.data.returnObject.count ? this.num = res.data.returnObject.count : this.num = 0;
            if (this.num < 5) {
              this.allLoaded = false;
              this.infLoading = false;
            } else {
              this.infLoading = true;
            }
            this.Number = res.data.returnObject.count;
            if (this.Number >= 30) {
              $('.showPrompt').css('opacity', 1);
              setTimeout(() => {
                $('.showPrompt').animate({bottom: "0px", opacity: 0});
              }, 2500);
            } else {
              $('.showPrompt').css('opacity', 0);
              setTimeout(() => {
                $('.showPrompt').animate({bottom: "0px", opacity: 0});
              }, 1000);
            }
            /**/
            let colorBtn = $('.rangeBtn div .colorBtn').text();
            if (this.Number <= 3 && colorBtn == '标题') {
              // 如果筛选的结果小于3条 显示提示高级搜索
              this.seniorTextShow = true;
            } else if (this.Number <= 3 && colorBtn == '全文') {
              this.seniorTextShow = false;
            } else {
              this.seniorTextShow = false;
            }
            console.log(this.num, colorBtn);
            this.shadowLoading = false;// 加载中消失
            this.allLoaded = true;
            let content = res.data.returnObject.list;
            this.ruleslist = this.$array.loadMore(this.ruleslist, content); // 数据push
            if (this.seniorTextShow === false && content == null) {
              this.noInfoShow = true;
            }
            /**/
            this.rulesListNum = this.ruleslist.length;
            // 关闭当前栏目
            $(".search-mrpx").removeClass('pass');
            this.showSearch1 = false; // 发文单位的显示
            this.xianshi1 = false;
            this.showSearch2 = false; // 规则类别的显示
            this.xianshi2 = false;
            this.showSearch = false;  // 市场类型的显示
            this.xianshi = false;
            this.popupVisible1 = false;
            // *筛选按钮红点状态显示*/
            let stausArr1 = this.value0.concat(this.value1);
            let stausArr2 = this.value2.concat(this.value3);
            let stausArr = stausArr1.concat(stausArr2);
            console.log("=2=1=", this.value0, this.value1, this.value2, this.value3);

            if (stausArr.length == 0 && this.inputDateS == '' && this.inputDateE == '') {
              this.redCircleDis = false;
            } else {
              // && this.frontStatus== false  加上这个条件是区别正面筛选条件和侧边栏筛选条件
              this.redCircleDis = true;
              this.xianshiOne();
              this.xianshiTwo();
              this.xianshiThree();
              this.SXhide();
              console.log(']]]]]]]]]]]]]]', this.value1, stausArr, this.inputDateS, this.inputDateE);
            }

          } else if (res.data.returnCode == -1) {
            this.shadowLoading = false;// 加载中消失
            // 关闭当前栏目
            $(".search-mrpx").removeClass('pass');
            this.showSearch1 = false;
            this.xianshi1 = false;
            this.showSearch2 = false;
            this.xianshi2 = false;
            this.showSearch = false;
            this.xianshi = false;
            this.popupVisible1 = false;
            /* $(".shadow").hide(); */
            this.noInfoShow = true;// 没有筛选结果的提示页面显示
            this.seniorTextShow = false; // "flex"  6.1版本苹果机上 文字提示信息 上拉出现bug
            this.num = 0;
          }
        }).catch((err) => {
          setTimeout(() => {
            this.shadowLoading = false;
          }, 500);
          this.noInfoShow = true;
        });
        // 同步筛选栏 发文单位-规则类别 数据
        this.popupVisible1 = false;
        this.InsideAndOutside();
      },
      // 筛选数据
      InsideAndOutside() {
        let showText = $(".showSearch1").find('.bbb');
        for (let i = 0; i < this.value1.length; i++) {
          for (let j = 0; j < showText.length; j++) {
            if (this.value1[i] == showText.eq(j).text()) {
              showText.eq(j).parent().find('.aaa').addClass('selected').attr('select', 'false');
            }
          }
        }
        let trueArr = [];
        for (let i = 0; i < showText.length; i++) {
          if (showText.eq(i).parent().find('.aaa').attr('select') == 'false') {
            trueArr.push(showText.eq(i).text());
          }
        }
        let a1 = this.value1;
        let a2 = trueArr;
        let shao = [];
        let duo = [];
        let hebing = a1.concat(a2);
        hebing.sort();
        hebing.reverse();
        let quchong = $.unique(hebing);
        quchong.forEach(function (qitem, index, array) {
          if (a1.every(function (item, qindex, array) {
              return qitem != item;
            })) {
            duo.push(qitem);
          }
          if (a2.every(function (item, qindex, array) {
              return qitem != item;
            })) {
            shao.push(qitem);
          }
        });
        for (let i = 0; i < showText.length; i++) {
          for (let j = 0; j < duo.length; j++) {
            if (showText.eq(i).text() == duo[j]) {
              showText.eq(i).parent().find('.aaa').removeClass('selected').attr('select', 'true');
            }
          }
        }
        let guizeText = $(".showSearch2").find('.bbb');
        for (let i = 0; i < this.value2.length; i++) {
          for (let j = 0; j < guizeText.length; j++) {
            if (this.value2[i] == guizeText.eq(j).text()) {
              guizeText.eq(j).parent().find('.aaa').addClass('selected').attr('select', 'false');
            }
          }
        }
        let trueArr2 = [];            //侧边栏 规则类别属性select=false选中的数组
        for (let i = 0; i < guizeText.length; i++) {
          if (guizeText.eq(i).parent().find('.aaa').attr('select') == 'false') {
            trueArr2.push(guizeText.eq(i).text());
          }
        }
        let a3 = this.value2;
        let a4 = trueArr2;
        let shao1 = [];
        let duo1 = [];
        let hebing1 = a3.concat(a4);
        hebing1.sort();
        hebing1.reverse();
        let quchong1 = $.unique(hebing1);
        quchong1.forEach(function (qitem, index, array) {
          if (a3.every(function (item, qindex, array) {
              return qitem != item;
            })) {
            duo1.push(qitem);
          }
          if (a4.every(function (item, qindex, array) {
              return qitem != item;
            })) {
            shao1.push(qitem);
          }
        });
        for (let i = 0; i < guizeText.length; i++) {        //多余的数组元素 去掉选中状态
          for (let j = 0; j < duo1.length; j++) {
            if (guizeText.eq(i).text() == duo1[j]) {
              guizeText.eq(i).parent().find('.aaa').removeClass('selected').attr('select', 'true');
            }
          }
        }
      },
      /* //控制 默认排序筛选栏 显示隐藏*/
      newBtnArr(str) {
        if (str.length >= 10) {
          return str = str.substring(0, 10) + '...';
        } else {
          return str
        }
      },
      //搜索时候将关键词用逗号拼接
      targetStr() {
        if (this.titleIncludes.trim().indexOf(" ") !== -1) {
          this.titleIncludes = this.titleIncludes.split(" ").join(",");
        }
        if (this.titleMaybeIncludes.trim().indexOf(" ") !== -1) {
          this.titleMaybeIncludes = this.titleMaybeIncludes.split(" ").join(",");
        }
        if (this.titleExcludes.trim().indexOf(" ") !== -1) {
          this.titleExcludes = this.titleExcludes.split(" ").join(",");
        }
        if (this.contentIncludes.trim().indexOf(" ") !== -1) {
          this.contentIncludes = this.contentIncludes.split(" ").join(",");
        }
        if (this.contentMaybeIncludes.trim().indexOf(" ") !== -1) {
          this.contentMaybeIncludes = this.contentMaybeIncludes.split(" ").join(",");
        }
        if (this.contentExcludes.trim().indexOf(" ") !== -1) {
          this.contentExcludes = this.contentExcludes.split(" ").join(",");
        }
      },
      key(str) {
        let hei = document.body.clientWidth;
        let nowH = parseInt((hei - 39) / 16) * 2;
        if (str.length >= nowH) {
          str = str.substring(0, nowH) + '...';
        } else {
          str
        }
        let arr = "";
        let ar = this.Newarr.join(",");
        let strin = ar + "," + this.contentIncludes + "," + this.titleIncludes;
        let array = strin.split(",");
        this.ImpArr(array);//数组去除空元素
        array = this.$array.unique(array);
        for (let i = 0; i < array.length; i++) {
          let fen = str.split(array[i]);
          str = fen.join('<span style="color: #ffc051;">' + array[i] + '</span>');
        }
        return str;
      },
      unique(arr) {//数组去重
        let result = [];
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
          if (!obj.hasOwnProperty(arr[i])) {
            result.push(arr[i]);
            obj[arr[i]] = 0;
          }
        }
        return result
      },
      show() {
        //console.log('LLLLLLLLLLLLLL', this.selectItems);
        /*if (this.loading == false) { ////加载完成点击生效 evans for 10，11 15：16*/
        if (this.xianshi == true) {
          this.xianshi = false;
          this.showSearch = false;
          //console.log(this.xianshi);
        } else if (this.xianshi == false) {
          this.xianshi = true;
          this.xianshi1 = false;
          this.xianshi2 = false;
          let showHei = ($('body').outerHeight()) - ($('.searchs').outerHeight()) - ($('.searchBox').outerHeight()) + 'px'
          // $(".showSearch").height(this.heightDom.ruleslistHeight+'px');  //默认排序显示
          this.showSearch = true;
          this.showSearch1 = false;  //隐藏发文单位
          this.showSearch2 = false;   //隐藏规则类别
        }
        $('.itembox .item:last-child').find('.itemHline').hide();
        if ((this.selectItems[0].item).length % 2 !== 0) {
          $('.showSearch .item:last-child').css('width', '100%')
        }
        /*}*/
      },
      show2() {          //控制 发文单位筛选栏 显示隐藏
        /*if (this.loading == false) { ////加载完成点击生效 evans for 10，11 15：16*/
        if (this.xianshi1 == true) {
          this.xianshi1 = false
          this.showSearch1 = false; //发文单位筛选栏 隐藏
        } else if (this.xianshi1 == false) {
          this.xianshi1 = true;
          this.xianshi = false;
          this.xianshi2 = false;
          let showHei = ($('body').outerHeight()) - ($('.searchs').outerHeight()) - ($('.searchBox').outerHeight()) + 'px'
          // $(".showSearch1").height(this.heightDom.ruleslistHeight+'px');
          this.showSearch1 = true;
          //发文单位筛选条件显示  默认排序规则类别筛选条件隐藏
          this.showSearch = false;   //隐藏默认排序
          this.showSearch2 = false;  //隐藏规则类别
        }
        $('.itembox .item:last-child').find('.itemHline').hide();
        if ((this.sxlistItem[1].item).length % 2 !== 0) {
          $('.showSearch1 .item:last-child').css('width', '100%')
        }
        /*}*/
      },
      show3() {        //控制 规则类别筛选栏  显示隐藏
        /*if (this.loading == false) { //加载完成点击生效 evans for 10，11 15：16*/
        if (this.xianshi2 == true) {
          this.xianshi2 = false;
          this.showSearch2 = false;
        } else if (this.xianshi2 == false) {
          this.xianshi2 = true;
          this.xianshi = false;
          this.xianshi1 = false;
          let showHei = (($('body').outerHeight()) - ($('.searchs').outerHeight()) - ($('.searchBox').outerHeight())) + 'px';
          // $(".showSearch2").height(this.heightDom.ruleslistHeight + 'px');// 显示规则类别
          this.showSearch2 = true;
          this.showSearch = false;    // 隐藏默认排序
          this.showSearch1 = false;   //隐藏发文单位
        }
        $('.itembox .item:last-child').find('.itemHline').hide();
        if ((this.sxlistItem[2].item).length % 2 !== 0) {
          $('.showSearch2 .item:last-child').css('width', '100%')
        }
        /*}*/
      },
//+++++++++++++++++++++++++++++++++++++++++//
      //高级默认状态
      sea() {
        if ($('.rangeBtn div .colorBtn').text() === '标题' && $('.rangeBtn_2 div .colorBtn').text() === '精确') {
          this.seaColor_();
          let aas = this.Newarr.join(' ');
          this.titleIncludes = aas;
          //console.log(aas, this.titleIncludes);
        }
      },//默认
      seaColor_() {
        $(".titleTip1").hide();
        $('.searchCont').css('color', '#8d8d8d');
        $('.serachCont input').css("border-color", "#8d8d8d");
        $('.serachCont').css('opacity', '0.5');
        $('.serachCont .inputCont').attr('disabled', true);
        $('.serachTitle').css('opacity', '1');
        $('.serachTitle .inputTil').attr('disabled', false);
        $(".rangeBtn4").addClass("rangeBtnHide");
        $('.serachTitle input').css("border-color", "#8d8d8d");
      },
      sea1() {
        this.seaColor_1();
        let colorBtn2 = $('.rangeBtn_2 div .colorBtn');
        if (colorBtn2.text() == '精确') {
          if (this.contentIncludes.trim().length !== 0) {
            this.titleIncludes = this.contentIncludes;
          } else {
            let titleIncludes = this.Newarr.join(" ");
            this.titleIncludes = titleIncludes;
          }
          /**/
          if (this.contentMaybeIncludes.trim().length !== 0) {
            this.titleMaybeIncludes = this.contentMaybeIncludes;
          }
          /**/
          if (this.contentExcludes.trim().length !== 0) {
            this.titleExcludes = this.contentExcludes;
          }
          /**/
          this.contentIncludes = "";
          this.contentMaybeIncludes = "";
          this.contentExcludes = "";
          /**/
        } else {
          //console.log('错误');
        }
        /**/
        //console.log("1232131231231", colorBtn2.text(), $('.rangeBtn div .colorBtn').text());
      },
      seaColor_1() {
        $('.serachTitle input').css("border-color", "#8d8d8d");
        $('.serachCont input').css("border-color", "#8d8d8d");
        $('.searchCont').css('color', '#8d8d8d');
        $('.rangeBtn1').addClass('colorBtn');
        $('.rangeBtn2').removeClass('colorBtn');
        $('.rangeBtn3').addClass('colorBtn');
        $(".rangeBtn4").addClass("rangeBtnHide").removeClass("colorBtn");
        $('.serachCont').css('opacity', '0.5');
        $('.serachCont .inputCont').attr('disabled', true);
        $('.serachTitle').css('opacity', '1');
        $('.serachTitle .inputTil').attr('disabled', false);

        $(".titleTip1").hide();
      },
      sea2() {
        $('.rangeBtn2').addClass('colorBtn');
        $('.rangeBtn1').removeClass('colorBtn');
        let colorBtn2 = $('.rangeBtn_2 div .colorBtn');
        let colorBtn = $('.rangeBtn div .colorBtn');
        if (colorBtn2.text() == '精确') {
          if (this.titleIncludes.trim().length !== 0) {
            this.contentIncludes = this.titleIncludes.trim();
          } else {
            let aa = this.Newarr.join(' ');
            this.contentIncludes = aa.trim();
          }
          /**/
          if (this.titleMaybeIncludes.trim().length !== 0) {
            this.contentMaybeIncludes = this.titleMaybeIncludes.trim();
          }
          /**/
          if (this.titleExcludes.trim().length !== 0) {
            this.contentExcludes = this.titleExcludes.trim();
          }
          /**/
          this.titleIncludes = "";//标题必须包含
          this.titleMaybeIncludes = ""; //标题可能包含
          this.titleExcludes = ""; //标题不包含
          this.seaColor2_1();
        } else if (colorBtn2.text() == '模糊') {
          this.seaColor2_2();
        }
        this.entryText();
        //console.log(colorBtn2.text(), colorBtn.text());
      },
      seaColor2_1() {
        $('.searchTitle').css('color', '#8d8d8d');
        $(".rangeBtn4").removeClass("rangeBtnHide");
        $('.serachCont').css('opacity', '1');
        $('.serachCont .inputCont').attr('disabled', false);
        $('.serachTitle').css('opacity', '1');
        $('.serachTitle .inputTil').attr('disabled', false);
      },
      seaColor2_2() {
        $('.searchTitle').css('color', '#8d8d8d');
        $('.searchCont').css('color', '#8d8d8d');
        $(".rangeBtn4").removeClass("rangeBtnHide");
        $('.serachCont').css('opacity', '0.5');
        $('.serachCont .inputCont').attr('disabled', true);
        $('.serachTitle').css('opacity', '0.5');
        $('.serachTitle .inputTil').attr('disabled', true);
        $('.serachTitle input').css("border-color", "#8d8d8d");
        $('.serachCont input').css("border-color", "#8d8d8d");
      },
      sea3() {
        let colorBtn = $('.rangeBtn div .colorBtn');
        $('.rangeBtn3').addClass('colorBtn');
        $('.rangeBtn4').removeClass('colorBtn');
        if (colorBtn.text() == '标题') {
          let nsw = this.Newarr.join(" ");
          this.titleIncludes = nsw;
          this.seaColor3_1();
        } else if (colorBtn.text() == '全文') {
          if (this.titleIncludes.trim().length !== 0) {
            this.contentIncludes = this.titleIncludes;
          } else {
            let aa = this.Newarr.join(' ');
            this.contentIncludes = aa;
          }
          this.titleIncludes = "";//标题必须包含
          this.titleMaybeIncludes = ""; //标题可能包含
          this.titleExcludes = ""; //标题不包含
          this.seaColor3_2();
        }
        this.entryText();
        //console.log(colorBtn.text());
        //console.log($('.rangeBtn_2 div .colorBtn').text());
      },
      seaColor3_1() {
        $('.searchCont').css('color', '#8d8d8d');
        $('.serachCont').css('opacity', '0.5');
        $('.serachCont .inputCont').attr('disabled', true);
        $('.serachTitle').css('opacity', '1');
        $('.serachTitle .inputTil').attr('disabled', false);
        $('.serachTitle input').css("border-color", "#8d8d8d");
        $('.serachCont input').css("border-color", "#8d8d8d");
      },
      seaColor3_2() {
        $('.searchTitle').css('color', '#8d8d8d');
        $(".rangeBtn4").removeClass("rangeBtnHide");
        $('.serachCont').css('opacity', '1');
        $('.serachCont .inputCont').attr('disabled', false);
        $('.serachTitle').css('opacity', '1');
        $('.serachTitle .inputTil').attr('disabled', false);
        $('.serachTitle input').css("border-color", "#8d8d8d");
        $('.serachCont input').css("border-color", "#8d8d8d");
      },
      sea4() {
        let colorBtn = $('.rangeBtn div .colorBtn');
        if (colorBtn.text() == "标题") {
          //console.log("标题没模糊");
        } else {
          this.titleIncludes = "";
          this.contentIncludes = "";
          this.titleMaybeIncludes = ""; //标题可能包含
          this.titleExcludes = ""; //标题不包含
          this.contentMaybeIncludes = "";
          this.contentExcludes = "";
          this.sw = 1;
          this.matter();
          this.seaColor4_();
        }
        //console.log("模糊");
      },
      seaColor4_() {
        $(".titleTip").hide();
        $(".titleTip1").hide();
        $('.rangeBtn4').addClass('colorBtn').removeClass("rangeBtnHide");
        $('.rangeBtn3').removeClass('colorBtn');
        $('.rangeBtn1').removeClass('colorBtn');
        $('.rangeBtn2').addClass('colorBtn');
        $('.serachCont').css('opacity', '0.5');
        $('.serachCont .inputCont').attr('disabled', true);
        $('.serachTitle').css('opacity', '0.5');
        $('.serachTitle .inputTil').attr('disabled', true);
        $('.serachTitle input').css("border-color", "#8d8d8d");
        $('.serachCont input').css("border-color", "#8d8d8d");
      },
      FSAjax() {
        this.titleIncludes = this.titleIncludes.trim();
        this.titleMaybeIncludes = this.titleMaybeIncludes.trim();
        this.titleExcludes = this.titleExcludes.trim();
        this.contentIncludes = this.contentIncludes.trim();
        this.contentMaybeIncludes = this.contentMaybeIncludes.trim();
        this.contentExcludes = this.contentExcludes.trim();
        this.zhuangtai();
        setTimeout(() => {
          this.$nextTick(() => {
            this.ruleslist = [];
            this.top = 1;
            this.yeah();
            this.popupVisible = false;
          })
        }, 500)
      },
      //去除空数组
      ImpArr(array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === "" || typeof(array[i]) === "undefined") {
            array.splice(i, 1);
            i = i - 1;
          }
        }
      },
      //高级里的重置
      goReset() {
        $('.rangeBtn1').addClass('colorBtn');
        $('.rangeBtn2').removeClass('colorBtn');
        $('.rangeBtn3').addClass('colorBtn');
        $('.rangeBtn4').removeClass('colorBtn');
        if (this.Newarr.length > 1) {
          let arr = this.Newarr.join(" ");
        } else {
          let arr = this.Newarr[0];
        }
        this.titleIncludes = arr; //标题包含
        this.titleMaybeIncludes = ""; //标题可能包含
        this.titleExcludes = ""; //标题不包含
        this.contentIncludes = "";
        this.contentMaybeIncludes = "";
        this.contentExcludes = "";
        /**/
        this.sea();
        this.sw = 0;
        this.matter();
        this.redCircleExpert = false;
        $('.titleTip').hide();
        $('.titleTip1').hide();
      },
      //高级里的input显示隐藏
      matter() {
        if (this.sw == 0) {
          document.querySelector('.rulesMatter').style.display = 'block';
          this.sw++
        } else if (this.sw != 0) {
          this.sw = 0;
          document.querySelector('.rulesMatter').style.display = 'none';
        }
      },
      //高级显示
      popupShow() {
        this.popupVisible = true;
        this.showSearch = false;
        this.showSearch1 = false;
        this.showSearch2 = false;
        $('.titleTip1').hide();
        $('.titleTip').hide();
        $('.search-mrpx').removeClass("pass");
        if (Array.isArray(this.titleIncludes)) {
          //console.log('是数组');
          this.titleIncludes = this.titleIncludes.trim().join(" ");
        } else if (this.titleIncludes.trim().indexOf(",") !== -1) {
          //console.log("有逗号");
          let arr = this.titleIncludes.trim().split(',').join(" ");
          this.titleIncludes = arr;
          //console.log(arr);
          //console.log(this.titleIncludes);
        } else {
          //console.log("没逗号");
        }
        //标题可能包含
        if (this.titleMaybeIncludes.indexOf(",") != -1) {
          this.titleMaybeIncludes = this.titleMaybeIncludes.trim().split(",").join(" ");
        }
        //标题不包含
        if (this.titleExcludes.indexOf("," != -1)) {
          this.titleExcludes = this.titleExcludes.trim().split(",").join(" ");
        }
        //正文必须包含
        if (this.contentIncludes.indexOf("," != -1)) {
          this.contentIncludes = this.contentIncludes.trim().split(",").join(" ");
        }
        //正文可能包含
        if (this.contentMaybeIncludes.indexOf("," != -1)) {
          this.contentMaybeIncludes = this.contentMaybeIncludes.trim().split(",").join(" ");
        }
        //正文不包含
        if (this.contentExcludes.indexOf("," != -1)) {
          this.contentExcludes = this.contentExcludes.trim().split(",").join(" ");
        }
      },
      //高级隐藏
      popupHide() {
        this.sw = 0;
        this.matter();
        this.popupVisible = false;
        this.gaoji("BtnMany");
        //console.log("BtnManyBtnManyBtnManyBtnManyBtnMany");
      },
      Toblur() {
        $('input').blur();
        //window.document.activeElement.blur;
      },
      /**/
      zhuangtai() {
        this.$storage.localStorageSystem("guizeIdStatus", this.idarr2, false);
        this.$storage.localStorageSystem("fawenIdStatus", this.idarr1, false);
        this.$storage.localStorageSystem("marketIdStatus", this.idarr0, false);
        this.$storage.localStorageSystem("timeIdStatus", this.timeIdStatus, false);
        this.$storage.localStorageSystem("value0", this.value0, false);
        this.$storage.localStorageSystem("value1", this.value1, false);
        this.$storage.localStorageSystem("value2", this.value2, false);
        this.$storage.localStorageSystem("value3", this.value3, false);
        let DateArr = (this.timesDate1 + "yymmdd" + this.timesDate2).split("yymmdd");
        this.$storage.localStorageSystem("DateStartEnd", DateArr, false); //开始 和结束
        console.log("==this.value1==", DateArr, this.timeIdStatus, this.value1, this.value0, this.value2, this.value3);
        window.localStorage.setItem("pageSize", this.bottom);
        window.localStorage.setItem("pageTop", this.top);
        /*高级存储到localStorage*/
        let colorBtn = $('.rangeBtn div .colorBtn').text();
        let colorBtn2 = $('.rangeBtn_2 div .colorBtn').text();
        if (colorBtn == "标题" && colorBtn2 == "精确") {
          let coa = this.titleIncludes.split(",").join(",") + "$#" + this.titleMaybeIncludes.split(",").join(",") + "$#" + this.titleExcludes.split(",").join(",");
          window.localStorage.setItem("titleIME", coa);
        } else if (colorBtn == "全文" && colorBtn2 == "精确") {
          let coa = this.titleIncludes.split(",").join(",") + "$#" + this.titleMaybeIncludes.split(",").join(",") + "$#" + this.titleExcludes.split(",").join(",");
          let cob = this.contentIncludes.split(",").join(",") + "$#" + this.contentMaybeIncludes.split(",").join(",") + "$#" + this.contentExcludes.split(",").join(",");
          window.localStorage.setItem("titleIME", coa);
          window.localStorage.setItem("contentIME", cob);
        } else {
          let arr = this.Newarr.join(",");
          window.localStorage.setItem("keyIME", arr);
        }
        window.localStorage.setItem("colorBtn", (colorBtn + "$#" + colorBtn2));//开始时间
      },
      //点击详情 存储状态
      goCount(index) {
        this.zhuangtai();
        this.$router.push({
          path: '/rulesCount',
          query: {id: this.ruleslist[index].id, MathTime: global.timestamp}
        })
      },
      searchClose(index) {
        let colorBtn = $('.rangeBtn div .colorBtn');
        let colorBtn2 = $('.rangeBtn_2 div .colorBtn');
        //console.log('去除关键词');
        //console.log(this.Newarr.length);
        if (this.Newarr.length > 1) {
          if (isNaN(index) || index >= this.Newarr.length) {
            return false;
          }
          for (let i = 0, n = 0; i < this.Newarr.length; i++) {
            if (this.Newarr[i] != this.Newarr[index]) {
              this.Newarr[n++] = this.Newarr[i];//
            }
          }
          this.Newarr.length -= 1;
          let neway = this.Newarr.join(",");
          //console.log("还有：" + this.Newarr, neway);
          if (colorBtn.text() == "标题" && colorBtn2.text() == "精确") {
            this.titleIncludes = neway;
            ////console.log(this.titleIncludes);
          } else if (colorBtn.text() == "全文" && colorBtn2.text() == "精确") {
            this.contentIncludes = neway;
          } else {
            //console.log("this.newTitleKeythis.newTitleKey", this.Newarr);
            this.keys = neway;
          }
          this.ruleslist = [];
          this.yeah();
        } else {
          this.$router.push({path: '/search', query: {MathTime: global.timestamp}});
        }
      },
      searchPro() {
        // console.log('123213213');
      },
      // 点击返回搜索页面
      goSearch() {
        // console.log("sadsadsadsa");
        let arr = this.Newarr.join(" ");
        this.zhuangtai();
        this.$router.push({path: '/search', query: {valuess: arr, MathTime: global.timestamp}});
      }
    }
  }
</script>
<style lang="scss">
  .vux-popup-dialog.xiaoan-right-popup {
    overflow: auto;
    .xiaoan-popup-wrapper {
      width: 100%;
      height: 100%;
      background-color: #FFFFFF;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
      .vux-header {
        background-color: white;
        color: #545454;
        .vux-header-title {
          color: #545454;
        }
        &:after {
          content: " ";
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 1px;
          border-bottom: 1px solid #D9D9D9;
          color: #D9D9D9;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
      .xiaoan-popup-content {
        width: 100%;
        height: 80%;
        padding: 0 0;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        .sxList {
          .sxitemBox {
            padding: 0 10px 0 10px;
            .sxlistItem {
              // padding: 0 10px 0 0;
              width: 100%;
              height: 40px;
              border-bottom: 0.5px solid #e3e3e3;
              font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
              font-size: 15px;
              color: #535353;
              position: relative;
              .sxlistItem-title {
                display: table;
                width: 100%;
                height: 100%;
                .sxlistItem-tip {
                  display: table-cell;
                  vertical-align: middle;
                }
                .sxlistItem-tip:last-child{
                  text-align: right;
                  .icon-xiangyoujiantou{
                    display: inline-block;
                    transform: rotate(0deg);
                    transition: all 0.3s ease-in-out;
                  }
                  .icon-angstrom{
                    display: inline-block;
                    transform: rotate(90deg);
                    transition: all 0.3s ease-in-out;
                  }
                }
              }
            }
            .sxitemBox {
              padding: 0 0 0 10px;
              .sxlistItem {
                display: table;
                .sxlistItem-checkbox {
                  text-align: right;
                  font-size: 0;
                }
                div {
                  display: table-cell;
                  vertical-align: middle;
                  .itemTip {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 2px;
                    border: 0.5px solid #e3e3e3;
                    background-color: #f6f7f9;
                  }
                  .selected {
                    border: 0.5px solid #fff;
                    background-image: url("/static/img/rules/chengseduigou.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                  }
                }
              }
            }
            .sxitemBox:last-child {
              padding: 0;
              .sxlistItem {
                padding: 0 0 0 10px;
              }
            }
          }
        }
      }
      .xiaoan-popup-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0;
        width: 100%;
        height: 50px;
        display: flex;
        &:before {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          height: 1px;
          border-top: 1px solid #D9D9D9;
          color: #D9D9D9;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
        button {
          border: 0;
          background-color: white;
          flex: 1;
          height: 100%;
          font-size: 15px;
          color: #ffbc61;
        }
        button:last-child {
          background-color: #ffbc61;
          color: white;
        }
      }
    }
  }
  div.ruleslist {
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
    .searchs {
      width: 100%;
      height: 50px;
      background-color: #f0f1f5;
      padding: 7.5px 12px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 800;
      .seabox {
        width: 86%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: white;
        border-radius: 2px;
        .searchPrompt {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 35px;
          line-height: 35px;
        }
        .searchScroll {
          margin: 0;
          padding: 0;
          background-color: white;
          display: inline;
          white-space: nowrap;
          overflow-x: scroll;
          float: left;
          overflow-y: hidden;
          max-width: 98%;
          height: 35px;
          z-index: 150;
          -webkit-overflow-scrolling: touch;
          .searchScrollSpan {
            background-color: #fff2e1;
            border-radius: 2px;
            color: #8d8d8d;
            font-weight: lighter !important;
            display: inline-block !important;
            margin: 5px 0 5px 8px;
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
        }
        .goSearch {
          display: flex;
          width: auto;
          height: 35px;
          .rulesNum {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #8d8d8d;
            font-size: 12px;
            font-weight: normal;
          }
        }
      }
      #experts {
        border-radius: 2px;
        overflow: hidden;
        border: 0;
        height: 100%;
        box-shadow: none;
        padding: 0 6px;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        margin: 0;
        background-color: white;
        color: #535353;
      }
      .smx_item {
        height: 8px;
        width: 8px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 9px;
      }
    }
    .searchBox {
      .search-wrapper {
        width: 85.5%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .search-mrpx {
          position: relative;
          flex: 1;
          text-align: center;
          font-size: 0;
          color: #535353;
          border-left: 0.5px solid #e3e3e3;
          .search-mrpx-name {
            font-size: 15px;
          }
          .imgBox {
            margin: 0;
            padding: 0;
            font-size: 15px;
            .iconBottom {
              font-size: 10px;
              margin-left: 5px;
              display: inline-block;
              transform: rotate(0deg);
              transition: all 0.3s ease-in-out;
            }
          }
        }
        .search-mrpx:last-child {
          border-right: 0.5px solid #e3e3e3;
        }
        .pass {
          height: 36px;
          background: #fff;
          margin-top: 5px;
          line-height: 30px;
          border: 0.5px solid #e3e3e3;
          border-bottom: 0;
          box-sizing: border-box;
          text-align: center;
          color: #ffb048;
          .imgBox {
            i.iconBottom {
              display: inline-block;
              transform: rotate(180deg);
              transition: all 0.3s ease-in-out;
            }
          }
        }
        .pass + .search-mrpx {
          border-left-color: transparent;
        }
      }
      /*筛选以及筛选弹出框*/
      .search-sx {
        width: 14.5%;
        text-align: center;
        font-size: 15px;
        color: #535353;
        border-right: 0.5px solid #e3e3e3;
        /*overflow: hidden;*/
        position: relative;
        .expert_s {
          font-size: 15px;
          color: #535353;
          background-color: white;
          line-height: 1;
          border: 0;
          box-shadow: none;
          border-radius: 0;
          letter-spacing: 0;
          height: auto;
        }
        .expert_s:active {
          background-color: #f0f1f5;
        }
      }
      .search-sx:active {
        background-color: #f0f1f5;
      }
    }
    .filter-box {
      position: absolute;
      left: 0;
      top: 90px;
      background: #fff;
      width: 100%;
      height: auto;
      z-index: 800;
      .item-box {
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .item-list, .item-foo {
          width: 50%;
          height: 40px;
          border-bottom: 0.5px solid #e3e3e3;
          line-height: 40px;
          padding-left: 12.5px;
          box-sizing: border-box;
          position: relative;
          font-size: 14px;
          color: #535353;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          float: left;
          .item-tip {
            width: 15px;
            height: 15px;
            border-radius: 2px;
            margin-right: 7px;
            border: 0.5px solid #e3e3e3;
            background-color: #f6f7f9;
          }
          .item-Text {
          }
          .selected {
            border: 0.5px solid #fff;
            background-image: url("/static/img/rules/chengseduigou.png");
            background-size: contain;
            background-repeat: no-repeat;
          }
          .item-Hline {
            width: 1px;
            height: 17.5px;
            background: #e3e3e3;
            position: absolute;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto 0;
          }
        }
        .item-list:last-child {
          .item-Hline {
            width: 0;
          }
        }
      }
      .bottomBox {
        width: 100%;
        height: 50px;
        border-top: 0.5px solid #e3e3e3;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 0;
        button {
          width: 50%;
          height: 100%;
          border: 0;
          line-height: 50px;
          text-align: center;
          font-size: 18px;
          float: left;
          font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica !important;
          color: #ffb048 !important;
          background-color: white;
          outline: none;
        }
      }
      .bottomBox button:active {
        background-color: #f0f1f5;
      }
      .bottomBox button + button {
        background: #ffb048 !important;
        color: #fff !important;
        outline: none;
      }
      .bottomBox button + button:active {
        background-color: #f0f1f5;
      }
    }
    .mint-popup-3 {
      width: 72%;
      height: 100%;
      background-color: #fff;
      border-left: 0.5px solid #e3e3e3;
      box-shadow: 4px 2px 2px 1px #B9ADAD;
      .rulExpert {
        height: 44px;
        border-bottom: 0.5px solid #e3e3e3;
        text-align: center;
        line-height: 44px;
        position: relative;
        span {
          color: #535353;
          font-size: 15px;
        }
        .expert_g {
          position: absolute;
          padding-left: 12px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
      .rangeGkipt {
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        .range {
          height: 35px;
          line-height: 35px;
          padding: 10px 12px 0 12px;
          font-size: 15px;
          color: #535353;
        }
        .rangeBtn, .rangeBtn_2 {
          height: 25px;
          padding: 0 12px;
          div {
            width: 50%;
            float: left;
            .rangeBtn1, .rangeBtn3 {
              float: right;
              margin-right: 10px;
            }
            .rangeBtn2, .rangeBtn4 {
              margin-left: 10px;
            }
          }
          button {
            height: 25px;
            width: 60px;
            border: 0;
            border-radius: 2px;
            font-size: 14px;
            background-color: #f0f1f5;
            color: #8d8d8d;
            outline: none;
          }
        }
        .rangeMoregl {
          padding: 12px 12px;
          .rangeMore {
            height: 33px;
            border-bottom: 0.5px solid #e3e3e3;
            border-top: 0.5px solid #e3e3e3;
            line-height: 33px;
            color: #535353;
            font-size: 15px;
            i {
              font-size: 10px;
            }
            .rangeMoreTop {
              float: right;
              font-weight: 600;
            }
            .rangeMoreButton {
              float: right;
              font-weight: 600;
            }
          }
        }
        .rulesMatter {
          display: none;
          .serachTitle, .serachCont {
            padding: 0 12px;
            font-size: 14px;
            .searchTitle, .searchCont {
              color: #535353;
              padding-bottom: 7px;
              font-size: 15px;
            }
            input {
              -webkit-appearance: none;
              box-sizing: border-box;
              outline: none;
              font-size: 15px;
              display: inline-block;
              border: 0.5px solid #e3e3e3;
              border-radius: 2px;
              padding: 0 5px;
              height: 25px;
              width: 60%;
              color: #8d8d8d;
            }
          }
          .serachTitle {
            padding: 0 12px;
            font-size: 14px;
            .inputA {
              .Matter-span {
              }
              input {
              }
            }
          }
          .serachCont {
            padding-bottom: 15px;
            .searchCont {
            }
          }
        }
      }
      .footBtn {
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 0.5px solid #e3e3e3;
        width: 100%;
        font-size: 0;
        button {
          width: 50%;
          height: 50px;
          border: 0;
          color: #ffb148;
          background-color: white;
          outline: none;
          font-size: 18px;
        }
        button:active {
          /*background-color: #f0f1f5;*/
          opacity: 0.6;
        }
        button + button {
          color: white;
          border-radius: 0;
          background-color: #ffb148;
        }
        button + button:active {
          /* background-color: #fcc77f;*/
          opacity: 0.6;
        }
      }
    }
    // 公共的属性
    .redCircle {
      width: 8px;
      height: 8px;
      background: #fb4319;
      border-radius: 50%;
      position: absolute;
      right: 3px;
      top: -5px;
      z-index: 1000;
    }
  }
  #ruleslist ._v-container > ._v-content > .loading-layer {
    padding-bottom: 50px !important;
  }
  input[type="date"]::-webkit-clear-button {
    display: none;
  }
  #ruleslist #wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  #ruleslist .mint-spinner-snake {
    display: inline-block;
    vertical-align: middle;
    border: 2px solid transparent;
    border-top-color: rgb(252, 199, 127) !important;
    border-left-color: rgb(252, 199, 127) !important;
    border-bottom-color: rgb(252, 199, 127) !important;
    height: 14px !important;
    width: 14px !important;
    -webkit-animation: mint-spinner-rotate 0.8s infinite linear !important;
    animation: mint-spinner-rotate 0.8s infinite linear !important;
    border-radius: 50%;
  }
  .infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  #ruleslist .snake {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #535353;
    height: 50px;
    box-sizing: border-box;
    text-align: center;
  }
  .sharebg-active {
    display: none;
  }
  .anListName div span > span {
    margin-right: 0 !important;
  }
  .anListName div span > span > span {
    margin-right: 0 !important;
  }
  #LoadScroll {
    margin-bottom: 30px;
  }

</style>
<style scoped>
  #ruleslist .mint-button::after {
    background-color: #f0f1f5;
    /*opacity: 0.6;*/
  }
  .snake {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #535353;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .snake-circle {
    height: 14px;
    width: 14px;
    -webkit-animation: snake-rotate 0.8s infinite linear;
    animation: snake-rotate 0.8s infinite linear;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: rgb(252, 199, 127);
    border-left-color: rgb(252, 199, 127);
    border-bottom-color: rgb(252, 199, 127);
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  @keyframes snake-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  /***********************/
  #ruleslist .show {
    display: block;
  }
  .noInfo, .noTrySenior {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* z-index: 5;*/
    padding: 0 12.5px;
    box-sizing: border-box;
    background: #fff;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
  }
  .trySenior {
    position: absolute;
    left: 0;
    top: 180px;
    right: 0;
    margin: auto;
    width: 100%;
    height: 125px;
    text-align: center;
    background-color: white;
  }
  /*.trySeniorShow {
        display: block;
    }*/
  .trySenior img {
    display: block;
    width: 110px;
    height: 95px;
    margin: 0 auto 25px;
  }
  .seniorButton {
    background: #ffb148;
    position: absolute;
    left: 0;
    top: 175px;
    right: 0;
    margin: auto;
    width: 90px;
    height: 30px;
    border-radius: 2px;
    font-size: 15px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #fff;
    line-height: 30px;
  }
  .trytext {
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    font-size: 15px;
    color: #ffb148;
    margin-left: -12.5px;
  }
  #ruleslist .scroll-trytext {
    text-decoration: none;
    border-bottom: 0.5px solid;
  }
  .tryimg {
    width: 8px;
    height: 14px;
    display: inline-block;
    background-image: url("/static/img/rules/rightOrange.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: -2px;
    margin-left: 8px;
  }
  #ruleslist .anList {
    padding: 0 12px;
    font-size: 0;
    text-align: justify;
    background-color: white;
  }
  #ruleslist .anList:active {
    background-color: #f0f1f5;
    /*opacity: 0.6;*/
  }
  .anListName {
    font-size: 15px;
    padding: 18px 0 0 0;
    margin-bottom: 10px;
    /* background-color: white;*/
    box-sizing: border-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: clip;
    line-height: 19px;
    font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
  }
  .anListName div {
    width: 100%;
    word-spacing: normal;
  }
  .anListName span:first-child {
    margin-right: -0.4em;
  }
  .anListName > div > span {
    margin-right: -0.4em;
  }
  .anListState {
    font-size: 12px;
    padding: 0 0 18px 0;
    border-bottom: 0.5px solid #e3e3e3;
    color: #8d8d8d;
    margin-top: -3px;
  }
  #ruleslist .seniorText {
    padding: 0 12px;
    display: flex;
    text-align: justify;
    background-color: white;
    width: 100%;
    height: 70px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  #ruleslist .seniorText span:active {
    /*color: white;*/
    border-bottom-color: white;
  }
  .rulExpert .expert_D img {
    height: 15px;
    padding: 17px 0 17px 12px;
    position: fixed;
    top: 0;
    left: 0;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  .colorBtn {
    background-color: #fef3e4 !important;
    color: #ffb148 !important;
  }
  #ruleslist .searchCont {
    padding: 5px 0;
  }
  #ruleslist .Matter-span {
    display: inline-block;
    font-size: 15px;
    width: 40%;
    text-align: right;
    box-sizing: border-box;
    padding-right: 10px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
  }
  #ruleslist .titleTip, #ruleslist .titleTip1 {
    font-size: 12px;
    box-sizing: border-box;
    padding-left: 40%;
    color: red;
    display: none;
  }
  .inputA, .inputB, .inputC {
    box-sizing: border-box;
    font-size: 0;
    padding: 5px 0;
    color: #8d8d8d;
  }
  .showOp {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1100;
    border-radius: 0;
  }
  /******************************************************************************************/
  .searchBox {
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 0.5px solid #e3e3e3;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    position: relative;
    z-index: 800;
    background-color: white;
  }
  .searchBox .searchBoxDis {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0);
    z-index: 10;
    box-sizing: border-box;
  }
  .closeShaixuan {
    width: 15px !important;
    height: 15px !important;
    background-image: url("/static/img/rules/x.jpg");
    background-size: contain;
    background-repeat: no-repeat;
  }
  .sxHeader {
    width: 100%;
    height: 45px;
    border-bottom: 0.5px solid #e3e3e3;
    position: relative;
  }
  .sxHeader .expert_g {
    position: absolute;
    padding-left: 12px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  .sxHeaderText {
    width: 100%;
    height: 100%;
    line-height: 45px;
    text-align: center;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    font-size: 15px;
    color: #323232;
  }
  .itemList {
    border-bottom: 0.5px solid #e3e3e3;
    height: 40px;
    line-height: 40px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #8d8d8d;
    position: relative;
  }
  .ruleList .sxlistItem {
    padding: 0;
  }
  .inputBox {
    width: 65%;
    height: 25px;
    border-radius: 2px;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
    margin: auto 0;
    right: 0;
    border: 0.5px solid #e3e3e3;
    box-sizing: border-box;
    background: white;
  }
  .itemList input {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    display: block;
    font-size: 14px;
    color: #b6b6b6;
    background: #fff;
    border: 0;
    text-align: center;
  }
  .itemContent .itemList:last-child {
    border: 0;
  }
  .sxitemBox {
    width: 100%;
    height: auto;
  }
  /*.sxlistItem:active {
        background-color: #f0f1f5;
    }*/
  .sxlistItem .tipText {
    position: absolute;
    overflow: hidden;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 100%;
    line-height: 40px;
    font-size: 13px;
    color: #8d8d8d;
    padding-right: 15px;
    box-sizing: border-box;
    text-align: right;
  }
  .itemContent {
    width: 100%;
    padding-left: 15px;
    box-sizing: border-box;
    border-bottom: 0.5px solid #e3e3e3;
  }
  .toLeft {
    display: block;
    font-size: 14px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .search-s .pass p {
    margin-left: 0;
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* IE 9 */
    -moz-transform: rotate(180deg); /* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg); /* Opera */
  }
  .ruleslist .shadow {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1550;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
    border-radius: 0;
    box-shadow: none;
  }
  img[src=''] {
    opacity: 0 !important;
  }
  input:focus {
    outline: none !important;
    -webkit-appearance: none;
  }
  /*搜索栏关键字样式*/
  /* .showSearch1 .item:last-child {
         width: 100%;
     }*/

  .rangeBtnHide {
    background-color: rgba(240, 241, 245, 0.3) !important;
    color: rgba(141, 141, 141, 0.3) !important;
  }
  .closeDate { /*清除时期x按钮*/
    position: absolute;
    right: 2%;
    top: 0;
    bottom: 0;
    margin: auto;
    line-height: 23px;
    font-size: 15px;
    background-color: white;
    color: #c1c1c1;
    z-index: 22;
  }
  .showPrompt {
    height: 45px;
    width: 100%;
    color: #ffffff;
    background-color: rgba(255, 153, 51, 0.85);
    position: absolute;
    bottom: 49.5px;
    text-align: center;
    line-height: 45px;
    font-size: 15px;
    opacity: 0;
  }
</style>
