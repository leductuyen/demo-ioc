<template>
    <div class="home">
        <CustomTitle :title="'Dashboard Thông tin y tế học sinh'" />
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
                        :title="'Chỉ số BMI bình thường'"
                        :data="dataThongKeTangGiam.dataThongKeChiSoBMI_HocSinh"
                        :content="'học sinh'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Số học sinh biết bơi'"
                        :data="dataThongKeTangGiam.dataThongKeBietBoi_HocSinh"
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
                                THỐNG KÊ Y TẾ HỌC SINH - THEO CHỈ SỐ BMI
                            </div>
                        </div>
                        <div class="card-body">
                            <PieChartCustom
                                :data_PieChart="
                                    getDataBieuDoThongTinYTeHocSinh.dataBieuDoTron_ThongTinYTeHocSinh
                                "
                                :xaxis_categories="xaxisCategories.chiSoBMI"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-7 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ Y TẾ HỌC SINH - THÔNG TIN SỨC KHOẺ
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChartCustom
                                :data_StackedColumnChart="
                                    getDataBieuDoThongTinYTeHocSinh.dataBieuDoCot_ThongTinYTeHocSinh
                                "
                                :xaxis_categories="xaxisCategories.sucKhoe"
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
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'
import PieChartCustom from '@/components/PieChartCustom.vue'
import StackedColumnChartCustom from '@/components/StackedColumnChartCustom.vue'
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
        PieChartCustom,
        StackedColumnChartCustom
        // StackedColumnChart
    },
    data() {
        return {
            xaxisCategories: {
                chiSoBMI: [
                    'Bình thường',
                    'Nhẹ cân',
                    'Thấp còi',
                    'Thừa cân-béo phì',
                    'Gầy còm',
                    'Còi cọc',
                    'Nặng hơn tuổi',
                    'Cao hơn tuổi'
                ],
                sucKhoe: ['Biết bơi', 'Có bệnh về mắt']
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
                type: null,
                namHoc: null
            },

            requestData_BieuDoThongTinYTeHocSinh: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                namHoc: null
            },
            requestData_ThongKeHocSinh: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                namHoc: null
            },
            request_Data_BieuDoYTe: {
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
                dataThongKeChiSoBMI_HocSinh: null,
                dataThongKeBietBoi_HocSinh: null
            },

            getDataBieuDoThongTinYTeHocSinh: {
                dataBieuDoTron_ThongTinYTeHocSinh: [],
                dataBieuDoCot_ThongTinYTeHocSinh: []
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

        async getDataCount_HocSinh() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1

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
        async getDataThongKe_HocSinh() {
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
            const namHoc_Update = this.selectedValue.selectedValueSchoolYear
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            const request_Data = {
                ...this.requestData_ThongKeHocSinh,
                capHocs: capHocs_Update,
                maDonVis: maDonVis_Update,
                maSo: this.authUser.province,
                maTruongs: maTruongs_Update,
                namHoc: namHoc_Update || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.thongKeYTe,
                request_Data,
                this.requestHeaders,
                null
            )
            this.dataThongKeTangGiam.dataThongKeChiSoBMI_HocSinh =
                response.item.bmiBinhThuong
            this.dataThongKeTangGiam.dataThongKeBietBoi_HocSinh =
                response.item.soHsBietBoi
        },

        async getDataBieuDoYTe() {
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
            const namHoc_Update = this.selectedValue.selectedValueSchoolYear
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            const request_Data = {
                ...this.request_Data_BieuDoYTe,
                capHocs: capHocs_Update,
                maDonVis: maDonVis_Update,
                maSo: this.authUser.province,
                maTruongs: maTruongs_Update,
                namHoc: namHoc_Update || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.bieuDoYTe,
                request_Data,
                this.requestHeaders
            )
            if (response.rc == 0) {
                const customDataBieuDoTron = response.item.bieuDoDinhDuong.map(
                    (item) => item.value
                )
                this.getDataBieuDoThongTinYTeHocSinh.dataBieuDoTron_ThongTinYTeHocSinh =
                    customDataBieuDoTron

                const customDataBieuDoCot = response.item.bieuDoSucKhoe.map(
                    (item) => {
                        return {
                            name: item.name,
                            data: item.dataList
                        }
                    }
                )
                this.getDataBieuDoThongTinYTeHocSinh.dataBieuDoCot_ThongTinYTeHocSinh =
                    customDataBieuDoCot

                loading.close()
            }
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
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear
                // Cập nhật các giá trị mới trong requestData_ThongKeTangGiam
                const requestData_ThongKeTangGiam_Update = {
                    ...this.requestData_ThongKeTangGiam,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }

                this.requestData_ThongKeTangGiam =
                    requestData_ThongKeTangGiam_Update

                const requestData_BieuDoThongTinYTeHocSinh = {
                    ...this.requestData_BieuDoThongTinYTeHocSinh,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoThongTinYTeHocSinh =
                    requestData_BieuDoThongTinYTeHocSinh

                const request_Data_BieuDoYTe_Update = {
                    ...this.request_Data_BieuDoYTe,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.request_Data_BieuDoYTe = request_Data_BieuDoYTe_Update
                // Gọi lại hàm getDataThongKeTangGiam cho ba API khác nhau
                this.getDataCount_HocSinh()
                this.getDataThongKe_HocSinh()

                this.getDataBieuDoYTe()

                loading.close()
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
@media (max-width: 768px) {
    .layout-card .col-lg-5 {
        width: 100%;
    }
    .layout-card .col-lg-3 {
        width: 100%;
        margin-bottom: 1rem;
    }
}
/* CSS select dashboard */
</style>
