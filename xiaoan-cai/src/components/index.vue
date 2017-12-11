<template>
  <div class="index">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        active: 'tab-container1'
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  .index {
    height: 100%;
    width: 100%;
    i {
      color: #8d8d8d;
      -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
</style>
