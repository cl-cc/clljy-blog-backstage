<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-03-30 13:36:55
 * @LastEditors: 程
 * @LastEditTime: 2023-09-08 14:44:06
-->
<script setup lang="ts">
  //获取element实例
  import { FormInstance, FormItemRule } from 'element-plus';
  import '@wangeditor/editor/dist/css/style.css';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  const addForm = ref<FormInstance>();

  type Item = {
    dialogVisible: boolean;
    Tips?: string;
    addFormField: any;
  };

  const data = withDefaults(defineProps<Item>(), {
    dialogVisible: false,
    Tips: '我是默认的标题'
  });

  type From = {
    street_name: string;
    recover_num: number;
    coverage_num: number;
  };

  //验证规则
  type Rules = {
    [k in keyof From]?: Array<FormItemRule>;
  };

  //验证必填
  const rules = reactive<Rules>({
    // street_name: [{ required: true, message: '请输入镇街名称', trigger: 'blur' }],
    // recover_num: [{ required: true, message: '请输入覆盖户数量', trigger: 'blur' }],
    // coverage_num: [{ required: true, message: '请输入回收点数量', trigger: 'blur' }]
  });

  const emit = defineEmits(['on-submit', 'on-close']);

  //add / edit
  async function submit(formEl: FormInstance | undefined) {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        data.addFormField.valueHtml = valueHtml.value;
        console.log(data.addFormField);
        emit('on-submit', data.addFormField);
        formEl.resetFields();
      }
    });
  }

  //弹窗关闭
  function close(formEl: FormInstance | undefined) {
    valueHtml.value = '';
    if (!formEl) return;
    formEl.resetFields();
    emit('on-close', false);
  }
  const editorRef = shallowRef();
  const valueHtml = ref('');
  const toolbarConfig = {};
  const editorConfig = ref({
    placeholder: '请输入内容...',
    //配置图片上传
    MENU_CONF: {
      uploadImage: {
        server: 'http://localhost:3000/upload',
        fieldName: 'multipartFile',
        maxFileSize: 1 * 1024 * 1024,
        axNumberOfFiles: 10,
        allowedFileTypes: ['image/*']
      }
    }
  });
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
  const handleCreated = (editor: any) => {
    editorRef.value = editor;
  };
  const mode = 'default';
</script>
<template>
  <!-- add/edit弹窗 -->
  <div>
    <el-dialog v-model="dialogVisible" :title="Tips" width="50%" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addFormField" :rules="rules">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="文章名称" prop="street_name"> <el-input v-model="addFormField.street_name" placeholder="请输入文章名称"></el-input> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间" prop="recover_num"> <el-date-picker style="width: 100%" v-model="addFormField.date" type="date" placeholder="请选择发布时间" /> </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="阅读数量" prop="coverage_num"><el-input v-model="addFormField.coverage_num" placeholder="请输入阅读数量"></el-input></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章类型" prop="coverage_num"><el-input v-model="addFormField.coverage_num" placeholder="请输入文章类型"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章内容" prop="coverage_num">
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
          </div>
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

<style lang="less" scoped></style>
