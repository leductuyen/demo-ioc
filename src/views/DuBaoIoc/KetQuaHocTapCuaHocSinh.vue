<template>
    <div>
        <CustomTitle :title="'Dụ báo Kết quả học tập của học sinh'" />
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
                <div class="col-md-4 col-6">
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

        <div class="layout-card">
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                DỰ BÁO SỐ LƯỢNG HỌC SINH GIỎI THEO LOẠI HÌNH
                                TRƯỜNG
                            </div>
                        </div>
                        <div class="card-body">
                            <DashedLineChart
                                :dulieu="
                                    getDataBieuDo_Kqht.dataBieuDo_LoaiHinhTruong
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">DỰ BÁO KẾT QUẢ HỌC TẬP</div>
                        </div>
                        <div class="card-body">
                            <DashedLineChart
                                :dulieu="getDataBieuDo_Kqht.dataBieuDo_Dubao"
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
import ESelect from '@/components/ESelect.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { mapState } from 'vuex'
import {
    ESelectGradeLevel_MockData,
    mockData_BieuDoDashedLineChart
} from '@/mock_data'
import DashedLineChart from '@/components/DashedLineChart.vue'
import CustomTitle from '@/components/CustomTitle.vue'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    name: 'DuBaoSoLuongGiaoVien',
    components: { CustomButton, ESelect, DashedLineChart, CustomTitle },
    data() {
        return {
            mockData_BieuDoDashedLineChart: mockData_BieuDoDashedLineChart,

            resetESelectSchool: false,
            requestData_BieuDo: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                type: null
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
            getDataBieuDo_Kqht: {
                dataBieuDo_LoaiHinhTruong: {},
                dataBieuDo_Dubao: {}
            }
        }
    },
    methods: {
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        async getDataESelectSchool() {
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

        async getDataBieuDo() {
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
            this.requestHeaders = {
                token: this.authToken
            }
            const request_Data = {
                ...this.requestData_BieuDo,
                capHocs: capHocs,
                maDonVis: maDonVis,
                maSo: null,
                maTruongs: maTruongs,
                type: null
            }
            const response = await sendRequest(
                Api.ioc.duBao.ketQuaHocTap,
                request_Data,
                this.requestHeaders
            )
            if (response.rc == 0) {
                this.getDataBieuDo_Kqht.dataBieuDo_LoaiHinhTruong = {
                    series: response.item.loaiHinhTruongSeries,
                    categories: response.item.namHocs.map(String)
                }
                this.getDataBieuDo_Kqht.dataBieuDo_Dubao = {
                    series: response.item.hocLucSeries,

                    categories: response.item.namHocs.map(String)
                }

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
                    this.getDataESelectSchool()
                    break
                case 'ESelectGradeLevel_MockData':
                    this.selectedValue.selectedValueGradeLevel = selectedOptions
                    this.resetESelectSchool = true
                    this.selectedValue.selectedValueSchool = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectSchool':
                    this.selectedValue.selectedValueSchool = selectedOptions
                    break
                case 'ESelectSchoolYear_MockData':
                    this.selectedValue.selectedValueSchoolYear = selectedOptions
                    break
            }
        },
        async handleThongKe() {
            try {
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

                const requesData_BieuDo_Update = {
                    ...this.requestData_BieuDo,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDo = requesData_BieuDo_Update
                await this.getDataBieuDo()
            } catch (error) {
                console.log(error)
            }
        },
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
    mounted() {
        this.getDataESelectSchool()
        this.getDataBieuDo()
    }
}
</script>
<style scoped>
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
</style>
