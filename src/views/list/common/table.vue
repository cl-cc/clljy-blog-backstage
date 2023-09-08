<template>
  <div>
    <el-button type="info" @click="add('add')">添加</el-button>
    <el-table :data="list" stripe row-key="id" style="width: 100%">
      <el-table-column prop="street_name" label="镇街名称" align="center" />
      <el-table-column prop="recover_num" label="覆盖户数量" align="center" />
      <el-table-column prop="coverage_num" label="回收点数量" align="center" />
      <el-table-column label="操作" align="center" width="200px" #default="{ row }">
        <el-button type="primary" :icon="Edit" @click="add('edit', row)" circle />
        <el-button type="danger" :icon="Delete" @click="del(row.id)" circle />
      </el-table-column>
    </el-table>
    <div class="example-pagination-block">
      <el-pagination @current-change="goPage" layout="prev, pager, next" :total="page" />
    </div>
    <itemPopup @on-close="closeDialog" @on-submit="Submit" :dialogVisible="data.dialogVisible" :Tips="data.Tips" :addFormField="data.addFormField" />
  </div>
</template>
<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import itemPopup from './popup.vue';
import { editApi, addApi } from '@/api/lists';
//新增拖拽
import Sortable from 'sortablejs';

//默认调用
onMounted(() => {
  rowDrop();
});

//拖拽行
function rowDrop() {
  const tbody = document.querySelector('.el-table__body-wrapper tbody') as HTMLDivElement;
  let tableData = PropList.list;
  Sortable.create(tbody, {
    onEnd({ newIndex, oldIndex }) {
      tableData.splice(newIndex, 0, tableData.splice(oldIndex, 1)[0]);
      let newArray = [];
      newArray = tableData.slice(0);
    },
  });
}

interface popupItem {
  street_name: string;
  recover_num: number;
  coverage_num: number;
  create_time?: string;
  update_time?: string;
  id: number;
}

type Props = {
  list: any;
  page: number;
};

const PropList = defineProps<Props>();

const emit = defineEmits(['on-list']);

const data = reactive({
  dialogVisible: false,
  Tips: '修改',
  addFormField: {},
});

//弹窗展示
function add(type: string, row?: popupItem) {
  data.dialogVisible = true;
  data.Tips = type == 'edit' ? '修改' : '添加';
  data.addFormField = row ? JSON.parse(JSON.stringify(row)) : {};
}

//关闭弹窗
function closeDialog(type: boolean) {
  data.dialogVisible = type;
}

//分页函数
function goPage(val: number) {
  emit('on-list', val);
}

//add/edit
function Submit(item: popupItem) {
  if (data.Tips == '修改') {
    editApi(item).then(res => {
      if (res.data.status === 1) {
        data.dialogVisible = false;
        ElMessage.success(res.data.reason);
        emit('on-list', 1);
      } else {
        ElMessage.error(res.data.reason);
      }
    });
  } else {
    addApi(item).then(res => {
      if (res.data.status === 1) {
        data.dialogVisible = false;
        ElMessage.success(res.data.reason);
        emit('on-list', 1);
      } else {
        ElMessage.error(res.data.reason);
      }
    });
  }
}

//删除
function del(id: number) {
  console.log(id);
  ElMessageBox.confirm('确认删除?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '关闭',
    type: 'warning',
  }).then(() => {
    console.log(id);
    ElMessage({
      type: 'success',
      message: '删除成功 - 未接接口',
    });
    emit('on-list');
  });
}
</script>
<style lang="less" scoped></style>
