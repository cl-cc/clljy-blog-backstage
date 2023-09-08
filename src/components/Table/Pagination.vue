<template>
  <div class="pagination">
    <el-pagination background layout="total, prev, pager, next" :total="totalNum" :current-page="currentPage" :page-size="pageSize" @current-change="currentChange">
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
type Props = {
  totalNum: number;
  currentPage: number;
  pageSize: number;
};
withDefaults(defineProps<Props>(), {
  pageSize: 10,
  currentPage: 1,
  totalNum: 0,
});

const emit = defineEmits(['currentChange']);

//点击分页
function currentChange(val: number) {
  emit('currentChange', val);
}
</script>
<script lang="ts">
//区分组件
export default {
  name: 'Pagination',
};
</script>
<style lang="less" scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
