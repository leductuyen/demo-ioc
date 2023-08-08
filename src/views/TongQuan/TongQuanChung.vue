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
                <div class="col-md-6" style="width: 100%">
                    <banDo :item="dataBanDo" />
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">SỐ LƯỢNG GIÁO VIÊN</div>
                                </div>
                                <div class="card-body">
                                    <PieChart
                                        :label="labelSoLuongTruong"
                                        :data_PieChart="
                                            getDataBieuDoTron.dataBieuDoTron_CanBoGiaoVien
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">SỐ LƯỢNG HỌC SINH</div>
                                </div>
                                <div class="card-body">
                                    <PieChart
                                        :label="labelSoLuongTruong"
                                        :data_PieChart="
                                            getDataBieuDoTron.dataBieuDoTron_HocSinh
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">ĐIỂM DANH TRONG NGÀY</div>
                                </div>
                                <div class="card-body">
                                    <PieChart
                                        :label="diemDanhTrongNgay"
                                        :data_PieChart="
                                            getDataBieuDoTron.dataBieuDoTron_ThongTinDiemDanh
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="title">Y TẾ HỌC SINH</div>
                                </div>
                                <div class="card-body">
                                    <PieChart
                                        :label="chiSoBMI"
                                        :data_PieChart="
                                            getDataBieuDoTron.dataBieuDoTron_ThongTinYTeHocSinh
                                        "
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mb-3">
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
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-6 mb-4">
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
                <div class="col-md-6 mb-4">
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
            <div class="row mt-4">
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Trường học theo cấp</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="labelSoLuongTruong"
                                :data_PieChart="
                                    getDataBieuDoTruongHoc.dataBieuDoTongQuan_TruongHoc
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Học Lực Học sinh thcs</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="xaxisCategories_TongQuanChung.hocLuc"
                                :data_PieChart="
                                    getBieuDoHLHS(
                                        getDataBieuDoHocSinh_HocLuc.dataBieuDohocSinh_HocLuc,
                                        'THCS'
                                    )
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Học Lực Học sinh thpt</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="xaxisCategories_TongQuanChung.hocLuc"
                                :data_PieChart="
                                    getBieuDoHLHS(
                                        getDataBieuDoHocSinh_HocLuc.dataBieuDohocSinh_HocLuc,
                                        'THPT'
                                    )
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
import PieChart from '@/components/PieChart.vue'
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
import LineChart from '@/components/LineChart.vue'
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
        PieChart,
        CustomTitle,
        LineChart
    },
    data() {
        return {
            dataBanDo: {},
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
            diemDanhTrongNgay: ['Nghỉ học', 'Đi học'],
            labelSoLuongTruong: [
                'Mầm non',
                'Tiểu học',
                'THCS',
                'THPT',
                'Liên cấp',
                'GDTX',
                'Liên cấp 2+3',
                'Khác'
            ],
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
                selectedValueUnitEducation: [
                    {
                        value: '080',
                        title: 'Phòng Giáo dục và Đào tạo Thành phố Lào Cai'
                    },
                    {
                        value: '082',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Bát Xát'
                    },
                    {
                        value: '083',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Mường Khương'
                    },
                    {
                        value: '084',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Si Ma Cai'
                    },
                    {
                        value: '085',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Bắc Hà'
                    },
                    {
                        value: '086',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Bảo Thắng'
                    },
                    {
                        value: '087',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Bảo Yên'
                    },
                    {
                        value: '088',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Sa Pa'
                    },
                    {
                        value: '089',
                        title: 'Phòng Giáo dục và Đào tạo Huyện Văn Bàn'
                    },
                    { value: '10', title: 'Sở Giáo dục và Đào tạo Tỉnh Lào Cai' }
                ], //chondonvi
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
                dataBieuDoChatLuongDaoTao_TruongHoc: [],
                dataBieuDoChatLuongToiThieu: [],
                dataBieuDoChuanMuc1: [],
                dataBieuDoChuanMuc2: [],
                dataBieuDoTongQuan_TruongHoc: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            getDataBieuDoTron: {
                dataBieuDoTron_CanBoGiaoVien: [],
                dataBieuDoTron_HocSinh: [],
                dataBieuDoTron_ThongTinDiemDanh: [],
                dataBieuDoTron_ThongTinYTeHocSinh: []
            },
            getDataBieuDoHocSinh_HocLuc: {
                dataBieuDohocSinh_HocLuc: []
            },
            getDataBieuDoPhoDiem: {
                dataBieuDoPhoDiemHKI_PhoDiem: [],
                dataBieuDoPhoDiemHKII_PhoDiem: []
            }
        }
    },

    methods: {
        async getDataBieuDoTron_CanBoGiaoVien() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            this.requesData_BieuDoPhanLoaiCanBo = {
                ...this.requesData_BieuDoPhanLoaiCanBo,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.bieuDoCanBoGiaoVienNhanVien.bieuDoTongQuan,
                this.requesData_BieuDoPhanLoaiCanBo,
                this.requestHeaders
            )
            this.getDataBieuDoTron.dataBieuDoTron_CanBoGiaoVien =
                response.item.listValue
        },
        async getDataBieuDoTron_HocSinh() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            this.requestData_BieuDoHocSinh = {
                ...this.requestData_BieuDoHocSinh,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.bieuDoHocSinh.bieuDoTongQuan,
                this.requesData_BieuDoPhanLoaiCanBo,
                this.requestHeaders
            )
            this.getDataBieuDoTron.dataBieuDoTron_HocSinh =
                response.item.listValue
        },
        async getDataBieuDoTron_ThongTinDiemDanh() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            this.requestData_BieuDoHocSinh = {
                ...this.requestData_BieuDoHocSinh,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.thongTinDiemDanh,
                this.requestData_BieuDoHocSinh,
                this.requestHeaders
            )
            this.getDataBieuDoTron.dataBieuDoTron_ThongTinDiemDanh =
                response.item.bieuDo
        },
        async getDataBieuDoTron_YTeHocSinh() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
            this.requestData_BieuDoHocSinh = {
                ...this.requestData_BieuDoHocSinh,
                maSo: this.authUser.province,
                namHoc: this.selectedValue.selectedValueSchoolYear || currentYear
            }
            const response = await sendRequest(
                Api.ioc.tongQuan.bieuDoYTe,
                this.requestData_BieuDoHocSinh,
                this.requestHeaders
            )
            this.getDataBieuDoTron.dataBieuDoTron_ThongTinYTeHocSinh =
                response.item.bieuDoDinhDuong.map((item) => item.value)

            console.log(response)
        },
        async getDataBieuDoPhoDiemHocKyI_PhoDiem() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
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
            const currentYear = new Date().getFullYear() - 1
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
        async getDataBieuDoTongQuan_TrongHoc() {
            await this.customGetDataBieuDoTruongHoc(
                Api.bieuDoTruongHoc.bieuDoTongQuan,
                'dataBieuDoTongQuan_TruongHoc',
                'bieudoTron'
            )
        },
        getBieuDoHLHS(data, capHoc) {
            let result = [0, 0, 0, 0, 0, 0]
            // console.log('Data map biểu đồ học lực học sinh:')
            // console.log(data)
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == capHoc) {
                        result = data[i].data
                    }
                }
            }
            // console.log('Dữ liệu là:')
            // console.log(result)
            return result
        },
        remapDataBanDo(data) {
            console.log('remapDataBanDo')
            console.log(data)
            let result = [{ name: '', data: [1, 2, 3] }]
            let pt1 = 0
            let pt2 = 0
            let pt3 = 0
            if (data && data.length) {
                for (let i = 0; i < data.length; i++) {
                    console.error(data[i])
                    pt1 += data[i].data[0]
                    pt2 += data[i].data[1]
                    pt3 += data[i].data[2]
                }
                // console.log(pt1)
                // console.log(pt2)
                // console.log(pt3)
                result = [{ name: '', data: [pt1, pt2, pt3] }]
            }
            return result
        },
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

        async layDuLieuBanDo() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
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
            // console.log('DataBanDo:')
            // console.log(this.dataBanDo)
        },
        async getDataBieuDoDanhGiaHocSinh_HocLuc() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear() - 1
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
            // console.log('customGetDataBieuDoTruongHoc')
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
            // console.log('responseKey')
            // console.log(response)
            switch (responseKey) {
                case 'bieudoTron':
                    this.getDataBieuDoTruongHoc[dataKey] = response.item.listValue
                    break
                case 'bieudoCot':
                    this.getDataBieuDoTruongHoc[dataKey] = response.item.listData
                    break
            }
            // console.log('Biểu đồ trường:')
            // console.log(this.getDataBieuDoTruongHoc.dataBieuDoTongQuan_TruongHoc)
        },

        async getDataThongKeTangGiam_TongSoTruongHoc() {
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
                const requesData_BieuDoPhanLoaiCanBo_Update = {
                    ...this.requesData_BieuDoPhanLoaiCanBo,
                    capHocs: capHocs_Update,
                    maDonVis: maDonVis_Update,
                    maTruongs: maTruongs_Update,
                    namHoc: namHoc_Update
                }
                this.requesData_BieuDoPhanLoaiCanBo =
                    requesData_BieuDoPhanLoaiCanBo_Update
                this.getDataThongKeTangGiam_TongSoTruongHoc()
                this.getDataThongKeTangGiam_TongSoGiaoVien()
                this.getDataThongKeTangGiam_TongSoHocSinh()
                this.layDuLieuBanDo()
                this.getDataBieuDoTron_CanBoGiaoVien()
                this.getDataBieuDoTron_HocSinh()
                this.getDataBieuDoTron_ThongTinDiemDanh()
                this.getDataBieuDoTron_YTeHocSinh()
                this.getDataBieuDoChatLuongDaoTao_TruongHoc()
                this.getDataBieuDoDanhGiaHocSinh_HocLuc()
                this.getDataBieuDoPhoDiemHocKyI_PhoDiem()
                this.getDataBieuDoPhoDiemHocKyII_PhoDiem()
                this.getDataBieuDoTongQuan_TrongHoc()

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
        },
        activeThemeIcon() {
            return this.$store.state.activeThemeIcon
        }
    },

    mounted() {
        this.getDataChonDonVi()
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
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
}

.layout-card .card-body {
    padding: 0px;
    background: white;
    border: #f2f3f8 2px solid;
    height: 300px;
}

/* CSS select dashboard */
</style>
