<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-28 13:47:51
 * @LastEditors: 程
 * @LastEditTime: 2022-07-15 14:10:31
-->
<template>
  <div class="main">
    <el-button class="out" type="info" @click="exportBox">导出流程图</el-button>
    <div id="container" ref="container"></div>
  </div>
</template>
<script setup lang="ts">
import { dataListApi } from '@/api/bigdata';
import LogicFlow from '@logicflow/core';
import { Snapshot } from '@logicflow/extension';
import '@logicflow/core/dist/style/index.css';
LogicFlow.use(Snapshot);

nextTick(() => {
  const lf = new LogicFlow({
    container: document.getElementById('container') as HTMLDivElement,
    grid: true,
  });
  lf.render({
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 100,
        text: '节点1',
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 200,
        text: '节点2',
      },
      {
        id: '3',
        type: 'diamond',
        x: 500,
        y: 300,
        text: '节点3',
      },
    ],
    edges: [
      {
        sourceNodeId: '1',
        targetNodeId: '2',
        type: 'polyline',
        text: '连线',
      },
    ],
  });
});
</script>
<style lang="less" scoped>
.main {
  .out {
    margin: 20px;
  }
  #container {
    width: 100%;
    height: 500px;
  }
}
</style>
