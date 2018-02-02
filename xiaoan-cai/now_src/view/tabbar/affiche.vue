<template>
  <div id="affiche" class="affiche">
    <div class="logo">
      <img :src="bgImg" alt="">
    </div>
    <div class="search">
      <ul class="seabox">
        <li class="seabox-li left">证券简称/代码</li>
        <li class="seabox-li"><i>|</i></li>
        <li class="seabox-li right">搜索公告名称</li>
      </ul>
    </div>
    <ul class="link">
      <li class="linkitem" v-for="(list,index) in linkList">
        <img :src="list.i" :alt="list.alt">
        <p>{{list.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import lawBaseSvg from "@/assets/image/law_icon"
  export default {
    name: "Affiche",
    data() {
      return {
        linkList: [
          {id: 0, name: '收藏', i: lawBaseSvg.law[1].img, alt: 'collect'},
          {id: 1, name: '关注', i: '', alt: ''},
          {id: 2, name: '足迹', i: lawBaseSvg.law[3].img, alt: ''}
        ],
        bgImg: lawBaseSvg.law[0].img,
        code: '',
        isOnload: true
      }
    },
    computed: {},
    // 页面构建前准备
    created() {
      // window.sessionStorage.clear();
    },
    mounted() {
      // let aa = ['sad', undefined, null, '', 'sad'];
      // console.log('123   ', this.$array.notEmpty(aa), this.$array.ImpArr(aa));
    },
    methods: {}
  }
</script>

<style lang="scss">
  #affiche {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: white;
  }
  .affiche {
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
      .seabox {
        width: 100%;
        height: 45px;
        border: 1px solid #cbcbcb;
        box-sizing: border-box;
        border-radius: 2px;
        display: table;
        padding: 0 7.5px;
        .seabox-li {
          display: table-cell;
          vertical-align: middle;
          font-size: 15px;
          color: #8d8d8d;
        }
        .seabox-li.left {
          width: 35%;
          font-size: 15px;
          color: #8d8d8d;
        }
        .seabox-li.right {
          padding-left: 5px;
        }
      }
    }
    .link {
      width: 80%;
      height: auto;
      font-size: 0;
      margin: 0 auto;
      padding-top: 53px;
      display: flex;
      box-sizing: border-box;
      .linkitem {
        flex: 1;
        display: inline-block;
        height: 100%;
        img {
          display: block;
          width: 25px;
          height: 25px;
          margin: 0 auto 10px;
          overflow: hidden;
        }
        p {
          margin: 0;
          width: 100%;
          font-size: 13px;
          color: #b1b1b1;
          text-align: center;
        }
      }
    }
  }
</style>
