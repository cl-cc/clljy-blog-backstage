<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="Tips" width="60%" :close-on-click-modal="false">
      <el-form ref="addForm" :model="item" label-width="180px" :rules="rules">
        <el-form-item label="姓名(真实姓名)" prop="name">
          <el-input v-model="item.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="cookie" prop="cookie">
          <el-input v-model="item.cookie" type="textarea" :rows="12"></el-input>
        </el-form-item>
        <el-form-item label="过期通知邮箱" prop="PUSH_PLUS_TOKEN">
          <el-input v-model="item.PUSH_PLUS_TOKEN" type="text" placeholder="该字段可不填写"></el-input>
        </el-form-item>
        <el-form-item label="aid" prop="aid">
          <el-input v-model="item.aid" type="text"></el-input>
        </el-form-item>
        <el-form-item label="uuid" prop="uuid">
          <el-input v-model="item.uuid" type="text"></el-input>
        </el-form-item>
        <el-form-item label="_signature" prop="_signature">
          <el-input v-model="item._signature" type="textarea" :rows="4"></el-input>
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
import type { FormInstance, FormRules } from 'element-plus';
//获取from表单
const addForm = ref<FormInstance>();
//form表单接口类型
interface TableItem {
  cookie: string | number;
  name: string;
  PUSH_PLUS_TOKEN: string;
  aid: string | number;
  uuid: string | number;
  _signature: string;
}
//参数字面量类型集合
type Prop = {
  item: TableItem;
  dialogVisible: boolean;
  Tips: string;
};
//验证规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: 'name不能为空', trigger: ['change'] }],
  cookie: [{ required: true, message: 'cookie不能为空', trigger: ['change'] }],
  aid: [{ required: true, message: 'aid不能为空', trigger: ['change'] }],
  uuid: [
    {
      required: true,
      message: 'uuid不能为空',
      trigger: ['change'],
    },
  ],
  _signature: [
    {
      required: true,
      message: '_signature不能为空',
      trigger: ['change'],
    },
  ],
});
//传递函数
const emit = defineEmits(['on-close', 'on-submit']);

//默认值
const data = withDefaults(defineProps<Prop>(), {
  dialogVisible: false,
  Tips: '弹窗',
});

//关闭弹窗
function close(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
  emit('on-close', false);
}

//提交信息
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
