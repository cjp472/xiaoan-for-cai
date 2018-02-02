<template>
    <transition name="bounce">
        <div class="pdfReport" id="pdfReport">
            <xiaoan-ioframe :src="pdfUrl"></xiaoan-ioframe>
        </div>
    </transition>
</template>

<script>
    import iframe from "../../components/dialog/iframe"

    export default {
        name: "pdfReport",
        data() {
            return {
                pdfUrl: "",
                pdfIframe: "/static/pdf/web/viewer.html?file=",
                loaded: false,
                errored: false,
                affId: '',
                getDetail: '',

            }
        },
        components: {
            "xiaoan-ioframe": iframe,
        },
        created() {
            this.affId = this.$route.query.id;
            this.getDetails();
        },
        mounted() {

        },
        methods: {
            getDetails() {
                this.$http({
                    method: "GET",
                    url: host + "disclosure/getDetails",
                    params: {
                        id: this.affId,
                    }
                }).then((res) => {
                    if (res.data.returnCode == 1) {
                        this.getDetail = res.data.returnObject;
                        window.document.title = this.getDetail.title;
                        let protocol = 'https:' == document.location.protocol ? 'https:' : 'http:';
                        let url = this.getDetail.url.replace('http:', protocol).replace('https:', protocol);
                        this.pdfUrl = global.currentIp + "/static/pdf/web/viewer.html?file=" + url;
                        this.$weixin.wxconfig(this);  // 11.1 修改  wx。config调用
                        let adverttitle = window.document.title;
                        let sharelink2 = decodeURI(global.currentIp + '#/afficheContent?id=' + this.affId);// 分享链接
                        let shareDesc = ""; // 描述
                        this.$weixin.wxshare(adverttitle, shareDesc, sharelink2, global.shareImg1, true);
                    } else {
                        this.$router.go(-1);
                    }
                    console.log(res);
                }).catch(() => {

                })
            }
        }
    }
</script>

<style lang="scss">
    #pdfReport, .pdfReport {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
</style>
