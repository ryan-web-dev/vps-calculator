import { reactive, ref } from 'vue';
import dayjs from 'dayjs';
import CurrencyCodeOptions from "../constants/CurrencyCodeOptions";

// const isProduction = process.env.NODE_ENV === 'production';
// const url = isProduction ? 'https://open.er-api.com/v6/latest/CNY' : '/api/v6/latest/CNY'
const url = 'https://open.er-api.com/v6/latest/CNY'

export const useRateData = () => {
    const rateData = reactive({
        date: '',
        base: 'CNY',
        rates: {}
    });
    const isLoadingRef = ref(false);
    const setRateData = async () => {
        isLoadingRef.value = true;
        try {
            const res = await fetch(url);
            if(!res.ok) {
                throw new Error('Request Error!');
            }
            const { rates = {}, time_last_update_unix = 0, base_code = 'CNY' } = await res.json();
            const formattedTime = dayjs(time_last_update_unix * 1000).format('YYYY-MM-DD HH:mm:ss');
            const resultRate = {};
            CurrencyCodeOptions.forEach(item => {
                if (item.value) resultRate[item.value] = rates[item.value];
            });
            Object.assign(rateData, {
                date: formattedTime,
                base: base_code,
                rates: resultRate
            });
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            isLoadingRef.value = false;
        }
    };

    return { rateData, setRateData, isLoadingRef }
};

export default useRateData;