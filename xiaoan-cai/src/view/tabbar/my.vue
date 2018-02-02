<template>
    <transition name="bounce">
        <div class="xiaoan-my" id="my" :style="{height:nowheight+'px'}">
            <header class="perheader">
                <div class="headimg">
                    <div class="dise" @click="setManage"><img :src="userHome.headImgUrl" alt=""></div>
                </div>
                <div class="username">{{ userHome.nickname }}</div>
                <div class="alt" v-show="!Register">
                <span @click="toNumber">
                    完善个人信息，享受更多服务&nbsp;>
                </span>
                </div>
            </header>
            <ul class="percell">
                <li class="cellList" v-for="(item, index) in columnList" @click="routerLink(index)">
                    <span class="listIcon cell-link">
                        <img :src="item.imgSrc">
                    </span>
                    <span class="listTitle cell-link">
                        {{item.title}}
                        <span class="circle" v-if="item.change"></span>
                    </span>
                    <span class="myBriefs cell-link">
                        <span class="myBrief" v-show="item.version">{{ xiaoanVersion }}</span>
                        <span class="myBrief" v-show="item.rul">{{rulTime}}</span>
                        <i class="icon iconfont icon-xiangyoujiantou"></i>
                    </span>
                </li>
                <!--<li class="bottom-li-foo"></li>-->
            </ul>
            <div class="testing_shdow"></div>
            <xiaoan-loading v-show="loading"></xiaoan-loading>
        </div>
    </transition>
</template>

<script>
    import loading from '@/components/warning/loading'
    import my_baseSvg from "../../assets/icon/my_icon.js"

    export default {
        name: "My",
        data() {
            return {
                levels: 0,
                rulTime: '',
                user_Id: '',
                num: '',
                xiaoanVersion: '',
                userHome: {},
                Register: false, // 是否授权登录
                change: true,  // 显示小红点  是否有更新
                mobiles: '',
                headerTouxiang: "",// 人物头像
                results: '1',
                isLyz: false,
                lyzLink: '',// 路演中地址
                columnList: [
                    {
                        id: "manage",
                        title: "账号管理",
                        imgSrc: my_baseSvg.my[0].img,
                        change: false
                    },
                    {
                        id: "collect",
                        title: "我的收藏",
                        imgSrc: my_baseSvg.my[1].img,
                        change: false
                    },
                    {
                        id: "track",
                        title: "我的足迹",
                        imgSrc: my_baseSvg.my[2].img,
                        change: false
                    },
                    {
                        id: "focus",
                        title: "我的关注",
                        imgSrc: my_baseSvg.my[3].img,
                        change: false
                    },
                    {
                        id: "superviseList",
                        title: "我的舆情",
                        imgSrc: my_baseSvg.my[10].img,
                        change: false
                    },
                    {
                        id: "testing",
                        title: "我的测评",
                        rul: '下次测试开始时间7月10号',
                        imgSrc: my_baseSvg.my[4].img,
                        change: false
                    },
                    {
                        id: "brief",
                        title: "小安指南",
                        imgSrc: my_baseSvg.my[5].img,
                        version: '版本号',
                        change: false
                    }
                    // , {
                    //     id: "applicationList",
                    //     title: "开发票",
                    //     imgSrc: my_baseSvg.my[5].img,
                    //     change: false
                    // }
                ],
                nowheight: '',
                loading: false
            }
        },
        watch: {},
        components: {
            "xiaoan-loading": loading
        },
        //离开当前页面后
        destroyed() {
            if (this.$cookie.getCookie("userId") === undefined) {
                this.$cookie.deleteCookie("userId");
            }
        },
        beforeCreate() {
            //
            if (this.$cookie.getCookie("userId") === undefined) {
                this.$cookie.deleteCookie("userId");
            }
            this.loading = false
        },
        //页面构建前准备
        created() {
            this.xiaoanVersion = global.version;
            let user_id = this.$cookie.getCookie("userId");
            this.user_Id = user_id;
            window.localStorage.removeItem('SUBSCRIBE');
            if (user_id) {
                this.apiUserHome();
                this.Register = true;
            } else {
                this.Register = false;
                this.userHome = this.$weixin.wxAuthLink('STATE');
            }
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            //
            window.localStorage.removeItem("collectStatus");
        },
        mounted() {
            this.$nextTick(() => {
                clearInterval(window.timePianli);
            });
            //
            let adverttitle = document.title;
            let sharelink2 = window.location.href;// 分享链接
            let shareDesc = "";// 描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
        },
        methods: {
            // 获取登录信息
            apiUserHome() {
                this.$http({
                    method: 'GET',
                    url: host + "userHome",
                    params: {}
                }).then((res) => {
                    console.log("有userId", res);
                    if (res.data.returnCode == 1) {
                        this.levels = res.data.returnObject.level;
                        if (res.data.returnObject.weixinAvatar == null) {
                            this.userHome.headImgUrl = my_baseSvg.my[7].img;
                        } else {
                            this.userHome.headImgUrl = res.data.returnObject.weixinAvatar;
                        }
                        //
                        this.userHome.nickname = res.data.returnObject.userName;
                        this.mobiles = res.data.returnObject.mobile;
                        this.companycode = res.data.returnObject.companyCode;
                        this.lyzLink = res.data.returnObject.lyzUrl;
                        this.isLyz = res.data.returnObject.hasLyz;//true
                        let stockType = res.data.returnObject.stockType;
                        // 信公商学院
                        let obj1 = {id: "xiaoe-tech", title: "信公商学院", imgSrc: my_baseSvg.my[8].img, change: false};
                        this.columnList.splice(1, 0, obj1);
                        // 权限速查
                        let obj = {id: "lookupTables", title: "权限速查", imgSrc: my_baseSvg.my[6].img, change: false};
                        if (this.companycode !== '' || this.levels == 1) {
                            if (stockType == 0 || this.levels == 1) {
                                this.columnList.splice(3, 0, obj);
                            }
                        }
                        // 路演中
                        let obj2 = {id: 'luyanzhong', title: "我的IR旗舰店", imgSrc: my_baseSvg.my[9].img, change: false}
                        if (this.isLyz == true) {
                            this.columnList.splice(2, 0, obj2);
                        }
                    } else if (res.data.returnCode == -1) {
                        this.exit();
                    }
                }).catch((err) => {
                    console.error(err);
                    this.$toast({message: err.message, position: 'middle', duration: 1500});
                });
            },
            // 初始化
            initialization() {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("weixinId");
                window.localStorage.removeItem("wixAccreditCode");
                this.$cookie.deleteCookie('token');
                window.localStorage.removeItem('wx-auth');
                window.localStorage.setItem('exit', true);
                window.location.reload();
            },
            //
            exit() {
                this.$http({
                    method: 'GET',
                    url: host + "exit",
                    params: {
                        userId: this.user_Id
                    }
                }).then((res) => {
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("weixinId");
                    window.localStorage.removeItem("wixAccreditCode");
                    this.$cookie.deleteCookie('token');
                    window.localStorage.removeItem('wx-auth');
                    window.localStorage.setItem('exit', true);
                    window.location.reload();
                }).catch((err) => {
                    console.error(err);
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("weixinId");
                    window.localStorage.removeItem("wixAccreditCode");
                    this.$cookie.deleteCookie('token');
                    window.localStorage.removeItem('wx-auth');
                    window.localStorage.setItem('exit', true);
                    window.location.reload();
                })
            },
            //
            getWxInfo() {
                this.$http({
                    method: 'GET',
                    url: host + "getWxInfo",
                    params: {}
                }).then((res) => {
                    console.log('getWxInfo', res);
                    if (res.data.returnCode == -1) {
                        // window.location.href = global.wixAccredit;
                        this.$weixin.wxAuthRedirect('STATE')
                    } else {
                        this.username = res.data.returnObject.weixinNickname;
                        if (res.data.returnObject.weixinAvatar == null) {
                            this.headerTouxiang = my_baseSvg.my[7].img;
                        } else {
                            this.headerTouxiang = res.data.returnObject.weixinAvatar;
                        }
                    }
                }).catch((err) => {
                    this.headerTouxiang = my_baseSvg.my[7].img;
                    this.$toast({message: host + "getWxInfo", err, position: "middle", duration: 1500});
                    //this.$cookie.clearCookies();
                });
            },
            // 点击头像图片修改
            setManage() {
                let index = 0;
                console.log(111, this.columnList[index],);
                if (this.Register) {
                    this.$router.push({path: "/" + this.columnList[index].id, query: {MathTime: global.timestamp}});
                } else {
                    console.log(this.columnList[index]);
                    this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                }
            },
            //
            getPermissionCheckList(index) {
                this.$http({
                    methods: "GET",
                    url: host + "permission/getPermissionCheckList"
                }).then((res) => {
                    if (res.data.returnCode == -3) {
                        this.$router.push({path: "/customerTables", query: {MathTime: global.timestamp}});
                    } else {
                        this.$router.push({path: "/" + this.columnList[index].id, query: {MathTime: global.timestamp}});
                    }
                }).catch(() => {
                    this.$router.push({path: "/customerTables", query: {MathTime: global.timestamp}});
                })
            },
            //
            toNumber() {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            },
            //
            routerLink(index) {
                console.log(index, this.columnList[index]);
                if (this.Register) {
                    // true
                    if (this.columnList[index].id == 'brief') {
                        this.$router.push({path: "/brief", query: {advert_Id: '4', MathTime: global.timestamp}});
                    } else if (this.columnList[index].id == "lookupTables") {
                        if (this.levels == 1) {
                            this.$router.push({path: "/searchPower", query: {MathTime: global.timestamp}});
                        } else {
                            this.getPermissionCheckList(index);
                        }
                    } else if (this.columnList[index].id == 'luyanzhong') {
                        // console.log('跳转路演中',this.lyzLink);
                        if (this.lyzLink !== null) {
                            window.location.href = this.lyzLink;
                            this.$MTAmethod.mtaClick('Vv55tXYlcJIhB0Xm', {'drp393hmwy5gkngo': 'true'})
                        } else {
                            this.$toast({message: '链接获取失败！', position: 'middle', duration: 1500});
                        }
                    } else if (this.columnList[index].id == "xiaoe-tech") {
                        window.location.href = "https://wx006d673ce5a4a44b.h5.xiaoe-tech.com/";
                    } else {
                        this.$router.push({path: "/" + this.columnList[index].id, query: {MathTime: global.timestamp}});
                    }
                } else {
                    // false
                    if (index == 0) {
                        window.sessionStorage.setItem("refer_url", window.location.href);
                        window.sessionStorage.setItem("refer_title", window.document.title);
                    }
                    if (this.columnList[index].id == 'brief') {
                        this.$router.push({path: "/brief", query: {advert_Id: '4', MathTime: global.timestamp}});
                    } else {
                        this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    #my {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .xiaoan-my {
        .perheader {
            width: 100%;
            height: 170px;
            background-image: url("/static/img/personal/perheader@3x.png");
            background-size: 100%;
            background-repeat: no-repeat;
            padding-top: 32.5px;
            box-sizing: border-box;
            .headimg {
                width: 70px;
                height: 70px;
                margin: 0 auto;
                border-radius: 50%;
                .dise {
                    background: #ffd998;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    img {
                        width: 64px;
                        height: 64px;
                        display: block;
                        border-radius: 50%;
                    }
                }
            }
            .username {
                width: auto;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: #fff;
                font-size: 15px;
                font-family: PingFangSC-Semibold, sans-serif;
            }
            .alt {
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-family: PingFangSC-Light, sans-serif;
                a {
                    text-decoration: none;
                    color: #fff;
                }
            }
        }
        .percell {
            .cellList:active {
                background-color: #f0f1f5;
                -webkit-transition: background-color 0.07s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: background-color 0.07s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
            .cellList {
                width: 100%;
                height: 50px;
                font-size: 15px;
                color: #323232;
                padding: 0 18px 0 20px;
                box-sizing: border-box;
                border-bottom: 0.5px solid #ececec;
                display: table;
                -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                .cell-link {
                    display: table-cell;
                    vertical-align: middle;
                }
                .listIcon {
                    width: 9%;
                    img {
                        width: 15px;
                        height: 15px;
                        vertical-align: middle;
                    }
                }
                .listTitle {
                    height: 100%;
                    vertical-align: middle;
                    position: relative;
                    .circle {
                        position: absolute;
                        top: -5px;
                        right: -6px;
                        width: 9px;
                        height: 9px;
                        background: #fe543d;
                        border-radius: 50%;
                    }
                }
                .myBriefs {
                    text-align: right;
                    .myBrief {
                        font-size: 12px;
                        color: #8d8d8d;
                        margin-right: 10px;
                    }
                    .icon-xiangyoujiantou {
                        font-size: 13px;
                        font-weight: 600;
                    }
                }
            }
            .bottom-li-foo {
                width: 100%;
                height: 52px;
                box-sizing: border-box;
            }
        }
        .testing_shdow {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-color: rgba(255, 255, 255, 0.001);
            z-index: 1000;
            overflow: hidden;
            display: none;
        }
    }
</style>
