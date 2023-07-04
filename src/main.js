import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const storedUser = localStorage.getItem('user')
if (storedUser) {
    store.commit('RESTORE_AUTH_USER', JSON.parse(storedUser))
}
const storeToken = localStorage.getItem('token')
if (storeToken) {
    store.commit('RESTORE_AUTH_TOKEN', storeToken)
}
const storeDataChonDonVi = localStorage.getItem('data_ChonDonVi')
if (storeDataChonDonVi) {
    store.commit('RESTORE_DATA_CHONDONVI', storeDataChonDonVi)
}
const storeDataChonTruongHoc = localStorage.getItem('data_ChonTruongHoc')
if (storeDataChonTruongHoc) {
    store.commit('RESTORE_DATA_CHONTRUONGHOC', storeDataChonTruongHoc)
}
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
