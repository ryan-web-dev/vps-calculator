import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/reset.less';
import {
    Form as TForm,
    FormItem as TFormItem,
    Input as TInput,
    InputNumber as TInputNumber,
    Select as TSelect,
    Option as TOption,
    DatePicker as TDatePicker,
    Button as TButton,
} from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import utils from '@/utils';

const isMobile = utils.isMobile();
if (isMobile) {
    window.location.replace('./m');
}

const app = createApp(App);
app.use(TForm);
app.use(TFormItem);
app.use(TInput);
app.use(TInputNumber);
app.use(TSelect);
app.use(TOption);
app.use(TDatePicker);
app.use(TButton);

app.mount('#app');
