<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-06-30 17:18:52
 * @LastEditors: 程
 * @LastEditTime: 2022-11-17 15:24:33
-->
<template>
  <div style="margin-top: 20px">
    <!-- table -->
    <itemTable @on-list="go_page" :list="tableList.tableData" :page="tableList.num" v-if="tableList.tableData.length" />
  </div>
</template>
<script setup lang="ts">
  import itemTable from './common/table.vue';
  import { listsApi } from '@/api/lists';
  import { ElMessage } from 'element-plus';

  type Item = {
    tableData: any;
    currentPage: number;
    num: number;
  };

  //分页
  function go_page(val: number) {
    tableList.currentPage = val;
    getData();
  }

  const tableList = reactive<Item>({
    tableData: [1, 2],
    currentPage: 1,
    num: 0
  });

  //模拟数据
  const list = [
    {
      id: 1,
      street_name: '测试',
      recover_num: 10,
      coverage_num: 1
    },
    {
      id: 2,
      street_name: '测试1',
      recover_num: 10,
      coverage_num: 1
    },
    {
      id: 3,
      street_name: '测试2',
      recover_num: 10,
      coverage_num: 1
    }
  ];

  //获取数据
  // getData();
  function getData() {
    let data = {
      page: tableList.currentPage
    };
    listsApi(data).then((res) => {
      //假数据
      tableList.tableData = list;
      if (res.data.status === 1) {
        // tableList.tableData = res.data.data;
        tableList.num = res.data.total;
      } else ElMessage.error(res.data.msg);
    });
  }
</script>
<style lang="less" scoped></style>
