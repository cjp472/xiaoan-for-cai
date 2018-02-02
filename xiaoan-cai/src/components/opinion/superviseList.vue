<template>
    <div class="supervise-list" id="supervise-list">
        <transition name="bounce">
            <div class="guideopinion" v-show="opinionGuidePages">
                <img :src="guideopinion[0].img" alt="">
                <p>{{guideopinion[0].text}}</p>
                <button @click="guideOpinionclick(1)">{{guideopinion[0].button}}</button>
            </div>
        </transition>
        <transition name="bounce">
            <div class="guideopinion top" v-show="opinionGuidePages2">
                <img :src="guideopinion[1].img" alt="">
                <p>{{guideopinion[1].text}}</p>
                <button @click="guideOpinionclick(2)">{{guideopinion[1].button}}</button>
            </div>
        </transition>
        <!--//-->
        <div class="supervise-li" ref="headHeight">
            <header>
                <button><span>{{headTitle[0]}}</span>
                    <span class="docDom">({{projectNumber[0]}}/{{projectNumber[1]}})</span>
                </button>
                <button @click="settingClick()"><i class="icon iconfont icon-bianji"></i><span>{{headTitle[1]}}</span>
                </button>
            </header>
        </div>
        <div class="sub-swipe" ref="subSwipe" :style="{ height: scrollAll + 'px'}">
            <xa-loading v-show="loading" bgColor="rgba(255,255,255,1)"></xa-loading>
            <ul class="infinite-list">
                <li v-for="(list,index) in container">
                    <mt-cell-swipe :right="[{
                        content: '编辑',
                        style: { background: 'rgba(255,177,72,0.5)', color: '#fff' },
                        handler: () =>  contClick(index)
                        },{
                        content: '删除',
                        style: { background: '#ffb148', color: '#fff' },
                        handler: () =>  deleteed(index)
                    }]" :key="index">
                        <button class="btnop" @click="containerClick(index)"></button>
                        <p class="name">
                            <span class="name-title">
                                <span>{{list.projectName}}</span>
                            </span>
                            <span class="name-right">
                                <button class="nomoColor" v-if="list.monitor == true && list.isGather == false">{{textGlobal[7]}}</button>
                                <button
                                    v-else-if="list.monitor == true && list.isGather == true">{{textGlobal[0]}}</button>
                                <button class="nomonitor" v-else-if="list.monitor == false">{{textGlobal[6]}}</button>
                            </span>
                        </p>
                        <p class="doc">
                            <span>{{textGlobal[1]}}{{keyword(list.keywordList)}}</span>
                        </p>
                        <p class="doc">
                            <span v-if="list.notice">{{textGlobal[2]}}{{textGlobal[4]}}</span>
                            <span v-else>{{textGlobal[2]}}{{textGlobal[5]}}</span>
                            <span>{{$const.format(list.createTime)}}</span>
                        </p>
                    </mt-cell-swipe>
                </li>
                <li v-show="infLoading" class="infinite-loading">
                    <!--<mt-spinner type="snake" v-show="allLoaded"></mt-spinner>-->
                    <!--<span v-if="allLoaded" style="vertical-align: middle">{{loadingDrop[0]}}</span>-->
                    <xiaoan-drop v-if="allLoaded" :text="loadingDrop[1]"></xiaoan-drop>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import loading from '../warning/loading'
    import drop from "../warning/drop"
    import guideopinion from '../../assets/icon/Guide'

    export default {
        name: "supervise-list",
        data() {
            return {
                projectNumber: ['00', 10], // [\/xx] 新增项目上限
                infLoading: false,
                allLoaded: true,
                loadingDrop: ['加载中', '您的账户已无法创建更多项目'],
                headTitle: ['我的项目', '新增项目'],
                textGlobal: ['监测中', '关键词：', '微信提醒：', '创建时间：', '已开启', '未开启', '未监测', '数据采集中'],
                container: [],
                scrollAll: '',
                loading: true,
                AllSource: {},
                twoTime: 3600000,
                isGather: false,
                timestamp: 0,
                user_id: '',
                guideopinion: guideopinion.opinionGuide,
                opinionGuidePages: false,
                opinionGuidePages2: false
            }
        },
        components: {
            'xa-loading': loading,
            "xiaoan-drop": drop
        },
        beforeCreate() {
            let userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            if (userId == "") {
                //this.loadingDis = true;
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
        },
        created() {
            // 如果需要增加区分外部和内部用户 打开下行注释
            this.userHome();
            //
            this.timestamp = Date.parse(new Date()); // 当前时间
            //
            this.getAllProject();
            //
            this.getAllSource();
            // 页面引导显示
            this.guideStatus();
        },
        mounted() {
            this.$nextTick(() => {
                this.scrollAll = (document.documentElement.clientHeight - this.$refs.headHeight.clientHeight - 1.5);
            });
            let adverttitle = "我的舆情";
            let sharelink2 = decodeURI(window.location.href);// 分享链接
            let shareDesc = ""; // 描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
            console.log('2133321313', this.guideopinion);
        },
        methods: {
            //
            guideStatus() {
                if (window.localStorage.getItem('opinionGuidePages-list') == 'true') {
                    this.opinionGuidePages = false;
                    this.opinionGuidePages2 = false;
                } else {
                    this.opinionGuidePages = true;
                    this.opinionGuidePages2 = false;
                }
            },
            //
            userHome() {
                this.$http({
                    method: 'GET',
                    url: host + "userHome",
                    params: {}
                }).then((res) => {
                    console.log('', res, '123');
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject !== null) {
                            let level = res.data.returnObject.level;
                            if (level == 0) {
                                // 外部用户
                                this.projectNumber[1] = '03';
                                console.log('this.maxInputList', this.maxInputList);
                            }
                        }
                    } else if (res.data.returnCode == -1) {
                        this.$toast({message: '请从新登录', position: "middle", duration: 2000});
                    }
                }).catch((err) => {
                    console.error(err);
                })
            },
            //
            keyword(array) {
                let arr = [];
                for (let i in array) {
                    arr.push(array[i].keywordName);
                }
                let key = [], keylen = 0;
                if (arr.length < 4) {
                    keylen = 5
                } else {
                    keylen = 3
                }
                for (let j in arr) {
                    if (arr[j].length > keylen) {
                        key.push(arr[j].substring(0, keylen) + '...');
                    } else {
                        key.push(arr[j]);
                    }
                }
                console.log(key);
                return (key.join("，"))
            },
            // 删除
            deleteed(index) {
                this.$messagebox.confirm('删除后数据不保留，确定要删除吗？', '').then((res) => {
                    this.$http({
                        method: 'POST',
                        url: host + "sentiment/deleteProject",
                        params: {
                            projectId: this.container[index].id
                        }
                    }).then((res) => {
                        if (res.data.returnCode == 1) {
                            this.loading = true;
                            setTimeout(() => {
                                this.$toast({message: '删除成功', position: "middle", duration: 2000});
                            }, 1000);
                            this.getAllProject();
                            setTimeout(() => {
                                this.$nextTick(() => {
                                    this.loading = false;
                                })
                            }, 300)
                        } else {

                        }
                    }).catch((err) => {
                        console.error(err);
                    })
                }).catch((err) => {
                    console.error(err);
                })
            },
            //
            getAllSource() {
                this.$http({
                    method: 'GET',
                    url: host + "sentiment/getAllSource",
                    params: {}
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        let ljson = res.data.returnObject;
                        let tjson = window.JSON.parse(ljson);
                        console.log(tjson);
                        this.AllSource = tjson;
                    }
                }).catch((err) => {
                    console.error(err);
                })
            },
            //
            containerClick(index) {
                console.log(this.container[index]);
                if (this.container[index].isGather == false) {
                    this.$toast({message: '正在采集该项目数据，请稍后再试', position: "middle", duration: 2000});
                } else {
                    this.$router.push({
                        path: '/opinion',
                        query: {id: this.container[index].id, MathTime: global.timestamp}
                    });
                }
            },
            //
            getAllProject() {
                this.loading = true;
                this.$http({
                    method: 'GET',
                    url: host + "sentiment/getAllProject",
                    params: {}
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.loading = false;
                            })
                        }, 300);
                        let container = res.data.returnObject;
                        for (let i in container) {
                            container[i].isGather = false;
                            if (parseInt(this.timestamp) - parseInt(container[i].createTime) >= this.twoTime) {
                                container[i].isGather = true;
                            }
                            console.log('12313131', parseInt(this.timestamp) - parseInt(container[i].createTime));
                        }
                        this.container = container;
                        if (container == null || container == [] || container.length == 0) {
                            this.projectNumber[0] == '00';
                        } else {
                            this.projectNumber[0] = this.$const.add0(container.length);
                            if (container.length >= this.projectNumber[1]) {
                                this.infLoading = true;
                                this.allLoaded = true;
                            }
                        }
                        console.log(this.container);
                    } else {
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.$router.replace({
                                    path: '/supervise',
                                    query: {add: '1', MathTime: global.timestamp}
                                });
                            })
                        }, 300)
                    }
                }).catch((err) => {
                    console.error(err);
                })
            },
            // 编辑
            contClick(index) {
                this.$router.push({
                    path: '/supervise',
                    query: {add: '0', id: this.container[index].id, MathTime: global.timestamp}
                });
            },
            // 新增
            settingClick() {
                if (this.container.length >= this.projectNumber[1]) {
                    this.$toast({message: '新增项目已达上限，无法创建新项目', position: "middle", duration: 2000});
                } else {
                    this.$router.push({path: '/supervise', query: {add: 1, MathTime: global.timestamp}});
                }
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
                    window.localStorage.setItem('opinionGuidePages-list', 'true');
                }
            }
        }
    }
</script>

<style lang="scss">
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
    .supervise-list {

    }
    #supervise-list {
        background-color: #f0f1f5;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .guideopinion.top {
            img {
                top: 1%;
                height: 280px;
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
                height: 230px;
                position: absolute;
                right: 0;
                top: 15%;
            }
            p {
                position: absolute;
                right: 18%;
                top: 55%;
                // background-color: ;
                color: white;
                font-size: 15px;
            }
            button {
                position: absolute;
                bottom: 20%;
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
        .supervise-li {
            background-color: white;
            padding: 0 12px;
            width: 100%;
            height: 48px;
            box-sizing: border-box;
            border-bottom: 0.5px solid #e3e3e3;
            header {
                box-sizing: border-box;
                font-size: 0;
                height: 100%;
                width: 100%;
                display: table;
                button {
                    font-size: 15px;
                    display: table-cell;
                    vertical-align: middle;
                    border: 0;
                    background: #fff;
                    width: 50%;
                    height: 100%;
                    color: #ffb148;
                    font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
                    .icon-bianji {
                        font-size: 18px;
                        vertical-align: middle;
                        color: #ffb148;
                        padding-right: 5px;
                    }
                    .bj {
                        font-size: 0;
                        display: inline-block;
                        background: url("/static/img/opinion/bj-opiniono@3x.png") no-repeat center center;
                        background-size: contain;
                        height: 16px;
                        width: 16px;
                        margin-right: 4px;

                    }
                    span {
                        vertical-align: middle;
                        line-height: 1;
                        display: inline-block;
                    }
                    .docDom {
                        font-size: 12px;
                        color: #aeaeae;
                        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
                    }
                }
                button:last-child {
                    text-align: right;
                    font-size: 12px;
                }
                button:first-child {
                    font-size: 15px;
                    text-align: left;
                }
            }
        }
        .sub-swipe {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            ul.infinite-list {
                padding-top: 15px;
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                .infinite-loading {
                    text-align: center;
                    height: 50px;
                    line-height: 50px;
                    margin: 0;
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
                }
                li {
                    padding: 0;
                    border-radius: 2px;
                    margin-bottom: 10px;
                    list-style-type: none;
                    background-color: transparent;
                    position: relative;
                    .mint-cell, .mint-cell-swipe {
                        background-color: transparent; // 透明
                        .mint-cell-wrapper {
                            .mint-cell-title {
                                .mint-cell-text {
                                }
                            }
                            .mint-cell-value {
                                position: relative;
                                box-sizing: border-box;
                                padding: 10px 10px 10px 10px;
                                .btnop {
                                    border: 0;
                                    background-color: rgba(0, 0, 0, 0);
                                    height: 100%;
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    z-index: 200;
                                }
                                .click {
                                    border: 0;
                                    position: absolute;
                                    right: 0;
                                    bottom: 0;
                                    height: 40px;
                                    width: 60px;
                                    background-color: rgba(0, 0, 0, 0);
                                    z-index: 200;
                                }
                                .name {
                                    width: 100%;
                                    font-size: 15px;
                                    color: #323232;
                                    display: table;
                                    margin-bottom: 5px;
                                    box-sizing: border-box;
                                    line-height: 15px;
                                    margin-top: 2px;
                                    .name-title {
                                        text-align: left;
                                        vertical-align: bottom;
                                        width: 65%;
                                        word-break: break-all;
                                        word-wrap: break-word;
                                        span {
                                            width: 100%;
                                            line-height: 1;
                                            display: inline-block;
                                            overflow: hidden;
                                            //  white-space: nowrap;
                                            text-overflow: ellipsis;
                                        }
                                    }
                                    .nomoColor {
                                        background-color: rgba(255, 177, 72, 0.75);
                                    }
                                    .nomonitor {
                                        background-color: #8d8d8d;
                                    }
                                    span {
                                        display: table-cell;
                                        width: 50%;
                                        button {
                                            border: 0;
                                            background: #90b8f4;
                                            height: 100%;
                                            padding: 0 3px;
                                            color: white;
                                            border-radius: 2px;
                                        }
                                    }
                                    .name-right {
                                        text-align: right;
                                    }
                                }
                                .doc {
                                    display: table;
                                    width: 100%;
                                    font-size: 12px;
                                    color: #8d8d8d;
                                    position: relative;
                                    margin-bottom: 3px;
                                    span {
                                        display: table-cell;
                                        width: 50%;
                                        vertical-align: middle;
                                        .bj {
                                            font-size: 0;
                                            display: inline-block;
                                            background: url("/static/img/opinion/bj-opinion@3x.png") no-repeat center center;
                                            background-size: contain;
                                            height: 16px;
                                            width: 16px;
                                            vertical-align: middle;
                                        }
                                    }

                                    span:last-child {
                                        text-align: right;
                                        font-size: 12px;
                                    }
                                    span:first-child {
                                        text-align: left;
                                    }
                                }
                                .doc:last-child {
                                    margin: 0
                                }
                            }
                        }
                        .mint-cell-left {
                            height: 0;
                            width: 0;
                        }
                        .mint-cell-right {
                            .mint-cell-swipe-buttongroup {
                                display: table;
                                .mint-cell-swipe-button {
                                    vertical-align: middle;
                                    display: table-cell;
                                    font-size: 17px;
                                    // background-color: #ffb148 !important;
                                    justify-content: center;
                                    float: none;
                                    line-height: 1 !important;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>