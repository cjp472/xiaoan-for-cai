<template>
    <div id="redirect">
        <div class="wxloading">
            <mt-spinner class="" type="fading-circle"></mt-spinner>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                code: ''
            }
        },
        methods: {
            wxOauthByCode(code, state) {
                this.$http({
                    method: 'GET',
                    url: this.$api.host + "wxauth/wxAuthByCode",
                    params: {
                        code: code
                    }
                }).then((res) => {
                    console.log('wxauth/wxAuthByCode', res);
                    if (res.data.returnCode === 1) {
                        //
                        this.linkPage(state, res.data.returnObject.openId);
                        //
                        let wxxinxi = window.JSON.stringify(res.data.returnObject);
                        window.localStorage.setItem('wx-auth', wxxinxi);
                    } else {
                        // this.$toast({message: res.data.returnMsg, position: "middle", duration: 3000})
                        setTimeout(() => {
                            this.$router.replace({path: '/Law', query: {MathTime: global.timestamp}});
                        }, 1000);
                    }
                }).catch((err) => {
                    console.error(err);
                    this.$toast({message: '获取微信授权信息失败', position: "middle", duration: 3000});
                    setTimeout(() => {
                        this.$router.replace({path: '/Law', query: {MathTime: global.timestamp}});
                        // location.href = global.currentIp;
                    }, 1000)
                })
            },
            // 授权登陆state ['TESTING-userid','COURSE-courseId','INVOICE','SUBSCRIBE','STATE']
            linkPage(state, openId) {
                if (state.indexOf('TESTING') > -1) {
                    let fromUserId = state.split('-')[1];
                    // this.$router.replace({
                    //     path: '/testing', query: {fromUserId: fromUserId, MathTime: global.timestamp}
                    // });
                    location.href = global.currentIp + '#/testing?fromUserId=' + fromUserId + '&MathTime=' + global.timestamp;
                } else if (state === 'INVOICE') {
                    // this.$router.replace({
                    //     path: '/applicationList', query: {weixingid: openId, MathTime: global.timestamp}
                    // });
                    window.location.href = global.currentIp + '#/applicationList?&weixingid=' + openId + '&timestamp=' + global.timestamp
                } else if (state.indexOf('COURSE') > -1) {
                    let courseId = state.split('-')[1];
                    // this.$router.replace({
                    //     path: '/homework', query: {courseId: courseId, MathTime: global.timestamp}
                    // });
                    window.location.href = global.currentIp + '#/homework?courseId=' + courseId + '&MathTime=' + global.timestamp
                } else if (state === 'SUBSCRIBE') {
                    // this.$router.replace({
                    //     path: '/number', query: {MathTime: global.timestamp}
                    // });
                    window.location.href = global.currentIp + '#/number?MathTime=' + global.timestamp
                } else {
                    // this.$router.replace({
                    //     path: '/My', query: {MathTime: global.timestamp}
                    // });
                    window.location.href = global.currentIp + '#/My?MathTime=' + global.timestamp
                }
            },
            gettitle(state) {
                if (state.indexOf('TESTING') > -1) {
                    window.document.title = '我的测评';
                } else if (state === 'INVOICE') {
                    window.document.title = '发票管理';
                } else if (state.indexOf('COURSE') > -1) {
                    window.document.title = '小鹅通作业';
                } else if (state === 'SUBSCRIBE') {
                    window.document.title = '完善个人信息';
                } else {
                    window.document.title = '个人中心';
                }
            }
        },
        // 生命周期函数
        created() {
            let code = this.$const.getQueryString('code');
            let state = this.$const.getQueryString('state');

            if (code === null || state === null) {
                window.location.href = global.currentIp + '#/My?MathTime=' + global.timestamp;
            }
            this.gettitle(state);
            console.log('code:' + code + ' state:' + state);
            this.wxOauthByCode(code, state);
        },
        activated() {

        },
        mounted() {
//        this.$indicator.open({
//            spinnerType: 'fading-circle'
//        });
        }
    }
</script>

<style scoped>
    #redirect .wxloading {
        position: absolute;
        width: 28px;
        height: 28px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>
