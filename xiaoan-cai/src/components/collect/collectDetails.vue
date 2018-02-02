<template>
    <div id="collectDetails">
        <!-- 收藏夹简介 -->
        <div class="collectGroomHead"> <!-- v-show="infoObject.introduction!==null && infoObject.introduction!==''"-->
            <div class="collectGroomHe">
                <div class="testingEnd-content-middle-item"> <!-- v-show="infoObject.introduction!==null"-->
                    <span class="testingEnd-content-middle1"><div></div></span>
                    <span class="testingEnd-content-middle-text">收藏简介</span>
                    <span class="testingEnd-content-middle2"><div></div></span>
                </div>
            </div>
            <div class="collectGroomHeadText">
                <!-- v-show="infoObject.introduction!==null && infoObject.introduction!==''"-->
                {{infoObject.introduction}}
            </div>
        </div>
        <div class="splitLine"></div>
        <!-- 收藏列表区域 -->
        <scroller :on-infinite="infinite" noDataText="" v-show="shareUser=='true'">
            <!--v-for循环-->
            <div v-for="(list,index) in collectval" class="coollglobal">
                <!--法规判断-->
                <div v-if="list.type == 'law'">
                    <div @click="collectL(index)">
                        <mt-cell-swipe :right="[
                            {content: '删除',style: {backgroundColor: '#ffb551',color: '#fff', fontSize: '16px'},
                                handler: () => del(index)
                            }]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#90b8f4'}">法规</span>
                                    <span v-show="list.faWenZiHao" class="co-collpub">{{list.faWenZiHao}}</span>
                                    <span v-show="list.faWenZiHao">|</span>
                                    <span>{{list.timeLiness}}</span>
                                    <span v-show="list.timeLiness">|</span>
                                    <span>{{ $const.format(list.publishTime) }}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
                <!--问答判断-->
                <div v-else-if="list.type == 'qa'">
                    <div @click="answersD(index)">
                        <mt-cell-swipe :right="[{content: '删除',style: {backgroundColor: '#ffb551',color: '#fff', fontSize: '16px'},
                                    handler: () => del(index)
                                }]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#ffa691'}">问答</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
                <!--公告判断-->
                <div v-else-if="list.type == 'case'">
                    <div @click="answersG(index)">
                        <mt-cell-swipe :right="[
                                {content: '删除',style: {backgroundColor: '#ffb551',color: '#fff', fontSize: '16px'},
                                    handler: () => del(index)
                                }]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#ffd091'}">公告</span>
                                    <span v-show="list.publishTime">|</span>
                                    <span v-show="list.publishTime" class="co-collpub">{{$const.format(list.publishTime)}}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
                <!--研报-->
                <div v-else="list.type == 'report'">
                    <div @click="answersR(index)">
                        <mt-cell-swipe :right="[
                                {content: '删除',style: {backgroundColor: '#ffb551',color: '#fff', fontSize: '16px'},
                                    handler: () => del(index)
                                }]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#98e6f0'}">研报</span>
                                    <span>|</span>
                                    <span v-show="list.publishTime" class="co-collpub">{{$const.format(list.publishTime)}}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
            </div>

            <div class="snake-circle" slot="infinite-spinner"></div>

        </scroller>
        <div class="noInfo" v-show="isInfo">
            <div class="noInfoImg404"></div>
            <div class="noInfoText">{{waringText}}</div>
        </div>
        <scroller :on-infinite="infinite" noDataText="" v-show="shareUser=='false'">
            <div v-for="(list,index) in collectval" class="coollglobal">
                <!--法规判断-->
                <div v-if="list.type == 'law'">
                    <div @click="collectL(index)">
                        <mt-cell-swipe :right="[]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#90b8f4'}">法规</span>
                                    <span v-show="list.faWenZiHao" class="co-collpub">{{list.faWenZiHao}}</span>
                                    <span v-show="list.faWenZiHao">|</span>
                                    <span>{{list.timeLiness}}</span>
                                    <span v-show="list.timeLiness">|</span>
                                    <span>{{ $const.format(list.publishTime) }}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
                <!--问答判断-->
                <div v-else-if="list.type == 'qa'">
                    <div @click="answersD(index)">
                        <mt-cell-swipe :right="[]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#ffa691'}">问答</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
                <!--公告判断-->
                <div v-else-if="list.type == 'case'">
                    <div @click="answersG(index)">
                        <mt-cell-swipe :right="[]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#ffd091'}">公告</span>
                                    <span v-show="list.publishTime">|</span>
                                    <span v-show="list.publishTime" class="co-collpub">{{$const.format(list.publishTime)}}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
                <div v-else="list.type == 'report'">
                    <div @click="answersR(index)">
                        <mt-cell-swipe :right="[]">
                            <div class="co-cellsm">
                                <div class="co-title">{{nuwNumber(list.title)}}</div>
                                <div class="co-globe">
                                    <span class="co-CollMold" :style="{backgroundColor:'#98e6f0'}">研报</span>
                                    <span v-show="list.publishTime">|</span>
                                    <span v-show="list.publishTime" class="co-collpub">{{$const.format(list.publishTime)}}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </div>
            </div>
        </scroller>

        <!--暂时还未有收藏-->
        <div class="CollValShow" id="warning">
            <div class="waringImg1"></div>
            <div class="waringText">您暂时还没有收藏！</div>
        </div>
        <!---->
        <div id="warning404" v-show="warningPage">
            <div class="waringImg404"></div>
            <div class="waringText404">{{waringText}}</div>
            <mt-button class="waringBtn404" id="botton404" @click="warning">{{waringBtn}}</mt-button>
        </div>
        <v-returnHome zIndex="1999"></v-returnHome>

        <div class="ans-footer">
            <mt-button @click.native="shareShows" class="ans-footer-list">
                <img v-lazy="shareIcon" alt="">
                <p>基本信息</p>
            </mt-button>
            <!-- 分享 or 订阅 -->
            <mt-button @click.native="collectShows" class="ans-footer-list">
                <img v-lazy="collectIcon" alt="" v-if="shareUser=='true'">
                <img v-lazy="dingyueIcon" alt="" v-else>
                <p v-show="isCollects == '0'">{{ shareText0 }}</p>
                <p v-show="isCollects !== '0'">{{ shareText1 }}</p>
            </mt-button>
            <!-- 编辑 or 转存 -->
            <mt-button @click.native="relativeShows" class="ans-footer-list zanimg">
                <img v-lazy="relativeIcon" alt="" v-if="shareUser=='true'">
                <img v-lazy="zhuancunIcon" alt="" v-else>
                <p>{{ buttonThree }}</p>
            </mt-button>
            <mt-popup v-model="shareShow" position="bottom" class="ans-popup">
                <div class="collect-head">基本信息</div>
                <div class="shareCont">
                    <div class="rulesPlate">
                        <div class="rulesGulop">
                            <span class="rulesfw">适用范围：</span><span class="unitsName unit"
                                                                    v-if="infoArr.length == 0 || infoArr == null">暂无</span>
                            <span v-for="list in infoArr" v-else>
                        <span v-if="list == '沪市主板'" :style="{color:'#a9262c',borderColor:'#a9262c'}">沪主板</span>
                        <span v-else-if="list == '深市主板'" :style="{color:'#174299',borderColor:'#174299'}">深主板</span>
                        <span v-else-if="list == '深市中小板'" :style="{color:'#174299',borderColor:'#174299'}">中小板</span>
                        <span v-else-if="list == '深市创业板'" :style="{color:'#174299',borderColor:'#174299'}">创业板</span>
                        <span v-else="list == '新三板'" :style="{color:'#f6900c',borderColor:'#f6900c'}">新三板</span>
                </span>

                        </div>
                    </div>
                    <div class="smCaption">
                        <div class="units">
                            <div class="unitsTitle">清单名称：</div>
                            <div class="unitsCont">
                                <span class="unitsName unit"
                                      v-if="infoObject.favouriteName!==''&& infoObject.favouriteName!==null">{{ infoObject.favouriteName
                                    }}</span>
                                <span class="unitsName unit" v-else>暂无</span>
                            </div>
                        </div>
                    </div>

                    <div class="smCaption">
                        <div class="units">
                            <div class="unitsTitle">清单作者：</div>
                            <div class="unitsCont">
                                <span class="unitsName unit"
                                      v-if="infoObject.userName!==''&& infoObject.userName!==null ">{{ infoObject.userName
                                    }}</span>
                                <span class="unitsName unit" v-else>暂无</span>
                            </div>
                        </div>
                    </div>

                    <div class="smCaption" v-show="infoObject.share==true">
                        <div class="units">
                            <div class="unitsTitle">订阅人数：</div>
                            <div class="unitsCont">
                                <span class="unitsName unit nexus"
                                      v-if="infoObject.subscribers!==''&& infoObject.subscribers!==null ">{{ infoObject.subscribers
                                    }}</span>
                                <span class="unitsName unit nexus" v-else>0</span>
                            </div>
                        </div>
                    </div>
                    <div class="smCaption">
                        <div class="units">
                            <div class="unitsTitle">发布日期：</div>
                            <div class="unitsCont" v-if="infoObject.createTime==null">
                    <span class="unitsName unit nexus">
                        暂无
                    </span>
                            </div>
                            <div class="unitsCont" v-else>
                    <span class="unitsName unit nexus">
                        {{ $const.formatText(infoObject.createTime) }}
                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="smCaption">
                        <div class="units nounits">
                            <div class="unitsTitle">更新日期：</div>
                            <div class="unitsCont" v-if="infoObject.updateTime==null">
                    <span class="unitsName unit nexus">
                        暂无
                    </span>
                            </div>
                            <div class="unitsCont" v-else>
                    <span class="unitsName unit nexus">
                        {{ $const.formatText(infoObject.updateTime) }}
                    </span>
                            </div>
                        </div>
                    </div>
                </div>
                <mt-button class="collect-foot" @click.native="shareShow = false">取消</mt-button>
            </mt-popup>
            <mt-popup v-model="zhuancunStatus" position="bottom" class="ans-popup">
                <div class="collect-head link_head">收藏夹</div>

                <div class="collect_shg">
                    <div class="inputgle">
                        <input v-model="inputVal" type='text' @focus="editFocus($event)" :placeholder='placeholders'
                               @input="createVal2(40)"
                               class="createVal"/>
                        <img v-lazy="close" alt="" @click="closeInputVals" class="closeInputVal">
                    </div>
                    <div class="inputbtn">
                        <button class='createDom' @click="createDom">创建</button>
                    </div>
                </div>
                <div class="linkGal">
                    <div class="linkList">
                        <div class="linkBtn" @click="morenzhuancun()">
                            {{ morenArr.favouriteName }}
                        </div>
                        <div class="collect_create">
                  <span>
                      <img v-lazy="answers" alt="answers">
                      <span class="collectText">{{morenArr.qaCount}}</span>
                  </span>
                            <span>
                      <img v-lazy="statute" alt="statute">
                      <span class="collectText">{{morenArr.caseCount}}</span>
                  </span>
                            <span>
                      <img v-lazy="notice" alt="notice">
                      <span class="collectText">{{morenArr.lawCount}}</span>
                  </span>
                            <span><img :src="reportIcon" alt="reportIcon">
                                <span class="collectText1">0</span>
                    </span>
                        </div>
                    </div>
                    <div v-for="(list,index) in relatedQuestion" class="linkList">
                        <div @click="linkRulesContent(index)" class="linkBtn">{{list.favouriteName}}</div>
                        <div class="collect_create">
                  <span>
                      <img v-lazy="answers" alt="answers">
                      <span class="collectText">{{list.qaCount}}</span>
                  </span>
                            <span>
                      <img v-lazy="statute" alt="statute">
                      <span class="collectText">{{list.caseCount}}</span>
                  </span>
                            <span>
                      <img v-lazy="notice" alt="notice">
                      <span class="collectText">{{list.lawCount}}</span>
                  </span>
                            <span><img :src="reportIcon" alt="reportIcon">
                                            <span class="collectText1">0</span>
                                        </span>
                        </div>
                    </div>
                </div>
                <mt-button class="collect-foot" @click.native="zhuancunStatus = false">取消</mt-button>
            </mt-popup>
            <!---->
        </div>
        <!-- 编辑收藏夹 -->
        <div class="editbox" v-show="editStatus">
            <div class="infobox">
                <!-- 收藏名称 -->
                <div class="editList">
                    <label>{{ collectNames }}</label>
                    <div>
                        <input class="editListTextarea" type="text" :placeholder="collectName" v-model="collectName"
                               maxlength="40" @input="createVal1(40)" @change="editname">
                        <b v-show="editcollectName.length>0" @click="collectName=''"></b>
                    </div>
                </div>
                <!-- 适应范围 -->
                <div class="editList">
                    <label>{{ rangeName }}</label>
                    <ul>
                        <li v-for="(list,index) in rangeArr" @click="selectItem(index)">
                            <span :select="list.selectStatus" :class="{selected:list.selectStatus}"></span>
                            <span>{{ list.name }}</span>
                        </li>
                    </ul>
                </div>
                <!-- 收藏简介 -->
                <div class="collectDesc">
                    <label>{{ collectdescname }}</label>
                    <textarea name="" id="" cols="30" rows="10" v-model="collectDesc" :placeholder="descText"
                              maxlength="300"></textarea>
                </div>
            </div>
            <div class="configBox">
                <div class="cancel" @click="editStatus=false">{{ cancelT }}</div>
                <div class="sure" @click="commitChange">{{ sureT }}</div>
            </div>
        </div>
        <!--分享-->
        <div class="testEndFenXiang" @click="testEndFen" v-show="testEndFenXiangs">
            <div></div>
        </div>
        <div class="showPrompt">你也可以将喜欢的内容转存至自己的收藏夹</div>
        <v-load v-show="isload"></v-load>
    </div>
</template>

<script>
    import returnHome from "../warning/returnHome.vue";
    import loading from "../warning/loading.vue";

    export default {
        name: 'collectDetails',
        data() {
            return {
                waringBtn: '刷新',
                waringText: '服务器错误，请刷新重试！',
                totalS: '',
                page: 1,
                collectval: [],
                collId: '',
                collectDesc: "收藏简介",
                descTexts: "本清单根据上交所编制的《董事会秘书后续培训法规汇编》更新整理。",
                shareIcon: "../../static/img/rules/Attribute.png",
                collectIcon: "../../static/img/rules/share.png",
                dingyueIcon: "../../static/img/personal/collect/groomCl.png",
                zhuancunIcon: "../../static/img/personal/collect/zhuancun.png",
                relativeIcon: "../../static/img/rules/editimg.png",
                shareShow: false,//收藏夹基本信息显示隐藏
                isCollects: "0",
                /* 编辑收藏夹 */
                editStatus: false,//编辑页面的显示状态
                collectNames: "收藏名称",
                collectListName: "假如是上市公司",//该编辑收藏夹名称
                editcollectName: "",//编辑收藏夹名称
                oldname: "",//原来收藏夹的名称
                rangeName: "适用范围",
                rangeArr: [
                    {selectStatus: false, name: "沪市主板"},
                    {selectStatus: false, name: "深市主板"},
                    {selectStatus: false, name: "深市中小板"},
                    {selectStatus: false, name: "深市创业板"},
                    {selectStatus: false, name: "新三板"},
                ],
                collectdescname: "收藏简介",
                descText: "介绍一下你的收藏夹...",
                cancelT: "取消",
                sureT: "确定",
                testEndFenXiangs: false,//分享引导页显示状态
                shareText0: "分享",//按钮状态
                shareText1: "取消分享",//按钮状态
                user_id: "",
                shareUser: true, //是否为收藏夹创建者
                buttonThree: "编辑",
                warningPage: false, //接口连接失败
                zhuancunStatus: false,//转存
                relatedQuestion: [],//订阅用户收藏夹数组
                morenArr: "",//默认收藏夹
                bottom: 20,
                pageTop: 1,
                answers: '../../static/img/personal/collect/answers.png',
                statute: '../../static/img/personal/collect/statute.png',
                notice: '../../static/img/personal/collect/notice.png',
                reportIcon: '../../static/img/report/reportCollect.png',
                collectName: "",//收藏夹名称
                infoObject: "",//基本信息对象
                infoArr: [],//收藏夹适用范围
                newdingyue: "",//是否有新订阅
                uid: "",//随机数
                lastsuijishu: "",//上一次的随机数
                inputVal: "",//自建收藏夹
                placeholders: '请输入新建收藏夹名称(最多40个字)',
                close: '../../static/img/personal/collect/close.png',
                sharedom: "",
                sharekey: "",
                isload: false,
                isInfo: false,
            }
        },
        updated() {
            this.zhujian();
            this.setHeight();
        },
        created() {
            /*防止出错*///console.log(this.collId);
            if (this.$route.query.id !== undefined) {
                this.collId = this.$route.query.id;
            } else {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
            if (this.$route.query.show !== undefined) {
                if (this.$route.query.uuid !== undefined && this.$route.query.uuid !== '') {
                    this.editStatus = false;
                } else {
                    this.editStatus = this.$route.query.show;
                }
                /*this.collectInfo();//列表处点击编辑调用*/
            }
            //
            if (this.$route.query.uuid !== undefined) {
                this.uid = this.$route.query.uuid;
            }
            this.user_id = this.$cookie.getCookie("userId");
            if (this.user_id == '' || this.user_id == null || this.user_id == undefined) {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
            document.title = decodeURI(this.$route.query.name);
        },
        mounted() {
            this.getCollect();
            this.$nextTick(() => {
                $(".sharebg").removeClass('sharebg-active');
                $('title').text(this.collectName);
            });
            console.log(this.uuid());
        },
        components: {
            "v-returnHome": returnHome,
            "v-load": loading
        },
        methods: {
            //编辑修改收藏夹名称
            editname() {
                this.editcollectName = this.collectName;
            },
            /********************************************************/
            editFocus(event) {
                var el = event.currentTarget;
                //console.log(".offset().top", $(el).offset().top);
                this.androidTop(el);
            },
            //panduanandroid
            androidTop(id) {
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                console.log('是否是iOS：', isiOS, '是否是Android：', isAndroid);
                // console.log(u);// console.log(app);
                if (isAndroid == true) {
                    var totId = id;
                    var aa = $(totId).offset().top
                    var bodyH = document.body.clientHeight;
                    bodyH = parseInt((bodyH / 4) - 20);
                    $("body").animate({scrollTop: aa - bodyH}, 550);
                }
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
                            this.$toast({message: '创建收藏夹成功', position: 'middle', duration: 1500});
                            this.relativeShows();
                            return;
                        } else if (res.data.returnCode == 3) {
                            this.$toast({message: '收藏夹不能相同', position: 'middle', duration: 1500});
                            console.log('465798', res)
                            return;
                        } else if (res.data.returnCode == 2) {
                            this.$toast({message: '最多只能创建十个收藏夹', position: 'middle', duration: 1500});
                            return;
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            },
            closeInputVals() {
                if (this.inputVal.length != 0) {
                    this.inputVal = '';
                    document.querySelector('.closeInputVal').style.display = 'none';
                    document.querySelector('.createVal').focus();
                }
            },
            //根据用户id获取收藏夹
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
                        this.relatedQuestion = res.data.returnObject.list;
                    }
                }).catch((err) => {
                    console.log(err)
                    this.$toast({message: '网络请求异常', position: 'middle', duration: 1500});
                });
            },
            //生成uuid
            uuid(len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    // rfc4122, version 4 form
                    var r;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';

                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }

                return uuid.join('');
            },
            //创建input
            createVal1(maxlength) {
                if (this.editcollectName.length > maxlength) {
                    this.editcollectName = this.editcollectName.substring(0, maxlength);
                }
            },
            createVal2(maxlength) {
                if (this.inputVal.length > maxlength) {
                    this.inputVal = this.inputVal.substring(0, maxlength);
                }
            },
            // 提交修改
            commitChange() {
                let rangearr = [];
                let str = '';
                for (var i in this.rangeArr) {
                    if (this.rangeArr[i].selectStatus == true) {
                        rangearr.push(this.rangeArr[i].name)
                    }
                }
                str = rangearr.join(',');
                if (rangearr == []) {
                    str = '';
                }
                //console.log('range', str)
                var uid = parseInt(this.$cookie.getCookie("userId"))
                var cid = parseInt(this.collId)
                this.editcollectName == '' ? this.editcollectName = this.collectName : this.editcollectName;
                var name = this.editcollectName;
                if (this.editcollectName == this.oldname) {
                    name = null;
                } else {
                    name = this.editcollectName;
                }
                if (this.editcollectName == '' && this.collectDesc == '' && str == '') {
                    this.$toast({message: '请填写信息', position: 'middle', duration: 1500});
                } else {
                    this.$http({
                        method: "POST",
                        url: this.$api.host + "favourite/updateFavouriteName",
                        params: {
                            id: cid,
                            favouriteName: name,
                            range: str,
                            introduction: this.collectDesc,
                            userId: uid
                        }
                    }).then((res) => {
                        //console.log(res)
                        if (res.data.returnCode == 1) {
                            this.$toast({message: '编辑收藏夹成功', position: 'middle', duration: 1500});
                            this.getCollect();
                            this.editStatus = false;
                        } else if (res.data.returnCode == 3) {
                            this.$toast({message: '该文件名已存在', position: 'middle', duration: 1500});
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.$toast({message: err.message, position: 'middle', duration: 1500});
                    });
                }
            },
            ///判断当前收藏夹是否有shareuuid 无回调分享接口 Evans for cai
            shareErr() {
                this.$http({
                    methods: "GET",
                    url: this.$api.host + "favourite/shareSwitch",
                    params: {
                        userId: this.user_id,
                        favouriteId: this.collId,
                        shareKey: this.sharekey,
                        isShare: true
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        console.log("回调成功");
                    } else {
                        console.log("回调失败");
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$toast({message: err.message, position: 'middle', duration: 1500});
                })
            },
            shareSuccess() {
                this.$http({
                    methods: "GET",
                    url: this.$api.host + "favourite/shareSwitch",
                    params: {
                        userId: this.user_id,
                        favouriteId: this.collId,
                        shareKey: this.sharekey,
                        isShare: true
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        this.isCollects = '1';
                        this.$toast({message: '分享成功', position: 'middle', duration: 1500});
                        this.$nextTick(() => {
                            this.getCollect();
                        })
                        //window.location.reload();
                    } else {
                        this.$toast({
                            message: res.data.returnMsg + '分享失败-1' + res.data.returnCode,
                            position: 'middle',
                            duration: 1500
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$toast({message: err.message, position: 'middle', duration: 1500});
                })
            },
            testEndFen() {
                this.testEndFenXiangs = false;//close share's page
            },
            /* 市场主板多选 */
            selectItem(index) {
                this.rangeArr[index].selectStatus ? this.rangeArr[index].selectStatus = false : this.rangeArr[index].selectStatus = true;
            },
            // 点击转存默认收藏夹
            morenzhuancun() {
                var collectId = this.morenArr.id;
                this.savedSubscription(collectId)
            },
            //转存接口方法
            savedSubscription(id) {
                console.log(id)
                this.$http({
                    methods: "GET",
                    url: this.$api.host + "favourite/savedSubscription",
                    params: {
                        userId: this.user_id,
                        favouriteId: this.collId,
                        toFavouriteId: id,
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        this.zhuancunStatus = false;
                        this.$toast({message: '转存成功', position: 'middle', duration: 1500});
                    } else if (res.data.returnCode == 2) {
                        this.zhuancunStatus = false;
                        this.$toast({message: '已存入该收藏夹', position: 'middle', duration: 1500});
                    }
                }).catch((err) => {
                    console.log(err);
                    this.zhuancunStatus = false;
                    this.$toast({message: '网络错误', position: 'middle', duration: 1500});
                })
            },
            //点击转存收藏夹
            linkRulesContent(index) {
                console.log(index);
                var collectId = this.relatedQuestion[index].id;
                this.savedSubscription(collectId)
            },
            //点击编辑
            relativeShows() {
                this.inputVal = this.collectName;
                /* 是否为收藏夹创建者 */
                if (this.shareUser == 'true') {
                    this.editStatus = true;
                    for (var i in this.rangeArr) {
                        this.rangeArr[i].selectStatus = false;
                    }
                    //console.log('适用范围', this.infoArr, this.rangeArr);
                    for (var i = 0; i < this.infoArr.length; i++) {
                        for (var j = 0; j < this.rangeArr.length; j++) {
                            if (this.rangeArr[j].name == this.infoArr[i]) {
                                this.rangeArr[j].selectStatus = true;
                            }
                        }
                    }
                } else {
                    this.zhuancunStatus = true;
                    this.$http({
                        methods: "GET",
                        url: this.$api.host + "favourite/getDefault",
                        params: {
                            userId: this.user_id
                        }
                    }).then((res) => {
                        console.log(res);
                        if (res.data.returnCode == 1) {
                            this.morenArr = res.data.returnObject;
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                    this.$http({
                        methods: "GET",
                        url: this.$api.host + "favourite/getFavourite",
                        params: {
                            userId: this.user_id,
                            pageSize: this.bottom,
                            pageIndex: this.pageTop
                        }
                    }).then((res) => {
                        console.log(res);
                        this.relatedQuestion = res.data.returnObject.list;
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            },
            //收藏夹分享 订阅
            collectShows() {
                console.log("123456this.isCollects", this.isCollects);
                if (this.shareUser == 'true') {// 收藏夹创建者
                    if (this.isCollects == '0') {
                        this.testEndFenXiangs = true; // open share's page  "0"是未分享状态  “1”是已分享状态
                    } else {
                        this.$http({
                            methods: "GET",
                            url: this.$api.host + "favourite/shareSwitch",
                            params: {
                                userId: this.user_id,
                                favouriteId: this.collId,
                                isShare: false
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.data.returnCode == 1) {
                                this.isCollects = '0';
                                this.$toast({message: '已取消分享', position: 'middle', duration: 1500});
                                this.$nextTick(() => {
                                    this.getCollect();
                                })
                            } else {
                                this.$toast({message: '取消分享失败', position: 'middle', duration: 1500});
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                } else {
                    if (this.isCollects !== '0') {// 收藏夹订阅者
                        this.$http({
                            methods: "GET",
                            url: this.$api.host + "favourite/addSubscription",
                            params: {
                                userId: this.user_id,
                                favouriteId: this.collId
                            }
                        }).then((res) => {
                            console.log(res)
                            if (res.data.returnCode == 1) {
                                this.isCollects = '0';
                                this.$toast({message: '订阅成功', position: 'middle', duration: 1500});
                                $('.showPrompt').css('display', "block");
                                setTimeout(() => {
                                    $('.showPrompt').animate({display: "none", opacity: 0});
                                }, 4000);
                                this.getCollect();
                            } else if (res.data.returnCode == '-2') {
                                this.$toast({message: '已订阅过此收藏夹', position: 'middle', duration: 1500});
                            } else {
                                this.$toast({message: '添加订阅失败', position: 'middle', duration: 1500});
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$toast({message: '网络错误', position: 'middle', duration: 1500});
                        })
                    } else {
                        this.$http({
                            methods: "GET",
                            url: this.$api.host + "favourite/cancelSubscription",
                            params: {
                                userId: this.user_id,
                                id: this.collId
                            }
                        }).then((res) => {
                            console.log(res)
                            if (res.data.returnCode == 1) {
                                this.isCollects = '1';
                                this.$toast({message: '已取消订阅', position: 'middle', duration: 1500});
                            } else {
                                this.$toast({message: '取消订阅失败', position: 'middle', duration: 1500});
                            }

                        }).catch((err) => {
                            console.log(err)
                            this.$toast({message: '网络错误', position: 'middle', duration: 1500});
                        })
                    }
                }
            },
            //收藏夹基本信息
            shareShows() {
                this.shareShow = true;
                this.getCollect();
            },
            setHeight() {
                var hei = document.body.clientHeight;
                var Feight = document.querySelector(".collectGroomHead").clientHeight;
                var Oeight = document.querySelector(".ans-footer").clientHeight;
                var Seight = document.querySelector(".splitLine").clientHeight;
                var ghg = (hei - Feight - Oeight - Seight) + 'px';
                $('._v-container').css({height: ghg, top: (Feight + Seight) + 'px'});
            },
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            format1(shijianchuo) {
                //console.log("shijianchuo", shijianchuo);
                //shijianchuo是整数，否则要parseInt转换
                var time = new Date(parseInt(shijianchuo));
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                return y + '-' + this.add0(m) + '-' + this.add0(d);
            },
            ///处理。。。
            nuwNumber(str) {
                var hei = document.body.clientWidth;
                var nowH = parseInt((hei - 39) / 15) * 2;
                if (str.length >= nowH) {
                    return str = str.substring(0, nowH) + '...';
                } else {
                    return str
                }
            },
            /* 设置cookie*/
            V_setCookie: function (name, value, days) {
                var d = new Date;
                d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
                window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
            },
            /*读取cookie*/
            V_getCookie: function (name) {
                var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                return v ? v[2] : "";
            },
            /*清空Cookie*/
            V_deleteCookie: function (name) {
                this.set(name, '', -1);
            },
            /**/
            warning() {
                window.location.reload();
                /*  document.location.reload();*/
            },
            //下拉加载
            infinite: function (done) {
                console.log('下拉加载');
                if (this.bottom >= this.totalS) {
                    /* this.page+=1;
                     this.bottom = this.bottom + 10;*/
                    this.getCollect();
                    setTimeout(() => {
                        done(true)
                    });
                    return;
                }
                setTimeout(() => {
                    this.bottom = this.bottom + 10;
                    this.getCollect();
                    setTimeout(() => {
                        done();
                    })
                });
            },
            //组件调整样式
            zhujian() {
                $('.mint-cell-value').css("width", "100%");
                $('.mint-cell-text').css('font-family', 'PingFangSC-Medium, sans-serif');
                $('.mint-cell-wrapper').css({"background": "none", "height": '100%'});
                //$('.mint-cell-swipe-button').css({"line-height": "78px",});
                $('.mint-cell').css("height", "100%");
            },
            // 收藏夹编辑信息
            collectInfo() {
                this.$http({
                    methods: "GET",
                    url: this.$api.host + 'favourite/getFavouriteById',
                    params: {
                        favourIteById: this.collId,
                    }
                }).then((res) => {
                    console.log('==>', res)
                    this.infoObject = res.data.returnObject;
                    this.oldname = this.infoObject.favouriteName;
                    this.collectName = res.data.returnObject.favouriteName;
                    this.collectDesc = res.data.returnObject.introduction;//收藏夹描述
                    $('title').text(this.collectName);
                    // 适用范围
                    if (res.data.returnObject.limitation !== '' && res.data.returnObject.limitation !== null) {
                        this.infoArr = (res.data.returnObject.limitation).split(',');
                        for (var i in this.infoArr) {
                            for (var j in this.rangeArr) {
                                if (this.rangeArr[j].name == this.infoArr[i]) {
                                    this.rangeArr[j].selectStatus = true;
                                }
                            }
                        }
                    } else {
                        this.infoArr = [];
                    }
                    // 空收藏夹分享sharekey
                    var suijishus = this.uuid(8, 16);
                    this.lastsuijishu = res.data.returnObject.shareKey;
                    if (this.lastsuijishu == null || this.lastsuijishu == "") {
                        this.lastsuijishu = suijishus;
                        //this.shareErr();
                    }
                    console.log('------sharekey', this.sharekey, 'lastsuijishu', this.lastsuijishu, 'collId', this.collId);
                    this.infoObject.share ? this.sharekey = this.lastsuijishu : this.sharekey = suijishus;


                    var adverttitle = this.collectName;
                    var sharelink2;
                    if ((window.location.href).indexOf('uuid') >= 0) {
                        sharelink2 = (window.location.href).substring(0, (window.location.href).indexOf('uuid')) + 'uuid=' + this.sharekey;
                    } else {
                        sharelink2 = window.location.href + "&uuid=" + this.sharekey;//分享链接
                    }
                    var shareDesc = "";//描述
                    if (this.collectDesc == null || this.collectDesc == "" || this.collectDesc == undefined || this.collectDesc.length == 0) {
                        shareDesc = "上市公司、专业机构移动董办工具首选！";
                    } else {
                        shareDesc = this.collectDesc;
                    }
                    this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true, this.shareSuccess);

                }).catch((err) => {
                    console.log(err)
                    this.$toast({message: err.message, position: 'middle', duration: 1500});
                })
            },
            //获取收藏夹内容
            getCollect() {
                this.warningPage = false;
                $('#botton404').hide();
                var suijishus = this.uuid(8, 16);
                this.sharedom = suijishus;
                this.$http({
                    method: "GET",
                    url: this.$api.host + "collect/getCollect",
                    params: {
                        favourableId: this.collId,
                        userId: this.user_id,
                        page: this.page,
                        rows: this.bottom,
                        shareKey: this.uid,
                    }
                }).then((res) => {
                    //console.log('>>>>>>>res>>>>>>>>',res);
                    this.totalS = res.data.total;
                    if (res.data.returnCode == 1) {
                        this.isInfo = false;
                        this.warningPage = false;
                        this.collectval = [];
                        this.collectval = res.data.returnObject.collects;
                        this.shareUser = res.data.returnObject.isOwner;
                        /*false*/
                        this.infoObject = res.data.returnObject.favourite; // 基本信息
                        console.log('oihsdoifhoi=======', this.infoObject.introduction);
                        if (this.infoObject.introduction == null || this.infoObject.introduction == '') {
                            $(".collectGroomHead").hide();
                            $(".splitLine").hide();
                        }
                        this.newdingyue = res.data.returnObject.isNewAdd;
                        this.lastsuijishu = res.data.returnObject.favourite.shareKey;
                        this.oldname = this.infoObject.favouriteName;
                        if (this.newdingyue == true) {
                            if (this.infoObject.subscribers !== null) {
                                this.$toast({
                                    message: "已有" + this.infoObject.subscribers + "人订阅",
                                    position: 'middle',
                                    duration: 2000
                                });
                            }
                        }
                        console.log("share+++", this.infoObject.share, typeof(this.infoObject.share), 'this.shareUser', this.shareUser, typeof(this.shareUser))

                        this.collectDesc = res.data.returnObject.favourite.introduction;//收藏夹描述
                        // 适用范围
                        if (res.data.returnObject.favourite.limitation !== '' && res.data.returnObject.favourite.limitation !== null) {
                            this.infoArr = (res.data.returnObject.favourite.limitation).split(',');
                            for (var i in this.infoArr) {
                                for (var j in this.rangeArr) {
                                    if (this.rangeArr[j].name == this.infoArr[i]) {
                                        this.rangeArr[j].selectStatus = true;
                                    }
                                }
                            }
                        } else {
                            this.infoArr = [];
                        }
                        //
                        this.shareUser = this.shareUser.toString();
                        //console.log(typeof(this.shareUser),this.shareUser.toString() )
                        //1 是sharetext1 0 是sheretext0
                        if (this.shareUser && this.infoObject.share) {
                            this.isCollects = "1";
                        } else if (this.shareUser && this.infoObject.share == false) {
                            this.isCollects = '0';
                        }
                        //console.log("share this.isCollects", this.isCollects)

                        //console.log('shareUser', this.shareUser, 'share', this.infoObject.share);
                        if (this.shareUser == 'true') {
                            this.shareText1 = "取消分享";
                            this.shareText0 = "分享";
                            this.buttonThree = "编辑";
                            //console.log("是不是用户自己创建的收藏夹0",this.shareUser)
                        } else if (this.shareUser == 'false') {
                            this.shareText0 = "取消订阅";
                            this.shareText1 = "订阅";
                            this.buttonThree = "转存";
                            res.data.returnObject.isSubscribe ? this.isCollects = "0" : this.isCollects = "1";
                            //console.log("是不是用户自己创建的收藏夹1",this.shareUser)
                        }
                        this.collectName = res.data.returnObject.favourite.favouriteName;

                        //console.log("isSubscribe", res.data.returnObject.isSubscribe, this.isCollects);

                        $('title').text(this.collectName);

                        //cai for 9.29==>11:49 //如果已分享取到的this.lastsuijishu = null 从新赋值this.lastsuijishu
                        if (this.lastsuijishu == null || this.lastsuijishu == "") {
                            this.lastsuijishu = suijishus;
                            //this.shareErr();
                        }
                        this.infoObject.share ? this.sharekey = this.lastsuijishu : this.sharekey = suijishus;

                        var adverttitle = this.collectName;
                        var sharelink2;
                        if ((window.location.href).indexOf('uuid') >= 0) {
                            sharelink2 = (window.location.href).substring(0, (window.location.href).indexOf('uuid')) + 'uuid=' + this.sharekey;
                        } else {
                            sharelink2 = window.location.href + "&uuid=" + this.sharekey;//分享链接
                        }
                        var shareDesc = "";//描述
                        if (this.collectDesc == null || this.collectDesc == "" || this.collectDesc == undefined || this.collectDesc.length == 0) {
                            shareDesc = "上市公司、专业机构移动董办工具首选！";
                        } else {
                            shareDesc = this.collectDesc;
                        }
                        this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true, this.shareSuccess);
                        /******/
                    } else if (res.data.returnCode == -1) {
                        this.isInfo = true;
                        this.waringText = "收藏夹内没有内容！";
                        $(".noInfoImg404").addClass('nocontent');

                        this.collectval = [];
                        this.shareUser = res.data.returnObject.isOwner;
                        this.infoObject = res.data.returnObject.favourite; // 基本信息
                        /*if(this.infoObject.introduction==null){
                            /!*$(".collectGroomHead").hide();*!/
                            /!*$(".splitLine").hide();*!/
                        }*/
                        this.newdingyue = res.data.returnObject.isNewAdd;
                        this.lastsuijishu = res.data.returnObject.favourite.shareKey;
                        this.oldname = this.infoObject.favouriteName;
                        if (this.newdingyue == true) {
                            if (this.infoObject.subscribers !== null) {
                                this.$toast({
                                    message: "已有" + this.infoObject.subscribers + "人订阅",
                                    position: 'middle',
                                    duration: 2000
                                });
                            }
                        }
                        this.collectDesc = res.data.returnObject.favourite.introduction;//收藏夹描述
                        // 适用范围
                        if (res.data.returnObject.favourite.limitation !== '' && res.data.returnObject.favourite.limitation !== null) {
                            this.infoArr = (res.data.returnObject.favourite.limitation).split(',');
                            for (var i in this.infoArr) {
                                for (var j in this.rangeArr) {
                                    if (this.rangeArr[j].name == this.infoArr[i]) {
                                        this.rangeArr[j].selectStatus = true;
                                    }
                                }
                            }
                        } else {
                            this.infoArr = [];
                        }
                        this.shareUser = this.shareUser.toString();
                        //1 是sharetext1 0 是sheretext0
                        if (this.shareUser && this.infoObject.share) {
                            this.isCollects = "1";
                        } else if (this.shareUser && this.infoObject.share == false) {
                            this.isCollects = '0';
                        }
                        if (this.shareUser == 'true') {
                            this.shareText1 = "取消分享";
                            this.shareText0 = "分享";
                            this.buttonThree = "编辑";
                            //console.log("是不是用户自己创建的收藏夹0",this.shareUser)
                        } else if (this.shareUser == 'false') {
                            this.shareText0 = "取消订阅";
                            this.shareText1 = "订阅";
                            this.buttonThree = "转存";
                            res.data.returnObject.isSubscribe ? this.isCollects = "0" : this.isCollects = "1";
                            //console.log("是不是用户自己创建的收藏夹1",this.shareUser)
                        }
                        this.collectName = res.data.returnObject.favourite.favouriteName;
                        $('title').text(this.collectName);
                        if (this.lastsuijishu == null || this.lastsuijishu == "") {
                            this.lastsuijishu = suijishus;
                            //this.shareErr();
                        }
                        this.infoObject.share ? this.sharekey = this.lastsuijishu : this.sharekey = suijishus;
                        var adverttitle = this.collectName;
                        var sharelink2;
                        if ((window.location.href).indexOf('uuid') >= 0) {
                            sharelink2 = (window.location.href).substring(0, (window.location.href).indexOf('uuid')) + 'uuid=' + this.sharekey;
                        } else {
                            sharelink2 = window.location.href + "&uuid=" + this.sharekey;//分享链接
                        }
                        var shareDesc = "";//描述
                        if (this.collectDesc == null || this.collectDesc == "" || this.collectDesc == undefined || this.collectDesc.length == 0) {
                            shareDesc = "上市公司、专业机构移动董办工具首选！";
                        } else {
                            shareDesc = this.collectDesc;
                        }
                        this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true, this.shareSuccess);


                        /*this.collectInfo();//获取收藏夹信息返回-1没有内容时调用


                        this.shareUser = this.shareUser.toString();
                        if (this.shareUser && this.infoObject.share) {
                            this.isCollects = "1";
                        } else if (this.shareUser && this.infoObject.share == false) {
                            this.isCollects = '0'
                        }
                        if (this.shareUser == 'true') {
                            this.shareText1 = "取消分享";
                            this.shareText0 = "分享";
                            this.buttonThree = "编辑";
                        } else if (this.shareUser == 'false') {
                            this.shareText0 = "取消订阅";
                            this.shareText1 = "订阅";
                            this.buttonThree = "转存";
                        }*/

                    } else if (res.data.returnCode == -2) {
                        // 创建者已取消分享
                        this.isInfo = false;
                        this.warningPage = true;
                        this.waringText = "该分享链接已失效！";
                        $('#botton404').hide();
                        $(".waringImg404").addClass('shixiao');
                    }
                }).catch((err) => {
                    console.log(err);
                    //this.$toast({message: err.message, position: 'middle', duration: 1500});
                    this.warningPage = true;
                });
            },
            answersG(index) {
                    this.$router.push({
                        path: '/afficheContent',
                        query: {id: this.collectval[index].refId, MathTime: global.timestamp,}
                    });
            },
            answersR(index) {
                this.$router.push({
                    path: '/detailReport',
                    query: {id: this.collectval[index].refId, MathTime: global.timestamp,}
                });
            },
            collectL(index) {
                console.log(this.collectval[index].refId);
                this.$router.push({
                    path: '/rulesCount',
                    query: {id: this.collectval[index].refId, MathTime: global.timestamp}
                });
            },
            answersD(index) {
                console.log(index, this.collectval[index].title, this.collectval[index].qaScopeId);
                this.$router.push({
                    path: "/answersDetails",
                    query: {
                        question: this.collectval[index].title,
                        scopeId: this.collectval[index].qaScopeId,
                        MathTime: global.timestamp,
                    }
                });
            },
            //删除单个内容
            del(index) {
                $("a").attr('href', "javascript:;");
                this.$messagebox.confirm('删除后数据不保留，确定要删除吗？', '').then(action => {
                    if (action === 'confirm') {
                        this.$http({
                            method: "POST",
                            url: this.$api.host + "collect/deleteCollectById",
                            params: {
                                id: this.collectval[index].id,
                                favouriteId: this.$route.query.id,
                                type: this.collectval[index].type
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.data.returnCode == 1) {
                                this.getCollect();
                            } else {

                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                })
            }
        },
        deforeDestroy: function () {
            this.testEndFenXiangs = false;
        }
    }
</script>

<style lang="scss">
    .mint-toast {
        z-index: 9999 !important;
    }
    #collectDetails .mint-cell-swipe-button {
        box-sizing: border-box;
        padding: 0 35px;
        line-height: 1.786667rem !important;
        text-decoration: none;
        height: 100% !important;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        float: left;
    }
</style>
<style lang="scss" scoped>
    .mint-cell {
        background-color: white !important;
    }
    /* 编辑收藏夹名称 */
    .editbox {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1000;
        background: #fff;
    }
    .infobox {
        width: 100%;
        height: auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .editList, .collectDesc {
        width: 100%;
        height: 80px;
        background: #fff;
        border-bottom: 7.5px solid #f0f1f5;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .editList:nth-child(2) {
        float: left;
        height: auto;
    }
    .editList label, .collectDesc label {
        width: 21%;
        height: 100%;
        line-height: 80px;
        text-align: right;
        float: left;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        color: #323232;
    }
    .editList div, .editList ul, .collectDesc textarea {
        width: 75%;
        height: 100%;
        float: right;
        padding-top: 6%;
        box-sizing: border-box;
        position: relative;
        color: #8d8d8d;
        -webkit-appearance: none;
    }
    .collectDesc textarea {
        margin-top: 6%;
        padding: 2%;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        border-radius: 2px;
        resize: none;
        color: #8d8d8d;
        border: 1px solid #e3e3e3;
        overflow-y: auto;
        height: 85px;
        -webkit-appearance: none;
    }
    .editList ul {
        list-style: none;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 15px;
        color: #8d8d8d;
        padding-top: 7.5%;
    }
    .editList li span:first-child {
        width: 14px;
        height: 14px;
        border: 1px solid #8d8d8d;
        border-radius: 2px;
        display: inline-block;
        box-sizing: border-box;
    }
    .editList li .selected {
        background-image: url("/static/img/personal/chengseduigou.png");
        background-size: contain;
        border: 1px solid #ffb048 !important;
    }
    .editList li {
        margin-bottom: 24px;
    }
    .editList li span:last-child {
        display: inline-block;
        padding: 0px 0 0 10px;
    }
    .editList li span {
        vertical-align: middle;
    }
    .editList div .editListTextarea {
        width: 100%;
        height: 73%;
        /*line-height: 15px;*/
        border: 1px solid #f0f1f5;
        border-radius: 2px;
        font-size: 15px;
        color: #8d8d8d;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        padding: 0 3%;
        box-sizing: border-box;
        -webkit-appearance: none;
        /*resize: none;*/
    }
    .editList div input:focus {
        border: 1px solid #f8a234;
    }
    .configBox {
        width: 100%;
        height: 50px;
        border-top: 1px solid #e3e3e3;
        font-size: 18px;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
        color: #ffb048;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .configBox div:first-child, .configBox div:last-child {
        float: left;
        width: 50%;
        height: 100%;
        line-height: 50px;
        text-align: center;
        background: #fff;
    }
    .configBox div:last-child {
        background: #ffb048;
        color: #fff;
    }
    b {
        width: 15px;
        height: 15px;
        color: #fff;
        position: absolute;
        right: 10px;
        top: 8%;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        background-image: url("/static/img/personal/close.png");
        background-size: contain;
    }
    /**/

    a {
        text-decoration: none;
    }
    #collectDetails {
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
    }
    .scrollBox ._v-container {
        width: 100% !important;
        height: 100% !important;
        top: 100px !important;
    }
    #collectDetails .splitLine {
        width: 100%;
        height: 7.5px;
        background: #f0f1f5;
    }
    /*  收藏夹简介*/

    #collectDetails .collectGroomHead {
        height: auto;
        box-sizing: border-box;
        padding: 0 12px;
        position: relative;
        z-index: 5;
    }
    #collectDetails .collectGroomHe {
        box-sizing: border-box;
        padding: 17.5px 0 12.5px 0;
        position: relative;
    }
    #collectDetails .testingEnd-content-middle-item {
        text-align: center;
        color: #ffb551;
    }
    #collectDetails .testingEnd-content-middle-text {
        padding: 0 6px 0 6px;
        font-size: 15px;
        max-width: 50%;
        display: inline-block;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    }
    #collectDetails .testingEnd-content-middle1, #collectDetails .testingEnd-content-middle2 {
        width: 60px;
        height: 2px;
        display: inline-block;
        box-sizing: border-box;
        border-bottom: 0.5px solid #ffb551;
        position: relative;
        top: -5px;
    }
    #collectDetails .testingEnd-content-middle1 div {
        height: 3px;
        width: 3px;
        background-color: #ffb551;
        border-radius: 50%;
        position: absolute;
        right: 0;
    }
    #collectDetails .testingEnd-content-middle2 div {
        height: 3px;
        width: 3px;
        background-color: #ffb551;
        position: absolute;
        border-radius: 50%;
        left: 0;
        top: 0;
    }
    /**/
    #collectDetails .collectGroomHeadText {
        letter-spacing: 0;
        font-size: 13px;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        color: #8d8d8d;
        line-height: 19px;
        text-align: justify;
        padding-bottom: 17.5px;
    }
    #collectDetails .TcentList {
        padding: 0 12px;
    }
    /* 底部操作栏 */

    /*底部弹出框*/
    #collectDetails .ans-popup {
        height: auto;
        background-color: white;
        width: 100%;
    }
    #collectDetails .collect-head {
        height: 50px;
        width: 100%;
        color: #323232;
        background-color: white;

        line-height: 50px;
        text-align: center;
        margin: 0;
        font-size: 17px;
        box-sizing: border-box;
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    #collectDetails .link_head {
        border-bottom: 0.5px solid #f0f1f5;
    }
    #collectDetails .collect-foot {
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-shadow: none;
        border-top: 0.5px solid #f0f1f5;
        font-size: 17px;
        color: #ffb148;
        line-height: 50px;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;

    }
    #collectDetails .linkList {
        color: #323232;
        font-size: 15px;
        line-height: 16px;
        box-sizing: border-box;
        border-bottom: 0.5px solid #f0f1f5;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        position: relative;
    }
    #collectDetails .linkList:last-child {
        /*border-bottom: 0px solid #fff;*/
    }
    .collect_create span img {
        height: 14px;
        width: 14px;
        position: relative;
        top: 1px;
        left: 0;
    }
    .collect_create {
        position: absolute;
        bottom: 6px;
        font-size: 11px;
        color: #8d8d8d;
        padding-top: 4.5%;
        border: 0 !important;
        right: 0px;
    }
    .collect_create span {
        margin-right: 3px;
    }
    /*收藏夹*/
    .collectText {
        width: 15px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
    }
    #collectDetails #ans-content li {
        list-style-type: none !important;
    }
    #collectDetails .linkGal {
        max-height: 300px;
        padding: 0 12px;
        height: auto;
        font-size: 12px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    #collectDetails .linkBtn {
        border: 0;
        box-shadow: none;
        background-color: white;
        width: 100%;
        height: auto;
        font-size: 15px;
        text-align: left;
        padding: 10px 0 0;
        color: #323232;
        margin-bottom: 30px;
    }
    #collectDetails .shareCont {
        padding: 0 12px;
        box-sizing: border-box;
        border-top: 0.5px solid #f0f1f5;
    }
    .rulesPlate {
        background-color: white;
        padding: 12px 0 0 0;
        font-size: 14px;
        text-align: left;
        color: #323232;
    }
    .rulesPlate .rulesGulop {
        padding-bottom: 12px;
        border-bottom: 0.5px solid #f0f1f5;
    }
    .rulesPlate .rulesfw {
        font-size: 15px;
        color: #323232;
    }
    .rulesPlate div > span > span {
        text-align: center;
        display: inline-block;
        padding: 0 5px;
        border-radius: 20px;
        font-size: 10px;
        border: 1px solid #f0ad4e;
        margin-right: 5px;
    }
    .unitsName {
        font-size: 15px !important;
    }
    @media screen and (max-width: 360px) {
        .nexus {
            margin-top: 4px;
            box-sizing: border-box;
            float: left;
        }
    }
    .smCaption {
        text-align: left;
        padding: 12px 0 0 0;
    }
    .smCaption .units {
        display: flex;
        color: #323232;
        font-size: 15px;
        padding-bottom: 12px;
        border-bottom: 0.5px solid #f0f1f5;
        box-sizing: border-box;
    }
    .nounits {
        border-bottom: none !important;
    }
    .unitsTitle {
        display: inline-table;
    }
    .unitsCont {
        text-align: justify;
        max-width: 79%;
    }
    /**/
    /* 分享引导页 */
    #collectDetails .testEndFenXiang {
        z-index: 10000;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        background: rgba(0, 0, 0, 0.8);
    }
    #collectDetails .testEndFenXiang div {
        background: url("/static/img/testing/fxscj.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 276.097px;
        height: 270px;
        margin: 35px auto 0 auto;
        margin-right: 25px;
    }
    /**/

    /**/
    #collectDetails .ans-footer {
        position: absolute;
        bottom: 0px;
        z-index: 33;
        left: 0;
        font-size: 0;
        width: 100%;
        border-top: 1px solid #e3e3e3;
        box-shadow: 0 -8px 13px rgba(0, 0, 0, .02);
    }
    #collectDetails .ans-footer-list {
        position: relative;
        bottom: 0;
        display: inline-block;
        width: 33.33%;
        padding: 0;
        box-shadow: none;
        height: 50px;
        border-radius: 0;
        background-color: #f0f1f5;
    }
    #collectDetails .ans-footer-list img {
        height: 18px;
        padding-top: 2px;
    }
    #collectDetails .ans-footer-list p {
        margin: 0;
        font-size: 12px;
    }
    /*底部弹出框*/
    #collectDetails .ans-popup {
        height: auto;
        background-color: white;
        width: 100%;
    }
    #collectDetails .collect-head {
        height: 50px;
        width: 100%;
        color: #323232;
        background-color: white;

        line-height: 50px;
        text-align: center;
        margin: 0;
        font-size: 17px;
        box-sizing: border-box;
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    #collectDetails .link_head {
        border-bottom: 0.5px solid #f0f1f5;
    }
    #collectDetails .collect-foot {
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-shadow: none;
        border-top: 0.5px solid #f0f1f5;
        font-size: 17px;
        color: #ffb148;
        line-height: 50px;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;

    }
    #collectDetails .linkList {
        color: #323232;
        font-size: 15px;
        line-height: 16px;
        box-sizing: border-box;
        border-bottom: 0.5px solid #f0f1f5;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    #collectDetails .linkList:last-child {
        border-bottom: 0.01px solid #fff;
    }
    #collectDetails #ans-content li {
        list-style-type: none !important;
    }
    #collectDetails .linkGal {
        max-height: 300px;
        padding: 0 12px;
        height: auto;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    #collectDetails .shareCont {
        padding: 0 12px;
        box-sizing: border-box;
        border-top: 0.5px solid #f0f1f5;
    }
    .rulesPlate {
        background-color: white;
        padding: 12px 0 0 0;
        font-size: 14px;
        text-align: left;
        color: #323232;
    }
    .rulesPlate .rulesGulop {
        padding-bottom: 12px;
        border-bottom: 0.5px solid #f0f1f5;
    }
    .rulesGulop span {
        vertical-align: middle;
    }
    .rulesPlate .rulesfw {
        font-size: 15px;
        color: #323232;
    }
    .rulesPlate div > span > span {
        text-align: center;
        display: inline-block;
        padding: 0 5px;
        border-radius: 20px;
        font-size: 10px;
        border: 1px solid #f0ad4e;
        margin-right: 5px;
    }
    .smCaption {
        text-align: left;
        padding: 12px 0 0 0;
    }
    .smCaption .units {
        display: flex;
        color: #323232;
        font-size: 15px;
        padding-bottom: 12px;
        border-bottom: 0.5px solid #f0f1f5;
        box-sizing: border-box;
    }
    .nounits {
        border-bottom: none !important;
    }
    .unitsTitle {
        display: inline-table;
    }
    .unitsCont {
        text-align: justify;
        max-width: 79%;
    }
    /**********自建收藏夹***********/
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
    }
    .inputgle {
        height: 35px;
        width: 84%;
        background-color: #8d8d8d;
        border-radius: 2px;
        display: inline-block;
        float: left;
        border: 0;
        vertical-align: middle;
    }
    .collect_shg .inputgle input {
        border: 0;
        float: left;
        height: 35px;
        padding: 0;
        margin: 0;
        width: 100%;
        padding-left: 12px;
        border-radius: 2px;
        outline: none;
        -webkit-appearance: none;
        box-sizing: border-box;
        font-size: 15px;
        font-family: PingFangSC-Light, sans-serif;
    }
    input[type=text] {
        -webkit-appearance: none !important;
    }
    .collect_shg .inputbtn {
        height: 35px;
        width: 13%;
        border-radius: 2px;
        display: inline-block;
        float: right;
        vertical-align: middle;
    }
    .collect_shg button {
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
    .closeInputVal {
        position: absolute;
        top: 17px;
        right: 20%;
        height: 16px;
        display: none;
    }
    /*****************************************/
    /**/

    #collectDetails .mint-cell {
        width: 100%;
    }
    /*#collectDetails .mint-cell:active {*/
    /*opacity: 0.6;*/
    /*}*/
    #collectDetails .mint-cell-value {
        height: 78px;
        width: 100%;
        display: block !important;
    }
    #collectDetails .mint-cell:last-child {
        background-size: 100% 0px;
    }
    #collectDetails .coollglobal {
        border-bottom: 0.5px solid #e3e3e3;
        box-sizing: border-box;
    }
    /**/
    #collectDetails .co-cellsm {
        width: 100%;
        height: 78px;
        font-size: 15px;
        color: #323232;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
        position: relative;
    }
    #collectDetails .co-CollMold {
        background-color: #f0ad4e;
        border-radius: 2px;
        font-size: 12px;
        color: white;
        display: inline-block;
        height: 16px;
        width: 28px;
        line-height: 16px;
        text-align: center;
        font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    #collectDetails .co-globe {
        position: absolute;
        bottom: 10px;
        width: 100%;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    #collectDetails .co-collpub, .co-globe span {
        font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
        font-size: 12px;
        color: #8d8d8d;
    }
    #collectDetails .co-collpub {
        max-width: 47%;
        height: 100%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: -2px;
    }
    #collectDetails .co-title {
        width: 100%;
        line-height: 19px;
        overflow: hidden;
        text-overflow: clip;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: absolute;
        top: 10px;

    }
    /*warning页面*/
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
        display: none;
    }
    #warning > .waringImg1 {
        height: 110px;
        width: 127.40px;
        margin: 38.2% auto 0 auto;
        background-image: url("/static/img/warning/warning3.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #warning .waringText {
        font-size: 15px;
        color: #ffb148;
        padding: 35px 0 0 0;
        text-align: center;
        margin-left: 6px;
    }
    #warning .waringBtn {
        box-shadow: none;
        color: white;
        border: 0;
        width: 90px;
        margin-top: 20px;
        height: 30px;
        background: #ffb148;
    }
    /*404*/
    #warning404 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 1);
        z-index: 3000;
        overflow: hidden;
        text-align: center;
    }
    .noInfo {
        width: 100%;
        height: 50%;
    }
    .noInfo .nocontent {
        background-image: url("/static/img/warning/warning1.png") !important;
    }
    #warning404 > .waringImg404, .noInfo .noInfoImg404 {
        height: 110px;
        width: 118.25px;
        margin: 38.2% auto 0 auto;
        background-image: url("/static/img/warning/warnin.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #warning404 > .shixiao {
        background-image: url("/static/img/warning/shixiaolianjie.png");
    }
    #warning404 > .nocontent {
        background-image: url("/static/img/warning/warning1.png");
    }
    #warning404 .waringText404, .noInfo .noInfoText {
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        color: #ffb148;
        padding: 20px 0 0 0;
        text-align: center;
    }
    #warning404 .waringBtn404 {
        box-shadow: none;
        color: white;
        border: 0;
        width: 90px;
        margin-top: 20px;
        font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
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

</style>
