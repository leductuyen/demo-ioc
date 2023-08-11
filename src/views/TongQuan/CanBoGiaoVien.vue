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
                    <CustomStatistic
                        :title="'Tổng số giáo viên'"
                        :data="dataThongKeTangGiam.dataCount_CanBoGiaoVien"
                        :content="'cán bộ-giáo viên'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Số lượng CBGV đang làm việc'"
                        :data="
                            dataThongKeTangGiam.dataCount_DangLamViec_CanBoGiaoVien
                        "
                        :content="'cán bộ-giáo viên'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Số lượng CBGV trình độ đại học'"
                        :data="
                            dataThongKeTangGiam.dataCount_TrinhDoDaiHoc_CanBoGiaoVien
                        "
                        :content="'cán bộ-giáo viên'"
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
import EducatorProfile from '../EducatorProfile.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'
import CustomStatistic from '@/components/CustomStatistic.vue'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'DashBoard',
    components: {
        CustomButton,
        EducatorProfile,
        ESelect,
        ESelectYear,
        ChangeTrackerItemCountTitle,
        CustomTitle,
        CustomStatistic
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
                dataCount_CanBoGiaoVien: null,
                dataCount_DangLamViec_CanBoGiaoVien: null,
                dataCount_TrinhDoDaiHoc_CanBoGiaoVien: null
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
            this.getDataESelect.ESelectSchool = response.rows.map((item) => ({
                ...item,
                tenTruongHoc: `${item.tenTruongHoc} - [${item.maTruongHoc}]`
            }))
            // store.commit('SET_DATA_CHONTRUONGHOC_STORE', response.rows)
        },

        async getDataCount_CanBoGiaoVien() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1

            this.requestData_ThongKeTangGiam = {
                ...this.requestData_ThongKeTangGiam,
                maSo: this.authUser.province,
                type: 2,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.thongKeTangGiam,
                this.requestData_ThongKeTangGiam,
                this.requestHeaders
            )
            this.dataThongKeTangGiam.dataCount_CanBoGiaoVien =
                response.item.currentAmount
        },
        async customGetDataPhanLoaiCanBo(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            const request_Data = {
                ...this.requesData_BieuDoPhanLoaiCanBo,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                apiEndpoint,
                request_Data,
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

            let soLuongCBGVDangLamViec =
                this.getDataBieuDoPhanLoaiCanBo.dataBieuDoTrangThai_CBGVNV
            let sum_soLuongCBGVDangLamViec = soLuongCBGVDangLamViec.reduce(
                (accumulator, currentValue) => accumulator + currentValue.data[0],
                0
            )

            this.dataThongKeTangGiam.dataCount_DangLamViec_CanBoGiaoVien =
                sum_soLuongCBGVDangLamViec
        },
        async customGetDataCanBoGiaoVienNhanVien(
            apiEndpoint,
            dataKey,
            responseKey
        ) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            this.requestData_BieuDoCanBoGiaoVienNhanVien = {
                ...this.requestData_BieuDoCanBoGiaoVienNhanVien,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
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
            let soLuongCBGVTrinhDoDaiHoc =
                this.getDataBieuDoCanBoGiaoVienNhanVien
                    .dataBieuDoTrinhDoChinh_CBGVNV

            let sum_soLuongCBGVTrinhDoDaiHoc = soLuongCBGVTrinhDoDaiHoc.reduce(
                (accumulator, currentValue) => accumulator + currentValue.data[2],
                0
            )
            this.dataThongKeTangGiam.dataCount_TrinhDoDaiHoc_CanBoGiaoVien =
                sum_soLuongCBGVTrinhDoDaiHoc
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

                const requestData_BieuDoCanBoGiaoVienNhanVien_Update = {
                    ...this.requestData_BieuDoCanBoGiaoVienNhanVien,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update || currentYear
                }
                this.requestData_BieuDoCanBoGiaoVienNhanVien =
                    requestData_BieuDoCanBoGiaoVienNhanVien_Update

                const requesData_BieuDoPhanLoaiCanBo_Update = {
                    ...this.requesData_BieuDoPhanLoaiCanBo,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update || currentYear
                }
                this.requesData_BieuDoPhanLoaiCanBo =
                    requesData_BieuDoPhanLoaiCanBo_Update
                this.getDataCount_CanBoGiaoVien()
                this.getDataBieuDoTongQuan_CBGVNV()
                this.getDataBieuDoTrangThai_CBGVNV()
                this.getDataBieuDoTrinhDoChinh_CBGVNV()
                this.getDataBieuDoDoTuoi_CBGVNV()
                this.getDataBieuDoGioiTinh_CBGVNV()
                this.getDataBieuDoLoaiHopDong_CBGVNV()

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
.card-main {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
}

/* CSS select dashboard */
</style>
