<template>
    <div class="home">
        <CustomTitle :title="'Dashboard'" />
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
                    <CustomStatistic
                        :title="'Tổng số Trường học'"
                        :data="dataThongKeTangGiam.dataThongKeTongSo_TruongHoc"
                        :content="'trường'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Tổng số giáo viên'"
                        :data="dataThongKeTangGiam.dataThongKeTongSo_GiaoVien"
                        :content="'cán bộ-giáo viên'"
                    />
                </div>
                <div class="col-md-3 col-sm-6">
                    <CustomStatistic
                        :title="'Tổng số học sinh'"
                        :data="dataThongKeTangGiam.dataThongKeTongSo_HocSinh"
                        :content="'học sinh'"
                    />
                </div>
            </div>
        </div>
        <div class="layout-card">
            <div class="row">
                <div
                    class="col-md-6"
                    style="width: 100%; height: 80vh; overflow: scroll"
                >
                    <banDo :item="dataBanDo" />
                </div>
                <div class="col-md-6">
                    <div class="row mb-5">
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">
                                        Trường học-Chất lượng đào tạo
                                    </div>
                                </div>
                                <div class="card-body">
                                    <StackedColumnChart
                                        :data_StackedColumnChart="
                                            getDataBieuDoTruongHoc.dataBieuDoChatLuongDaoTao_TruongHoc
                                        "
                                        :xaxis_categories="
                                            xaxisCategories_TongQuanChung.chatLuongDaoTao
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">
                                        Giáo viên-Trình độ chính
                                    </div>
                                </div>
                                <div class="card-body">
                                    <StackedColumnChart
                                        :data_StackedColumnChart="
                                            getDataBieuDoCanBoGiaoVienNhanVien.dataBieuDoTrinhDoChinh_CBGVNV
                                        "
                                        :xaxis_categories="
                                            xaxisCategories_TongQuanChung.trinhDoChinh
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">
                                        Học sinh-Trạng thái học sinh
                                    </div>
                                </div>
                                <div class="card-body">
                                    <StackedColumnChart
                                        :data_StackedColumnChart="
                                            getDataBieuDoHocSinh.dataBieuDoTrangThai_HocSinh
                                        "
                                        :xaxis_categories="
                                            xaxisCategories_TongQuanChung.trangThai
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">Học sinh-Học lực</div>
                                </div>
                                <div class="card-body">
                                    <StackedColumnChart
                                        :data_StackedColumnChart="
                                            getDataBieuDoHocSinh_HocLuc.dataBieuDohocSinh_HocLuc
                                        "
                                        :xaxis_categories="
                                            xaxisCategories_TongQuanChung.hocLuc
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store'
import CustomButton from '@/components/CustomButton.vue'
import CustomStatistic from '@/components/CustomStatistic.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import banDo from '@/components/banDo/index.vue'
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
        banDo,
        CustomButton,
        ESelect,
        ESelectYear,
        CustomStatistic,
        ChangeTrackerItemCountTitle,
        StackedColumnChart,

        CustomTitle
    },
    data() {
        return {
            dataBanDo: {},
            mockData_BieuDoDashedLineChart: mockData_BieuDoDashedLineChart,
            xaxisCategories_TongQuanChung: xaxisCategories_TongQuanChung,
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
                dataThongKeTongSo_TruongHoc: null,
                dataThongKeTongSo_GiaoVien: null,
                dataThongKeTongSo_HocSinh: null
            },
            getDataBieuDoTruongHoc: {
                dataBieuDoChatLuongDaoTao_TruongHoc: []
            },
            getDataBieuDoHocSinh: {
                dataBieuDoTrangThai_HocSinh: []
            },
            getDataBieuDoCanBoGiaoVienNhanVien: {
                dataBieuDoTrinhDoChinh_CBGVNV: []
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

            const newData = []

            for (let i = 0; i < response.rows.length; i++) {
                const donVi = response.rows[i]

                if (donVi.tenDonVi.includes('Phòng Giáo dục và Đào tạo')) {
                    const updatedDonVi = {
                        ...donVi,
                        tenDonVi: `  ${donVi.tenDonVi.replace(
                            'Phòng Giáo dục và Đào tạo',
                            'Phòng GD&ĐT'
                        )} - [${donVi.maDonVi}]`
                    }

                    newData.push(updatedDonVi)
                } else if (donVi.tenDonVi.includes('Sở Giáo dục và Đào tạo')) {
                    const updatedDonVi = {
                        ...donVi,
                        tenDonVi: `  ${donVi.tenDonVi.replace(
                            'Sở Giáo dục và Đào tạo',
                            'Sở GD&ĐT'
                        )} - [${donVi.maDonVi}]`
                    }

                    newData.push(updatedDonVi)
                } else {
                    newData.push(donVi)
                }
            }

            this.getDataESelect.ESelectUnitEducation = newData

            store.commit('SET_DATACHONDONVI_STORE', newData)
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
        },

        async getDataBieuDoChatLuongDaoTao_TruongHoc() {
            await this.customGetDataBieuDoTruongHoc(
                Api.bieuDoTruongHoc.bieuDoChatLuongDaoTao,
                'dataBieuDoChatLuongDaoTao_TruongHoc',
                'bieudoCot'
            )
        },

        async getDataBieuDoTrangThai_HocSinh() {
            await this.customGetDataBieuDoHocSinh(
                Api.bieuDoHocSinh.bieuDoTrangThai,
                'dataBieuDoTrangThai_HocSinh',
                'bieudoCot'
            )
        },

        async getDataBieuDoTrinhDoChinh_CBGVNV() {
            await this.customGetDataCanBoGiaoVienNhanVien(
                Api.bieuDoCanBoGiaoVienNhanVien.bieuDoTrinhDoChinh,
                'dataBieuDoTrinhDoChinh_CBGVNV',
                'bieudoCot'
            )
        },
        async layDuLieuBanDo() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requesData_BieuDoPhoDiem = {
                ...this.requesData_BieuDoPhoDiem,
                maSo: this.authUser.province,
                idSo: this.authUser.province,
                maDonVis: this.customValueSelectedThongKeTangGiam(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                ),
                hocKy: 3,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.banDo.getData,
                this.requesData_BieuDoPhoDiem,
                this.requestHeaders
            )

            this.dataBanDo = response
            // this.getDataBieuDoHocSinh_HocLuc.dataBieuDohocSinh_HocLuc =
            //     response.item.listData
        },
        async getDataBieuDoDanhGiaHocSinh_HocLuc() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
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
        },

        async customGetDataBieuDoTruongHoc(apiEndpoint, dataKey, responseKey) {
            this.requestHeaders = {
                token: this.authToken
            }

            const currentYear = new Date().getFullYear()
            this.requestData_BieuDoTruongHoc = {
                ...this.requestData_BieuDoTruongHoc,
                maSo: this.authUser.province,
                namHoc:
                    this.selectedValue.selectedValueSchoolYear || currentYear - 1
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

            this.getDataBieuDoCanBoGiaoVienNhanVien.dataBieuDoTrinhDoChinh_CBGVNV =
                response.item.listData
        },
        async getDataThongKeTangGiam_TongSoTruongHoc() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.requestData_BieuDoTruongHoc = {
                ...this.requestData_BieuDoTruongHoc,
                maSo: this.authUser.province,
                namHoc:
                    this.selectedValue.selectedValueSchoolYear || currentYear - 1
            }
            const response = await sendRequest(
                Api.bieuDoTruongHoc.bieuDoTongQuan,
                this.requestData_BieuDoTruongHoc,
                this.requestHeaders
            )
            let tongSoTruongHoc = response.item.listValue.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            )
            this.dataThongKeTangGiam.dataThongKeTongSo_TruongHoc = tongSoTruongHoc
        },
        async getDataThongKeTangGiam_TongSoGiaoVien() {
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
            this.dataThongKeTangGiam.dataThongKeTongSo_GiaoVien =
                response.item.currentAmount
        },
        async getDataThongKeTangGiam_TongSoHocSinh() {
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
            this.dataThongKeTangGiam.dataThongKeTongSo_HocSinh =
                response.item.currentAmount
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

                const requesData_BieuDoPhoDiem_Update = {
                    ...this.requesData_BieuDoPhoDiem,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requesData_BieuDoPhoDiem = requesData_BieuDoPhoDiem_Update

                const requestData_BieuDoCanBoGiaoVienNhanVien_Update = {
                    ...this.requestData_BieuDoCanBoGiaoVienNhanVien,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requestData_BieuDoCanBoGiaoVienNhanVien =
                    requestData_BieuDoCanBoGiaoVienNhanVien_Update

                await this.getDataThongKeTangGiam_TongSoTruongHoc()
                await this.getDataThongKeTangGiam_TongSoGiaoVien()
                await this.getDataThongKeTangGiam_TongSoHocSinh()
                await this.getDataBieuDoChatLuongDaoTao_TruongHoc()

                await this.getDataBieuDoTrangThai_HocSinh()

                await this.getDataBieuDoTrinhDoChinh_CBGVNV()

                await this.getDataBieuDoDanhGiaHocSinh_HocLuc()
                await this.layDuLieuBanDo()

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

        activeThemeIcon() {
            return this.$store.state.activeThemeIcon
        }
    },

    mounted() {
        this.getDataChonDonVi()
        this.getDataChonTruonghoc()
        this.getDataThongKeTangGiam_TongSoTruongHoc()
        this.getDataThongKeTangGiam_TongSoGiaoVien()
        this.getDataThongKeTangGiam_TongSoHocSinh()
        this.getDataBieuDoChatLuongDaoTao_TruongHoc()

        this.getDataBieuDoTrangThai_HocSinh()

        this.getDataBieuDoTrinhDoChinh_CBGVNV()

        this.getDataBieuDoDanhGiaHocSinh_HocLuc()

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
