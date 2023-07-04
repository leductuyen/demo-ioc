<template>
    <div>
        <CustomBreadcrumb
            :title="' KẾT CHUYỂN DỮ LIỆU LÊN BỘ'"
            content="MẬT KHẨU KẾT CHUYỂN"
        />
        <div class="content">
            <div class="row">
                <div class="col-5">
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
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenDonVi', 'maDonVi']"
                            :value="selectedValue.selectedValueUnitEducation"
                            @change="
                                handleESelectChange(
                                    'ESelectUnitEducation',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
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
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenTruongHoc', 'value']"
                            :value="selectedValue.selectedValueGradeLevel"
                            @change="
                                handleESelectChange(
                                    'ESelectGradeLevel_MockData',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-4">
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
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenTruongHoc', 'maTruongHoc']"
                            :value="selectedValue.selectedValueSchool"
                            @change="
                                handleESelectChange(
                                    'ESelectSchool_MockData',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
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
        <div class="layout-table">
            <div class="layout-header">
                <div>
                    <chonSoLuongBanGhi
                        @chonXongSoLuong="ChonSoLuongBanGhi($event)"
                    />
                </div>
                <div class="layout-btn">
                    <div>
                        <CustomButton
                            label="Thêm mới"
                            size="small"
                            type="primary"
                            @click="openModalAddNew"
                        />
                    </div>
                    <div style="margin-left: 10px">
                        <CustomButton
                            label="Import"
                            size="small"
                            type="success"
                            @click="openModalImport"
                        />
                    </div>
                </div>
            </div>

            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Tên đăng nhập</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Tỉnh thành</th>
                        <th class="text-thead">Tên đơn vị</th>
                        <th class="text-thead">Cấp học</th>
                        <th class="text-thead">Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ (currentPage - 1) * limit + index + 1 }}
                        </td>
                        <td class="text-tbody">{{ item.tenDangNhap }}</td>
                        <td class="text-tbody">{{ item.maTruong }}</td>
                        <td class="text-tbody">{{ item.tenTruong }}</td>
                        <td class="text-tbody">{{ item.tenTinhThanh }}</td>
                        <td class="text-tbody">{{ item.tenDonvi }}</td>
                        <td class="text-tbody">{{ getCapHoc(item.capHoc) }}</td>
                        <td>
                            <CustomButton
                                icon="el-icon-edit"
                                size="small"
                                type="warning"
                                label="Sửa"
                                @click="openModalEdit(item)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
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
                width="70%"
            >
                <span slot="title" class="custom-dialog-title">
                    THÊM MẬT KHẨU KẾT CHUYỂN DỮ LIỆU
                    <hr />
                </span>
                <div class="row">
                    <div class="col-5">
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
                                :multiple="false"
                                :collapse-tags="true"
                                :fields="['tenDonVi', 'maDonVi']"
                                :value="
                                    selectedValueModal.selectedValueUnitEducationModal
                                "
                                @change="
                                    handleESelectChangeModal(
                                        'ESelectUnitEducationModal',
                                        $event
                                    )
                                "
                            />
                        </div>
                    </div>
                    <div class="col-3">
                        <label>Chọn cấp học</label>
                        <div>
                            <ESelect
                                style="width: 100%"
                                no-match-text="Không tìm thấy bản ghi nào"
                                no-data-text="danh sách lựa chọn trống"
                                :clearable="true"
                                :disabled="false"
                                :data="
                                    getDataESelectModal.ESelectGradeLevelModal_MockData
                                "
                                :placeholder="'Chọn cấp học'"
                                :filterable="true"
                                :multiple="false"
                                :collapse-tags="true"
                                :fields="['tenTruongHoc', 'value']"
                                :value="
                                    selectedValueModal.selectedValueGradeLevelModal
                                "
                                @change="
                                    handleESelectChangeModal(
                                        'ESelectGradeLevelModal_MockData',
                                        $event
                                    )
                                "
                            />
                        </div>
                    </div>
                    <div class="col-4">
                        <label>Chọn trường học</label>
                        <div>
                            <ESelect
                                :reset="resetESelectSchoolModal"
                                @reset-completed="handleResetCompletedModal"
                                style="width: 100%"
                                no-match-text="Không tìm thấy bản ghi nào"
                                no-data-text="danh sách lựa chọn trống"
                                :clearable="true"
                                :disabled="false"
                                :data="getDataESelectModal.ESelectSchoolModal"
                                :placeholder="'Chọn trường học'"
                                :filterable="true"
                                :multiple="false"
                                :collapse-tags="true"
                                :fields="['tenTruongHoc', 'maTruongHoc']"
                                :value="
                                    selectedValueModal.selectedValueSchoolModal
                                "
                                @change="
                                    handleESelectChangeModal(
                                        'ESelectSchoolModal_MockData',
                                        $event
                                    )
                                "
                            />
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-5">
                        <el-input
                            placeholder="Tên đăng nhập"
                            v-model="inputUserName_addNew"
                            size="small"
                        ></el-input>
                    </div>
                    <div class="col-3">
                        <el-input
                            placeholder="Mật khẩu"
                            v-model="inputPassword_addNew"
                            size="small"
                            show-password
                        ></el-input>
                    </div>
                </div>
                <div style="margin-top: 30px"></div>
                <hr />
                <div class="layout-table-modal">
                    <CustomButton
                        label="Thêm mới"
                        size="small"
                        @click="handleAddNew"
                        type="primary"
                    />
                    <CustomButton
                        label="Đóng"
                        size="small"
                        @click="closeModalAddNew"
                        type="info"
                    />
                </div>
            </el-dialog>
            <!-- ************ Modal Sửa ************ -->
            <el-dialog
                :visible.sync="editModalVisible"
                @close="closeModalEdit"
                class="custom-dialog"
                width="50%"
            >
                <span slot="title" class="custom-dialog-title">
                    CHỈNH SỬA TÀI KHOẢN KẾT CHUYỂN LÊN BỘ
                    <hr />
                </span>

                <div class="row">
                    <div class="col-6">
                        <label>Trường học</label>
                        <el-input
                            :placeholder="dataModalEdit.tenTruong"
                            :disabled="true"
                            size="small"
                        >
                        </el-input>
                    </div>
                    <div class="col-6">
                        <label>Tên đăng nhập</label>
                        <el-input
                            placeholder="Tên đăng nhâpk"
                            v-model="inputUserName_edit"
                            size="small"
                        ></el-input>
                    </div>
                    <div class="col-6 mt-3">
                        <label>Mật khẩu</label>
                        <el-input
                            placeholder="Mật khẩu"
                            v-model="inputPassword_edit"
                            size="small"
                            show-password
                        ></el-input>
                    </div>
                </div>
                <div style="margin-top: 70px"></div>
                <hr />
                <div class="layout-table-modal">
                    <CustomButton
                        label="Sửa đổi"
                        size="small"
                        type="warning"
                        @click="handleEdit"
                    />
                    <CustomButton
                        label="Đóng"
                        size="small"
                        @click="closeModalEdit"
                        type="info"
                    />
                </div>
            </el-dialog>

            <!-- ************ Modal Import ************ -->
            <el-dialog
                :visible.sync="importModalVisible"
                @close="closeModalImport"
                class="custom-dialog"
                width="60%"
            >
                <span slot="title" class="custom-dialog-title">
                    IMPORT THÔNG TIN MẬT KHẨU KẾT CHUYỂN
                    <hr />
                </span>
                <span>
                    <div class="row align-items-center">
                        <div class="col-lg-3">
                            <label class="pull-right">Chọn File</label>
                        </div>
                        <div class="col-lg-9 d-flex">
                            <div>
                                <label for="customFileInput">
                                    <div class="layout-btn-file">
                                        <i class="el-icon-upload"></i>
                                        Chọn File
                                    </div>
                                </label>
                                <input
                                    style="display: none"
                                    id="customFileInput"
                                    type="file"
                                    ref="fileInput"
                                    @change="handleFileChange"
                                />
                            </div>
                            <div v-if="selectedFile" class="layout-btn-file">
                                <span>File đã chọn {{ selectedFile.name }}</span>
                            </div>
                        </div>
                    </div>
                </span>
                <span>
                    <div class="row mt-3">
                        <div class="col-lg-3">
                            <label class="pull-right">
                                Vui lòng chọn file mẫu
                            </label>
                        </div>
                        <div class="col-lg-9" style="">
                            <label>
                                <a
                                    tittle="download file template"
                                    href="https://apimoet.dtsgroup.com.vn/Template_Import_mat_khau_ket_chuyen_len_Bo.xlsx"
                                >
                                    <b>
                                        <i>File template mẫu.</i>
                                    </b>
                                </a>
                            </label>
                            <br />
                            <span>
                                <b>Ghi chú:</b>
                                <i>
                                    <span
                                        >Vui lòng lựa chọn tệp dạng *.xlsx
                                    </span>
                                </i>
                            </span>
                        </div>
                    </div>
                </span>
                <CustomButton label="Import" size="small" @click="handleImport" />
            </el-dialog>
        </div>
    </div>
</template>
<script>
import ESelect from '@/components/ESelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import { ESelectGradeLevel_MockData } from '@/mock_data'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { mapState } from 'vuex'

export default {
    name: 'MatKhauKetChuyen',
    components: {
        ESelect,
        CustomButton,
        CustomBreadcrumb,
        chonSoLuongBanGhi,
        CustomPagination
    },
    data() {
        return {
            selectedFile: null,
            resetESelectSchool: false,
            resetESelectSchoolModal: false,
            addNewModalVisible: false,
            editModalVisible: false,
            importModalVisible: false,
            dataModalEdit: {},

            start: 0,
            total_rows: 0,
            currentPage: 1,
            limit: 25,
            soLuongBanGhiHienThi: 25,
            trangbatdau: false,
            request_Params: {
                start: null,
                limit: null
            },
            tableData: [],
            request_Header: {
                Authorization: ''
            },
            request_Data: {
                capHoc: null,
                limit: 25,
                maDonVi: null,
                maTinhThanh: null,
                maTruongHoc: null,
                start: 0
            },
            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [] //truonghoc
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [] //truonghoc
            },
            getDataESelectModal: {
                ESelectUnitEducationModal: [], //donvi
                ESelectGradeLevelModal_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchoolModal: [] //truonghoc
            },

            selectedValueModal: {
                selectedValueUnitEducationModal: [], //donvi
                selectedValueGradeLevelModal: [], //caphoc
                selectedValueSchoolModal: [] //truonghoc
            },
            inputUserName_addNew: '',
            inputPassword_addNew: '',
            inputTruongHoc_edit: '',
            inputUserName_edit: '',
            inputPassword_edit: ''
        }
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0]
            if (file && file.name.endsWith('.xlsx')) {
                this.selectedFile = file
                console.log('Selected file:', file)
                console.log('File name:', file.name)
                console.log('File size:', file.size)
                console.log('File type:', file.type)
            } else {
                this.clearFile()
                // File không hợp lệ, xử lý tùy ý (ví dụ: hiển thị thông báo lỗi)
                this.selectedFile = null
                alert('Invalid file format. Please select an .xlsx file.')
            }
        },
        clearFile() {
            // Xóa giá trị file đã chọn
            this.selectedFile = null

            // Xóa giá trị input file để cho phép người dùng chọn lại file
            const fileInput = this.$refs.fileInput
            if (fileInput) {
                fileInput.value = ''
            }
        },
        openModalAddNew() {
            this.addNewModalVisible = true
        },

        closeModalAddNew() {
            this.addNewModalVisible = false
            this.inputPassword_addNew = ''
            this.inputUserName_addNew = ''
            this.selectedValueModal.selectedValueUnitEducationModal = []
            this.selectedValueModal.selectedValueGradeLevelModal = []
            this.selectedValueModal.selectedValueSchoolModal = []
        },
        openModalEdit(item) {
            this.dataModalEdit = item
            this.inputUserName_edit = item.tenDangNhap
            this.inputPassword_edit = item.matKhau

            this.editModalVisible = true
        },
        closeModalEdit() {
            this.editModalVisible = false
        },
        openModalImport() {
            this.importModalVisible = true
        },
        closeModalImport() {
            this.importModalVisible = false
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
        getCapHoc(loai) {
            var res = parseInt(loai)
            switch (res) {
                case 1:
                    res = 'Tiểu học'
                    break
                case 2:
                    res = 'THCS'
                    break
                case 3:
                    res = 'THPT'
                    break
                case 4:
                    res = 'Nhà trẻ'
                    break
                case 5:
                    res = 'Mẫu giáo'
                    break
                case 12:
                    res = 'PTCS'
                    break
                case 1245:
                    res = 'MN-PTCS'
                    break
                case 145:
                    res = 'MN-TH'
                    break
                case 23:
                    res = 'Trung học'
                    break
                case 123:
                    res = 'Phổ thông'
                    break
                case 12345:
                    res = 'MN-PT'
                    break
                case 45:
                    res = 'Mầm non'
                    break
                case 6:
                    res = 'GDTX'
                    break
                default:
                    res = loai
            }
            return res
        },
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        handleResetCompletedModal() {
            this.resetESelectSchoolModal = false
        },
        handleESelectChange(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitEducation':
                    this.selectedValue.selectedValueUnitEducation =
                        selectedOptions
                    console.log(this.selectedValue.selectedValueUnitEducation)
                    this.resetESelectSchool = true
                    this.selectedValue.selectedValueSchool = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectGradeLevel_MockData':
                    this.selectedValue.selectedValueGradeLevel = selectedOptions
                    console.log(this.selectedValue.selectedValueGradeLevel)
                    this.resetESelectSchool = true
                    this.selectedValue.selectedValueSchool = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectSchool_MockData':
                    this.selectedValue.selectedValueSchool = selectedOptions
                    break
            }
        },
        handleESelectChangeModal(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitEducationModal':
                    this.selectedValueModal.selectedValueUnitEducationModal =
                        selectedOptions

                    this.resetESelectSchoolModal = true
                    this.selectedValueModal.selectedValueSchoolModal = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectGradeLevelModal_MockData':
                    this.selectedValueModal.selectedValueGradeLevelModal =
                        selectedOptions

                    this.resetESelectSchoolModal = true
                    this.selectedValueModal.selectedValueSchoolModal = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectSchoolModal_MockData':
                    this.selectedValueModal.selectedValueSchoolModal =
                        selectedOptions

                    break
            }
        },
        async handleSearch() {
            try {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const maDonVi = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                ).join('')

                const maTruongHoc = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                ).join('')

                const capHoc = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                ).join('')

                const maTinhThanh = this.authUser.province
                const start = this.start
                const limit = this.limit
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data,
                    start: start,
                    limit: limit,
                    maTinhThanh: maTinhThanh,
                    maDonVi: maDonVi,
                    maTruongHoc: maTruongHoc,
                    capHoc: capHoc
                }

                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.matKhauKetChuyen
                        .danhSachMatKetChuyen,
                    request_Data,
                    request_Header,
                    null
                )
                if (response.code == 200) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu',
                            type: 'success'
                        })
                    }, 1000)
                    this.tableData = response.rows
                    this.total_rows = response.total
                } else {
                    loading.close()
                    this.$message({
                        message: response.message,
                        type: 'error'
                    })
                }

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async handleAddNew() {
            const maTruong = this.customhandleESelectedChange(
                this.selectedValueModal.selectedValueSchoolModal,
                'selectedValueSchoolModal'
            ).join('')
            if (maTruong.length === 0) {
                this.$message({
                    message: 'Vui lòng chọn Trường học',
                    type: 'error'
                })
                return
            }
            const userName = this.inputUserName_addNew
            const passWord = this.inputPassword_addNew
            const request_Header = {
                token: this.authToken
            }

            const request_Data = {
                maTruong: maTruong,
                matKhau: passWord,
                tenDangNhap: userName
            }
            const response = await sendRequest(
                Api.ketChuyenDuLieuLenBo.matKhauKetChuyen.themMoiMatKhauKetChuyen,
                request_Data,
                request_Header,
                null
            )
            const loading = this.$loading({
                lock: true,
                text: 'Đang tổng hợp',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            if (response.code == 200) {
                setTimeout(() => {
                    loading.close()
                    this.$message({
                        message: 'Thêm mới thành công',
                        type: 'success'
                    })
                }, 1000)
                this.handleSearch()
                this.addNewModalVisible = false
                this.inputUserName_addNew = ''
                this.inputPassword_addNew = ''
            } else {
                setTimeout(() => {
                    loading.close()
                    this.$message({
                        message: response.message,
                        type: 'error'
                    })
                }, 1000)
            }
        },
        async handleEdit() {
            try {
                const maTruong = this.dataModalEdit.maTruong
                const userName = this.inputUserName_edit
                const passWord = this.inputPassword_edit
                const request_Header = {
                    token: this.authToken
                }

                const request_Data = {
                    maTruong: maTruong,
                    matKhauKetChuyen: passWord,
                    tenDangNhap: userName
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.matKhauKetChuyen
                        .editMatKhauKetChuyen,
                    request_Data,
                    request_Header,
                    null
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Đang tổng hợp',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                if (response.statusResponse == 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Thay đổi thành công',
                            type: 'success'
                        })
                    }, 1000)
                    this.editModalVisible = false
                    this.handleSearch()
                } else {
                    this.$message({
                        message: 'Thay đổi thất bại',
                        type: 'error'
                    })
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async handleImport() {
            try {
                const request_Header = {
                    'Content-Type': 'multipart/form-data',
                    token: this.authToken
                }
                const formData = new FormData()
                formData.append('file', this.selectedFile)

                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.matKhauKetChuyen.importFile,
                    formData,
                    request_Header,
                    null
                )
                console.log(response)
                console.log(this.selectedFile)
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
        async getDataESelectSchoolModal() {
            try {
                const maDonViModal = this.customhandleESelectedChange(
                    this.selectedValueModal.selectedValueUnitEducationModal,
                    'selectedValueUnitEducationModal'
                )

                const capHocModal = this.customhandleESelectedChange(
                    this.selectedValueModal.selectedValueGradeLevelModal,
                    'selectedValueGradeLevelModal'
                )

                const request_Header = {
                    token: this.authToken
                }

                const request_Data = {
                    capHoc: capHocModal,
                    maDonVi: maDonViModal
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
        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
                case 'selectedValueSchool':
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
        this.getDataESelectSchoolModal()
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
.layout-header {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}
.layout-btn {
    display: flex;
}
hr {
    border: 1px solid gray;
}
.layout-table-modal {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
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
}
.text-tbody {
    font-size: 13px;
}

.title-file {
    font-size: 14px;
    color: black;
}
.layout-btn-file {
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    background-color: #87cefa;
    border-radius: 4px;
}
</style>
