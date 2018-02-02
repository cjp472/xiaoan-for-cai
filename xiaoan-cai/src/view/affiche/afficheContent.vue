<template>
  <div class="rulesCount afficheCont">
    <!--内容区域-->
    <!--<div class="afficheContent" @click="openConfirm" @scroll="openConfirm">-->
    <!--&lt;!&ndash;<a :href="html" style="display: block;width: 100%;z-index:10;height: 100%;position: absolute;left:0;top:0;"-->
    <!--v-show="titleShow=='0'" target="_blank" v-if="size>5"></a>&ndash;&gt;-->
    <!--<img :src="src" alt=""-->
    <!--style="width: 96%;vertical-align: middle;margin:auto; position: absolute;left:0;top:2%;right:0;">-->
    <!--</div>-->
    <div class="afficheContent" :style="{height:contHeight+'px'}">
      <xiaoan-ifrome :src="pdfUrl"></xiaoan-ifrome>
    </div>
    <!---->
    <span class="tt-clue" :class="{clueActive: IsActive}">好内容点此收藏哟</span>
    <!--基本信息 -- 收藏-->
    <footer class="show_footer" ref="footerDom">
      <a href="javascript:;" class="show_items" v-for="(list, index) in footerItem"
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
              <span class="rulesfw">板块类别：</span>
              <span v-for="list in scopesName">
                                <span class="market" v-if="list == '沪市主板'"
                                      :style="{color:'#a9262c',borderColor:'#a9262c'}">沪主板</span>
                                <span class="market" v-else-if="list == '深市主板'"
                                      :style="{color:'#174299',borderColor:'#174299'}">深主板</span>
                                <span class="market" v-else-if="list == '深市中小板'"
                                      :style="{color:'#174299',borderColor:'#174299'}">中小板</span>
                                <span class="market" v-else-if="list == '深市创业板'"
                                      :style="{color:'#174299',borderColor:'#174299'}">创业板</span>
                                <span class="market" v-else-if="list == '新三板'"
                                      :style="{color:'#f6900c',borderColor:'#f6900c'}">新    三板</span>
                                <span class="market" v-else-if="list == '港股主板' || list == '香港主板'"
                                      :style="{color:'#174299',borderColor:'#174299'}">{{list}}</span>
                                <span class="market" v-else-if="list == '港股创业板' || list == '香港创业板'"
                                      :style="{color:'#174299',borderColor:'#174299'}">{{list}}</span>
                            </span>
            </div>
          </div>
          <div class="smCaption">
            <div class="units">
              <div class="unitsTitle">所属行业：</div>
              <div class="unitsCont">{{tradeSort}}</div>
            </div>
          </div>
          <div class="smCaption">
            <div class="units">
              <div class="unitsTitle">证券简称/代码：</div>
              <div class="unitsCont">{{unitss?unitss:''}}</div>
              <!-- <div class="unitsCont"><span v-for="v in unitss" class="unitsName unit">{{v+"、"}}</span>
               </div>-->
            </div>
          </div>
          <div class="smCaption">
            <div class="units">
              <div class="unitsTitle">公告名称：</div>
              <div class="unitsCont">{{referenceNumber?referenceNumber:''}}</div>
            </div>
          </div>

          <div class="smCaption">
            <div class="units nounits">
              <div class="unitsTitle">发布日期：</div>
              <div class="unitsCont">{{releaseEnd}}</div>
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
              <input v-model="inputVal" type='text' @input="createVal1(40)" :placeholder='placeholders'
                     class="createVal"/>
              <img v-lazy="close" alt="" @click="closeInputVals" class="closeInputVal">
            </div>
            <div class="inputbtn">
              <button class="createDom" @click="createDom">创建</button>
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
    <!---->
    <xa-loading v-show="loading"></xa-loading>
    <xiaoan-error v-show="loadFalse"></xiaoan-error>
    <!--返回首页-->
    <xiaoan-returnHome bg-color="rgba(0,0,0,0.4)" width="40px" height="40px" textSize="9px"></xiaoan-returnHome>
  </div>
</template>
<script>
  import ifrome from "../../components/dialog/iframe"
  import loading from '../../components/warning/loading'
  import error from '../../components/warning/error'
  import returnHome from '../../components/warning/returnHome'

  export default {
    name: "afficheContent",
    components: {
      'xa-loading': loading,
      "xiaoan-ifrome": ifrome,
      'xiaoan-error': error,
      'xiaoan-returnHome': returnHome
    },
    data() {
      return {
        footerItem: [
          {id: 0, name: '基本信息', value: '', show: false, icon: 'show_shareIcon'},
          {id: 1, name: '收藏', value: '', show: false, icon: 'show_collectIcon'},
        ],
        IsActive: true,
        loadFalse: false,
        pdfIframe: "/static/pdf/web/viewer.html?file=",
        pdfUrl: "",
        contHeight: '',
        show: true,
        src: '',
        allLoaded: false,
        size: "",
        loading: true,//是否加载中状态
        confirmShow: false,
        rulesId: "",//索引id
        user_id: "",//cookie userId
        //收藏相关
        getDefS: '',
        collcell: [],
        bottom: 15,
        pageTop: 1,
        close: '../../static/img/personal/collect/close.png',
        inputVal: "",
        placeholders: '请输入新建收藏夹名称(最多40个字)',
        //公告详情
        scopesName: [], // 板块类别
        tradeSort: "", // 所属行业
        releaseEnd: "", // 发布时间
        unitss: "", // 公告公司简称/代码
        html: "", // 公告链接
        titleShow: "", // 公告大小是否提示
        referenceNumber: ''
      }
    },
    watch: {
      selected(n, o) {
        console.log(n);
      },
      '$route': function () {

      }
    },
    created() {
      let userId = this.$cookie.getCookie("userId");
      this.user_id = userId;
      this.rulesId = this.$route.query.id;
    },
    mounted() {
      this.rulestext(); // 页面获取内容
      setTimeout(() => {
        $('.showPrompt').animate({opacity: 1, opacity: 0});
      }, 2500);
      this.$nextTick(() => {
        this.contHeight = document.body.clientHeight - document.querySelector('.show_footer').clientHeight - 1;
        $("meta").attr('user-scalable', 'yes');
        $("title").text('公告详情');
        this.hideFooter();
      });
      let companyName = window.localStorage ? localStorage.getItem("name") : Cookie.read("name");
      let companyCode = window.localStorage ? localStorage.getItem("code") : Cookie.read("code");
      console.log('------', companyName, '*******', companyCode);
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
    methods: {
      footerClick(index) {
        if (index == 0) {
          this.shareMethod();
        } else if (index == 1) {
          this.collectMethod();
        }
      },
      // 创建input
      createVal1(maxlength) {
        if (this.inputVal.length > maxlength) {
          this.inputVal = this.inputVal.substring(0, maxlength);
        }
      },
      // 详情跳转到法规的主页
      return_Home() {
        this.$router.push({path: "/Affiche"});
      },
      //
      warningreLoad() {
        window.location.reload();
      },
      //
      closeInputVals() {
        if (this.inputVal.length != 0) {
          this.inputVal = '';
          document.querySelector('.closeInputVal').style.display = 'none';
          document.querySelector('.createVal').focus();
        }
      },
      // 页面通过索引id获取内容
      rulestext() {
        this.$http({
          method: "GET",
          url: this.$api.host + "disclosure/getDetails",
          params: {
            id: this.rulesId,
            userId: this.user_id,
          }
        }).then((res) => {
          this.loading = false;
          // $(".loadFalse").hide();
          this.loadFalse = false;
          this.tradeSort = res.data.returnObject.tradeType;//行业类别

          if (res.data.returnObject.releaseDate !== "0") {
            this.releaseEnd = this.$const.formatText(res.data.returnObject.releaseDate);//发布日期
          } else {
            this.releaseEnd = "";
          }
          if (res.data.returnObject.companyShort == null || res.data.returnObject.companyCode == null) {
            this.unitss = "";
          } else {
            this.unitss = res.data.returnObject.companyShort + " " + res.data.returnObject.companyCode;//来源
          }
          if (res.data.returnObject.marketType !== null) {
            this.scopesName = res.data.returnObject.marketType.split(',');//板块类别
          }
          //
          this.src = res.data.returnObject.coverFile;//一页pdf
          this.size = res.data.returnObject.fileSize;//pdf大小
          this.referenceNumber = res.data.returnObject.title;//pdf名称
          this.titleName = this.referenceNumber;
          this.titleShow = res.data.returnObject.isBig;
          //
          if (this.titleShow == 1) {
            this.$messagebox.confirm('点击查看公告全文' + this.size + '？', '').then((confirm) => {
              console.log('再次确认', confirm);
              this.html = res.data.returnObject.url;//PDF链接
              let protocol = 'https:' == document.location.protocol ? 'https:' : 'http:';
              let url = this.html.replace('http:', protocol).replace('https:', protocol);
              this.pdfUrl = global.currentIp + this.pdfIframe + url;
            }).catch((cancel) => {
              console.log('取消确认', cancel, window.history.length);
              if (window.history.length == 2) {
                this.$router.push({path: '/'});
              } else {
                this.$router.go(-1);
              }
            })
          } else {
            this.html = res.data.returnObject.url; // PDF链接
            let protocol = 'https:' == document.location.protocol ? 'https:' : 'http:';
            let url = this.html.replace('http:', protocol).replace('https:', protocol);
            this.pdfUrl = global.currentIp + this.pdfIframe + url;
          }
          //Evans for 9.30 日期调整
          this.refNumber = res.data.returnObject.releaseDate;//收藏夹的发文字号改为公告发布日期
          $("title").text(res.data.returnObject.title);
          /***************/
          let adverttitle = res.data.returnObject.title;
          let sharelink2 = window.location.href;//分享链接
          let shareDesc = "上市公司、专业机构移动董办工具首选！";//描述
          this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
        }).catch((err) => {
          console.error(err);
          this.loading = false;
          // $(".loadFalse").show();
          this.loadFalse = true;
        })
      },
      //
      cacelConfirm(index) {
        if (index == 0) {
          this.confirmShow = false;
        } else {
          this.$router.push({path: 'Affpdf', query: {id: this.rulesId}});
        }
      },
      //
      openConfirm() {
        if (this.size.indexOf('K') > -1) {
          console.log('==/有', this.size, this.size.indexOf('K'));
          this.$router.push({path: 'Affpdf', query: {id: this.rulesId}});
        } else if (this.size.indexOf('M') > -1) {
          let KMSize = parseFloat(this.size);
          if (KMSize > 5) {
            this.confirmShow = true;
          } else {
            this.$router.push({path: 'Affpdf', query: {id: this.rulesId}});
          }
        } else {

        }
      },
      //
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i];
      },
      //
      hideFooter() {
        $(".mint-tabbar").hide();
        /*console.log('----------++++++-',$(".pf"))*/
        $(".wo").css('transform', ' scale(0.85)!important;');
        $(".pf").css('margin', '-50px -60px -110px!important');
      },
      // share duty
      shareMethod() {
        var len = $('.unit');
        var str = len.eq(len.length - 1).text();
        console.log(len.eq(len.length - 1).text());
        str = str.split('、').join(" ");
        console.log(str);
        len.eq(len.length - 1).text(str);
        this.$nextTick(() => {
          this.toshare(".am-share");
        });
      },
      //
      collectMethod() {
        console.log('userId=' + this.user_id);
        if (this.user_id) {
          // you
          this.$nextTick(() => {
            this.toshare(".am-collect");
            this.createCollect();
            this.getDef();
          })
        } else {
          console.log(window.location.href);
          if (!window.sessionStorage) {
            return false;
          } else {
            // 主逻辑业务
            // this.$router.push({path: "/number"});
            let title = '公告详情';
            this.$storage.loginStatus(this, title, window.location.href);
          }
        }
      },
      //
      createDom() {
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
            console.error(err);
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
          console.error(err);
          //this.$toast({message: '网络请求异常', position: 'middle', duration: 1500});
        });
      },
      // 获取默认收藏夹
      getDef() {
        this.$http.get(this.$api.host + "favourite/getDefault?userId=" + this.user_id).then((res) => {
          this.getDefS = res.data.returnObject;
          console.log(this.getDefS.id, this.getDefS);
        }).catch((err) => {
          console.error(err);
        })
      },
      // 添加到默认
      collectD() {
        this.$http({
          method: "GET",
          url: this.$api.host + "collect/addCollect",
          params: {
            refId: this.rulesId, //文章id
            favourableId: this.getDefS.id,//文件夹id
            title: this.titleName,//标题名
//            faWenZiHao: this.refNumber,//发文字号
            publishTime: this.refNumber,//发布时间  Evans for 9.30 日期存入错误 修正为publishTime
            type: "case"//类型
          }
        }).then((res) => {
          if (res.data.returnCode == 2) {
            this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
          } else {
            this.getDef();
            this.createCollect();
            this.$toast({message: '收藏成功', position: 'middle', duration: 1500});
          }
          console.log(res);
        }).catch((err) => {
          console.error(err);
        })
      },
      // 根据收藏夹添加
      addCollect(index) {
        console.log(this.collcell[index].id, this.releaseStart);//收藏夹id
        this.$http({
          method: "GET",
          url: this.$api.host + "collect/addCollect",
          params: {
            refId: this.rulesId, //文章id
            favourableId: this.collcell[index].id,//文件夹id
            title: this.titleName,//标题名
            ///faWenZiHao: this.refNumber,//发文字号
            publishTime: this.refNumber,//发布时间
            type: "case"//类型
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
          console.error(err);
        })
      },
      //
      toshare(cname) {
        $(cname).addClass("am-modal-active");
        if ($(".sharebg").length > 0) {
          $(".sharebg").addClass("sharebg-active");
          // $(".show_footer").hide();
        } else {
          $(".afficheCont").append('<div class="sharebg"></div>');
          $(".sharebg").addClass("sharebg-active");
          // $(".show_footer").hide();
          $(".afficheContent").css('overflow', 'hidden')
        }
        $(".sharebg-active,.share_btn").click(function () {
          $(cname).removeClass("am-modal-active");
          setTimeout(function () {
            $(".sharebg-active").removeClass("sharebg-active");
            $(".sharebg").remove();
          }, 300);
          // $(".show_footer").show();
          $(".afficheContent").css('overflow', 'scroll')
        })
      },
      // 离开当前页面后
      destroyed() {

      }
    }
  }
</script>

<style lang="scss">
  .afficheCont {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .clueActive {
      opacity: 0 !important;
      bottom: 55px !important;
    }
    .tt-clue {
      width: 120px;
      height: auto;
      line-height: 20px;
      left: 66%;
      transform: translateX(-66%);
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
        left: 75%;
        transform: translateX(-75%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgba(255, 177, 72, 0.9);
      }
    }
    .afficheContent {
      width: 100%;
      height: 93%;
      background: #808080;
      overflow: hidden;
      position: relative;
    }
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
      z-index: 1200;
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
              box-sizing: border-box;
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
  }
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
</style>

<style scoped>
  /*分享收藏按钮*/
  /*公告内容提示*/
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
  }
  .am-share, .am-collect {
    max-height: 400px;
    background: white;
    font-size: 14px;
    border-radius: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    text-align: center;
    -webkit-transform: translateY(100%);
    -ms-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-transition: -webkit-transform 300ms;
    transition: transform 300ms;
    width: 100%;
    z-index: 1200;
  }
  .am-modal-active {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0)
  }
  .am-modal-out {
    z-index: 80;
    -webkit-transform: translateY(100%);
    -ms-transform: translateY(100%);
    transform: translateY(100%)
  }
</style>
