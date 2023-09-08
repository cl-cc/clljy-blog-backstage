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

<script setup lang="ts"></script>

<style lang="less" scoped>
.box-card-component {
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>
