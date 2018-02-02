<template>
    <div ref="wrapper" class="opinion" id="opinion" :class="{opinionScroll: middleShow}">
        <transition name="bounce">
            <div class="guideopinion" v-show="opinionGuidePages">
                <img :src="guideopinion[2].img" alt="">
                <p>{{guideopinion[2].text}}</p>
                <button @click="guideOpinionclick(1)">{{guideopinion[2].button}}</button>
            </div>
        </transition>
        <header class="head">
            <div class="label">
                <button class="btnOne"> <!--@click="fetchClick(0)"-->
                    <span>{{keySub(AllProject.projectName)}}</span>
                    <!--<i class="icon iconfont icon-xiangxiajiantou" :class="{trarm:column}"></i>-->
                    <!--<span class="flip">{{codeName[1]}}</span>-->
                </button>
                <button @click="routeClick()">
                    <i class="icon iconfont icon-bianji"></i>
                    <span>{{codeName[2]}}</span>
                </button>
            </div>
        </header>
        <transition name="bounce">
            <div v-show="middleShow" class="op-middle" @click="fetchClick(2)"></div>
        </transition>
        <div class="op-sub">
            <button class="" v-for="list in opinionNav" type="button">
                <div>
                    <p v-if="list.name == 0" style="color: #8d8d8d">--</p>
                    <p v-else>{{list.name}}</p>
                    <label>{{list.type}}</label>
                </div>
            </button>
        </div>
        <div class="op-line-pie">
            <div class="op-line">
                <div class="opinion-l">
                    <button v-for="(list,index) in opinionLine" :class="{isActive:list.isActive}"
                            @click="lineClick(index)">{{list.name}}
                    </button>
                </div>
                <div class="opinion-pie-global" v-show="pieLine">
                    <div class="pie-global-btn" v-show="pieLine">
                        <button v-for="(list, index) in opinionTime.pei" :class="{isPitch: list.isSelected}"
                                @click="opinionTimeClick(true,index)">
                            {{list.name}}
                        </button>
                    </div>
                    <div class="pie-line-shadow" v-show="pieLineShadow">
                        <div>{{warning[0]}}</div>
                    </div>
                    <div ref="styleWidth" :style="{'width':newWidth}" class="opinion-pie" id="opinion-pie">
                    </div>
                </div>
                <div class="opinion-line-global" v-show="!pieLine">
                    <div class="opinion-line-year">2017-2018</div>
                    <div class="pie-global-btn" v-show="!pieLine">
                        <button v-for="(list, index) in opinionTime.line" :class="{isPitch: list.isSelected}"
                                @click="opinionTimeClick(false,index)">
                            {{list.name}}
                        </button>
                    </div>

                    <div class="pie-line-shadow" v-show="pieLineShadow1">
                        <div>{{warning[0]}}</div>
                    </div>
                    <div ref="styleWidth1" :style="{'width':newWidth}" class="opinion-line" id="opinion-line"></div>
                </div>
            </div>
        </div>
        <div class="op-sreen">
            <transition name="bounce">
                <div class="guideopinion top" v-show="opinionGuidePages2">
                    <img :src="guideopinion[3].img" alt="" ref="imgHei" :style="{top:guideimg+'px'}">
                    <p :style="{top: geideText}">{{guideopinion[3].text}}</p>
                    <button :style="{bottom:topBtn}" @click="guideOpinionclick(2)">{{guideopinion[3].button}}
                    </button>
                </div>
            </transition>
            <div class="sreen-cont" ref="offsetSreen">
                <button class="nextsreen" :style="{width:nextsreenWidth+'%'}">
                    <mt-navbar v-model="sreenSelected">
                        <mt-tab-item :key="index" :id="list.id" v-for="(list, index) in sreenBox"
                                     v-if="list.isShow">{{list.name}}
                        </mt-tab-item>
                    </mt-navbar>
                </button>
                <!--<button @click="fetchClick(1)">
                    <span class="filler">{{codeName[4]}}</span>
                    <i class="icon iconfont icon-xiangxiajiantou" :class="{trarm:sreenCol}"></i>
                    <span>{{codeName[1]}}</span>
                    </button>-->
                <!--<button @click="fetchClick(3)">-->
                <!--<span>{{codeName[3]}}</span>-->
                <!--<i class="icon iconfont icon-xiangxiajiantou"></i>-->
                <!--</button>-->
            </div>

            <transition name="fold">
                <div class="column" v-show="sreenSouce">
                    <i class="column-right"></i>
                    <!-- 栏目选择项 -->
                    <button v-for="(list,index) in  AllSource" @click="AllSourceClick(index)">
                        {{ list.name }}
                    </button>
                </div>
            </transition>
            <transition name="fold">
                <div class="column" v-show="sreenCol">
                    <i></i>
                    <!-- 栏目选择项 -->
                    <button v-for="(list,index) in AllProject.keywordList" @click="AllProjectClick(index)">
                        {{list.keywordName}}
                    </button>
                </div>
            </transition>
        </div>
        <div class="op-list" v-if="sreenSelected == 0">
            <ul class="infinite-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading"
                infinite-scroll-distance="0">
                <li v-for="(list,index) in sreenBox[0].list" @click="opinionListClick(index)">
                    <div class="li-div-item">
                        <p>{{list.title}}</p>
                        <p class="last-p">
                            <span>{{list.publish}}&ensp;</span>
                            <b>{{datastr(list.publish_time)}}</b>
                        </p>
                    </div>
                </li>
            </ul>
            <p v-show="infLoading" class="infinite-loading">
                <strong v-show="allLoaded">
                    <mt-spinner type="snake"></mt-spinner>
                    <span style="vertical-align: middle">加载中...</span>
                </strong>
                <strong v-show="!allLoaded">
                    <xiaoan-drop :text="warning[1]"></xiaoan-drop>
                </strong>
            </p>
        </div>
        <div class="op-list" v-if="sreenSelected == 1">
            <ul class="infinite-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading"
                infinite-scroll-distance="0">
                <li v-for="(list,index) in sreenBox[1].list" @click="opinionAfficheClick(index)">
                    <div class="li-div-item">
                        <p>{{list.title}}</p>
                        <p class="last-p">{{$const.format(list.releaseDate)}}</p>
                    </div>
                </li>
            </ul>
            <p v-show="infLoading" class="infinite-loading">
                <strong v-show="allLoaded">
                    <mt-spinner type="snake"></mt-spinner>
                    <span style="vertical-align: middle">加载中...</span>
                </strong>
                <strong v-show="!allLoaded">
                    <xiaoan-drop :text="warning[1]"></xiaoan-drop>
                </strong>
            </p>
        </div>
        <div class="op-list" v-if="sreenSelected == 2">
            <ul class="infinite-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading"
                infinite-scroll-distance="0">
                <li v-for="(list,index) in sreenBox[2].list" @click="opinionReportClick(index)">
                    <div class="li-div-item">
                        <p>{{list.subject}}</p>
                        <p class="last-p">
                            <span>{{list.securitiesCompany}}</span>
                            <span v-show="list.securitiesCompany">|</span>
                            <span>{{list.summary}}</span>
                            <span v-show="list.summary">|</span>
                            <span>{{$const.format(list.sentDate)}}</span>
                        </p>
                    </div>
                </li>
            </ul>
            <p v-show="infLoading" class="infinite-loading">
                <strong v-show="allLoaded">
                    <mt-spinner type="snake"></mt-spinner>
                    <span style="vertical-align: middle">加载中...</span>
                </strong>
                <strong v-show="!allLoaded">
                    <xiaoan-drop :text="warning[1]"></xiaoan-drop>
                </strong>
            </p>
        </div>
        <transition name="bounce">
            <div v-show="returnTop" class="returnTop" @click="returnTo()">
                <i class="icon iconfont icon-xiangshangjiantou"></i>
                <p>顶部</p>
            </div>
        </transition>
        <xiaoan-loading v-show="loadingShadow" bgColor="rgba(255,255,255,1)"></xiaoan-loading>
    </div>
</template>

<script>
    import echarts from "echarts"
    import drop from "../warning/drop"
    import loading from '../warning/loading'
    import guideopinion from '../../assets/icon/Guide'

    export default {
        name: 'opinion',
        data() {
            return {
                nextsreenWidth: 45,
                guideimg: '',
                topBtn: '10%',
                geideText: '',
                loadingShadow: true,
                sreenBox: [
                    {isShow: true, name: '舆情', id: 0, list: [], totalPage: 0, pageNo: 1, pageSize: 10}
                ],
                isKeyWordName: false,
                sreenSelected: 0,
                codeName: ['', '切换', '项目管理', '所有分类', ''],
                warning: ['暂无数据', '没有更多了'],
                column: false,
                opinionNav: [
                    {'name': 0, type: '今日最新舆情'},
                    {'name': 0, type: '本月最新舆情'}
                ],
                returnTop: false,
                sreenSouce: false,
                pieLineShadow: true,
                pieLineShadow1: false,
                sreenCol: false,
                middleShow: false,
                opinionLine: [
                    {id: 0, name: '舆情分布', title: '', type: '', list: [], isActive: true},
                    {id: 1, name: '媒体舆情走势', title: '', type: '', list: [], isActive: false}
                ],
                pieLine: true,
                newWidth: '',
                opinionList: [],
                loading: false,
                allLoaded: true,
                infLoading: true,
                container: '',
                keywordId: '', // 当前选择的关键字的id
                AllProject: {}, // 当前选中的数据
                keywordName: '',
                opinionTime: {
                    pei: [
                        {name: '按日', list: [], isSelected: false},
                        {name: '按周', list: [], isSelected: true},
                        {name: '按月', list: [], isSelected: false}
                    ],
                    line: [
                        {name: '前7天', list: [], isSelected: true},
                        {name: '前30天', list: [], isSelected: false}
                    ]
                },
                guideopinion: guideopinion.opinionGuide,
                opinionGuidePages: true,
                opinionGuidePages2: false,
                AllSource: [
                    {id: '', name: '所有分类'},
                ], // 所有分类
                timestamp: 0,
                myCompanyInfo: {}
            }
        },
        components: {
            "xiaoan-drop": drop,
            "xiaoan-loading": loading,
        },
        watch: {
            'sreenSelected': function () {
                // 通过监听 选项 来还原加载中状态。。。
                // 处理数据较少时不显示
                if (this.sreenBox[this.sreenSelected].totalPage == this.sreenBox[this.sreenSelected].pageNo) {
                    this.infLoading = false;
                    this.allLoaded = false;
                } else {
                    this.infLoading = true;
                    this.allLoaded = true;
                }
                if (this.sreenBox[this.sreenSelected].list == [] || this.sreenBox[this.sreenSelected].list.length == 0) {
                    // 没有数据时
                    this.infLoading = false;
                }
                console.log(this.sreenSelected);
            },
            '$route': function () {
                setTimeout(() => {
                    //this.loadingShadow = false;
                }, 1000);
            },
            'keywordId': function () {

            }
        },
        methods: {
            keySub(key) {
                key = String(key);
                if (key.length > 7) {
                    return (key.substring(0, 7) + '...');
                }
                return key
            },
            guideOpinionclick(index) {
                console.log(index);
            },
            // 返回顶部
            returnTo() {
                console.log(1122121212);
                $('#opinion').animate({scrollTop: 0});
            },
            // 初始执行方法
            apiGetCompanyInfoByName(string) {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "common/getCompanyInfoByName",
                    params: {
                        name: string
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject == null || res.data.returnObject == '') {
                            this.sreenBox = [{
                                isShow: true,
                                name: '舆情',
                                id: 0,
                                list: [],
                                totalPage: 0,
                                pageNo: 1,
                                pageSize: 10
                            }];
                            this.nextsreenWidth = 15;
                        } else {
                            this.sreenBox = [
                                {isShow: true, name: '舆情', id: 0, list: [], totalPage: 0, pageNo: 1, pageSize: 10},
                                {isShow: true, name: '公告', id: 1, list: [], totalPage: 0, pageNo: 1, pageSize: 10},
                                {isShow: true, name: '研报', id: 2, list: [], totalPage: 0, pageNo: 1, pageSize: 10}
                            ];
                            this.myCompanyInfo = res.data.returnObject;
                            this.apiAnnouncement(this.myCompanyInfo.code);
                            this.apiReport(this.myCompanyInfo.code);
                        }
                    }

                }).catch((err) => {
                    console.error(err);
                    // this.$toast({message: '网络连接错误', position: "middle", duration: 3000});
                });
                ///
                this.$nextTick(() => {
                    this.getSentimentById();
                })
                setTimeout(() => {
                    this.loadingShadow = false;
                }, 1200);
            },
            //搜索公告
            apiAnnouncement(code) {
                // 公告搜索
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "disclosure/search",
                    params: {
                        pageSize: this.sreenBox[this.sreenSelected].pageSize,
                        pageNum: this.sreenBox[this.sreenSelected].pageNo,
                        companyCode: code
                    }
                }).then((res) => {
                    //  this.sreenBox[1].list = res.data.returnObject.list;
                    if (res.data.returnCode == 1) {
                        //根据总条数 判断有多少页
                        if (res.data.returnObject == null || res.data.returnObject == '') {
                            this.sreenBox[1].isShow = false;
                        } else {
                            let number = res.data.returnObject.count;
                            this.sreenBox[1].totalPage = this.$array.totalPage(number, this.sreenBox[1].pageSize);
                            //控制下拉刷新
                            let rat = res.data.returnObject.list;
                            this.sreenBox[1].list = this.$array.loadMore(this.sreenBox[1].list, rat);
                            this.infLoading = true;
                            // console.log('====>', this.sreenBox[0].list, this.shuliang);
                        }
                    }
                    console.log(this.sreenBox);
                }).catch((err) => {
                    console.error(err);
                })
            },
            // 研报搜索
            apiReport(keyWord) {
                //report/searchReports?keyWord=600436&pageSize=10&pageNum=1&token=9b8bedcf141340e1a6074fd25345376f
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "report/searchReports",
                    params: {
                        pageSize: this.sreenBox[this.sreenSelected].pageSize,
                        pageNum: this.sreenBox[this.sreenSelected].pageNo,
                        keyWord: keyWord
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject == null || res.data.returnObject == '') {
                            // false 没有研报
                            // this.infLoading = false;
                            console.log('1233455345apiReport', false);
                            this.sreenBox[2].isShow = false;
                        } else {
                            // true 有研报
                            // this.sreenBox[2].list = res.data.returnObject;
                            let number = res.data.total;
                            this.sreenBox[2].totalPage = this.$array.totalPage(number, this.sreenBox[2].pageSize);
                            //控制下拉刷新
                            let rat = res.data.returnObject;
                            this.sreenBox[2].list = this.$array.loadMore(this.sreenBox[2].list, rat);
                            this.infLoading = true;
                            if (number <= 10) {
                                this.infLoading = false;
                                this.allLoaded = false;
                            }
                            console.log(number, this.sreenBox[2].totalPage, 12345);
                            // console.log('====>', this.sreenBox[0].list, this.shuliang);
                        }
                    }
                }).catch((err) => {
                    console.error(err);
                })
            },
            // 点击 切换 按日 按周 按月 前7天 前30天
            opinionTimeClick(num, index) {
                if (num) {
                    // num = true
                    for (let i in this.opinionTime.pei) {
                        this.opinionTime.pei[i].isSelected = false;
                    }
                    this.opinionTime.pei[index].isSelected = true;
                    this.opinionPie(this.opinionTime.pei[index].list);
                    if (this.opinionTime.pei[index].list == [] || this.opinionTime.pei[index].list.length == 0) {
                        this.pieLineShadow = true;
                    } else {
                        this.pieLineShadow = false;
                    }
                    console.log(this.opinionTime);
                } else {
                    // num = false;
                    for (let i in this.opinionTime.line) {
                        this.opinionTime.line[i].isSelected = false;
                    }
                    this.opinionTime.line[index].isSelected = true;
                    console.log('1234554', this.opinionTime.line[index].list);
                    this.opinionLines(this.opinionTime.line[index].list);
                }
            },
            // 筛选 （暂无用）
            AllSourceClick(index) {
                // console.log(this.AllSource[index]);
                this.$router.replace({
                    path: '',
                    query: {
                        id: this.$route.query.id,
                        source: this.AllSource[index].id,
                        keyWord: this.$route.query.keyWord
                    }
                });
                this.pageNo = 1;
                this.opinionList = [];
                // this.getSentimentById();
                //this.loadingShadow = true;
                setTimeout(() => {
                    this.codeName[3] = this.AllSource[index].name;
                    //this.loadingShadow = false;
                    this.sreenSouce = false;
                    this.middleShow = false;
                }, 1000);
                this.opinionTimeClick(1);
            },
            // 项目名 切换 （暂无用）
            AllProjectClick(index) {
                // console.log(this.AllProject.keywordList[index]);
                this.$router.replace({
                    path: '',
                    query: {
                        id: this.$route.query.id,
                        source: this.$route.query.source,
                        keyWord: this.AllProject.keywordList[index].id
                    }
                });
                this.pageNo = 1;
                this.opinionList = [];
                //this.loadingShadow = true;
                setTimeout(() => {
                    this.codeName[4] = this.AllProject.keywordList[index].keywordName
                    //this.loadingShadow = false;
                    this.sreenCol = false;
                    this.middleShow = false;
                }, 1000);
                this.opinionTimeClick(1);
            },
            // 处理 时间
            datastr(str) {
                let st = '';
                if (str == null || str == '') {
                    st = ''
                } else {
                    if (str.length > 0) {
                        if (str.indexOf('T') > -1) {
                            st = str.split('T')[0];
                        }
                    }
                }
                return (st);
            },
            // 选择项目
            contaClick(index) {
                // console.log(this.container[index]);
                if (this.container[index].isGather == false) {
                    this.column = false;
                    this.middleShow = false;
                    this.$toast({message: '正在采集该项目数据，请稍后再试', position: "middle", duration: 3000});
                } else {
                    this.$router.replace({
                        path: '',
                        query: {
                            id: this.container[index].id,
                            source: this.AllSource[0].id,
                            keyWord: this.container[index].keywordList[0].id
                        }
                    });
                    this.lineClick(0);
                    this.column = false;
                    this.middleShow = false;
                    this.AllSourceClick(0);
                    this.opinionTimeClick(1); // 选择项目是数据状态初始化
                }
            },
            // 点击列表
            opinionListClick(index) {
                window.location.href = this.sreenBox[0].list[index].url;
            },
            // 公告获取跳转
            opinionAfficheClick(index) {
                console.log(this.sreenBox[1].list[index]);
                this.$router.push({path: '/afficheContent', query: {id: this.sreenBox[1].list[index].mainId}});
            },
            // 研报跳转
            opinionReportClick(index) {
                console.log(this.sreenBox[2].list[index]);
                this.$router.push({
                    path: '/detailReport',
                    query: {id: this.sreenBox[2].list[index].id, MathTime: global.timestamp}
                });
            },
            // 折线图的数据
            apiSummaryProject(date) {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "sentiment/summaryProject",
                    params: {
                        projectId: this.$route.query.id,
                        days: date
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        this.opinionTime.line[1].list = this.summaryProjectDom(res.data.returnObject);
                    }
                    console.log('123', res);
                }).catch((err) => {
                    console.error(err);
                })
            },
            // 获取项目
            getAllProject() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "sentiment/getAllProject",
                    params: {}
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        let container = res.data.returnObject;
                        let defaultProject = {};
                        for (let i in container) {
                            if (container[i].id == this.$route.query.id) {
                                defaultProject = container[i];
                            }
                        }
                        this.AllProject = defaultProject;
                        this.apiGetCompanyInfoByName(defaultProject.keywordList[0].keywordName);
                        //
                        console.log('32424324324', defaultProject, container);
                    }
                }).catch((err) => {
                    console.error(err);
                })
            },
            // 分类
            getAllSource() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "sentiment/getAllSource",
                    params: {}
                }).then((res) => {
                    // console.log(res);
                    if (res.data.returnCode == 1) {
                        let ljson = res.data.returnObject;
                        let tjson = window.JSON.parse(ljson);
                        let sjson = [];
                        for (let i in tjson.source) {
                            let ass = '';
                            if (tjson.source[i] == 'baidu.com') {
                                ass = '百度';
                            } else if (tjson.source[i] == 'so.com') {
                                ass = '360';
                            }
                            sjson.push({id: tjson.source[i], name: ass});
                        }
                        // console.log(sjson);
                        this.AllSource = this.AllSource.concat(sjson);
                        if (this.$route.query.source == '') {

                        } else {
                            for (let i in this.AllSource) {
                                if (this.AllSource[i].id == this.$route.query.source) {
                                    this.codeName[3] = this.AllSource[i].name;
                                }
                            }
                        }
                        // console.log(this.AllSource);
                    }
                }).catch((err) => {
                    //  alert(err);
                    console.error(err);
                })
            },
            // 获取项目详情
            summarySourceDom(obj) {
                // 处理饼图数据
                this.opinionNav[0].name = obj.msg.today; // 取日数据
                this.opinionNav[1].name = obj.msg.month; // 取月当中数据

                if (obj == null || obj == '') {
                    this.$toast({message: '未搜索到数据，建议您更换项目名或关键词再试！', position: "middle", duration: 3000});
                } else {
                    let dayS = [], weekS = [], monthS = [];
                    let monthSou = obj.msg.statistic.month; // 月
                    let weekSou = obj.msg.statistic.week;  // 周
                    let daySou = obj.msg.statistic.day;  // 天
                    // 饼图日
                    for (let i in daySou) {
                        dayS.push({value: daySou[i].count, name: daySou[i].name});
                    }
                    // 饼图月
                    for (let i in monthSou) {
                        monthS.push({value: monthSou[i].count, name: monthSou[i].name});
                    }
                    // 饼图周
                    for (let i in weekSou) {
                        let weekTo = 0;
                        for (let j in weekSou[i].data) {
                            weekTo += weekSou[i].data[j].count;
                        }
                        // 增加 过滤（为零的数据）
                        if (weekTo != 0) {
                            weekS.push({value: weekTo, name: weekSou[i].name});
                        }
                    }
                    console.log('===============>>>==', weekS);
                    this.opinionTime.pei[0].list = dayS;
                    this.opinionTime.pei[1].list = weekS;
                    this.opinionTime.pei[2].list = monthS;
                    this.opinionPie(this.opinionTime.pei[1].list); // 饼图
                    // debugger
                    if (this.opinionTime.pei[1].list.length == 0) {
                        this.pieLineShadow = true;
                    } else {
                        this.pieLineShadow = false;
                    }
                }
            },
            //
            summaryProjectDom(obj) {
                // 处理折线图 数据
                let week = [], date = []; // 遍历
                for (let i in obj.msg.week) {
                    week.push({name: i, sort: Date.parse(new Date(i.replace(/-/g, "\/"))), value: obj.msg.week[i]});
                }
                // 排序
                week.sort((a, b) => {
                    return a.sort - b.sort;
                });
                // 取出 日期的年
                let year = [];
                for (let i in week) {
                    year.push(week[i].name.split('-')[0]);
                }
                //console.log(year);
                // 判断数组的值是否相等
                function test(arr) {
                    return arr.reduce((o, item) => (o.result = o.result && item === o.prev, o.prev = item, o), {
                        result: true,
                        prev: arr[0]
                    }).result
                }

                let month = [], myyear = [];
                for (let i in week) {
                    month.push(
                        {name: (week[i].name.split('-')[1] + '.' + week[i].name.split('-')[2]), value: week[i].value}
                    );
                    myyear.push({name: week[i].name.replace(/-/g, '.'), value: week[i].value})
                }
                //console.log('myyear', month, myyear);
                return month;
            },
            //
            detailsDom(obj) {
                // 处理内容数据
                if (obj == null || obj == undefined) {
                    this.$toast({message: '暂无相关关键字舆情', position: "middle", duration: 2000});
                } else {
                    //根据总条数 判断有多少页
                    let number = obj.total;
                    this.sreenBox[0].totalPage = this.$array.totalPage(number, this.sreenBox[0].pageSize);
                    //控制下拉刷新
                    let rat = obj.msg.data;
                    this.sreenBox[0].list = this.$array.loadMore(this.sreenBox[0].list, rat);
                    this.infLoading = true;
                }
            },
            // 根据项目名 来获取舆情
            getSentimentById() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "sentiment/getSentimentById",
                    params: {
                        projectId: this.$route.query.id,
                        pageSize: this.sreenBox[this.sreenSelected].pageSize,
                        pageNo: this.sreenBox[this.sreenSelected].pageNo
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        //
                        let details = res.data.returnObject.details;
                        //  处理内容 function
                        this.detailsDom(details);
                        //
                        let summaryProject = res.data.returnObject.summaryProject;
                        // 处理折线图 数据
                        this.opinionTime.line[0].list = this.summaryProjectDom(summaryProject);
                        //
                        let summarySource = res.data.returnObject.summarySource;
                        // 处理饼图数据
                        this.summarySourceDom(summarySource);
                    } else if (res.data.returnCode == -1) {
                        this.$toast({message: '未搜索到数据，建议您更换项目名或关键词再试！', position: "middle", duration: 3000});
                        //this.loadingShadow = true;
                        this.allLoaded = false;
                        this.infLoading = false;
                    } else {
                        // this.$router.replace({path: '/superviseList', query: {MathTime: global.timestamp}});
                    }
                }).catch((err) => {
                    console.error(err);
                    //  this.$toast({message: '网络连接错误', position: "middle", duration: 3000});
                    // alert(err);
                })
            },
            // 点击项目管理
            routeClick() {
                this.$router.push({path: '/superviseList', query: {MathTime: global.timestamp}});
            },
            // 筛选分类（暂无用）
            fetchClick(index) {
                if (index == 0) {
                    this.column === true ? this.column = false : this.column = true;
                    this.middleShow = this.column;
                } else if (index == 1) {
                    this.sreenCol === true ? this.sreenCol = false : this.sreenCol = true;
                    this.middleShow = this.sreenCol;
                } else if (index == 3) {
                    this.sreenSouce === true ? this.sreenSouce = false : this.sreenSouce = true;
                    this.middleShow = this.sreenSouce;
                } else if (index == 2) {
                    this.column = false;
                    this.middleShow = false;
                    this.sreenSouce = false;
                    this.sreenCol = false;
                }
                // console.log(index);
            },
            // 切换 饼图 和 折线图
            lineClick(index) {
                // console.log(this.opinionLine[index]);
                for (let i in this.opinionLine) {
                    this.opinionLine[i].isActive = false;
                }
                this.opinionLine[index].isActive = true;
                if (index == 0) {
                    this.pieLine = true;

                } else {
                    this.pieLine = false;
                    this.$nextTick(() => {
                        this.opinionTimeClick(false, 0);
                    })
                }
            },
            // 饼图
            opinionPie(dataNode) {
                let myChart = echarts.init(document.getElementById('opinion-pie'));
                let lineColor = ['#f9f9f9', '#8d8d8d', 'rgba(0,0,0,0)', '#c5c5c5'];
                let dataName = [], dataValue = [];
                for (let i in dataNode) {
                    dataName.push(dataNode[i].name);
                }
                for (let i in dataNode) {
                    dataValue.push({value: dataNode[i].value, name: dataNode[i].name});
                }
                // // console.log('dataNode', dataName, dataNode);
                let option = {
                    backgroundColor: lineColor[0],
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        selectedMode: false,
                        data: dataName,
                        orient: 'horizontal',
                        pageButtonItemGap: 0,
                        textStyle: {
                            fontSize: 12,
                            color: '#8d8d8d'
                        },
                        itemWidth: 10,
                        itemHeight: 10
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data: dataValue,
                        color: [
                            '#90c4f5',
                            '#e36f4b',
                            '#c87aec',
                            '#ffe26f',
                            '#ffbb48',
                            '#5ec995',
                            '#ffb8f1',
                            '#878687'
                        ],
                        // roseType: 'radius',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    color: lineColor[1]
                                },
                                formatter: function (param) {
                                    // console.log('1234567890', param.percent, Math.round(param.percent));
                                    return param.percent.toFixed(2) + '%';
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    width: 1,
                                    color: lineColor[3],
                                    fontSize: 5
                                },
                                textStyle: {
                                    color: lineColor[1],
                                    fontSize: 5
                                },
                                // smooth: 1,
                                /*length: 4,
                                length2: 10*/
                            }
                        },
                        itemStyle: {
                            normal: {
                                show: false,
                                shadowBlur: 200,
                                shadowColor: lineColor[2]
                            }
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }],

                };
                myChart.setOption(option, true);
            },
            // 折线图
            opinionLines(arr) {
                let myChart1 = echarts.init(document.getElementById('opinion-line'));
                let color = ['#f0f1f5', '#8d8d8d', '#f9f9f9'];
                let dataArray = arr;
                let dataName = [], dataValue = [];
                for (let i in dataArray) {
                    dataName.push(dataArray[i].name);
                    dataValue.push(dataArray[i].value)
                }
                let yuping = ['2017-2018']
                let option = {
                    backgroundColor: color[2],
                    color: [
                        '#90c4f5',
                        '#e36f4b',
                        '#c87aec',
                        '#ffe26f',
                        '#ffbb48',
                        '#5ec995',
                        '#ffb8f1',
                        '#878687'
                    ],
                    /* tooltip: {
                         trigger: 'axis'
                     },*/
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        textStyle: {
                            color: '#8d8d8d',
                        },
                        // data: yuping,
                        selectedMode: false
                    },
                    grid: {
                        left: 5,
                        right: 25,
                        top: 55,
                        bottom: 25,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: color[1]
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            // interval: 0,
                            rotate: 50,
                            margin: 10,
                            textStyle: {
                                color: color[1]
                            },
                        },
                        boundaryGap: false,
                        data: dataName
                    },
                    yAxis: {
                        type: 'value',
                        minInterval: 1, // 保持 y轴正整数
                        axisLine: {
                            lineStyle: {
                                color: color[1]
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: color[1]
                            }
                        },
                    },
                    series: [{
                        name: yuping[0],
                        type: 'line',
                        symbolSize: 3,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1,//折线宽度
                                }
                            }
                        },
                        markPoint: {
                            symbolSize: 36,
                            data: [{
                                type: 'max',
                                name: '最大值',
                                symbolSize: 36
                            }, {
                                type: 'min',
                                name: '最小值',
                                symbolSize: 36
                            }]
                        },
                        data: dataValue
                    }]
                };
                myChart1.setOption(option, true);
            },
            // 上拉加载
            loadMore() {
                let lastValue = this.sreenBox[this.sreenSelected].pageNo;
                if (lastValue < this.sreenBox[this.sreenSelected].totalPage) {
                    this.loading = true;
                    this.allLoaded = true;
                } else {
                    this.loading = false;
                    this.allLoaded = false;
                }
                console.log(this.sreenBox, this.sreenSelected);
                console.log('1', lastValue, this.sreenBox[this.sreenSelected].totalPage);
                setTimeout(() => {
                    console.log(2, lastValue, this.sreenBox[this.sreenSelected].totalPage);
                    if (lastValue < this.sreenBox[this.sreenSelected].totalPage) {
                        console.log(3);
                        this.sreenBox[this.sreenSelected].pageNo += 1;
                        if (this.sreenSelected == 0) {
                            this.getSentimentById();
                        } else if (this.sreenSelected == 1) {
                            console.log(123);
                            this.apiAnnouncement(this.myCompanyInfo.code);
                        } else if (this.sreenSelected == 2) {
                            this.apiReport(this.myCompanyInfo.code);
                        }
                        console.log("4");
                    } else {
                        console.log(5);
                        this.allLoaded = false;
                    }
                    this.loading = false;
                }, 1300);
            },
            //
            //
            //
            guideOpinionclick(index) {
                console.log(123);
                //
                if (index == 1) {
                    this.opinionGuidePages = false;
                    this.opinionGuidePages2 = true;
                }
                if (index == 2) {
                    this.opinionGuidePages2 = false
                }
                if (this.opinionGuidePages2) {
                    // true
                } else {
                    // false
                    window.localStorage.setItem('opinionGuidePages-detail', 'true');
                }
            },
            guideStatus() {
                if (window.localStorage.getItem('opinionGuidePages-detail') == 'true') {
                    this.opinionGuidePages = false;
                    this.opinionGuidePages2 = false;
                } else {
                    this.opinionGuidePages = true;
                    this.opinionGuidePages2 = false;
                }
            },
        },
        // 离开当前页面后
        destroyed() {
        },
        // 页面加载完成后调用updated方法
        updated() {
            // console.log('123', this.$refs.offsetSreen.offsetTop);
            // console.log('123', this.$refs.imgHei.clientHeight);
            if (this.opinionGuidePages2) {
                if (this.$const.userAgent().android) {
                    this.guideimg = this.$refs.offsetSreen.offsetTop - this.$refs.imgHei.clientHeight + this.$refs.offsetSreen.clientHeight;
                    this.topBtn = '3%';
                    this.geideText = this.$refs.imgHei.offsetTop + 'px';
                }
            }
        },
        beforeCreate() {
            let userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            if (userId == "") {
                // this.loadingDis = true;
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
        },
        created() {
            this.timestamp = Date.parse(new Date());
            this.$nextTick(() => {
                this.getAllProject();
                this.apiSummaryProject(30);
            });
            this.guideStatus();
        },
        mounted() {
            // this.$http({
            //     method: 'GET',
            //     url: host + "userHome",
            //     params: {
            //         token: '9b8bedcf141340e1a6074fd25345376f'
            //     }
            // }).then((res) => {
            //     console.log(res);
            // }).catch((err) => {
            //
            // })
            this.newWidth = this.$refs.styleWidth.getBoundingClientRect().width;
            this.$nextTick(() => {
                this.$refs.wrapper.addEventListener('scroll', (e) => {
                    e.stopPropagation();
                    let isScrollTop = this.$refs.wrapper.scrollTop;
                    // console.log(isScrollTop);
                    if (isScrollTop > 300) {
                        this.returnTop = true;
                    } else if (isScrollTop <= 300) {
                        this.returnTop = false;
                    }
                });


            });
            let adverttitle = "";
            let sharelink2 = global.currentIp + '#/law';// 分享链接
            let shareDesc = ""; // 描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
        }
    }
</script>

<style lang="scss">
    .infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        strong {
            font-weight: normal;
        }
    }
    .snake {
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
    .fold-enter-active {
        animation: fold-in .3s;
    }
    .fold-leave-active {
        animation: fold-in .3s reverse;
    }
    @keyframes fold-in {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
            z-index: 2000;
        }
    }
    .bounce-enter-active {
        animation: bounce-in .3s;
    }
    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }
    @-moz-keyframes bounce-in {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    @-webkit-keyframes bounce-in {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    @-o-keyframes bounce-in {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    @keyframes bounce-in {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    .opinionScroll {
        overflow: hidden !important;
    }
    .opinion {
        width: 100%;
        height: 100%;
        background: white;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        padding: 12px 0 0 0;
        .guideopinion.top {
            img {
                top: 44%;
                left: 1px;
                height: 215px;
            }
            p {
                left: 27%;
                top: 44.5%;
                right: inherit;
            }
        }
        .guideopinion {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 5000;
            img {
                height: 260px;
                position: absolute;
                right: 12px;
                top: 4%;
            }
            p {
                position: absolute;
                right: 16%;
                top: 48%;
                // background-color: ;
                color: white;
                font-size: 15px;
            }
            button {
                position: absolute;
                bottom: 10%;
                left: 50%;
                transform: translateX(-50%);
                height: 32.5px;
                width: 100px;
                background-color: rgba(0, 0, 0, 0.01);
                color: #ffb148;
                border-radius: 2px;
                font-size: 15px;
                text-align: center;
                line-height: 1;
                border: 1.5px dashed #ffb148;
            }
        }
        .mint-spinner-snake {
            height: 14px !important;
            width: 14px !important;
            border: 2px solid transparent;
            border-top-color: rgb(252, 199, 127) !important;
            border-left-color: rgb(252, 199, 127) !important;
            border-bottom-color: rgb(252, 199, 127) !important;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
        }
        .returnTop {
            width: 45px;
            height: 45px;
            position: fixed;
            bottom: 75px;
            right: 25px;
            z-index: 10;
            text-align: center;
            padding: 5px 10px 0 10px;
            font-size: 0;
            box-sizing: border-box;
            border-radius: 50%;
            background: rgba(0, 0, 0, .44);
            color: #fff;
            overflow: hidden;
            i {
                color: white;
                font-weight: 600;
                font-size: 18px;
                margin-top: 5px;
            }
            p {
                font-size: 10px;
                line-height: 1;
            }
        }
        .head {
            position: relative;
            padding: 0 0;
            height: 60px;
            width: 100%;
            padding: 0 12px;
            box-sizing: border-box;

            .label {
                display: table;
                width: 100%;
                height: 100%;
                font-size: 0;
                box-sizing: border-box;
                border-radius: 2px;
                -moz-box-shadow: 0px 0px 15px rgba(255, 177, 72, 0.4);
                -webkit-box-shadow: 0px 0px 15px rgba(255, 177, 72, 0.4);
                box-shadow: 0px 0px 15px rgba(255, 177, 72, 0.4);
                background: -webkit-linear-gradient(left, #ffc548, #ffb148); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(right, #ffc548, #ffb148); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(right, #ffc548, #ffb148); /* Firefox 3.6 - 15 */
                background: linear-gradient(to right, #ffc548, #ffb148); /* 标准的语法 */
                button {
                    font-size: 16px;
                    /*width: 50%;*/
                    height: 100%;
                    display: table-cell;
                    border: none;
                    border: 0;
                    background: transparent;
                    vertical-align: middle;
                    color: white;
                    i {
                        //  color: white;
                        font-size: 12px;
                        // font-weight: 900;
                        //  display: inline-block;
                    }
                }
                button:last-child {
                    text-align: right;
                    padding-right: 12px;
                    width: 28%;
                    span {
                        vertical-align: middle;
                        font-size: 12px;
                        display: inline-block;
                        line-height: 1;
                    }
                    .icon-bianji {
                        font-size: 18px;
                        vertical-align: middle;
                        color: white;
                    }
                    .bj {
                        font-size: 0;
                        display: inline-block;
                        background: url("/static/img/opinion/bj-opinionw@3x.png") no-repeat center center;
                        background-size: contain;
                        height: 16px;
                        width: 16px;
                        vertical-align: middle;
                    }
                }
                .btnOne {
                    width: 72%;
                    box-sizing: border-box;
                    font-size: 22px;
                    text-align: left;
                    padding-left: 12px;
                    i {
                        vertical-align: middle;
                        transition: transform .3s, -webkit-transform .3s;
                        transform: rotate(0deg);
                    }
                    .trarm {
                        transition: transform .3s, -webkit-transform .3s;
                        transform: rotate(180deg);
                    }
                    .flip {
                        font-size: 12px;
                        vertical-align: middle;
                    }
                }
            }
            .column {
                position: absolute;
                background: white;
                top: 60px;
                left: 0;
                width: 100%;
                height: 60px;
                font-size: 0;
                box-sizing: border-box;
                transition: transform .3s, -webkit-transform .3s;
                transform: rotateY(0);
                z-index: 1200;
                i {
                    position: absolute;
                    top: -5px;
                    left: 25%;
                }
                i:before {
                    content: '';
                    height: 0;
                    width: 0;
                    display: block;
                    border: 6px transparent solid;
                    border-left-width: 5px;
                    border-right-width: 5px;
                    border-top-width: 0;
                    border-bottom-color: rgba(255, 255, 255, 1);
                }
                button {
                    width: 50%;
                    height: 100%;
                    color: #8d8d8d;
                    font-size: 15px;
                    text-align: center;
                    vertical-align: middle;
                    border: 0;
                    background-color: white;
                }
            }
        }
        .op-middle {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.25);
            z-index: 1000;
        }
        .op-sub {
            font-size: 0;
            display: table;
            height: 55px;
            width: 100%;
            margin-top: 10px;
            button {
                border: 0;
                background: transparent;
                width: 50%;
                height: 100%;
                display: table-cell;
                color: #8d8d8d;
                div {
                    border-right: 0.5px solid #E3E3E3;
                    p {
                        font-size: 25px;
                        color: #ffb148;
                    }
                    label {
                        font-size: 12px;
                    }
                }
            }
            button:last-child {
                div {
                    border-right: 0;
                }
            }
        }
        .op-line-pie {
            padding: 0 12px;
            box-sizing: border-box;
            .op-line {
                border: 0.5px solid #e3e3e3;
                margin-top: 10px;
                width: 100%;
                background-color: #f9f9f9;
                .opinion-l {
                    width: 100%;
                    font-size: 0;
                    height: 40px;
                    display: table;
                    box-sizing: border-box;
                    .isActive {
                        color: #ffb148;
                        background-color: #f9f9f9;
                        -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
                        color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                        transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
                        color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    }
                    button {
                        display: table-cell;
                        width: 50%;
                        text-align: center;
                        height: 100%;
                        font-size: 13px;
                        border: 0;
                        color: #8d8d8d;
                        background: #edecec;
                        -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
                        color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                        transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
                        color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    }
                }
                .opinion-pie-global, .opinion-line-global {
                    position: relative;
                    .opinion-line-year {
                        position: absolute;
                        bottom: 2px;
                        left: 10px;
                        font-size: 12px;
                        color: white;
                        z-index: 100;
                        background-color: #90c4f5;
                        border-radius: 2px;
                        padding: 0 2px;
                        display: none;

                    }
                    .pie-line-shadow {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 300;
                        background-color: #f9f9f9;
                        margin: auto;
                        text-align: center;
                        vertical-align: middle;
                        div {
                            margin-top: 30%;
                            font-size: 15px;
                            color: #8d8d8d;
                        }
                    }
                    .pie-global-btn {
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        font-size: 0;
                        display: table;
                        z-index: 310;
                        button {
                            font-size: 11px;
                            display: table-cell;
                            box-sizing: border-box;
                            color: white;
                            height: 18px;
                            padding: 0 5px;
                            border-radius: 10px;
                            background-color: #cecece;
                            border: none;
                            margin-left: 10px;
                            vertical-align: middle;
                            text-align: center;
                        }
                        .isPitch {
                            background-color: rgba(255, 177, 72, 0.8);
                        }
                    }
                    .opinion-pie {
                        width: 100%;
                        height: 250px;
                        background: white;
                        position: relative;
                    }
                }
                .opinion-line {
                    width: 100%;
                    height: 250px;
                    background: white;
                    position: relative;
                }
            }
        }
        .op-sreen {
            height: auto;
            box-sizing: border-box;
            // position: relative;
            padding: 0 12px;
            .sreen-cont {
                width: 100%;
                height: 48px;
                font-size: 0;
                border-bottom: 0.5px solid #e3e3e3;
                display: flex;
                .nextsreen {
                    width: 45%;
                    .mint-navbar {
                        height: 100%;
                        .mint-tab-item {
                            display: inline-block;
                            flex: none;
                            margin-right: 18px;
                            padding: 16px 0 12px 0;
                            -webkit-transition: border-bottom-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                            transition: border-bottom-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                            .mint-tab-item-label {
                                font-size: 15px;
                            }
                        }
                        .is-selected {
                            border-bottom: 2px solid #ffb148;
                            color: #ffb148;
                            font-family: PingFangSC-Medium, sans-serif;
                            margin-bottom: 0;
                            -webkit-transition: border-bottom-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                            transition: border-bottom-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                        }
                    }
                }
                button {
                    //  flex: 1;
                    height: 100%;
                    display: table-cell;
                    vertical-align: middle;
                    font-size: 15px;
                    border: 0;
                    background: transparent;
                    color: #8d8d8d;
                    i {
                        /*color: #ffb148;*/
                        font-size: 12px;
                        font-weight: bold;
                    }

                    span {
                        font-size: 12px;
                    }
                    .filler {
                        font-size: 15px;
                        color: #323232;
                    }
                }
                button:first-child {
                    text-align: left;
                    i {
                        display: inline-block;
                        vertical-align: middle;
                        transition: transform .3s, -webkit-transform .3s;
                        transform: rotate(0deg);
                    }
                    .trarm {
                        transition: transform .3s, -webkit-transform .3s;
                        transform: rotate(180deg);
                    }
                }
                button:last-child {
                    text-align: right;
                }
            }
            .column {
                position: absolute;
                background: white;
                top: 44px;
                left: 0;
                width: 100%;
                height: 60px;
                font-size: 0;
                box-sizing: border-box;
                transition: transform .3s, -webkit-transform .3s;
                transform: rotateY(0);
                z-index: 1200;
                display: flex;
                i {
                    position: absolute;
                    top: 0;
                    left: 25%;
                    height: 0;
                }
                .column-right {
                    left: initial;
                    right: 25%;
                }
                i:before {
                    position: relative;
                    top: -5px;
                    left: 25%;
                    content: '';
                    height: 0;
                    width: 0;
                    display: block;
                    border: 6px transparent solid;
                    border-left-width: 5px;
                    border-right-width: 5px;
                    border-top-width: 0;
                    border-bottom-color: rgba(255, 255, 255, 1);
                }
                button {
                    flex: 1;
                    border: 0;
                    background-color: white;
                    height: 100%;
                    color: #8d8d8d;
                    font-size: 15px;
                    text-align: center;
                    vertical-align: middle;
                }
            }
        }
        .op-list {
            ul {
                list-style-type: none;
                li:active {
                    background-color: #f0f1f5;
                    -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                li {
                    padding: 0 12px;
                    list-style-type: none;
                    -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    .li-div-item {
                        width: 100%;
                        border-bottom: 0.5px solid #E3E3E3;
                        .lists-item {
                            width: 100%;
                            padding: 12px 0;
                            box-sizing: border-box;
                            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
                            font-size: 14px;
                            color: #323232;
                            letter-spacing: 0.2px;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            line-height: 19px;
                            text-align: justify;
                            .affichedate {
                                float: right;
                                color: #aeaeae;
                                font-size: 12px;
                            }
                        }
                        p {
                            font-size: 14px;
                            color: #323232;
                            span {
                                font-size: 12px;
                            }
                            b {
                                font-size: 12px;
                            }

                        }
                        p:first-child {
                            padding-top: 10px;
                        }
                        .last-p {
                            padding-bottom: 10px;
                            color: #aeaeae;
                            * {
                                color: #aeaeae;
                            }
                        }
                        b {
                            font-weight: normal;
                        }
                    }
                }
            }
        }
    }
</style>
