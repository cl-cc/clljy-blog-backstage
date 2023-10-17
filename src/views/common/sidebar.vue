<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-06-30 17:18:52
 * @LastEditors: 程
 * @LastEditTime: 2023-09-12 19:49:49
-->
<script lang="ts" setup>
  import Menu from './menu.vue';

  type MenuItem = {
    id: number;
    parent_id: number;
    rule_name: string;
    rule_url: string;
    i18n_text: string;
    rule_icon?: string;
    children?: MenuItem[] | [];
  };

  //接受menu传过来的参数
  function getItem(item: MenuItem) {
    console.log(item.rule_url);
  }

  const list = reactive<MenuItem[]>([
    {
      id: 0,
      parent_id: 0,
      rule_icon: 'Avatar',
      rule_name: '系统首页',
      i18n_text: 'index',
      rule_url: '/index/data'
    },
    {
      id: 1,
      parent_id: 1,
      rule_icon: 'Monitor',
      rule_name: '系统管理',
      i18n_text: 'iconsComponents',
      rule_url: '/index',
      children: [
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'Expand',
          rule_name: '系统管理',
          i18n_text: 'list',
          rule_url: '/index/list'
        },
        {
          id: 2,
          parent_id: 2,
          rule_icon: 'Expand',
          rule_name: '测试',
          i18n_text: 'test',
          rule_url: '/index/test'
        }
      ]
    }
  ]);
</script>
<template>
  <div class="tac">
    <Menu @on-item="getItem" :list="list" />
  </div>
</template>
<style lang="less" scoped>
  .tac {
    width: 250px;
    overflow: hidden;
  }
</style>
