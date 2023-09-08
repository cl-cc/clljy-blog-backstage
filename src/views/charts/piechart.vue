<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-07-19 14:51:08
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:26:03
-->
<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useTestStore } from '@/store';
  const STORE = useTestStore();

  onMounted(() => {
    nextTick(() => {
      initChart();
    });
  });

  function initChart() {
    const charEle = document.getElementById('piechart') as HTMLDivElement;
    const charEch = ref<any>();
    charEch.value = echarts.init(charEle);
    charEch.value.setOption({
      title: { text: '客流量' },
      tooltip: {},
      xAxis: {
        data: STORE.piechart.list
      },
      yAxis: {},
      series: [
        {
          name: '客流量',
          type: 'line',
          data: STORE.piechart.num
        }
      ]
    });
  }
</script>
<template>
  <div id="piechart"></div>
</template>
<style lang="less" scoped>
  #piechart {
    width: 100%;
    height: 300px;
  }
</style>
