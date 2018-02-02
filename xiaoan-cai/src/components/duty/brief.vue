<template>
    <div id="brief">
        <div class="returnHomeb">
            <div class="briefImgIndex" v-for="(list,index) in imgs">
                <img v-lazy="list" alt="">
                <button class="briefImgBtn" @click="goToLaw(index)" v-show="index==0 && briefs == '4'">点一点</button>
                <button class="briefImgBtn2" @click="goToLaw(index)" v-show="index==imgs.length -1 && briefs == '4'">点一点
                </button>
            </div>
        </div>
        <v-returnHome position="fixed" bottom="6%"></v-returnHome>
    </div>
</template>

<script>
    import returnHome from "../warning/returnHome.vue"

    export default {
        name: 'brief',
        data() {
            return {
                briefs: '',
                imgs: [],
            }
        },
        created() {
            //取到路由传值
            if (this.$route.query.advert_Title !== undefined) {
                let adverttitles = decodeURI(decodeURI(this.$route.query.advert_Title));
                window.document.title = adverttitles;
            } else {
                let adverttitles = "小安指南";
            }
            this.briefs = this.$route.query.advert_Id;
        },
        mounted() {
            /*todo
            **/
            var adverttitle = decodeURI(window.document.title);
            var sharelink2 = decodeURI(window.location.href);// 分享链接
            var shareDesc = "";// 描述
            this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
            /**/
            this.aimg();
        },

        components: {
            "v-returnHome": returnHome
        },
        methods: {
            // 详情跳转到法规的主页
            return_Home() {
                this.$router.push({path: "/Law"});
            },
            goToLaw(index) {
                if (index == 0) {
                    // 点击上面的按钮
                    // MtaH5.clickStat('FU7K2kspH1IGRnOb', {'gsyl6a6n56tnq30b': 'true'});
                    this.$MTAmethod.mtaShare('FU7K2kspH1IGRnOb', {'gsyl6a6n56tnq30b': 'true'})
                } else {
                    // 点击下面的按钮
                    // MtaH5.clickStat('FU7K2kspH1IGRnOb', {'q68tz4evp1y1lcze': 'true'});
                    this.$MTAmethod.mtaShare('FU7K2kspH1IGRnOb', {'q68tz4evp1y1lcze': 'true'})
                }
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.$router.push({path: "Law"});
                    })
                });
                // console.log(index);
            },
            aimg() {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "getAdvertImg",
                    params: {
                        advertId: this.briefs
                    }
                }).then((res) => {
                    console.log(res);
                    this.imgs = res.data.returnObject;
                }).catch((err) => {
                    console.log(err);
                })
            },
        }
    }
</script>

<style>
    image[lazy=loading] {
        width: 40px;
        height: 40px;
        margin: auto;
        opacity: 0;
    }
</style>

<style scoped>
    #brief {
        width: 100%;
        height: 100%;
        font-size: 0;
        vertical-align: middle;
    }
    #brief img {
        background-color: white;
        width: 100%;
        height: 100%;
        z-index: 100;
    }
    .returnHomeb {
        width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        vertical-align: middle;
    }
    #brief .briefImgIndex {
        position: relative;
    }
    #brief .briefImgBtn {
        position: absolute;
        left: 50%;
        top: 53%;
        border: 0;
        background-color: rgba(255, 255, 255, 0);
        color: rgba(255, 255, 255, 0);
        height: 40px;
        width: 200px;
        transform: translateX(-50%);
    }
    #brief .briefImgBtn2 {
        position: absolute;
        left: 50%;
        bottom: 0.7%;
        border: 0;
        background-color: rgba(255, 255, 255, 0);
        color: rgba(255, 255, 255, 0);
        height: 40px;
        width: 200px;
        transform: translateX(-50%);
    }
    /*返回首页*/
    .returnHome {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .44);
        color: #fff;
        text-align: center;
        position: absolute;
        bottom: 65px;
        line-height: 33px;
        right: 25px;
        z-index: 10;
        font-family: PingFangSC-Semibold, sans-serif, Microsoft Yahei, Helvetica;
        font-size: 11px;
        overflow: hidden;
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

</style>
