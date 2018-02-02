<template>
    <div id="answersDetails" class="answersDetails">
        <div class="ans-story">
            <div class="ans-text">
                <span>{{normQuestions}}</span>
            </div>
            <div class="ans-plate">
                <div class="ans-plate-list">
                    <span v-if="scopeIds == '沪市主板'" :style="{color:'#a9262c',borderColor:'#a9262c'}">沪主板</span>
                    <span v-if="scopeIds == '深市主板'" :style="{color:'#174299',borderColor:'#174299'}">深主板</span>
                    <span v-if="scopeIds == '深市中小板'" :style="{color:'#174299',borderColor:'#174299'}">中小板</span>
                    <span v-if="scopeIds == '深市创业板'" :style="{color:'#174299',borderColor:'#174299'}">创业板</span>
                    <span v-if="scopeIds == '新三板'" :style="{color:'#f6900c',borderColor:'#f6900c'}">新三板</span>
                </div>
            </div>
        </div>
        <div class="ans-foo"></div>
        <div class="ans-scroll">
            <div class="ans-xiaoAn">
                <div class="ans-xiaoAn-img"></div>
                <span class="ans-xiaoAn-text">本问答来自信公小安</span>
                <span class="ans-xiaoAn-txt">
                    <a :href="urlxiaoan"><div class="ans-xiaoAn-txt1"></div></a>
                </span>
            </div>
            <div class="ans-result">
                <div class="ans-text ans-text-result">
                    <p v-html="contents" id="ans-content"></p>
                    <div class="ans-result-gl-text">
                        <!-- <div class="ans-result-luo">最后编辑于<span></span></div>-->
                        <div class="ans-result-date">著作权归作者所有</div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" "></div>
        <!--/底部页面-->
        <div class="ans-footer">
            <mt-tabbar v-model="selected">
                <mt-tab-item v-for="(list,index) in footerItem" :id="list.id" :key="list.id"
                             @click.native="routerLink(index)">
                    <div slot="icon">
                        <img :src="list.icon" alt="" class="linkIcon">
                    </div>
                    <p>{{list.name}}</p>
                </mt-tab-item>
            </mt-tabbar>
        </div>
        <!---->
        <mt-popup v-model="collectShows" position="bottom" class="ans-popup">
            <div class="ans-popup-title">收藏</div>
            <div class="" style="max-height: 300px">
                <div class="collect_shg">
                    <div class="inputgle">
                        <input id="answersInput" @input="createVal1(40)" v-model="inputVal" type='text'
                               :placeholder='placeholders'
                               class="createVal" @focus="answerFocus"/>
                        <img v-lazy="close" alt="" @click="closeInputVals" class="closeInputVal">
                    </div>
                    <div class="inputbtn">
                        <button class='createDom' @click="createDom">创建</button>
                    </div>
                </div>
                <!---->
                <div class="default">
                    <div class="collect-def" @click="collectD">
                        <span class="defaultText">{{defName}}</span>
                    </div>
                    <div class="create collect-list" v-for="(list,index) in collcell" @click="addCollect(index)">
                        <span class="defaultText">{{list.favouriteName}}</span>
                    </div>
                </div>
            </div>
            <mt-button class="collect-foot" @click.native="collectShows = false">取消</mt-button>
        </mt-popup>
        <!---->
        <mt-popup v-model="linkShows" position="bottom" class="ans-popup">
            <div class="ans-popup-title">相关内容</div>
            <div class="linkGal">
                <div v-for="(list,index) in relatedQuestion" class="linkList">
                    <button @click="linkList(index)" class="linkBtn">{{list}}</button>
                </div>
            </div>
            <mt-button class="collect-foot" @click.native="linkShows = false">取消</mt-button>
        </mt-popup>
        <!---->
        <mt-popup v-model="errorCorrecting" position="bottom" class="ans-popup ans-error">
            <div class="ans-popup-title">纠错</div>
            <div class="err-text">
                <label for="text"></label>
                <!-- <input type="text" class="err-input">-->
                <textarea @input="TextArea(500)" id="text" class="err-textArea" v-model="textArea"
                          :placeholder="placeTextArea"></textarea>
            </div>
            <div class="err-footer">
                <mt-button class="err-foot" @click.native="errorCorrect">取消</mt-button>
                <mt-button class="err-foot2" @click.native="errorXJ">提交</mt-button>
            </div>
        </mt-popup>
        <!---->
        <div id="warning">
            <div class="waringImg"></div>
            <div class="waringText">{{waringText}}</div>
            <mt-button class="waringBtn" @click="waringBin">{{waringBtn}}</mt-button>
        </div>
        <!---->
        <div class="loading-am">
            <div class="snake-circle"></div>
        </div>
        <div class="ans-home" @click="ansHome">
            <div class="ans-homeIcon"></div>
            <div class="ans-homeText">主页</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'answersDetails',
        data() {
            return {
                footerItem: [
                    {id: 0, name: '收藏', value: '', icon: '../../static/img/rules/celloctIcon.png'},
                    {id: 1, name: '相关内容', value: '', icon: '../../static/img/rules/linkIcon.png'},
                    {id: 2, name: '纠错', value: '', icon: '../../static/img/answers/zanstart.png'}
                ],
                urlxiaoan: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5NDQ4OTgzMw==&scene=123#wechat_redirect',
                placeTextArea: '您的建议就是我们最大的动力（最多500字）',
                errorCorrecting: false,
                waringBtn: '刷新',
                waringText: '服务器错误，请刷新重试！',
                buttonBottom: 0,
                collectShows: false,
                linkShows: false,
                close: '../../static/img/personal/collect/close.png',
                inputVal: '',
                placeholders: '请输入新建收藏夹名称',
                collect: '收藏',
                foc: '../../static/img/personal/focus/foc.png',
                collectIcon: '',
                linkIcon: '',
                zanImg: '../../static/img/answers/zan.png',
                zanStartImg: '',
                num: 0,
                nber: 81,
                questions: '',
                normQuestions: '',
                scopeIds: '沪市主板',
                contents: '',
                relatedQuestion: [],
                answers: '../../static/img/personal/collect/answers.png',
                statute: '../../static/img/personal/collect/statute.png',
                notice: '../../static/img/personal/collect/notice.png',
                collcell: [],
                bottom: 10,
                pageTop: 1,
                user_id: '',
                getDefS: [],
                defName: '',
                textArea: '',
                selected: ''
            }
        },
        watch: {
            '$route'(to, from) {
                window.location.reload();
            }
        },
        created() {
            let userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            if (userId == '') {
                this.isOnload = false;//未授权登录
            } else {
                this.isOnload = true;//授权登录
                this.createCollect();
                this.getDef();
            }
        },
        updated() {
            /*$('.mint-popup,.ans-popup,.mint-popup-bottom').css("z-index", "210");*/
            $('.v-modal').css({'z-index': '200'});
            $('.mint-toast').css({'z-index': '3000'});
            this.heightH();
        },
        mounted() {
            this.heightH();
            //
            console.log(this.$route.query.question, this.$route.query.scopeId);
            //
            var url = decodeURI(window.location.href);
            console.log(url);
            this.questions = this.$route.query.question;
            if (this.$route.query.scopeId == null || this.$route.query.scopeId == undefined || this.$route.query.scopeId == "" || this.$route.query.scopeId.length == 0) {
                this.scopeIds = "沪市主板";
            } else {
                this.scopeIds = this.$route.query.scopeId;
            }
            console.log(this.questions, this.scopeIds);
            this.ansDetails();
            /* *
             * todo
            * */
            var adverttitle = this.questions;
            var sharelink2 = window.location.href;//分享链接
            var shareDesc = "";//描述
            /**/
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
        },
        methods: {
            routerLink(index) {
                if (index === 0) {
                    this.collectShow();
                } else if (index === 1) {
                    this.linkShow();
                } else if (index === 2) {
                    this.errorCorrectings();
                }
            },
            // 创建input
            createVal1(maxlength) {
                if (this.inputVal.length > maxlength) {
                    this.inputVal = this.inputVal.substring(0, maxlength);
                }
            },
            //
            errorCorrect() {
                console.log(1);
                $('textarea').blur();
                //document.activeElement.blur;
                this.errorCorrecting = false;
            },
            //
            ansHome() {
                this.$router.push({path: '/Law', query: {MathTime: global.timestamp}});
            },
            //
            TextArea(maxlength) {
                if (this.textArea.length > maxlength) {
                    this.textArea = this.textArea.substring(0, maxlength);
                }
            },
            answerFocus() {
                this.$const.androidTop("answersInput");
            },
            errorXJ() {
                console.log(3245235);
                if (this.textArea == '' || this.textArea.trim().length == 0) {
                    this.$toast({message: '输入不能为空', position: 'middle', duration: 1000});
                    $('.err-textArea').focus();
                    /*  $('.mint-popup.ans-popup,.mint-popup-bottom').css("z-index", "210");*/
                } else {
                    this.$http({
                        method: "GET",
                        url: this.$api.host + "sendErrorMail",
                        params: {
                            lawTitle: this.questions,
                            lawLink: window.location.href,
                            errorText: this.textArea,
                        }
                    }).then((res) => {
                        if (res.data.returnCode == 1) {
                            this.$toast({message: '感谢您的建议，我们会尽快处理！', position: 'middle', duration: 1500});
                            var userid = res.data.returnObject.userID;
                            var mailid = res.data.returnObject.mailId;
                            this.errorCorrecting = false;
                            console.log("123213213123", res, userid, mailid);
                            /**/
                            this.$http({
                                method: "GET",
                                url: this.$api.host + "sendErrorMail2",
                                params: {
                                    userId: userid,
                                    mailId: mailid,
                                    lawTitle: this.questions,
                                    lawLink: window.location.href,
                                    errorText: this.textArea,
                                }
                            }).then((res) => {
                                console.log(res);
                            }).catch((err) => {
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            // 判断user_Id存在
            toUserId() {
                if (this.user_id == '' || this.user_id.length == 0) {
                    this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                    // this.$router.push({path: "/number", query: {MathTime: global.timestamp}});
                } else {
                }
            },
            waringBin() {
                window.location.reload();
            },
            // 创建收藏夹
            createDom() {
                if (this.inputVal.trim().length != 0) {
                    this.$http({
                        method: 'POST',
                        url: this.$api.host + "favourite/addFavourite",
                        params: {
                            userId: this.user_id,
                            favouriteName: this.inputVal,
                            isDefault: 0
                        }
                    }).then((res) => {
                        console.log(res, this.inputVal);
                        if (res.data.returnCode == 1) {
                            this.inputVal = '';
                            this.createCollect();
                            this.$toast({message: '创建收藏夹成功', position: 'middle', duration: 1000});
                        } else if (res.data.returnCode == 3) {
                            this.$toast({message: '收藏夹不能相同', position: 'middle', duration: 1500});
                        } else if (res.data.returnCode == 2) {
                            this.$toast({message: '最多只能创建十个收藏夹', position: 'middle', duration: 1500});
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
            // 根据用户id获取收藏夹
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
                    console.log("======================", res);
                    console.log(res.data.returnObject);
                    if (res.data.returnCode == 1) {
                        this.collcell = res.data.returnObject.list;
                        this.num = res.data.returnObject.list.length;
                    }
                }).catch((err) => {
                    //this.$toast({message: '网络请求异常', position: 'middle', duration: 1500});
                });
            },
            // 添加到默认收藏夹
            collectD() {
                this.$http({
                    method: "GET",
                    url: this.$api.host + "collect/addCollect",
                    params: {
                        refId: this.questions, //文章id
                        favourableId: this.getDefS.id, //文件夹id
                        title: this.questions, //标题名
                        qaScopeId: this.scopeIds, //板块类别
                        type: "qa" //类型
                    }
                }).then((res) => {
                    if (res.data.returnCode == 2) {
                        this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
                    } else {
                        this.getDef();
                        this.createCollect();
                        this.collectShows = false;
                        setTimeout(() => {
                            this.$toast({message: '收藏成功', position: 'middle', duration: 1500});
                        }, 600);
                    }
                    console.log(res);
                }).catch((err) => {
                })
            },
            // 获取默认收藏夹
            getDef() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + 'favourite/getDefault',
                    params: {
                        userId: this.user_id,
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.returnCode == 1) {
                        this.defName = res.data.returnObject.favouriteName;
                        console.log(res.data.returnObject.favouriteName);
                        this.getDefS = res.data.returnObject;
                    }
                    console.log(this.getDefS);
                }).catch((err) => {
                    console.log(err);
                })
            },
            // 根据收藏夹添加
            addCollect(index) {
                console.log(this.collcell[index].id, this.releaseStart);//收藏夹id
                this.$http({
                    method: "GET",
                    url: this.$api.host + "collect/addCollect",
                    params: {
                        refId: this.questions, //文章id
                        favourableId: this.collcell[index].id,//文件夹id
                        title: this.questions,//标题名
                        qaScopeId: this.scopeIds,//板块类别
                        type: "qa"//类型
                    }
                }).then((res) => {
                    if (res.data.returnCode == 2) {
                        this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
                    } else if (res.data.returnCode == 1) {
                        this.collectShows = false;
                        this.createCollect();
                        setTimeout(() => {
                            this.$toast({message: '收藏成功', position: 'middle', duration: 1500});
                        }, 600);
                    }
                    console.log(res);
                }).catch((err) => {
                })
            },
            // *点击纠错*/
            errorCorrectings() {
                this.errorCorrecting = true;
                this.$nextTick(() => {
                    $('.err-textArea').focus();
                }, 300)
            },
            // *清楚input ->收藏*/
            closeInputVals() {
                if (this.inputVal.length != 0) {
                    this.inputVal = '';
                    document.querySelector('.closeInputVal').style.display = 'none';
                    document.querySelector('.createVal').focus();
                }
            },
            // 获取问答结果
            ansDetails() {
                /* this.questions =(this.questions);*/
                this.$http({
                    url: this.$api.host + "askQuestion",
                    params: {
                        question: this.questions,
                        scopeId: this.scopeIds,
                        platform: 'web'
                    }
                }).then((res) => {
                    $('.loading-am').show();
                    if (res.data.returnCode == 1) {
                        console.log(res.data.returnObject);
                        this.normQuestions = res.data.returnObject.normQuestion;
                        this.contents = res.data.returnObject.content;
                        this.relatedQuestion = res.data.returnObject.relatedQuestions;
                        $('.loading-am').hide();
                    }
                }).catch((err) => {
                    $('#warning').show();
                });
            },
            //
            linkList(index) {
                this.questions = this.relatedQuestion[index];
                console.log(this.questions);
                this.$router.push({
                    path: '/answersDetails', query: {
                        question: this.questions,
                        scopeId: this.scopeIds,
                        MathTime: global.timestamp
                    }
                });
                //this.ansDetails();
                this.linkShows = false;
            },
            // *动态获取元素的高度*/
            heightH() {
                console.log(document.body.clientHeight);
                var couHeight = document.body.clientHeight;
                var ah = $(".ans-story").height() + 32 + 7.5;
                var fh = $(".ans-footer").height();
                var qh = (couHeight - ah - fh) / (couHeight) * 100;
                $(".ans-scroll").css('height', qh + "%");
            },
            // *收藏显示*/
            collectShow() {
                if (this.isOnload == false) {
                    this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                } else if (this.isOnload == true) {
                    $('.v-modal').css({'z-index': '200'});
                    this.collectShows = true;
                }
            },
            // *相关内容显示*/
            linkShow() {
                this.linkShows = true;
            },
        }
    }
</script>
<style lang="scss">
    #answersDetails ol, #answersDetails li {
        list-style-type: none !important;
    }
    #answersDetails li {
        list-style-type: none !important;
    }
    .answersDetails {
        .ans-footer {
            height: 50px;
            width: 100%;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 0;
            .mint-tabbar {
                height: 100%;
                box-sizing: border-box;
                .is-selected {
                    background-color: transparent;
                }
                .mint-tab-item {
                    .mint-tab-item-icon {
                        margin: 0 auto;
                        div {
                            text-align: center;
                            img {
                                height: 18px;
                                padding-top: 0;
                            }
                        }
                    }
                    .mint-tab-item-label {
                        p {
                            margin: 0;
                            font-size: 15px;
                            color: #545454;
                        }
                    }
                }
            }
        }
        .ans-popup {
            max-height: 400px;
            background-color: white;
            width: 100%;
            .ans-popup-title {
                height: 49px;
                width: 100%;
                color: #323232;
                background-color: white;
                line-height: 50px;
                text-align: center;
                margin: 0;
                font-size: 17px;
                box-sizing: border-box;
                font-family: PingFangSC-Medium, sans-serif, Microsoft Yahei, Helvetica;
            }
            .err-footer {
                position: absolute;
                bottom: 0;
                height: 49px;
                width: 100%;
                font-size: 0;
                border-top: 0.5px solid #f0f1f5;
            }
        }
    }
</style>

<style scoped lang="scss">
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
        > .waringImg {
            height: 110px;
            width: 118.25px;
            margin: 38.2% auto 0 auto;
            background-image: url("/static/img/warning/warnin.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .waringText {
            font-size: 15px;
            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            color: #ffb148;
            padding: 20px 0 0 0;
            text-align: center;
        }
        .waringBtn {
            box-shadow: none;
            color: white;
            border: 0;
            width: 90px;
            margin-top: 20px;
            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
            height: 30px;
            background: #ffb148;
        }
    }
    /**/
    #answersDetails {
        height: 100%;
        overflow: hidden;
    }
    #answersDetails .ans-story {
        padding: 16px 12px;
    }
    #answersDetails .err-text {
        width: 100%;
    }
    #answersDetails .err-textArea {
        border: none;
        outline: none;
        padding: 12px;
        resize: none;
        width: 100%;
        height: 202px;
        line-height: 18px;
        font-weight: normal;
        -webkit-overflow-scrolling: touch;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
        /**/
        box-sizing: border-box;

    }
    #answersDetails .ans-text {
        display: inline-block;
        font-size: 17px;
        padding-bottom: 5px;
        text-align: justify;
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    #answersDetails .ans-xiaoAn-txt1 {
        background-image: url("/static/img/personal/focus/foc.png");
        background-size: contain;
        background-repeat: no-repeat;
        height: 26px;
        width: 60px;
        position: absolute;
        right: 12px;
        top: 8.5px;

    }
    #answersDetails .ans-plate-list {
        display: inline-block;
        padding-right: 5px;
    }
    #answersDetails .ans-plate-list span {
        text-align: center;
        display: inline-block;
        padding: 0 5px;
        border-radius: 20px;
        font-size: 10px;
        border: 1px solid #f0ad4e;
    }
    #answersDetails .ans-plate-list:last-child {
        padding-right: 0;
    }
    #answersDetails .ans-foo {
        height: 7.5px;
        background-color: #f0f1f5;
    }
    #answersDetails .ans-result {
        padding: 17px 12px 30px 12px;
    }
    #answersDetails .ans-text-result {
        width: 100%;
        text-align: justify;
        font-size: 15px;
        line-height: 18px;
        font-family: PingFangSC-Regular, sans-serif, "Microsoft Yahei", "Helvetica";
    }
    #answersDetails .ans-result-luo {
        text-align: right;
        font-size: 14px;
        color: #c6c6c6;
    }
    #answersDetails .ans-result-date {
        text-align: right;
        font-size: 14px;
        color: #c6c6c6;
    }
    #answersDetails .ans-result-gl-text {
        padding-top: 28px;
    }
    #answersDetails .ans-xiaoAn {
        position: relative;
        padding: 8px 12px 4px 12px;
        border-bottom: 0.5px solid #e3e3e3;
    }
    #answersDetails .ans-xiaoAn-img {
        display: inline-block;
        height: 27.5px;
        width: 27.5px;
        background: url("/static/img/answers/xiaoanlogo3x.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #answersDetails .ans-xiaoAn-text {
        position: relative;
        top: -7px;
        display: inline-block;
        padding-left: 5px;
        color: #8d8d8d;
    }
    #answersDetails .collect-foot {
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-shadow: none;
        border-top: 0.5px solid #f0f1f5;
        font-size: 17px;
        color: #f6900c;
        line-height: 50px;
        /*position: absolute;
        bottom: 0;*/
    }
    #answersDetails #ans-content {
        line-height: 20px;
        color: #323232;
    }
    #answersDetails li {
        list-style: none !important;
    }
    /**/
    #answersDetails .ans-scroll {
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    /*底部分享收藏相关内容按钮*/
    #answersDetails .mint-button::after {
        background-color: #f0f1f5 !important;
    }
    /*底部弹出框*/
    #answersDetails .ans-error {
        height: 300px;
        position: fixed !important;
    }
    #answersDetails .err-foot, .err-foot2 {
        width: 50%;
        border: 0;
        height: 100%;
        display: inline-block;
        box-shadow: none;
        background-color: white;
        color: #ffb148;
        border-radius: 0;
    }
    #answersDetails .err-foot2 {
        background-color: #ffb148;
        color: white;
    }
    #answersDetails .link-head {
        border-bottom: 0.5px solid #f0f1f5;
    }
    #answersDetails .linkList {
        color: #323232;
        font-size: 15px;
        line-height: 16px;
        border-bottom: 0.5px solid #f0f1f5;
        font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
    }
    #answersDetails .linkList:last-child {
        border-bottom: none;
    }
    #answersDetails .linkList .linkBtn:active {
        background-color: #f0f1f5;
    }
    #answersDetails #ans-content li {
        list-style-type: none !important;
    }
    #answersDetails .linkGal {
        padding: 0 12px;
        height: 250px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    #answersDetails .linkBtn {
        border: 0;
        box-shadow: none;
        background-color: white;
        width: 100%;
        height: auto;
        font-size: 15px;
        text-align: left;
        padding: 10px 0;
        color: #323232;
    }
    /**/
    #answersDetails .default {
        padding: 0 12px;
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
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
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
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
    #answersDetails .ans-home {
        position: absolute;
        bottom: 72.5px;
        right: 12px;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.47);
        text-align: center;
        box-shadow: 2px 1px 20px #e3e3e3;
    }
    #answersDetails .ans-home:active {
        background: rgba(0, 0, 0, 0.44);
        /*opacity: 0.6;*/
    }
    #answersDetails .ans-homeIcon {
        background-image: url("/static/img/answers/home.png");
        background-repeat: no-repeat;
        background-size: contain;
        height: 18px;
        width: 21px;
        margin: 5px auto 0 auto;
    }
    #answersDetails .ans-homeText {
        font-size: 11px;
        margin-top: 2px;
        color: white;
    }
    #answersDetails .loading-am {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1200;
        overflow: hidden;
        display: none;
        background: rgba(255, 255, 255, 0.2);
    }
    @media (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
        #answersDetails .ans-home {
            bottom: 95px;
        }
    }
    /**/
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
        position: relative;
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
        box-sizing: border-box;
        -webkit-appearance: none !important;
        font-size: 15px;
        outline: none;
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
        outline: none;
    }
    .collect_shg button:active {
        /*background-color: #f0f1f5;*/
        opacity: 0.6;
    }
    .closeInputVal {
        position: absolute;
        top: 9px;
        right: 5%;
        height: 16px;
        display: none;
        /*background: #000;*/
    }
    .collect_create span img {
        height: 14px;
        width: 14px;

        position: relative;
        top: 1px;
        left: 0;
    }
    .collect_create {
        display: inline-block;
        float: right;
        font-size: 11px;
        color: #323232;
        border: 0 !important;
    }
    .collect_create span {
        margin-right: 3px;
    }
    /***********************************/
    .am-collect-padding {
        padding: 0 !important;
    }
    .collect_create span img {
        height: 14px;
        width: 14px;

        position: relative;
        top: 1px;
        left: 0;
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
    .default .collect-def:active {
        background-color: #f0f1f5;
    }
    .default .create:active {
        background-color: #f0f1f5;
        /*opacity: 0.6;*/
    }
    .default .collect-def {
        height: 50px;
        /*line-height: 50px;*/
        box-sizing: border-box;
        height: auto;
        overflow: hidden;
        position: relative;
    }
    .defaultText {
        display: inline-block;
        text-align: left;
        float: left;
    }
    .default div {
        box-sizing: border-box;
        /*line-height: 50px;
        height: 50px;*/
        padding: 10px 0;
        font-size: 15px;
        overflow: hidden;
        position: relative;
        border-bottom: 0.5px solid #e3e3e3;
    }
    .default div .collect_create {
        padding: 0;
        position: absolute;
        right: 0px;
        bottom: 6px;
    }
    .default div:last-child {
        border-bottom: 0;
    }
    .default .create {
        font-size: 15px;
        border-bottom: 0.5px solid #e3e3e3;
        position: relative;
        overflow: hidden;
    }
    .default .create:last-child {
        border-bottom: none;
    }
    .inOperation {
        position: absolute;
        top: 0;
        right: 12px;
    }
    .inOperation img {
        width: 80px;
    }
    .collectText {
        font-size: 12px !important;
    }

</style>
