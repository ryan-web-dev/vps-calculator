<template>
  <div class="main">
    <h2 className="title">{{ CustomizedData?.title ?? 'VPS剩余价值计算器' }}</h2>
    <ul className="tips">
      <li v-for="(item, index) in (CustomizedData?.tips ?? []).slice(0, 3)" :key="index">{{ item }}</li>
    </ul>
    <div class="form">
      <t-form labelWidth="26vw" ref="formCompoRef" scroll-to-first-error="auto" show-error-message :rules="rules"
        :data="formData">
        <t-form-item label="购机金额" name="amount">
          <t-input borderless theme="column" v-model="formData.amount" placeholder='默认CNY' type="number"></t-input>
        </t-form-item>
        <t-form-item label="续费金额" name="renewal">
          <t-input borderless theme="column" v-model="formData.renewal" type="number"></t-input>
        </t-form-item>
        <t-form-item label="续费货币" name="currency">
          <t-cell arrow :title="getOptionsLabel(CurrencyCodeOptions, formData.currency)"
            @click="showState.currency = true" />
          <t-popup v-model="showState.currency" placement="bottom">
            <t-picker :columns="CurrencyCodeOptions" @confirm="(value) => {
              showState.currency = false;
              handleConfirm('currency', value[0]);
              handleSelectChange(value);
            }" @cancel="showState.currency = false">
              <template #option="item">{{ item.label }}</template>
            </t-picker>
          </t-popup>
        </t-form-item>
        <t-form-item label="今日汇率" name="rate">
          <t-input borderless theme="column" v-model="formData.rate" type="number"></t-input>
        </t-form-item>
        <t-form-item label="付款周期" name="duration">
          <t-cell arrow :title="getOptionsLabel(DurationOptions, formData.duration)"
            @click="showState.duration = true" />
          <t-popup v-model="showState.duration" placement="bottom">
            <t-picker :columns="DurationOptions" @confirm="(value) => {
              showState.duration = false;
              handleConfirm('duration', value[0]);
            }" @cancel="showState.duration = false">
              <template #option="item">{{ item.label }}</template>
            </t-picker>
          </t-popup>
        </t-form-item>
        <t-form-item label="购买日期" name="buyDate">
          <t-cell arrow :title="formData.buyDate || '请选择日期'" @click="showState.buyDate = true" />
          <t-popup v-model="showState.buyDate" placement="bottom">
            <t-date-time-picker format='YYYY-MM-DD' :defaultValue="formData.buyDate" @confirm="(value) => {
              showState.buyDate = false;
              handleConfirm('buyDate', value);
            }" @cancel="showState.buyDate = false" />
          </t-popup>
        </t-form-item>
        <t-form-item label="续费日期" name="renewDate">
          <t-cell arrow :title="formData.renewDate || '请选择日期'" @click="showState.renewDate = true" />
          <t-popup v-model="showState.renewDate" placement="bottom">
            <t-date-time-picker format='YYYY-MM-DD' :start="formData.buyDate" @confirm="(value) => {
              showState.renewDate = false;
              handleConfirm('renewDate', value);
            }" @cancel="showState.renewDate = false" />
          </t-popup>
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
import { reactive } from 'vue';
import CustomizedData from '/CustomizedData.json';
import CurrencyCodeOptions from '@/constants/CurrencyCodeOptions';
import DurationOptions from '@/constants/DurationOptions';
import useCalculator from '@/hooks/useCalculator';

const showState = reactive({
  currency: false,
  duration: false,
  buyDate: false,
  renewDate: false
})

const {
  formData,
  rules,
  isShowResultRef,
  resultState,
  formCompoRef,
  handleSelectChange,
  handleButtonClick
} = useCalculator();

const getOptionsLabel = (options, value) => {
  const target = options.find(item => item.value === value);
  return target ? target.label : ''
};

const handleConfirm = (key, value) => {
  formData[key] = value;
}

</script>
<style scoped lang="less">
.main {
  width: 94vw;
  padding: 2vw;
  background: rgba(255, 255, 255, 0.9);
  opacity: 0.9;
  border-radius: 2vw;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
  text-align: center;

  .title {
    font-size: 6vw;
    color: #333;
    text-align: center;
  }

  .tips {
    color: darkred;
    text-align: center;
    font-size: 4vw;
    font-weight: bold;
    max-height: 18vw;
    overflow: hidden;
    margin-top: 2vw;
    margin-bottom: 2vw;
  }

  .form {
    margin-bottom: 2vw;
    padding: 0 2vw;

    :deep(.t-form) {
      .t-form__label {
        text-align: left;
      }
    }
  }

  .button {
    width: 90vw;
  }

  .result {
    width: 90vw;
    margin: 2vw auto 0 auto;
    background-color: white;
    padding: 2vw;
    border-radius: 2vw;
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.1);
    text-align: center;

    p {
      font-size: 5vw;
      color: #333;
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>
