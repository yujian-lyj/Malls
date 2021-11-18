// @ts-nocheck
import Vue from 'vue'
import store from './srote'
import App from './App.vue'
import router from './router'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
    //安装toast
Vue.use(toast)

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')