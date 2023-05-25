import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// @ts-ignore
import router from './router/index.js'
import hls from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式

const app = createApp(App)
app.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: HTMLElement)=>{
        hls.highlightBlock(block)
    })
})


app.use(ElementPlus).use(router).mount("#app");
