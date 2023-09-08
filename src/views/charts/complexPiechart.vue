<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-24 17:38:52
 * @LastEditors: 程
 * @LastEditTime: 2022-07-19 14:19:13
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
  const charEle = document.getElementById('complexPiechart') as HTMLDivElement;
  const charEch = ref<any>();
  charEch.value = echarts.init(charEle);

  let formatNumber = function (num: number) {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
  };
  let total = STORE.complexPiechart.list.reduce((a: number, b: any) => {
    return a + b.value * 1;
  }, 0);
  let color = STORE.complexPiechart.colors;
  charEch.value.setOption({
    color: color,
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        roseType: 'radius',
        radius: ['25%', '60%'],
        center: ['50%', '40%'],
        data: STORE.complexPiechart.list,
        hoverAnimation: false,
        itemStyle: {
          normal: {
            borderWidth: 2,
          },
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
          },
        },
        label: {
          normal: {
            formatter: (params: any) => {
              return '{icon|●}{name|' + params.name + '}\n{value|' + formatNumber(params.value) + '}';
            },
            rich: {
              icon: {
                fontSize: 12,
                color: 'inherit',
              },
              name: {
                fontSize: 12,
                padding: [0, 0, 0, 10],
                color: '#000',
              },
              value: {
                fontSize: 12,
                fontWeight: 'bolder',
                padding: [10, 0, 0, 20],
                color: 'inherit',
                // color: '#333333'
              },
            },
          },
        },
      },
    ],
  });
}
</script>
<template>
  <div id="complexPiechart"></div>
</template>
<style lang="less" scoped>
#complexPiechart {
  width: 100%;
  height: 300px;
}
</style>
