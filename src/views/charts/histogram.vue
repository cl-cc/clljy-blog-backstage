<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-24 19:20:33
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:25:48
-->

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { useTestStore } from '@/store';
  const STORE = useTestStore();

  onMounted(async () => {
    await nextTick();
    initChart();
  });

  function initChart() {
    const charEle = document.getElementById('histogram') as HTMLDivElement;
    const charEch = ref<any>();
    charEch.value = echarts.init(charEle);
    let list = STORE.histogram.list;
    let data1: any = [];
    let data2 = [];

    list.forEach((item) => {
      if (item.predict) {
        data2.push([item.name, item.value]);
      } else {
        data1.push([item.name, item.value]);
      }
    });

    // 如果是折线图，此处需要追加实际数据的最后一组数据，如果是柱状图，则不需要。
    data2.unshift(data1[data1.length - 1]);
    let labels = list.map((m) => {
      return m.name;
    });
    charEch.value.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: labels
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        show: true,
        data: ['实际支出', '预测支出']
      },
      series: [
        {
          name: '实际支出',
          type: 'bar',
          data: data1
        },
        {
          name: '预测支出',
          type: 'bar',
          barGap: '-100%',
          lineStyle: {
            type: 'dashed'
          },
          symbol: 'none',
          data: data2
        }
      ]
    });
  }
</script>
<template>
  <div id="histogram"></div>
</template>
<style lang="less" scoped>
  #histogram {
    width: 100%;
    height: 300px;
  }
</style>
