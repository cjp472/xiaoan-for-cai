<template>
  <div class="advertizing" @click="linkApp()"></div>
</template>

<script>
  export default {
    name: "advertizing",
    data() {
      return {}
    },
    mounted() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$router.push({path: '/law', query: {}});
        })
      }, 5000);
    },
    methods: {
      linkApp() {
        this.$router.replace({path: '/law'});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .advertizing {
    background: url("../assets/timg.jpg");
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
</style>
