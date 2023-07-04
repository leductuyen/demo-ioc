<template>
    <div class="home">
        <div class="select-dashboard">
            <div class="row">
                <div class="col-md-4 col-12">
                    <ESelect
                        style="width: 100%"
                        no-match-text="Không tìm thấy bản ghi nào"
                        no-data-text="danh sách lựa chọn trống"
                        :clearable="true"
                        :disabled="false"
                        :data="getDataESelect.ESelectUnitEducation"
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
        />

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
        />

        <!-- ************ Phân loại cán bộ ************ -->
        <TeacherClassification
            :dataBieuDoTongQuan_PhanLoaiCanBo="
                getDataBieuDoPhanLoaiCanBo.dataBieuDoTongQuan_PhanLoaiCanBo
            "
            :dataBieuDoDoTuoi_PhanLoaiCanBo="
                getDataBieuDoPhanLoaiCanBo.dataBieuDoDoTuoi_PhanLoaiCanBo
            "
            :dataBieuDoLoaiHinhDaoTao_PhanLoaiCanBo="
                getDataBieuDoPhanLoaiCanBo.dataBieuDoLoaiHinhDaoTao_PhanLoaiCanBo
            "
            :dataBieuDoTrangThai_PhanLoaiCanBo="
                getDataBieuDoPhanLoaiCanBo.dataBieuDoTrangThai_PhanLoaiCanBo
            "
        />

        <!-- ************ Phổ điểm ************ -->
        <GradeScale
            :dataBieuDoPhoDiemHKI_PhoDiem="
                getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKI_PhoDiem
            "
            :dataBieuDoPhoDiemHKII_PhoDiem="
                getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKII_PhoDiem
            "
            :dataBieuDoDanhGiaHocSinhKyI_PhoDiem="
                getDataBieuDoPhoDiem.dataBieuDoDanhGiaHocSinhKyI_PhoDiem
            "
            :dataBieuDoDanhGiaHocSinhKyII_PhoDiem="
                getDataBieuDoPhoDiem.dataBieuDoDanhGiaHocSinhKyII_PhoDiem
            "
            :dataBieuDoDanhGiaHocSinhCaNam_PhoDiem="
                getDataBieuDoPhoDiem.dataBieuDoDanhGiaHocSinhCaNam_PhoDiem
            "
        />
    </div>
</template>
<script>
import store from '@/store'
import CustomButton from '@/components/CustomButton.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import { mapState } from 'vuex'
import ChangeTrackerItem from '@/components/ChangeTrackerItem.vue'
import Student from './Student.vue'
import EducatorProfile from './EducatorProfile.vue'
import School from './School.vue'
import TeacherClassification from './TeacherClassification.vue'
import GradeScale from './GradeScale.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data/index'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'

import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'DashBoard',
    components: {
        CustomButton,
        Student,
        EducatorProfile,
        TeacherClassification,
        GradeScale,
        ESelect,
        ESelectYear,
        ChangeTrackerItem,
        ChangeTrackerItemCountTitle,
        School
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
            requestParams_Select: {
                start: 0,
                limit: 9999,
                maTinhThanh: null,
                check: true
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
            requestData_BieuDoHocSinh: {
                capHocs: [],
                maDonVis: [],
                maSo: null,
                maTruongs: [],
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
                dataThongKeTruongHoc: {},
                dataThongKeGiaoVien: {},
                dataThongKeHocSinh: {}
            },
            getDataBieuDoTruongHoc: {
                dataBieuDoTongQuan_TruongHoc: [],
                dataBieuDoChatLuongDaoTao_TruongHoc: [],
                dataBieuDoLoaiHinhDaoTao_TruongHoc: []
            },
            getDataBieuDoHocSinh: {
                dataBieuDoTongQuan_HocSinh: [],
                dataBieuDoTrangThai_HocSinh: [],
                dataBieuDoGioiTinh_HocSinh: [],
                dataBieuDoLoaiHinhDaoTao_HocSinh: [],
                dataBieuDoKhuVuc_HocSinh: []
            },
            getDataBieuDoCanBoGiaoVienNhanVien: {
                dataBieuDoTongQuan_CBGVNV: [],
                dataBieuDoTrinhDoChinh_CBGVNV: [],
                dataBieuDoGioiTinh_CBGVNV: [],
                dataBieuDoLoaiHopDong_CBGVNV: []
            },
            getDataBieuDoPhanLoaiCanBo: {
                dataBieuDoTongQuan_PhanLoaiCanBo: [],
                dataBieuDoDoTuoi_PhanLoaiCanBo: [],
                dataBieuDoLoaiHinhDaoTao_PhanLoaiCanBo: [],
                dataBieuDoTrangThai_PhanLoaiCanBo: []
            },
            getDataBieuDoPhoDiem: {
                dataBieuDoPhoDiemHKI_PhoDiem: [],
                dataBieuDoPhoDiemHKII_PhoDiem: [],
                dataBieuDoDanhGiaHocSinhKyI_PhoDiem: [],
                dataBieuDoDanhGiaHocSinhKyII_PhoDiem: [],
                dataBieuDoDanhGiaHocSinhCaNam_PhoDiem: []
            }
        }
    },

    methods: {
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        //callAPi

        async getDataChonDonVi() {
            this.requestParams_Select.maTinhThanh = this.authUser.province
            this.requestHeaders = {
                token: this.authToken
            }
            const response = await sendRequest(
                Api.internal_api.dm_DonVi,
                null,
                this.requestHeaders,
                this.requestParams_Select
            )
            this.getDataESelect.ESelectUnitEducation = response.rows
            // store.commit('SET_DATACHONDONVI_STORE', response.rows)
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

        async getDataThongKeTangGiam(type, dataKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()

            this.requestData_ThongKeTangGiam = {
                ...this.requestData_ThongKeTangGiam,
                maSo: this.authUser.province,
                type: type,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.thongKeTangGiam,
                this.requestData_ThongKeTangGiam,
                this.requestHeaders
            )
            this.dataThongKeTangGiam[dataKey] = response.item
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
        async getDataBieuDoTongQuan_PhanLoaiCanBo() {
            await this.customGetDataPhanLoaiCanBo(
                Api.bieuDoPhanLoaiCanBo.bieuDoTongQuan,
                'dataBieuDoTongQuan_PhanLoaiCanBo',
                'bieudoTron'
            )
        },
        async getDataBieuDoDoTuoi_PhanLoaiCanBo() {
            await this.customGetDataPhanLoaiCanBo(
                Api.bieuDoPhanLoaiCanBo.bieuDoDoTuoi,
                'dataBieuDoDoTuoi_PhanLoaiCanBo',
                'bieudoCot'
            )
        },
        async getDataBieuDoLoaiHinhDaoTao_PhanLoaiCanBo() {
            await this.customGetDataPhanLoaiCanBo(
                Api.bieuDoPhanLoaiCanBo.bieuDoLoaiHinhDaoTao,
                'dataBieuDoLoaiHinhDaotao_PhanLoaiCanBo',
                'bieudoCot'
            )
        },
        async getDataBieuDoTrangThai_PhanLoaiCanBo() {
            await this.customGetDataPhanLoaiCanBo(
                Api.bieuDoPhanLoaiCanBo.bieuDoTrangThai,
                'dataBieuDoTrangThai_PhanLoaiCanBo',
                'bieudoCot'
            )
        },
        async getDataBieuDoDanhGiaHocSinh_PhoDiem(type) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requesData_BieuDoPhoDiem = {
                ...this.requesData_BieuDoPhoDiem,
                maSo: this.authUser.province,
                type: type,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.bieuDoPhoDiem.bieuDoDanhGiaHocSinh,
                this.requesData_BieuDoPhoDiem,
                this.requestHeaders
            )

            switch (type) {
                case 1:
                    this.getDataBieuDoPhoDiem.dataBieuDoDanhGiaHocSinhKyI_PhoDiem =
                        response.item.listData
                    break
                case 2:
                    this.getDataBieuDoPhoDiem.dataBieuDoDanhGiaHocSinhKyII_PhoDiem =
                        response.item.listData
                    break
                case 3:
                    this.getDataBieuDoPhoDiem.dataBieuDoDanhGiaHocSinhCaNam_PhoDiem =
                        response.item.listData
                    break
                default:
                    break
            }
        },
        async getDataBieuDoPhoDiemHocKyI_PhoDiem() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
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
                this.requestHeaders
            )
            this.getDataBieuDoPhoDiem.dataBieuDoPhoDiemHKI_PhoDiem =
                response.item.listData
        },
        async getDataBieuDoPhoDiemHocKyII_PhoDiem() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
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
                const requestData_BieuDoTruongHoc_Update = {
                    ...this.requestData_BieuDoTruongHoc,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }

                this.requestData_BieuDoTruongHoc =
                    requestData_BieuDoTruongHoc_Update

                const requestData_BieuDoHocSinh_Update = {
                    ...this.requestData_BieuDoHocSinh,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoHocSinh = requestData_BieuDoHocSinh_Update

                const requestData_BieuDoCanBoGiaoVienNhanVien_Update = {
                    ...this.requestData_BieuDoCanBoGiaoVienNhanVien,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoCanBoGiaoVienNhanVien =
                    requestData_BieuDoCanBoGiaoVienNhanVien_Update

                const requesData_BieuDoPhoDiem_Update = {
                    ...this.requesData_BieuDoPhoDiem,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requesData_BieuDoPhoDiem = requesData_BieuDoPhoDiem_Update

                // Gọi lại hàm getDataThongKeTangGiam cho ba API khác nhau
                await this.getDataThongKeTangGiam(3, 'dataThongKeTruongHoc')
                await this.getDataThongKeTangGiam(2, 'dataThongKeGiaoVien')
                await this.getDataThongKeTangGiam(1, 'dataThongKeHocSinh')

                await this.getDataBieuDoTongQuan_TrongHoc()
                await this.getDataBieuDoChatLuongDaoTao_TruongHoc()
                await this.getDataBieuDoLoaiHinhDaoTao_TruongHoc()

                await this.getDataBieuDoTongQuan_HocSinh()
                await this.getDataBieuDoTrangThai_HocSinh()
                await this.getDataBieuDoGioiTinh_HocSinh()
                await this.getDataBieuDoLoaiHinhDaoTao_HocSinh()
                await this.getDataBieuDoKhuVuc_HocSinh()

                await this.getDataBieuDoTongQuan_CBGVNV()
                await this.getDataBieuDoTrinhDoChinh_CBGVNV()
                await this.getDataBieuDoGioiTinh_CBGVNV()
                await this.getDataBieuDoLoaiHopDong_CBGVNV()

                await this.getDataBieuDoTongQuan_PhanLoaiCanBo()
                await this.getDataBieuDoDoTuoi_PhanLoaiCanBo()
                await this.getDataBieuDoLoaiHinhDaoTao_PhanLoaiCanBo()
                await this.getDataBieuDoTrangThai_PhanLoaiCanBo()

                await this.getDataBieuDoDanhGiaHocSinh_PhoDiem(1)
                await this.getDataBieuDoDanhGiaHocSinh_PhoDiem(2)
                await this.getDataBieuDoDanhGiaHocSinh_PhoDiem(3)
                await this.getDataBieuDoPhoDiemHocKyI_PhoDiem()
                await this.getDataBieuDoPhoDiemHocKyII_PhoDiem()
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

        async customGetDataBieuDoTruongHoc(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }

            const currentYear = new Date().getFullYear()
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
        },
        async customGetDataBieuDoHocSinh(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requestData_BieuDoHocSinh = {
                ...this.requestData_BieuDoHocSinh,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
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
        },
        async customGetDataPhanLoaiCanBo(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requesData_BieuDoPhanLoaiCanBo = {
                ...this.requesData_BieuDoPhanLoaiCanBo,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
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
        this.getDataChonDonVi()
        this.getDataChonTruonghoc()

        this.getDataThongKeTangGiam(3, 'dataThongKeTruongHoc')
        this.getDataThongKeTangGiam(2, 'dataThongKeGiaoVien')
        this.getDataThongKeTangGiam(1, 'dataThongKeHocSinh')

        this.getDataBieuDoTongQuan_TrongHoc()
        this.getDataBieuDoChatLuongDaoTao_TruongHoc()
        this.getDataBieuDoLoaiHinhDaoTao_TruongHoc()

        this.getDataBieuDoTongQuan_HocSinh()
        this.getDataBieuDoTrangThai_HocSinh()
        this.getDataBieuDoGioiTinh_HocSinh()
        this.getDataBieuDoLoaiHinhDaoTao_HocSinh()
        this.getDataBieuDoKhuVuc_HocSinh()

        this.getDataBieuDoTongQuan_CBGVNV()
        this.getDataBieuDoTrinhDoChinh_CBGVNV()
        this.getDataBieuDoGioiTinh_CBGVNV()
        this.getDataBieuDoLoaiHopDong_CBGVNV()

        this.getDataBieuDoTongQuan_PhanLoaiCanBo()
        this.getDataBieuDoDoTuoi_PhanLoaiCanBo()
        this.getDataBieuDoLoaiHinhDaoTao_PhanLoaiCanBo()
        this.getDataBieuDoTrangThai_PhanLoaiCanBo()

        this.getDataBieuDoDanhGiaHocSinh_PhoDiem(1)
        this.getDataBieuDoDanhGiaHocSinh_PhoDiem(2)
        this.getDataBieuDoDanhGiaHocSinh_PhoDiem(3)
        this.getDataBieuDoPhoDiemHocKyI_PhoDiem()
        this.getDataBieuDoPhoDiemHocKyII_PhoDiem()

        // giá trị mặc định của chọn năm học
        const currentYear = new Date().getFullYear()
        this.selectedValue.selectedValueSchoolYear = String(currentYear)
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
