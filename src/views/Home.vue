<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:39:09
 * @LastEditors: 程
 * @LastEditTime: 2022-07-19 14:21:46
-->
<template>
  <div class="main">
    <Header />
    <div class="main-content">
      <Sidebar />
      <Content />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from './common/header.vue';
import Sidebar from './common/sidebar.vue';
import Content from './common/content.vue';
</script>
<style lang="less" scoped>
@import url(@/darkCss/main.less);
.main {
  height: 100%;
  &-content {
    display: flex;
    border-top: 1px solid #ccc;
  }
}
</style>
