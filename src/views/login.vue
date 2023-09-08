<script setup lang="ts">
  import { ElMessage, ElLoading } from 'element-plus';
  import { Avatar, WarningFilled } from '@element-plus/icons-vue';
  import { loginApi } from '@/api/index';
  import { useI18n } from 'vue-i18n';
  import { useDark, useToggle } from '@vueuse/core';
  const { locale } = useI18n();
  const langT = ref<boolean>(false);

  const checked3 = ref(false);
  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  type infoItem = {
    grant_type: string;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
  };

  const info = reactive<infoItem>({
    grant_type: 'password',
    client_id: '2',
    client_secret: 'YB0COWApYNgFLNyfXoE3oC26PBa1xQ3mETsxMKdH',
    username: '',
    password: ''
  });
  //语言切换
  function change_Lang() {
    let lang = langT.value ? 'en' : 'zh';
    langT.value = !langT.value;
    locale.value = lang;
    localStorage.setItem('lang', lang);
  }

  function errorClick() {
    ElMessage.info('功能暂未开放');
  }
  const options = ref({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  function sign() {
    const loadingInstance = ElLoading.service(options.value);
    if (info.username === '' || info.password === '') {
      ElMessage.error('请输入用户名和密码');
      return;
    }
    loginApi(info).then((res) => {
      loadingInstance.close();
      localStorage.setItem('token', `Bearer ${res.data.access_token}`);
      ElMessage.success('登录成功');
      window.location.href = '/index/data';
    });
  }
</script>
<template>
  <div class="login">
    <div class="screenfull-lang" @click="change_Lang">
      <span v-if="isDark">中/英</span>
      <span style="color: #000" v-else>中/英</span>
    </div>
    <div class="toggle">
      <span @click.stop="toggleDark()"> <span style="color: #fff" v-if="isDark">暗黑</span> <span style="color: #000" v-else>暗黑</span> </span>
      <el-switch v-model="isDark" />
    </div>
    <div class="login-main">
      <h3>{{ $t('login.title') }}</h3>
      <div class="login-info">
        <el-input v-model="info.username" class="login_ipt" style="width: 400px" :prefix-icon="Avatar" :placeholder="$t('login.ipt_name')"></el-input>
      </div>
      <div class="login-info">
        <el-input v-model="info.password" type="password" class="login_ipt" style="width: 400px" :prefix-icon="WarningFilled" :placeholder="$t('login.ipt_psd')"></el-input>
      </div>
      <el-button type="info" v-btnAntiShake="sign" class="btn">{{ $t('login.btn_login') }}</el-button>
      <div class="operation_login">
        <div><el-checkbox class="operation_login-checkbox" v-model="checked3" />{{ $t('login.tips_btn') }}</div>
        <div class="forget" @click="errorClick">{{ $t('login.forget_psd') }}</div>
      </div>
      <div class="other_login" @click="errorClick">
        <div>{{ $t('login.btn_bottom') }}</div>
        <div>{{ $t('login.btn_bottom1') }}</div>
        <div>{{ $t('login.btn_bottom2') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @c: #ccc;
  @import url(@/darkCss/login.less);
  .login {
    height: 100%;
    overflow: hidden;
    background-size: 100% 100%;
    .toggle {
      float: right;
      margin: 40px 40px 0 0;
      display: flex;
      align-items: center;
      span {
        color: #fff;
        margin-right: 10px;
      }
    }
    .screenfull-lang {
      float: right;
      margin: 42px 100px 0 0;
      color: #fff;
      cursor: pointer;
    }
    .operation_login {
      width: 400px;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      align-items: center;
      font-size: 15px;
      &-checkbox {
        margin-right: 10px;
      }
      .forget {
        color: #0960bd;
        cursor: pointer;
      }
    }
    .other_login {
      display: flex;
      margin-top: 20px;
      div {
        width: 125px;
        height: 35px;
        border: 1px solid #456990;
        text-align: center;
        line-height: 35px;
        font-size: 15px;
        color: rgb(22, 22, 22);
        margin-right: 10px;
        &:hover {
          border: 1px solid #4370a1;
          color: #5389c2;
          cursor: pointer;
        }
      }
    }
    .btn {
      width: 400px;
      height: 50px;
      font-size: 20px;
      background: rgb(64, 158, 255);
      margin-top: 30px;
      &:hover {
        background: rgba(64, 158, 255, 0.8);
      }
    }
    h3 {
      text-align: center;
      width: 100%;
      font-size: 36px;
      font-weight: bold;
      color: rgb(50, 49, 49);
    }
    &-main {
      width: 100%;
      height: 85%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
    &-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      margin-top: 20px;
      .login_ipt {
        /deep/ .el-input__inner {
          height: 50px !important;
          font-size: 16px;
        }
      }
      .name {
        width: 60px;
      }
    }
  }
</style>
