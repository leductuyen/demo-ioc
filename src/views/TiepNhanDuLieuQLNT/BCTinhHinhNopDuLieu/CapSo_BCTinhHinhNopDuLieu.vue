<template>
    <div>
        <CustomBreadcrumb
            :title="'TIẾP NHẬN DỮ LIỆU QLNT'"
            :content="'BÁO CÁO TÌNH HÌNH NỘP DỮ LIỆU CẤP SỞ'"
        />
        <div class="content">
            <div class="row">
                <div class="col-4">
                    <label>Đơn vị</label>
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
                    <label>Cấp học</label>
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
                <div class="col-4">
                    <label>Nội dung hiển thị</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect.ESelectDisplayContent"
                            :placeholder="'Chọn nội dung'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenNoiDung', 'value']"
                            :value="selectedValue.selectedValueDisplayContent"
                            @change="handleSelectChange"
                        />
                    </div>
                </div>
            </div>
            <div class="layout-btn">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-1">
                        <CustomButton
                            label="Tìm kiếm"
                            size="small"
                            type="success"
                            @click="handleSearch"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-table">
            <chonSoLuongBanGhi @chonXongSoLuong="ChonSoLuongBanGhi($event)" />
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTenDonVi }"
                        >
                            Tên đơn vị
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoCanBo }"
                        >
                            Tổng số cán bộ
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoHocSinh }"
                        >
                            Tổng số HS
                        </th>
                        <th
                            class="text-thead"
                            :class="{
                                'hide-td': hideColumn.hideTongSoHSTotNghiep
                            }"
                        >
                            Tổng số HS tốt nghiệp
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoKQCaNam }"
                        >
                            Tổng số KQ cả năm
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoKQHKI }"
                        >
                            Tổng số KQ HK I
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoKQHKII }"
                        >
                            Tổng số KQ HK II
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoLopDon }"
                        >
                            Tổng số lớp đơn
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoLopGhep }"
                        >
                            Tổng số lớp ghép
                        </th>
                        <th
                            class="text-thead"
                            :class="{ 'hide-td': hideColumn.hideTongSoTruongHoc }"
                        >
                            Tổng số trường học
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="tableData.length === 0">
                        <tr>
                            <td colspan="11" class="text-tbody">
                                Không có bản ghi nào.
                            </td>
                        </tr>
                    </template>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">{{ item.stt }}</td>
                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTenDonVi }"
                        >
                            {{ item.tenDonVi }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoCanBo }"
                        >
                            {{ item.totalCanbo }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoHocSinh }"
                        >
                            {{ item.totalHocsinh }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{
                                'hide-td': hideColumn.hideTongSoHSTotNghiep
                            }"
                        >
                            {{ item.totalHsTotNghep }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoKQCaNam }"
                        >
                            {{ item.totalKQCanam }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoKQHKI }"
                        >
                            {{ item.totalKQHocKi1 }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoKQHKII }"
                        >
                            {{ item.totalKQHocki2 }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoLopDon }"
                        >
                            {{ item.totalLopDon }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoLopGhep }"
                        >
                            {{ item.totalLopGhep }}
                        </td>

                        <td
                            class="text-tbody"
                            :class="{ 'hide-td': hideColumn.hideTongSoTruongHoc }"
                        >
                            {{ item.totalTruongHoc }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <CustomPagination
            v-show="total_rows > 0"
            :tongbanghi="total_rows"
            :soluonghienthi="soLuongBanGhiHienThi"
            :batdau="trangbatdau"
            @pageChange="layLai($event)"
        >
        </CustomPagination>
    </div>
</template>
<script>
import ESelect from '@/components/ESelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import {
    ESelectGradeLevel_MockData,
    ESelectDisplayContent_MockData
} from '@/mock_data'
import { mapState } from 'vuex'
import sendRequest from '@/services'
import Api from '@/constants/Api'

export default {
    name: 'capSoBCTinhHinhNopDuLieu',
    components: {
        ESelect,
        CustomButton,
        ESelectYear,
        CustomBreadcrumb,
        chonSoLuongBanGhi,
        CustomPagination
    },
    data() {
        return {
            start: 0,
            total_rows: 0,
            currentPage: 1,
            limit: 25,
            soLuongBanGhiHienThi: 25,
            trangbatdau: false,

            request_Data: {
                capHocList: [],
                maDonViList: [],
                dsMaTruong: [],
                maSo: null,
                namHoc: null
            },
            request_Params: {
                start: null,
                limit: null
            },
            request_Header: {
                Authorization: ''
            },
            tableData: [],
            hiddenColumns: [],
            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc

                ESelectShoolYear: null, //namhoc
                ESelectDisplayContent: ESelectDisplayContent_MockData //noidunghienthi
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvu
                selectedValueGradeLevel: [], //caphoc

                selectedValueSchoolYear: [], //namhoc
                selectedValueDisplayContent: [] //noidunghienthi
            },

            hideColumn: {
                hideTenDonVi: null,
                hideTongSoCanBo: null,
                hideTongSoHocSinh: null,
                hideTongSoHSTotNghiep: null,
                hideTongSoKQCaNam: null,
                hideTongSoKQHKI: null,
                hideTongSoKQHKII: null,
                hideTongSoLopDon: null,
                hideTongSoLopGhep: null,
                hideTongSoTruongHoc: null
            }
        }
    },
    methods: {
        ChonSoLuongBanGhi(e) {
            this.total_rows = 0
            this.soLuongBanGhiHienThi = e.soluong
        },
        checkTruocKhiTim() {
            this.trangbatdau = !this.trangbatdau
        },
        layLai(e) {
            this.start = e.start
            this.limit = e.limit
            this.currentPage = e.currentPage
            this.handleSearch()
        },
        handleSelectChange(value) {
            // xử lí việc ẩn hiện column
            const selectedColumns = value.map((option) => option.value)
            const columnKeys = [
                'hideTenDonVi',
                'hideTongSoCanBo',
                'hideTongSoHocSinh',
                'hideTongSoHSTotNghiep',
                'hideTongSoKQCaNam',
                'hideTongSoKQHKI',
                'hideTongSoKQHKII',
                'hideTongSoLopDon',
                'hideTongSoLopGhep',
                'hideTongSoTruongHoc'
            ]

            columnKeys.forEach((column, index) => {
                this.hideColumn[column] = !selectedColumns.includes(
                    (index + 1).toString()
                )
            })
        },
        handleESelectChange(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitEducation':
                    this.selectedValue.selectedValueUnitEducation =
                        selectedOptions
                    break
                case 'ESelectGradeLevel_MockData':
                    this.selectedValue.selectedValueGradeLevel = selectedOptions
                    break
            }
        },

        async handleSearch() {
            try {
                const maDonViList_Update = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )
                const capHocList_Update = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const currentYear = new Date().getFullYear()
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear
                if (capHocList_Update.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn cấp học',
                        type: 'error'
                    })
                    return
                }
                const start = this.start
                const limit = this.limit
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data,
                    start: start,
                    limit: limit,
                    capHocList: capHocList_Update,
                    maDonViList: maDonViList_Update,
                    namHoc: namHoc_Update || currentYear,
                    maSo: this.authUser.province
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.baoCaoTinhHinhNopDuLieu.capSo,
                    request_Data,
                    request_Header
                )

                if (response.rc == 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu',
                            type: 'success'
                        })
                    }, 1000)
                } else {
                    this.$message({
                        message: 'Danh sách dữ liệu trống',
                        type: 'error'
                    })
                }

                this.tableData = response.tableData
                this.total_rows = response.totalRows
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },

        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
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
    created() {
        this.selectedValue.selectedValueDisplayContent =
            this.getDataESelect.ESelectDisplayContent
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

.layout-btn {
    margin-top: 30px;
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
.hide-td {
    display: none;
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
    padding: 10px 5px 10px 10px;
}
.text-tbody {
    font-size: 13px;
}
</style>
