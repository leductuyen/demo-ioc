<template>
    <div class="home">
        <CustomTitle :title="'Dashboard Cán bộ giáo viên'" />
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

        <!-- ************ Cán bộ-Giáo viên-Nhân viên ************ -->
        <EducatorProfile
            :dataBieuDoTongQuan_CBGVNV="
                getDataBieuDoCanBoGiaoVienNhanVien.dataBieuDoTongQuan_CBGVNV
            "
            :dataBieuDoTrinhDoChinh_CBGVNV="
                getDataBieuDoCanBoGiaoVienNhanVien.dataBieuDoTrinhDoChinh_CBGVNV
            "
            :dataBieuDoGioiTinh_CBGVNV="
                getDataBieuDoCanBoGiaoVienNhanVien.dataBieuDoGioiTinh_CBGVNV
            "
            :dataBieuDoLoaiHopDong_CBGVNV="
                getDataBieuDoCanBoGiaoVienNhanVien.dataBieuDoLoaiHopDong_CBGVNV
            "
            :dataBieuDoDoTuoi_CBGVNV="
                getDataBieuDoPhanLoaiCanBo.dataBieuDoDoTuoi_CBGVNV
            "
            :dataBieuDoTrangThai_CBGVNV="
                getDataBieuDoPhanLoaiCanBo.dataBieuDoTrangThai_CBGVNV
            "
        />
    </div>
</template>
<script>
import CustomButton from '@/components/CustomButton.vue'
import CustomTitle from '@/components/CustomTitle.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import { mapState } from 'vuex'
import ChangeTrackerItem from '@/components/ChangeTrackerItem.vue'
import EducatorProfile from '../EducatorProfile.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'

import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'DashBoard',
    components: {
        CustomButton,
        EducatorProfile,
        ESelect,
        ESelectYear,
        ChangeTrackerItem,
        ChangeTrackerItemCountTitle,
        CustomTitle
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

            requestData_BieuDoCanBoGiaoVienNhanVien: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
                namHoc: null
            },
            requesData_BieuDoPhanLoaiCanBo: {
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

            getDataBieuDoCanBoGiaoVienNhanVien: {
                dataBieuDoTongQuan_CBGVNV: [],
                dataBieuDoTrinhDoChinh_CBGVNV: [],
                dataBieuDoGioiTinh_CBGVNV: [],
                dataBieuDoLoaiHopDong_CBGVNV: []
            },
            getDataBieuDoPhanLoaiCanBo: {
                dataBieuDoDoTuoi_CBGVNV: [],

                dataBieuDoTrangThai_CBGVNV: []
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
        async customGetDataPhanLoaiCanBo(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requesData_BieuDoPhanLoaiCanBo = {
                ...this.requesData_BieuDoPhanLoaiCanBo,
                maSo: this.authUser.province,
                namHoc:
                    this.selectedValue.selectedValueSchoolYear || currentYear - 1
            }
            const response = await sendRequest(
                apiEndpoint,
                this.requesData_BieuDoPhanLoaiCanBo,
                this.requestHeaders
            )

            switch (responseKey) {
                case 'bieudoTron':
                    this.getDataBieuDoPhanLoaiCanBo[dataKey] =
                        response.item.listValue
                    break
                case 'bieudoCot':
                    this.getDataBieuDoPhanLoaiCanBo[dataKey] =
                        response.item.listData
                    break
            }
        },
        async getDataBieuDoTongQuan_CBGVNV() {
            await this.customGetDataCanBoGiaoVienNhanVien(
                Api.bieuDoCanBoGiaoVienNhanVien.bieuDoTongQuan,
                'dataBieuDoTongQuan_CBGVNV',
                'bieudoTron'
            )
        },
        async getDataBieuDoTrinhDoChinh_CBGVNV() {
            await this.customGetDataCanBoGiaoVienNhanVien(
                Api.bieuDoCanBoGiaoVienNhanVien.bieuDoTrinhDoChinh,
                'dataBieuDoTrinhDoChinh_CBGVNV',
                'bieudoCot'
            )
        },
        async getDataBieuDoGioiTinh_CBGVNV() {
            await this.customGetDataCanBoGiaoVienNhanVien(
                Api.bieuDoCanBoGiaoVienNhanVien.bieuDoGioiTinh,
                'dataBieuDoGioiTinh_CBGVNV',
                'bieudoCot'
            )
        },
        async getDataBieuDoLoaiHopDong_CBGVNV() {
            await this.customGetDataCanBoGiaoVienNhanVien(
                Api.bieuDoCanBoGiaoVienNhanVien.bieuDoLoaiHopDong,
                'dataBieuDoLoaiHopDong_CBGVNV',
                'bieudoCot'
            )
        },

        async getDataBieuDoDoTuoi_CBGVNV() {
            await this.customGetDataPhanLoaiCanBo(
                Api.bieuDoPhanLoaiCanBo.bieuDoDoTuoi,
                'dataBieuDoDoTuoi_CBGVNV',
                'bieudoCot'
            )
        },

        async getDataBieuDoTrangThai_CBGVNV() {
            await this.customGetDataPhanLoaiCanBo(
                Api.bieuDoPhanLoaiCanBo.bieuDoTrangThai,
                'dataBieuDoTrangThai_CBGVNV',
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

                const requestData_BieuDoCanBoGiaoVienNhanVien_Update = {
                    ...this.requestData_BieuDoCanBoGiaoVienNhanVien,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoCanBoGiaoVienNhanVien =
                    requestData_BieuDoCanBoGiaoVienNhanVien_Update

                // Gọi lại hàm getDataThongKeTangGiam cho ba API khác nhau
                await this.getDataThongKeTangGiam(3, 'dataThongKeTruongHoc')
                await this.getDataThongKeTangGiam(2, 'dataThongKeGiaoVien')
                await this.getDataThongKeTangGiam(1, 'dataThongKeHocSinh')

                await this.getDataBieuDoTongQuan_CBGVNV()
                await this.getDataBieuDoTrinhDoChinh_CBGVNV()
                await this.getDataBieuDoGioiTinh_CBGVNV()
                await this.getDataBieuDoLoaiHopDong_CBGVNV()

                await this.getDataBieuDoDoTuoi_CBGVNV()

                await this.getDataBieuDoTrangThai_CBGVNV()

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

        async customGetDataCanBoGiaoVienNhanVien(
            apiEndpoint,
            dataKey,
            responseKey
        ) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requestData_BieuDoCanBoGiaoVienNhanVien = {
                ...this.requestData_BieuDoCanBoGiaoVienNhanVien,
                maSo: this.authUser.province,
                namHoc:
                    this.selectedValue.selectedValueSchoolYear || currentYear - 1
            }
            const response = await sendRequest(
                apiEndpoint,
                this.requestData_BieuDoCanBoGiaoVienNhanVien,
                this.requestHeaders
            )
            switch (responseKey) {
                case 'bieudoTron':
                    this.getDataBieuDoCanBoGiaoVienNhanVien[dataKey] =
                        response.item.listValue
                    break
                case 'bieudoCot':
                    this.getDataBieuDoCanBoGiaoVienNhanVien[dataKey] =
                        response.item.listData
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

        this.getDataBieuDoTongQuan_CBGVNV()
        this.getDataBieuDoTrinhDoChinh_CBGVNV()
        this.getDataBieuDoGioiTinh_CBGVNV()
        this.getDataBieuDoLoaiHopDong_CBGVNV()

        this.getDataBieuDoDoTuoi_CBGVNV()

        this.getDataBieuDoTrangThai_CBGVNV()

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
