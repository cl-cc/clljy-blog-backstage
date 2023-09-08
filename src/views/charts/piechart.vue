<template>
  <div id="piechart"></div>
</template>
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
      data: STORE.piechart.list,
    },
    yAxis: {},
    series: [
      {
        name: '客流量',
        type: 'line',
        data: STORE.piechart.num,
      },
    ],
  });
}
</script>
<style lang="less" scoped>
#piechart {
  width: 100%;
  height: 300px;
}
</style>
