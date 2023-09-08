<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:25:05
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:21:45
-->
<script setup lang="ts">
  //引入vue方法
  import { ElConfigProvider } from 'element-plus';
  //中文包
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  const locale = zhCn;
  const isRouterAlive = ref<boolean>(true);
  function reload() {
    isRouterAlive.value = false;
    nextTick(() => {
      isRouterAlive.value = true;
    });
  }
  provide('reload', reload);
</script>
<template>
  <el-config-provider :locale="locale">
    <slot name="app"> <router-view v-if="isRouterAlive" /></slot>
  </el-config-provider>
</template>
<style lang="less">
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
</style>
