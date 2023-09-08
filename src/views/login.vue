<template>
  <div class="login">
    <div class="screenfull-lang" @click="change_Lang">
      <i></i>
    </div>
    <div class="toggle">
      <span @click.stop="toggleDark()">暗黑模式</span>
      <el-switch v-model="isDark" />
    </div>
    <div class="login-main">
      <h3>{{ $t('login.title') }}</h3>
      <div class="login-info">
        <el-input v-model="info.username" class="login_ipt" style="width: 400px" :prefix-icon="Avatar" :placeholder="$t('login.ipt_name')"></el-input>
      </div>
      <div class="login-info">
        <el-input v-model="info.password" class="login_ipt" style="width: 400px" :prefix-icon="WarningFilled" :placeholder="$t('login.ipt_psd')"></el-input>
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
<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { Avatar, WarningFilled, SetUp } from '@element-plus/icons-vue';
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

  function sign() {
    if (info.username === '' || info.password === '') {
      ElMessage.error('请输入用户名和密码');
      return;
    }
    loginApi(info).then((res) => {
      localStorage.setItem('token', `Bearer ${res.data.access_token}`);
      ElMessage.success('登录成功');
      window.location.href = '/index/data';
    });
  }
</script>
<style lang="less" scoped>
  @c: #ccc;
  @import url(@/darkCss/login.less);
  .login {
    height: 100%;
    overflow: hidden;
    background: url('https://w.wallhaven.cc/full/dp/wallhaven-dp2m9o.png');
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
      margin: 40px 100px 0 0;
      color: #fff;
      cursor: pointer;
      i {
        display: block;
        width: 35px;
        height: 35px;
        color: #000;
        background: url('http://imghz5.linkunst.com//20220615/96171source62a97d4410ca5.png');
        background-size: 100% 100%;
      }
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
      background: rgb(244, 164, 96);
      margin-top: 30px;
      &:hover {
        background: rgba(244, 164, 96, 0.9);
      }
    }
    h3 {
      text-align: left;
      width: 100%;
      font-size: 36px;
      font-weight: bold;
      color: rgb(50, 49, 49);
    }
    &-main {
      width: 700px;
      height: 100%;
      float: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
