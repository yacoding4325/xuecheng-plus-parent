import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import filters from '@/filter'
import { SystemModule } from '@/store/modules/system'

Vue.config.productionTip = false

// ElementUI
import ElementUI from 'element-ui'
import '@/scss/element-ui/index.scss'
Vue.use(ElementUI)

// 注册模块
import Portal from '@/module-portal'
import Organization from '@/module-organization'
import Personal from '@/module-personal'
import Entering from './module-entering'
Portal.install(router)
Organization.install(router)
Personal.install(router)
Entering.install(router)

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 指令
Vue.directive('focus', {
  inserted: function(el, binding) {
    // console.log(el)
    el.focus()
  }
})

// 主程序初始
async function main() {
  // 初始 vuex 数据
  await SystemModule.getDicts()

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

main()
