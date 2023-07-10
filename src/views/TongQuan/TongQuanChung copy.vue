<template>
    <div class="home">
        <CustomTitle :title="'Dashboard'" />
        <div class="select-dashboard">
            <el-row :span="24">{{ dataSearch }} </el-row>
            <el-row :gutter="20">
                <el-col :md="7" :span="12">
                    <eselect
                        style="width: 100%"
                        multiple
                        collapseTags
                        v-model="dataSearch.donVi"
                        @change="ChonDonVi"
                        :placeholder="'Chọn'"
                        filterable
                        :data="danh_sach_don_vi"
                        :fields="['name', 'value']"
                    />
                </el-col>
                <el-col :md="4" :span="12">
                    <eselect
                        style="width: 100%"
                        multiple
                        collapseTags
                        v-model="dataSearch.capHoc"
                        @change="ChonDonVi"
                        :placeholder="'Chọn'"
                        filterable
                        :data="danh_sach_cap_hoc"
                        :fields="['tenTruongHoc', 'value']"
                    />
                </el-col>
                <el-col :md="7" :span="12">
                    <eselect
                        style="width: 100%"
                        multiple
                        collapseTags
                        v-model="dataSearch.truongHoc"
                        :placeholder="'Chọn'"
                        filterable
                        :data="danh_sach_truong_hoc"
                        :fields="['name', 'value']"
                    />
                </el-col>
                <el-col :md="3" :span="12">
                    <eselect
                        style="width: 100%"
                        collapseTags
                        v-model="dataSearch.namHoc"
                        :placeholder="'Chọn'"
                        filterable
                        :data="danh_sach_nam_hoc"
                        :fields="['name', 'value']"
                    />
                </el-col>
                <el-col :md="3" :span="12">
                    <el-button
                        :size="mini"
                        type="success"
                        @click.prevent="getThongKe()"
                        >Thống kê</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <div class="card-main"></div>
    </div>
</template>
<script>
import store from '@/store'
import PieChart from '@/components/PieChart.vue'
import CustomStatistic from '@/components/CustomStatistic.vue'
import banDo from '@/components/banDo/index.vue'
import eselect from '@/components/Ui/Eselect.vue'
import { mapState } from 'vuex'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import {
    ESelectGradeLevel_MockData,
    mockData_BieuDoDashedLineChart,
    xaxisCategories_TongQuanChung
} from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'
import StackedColumnChart from '@/components/StackedColumnChart.vue'
import CustomTitle from '@/components/CustomTitle.vue'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'DashBoard',
    components: {
        // banDo,
        // // CustomButton,
        eselect,
        // ESelectYear,
        // CustomStatistic,
        // ChangeTrackerItemCountTitle,
        // StackedColumnChart,
        // PieChart,
        CustomTitle
    },
    data() {
        return {
            dataSearch: {
                donVi: [],
                capHoc: [],
                truongHoc: [],
                namHoc: ''
            },
            danh_sach_truong_hoc: [],
            danh_sach_nam_hoc: [],
            danh_sach_cap_hoc: ESelectGradeLevel_MockData,
            danh_sach_don_vi: []
        }
    },

    computed: {
        ...mapState({
            authUser: (state) => state.auth.user
        }),
        ...mapState({
            authToken: (state) => state.auth.token
        }),

        activeThemeIcon() {
            return this.$store.state.activeThemeIcon
        }
    },

    mounted() {
        console.log('Mount...')
        this.renderNamHoc()
        this.dataSearch.namHoc = new Date().getFullYear() - 1
        console.log(this.dataSearch)
        this.layDonVi()
        this.layTruongHoc()
    },
    methods: {
        getThongKe() {
            console.log('lấy dữ liệu thống ke')
            this.getDataThongKeTangGiam_TongSoTruongHoc()
            this.getDataThongKeTangGiam_TongSoGiaoVien()
            this.getDataThongKeTangGiam_TongSoHocSinh()
            this.getDataBieuDoChatLuongDaoTao_TruongHoc()

            this.getDataBieuDoTrangThai_HocSinh()

            this.getDataBieuDoTrinhDoChinh_CBGVNV()

            this.getDataBieuDoDanhGiaHocSinh_HocLuc()
        },
        renderNamHoc() {
            console.log('render năm học')
            const currentYear = new Date().getFullYear()
            const startYear = currentYear - 10
            const endYear = currentYear
            for (let year = startYear; year <= endYear; year++) {
                let obj = {
                    name: `${year}-${year + 1}`,
                    value: year
                }
                this.danh_sach_nam_hoc.push(obj)
            }
            console.log(this.danh_sach_nam_hoc)
        },
        ChonDonVi() {
            console.log('Chọn đơn vị')
            this.dataSearch.truongHoc = []
            this.layTruongHoc()
        },
        async layDonVi() {
            this.requestHeaders = {
                token: this.authToken
            }
            let params = {
                maTinhThanh: this.authUser.province,
                start: 0,
                limit: 9999,
                check: true
            }
            var response = await sendRequest(
                Api.internal_api.dm_DonVi,
                null,
                this.requestHeaders,
                params
            )
            this.danh_sach_don_vi = []
            this.dataSearch.donVi = []
            if (response.statusResponse == 0) {
                console.log(response)
                let data = response.rows
                this.dataSearch.donVi = []
                for (let i = 0; i < data.length; i++) {
                    let obj = {
                        name:
                            data[i].tenDonVi.replace(
                                'Giáo dục và Đào tạo',
                                'GD&ĐT'
                            ) +
                            ' - [' +
                            data[i].maDonVi +
                            ']',
                        value: data[i].maDonVi
                    }
                    // this.dataSearch.donVi.push(obj.value)
                    this.danh_sach_don_vi.push(obj)
                }
                store.commit('SET_DATACHONDONVI_STORE', this.danh_sach_don_vi)
            } else {
                console.log('thông báo lỗi')
            }
        },
        async layTruongHoc() {
            this.requestHeaders = {
                token: this.authToken
            }
            let params = {
                capHoc: this.dataSearch.capHoc,
                maDonVi: this.dataSearch.donVi
            }
            var response = await sendRequest(
                Api.internal_api.dm_School,
                params,
                this.requestHeaders,
                null
            )
            console.log('Danh sách trường:')
            console.log(response)
            this.danh_sach_truong_hoc = []
            this.dataSearch.truongHoc = []
            if (response.statusResponse == 0) {
                console.log(response)
                let data = response.rows
                for (let i = 0; i < data.length; i++) {
                    let obj = {
                        name:
                            data[i].tenTruongHoc +
                            ' - [' +
                            data[i].maTruongHoc +
                            ']',
                        value: data[i].maTruongHoc
                    }
                    this.danh_sach_truong_hoc.push(obj)
                }
            } else {
                console.log('thông báo lỗi')
            }
        }
    }
}
</script>
<style scoped>
/* CSS select dashboard */
.select-dashboard {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
}

.select-dashboard .row {
    margin-left: 6px;
    margin-right: 6px;
}

.select-dashboard .col-12,
.select-dashboard .col-6 {
    padding: 12px 6px 12px 6px;
}

.card-main {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
}

.layout-card {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 15px;

    padding: 20px 10px 0px 10px;
}

.layout-card .card-header {
    background: #f2f3f8;
    height: 25px;
    color: black;
    padding: 5px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.layout-card .card-header .title {
    margin: -5px 0px 0px 10px;
    color: #070707;

    text-transform: uppercase;
    font-weight: bold;
}

.layout-card .card-body {
    padding: 5px;
    background: white;
    border: #f2f3f8 2px solid;
    height: 300px;
}

/* CSS select dashboard */
</style>
