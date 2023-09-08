<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="date" label="Date" width="150" />
      <el-table-column label="Delivery Info">
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column label="Address Info">
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" />
          <el-table-column prop="zip" label="Zip" width="120" />
        </el-table-column>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="{ row, $index }">
          <el-button size="small" @click="handleEdit(row, $index)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete($index)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <popupItem :item="data.editRow" :Tips="data.Tips" :dialogVisible="data.dialogVisible" @on-close="close" @on-submit="submit" />
  </div>
</template>
<script setup lang="ts">
import popupItem from './popup.vue';
interface TableItem {
  date: string;
  name: string;
  state: string;
  city: string;
  address: string;
  zip: string;
}

type Props = {
  list: TableItem[];
};

defineProps<Props>();

const data = reactive({
  editRow: {},
  Tips: '',
  dialogVisible: false,
  index: -1,
});

const emit = defineEmits(['on-del', 'on-list']);

//修改
function handleEdit(e: TableItem, index: number) {
  data.editRow = JSON.parse(JSON.stringify(e));
  data.Tips = '修改';
  data.dialogVisible = true;
  data.index = index;
}
//删除
function handleDelete(index: number) {
  emit('on-del', index);
}

//关闭
function close(e: boolean) {
  data.dialogVisible = e;
}

//修改
function submit(row: TableItem) {
  emit('on-list', data.index, row);
}
</script>
<style lang="less" scoped></style>
