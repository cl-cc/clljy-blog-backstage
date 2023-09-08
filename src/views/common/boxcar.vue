<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-24 19:40:38
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:24:26
-->
<script setup lang="ts"></script>
<template>
  <el-card class="box-card-component" style="margin-left: 8px">
    <div style="position: relative">
      <div style="padding-top: 35px" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="51" />
      </div>
      <div class="progress-item">
        <span>Typescript</span>
        <el-progress :percentage="45" />
      </div>
      <div class="progress-item">
        <span>CSS</span>
        <el-progress :percentage="4" />
      </div>
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress :percentage="100" status="success" />
      </div>
    </div>
  </el-card>
</template>
<style lang="less" scoped>
  .box-card-component {
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
</style>
