<template>
    <div class="newaffiche">
        <header class="focus-header-search">
            <button class="focus-body" @click="addClick()">
                <i class="icon iconfont icon-sousuo"></i><span>搜索证券简称/代码/拼音缩写</span>
            </button>
        </header>
        <div class="newaffiche-container" ref="container" :style="{height:container+'px'}">
            <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                infinite-scroll-distance="0">
                <li class="anList" v-for="(list,index) in afficheList" @click="goCount(index)">
                    <div style="width: 100%">
                        <span class="content-text" v-html="keyWord(list.title)"></span>
                        <p style="float: right">{{$const.format(list.releaseDate)}}</p>
                    </div>
                </li>
            </ul>
            <!--9yue 25日 cai 改-->
            <p v-show="infLoading" class="infinite-loading">
                <mt-spinner type="snake" v-if="allLoaded"></mt-spinner>
                <span v-if="allLoaded" style="vertical-align: middle">加载中...</span>
                <xiaoan-drop v-else></xiaoan-drop>
            </p>
        </div>
        <div id="focus-warning" v-show="focusAll">
            <div class="focus-waringImg"></div>
            <div class="focus-waringText">{{waringFocus[0]}}</div>
            <mt-button class="focus-waringBtn" @click="additFocus()">{{waringFocus[1]}}</mt-button>
        </div>
        <xiaoan-loading v-show="xaloading"></xiaoan-loading>
        <xiaoan-error v-show="xaerror"></xiaoan-error>
        <v-returnHome bottom="15%"></v-returnHome>
    </div>
</template>

<script>
    import returnHome from "../../components/warning/returnHome.vue"
    import drop from "../../components/warning/drop"
    import loading from '../../components/warning/loading'
    import error from '../../components/warning/error'

    export default {
        name: "newaffiche",
        data() {
            return {
                focusAll: false,
                waringFocus: ['没有关注公司的最新公告', '我的关注', ''],
                infLoading: true,
                allLoaded: false,
                container: '',
                loading: false,
                xaloading: true,
                xaloadingbox: true,
                afficheList: [],
                xaerror: false,
                pageNo: 1,
                pageSize: 10,
                totalPage: 0,
                timeTotal: '',
                user_id: ''
            }
        },
        components: {
            "v-returnHome": returnHome,
            "xiaoan-drop": drop,
            "xiaoan-loading": loading,
            "xiaoan-error": error
        },
        created() {
            let userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            if (userId == "") {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
            this.apiUserHome();
            if (this.$route.query.time) {
                this.timeTotal = decodeURI(this.$route.query.time);
                this.apiGetAnnouncementByAttend(this.timeTotal);
            } else {
                this.timeTotal = Date.parse(new Date())- (7*24*3600*1000);
                // time = String(time);
                // // console.log('123456', time);
                this.apiGetAnnouncementByAttend(this.timeTotal);
            }
            setTimeout(() => {
                this.xaloading = false;
            }, 1000)
        },
        mounted() {
            this.$nextTick(() => {
                this.container = document.body.clientHeight - this.$refs.container.offsetTop;
            })
            //
            let adverttitle = window.document.title;
            let sharelink2 = global.currentIp + '#/newaffiche'; // 分享链接
            let shareDesc = "";// 描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
        },
        methods: {
            additFocus() {
                this.$router.push({path: '/focus', query: {MathTime: global.timestamp}});
            },
            apiUserHome() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "userHome",
                    params: {}
                }).then((res) => {
                    // console.log('', res, '123');
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject.realName == '' || res.data.returnObject.realName == null) {
                            this.$router.push({path: '/completeInfo', query: {MathTime: global.timestamp}});
                        }
                    } else if (res.data.returnCode == -1) {
                        this.$toast({message: '请重新登录', position: "middle", duration: 2000});
                        setTimeout(() => {
                            this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                        }, 500)
                    }
                }).catch((err) => {
                })
            },
            datenow() {
                let myDate = new Date();
                myDate.getYear();        // 获取当前年份(2位)
                myDate.getFullYear();    // 获取完整的年份(4位,1970-????)
                myDate.getMonth();       // 获取当前月份(0-11,0代表1月)
                myDate.getDate();        // 获取当前日(1-31)
                myDate.getDay();         // 获取当前星期X(0-6,0代表星期天)
                myDate.getTime();        // 获取当前时间(从1970.1.1开始的毫秒数)
                myDate.getHours();       // 获取当前小时数(0-23)
                myDate.getMinutes();     // 获取当前分钟数(0-59)
                myDate.getSeconds();     // 获取当前秒数(0-59)
                myDate.getMilliseconds();    // 获取当前毫秒数(0-999)
                myDate.toLocaleDateString();     //获取当前日期
                let mytime = myDate.toLocaleTimeString();     // 获取当前时间
                myDate.toLocaleString();        // 获取日期与时间
                return (myDate.getHours() + ':' + myDate.getHours() + ':' + myDate.getSeconds());
            },
            //关键字高亮
            keyWord(str) {
                if (str.length >= 44) {
                    return str = str.substring(0, 44) + '...';
                } else {
                    return str
                }
            },
            //
            addClick() {
                this.$router.replace({path: '/addfocus', query: {inputCode: this.code, MathTime: global.timestamp}});
            },
            // link
            goCount(index) {
                this.$router.push({path: '/afficheContent', query: {id: this.afficheList[index].mainId}});
            },
            //
            apiGetAnnouncementByAttend(time) {
                // GET /disclosure/getAnnouncementByAttend
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "disclosure/getAnnouncementByAttend",
                    params: {
                        pageNum: this.pageNo,
                        pageSize: this.pageSize,
                        releaseStartDate: time
                    }
                }).then((res) => {
                    this.xaerror = false;
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject == null || res.data.returnObject.list == null || res.data.returnObject.list.length == 0) {
                            this.focusAll = true;
                        } else {
                            this.focusAll = false;
                            // this.afficheList = res.data.returnObject.list;
                            let number = res.data.returnObject.count;
                            this.totalPage = this.$array.totalPage(number, this.pageSize);
                            //控制下拉刷新
                            let rat = res.data.returnObject.list;
                            this.afficheList = this.$array.loadMore(this.afficheList, rat);
                        }
                        console.log(this.pageNo, this.totalPage);
                    }
                }).catch((err) => {
                    console.log(err);
                    // this.$toast({message: '网络异常', position: 'middle', duration: 1500});
                    this.xaerror = true;
                })
            },
            loadMore() {
                let lastValue = this.pageNo;
                if (lastValue < this.totalPage) {
                    this.loading = true;
                    this.allLoaded = true;
                } else {
                    this.loading = false;
                    this.allLoaded = false;
                }
                setTimeout(() => {
                    if (lastValue < this.totalPage) {
                        this.pageNo++;
                        this.apiGetAnnouncementByAttend(this.timeTotal);
                    } else {
                        this.allLoaded = false;
                    }
                    this.loading = false;
                    console.log(lastValue, this.loading);
                }, 1000);
            }
        }
    }
</script>

<style lang="scss">
    .newaffiche {
        height: 100%;
        width: 100%;
        overflow: hidden;
        /*background-color: #f0f1f5;*/
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
                margin-top: 20px;
                font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
                height: 30px;
                background: #ffb148;
                font-size: 15px;
            }
        }
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
                    //  line-height: 1;
                }
            }
        }
        .newaffiche-container {
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            ul.infinite-list {
                box-sizing: border-box;
                background-color: white;
                li.anList {
                    width: 100%;
                    padding: 0 12px;
                    box-sizing: border-box;
                    font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
                    font-size: 15px;
                    color: #323232;
                    letter-spacing: 0.2px;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    line-height: 19px;
                    -webkit-transition: background-color 0.02s cubic-bezier(0.645, 0.045, 0.355, 1);
                    transition: background-color 0.02s cubic-bezier(0.645, 0.045, 0.355, 1);
                    div {
                        padding: 12px 0;
                        border-bottom: 0.5px solid #e3e3e3;
                        span.content-text {
                            text-align: justify;
                        }
                        p {
                            margin: 0;
                            padding: 0;
                            display: inline-block;
                            font-size: 12px;
                            color: #ababab;
                        }
                    }
                }
                li.anList:active {
                    background-color: #f0f1f5;
                    -webkit-transition: background-color 0.02s cubic-bezier(0.645, 0.045, 0.355, 1);
                    transition: background-color 0.02s cubic-bezier(0.645, 0.045, 0.355, 1);
                    > div {
                        // border-bottom-color: #f0f1f5;
                    }
                }
            }
            .infinite-loading {
                height: 45px;
                line-height: 45px;
                text-align: center;
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
            }
        }
    }
</style>
