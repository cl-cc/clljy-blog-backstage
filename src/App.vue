<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:25:05
 * @LastEditors: 程
 * @LastEditTime: 2022-07-19 13:53:03
-->
<template>
  <router-view v-if="isRouterAlive" />
</template>
<script setup lang="ts">
const isRouterAlive = ref<boolean>(true);
function reload() {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
}
provide('reload', reload);
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  overflow-x: hidden;
}
</style>
