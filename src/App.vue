<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import '~@/style/mixins.less';
@import '~@/style/variables.less';
html,body{
  height: 100%;
  width: 100%;
  background-color: @white;
  font-size: @base-font-size;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
  "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
}
body {
  .mixin-max-wh();
  margin: 0 auto;
}
#app {
  height: 100%;
}
</style>
