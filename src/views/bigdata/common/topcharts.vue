<template>
  <!-- 子组件 -->
  <div id="top_charts"></div>
  <el-button @click="to">派发</el-button>
</template>
<script setup lang="ts">
import { log } from "console";
import * as echarts from "echarts";

type Props = {
  data: any;
};

const data = defineProps<Props>();

nextTick(() => {
  initcharts();
});

const emit = defineEmits(["on-to"]);

function to() {
  emit("on-to", data);
}

function initcharts() {
  const charts = document.getElementById("top_charts") as HTMLDivElement;
  const chart = ref<any>();
  chart.value = echarts.init(charts);
  let bgColor = "";
  let color = ["#0E7CE2", "#FF8352"];
  let echartData = [
    {
      name: "农贸市场",
      value: data.data.info.ring.one,
    },
    {
      name: "集散中心",
      value: data.data.info.ring.two,
    },
  ];
  chart.value.setOption({
    backgroundColor: bgColor,
    color: color,
    series: [
      {
        type: "pie",
        radius: ["35%", "50%"],
        center: ["40%", "60%"],
        data: echartData,
        hoverAnimation: true,
        itemStyle: {
          borderWidth: 5,
          borderColor: "rgb(254, 192, 202,0)",
          emphasis: {
            borderColor: "rgb(254, 192, 202,0)",
            borderWidth: 8,
            shadowBlur: 8,
          },
        },
        labelLine: {
          normal: {
            length: 5,
            length2: 5,
            lineStyle: {
              color: "#e6e6e6",
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: "outside",
            color: "#fff",
            fontSize: "12px",
            formatter: (params: any) => {
              return params.name + "\n" + params.value + "%";
            },
          },
        },
      },
    ],
  });
}
</script>
<style lang="less" scoped>
#top_charts {
  width: 300px;
  height: 300px;
}
</style>
