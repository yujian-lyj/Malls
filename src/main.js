// @ts-nocheck
import Vue from 'vue'
import store from './srote'
import App from './App.vue'
import router from './router'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
    //安装toast
Vue.use(toast)
    //解决移动端300ms延迟
FastClick.attach(document.body)
    //图片懒加载
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder1.png')
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')