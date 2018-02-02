<template>
    <div class="detailReport" id="detailReport">
        <div class="detailTitle" id="detailTitle">
            <p class="countTitle" style="position: relative">{{titleName}}</p>
        </div>
        <div class="content" id="content">
            <div id="detailText">
                <div id="detail-contents" v-html="detailContents"></div>
            </div>
        </div>
        <div class="pdfGlobal">
            <div class="pdfreport">
                <img :src="pdfimg" class="pdfimg">
                <!--<a class="pdflink" :href="pdfUrl">点击查看PDF全文</a>
                <span>&ensp;&ensp;<|></span>-->
                <a href="javascript:void(0)" @click="goPdf" class="pdflink">点击查看PDF全文</a>
            </div>
        </div>
        <span class="tt-clue" :class="{clueActive: IsActive}">好内容点此收藏哟</span>

        <div class="show_footer">
            <a href="javascript:void(0)" class="show_items" id="share_item" @click="shareMethod">
                <span class="show_shareIcon"></span>
                <span class="show_share">基本信息</span>
            </a>
            <a href="javascript:void(0)" class="show_items" id="collect_item" @click="collectMethod">
                <span class="show_collectIcon"></span>
                <span class="show_collect">收藏</span>
            </a>
            <a href="javascript:void(0)" class="show_items" id="relative_item" @click="relativeMethod">
                <span class="show_relativeIcon"></span>
                <span class="show_relative">相关内容</span>
            </a>
        </div>
        <div class="am-share">
            <h3 class="am-share-title">基本信息</h3>
            <div class="rulesPlateHeader">
                <div class="smCaption">
                    <div class="units">
                        <div class="unitsTitle">报告标题：</div>
                        <div class="unitsCont"><span class="unitsName unit">{{titleName}}</span>
                        </div>
                    </div>
                </div>
                <div class="smCaption">
                    <div class="units">
                        <div class="unitsTitle">报告作者：</div>
                        <div class="unitsCont">{{author?author:'无'}}</div>
                    </div>
                </div>
                <div class="smCaption">
                    <div class="units">
                        <div class="unitsTitle">报告分类：</div>
                        <div class="unitsCont">{{levelTwo?levelTwo:'无'}}</div>
                    </div>
                </div>
                <div class="smCaption">
                    <div class="units nounits">
                        <div class="unitsTitle">发布日期：</div>
                        <div class="unitsCont">{{sentDate?sentDate:'无'}}</div>
                    </div>
                </div>
            </div>
            <div class="am-share-footer">
                <button class="share_btn">取消</button>
            </div>
        </div>
        <div class="am-collect">
            <h3 class="am-collect-title">收藏</h3>
            <div class="collect_shg">
                <div class="inputgle">
                    <input v-model="inputVal" type='text' @input="createVal1(40)" @focus="editFocus($event)"
                           :placeholder='placeholders'
                           class="createVal"/>
                    <img v-lazy="close" alt="" @click="closeInputVals" class="closeInputVal">
                </div>
                <div class="inputbtn">
                    <button class='createDom' @click="createDom">创建</button>
                </div>
            </div>
            <div class="am-collect-sns am-collect-padding">
                <div class="collectMaxHeight">
                    <div class="default">
                        <div class="collect-def" @click="collectD">
                            <span class="defaultText">默认收藏夹</span>
                        </div>
                        <div class="create collect-list" v-for="(list,index) in collcell"
                             @click="addCollect(index)">
                            <span class="defaultText">{{list.favouriteName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="am-share-footer">
                <button class="share_btn">取消</button>
            </div>
        </div>
        <div class="am-relative">
            <h3 class="am-relative-title">相关内容</h3>
            <ul class="am-relative-sns">
                <li v-for="(list,index) in newAttachment" @click="relevantLink(index)">
                    <div style="text-align: left">{{ list.subject }}</div>
                </li>
            </ul>
            <ul class="am-relative-sns" v-show="RelativeSns">
                <li>暂无相关！</li>
            </ul>
            <div class="am-share-footer">
                <button class="share_btn">取消</button>
            </div>
        </div>
        <!--/*目录侧边栏*/-->
        <div class="returnTop" @click="return_Top">
            <span>顶部</span>
        </div>
        <!--返回首页-->
        <div class="returnHome" @click="return_Home">
            <span>主页</span>
        </div>
        <xiaoan-loading v-show="loading" borderWidth="2.5px" width="20px"></xiaoan-loading>
        <xiaoan-error v-show="loadError"></xiaoan-error>
    </div>
</template>

<script>
    import loading from "../warning/loading.vue"
    import err from "../warning/error"

    export default {
        name: 'detailRe',
        data() {
            return {
                inputVal: '',
                IsActive: true,
                close: '../../static/img/personal/collect/close.png',
                pdfimg: '../../static/img/report/pdf.png',
                titleName: '',
                scopesName: '',
                placeholders: '请输入新建收藏夹名称(最多40个字)',
                collcell: [],
                relevantList: [],
                loading: false,//是否加载中状态
                detailContents: "",
                pdfUrl: "",
                author: "",
                levelOne: "",
                levelTwo: '',
                sentDate: '',
                bottom: 10,
                pageTop: 1,
                newAttachment: [],
                loadError: false,
                RelativeSns: false,
                shareUrl: "",
            }
        },
        components: {
            'xiaoan-loading': loading,
            "xiaoan-error": err
        },
        watch: {
            '$route'(to, from, next) {
                window.location.reload();
            }
        },
        created() {
            let userId = this.$cookie.getCookie("userId");
            this.user_id = userId;
            if (userId) {
                // this.loadingDis = true;
            } else {
                this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
            }
            this.rulesId = this.$route.query.id;
            this.loading = true;
            this.rulestext();//页面获取内容
        },
        mounted() {
            this.$share.share = window.location.href;
            if (this.user_id) {
                // 有this.user_id
            } else {
                setTimeout(() => {
                    this.IsActive = false;
                    setTimeout(() => {
                        this.IsActive = true;
                    }, 5000)
                }, 2000)
            }
        },
        updated() {
            this.textHeight();
        },
        methods: {
            //动态设置屏幕内容高度
            textHeight() {
                this.$nextTick(() => {
                    let winHeight = document.body.clientHeight;
                    let anTitle = document.querySelector(".detailTitle").clientHeight;
                    let anfoot = document.querySelector(".show_footer").clientHeight;
                    let anpdf = document.querySelector(".pdfGlobal").clientHeight;
                    let toheight = (winHeight - (anTitle + anfoot + anpdf)) + "px";
                    document.querySelector("#content").style.height = toheight;
                    console.log(anTitle, anfoot, toheight, anpdf);
                })
            },
            //详情跳转到法规的主页
            return_Home() {
                this.$router.push({path: "/Law", query: {MathTime: global.timestamp}});
            },
            shadowClose() {
                this.popupVisible = false;
                $(".shadow").hide();
            },
            relativeMethod() {
                this.$nextTick(() => {
                    this.toshare(".am-relative");
                });
            },
            shareMethod() {
                this.$nextTick(() => {
                    this.toshare(".am-share");
                });
            },
            collectMethod() {
                console.log('userId=' + this.user_id);
                if (this.user_id == '') {
                    console.log(window.location.href);
                    if (!window.sessionStorage) {
                        return false;
                    } else {
                        // 主逻辑业务
                        this.$storage.loginStatus(this, this.$route.meta.title, window.location.href);
                    }
                } else {
                    this.$nextTick(() => {
                        this.toshare(".am-collect");
                        this.createCollect();
                        this.getDef();
                    })
                }
            },
            //构造遮罩层
            toshare(cname) {
                $(cname).addClass("am-modal-active");
                if ($(".sharebg").length > 0) {
                    $(".sharebg").addClass("sharebg-active");
                } else {
                    $("#detailReport").append('<div class="sharebg"></div>');
                    $(".sharebg").addClass("sharebg-active");
                    $("#content").css('overflow-y', 'hidden')
                }
                $(".sharebg-active,.share_btn").click(function () {
                    $(cname).removeClass("am-modal-active");
                    setTimeout(function () {
                        $(".sharebg-active").removeClass("sharebg-active");
                        $(".sharebg").remove();
                    }, 300);
                    $("#content").css('overflow-y', 'auto');
                })
            },
            /********************************************************/
            createDom() {
                $('.createVal').blur();
                if (this.inputVal.trim().length != 0) {
                    this.$http({
                        method: "POST",
                        url: host + "favourite/addFavourite",
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
                            this.$toast({message: '创建收藏夹成功', position: 'middle', duration: 1000});
                        } else if (res.data.returnCode == 3) {
                            this.$toast({message: '收藏夹不能相同', position: 'middle', duration: 1000});
                        } else if (res.data.returnCode == 2) {
                            this.$toast({message: '最多只能创建十个收藏夹', position: 'middle', duration: 1000});
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            },
            //根据用户id获取收藏夹
            createCollect() {
                this.$http({
                    method: 'GET',
                    url: host + "favourite/getFavourite",
                    params: {
                        userId: this.user_id,
                        pageSize: this.bottom,
                        pageIndex: this.pageTop
                    }
                }).then((res) => {
                    console.log(res);
                    console.log(res.data.returnObject);
                    if (res.data.returnCode == 1) {
                        this.collcell = res.data.returnObject.list;
                        this.num = res.data.returnObject.list.length;
                    }
                }).catch((err) => {
                    //this.$toast({message: '网络请求异常', position: 'middle', duration: 1500});
                });
            },
            //获取默认收藏夹
            getDef() {
                this.$http.get(host + "favourite/getDefault?userId=" + this.user_id).then((res) => {
                    this.getDefS = res.data.returnObject;
                    console.log(this.getDefS.id, this.getDefS);
                }).catch((err) => {
                    console.log(err);
                })
            },
            //添加到默认
            collectD() {
                console.log("===>", 1111);
                this.$http({
                    method: "GET",
                    url: host + "collect/addCollect",
                    params: {
                        refId: this.rulesId, //文章id
                        favourableId: this.getDefS.id,//文件夹id
                        title: this.titleName,//标题名
                        publishTime: this.relDate,//发布时间
                        type: "report",//类型
                    }
                }).then((res) => {
                    if (res.data.returnCode == 2) {
                        this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
                    } else {
                        this.getDef();
                        this.createCollect();
                        this.$toast({message: '收藏成功', position: 'middle', duration: 1500});
                    }
                    console.log(res);
                }).catch((err) => {
                })
            },
            //根据收藏夹添加
            addCollect(index) {
                console.log(this.collcell[index].id, this.releaseStart);//收藏夹id
                this.$http({
                    method: "GET",
                    url: host + "collect/addCollect",
                    params: {
                        refId: this.rulesId, //文章id
                        favourableId: this.collcell[index].id,//文件夹id
                        title: this.titleName,//标题名
                        publishTime: this.relDate,//发布时间
                        type: "report",//类型
                    }
                }).then((res) => {
                    if (res.data.returnCode == 2) {
                        this.$toast({message: '你已添加进此收藏夹', position: 'middle', duration: 1500});
                    } else {
                        this.$toast({message: '收藏成功', position: 'middle', duration: 1500});
                        this.createCollect();
                    }
                    console.log(res);
                }).catch((err) => {
                })
            },
            /**/
            closeInputVals() {
                if (this.inputVal.length != 0) {
                    this.inputVal = '';
                    document.querySelector('.closeInputVal').style.display = 'none';
                    document.querySelector('.createVal').focus();
                }
            },
            /**************************************************/
            //返回顶部
            return_Top() {
                $("#content").animate({scrollTop: 0});
            },
            /**/
            rulestext() {
                this.$http({
                    method: "GET",
                    url: host + "report/getReportDetails",
                    params: {
                        id: this.rulesId,
                    }
                }).then((res) => {
                    this.loading = false;
                    if (res.data.returnCode == 1) {
                        let detailContents = res.data.returnObject.summary;
                        if (detailContents == null) {
                            this.detailContents = detailContents;
                        } else {
                            let detailContVal = detailContents.split("\r\n");
                            let detailContVal2 = this.$array.ImpArr(detailContVal);//去除空元素
                            let arr = [];
                            for (let i = 0; i < detailContVal2.length; i++) {
                                detailContVal2[i] = "<p>" + detailContVal2[i] + "</p>";
                                arr.push(detailContVal2[i]);
                            }
                            console.log('123323', arr);
                            let detailContVal3 = arr.join("");
                            detailContVal3 = detailContVal3.replace("报告标题=", "");//剔除报告标题=
                            detailContVal3 = detailContVal3.replace("报告日期=", "");//剔除报告日期=
                            let val = "【报告摘要】";
                            let reg = new RegExp('(' + val + ')', 'gm');
                            this.detailContents = detailContVal3.replace(reg, "<h2 class='highlight'>$1</h2>");
                        }
                        this.titleName = res.data.returnObject.subject;//标题
                        window.document.title = this.titleName;
                        this.pdfUrl = res.data.returnObject.pdfUrl;//pdf url
                        var protocol = 'https:' == document.location.protocol ? 'https:' : 'http:';
                        this.pdfUrl = this.pdfUrl.replace("http:", protocol);
                        this.levelTwo = res.data.returnObject.levelTwo; //分类
                        this.levelOne = res.data.returnObject.levelOne; //分类
                        let industry = res.data.returnObject.industry;
                        let id = res.data.returnObject.id;
                        let companyCode = res.data.returnObject.companyCode;
                        this.author = res.data.returnObject.author;//作者名
                        this.relDate = res.data.returnObject.sentDate;
                        this.sentDate = this.$const.formatText(res.data.returnObject.sentDate); //时间

                        if (this.levelOne == "行业报告" && industry != "") {
                            console.log(0);
                            this.attachment0(industry, id);
                        } else if (this.levelOne == "公司报告" && industry != "") {
                            console.log(1);
                            this.attachment1(industry, id, companyCode);
                        } else {
                            //综和
                            this.attachment2(this.levelOne, id);
                            console.log(2);
                        }
                        /***************/
                        let adverttitle = document.title;
                        let sharelink2 = this.$share.share;//分享链接
                        let shareDesc = "用信公小安，随时掌握最新研报";//描述
                        this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
                    }
                }).catch((err) => {
                    this.loadError = true;
                    this.loading = false;
                    console.log(err);
                })
            },
            ///行业
            attachment0(levelOne, id) {
                this.$http({
                    method: "GET",
                    url: host + "report/getRelatedIndutryReport",
                    params: {
                        pageNum: 1,
                        pageSize: 5,
                        industry: levelOne,
                        id: id,
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        this.newAttachment = res.data.returnObject;
                    } else {
                        this.RelativeSns = true;
                    }

                }).catch((err) => {
                    this.RelativeSns = true;
                })
            },
            //公司
            attachment1(levelOne, id, companyCode) {
                this.$http({
                    method: "GET",
                    url: host + "report/getRelatedCompanyReport",
                    params: {
                        pageNum: 1,
                        pageSize: 5,
                        industry: levelOne,
                        id: id,
                        code: companyCode,
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        this.newAttachment = res.data.returnObject;
                    } else {
                        this.RelativeSns = true;
                    }
                }).catch((err) => {
                    this.RelativeSns = true;
                })
            },
            //综合
            attachment2(levelOne, id) {
                this.$http({
                    method: "GET",
                    url: host + "report/getRelatedIntegratedReport",
                    params: {
                        pageNum: 1,
                        pageSize: 5,
                        type: levelOne,
                        id: id
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        this.newAttachment = res.data.returnObject;
                    } else {
                        this.RelativeSns = true;
                    }
                }).catch((err) => {
                    this.RelativeSns = true;
                })
            },
            relevantLink(index) {
                this.$router.push({path: "", query: {id: this.newAttachment[index].id, MathTime: global.timestamp}})
            },
            //离开当前页面后
            goPdf() {
                this.$router.push({
                    path: "/pdfReport",
                    query: {id: this.rulesId, url: this.pdfUrl, title: this.titleName}
                });
            },
            destroyed: function () {
                $(".sharebg-active").hide();
                // window.sessionStorage.clear();
            }
        }
    }
</script>
<style lang="scss">
    #detail-contents {
        padding: 10px 0;
    }
    #detail-contents {
        text-align: justify;
        word-spacing: 0;
        color: #323232;
    }
    #detail-contents pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        font-size: 16px;
        margin: 5px 0;
        line-height: 20px;
        font-weight: normal;
    }
    #detail-contents p {
        font-size: 16px;
        margin: 16px 0;
        font-family: PingFangSC-Light, sans-serif, PingFangSC-Thin, sans-serif, PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        text-align: justify;
        box-sizing: border-box;
        text-indent: 2em;
        word-break: break-all;
        line-height: 28px;
    }
    #detail-contents h1, #detail-contents h1 * {
        padding: 0;
        margin: 0;
        line-height: 25px;
        font-size: 16px;
        text-align: center;
    }
    #detail-contents h1 {
        padding: 10px 0 0 0;
    }
    #detail-contents h1 + p {
        margin: 0;
    }
    /*#detail-contents > div {
        text-align: left;
    }*/
    #detail-contents div {
        color: #323232;
    }
    #detail-contents h2, #detail-contents h2 * {
        margin: 5px 0 0 0;
        font-size: 16px;
    }
    #detail-contents h3, #detail-contents h3 * {
        box-sizing: border-box;
        margin: 5px 0 5px 0;
        font-size: 16px !important;
        color: #323232 !important;
    }
    #detail-contents h4, #detail-contents h4 * {
        font-size: 16px;
        border-radius: 2px !important;
        margin: 5px 0 !important;
        text-indent: 2em !important;
        text-decoration: line-through !important;
    }
    #detail-contents h5, #detail-contents h5 * {
        margin: 0 !important;
        text-align: right !important;
        font-size: 16px !important;
        color: #323232;
        font-weight: normal !important;
    }
    #detail-contents h6, #detail-contents h6 * {
        font-size: 14px !important;
        font-style: oblique !important;
        margin: 15px 0;
    }
    #detail-contents a {
        text-decoration: none;
        word-wrap: break-word;
    }
    #detail-contents a:hover, #detail-contents a:visited, #detail-contents a:link, #detail-contents a:active {
        color: #3D3DF2;
        text-decoration: none !important;
    }
    #detail-contents p cite, #detail-contents p cite * {
        color: #3D3DF2;
        font-style: italic !important;
    }
    #detailReport .sharebg {
        background-color: rgba(0, 0, 0, 0.6);
        height: 100%;
        width: 100%;
        overflow: hidden;
        opacity: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        top: 0;
        z-index: 70;
        display: none;
    }
    #detailReport .sharebg-active {
        opacity: 1;
        display: block;
    }
</style>

<style scoped lang="scss">
    #detailText {
        height: 100%;
        padding: 0 10px;
        font-family: PingFangSC-Light, sans-serif;
    }
    #content {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        height: 73%;
        overflow-y: auto;
        overflow-x: hidden;
    }
    /*todo
    *table
    */
    /**************表格横向滚动*************/
    image[lazy=loading] {
        width: 40px !important;
        height: 40px !important;
        margin: auto !important;
        opacity: 0 !important;
    }
    image[lazy=error] {
        opacity: 0 !important;
    }
    .detailReport {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .clueActive {
            opacity: 0 !important;
            bottom: 55px !important;
        }
        .tt-clue {
            width: 120px;
            height: auto;
            line-height: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 14px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 4px solid rgba(255, 177, 72, 0.9);
            text-indent: 0px;
            border-radius: 5px;
            position: absolute;
            pointer-events: none;
            background-color: rgba(255, 177, 72, 0.9);
            color: white;
            bottom: 62px;
            opacity: 1;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            -webkit-transition: all 1s ease-in-out;
            -moz-transition: all 1s ease-in-out;
            -o-transition: all 1s ease-in-out;
            -ms-transition: all 1s ease-in-out;
            transition: all 1s ease-in-out;
            &:before, &:after {
                content: '';
                position: absolute;
                bottom: -14px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid rgba(255, 177, 72, 0.9);
            }
        }
    }
    .rulesBtn img {
        width: 15px;
        float: left;
        padding: 14px 0;
    }
    .detailTitle {
        padding: 15px 12px 15px 12px;
        border-bottom: 0.5px solid #e3e3e3;
        line-height: 26px;
        font-size: 20px;
        background-color: white;
        text-align: justify;
        font-family: PingFangSC-Medium, sans-serif;
        color: #323232 !important;
    }
    /*********************/
    .rulesPlate {
        background-color: white;
        padding: 12px 12px 0 12px;
        font-size: 14px;
        text-align: left;
        color: #323232;
    }
    .rulesPlate .rulesGulop {
        padding-bottom: 12px;
        border-bottom: 0.5px solid #e3e3e3;
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
        padding: 12px 12px 0 12px;
        color: #323232;
    }
    .smCaption .units {
        display: flex;
        flex-flow: row;
        color: #323232;
        font-size: 15px;
        padding-bottom: 12px;
        border-bottom: 0.5px solid #e3e3e3;
    }
    .nounits {
        border-bottom: none !important;
    }
    .unitsCont {
        /*padding-right: 44px;*/
        text-align: justify;
        flex: 1;
        box-sizing: border-box;
    }
    /*********************/
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
    .rulesFoot div {
        width: 33.33333333%;
        height: auto;
        text-align: center;
        display: inline-block;
        float: left;
        font-size: 12px;
    }
    .rulesFoot div img {
        height: 22px;
        display: block;
        position: relative;
        left: 40%;
        top: 6px;
    }
    .rulesFoot div span {
        position: relative;
        top: 7px;
    }
    .pdfGlobal {
        width: 100%;
        height: 45px;
        padding: 0 12px;
        box-sizing: border-box;
        position: absolute;
        bottom: 50px;
    }
    .pdfreport {
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        line-height: 45px;
        background: #fff;
        border-top: 0.5px solid #e3e3e3;
        -webkit-box-sizing: border-box;
    }
    .pdfreport .pdflink {
        display: inline-block;
        margin-left: 10px;
        text-decoration: underline;
        font-size: .4rem;
        color: #3D3DF2;
    }
    .pdfreport .pdfimg {
        height: 18px;
    }
    /*底部分享收藏相关内容按钮*/
    .show_footer {
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        background: #f0f1f5;
        border-top: 1px solid #e3e3e3;
        box-shadow: 0 -8px 13px rgba(0, 0, 0, .02);
        -webkit-box-sizing: border-box;
    }
    .show_footer .show_items {
        width: 33.333%;
        height: 100%;
        display: block;
        text-align: center;
        color: #767877;
        font-size: 12px;
        text-decoration: none;
    }
    .show_footer .show_items.active {
        color: #f6900c;
    }
    .show_footer .show_items span {
        display: block;
        width: 100%;
    }
    .show_shareIcon, .show_collectIcon, .show_relativeIcon {
        height: 50%;
    }
    .show_list, .returnTop, .returnHome {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .44);
        color: #fff;
        text-align: center;
        line-height: 20px;
        position: absolute;
        bottom: 125px;
        right: 25px;
        z-index: 10;
        font-size: 11px;
        overflow: hidden;
    }
    .show_list span {
        display: block;
        width: 21px;
        height: 14px;
        margin: 7.5px auto 0;
        background-image: url("/static/img/rules/listmenu.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .returnTop span {
        display: block;
        width: 25px;
        padding-top: 10px;
        height: 12.5px;
        margin: 8px auto 0;
        background-image: url("/static/img/rules/return.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    .returnTop {
        bottom: 4.2rem !important;
        line-height: 25px;
    }
    /*home的返回按钮*/
    .returnHome span {
        display: block;
        width: 24px;
        padding-top: 13px;
        height: 8.5px;
        margin: 6px auto 0;
        background-image: url(/static/img/rules/home.png);
        background-size: contain;
        background-repeat: no-repeat;
    }
    .returnHome {
        bottom: 2.6rem !important;
        line-height: 33px;
    }
    .property p {
        margin: 0;
    }
    .p_unit span {
        display: inline-block;
        width: 40px;
        height: 20px;
        border-radius: 50px;
        text-align: center;
        line-height: 20px;
        margin-right: 5px;
    }
    .show_text p {
        font-size: 17px;
        color: #444;
        line-height: 21.5px;
        margin: 7.5px 0;
        text-indent: 30px;
    }
    .show_text .show_rise {
        text-indent: 0;
    }
    .show_text .chapter {
        font-size: 17px;
        color: #323232;
        font-weight: bold;
        margin-top: 25px;
        margin-bottom: 15px;
    }
    .show_text table {
        width: 100%;
        height: auto;
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
        text-align: center;
        font-size: 12px;
        border-collapse: collapse;
        color: #323232;
        margin-bottom: 7.5px;
    }
    #con_title span {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        left: 12.5px;
        bottom: 0;
        top: 0;
        margin: auto 0;
        line-height: 30px;
        text-align: center;
        font-size: 30px;
    }
    .show_list_con li p {
        margin: 0;
        padding: 0;
    }
    @keyframes liin {
        0% {
            margin-top: 25px;
        }
        100% {
            margin-top: 0;
        }
    }
    @keyframes liout {
        0% {
            margin-top: 0;
        }
        100% {
            margin-top: 25px;
        }
    }
    @keyframes listshow {
        0% {
            position: absolute;
            top: 0;
            right: -300px;
            display: none;
        }
        100% {
            position: absolute;
            top: 0;
            right: 0;
            display: block;
        }
    }
    @keyframes listhide {
        0% {
            position: absolute;
            top: 0;
            right: 0;
            display: block;
        }
        100% {
            position: absolute;
            top: 0;
            right: -300px;
            display: none;
        }
    }
    .show_shadow {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        position: absolute;
        left: 0;
        top: 0;
        z-index: -5;
        /*-webkit-overflow-scrolling:touch;*/
    }
    #share_item, #collect_item, #relative_item {
        padding: 5px 0;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    #share_item:active, #collect_item:active, #relative_item:active {
        /*background-color: white;*/
        opacity: 0.6;
    }
    #share_item .show_shareIcon,
    #relative_item .show_relativeIcon,
    #collect_item .show_collectIcon {
        width: 20px;
        height: 20px;
        margin: 0 auto 2.5px;
        background-size: contain;
        background-repeat: no-repeat;
    }
    #share_item .show_shareIcon {
        background-image: url("/static/img/rules/Attribute.png");
    }
    #collect_item .show_collectIcon {
        background-image: url("/static/img/rules/celloctIcon.png");
    }
    #relative_item .show_relativeIcon {
        background-image: url("/static/img/rules/linkIcon.png");
        background-position: center;
    }
    .am-share, .am-collect, .am-relative {
        max-height: 400px;
        background: white;
        font-size: 14px;
        border-radius: 0;
        bottom: 0;
        left: 0;
        position: absolute;
        text-align: center;
        -webkit-transform: translateY(100%);
        -ms-transform: translateY(100%);
        transform: translateY(100%);
        -webkit-transition: -webkit-transform 300ms;
        transition: transform 300ms;
        width: 100%;
        z-index: 99;
    }
    .am-modal-active {
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0)
    }
    .am-modal-out {
        z-index: 80;
        -webkit-transform: translateY(100%);
        -ms-transform: translateY(100%);
        transform: translateY(100%)
    }
    .am-share-title, .am-collect-title, .am-relative-title {
        width: 100%;
        height: 50px;
        background-color: #fff;
        border-bottom: 0.5px solid #e3e3e3;
        /*box-shadow: 0 -1px 5px #e3e3e3;*/
        color: #323232;
        margin: 0;
        font-size: 17px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-family: PingFangSC-Medium, sans-serif, "Microsoft Yahei", "Helvetica";
        text-align: center;
        line-height: 50px;

    }
    .am-collect-title {
        border-bottom: none;
    }
    /* .am-share-title::after {
         border-bottom: 1px solid #dfdfdf;
         content: "";
         display: block;
         height: 0;
         margin-top: 5px;
         width: 100%;
     }*/
    .rulesPlateHeader {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 300px;
        -webkit-overflow-scrolling: touch;
    }
    .am-share-footer {
        width: 100%;
        height: 50px;
        font-size: 17px;
        font-family: PingFangSC-Medium, sans-serif;
    }
    .am-share-footer .share_btn {
        display: block;
        font-family: PingFangSC-Medium, sans-serif;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        text-align: center;
        line-height: 50px;
        background: white;
        color: #f6900c;
        border-top: 1px solid #eaeaea;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        font-size: 17px;
    }
    .am-share-sns, .am-collect-sns, .am-relative-sns {
        background-color: #fff;
        width: 100%;
        max-height: 300px;
        overflow-y: scroll;
        zoom: 1;
        margin: 0;
        padding: 0 12.5px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        list-style: none;
        display: flex;
        align-items: center;
        -webkit-overflow-scrolling: touch;
        font-size: 15px;
        color: #323232;
        /*justify-content: space-around;*/
    }
    .am-collect-sns {
        max-height: 249px;
        overflow-y: scroll;
    }
    .am-collect-sns, .am-relative-sns {
        display: block;
        font-size: 15px;
        color: #323232;
    }
    .am-collect-sns .collectMaxHeight {
        max-height: 250px
    }
    .am-relative-sns li {
        border-bottom: 0.5px solid #e3e3e3;
        padding: 17.5px 0;
        display: block;
    }
    .am-relative-sns li:active {
        background-color: #f0f1f5;
    }
    .am-collect-sns li {
        border-bottom: 1px solid #e3e3e3;
        padding: 15px 0;
        font-size: 14px;
        text-align: left;
    }
    .newfile button {
        display: inline-block;
        width: 40px;
        height: 30px;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        text-align: center;
        line-height: 30px;
        color: #f6900c;
        font-size: 15px;
        font-family: PingFangSC-Regular, sans-serif;
        border: 0;
        margin: 0;
        padding: 0;
        background: #f0f1f5;
    }
    .am-relative-sns li a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: left;
        text-decoration: none;
        font-size: 15px;
        color: #323232;
    }
    .am-relative-sns li:last-child {
        border: 0;
    }
    /*************************************************/
    #detailReport .shadow {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .4);
        z-index: 1111;
    }
    img[src=''] {
        opacity: 0 !important;
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
    .collect_create span {
        margin-right: 3px;
    }
    .default {
        padding: 0 12px;
    }
    .default .collect-def:active {
        background-color: #f0f1f5;
    }
    .default .create:active {
        background-color: #f0f1f5;
    }
    .default .collect-def {
        /*height: 50px;*/
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
        color: #323232;
    }
    .default div {
        box-sizing: border-box;
        /*line-height: 50px;
        height: 50px;*/
        padding: 10px 0;
        font-size: 15px;
        border-bottom: 0.5px solid #e3e3e3;
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
    /*********************************/
    .attachmentGroup ul, .attachmentGroup ul li {
        padding: 0;
        margin: 0;
        font-size: 16px;
    }
    .attachmentGroup {
        padding: 0;
    }
    .attachmentGroup h3 {
        margin: 3px 0;
        padding: 15px 0 0 0;
        font-size: 17px;
        color: #323232;
        font-weight: 600;
        border-top: 1px solid #f0f1f5;
    }
    .attachmentList .attach_list:active {
        color: #ffb148;
        text-decoration: underline;

    }
    .attachmentList li {
        padding: 5px 0 !important;
        text-align: justify;
    }
    .attachmentList li a {
        color: #323232;
        background-color: white;
        text-decoration: none;
    }
    .attachmentList li a:active {
        color: #ffb148;
        text-decoration: underline;
    }

</style>
