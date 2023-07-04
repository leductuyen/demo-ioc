<template>
    <div>
        <CustomBreadcrumb
            :title="' KẾT CHUYỂN DỮ LIỆU LÊN BỘ'"
            content="'CẤU HÌNH DUYỆT ĐẨY DỮ LIỆU'"
        />
        <div class="content">
            <div class="row">
                <div class="col-2">
                    <label>Loại Đơn vị</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect.ESelectUnitType_MockData"
                            :placeholder="'Chọn loại đơn vị'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenLoaiDonVi', 'maDonVi']"
                            :value="selectedValue.selectValueUnitType"
                            @change="
                                handleESelectChange('ESelectUnitType', ...$event)
                            "
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label>Đơn vị quản lý</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="this.dataChonDonVi_Store"
                            :placeholder="'Chọn đơn vị quẩn lý'"
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
                <div class="col-4">
                    <label>Trường học</label>
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
                                handleESelectChange('ESelectSchool', ...$event)
                            "
                        />
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
                </div>
            </div>
        </div>

        <div class="layout-table">
            <div class="layout-btn-add">
                <div>
                    <chonSoLuongBanGhi
                        @chonXongSoLuong="ChonSoLuongBanGhi($event)"
                    />
                </div>
                <div class="col-1 mr-2">
                    <CustomButton
                        label="Thêm mới"
                        size="small"
                        type="primary"
                        @click="openModalAddNew"
                    />
                </div>
            </div>
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Loại đơn vị</th>
                        <th class="text-thead">Đơn vị quản lý</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Trường học</th>
                        <th class="text-thead">Trường đẩy lên bộ</th>
                        <th class="text-thead">Phòng đẩy lên bộ</th>
                        <th class="text-thead">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ (currentPage - 1) * limit + index + 1 }}
                        </td>
                        <td class="text-tbody">
                            <span v-if="item.loaiDonVi === 3">Trường</span>
                            <span v-if="item.loaiDonVi === 2">Phòng</span>
                        </td>
                        <td class="text-tbody">{{ item.tenDonVi }}</td>
                        <td class="text-tbody">{{ item.maTruongHoc }}</td>
                        <td class="text-tbody">{{ item.tenTruongHoc }}</td>
                        <td class="text-tbody">
                            <span v-if="item.truongDuocNopLenBo === true"
                                ><i class="el-icon-check"></i>
                            </span>
                            <span v-if="item.truongDuocNopLenBo === false"
                                >1
                            </span>
                        </td>

                        <td class="text-tbody">
                            <span v-if="item.phongDuocNopLenBo === true"
                                >> <i class="el-icon-check"></i
                            ></span>
                            <span v-if="item.phongDuocNopLenBo === false"></span>
                        </td>
                        <td class="text-tbody">
                            <CustomButton
                                label="Xóa"
                                size="small"
                                type="danger"
                                icon="el-icon-delete"
                                v-loading.fullscreen.lock="fullscreenLoading"
                                @click="handleDelete(item.id)"
                            />
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
        <!-- ************ Modal Thêm mới ************ -->
        <el-dialog
            :visible.sync="addNewModalVisible"
            @close="closeModalAddNew"
            class="custom-dialog"
            width="80%"
        >
            <span slot="title" class="custom-dialog-title">
                THÊM MỚI CẤU HÌNH DUYỆT ĐẨY DỮ LIỆU
                <hr />
            </span>

            <div class="row">
                <div class="col-2">
                    <label>Loại Đơn vị</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="
                                getDataESelectModal.ESelectUnitTypeModal_MockData
                            "
                            :placeholder="'Chọn loại đơn vị'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenLoaiDonVi', 'maDonVi']"
                            :value="selectedValueModal.selectValueUnitTypeModal"
                            @change="
                                handleESelectChangeModal(
                                    'ESelectUnitTypeModal',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label>Đơn vị quản lý</label>
                    <div>
                        <ESelect
                            :reset="resetESelectUnitEducationModal"
                            @reset-completed="
                                handleResetESlectUnitEducationCompletedModal
                            "
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="this.dataChonDonVi_Store"
                            :placeholder="'Chọn đơn vị quẩn lý'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenDonVi', 'maDonVi']"
                            :value="
                                selectedValueModal.selectedValueUnitEducationModal
                            "
                            @change="
                                handleESelectChangeModal(
                                    'ESelectUnitEducationModal',
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
                            :disabled="!isTruong && isPhong"
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :data="
                                getDataESelectModal.ESelectGradeLevelModal_MockData
                            "
                            :placeholder="'Chọn cấp học'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenTruongHoc', 'value']"
                            :value="
                                selectedValueModal.selectedValueGradeLevelModal
                            "
                            @change="
                                handleESelectChangeModal(
                                    'ESelectGradeLevelModal_MockData',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label>Trường học</label>
                    <div>
                        <ESelect
                            :disabled="!isTruong && isPhong"
                            :reset="resetESelectSchoolModal"
                            @reset-completed="
                                handleResetESlectSchoolCompletedModal
                            "
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :data="getDataESelectModal.ESelectSchoolModal"
                            :placeholder="'Chọn trường học'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenTruongHoc', 'maTruongHoc']"
                            :value="selectedValueModal.selectedValueSchoolModal"
                            @change="
                                handleESelectChangeModal(
                                    'ESelectSchoolModal',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <el-checkbox
                    v-model="checkedPhongDuocDayLenBo"
                    :disabled="isTruong && !isPhong"
                    >Phòng được đẩy lên Bộ</el-checkbox
                >
                <el-checkbox
                    v-model="checkedTruongDuocDayLenBo"
                    :disabled="!isTruong && isPhong"
                    >Trường được đẩy lên Bộ</el-checkbox
                >
            </div>
            <div style="margin-top: 30px"></div>
            <hr />
            <div class="layout-btn-detail-modal">
                <div style="margin-right: 10px">
                    <CustomButton
                        label="Đóng"
                        @click="closeModalAddNew"
                        type="info"
                        size="small"
                    />
                </div>
                <div>
                    <CustomButton
                        label="Thêm mới"
                        size="small"
                        @click="handleAddNew"
                        type="primary"
                    />
                </div>
            </div>
        </el-dialog>
        <!-- ************ Modal Chi tiết ************ -->
        <el-dialog
            :visible.sync="detailModalVisible"
            @close="closeModalDetail"
            class="custom-dialog"
            width="80%"
        >
            <span slot="title" class="custom-dialog-title" style="color: red">
                DANH SÁCH LOẠI ĐƠN VỊ ĐÃ CÓ CẤU HÌNH DUYỆT ĐẨY
                <hr />
            </span>
            <div class="custom-table-detail">
                <table class="table table-bordered table-hover centered-table">
                    <thead>
                        <tr>
                            <th class="text-thead">STT</th>
                            <th class="text-thead">Mã đơn vị</th>
                            <th class="text-thead">Tên đơn vị</th>
                            <th class="text-thead">Mã trường</th>
                            <th class="text-thead">Tên trường</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(itemModal, index) in tableDataDetailModal"
                            :key="index"
                        >
                            <td class="text-tbody">
                                {{ index + 1 }}
                            </td>
                            <td class="text-tbody">
                                {{ itemModal.maPhong }}
                            </td>
                            <td class="text-tbody">
                                {{ itemModal.tenDonVi }}
                            </td>
                            <td class="text-tbody">
                                {{ itemModal.maTruongHoc }}
                            </td>
                            <td class="text-tbody">
                                {{ itemModal.tenTruong }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="margin-top: 20px"></div>
            <hr />
            <div class="layout-btn-detail">
                <CustomButton
                    label="Đóng"
                    type="info"
                    @click="closeModalDetail"
                    size="small"
                />
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ESelect from '@/components/ESelect.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import CustomButton from '@/components/CustomButton.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import { ESelectUnitType_MockData, ESelectGradeLevel_MockData } from '@/mock_data'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import { mapState } from 'vuex'
import Api from '@/constants/Api'
import sendRequest from '@/services'

export default {
    name: 'CauHinhDuyetDayDuLieuLenBo',
    components: {
        ESelect,
        CustomButton,
        CustomBreadcrumb,
        CustomPagination,
        chonSoLuongBanGhi
    },
    data() {
        return {
            isPhong: false,
            isTruong: false,

            fullscreenLoading: false,
            checkedPhongDuocDayLenBo: false,
            checkedTruongDuocDayLenBo: false,
            start: 0,
            total_rows: 0,
            currentPage: 1,
            limit: 25,
            soLuongBanGhiHienThi: 25,
            trangbatdau: false,

            resetESelectSchool: false,
            resetESelectSchoolModal: false,
            resetESelectUnitEducationModal: false,
            addNewModalVisible: false,
            detailModalVisible: false,
            request_Params: {
                start: 0,
                limit: 25
            },
            request_Header: {
                Authorization: ''
            },
            request_Data: {
                capHocs: [],
                start: 0,
                limit: 25,
                loaiDonVis: [],
                maDonVis: [],
                maTruongs: []
            },

            tableData: [],
            tableDataDetailModal: [],
            getDataESelect: {
                ESelectUnitType_MockData: ESelectUnitType_MockData, //loaiDonvi
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [] //truonghoc
            },

            selectedValue: {
                selectValueUnitType: [], //loaiDonvi
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [] //truonghoc
            },

            getDataESelectModal: {
                ESelectUnitTypeModal_MockData: ESelectUnitType_MockData, //loaiDonvi
                ESelectUnitEducationModal: [], //donvi
                ESelectGradeLevelModal_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchoolModal: [] //truonghoc
            },

            selectedValueModal: {
                selectValueUnitTypeModal: [], //loaiDonvi
                selectedValueUnitEducationModal: [], //donvi
                selectedValueGradeLevelModal: [], //caphoc
                selectedValueSchoolModal: [] //truonghoc
            }
        }
    },
    methods: {
        openModalAddNew() {
            this.addNewModalVisible = true
        },
        closeModalAddNew() {
            this.addNewModalVisible = false
        },
        closeModalDetail() {
            this.detailModalVisible = false
        },
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
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        handleResetESlectSchoolCompletedModal() {
            this.resetESelectSchoolModal = false
        },
        handleResetESlectUnitEducationCompletedModal() {
            this.resetESelectUnitEducationModal = false
        },

        async handleSearch() {
            try {
                const loaiDonvis = this.customhandleESelectedChange(
                    this.selectedValue.selectValueUnitType,
                    'selectedValueUnitType'
                )
                const maDonVis = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )

                const maTruongs = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )

                const capHocs = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )

                const start = this.start
                const limit = this.limit
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data,
                    capHocs: capHocs,
                    start: start,
                    limit: limit,
                    loaiDonVis: loaiDonvis,
                    maDonVis: maDonVis,
                    maTruongs: maTruongs
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.cauHinhDuyetDayDuLieuLenBo
                        .danhSachCauHinhDayDuLieuLenBo,
                    request_Data,
                    request_Header
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                if (response.rc == 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu',
                            type: 'success'
                        })
                    }, 1000)
                }
                if (response.rc == 2) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: response.rd,
                            type: 'warning'
                        })
                    }, 1000)
                }

                this.total_rows = response.total
                this.tableData = response.rows
            } catch (error) {
                console.log(error)
            }
        },
        async handleDelete(id) {
            try {
                const confirmResult = await this.$confirm(
                    'Bạn có chắc chắn muốn xóa không?',
                    'Xác nhận',
                    {
                        confirmButtonText: 'Đồng ý',
                        cancelButtonText: 'Hủy',
                        type: 'warning'
                    }
                ).catch(() => {
                    return false
                })

                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }

                if (confirmResult) {
                    const response = await sendRequest(
                        Api.ketChuyenDuLieuLenBo.cauHinhDuyetDayDuLieuLenBo.xoaDuLieu(
                            id
                        ),
                        null,
                        request_Header,
                        null
                    )
                    if (response.rc == 0) {
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        setTimeout(() => {
                            loading.close()
                            this.$message({
                                message: 'Xóa thành công',
                                type: 'success'
                            })
                            this.handleSearch()
                        }, 1000)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getDataTable() {
            try {
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data
                }
                const request_Params = {
                    start: this.start,
                    limit: this.limit
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.cauHinhDuyetDayDuLieuLenBo
                        .danhSachCauHinhDayDuLieuLenBo,
                    request_Data,
                    request_Header,
                    request_Params
                )
                if (response.rc == 0) {
                    this.tableData = response.rows
                    this.total_rows = response.total
                }
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
                    ...this.request_Header,
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
        async getDataESelectSchoolModal() {
            try {
                const maDonVis = this.customhandleESelectedChange(
                    this.selectedValueModal.selectedValueUnitEducationModal,
                    'selectedValueUnitEducationModal'
                )
                const capHocs = this.customhandleESelectedChange(
                    this.selectedValueModal.selectedValueGradeLevelModal,
                    'selectedValueGradeLevelModal'
                )
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }

                const request_Data = {
                    capHoc: capHocs,
                    maDonVi: maDonVis
                }
                const response = await sendRequest(
                    Api.internal_api.dm_School,
                    request_Data,
                    request_Header,
                    null
                )

                this.getDataESelectModal.ESelectSchoolModal = response.rows
            } catch (error) {
                console.log(error)
            }
        },
        async handleAddNew() {
            try {
                const maDonVis = this.customhandleESelectedChange(
                    this.selectedValueModal.selectedValueUnitEducationModal,
                    'selectedValueUnitEducationModal'
                )

                const maTruongs = this.customhandleESelectedChange(
                    this.selectedValueModal.selectedValueSchoolModal,
                    'selectedValueSchoolModal'
                )

                const phongDuocNopLenBo = this.checkedPhongDuocDayLenBo

                const truongDuocNopLenBo = this.checkedTruongDuocDayLenBo
                const phong = this.isPhong
                const truong = this.isTruong
                if (phong === false && truong === false) {
                    this.$message({
                        message: 'Vui lòng chọn loại dữ liệu',
                        type: 'warning'
                    })
                    return
                }
                if (maDonVis.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn Đơn vị quản lý',
                        type: 'warning'
                    })
                    return
                }
                if (maDonVis.length !== 0 && maTruongs.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn Trường học',
                        type: 'warning'
                    })
                    return
                }
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    maPhongs: maDonVis,
                    maTruongHocs: maTruongs,
                    phong: phong,
                    phongDuocNopLenBo: phongDuocNopLenBo,
                    truong: truong,
                    truongDuocNopLenBo: truongDuocNopLenBo
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.cauHinhDuyetDayDuLieuLenBo
                        .duyetDayDuLieu,
                    request_Data,
                    request_Header
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })

                if (response.rc == 304) {
                    this.$message({
                        message: response.rd,
                        type: 'warning'
                    })
                    setTimeout(() => {
                        loading.close()
                        this.detailModalVisible = true
                    }, 1000)
                    this.tableDataDetailModal = response.rows
                }
            } catch (error) {
                console.log(error)
            }
        },
        handleESelectChange(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitType':
                    this.selectedValue.selectValueUnitType = selectedOptions
                    break
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
            }
        },
        handleESelectChangeModal(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitTypeModal':
                    this.selectedValueModal.selectValueUnitTypeModal =
                        selectedOptions
                    if (selectedOptions.some((option) => option.value == '2')) {
                        this.isPhong = true
                    } else {
                        this.isPhong = false
                    }

                    // Kiểm tra nếu selectedOptions chứa phần tử có value là '3'
                    if (selectedOptions.some((option) => option.value == '3')) {
                        this.isTruong = true
                    } else {
                        this.isTruong = false
                    }

                    this.resetESelectUnitEducationModal = true
                    this.selectedValueModal.selectedValueUnitEducationModal = []
                    this.resetESelectSchoolModal = true
                    this.selectedValueModal.selectedValueSchoolModal = []

                    break
                case 'ESelectUnitEducationModal':
                    this.selectedValueModal.selectedValueUnitEducationModal =
                        selectedOptions

                    this.resetESelectSchoolModal = true
                    this.selectedValueModal.selectedValueSchoolModal = []
                    this.getDataESelectSchoolModal()

                    break
                case 'ESelectGradeLevelModal_MockData':
                    this.selectedValueModal.selectedValueGradeLevelModal =
                        selectedOptions

                    this.resetESelectSchoolModal = true
                    this.getDataESelectModal.ESelectSchoolModal = []
                    this.getDataESelectSchoolModal()

                    break
                case 'ESelectSchoolModal':
                    this.selectedValueModal.selectedValueSchoolModal =
                        selectedOptions
                    break
            }
        },

        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitType':
                case 'selectedValueUnitEducation':
                case 'selectedValueSchool':
                case 'selectedValueUnitTypeModal':
                case 'selectedValueUnitEducationModal':
                case 'selectedValueSchoolModal':
                    return options.map((option) => option.value)
                case 'selectedValueGradeLevel':
                case 'selectedValueGradeLevelModal':
                    return options
                        .map((option) => option.value)
                        .join('')
                        .toString()
                        .split('')
                        .map(Number)
                case 'selectedValueReportModal':
                    return options.map((option) => option.value).join('')
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
        // this.getDataESelectSchoolModal()
        this.getDataTable()
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
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
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
}
.table-bordered {
    background-color: #fff;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
    vertical-align: middle;
}
.table-hover tbody tr:hover {
    background-color: #f5f5f5;
}

.text-thead {
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
}
.text-tbody {
    font-size: 12px;
}
hr {
    border: 1px solid green;
}
.custom-table-detail {
    max-height: 800px;
    overflow-x: auto;
    overflow-y: auto;
}
.layout-btn-detail {
    display: flex;
    justify-content: flex-end;
}
.layout-btn-detail-modal {
    display: flex;
    justify-content: flex-end;
}
</style>
