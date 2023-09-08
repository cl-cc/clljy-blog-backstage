<template>
  <div class="topData">
    <Carditem />
  </div>
  <div class="headerData">
    <el-card>
      <lineChars />
    </el-card>
  </div>
  <div class="mainData">
    <el-card class="mainData-card">
      <Piechart />
    </el-card>
    <el-card class="mainData-card">
      <histogram />
    </el-card>
    <el-card class="mainData-card">
      <ComplexPiechart />
    </el-card>
  </div>
  <div class="footerData">
    <div class="footerData-left">
      <updateList />
    </div>
    <div class="footerData-left">
      <boxcar />
    </div>
  </div>
</template>
<script setup lang="ts">
import Piechart from "./charts/piechart.vue";
import ComplexPiechart from "./charts/complexPiechart.vue";
import Carditem from "./common/card.vue";
import lineChars from "./charts/lineChars.vue";
import histogram from "./charts/histogram.vue";
import updateList from "./common/updatelist.vue";
import boxcar from "./common/boxcar.vue";
</script>
<style lang="less" scoped>
@size: 30px;
.topData {
  width: 100%;
}
.headerData {
  margin-bottom: @size;
}
.mainData {
  display: flex;
  justify-content: space-between;
  &-card {
    width: 32%;
    height: 300px;
  }
}
.footerData {
  width: 100%;
  margin-top: @size;
  display: flex;
  justify-content: space-between;
  &-left {
    width: 49%;
  }
}
</style>
