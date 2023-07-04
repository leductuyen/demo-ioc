<template>
    <div>
        <CustomBreadcrumb
            :title="' KẾT CHUYỂN DỮ LIỆU LÊN BỘ'"
            content="KẾT CHUYỂN DỮ LIỆU"
        />
        <div class="content">
            <div class="row">
                <div class="col-4">
                    <label>Chọn đơn vị</label>

                    <div>
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
                                handleESelectChange(
                                    'ESelectUnitEducation',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Chọn cấp học</label>
                    <div>
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
                </div>
                <div class="col-4">
                    <label>Chọn trường học</label>
                    <div>
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
                            @change="
                                handleESelectChange(
                                    'ESelectSchool_MockData',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Năm học</label>
                    <div>
                        <ESelectYear
                            v-model="selectedValue.selectedValueSchoolYear"
                            placeholder="Chọn năm"
                            size="small"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                        ></ESelectYear>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-2">
                    <label>Học kỳ</label>
                    <div>
                        <ESelectOne
                            :clearable="true"
                            :disabled="false"
                            :value="selectedValue.selectedValueSemester"
                            :data="getDataESelect.ESelectSemester_MockData"
                            placeholder="Chọn một giá trị"
                            :filterable="true"
                            :collapseTags="false"
                            :fields="['tenHocKy', 'value']"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                            @change="
                                handleESlectOneChange(
                                    'ESelectSemester_MockData',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label>Thời gian nhận từ QLNT cuối</label>
                    <div class="input-group input-daterange">
                        <date-picker
                            :config="configDatePicker"
                            placeholder="Ngày bắt đầu"
                            v-model="selectedValue.selectedValueStartDate"
                            class="custom-date-picker"
                        ></date-picker>
                        <div class="input-group-addon">đến</div>
                        <date-picker
                            :config="configDatePicker"
                            placeholder="Ngày kết thúc"
                            v-model="selectedValue.selectedValueEndDate"
                            class="custom-date-picker"
                        ></date-picker>
                    </div>
                </div>
                <div class="col-4">
                    <label>Mã trường bổ sung </label>
                    <textarea
                        class="form-control"
                        v-model="selectedValue.selectedValueAdditionalSchoolCode"
                        style="height: 30px"
                        rows="3"
                    ></textarea>
                </div>
                <div class="col-2">
                    <label>Cấp học đẩy dữ liệu</label>
                    <div>
                        <div>
                            <ESelect
                                style="width: 100%"
                                no-match-text="Không tìm thấy bản ghi nào"
                                no-data-text="danh sách lựa chọn trống"
                                :clearable="true"
                                :disabled="false"
                                :data="
                                    getDataESelect.ESelectEducationDataPush_MockData
                                "
                                :placeholder="'Chọn cấp học đẩy dữ liệu'"
                                :filterable="true"
                                :multiple="true"
                                :collapse-tags="true"
                                :fields="['tenTruongHoc', 'value']"
                                :value="
                                    selectedValue.selectedValueEducationDataPush
                                "
                                @change="
                                    handleESelectChange(
                                        'ESelectEducationDataPush_MockData',
                                        ...$event
                                    )
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="layout-btn-search">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-1">
                        <CustomButton
                            label="Tìm kiếm"
                            size="small"
                            type="success"
                            @click="handleSearch"
                        />
                    </div>
                    <div class="col-1">
                        <CustomButton
                            label="Xuất Excel"
                            size="small"
                            type="info"
                            @click="handleExportExcel"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-btn-add">
            <div style="margin-right: 10px">
                <CustomButton label="Xóa" size="small" type="info" />
            </div>
            <div>
                <CustomButton label="Đẩy lên bộ" size="small" type="primary" />
            </div>
        </div>
        <div class="layout-table">
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead" rowspan="2">STT</th>
                        <th class="text-thead" rowspan="2">Trường học</th>
                        <th class="text-thead" rowspan="2">Đối tác</th>
                        <th class="text-thead" rowspan="2">Năm học</th>
                        <th class="text-thead" rowspan="2">Ngày nhận</th>
                        <th class="text-thead" rowspan="2">Trường duyệt</th>
                        <th class="text-thead" rowspan="2">Phòng duyệt</th>
                        <th class="text-thead" colspan="5">Dữ liệu đã nộp</th>
                        <th class="text-thead" rowspan="4">
                            <label>Chọn loại dữ liệu</label>
                            <div class="mt-3">
                                <!-- <ESelect
                                    style="width: 100%"
                                    no-match-text="Không tìm thấy bản ghi nào"
                                    no-data-text="danh sách lựa chọn trống"
                                    :clearable="true"
                                    :disabled="false"
                                    :data="
                                        getDataESelect.ESelectChooseDataType_MockData
                                    "
                                    :placeholder="'Loại dữ liệu'"
                                    :filterable="true"
                                    :multiple="false"
                                    :collapse-tags="true"
                                    :fields="['tenDulieu', 'value']"
                                    :value="
                                        selectedValue.selectedValueChooseDataType
                                    "
                                    @change="
                                        handleESelectChange(
                                            'ESelectChooseDataType_MockData',
                                            $event
                                        )
                                    "
                                /> -->
                            </div>
                        </th>
                        <th class="text-thead" rowspan="2">Thao tác</th>
                    </tr>
                    <tr>
                        <th class="text-thead">Cán bộ</th>
                        <th class="text-thead">Học sinh</th>
                        <th class="text-thead">Lớp học</th>
                        <th class="text-thead">KQ giữa kỳ</th>
                        <th class="text-thead">KQ cuối kỳ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ index + 1 }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tenTruongHoc }}
                            -
                            {{ item.maTruongHoc }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maDoiTac }}
                        </td>
                        <td class="text-tbody">
                            {{ item.namHoc }}-{{ item.namHoc + 1 }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayNopTuQlntCuoi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayTruongDuyet }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayPhongDuyet }}
                        </td>
                        <td class="text-tbody">
                            <span v-html="item.countGvStr"></span>
                        </td>
                        <td class="text-tbody">
                            <span v-html="item.countHsStr"></span>
                        </td>
                        <td class="text-tbody">
                            <span v-html="item.countLhStr"></span>
                        </td>
                        <td class="text-tbody">
                            <span v-html="item.countKqGiuaKy"></span>
                        </td>
                        <td class="text-tbody">
                            <span v-html="item.ketQuaLienCap"></span>
                        </td>
                        <td class="text-tbody"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="layout-note">
            <div class="row">
                <div class="col-md-12">
                    <p><b>Ghi chú:</b></p>

                    <ul class="custom-list">
                        <li>
                            <p>
                                <span>*</span>
                                NT:
                                <i class="small-text">Nhà trẻ</i>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span>*</span>
                                MG:
                                <i class="small-text">Mẫu giáo</i>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span>*</span>
                                TH:
                                <i class="small-text">Tiểu học</i>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span>*</span>
                                THCS:
                                <i class="small-text">Trung học cơ sở</i>
                            </p>
                        </li>

                        <li>
                            <p>
                                <span>*</span>
                                THPT:
                                <i class="small-text">Trung học phổ thông</i>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import datePicker from 'vue-bootstrap-datetimepicker'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectOne from '@/components/ESelectOne.vue'
import CustomButton from '@/components/CustomButton.vue'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import {
    ESelectGradeLevel_MockData,
    ESelectSemester_MockData,
    ESelectChooseDataType_MockData
} from '@/mock_data'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { mapState } from 'vuex'

export default {
    name: 'KetChuyenDuLieu',
    components: {
        ESelect,
        CustomButton,
        datePicker,
        CustomBreadcrumb,
        ESelectYear,
        ESelectOne
    },
    data() {
        return {
            start: 0,
            limit: 25,
            resetESelectSchool: false,

            request_Header: {
                Authorization: ''
            },

            request_Data: {
                capHocList: [],
                endDate: null,
                hocKy: null,
                limit: 25,
                lstCapHoc: [],
                maDonViList: [],
                maTruongHoc: [],
                matruongHocList: [],
                namHoc: null,
                showOnlyIncompleteSchool: false,
                start: 0,
                startDate: null
            },
            tableData: [],
            request_Params: {
                start: null,
                limit: null
            },
            configDatePicker: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
                showTodayButton: true,
                locale: 'vi'
            },

            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [], //truonghoc
                ESelectShoolYear: [], //namhoc
                ESelectSemester_MockData: ESelectSemester_MockData, //hocky
                //ngaybatdau
                //ngayketthuc
                //mabosung
                ESelectEducationDataPush_MockData: ESelectGradeLevel_MockData, //caphocdaydulieu

                ESelectChooseDataType_MockData: ESelectChooseDataType_MockData, //chonloaidulieu

                ESelectAnother_MockData: ESelectChooseDataType_MockData //chonloaidulieu_trongTable
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [], //truonghoc
                selectedValueSchoolYear: [], //namhoc
                selectedValueSemester: [], //hocky
                selectedValueStartDate: '', //ngaybatdau
                selectedValueEndDate: '', //ngayketthuc
                selectedValueAdditionalSchoolCode: '', //mabosung

                selectedValueEducationDataPush: [], //caphocdaydulieu
                selectedValueChooseDataType: [], //chonloaidulieu
                selectedValueAnother: [] // chonloaidulieu trong vòng lặp
            }
        }
    },
    methods: {
        getLoaiDonVi(e) {
            if (e == 1) {
                return 'Sở'
            }
            if (e == 2) {
                return 'Phòng'
            }
            if (e == 3) {
                return 'Trường'
            }
        },
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        handleESlectOneChange(source, selectedOptions) {
            switch (source) {
                case 'ESelectSemester_MockData':
                    this.selectedValue.selectedValueSemester = selectedOptions

                    break
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
                case 'ESelectSchool_MockData':
                    this.selectedValue.selectedValueSchool = selectedOptions

                    break
                case 'ESelectEducationDataPush_MockData':
                    this.selectedValue.selectedValueEducationDataPush =
                        selectedOptions
                    break
                case 'ESelectChooseDataType_MockData':
                    this.selectedValue.selectedValueChooseDataType =
                        selectedOptions
                    console.log(this.selectedValue.selectedValueChooseDataType)
                    break
            }
        },

        handleAddNew() {
            console.log(this.selectedValue)
        },
        handleImport() {},
        async handleSearch() {
            try {
                const maDonViList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )

                const capHocList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const maboSung =
                    this.selectedValue.selectedValueAdditionalSchoolCode

                const matruongHocList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )

                let updateMaTruongHocList = []

                if (maboSung) {
                    updateMaTruongHocList = matruongHocList.concat(maboSung)
                } else {
                    updateMaTruongHocList = matruongHocList
                }

                const namHoc = this.selectedValue.selectedValueSchoolYear
                const hocKy = parseInt(
                    this.selectedValue.selectedValueSemester.value
                )

                if (isNaN(hocKy)) {
                    this.$message({
                        message: 'Vui lòng chọn Học Kỳ',
                        type: 'error'
                    })
                    return
                }
                const startDate = this.selectedValue.selectedValueStartDate
                const endDate = this.selectedValue.selectedValueEndDate

                const lstCapHoc = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueEducationDataPush,
                    'selectedValueEducationDataPush'
                )
                const start = this.start
                const limit = this.limit
                const request_Header = {
                    token: this.authToken
                }

                const request_Data = {
                    capHocList: capHocList,
                    endDate: endDate,
                    hocKy: hocKy,
                    limit: limit,
                    lstCapHoc: lstCapHoc,
                    maDonViList: maDonViList,
                    maTruongHoc: null,
                    matruongHocList: updateMaTruongHocList,
                    namHoc: namHoc,
                    showOnlyIncompleteSchool: false,
                    start: start,
                    startDate: startDate
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.ketChuyenDuLieu
                        .danhSachKetChuyenDuLieu,
                    request_Data,
                    request_Header,
                    null
                )
                if (response.rc == 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu',
                            type: 'success'
                        })
                        this.tableData = response.tableData
                    }, 1000)
                } else {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu trống',
                            type: 'error'
                        })
                        this.tableData = []
                    }, 1000)
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async handleExportExcel() {
            try {
                if (this.tableData.length === 0) {
                    this.$message({
                        message: 'Danh sách dữ liệu trống, không thể tải xuống',
                        type: 'error'
                    })
                    return
                }
                const maDonViList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )

                const capHocList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const maboSung =
                    this.selectedValue.selectedValueAdditionalSchoolCode
                console.log(maboSung)

                const matruongHocList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )

                let updateMaTruongHocList = []

                if (maboSung) {
                    updateMaTruongHocList = matruongHocList.concat(maboSung)
                } else {
                    updateMaTruongHocList = matruongHocList
                }
                const namHoc = this.selectedValue.selectedValueSchoolYear
                const hocKy = parseInt(
                    this.selectedValue.selectedValueSemester.value
                )

                if (isNaN(hocKy)) {
                    this.$message({
                        message: 'Vui lòng chọn Học Kỳ',
                        type: 'error'
                    })
                    return
                }
                const startDate = this.selectedValue.selectedValueStartDate
                const endDate = this.selectedValue.selectedValueEndDate

                const lstCapHoc = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueEducationDataPush,
                    'selectedValueEducationDataPush'
                )
                const start = this.start
                const limit = this.limit
                const request_Header = {
                    token: this.authToken
                }

                const request_Data = {
                    capHocList: capHocList,
                    endDate: endDate,
                    hocKy: hocKy,
                    limit: limit,
                    lstCapHoc: lstCapHoc,
                    maDonViList: maDonViList,
                    maTruongHoc: null,
                    matruongHocList: updateMaTruongHocList,
                    namHoc: namHoc,
                    showOnlyIncompleteSchool: false,
                    start: start,
                    startDate: startDate
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.ketChuyenDuLieu.xuatExcel,
                    request_Data,
                    request_Header,
                    null
                )

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async getDataESelectSchool() {
            try {
                const maDonVi = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )

                const capHoc = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )

                const request_Header = {
                    token: this.authToken
                }

                const request_Data = {
                    capHoc: capHoc,
                    maDonVi: maDonVi
                }
                const response = await sendRequest(
                    Api.internal_api.dm_School,
                    request_Data,
                    request_Header,
                    null
                )
                this.getDataESelect.ESelectSchool = response.rows
            } catch (error) {
                console.log(error)
            }
        },
        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
                case 'selectedValueSchool':
                case 'selectedValueEducationDataPush':
                case 'selectedValueChooseDataType':
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
.content {
    background: #fff;
    padding: 10px 10px 10px 10px;
    border-radius: 4px;
    margin-bottom: 20px;
}
.content label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 14px;
}
.content .title {
    margin-bottom: 5px;
    font-size: 18px;
    color: #212529;
}
.layout-btn-add {
    padding: 20px 10px 5px 10px;
    max-width: 1173px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
}
.layout-btn-search {
    margin-top: 15px;
    margin-bottom: 5px;
}
.layout-table {
    background: #fff;
    padding: 20px 10px 5px 10px;
    border-radius: 4px;
    max-width: calc(100vw - 330px);
    margin: 0 auto;
    overflow-x: auto;
}
table thead tr {
    background: rgb(228, 235, 245);
}
.table {
    white-space: nowrap;
}
.centered-table {
    margin-left: auto;
    margin-right: auto;
}

.centered-table th,
.centered-table td {
    text-align: center;
    vertical-align: middle;
}
.table-bordered {
    background-color: #fff;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
}
.table-hover tbody tr:hover {
    background-color: #f5f5f5;
}

.text-thead {
    font-size: 13px;
    text-align: center; /* Canh giữa nội dung trong cột */
    vertical-align: middle; /* Căn giữa theo chiều dọc */
}
.text-tbody {
    font-size: 13px;
}

.layout-note {
    padding: 10px 10px 10px 10px;
    margin-top: 20px;
}
.custom-list {
    font-weight: bold;
    list-style-type: none;
}

.custom-list li {
    color: green;
    font-weight: bold;
    font-size: 12px;
}

.custom-list li span {
    color: red;
    font-weight: bold;
}

.custom-list li .small-text {
    font-size: 12px;
    color: blue;
    font-weight: 400;
}

.custom-date-picker {
    height: 32px;
}
.custom-date-picker::placeholder {
    color: gainsboro;

    font-size: 13px;
    background-color: transparent;
    appearance: none;
}
.input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
}
</style>
