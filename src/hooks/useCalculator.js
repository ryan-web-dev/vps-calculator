import { reactive, ref } from 'vue';
import CurrencyCodeOptions from "../constants/CurrencyCodeOptions";
import DurationOptions from "../constants/DurationOptions";
import useRateData from './useRateData';
import dayjs from 'dayjs';

export const useCalculator = () => {
    const rules = {
        amount: [{ required: true, message: '请补充该项内容！', type: 'error' }],
        renewal: [{ required: true, message: '请补充该项内容！', type: 'error' }],
        currency: [{ required: true, message: '请补充该项内容！', type: 'error' }],
        rate: [{ required: true, message: '请补充该项内容！', type: 'error' }],
        duration: [{ required: true, message: '请补充该项内容！', type: 'error' }],
        buyDate: [{ required: true, message: '请补充该项内容！', type: 'error' }],
        renewDate: [{ required: true, message: '请补充该项内容！', type: 'error' }],
    }

    const { rateData, setRateData } = useRateData();

    const formCompoRef = ref(null);
    const formData = reactive({
        amount: '',
        renewal: '',
        currency: CurrencyCodeOptions[0].value,
        rate: '',
        duration: DurationOptions[3].value,
        buyDate: dayjs().format('YYYY-MM-DD'),
        renewDate: '',
    });

    const setCurrentRate = (currentCurrency) => {
        const currentRate = 1 / rateData.rates[currentCurrency];
        formData.rate = Math.round(currentRate * 100) / 100;
    };
    const handleSelectChange = (value) => {
        setCurrentRate(value);
    };


    const isShowResultRef = ref(false);
    const resultState = reactive({
        remainValue: '',
        overflowPrice: ''
    })
    const handleButtonClick = async () => {
        try {
            const res = await formCompoRef.value.validate();
            if (res === true) {
                const { renewDate, buyDate, renewal, duration, rate, amount } = formData;
                const daysDiff = dayjs(renewDate).diff(dayjs(buyDate), 'day') + 1;
                const oneYearPrice = 12 / duration * renewal * rate;
                const tempRemainValue = daysDiff / 365 * oneYearPrice;
                resultState.remainValue = Math.round(tempRemainValue * 100) / 100;
                resultState.overflowPrice = Math.round((amount - tempRemainValue) * 100) / 100;
                isShowResultRef.value = true;
            } else {
                console.warn('校验失败');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadData = async () => {
        await setRateData();
        const defaultCurrency = CurrencyCodeOptions[0].value;
        setCurrentRate(defaultCurrency);
    }

    loadData();

    return {
        formData, rules, isShowResultRef, resultState, formCompoRef, handleSelectChange, handleButtonClick
    }
};

export default useCalculator;