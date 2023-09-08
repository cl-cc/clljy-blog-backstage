<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:39:09
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:23:04
-->
<script setup lang="ts">
  import Header from './common/header.vue';
  import Sidebar from './common/sidebar.vue';
  import Content from './common/content.vue';
</script>
<template>
  <div class="main">
    <Header />
    <div class="main-content">
      <Sidebar />
      <Content />
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import url(@/darkCss/main.less);
  .main {
    width: 100%;
    height: 100%;
    &-content {
      width: 100%;
      height: 100%;
      display: flex;
      border-top: 1px solid #ccc;
    }
  }
</style>
