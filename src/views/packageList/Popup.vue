<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="Tips" width="30%" :close-on-click-modal="false">
      <el-form ref="addForm" :model="item" label-width="100px" :rules="rules">
        <el-form-item label="时间" prop="date">
          <el-date-picker v-model="item.date" type="date" placeholder="请输入时间" format-value="yy-mm-dd" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="item.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="item.sex" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="state">
          <el-input v-model="item.state" placeholder="请输入省份"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="item.city" placeholder="请输入城市"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="item.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close(addForm)">关闭</el-button>
          <el-button type="primary" @click="submit(addForm)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { FormInstance, FormItemRule } from 'element-plus';
const addForm = ref<FormInstance>();
interface TableItem {
  date: string;
  name: string;
  state: string;
  sex: string;
  city: string;
  address: string;
}

type Prop = {
  item: TableItem;
  dialogVisible: boolean;
  Tips: string;
};

const emit = defineEmits(['on-close', 'on-submit']);

const data = withDefaults(defineProps<Prop>(), {
  dialogVisible: false,
  Tips: '弹窗',
});

function close(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
  emit('on-close', false);
}

async function submit(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      emit('on-submit', data.item);
      close(formEl);
    }
  });
}
</script>
<script lang="ts">
//区分组件
export default {
  name: 'Poput',
};
</script>
<style lang="less" scoped></style>
