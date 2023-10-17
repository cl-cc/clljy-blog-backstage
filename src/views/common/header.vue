<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:44:25
 * @LastEditors: 程
 * @LastEditTime: 2023-09-12 19:54:36
-->
<script setup lang="ts">
  import screenfull from '@/components/screenfull/index.vue';
</script>
<template>
  <div class="header">
    <div class="title">clljy文章后台管理</div>
    <div class="header-box">
      <screenfull />
    </div>
  </div>
</template>
<style scoped lang="less">
  @import url(@/darkCss/header.less);
  @color-f: #409eff;
  @color-c: #ccc;
  .header {
    width: 100%;
    height: 50px;
    background: @color-f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-weight: bold;
      margin-left: 20px;
      font-size: 20px;
      color: #fff;
      margin-bottom: 0;
    }
    &-box {
      width: 50%;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
