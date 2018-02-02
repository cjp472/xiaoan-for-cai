<template>
       <span class="infinite-drop">
       <span class="infinite-drop-left"></span><span>{{ text }}</span><span
               class="infinite-drop-right"></span>
    </span>
</template>
<script>

  export default {
    name: '',
    data() {
      return {}
    },
    props: {
      borderWidth: {
        type: String,
        required: false,//是否必填
        default: "20px",
      },
        text:{
          type:String,
            required:false,
            default:'没有更多了'
        }
    },
    mounted: function () {

    },
    methods: {}
  }
</script>

<style>

</style>

<style scoped>
    .infinite-drop-head{
        display: inline-block;
    }
    .infinite-drop {
        font-size: 15px;
        color: #323232;
        position: relative;
    }
    .infinite-drop .infinite-drop-left {
        display: inline-block;
        width: 20px;
        border-bottom: 1px solid #aeaeae;
        position: absolute;
        top: 9px;
        left: -23px;
    }
    .infinite-drop .infinite-drop-right {
        display: inline-block;
        width: 20px;
        border-bottom: 1px solid #aeaeae;
        position: absolute;
        top: 9px;
        right: -23px;
    }
</style>
