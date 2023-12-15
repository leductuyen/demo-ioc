<template>
    <div class="home">
        <CustomTitle :title="'Dashboard Trường học'" />
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
                        :title="'Trường học'"
                        :data="dataThongKeTangGiam.dataThongKeTruongHoc"
                        :content="'Trường'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Số trường đạt chất lượng chuẩn mức 1'"
                        :data="dataThongKeTangGiam.dataSoTruongDatChuanMuc1"
                        :content="'Trường'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Số trường đạt chất lượng chuẩn mức 2'"
                        :data="dataThongKeTangGiam.dataSoTruongDatChuanMuc2"
                        :content="'Trường'"
                    />
                </div>
            </div>
        </div>

        <!-- ************ Trường học ************ -->

        <School
            :dataBieuDoTongQuan_TruongHoc="
                getDataBieuDoTruongHoc.dataBieuDoTongQuan_TruongHoc
            "
            :dataBieuDoChatLuongDaoTao_TruongHoc="
                getDataBieuDoTruongHoc.dataBieuDoChatLuongDaoTao_TruongHoc
            "
            :dataBieuDoLoaiHinhDaoTao_TruongHoc="
                getDataBieuDoTruongHoc.dataBieuDoLoaiHinhDaoTao_TruongHoc
            "
            :dataBieuDoDashboard_LopHoc="
                getDataBieuDoTruongHoc.dataBieuDoDashboard_LopHoc
            "
            :is-loading="isLoading"
        />
    </div>
</template>
<script>
import CustomTitle from '@/components/CustomTitle.vue'
import CustomButton from '@/components/CustomButton.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import { mapState } from 'vuex'
import CustomStatistic from '@/components/CustomStatistic.vue'
import School from '../School.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'

import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'TruongHoc',
    components: {
        CustomButton,
        CustomTitle,
        ESelect,
        ESelectYear,
        ChangeTrackerItemCountTitle,
        School,
        CustomStatistic
    },
    data() {
        return {
            isLoading: true,
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
            requestData_BieuDoTruongHoc: {
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
                dataThongKeTruongHoc: null,
                dataSoTruongDatChuanMuc1: null,
                dataSoTruongDatChuanMuc2: null
            },
            getDataBieuDoTruongHoc: {
                dataBieuDoTongQuan_TruongHoc: [],
                dataBieuDoChatLuongDaoTao_TruongHoc: [],
                dataBieuDoLoaiHinhDaoTao_TruongHoc: [],
                dataBieuDoDashboard_LopHoc: []
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
        },

        async getDataBieuDoTongQuan_TrongHoc() {
            await this.customGetDataBieuDoTruongHoc(
                Api.bieuDoTruongHoc.bieuDoTongQuan,
                'dataBieuDoTongQuan_TruongHoc',
                'bieudoTron'
            )
        },

        async getDataBieuDoChatLuongDaoTao_TruongHoc() {
            await this.customGetDataBieuDoTruongHoc(
                Api.bieuDoTruongHoc.bieuDoChatLuongDaoTao,
                'dataBieuDoChatLuongDaoTao_TruongHoc',
                'bieudoCot'
            )
        },
        async getDataBieuDoLoaiHinhDaoTao_TruongHoc() {
            await this.customGetDataBieuDoTruongHoc(
                Api.bieuDoTruongHoc.bietDoLoaiHinhDaoTao,
                'dataBieuDoLoaiHinhDaoTao_TruongHoc',
                'bieudoCot'
            )
        },
        async getDataBieuDoDashboardLopHoc() {
            const maDonVis_Update = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueUnitEducation,
                'selectedValueUnitEducation'
            )
            const capHocs_Update = this.customValueSelectedThongKeTangGiam(
                this.selectedValue.selectedValueGradeLevel,
                'selectedValueGradeLevel'
            )
            const currentYear = new Date().getFullYear() - 1
            const request_Data = {
                capHoc: capHocs_Update,
                maDonVi: maDonVis_Update,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }

            this.requestHeaders = {
                token: this.authToken
            }
            const response = await sendRequest(
                Api.bieuDoTruongHoc.bieuDoDashboardLopHoc,
                request_Data,
                this.requestHeaders,
                null
            )
            this.getDataBieuDoTruongHoc.dataBieuDoDashboard_LopHoc =
                response.item.toanTruong
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
                const currentYear = new Date().getFullYear() - 1
                // Cập nhật các giá trị mới trong requestData_ThongKeTangGiam
                const requestData_ThongKeTangGiam_Update = {
                    ...this.requestData_ThongKeTangGiam,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update || currentYear
                }

                this.requestData_ThongKeTangGiam =
                    requestData_ThongKeTangGiam_Update

                // xử lý việc khi click thì sẽ lấy lại dữ liệu cho BieuDoTongQuan, BieuDoChatLuongDaoTao, BieuDoLoaiHinhDaoTao
                const requestData_BieuDoTruongHoc_Update = {
                    ...this.requestData_BieuDoTruongHoc,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }

                this.requestData_BieuDoTruongHoc =
                    requestData_BieuDoTruongHoc_Update

                // Gọi lại hàm getDataThongKeTangGiam cho ba API khác nhau
                // await this.getDataCount_TruongHoc()
                this.getDataBieuDoTongQuan_TrongHoc()
                this.getDataBieuDoChatLuongDaoTao_TruongHoc()
                this.getDataBieuDoLoaiHinhDaoTao_TruongHoc()
                this.getDataBieuDoDashboardLopHoc()

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
        },

        async customGetDataBieuDoTruongHoc(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }

            const currentYear = new Date().getFullYear() - 1
            this.requestData_BieuDoTruongHoc = {
                ...this.requestData_BieuDoTruongHoc,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }

            const response = await sendRequest(
                apiEndpoint,
                this.requestData_BieuDoTruongHoc,
                this.requestHeaders
            )
            switch (responseKey) {
                case 'bieudoTron':
                    this.getDataBieuDoTruongHoc[dataKey] = response.item.listValue
                    break
                case 'bieudoCot':
                    this.getDataBieuDoTruongHoc[dataKey] = response.item.listData
                    break
            }

            let tongSoTruongHoc =
                this.getDataBieuDoTruongHoc.dataBieuDoTongQuan_TruongHoc.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                )
            this.dataThongKeTangGiam.dataThongKeTruongHoc = tongSoTruongHoc

            let soTruongDatChuanMuc =
                this.getDataBieuDoTruongHoc.dataBieuDoChatLuongDaoTao_TruongHoc

            let sum2 = 0
            let sum3 = 0

            for (let i = 0; i < soTruongDatChuanMuc.length; i++) {
                sum2 += soTruongDatChuanMuc[i].data[1] // Tổng phần tử thứ hai
                sum3 += soTruongDatChuanMuc[i].data[2] // Tổng phần tử thứ ba
            }

            this.dataThongKeTangGiam.dataSoTruongDatChuanMuc1 = sum2
            this.dataThongKeTangGiam.dataSoTruongDatChuanMuc2 = sum3
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

        // this.getDataCount_TruongHoc()

        // giá trị mặc định của chọn năm học
        const currentYear = new Date().getFullYear() - 1
        this.selectedValue.selectedValueSchoolYear = String(currentYear)
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

/* CSS select dashboard */
</style>
