<template>
  <div id="lineChars"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { useTestStore } from '@/store';
const STORE = useTestStore();

onMounted(async () => {
  await nextTick();
  initChart();
});

type Item = {
  name: string;
  value: number;
  predict?: undefined | boolean;
};

function initChart() {
  const charEle = document.getElementById('lineChars') as HTMLDivElement;
  const charEch = ref<any>();
  charEch.value = echarts.init(charEle);
  let list = STORE.lineData.list;

  let data1: any = [];
  let data2 = [];

  list.forEach((item: Item) => {
    if (item.predict) {
      data2.push([item.name, item.value]);
    } else {
      data1.push([item.name, item.value]);
    }
  });

  data2.unshift(data1[data1.length - 1]);

  let labels = list.map((m: Item) => {
    return m.name;
  });

  charEch.value.setOption({
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      show: true,
      data: ['实际支出', '预测支出'],
    },
    series: [
      {
        name: '实际支出',
        type: 'line',
        data: data1,
      },
      {
        name: '预测支出',
        type: 'line',
        lineStyle: {
          type: 'dashed',
        },
        symbol: 'none',
        data: data2,
      },
    ],
  });
}
</script>
<style lang="less" scoped>
#lineChars {
  width: 100%;
  height: 400px;
}
</style>
