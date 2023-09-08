<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-06-30 17:18:52
 * @LastEditors: 程
 * @LastEditTime: 2022-11-15 10:19:24
-->
<template>
  <div class="navbar">
    <ul class="navbar-ul">
      <li :class="{ active: !isActive(item.path) }" @click="goLink(item.path)" class="navbar-li" v-for="(item, index) in tagsList" :key="index">
        {{ $t(`navBar.${item.i18nText}`) }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

type NavbarItem = {
  title: string;
  path: string;
  i18nText: string;
};

const tagsList = ref<NavbarItem[]>([]);
const router = useRouter();

setTags(router);

watch(
  () => router,
  (newValue: any) => {
    setTags(newValue);
  },
  { immediate: true, deep: true }
);

function goLink(path: string) {
  router.push(path);
}

function isActive(path: string) {
  return router.currentRoute.value.fullPath === path;
}

function setTags(route: any) {
  const isExist = tagsList.value.some((item: any) => {
    return item.path === route.currentRoute.value.fullPath;
  });
  if (!isExist) {
    if (tagsList.value.length >= 12) {
      tagsList.value.shift();
    }
    tagsList.value.unshift({
      title: route.currentRoute.value.meta.title,
      path: route.currentRoute.value.fullPath,
      i18nText: route.currentRoute.value.meta.i18nText,
    });
  }
}


</script>
<style lang="less" scoped>
@import url(@/darkCss/navbar.less);
.navbar {
  width: 99%;
  height: 50px;
  background: #fff;
  align-items: center;
  display: flex;
  padding-left: 20px;
  box-shadow: 0 0 5px rgb(240, 237, 237);
  border-radius: 5px;
  .active {
    background: #fff;
    color: #777;
  }
  &-ul {
    display: flex;
    align-items: center;
  }
  &-li {
    width: auto;
    height: 25px;
    line-height: 25px;
    background: #5ddab4;
    font-size: 12px;
    color: #fff;
    margin-right: 10px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid rgba(124, 141, 181, 0.3);
    cursor: pointer;
    overflow: hidden;
    padding: 0 10px;
  }
}
</style>
