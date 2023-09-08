<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2023-03-03 16:03:39
 * @LastEditors: 程
 * @LastEditTime: 2023-03-03 16:40:53
-->
<template>
  <div>123</div>
</template>
<script setup lang="ts">
  import { ai } from '../../api/ai/index';

  function x() {
    ai().then((res) => {
      console.log(res);
    });
  }
  x();
</script>
<style lang="less" scoped></style>
