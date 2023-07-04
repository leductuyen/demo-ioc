<template>
    <div>
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
                        />
                    </div>
                </div>
            </div>
        </div>
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
        <div class="layout-card">
            <div class="row">
                <div class="col-md-4 col-sm-12 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Tổng quan</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :data_PieChart="dataBieuDoTongQuan_TruongHoc"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Chất lượng đào tạo</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoChatLuongDaoTao_TruongHoc
                                "
                                :xaxis_categories="
                                    xaxisCategories.chatLuongDaoTao
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
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { mapState } from 'vuex'
import { ESelectGradeLevel_MockData } from '@/mock_data'
import CustomTitle from '@/components/CustomTitle.vue'
import ChangeTrackerItem from '@/components/ChangeTrackerItem.vue'
import ChangeTrackerItemCountTitle from '@/components/ChangeTrackerItemCountTitle.vue'
import StackedColumnChart from '@/components/StackedColumnChart'
import PieChart from '@/components/PieChart'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    name: 'ThongTinDiemDanh',
    components: {
        CustomButton,
        ESelect,
        ESelectYear,
        ChangeTrackerItem,
        ChangeTrackerItemCountTitle,
        CustomTitle,
        StackedColumnChart,
        PieChart
    },
    data() {
        return {
            resetESelectSchool: false,

            requestParams_Select: {
                start: 0,
                limit: 9999,
                maTinhThanh: null,
                check: true
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
            getDataBieuDoPhoDiem: {
                dataBieuDoPhoDiemHKI_PhoDiem: [],
                dataBieuDoPhoDiemHKII_PhoDiem: []
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
            },
            dataBieuDoLoaiHinhDaoTao_TruongHoc: [],
            dataBieuDoChatLuongDaoTao_TruongHoc: [],
            xaxisCategories: {
                trinhDoChinh: [
                    'Tiến sĩ',
                    'Thạc sĩ',
                    'Đại học',
                    'Cao đẳng',
                    'Trung cấp'
                ],
                gioiTinh: ['Nam', 'Nữ'],
                loaiHopDong: ['HĐKXĐ thời hạn', 'HĐXĐ thời hạn', 'HĐLĐ']
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
