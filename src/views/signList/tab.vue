<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-06-17 14:28:41
 * @LastEditors: 程
 * @LastEditTime: 2022-07-19 14:43:06
-->
<template>
  <div>
    <el-dialog v-model="dialogTab" :title="Tips" width="60%" :close-on-click-modal="false">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="签到" name="first"></el-tab-pane>
        <el-tab-pane label="抽奖" name="second"></el-tab-pane>
      </el-tabs>
      <Table :columns="columns" :tableData="tableList" :optionWidth="200" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close()">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import Table from '../../components/Table/table.vue';
const activeName = ref<string>('first');
//传递函数
const emit = defineEmits(['on-tab-click', 'on-close']);
//tab切换函数
function handleClick(tab: TabsPaneContext) {
  emit('on-tab-click', Number(tab.index));
}
//关闭
function close() {
  emit('on-close', false);
  activeName.value = 'first';
}
//类型字面量
type Prop = {
  dialogTab: boolean;
  Tips: string;
  id: number;
  tableList: any;
};
//默认值
const data = withDefaults(defineProps<Prop>(), {
  dialogTab: false,
  Tips: '弹窗',
  id: 0,
  tableList: [],
});
//表头参数
const columns = reactive([
  { prop: 'updated_at', label: '时间' },
  { prop: 'content.err_msg', label: '内容' },
]);
</script>
<script lang="ts">
//区分组件
export default {
  name: 'tab',
};
</script>
<style lang="less" scoped></style>
