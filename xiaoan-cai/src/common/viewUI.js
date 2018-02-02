// 项目引用的 UI控件
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/reset.css'
import MintUI from 'xiaoan-mint-ui'
import 'xiaoan-mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueScroller from 'vue-scroller'

const components = [];

export default (Vue) => {
    components.map((v, i) => {
        Vue.component(v.name, v)
    })
    Vue.use(MintUI);
    Vue.use(VueAwesomeSwiper)  // 记得不要忘记这句
    Vue.use(VueScroller)
}
