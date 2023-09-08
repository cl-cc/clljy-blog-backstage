<template>
  <div class="tac">
    <Menu @on-item="getItem" :list="list" />
  </div>
</template>

<script lang="ts" setup>
  import Menu from './menu.vue';
  import i18n from '@/i18n/index';

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
      rule_name: '图标/组件',
      i18n_text: 'iconsComponents',
      rule_url: '/index',
      children: [
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'Expand',
          rule_name: '列表',
          i18n_text: 'list',
          rule_url: '/index/list',
          children: [
            {
              id: 1,
              parent_id: 1,
              rule_icon: 'Operation',
              rule_name: '简易列表',
              i18n_text: 'simpleList',
              rule_url: '/index/list'
            },
            {
              id: 2,
              parent_id: 2,
              rule_icon: 'Notebook',
              rule_name: '复杂列表',
              i18n_text: 'complexList',
              rule_url: '/index/complexList'
            },
            {
              id: 3,
              parent_id: 3,
              rule_icon: 'OfficeBuilding',
              rule_name: '封装列表',
              i18n_text: 'packageList',
              rule_url: '/index/packageList'
            },
            {
              id: 4,
              parent_id: 4,
              rule_icon: 'Opportunity',
              rule_name: '掘金签到列表',
              i18n_text: 'signList',
              rule_url: '/index/signList'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      parent_id: 2,
      rule_icon: 'QuestionFilled',
      rule_name: '错误页面',
      rule_url: '/index',
      i18n_text: 'errorPage',
      children: [
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'RefreshLeft',
          i18n_text: 'fourHundredAndOne',
          rule_name: '401',
          rule_url: '/error/401'
        },
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'RefreshLeft',
          rule_name: '404',
          i18n_text: 'fourHundredAndFour',
          rule_url: '/error/404'
        }
      ]
    },
    {
      id: 3,
      parent_id: 3,
      rule_icon: 'ToiletPaper',
      rule_name: '数据可视化',
      rule_url: '/index',
      i18n_text: 'dataVisualization',
      children: [
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'TrendCharts',
          i18n_text: 'trendCharts',
          rule_name: '流程图',
          rule_url: '/bigdata/index'
        }
      ]
    },
    {
      id: 4,
      parent_id: 4,
      rule_icon: 'Setting',
      rule_name: '工具类',
      rule_url: '/index',
      i18n_text: 'tool',
      children: [
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'Notification',
          i18n_text: 'screenshotTool',
          rule_name: '截图工具',
          rule_url: '/tool/screenshotTool'
        }
      ]
    },
    {
      id: 5,
      parent_id: 5,
      rule_icon: 'Setting',
      rule_name: 'openAI',
      rule_url: '/index',
      i18n_text: 'openai',
      children: [
        {
          id: 1,
          parent_id: 1,
          rule_icon: 'Notification',
          i18n_text: 'chatbot',
          rule_name: '聊天机器人',
          rule_url: '/ai/index'
        }
      ]
    }
  ]);
</script>

<style lang="less" scoped>
  .tac {
    width: 250px;
    overflow: hidden;
  }
</style>
