<template>
  <div class="errPage-container">
    <el-button class="back-btn" @click="back"> 返回 </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/index/data"> 回首页 </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" class="some-gif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import errGif from "@/assets/error-img/401.gif";
import { useRouter } from "vue-router";
const route = useRouter();
const dialogVisible = ref<boolean>(false);

function ewizardClap() {
  return false;
}
function back() {
  route.go(-1);
}
</script>

<style lang="less" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .some-gif {
    margin: 0 auto;
    display: block;
  }

  .some-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
