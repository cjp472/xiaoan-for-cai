<template>
    <transition name="bounce">
        <div class="xa-warning" v-show="isShow">
            <p class="xa-warning-Img">
                <img :src="imgSrc" alt="缺省页大图"/>
            </p>
            <p class="xa-warning-Text">{{message}}</p>
            <p v-show="isShowBtn" class="xa-warning-Btns">
                <button class="xa-warning-Btn" @click="hintButton()">{{hintBtn}}</button>
            </p>
        </div>
    </transition>
</template>
<script>
    export default {
        name: "hint",
        data() {
            return {}
        },
        props: {
            imgSrc: {
                type: String,
                required: false,
                default: '../../static/img/report/noReportInfo.png'
            },
            message: {
                type: String,
                required: false,
                default: 'zhuye'
            },
            hintBtn: {
                type: String,
                required: false,
                default: '前往查看'
            },
            isShow: {
                type: Boolean,
                required: false,
                default: true
            },
            isShowBtn: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        methods: {
            //this.$emit('event'); $emit 将事件发射出去  子组件dom中@event=“gohome” gohome为methods里面的方法名
            hintButton() {
                this.$emit('click');
            }
        }
    }
</script>
<style scoped lang="scss">
    .xa-warning {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        * {
            font-family: PingFangSC-Regular, sans-serif, Microsoft Yahei, Helvetica;
        }
        .xa-warning-Img {
            width: 100%;
            text-align: center;
            padding-top: 27%;
            img {
                width: 118.25px;
            }
        }
        .xa-warning-Text {
            font-size: 15px;
            color: #ffb148;
            text-align: center;
            padding-top: 30px;
        }
        .xa-warning-Btns {
            padding-top: 20px;
            .xa-warning-Btn {
                box-shadow: none;
                color: white;
                border: 0;
                width: 90px;
                margin: 0 auto;
                height: 30px;
                font-size: 15px;
                line-height: 30px;
                text-align: center;
                background: #ffb148;
                border-radius: 2px;
                -webkit-transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
            .xa-warning-Btn:active {
                background-color: rgba(255, 177, 72, 0.5);
                -webkit-transition: background-color 0.01s cubic-bezier(0.645, 0.045, 0.355, 1);
                transition: background-color 0.01s cubic-bezier(0.645, 0.045, 0.355, 1);
            }
        }
    }
</style>
