<template>
    <div id="collectGroom">
        <!--<loading></loading>-->
        <div class="trackScroll">
            <div class="collectGroomHead" v-if="headText!==null || headText !== ''">
                <div class="collectGroomHe">
                    <div class="testingEnd-content-middle-item">
                        <span class="testingEnd-content-middle1"><div></div></span>
                        <span class="testingEnd-content-middle-text">推荐理由</span>
                        <span class="testingEnd-content-middle2"><div></div></span>
                    </div>
                </div>
                <div class="collectGroomHeadText">{{headText}}</div>
            </div>
            <div class="splitLine" v-show="headText!==null || headText !== ''"></div>
            <div v-show="isOutLine">
                <div class="getIsOutLine" v-html="isOutLine" style="box-sizing: border-box;padding: 8px 0"></div>
                <!--<div class="" style="height: 7.5px;background-color: #f0f1f5;width: 100%"></div>-->
            </div>
            <div v-show="isPDFUrl" class="gitIDshow" style="border-bottom: 0.5px solid #e3e3e3">
                <div class="ioon" v-if="pdfArr.length==0">
                    <img :src="pdf" alt="">
                    <a :href="isPDFUrl">{{ isPDFName }}</a>
                </div>
                <div class="ioon pdfArrIoon" v-else v-for="list in pdfArr">
                    <img :src="pdf" alt="">
                    <a :href="list.url">{{ list.name }}</a>
                </div>
            </div>
            <!---->
            <div class="TcentList" v-for="(list,index) in groomArr" @click="goRulesCont(index)">
                <!--法规-->
                <div class="Tcentitem" v-if="list.type =='law'">
                    <!--法规-->
                    <div class="TcentTilt">{{list.title}}</div>
                    <div class="Tcentit">
                        <span class="titleType" :style="{backgroundColor:'#90b8f4'}">法规</span>
                        <span class="titleVal">{{list.dispatchUnit}}</span><!--发文字号-->
                        <span class="titleVal" v-show="list.dispatchUnit">|</span>
                        <span class="titleVal">{{list.timeliness}}</span><!--时效性-->
                        <span class="titleVal" v-show="list.timeliness">|</span>
                        <span class="titleVal">{{$const.format(list.releaseDate)}}</span><!--时效性-->
                    </div>
                </div>
                <!--公告-->
                <div v-else class="Tcentitem">
                    <div class="TcentTilt">{{list.title}}</div>
                    <div class="Tcentit">
                        <span class="titleType" :style="{backgroundColor:'#ffd091'}">公告</span>
                        <span class="titleVal">{{$const.format(list.releaseDate)}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="ans-footer">
            <mt-button @click.native="shareShows" class="ans-footer-list">
                <img v-lazy="shareIcon" alt="">
                <p>基本信息</p>
            </mt-button>
            <mt-button @click.native="collectShows" class="ans-footer-list">
                <img v-lazy="collectIcon" alt="">
                <p v-if="isCollects == '0'">订阅</p>
                <p v-else>取消订阅</p>
            </mt-button>
            <mt-button @click.native="relativeShows" class="ans-footer-list zanimg">
                <img v-lazy="relativeIcon" alt="">
                <p>相关内容</p>
            </mt-button>
            <mt-popup v-model="shareShow" position="bottom" class="ans-popup">
                <div class="collect-head">基本信息</div>
                <div class="shareCont">
                    <div class="rulesPlate">
                        <div class="rulesGulop">
                            <span class="rulesfw">适用范围：</span>
                            <span v-for="list in scopesName">
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
                                <span class="unitsName unit" v-if="heightTitle">{{heightTitle}}</span>
                                <span class="unitsName unit" v-else>无</span>
                            </div>
                        </div>
                    </div>
                    <div class="smCaption">
                        <div class="units">
                            <div class="unitsTitle">清单作者：</div>
                            <div class="unitsCont">
                                <span class="unitsName unit" v-if="unitss">{{unitss}}</span>
                                <span class="unitsName unit" v-else>无</span>
                            </div>
                        </div>
                    </div>

                    <div class="smCaption">
                        <div class="units">
                            <div class="unitsTitle">发布日期：</div>
                            <div class="unitsCont" v-if="releaseStart">{{releaseStart}}</div>
                            <div class="unitsCont" v-else="releaseStart">无</div>
                        </div>
                    </div>
                    <div class="smCaption">
                        <div class="units nounits">
                            <div class="unitsTitle">更新日期：</div>
                            <div class="unitsCont" v-if="releaseEnd">{{releaseEnd}}</div>
                            <div class="unitsCont" v-else>无</div>
                        </div>
                    </div>
                </div>
                <mt-button class="collect-foot" @click.native="shareShow = false">取消</mt-button>
            </mt-popup>
            <mt-popup v-model="relativeShow" position="bottom" class="ans-popup">
                <div class="collect-head link_head">相关内容</div>
                <div class="linkGal">
                    <div v-for="(list,index) in relatedQuestion" class="linkList">
                        <div @click="linkRulesContent(index)" class="linkBtn">{{list.title}}</div>
                    </div>
                    <div v-show="relatedQuestion" class="linkList">
                        <div class="linkBtn" style="text-align: center">没有相关内容！</div>
                    </div>
                </div>
                <mt-button class="collect-foot" @click.native="relativeShow = false">取消</mt-button>
            </mt-popup>
        </div>
        <v-returnHome></v-returnHome>
    </div>
</template>

<script>
    import returnHome from "../warning/returnHome.vue"
    import loading from "../warning/loading"

    export default {
        name: 'collectGroom',
        data() {
            return {
                goText: '主页',
                headText: "",
                toNumber: '',
                groomArr: [],
                pdf: '../../static/img/personal/collect/pdf.png',
                shareIcon: "../../static/img/rules/Attribute.png",
                collectIcon: "../../static/img/personal/collect/groomCl.png",
                relativeIcon: "../../static/img/rules/linkIcon.png",
                collectShow: false,
                relativeShow: false,
                shareShow: false,
                inputVal: '',
                close: '../../static/img/personal/collect/close.png',
                placeholders: '请输入新建收藏夹名称',
                collect: '收藏',
                answers: '../../static/img/personal/collect/answers.png',
                statute: '../../static/img/personal/collect/statute.png',
                notice: '../../static/img/personal/collect/notice.png',
                defName: '',
                getDefS: [],
                collcell: [],
                relatedQuestion: [],
                user_id: '',
                pageTop: 1,
                bottom: 10,
                getDefId: '',
                isOutLine: "",//演讲提纲
                isPDFName: "",//演讲pdf
                isPDFUrl: "",//演讲pdf地址
                pdfNameArr: [],
                pdfUrlArr: [],
                pdfArr: [],
                /**/
                titles: "",
                toId: '',
                scopesName: [],
                referenceNumber: '',
                releaseStart: '',
                releaseEnd: '',
                unitss: "",
                heightTitle: '',
                isCollects: '',
                gitToId: false,
                getID: 0,
            }
        },
        watch: {
            '$route'(to, from) {
                window.location.reload();
            }
        },
        updated() {
            this.heiHeight();
        },
        created() {
            var userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            if (this.user_id == '' || userId == "") {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
        },
        mounted() {
            // 获取路由上的id
            this.toId = this.$route.query.id;
            this.titles = this.$route.query.title;
            if (this.titles !== undefined) {
                window.document.title = decodeURI(this.titles);
            } else {
                window.document.title = "推荐内容";
            }
            //
            this.$nextTick(() => {
                this.groom();
                this.getgroomxia();
            })
        },
        components: {
            "v-returnHome": returnHome,
            "loading": loading
        },
        methods: {
            heiHeight() {
                var hei = document.body.clientHeight;
                var head = document.querySelector(".collectGroomHead").clientHeight;
                var scroll = (hei - 50) + "px";
                document.querySelector(".trackScroll").style.height = scroll;
            },
            /**/
            shareShows() {
                this.shareShow = true;
            },
            //点击订阅
            collectShows() {
                console.log("", this.toId);
                if (this.isCollects == 0) {
                    this.$http({
                        method: "GET",
                        url: this.$api.host + "recommend/collectRecommend",
                        params: {
                            recommendId: this.toId
                        }
                    }).then((res) => {
                        console.log("订阅成功", res);
                        if (res.data.returnCode = 1) {
                            this.isCollects = 1;
                            this.$toast({message: '订阅成功', position: 'middle', duration: 1500});
                        } else {
                            this.isCollects = 0;
                        }
                    }).catch((err) => {
                        console.log('订阅', err)
                    });
                } else {
                    this.$http({
                        method: "GET",
                        url: this.$api.host + "recommend/deleteUserCollectRecommend",
                        params: {
                            recommendId: this.toId,
                        }
                    }).then((res) => {
                        console.log("删除成功", res);
                        if (res.data.returnCode = 1) {
                            this.isCollects = 0;
                            this.$toast({message: '取消订阅成功', position: 'middle', duration: 1500});
                        } else {
                            this.isCollects = 1;
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                    console.log("已订阅");
                }
            },
            /*下面*/
            getgroomxia() {
                this.$http({
                    method: "GET",
                    url: this.$api.host + "recommend/getRecommendCollectAttr",
                    params: {
                        recommendId: this.toId
                    }
                }).then((res) => {
                    console.log("请求成功", res);
                    if (res.data.returnCode = 1) {
                        this.releaseStart = res.data.returnObject.recommendAttr.releaseTime;//发布
                        this.releaseStart = this.$const.formatText(this.releaseStart);
                        this.releaseEnd = res.data.returnObject.recommendAttr.effectTime;//更新
                        this.releaseEnd = this.$const.formatText(this.releaseEnd);
                        var markets = res.data.returnObject.recommendAttr.market;//板块
                        this.unitss = res.data.returnObject.recommendAttr.dispatchUnit;//发文单位
                        this.headText = res.data.returnObject.recommendAttr.descrip;//发文单位
                        this.heightTitle = res.data.returnObject.recommendAttr.title;//yiyle
                        this.isCollects = res.data.returnObject.recommendAttr.isCollect;//yiyle
                        this.isOutLine = res.data.returnObject.recommendAttr.outline;//yiyle

                        this.isPDFName = res.data.returnObject.recommendAttr.pdfName;//yiyle
                        this.isPDFUrl = res.data.returnObject.recommendAttr.pdfUrl;//yiyle
                        if (this.isPDFUrl == null || this.isPDFName == null) {
                            console.log("aaaa");
                        } else {
                            if (this.isPDFName.indexOf('&') > -1 && this.isPDFUrl.indexOf('&') > -1) {
                                this.pdfArr = [];
                                var obj = {name: '', url: ''};
                                this.pdfNameArr = this.isPDFName.split('&');
                                this.pdfUrlArr = this.isPDFUrl.split('&');
                                for (var i in this.pdfNameArr) {
                                    var obj = {name: this.pdfNameArr[i], url: this.pdfUrlArr[i]};
                                    this.pdfArr.push(obj);
                                }
                            }
                        }
                        this.scopesName = markets.split("，");
                        this.relatedQuestion = res.data.returnObject.relatedList;
                        this.$nextTick(() => {
                            $(".getIsOutLine span").removeAttr("style");
                        })
                        //console.log(markets, this.scopesName);
                        var adverttitle = decodeURI(window.document.title);
                        var sharelink2 = window.location.href;//分享链接
                        var shareDesc = this.headText == "" ? "上市公司、专业机构移动董办工具首选！" : this.headText;//描述
                        //console.log(shareDesc, this.headText);
                        /**/
                        this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
                    } else {
                        //this.$toast({message: '订阅成功', position: 'middle', duration: 1500});
                    }
                }).catch((err) => {
                    console.log('getRecommendCollectAttr', err);
                    this.$toast({message: err.message, position: 'middle', duration: 1500});
                });
            },
            /**/
            relativeShows() {
                this.relativeShow = true;
            },
            /**/
            linkRulesContent(index) {
                this.relativeShow = false;
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$router.push({
                            path: '/collectGroom',
                            query: {
                                id: this.relatedQuestion[index].recommendId,
                                title: this.relatedQuestion[index].title,
                                MathTime: global.timestamp
                            }
                        });
                    })
                }, 200);
            },
            ///处理。。。//获取列表
            groom() {
                this.$http({
                    method: "GET",
                    url: this.$api.host + "recommend/getRecommendDetails",
                    params: {
                        recommendId: this.toId
                    }
                }).then((res) => {
                    this.groomArr = res.data.returnObject;
                }).catch((err) => {
                    console.log(err);
                })
            },
            /**/
            goRulesCont(index) {
                $("input").blur();
                setTimeout(() => {
                    this.$nextTick(() => {
                        //console.log("43534543",this.groomArr[index]);
                        if (this.groomArr[index].type == 'law') {
                            this.$router.push({
                                path: '/rulesCount',
                                query: {id: this.groomArr[index].refId, MathTime: global.timestamp}
                            });
                        } else {
                                this.$router.push({path: '/afficheContent', query: {id: this.groomArr[index].refId}});
                        }
                    })
                }, 200);
            }
        }
    }
</script>

<style>
    #collectGroom .getIsOutLine h2, #collectGroom .getIsOutLine h1 {
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 15px;
        color: #323232;
        padding: 5px 12px;
        box-sizing: border-box;
    }
    #collectGroom .getIsOutLine h1 * {
        padding: 0;
        margin: 0;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica !important;
    }
    #collectGroom .getIsOutLine h2 * {
        padding: 0;
        margin: 0;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica !important;
    }
    #collectGroom .getIsOutLine h1 {
        text-align: center;
    }
    /**/
    #collectGroom .getIsOutLine p {
        text-indent: 2em;
        padding: 2px 12px;
        box-sizing: border-box;
        font-size: 15px;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        color: #323232;
        /*color: rgba(0, 0, 0, 0.6);*/
    }
</style>

<style scoped>

    .mint-button:after {
        background-color: white;
    }
    #collectGroom {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    #collectGroom .collectGroomHead {
        height: auto;
        box-sizing: border-box;
        padding: 0 12px;
    }
    /**/
    #collectGroom .collectGroomHe {
        box-sizing: border-box;
        padding: 17.5px 0 12.5px 0;
    }
    #collectGroom .testingEnd-content-middle-item {
        text-align: center;
        color: #ffb551;
    }
    #collectGroom .testingEnd-content-middle-text {
        padding: 0 6px 0 6px;
        font-size: 15px;
        font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
    }
    #collectGroom .testingEnd-content-middle1, #collectGroom .testingEnd-content-middle2 {
        width: 60px;
        height: 2px;
        display: inline-block;
        box-sizing: border-box;
        border-bottom: 0.5px solid #ffb551;
        position: relative;
        top: -5px;
    }
    #collectGroom .testingEnd-content-middle1 div {
        height: 3px;
        width: 3px;
        background-color: #ffb551;
        position: absolute;
        border-radius: 50%;
        right: 0;
        top: 0;
    }
    #collectGroom .testingEnd-content-middle2 div {
        height: 3px;
        width: 3px;
        background-color: #ffb551;
        position: absolute;
        border-radius: 50%;
        left: 0;
        top: 0;
    }
    /**/
    #collectGroom .collectGroomHeadText {
        letter-spacing: 0;
        font-size: 13px;
        font-family: PingFangSC-Light, sans-serif, Microsoft Yahei, Helvetica;
        color: #8d8d8d;
        line-height: 19px;
        text-align: justify;
        padding-bottom: 17.5px;
    }
    #collectGroom .TcentList {
        padding: 0 12px;
    }
    /**/
    #collectGroom .TcentList:active {
        opacity: 0.6;
    }
    #collectGroom .trackScroll {
        /* padding: 0 12px;*/
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    #collectGroom .TcentTilt {
        overflow: hidden;
        text-align: justify;
        font-size: 15px;
        color: #323232;
        padding: 15px 0 0 0;
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
        line-height: 19px;
    }
    #collectGroom .Tcentitem {
        box-sizing: border-box;
        border-bottom: 0.5px solid #e3e3e3;
    }
    #collectGroom .Tcentit {
        padding-bottom: 15px;
        padding-top: 6px;
        box-sizing: border-box;

        font-size: 12px;
    }
    #collectGroom .titleType {
        height: 16px;
        width: 28px;
        line-height: 16px;
        text-align: center;
        display: inline-block;
        border-radius: 2px;
        color: white;
        font-size: 12px;
    }
    #collectGroom .Tcentit img {
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
    }
    /**/
    #collectGroom .ans-footer {
        position: absolute;
        bottom: 0px;
        left: 0;
        font-size: 0;
        width: 100%;
        border-top: 1px solid #e3e3e3;
        box-shadow: 0 -8px 13px rgba(0, 0, 0, .02);
    }
    #collectGroom .ans-footer-list {
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
    #collectGroom .ans-footer-list img {
        height: 18px;
        padding-top: 2px;
    }
    #collectGroom .ans-footer-list p {
        margin: 0;
        font-size: 12px;
    }
    /*底部弹出框*/
    #collectGroom .ans-popup {
        height: auto;
        background-color: white;
        width: 100%;
    }
    #collectGroom .collect-head {
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
    #collectGroom .link_head {
        border-bottom: 0.5px solid #f0f1f5;
    }
    #collectGroom .collect-foot {
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
    #collectGroom .linkList {
        color: #323232;
        font-size: 15px;
        line-height: 16px;
        box-sizing: border-box;
        border-bottom: 0.5px solid #f0f1f5;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    #collectGroom .linkList:last-child {
        border-bottom: none;
    }
    #collectGroom #ans-content li {
        list-style-type: none !important;
    }
    #collectGroom .linkGal {
        max-height: 300px;
        padding: 0 12px;
        height: auto;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    #collectGroom .linkBtn {
        border: 0;
        box-shadow: none;
        background-color: white;
        width: 100%;
        height: auto;
        font-size: 15px;
        text-align: left;
        padding: 17.5px 0;
        color: #323232;
    }
    /**/

    /*********************/
    #collectGroom .shareCont {
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
    #collectGroom .default {
        padding: 0 12px;
        max-height: 249px;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    #collectGroom .default .collect-def {
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        border-bottom: 0.5px solid #f0f1f5;
    }
    #collectGroom .default .collect-def:active {
        background-color: #f0f1f5;
    }
    #collectGroom .defaultText {
        line-height: 50px;
        height: 50px;
        color: #323232;
        font-size: 15px;
    }
    #collectGroom .default .create {
        font-size: 15px;
        box-sizing: border-box;
        line-height: 50px;
        height: 50px;
        color: #323232;
        border-bottom: 0.5px solid #f0f1f5;
    }
    #collectGroom .default .create:last-child {
        border-bottom: none;
    }
    #collectGroom .default .create:active {
        background-color: #f0f1f5;
    }
    .closeInputVal {
        position: absolute;
        top: 9px;
        right: 5%;
        height: 16px;
        display: none;
        /*background: #000;*/
    }
    .collect_create {
        display: inline-block;
        float: right;
        font-size: 11px;
        color: #8d8d8d;
        border: 0 !important;
    }
    .default {
        padding: 0 12px;
    }
    .snake-circle {
        height: 20px;
        width: 20px;
        -webkit-animation: snake-rotate 0.8s infinite linear;
        animation: snake-rotate 0.8s infinite linear;
        border: 2px solid transparent;
        border-radius: 50%;
        border-top-color: rgb(252, 199, 127);
        border-left-color: rgb(252, 199, 127);
        border-bottom-color: rgb(252, 199, 127);
        margin: 0 auto;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
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
    @media (min-device-width: 414px)and (max-device-width: 736px)and (-webkit-min-device-pixel-ratio: 3) {
        #collectGroom .ans-home {
            bottom: 95px;
        }
    }
    #collectGroom .inputgle {
        height: 35px;
        width: 84%;
        background-color: #8d8d8d;
        border-radius: 2px;
        display: inline-block;
        float: left;
        border: 0;
        vertical-align: middle;
        position: relative;
    }
    #collectGroom .collect_shg .inputgle input {
        border: 0;
        -webkit-appearance: none;
        float: left;
        height: 35px;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 5px 24px 5px 12px;
        border-radius: 2px;
        font-size: 15px;
        outline: none;
        font-family: PingFangSC-Light, sans-serif;
    }
    input[type=text] {
        -webkit-appearance: none;
    }
    #collectGroom .collect_shg .inputbtn {
        height: 35px;
        width: 13%;
        border-radius: 2px;
        display: inline-block;
        float: right;
        vertical-align: middle;
    }
    #collectGroom .collect_shg button {
        float: right;
        border: 0;
        background-color: white;
        height: 35px;
        border-radius: 2px;
        font-size: 15px;
        width: 100%;
        padding: 0;
        color: #f7971b;
        outline: none;
    }
    .collect_shg button:active {
        background-color: #f0f1f5;
    }
    #collectGroom .collect_create span img {
        height: 14px;
        width: 14px;
        position: relative;
        top: 3px;
        left: 0;
    }
    #collectGroom .gitIDshow {
        /*height: 60px;*/
        /*line-height: 60px;*/
        color: #323232;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    #collectGroom .TcentList:first-child .Tcentitem {
        border-bottom: none;
    }
    /**/
    #collectGroom .gitIDshow .foo {
        height: 7.5px;
        background-color: #f0f1f5;
        width: 100%;
    }
    #collectGroom .gitIDshow a {
        text-decoration: none;
        color: #323232;
        /*padding: 0 12px;*/
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
        font-size: 15px;
        display: table-cell;
        box-sizing: border-box;
        vertical-align: middle;
        /*white-space: nowrap;*/
        /*text-align: justify;*/
    }
    #collectGroom .gitIDshow .ioon {
        padding: 15px 12px;
        display: table;
        width: 100%;
        box-sizing: border-box;
    }
    #collectGroom .gitIDshow .pdfArrIoon:first-child {
        padding-bottom: 0;
    }
    #collectGroom .gitIDshow .ioon img {
        width: 19px;
        display: table-cell;
    }
    /**/
    #collectGroom .gitIDshow a:active {
        color: #ffb148;
        text-decoration: underline;
    }
    /**/
    #collectGroom .goCustomer {
        height: 45px;
        width: 45px;
        border: 0;
        box-sizing: border-box;
        display: inline-block;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        position: absolute;
        bottom: 12.18%;
        right: 6.66%;
        color: #ffb148;
        font-size: 12px;
        padding: 9px;
        text-align: center;
        line-height: 14px;
    }
    /**/
    .splitLine {
        height: 7.5px;
        background-color: #f0f1f5;
    }
</style>
