<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2023-09-12 11:44:52
 * @LastEditors: 程
 * @LastEditTime: 2023-09-12 19:53:57
-->
<script setup lang="ts">
  import { onMounted } from 'vue';
  onMounted(() => {
    setTimeout(() => {
      init();
    }, 1000);
  });
  function init() {
    var map: any = null;

    const options = {
      appName: '蜂鸟研发SDK_2_0',
      key: '57c7f309aca507497d028a9c00207cf8',
      mapID: '1580485061997461505',
      themeID: '1585095742545817602',
      container: document.getElementById('fengmap'),
      logarithmicDepthBuffer: false,
      highlightPicker: [],
      mapZoom: 18.5
    };

    /* 初始化地图 */
    function InitMap(options: any) {
      const promise = new Promise((resolve, reject) => {
        if (map != null) {
          map.dispose();
          map = null;
        }
        //@ts-ignore
        map = new fengmap.FMMap(options);
        map.on('externalFirstLoaded', function () {
          resolve('地图初始化完成！');
        });
        map.on('buildingEntered', (e: any) => {
          _MapEnterBuildingEventHandler(e);
        });
        map.on('buildingExited', (e: any) => {
          _MapExitBuildingEventHandler(e);
        });
      });
      return promise;
    }

    /* 移入建筑物时的事件响应 */
    function _MapEnterBuildingEventHandler(e: any) {
      //@ts-ignore
      UI.RenderInfo('进入建筑物：' + e.buildingID + ' ' + map.getBuilding(e.buildingID).name);
    }

    /* 从建筑物移出时的事件响应 */
    function _MapExitBuildingEventHandler(e: any) {
      //@ts-ignore
      UI.RenderInfo('移出建筑物：' + e.buildingID + ' ' + map.getBuilding(e.buildingID).name);
    }
    //@ts-ignore
    UI.Init()
      .then(() => {
        //@ts-ignore
        UI.Loading();
        return InitMap(options);
      })
      .then(() => {
        //@ts-ignore
        UI.Completed();
      });
  }
</script>
<template>
  <div>
    <div id="fengmap"></div>
  </div>
</template>
<style lang="less" scoped>
  #fengmap {
    width: 85%;
    height: 80%;
  }
</style>
