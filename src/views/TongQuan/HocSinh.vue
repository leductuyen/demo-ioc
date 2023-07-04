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
                    <ChangeTrackerItem
                        :title="'Trường học'"
                        :data="dataThongKeTangGiam.dataThongKeTruongHoc.amount"
                        :status="dataThongKeTangGiam.dataThongKeTruongHoc.status"
                        :percent="
                            dataThongKeTangGiam.dataThongKeTruongHoc.percent
                        "
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <ChangeTrackerItem
                        :title="'Giáo viên'"
                        :data="dataThongKeTangGiam.dataThongKeGiaoVien.amount"
                        :status="dataThongKeTangGiam.dataThongKeGiaoVien.status"
                        :percent="dataThongKeTangGiam.dataThongKeGiaoVien.percent"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <ChangeTrackerItem
                        :title="'Giáo viên'"
                        :data="dataThongKeTangGiam.dataThongKeHocSinh.amount"
                        :status="dataThongKeTangGiam.dataThongKeHocSinh.status"
                        :percent="dataThongKeTangGiam.dataThongKeHocSinh.percent"
                    />
                </div>
            </div>
        </div>

        <!-- ************ Trường học ************ -->

        <!-- ************ Học sinh ************ -->
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
        />
    </div>
</template>
<script>
import CustomTitle from '@/components/CustomTitle.vue'
import CustomButton from '@/components/CustomButton.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import { mapState } from 'vuex'
import ChangeTrackerItem from '@/components/ChangeTrackerItem.vue'
import Student from '../Student.vue'

import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
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
        ChangeTrackerItem,
        ChangeTrackerItemCountTitle
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
                dataThongKeTruongHoc: {},
                dataThongKeGiaoVien: {},
                dataThongKeHocSinh: {}
            },

            getDataBieuDoHocSinh: {
                dataBieuDoTongQuan_HocSinh: [],
                dataBieuDoTrangThai_HocSinh: [],
                dataBieuDoGioiTinh_HocSinh: [],
                dataBieuDoLoaiHinhDaoTao_HocSinh: [],
                dataBieuDoKhuVuc_HocSinh: []
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
            this.getDataESelect.ESelectSchool = response.rows
            // store.commit('SET_DATA_CHONTRUONGHOC_STORE', response.rows)
        },

        async getDataThongKeTangGiam(type, dataKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()

            this.requestData_ThongKeTangGiam = {
                ...this.requestData_ThongKeTangGiam,
                maSo: this.authUser.province,
                type: type,
                namHoc:
                    this.selectedValue.selectedValueSchoolYear || currentYear - 1
            }
            const response = await sendRequest(
                Api.thongKeTangGiam,
                this.requestData_ThongKeTangGiam,
                this.requestHeaders
            )
            this.dataThongKeTangGiam[dataKey] = response.item
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

        async handleThongKe() {
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

                // xử lý việc khi click thì sẽ lấy lại dữ liệu cho BieuDoTongQuan, BieuDoChatLuongDaoTao, BieuDoLoaiHinhDaoTao

                const requestData_BieuDoHocSinh_Update = {
                    ...this.requestData_BieuDoHocSinh,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoHocSinh = requestData_BieuDoHocSinh_Update

                // Gọi lại hàm getDataThongKeTangGiam cho ba API khác nhau
                await this.getDataThongKeTangGiam(3, 'dataThongKeTruongHoc')
                await this.getDataThongKeTangGiam(2, 'dataThongKeGiaoVien')
                await this.getDataThongKeTangGiam(1, 'dataThongKeHocSinh')

                await this.getDataBieuDoTongQuan_HocSinh()
                await this.getDataBieuDoTrangThai_HocSinh()
                await this.getDataBieuDoGioiTinh_HocSinh()
                await this.getDataBieuDoLoaiHinhDaoTao_HocSinh()
                await this.getDataBieuDoKhuVuc_HocSinh()

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
        this.getDataChonTruonghoc()

        this.getDataThongKeTangGiam(3, 'dataThongKeTruongHoc')
        this.getDataThongKeTangGiam(2, 'dataThongKeGiaoVien')
        this.getDataThongKeTangGiam(1, 'dataThongKeHocSinh')

        this.getDataBieuDoTongQuan_HocSinh()
        this.getDataBieuDoTrangThai_HocSinh()
        this.getDataBieuDoGioiTinh_HocSinh()
        this.getDataBieuDoLoaiHinhDaoTao_HocSinh()
        this.getDataBieuDoKhuVuc_HocSinh()

        // giá trị mặc định của chọn năm học
        const currentYear = new Date().getFullYear()
        this.selectedValue.selectedValueSchoolYear = String(currentYear) - 1
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
