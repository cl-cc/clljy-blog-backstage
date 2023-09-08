<script setup lang="ts">
  import { CountTo } from 'vue3-count-to';
  import messages from '../../assets/images/index/messages.png';
  import purchases from '../../assets/images/index/purchases.png';
  import shoppings from '../../assets/images/index/shoppings.png';
  import visits from '../../assets/images/index/visits.png';

  import { useTestStore } from '@/store';
  const STORE = useTestStore();
</script>
<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="visits" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('home.card') }}</div>
          <CountTo ref="myCount" :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="messages" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('home.card1') }}</div>
          <CountTo ref="myCount" :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="purchases" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('home.card2') }}</div>
          <CountTo ref="myCount" :start-val="0" :end-val="9280" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="shoppings" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('home.card3') }}</div>
          <CountTo ref="myCount" :start-val="0" :end-val="13600" :duration="4000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
  @import url(@/darkCss/home-card.less);
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      height: 124px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgb(228, 221, 221);
      img {
        width: 60px;
        height: 60px;
        display: inline-block;
      }
      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 26px;
          text-align: right;
          width: 140px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      svg {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
