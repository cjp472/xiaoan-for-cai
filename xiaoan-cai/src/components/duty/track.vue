<template>
    <div class="track" id="track">
        <div class="Theader">
            <div>共<span class="headNum">{{travk.length}}</span>条，最多为您保存<span class="headNum">20</span>条</div>
            <div class="Close" @click="deletes"><span>清除</span><i class="icon iconfont icon-shanchu"></i></div>
        </div>
        <div class="trackScroll" ref="trackDom" :style="{height:scrollAll+'px'}">
            <div class="TcentList" v-for="(list,index) in travk" @click="goTrack(index)">
                <!--法规-->
                <div class="Tcentitem" v-if="list.type =='1'">
                    <!--法规-->
                    <div class="TcentTilt" v-if="list.expiryTime === null" :style="{color:'#323232'}">
                        {{nuwNumber(list.title)}}
                    </div>
                    <div class="TcentTilt" v-else :style="{color:'#8d8d8d'}">{{nuwNumber(list.title)}}</div>
                    <!------------------------------------------------------------->
                    <div class="Tcentit">
                        <span class="titleType" :style="{backgroundColor:'#90b8f4'}">法规</span>
                        <!--------------------------法规-------------------------->
                        <span class="titleVal">{{list.dispatchUnit}}</span><!--发文字号-->
                        <span v-show="list.dispatchUnit" style="color: #8d8d8d;">|</span>
                        <!--法规不显示时间-->
                        <span class="titleVal" v-show="list.timeliness">{{list.timeliness}}</span>
                        <span v-show="list.releaseTime" style="color: #8d8d8d;">|</span>
                        <span style="color: #8d8d8d;">{{ $const.format(list.releaseTime)}}</span>
                    </div>
                </div>
                <!--问答-->
                <div class="Tcentitem" v-else-if="list.type == '2'">
                    <div class="TcentTilt" :style="{color:'#323232'}">{{nuwNumber(list.title)}}</div>
                    <div class="Tcentit">
                        <span class="titleType" :style="{backgroundColor:'#ffa691'}">问答</span>
                    </div>
                </div>
                <!--公告-->
                <div v-else-if="list.type == '3'" class="Tcentitem">
                    <div class="TcentTilt">{{nuwNumber(list.title)}}</div>
                    <div class="Tcentit">
                        <span class="titleType" :style="{backgroundColor:'#ffd091'}">公告</span>
                        <span class="titleVal">{{$const.format(list.releaseTime)}}</span>
                    </div>
                </div>
                <!--研报-->
                <div v-else="list.type == '4'" class="Tcentitem">
                    <div class="TcentTilt">{{nuwNumber(list.title)}}</div>
                    <div class="Tcentit">
                        <span class="titleType" :style="{backgroundColor:'#9ae6ed'}">研报</span>
                        <span class="titleVal">{{list.dispatchUnit}}</span>
                        <span style="color: #8d8d8d;">|</span>
                        <span class="titleVal">{{$const.format(list.releaseTime)}}</span>
                    </div>
                </div>
            </div>
            <xiaoan-loading v-show="loading"></xiaoan-loading>
        </div>
        <div class="Tempty" v-show="TemptyShow">
            <div class="track-Tempty"></div>
            <div class="track-Tempty-text">暂无浏览记录！</div>
        </div>
        <v-returnHome></v-returnHome>
    </div>
</template>

<script>
    import returnHome from "../warning/returnHome.vue"
    import loading from "../warning/loading"

    export default {
        name: "track",
        data() {
            return {
                Delete: '../../static/img/personal/collectval/delete.png',
                travk: [],
                user_Id: "",
                todayTime: '',
                toTime: '',
                loading: false,
                TemptyShow: false,
                scrollAll: ''
            }
        },
        updated() {

        },
        created() {
            let userId = this.$cookie.getCookie("userId");
            this.user_Id = userId;
            console.log(userId, this.user_Id);
            if (userId == "") {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
            this.userHome();
            this.loadeds();
        },
        mounted() {
            this.$nextTick(() => {
                $(".sharebg").removeClass('sharebg-active');
                this.scrollAll = document.body.clientHeight - this.$refs.trackDom.offsetTop;
            });
            /**
             * todo
             **/
            let adverttitle = window.document.title;
            let sharelink2 = window.location.href;//分享链接
            let shareDesc = "";//描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
            /**/
            this.$nextTick(() => {
                window.sessionStorage.removeItem("refer_url");
                window.sessionStorage.removeItem("refer_title");
            });
        },
        components: {
            "v-returnHome": returnHome,
            "xiaoan-loading": loading
        },
        methods: {
            //
            userHome() {
                /*/userHome*/  //我的足迹获取用户信息判断是否填写个人信息  若是没有则跳转填写个人信息页面
                this.$http({
                    method: "GET",
                    url: this.$api.host + "userHome",
                    params: {}
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        if (res.data.returnObject.realName === '' || res.data.returnObject.realName === null) {
                            this.$router.push({path: '/completeInfo'});
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            //
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            //
            format1(shijianchuo) {
                //shijianchuo是整数，否则要parseInt转换
                var time = new Date(parseInt(shijianchuo));
                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                return y + '-' + this.add0(m) + '-' + this.add0(d);
            },
            // /处理。。。
            nuwNumber(str) {
                var hei = document.body.clientWidth;
                var nowH = parseInt((hei - 39) / 16) * 2;
                // console.log("=====================>", nowH);
                if (str.length >= nowH) {
                    return str = str.substring(0, nowH) + '...';
                } else {
                    return str
                }
            },
            //
            goTrack(index) {
                console.log(this.travk[index].type);
                if (this.travk[index].type == 1) {
                    this.$router.push({
                        path: "/rulesCount",
                        query: {id: this.travk[index].refId}
                    });
                } else if (this.travk[index].type == 2) {
                    this.$router.push({
                        path: "/answersDetails",
                        query: {
                            question: this.travk[index].title,
                            scopeId: this.travk[index].dispatchUnit
                        }
                    });
                } else if (this.travk[index].type == 3) {
                    this.$router.push({path: '/afficheContent', query: {id: this.travk[index].refId}});
                } else if (this.travk[index].type == 4) {
                    this.$router.push({path: '/detailReport', query: {id: this.travk[index].refId}});
                }
            },
            //获取足迹
            loadeds() {
                this.loading = true;
                this.$http({
                    method: "GET",
                    url: this.$api.host + "browsing/getBrowsing",
                    params: {
                        userId: this.user_Id,
                    },
                }).then((res) => {
                    setTimeout(() => {
                        this.loading = false;
                    }, 300);
                    console.log(res);
                    if (res.data.returnCode === 1) {
                        this.travk = res.data.returnObject;
                        // document.querySelector('.Tempty').style.display = 'none';
                        this.TemptyShow = false;
                    } else if (res.data.returnCode === -1) {
                        this.TemptyShow = true;
                        //document.querySelector('.Tempty').style.display = 'block';
                    }
                }).catch((err) => {
                    console.log('请求失败' + err);
                });
            },
            //清除足迹
            deletes() {
                this.$http({
                    method: "POST",
                    url: this.$api.host + "browsing/deleteByUserId",
                    params: {
                        userId: this.user_Id,
                    },
                }).then((res) => {
                    console.log("asdas" + res.data.returnCode);
                    if (res.data.returnCode == 1) {
                        this.travk = [];
                        //document.querySelector('.Tempty').style.display = 'block';
                        this.TemptyShow = true;
                    } else {
                        document.querySelector('.Tempty').style.display = 'none';
                        this.TemptyShow = false;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    ul, li, a {
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    .track {
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
    .Theader {
        height: 35px;
        width: auto;
        background-color: #f0f1f5;
        overflow: hidden;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        /*box-shadow: 0 1px 1px #e3e3e3;*/
    }
    .Theader div {
        text-align: left;
        padding: 8px 12px;
        /*font-weight: 400;*/
        color: #939394;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        display: inline-block;
        float: left;
        font-size: 14px;
    }
    .Theader .headNum {
        color: #ffb148;
    }
    .Theader .Close {
        display: inline-block;
        float: right;
        color: #ffb148;
    }
    .Close span {
        margin-right: 3px;
    }
    .Theader .Close i {
        /*float: right;*/
        /*margin-top: 3px;*/
        font-size: 15px;
        color: #ffb148;
    }
    #track .trackScroll {
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .TcentTilt {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 15px;
        color: #323232;
        padding: 15px 0 0 0;
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
        line-height: 19px;
    }
    .Tcentitem {
        text-align: justify;
        padding: 0 12px;
    }
    .Tcentit {
        padding-bottom: 15px;
        padding-top: 6px;
        border-bottom: 0.5px solid #e3e3e3;
        font-size: 12px;
    }
    .Tcentit div {
        display: initial;
    }
    .Tcentit img {
        height: 14px;
        position: relative;
        top: 2px;
        left: 0;
    }
    .Tcentit .Tvalue {
        background-color: #f6900c;
        color: white !important;
        padding: 1px 3px;
        border-radius: 4px;
        margin-right: 2px !important;

    }
    .Tcentit .titleVal {
        font-size: 12px;
        color: #8d8d8d;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    .Tcentit span {
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
    }
    .Tempty {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    #track .track-Tempty {
        background-image: url("/static/img/warning/warning2.png");
        width: 104.076px;
        height: 95px;
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
        margin: 40% auto 0 auto;
    }
    #track .track-Tempty-text {
        text-align: center;
        font-size: 15px;
        margin-top: 36px;
        color: #ffb148;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    .page-infinite-loading {
        text-align: center;
    }
    .page-infinite-loading div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
    .mint-tab-item-label {
        color: #8d8d8d !important;
    }
    .titleType {
        padding: 1px 3px 1px 3px;
        border-radius: 2px;
        color: white;
        font-size: 12px;
    }
    #track .TcentList:active {
        background-color: #f0f1f5;
    }
</style>
