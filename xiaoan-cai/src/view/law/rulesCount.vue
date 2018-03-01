<template>
  <div class="rulesCount" id="rulesCount" ref="rulesCountDom">
    <div class="searchs">
      <!--------ios--------------->
      <div class="seabox" v-show="IOSAn">
        <form action="" onsubmit=" return false;">
          <input id="inputCount" type="text" class="text" :placeholder="placeholder" @focus="searchFocus"
                 @blur="searchBlur" v-model="values" @input="searchInput" @keyup.13="searchBlur">
        </form>
        <div class="nodeGroup">
          <div class="nodesLen">{{index+1}}/{{nodessLen}}</div>
          <div class="nodeslenText">无结果</div>
          <img v-lazy="close" alt="" @click="closeCount()" class="closeCount">
        </div>
      </div>
      <!---------安卓-------------->
      <div class="seabox-and" v-show="!IOSAn">
        <form action="" onsubmit=" return false;">
          <input id="inputCount-an" type="text" class="text" :placeholder="placeholder" @focus="searchFocus"
                 @blur="searchBlur" v-model="values" @input="searchInput" @keyup.13="searchBlur">
        </form>
        <div class="nodeGroup">
          <div class="nodesLen">{{index+1}}/{{nodessLen}}</div>
          <div class="nodeslenText">无结果</div>
          <img v-lazy="close" alt="" @click="closeCount()" class="closeCount">
        </div>
      </div>
      <!---->
      <div class="icon">
        <span class="rulesBtn">
          <img v-lazy="topImg" alt="" @click="topRules()" class="buttop">
          <img v-lazy="bottoms" alt="" @click="bottomRules()" class="butright">
        </span>
      </div>
      <!--[ngClass]="{cssClass: expression}"-->
      <div class="icons" @click="searchList()" v-if="!IOSAn" v-show="AndroidShow"></div>
    </div>
    <div class="countTli" id="countTil" ref="contTitleDom">
      <div class="countTitle">
        {{titleName}}
        <div class="inOperation" v-if="this.inOperation =='已失效'?lose:''">
          <img v-lazy="lose" alt="">
        </div>
        <div class="inOperation" v-else-if="this.inOperation =='失效'?lose:''">
          <img v-lazy="lose" alt="">
        </div>
        <div class="inOperation" v-else-if="this.inOperation =='待生效'?lose:''">
          <img v-lazy="tobeEffective" alt="">
        </div>
        <div class="inOperation" v-else-if="this.inOperation =='现行有效'?lose:''"></div>
      </div>
    </div>
    <div class="content" id="content" ref="contTextDom" :style="{height:contentHeight+'px'}">
      <div id="rulesText">
        <div id="rules-contents" v-html="contents"></div>
        <div class="attachmentGroup" v-if="this.attachment.length > 0">
          <h3 class="attachmentTitle">相关附件</h3>
          <ul class="attachmentList">
            <li v-for="(list,index) in attachment">
              <div @click="gol(index)" class="attach_list">{{list.fileName}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- </scroller>-->
    <span class="tt-clue" :class="{clueActive: IsActive}">好内容点此收藏哟</span>
    <footer class="show_footer" ref="footerDom">
      <a href="javascript:void(0)" class="show_items" v-for="(list, index) in footerItem"
         @click="footerClick(index)">
        <div class="tabbar-Icon" :class="list.icon"></div>
        <p class="tabbar-value">{{list.name}}</p>
      </a>

    </footer>
    <!---->
    <div class="popup-bottom am-share">
      <h3 class="popup-bottom-title am-share-title">基本信息</h3>
      <div class="popup-bottom-content">
        <!---->
        <div class="rulesPlateHeader">
          <div class="rulesPlate">
            <div class="rulesGulop">
              <span class="rulesfw">适用范围：</span>
              <span v-for="list in scopesName">
                <span class="market" v-if="list.treeNodeValue == '沪市主板'"
                      :style="{color:'#a9262c',borderColor:'#a9262c'}">沪主板</span>
                <span class="market" v-if="list.treeNodeValue == '深市主板'"
                      :style="{color:'#174299',borderColor:'#174299'}">深主板</span>
                <span class="market" v-if="list.treeNodeValue == '深市中小板'"
                      :style="{color:'#174299',borderColor:'#174299'}">中小板</span>
                <span class="market" v-if="list.treeNodeValue == '深市创业板'"
                      :style="{color:'#174299',borderColor:'#174299'}">创业板</span>
                <span class="market" v-if="list.treeNodeValue == '新三板'"
                      :style="{color:'#f6900c',borderColor:'#f6900c'}">新三板</span>
              </span>
            </div>
          </div>
          <div class="smCaption">
            <div class="units">
              <div class="unitsTitle">发文单位：</div>
              <div class="unitsCont">
                <span class="unitsName">{{unitssStr}}</span>
              </div>
            </div>
          </div>
          <div class="smCaption">
            <div class="units">
              <div class="unitsTitle">发文字号：</div>
              <div class="unitsCont">{{referenceNumber?referenceNumber:'无'}}</div>
            </div>
          </div>
          <div class="smCaption">
            <div class="units">
              <div class="unitsTitle">发布日期：</div>
              <div class="unitsCont">{{releaseStart?releaseStart:'无'}}</div>
            </div>
          </div>
          <div class="smCaption">
            <div class="units nounits">
              <div class="unitsTitle">生效日期：</div>
              <div class="unitsCont">{{releaseEnd?releaseEnd:'无'}}</div>
            </div>
          </div>
        </div>
      </div>
      <footer class="popup-bottom-footer am-share-footer">
        <button class="share_btn">取消</button>
      </footer>
    </div>
    <div class="popup-bottom am-collect">
      <h3 class="popup-bottom-title am-collect-title">收藏</h3>
      <div class="popup-bottom-content">
        <!---->
        <div class="collect_global">
          <div class="collect_shg">
            <div class="inputgle">
              <input v-model="inputVal" type='text' @input="createVal1(40)" @focus="editFocus($event)"
                     :placeholder='placeholders'
                     class="createVal"/>
              <img v-lazy="close" alt="" @click="closeInputVals()" class="closeInputVal">
            </div>
            <div class="inputbtn">
              <button class='createDom' @click="createDom()">创建</button>
            </div>
          </div>
          <div class="am-collect-sns am-collect-padding">
            <div class="collectMaxHeight">
              <ul class="default">
                <li class="collect-list" @click="collectD()">
                  <div class="collect-item">
                    <span class="defaultText">默认收藏夹</span>
                  </div>
                </li>
                <li class="collect-list create" v-for="(list,index) in collcell"
                    @click="addCollect(index)">
                  <div class="collect-item">
                    <span class="defaultText">{{list.favouriteName}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer class="popup-bottom-footer am-share-footer">
        <button class="share_btn">取消</button>
      </footer>
    </div>
    <div class="popup-bottom am-relative">
      <h3 class="popup-bottom-title am-relative-title">相关内容</h3>
      <div class="popup-bottom-content">
        <!---->
        <ul class="am-relative-sns">
          <li v-for="(v,i) in relevantList" @click="relevantLink(i)">
            <div style="text-align: left">{{ v.relationLawName }}</div>
          </li>
        </ul>
      </div>
      <footer class="popup-bottom-footer am-share-footer">
        <button class="share_btn">取消</button>
      </footer>
    </div>
    <!--顶部-->
    <div class="open-catalog returnTop" @click="return_Top()">
      <div class="top">
        <img src="/static/img/rules/return.png" alt="">
      </div>
      <button class="expert_s">顶部</button>
    </div>
    <!--目录-->
    <div class="open-catalog show_list" v-show="ismuluShow" @click="muluShow()">
      <div class="catalog">
        <img src="/static/img/rules/listmenu.png" alt="">
      </div>
      <button class="expert_s">目录</button>
    </div>
    <!--返回首页-->
    <div class="open-catalog returnHome" @click="return_Home()">
      <div class="home">
        <img src="/static/img/rules/home.png" alt="">
      </div>
      <button class="expert_s">主页</button>
    </div>
    <!--目录侧边栏-->
    <mt-popup v-model="popupVisible" position="right" class="popup-right-catalog" :modal="false">
      <header class="sxHeader">
        <button @click="popupVisible = false" class="xa-icon-x">
          <i class="icon iconfont icon-x"></i>
        </button>
        <div class="sxHeaderText">目录</div>
      </header>
      <ul class="sxLists">
        <li class="sxitemBox" v-for="(list, index) in titlearr">
          <div class="sxlistItem" @click="jump(index)">{{ list }}<!--第一章--></div>
        </li>
      </ul>
    </mt-popup>
    <!---->
    <xiaoan-loading v-show="loading" width="20px"></xiaoan-loading>
    <!---->
    <div id="warning" class="loadFalse" v-show="loadWaring">
      <div class="waringImg"></div>
      <div class="waringText">{{waringText}}</div>
      <mt-button class="waringBtn" @click="warningreLoad()">{{waringBtn}}</mt-button>
    </div>
    <!---->
    <div class="shadow" v-show="popupVisible" @click="shadowClose()"></div>
    <div class="law-show" v-if="GuidePages">
      <div class="GuidePage-rules"><img :src="GuideRules" alt=""></div>
      <button class="law-show-sh" @click="lawshowsh()">知道了</button>
    </div>
  </div>
</template>

<script>
  import loading from "../../components/warning/loading.vue"

  export default {
    name: 'rulesCount',
    data() {
      return {
        footerItem: [
          {id: 0, name: '基本信息', value: '', show: false, icon: 'show_shareIcon', isshow: false},
          {id: 1, name: '收藏', value: '', show: false, icon: 'show_collectIcon', isshow: true},
          {id: 2, name: '相关内容', value: '', show: false, icon: 'show_relativeIcon', isshow: false},
        ],
        IsActive: true,
        contentHeight: '',
        loadWaring: false,
        //
        GuidePages: true,
        GuideRules: "../../static/img/Guide-pages/ruils.png",
        //
        inputVal: '',
        collect: '收藏',
        close: '../../static/img/personal/collect/close.png',
        collectImg: '../../static/img/rules/collect.png',
        correlationImg: '../../static/img/rules/correlation.png',
        shareImg: '../../static/img/rules/share.png',
        topImg: '../../static/img/rules/top.png',
        lose: '../../static/img/rules/lose.png',
        tobeEffective: '../../static/img/rules/tobeEffective.png',
        shareImage: '../../static/img/personal/collect/shareImg.png',
        waringBtn: '刷新',
        waringText: '服务器错误，请刷新重试！',
        bottom: 15,
        pageTop: 1,
        contents: '',
        titleName: '',
        unitss: [],
        values: '',
        scopesName: '',
        placeholders: '请输入新建收藏夹名称(最多40个字)',
        placeholder: "搜索关键字，全文精确搜索",
        referenceNumber: "",
        relDate: "",
        effDate: "",
        releaseStart: "",
        releaseEnd: "",
        collcell: [],
        relevantList: [],
        loading: true, // 是否加载中状态
        popupVisible: false, // 是否显示目录侧边栏
        ismuluShow: false, // 是否显示目录 是否有h2标题
        titleArr: [], // 标题数组
        titlearr: [], // 标题数组 实际
        offsetArr: [], // 标题位置数组
        getDefS: '',
        answers: '../../static/img/personal/collect/answers.png',
        statute: '../../static/img/personal/collect/statute.png',
        notice: '../../static/img/personal/collect/notice.png',
        bottoms: '../../static/img/rules/bottom.png',
        num: '',
        user_id: '',
        range: {},
        nodess: [],
        index: 0,
        inOperation: '',
        attachment: [],
        question: '',
        platform: '',
        nodessLen: 0,
        idCode: '',
        result: '',
        muluCode: false,
        rulesId: '',
        linkUrl: [], // *http://an-announcement.oss-cn-shanghai.aliyuncs.com/201705231657435940.pdf*/
        IOSAn: true,
        AndroidShow: true,
        unitssStr: '',
        Directory: []
      }
    },
    watch: {
      '$route'(to, from) {
        window.location.reload();
      }
    },
    components: {
      'xiaoan-loading': loading
    },
    created() {
      let userId = this.$cookie.getCookie("userId");
      this.user_id = userId;
      this.rulesId = this.$route.query.id;
      if (window.localStorage.getItem("GuidePagesRules")) {
        this.GuidePages = false;
      }
      this.getDetails(); // 页面获取内容
    },
    mounted() {
      //
      this.$nextTick(() => {
        this.IOSAn = this.$const.userAgent().ios;
        console.log('1234567890', this.IOSAn, this.$const.userAgent());
      });
      //
      this.$nextTick(() => {
        window.sessionStorage.removeItem("refer_url");
        window.sessionStorage.removeItem("refer_title");
      });
      if (this.user_id) {
        // 有this.user_id
      } else {
        setTimeout(() => {
          this.IsActive = false;
          setTimeout(() => {
            this.IsActive = true;
          }, 5000)
        }, 2000)
      }
    },
    updated() {

    },
    methods: {
      footerClick(index) {
        if (index == 0) {
          this.shareMethod();
        } else if (index == 1) {
          this.collectMethod();
        } else if (index == 2) {
          this.relativeMethod();
        }
      },
      // 创建input
      createVal1(maxlength) {
        if (this.inputVal.length > maxlength) {
          this.inputVal = this.inputVal.substring(0, maxlength);
        }
      },
      //
      lawshowsh() {
        this.GuidePages = false;
        window.localStorage.setItem("GuidePagesRules", false);
      },
      //
      warningreLoad() {
        window.location.reload();
      },
      // 详情跳转到法规的主页
      return_Home() {
        this.$router.push({path: "/Law", query: {MathTime: global.timestamp}});
      },
      //
      shadowClose() {
        this.popupVisible = false;
        $(".shadow").hide();
      },
      //
      jump(i) {
        let y = parseInt(this.offsetArr[i]);
        $("#content").animate({scrollTop: y - $("#countTil").outerHeight() - $(".searchs").outerHeight() - 5});
        console.log("offsetArr", y, $("#countTil").outerHeight(), $(".searchs").outerHeight());
      },
      //
      muluShow() {       // -----目录相关方法-----
        if (this.muluCode) {
          setTimeout(() => {
            let hei = document.body.clientHeight;
            let scroll = (hei - 45) + 'px';
            document.querySelector(".sxLists").style.height = scroll;
            console.log(hei, scroll);
            $('.shadow').show();
            this.popupVisible = true;
          }, 500);
        } else {

        }
      },
      //
      relevantLink(i) {
        console.log(this.relevantList[i]);
        if (this.relevantList[i].id !== 0) {  // 暂无相关内容不能点击
          this.$router.push({
            path: '/rulesCount',
            query: {id: this.relevantList[i].relationLawId, MathTime: global.timestamp}
          });
        }
      },
      //
      relativeMethod() {
        this.$nextTick(() => {
          this.toshare(".am-relative");
        });
      },
      //
      shareMethod() {
        this.$nextTick(() => {
          this.toshare(".am-share");
        });
      },
      //
      collectMethod() {
        console.log('userId=' + this.user_id);
        if (this.user_id) {
          this.$nextTick(() => {
            this.toshare(".am-collect");
            this.createCollect();
            this.getDef();
          })
        } else {
          // console.log("没有userid");
          console.log(window.location.href);
          if (!window.sessionStorage) {
            return false;
          } else {
            // 主逻辑业务
            let title = '法规内容';
            this.$storage.loginStatus(this, title, window.location.href);
          }
        }
      },
      //
      toshare(cname) {
        $(cname).addClass("am-modal-active");
        if ($(".sharebg").length > 0) {
          $(".sharebg").addClass("sharebg-active");
          // $(".show_footer").hide();
        } else {
          $("#rulesCount").append('<div class="sharebg"></div>');
          $(".sharebg").addClass("sharebg-active");
          // $(".show_footer").hide();
          $("#content").css('overflow-y', 'hidden')
        }
        $(".sharebg-active,.share_btn").click(function () {
          $(cname).removeClass("am-modal-active");
          setTimeout(function () {
            $(".sharebg-active").removeClass("sharebg-active");
            $(".sharebg").remove();
          }, 300);
          $("#content").css('overflow-y', 'auto')
          // $(".show_footer").show();
        })
      },
      //
      editFocus(event) {
        let el = event.currentTarget;
        console.log(".offset().top", $(el).offset().top);
        this.$const.androidTop(el);
      },
      createDom() {
        $('.createVal').blur();
        if (this.inputVal.trim().length != 0) {
          this.$http({
            method: "POST",
            url: this.$api.host + "favourite/addFavourite",
            params: {
              userId: this.user_id,
              favouriteName: this.inputVal,
              isDefault: 0
            }
          }).then((res) => {
            if (res.data.returnCode == 1) {
              this.inputVal = '';
              document.querySelector('.closeInputVal').style.display = 'none';
              this.createCollect();
              this.$toast({message: '创建收藏夹成功', position: 'middle', duration: 1000});
            } else if (res.data.returnCode == 3) {
              this.$toast({message: '收藏夹不能相同', position: 'middle', duration: 1000});
            } else if (res.data.returnCode == 2) {
              this.$toast({message: '最多只能创建十个收藏夹', position: 'middle', duration: 1000});
            }
          }).catch((err) => {
            console.log(err)
          });
        }
      },
      // 根据用户id获取收藏夹
      createCollect() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "favourite/getFavourite",
          params: {
            userId: this.user_id,
            pageSize: this.bottom,
            pageIndex: this.pageTop
          }
        }).then((res) => {
          console.log(res);
          console.log(res.data.returnObject);
          if (res.data.returnCode == 1) {
            this.collcell = res.data.returnObject.list;
            this.num = res.data.returnObject.list.length;
          }
        }).catch((err) => {
          // this.$toast({message: '网络请求异常', position: 'middle', duration: 1500});
        });
      },
      // 获取默认收藏夹
      getDef() {
        this.$http({
          method: 'GET',
          url: this.$api.host + "favourite/getDefault",
          params: {
            userId: this.user_id
          }
        }).then((res) => {
          this.getDefS = res.data.returnObject;
          console.log(this.getDefS.id, this.getDefS);
        }).catch((err) => {
          console.log(err);
        })
      },
      // 添加到默认
      collectD() {
        this.$http({
          method: "GET",
          url: this.$api.host + "collect/addCollect",
          params: {
            refId: this.rulesId, // 文章id
            favourableId: this.getDefS.id, // 文件夹id
            title: this.titleName, // 标题名
            faWenZiHao: this.referenceNumber, // 发文字号
            publishTime: this.relDate, // 发布时间
            type: "law", // 类型
            timeLiness: this.inOperation
          }
        }).then((res) => {
          if (res.data.returnCode == 2) {
            this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
          } else {
            this.getDef();
            this.createCollect();

          }
          console.log(res);
        }).catch((err) => {
        })
      },
      // 根据收藏夹添加
      addCollect(index) {
        console.log(this.collcell[index].id, this.releaseStart); // 收藏夹id
        this.$http({
          method: "GET",
          url: this.$api.host + "collect/addCollect",
          params: {
            refId: this.rulesId,  // 文章id
            favourableId: this.collcell[index].id, // 文件夹id
            title: this.titleName, // 标题名
            faWenZiHao: this.referenceNumber, // 发文字号
            publishTime: this.relDate, // 发布时间
            type: "law", // 类型
            timeLiness: this.inOperation
          }
        }).then((res) => {
          if (res.data.returnCode == 2) {
            this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
          } else {
            this.$toast({message: '收藏成功', position: 'middle', duration: 1500});
            this.createCollect();
          }
          console.log(res);
        }).catch((err) => {
        })
      },
      //
      closeInputVals() {
        if (this.inputVal.length != 0) {
          this.inputVal = '';
          document.querySelector('.closeInputVal').style.display = 'none';
          document.querySelector('.createVal').focus();
        }
      },
      // 返回顶部
      return_Top() {
        $("#content").animate({scrollTop: 0});
      },
      //
      gol(index) {
        let url = this.attachment[index].filePath;
        let protocol = document.location.protocol == 'https:' ? 'https:' : 'http:';
        url = decodeURI(url).replace('http:', protocol).replace('https:', protocol);
        setTimeout(() => {
          window.location.href = url;
        }, 300);
      },
      //
      getDetails() {
        this.$http({
          method: "GET",
          url: this.$api.host + "law/getDetails",
          params: {
            id: this.rulesId,
            type: 'law'
          }
        }).then((res) => {
          console.log(res);
          if (res.data.returnCode === 1) {
            this.loading = false;
            let scopesName = res.data.returnObject.markets;
            // 给 markets 排序
            if (scopesName) {
              scopesName.sort((a, b) => {
                console.log(a, b);
                return a.marketId > b.marketId;
              });
              this.scopesName = scopesName;
            }
            console.log('', this.scopesName);
            this.titleName = res.data.returnObject.name; // 标题
            this.contents = res.data.returnObject.content; // 正文内容
            this.unitss = res.data.returnObject.organizations; // 发文单位
            this.referenceNumber = res.data.returnObject.referenceNumber; // 发文字号
            this.relDate = res.data.returnObject.PublishDate; //
            this.effDate = res.data.returnObject.effectDate; //
            this.inOperation = res.data.returnObject.timeliness;// 有效期
            this.attachment = res.data.returnObject.attachments; // 附件
            this.idCode = res.data.returnObject.id; // 法规id
            this.attachment = this.attachment == null ? [] : this.attachment; // 附件
            //
            let unitsStr = [];
            for (let i in this.unitss) {
              unitsStr.push(this.unitss[i].value);
            }
            this.unitssStr = unitsStr.join("、");
            //
            this.releaseStart = this.$const.formatText(this.relDate);
            this.releaseEnd = this.$const.formatText(this.effDate);

            // 声明对象
            let ObjStory = function (id, name) {
              this.id = id;
              this.name = name;
            }
            let reArr = [];
            let relevantArr = res.data.returnObject.relationLaws;  // 相关内容
            if (relevantArr == null) {
              reArr.push(new ObjStory(0, '暂无相关内容推荐！'));
            } else {
              this.relevantList = relevantArr;
            }
            //
            this.$nextTick(() => {
              window.document.title = res.data.returnObject.title;
              let adverttitle = window.document.title;
              let shareDesc = "";
              let sharelink2 = window.location.href;
              this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
              this.rees();
            });
            //
            this.$nextTick(() => {
              this.contentHeight = this.$refs.rulesCountDom.clientHeight - this.$refs.contTextDom.offsetTop - this.$refs.footerDom.clientHeight;
              let dom = document.querySelectorAll('#rules-contents h2', '#rules-contents h3');
              console.log('123', dom);
              for (let i = 0; i < dom.length; i++) {
                this.Directory.push({title: dom[i].outerHTML, offsetTop: dom[i].offsetTop});
              }
            });
            //
            this.muluCode = true;
            //
            this.contentDom();
          }
        }).catch((err) => {
          console.log(err);
          this.loading = false;
          $(".loadFalse").show();
        })
      },
      //
      contentDom() {
        this.$nextTick(() => {
          $('table').wrap("<div class='wrap wrapScoller'></div>");
          $("table").removeAttr('width');
          $("table").removeAttr('border');
          $("table").removeAttr('cellspacing');
          $("table").removeAttr('cellpadding');
          $("table").css({"border-collapse": "collapse"});
          $('thead').find('tr').removeAttr('width');
          $('thead').find('td').removeAttr('width');
          $('thead').find('th').removeAttr('width');
          $('tbody').find("tr").removeAttr('width');
          $('tbody').find("td").removeAttr('width');
          $('tbody').find("td").removeAttr('valign');
          $('tbody').find("td").removeAttr('style');
          $('tbody').find("p").removeAttr('align');
          $('tbody').find("th").removeAttr('width');
          $('span').find("font").removeAttr('size');
          //
          $('p').removeAttr("align");
          $('h2 strong').find("font").removeAttr('size');
          $('h5 strong').find("font").removeAttr('size');
          $('#rulesCount').find("font").removeAttr('face');
          $("#rules-contents img").before("<div style='height: 0'></div>");
          if ($('h2').length > 0) {
            this.ismuluShow = true;
          } else {
            this.ismuluShow = false;
            $('.returnTop').css("bottom", "3.333333rem");
          }
          //
          let strLen = $("#rules-contents img").parent();
          console.log("value", strLen);
          if (strLen.length == 0) {
            //
          } else {
          }
        })
      },
      //
      rees() {
        // 目录获取
        for (let i in $('#rules-contents h2 span')) {
          if ($("span").eq(i).attr('lang') == 'EN-US') {
            if ($("span").eq(i).text().length >= 20) {
              let xx = $("span").eq(i).text().substring(0, 21); // 截取到22个字符 但是6.2版本竟然重字 还是被挤下来 =》21
              $("span").eq(i).text(xx);
            }
          }
        }
        let arr = [];
        this.$nextTick(() => {
          if ($('h2').length !== 0) {
            for (let i = 0; i < $('h2').length; i++) {
              let cutStr = '';
              cutStr = $('h2')[i].innerText;
              console.log('目录cutStr', cutStr, typeof (cutStr), cutStr.length)
              if (cutStr.length !== 0 && cutStr.length !== 1) { // 空格情况长度为1 目录不会长度只有1的
                this.titleArr.push(cutStr);
                this.offsetArr.push($('h2').eq(i).offset().top);
                arr.push(cutStr);
                for (let j in this.titleArr) {
                  if (this.titleArr[j] == cutStr) {
                    this.titleArr.splice(cutStr, 1)
                  }
                }
              }
              for (let i in this.titleArr) {
                for (let j in arr) {
                  this.titleArr[i] == arr[j];
                  arr.splice(arr[j], 1)
                }
              }
              // * console.log('offsetTop----', this.offsetArr)*/
            }
            // * console.log('目录标题数组',this.titleArr)*/
          } else {
            this.ismuluShow = false;
          }
        })
        this.titlearr = arr;

      },
      // input聚焦
      searchFocus() {  // 页面搜索获取焦点后  安卓输入法弹起底部选项按钮隐藏
        let user = "";
        let h = document.body.scrollHeight;
        if (/android/i.test(navigator.userAgent)) {
          //  android
          user = "1";
          console.log('android');
          window.onresize = function () {
            if (document.body.scrollHeight < h) {
              $('.show_footer').hide();
            } else {
              $('.show_footer').show();
            }
          };
        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
          //  ios
          user = "0";
          console.log('ios')
        }
        $('.nodesLen').hide();
        $('.nodeslenText').hide();
        $('.icon').hide();
        /**/
        $('.seabox-and').css("width", '90%');
        this.AndroidShow = true;
        $('.seabox').width("100%");
      },
      //
      searchInput() {
        if (this.values.trim().length !== 0) {
          $('.closeCount').show();
        } else {
          $('.closeCount').hide();
        }
      },
      // 安卓机调用*/
      searchList() {
        this.searchBlur();
      },
      // input提交
      searchBlur() {
        document.activeElement.blur();
        $('#inputCount').blur();
        // this.textHeight();
        if (this.values.trim().length != 0) {
          $('#rulesText').each(function () {
            // 找到所有highlight属性的元素；
            $(this).find('.highlight').each(function () {
              $(this).replaceWith($(this).html()); // 将他们的属性去掉；
            });
          });
          let con = document.getElementById("rules-contents");
          let val = this.values;
          val = val.replace(/\./g, "\\.");
          console.log(val);
          let reg = new RegExp('(' + val + ')', 'gm');
          let text = con.innerHTML.replace(reg, "<span class='highlight'>$1</span>");
          con.innerHTML = text;
          // 读取页面所有满足要求的节点
          this.nodess = document.querySelectorAll("span[class='highlight']");
          // 默认选择第一个
          console.log("=======", this.nodess.length);
          this.nodessLen = this.nodess.length;
          if (this.nodessLen >= 2) {
            $('.nodesLen').show(); // 关键词条数
            $('.seabox').width("85%");
            $(".icon").css("display", "inline-block");
            $('.nodeslenText').hide();
            $('.seabox-and').css("width", '85%');
            this.AndroidShow = false;
          } else if (this.nodessLen == 1) {
            $('.nodesLen').show(); // 关键词条数
            $(".icon").hide();
          } else if (this.nodessLen == 0) {
            $('.seabox-and').css("width", '90%');
            this.AndroidShow = true;
            this.index = 0;
            $(".icon").hide();
            $('.nodesLen').hide(); // 关键词条数
            $('.nodeslenText').show();
          }
          this.SelectText(this.nodess[0]);
          this.index = 0;
        } else {
          $('#rulesText').each(function () {
            // 找到所有highlight属性的元素；
            $(this).find('.highlight').each(function () {
              $(this).replaceWith($(this).html());// 将他们的属性去掉；
            });
          });
        }
        // *this.AndroidShow = false;*/
      },
      //
      SelectText(element) {
        // 移除所有灰色背景
        $("span.highlight.graybg").removeClass("graybg");
        let text = document.getElementById(element);
        let selection = window.getSelection();
        this.range = document.createRange();
        selection.removeAllRanges();
        selection.addRange(this.range);
        // 检测是否要滚动展示
        this.scrollToElement("#content", element);
        $(element).addClass("graybg");
      },
      //
      scrollToElement(container, child) {
        container = $(container);
        let search = $(".searchs").outerHeight();
        let countTil = $(".countTli").outerHeight();
        console.log(search + countTil);
        let tobeHeight = search + countTil;
        child = $(child);
        console.log("234324suoyi", $(child));
        if (child.length == 0) {
          console.log(0);
        } else {
          let conScrollTop = container.scrollTop();
          console.log(conScrollTop);
          let childOffsetTop = child.position().top;
          console.log("eqweqweq", childOffsetTop);
          console.log(childOffsetTop + conScrollTop);
          container.animate({
            scrollTop: childOffsetTop + conScrollTop - tobeHeight - 5
          })
        }
      },
      //
      topRules() {
        console.log('上：' + this.index);
        if (this.index <= 0) {
          this.index = 0;
          this.$toast({message: '没有上一个了', position: 'middle', duration: 1500});
          return
        }
        this.SelectText(this.nodess[this.index - 1]);
        this.index--
      },
      //
      bottomRules() {          // 下选择
        console.log('下：' + this.index);
        if (this.index >= this.nodess.length - 1) {
          this.index = this.nodess.length - 1;
          this.searchBlur();
          return
        }
        this.SelectText(this.nodess[this.index + 1]);
        // console.log(this.index);
        this.index++
      },
      // input清除按钮
      closeCount() {
        this.values = '';
        $('.icon').hide();
        $('.nodeslenText').hide();
        $('.nodesLen').hide();
        this.searchBlur();
        this.AndroidShow = true;
        console.log('input的值：' + this.values);
        $('.seabox-and').css("width", '90%');
        $('#inputCount').focus();
        $('#inputCount-an').focus();
        $('.closeCount').hide();
        $('.seabox').width("100%");
      }
    },
    // 离开当前页面后
    destroyed() {

    }
  }
</script>

<style lang="scss">
  image[lazy=loading] {
    width: 40px !important;
    height: 40px !important;
    margin: auto !important;
    opacity: 0 !important;
  }
  image[lazy=error] {
    opacity: 0 !important;
  }
  .rulesCount {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
    position: relative;
    .searchs {
      width: 100%;
      height: 50px;
      background: #f0f1f5;
      padding: 7.5px 12px;
      box-sizing: border-box;
      vertical-align: middle;
      font-size: 0;
      .seabox {
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 2px;
        background-color: white;
        display: inline-block;
        float: left;
        i {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          position: absolute;
          top: 0;
          right: 6px;
          bottom: 0;
          margin: auto;
          border-radius: 50%;
          color: #ffb148;
          font-style: normal;
        }
        form {
          height: 100%;
          box-sizing: border-box;
          input.text {
            outline: none;
            width: 86%;
            height: 100%;
            background: #fff;
            color: #8d8d8d;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -webkit-appearance: none;
            border-radius: 2px;
            border: 0;
            padding: 0 8px 0 27px;
            font-size: 15px;
            background: url("/static/img/personal/search@3x.png");
            background-size: 15px 15px;
            background-position: 5px center;
            background-repeat: no-repeat;
          }
        }
        .nodeGroup {
          position: absolute;
          top: 9.5px;
          right: 10px;
          font-size: 0;
          display: -webkit-box;
          .nodesLen {
            background-color: white;
            z-index: 50;
            font-size: 13px;
            display: none;
            color: #8d8d8d;
          }
          .nodeslenText {
            background-color: white;
            z-index: 50;
            font-size: 13px;
            display: none;
            color: #8d8d8d;
            position: relative;
            top: 1px;
          }
          .closeCount {
            height: 16px;
            display: none;
            margin: 0 -3px 0 5px;
          }
        }
      }
      .seabox-and {
        height: 100%;
        width: 90%;
        position: relative;
        border-radius: 2px;
        background-color: white;
        display: inline-block;
        float: left;
        form {
          height: 100%;
          box-sizing: border-box;
          input {
            outline: none;
            width: 86%;
            height: 100%;
            background: #fff;
            color: #8d8d8d;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -webkit-appearance: none;
            border-radius: 2px;
            padding: 0 0 0 8px;
            border: 0;
            font-size: 15px;
            line-height: 1;
          }
        }
        .nodeGroup {
          position: absolute;
          top: 9.5px;
          right: 10px;
          font-size: 0;
          display: -webkit-box;
          .nodesLen {
            background-color: white;
            z-index: 50;
            font-size: 13px;
            display: none;
            color: #8d8d8d;
          }
          .nodeslenText {
            background-color: white;
            z-index: 50;
            font-size: 13px;
            display: none;
            color: #8d8d8d;
            position: relative;
            top: 1px;
          }
          .closeCount {
            height: 16px;
            display: none;
            margin: 0 -3px 0 5px;
          }
        }
      }
      .icon {
        width: 15%;
        height: 35px;
        display: none;
        .rulesBtn {
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          img {
            width: 15px;
            float: left;
            padding: 14px 0;
          }
          .buttop {
            padding-left: 10px;
            padding-right: 3px;
          }
          .butright {
            float: right;
          }
        }
      }
      .icons {
        width: 23px;
        height: 23px;
        display: inline-block;
        background-image: url("/static/img/personal/search@3x.png");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        top: 6px;
        float: right;
      }
    }
    .countTli {
      padding: 15px 12px 15px 12px;
      border-bottom: 0.5px solid #e3e3e3;
      line-height: 26px;
      font-size: 20px;
      background-color: white;
      text-align: justify;
      font-family: PingFangSC-Medium, sans-serif;
      color: #323232 !important;
      .countTitle {
        position: relative;
        .inOperation {
          position: absolute;
          top: 0;
          right: 12px;
          img {
            width: 80px;
          }
        }
      }
    }
    .clueActive {
      opacity: 0 !important;
      bottom: 55px !important;
    }
    .tt-clue {
      width: 120px;
      height: auto;
      line-height: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      text-align: center;
      border: 4px solid rgba(255, 177, 72, 0.9);
      text-indent: 0px;
      border-radius: 5px;
      position: absolute;
      pointer-events: none;
      background-color: rgba(255, 177, 72, 0.9);
      color: white;
      bottom: 62px;
      opacity: 1;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      -webkit-transition: all 1s ease-in-out;
      -moz-transition: all 1s ease-in-out;
      -o-transition: all 1s ease-in-out;
      -ms-transition: all 1s ease-in-out;
      transition: all 1s ease-in-out;
      &:before, &:after {
        content: '';
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgba(255, 177, 72, 0.9);
      }
    }
    /* *
    * todo
    * 法规矫正  // 法规正文校准
    * */
    #content {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
      height: 73%;
      overflow-y: auto;
      overflow-x: hidden;
      #rulesText {
        height: 100%;
        padding: 0 10px;
        .content-abs, #rules-contents {
          margin-bottom: 10px;
          padding-top: 10px;
          text-align: justify;
          word-spacing: 0;
          color: #323232;
          font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 16px;
            font-family: PingFangSC-Light, sans-serif, PingFangSC-Thin, sans-serif, PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            margin: 5px 0;
            line-height: 20px;
            font-weight: normal;
          }
          p {
            font-size: 16px;
            margin: 16px 0;
            font-family: PingFangSC-Light, sans-serif, PingFangSC-Thin, sans-serif, PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            text-align: justify;
            box-sizing: border-box;
            text-indent: 2em;
            word-break: break-all;
            line-height: 28px;
          }
          h1, h1 * {
            padding: 10px 0 0 0;
            margin: 0;
            line-height: 25px;
            font-size: 16px;
            text-align: center;
          }
          h2, h2 * {
            margin: 5px 0 0 0;
            font-size: 16px;
            font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
          }
          h3, h3 * {
            box-sizing: border-box;
            margin: 5px 0 5px 0;
            font-size: 16px !important;
            color: #323232 !important;
            font-family: PingFangSC-Medium, sans-serif;
          }
          h4, h4 * {
            font-size: 16px;
            border-radius: 2px !important;
            font-family: PingFangSC-Light, sans-serif, PingFangSC-Thin, sans-serif, PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            margin: 5px 0 !important;
            text-indent: 2em !important;
            text-decoration: line-through !important;
          }
          h5, h5 * {
            margin: 0 !important;
            text-align: right !important;
            font-size: 16px !important;
            color: #323232;
            font-family: PingFangSC-Light, sans-serif, PingFangSC-Thin, sans-serif, PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            font-weight: normal !important;
          }
          h6, h6 * {
            font-size: 14px !important;
            font-family: PingFangSC-Light, sans-serif, PingFangSC-Thin, sans-serif, PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            font-style: oblique !important;
            margin: 15px 0;
          }
          p cite, p cite * {
            color: #3D3DF2;
            font-style: italic !important;
          }
          a {
            text-decoration: none;
            word-wrap: break-word;
          }
          a:hover, a:visited, a:link, a:active {
            color: #3D3DF2;
            text-decoration: none !important;
          }
          img {
            width: 100%;
          }
          i {
            font-style: normal;
          }
          div {
            color: #323232;
          }
          //
          .wrapScoller, .wrapScoller * {
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
          }
          .wrapScoller {
            padding-top: 5px;
            padding-bottom: 2px;
          }
          .wrap {
            overflow-x: auto;
          }
          table {
            padding: 0 !important;
            width: 0;
            border-spacing: 0;
            border: 0;
            border-collapse: collapse;
            min-width: 150%;
            > table > tbody > tr > td {
              border-color: #f0f1f5 !important;
            }
            td {
              width: 0 !important;
              text-shadow: none !important;
              word-break: break-all !important;
              word-wrap: break-word !important;
              margin: 0 !important;
              vertical-align: middle;
              border: 1px solid #323232;
              border-collapse: collapse;
              p {
                text-indent: 0;
                margin: 5px 0;
              }
            }
          }
        }
        .attachmentGroup {
          padding: 0;
          .attachmentTitle {
            padding: 15px 0 11px 0;
            font-size: 17px;
            color: #323232;
            font-weight: 600;
            border-top: 1px solid #f0f1f5;
          }
          .attachmentList {
            padding: 0;
            margin: 0;
            font-size: 16px;
            padding-bottom: 20px;
            overflow: hidden;
            list-style: none;
            li {
              margin: 0;
              font-size: 16px;
              padding: 0 0 5px 0;
              font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
              text-align: justify;
              color: #323232;
              background-color: white;
              text-decoration: none;
              .attach_list {
                font-size: 16px;
              }
              .attach_list:active {
                color: #ffb148;
                text-decoration: underline;
              }
            }

          }
        }
      }
    }
    //
    .show_footer {
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      background: #f0f1f5;
      border-top: 1px solid #e3e3e3;
      box-shadow: 0 -8px 13px rgba(0, 0, 0, .02);
      -webkit-box-sizing: border-box;
      .show_items:hover .tt-clue {
        opacity: 0.9;
        bottom: 70px;
      }
      .show_items {
        flex: 1;
        height: 100%;
        text-align: center;
        color: #767877;
        font-size: 12px;
        text-decoration: none;
        padding: 5px 0;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
        .tabbar-Icon {
          width: 20px;
          height: 20px;
          margin: 0 auto 2.5px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        .tabbar-value {
        }
        .show_shareIcon {
          background-image: url("/static/img/rules/Attribute.png");
        }
        .show_collectIcon {
          background-image: url("/static/img/rules/celloctIcon.png");
        }
        .show_relativeIcon {
          background-image: url("/static/img/rules/linkIcon.png");
        }
      }

      .show_items.active {
        color: #f6900c;
      }
      .show_items span {
        display: block;
        width: 100%;
      }
      .show_shareIcon, .show_collectIcon, .show_relativeIcon {
        height: 50%;
      }

    }
    .popup-bottom {
      max-height: 400px;
      background: white;
      font-size: 14px;
      border-radius: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      text-align: center;
      -webkit-transform: translateY(100%);
      -ms-transform: translateY(100%);
      transform: translateY(100%);
      -webkit-transition: -webkit-transform 300ms;
      transition: transform 300ms;
      width: 100%;
      z-index: 99;
      .popup-bottom-title {
        width: 100%;
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #e3e3e3;
        color: #323232;
        margin: 0;
        font-size: 17px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
        text-align: center;
        line-height: 50px;
      }
      .popup-bottom-content {
        //
        .rulesPlateHeader {
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 300px;
          -webkit-overflow-scrolling: touch;
          .rulesPlate {
            background-color: white;
            padding: 12px 12px 0 12px;
            font-size: 14px;
            text-align: left;
            color: #323232;
            .rulesGulop {
              padding-bottom: 12px;
              border-bottom: 0.5px solid #e3e3e3;
              .rulesfw {
                font-size: 15px;
                color: #323232;
              }
              .market {
                text-align: center;
                display: inline-block;
                padding: 0 5px;
                border-radius: 20px;
                font-size: 10px;
                border: 1px solid #f0ad4e;
                margin-right: 5px;
              }
            }
          }
          .smCaption {
            text-align: left;
            padding: 12px 12px 0 12px;
            color: #323232;
            .nounits {
              border-bottom: none !important;
            }
            .units {
              display: flex;
              flex-flow: row;
              color: #323232;
              font-size: 15px;
              padding-bottom: 12px;
              border-bottom: 0.5px solid #e3e3e3;
              .unitsTitle {
              }
              .unitsCont {
                text-align: justify;
                flex: 1;
                box-sizing: border-box;
                .unitsName {
                }
              }
            }
          }
        }
        //
        .collect_global {
          .collect_shg {
            overflow: hidden;
            width: 100%;
            height: 50px;
            background-color: #f0f1f5;
            padding: 7.5px 12px;
            vertical-align: middle;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            line-height: 50px;
            .inputgle {
              height: 35px;
              width: 84%;
              background-color: #8d8d8d;
              border-radius: 2px;
              display: inline-block;
              float: left;
              border: 0;
              vertical-align: middle;
              .createVal {
                border: 0;
                float: left;
                height: 35px;
                margin: 0;
                width: 100%;
                padding: 0 0 0 12px;
                border-radius: 2px;
                outline: none;
                box-sizing: border-box;
                font-size: 15px;
              }
              .closeInputVal {
                position: absolute;
                top: 17px;
                right: 20%;
                height: 16px;
                display: none;
              }
            }
            .inputbtn {
              height: 35px;
              width: 13%;
              border-radius: 2px;
              display: inline-block;
              float: right;
              vertical-align: middle;
              .createDom {
                float: right;
                border: 0;
                background-color: white;
                height: 35px;
                border-radius: 2px;
                font-size: 15px;
                width: 100%;
                padding: 0;
                color: #f7971b;
              }
            }
          }
          .am-collect-sns {
            background-color: #fff;
            width: 100%;
            max-height: 300px;
            margin: 0;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            list-style: none;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            font-size: 15px;
            color: #323232;
            .collectMaxHeight {
              width: 100%;
              max-height: 250px;
              box-sizing: border-box;
              .default {
                width: 100%;
                box-sizing: border-box;
                .collect-list {
                  width: 100%;
                  height: auto;
                  box-sizing: border-box;
                  padding: 0 12px;
                  font-size: 15px;
                  position: relative;
                  overflow: hidden;
                  text-align: left;
                  .collect-item {
                    padding: 10px 0;
                    height: 100%;
                    box-sizing: border-box;
                    border-bottom: 0.5px solid #e3e3e3;
                    .defaultText {
                      text-align: left;
                      color: #323232;
                    }
                  }

                }
                .collect-list:last-child {
                  .collect-item {
                    border-bottom: 0;
                  }
                }
                .collect-list:active {
                  background-color: #f0f1f5;
                }
              }
            }
          }
        }
        //
        .am-relative-sns {
          background-color: #fff;
          width: 100%;
          max-height: 300px;
          overflow-y: scroll;
          margin: 0;
          padding: 0 12.5px;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          list-style: none;
          -webkit-overflow-scrolling: touch;
          font-size: 15px;
          color: #323232;
          li {
            border-bottom: 0.5px solid #e3e3e3;
            padding: 17.5px 0;
            display: block;
            div {
            }
          }
          li:last-child {
            border-bottom: 0;
          }
          li:active {
            background-color: #f0f1f5;
          }
        }
      }
      .popup-bottom-footer {
        width: 100%;
        height: 50px;
        font-size: 17px;
        font-family: PingFangSC-Medium, sans-serif;
        .share_btn {
          display: block;
          font-family: PingFangSC-Medium, sans-serif;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          text-align: center;
          line-height: 50px;
          background: white;
          color: #f6900c;
          border-top: 1px solid #eaeaea;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          font-size: 17px;
        }
      }
    }
    #warning {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 1);
      z-index: 3000;
      overflow: hidden;
      text-align: center;
      /* display: block;*/
      > .waringImg {
        height: 110px;
        width: 118.25px;
        margin: 38.2% auto 0 auto;
        background-image: url("/static/img/warning/warnin.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .waringText {
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        color: #ffb148;
        padding: 20px 0 0 0;
        text-align: center;
      }
      .waringBtn {
        box-shadow: none;
        color: white;
        border: 0;
        width: 90px;
        margin-top: 20px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        height: 30px;
        background: #ffb148;
      }
    }
    .shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
      z-index: 1111;
    }
    // 构造的遮罩层
    .sharebg {
      background-color: rgba(0, 0, 0, 0.6);
      height: 100%;
      width: 100%;
      overflow: hidden;
      opacity: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
      z-index: 70;
      display: none;
    }
    .sharebg-active {
      opacity: 1;
      display: block;
    }
    .am-modal-active {
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0)
    }
    // 移除 属性的构造 属性
    .graybg {
      background-color: #e3e3e3 !important;
      border-radius: 2px !important;
    }
    // 高亮 的class
    .highlight {
      background: rgba(255, 255, 255, .4);
      color: #ffb148;
    }
    //
    .popup-right-catalog {
      width: 72%;
      height: 100%;
      background-color: #fff;
      border-left: 1px solid #e3e3e3;
      box-shadow: 4px 2px 2px 1px #B9ADAD;
      .sxHeader {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e3e3e3;
        position: relative;
        .xa-icon-x {
          border: 0;
          height: 40px;
          width: 40px;
          background-color: white;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        .sxHeaderText {
          width: 100%;
          height: 100%;
          line-height: 45px;
          text-align: center;
          font-size: 15px;
          color: #323232;
        }
      }
      .sxLists {
        width: 100%;
        height: 93%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        .sxitemBox {
          width: 100%;
          height: auto;
          padding: 0 10px;
          box-sizing: border-box;
          .sxlistItem {
            width: 100%;
            border-bottom: 0.5px solid #e3e3e3;
            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            font-size: 14px;
            color: #323232;
            padding: 12.5px 0;
            position: relative;
            display: -webkit-box;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            text-align: justify;
          }
        }
        .sxitemBox:active {
          background-color: #f0f1f5;
        }
      }

    }
    //
    .open-catalog {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .44);
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: 125px;
      right: 25px;
      z-index: 10;
      font-size: 0;
      overflow: hidden;
      .catalog {
        line-height: 1;
        padding-top: 5px;
        width: 100%;
        text-align: center;
        img {
          width: 20px;
        }
      }
      .top {
        line-height: 1;
        padding-top: 5px;
        width: 100%;
        text-align: center;
        img {
          width: 20px;
        }
      }
      .home {
        line-height: 1;
        padding-top: 5px;
        width: 100%;
        text-align: center;
        img {
          width: 20px;
        }
      }
      .expert_s {
        box-shadow: none;
        width: 100%;
        padding-top: 3px;
        font-size: 11px;
        color: white;
        box-sizing: border-box;
        border: 0;
        background: rgba(0, 0, 0, 0) !important;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
      }
    }
    .returnTop {
      bottom: 185px;
      line-height: 25px;
    }
    .returnHome {
      bottom: 65px;
      line-height: 33px;
    }
    //
    .law-show {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.75);
      z-index: 2002;
      .law-show-sh {
        height: 32.5px;
        width: 100px;
        background-color: rgba(0, 0, 0, 0.01);
        color: #ffb148;
        border-radius: 2px;
        font-size: 15px;
        position: absolute;
        bottom: 17%;
        left: 50%;
        margin-left: -50px;
        text-align: center;
        line-height: 32.5px;
        border: 1.5px dashed #ffb148;
      }
      .GuidePage-rules {
        height: 100%;
        vertical-align: middle;
      }
      .GuidePage-rules img {
        width: 100%;
        position: absolute;
        top: 36%;
      }
    }
  }
  //
  @media (orientation: portrait) {
    /*//竖屏CSS*/
  }
  @media (orientation: landscape) {
    /*//横屏CSS*/
    table {
      border: 0;
      margin: 0;
      border-collapse: collapse;
      padding-top: 10px;
      margin-top: 20px;
      min-width: 100%;
    }
  }
</style>
