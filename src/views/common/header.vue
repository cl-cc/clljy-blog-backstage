<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:44:25
 * @LastEditors: 程
 * @LastEditTime: 2022-07-19 14:07:46
-->
<template>
  <div class="header">
    <div class="header-box">
      <screenfull />
    </div>
  </div>
</template>
<script setup lang="ts">
import screenfull from '@/components/screenfull/index.vue';
</script>
<style scoped lang="less">
@import url(@/darkCss/header.less);
@color-f: #fff;
@color-c: #ccc;
.header {
  width: 100%;
  height: 50px;
  background: @color-f;
  display: flex;
  align-items: center;
  &-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
