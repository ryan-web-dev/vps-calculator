import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/reset.less';
import {
    Form as TForm,
    FormItem as TFormItem,
    Input as TInput,
    Picker as TPicker,
    DateTimePicker as TDateTimePicker,
    Button as TButton,
    Popup as TPopup,
    Cell as TCell
} from 'tdesign-mobile-vue';
// 引入组件库的少量全局样式变量
import 'tdesign-mobile-vue/es/style/index.css';
import utils from '@/utils';

const isMobile = utils.isMobile();
if (!isMobile) {
    window.location.replace('./pc.html');
}

const app = createApp(App);
app.use(TForm);
app.use(TFormItem);
app.use(TInput);
app.use(TPicker);
app.use(TDateTimePicker);
app.use(TButton);
app.use(TPopup);
app.use(TCell);

app.mount('#app');
