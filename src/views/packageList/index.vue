<template>
  <!-- 列表 -->
  <Table
    :columns="columns"
    :tableData="tableList.list"
    :optionWidth="200"
    :optionIsNeed="true"
    :editIsNeed="true"
    :deleteIsNeed="true"
    :indexFlag="true"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
  >
    <template #prev="{ scope }">
      <el-button type="text" size="small" @click="handleFly(scope)">查看</el-button>
    </template>
  </Table>
  <!-- 分页 -->
  <Pagination :currentPage="currentPage" :totalNum="totalNum" @currentChange="currentChange" />
  <!-- 添加/修改 -->
  <Poput :item="item.editRow" :Tips="item.Tips" :dialogVisible="item.dialogVisible" @on-close="close" @on-submit="submit" />
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import Table from '@/components/Table/table.vue';
import Pagination from '@/components/Table/Pagination.vue';
import Poput from './Popup.vue';
//分页参数
const currentPage = ref(1);
const totalNum = ref(0);
//列表接口
interface TableItem {
  date: string;
  name: string;
  state: string;
  sex: string;
  city: string;
  address: string;
}
type Item = {
  list: TableItem[];
};
//表头
const columns = reactive([
  { prop: 'name', label: '名称', minWidth: 120 },
  { prop: 'sex', label: '性别', minWidth: 120 },
  { prop: 'date', label: '日期', minWidth: 120 },
  { prop: 'state', label: '省份', minWidth: 120 },
  { prop: 'city', label: '城市', minWidth: 120 },
  { prop: 'address', label: '地址', minWidth: 120 },
]);

const tableList = reactive<Item>({
  list: [],
});
//数据
tableList.list = [
  {
    date: '2021-10-10',
    name: '张三',
    sex: '男',
    state: '江苏',
    city: '南京',
    address: '钟楼区',
  },
];
//查看
function handleFly(row: TableItem) {
  console.log(row);
}
const item = reactive({
  editRow: {},
  Tips: '',
  dialogVisible: false,
  index: -1,
});
//修改
function handleEdit(index: number, row: TableItem) {
  item.editRow = JSON.parse(JSON.stringify(row));
  item.Tips = '修改';
  item.dialogVisible = true;
  item.index = index;
}
function submit(row: TableItem) {
  item.dialogVisible = false;
  console.log(row);
}
//删除
function handleDelete(index: number, row: TableItem) {
  console.log(index, row);
  ElMessageBox.confirm('确定要删除该条信息吗?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete success',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
}
//分页
function currentChange(val: number) {
  currentPage.value = val;
}
//关闭弹窗
function close(e: boolean) {
  item.dialogVisible = e;
}
</script>
<style lang="less" scoped></style>
