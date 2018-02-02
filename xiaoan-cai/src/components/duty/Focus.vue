<template>
    <div class="focus" id="focus">
        <header class="focus-header-search">
            <button class="focus-body" @click="addFocusClick()">
                <i class="icon iconfont icon-sousuo"></i><span>搜索证券简称/代码/拼音缩写</span>
            </button>
        </header>
        <ul class="focTitle">
            <li class="focus-li focName">证券简称</li>
            <li class="focus-li focPic" @click="sort('zuiXinJia')">
                <span>现价</span>
                <i class="icon iconfont icon-arrowDown" v-show="sortKey=='zuiXinJia'" v-if="sortFlag > 0"></i>
                <i class="icon iconfont icon-jiantou" v-show="sortKey=='zuiXinJia'" v-else></i>
            </li>
            <li class="focus-li focG" @click="sort('zhangDie')">
                <span>涨跌</span>
                <i class="icon iconfont icon-arrowDown" v-show="sortKey =='zhangDie'" v-if="sortFlag > 0"></i>
                <i class="icon iconfont icon-jiantou" v-show="sortKey =='zhangDie'" v-else></i>
            </li>
            <li class="focus-li focUp" @click="sort('zhangFu')">
                <span>涨跌幅</span>
                <i class="icon iconfont icon-arrowDown" v-show="sortKey=='zhangFu'" v-if="sortFlag > 0"></i>
                <i class="icon iconfont icon-jiantou" v-show="sortKey=='zhangFu'" v-else></i>
            </li>
        </ul>
        <div class="box-scroll" ref="listDom" :style="{height: listHeight+'px'}">
            <xiaoan-loading v-show="xaloadingDom"></xiaoan-loading>
            <ul class="foclist">
                <li v-for="(list,index) in focus" class="foclistglobal">
                    <mt-cell-swipe :key="index" :right="[{
                         content: '取消关注',
                         style: {backgroundColor: '#ffb551',color: '#fff', fontSize: '16px'},
                         handler: () => off(index)
                     }]">
                        <div class="focNum focfor" @click="focfor(index)">
                            <div class="foccolor focNum0">
                                <p class="focNumNome">{{keySub(list.zhongWenJianCheng)}}</p>
                                <p class="focNumCode">
                                    <span><img class="showSH" :src="SH" v-show="(list.obj).substr(0,2)=='SH'"/></span>
                                    <span><img class="showSH" :src="SZ" v-show="(list.obj).substr(0,2)=='SZ'"/></span>
                                    <span class="focus-obj-code">{{ codeSubstr(list.obj) }}</span>
                                </p>
                            </div>
                            <div class="foccolor focNum1" :style="{color:'black'}"
                                 v-if="list.zuiXinJia == -100">--
                            </div>
                            <div class="foccolor focNum1" :style="{color:'black'}" v-else-if="list.zhangDie == 0">
                                {{list.zuiXinJia}}
                            </div>
                            <div class="foccolor focNum1" :style="{color:'#fb4319'}" v-else-if="list.zhangDie > 0">
                                {{list.zuiXinJia}}
                            </div>
                            <div class="foccolor focNum1" :style="{color:'#29da89'}" v-else-if="list.zhangDie < 0">
                                {{list.zuiXinJia}}
                            </div>
                            <div class="foccolor focNum2" :style="{color:'black'}"
                                 v-if="list.zhangDie == -100">--
                            </div>
                            <div class="foccolor focNum2" :style="{color:'black'}" v-else-if="list.zhangDie == 0">
                                {{list.zhangDie}}
                            </div>
                            <div class="foccolor focNum2" :style="{color:'#fb4319'}" v-else-if="list.zhangDie > 0">
                                {{'+'+list.zhangDie}}
                            </div>
                            <div class="foccolor focNum2" :style="{color:'#29da89'}" v-else-if="list.zhangDie < 0">
                                {{list.zhangDie}}
                            </div>
                            <div class="foccolor focNum3" :style="{color:'black'}" v-if="list.zhangFu == -100">
                                --
                            </div>
                            <div class="foccolor focNum3" :style="{color:'black'}" v-else-if="list.zhangFu == 0">
                                {{list.zhangFu+'%'}}
                            </div>
                            <div class="foccolor focNum3" :style="{color:'#fb4319'}" v-else-if="list.zhangFu > 0">
                                {{'+'+list.zhangFu+'%'}}
                            </div>
                            <div class="foccolor focNum3" :style="{color:'#29da89'}" v-else-if="list.zhangFu < 0">
                                {{list.zhangFu+'%'}}
                            </div>
                        </div>
                    </mt-cell-swipe>
                </li>
                <!--<li class="btnFoo">-->
                <!--<div class="foo-text">我是有底线的</div>-->
                <!--</li>-->
            </ul>
        </div>

        <!--没有关注显示-->
        <div id="focus-warning">
            <div class="focus-waringImg"></div>
            <div class="focus-waringText">{{waringText}}</div>
            <mt-button class="focus-waringBtn" @click="waringBin">{{waringBtn}}</mt-button>
        </div>
        <div class="law-show" v-if="GuidePages">
            <div class="GuidePagesFocus1" v-if="GuidePagesFocusShow">
                <img :src="GuidePagesFocus1" alt="">
                <div>点击按高低排序</div>
            </div>
            <div v-show="GuidePagesFocusShow2" class="focus-1">
                <img :src="GuidePagesFocus2" alt="">
            </div>
            <button class="law-show-sh" @click="lawshowsh" v-show="lawshows">知道了</button>
            <button class="law-show-sh" @click="lawshowsh2" v-show="lawshows2">知道了</button>
        </div>
        <footer class="focus-animate-footer" id="focus-animate-footer">
            <p>查看本周最新公告</p>
        </footer>
        <transition name="bounce">
            <div class="link-button" v-show="linkbtn" @click="linkAffiche">
                <i class="icon iconfont icon-gonggao1"></i>
                <p>公告</p>
            </div>
        </transition>
        <xiaoan-loading v-show="loading"></xiaoan-loading>
        <v-returnHome bottom="20%"></v-returnHome>
    </div>
</template>

<script>
    import returnHome from "../warning/returnHome.vue"
    import loading from '../warning/loading'

    export default {
        name: 'focus',
        data() {
            return {
                SH: '../../static/img/lookupTables/SH@3x.png',
                SZ: '../../static/img/lookupTables/SZ@3x.png',
                GuidePages: true,
                GuidePagesFocusShow: true,
                GuidePagesFocusShow2: false,
                GuidePagesFocusShow3: false,
                lawshows: true,
                lawshows2: false,
                lawshows3: false,
                GuidePagesFocus1: '../../static/img/Guide-pages/GuidePages-focus.png',
                GuidePagesFocus2: '../../static/img/Guide-pages/GuidePages-focus2.png',
                GuidePagesFocus3: '../../static/img/Guide-pages/GuidePages-focus3.png',
                errorCorrecting: false,
                waringBtn: '去关注',
                waringText: '你暂时还没有关注！',
                focustop: '../../static/img/personal/focus/focustop.png',
                foctop: '../../static/img/personal/focus/foctop.png',
                backs: '../../static/img/personal/focus/back.png',
                focus: [],
                user_id: '',
                counts: 0,
                changeCounts: 0,
                currentPicCounts: 0,
                sortKey: 'zhangFu', //默认值
                sortFlag: 1,///默认值，排序方式 1 or -1
                nowTime: "",
                listHeight: '',
                loading: true,
                linkbtn: false,
                xaloadingDom: true
            }
        },
        updated() {
        },
        created() {
            let userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            // userHome  // 我的关注获取用户信息判断是否填写个人信息  若是没有则跳转填写个人信息页面
            if (userId == "") {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                console.log(this.user_id);
            }
            //
            this.apiUserHome();
            //
            this.focuses(this.sortName);
        },
        mounted() {
            this.$nextTick(() => {
                //
                if (window.localStorage.getItem('GuidePagesFocus')) {
                    this.GuidePages = false;
                }
                //
                this.listHeight = document.body.clientHeight - this.$refs.listDom.offsetTop;
                console.log('12121212121', this.$refs.listDom.offsetTop);
                //
                setTimeout(() => {
                    this.loading = false;
                });
                //
                setTimeout(() => {
                    $('#focus-animate-footer').animate({bottom: -100, opacity: 0}, 1500);
                    setTimeout(() => {
                        this.linkbtn = true;
                    }, 1000);
                }, 3300);
                //

            });
            //
            clearInterval(window.timePianli);
            /*
             * todo
             * 微信分享
             */
            var adverttitle = window.document.title;
            var sharelink2 = window.location.href; // 分享链接
            var shareDesc = "";// 描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
            //
            this.timeFocus();
        },
        components: {
            "v-returnHome": returnHome,
            'xiaoan-loading': loading
        },
        methods: {
            // 点击获取最近的关注的公告
            linkAffiche() {
                this.$router.push({path: "/newaffiche"})
            },
            keySub(key) {
                key = String(key);
                key = key.replace(/\s/g, "");
                if (key.indexOf('*') > -1) {
                    if (key.length > 5) {
                        return (key.substring(0, 5) + '...');
                    }
                } else {
                    if (key.length > 4) {
                        return (key.substring(0, 4) + '...');
                    }
                }

                return key
            },
            // 点击跳转到 add_focus
            addFocusClick() {
                this.$router.push({path: "/Addfocus"});
            },
            //
            apiUserHome() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "userHome",
                    params: {}
                }).then((res) => {
                    console.log('', res, '123');
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject.realName == '' || res.data.returnObject.realName == null) {
                            this.$router.push({path: '/completeInfo'});
                        }
                    } else if (res.data.returnCode == -1) {
                        this.$toast({message: '请从新登录', position: "middle", duration: 2000});
                    }
                }).catch((err) => {
                })
            },
            //
            codeSubstr(str) {
                return str.substring(2, 8);
            },
            //
            sort(sortKey) {
                let _self = this;
                _self.sortFlag = _self.sortFlag * -1;   //切换排序方式 1 -> -1 or -1 -> 1
                _self.sortKey = sortKey; //改掉排序字段，给sortArr用
                _self.sortArr();
            },
            //
            sortArr() { //排序
                let _self = this;
                if (_self.sortFlag > 0) {
                    _self.focus.sort((a, b) => {
                        return b[_self.sortKey] - a[_self.sortKey]
                    });
                } else {
                    _self.focus.sort((a, b) => {
                        return a[_self.sortKey] - b[_self.sortKey]
                    });
                }
            },
            //
            lawshowsh() {
                this.GuidePagesFocusShow = false;
                this.GuidePagesFocusShow2 = true;
                this.lawshows = false;
                this.lawshows2 = true;
            },
            //
            lawshowsh2() {
                this.GuidePagesFocusShow2 = false;
                this.GuidePagesFocusShow3 = false;
                this.lawshows2 = false;
                this.lawshows3 = false;
                this.GuidePages = false;
                window.localStorage.setItem("GuidePagesFocus", false);

            },
            //
            waringBin() {
                this.$router.push({path: "/Addfocus"});
            },
            //
            timeFocus() {
                let _self = this;
                window.timeFocus = setInterval(() => {
                    _self.focuses();
                }, 5000);
            },
            //
            focfor(index) {
                this.$router.push({
                    path: '/afficheList',
                    query: {
                        code: this.focus[index].obj,
                        name: this.focus[index].zhongWenJianCheng
                    }
                });
            },
            // 小数点后保留两位没有两位填
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
            // 处理时间戳
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            //
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
            // 获取关注接口
            focuses() {
                this.$http({
                    method: "GET",
                    url: this.$api.host + "attention/getAttentions", /*http://192.168.52.97:8080/v1/*/
                    params: {
                        userId: this.user_id,
                    }
                }).then((res) => {
                    setTimeout(() => {
                        this.xaloadingDom = false;
                    }, 1000)
                    if (res.data.returnCode == 1) {
                        this.nowTime = res.data.returnObject.timestamp;
                        console.log('nowtime', this.nowTime)
                        let currentTime = this.formatS(res.data.returnObject.timestamp);
                        console.log(currentTime)
                        let curTime = currentTime;
                        var currentTimeArr = currentTime.split(',');
                        var curTimeArr = currentTimeArr;
                        //console.log(currentTimeArr, currentTimeArr[3])
                        // 判断时间凌晨到9点30之前停止时间函数获取股票信息
                        if (currentTimeArr[3] < 10 && currentTimeArr[3] >= 0) {
                            if (currentTimeArr[3] == 9 && currentTimeArr[4] <= 30) {
                                clearInterval(window.timeFocus);
                                clearInterval(window.timePianli)
                            } else if (currentTimeArr[3] >= 9 && currentTimeArr[4] > 30) {
                                console.log('不用清除')
                            } else {
                                clearInterval(window.timeFocus);
                                clearInterval(window.timePianli)
                            }
                        } else if (currentTimeArr[3] >= 15) {
                            clearInterval(window.timeFocus);
                            clearInterval(window.timePianli)
                        }
                        //console.log('currentTimeArr[3]', currentTimeArr[3], currentTimeArr[4])
                        this.focus = res.data.returnObject.data;
                        console.log("focus", this.focus)
                        for (var i in this.focus) {
                            console.log(this.focus[i].zhongWenJianCheng.indexOf('暂停上市'))
                            if (this.focus[i].zhongWenJianCheng.indexOf('暂停上市') > 0) {
                                this.focus[i].zhangFu = -100;
                            }
                            if (this.focus[i].shiFouTingPai == true) {
                                this.focus[i].zuiXinJia = -100;
                                this.focus[i].zhangDie = -100;
                                this.focus[i].zhangFu = -100;
                            }
                            if (this.focus[i].zuiXinJia == null) {
                                this.focus[i].zuiXinJia = -100
                            } else {
                                this.focus[i].zuiXinJia = this.toDecimal2(this.focus[i].zuiXinJia);
                            }
                            if (this.focus[i].zhangDie == null) {
                                this.focus[i].zhangDie = -100
                            } else {
                                this.focus[i].zhangDie = this.toDecimal2(this.focus[i].zhangDie);
                            }
                            if (this.focus[i].zhangFu == null) {
                                this.focus[i].zhangFu = -100
                            } else {
                                this.focus[i].zhangFu = this.toDecimal2(this.focus[i].zhangFu);
                            }
                        }
                        this.sortArr();
                    } else if (res.data.returnCode == -1) {
                        clearInterval(window.timeFocus);
                        $('#focus-warning').show();
                        this.focus = [];
                    } else {
                        console.log("focus");
                    }
                    // setTimeout(() => {
                    //     this.focuses();
                    // }, 5000)
                }).catch((err) => {
                    console.log(err);
                    setTimeout(() => {
                        this.xaloadingDom = false;
                    }, 1000)
                })
            },
            // 取消关注
            off(index) {
                this.$messagebox.confirm('确定要取消关注吗', '').then((confirm) => {
                    console.log('再次确认', confirm);
                    this.$http({
                        method: "GET",
                        url: this.$api.host + "attention/deleteAttention",
                        params: {
                            userId: this.user_id,
                            companyFullCode: this.focus[index].obj,
                        }
                    }).then((res) => {
                        if (res.data.returnCode == 1) {
                            this.focuses();
                        } else {
                            this.$toast({message: '关注失败', position: 'center', duration: 1500});
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((cancel) => {
                    console.log('取消确认', cancel);
                })
            },
        },
        destroyed: function () {
            clearInterval(window.timeFocus);
        }
    }
</script>

<style lang="scss">
    .focus {
        width: 100%;
        height: 100%;
        /*background-color: #f0f1f5;*/
        overflow: hidden;
        .focus-header-search {
            width: 100%;
            height: 48px;
            background-color: #f0f1f5;
            padding: 7.5px 12px;
            box-sizing: border-box;
            button.focus-body {
                border: none;
                border: 0;
                background-color: white;
                height: 100%;
                width: 100%;
                border-radius: 2px;
                text-align: left;
                padding: 0 10px;
                i {
                    font-size: 18px;
                    font-weight: 500;
                    color: #8d8d8d;
                    vertical-align: middle;
                }
                span {
                    font-size: 15px;
                    color: #8d8d8d;
                    padding-left: 3px;
                    vertical-align: middle;
                    display: inline-block;
                    font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
                    //  line-height: 1;
                }
            }
        }
        .focTitle {
            height: 40px;
            width: 100%;
            box-sizing: border-box;
            background-color: #ffefda;
            padding: 0 12px;
            color: #ffb148;
            display: table;
            position: relative;
            .focus-li {
                display: table-cell;
                i {
                    color: #ffb148;
                }
            }
            .focName {
                text-align: left;
                vertical-align: middle;
                box-sizing: border-box;
            }
            .imgIon {
                height: 15px;
                float: right;
                text-align: center;
                padding: 11.5px 0 0 5px;
                line-height: 40px;
            }
            .focName, .focPic, .focG, .focUp {
                width: 25%;
                font-size: 15px;
                vertical-align: middle;
                box-sizing: border-box;
            }
            .focPic, .focG {
                text-align: right;
                vertical-align: middle;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                padding-right: 15px;
                i {
                    color: #ffb148;
                }
            }
            .focUp {
                text-align: right;
                vertical-align: middle;
                box-sizing: border-box;
            }
            .icon-arrowDown, .icon-icon-jiantou {
                color: #ffb148;
            }
        }
        .box-scroll {
            position: relative;
        }
        ul.foclist {
            height: 100%; /*85.145*/
            width: 100%;
            overflow: scroll;
            border: 0 !important;
            -webkit-overflow-scrolling: touch;
            /*background-color: #f0f1f5;*/
            li.btnFoo {
                height: 50px;
                width: 100%;
                background: white;
                text-align: center;
                vertical-align: middle;
                .foo-text {
                    font-size: 14px;
                    line-height: 50px;
                    color: #aeaeae;
                }
            }
            /*li.foclistglobal:after{
                content: " ";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                border-bottom: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 100%;
                transform-origin: 0 100%;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }*/
            li.foclistglobal {
                border-bottom: 0.5px solid #e3e3e3;
                width: 100%;
                position: relative;
                box-sizing: border-box;
                height: 60px !important;
                min-height: 60px !important;
                .mint-cell {
                    height: 100% !important;
                }
                .mint-cell:last-child {
                    background-size: 100% 0;
                }
                .mint-cell-swipe {
                    .mint-cell-wrapper {
                        padding: 0 12px;
                        background-size: 120% 0.5px !important;
                        height: 100% !important;
                        .mint-cell-title {
                            width: 0 !important;
                            .mint-cell-text {
                            }
                        }
                        .mint-cell-value {
                            display: block !important;
                            width: 100% !important;
                            background-color: white !important;
                            .focNum {
                                height: 100%;
                                width: 100%;
                                font-size: 0;
                                display: table;
                                box-sizing: border-box;
                                .foccolor {
                                    display: table-cell;
                                    font-size: 15px;
                                    vertical-align: middle;
                                    .focNumNome {
                                        font-size: 15px;
                                        color: #323232;
                                        margin-bottom: 5px;
                                        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
                                        word-break: keep-all; /*不换行*/
                                        white-space: nowrap; /*不换行*/
                                        /*overflow: hidden;*/
                                        /*内容超出宽度时隐藏超出部分的内容*/
                                        /*text-overflow: ellipsis;*/
                                    }
                                    .focNumCode {
                                        font-size: 0;
                                        color: #aeaeae;
                                        margin: 0;
                                        padding: 0;
                                        text-align: left;
                                        span {
                                            vertical-align: middle;
                                            font-size: 0;
                                            line-height: 1;
                                            display: inline-block;
                                            .showSH {
                                                width: 18px;
                                                margin-right: 2px;
                                            }
                                        }
                                        .focus-obj-code {
                                            display: inline-block;
                                            line-height: 1;
                                            vertical-align: middle;
                                            font-size: 12px;
                                        }
                                    }
                                }
                                .focNum0 {
                                    overflow: hidden;
                                    width: 20%;
                                    -webkit-box-sizing: border-box;
                                    -moz-box-sizing: border-box;
                                    box-sizing: border-box;
                                }
                                .focNum .focNum1, .focNum2, .focNum3 {
                                    color: #fc7253;
                                }
                                .focNum1, .focNum2 {
                                    width: 25%;
                                    text-align: right;
                                }
                                .focNum3 {
                                    width: 30%;
                                    text-align: right;
                                }
                            }
                        }
                    }
                    .mint-cell-right {
                        .mint-cell-swipe-button {
                            line-height: 60px !important;
                            padding: 0 10px !important;
                        }
                    }
                }
            }
        }
        .focus-animate-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 1000;
            height: 50px;
            width: 100%;
            background: rgba(255, 177, 72, 0.9);
            color: white;
            line-height: 50px;
            p {
                width: 100%;
                text-align: center;
                font-size: 15px;
            }
        }
        .link-button {
            width: 45px;
            height: 45px;
            position: absolute;
            bottom: 10%;
            right: 5%;
            z-index: 10;
            text-align: center;
            padding: 5px 10px 0 10px;
            font-size: 0;
            box-sizing: border-box;
            border-radius: 50%;
            background: rgba(255, 177, 72, .65);
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
            color: #fff;
            overflow: hidden;
            i {
                color: white;
                font-weight: normal;
                font-size: 18px;
                margin-top: 5px;
            }
            p {
                font-size: 12px;
            }
        }
    }
</style>

<style scoped lang="scss">
    // *warning页面*/
    #focus-warning {
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
        > .focus-waringImg {
            height: 110px;
            width: 118.25px;
            margin: 38.2% auto 0 auto;
            background-image: url("/static/img/personal/focus/toFocus.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .focus-waringText {
            font-size: 15px;
            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            color: #ffb148;
            padding: 20px 0 0 0;
            text-align: center;
        }
        .focus-waringBtn {
            box-shadow: none;
            color: white;
            border: 0;
            width: 90px;
            margin-top: 20px;
            font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
            height: 30px;
            background: #ffb148;
        }
    }
    @media screen and (max-width: 360px) {
        /*//引入rem布局*/
        .focus .focAdd {
            bottom: 17%;
        }
    }
    .focAdd span {
        height: 50px;
        width: 50px;
        display: inline-block;
        position: relative;
    }
    /**/
    #focus .law-show {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 3200;
        .focus-1 {
            width: 100%;
            img {
                width: 50%;
                padding-top: 41%;
                float: right;
            }
        }
        .GuidePagesFocus1 {
            z-index: 200;
            position: absolute;
            padding-top: 14%;
            img {
                position: relative;
                width: 67%;
                right: 12px;
                float: right;
            }
            div {
                position: absolute;
                bottom: -25px;
                font-size: 15px;
                color: white;
                right: 31%;
            }
        }
        .law-show-sh {
            height: 32.5px;
            width: 100px;
            background-color: rgba(0, 0, 0, 0.01);
            color: #ffb148;
            font-size: 15px;
            position: absolute;
            bottom: 17%;
            left: 50%;
            margin-left: -50px;
            text-align: center;
            line-height: 32.5px;
            border: 2px dashed #ffb148;
            z-index: 1000;
        }
    }
</style>
