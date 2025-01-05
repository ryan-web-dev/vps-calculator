<template>
    <div class="container" :style="containerStyle">
        <CalculatorPage />
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import CalculatorPage from './components/CalculatorPage.vue';
import CustomizedData from '/CustomizedData.json';

const containerStyle = {
    backgroundImage: CustomizedData?.['bg-pc'] ? `url(${CustomizedData['bg-pc']})` : ''
};

onMounted(() => {
    document.title = CustomizedData.tabTitle || 'VPS剩余价值计算器';
});

</script>
<style scoped lang="less">
.container {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    margin: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
