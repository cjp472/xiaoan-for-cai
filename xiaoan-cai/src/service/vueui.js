import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/transition.css'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js' // 移动端rem编译
import {InfiniteScroll, Spinner} from 'mint-ui';
import {LoadingPlugin, ToastPlugin} from 'vux'

const components = [Spinner]

export default (Vue) => {
  components.map((v, i) => {
    Vue.component(v.name, v)
  })

  Vue.use(InfiniteScroll)
  Vue.use(LoadingPlugin)
  Vue.use(ToastPlugin)
}
