<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
#app > div > div:nth-child(2) {
  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
}
</style>
