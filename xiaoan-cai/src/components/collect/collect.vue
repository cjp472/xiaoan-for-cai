<template>
  <div class="collect" id="collect">
    <div class="collect-nav">
      <button class="collect-button" v-for="(list,index) in navBtn" :id="'add'+index"
              @click="clickBtn(index,$event)">{{list.name}}<span class="nav-head-sin"></span>
      </button>
    </div>
    <div class="nav-content">
      <div class="wrapper">
        <!--收藏---------------------------------->
        <div class="collect-scroll">
          <div class="collect-shg">
            <input type='text' v-model="inputValS" :placeholder='placeholder' id="createVal"
                   class="createVal" @keyup.13="createDom"/>
            <img :src="close" @click="closeInputValS" alt="" class="closeInputVal">
            <div class="inputbtn">
              <button class='createDom' @click="createDom">创建</button>
            </div>
          </div>  <!--系统默认-->
          <div class="collect-default">
            <div @click="collDef" class="collect-defu">
              <mt-cell-swipe>
                <div class="collectTitle">
                  <div class="collectTitle-er">{{getDefS.favouriteName}}</div>
                </div>
                <div class="collect-create">
                  <div class="collect-create-Img">
                                        <span><img :src="answers" alt="answers">
                                            <span class="collectText1">{{getDefS.qaCount}}</span>
                                        </span>
                    <span><img :src="statute" alt="statute">
                                            <span class="collectText1">{{getDefS.caseCount}}</span>
                                        </span>
                    <span><img :src="notice" alt="notice">
                                            <span class="collectText1">{{getDefS.lawCount}}</span>
                                        </span>
                    <span><img :src="reportIcon" alt="reportIcon">
                                            <span class="collectText1">{{getDefS.reportCount}}</span>
                                        </span>
                  </div>
                  <div class="collect-create-date">
                    <span>{{$const.format(getDefS.createTime)}}</span>
                  </div>
                </div>
              </mt-cell-swipe>
            </div>
          </div>
          <!--自建的文件夹-->
          <div v-for="(list,index) in collcell" class="coe">
            <div @click="gocollVall(list.id)" class="coe-coll">
              <mt-cell-swipe :right="[{
                                                content: '编辑',
                                                style: {backgroundColor: '#ffb148',color: '#fff', fontSize: '0.4rem','font-family': 'PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica'},
                                                handler: () => item(index)
                                                },{
                                                content: '删除',
                                                style: {backgroundColor: '#ff7250',color: '#fff', fontSize: '0.4rem','font-family': 'PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica'},
                                                handler: () => del(list.id)
                                                }]">
                <div class="collectTitle">
                  <div class="collectTitle-er">{{nuwNumber(list.favouriteName)}}</div>
                </div>
                <div class="collect-create">
                  <div class="collect-create-Img">
                                            <span><img :src="answers" alt="answers">
                                                 <span class="collectText1">{{list.qaCount}}</span>
                                            </span>
                    <span><img :src="statute" alt="statute">
                                                <span class="collectText1">{{list.caseCount}}</span>
                                            </span>
                    <span><img :src="notice" alt="notice">
                                                 <span class="collectText1">{{list.lawCount}}</span>
                                            </span>
                    <span><img :src="reportIcon" alt="reportIcon">
                                            <span class="collectText1">{{list.reportCount}}</span>
                                        </span>
                  </div>
                  <div class="collect-create-date">
                    <span>{{$const.format(list.createTime)}}</span>
                  </div>
                </div>
              </mt-cell-swipe>
            </div>
          </div>
        </div>
        <!--分享---------------------------------->
        <div class="collect-scroll" v-cloak>
          <div v-for="(list,index) in cellPage" class="coe">
            <div @click="gocollVall(list.id)" v-show="list.share == true" class="coe-coll">
              <mt-cell-swipe :right="[
                                                {
                                                content: '取消分享',
                                                style: {backgroundColor: '#ffd091',color: '#fff', fontSize: '0.4rem','font-family': 'PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica'},

                                                handler: () => cancelShare(index)
                                                },
                                                {
                                                content: '编辑',
                                                style: {backgroundColor: '#ffb148',color: '#fff', fontSize: '0.4rem','font-family': 'PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica'},
                                                handler: () => item(index)
                                                },{
                                                content: '删除',
                                                style: {backgroundColor: '#ff7250',color: '#fff', fontSize: '0.4rem','font-family': 'PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica'},
                                                handler: () => del(list.id)
                                                }
                                                ]">
                <div class="collectTitle">
                  <div class="collectTitle-er">{{list.favouriteName}}</div>
                </div>
                <div class="collect-create">
                  <div class="collect-create-Img">
                                            <span><img :src="answers" alt="answers">
                                                <span class="collectText1">{{list.qaCount}}</span>
                                            </span>
                    <span><img :src="statute" alt="statute">
                                                <span class="collectText1">{{list.caseCount}}</span>
                                            </span>
                    <span><img :src="notice" alt="notice">
                                                <span class="collectText1">{{list.lawCount}}</span>
                                            </span>
                    <span><img :src="reportIcon" alt="reportIcon">
                                            <span class="collectText1">{{list.reportCount}}</span>
                                        </span>
                  </div>
                  <div class="collect-create-date">
                    <span>{{$const.format(list.createTime)}}</span>
                  </div>
                </div>
              </mt-cell-swipe>
            </div>
          </div>
          <div v-show="collectShare" class="collect-share">
            <img :src="collectShareImg" alt="">
            <div>{{collectShareText}}</div>
          </div>
        </div>
        <!--订阅---------------------------------->
        <div class="collect-scroll" v-cloak>
          <div v-for="(list,index) in collGroom" class="coe">
            <div @click="groomLink(index)" class="coe-coll">
              <mt-cell-swipe :right="[{
                                          content: '删除',
                                          style: {backgroundColor: '#ff7250',color: '#fff', fontSize: '0.4rem'},
                                          handler: () => groomDel(index)
                                          }]">
                <div class="collectTitle">
                  <div class="collectTitle-er">{{list.title}}</div>
                </div>
                <div class="collect-create">
                  <div class="collect-create-Img">
                                        <span><img :src="answers" alt="answers">
                                             <span class="collectText1">0</span>
                                        </span>
                    <span><img :src="statute" alt="statute">
                                            <span class="collectText1"
                                                  v-if="list.countList.length !== 0 && list.countList[0].type && list.countList[0].type=='announcement'">
                                                {{ list.countList[0] ? list.countList[0].num : 0 }}
                                            </span>
                                            <span class="collectText1" v-else>{{ list.countList[1] ? list.countList[1].num : 0 }}</span>
                                        </span>
                    <span><img :src="notice" alt="notice">
                                            <span class="collectText1"
                                                  v-if="list.countList.length !== 0 && list.countList[0].type && list.countList[0].type=='law'">
                                                {{ list.countList[0] ? list.countList[0].num : 0 }}</span>
                                            <span class="collectText1" v-else>{{ list.countList[1] ? list.countList[1].num : 0 }}</span>
                                       </span>
                    <span><img :src="reportIcon" alt="reportIcon">
                                            <span class="collectText1">0</span>
                                        </span>
                  </div>
                  <div class="collect-create-date">
                    <span>{{$const.format(list.releaseTime)}}</span>
                  </div>
                </div>
              </mt-cell-swipe>
            </div>
          </div>
          <div v-for="(list,index) in dingyueListArr" class="coe">
            <div @click="gocollVall(list.favourite.id,list.favourite.shareKey)" class="coe-coll">
              <mt-cell-swipe :right="[{
                                                content: '删除',
                                                style: {backgroundColor: '#ff7250',color: '#fff', fontSize: '0.4rem'},
                                                handler: () => deldy(list.favourite.id)
                                                }]">
                <div class="collectTitle">
                  <div class="collectTitle-er">{{list.favourite.favouriteName}}</div>
                </div>
                <div class="collect-create">
                  <div class="collect-create-Img">
                                        <span><img v-lazy="answers" alt="answers">
                                            <span class="collectText1">{{list.favourite.qaCount}}</span>
                                        </span>
                    <span><img v-lazy="statute" alt="statute">
                                                <span class="collectText1">{{list.favourite.caseCount}}</span>
                                            </span>
                    <span><img v-lazy="notice" alt="notice">
                                                <span class="collectText1">{{list.favourite.lawCount}}</span>
                                            </span>
                    <span><img :src="reportIcon" alt="reportIcon">
                                            <span class="collectText1">{{list.favourite.reportCount}}</span>
                                        </span>
                  </div>
                  <div class="collect-create-date">
                    <span>{{$const.format(list.favourite.updateTime)}}</span>
                  </div>
                </div>
              </mt-cell-swipe>
            </div>
          </div>
          <div v-show="collectChoice" class="collect-choice">
            <img :src="collectChoiceImg" alt="">
            <div>{{collectChoiceText}}</div>
          </div>
          <div class="collect-bottom" @click="BtnGoAds">{{collectBottom}}</div>
        </div>
      </div>
      <!--加载中页面遮罩层-->
      <div class="shakeDis" v-show="shakeDisplay">
        <div class="snake-circle rules-circle"></div>
      </div>
    </div>
    <!---->
    <div class="collect-guidePages" v-show="collectGuidePages">
      <div class="collectGuidePagesA" v-show="collectGuidePages1">
        <img :src="collectGuidePagesImg1" alt="">
        <div>{{collectGuidePagesText1}}</div>
        <button @click="collectGuidePagesHide1">{{collectGuidePagesButton1}}</button>
      </div>
      <div class="collectGuidePagesB" v-show="collectGuidePages2">
        <img :src="collectGuidePagesImg2" alt="">
        <div>{{collectGuidePagesText2}}</div>
        <button @click="collectGuidePagesHide2">{{collectGuidePagesButton2}}</button>
      </div>
    </div>
    <v-returnHome bottom="12%"></v-returnHome><!--@event="goHome"-->
  </div>
</template>
<script>
  import Guide_Svg from "../../assets/icon/Guide.js"
  import returnHome from '../warning/returnHome.vue';

  export default {
    name: "collect",
    data() {
      return {
        close: '../../static/img/personal/collect/close.png',
        answers: '../../static/img/personal/collect/answers.png',
        statute: '../../static/img/personal/collect/statute.png',
        notice: '../../static/img/personal/collect/notice.png',
        reportIcon: '../../static/img/report/reportCollect.png',
        groomIcon: '../../static/img/personal/collect/groom.png',
        navBtn: [
          {"id": "0", "name": "收藏", "type": "collect0"},
          {"id": "1", "name": "分享", "type": "collect1"},
          {"id": "2", "name": "订阅", "type": "collect2"},
        ],
        active: "",
        shakeDisplay: true,//加载中
        collectShare: false,//分享遮罩
        collectShareImg: "../../static/img/warning/collectShare.png",//分享遮罩
        collectShareText: "您暂时还没有分享！",//分享遮罩
        collectChoice: false,//精选遮罩
        collectChoiceImg: "../../static/img/warning/collectjingxuan.png",//精选遮罩
        collectChoiceText: "您暂时还没有订阅！",//精选遮罩
        collectBottom: "订阅更多精彩内容，点击前往精选！",//精选遮罩
        inputValS: "",//创建的value值
        /**/
        placeholder: '请输入新建收藏夹名称（最多40个字）',
        show: false,
        collcell: [],
        cellPage: [],
        dingyueListArr: [],
        getDefS: [],
        //
        collectGuidePages: false,
        collectGuidePages1: false,
        collectGuidePages2: false,
        collectGuidePagesImg1: Guide_Svg.GuideCollect[0].img,
        collectGuidePagesText1: Guide_Svg.GuideCollect[0].text,
        collectGuidePagesImg2: Guide_Svg.GuideCollect[1].img,
        collectGuidePagesText2: Guide_Svg.GuideCollect[1].text,
        collectGuidePagesButton1: Guide_Svg.GuideCollect[0].button,
        collectGuidePagesButton2: Guide_Svg.GuideCollect[1].button,
        //
        user_id: '',
        top: 1,
        page: 1,
        bottom: 10,
        hideVal: '',
        groomArr: [],
        collGroom: [],
        showGroom: true,
        aNum: "",
        lNum: "",
        editStatus: false,//编辑页面的显示状态
        column: 0,
      }
    },
    watch: {
      cellPage: "cellPages",
      inputValS: 'createVal1',
    },
    components: {
      'v-returnHome': returnHome
    },
    updated() {
      this.lineHeight();
    },
    created() {
      if (window.localStorage.getItem('collectGuidePages') == "true") {
        this.collectGuidePages = false;
      } else {
        this.collectGuidePages = true;
        this.collectGuidePages1 = true;
        this.collectGuidePages2 = false;
      }
      let userId = this.$cookie.getCookie("userId");
      this.user_id = userId;
      console.log(userId);
      if (this.user_id == "") {
        this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
      }
      // userHome 我的收藏获取用户信息判断是否填写个人信息  若是没有则跳转填写个人信息页面
      this.userHome();
      this.getDef();
    },
    mounted() {
      this.lineHeight();
      setTimeout(() => {
        this.$nextTick(() => {
          //控制首次进入显示的页面
          if (window.localStorage.getItem("collectStatus") === "" || window.localStorage.getItem("collectStatus") == null || window.localStorage.getItem("collectStatus") == undefined || window.localStorage.getItem("collectStatus") == "0" || window.localStorage.getItem("collectStatus") == 0) {
            $("#add0").click();
          } else {
            var active = window.localStorage.getItem("collectStatus");
            $("#" + active).click();
          }
        });
      });
      let adverttitle = document.title;
      let sharelink2 = window.location.href;//分享链接
      let shareDesc = "";//描述
      this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
    },
    methods: {
      /* collectGuide*/
      collectGuidePagesHide1() {
        this.collectGuidePages1 = false;
        this.collectGuidePages2 = true;
      },
      collectGuidePagesHide2() {
        this.collectGuidePages1 = false;
        this.collectGuidePages2 = false;
        this.collectGuidePages = false;
        window.localStorage.setItem("collectGuidePages", "true");
      },
      cellPages() {
        console.log("cellPages==>", this.cellPage);
        if (this.cellPage == [] || this.cellPage.length === 0) {
          this.collectShare = true;
        } else {
          this.collectShare = false;
        }
      },
      /**///订阅..分享..收藏
      clickBtn(index, event) {
        this.column = index;
        var el = event.currentTarget;
        $(".collect-scroll").eq(index).show();
        $(".collect-scroll").eq(index).siblings().hide();
        //console.log(index, this.$refs.collectScrollMin0);
        this.active = "add" + index;
        window.localStorage.setItem("collectStatus", this.active);
        this.$nextTick(() => {
          if (index == 0) {
            this.collcell = [];
            this.gain();
          } else if (index == 1) {
            this.cellPage = [];
            this.gain();
          } else if (index == 2) {
            this.dingyueListArr = [];
            this.collGroom = [];
            this.groomList();
            setTimeout(() => {
              $(".collect-bottom").animate({bottom: "-1.5rem", opacity: 0});
            }, 3000);
          } else {
            this.collcell = [];
            this.getDef();
            this.gain();
          }
        });
        $(".collect-button").css({
          "color": "#8d8d8d",
          "font-family": "PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica"
        });
        $(el).css({
          "color": "#ffb148",
          "font-family": "PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica"
        });
        $(".nav-head-sin").hide();
        $(el).children().show();
      },
      /**/
      //计算高度
      lineHeight: function () {
        var hei = document.body.clientHeight;
        var head = document.querySelector(".collect-nav").clientHeight;
        var ghg = (hei - head) + "px";
        $(".wrapper").height(ghg);
        $(".collect-scroll").height(ghg);
        console.log(hei, head, ghg);
      },
      /**/
      //跳转推荐详情页
      groomLink(index) {
        window.localStorage.setItem("collectStatus", "add2");
        console.log(this.collGroom[index].id, this.collGroom[index].title);
        setTimeout(() => {
          this.$nextTick(() => {
            this.$router.push({
              path: '/collectGroom',
              query: {
                id: this.collGroom[index].id,
                title: this.collGroom[index].title,
                MathTime: global.timestamp
              }
            });
          })
        }, 100)
      },
      /*删除推荐列*/
      groomDel(index) {
        console.log(this.collGroom[index].id);
        this.$messagebox.confirm('删除后数据不保留，确定要删除吗？', '').then(() => {
          console.log("confirm");
          this.$http({
            method: "GET",
            url: this.$api.host + "recommend/deleteUserCollectRecommend",
            params: {
              recommendId: this.collGroom[index].id
            }
          }).then((res) => {
            console.log("删除成功", res);
            this.groomList();
            this.groom();
          }).catch((err) => {
            console.log(err)
          });
        }).catch(() => {
          console.log("notconfirm");
        })
      },
      /**/
      nuwNumber(str) {
        let hei = document.body.clientWidth;
        let nowH = 40;
        if (str.length >= nowH) {
          return str = str.substring(0, nowH) + '';
        } else {
          return str
        }
      },
      /*我订阅的推荐列表*/
      groomList() {
        this.shakeDisplay = true;
        this.$http({
          method: "GET",
          url: this.$api.host + "recommend/getUserCollectRecommend",
          params: {}
        }).then((res) => {
          //console.log(res);
          if (res.data.returnCode == 1) {
            this.collGroom = res.data.returnObject;
            for (let i = 0; i < this.collGroom.length; i++) {
              if (this.collGroom[i].countList == null || this.collGroom[i].countList == [] || this.collGroom[i].countList.length == 0) {
                let obj = [
                  {"num": "0", "type": "announcement"},
                  {"num": "0", "type": "law"},
                ];
                this.collGroom[i].countList = obj;
              }
            }
            console.log(this.collGroom);
          } else {
            this.collGroom = [];
          }
          console.log("======>>>>", this.collGroom);
          this.$http({
            methods: "GET",
            url: this.$api.host + "favourite/getSubscriptionList",
            params: {
              userId: this.user_id
            }
          }).then((res) => {
            this.dingyueListArr = res.data.returnObject;
            // console.log(this.collGroom, this.dingyueListArr);
            console.log("====>", this.dingyueListArr, this.collGroom);
            if ((this.collGroom == null || this.collGroom.length == 0) && this.dingyueListArr == null) {
              this.collectChoice = true;
            } else if ((this.collGroom == null || this.collGroom.length == 0) && this.dingyueListArr.length == 0) {
              this.collectChoice = true;
            } else {
              this.collectChoice = false;
            }
            this.shakeDisplay = false;
          }).catch((err) => {
            console.log(err)
          });
        }).catch((err) => {
          console.log(err)
        });
      },
      /**/
      TextArea(maxlength) {
        if (this.hideVal.length > maxlength) {
          this.hideVal = this.hideVal.substring(0, maxlength);
        } else {
          this.hideVal;
        }
      },
      //下面显示推荐收藏夹
      groom() {
        this.shakeDisplay = true;
        this.$http({
          method: "GET",
          url: this.$api.host + "recommend/getRecommendCollectList",
          params: {}
        }).then((res) => {
          if (res.data.returnCode = 1) {
            this.shakeDisplay = false;
            this.groomArr = res.data.returnObject;
          }
        }).catch((err) => {
          console.log(err);
        });

      },
      /**/
      //我的收藏获取用户信息判断是否填写个人信息  若是没有则跳转填写个人信息页面
      userHome() {
        this.$http({
          method: "GET",
          url: this.$api.host + "userHome",
          params: {}
        }).then((res) => {
          if (res.data.returnCode == 1) {
            if (res.data.returnObject.realName == '' || res.data.returnObject.realName == null) {
              this.$router.push({path: '/completeInfo', query: {MathTime: global.timestamp}});
            }
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      //创建input close
      closeInputValS: function () {
        this.inputValS = "";
        console.log("1111");
        document.querySelector('.closeInputVal').style.display = 'none';
        document.querySelector('.createVal').focus();
      },
      //创建input
      createVal1: function (maxlength) {
        maxlength = 40;
        if (this.inputValS.length > maxlength) {
          this.inputValS = this.inputValS.substring(0, maxlength);
        }
        if (this.inputValS.trim().length == 0) {
          $('.closeInputVal').hide();
        } else {
          $('.closeInputVal').show();
        }
      },
      //默认收藏夹
      getDef() {
        this.$http({
          method: "GET",
          url: this.$api.host + "favourite/getDefault",
          params: {
            userId: this.user_id,
          }
        }).then((res) => {
          this.getDefS = res.data.returnObject;
        }).catch((err) => {
          console.log(err);
        })
      },
      //
      collDef() {
        window.localStorage.setItem("collectStatus", "add0");
        this.$router.push({
          path: '/collect/collectDetails',
          query: {id: this.getDefS.id, MathTime: global.timestamp}
        });
      },
      //发送到详情也去
      gocollVall(indexId, index2) {
        console.log("", this.active);
        window.localStorage.setItem("collectStatus", this.active);
        this.$router.push({
          path: '/collect/collectDetails',
          query: {id: indexId, uuid: index2, MathTime: global.timestamp}
        });
      },
      //获取创建的收藏夹
      gain() {
        this.shakeDisplay = true;
        this.$http({
          method: "GET",
          url: this.$api.host + "favourite/getFavourite",
          params: {
            userId: this.user_id,
            pageSize: this.bottom,
            pageIndex: this.top
          }
        }).then((res) => {
          console.log(res.data.returnObject);
          this.shakeDisplay = false;
          if (res.data.returnCode == 1) {
            if (res.data.returnObject == "" || res.data.returnObject == null) {
              this.collcell = [];
            } else {
              let pages = res.data.returnObject.list;
              this.collcell = res.data.returnObject.list;
              this.cellPage = pages.filter(function (item) {
                return item.share == true;
              });
            }
            console.log("-=>", this.cellPage, this.collcell);
          } else {
            console.log("returnCode= -1");
          }
        }).catch((err) => {
          this.shakeDisplay = false;
          //this.$toast({message: '网络请求异常', position: 'middle', duration: 1500});
        });
      },
      //取消分享
      cancelShare(index) {
        this.$http({
          methods: "GET",
          url: this.$api.host + "favourite/shareSwitch",
          params: {
            userId: this.user_id,
            favouriteId: this.cellPage[index].id,
            isShare: false
          }
        }).then((res) => {
          console.log(res);
          if (res.data.returnCode == "1") {
            this.isCollects = '0';
            this.$toast({message: '已取消分享', position: 'middle', duration: 1500});
            this.gain();
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      //编辑方法
      item(index) {
        console.log('column', this.column, '编辑的收藏夹id', this.collcell, this.collcell[index].id, this.cellPage)
        var id;
        if (this.column == '0') {
          id = this.collcell[index].id;
        } else if (this.column == '1') {
          id = this.cellPage[index].id;
        }
        window.localStorage.setItem("collectStatus", this.active);
        this.$router.push({
          path: '/collect/collectDetails',
          query: {id: id, show: true, MathTime: global.timestamp}
        });
      },
      //
      BtnGoAds() {
        this.$router.push({path: '/ads', query: {MathTime: global.timestamp}});
      },
      //
      deldy(index) {
        console.log(index);
        $('.mint-cell-swipe').attr('href', 'javascript:void(0);');
        $('a').attr('href', 'javascript:void(0);');
        this.$messagebox.confirm('删除后数据不保留，确定要删除吗？', '').then(action => {
          if (action === 'confirm') {
            this.$http({
              method: "GET",
              url: this.$api.host + "favourite/cancelSubscription",
              params: {
                userId: this.user_id,
                id: index
              }
            }).then((res) => {
              console.log("删除成功", res);
              if (res.data.returnCode == 1) {
                this.dingyueListArr = [];
                this.collGroom = [];
                this.groomList();
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        })
      },
      //删除项目
      del(index) {
        $('.mint-cell-swipe').attr('href', 'javascript:void(0);');
        $('a').attr('href', 'javascript:void(0);');
        /*$('.coe').attr('href', 'javascript:void(0);');*/
        this.$messagebox.confirm('删除后数据不保留，确定要删除吗？', '').then(action => {
          this.shakeDisplay = true;
          setTimeout(() => {
            this.$nextTick(() => {
              this.$http({
                method: "GET",
                url: this.$api.host + "favourite/deleteById",
                params: {
                  id: index
                }
              }).then((res) => {
                console.log("删除成功", res);
                this.shakeDisplay = false;
                if (res.data.returnObject == null) {
                  this.collcell = [];
                  this.gain();
                }
              }).catch((err) => {
                console.log(err)
              });
            });
          }, 500);
          console.log(action);
        }).catch((cancel) => {
          console.log("111", cancel);
        })
      },
      //创建项目
      createDom() {
        console.log("12343", this.inputValS, "123");
        if (this.inputValS.length != 0) {
          this.inputValS = this.inputValS.trim();
          this.$http({
            method: "POST",
            url: this.$api.host + "favourite/addFavourite",
            params: {
              userId: this.user_id,
              favouriteName: this.inputValS,
              isDefault: 0,
            }
          }).then((res) => {
            if (res.data.returnCode == 1) {
              document.querySelector('.closeInputVal').style.display = 'none';
              this.gain();
              this.inputValS = "";
            } else if (res.data.returnCode == 3) {
              this.$toast({message: '收藏夹不能相同', position: 'middle', duration: 1000});
            } else if (res.data.returnCode == 2) {
              this.$toast({message: '最多只能创建十个收藏夹', position: 'middle', duration: 1000});
            } else {
              this.inputValS = "";
            }
          }).catch((err) => {
            console.log(err)
          });
        } else {
          //this.$toast({message: '输入框不能为空', position: 'top', duration: 1000});
        }
      },
    },
  }
</script>
<!--//重构组件样式-->
<style lang="scss">
  .mint-cell-swipe-button {
    padding: 0 39px 0 !important;
    box-sizing: border-box;
    line-height: 67px !important;
    text-decoration: none;
    height: 100% !important;
    display: flex;
    align-items: center;
    float: left;
  }
  .mint-cell-swipe-button + .mint-cell-swipe-button {
    padding: 14% 26.5px !important;
  }
  .collect {
    .collect-nav {
    }
  }
</style>
<style scoped lang="scss">
  .mint-cell {
    background-color: #f0f1f5;
  }
  .mint-cell-wrapper {
    background: none !important;
    background-size: 120% 0 !important;
    height: 100% !important;
    padding: 0 12px;
    /*line-height: 55px !important;*/
  }
  .mint-cell-text {
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 15px !important;
    vertical-align: inherit !important;
  }
  .mint-cell-value {
    height: 100% !important;
    width: 100% !important;
    display: block !important;
    padding: 0;
    box-sizing: border-box;
    background-color: white;
    border-radius: 2px;
  }
  .mint-cell-title {
    flex: 0;
  }
  .mint-cell:last-child {
    background-size: 100% 0 !important;
    height: 100% !important;
  }
  /**/
  input {
    outline: none;
    -webkit-appearance: none !important;
  }
  textarea {
    -webkit-appearance: none !important;
  }
  button {
    outline: none;
  }
</style>

<style scoped>
  #collect {
    width: 100%;
    height: 100%;
    background-color: #f0f1f5;
    color: #323232;
  }
  #collect .collect-nav {
    height: 45px;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    font-size: 0;
    border-bottom: 0.5px solid #e3e3e3;
  }
  #collect .collect-nav .collect-button {
    height: 45px;
    /*display: inline-block;*/
    width: 33.33%;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 15px;
    position: relative;
  }
  #collect .collect-nav .nav-head-sin {
    position: absolute;
    bottom: 1px;
    left: 50%;
    border-radius: 2px;
    /*// height: 2px;*/
    border-top: 2px solid #ffb148;
    width: 30px;
    /*display: inline-block;*/
    background-color: #ffb148;
    -webkit-transform: translateX(-50%);
    display: none;
    z-index: 1000;
  }
  #collect .nav-content {
    position: relative;
    box-sizing: border-box;
  }
  #collect .wrapper {
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  #collect .collect-bottom {
    height: 45px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 177, 72, 1);
    text-align: center;
    font-size: 15px;
    color: white;
    line-height: 45px;
    z-index: 1200;
  }
  #collect .coe {
    box-sizing: border-box;
    height: auto;
    margin-top: 10px;
    background-color: #f0f1f5;
  }
  #collect .coe:last-child {
    padding-bottom: 20px;
  }
  #collect .coe-coll {
    height: auto !important;
  }
  #collect .collect-shg {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: #f0f1f5;
    padding: 10px 12px 10px 12px;
    z-index: 1000;
    overflow: hidden;
  }
  #collect .collect-shg .createVal {
    border: 0;
    float: left;
    height: 35px;
    padding: 0;
    margin: 0;
    width: 84%;
    padding-left: 12px;
    padding-right: 8%;
    border-radius: 2px;
    box-sizing: border-box;
    -webkit-appearance: none !important;
    font-size: 15px;
    font-family: PingFangSC-Light, sans-serif;
  }
  #collect .collect-shg .inputbtn {
    height: 35px;
    width: 13%;
    border-radius: 2px;
    display: inline-block;
    float: right;
    vertical-align: middle;
  }
  #collect .collect-shg .createDom {
    float: right;
    border: 0;
    background-color: white;
    height: 35px;
    border-radius: 2px;
    font-size: 15px;
    width: 100%;
    padding: 0;
    color: #ffb148;
    font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
  }
  #collect .collect-default {
    height: auto;
    width: auto;
    position: relative;
    top: 0;
    left: 0;
    box-sizing: border-box;
    /*//margin: 10px 0 0 0;*/
  }
  #collect .collect-defu {
    background-color: white;
  }
  #collect .collect-create {
    color: #8d8d8d;
    padding: 10px 15px;
    font-size: 0;
    box-sizing: border-box;
    display: table;
    width: 100%;
  }
  #collect .collect-create .collect-create-Img {
    display: table-cell;
    font-size: 12px;
  }
  #collect .collect-create .collect-create-date {
    font-size: 12px;
    color: #8d8d8d;
    display: table-cell;
    text-align: right;
  }
  #collect .collect-create > span {
    /**/
    display: inline-block;
    line-height: 0;
  }
  #collect .collect-create img {
    vertical-align: middle;
    height: 14px;
  }
  #collect .collectText1 {
    position: relative;
    top: 1.5px;
    left: 0;
    font-size: 12px;
    display: inline-block;
    width: 15px;
    margin: 0 0 0 2px;
  }
  #collect .collectTitle {
    padding: 18px 15px 0 15px;
    color: #323232;
    font-size: 15px;
  }
  #collect .collectTitle .collectTitle-er {
    border-bottom: 0.5px solid #e3e3e3;
    padding-bottom: 18px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    line-height: 20px;
  }
  /**/
  #collect .collect-scroll {
    width: 100%;
    box-sizing: border-box;
  }
  #collect .collect-share, #collect .collect-choice {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    text-align: center;
    background-color: rgba(255, 255, 255, 1);
    z-index: 1005;
  }
  #collect .collect-share img, #collect .collect-choice img {
    width: 120px;
    margin: 38.2% auto 0 auto;
    text-align: center;
  }
  #collect .collect-share div, #collect .collect-choice div {
    font-size: 15px;
    color: rgba(255, 177, 72, 1);
    margin-top: 20px;
  }
  #collect .shakeDis {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    z-index: 2000;
    background: rgba(255, 255, 255, 1);
    line-height: 50%
  }
  #collect .snake-circle {
    height: 15px;
    width: 15px;
    -webkit-animation: snake-rotate 0.8s infinite linear;
    animation: snake-rotate 0.8s infinite linear;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: rgb(252, 199, 127);
    border-left-color: rgb(252, 199, 127);
    border-bottom-color: rgb(252, 199, 127);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
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
  /**/
  a {
    text-decoration: none;
    color: black;
    padding: 0;
    margin: 0;
  }
  /*input的清除按钮*/
  #collect .closeInputVal {
    position: absolute;
    top: 19px;
    right: 20%;
    height: 16px;
    display: none;
  }
  /*导示页*/
  #collect .collect-guidePages {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3000;
    text-align: center;
  }
  #collect .collect-guidePages .collectGuidePagesA img {
    height: 300px;
    margin-top: 4px;
  }
  #collect .collect-guidePages .collectGuidePagesA div {
    margin-top: 10px;
    font-size: 18px;
    color: white;
    padding: 0 20%;
  }
  #collect .collect-guidePages .collectGuidePagesA button {
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
  #collect .collect-guidePages .collectGuidePagesB img {
    height: 300px;
    margin-top: 4px;
    /*text-align: right;*/
    position: relative;
    right: -33%;
    top: 0;
  }
  #collect .collect-guidePages .collectGuidePagesB div {
    margin-top: 10px;
    font-size: 18px;
    color: white;
    padding: 0 10% 0 40%;
  }
  #collect .collect-guidePages .collectGuidePagesB button {
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

</style>
