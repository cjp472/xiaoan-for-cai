<template>
  <div id="afficheList">
    <div class="searchs">
      <div class="seabox">
        <div class="inputone" @click="searchCode">证券简称/代码</div>
        <span class="inputLine"></span>
        <div class="inputTwo" @click="company" style="width: 55%">搜索公告名称</div>
      </div>
      <i class="icon iconfont icon-tripsousuo"></i><!-- @click="searchList"-->
    </div>
    <div class="dataBox">
      <div class="showData" style="background:#fff ;">
        <div class="List1" @click="watchMoreInfo">
          <span class="now" id="xianjia">{{ now }}</span>
          <div class="List1line2">
            <span v-model="down" class="down" style="max-width:60%;overflow: auto;">{{ down }}</span>
            <span v-model="up" class="up" style="max-width:60%;overflow: auto;">{{ up }}</span>
          </div>
        </div>
        <div class="List2" @click="watchMoreInfo">
          <div class="line">
            <span>高</span>
            <span style="margin-left: 5px">{{ high }}</span>
          </div>
          <div class="line">
            <span style="margin-right: 5px">低</span>
            <span>{{ low }}</span>
          </div>
          <div class="line">
            <span style="margin-right: 5px">开</span>
            <span>{{ open }}</span>
          </div>
        </div>
        <div class="List3">
          <div class="line" @click="watchMoreInfo">
            <span style="margin-right: 5px">额</span>
            <span v-if="edu == NaN || edu == undefined">--</span>
            <span v-else>{{ edu }}</span>
          </div>
          <div class="line" @click="watchMoreInfo">
            <span style="margin-right: 5px">量</span>
            <span>{{ num }}</span>
          </div>
          <div class="line">
            <div class="huanshoulv" @click="showChange"
                 style="display: inline-block;border-radius: 4px;padding:-1px 4px 3px;padding-left: 5px;margin-left: -5px;">
              <span style="margin-right: 5px">换</span><!--padding-left: 5px;margin-left: -5px;-->
              <span class="spacileSpan">{{ change }}</span>
              <!--<span class="gantanhao" style="display: none">&ensp;！</span>-->  <!--换手率感叹号-->
            </div>
          </div>
        </div>
        <div class="List4" @click="alertBshow">
          <div class="fang">
            <span>偏离值</span>
            <span>{{ deviate }}</span>
          </div>
          <div class="san"></div>
        </div><!---->
      </div>
      <div class="showMoreData" @click="watchMoreInfo">
        <img src="/static/img/affiche/ORTodown.jpg" alt="" style="width:8px;transform:rotate(180deg)">
      </div>
    </div>
    <div class="content-Box" ref="wrapper" v-show="!isShowData" :style="{ height: wrapperHeight + 'px' }">
      <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
          infinite-scroll-distance="0">
        <!--内容列表-->
        <li class="content-lists">  <!--//releaseDate //title-->
          <div class="lists-item" v-for="(list,index) in contentList">
            <div @click="dianji(index)" style="width:100%">
              <span class="content-text">{{ list.title }}</span>
              <p style="float: right">{{ format(list.releaseDate) }}</p>
            </div>
          </div>
        </li>
      </ul>
      <!--9yue 25日 cai 改-->
      <p v-show="infLoading" class="infinite-loading">
        <mt-spinner type="snake" v-show="allLoaded"></mt-spinner>
        <span v-if="allLoaded" style="vertical-align: middle">加载中...</span>
        <xiaoan-drop v-else></xiaoan-drop>
      </p>
      <!-- 新股上市暂无公告 -->
      <div id="warning" v-show="linkIsErr">
        <div class="waringImg gonggaoWaringImg"></div>
        <div class="waringText">{{gonggaoText}}</div>
        <mt-button class="waringBtn gonggaoBtn" @click="warningreLoad">{{ waringBtn }}</mt-button>
      </div>
    </div>
    <!--是否关注按钮-->
    <div class="focAdd" @click="addFocus" v-show="this.addFocusShow">
      <span class="focAddImg" v-show="isFocus==false"></span>
      <span class="focAddText" v-if="isFocus==false">关注</span>
      <span class="focAddText"
            style="width: 100%;height: 100%;text-align: center;line-height: 50px;font-size: 11px;color:#9b9b9b!important;"
            v-else-if="isFocus==true">已关注</span>
    </div>
    <!---->
    <div class="law-show" v-if="GuidePages">
      <div class="GuidePage-aff" v-if="GuidePageAffs1"><img :src="GuideAffiche" alt=""></div>
      <div class="GuidePage-aff2" v-if="GuidePageAffs2"><img :src="GuideAffiche2" alt=""></div>
      <button class="law-show-sh" @click="lawshowsh" v-show="GuidePageAffs1">知道了</button>
      <button class="law-show-sh" @click="lawshowsh2" v-show="GuidePageAffs2">知道了</button>
    </div>
    <div class="showPrompt">上滑加载更多内容</div>
    <!--更多行情弹出页面-->
    <div class="moreInfo" v-show="moreInfoShow">
      <div class="infoBox">
        <div class="selectItem">
          <div class="itemName" v-for="(list,index) in moreInfoArr" @click="itemNameShow(index)">
            {{ list.name }}
            <span class="itemNameSplitLine"></span>
          </div>
        </div>
        <div class="itemInfoBox">
          <!--行情数据01-->
          <div class="itemInfo">
            <div class="itemInfoOne" v-show="moreInfoShowOne">
              <div class="infoLists">
                <div class="infoListOne">
                  <div class="infoItem" v-for="(list,index) in infoArrOne">
                    <div class="infoItemName">{{ list.name }}</div>
                    <div class="infoItemValue" v-if="list.value == null">--</div>
                    <div class="infoItemValue" v-else>{{ list.value }}</div>
                  </div>
                </div>
                <div class="infoListTwo">
                  <div class="infoItem" v-for="(list,index) in infoArrTwo">
                    <div class="infoItemName">{{ list.name }}</div>
                    <div class="infoItemValue" v-if="list.value == null">--</div>
                    <div class="infoItemValue" v-else>{{ list.value }}</div>
                  </div>
                </div>
                <div class="infoListThree">
                  <div class="infoItem" v-for="(list,index) in infoArrThree">
                    <div class="infoItemName">{{ list.name }}</div>
                    <div class="infoItemValue" v-if="list.value == null">--</div>
                    <div class="infoItemValue" v-else>{{ list.value }}</div>
                  </div>
                </div>
              </div>
              <div class="updateTime">
                <div class="updateTimediv"><span>数据更新于</span><span>{{ updateTime }}</span></div>
              </div>
            </div>
            <div class="alertContent" id="focus-warningM" v-show="!moreInfoShowOne"
                 style="width: 100%;height: 80%;background: #fff;">

              <div class="focus-waringImg"></div>
              <div class="focus-waringText">{{waringTextM}}</div>
              <mt-button class="focus-waringBtn" @click="waringBin">{{waringBtn}}</mt-button>
            </div>
          </div>
          <!--偏离值02-->
          <div class="itemInfo">
            <div class="alertContent" v-if="showERR==false">
              <div class="thisCompany">
                <div class="alertTitle">
                  <div class="gpName">证券简称</div>
                  <div class="alertDate">
                    <div class="centertitle" style="padding-left: 8%;box-sizing: border-box;">涨跌幅
                    </div>
                    <div class="centertitle">
                      <span>{{ today }}</span>
                      <span>{{ yesterday }}</span>
                      <span>{{ qiantian }}</span>
                    </div>
                  </div>
                  <div class="shiyinglv"
                       style="text-align: right;padding-right: 5px;box-sizing: border-box;display: inline-block;">
                                        <span
                                          style="height: 50%;display: block;padding-top: 4%;box-sizing: border-box;">市盈率</span>
                    <span
                      style="display: block;height: 50%;font-size: 10px;padding-top: 2%;box-sizing: border-box;">(动态)</span>
                  </div>
                </div>
                <div class="alertComInfo">
                  <div class="gsName gongsi">{{ companyName }}</div>
                  <div class="centerInfo plCenterInfotitle">
                    <span :style="{color:'#323232'}" v-if="jinri == null || jinri == ''"> -- </span>
                    <span :style="{color:'#323232'}" v-else-if="jinri == 0">{{jinri+'%'}}</span>
                    <span :style="{color:'#fb4319'}" v-else-if="jinri > 0">{{'+'+jinri+'%'}}</span>
                    <span :style="{color:'#29da89'}" v-else-if="jinri < 0">{{jinri+'%'}}</span>
                    <span :style="{color:'#323232'}" v-if="zuori == null || zuori == ''"> -- </span>
                    <span :style="{color:'#323232'}" v-else-if="zuori == 0">{{zuori+'%'}}</span>
                    <span :style="{color:'#fb4319'}" v-else-if="zuori > 0">{{'+'+zuori+'%'}}</span>
                    <span :style="{color:'#29da89'}" v-else-if="zuori < 0">{{zuori+'%'}}</span>
                    <span :style="{color:'#323232'}"
                          v-if="qianri == null || qianri == ''"> -- </span>
                    <span :style="{color:'#323232'}" v-else-if="qianri == 0">{{qianri+'%'}}</span>
                    <span :style="{color:'#fb4319'}"
                          v-else-if="qianri > 0">{{'+'+qianri+'%'}}</span>
                    <span :style="{color:'#29da89'}" v-else-if="qianri < 0">{{qianri+'%'}}</span>
                  </div>
                  <div class="comShiyinglv titlecomShiyinglv" :style="{color:'#323232'}"
                       style="line-height: 350%" v-if="shiyinglv == null">
                    --
                  </div>
                  <div class="comShiyinglv titlecomShiyinglv" :style="{color:'#323232'}"
                       style="list-height:350%;" v-else>
                    {{shiyinglv}}
                  </div>
                </div>
              </div>
              <div class="sameC" style="position: relative">
                <div class="plSameTitle">
                  <div class="sameCtitle" id="plz">{{ Industry }}
                  </div>
                </div>
                <div class="scrollerBox">
                  <ul class="industry">
                    <li class="alertComInfo centerInfoli" v-for="(list,index) in hangyeList"
                        @click="listInfo(index)">
                      <div class="gsName gongsi" style="text-align: left;"><!--<p>-->{{list.name}}
                        <!--</p>--></div>
                      <div class="centerInfo plCenterInfo">
                                                <span :style="{color:'#323232'}"
                                                      v-if="list.jinRiZhangDie == null || list.jinRiZhangDie == ''"> -- </span>
                        <span :style="{color:'#323232'}"
                              v-else-if="list.jinRiZhangDie == 0">{{list.jinRiZhangDie+'%'}}</span>
                        <span :style="{color:'#fb4319'}" v-else-if="list.jinRiZhangDie > 0">{{'+'+list.jinRiZhangDie+'%'}}</span>
                        <span :style="{color:'#29da89 '}"
                              v-else-if="list.jinRiZhangDie < 0">{{list.jinRiZhangDie+'%'}}</span>

                        <span :style="{color:'#323232'}"
                              v-if="list.zuoRiZhangDie == null || list.zuoRiZhangDie == ''"> -- </span>
                        <span :style="{color:'#323232'}"
                              v-else-if="list.zuoRiZhangDie == 0">{{list.zuoRiZhangDie+'%'}}</span>
                        <span :style="{color:'#fb4319'}" v-else-if="list.zuoRiZhangDie > 0">{{'+'+list.zuoRiZhangDie+'%'}}</span>
                        <span :style="{color:'#29da89 '}"
                              v-else-if="list.zuoRiZhangDie < 0">{{list.zuoRiZhangDie+'%'}}</span>

                        <span :style="{color:'#323232'}"
                              v-if="list.qianRiZhangDie == null || list.qianRiZhangDie == ''"> -- </span>
                        <span :style="{color:'#323232'}" v-else-if="list.qianRiZhangDie == 0">{{list.qianRiZhangDie+'%'}}</span>
                        <span :style="{color:'#fb4319'}" v-else-if="list.qianRiZhangDie > 0">{{'+'+list.qianRiZhangDie+'%'}}</span>
                        <span :style="{color:'#29da89 '}" v-else-if="list.qianRiZhangDie < 0">{{list.qianRiZhangDie+'%'}}</span>
                      </div>
                      <div class="comShiyinglv comShiyinglvli plTHshiyinglv"
                           style="text-align: right">
                                                <span :style="{color:'#323232'}"
                                                      v-if="list.shiYingLv == null"> -- </span>
                        <span :style="{color:'#323232'}" v-else>{{list.shiYingLv}}</span>
                      </div>
                    </li>
                  </ul>
                  <div class="seeMore" @click="watchMore">
                    <span>展开更多</span> <img src="/static/img/affiche/ORTodown.jpg"
                                           style="margin-bottom:-1px;margin-left:10px;width:10px;transform:rotate(180deg)">
                  </div>
                  <!--split line-->
                  <div class="huiseLine"
                       style="width:110%;height:7.5px;background: #f0f1f5;margin-left: -10px;"></div>
                  <!--大盘-->
                  <div class="marketSort">
                    <div class="marketTitle">
                      沪深大盘
                    </div>
                    <div style="padding:0 5px;box-sizing: border-box;width:100%;height:0.5px;">
                      <div style="width:100%;height:100%;background: #e3e3e3;"></div>
                    </div>
                    <div class="alertComInfo">
                      <div class="gsName gongsi" v-if="dapanname.length>4"
                           style="width:24%;overflow-x:scroll;overflow-y: hidden;white-space: nowrap;padding-top: 4%; ">
                        {{ dapanname }}
                      </div>
                      <div class="gsName gongsi" v-else
                           style="overflow-x:scroll;overflow-y: hidden;white-space: nowrap;padding-top: 4%; ">
                        {{ dapanname }}
                      </div>
                      <div class="centerInfo dpcenterInfo plCenterInfo">
                                                <span :style="{color:'#323232'}"
                                                      v-if="dapanjr == null || dapanjr == ''"> -- </span>
                        <span :style="{color:'#323232'}" v-else-if="dapanjr == 0">{{dapanjr+'%'}}</span>
                        <span :style="{color:'#fb4319'}" v-else-if="dapanjr > 0">{{'+'+dapanjr+'%'}}</span>
                        <span :style="{color:'#29da89 '}" v-else-if="dapanjr < 0">{{dapanjr+'%'}}</span>
                        <span :style="{color:'#323232'}"
                              v-if="dapanzr == null || dapanzr == ''"> -- </span>
                        <span :style="{color:'#323232'}" v-else-if="dapanzr == 0">{{dapanzr+'%'}}</span>
                        <span :style="{color:'#fb4319'}" v-else-if="dapanzr > 0">{{'+'+dapanzr+'%'}}</span>
                        <span :style="{color:'#29da89 '}" v-else-if="dapanzr < 0">{{dapanzr+'%'}}</span>
                        <span :style="{color:'#323232'}"
                              v-if="dapanqr == null || dapanqr == ''"> -- </span>
                        <span :style="{color:'#323232'}" v-else-if="dapanqr == 0">{{dapanqr+'%'}}</span>
                        <span :style="{color:'#fb4319'}" v-else-if="dapanqr > 0">{{'+'+dapanqr+'%'}}</span>
                        <span :style="{color:'#29da89 '}" v-else-if="dapanqr < 0">{{dapanqr+'%'}}</span>
                      </div>
                      <div class="comShiyinglv dacomSYL"
                           style="padding-top: 4%;box-sizing: border-box;">--
                      </div>
                    </div>
                  </div>
                  <div class="updateTime" id="plzUpdateTime">
                    <div class="updateTimediv"><span>数据更新于</span><span>{{ updateTime }}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="alertContent" id="focus-warning" v-else="showERR==true"
                 style="width: 100%;height: 80%;background: #fff;">

              <div class="focus-waringImg"></div>
              <div class="focus-waringText">{{waringText}}</div>
              <mt-button class="focus-waringBtn" @click="waringBin">{{waringBtn}}</mt-button>
            </div>
          </div>
          <!--换手率03-->
          <div class="itemInfo">
            <div class="alertContent alertContentH" v-if="showERRh==false">
              <div class="thisCompany">
                <div class="alertTitle">
                  <div class="gpName">证券简称</div>
                  <div class="alertDate">
                    <div class="centertitle"
                         style="padding-left: 20%;box-sizing: border-box;padding-top: 2%;">
                      累计换手率/（倍数）
                    </div>
                    <div class="centertitle">
                      <span>当日</span>
                      <span>前两日</span>
                      <span>前三日</span>
                    </div>
                  </div>
                  <div class="shiyinglv"
                       style="text-align: right;padding-right: 5px;box-sizing: border-box;display: inline-block;">
                                        <span
                                          style="width:100%;height: 50%;display: block;height: 50%;display: block;padding-top: 5%;box-sizing: border-box;">市盈率</span>
                    <span
                      style="display: block;height: 50%;font-size: 10px;">(动态)</span>
                  </div>
                </div>
                <div class="alertComInfo" style="height:55px;">
                  <div class="gsName gongsi">{{ companyName }}</div>
                  <div class="centerInfo">
                            <span>
                                <span class="spanLine1" :style="{color:'#323232'}"
                                      v-if="dangri == null || dangri == ''">--</span>
                                <span class="spanLine1" :style="{color:'#fb4319'}" v-else-if="dangri >= 20">{{toDecimal2(dangri)+'%'}}</span>
                                <span class="spanLine1" :style="{color:'#323232'}"
                                      v-else>{{toDecimal2(dangri)+'%'}}</span>

                                <span class="spanLine2" :style="{color:'#323232'}"
                                      v-if="dangrizhanbi == null  || dangrizhanbi == ''|| dangrizhanbi == '--'">(--)</span>
                                <span class="spanLine2" :style="{color:'#fb4319'}" v-else-if="dangrizhanbi >= 30">({{toDecimal2(dangrizhanbi)}})</span>
                                <span class="spanLine2" :style="{color:'#323232'}"
                                      v-else>({{toDecimal2(dangrizhanbi)}})</span>
                            </span>

                    <span>
                                <span class="spanLine1" :style="{color:'#323232'}"
                                      v-if="qianliangri == null || qianliangri == ''">--</span>
                                <span class="spanLine1" :style="{color:'#fb4319'}" v-else-if="qianliangri >= 20">{{toDecimal2(qianliangri)+'%'}}</span>
                                <span class="spanLine1" :style="{color:'#323232'}" v-else>{{toDecimal2(qianliangri)+'%'}}</span>

                                <span class="spanLine2" :style="{color:'#323232'}"
                                      v-if="qianliangrizhanbi == null || qianliangrizhanbi == ''|| qianliangrizhanbi == '--'">(--)</span>
                                <span class="spanLine2" :style="{color:'#fb4319'}" v-else-if="qianliangrizhanbi >= 30">({{toDecimal2(qianliangrizhanbi)}})</span>
                                <span class="spanLine2" :style="{color:'#323232'}" v-else>({{toDecimal2(qianliangrizhanbi)}})</span>
                            </span>

                    <span>
                                <span class="spanLine1" :style="{color:'#323232'}"
                                      v-if="qiansanri == null || qiansanri == ''">--</span>
                                <span class="spanLine1" :style="{color:'#fb4319'}" v-else-if="qiansanri >= 20">{{toDecimal2(qiansanri)+'%'}}</span>
                                <span class="spanLine1" :style="{color:'#323232'}"
                                      v-else>{{toDecimal2(qiansanri)+'%'}}</span>

                                <span class="spanLine2" :style="{color:'#323232'}"
                                      v-if="qiansanrizhanbi == null || qiansanrizhanbi == ''|| qiansanrizhanbi == '--'">(--)</span>
                                <span class="spanLine2" :style="{color:'#fb4319'}" v-else-if="qiansanrizhanbi >= 30">({{toDecimal2(qiansanrizhanbi)}})</span>
                                <span class="spanLine2" :style="{color:'#323232'}" v-else>({{toDecimal2(qiansanrizhanbi)}})</span>
                            </span>

                  </div>
                  <div class="comShiyinglv titlecomShiyinglv" style="padding-top:5%"
                       :style="{color:'#323232'}" v-if="shiyinglv == null">
                    --
                  </div>
                  <div class="comShiyinglv titlecomShiyinglv" style="padding-top:5%"
                       :style="{color:'#323232'}" v-else>
                    {{shiyinglv}}
                  </div>
                </div>
              </div>
              <div class="sameC">
                <div style="padding:0 5px ;width:100%;box-sizing: border-box;height:12%;">
                  <div class="sameCtitle" id="hsl">{{ Industry }}
                  </div>
                </div>
                <div class="scrollerBoxH">
                  <ul class="industryH">
                    <li class="alertComInfo centerInfoli"
                        v-for="(list,index) in hangyeListH"
                        @click="listInfoH(index)">
                      <div class="gsName gongsi" style="text-align: left"><!--<p>-->{{list.name}}
                        <!--</p>--></div>
                      <div class="centerInfo">
                                    <span v-if="list.code.indexOf('SH')">  <!--非沪市-->
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-if="list.todayThurnover == null">--</span>
                                        <span class="spanLine1" :style="{color:'#fb4319'}"
                                              v-else-if="list.todayThurnover >= 20">{{list.todayThurnover+'%'}}</span>
                                        <span class="spanLine1" :style="{color:'#323232'}" v-else>{{list.todayThurnover+'%'}}</span>

                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-if="list.todayRatio == null">(--)</span>
                                        <span class="spanLine2" :style="{color:'#fb4319'}"
                                              v-else-if="list.todayRatio >= 30">({{list.todayRatio}})</span>
                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-else>({{list.todayRatio}})</span>
                                    </span>
                        <span v-else>           <!--沪市-->
                                         <span class="spanLine1" :style="{color:'#323232'}"
                                               v-if="list.todayThurnover == null">--</span>
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-else>{{list.todayThurnover+'%'}}</span>

                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-if="list.todayRatio == null">(--)</span>
                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-else>({{list.todayRatio}})</span>
                                    </span>


                        <span v-if="list.code.indexOf('SH')">
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-if="list.twoDaysThurnover == null">--</span>
                                        <span class="spanLine1" :style="{color:'#fb4319'}"
                                              v-else-if="list.twoDaysThurnover >= 20">{{list.twoDaysThurnover+'%'}}</span>
                                        <span class="spanLine1" :style="{color:'#323232'}" v-else>{{list.twoDaysThurnover+'%'}}</span>

                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-if="list.twoDaysRatio == null">(--)</span>
                                        <span class="spanLine2" :style="{color:'#fb4319'}"
                                              v-else-if="list.twoDaysRatio >= 30">({{list.twoDaysRatio}})</span>
                                        <span class="spanLine2" :style="{color:'#323232'}" v-else>({{list.twoDaysRatio}})</span>
                                    </span>
                        <span v-else>           <!--沪市-->
                                         <span class="spanLine1" :style="{color:'#323232'}"
                                               v-if="list.twoDaysThurnover == null">--</span>
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-else>{{list.twoDaysThurnover+'%'}}</span>

                                         <span class="spanLine2" :style="{color:'#323232'}"
                                               v-if="list.twoDaysRatio == null">(--)</span>
                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-else>({{list.twoDaysRatio}})</span>
                                    </span>

                        <span v-if="list.code.indexOf('SH')">
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-if="list.threeDaysThurnover == null">--</span>
                                        <span class="spanLine1" :style="{color:'#fb4319'}"
                                              v-else-if="list.threeDaysThurnover >= 20">{{list.threeDaysThurnover+'%'}}</span>
                                        <span class="spanLine1" :style="{color:'#323232'}" v-else>{{list.threeDaysThurnover+'%'}}</span>

                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-if="list.threeDayRatio == null">(--)</span>
                                        <span class="spanLine2" :style="{color:'#fb4319'}"
                                              v-else-if="list.threeDayRatio >= 30">({{list.threeDayRatio}})</span>
                                        <span class="spanLine2" :style="{color:'#323232'}" v-else>({{list.threeDayRatio}})</span>
                                    </span>
                        <span v-else>
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-if="list.threeDaysThurnover == null">--</span>
                                        <span class="spanLine1" :style="{color:'#323232'}"
                                              v-else>{{list.threeDaysThurnover+'%'}}</span>
                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-if="list.threeDayRatio == null">(--)</span>
                                        <span class="spanLine2" :style="{color:'#323232'}"
                                              v-else>({{list.threeDayRatio}})</span>
                                    </span>
                      </div>
                      <div class="comShiyinglv comShiyinglvli" style="text-align: right">
                                                <span :style="{color:'#323232'}"
                                                      v-if="list.shiYingLv == null"> -- </span>
                        <span :style="{color:'#323232'}" v-else>{{list.shiYingLv}}</span>
                      </div>
                    </li>
                  </ul>
                  <div class="seeMoreH" @click="warchMoreHS"
                       style="display: flex;display: -webkit-flex;align-items: center;justify-content: center">
                    <span>展开更多</span> <img src="/static/img/affiche/ORTodown.jpg"
                                           style="margin-bottom:-1px;margin-left:10px;width:10px;transform:rotate(180deg)">
                  </div>
                  <div class="updateTime">
                    <div class="updateTimediv"><span>数据更新于</span><span>{{ updateTime }}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="alertContent" id="focus-warningH" v-else="showERRh==true"
                 style="width: 100%;height: 80%;background: #fff;">
              <div class="focus-waringImg"></div>
              <div class="focus-waringText">{{waringTextH}}</div>
              <mt-button class="focus-waringBtn" @click="waringBin">{{waringBtn}}</mt-button>
            </div>
          </div>
        </div>
      </div>
      <div class="infoClose">
        <div class="closeButton" @click="closeMoreInfo"></div>
      </div>
    </div>
    <div class="infoShadow" @click="closeMoreInfo"></div>
  </div>
</template>

<script>
  import drop from "../../components/warning/drop"

  export default {
    name: "afficheList",
    data() {
      return {
        moreInfoShowOne: true,//更多详情数据页面显示
        infoArrOne: [
          {name: "最高", value: "--"},
          {name: "今开", value: "--"},
          {name: "最低", value: "--"},
          {name: "昨收", value: "--"},
          {name: "涨停", value: "--"},
          {name: "总量", value: "--"},
          {name: "跌停", value: "--"},
          {name: "总额", value: "--"},
        ],
        infoArrTwo: [
          {name: "换手", value: "--"},
          {name: "量比", value: "--"},
          {name: "振幅", value: "--"},
          {name: "委比", value: "--"},
          {name: "市盈率(动)", value: "--"},
          {name: "市净率", value: "--"},
          {name: "市盈率(静)", value: "--"},
          {name: "每股净资产", value: "--"},
        ],
        infoArrThree: [
          {name: "总市值", value: "--"},
          {name: "总股本", value: "--"},
          {name: "流通值", value: "--"},
          {name: "流通股", value: "--"},
          {name: "52周最高", value: "--"},
          {name: "股息", value: "--"},
          {name: "52周最低", value: "--"},
          {name: "股息收益率", value: "--"},
        ],
        moreInfoArr: [
          {id: '0', name: "行情数据"},
          {id: '1', name: "偏离值"},
          {id: '2', name: "换手率"}
        ],
        moreInfoShow: false, //是否显示更多行情页面
        isShowData: false,//是否显示更多行情数据
        huanshouShow: true,
        lawshows1: true,
        lawshows2: false,
        GuidePageAffs1: true,
        GuidePageAffs2: false,
        GuidePages: false,
        GuideAffiche: '../../static/img/Guide-pages/GuidePages-aff1.png',
        GuideAffiche2: '../../static/img/Guide-pages/GuidePages-aff2.png',
        companyName: "",
        companyCode: "",
        comCode: "",
        title: "",
        now: '--', /*3043.54*/
        up: '--',
        down: '--',
        high: "--",
        low: "--",
        open: "--",
        num: "--",
        edu: "--",
        size: "--",
        change: "--",
        deviate: "--",
        bottomStatus: '', //下拉状态
        ISloading: true,
        ISloading1: true,
        riKarr: [],
        ISloading2: true,
        ISloading3: true,
        currentTime: "", //当前时间  请求图表数据
        xiabiao: "",
        active: 0,
        localUrl: "",
        contentList: [],//公司公告列表
        listCount: "",//返回公告的数量
        pageSize: 20,//每页条数
        pagesize: 5,//同行信息
        pageHsize: 5,//同行换手率信息
        pageNum: 1,//当前页码
        watchmore: true, //偏离值查看更多
        watchmoreH: true,//换手率查看更多
        jinri: "",
        zuori: "",
        qianri: "",
        timeJinri: "",
        timeZuori: "",
        timeQianri: "",
        shiyinglv: "",
        dapanjr: "",
        dapanzr: "",
        dapanqr: "",
        dapansy: "",
        dapanname: "",
        dapancode: "",
        today: "",
        yesterday: "",
        qiantian: "",
        Industry: "",//行业名称
        hangyeList: [],//同行业公司信息
        listFlag: true,
        updateTime: "",//最后更新时间
        alertShow: true,//显示偏离值弹窗
        alertPshow: true,//显示换手率弹窗
        dangri: "",//关注公司日均换手率
        dangrizhanbi: "",//关注公司日均换手率占比
        bishi: "",
        qianliangri: "",
        qianliangrizhanbi: "",
        qiansanri: "",
        qiansanrizhanbi: "",
        hangyeListH: [],//同行业公司换手率信息
        pianlivalFlag: false,//偏离值显示开关
        user_id: "",//用户id
        apidate: "",//to后台传时间戳
        simCode: "",//公司代码的6位
        showERR: false,//偏离值获取失败
        showERRh: false,//换手率获取失败
        gonggaoText: "暂无公告！", //新股暂无公告
        waringText: "获取偏离值失败，请刷新重试！",//偏离值获取失败
        waringBtn: "刷新",//偏离值获取失败
        waringTextH: "获取换手率失败，请刷新重试！",//换手率获取失败
        waringTextM: "获取行情数据失败，请刷新重试！",//行情数据获取失败
        isFocus: false,//未关注该公司
        addFocusShow: true,//判断是否登录显示关注
        listNum: 0,//公告列表数量
        linkIsErr: false,//公告获取是否成功
        nowTime: "",//标准时间
        ///
        infLoading: true,
        loading: false,
        allLoaded: true,
        wrapperHeight: 0,
      }
    },
    updated() {
      var hei = document.body.clientHeight;
      var ghg = (hei - (document.querySelector('.searchs').clientHeight) - (document.querySelector(".dataBox").clientHeight) - (document.querySelector('.mint-tabbar').clientHeight)) + "px";
      $('.content-Box').height(ghg);
    },
    created: function () {
      console.log('afficheList-create: created, GuidePagesAffiche:' + window.localStorage.getItem('GuidePagesAffiche'))
      if (window.localStorage.getItem('GuidePagesAffiche')) {
        this.GuidePages = false;
      } else {
        this.GuidePages = true;
      }
    },
    components: {
      "xiaoan-drop": drop,
    },
    watch: {
      // '$route'(to, from) {
      //     window.location.reload();
      // }
    },
    mounted() {
      $(".sharebg").removeClass('sharebg-active');
      let code, name;
      code = this.$route.query.code;
      name = this.$route.query.name;
      this.companyName = name;
      this.companyCode = code;
      if (name == 'undefined' || name == 'null') {
      } else {
        this.comCode = code.substring(2, 8);
        $("title").text(this.companyName + ' ' + this.comCode)
      }
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      if (this.isShowData == true) {
        this.dataHeight = document.documentElement.clientHeight - this.$refs.dataH.getBoundingClientRect().top - 50;
        this.dataColor = 'white';
      }
      this.localUrl = window.location.href;

      var userId = this.$cookie.getCookie("userId");
      this.user_id = userId;
      if (this.user_id) {
        this.addFocusShow = true;
      } else {
        this.addFocusShow = false;
      }
      //获取关注公司股票信息
      this.$http({
        method: "GET",
        url: this.$api.host + 'attention/getStockInfo', /*http://192.168.52.98:8080/v1/*/
        params: {
          obj: this.companyCode
        }
      }).then((res) => {
        //console.log('----------->', res)
        this.nowTime = res.data.returnObject.shiJian;
        var repdata = res.data.returnObject.data;
        //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',repdata.zuiXinJia,res.data.returnObject.shiFouTingPai)
        this.title = repdata.zhongWenJianCheng + " " + repdata.obj;
        if (repdata.zuiXinJia == null) {
          this.now = "--";
          this.pianlivalFlag = true;
        } else {
          this.now = this.toDecimal2(repdata.zuiXinJia);
        }
        if (repdata.shiFouTingPai == true) {
          this.now = '--';  //“停牌”
          this.up = "--";
          this.down = "--";
          this.pianlivalFlag = true;
          console.log('暂停上市？->', repdata.zhongWenJianCheng.indexOf('暂停上市'))
        }

        //处理数值每隔3位加 ，
        function f(n) {
          var b = parseInt(n).toString();
          var len = b.length;
          if (len <= 3) {
            return b;
          }
          var r = len % 3;
          return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
        }

        if (repdata.huanShou == null || repdata.huanShou == 0 || repdata.huanShou == undefined) {
          this.change = "--";
        } else {
          this.change = this.toDecimal2(repdata.huanShou) + "%";
        }
        if (repdata.zuiGaoJia == null || repdata.zuiGaoJia == 0 || repdata.zuiGaoJia == undefined) {
          this.high = "--";
        } else {
          this.high = this.toDecimal2(repdata.zuiGaoJia);
        }
        /*this.edu = f(repdata.chengJiaoE);*/
        var eduStr = repdata.chengJiaoE.toString();
        if (eduStr.length >= 5 && eduStr.length < 9) {
          var edu = (repdata.chengJiaoE / 10000).toFixed(2);
          var eduarr = edu.toString().split('.')
          if (eduarr[0].length > 3) {
            var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
            var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
            eduarr[0] = newstrs;
          }
          this.edu = eduarr.join(".") + '万';
        } else if (eduStr.length >= 9) {
          var edu = (repdata.chengJiaoE / 100000000).toFixed(2);
          var eduarr = edu.toString().split('.')
          if (eduarr[0].length > 3) {
            var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
            var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
            eduarr[0] = newstrs;
          }
          this.edu = eduarr.join(".") + '亿';
        } else {
          this.edu = f(repdata.chengJiaoE);
        }
        if (repdata.chengJiaoE == null || repdata.chengJiaoE == 0 || repdata.chengJiaoE == undefined || repdata.chengJiaoE == NaN) {
          this.edu = "--";
        }
        this.low = this.toDecimal2(repdata.zuiDiJia);
        if (repdata.zuiDiJia == null || repdata.zuiDiJia == 0) {
          this.low = "--";
        }
        var numStr = (repdata.chengJiaoLiang / 100).toString();
        if (numStr.length >= 5 && numStr.length < 9) {
          var edu = (repdata.chengJiaoLiang / 1000000).toFixed(2);
          var eduarr = edu.toString().split('.')
          if (eduarr[0].length > 3) {
            var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
            var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
            eduarr[0] = newstrs;
          }
          this.num = eduarr.join(".") + '万手';

        } else if (numStr.length >= 9) {
          var edu = (repdata.chengJiaoLiang / 10000000000).toFixed(2);
          var eduarr = edu.toString().split('.')
          if (eduarr[0].length > 3) {
            var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
            var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
            eduarr[0] = newstrs;
          }
          this.num = eduarr.join(".") + '亿手';
        } else {
          this.num = f(repdata.chengJiaoLiang / 100) + '手';
        }
        if (repdata.chengJiaoLiang == null || repdata.chengJiaoLiang == 0) {
          this.num = "--";
        }
        this.open = this.toDecimal2(repdata.kaiPanJia);
        if (repdata.kaiPanJia == null || repdata.kaiPanJia == 0) {
          this.open = "--";
        }
        if (repdata.zhangFu > 0) {        //涨幅大于零 为红色
          this.up = "+" + this.toDecimal2(repdata.zhangFu) + "%";
          $(".up").css('color', '#fb4319')
          $(".now").css('color', '#fb4319')
          $(".down").css('color', '#fb4319')
        } else if (repdata.zhangFu < 0) {  //涨幅小于零 为绿色
          this.up = this.toDecimal2(repdata.zhangFu) + "%";
          $(".up").css('color', '#29da89')
          $(".now").css('color', '#29da89')
          $(".down").css('color', '#29da89')
        } else if (repdata.zhangFu == 0) {  //涨幅等于零 为黑色
          this.up = this.toDecimal2(repdata.zhangFu) + "%";
          $(".up").css('color', 'black')
          $(".now").css('color', 'black')
          $(".down").css('color', 'black')
        }
        if (repdata.zhangDie > 0) {
          this.down = "+" + this.toDecimal2(repdata.zhangDie);
        } else if (repdata.zhangDie < 0) {
          this.down = this.toDecimal2(repdata.zhangDie);
        } else if (repdata.zhangDie == 0) {
          this.down = this.toDecimal2(repdata.zhangDie);
        }
      }).catch((err) => {
        console.log(err)
        clearInterval(window.timeK);
        clearInterval(window.timePianli)
      })

      function getNowFormatDate() {
        var date = new Date();
        var splittip = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + month + strDate + splittip + date.getHours() + date.getMinutes() + date.getSeconds() + splittip + date.getMilliseconds();
        return currentdate;
      }

      this.currentTime = getNowFormatDate();
      var date = new Date();
      var dateH = date.getHours();
      if (dateH > 14 || dateH < 9) {
        this.getData("true");
      } else {
        this.timeData('true')
      }
      this.saveLocalStorage();
      this.isFocusM();//判断是否关注该公司
      this.getContent(); // 获取该公司公告信息
      this.getPianlivalue(); //获取偏离值
    },
    methods: {
      // 单位 万 亿处理 逗号相隔
      unitWan(str) {
        if (str.length < 11 && str.length >= 7) {
          var x = (str / 10000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return y.join(".") + '万';
        } else if (str.length >= 11) {
          var x = (str / 100000000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return y.join(".") + '亿';
        } else if (str.length < 7) {
          return str
        }

      },
      //默认单位为万元处理 逗号相隔
      unitYi(str) {
        if (str.length >= 7) {
          var x = (str / 10000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return y.join(".") + '亿';
        } else if (str.length < 7 && str.length >= 5) {
          var x = (str / 1000000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return y.join(".") + '百万';
        } else if (str.length < 7 && str.length >= 6) {
          var x = (str / 10000000).toFixed(2);
          var y = x.toString().split('.')
          if (y[0].length > 3) {
            var z = y[0].substring(0, y[0].length - 3);
            var n = z + ',' + y[0].substring(y[0].length - 3, y[0].length);
            y[0] = n;
          }
          return y.join(".") + '千万';
        } else if (str.length < 5) {
          return str + "万"
        }
      },
      //更多行情数据 颜色判断 alex 比对昨收值 > red < green
      isColor(i) {
        if (this.infoArrOne[i].value !== null && this.infoArrOne[3].value !== null) {
          if (parseFloat(this.infoArrOne[i].value) > parseFloat(this.infoArrOne[3].value)) {
            $(".infoListOne").find('.infoItemValue').eq(i).css("color", "#fb4319")
          } else if (parseFloat(this.infoArrOne[i].value) < parseFloat(this.infoArrOne[3].value)) {
            $(".infoListOne").find('.infoItemValue').eq(i).css("color", "#29da89")
          }
        }
      },
      //获取股票更多行情数据
      getMoreInfo() {
        this.$http({
          methods: "GET",
          url: this.$api.host + "stock/getMore",
          params: {
            code: this.companyCode
          }
        }).then((res) => {
          console.log(res)
          if (res.data.returnCode == 1 && res.data.returnObject !== null) {
            this.infoArrOne[0].value = res.data.returnObject.zuiGaoJia ? res.data.returnObject.zuiGaoJia : null;
            this.infoArrOne[1].value = res.data.returnObject.kaiPanJia ? res.data.returnObject.kaiPanJia : null;
            this.infoArrOne[2].value = res.data.returnObject.zuiDiJia ? res.data.returnObject.zuiDiJia : null;
            this.infoArrOne[3].value = res.data.returnObject.zuoShou ? res.data.returnObject.zuoShou : null;
            this.infoArrOne[4].value = res.data.returnObject.zhangTing ? res.data.returnObject.zhangTing : null;
            this.infoArrOne[5].value = res.data.returnObject.chengJiaoLiang ? res.data.returnObject.chengJiaoLiang : null;
            this.infoArrOne[6].value = res.data.returnObject.dieTing ? res.data.returnObject.dieTing : null;
            this.infoArrOne[7].value = res.data.returnObject.chengJiaoE ? res.data.returnObject.chengJiaoE : null;
            for (var i in this.infoArrOne) {
              if (this.infoArrOne[i].value !== null) {
                this.infoArrOne[i].value = this.toDecimal2(this.infoArrOne[i].value);
              }
            }
            //更多行情数据 颜色判断 alex 比对昨收值 > red < green
            this.isColor(0);
            this.isColor(1);
            this.isColor(2);
            this.isColor(4);
            this.isColor(6);

            if (this.infoArrOne[5].value !== null) {
              this.infoArrOne[5].value = this.unitWan(this.infoArrOne[5].value)
            }
            if (this.infoArrOne[7].value !== null) {
              this.infoArrOne[7].value = this.unitWan(this.infoArrOne[7].value)
            }
            this.infoArrTwo[0].value = res.data.returnObject.huanShou ? res.data.returnObject.huanShou : null;
            this.infoArrTwo[1].value = res.data.returnObject.liangBi ? res.data.returnObject.liangBi : null;
            this.infoArrTwo[2].value = res.data.returnObject.zhenFu ? res.data.returnObject.zhenFu : null;
            this.infoArrTwo[3].value = res.data.returnObject.weiBi ? res.data.returnObject.weiBi : null;
            this.infoArrTwo[4].value = res.data.returnObject.shiYingLv ? res.data.returnObject.shiYingLv : null;
            this.infoArrTwo[5].value = res.data.returnObject.shiJingLv ? res.data.returnObject.shiJingLv : null;
            this.infoArrTwo[6].value = res.data.returnObject.jingTaiShiYingLv ? res.data.returnObject.jingTaiShiYingLv : null;
            this.infoArrTwo[7].value = res.data.returnObject.meiGuJingZiChan ? res.data.returnObject.meiGuJingZiChan : null;
            for (var i in this.infoArrTwo) {
              if (this.infoArrTwo[i].value !== null) {
                this.infoArrTwo[i].value = this.toDecimal2(this.infoArrTwo[i].value);
              }
            }
            this.infoArrTwo[0].value !== null ? this.infoArrTwo[0].value = this.infoArrTwo[0].value + "%" : this.infoArrTwo[0].value = "--";
            this.infoArrTwo[2].value !== null ? this.infoArrTwo[2].value = this.infoArrTwo[2].value + "%" : this.infoArrTwo[2].value = "--";
            this.infoArrTwo[3].value !== null ? this.infoArrTwo[3].value = this.infoArrTwo[3].value + "%" : this.infoArrTwo[3].value = "--";
            this.infoArrThree[0].value = res.data.returnObject.zongShiZhi ? res.data.returnObject.zongShiZhi : null;
            this.infoArrThree[1].value = res.data.returnObject.zongGuBen ? res.data.returnObject.zongGuBen : null;
            this.infoArrThree[2].value = res.data.returnObject.liuTongShiZhi ? res.data.returnObject.liuTongShiZhi : null;
            this.infoArrThree[3].value = res.data.returnObject.wuXianShouGuHeJi ? res.data.returnObject.wuXianShouGuHeJi : null;
            this.infoArrThree[4].value = res.data.returnObject.zhouZuiGao ? res.data.returnObject.zhouZuiGao : null;
            this.infoArrThree[5].value = res.data.returnObject.mgfh ? res.data.returnObject.mgfh : null;
            this.infoArrThree[6].value = res.data.returnObject.zhouZuiDi ? res.data.returnObject.zhouZuiDi : null;
            this.infoArrThree[7].value = res.data.returnObject.gxsyl ? res.data.returnObject.gxsyl : null;
            console.log(typeof (this.infoArrThree[0].value), this.infoArrThree[0].value, this.infoArrThree[1].value, this.infoArrThree[2].value, this.infoArrThree[3].value)
            for (var i in this.infoArrThree) {
              if (this.infoArrThree[i].value !== null) {
                this.infoArrThree[i].value = this.toDecimal2(this.infoArrThree[i].value);
              }
            }
            if (this.infoArrThree[0].value !== null) {
              this.infoArrThree[0].value = this.unitYi(this.infoArrThree[0].value)
            }
            if (this.infoArrThree[1].value !== null) {
              this.infoArrThree[1].value = this.unitYi(this.infoArrThree[1].value)
            }
            if (this.infoArrThree[2].value !== null) {
              this.infoArrThree[2].value = this.unitYi(this.infoArrThree[2].value)
            }
            if (this.infoArrThree[3].value !== null) {
              this.infoArrThree[3].value = this.unitYi(this.infoArrThree[3].value)
            }
            console.log(this.infoArrThree[0].value, this.infoArrThree[1].value, this.infoArrThree[2].value, this.infoArrThree[3].value)

            this.infoArrThree[7].value !== null ? this.infoArrThree[7].value = this.infoArrThree[7].value + "%" : this.infoArrThree[7].value = "--";
          } else {
            console.log('没有年报数据');
          }
        }).catch((err) => {
          console.log(err)
          this.moreInfoShowOne = false;//更多详情数据页面 （第一页） 不显示
        })
      },
      //显示第index个行情信息内容
      itemNameShow(index) {
        $(".itemInfo").eq(index).show().siblings().hide();
        $(".itemName").eq(index).css({"color": "#ffb148", "background": "#fff"}).siblings().css({
          "color": "#8d8d8d",
          "background": "#ffefda"
        })
        $(".content-Box").css('overflow', 'hidden');
        if (index == "1") {
          clearInterval(window.timeHuanShou);
          this.tonghangxinxi();//获取同行业偏离值
          window.timePianli = setInterval(() => {
            this.getPianlivalue();
            this.tonghangxinxi();
          }, 10000)
          $(".itemNameSplitLine").hide();
        } else if (index == "0") {
          clearInterval(window.timePianli)
          clearInterval(window.timeHuanShou);
          $(".itemNameSplitLine").eq('1').show();
          $(".itemNameSplitLine").eq('0').hide();
          this.getMoreInfo();//获取代码更多详情数据
        } else if (index == "2") {
          clearInterval(window.timePianli)
          this.tonghangHuanshou();//获取同行换手率值
          this.getHuanshoulv();
          window.timeHuanShou = setInterval(() => {
            this.tonghangHuanshou();
            this.getHuanshoulv();
          }, 10000)
          $(".itemNameSplitLine").eq('1').hide();
          $(".itemNameSplitLine").eq('0').show();
        }
      },
      //查看更多行情数据
      watchMoreInfo() {
        this.moreInfoShow = true;
        this.itemNameShow("0")//默认显示行情数据 “0”
        $(".infoShadow").css('z-index', "1023").show();
      },
      //关闭更多行情数据页面
      closeMoreInfo() {
        this.moreInfoShow = false;
        $(".infoShadow").css('z-index', "-22").hide();
        clearInterval(window.timePianli);
        clearInterval(window.timeHuanShou);
        $(".content-Box").css('overflow', 'scroll');
      },
      warningreLoad() {
        location.reload();
      },
      lawshowsh() {
        this.lawshows1 = false;
        this.lawshows2 = true;
        this.GuidePageAffs1 = false;
        this.GuidePageAffs2 = true;
      },
      lawshowsh2() {
        window.localStorage.setItem("GuidePagesAffiche", false);
        this.GuidePages = false;
      },
      //判断是否关注该公司
      isFocusM() {
        this.$http({
          methods: "GET",
          url: this.$api.host + "attention/getAttentions",
          params: {
            userId: this.user_id
          }
        }).then((res) => {
          var arr = res.data.returnObject.data;
          for (var i in arr) {
            if (this.companyCode == arr[i].obj) {
              this.isFocus = true;
              return;
            } else {
              //console.log('没有关注这个公司')
            }
          }
          console.log(arr)
        }).catch((err) => {
          console.log(err)
        })
      },
      //添加关注
      addFocus() {
        console.log(this.isFocus)
        if (this.isFocus == false) {
          this.$http({
            methods: "GET",
            url: this.$api.host + "attention/addAttention",
            params: {
              userId: this.user_id,
              companyId: this.comCode,
              companyFullCode: this.companyCode
            }
          }).then((res) => {
            console.log(res)
            if (res.data.returnCode == 1) {
              this.isFocus = true;
              this.$toast({message: '已添加我的关注', position: 'center', duration: 1500});
            }
          }).catch((err) => {
            console.log(err)
          })
        } else if (this.isFocus == true) {
          this.$http({
            methods: "GET",
            url: this.$api.host + "/attention/deleteAttention",
            params: {
              userId: this.user_id,
              companyFullCode: this.companyCode
            }
          }).then((res) => {
            console.log(res)
            if (res.data.returnCode == 1) {
              this.isFocus = false;
              this.$toast({message: '已取消关注', position: 'center', duration: 1500});
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      //偏离值获取失败，刷新页面
      waringBin() {
        window.location.reload();
      },
      //换手率点击
      showChange() {
        var pialival = parseInt(this.change)
        this.alertHshow();
      },
      //打开换手率页面
      alertHshow() {
        this.moreInfoShow = true;
        this.itemNameShow("2")//显示换手率数据 “2”
        $(".infoShadow").css('z-index', "1023").show();
      },
      //获取换手率数据
      getHuanshoulv() {
        this.$http({
          methods: "GET",
          url: this.$api.host + "stock/getThrunoverInfo", /*http://192.168.52.96:8080/v1/*/
          params: {
            code: this.companyCode
          }
        }).then((res) => {
          //是否闭市
          this.bishi = res.data.returnObject.biShi;
          //关注公司当日日均换手率 当日换手率占比
          this.dangri = res.data.returnObject.todayThurnover;
          //this.tonghangHuanshou();
          if (res.data.returnObject.todayRatio == null || res.data.returnObject.todayRatio == undefined) {
            this.dangrizhanbi = "--"
            console.log('dangrizhanbi', this.dangrizhanbi)
          } else {
            this.dangrizhanbi = res.data.returnObject.todayRatio;
            console.log('dangrizhanbi1', this.dangrizhanbi)
          }
          //关注公司前两日日均换手率 前两日换手率占比
          this.qianliangri = res.data.returnObject.twoDaysThurnover;
          if (res.data.returnObject.twoDaysRatio == null || res.data.returnObject.twoDaysRatio == undefined) {
            this.qianliangrizhanbi = '--'
          } else {
            this.qianliangrizhanbi = res.data.returnObject.twoDaysRatio;
          }
          //关注公司前三日日均换手率 前三日换手率占比
          this.qiansanri = res.data.returnObject.threeDaysThurnover;
          if (res.data.returnObject.threeDayRatio == null || res.data.returnObject.threeDayRatio == undefined) {
            this.qiansanrizhanbi = '--'
          } else {
            this.qiansanrizhanbi = res.data.returnObject.threeDayRatio;
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      //获取同行换手率信息
      tonghangHuanshou() {
        if (this.bishi == '' || this.bishi == null) {
          this.bishi = true
        }
        this.$http({
          methods: "GET",
          url: this.$api.host + "stock/getSameIndustryThrunoverInfo", /*http://192.168.52.96:8080/v1/*/
          params: {
            industry: this.Industry,
            code: this.comCode,
            biShi: this.bishi,
            pageNum: 1,
            pageSize: this.pageHsize,
          }
        }).then((res) => {
          this.hangyeListH = res.data.returnObject;
          for (var i in this.hangyeListH) {
            if (this.hangyeListH[i].shiFouTingPai == true) {
              this.hangyeListH[i].todayThurnover = null;
              this.hangyeListH[i].todayRatio = null;
              this.hangyeListH[i].twoDaysRatio = null;
              this.hangyeListH[i].twoDaysThurnover = null;
              this.hangyeListH[i].threeDayRatio = null;
              this.hangyeListH[i].threeDaysThurnover = null;
            } else {
              this.hangyeListH[i].todayThurnover = this.toDecimal2(this.hangyeListH[i].todayThurnover);
              this.hangyeListH[i].todayRatio = this.toDecimal2(this.hangyeListH[i].todayRatio);
              this.hangyeListH[i].twoDaysRatio = this.toDecimal2(this.hangyeListH[i].twoDaysRatio);
              this.hangyeListH[i].twoDaysThurnover = this.toDecimal2(this.hangyeListH[i].twoDaysThurnover);
              this.hangyeListH[i].threeDayRatio = this.toDecimal2(this.hangyeListH[i].threeDayRatio);
              this.hangyeListH[i].threeDaysThurnover = this.toDecimal2(this.hangyeListH[i].threeDaysThurnover);
            }
            this.hangyeListH[i].shiYingLv = this.toDecimal2(this.hangyeListH[i].shiYingLv);
          }
          if (res.data.rows >= res.data.total) {
            this.watchmoreH = false;
            $(".seeMoreH").find('span').text('收起查看')
            $(".seeMoreH").find('img').css('transform', 'rotate(360deg)')
          }
          //console.log('>>>>>>>>>>',this.hangyeListH);
          if (this.hangyeListH) {
            if (this.hangyeListH.length <= 3) {
              $(".seeMoreH").hide();
              $(".industryH").css('height', '74%')
              $(".scrollerBoxH").css('height', 'auto')
            }
          } else {
            $(".seeMoreH").css('opacity', '0');
            $("#hsl").text('暂无同行换手率信息')
          }

        }).catch((err) => {
          console.log(err)
          //this.showERRh = true;
          $(".seeMoreH").css('opacity', '0');
          $("#hsl").text('暂无同行换手率信息')
        })
      },
      //换手率查看更多
      warchMoreHS() {
        if (this.watchmoreH == true) {
          $(".industryH").css('height', 'auto')
          $(".scrollerBoxH").css({'overflow-y': 'scroll', 'overflow-x': 'hidden'})
          this.pageHsize = this.pageHsize + 10;
          this.tonghangHuanshou();
        } else if (this.watchmoreH == false) {
          $(".industryH").css({'height': '74%', 'overflow': 'hidden'})
          $(".scrollerBoxH").css({'overflow-y': 'hidden', 'overflow-x': 'hidden'})
          $(".seeMoreH").find('span').text('展开更多')
          $(".seeMoreH").find('img').css('transform', 'rotate(180deg)')
          this.pageHsize = 0;
          this.watchmoreH = true;
        }
      },
      // 小数点后保留两位小数 没有添加0
      toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      listInfoH(index) {
        this.$router.push({
          path: '/afficheList',
          query: {code: this.hangyeListH[index]['code'], name: this.hangyeListH[index]['name']}
        });
        $("title").text(this.hangyeListH[index]['name'])
      },
      listInfo(index) {
        this.$router.push({
          path: '/afficheList',
          query: {code: this.hangyeList[index]['code'], name: this.hangyeList[index]['name']}
        });
        $("title").text(this.hangyeList[index]['name'])
      },
      // 获取偏离值
      getPianlivalue() {
        var curTime = '';
        var curTimeArr = [];
        this.$http({
          methods: "GET",
          url: this.$api.host + "stock/getDeviationValue", /*http://192.168.52.98:8080/v1/*/
          params: {
            code: this.companyCode,
          }
        }).then((res) => {
          var currentTime = this.formatS(res.data.returnObject.dateTime);
          var str = "SZ00897";
          //console.log('====', str.indexOf("SH"))
          if (res.data.returnObject.data[0].jinRiShiFouTingPai == true) {
            res.data.returnObject.bTotal = null
          }

          curTime = currentTime;
          /*console.log('*-----------', curTime, '*-----------', res)*/
          if (res.data.returnObject.turnoverIsChange == false) {
            /*console.log("不异动")*/
          } else {
            /*console.log('异动')*/
            $(".huanshoulv").css({
              'background': 'linear-gradient(#fe533d,#fe533d)', "padding-right": "6px"
            }).find('span').css({'color': '#fff', "margin-top": "0"});
            $(".gantanhao").show();
          }
          var currentTimeArr = currentTime.split(',');
          curTimeArr = currentTimeArr;
          /*console.log(currentTimeArr, currentTimeArr[3])*/
          // 判断时间凌晨到9点30之前停止时间函数获取股票信息
          if (currentTimeArr[3] < 10 && currentTimeArr[3] >= 0) {
            if (currentTimeArr[3] == 9 && currentTimeArr[4] <= 30) {
              clearInterval(window.timeK);
              clearInterval(window.timePianli)
            } else if (currentTimeArr[3] >= 9 && currentTimeArr[4] > 30) {
              /*console.log('不用清除')*/
            } else {
              clearInterval(window.timeK);
              clearInterval(window.timePianli)
            }
          } else if (currentTimeArr[3] > 15) {
            clearInterval(window.timeK);
            clearInterval(window.timePianli)
          }
          /*console.log('currentTimeArr[3]', currentTimeArr[3], currentTimeArr[4])*/
          if (this.pianlivalFlag == true) {
            this.deviate = "--"
          } else {
            this.deviate = this.toDecimal2(res.data.returnObject.bTotal) + '%'; //偏离值
          }
          var comName = res.data.returnObject.data[0].name;
          var comCode = res.data.returnObject.data[0].code;

          var pianlizhi = parseFloat(res.data.returnObject.bTotal); //parseInt()

          var jueduizhi = Math.abs(pianlizhi)
          /*console.log(res.data.returnObject.bTotal,this.deviate,'===',jueduizhi,pianlizhi,'----------------',res.data.returnObject.bTotal)*/
          if (comName.indexOf('ST') !== 0 && comName.indexOf('*ST') !== 0) {
            console.log('没有ST和*ST', jueduizhi, 'ST', comName.indexOf('ST'), '*ST', comName.indexOf('*ST'))
            console.log(jueduizhi, 0 <= jueduizhi < 10)
            console.log('bosdjldsjlsdds', res.data.returnObject.bTotal, (jueduizhi == 10 && res.data.returnObject.bTotal < 20))
            if (0 < jueduizhi && jueduizhi < 10 || (res.data.returnObject.bTotal < 0 && jueduizhi <= 0) || (0 < res.data.returnObject.bTotal && res.data.returnObject.bTotal < 10)) {
              console.log("配色1")
              $(".san").css('border-top', '12.5px solid #ffb148')
              $('.fang').css('background', 'linear-gradient(#ffb148,#ffb148)')
            } else if (10 < jueduizhi && jueduizhi < 20 || (jueduizhi == 10 && res.data.returnObject.bTotal < 20)) {
              console.log("配色2");
              console.log(jueduizhi)
              $(".san").css('border-top', '12.5px solid #ff9348')
              $('.fang').css('background', 'linear-gradient(#ff8948,#ff9048)')
            } else if (jueduizhi >= 20) {
              console.log("配色3")
              $(".san").css('border-top', '12.5px solid #ff6f43')
              $('.fang').css('background', 'linear-gradient(#fe533d,#fe6b42)')
            }
            if (res.data.returnObject.bTotal == null || this.pianlivalFlag == true || res.data.returnObject.bTotal == 0) {
              console.log("灰色", res.data.returnObject.bTotal, this.pianlivalFlag,)
              $(".san").css('border-top', '12.5px solid #a9a9a9')
              $('.fang').css('background', 'linear-gradient(#a9a9a9,#a9a9a9)')
              this.deviate = '--'
              if (res.data.returnObject.bTotal == 0) {
                this.deviate = '0.00%';
              }
            }
          } else {
            if (this.companyCode.indexOf('SH') == 0) {  // 沪市
              console.log(Math.abs(-7.5))
              console.log('只有ST', jueduizhi, 'ST', comName.indexOf('ST'), '*ST', comName.indexOf('*ST'))
              console.log(jueduizhi, "", 0 < jueduizhi && jueduizhi < 7.5, (res.data.returnObject.bTotal < 0 && jueduizhi <= 0));
              if (0 < jueduizhi && jueduizhi < 7.5 || (res.data.returnObject.bTotal < 0 && jueduizhi <= 0) || (0 < res.data.returnObject.bTotal && res.data.returnObject.bTotal < 7.5)) {
                console.log('jueduizhi', jueduizhi)
                console.log("配色1")
                $(".san").css('border-top', '12.5px solid #ffb148')
                $('.fang').css('background', 'linear-gradient(#ffb148,#ffb148)')
              } else if (7.5 < jueduizhi && jueduizhi < 15 || (jueduizhi == 7.5 && res.data.returnObject.bTotal < 15)) {
                console.log("配色2 沪市 ", this.comCode);
                console.log('jueduizhi', jueduizhi)
                $(".san").css('border-top', '12.5px solid #ff9348')
                $('.fang').css('background', 'linear-gradient(#ff8948,#ff9048)')
              } else if (jueduizhi >= 15) {
                console.log("配色3")
                $(".san").css('border-top', '12.5px solid #ff6f43')
                $('.fang').css('background', 'linear-gradient(#fe533d,#fe6b42)')
              }
              if (res.data.returnObject.bTotal == null || this.pianlivalFlag == true || res.data.returnObject.bTotal == 0) {
                console.log("灰色", res.data.returnObject.bTotal, this.pianlivalFlag,)
                $(".san").css('border-top', '12.5px solid #a9a9a9')
                $('.fang').css('background', 'linear-gradient(#a9a9a9,#a9a9a9)')
                this.deviate = '--'
                if (res.data.returnObject.bTotal == 0) {
                  this.deviate = '0.00%';
                }
              }
            } else { //   if(comCode.indexOf('SH') == -1 && comCode.indexOf('SZ') == 0)
              console.log('-------------------------')
              if (0 < jueduizhi && jueduizhi < 6 || (res.data.returnObject.bTotal < 0 && jueduizhi <= 0) || (0 < res.data.returnObject.bTotal && res.data.returnObject.bTotal < 6)) {
                console.log("配色1")
                $(".san").css('border-top', '12.5px solid #ffb148')
                $('.fang').css('background', 'linear-gradient(#ffb148,#ffb148)')
              } else if (6 <= jueduizhi && jueduizhi < 12) {
                console.log("配色2 深市", this.comCode);
                console.log('jueduizhi', jueduizhi)
                $(".san").css('border-top', '12.5px solid #ff9348')
                $('.fang').css('background', 'linear-gradient(#ff8948,#ff9048)')
              } else if (jueduizhi >= 12) {
                console.log("配色3")
                $(".san").css('border-top', '12.5px solid #ff6f43')
                $('.fang').css('background', 'linear-gradient(#fe533d,#fe6b42)')
              }
              if (res.data.returnObject.bTotal == null || this.pianlivalFlag == true || res.data.returnObject.bTotal == 0) {
                console.log('配灰色', res.data.returnObject.bTotal)
                $(".san").css('border-top', '12.5px solid #a9a9a9')
                $('.fang').css('background', 'linear-gradient(#a9a9a9,#a9a9a9)')
                this.deviate = '--';
                if (res.data.returnObject.bTotal == 0) {
                  this.deviate = '0.00%';
                }
              }
            }
          }
          this.today = this.format1(res.data.returnObject.data[1].jinRi);
          this.yesterday = this.format1(res.data.returnObject.data[1].zuoRi);
          this.qiantian = this.format1(res.data.returnObject.data[1].qianRi);

          if (res.data.returnObject.data[0].jinRiShiFouTingPai == true) {
            this.jinri = null;
          } else {
            this.jinri = this.toDecimal2(res.data.returnObject.data[0].jinRiZhangDie);
          }

          if (res.data.returnObject.data[0].zuoRiShiFouTingPai == true) {
            this.zuori = null;
          } else {
            this.zuori = this.toDecimal2(res.data.returnObject.data[0].zuoRiZhangDie);
          }

          if (res.data.returnObject.data[0].qianRiShiFouTingPai == true) {
            this.qianri = null;
          } else {
            this.qianri = this.toDecimal2(res.data.returnObject.data[0].qianRiZhangDie);
          }
          this.Industry = res.data.returnObject.industry;//行业信息
          this.Industry == null ? this.Industry = '' : this.Industry;

          this.shiyinglv = this.toDecimal2(res.data.returnObject.data[0].shiYingLv);

          this.dapanjr = this.toDecimal2(res.data.returnObject.data[1].jinRiZhangDie);

          this.dapanzr = this.toDecimal2(res.data.returnObject.data[1].zuoRiZhangDie);

          this.dapanqr = this.toDecimal2(res.data.returnObject.data[1].qianRiZhangDie);

          this.dapansy = res.data.returnObject.data[1].shiYingLv;

          this.dapanname = res.data.returnObject.data[1].name;
          this.apidate = res.data.returnObject.apiDate;
          this.simCode = this.companyCode.substring(2, 8)
          var code = res.data.returnObject.data[1].code;
          this.dapancode = code.substring(2, 8);

          //获取更新日期
          function getNowFormatDate() {
            var date = new Date();
            var splittip = "-";
            var splittip2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var getMinutes;
            if (date.getMinutes() < 10) {
              getMinutes = '0' + date.getMinutes();
            } else {
              getMinutes = date.getMinutes();
            }
            var currentdate = date.getFullYear() + splittip + month + splittip + strDate + ' ' + date.getHours() + splittip2 + getMinutes;
            return currentdate;
          }

          //获取昨日日期
          function getNowFormatDate_Zuo() {
            var date = new Date();
            var splittip = "-";
            var splittip2 = ":";
            var month = date.getMonth() + 1;
            date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + splittip + month + splittip + strDate + ' ';
            return currentdate;
          }

          //获取今天日期
          function getNowFormatDate_Jin() {
            var date = new Date();
            var splittip = "-";
            var splittip2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + splittip + month + splittip + strDate + ' ';
            return currentdate;
          }

          if (curTimeArr[3] >= 15 || curTimeArr[3] <= 9) {
            if (curTimeArr[3] == 9 && currentTimeArr[4] <= 30 || curTimeArr[3] < 9) {
              this.updateTime = "昨日下午三点半";
              this.updateTime = getNowFormatDate_Zuo() + "15:00"
            } else if (curTimeArr[3] >= 15) {
              this.updateTime = "今天下午三点半";
              this.updateTime = getNowFormatDate_Jin() + "15:00"
              clearInterval(window.timeK);
              clearInterval(window.timePianli)
            }
          }
          if (curTimeArr[3] >= 9 && curTimeArr[3] < 15) {
            if ((curTimeArr[3] >= 9 && currentTimeArr[4] > 30) || curTimeArr[3] >= 10) {
              this.updateTime = getNowFormatDate();
            }
          }
        }).catch((err) => {
          console.log(err)
          // this.showERR = true;
          $(".san").css('border-top', '12.5px solid #a9a9a9')  //灰色
          $('.fang').css('background', 'linear-gradient(#a9a9a9,#a9a9a9)')
          this.deviate = '--';
          clearInterval(window.timeK);
          clearInterval(window.timePianli)
        })
      },

      //偏离值查看更多
      watchMore() {
        if (this.watchmore == true) {
          $(".industry").css('height', 'auto')
          $(".scrollerBox").css({'overflow-y': 'scroll', 'overflow-x': 'hidden'})
          this.pagesize = this.pagesize + 10;
          this.tonghangxinxi();
        } else if (this.watchmore == false) {
          /*console.log('-------------------------------/////////////////////////////////////')*/
          $(".industry").css({'height': '135px', 'overflow': 'hidden'})
          $(".scrollerBox").css({'overflow-y': 'hidden', 'overflow-x': 'hidden'})
          $(".seeMore").find('span').text('展开更多')
          $(".seeMore").find('img').css('transform', 'rotate(180deg)')
          this.pagesize = 0;
          this.watchmore = true;
        }
      },
      /**************处理时间戳****************/
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      formatS(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + ',' + this.add0(m) + ',' + this.add0(d) + ',' + this.add0(h) + ',' + this.add0(mm) + ',' + this.add0(s);
      },
      format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(parseInt(shijianchuo));
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d);
      },
      format1(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(parseInt(shijianchuo));
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return this.add0(m) + '月' + this.add0(d) + '日';
      },
      getContent() {
        var companyCodes = this.companyCode.substring(2, 8)
        this.comCode = companyCodes;
        this.$http({
          method: "GET",
          url: this.$api.host + "disclosure/search",
          params: {
            companyCode: companyCodes,
            pageSize: this.pageSize,
            pageNum: this.pageNum,
          }
        }).then((res) => {
          console.log('**************', res)
          if (res.data.returnObject.list == null) {
            this.linkIsErr = true;
            this.gonggaoText = "暂无公告！";
            $(".gonggaoWaringImg").css({"background-image": "/static/img/warning/warningCode.png"})
            $(".gonggaoBtn").hide();
          } else {
            if (this.contentList.length > 0) {
              for (var i in res.data.returnObject.list) {
                this.contentList.push(res.data.returnObject.list[i]);
              }
            } else if (this.contentList.length == 0) {
              this.contentList = res.data.returnObject.list;
            }
            this.listCount = res.data.returnObject.count;
            if (this.listCount >= 30) {
              $('.showPrompt').css('display', "block")
              setTimeout(() => {
                $('.showPrompt').animate({bottom: "0px", display: "none"});
              }, 2500);
            }
            this.listNum = this.contentList.length;

            //公告获取完成后分享功能配置

            let shareTitle1 = this.companyName + "" + this.comCode;
            let desc = "上市公司、专业机构移动董办工具首选！";
            let url = decodeURI(window.location.href).split('#')[0];  //当前网页的URL，不包含#及其后面部分
            /*let selink = url + "#/afficheList?code=" + this.companyCode + "&name=" + this.companyName; // 分享链接*/
            let selink = window.location.href;
            let imgUrl = global.shareImg1;
            wx.ready(function () {
              wx.onMenuShareAppMessage({
                title: shareTitle1, // 分享标题
                desc: desc, // 分享描述
                link: selink, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {
                  // 用户确认分享后执行的回调函数
                  console.log(res)
                  console.log("成功分享好友")
                  console.log('132456', window.location.href)
                },
                cancel: function (err) {
                  // 用户取消分享后执行的回调函数
                  console.log(err)
                },
                complete: function () {
                  console.log('已调用该方法！')
                }
              });
              wx.onMenuShareTimeline({
                title: shareTitle1, // 分享标题
                link: selink,
                imgUrl: imgUrl, // 分享图标
                success: function (res) {
                  // 用户确认分享后执行的回调函数
                  console.log(res)
                  console.log("成功分享朋友圈")
                  console.log('132456', window.location.href)
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                },
                complete: function () {
                  console.log('已调用该方法！')
                }
              });
              wx.onMenuShareQQ({
                title: shareTitle1, // 分享标题
                desc: desc, // 分享描述
                link: selink, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                  console.log("成功分享QQ好友")
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                  console.log('已调用方法！')
                }
              });
              wx.onMenuShareQZone({
                title: shareTitle1, // 分享标题
                desc: desc, // 分享描述
                link: selink, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                  console.log("成功分享QQ空间")
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                  console.log('已调用方法！')
                }
              });
            })
          }
        }).catch((err) => {
          this.linkIsErr = true;
          this.gonggaoText = "获取公告数据失败，请刷新重试！";
          $(".gonggaoWaringImg").css({"background-image": "/static/img/warning/warnin.png"}) //background-image: url("/static/img/warning/warnin.png");
          console.log(err)
        });
      },
      //
      timeData() {
        window.timeK = setInterval(() => {
          this.getData("true");
        }, 10000);
      },
      //
      searchCode() {
        let code = 1;
        this.$router.push({path: '/afficheSearch', query: {inputCode: code}});
        clearInterval(window.timeK);
        clearInterval(window.timePianli)
      },
      //
      company() {
        var code = 2;
        this.$router.push({path: '/afficheSearch', query: {inputCode: code}});
        clearInterval(window.timeK);
        clearInterval(window.timePianli)
      },
      //获取同行偏离值信息
      tonghangxinxi() {
        console.log('>>>>>>', this.Industry);

        this.$http({
          methods: "GET",
          url: this.$api.host + "stock/getSameIndustryStockInfo", /*http://192.168.52.96:8080/v1/*/
          params: {
            industry: this.Industry,
            pageNum: 1,
            apiDate: this.apidate,
            code: this.simCode,
            pageSize: this.pagesize,
          }
        }).then((ress) => {
          //console.log('>>>>>',ress.data.returnObject);
          if (ress.data.returnObject.length == 0 || ress.data.returnObject == null) {
            $('#plz').text('暂无同行偏离值信息')
            $("#plzUpdateTime").addClass('updateStyle')
          }
          if (ress.data.rows >= ress.data.total) {
            this.watchmore = false;
            $(".seeMore").find('span').text('收起查看')
            $(".seeMore").find('img').css('transform', 'rotate(360deg)')
          }
          this.hangyeList = ress.data.returnObject;
          for (var i in this.hangyeList) {
            if (this.hangyeList[i].jinRiShiFouTingPai == true) {
              this.hangyeList[i].jinRiZhangDie = null;
            } else {
              this.hangyeList[i].jinRiZhangDie = this.toDecimal2(this.hangyeList[i].jinRiZhangDie);
            }
            if (this.hangyeList[i].zuoRiShiFouTingPai == true) {
              this.hangyeList[i].zuoRiZhangDie = null;
            } else {
              this.hangyeList[i].zuoRiZhangDie = this.toDecimal2(this.hangyeList[i].zuoRiZhangDie);
            }
            if (this.hangyeList[i].qianRiShiFouTingPai == true) {
              this.hangyeList[i].qianRiZhangDie = null;
            } else {
              this.hangyeList[i].qianRiZhangDie = this.toDecimal2(this.hangyeList[i].qianRiZhangDie);
            }
            this.hangyeList[i].shiYingLv = this.toDecimal2(this.hangyeList[i].shiYingLv);
          }
          if (this.hangyeList.length <= 3) {
            $(".seeMore").hide();
            $(".industry").css('height', 'auto')
            $(".scrollerBox").css('height', 'auto')
          }
        }).catch((err) => {
          console.log(err)
          $('#plz').text('暂无同行偏离值信息')
          $("#plzUpdateTime").addClass('updateStyle')
          $(".seeMore").hide();
          $(".industry").css('height', 'auto')
          $(".scrollerBox").css('height', '85%')
//          this.showERR = true; //同行偏离值获取失败
//          $(".san").css('border-top', '12.5px solid #a9a9a9')   //灰色
//          $('.fang').css('background', 'linear-gradient(#a9a9a9,#a9a9a9)')
        })
      },
      //
      alertBshow() {
        this.moreInfoShow = true;
        this.itemNameShow("1")//显示偏离值数据 “1”
        $(".infoShadow").css('z-index', "1023").show();
      },
      //
      dianji(index) {
        clearInterval(window.timeK);
        clearInterval(window.timePianli)
        this.$router.push({path: '/afficheContent', query: {id: this.contentList[index].mainId}});
        //HTML5本地存储
        if (window.localStorage) {
          localStorage.setItem("name", this.companyName);
          localStorage.setItem("code", this.companyCode);
        } else {
          Cookie.write("name", this.companyName);
          Cookie.write("code", this.companyCode);
        }
      },
      //
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let lastValue = this.listNum;
          if (lastValue < this.listCount) {
            this.pageNum += 1;
            this.getContent();
            console.log("123", this.loading);
          } else {
            this.allLoaded = false;
          }
          this.loading = false;
          console.log(this.loading);
        }, 1300);
      },
      //
      getData(index) {
        if (index == 'true') {
          this.$http({
            method: "GET",
            url: this.$api.host + 'attention/getStockInfo', /*http://192.168.52.98:8080/v1/*/
            params: {
              obj: this.companyCode
            }
          }).then((res) => {
            this.nowTime = res.data.returnObject.timestamp;
            var currentTime = this.formatS(res.data.returnObject.timestamp);
            //console.log(currentTime)
            var curTime = currentTime;
            var currentTimeArr = currentTime.split(',');
            var curTimeArr = currentTimeArr;
            //console.log(currentTimeArr, currentTimeArr[3])
            // 判断时间凌晨到9点30之前停止时间函数获取股票信息
            if (currentTimeArr[3] < 10 && currentTimeArr[3] >= 0) {
              if (currentTimeArr[3] == 9 && currentTimeArr[4] <= 30) {
                clearInterval(window.timeK);
              } else if (currentTimeArr[3] >= 9 && currentTimeArr[4] > 30) {
                //console.log('不用清除')
              } else {
                clearInterval(window.timeK);
              }
            } else if (currentTimeArr[3] >= 15) {
              clearInterval(window.timeK);
            }
            var repdata = res.data.returnObject.data;
            this.title = repdata.zhongWenJianCheng + "【" + repdata.obj + "】";
            var eduStr = repdata.chengJiaoE.toString();
            if (eduStr.length >= 5 && eduStr.length < 9) {
              var edu = (repdata.chengJiaoE / 10000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.edu = eduarr.join(".") + '万';
            } else if (eduStr.length >= 9) {
              var edu = (repdata.chengJiaoE / 100000000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.edu = eduarr.join(".") + '亿';
            } else {
              this.edu = f(repdata.chengJiaoE);
            }
            this.low = this.toDecimal2(repdata.zuiDiJia);

            function f(n) {
              var b = parseInt(n).toString();
              var len = b.length;
              if (len <= 3) {
                return b;
              }
              var r = len % 3;
              return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
            }

            var numStr = (repdata.chengJiaoLiang / 100).toString();
            if (numStr.length >= 5 && numStr.length < 9) {
              /*console.log('万',repdata.chengJiaoLiang/100)*/
              var edu = (repdata.chengJiaoLiang / 1000000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.num = eduarr.join(".") + '万手';
            } else if (numStr.length >= 9) {
              var edu = (repdata.chengJiaoLiang / 10000000000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.num = eduarr.join(".") + '亿手';
            } else {
              this.num = f(repdata.chengJiaoLiang / 100) + '手';
            }
            this.open = this.toDecimal2(repdata.kaiPanJia);
            if (repdata.zuiXinJia == null) {
              this.now = "--";
              this.pianlivalFlag = true;
            } else {
              this.now = this.toDecimal2(repdata.zuiXinJia);
            }
            if (repdata.shiFouTingPai == true) {
              this.now = '--'; //“停牌”
              this.up = "--";
              this.down = "--";
            }
            if (repdata.huanShou == null || repdata.huanShou == 0 || repdata.huanShou == undefined) {
              this.change = "--";
            } else {
              this.change = this.toDecimal2(repdata.huanShou) + "%";
            }
            if (repdata.zuiGaoJia == null || repdata.zuiGaoJia == 0 || repdata.zuiGaoJia == undefined) {
              this.high = "--";
            } else {
              this.high = this.toDecimal2(repdata.zuiGaoJia);
            }
            /*this.edu = f(repdata.chengJiaoE);*/
            var eduStr = repdata.chengJiaoE.toString();
            if (eduStr.length >= 5 && eduStr.length < 9) {
              var edu = (repdata.chengJiaoE / 10000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.edu = eduarr.join(".") + '万';
            } else if (eduStr.length >= 9) {
              /*console.log('亿',repdata.chengJiaoE)*/
              var edu = (repdata.chengJiaoE / 100000000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.edu = eduarr.join(".") + '亿';
            } else {
              this.edu = f(repdata.chengJiaoE);
            }

            if (repdata.chengJiaoE == null || repdata.chengJiaoE == 0 || repdata.chengJiaoE == undefined) {
              this.edu = "--";
            }
            this.low = this.toDecimal2(repdata.zuiDiJia);
            if (repdata.zuiDiJia == null || repdata.zuiDiJia == 0) {
              this.low = "--";
            }

            function f(n) {
              var b = parseInt(n).toString();
              var len = b.length;
              if (len <= 3) {
                return b;
              }
              var r = len % 3;
              return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
            }

            var numStr = (repdata.chengJiaoLiang / 100).toString();
            if (numStr.length >= 5 && numStr.length < 9) {
              var edu = (repdata.chengJiaoLiang / 1000000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.num = eduarr.join(".") + '万手';
            } else if (numStr.length >= 9) {
              var edu = (repdata.chengJiaoLiang / 10000000000).toFixed(2);
              var eduarr = edu.toString().split('.')
              if (eduarr[0].length > 3) {
                var tmp = eduarr[0].substring(0, eduarr[0].length - 3);
                var newstrs = tmp + ',' + eduarr[0].substring(eduarr[0].length - 3, eduarr[0].length);
                eduarr[0] = newstrs;
              }
              this.num = eduarr.join(".") + '亿手';
            } else {
              this.num = f(repdata.chengJiaoLiang / 100) + '手';
            }
            if (repdata.chengJiaoLiang == null || repdata.chengJiaoLiang == 0) {
              this.num = "--";
            }
            this.open = this.toDecimal2(repdata.kaiPanJia);
            if (repdata.kaiPanJia == null || repdata.kaiPanJia == 0) {
              this.open = "--";
            }
            if (repdata.zhangFu > 0) {
              this.up = "+" + this.toDecimal2(repdata.zhangFu) + "%";
              $(".down").css('color', '#fb4319')
              $(".now").css('color', '#fb4319')
              $(".up").css('color', '#fb4319')
            } else if (repdata.zhangFu < 0) {
              this.up = this.toDecimal2(repdata.zhangFu) + "%";
              $(".down").css('color', '#29da89')
              $(".now").css('color', '#29da89')
              $(".up").css('color', '#29da89')
            } else if (repdata.zhangFu == null) {
              this.up = "--";
              $(".down").css('color', 'black')
              $(".now").css('color', 'black')
              $(".up").css('color', 'black')
            }
            if (repdata.zhangDie > 0) {
              this.down = "+" + this.toDecimal2(repdata.zhangDie);
            } else if (repdata.zhangDie < 0) {
              this.down = this.toDecimal2(repdata.zhangDie);
            } else if (repdata.zhangDie == null) {
              this.down = '--';
            }
          }).catch((err) => {
            console.log(err)
            clearInterval(window.timeK);
            clearInterval(window.timePianli)
          })
        } else if (index == "false") {
          //console.log('/*--------------false--------------*/')
        }
      },
      //
      saveLocalStorage() {
        //HTML5本地存储
        let companyName = window.localStorage ? localStorage.getItem("name") : Cookie.read("name");
        let companyCode = window.localStorage ? localStorage.getItem("code") : Cookie.read("code");
      },
    },
    beforeDestroy: function () {
      clearInterval(window.timeK);
      clearInterval(window.timePianli)
    },
    destroyed: function () {
      clearInterval(window.timeK);
      clearInterval(window.timePianli)
    }
  }
</script>

<style>
  #afficheList .mint-spinner-snake {
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
  #afficheList .infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  #afficheList .infinite-drop {
    font-size: 15px;
    color: #323232;
  }
  #afficheList .snake {
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
</style>

<style scoped>
  .updateStyle {
    position: absolute;
    bottom: 7.5px;
    left: 0;
  }
  #xianjia {
    margin-bottom: 11%;
    margin-top: -7%;
  }
  /*@media screen and (max-width: 360px){  //引入rem布局
      #xianjia{
          margin-bottom: 18%;
          margin-top: -3%;
      }
      .List4{
          margin-top: 3px !important;
      }
  }*/
  .law-show {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 2000;
  }
  #afficheList .law-show-sh {
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
  #afficheList .GuidePage-aff {
  }
  #afficheList .GuidePage-aff img {
    width: 182px;
    position: absolute;
    right: 24%;
    top: 60px;
  }
  #afficheList .GuidePage-aff2 img {
    width: 190px;
    position: absolute;
    right: 1px;
    top: 45px;
  }
  /**/
  #afficheList {
    width: 100%;
    height: 100%;
    padding-bottom: 51px;
    box-sizing: border-box;
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .header img {
    position: absolute;
    top: 0;
    right: 12px;
    bottom: 0;
    margin: auto;
    width: 20px;
    height: 20px;
  }
  .content-Box {
    width: 100%;
    height: 78%;
    overflow: scroll;
    /*padding-bottom: 51px;*/
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
  .showData {
    width: 100%;
    height: 82.5px; /*height:75px; 80px */
    padding: 12px;
    font-size: 0;
    box-sizing: border-box;
    display: inline-block;
  }
  .showMoreData {
    position: absolute;
    left: 5px;
    right: 0;
    bottom: 10px;
    margin: 0 auto;
    text-align: center;
    width: 100%;
    height: 15%;
    line-height: 90%;
  }
  .List1 {
    min-width: 90px;
    height: 100%;
    text-align: center;
    float: left;
    margin-top: 0px !important;
  }
  @media screen and (max-width: 360px) {
    .List1 {
      margin-top: 2.5px !important;
    }
  }
  .List1 span {
    font-family: PingFangSC-Semibold, sans-serif;
    font-size: 25px;
    color: #323232;
    display: block;
  }
  .List1 .List1line2 {
    /*display: flex;
    justify-content: space-between;
    margin-top: 5px;
    */
    display: inline-block;
    width: 100%; /*padding-top: 5px;box-sizing: border-box;*/
  }
  .List1line2 span:first-child {
    float: left;
  }
  .List1line2 span:last-child {
    float: right;
  }
  .List1 .List1line2 span {
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 13px;
  }
  .List2, .List3 {
    /*margin-left: -10px;*/
    height: 100%; /*margin-top: -4px!important;*//*两行高度位置调整*/
    padding-left: 2%;
    box-sizing: border-box;
  }
  .List3 {
    padding-left: 3%;
    width: 26% !important;
  }
  .List2 {
    padding-left: 6%;
    box-sizing: border-box;
  }
  .List2 span, .List3 span {
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 12px;
    color: #323232;
    /*margin-top: 5px;*/
  }
  .List2 .line:nth-child(1) span, .List3 .line:nth-child(1) span {
    margin: 0;
  }
  .List4 {
    margin-right: -30px;
    overflow: hidden;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 13px;
    color: #fff;
    float: right;
    margin-top: 0;
  }
  .fang {
    width: 56px;
    height: 46px; /*background: #ffb148;*/
    /*display: flex;
    flex-direction: column;
    align-items: center;*/
  }
  .List4 span {
    float: left;
    width: 100%;
    height: 50%;
    margin-top: 6px;
    text-align: center;
  }
  .List4 span:nth-child(2) {
    margin-top: -2px;
  }
  .san {
    width: 0;
    height: 0;
    border-left: 28px solid transparent;
    border-right: 28px solid transparent;
    border-top: 12.5px solid #fff;
  }
  .tabox {
    width: 100%;
    height: 30px;
    margin: 12px 0;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .tabox div {
    width: 25%;
    height: 100%;
    text-align: center;
    line-height: 30px;
    background: #f0f1f5;
    font-size: 14px;
    color: #535353;
    font-family: PingFangSC-Medium, sans-serif;
  }
  .tabox .active {
    background: #e8e9ed;
    color: #f6900c;
  }
  .List1, .List2, .List3, .List4 {
    width: 25%;
    float: left;
    margin-top: -2px;
  }
  .List1 {
    width: 28%;
  }
  .showData .List4 {
    float: right;
  }
  .List2 .line, .List3 .line {
    width: 100%;
    height: 36%;
    display: inline-block;
  }
  .content-lists {
    width: 100%;
    height: auto;
    padding: 0 12px;
    box-sizing: border-box;
    /*position: relative;
    top:80px;*/
  }
  .lists-item {
    width: 100%;
    padding: 12px 0;
    border-bottom: 0.5px solid #e3e3e3;
    box-sizing: border-box;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 15px;
    color: #323232;
    letter-spacing: 0.2px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    line-height: 19px;
  }
  #afficheList .lists-item:active {
    background-color: #f0f1f5;
  }
  .lists-item p {
    margin: 0;
    padding: 0;
    float: right;
    margin-right: 0.5px;
    display: inline-block;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 12px;
    color: #ababab;
  }
  .industry, .industryH {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    height: 135px;
  }
  .industry li, .industryH li {
    width: 100%;
    height: 45px;
    border-bottom: 0.5px solid #e3e3e3;
  }
  .sameC .industry li, .sameC .industryH li {
    padding: 0 !important;
  }
  .marketSort, .marketSortH {
    width: 100%;
    height: 85px;
    background: #fff;
    padding: 0 !important;
  }
  .marketSortH {
    padding: 20px 0 !important;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .shadowxx, .Huanshoulv {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -22;
    display: none;
  }
  .alertBox, .HuanshoulvB {
    width: 90%;
    max-height: 82%; /*455 --> 910 74*/
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: -33;
    display: none;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  .HuanshoulvB {
    max-height: 75%;
  }
  .alertContent {
    width: 100%;
    height: 100%; /*405px*/
    background: #f0f1f5;
    overflow: hidden;
    border-radius: 2px;
    margin-bottom: 14px; /*14*/
  }
  .scrollerBox, .scrollerBoxH {
    overflow: scroll;
    height: 85%; /* 300px 268.5px  59% 280*/
    width: 100%;
    box-sizing: border-box; /*padding:0 10px;*/
    overflow-x: hidden;
    font-size: 0;
    -webkit-overflow-scrolling: touch;
  }
  .scrollerBoxH {
    height: 88%; /* 换手率弹窗242px */
    -webkit-overflow-scrolling: touch;
  }
  .closeBox, .closeHbox {
    width: 40px;
    height: 40px; /*34px*/
    border-radius: 50%;
    text-align: center;
    background-image: url("/static/img/personal/close2.png");
    background-size: cover;
  }
  /* 偏离值关注公司证券简称一栏 */
  .thisCompany {
    width: 100%;
    height: 20%;
    margin-bottom: 7.5px;
  }
  .alertContentH .thisCompany {
    height: 24%;
  }
  /*偏离值弹出框 同行公司 样式*/
  .alertTitle, .alertComInfo {
    width: 100%;
    height: 50%;
    background: #fff;
    border-bottom: 0.5px solid #e3e3e3;
    display: flex;
    display: -webkit-flex;
    font-size: 0;
  }
  .alertComInfo {
    background: #fff;
    border-bottom: 0;
  }
  .centerInfo {
    display: inline-block;
  }
  .alertTitle .gpName, .alertComInfo .gsName {
    width: 20%;
    height: 100%;
    padding-left: 5px;
    box-sizing: border-box;
    text-align: left;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #323232;
    float: left;
    padding-top: 4%;
    padding-bottom: 5%;
  }
  ul .alertTitle .gpName, ul .alertComInfo .gsName {
    padding-left: 0;
  }
  .gsName {
    overflow: hidden;
  }
  .alertContentH .alertTitle .gpName, .alertContentH .alertComInfo .gsName {
    padding-top: 5%;
  }
  .alertTitle .alertDate, .alertComInfo .centerInfo {
    width: 65%;
    height: 100%;
    float: left;
    margin-left: -2%;
    margin-right: 1%;
    font-size: 0;
  }
  .plCenterInfo {
    padding-top: 4.5%;
    box-sizing: border-box;
  }
  .plCenterInfotitle {
    padding-top: 4%;
    box-sizing: border-box;
  }
  .centertitle {
    display: inline-block;
    height: 50%;
    width: 100%;
    text-align: center;
    /*align-items: center;
    justify-content: center;*/
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 14px;
    /*line-height: 150%;*/
    padding-top: 1%;
    color: #323232;
  }
  /*.alertContentH .centertitle{
      line-height: 200%;
  }*/
  .centertitle span, .centerInfo span {
    font-size: 10px;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    color: #323232;
    display: inline-block;
    width: 33%;
    height: 100%;
    float: left;
    text-align: right;
  }
  .centerInfo span {
    font-size: 14px;
  }
  .alertTitle .shiyinglv, .alertComInfo .comShiyinglv {
    width: 20%;
    height: 100%;
    /*line-height: 47px;*/
    text-align: center;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #323232;
    float: left;
  }
  .comShiyinglv span {
    width: 100%;
    height: 100%;
    display: inline-block;
    /*line-height: 400%;*/
    padding-top: 24%;
    box-sizing: border-box;
  }
  /*.plTHshiyinglv span{
      line-height: 350%;
  }*/
  .industry, .industryH {
    padding: 0px 5px;
    font-size: 0;
    box-sizing: border-box;
  }
  .alertComInfo > .titlecomShiyinglv, .alertComInfo > .dacomSYL {
    text-align: right;
    padding-right: 5px;
    box-sizing: border-box;
  }
  .aCinfo, .marketData, .industry li, .industryH li { /*所有横排显示公司信息样式*/
    width: 100%;
    height: 45px;
    padding: 0 10px;
    box-sizing: border-box;
    /*display: inline-block;
    justify-content: space-between;
    align-items: center;*/
    background: #fff;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #323232;
  }
  .titlecomShiyinglv {
    padding-top: 4%;
  }
  .industryH {
    height: 74%; /*165px*/
  }
  .marketData {
    padding: 0;
  }
  .aCtitle span, .aCinfo span, .marketData span {
    width: 20%;
    display: inline-block;
    text-align: right;
  }
  .aCtitle span:first-child, .aCtitle span:last-child, .aCinfo span:first-child, .aCinfo span:last-child, .marketData span:first-child, .marketData span:last-child {
    width: 20%;
    text-align: center;
  }
  /*.aCtitle span:last-child,*/
  .aCinfo span:last-child, .marketData span:last-child {
    text-align: right;
    width: 20%
  }
  .gongsi {
    /*display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;*/
  }
  .gongsi p {
    margin: 0;
    padding: 0;
    height: 50%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }
  /*.gongsi p:last-child{
      text-align: center;
  }*/
  .sameC, .marketSort, .sameC .marketSortH { /*同行信息*/
    width: 100%;
    height: auto; /*padding:0 10px;*/
    box-sizing: border-box;
    background: white;
    font-size: 0;
  }
  .sameC {
    height: 80%; /* 偏离值同行信息内容框高度 */
  }
  .alertContentH .sameC {
    height: 75%; /* 换手率同行信息内容框高度 */
  }
  /* 偏离值 同行信息标题 栏 */
  .plSameTitle {
    padding: 0 5px;
    width: 100%;
    box-sizing: border-box;
    height: 12.5%;
  }
  .sameCtitle, .seeMore, .marketTitle {
    width: 100%;
    height: 40px;
    border-bottom: 0.5px solid #e3e3e3;
    box-sizing: border-box;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #323232;
  }
  /*偏离值同行业标题*/
  .sameCtitle, .marketTitle {
    width: 100%;
    height: 100%;
    /*display: -webkit-box;*/
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* 市场主板大盘样式 */
  .marketSort {
    height: 30%;
  }
  .marketTitle {
    width: 100%;
    height: 49%; /*40px*/
    /*text-align: center;
    line-height: 40px;*/
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 14px;
    padding: 0 5px;
    box-sizing: border-box;
    color: #323232;
    border: 0;
  }
  .industry {
    height: 45%;
  }
  .industry li { /*偏离值同行列表高度*/
    height: 33%;
    font-size: 0;
  }
  .industryH li {
    height: 25%;
    font-size: 0; /*换手率同行列表高度*/
  }
  .seeMoreH {
    width: 100%;
    height: 40px;
    border-bottom: 0.5px solid #e3e3e3;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #323232;
    text-align: center;
    line-height: 40px;
  }
  .seeMore, .seeMoreH {
    border: 0;
    color: #ffb148;
  }
  .seeMore, .seeMoreH {
    /*display: -webkit-box;
    display: -moz-box;*/
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13%;
  }
  .updateTime {
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
  }
  .alertContentH .updateTime {
    margin-bottom: 5px;
  }
  .updateTimediv {
    border-top: 0.5px solid #e3e3e3;
    width: 100%;
    font-size: 10px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #323232;
    line-height: 25px;
    text-align: right;
  }
  .alertContentH .updateTimediv {
    padding-top: 5px;
  }
  .searchs {
    width: 100%;
    height: 50px;
    background: #f0f1f5;
    padding: 7.5px 12px;
    box-sizing: border-box;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
  }
  .seabox {
    width: 91%;
    height: 100%;
    border-radius: 2px;
    position: relative;
    background: #fff;
    display: flex; /*justify-content: space-between;*/
    display: -webkit-flex;
    align-items: center;
    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    font-size: 15px;
    color: #858484;
    padding: 8px 5px;
    box-sizing: border-box;
  }
  .inputLine {
    width: 1px;
    height: 14px;
    background: #858484;
    margin: 0 12.5px 0 10px;
  }
  .icon {
    font-size: 25px;
    color: #8d8d8d;
    /*width: 23px;
    height: 23px;
    display: inline-block;
    background-image: url("/static/img/personal/search@3x.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;*/
  }
  /*偏离值获取失败*/
  #focus-warning, #focus-warningH, #focus-warningM {
    /*position: absolute;
    top: 0;
    left: 0;*/
    width: 100%;
    height: 80%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 3000;
    overflow: hidden;
    text-align: center;
  }
  #focus-warning > .focus-waringImg, #focus-warningH > .focus-waringImg, #focus-warningM > .focus-waringImg {
    height: 110px;
    width: 118.25px;
    margin: 35% auto 0 auto;
    background-image: url("/static/img/warning/warnin.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  #focus-warningH > .focus-waringImg, #focus-warningM > .focus-waringImg {
    margin: 29.2% auto 0 auto;
  }
  #focus-warning .focus-waringText, #focus-warningH .focus-waringText, #focus-warningM .focus-waringText {
    font-size: 15px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #ffb148;
    padding: 20px 0 0 0;
    text-align: center;
  }
  #focus-warning .focus-waringBtn, #focus-warningH .focus-waringBtn, #focus-warningM .focus-waringBtn {
    box-shadow: none;
    color: white;
    border: 0;
    width: 90px;
    margin-top: 20px;
    font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
    height: 30px;
    background: #ffb148;
  }
  /*是否关注*/
  .focAdd {
    margin: 0;
    padding: 0;
    height: 50px;
    width: 50px;
    display: inline-block;
    background-color: white;
    opacity: 0.9;
    box-shadow: 0px 0px 12px #e3e3e3;
    position: absolute;
    bottom: 70px;
    border-radius: 50%;
    right: 12px;
    font-style: normal;
    text-align: center;
    line-height: 50px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .focAddImg {
    width: 100%;
    background-position: center bottom;
    height: 52%;
    background-image: url("/static/img/personal/focus/+.png");
    background-size: 40%;
    display: inline-block;
    background-repeat: no-repeat;
  }
  .focAddText {
    width: 100%;
    height: 48%;
    display: inline-block;
    font-size: 10px;
    font-family: "PingFangSC-Regular, sans-serif", Microsoft Yahei, Helvetica;
    color: #ffb148;
    line-height: 20px;
    text-align: center;
  }
  .centerInfo .spanLine1 {
    width: 100%;
    height: 50%;
    float: right;
    /*line-height: 200%;*/
    padding-top: 6%;
    padding-bottom: 5%;
    box-sizing: border-box;
  }
  .centerInfo .spanLine2 {
    width: 100%;
    height: 50%;
    float: right;
    padding-top: 3%;
    box-sizing: border-box;
    /*line-height: 20px;*/
  }
  #afficheList .dataBox {
    width: 100%;
    height: 90px; /*height:82.5px; 87.5 */
    padding-bottom: 8px;
    box-sizing: border-box;
    background: #f0f1f5;
    position: relative;
    left: 0;
  }
  /*.linkErr{
      width: 100%;height:100%;background: #fff;position: absolute;left:0;top:0;z-index: 1000;
  }*/
  /*warning页面*/
  #warning {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 984;
    overflow: hidden;
    text-align: center;
    /*display: none;*/
    /* display: block;*/
  }
  #warning > .waringImg {
    height: 110px;
    width: 118.25px;
    margin: 38.2% auto 0 auto;
    background-image: url("/static/img/warning/warnin.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  /*#warning > .gonggaoWaringImg{
    background-image: url("/static/img/warning/warningCode.png");
  }*/
  #warning .waringText {
    font-size: 15px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    color: #ffb148;
    padding: 20px 0 0 0;
    text-align: center;
  }
  #warning .waringBtn {
    box-shadow: none;
    color: white;
    border: 0;
    width: 90px;
    margin-top: 20px;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    height: 30px;
    background: #ffb148;
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
    display: none;
  }
  /*更多行情数据页面*/
  .moreInfo {
    width: 93%;
    height: 88%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4%;
    top: 0;
    margin: auto;
    z-index: 1055;
  }
  .infoBox {
    width: 100%;
    height: 91%;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  .infoClose {
    width: 100%;
    height: 9%;
    position: relative;
  }
  .closeButton {
    width: 39px;
    height: 39px; /*34px*/
    border-radius: 50%;
    text-align: center;
    background-image: url("/static/img/personal/close2.png");
    background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
  }
  .infoShadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -22;
    display: none;
  }
  .selectItem {
    width: 100%;
    height: 9%;
    background: #ffefda;
  }
  .itemName {
    width: 33.33%;
    height: 100%;
    text-align: center;
    align-items: center;
    float: left;
    justify-content: center;
    font-size: 15px;
    font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    /*display: -webkit-box;*/
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }
  .itemNameSplitLine {
    width: 1px;
    height: 35%;
    background: #cbc2b6;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto 0;
    display: none;
  }
  .itemInfoBox {
    width: 100%;
    height: 91%;
    position: relative;
  }
  .itemInfo {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    display: none;
  }
  /*行情数据内容框*/
  .itemInfoOne {
    width: 100%;
    height: 100%;
  }
  .infoLists {
    width: 100%;
    height: 90%;
    padding: 0 5%;
    box-sizing: border-box;
  }
  .infoListOne, .infoListTwo, .infoListThree {
    width: 100%;
    height: 33.33%;
    border-bottom: 0.5px solid #e3e3e3;
    box-sizing: border-box;
    padding: 5% 0;
    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    font-size: 14px;
    color: #323232;
  }
  .infoItem {
    width: 50%;
    height: 25%;
    display: inline-block;
  }
  .infoItem:nth-child(2n) {
    padding-left: 6%;
    box-sizing: border-box;
  }
  .infoItem:nth-child(2n-1) {
    padding-right: 6%;
    box-sizing: border-box;
  }
  .infoItemName, .infoItemValue {
    width: auto;
    height: 100%;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .infoItemName {
    float: left;
  }
  .infoItemValue {
    float: right;
    max-width: 60%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .itemInfoOne .updateTime {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 5px 5px;
  }
  .itemInfoOne .updateTimediv {
    border: 0;
  }

</style>
