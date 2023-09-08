<template>
  <!-- 添加 -->
  <el-button type="primary" class="add-btn" @click="handleAdd">添加</el-button>
  <!-- 列表 -->
  <Table :columns="columns" :tableData="tableList.list" :optionWidth="400" :optionIsNeed="true" :editIsNeed="true" :deleteIsNeed="true" :indexFlag="true" @handleEdit="handleEdit" @handleDelete="handleDelete">
    <template #end_day="slotProps"> 还剩 {{ slotProps.row.end_day }} 天过期 </template>
    <template #status="slotProps">
      <span v-if="slotProps.row.status">正常</span>
      <span v-else class="red">过期</span>
    </template>
    <template #prev="{ scope }">
      <el-button type="text" size="small" @click="handleFly(scope)">日志</el-button>
    </template>
    <template #next="{ scope }">
      <el-button type="text" size="small" @click="handleSet(scope.id)">测试</el-button>
    </template>
  </Table>
  <!-- 分页 -->
  <Pagination :currentPage="currentPage" :totalNum="totalNum" @currentChange="currentChange" />
  <!-- 添加/修改 -->
  <Poput :item="item.editRow" :Tips="item.Tips" :dialogVisible="item.dialogVisible" @on-close="close" @on-submit="submit" />
  <!-- 日志 -->
  <Tab :Tips="tabItem.Tips" :dialogTab="tabItem.dialogTab" :tableList="tabItem.tableList" @on-tab-click="tabClick" @on-close="tabClose" />
</template>
<script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus';
  import Table from '../../components/Table/table.vue';
  import Pagination from '../../components/Table/Pagination.vue';
  import Poput from './Popup.vue';
  import Tab from './tab.vue';
  //接口
  import { List, Del, Set, Edit, Log, Add } from '@/api/signApi/index';
  //分页参数
  const currentPage = ref(1);
  const totalNum = ref(0);
  //列表类型接口
  interface TableItem {
    date: string;
    name: string;
    state: string;
    sex: string;
    city: string;
    address: string;
    id: number;
  }
  type Item = {
    list: TableItem[];
  };
  //表头
  const columns = reactive([
    { prop: 'name', label: '姓名', minWidth: 120 },
    { prop: 'cookie', label: 'cookie', minWidth: 120 },
    { prop: 'aid', label: 'aid', minWidth: 120 },
    { prop: 'uuid', label: 'uuid', minWidth: 120 },
    { prop: '_signature', label: '_signature', minWidth: 120 },
    { prop: 'end_day', label: '过期时间', minWidth: 120, slot: true },
    { prop: 'status', label: '过期状态', minWidth: 120, slot: true }
  ]);
  //列表数据
  const tableList = reactive<Item>({
    list: []
  });

  //获取数据
  getData();
  async function getData() {
    let params = {
      page: currentPage.value
    };
    let { data } = await List(params);
    tableList.list = data.data;
    totalNum.value = data.data?.length;
  }

  //测试是否成功接口函数
  async function handleSet(id: number) {
    let params = {
      id
    };
    let { data } = await Set(params);
    ElMessage.info(data.reason.err_msg);
  }

  //日志弹窗数据
  const tabItem = reactive({
    Tips: '',
    dialogTab: false,
    id: 0,
    type: 0,
    tableList: []
  });
  //日志查看
  function handleFly(row: TableItem) {
    tabItem.dialogTab = true;
    tabItem.Tips = '查看日志';
    tabItem.id = row.id;
    getLogList(row.id);
  }

  //获取日志接口
  async function getLogList(id: number, type: number = 1) {
    let { data } = await Log({ id, type });
    tabItem.tableList = data;
  }
  //日志切换
  function tabClick(index: number) {
    getLogList(tabItem.id, index + 1);
  }
  //日志关闭
  function tabClose(flag: boolean) {
    tabItem.dialogTab = flag;
  }

  //添加修改弹窗数据
  const item = reactive({
    editRow: {},
    Tips: '',
    dialogVisible: false,
    index: -1
  });
  //添加
  function handleAdd() {
    item.editRow = {};
    item.Tips = '添加';
    item.dialogVisible = true;
  }
  //修改
  function handleEdit(index: number, row: TableItem) {
    item.editRow = JSON.parse(JSON.stringify(row));
    item.Tips = '修改';
    item.dialogVisible = true;
    item.index = index;
  }
  //提交
  async function submit(row: TableItem) {
    item.dialogVisible = false;
    let params = {
      ...row
    };
    let { data } = item.Tips == '添加' ? await Add(params) : await Edit(row.id, params);
    if (data.status === 1) {
      getData();
      ElMessage.success(data.reason);
      return;
    }
    ElMessage.error(data.reason);
  }
  //删除
  function handleDelete(index: number, row: TableItem) {
    ElMessageBox.confirm('确定要删除该条信息吗?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(() => {
        Del(row.id).then((v) => {
          if (v.data.status === 1) {
            ElMessage({
              type: 'success',
              message: v.data.reason
            });
            getData();
            return;
          }
          ElMessage({
            type: 'error',
            message: v.data.reason
          });
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled'
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
<style lang="less" scoped>
  .add-btn {
    margin-top: 20px;
  }
  .red {
    color: red;
    font-weight: bold;
  }
</style>
