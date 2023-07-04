import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapseLeftBar: false,
        activeThemeIcon: 'light',
        auth: {
            user: null,
            token: null
        },
        dataChonDonVi_Store: [],
        dataChonTruongHoc_Store: []
    },
    getters: {},
    mutations: {
        SET_COLLAPSE_LEFT_BAR(state, isCollapse) {
            state.isCollapseLeftBar = isCollapse
        },
        setActiveThemeIcon(state, icon) {
            state.activeThemeIcon = icon
        },

        // <!-- ************ Auth ************ -->
        SET_AUTH_USER(state, user) {
            state.auth.user = user

            localStorage.setItem('user', JSON.stringify(user))
        },
        SET_AUTH_TOKEN(state, token) {
            state.auth.token = token

            localStorage.setItem('token', token)
        },

        //load lại trang thì vẫn còn thông tin User, Token
        RESTORE_AUTH_USER(state, user) {
            state.auth.user = user
        },
        RESTORE_AUTH_TOKEN(state, token) {
            state.auth.token = token
        },

        // <!-- ************ data Chọn đơn vị ************ -->
        SET_DATACHONDONVI_STORE(state, dataChonDonVi) {
            state.dataChonDonVi_Store = dataChonDonVi
            localStorage.setItem('data_ChonDonVi', JSON.stringify(dataChonDonVi))
        },
        RESTORE_DATA_CHONDONVI(state, data_ChonDonVi) {
            state.dataChonDonVi_Store = data_ChonDonVi
        },

        // <!-- ************ data Chọn Trường học ************ -->
        SET_DATA_CHONTRUONGHOC_STORE(state, dataChonTruongHoc) {
            state.dataChonTruongHoc_Store = dataChonTruongHoc
            localStorage.setItem(
                'data_ChonTruongHoc',
                JSON.stringify(dataChonTruongHoc)
            )
        },
        RESTORE_DATA_CHONTRUONGHOC(state, dataChonTruongHoc) {
            state.dataChonTruongHoc_Store = dataChonTruongHoc
        }
    },
    actions: {},

    modules: {}
})
