<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-25 10:25:21
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:59:07
-->
<template>
  <div class="screenfull">
    <div class="toggle">
      <span @click.stop="toggleDark()">暗黑模式</span>
      <el-switch v-model="isDark" />
    </div>
    <div v-if="isFullscreen" class="screenfull-full" @click="click">
      <FullScreen />
    </div>
    <div class="screenfull-lang">
      <el-switch v-model="langNum" @click="changeLang" class="mb-2" />
    </div>
    <div class="screenfull-full" @click="go_out">
      <Lock />
    </div>
  </div>
</template>
<script setup lang="ts">
  import screenfull from 'screenfull';
  import { useI18n } from 'vue-i18n';
  const { locale } = useI18n();
  import { FullScreen, Lock } from '@element-plus/icons-vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { ElMessageBox } from 'element-plus';
  const sf = screenfull;
  const isFullscreen = ref<boolean>(true);
  const langNum = ref<boolean>(false);
  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  //全屏显示
  function click() {
    sf.isEnabled && sf.toggle();
  }
  //语言切换
  function changeLang() {
    let lang = langNum.value ? 'en' : 'zh';
    locale.value = lang;
    localStorage.setItem('lang', lang);
  }
  //退出登录
  function go_out() {
    ElMessageBox.confirm('确定要退出登录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        localStorage.removeItem('token');
        window.location.href = '/';
      })
      .catch(() => {});
  }
</script>
<style lang="less" scoped>
  .screenfull {
    width: auto;
    display: flex;
    margin-right: 20px;
    align-items: center;
    .toggle {
      display: flex;
      align-items: center;
      margin-right: 30px;
      span {
        margin-right: 10px;
        font-size: 14px;
        color: #fff;
      }
    }
    &-full {
      cursor: pointer;
      margin-right: 20px;
      width: 25px;
      height: 25px;
      color: #2292b1;
      margin-right: 25px;
      cursor: pointer;
    }
    &-lang {
      margin-right: 25px;
    }
  }
</style>
