<template>
    <transition name="bounce">
        <div class="law" id="law">
            <div class="law-scroll">
                <div class="logo">
                    <img v-lazy="bgImg" alt="">
                </div>
                <div class="search" @click="searchLaw">
                    <div class="searchVal">搜索法规名称</div>
                </div>
                <div class="law-slo">
                    <div>董秘智能移动工具，触手可及</div>
                </div>
                <ul class="link" ref="linkDom">
                    <li class="linkitem" v-for="(list,index) in linkItem" @click="routerLink(index)">
                        <div><img v-lazy="list.icon" alt="">
                            <p>{{list.name}}</p></div>
                        <img v-show="list.new" v-lazy="newIcon" alt="new" id="newTip">
                    </li>
                </ul>
                <!--// cai for  12.19-->
                <div class="law-advertisement-img" @click="advertisementClick()">
                    <img :src="advertisement" alt="">
                </div>
            </div>
            <div class="law-show" v-show="GuidePages">
                <div ref="guideIDom" class="GuidePages" :style="{top:guideStyle.top}">
                    <div class="GuidePage">点击查看最新法规</div>
                    <img :src="GuidePagesLow" alt=""/>
                </div>
                <button class="law-show-sh" @click="lawshowsh()">知道了</button>
            </div>
            <xiaoan-error v-show="error"></xiaoan-error>
            <xiaoan-warning v-show="warning.show" :message="warning.text" :imgSrc="warning.img"
                            :isShowBtn="warning.isShowBtn"
                            @click="goFocus"></xiaoan-warning>
        </div>
    </transition>
</template>
<script>
    import law_baseSvg from "@/assets/icon/law_icon"
    import error from "@/components/warning/error"
    import warning from "@/components/warning/warning";

    export default {
        name: "Law",
        data() {
            return {
                // advertisement:'/static/img/myYear/1451513134064_.pic_hd.jpg', //广告图
                advertisement: 'http://an-announcement.oss-cn-shanghai.aliyuncs.com/advertImage/main.jpg', //广告图
                warning: {
                    show: false,
                    text: '点击查看最新法规',
                    img: '../../static/img/report/noReportInfo.png',
                    isShowBtn: true
                },
                GuidePages: true,
                GuidePagesLow: '../../static/img/Guide-pages/guidepages.png',
                bgImg: law_baseSvg.law[0].img,
                collectImg: law_baseSvg.law[1].img,
                footImg: law_baseSvg.law[3].img,
                roadShowImg: law_baseSvg.law[7].img,
                yanbaoImg: law_baseSvg.law[9].img,
                newIcon: law_baseSvg.law[8].img,
                yuqinImg: law_baseSvg.law[11].img,
                isOnload: true,
                file: "",
                error: false,
                disk: ['collect', 'track'],
                linkItem: [
                    {id: 'collect', name: '新规', link: '/newrules', icon: law_baseSvg.law[2].img, new: false},
                    {id: 'focus', name: '精选', link: '/ads', icon: law_baseSvg.law[5].img, new: false},
                    // {id: 'track', name: '模考', link: '/testing', icon: law_baseSvg.law[10].img, new: false},
                    {id: 'opinion', name: '舆情', link: '/superviseList', icon: law_baseSvg.law[11].img, new: true},
                    {id: 'xiaoetong', name: '学院', link: 'xiaoetong', icon: law_baseSvg.law[6].img, new: false}
                ],
                guideStyle: {top: ''}
            }
        },
        watch: {},
        components: {
            'xiaoan-error': error,
            'xiaoan-warning': warning,
        },
        computed: {},
        // 对应getters.技术中的msg
        created() {
            window.document.title = "信公小安";
            //
            if (window.localStorage.getItem('lawGuidePages')) {
                this.GuidePages = false;
            } else {
                this.GuidePages = true;
            }
            //每次打开页面只执行一次。
            this.$nextTick(() => {
                let local = ['guizeIdStatus', 'value2', 'marketIdStatus', 'value0',
                    'adsActive', 'fawenIdStatus', 'value1', 'titleIME', 'contentIME',
                    'keyIME', 'colorBtn', 'BtnMany', 'DateStartEnd', 'timeIdStatus'];
                this.$storage.localStorageRemove(local);
            });
        },
        mounted() {
            this.$nextTick(() => {
                // console.log(this.$refs.linkDom.offsetTop, this.$refs.linkDom.clientHeight);
                // this.guideStyle.top = this.$refs.linkDom.offsetTop - (this.$refs.guideIDom.clientHeight / 2) + 'px';
            });
            //
            this.$weixin.wxshare('信公小安-董秘智能移动工具', '', '', global.shareImg1, true);
        },
        methods: {
            goFocus() {
                console.log(123456);
            },
            //
            routerLink(index) {
                if (this.linkItem[index].id == 'xiaoetong') {
                    window.location.href = global.xiaoetongUrl;
                } else {
                    this.$router.push({path: this.linkItem[index].link, query: {MathTime: global.timestamp}});
                }
            },
            // 点机首页下的banner跳转
            advertisementClick() {
                // this.$router.push({path: '/myYear', query: {MathTime: global.timestamp}});
                // this.$MTAmethod.mtaClick('u9BeM4VzCNww3aTf', {'g5j6paha7p2su67p': "true"})
                // location.href = 'http://www.zhongchou.com/deal-show/id-648216';
                location.href = 'https://xiaoan.in-hope.cn';
            },
            //
            lawshowsh() {
                window.localStorage.setItem('lawGuidePages', false);
                this.GuidePages = false;
            },
            //
            searchLaw() {
                this.$router.push({path: '/search', query: {MathTime: global.timestamp}});
            }
        }
    }
</script>
<style lang="scss">
    #law {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: white;
        .law-scroll {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            // padding-bottom: 50px;
            box-sizing: border-box;
            .logo {
                width: 100%;
                height: 235px;
                padding: 64px 0 25px 0;
                box-sizing: border-box;
                img {
                    display: block;
                    height: 100%;
                    padding-left: 25px;
                }
            }
            .search {
                width: 100%;
                height: 45px;
                padding: 0 25px;
                box-sizing: border-box;
                position: relative;
                .searchVal {
                    height: 43px;
                    border: 1px solid #cbcbcb;
                    color: #cbcbcb;
                    border-radius: 2px;
                    line-height: 43px;
                    padding-left: 15px;
                    font-size: 15px;
                }
            }
            .law-slo {
                font-size: 12px;
                color: #e3e3e3;
                font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
                padding: 0 24px;
                display: none;
            }

            .link {
                width: 80%;
                /*height: 100px;*/
                font-size: 0;
                margin: 0 auto;
                padding-top: 53px;
                box-sizing: border-box;
                display: flex;
                .linkitem {
                    flex: 1; /* 精选栏目 */
                    height: 100%;
                    display: inline-block;
                    text-decoration: none;
                    position: relative;
                    img, .aa img {
                        display: block;
                        height: 25px;
                        margin: 0 auto 10px;
                        overflow: hidden;
                    }
                    #newTip {
                        height: 14px;
                        position: absolute;
                        top: -14px;
                        right: 2px;
                        width: auto;
                    }
                    p {
                        margin: 0;
                        width: 100%;
                        font-size: 13px;
                        color: #b1b1b1;
                        text-align: center;
                    }
                }
                .adsCircle {
                    width: 20px; /*20px diamond*/
                    height: 20px;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    z-index: -4;
                    top: 0;
                }
                .ads .adsCircle {
                    -webkit-animation-name: orangellowPulse;
                    /* -webkit-animation-duration: 4s;*/
                    -webkit-animation-duration: 3s;
                    -webkit-animation-iteration-count: infinite;
                }
                @-webkit-keyframes orangellowPulse {
                    from {
                        background-color: #fff;
                        -webkit-box-shadow: 0 0 10px #ffff00;
                        background-size: 150%
                    }
                    50% {
                        background-color: #fff;
                        -webkit-box-shadow: 0 0 40px #ffff00;
                        background-size: 200%
                    }
                    to {
                        background-color: #fff;
                        -webkit-box-shadow: 0 0 10px #ffff00;
                        background-size: 250%
                    }
                }
            }
            .law-advertisement-img {
                width: 100%;
                box-sizing: border-box;
                padding: 10px 20px 0 20px;
                img {
                    width: 100%;
                    box-sizing: border-box;
                }
            }
        }
        .law-show {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.75);
            z-index: 2000;
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
            .GuidePages {
                position: absolute;
                top: 26%;
                left: 10%;
                z-index: 2507;
            }
            .GuidePage {
                box-sizing: border-box;
                position: absolute;
                top: -27px;
                left: 32%;
                width: 358%;
                color: white;
                font-size: 18px;
            }
            .GuidePages img {
                height: 234px;
            }
        }

    }
</style>
