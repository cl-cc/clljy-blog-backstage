<template>
  <div class="red-row-class">
    <el-table class="table" :data="tableData" v-loading="loading" :row-class-name="rowClassName" @selection-change="handleSelectionChange" border>
      <!-- 多选 -->
      <el-table-column v-if="selectionIsNeed" type="selection" width="55"> </el-table-column>
      <!-- 序号 -->
      <el-table-column label="序号" align="center" width="80" v-if="indexFlag" type="index"></el-table-column>
      <!-- 表头 -->
      <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :min-width="column.minWidth" show-overflow-tooltip>
        <template v-if="column.slot" #="{ row }">
          <slot :name="column.prop" :row="row"></slot>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column v-if="optionIsNeed" fixed="right" label="操作" :width="optionWidth">
        <template #default="{ row, $index }">
          <slot name="prev" :scope="row"></slot>
          <el-button v-if="editIsNeed" @click="handleEdit($index, row)" type="text" size="small">编辑</el-button>
          <el-button v-if="deleteIsNeed" @click="handleDelete($index, row)" type="text" size="small">删除</el-button>
          <slot name="next" :scope="row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
  type Props = {
    columns: Array<{
      slot: boolean;
      prop: string;
      label: string;
      minWidth: string;
    }>;
    tableData: Array<any>;
    loading: boolean;
    selectionIsNeed: boolean;
    optionIsNeed: boolean;
    editIsNeed: boolean;
    deleteIsNeed: boolean;
    indexFlag: boolean;
    optionWidth: string;
    rowClassName: string;
  };
  //类型字面量模式
  withDefaults(defineProps<Props>(), {
    loading: false,
    selectionIsNeed: false,
    optionIsNeed: false,
    editIsNeed: false,
    deleteIsNeed: false,
    indexFlag: false,
    optionWidth: '100px',
    rowClassName: ''
  });

  const emit = defineEmits(['handleEdit', 'handleDelete']);

  //修改
  function handleEdit(index: number, row: any[]) {
    emit('handleEdit', index, row);
  }

  //删除
  function handleDelete(index: number, row: any[]) {
    emit('handleDelete', index, row);
  }
</script>
<script lang="ts">
  //区分组件
  export default {
    name: 'Table'
  };
</script>
<style lang="less" scoped>
  .table {
    width: 100%;
    font-size: 14px;
    margin-top: 15px;
  }
</style>
