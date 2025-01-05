<template>
  <div class="main">
    <h2 className="title">{{ CustomizedData?.title ?? 'VPS剩余价值计算器' }}</h2>
    <ul className="tips">
      <li v-for="(item, index) in (CustomizedData?.tips ?? []).slice(0, 3)" :key="index">{{ item }}</li>
    </ul>
    <div class="form">
      <t-form ref="formCompoRef" :rules="rules" :data="formData">
        <t-form-item label="购机金额: " name="amount">
          <t-input-number theme="column" v-model="formData.amount" placeholder='默认CNY'></t-input-number>
        </t-form-item>
        <t-form-item label="续费金额: " name="renewal">
          <t-input-number theme="column" v-model="formData.renewal"></t-input-number>
        </t-form-item>
        <t-form-item label="续费货币: " name="currency">
          <t-select v-model="formData.currency" :options="CurrencyCodeOptions" @change="handleSelectChange"></t-select>
        </t-form-item>
        <t-form-item label="今日汇率: " name="rate">
          <t-input-number theme="column" v-model="formData.rate"></t-input-number>
        </t-form-item>
        <t-form-item label="付款周期: " name="duration">
          <t-select v-model="formData.duration" :options="DurationOptions"></t-select>
        </t-form-item>
        <t-form-item label="购买日期: " name="buyDate">
          <t-date-picker v-model="formData.buyDate" format='YYYY-MM-DD' placeholder="请选择日期" />
        </t-form-item>
        <t-form-item label="续费日期: " name="renewDate">
          <t-date-picker v-model="formData.renewDate" format='YYYY-MM-DD' placeholder="请选择日期" />
        </t-form-item>
      </t-form>
    </div>
    <t-button class="button" theme="primary" size="large" @click="handleButtonClick">
      计算
    </t-button>
    <div className="result" v-if="isShowResultRef">
      <p>剩余价值: {{ resultState.remainValue }}元</p>
      <p>溢价金额: {{ resultState.overflowPrice }}元</p>
    </div>
  </div>
</template>
<script setup>
import CustomizedData from '/CustomizedData.json';
import CurrencyCodeOptions from '@/constants/CurrencyCodeOptions';
import DurationOptions from '@/constants/DurationOptions';
import useCalculator from '@/hooks/useCalculator';

const {
  formData,
  rules,
  isShowResultRef,
  resultState,
  formCompoRef,
  handleSelectChange,
  handleButtonClick
} = useCalculator();

</script>
<style scoped lang="less">
.main {
  width: 540px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0.9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  .title {
    font-size: 24px;
    color: #333;
    text-align: center;
  }

  .tips {
    color: darkred;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    max-height: 63px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .form {
    margin-bottom: 20px;
    padding: 0 20px;

    .t-input-number {
      width: 360px;
    }

    .t-date-picker {
      width: 360px;
    }
  }

  .button {
    width: 460px;
  }

  .result {
    width: 460px;
    margin: 20px auto 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    p {
      font-size: 18px;
      color: #333;
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>
