<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-23 15:45:33
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:24:49
-->
<script setup lang="ts">
  import 'animate.css';
  import navBar from '../../components/navbar/index.vue';
</script>
<template>
  <div class="content">
    <navBar />
    <router-view #default="{ route, Component }">
      <transition :enter-active-class="`animate__animated ${route.meta.transition}`">
        <component :is="Component" :route="route" />
      </transition>
    </router-view>
  </div>
</template>
<style scoped lang="less">
  @import url(@/darkCss/content.less);
  .content {
    width: 100%;
    height: 100%;
    padding: 10px;
    background: #fff;
  }
</style>
