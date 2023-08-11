<template>
    <div class="home">
        <CustomTitle :title="'Dashboard Thông tin điểm danh'" />
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
                        :data="dataThongKeTangGiam.dataThongKe_TongSoHS"
                        :content="'học sinh'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Tổng số học sinh điểm danh'"
                        :data="dataThongKeTangGiam.dataThongKe_TongSoHS_DiemDanh"
                        :data2="dataThongKeTangGiam.dataThongKe_TongSoHS"
                        :content="'học sinh'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Nghỉ học có phép'"
                        :data="
                            dataThongKeTangGiam.dataThongKe_TongSoHS_NghiCoPhep
                        "
                        :data2="dataThongKeTangGiam.dataThongKe_TongSoHS_TongNghi"
                        :content="'học sinh'"
                    />
                </div>
            </div>
        </div>
        <div class="layout-card">
            <div class="row">
                <div class="col-5 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ ĐIỂM DANH - ĐIỂM DANH TRONG NGÀY
                            </div>
                        </div>
                        <div class="card-body">
                            <PieChartCustom
                                :data_PieChart="
                                    getDataBieuDoThongTinDiemDanh.dataBieuDoTron_ThongDiemDanh
                                "
                                :xaxis_categories="
                                    xaxisCategories.diemDanhTrongNgay
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-7 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ ĐIỂM DANH - SỐ LƯỢNG HỌC SINH NGHỈ HỌC
                                THEO THÁNG
                            </div>
                        </div>
                        <div class="card-body">
                            <LineChartCustom
                                :data_LineChart="
                                    getDataBieuDoThongTinDiemDanh.dataBieuDoDuong_ThongTinDiemDanh
                                "
                                :xaxis_categories="
                                    xaxisCategories.xaxis_categories_BieuDoDuong
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
import CustomButton from '@/components/CustomButton.vue'
import CustomTitle from '@/components/CustomTitle.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import { mapState } from 'vuex'
import CustomStatistic from '@/components/CustomStatistic.vue'
import LineChartCustom from '@/components/LineChartCustom.vue'
import PieChartCustom from '@/components/PieChartCustom.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'

import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'DashBoard',
    components: {
        CustomButton,
        ESelect,
        ESelectYear,
        CustomStatistic,
        ChangeTrackerItemCountTitle,
        CustomTitle,
        LineChartCustom,
        PieChartCustom
    },
    data() {
        return {
            xaxisCategories: {
                diemDanhTrongNgay: ['Nghỉ học', 'Đi học'],
                xaxis_categories_BieuDoDuong: []
            },
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
                namHoc: null
            },

            requestData_BieuDoThongTinDiemDanh: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                namHoc: null
            },
            requesData_BieuDoPhoDiem: {
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
                dataThongKe_TongSoHS: null,
                dataThongKe_TongSoHS_DiemDanh: null,
                dataThongKe_TongSoHS_NghiCoPhep: null,
                dataThongKe_TongSoHS_TongNghi: null
            },

            getDataBieuDoThongTinDiemDanh: {
                dataBieuDoTron_ThongDiemDanh: [],
                dataBieuDoDuong_ThongTinDiemDanh: []
            }
        }
    },

    methods: {
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        //callAPi

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
            this.getDataESelect.ESelectSchool = response.rows.map((item) => ({
                ...item,
                tenTruongHoc: `${item.tenTruongHoc} - [${item.maTruongHoc}]`
            }))
            // store.commit('SET_DATA_CHONTRUONGHOC_STORE', response.rows)
        },

        async getDataThongKeTangGiam() {
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
            const currentYear = new Date().getFullYear() - 1
            const request_Header = {
                token: this.authToken
            }
            const request_Data = {
                ...this.requestData_ThongKeTangGiam,
                capHocs: capHocs,
                maDonVis: maDonVis,
                maSo: null,
                maTruongs: maTruongs,
                namHoc: namHocs || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.thongTinDiemDanh,
                request_Data,
                request_Header
            )
            if (response.rc == 0) {
                const tongSoHocSinh = response.item.tongHocSinh
                this.dataThongKeTangGiam.dataThongKe_TongSoHS = tongSoHocSinh

                const hocSinhNghiHoc = response.item.tongNghi
                const tongSoHocSinhDiemDanh = tongSoHocSinh - hocSinhNghiHoc
                this.dataThongKeTangGiam.dataThongKe_TongSoHS_DiemDanh =
                    tongSoHocSinhDiemDanh

                this.dataThongKeTangGiam.dataThongKe_TongSoHS_NghiCoPhep =
                    response.item.nghiCoPhep
                this.dataThongKeTangGiam.dataThongKe_TongSoHS_TongNghi =
                    response.item.tongNghi

                this.getDataBieuDoThongTinDiemDanh.dataBieuDoTron_ThongDiemDanh =
                    response.item.bieuDo
            } else {
                alert('Lỗi')
            }
        },
        async getDataBieuDoDuong_DiemDanh() {
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
            const currentYear = new Date().getFullYear() - 1
            const request_Header = {
                token: this.authToken
            }
            const request_Data = {
                ...this.requestData_ThongKeTangGiam,
                capHocs: capHocs,
                maDonVis: maDonVis,
                maSo: null,
                maTruongs: maTruongs,
                namHoc: namHocs || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.bieuDoDiemDanh,
                request_Data,
                request_Header
            )
            this.getDataBieuDoThongTinDiemDanh.dataBieuDoDuong_ThongTinDiemDanh =
                response.item.listData
            this.xaxisCategories.xaxis_categories_BieuDoDuong =
                response.item.dsThang
            console.log(this.xaxisCategories.xaxis_categories_BieuDoDuong)
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
                const currentYear = new Date().getFullYear() - 1
                const request_ThongKeTangGiam_Update = {
                    capHocs: capHocs,
                    maDonVis: maDonVis,
                    maSo: null,
                    maTruongs: maTruongs,
                    namHoc: namHocs || currentYear
                }
                this.requestData_ThongKeTangGiam = request_ThongKeTangGiam_Update
                this.getDataThongKeTangGiam()
                this.getDataBieuDoDuong_DiemDanh()
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

    mounted() {
        this.getDataChonTruonghoc()

        // giá trị mặc định của chọn năm học
        const currentYear = new Date().getFullYear()
        this.selectedValue.selectedValueSchoolYear = String(currentYear) - 1
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
