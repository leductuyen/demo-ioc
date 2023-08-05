<template>
    <div class="home">
        <CustomTitle :title="'Dashboard Học sinh'" />
        <div class="select-dashboard">
            <div class="row">
                <div class="col-md-4 col-12">
                    <ESelect
                        style="width: 100%"
                        no-match-text="Không tìm thấy bản ghi nào"
                        no-data-text="danh sách lựa chọn trống"
                        :clearable="true"
                        :disabled="false"
                        :data="this.dataChonDonVi_Store"
                        :placeholder="'Chọn đơn vị'"
                        :filterable="true"
                        :multiple="true"
                        :collapse-tags="true"
                        :fields="['tenDonVi', 'maDonVi']"
                        :value="selectedValue.selectedValueUnitEducation"
                        @change="
                            handleESelectChange('ESelectUnitEducation', ...$event)
                        "
                    />
                </div>
                <div class="col-md-2 col-6">
                    <ESelect
                        style="width: 100%"
                        no-match-text="Không tìm thấy bản ghi nào"
                        no-data-text="danh sách lựa chọn trống"
                        :clearable="true"
                        :disabled="false"
                        :data="getDataESelect.ESelectGradeLevel_MockData"
                        :placeholder="'Chọn cấp học'"
                        :filterable="true"
                        :multiple="true"
                        :collapse-tags="true"
                        :fields="['tenTruongHoc', 'value']"
                        :value="selectedValue.selectedValueGradeLevel"
                        @change="
                            handleESelectChange(
                                'ESelectGradeLevel_MockData',
                                ...$event
                            )
                        "
                    />
                </div>
                <div class="col-md-3 col-6">
                    <ESelect
                        :reset="resetESelectSchool"
                        @reset-completed="handleResetCompleted"
                        style="width: 100%"
                        no-match-text="Không tìm thấy bản ghi nào"
                        no-data-text="danh sách lựa chọn trống"
                        :clearable="true"
                        :disabled="false"
                        :data="getDataESelect.ESelectSchool"
                        :placeholder="'Chọn trường học'"
                        :filterable="true"
                        :multiple="true"
                        :collapse-tags="true"
                        :fields="['tenTruongHoc', 'maTruongHoc']"
                        :value="selectedValue.selectedValueSchool"
                        @change="handleESelectChange('ESelectSchool', ...$event)"
                    />
                </div>
                <div class="col-md-2 col-6">
                    <ESelectYear
                        v-model="selectedValue.selectedValueSchoolYear"
                        placeholder="Chọn năm"
                        size="small"
                        :no-data-text="'Không có bản ghi nào'"
                        :no-match-text="'Không tìm thấy bản ghi nào'"
                    ></ESelectYear>
                </div>
                <div class="col-md-1 col-6">
                    <div class="padding">
                        <CustomButton
                            label="Thống kê"
                            size="small"
                            type="success"
                            @click="handleThongKe"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- ************ Số liệu tăng giảm ************ -->
        <div class="card-main">
            <div class="row">
                <div class="col-md-3 col-sm-6">
                    <ChangeTrackerItemCountTitle
                        :countTitle="selectedValue.selectedValueUnitEducation"
                        :countTitleDefault="dataThongKeTangGiam.countTitleDefault"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Tổng số học sinh'"
                        :data="dataThongKeTangGiam.dataThongKeCount_HocSinh"
                        :content="'học sinh'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Tổng số học sinh đang học'"
                        :data="
                            dataThongKeTangGiam.dataThongKeCount_HocSinhDangHoc
                        "
                        :content="'học sinh'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Tổng số học sinh lên lớp'"
                        :data="dataThongKeTangGiam.dataThongKeCount_HocSinhLenLop"
                        :content="'học sinh'"
                    />
                </div>
            </div>
        </div>

        <Student
            :dataBieuDoTongQuan_HocSinh="
                getDataBieuDoHocSinh.dataBieuDoTongQuan_HocSinh
            "
            :dataBieuDoTrangThai_HocSinh="
                getDataBieuDoHocSinh.dataBieuDoTrangThai_HocSinh
            "
            :dataBieuDoGioiTinh_HocSinh="
                getDataBieuDoHocSinh.dataBieuDoGioiTinh_HocSinh
            "
            :dataBieuDoLoaiHinhDaoTao_HocSinh="
                getDataBieuDoHocSinh.dataBieuDoLoaiHinhDaoTao_HocSinh
            "
            :dataBieuDoKhuVuc_HocSinh="
                getDataBieuDoHocSinh.dataBieuDoKhuVuc_HocSinh
            "
            :dataBieuDohocSinh_HocLuc="
                getDataBieuDoHocSinh_HocLuc.dataBieuDohocSinh_HocLuc
            "
        />
        <div class="layout-card">
            <div class="row">
                <div class="col-md-6 mb-6 mt-3">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Phổ điểm học kỳ I</div>
                        </div>
                        <div class="card-body">
                            <LineChart
                                :data_LineChart="
                                    getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKI_PhoDiem
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-6 mt-3">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Phổ điểm học kỳ II</div>
                        </div>
                        <div class="card-body">
                            <LineChart
                                :data_LineChart="
                                    getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKII_PhoDiem
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LineChart from '@/components/LineChart.vue'
import CustomTitle from '@/components/CustomTitle.vue'
import CustomButton from '@/components/CustomButton.vue'
import CustomStatistic from '@/components/CustomStatistic.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import { mapState } from 'vuex'
import Student from '../Student.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import {
    ESelectGradeLevel_MockData,
    xaxisCategories_TongQuanChung
} from '@/mock_data'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'

import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'HocSinh',
    components: {
        CustomButton,
        Student,
        CustomTitle,
        ESelect,
        ESelectYear,
        CustomStatistic,
        ChangeTrackerItemCountTitle,
        LineChart
    },
    data() {
        return {
            resetESelectSchool: false,
            requestHeaders: {
                'X-ROLE-ID': '',
                'X-MA-DON-VI': '',
                'X-MA-TRUONG': '',
                Authorization: ''
            },

            requestData_ThongKeTangGiam: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                type: null,
                namHoc: null
            },

            requestData_BieuDoHocSinh: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                namHoc: null
            },

            getDataESelect: {
                ESelectUnitEducation: [], //chondonvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, // chon cap hoc
                ESelectSchool: [], //chontruonghoc
                ESelectShoolYear_MockData: [] //chonnamhoc
            },

            selectedValue: {
                selectedValueUnitEducation: [], //chondonvi
                selectedValueGradeLevel: [], // choncaphoc
                selectedValueSchool: [], //chontruonghoc
                selectedValueSchoolYear: null //chonnamhoc
            },
            dataThongKeTangGiam: {
                dataThongKeCount_HocSinh: null,
                dataThongKeCount_HocSinhDangHoc: null,
                dataThongKeCount_HocSinhLenLop: null
            },

            getDataBieuDoHocSinh: {
                dataBieuDoTongQuan_HocSinh: [],
                dataBieuDoTrangThai_HocSinh: [],
                dataBieuDoGioiTinh_HocSinh: [],
                dataBieuDoLoaiHinhDaoTao_HocSinh: [],
                dataBieuDoKhuVuc_HocSinh: []
            },
            requesData_BieuDoPhoDiem: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                namHoc: null
            },
            getDataBieuDoPhoDiem: {
                dataBieuDoPhoDiemHKI_PhoDiem: [],
                dataBieuDoPhoDiemHKII_PhoDiem: []
            },
            getDataBieuDoHocSinh_HocLuc: {
                dataBieuDohocSinh_HocLuc: []
            }
        }
    },

    methods: {
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        //callAPi

        async getDataBieuDoDanhGiaHocSinh_HocLuc() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 2
            this.requesData_BieuDoPhoDiem = {
                ...this.requesData_BieuDoPhoDiem,
                maSo: this.authUser.province,
                hocKy: 3,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.bieuDoPhoDiem.bieuDoDanhGiaHocSinh,
                this.requesData_BieuDoPhoDiem,
                this.requestHeaders
            )
            this.getDataBieuDoHocSinh_HocLuc.dataBieuDohocSinh_HocLuc =
                response.item.listData
            console.log(response)
        },
        async getDataBieuDoPhoDiemHocKyI_PhoDiem() {
            const requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 2
            this.requesData_BieuDoPhoDiem = {
                ...this.requesData_BieuDoPhoDiem,
                maSo: this.authUser.province,
                hocKy: 1,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear,
                type: null
            }
            const response = await sendRequest(
                Api.bieuDoPhoDiem.bieuDoPhoDiemHocKy,
                this.requesData_BieuDoPhoDiem,
                requestHeaders
            )
            this.getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKI_PhoDiem =
                response.item.listData
        },
        async getDataBieuDoPhoDiemHocKyII_PhoDiem() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 2
            this.requesData_BieuDoPhoDiem = {
                ...this.requesData_BieuDoPhoDiem,
                maSo: this.authUser.province,
                hocKy: 2,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear,
                type: null
            }
            const response = await sendRequest(
                Api.bieuDoPhoDiem.bieuDoPhoDiemHocKy,
                this.requesData_BieuDoPhoDiem,
                this.requestHeaders
            )
            this.getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKII_PhoDiem =
                response.item.listData
        },
        async getDataChonTruonghoc() {
            const maDonVis_Update = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueUnitEducation,
                'selectedValueUnitEducation'
            )
            const capHocs_Update = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueGradeLevel,
                'selectedValueGradeLevel'
            )
            const request_Data = {
                capHoc: capHocs_Update,
                maDonVi: maDonVis_Update
            }
            this.requestHeaders = {
                token: this.authToken
            }
            const response = await sendRequest(
                Api.internal_api.dm_School,
                request_Data,
                this.requestHeaders,
                null
            )
            this.getDataESelect.ESelectSchool = response.rows
            // store.commit('SET_DATA_CHONTRUONGHOC_STORE', response.rows)
        },

        async getDataCount_HocSinh() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 2

            this.requestData_ThongKeTangGiam = {
                ...this.requestData_ThongKeTangGiam,
                maSo: this.authUser.province,
                type: 1,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.thongKeTangGiam,
                this.requestData_ThongKeTangGiam,
                this.requestHeaders
            )
            this.dataThongKeTangGiam.dataThongKeCount_HocSinh =
                response.item.currentAmount
        },
        async getDataCount_HocSinhLenLop() {
            const maDonVis = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueUnitEducation,
                'selectedValueUnitEducation'
            )
            const capHocs = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueGradeLevel,
                'selectedValueGradeLevel'
            )
            const maTruongs = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueSchool,
                'selectedValueSchool'
            )
            const namHocs = this.selectedValue.selectedValueSchoolYear
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 2
            const request_Data = {
                ...this.requestData_BieuDoHocSinh,
                capHocs: capHocs,
                maDonVis: maDonVis,
                maTruongs: maTruongs,
                maSo: this.authUser.province,
                namHoc: namHocs || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.tongSoHocSinhLenLop,
                request_Data,
                this.requestHeaders
            )
            this.dataThongKeTangGiam.dataThongKeCount_HocSinhLenLop =
                response.item
        },
        async getDataBieuDoTongQuan_HocSinh() {
            await this.customGetDataBieuDoHocSinh(
                Api.bieuDoHocSinh.bieuDoTongQuan,
                'dataBieuDoTongQuan_HocSinh',
                'bieudoTron'
            )
        },
        async getDataBieuDoTrangThai_HocSinh() {
            await this.customGetDataBieuDoHocSinh(
                Api.bieuDoHocSinh.bieuDoTrangThai,
                'dataBieuDoTrangThai_HocSinh',
                'bieudoCot'
            )
        },
        async getDataBieuDoGioiTinh_HocSinh() {
            await this.customGetDataBieuDoHocSinh(
                Api.bieuDoHocSinh.bieuDoGioiTinh,
                'dataBieuDoGioiTinh_HocSinh',
                'bieudoCot'
            )
        },
        async getDataBieuDoLoaiHinhDaoTao_HocSinh() {
            await this.customGetDataBieuDoHocSinh(
                Api.bieuDoHocSinh.bieuDoLoaiHinhDaoTao,
                'dataBieuDoLoaiHinhDaoTao_HocSinh',
                'bieudoCot'
            )
        },
        async getDataBieuDoKhuVuc_HocSinh() {
            await this.customGetDataBieuDoHocSinh(
                Api.bieuDoHocSinh.bieuDoKhuVuc,
                'dataBieuDoKhuVuc_HocSinh',
                'bieudoCot'
            )
        },

        handleESelectChange(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitEducation':
                    this.selectedValue.selectedValueUnitEducation =
                        selectedOptions
                    this.resetESelectSchool = true
                    this.selectedValue.selectedValueSchool = []
                    this.getDataChonTruonghoc()
                    break
                case 'ESelectGradeLevel_MockData':
                    this.selectedValue.selectedValueGradeLevel = selectedOptions
                    this.resetESelectSchool = true
                    this.selectedValue.selectedValueSchool = []
                    this.getDataChonTruonghoc()
                    break
                case 'ESelectSchool':
                    this.selectedValue.selectedValueSchool = selectedOptions
                    break
                case 'ESelectSchoolYear_MockData':
                    this.selectedValue.selectedValueSchoolYear = selectedOptions
                    break
            }
        },

        handleThongKe() {
            try {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading ...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const maDonVis_Update = this.customValueSelectedThongKeTangGiam(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )
                const capHocs_Update = this.customValueSelectedThongKeTangGiam(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const maTruongs_Update = this.customValueSelectedThongKeTangGiam(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )
                const currentYear = new Date().getFullYear() - 2
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear

                const requestData_ThongKeTangGiam_Update = {
                    ...this.requestData_ThongKeTangGiam,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update || currentYear
                }

                this.requestData_ThongKeTangGiam =
                    requestData_ThongKeTangGiam_Update

                const requestData_BieuDoHocSinh_Update = {
                    ...this.requestData_BieuDoHocSinh,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoHocSinh = requestData_BieuDoHocSinh_Update
                const requesData_BieuDoPhoDiem_Update = {
                    ...this.requesData_BieuDoPhoDiem,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,

                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requesData_BieuDoPhoDiem = requesData_BieuDoPhoDiem_Update
                this.getDataCount_HocSinh()
                this.getDataCount_HocSinhLenLop()
                this.getDataBieuDoTongQuan_HocSinh()
                this.getDataBieuDoTrangThai_HocSinh()
                this.getDataBieuDoGioiTinh_HocSinh()
                this.getDataBieuDoLoaiHinhDaoTao_HocSinh()
                this.getDataBieuDoKhuVuc_HocSinh()
                this.getDataBieuDoPhoDiemHocKyI_PhoDiem()
                this.getDataBieuDoPhoDiemHocKyII_PhoDiem()
                this.getDataBieuDoDanhGiaHocSinh_HocLuc()
                setTimeout(() => {
                    loading.close()
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        },

        // hàm dùng chung cho ThongKeTangGiam
        customValueSelectedThongKeTangGiam(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
                case 'selectedValueSchool':
                    return options.map((option) => option.value)
                case 'selectedValueGradeLevel':
                    return options
                        .map((option) => option.value)
                        .join('')
                        .toString()
                        .split('')
                        .map(Number)
            }
        },

        async customGetDataBieuDoHocSinh(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requestData_BieuDoHocSinh = {
                ...this.requestData_BieuDoHocSinh,
                maSo: this.authUser.province,
                namHoc:
                    this.selectedValue.selectedValueSchoolYear || currentYear - 1
            }
            const response = await sendRequest(
                apiEndpoint,
                this.requestData_BieuDoHocSinh,
                this.requestHeaders
            )
            switch (responseKey) {
                case 'bieudoTron':
                    this.getDataBieuDoHocSinh[dataKey] = response.item.listValue
                    break
                case 'bieudoCot':
                    this.getDataBieuDoHocSinh[dataKey] = response.item.listData
                    break
            }

            let tongSoHocSinhDangHoc =
                this.getDataBieuDoHocSinh.dataBieuDoTrangThai_HocSinh.reduce(
                    (accumulator, currentValue) =>
                        accumulator + currentValue.data[0],
                    0
                )
            this.dataThongKeTangGiam.dataThongKeCount_HocSinhDangHoc =
                tongSoHocSinhDangHoc
        }
    },
    computed: {
        ...mapState({
            authUser: (state) => state.auth.user
        }),
        ...mapState({
            authToken: (state) => state.auth.token
        }),

        dataChonDonVi_Store() {
            return JSON.parse(localStorage.getItem('data_ChonDonVi'))
        }
    },
    created() {
        // Gán giá trị cho selectedValueUnitEducation ở đây
        this.selectedValue.selectedValueUnitEducation =
            this.dataChonDonVi_Store.map((item) => ({
                title: item.tenDonVi,
                value: item.maDonVi
            }))
    },
    mounted() {
        this.getDataChonTruonghoc()

        // giá trị mặc định của chọn năm học
        const currentYear = new Date().getFullYear()
        this.selectedValue.selectedValueSchoolYear = String(currentYear) - 2
        this.handleThongKe()
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
    padding-left: 6px;
    padding-right: 6px;
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
