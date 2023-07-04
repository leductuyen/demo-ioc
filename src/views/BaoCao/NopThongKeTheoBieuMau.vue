<template>
    <div>
        <CustomBreadcrumb
            :title="'BÁO CÁO'"
            :content="'NỘP THỐNG KÊ THEO BIỂU MẪU'"
        />
        <div class="content">
            <div class="row">
                <div class="col-3">
                    <label>Tên báo cáo</label>
                    <div>
                        <el-input
                            placeholder="Nhập tên báo cáo ..."
                            v-model="formValue"
                            size="small"
                        ></el-input>
                    </div>
                </div>

                <div class="col-3">
                    <label>Loại báo cáo</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="ESelectReport_MockData"
                            :placeholder="'Chọn loại báo cáo'"
                            :filterable="true"
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenBaoCao', 'value']"
                            :value="selectedValueReport"
                            v-model="selectedValueReport"
                            @change="
                                handleESelectChangeOutModal(selectedValueReport)
                            "
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
            <div class="layout-table-btn">
                <CustomButton
                    label="Tùy chọn hiển thị"
                    size="small"
                    type="primary"
                    @click="handleDisplayView()"
                />
                <CustomButton
                    label="Thêm yêu cầu"
                    type="success"
                    size="small"
                    @click="OpenModalThemYeuCau"
                />
            </div>

            <div class="layout-checkbox" v-if="showCheckboxList">
                <input v-model="showCheckbox_TenBaoCao" type="checkbox" />
                <span>Tên báo cáo</span>

                <input v-model="showCheckbox_TrangThai" type="checkbox" />
                <span>Trạng thái</span>

                <input v-model="showCheckbox_DonViYeuCau" type="checkbox" />
                <span>Đơn vị yêu cầu</span>

                <input v-model="showCheckbox_TruongHocNop" type="checkbox" />
                <span>Trường học nộp</span>

                <input v-model="showCheckbox_FileBieuMau" type="checkbox" />
                <span>File biểu mẫu</span>

                <input v-model="showCheckbox_NgayBatDau" type="checkbox" />
                <span>Ngày bắt đầu</span>

                <input v-model="showCheckbox_NgayKetThuc" type="checkbox" />
                <span>Ngày kết thúc</span>

                <input v-model="showCheckbox_SoTruongDaNop" type="checkbox" />
                <span>Số trường đã nộp</span>
            </div>
            <div class="report-content">
                <table class="table table-bordered table-hover centered-table">
                    <thead>
                        <tr>
                            <th class="text-thead">STT</th>
                            <th class="text-thead" v-if="showCheckbox_TenBaoCao">
                                Tên báo cáo
                            </th>
                            <th
                                class="text-thead"
                                v-if="showCheckbox_DonViYeuCau"
                            >
                                Đơn vị yêu cầu
                            </th>
                            <th
                                class="text-thead"
                                v-if="showCheckbox_FileBieuMau"
                            >
                                File biểu mẫu
                            </th>
                            <th class="text-thead" v-if="showCheckbox_NgayBatDau">
                                Bắt đầu
                            </th>
                            <th
                                class="text-thead"
                                v-if="showCheckbox_NgayKetThuc"
                            >
                                Kết thúc
                            </th>
                            <th class="text-thead" v-if="showCheckbox_TrangThai">
                                Trạng thái
                            </th>
                            <th
                                v-if="showCheckbox_TruongHocNop"
                                class="text-thead"
                            >
                                Trường học nộp
                            </th>
                            <th
                                class="text-thead"
                                v-if="showCheckbox_SoTruongDaNop"
                            >
                                Số trường đã nộp
                            </th>
                            <th class="text-thead">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in tableData" :key="index">
                            <td class="text-tbody">{{ index + 1 }}</td>
                            <td class="text-tbody" v-if="showCheckbox_TenBaoCao">
                                {{ data.tenBaoCao }}
                            </td>
                            <td v-if="showCheckbox_DonViYeuCau">
                                Đơn vị yêu cầu
                            </td>
                            <td
                                class="text-tbody"
                                v-if="showCheckbox_FileBieuMau"
                            >
                                <span><i class="el-icon-upload2"></i> </span>
                                <span><i class="el-icon-download"></i></span>
                            </td>
                            <td v-if="showCheckbox_NgayBatDau">Ngày bắt đầu</td>
                            <td v-if="showCheckbox_NgayKetThuc">Ngày kết thúc</td>
                            <td class="text-tbody" v-if="showCheckbox_TrangThai">
                                <span v-if="data.trangThai === 2">
                                    <CustomButton
                                        label="Ngừng hoạt động"
                                        size="small"
                                        type="danger"
                                    />
                                </span>
                                <span v-if="data.trangThai === 1">
                                    <CustomButton
                                        label="Đang hoạt động"
                                        size="small"
                                        type="success"
                                    />
                                </span>
                            </td>
                            <td
                                v-if="showCheckbox_TruongHocNop"
                                class="text-tbody"
                            >
                                <CustomButton
                                    label="Chi tiết"
                                    size="small"
                                    type="primary"
                                    @click="handleDetail(data.truongHocNopList)"
                                />
                            </td>
                            <td
                                class="text-tbody"
                                v-if="showCheckbox_SoTruongDaNop"
                            >
                                {{ data.countSchoolDone }} /
                                {{ data.countSchoolTotal }}
                            </td>
                            <td class="text-tbody">
                                <el-dropdown>
                                    <el-button size="small" type="info">
                                        Thao tác
                                        <i
                                            class="el-icon-arrow-down el-icon--right"
                                        >
                                        </i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>
                                            <CustomButton
                                                label="Tổng hợp"
                                                size="small"
                                                type="text"
                                                icon="el-icon-download"
                                                @click="handleSynthetic"
                                            />
                                        </el-dropdown-item>
                                        <el-dropdown-item
                                            v-if="data.trangThai === 1"
                                        >
                                            <CustomButton
                                                label="Khóa"
                                                size="small"
                                                type="text"
                                                icon="el-icon-lock"
                                                @click="handleLockUp(data.id)"
                                            />
                                        </el-dropdown-item>
                                        <el-dropdown-item
                                            v-if="data.trangThai === 2"
                                        >
                                            <CustomButton
                                                label="Mở Khóa"
                                                size="small"
                                                type="text"
                                                icon="el-icon-unlock"
                                                @click="handleUnLock(data.id)"
                                            />
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <CustomButton
                                                label="Chỉnh sửa"
                                                size="small"
                                                type="text"
                                                icon="el-icon-edit"
                                                @click="
                                                    handleOpenModalChinhsua(data)
                                                "
                                            />
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <CustomButton
                                                label="Xóa"
                                                size="small"
                                                type="text"
                                                icon="el-icon-delete"
                                                v-loading.fullscreen.lock="
                                                    fullscreenLoading
                                                "
                                                @click="handleDelete(data.id)"
                                            />
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- ************ Modal Add Request ************ -->
        <el-dialog
            :visible.sync="themYeuCauModalVisible"
            width="60%"
            @close="closeModalThemYeuCau"
            class="custom-dialog"
            :fullscreen="true"
        >
            <span slot="title" class="custom-dialog-title">
                Thêm yêu cầu mới
            </span>
            <hr />

            <div class="row mt-30">
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
                <div class="col-4">
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
            <div class="row">
                <div class="col-3">
                    <label>Tên báo cáo</label>
                    <div>
                        <el-input
                            placeholder="Nhập tên báo cáo ..."
                            v-model="selectedValue.selectedValueInput"
                            size="small"
                        ></el-input>
                    </div>
                </div>

                <div class="col-3">
                    <label>Loại báo cáo</label>
                    <div>
                        <ESelect
                            :reset="resetESelectSchool"
                            @reset-completed="handleResetCompleted"
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect.ESelectReportModal_MockData"
                            :placeholder="'Chọn loại báo cáo'"
                            :filterable="true"
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenBaoCao', 'value']"
                            :value="selectedValue.selectedValueReportModal"
                            @change="
                                handleESelectChange('ESelectReportModal', $event)
                            "
                        />
                    </div>
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
            <CustomButton
                label="Thêm mới"
                size="small"
                type="primary"
                @click="handleAddRequest"
            />
        </el-dialog>

        <!-- ************ Modal Add File ************ -->
        <el-dialog
            :visible.sync="themFileBaoCaoModalVisible"
            @close="closeModalThemFileBaoCao"
            class="custom-dialog"
            :fullscreen="true"
        >
            {{ dataModalThemFileBaoCao.tenBaoCao }}
            <div class="col-md-12">
                <div class="row" style="margin: 0">
                    <div class="col-md-12">
                        <label
                            class="btn btn-default button-file btn-file"
                            tabindex="0"
                            id="lblFile"
                        >
                            <i class="fa fa-cloud-upload"></i>
                            Chọn File (<span style="color: red">*</span>)
                            <div v-if="!tenFile">
                                <small class="text-primary">
                                    <em>Tổng dung lượng không quá 10MB</em>
                                </small>
                                <br />
                                <small class="text-secondary">
                                    <em>Định dạng file hợp lệ: *.xlsx </em>
                                </small>
                            </div>
                            <div v-if="tenFile">
                                <small>
                                    <em
                                        >File đã chọn:
                                        <b>{{ tenFile }}</b>
                                    </em>
                                </small>
                                <br />
                            </div>
                            <input
                                ref="file_upload"
                                multiple="false"
                                name="file"
                                style="display: none"
                                type="file"
                                @change="onFileChange"
                                aria-invalid="false"
                            />
                        </label>
                    </div>
                </div>
            </div>
            <CustomButton
                label="Thêm File mới"
                size="small"
                @click="handleAddFile(dataModalThemFileBaoCao.id)"
                type="primary"
            />
        </el-dialog>

        <!-- ************ Modal Xem chi tiết ************ -->
        <el-dialog
            :visible.sync="xemChitietModalVisible"
            width="80%"
            @close="closeModalXemchitiet"
            class="custom-dialog"
            title="Chi tiết"
        >
            <hr />
            <div>
                <nav>
                    <div class="nav nav-tabs">
                        <a class="nav-item nav-link custom-nav">
                            Trường học được yêu cầu
                        </a>
                    </div>
                </nav>
            </div>
            <div class="report-content">
                <table class="table table-bordered table-hover centered-table">
                    <thead>
                        <tr>
                            <th class="text-thead">STT</th>

                            <th class="text-thead">Tên trường</th>
                            <th class="text-thead">Mã trường</th>
                            <th class="text-thead">Trạng thái nộp</th>
                            <th class="text-thead">File đã nộp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in dataModalXemChitiet"
                            :key="index"
                        >
                            <td class="text-tbody">{{ index + 1 }}</td>
                            <td class="text-tbody-span">
                                {{ item.tenTruongHoc }}
                            </td>
                            <td class="text-tbody">{{ item.maTruongHoc }}</td>
                            <th class="text-thead">
                                <span v-if="item.trangThai === 0">Chưa nộp</span>
                                <span v-if="item.trangThai === 1">Đã nộp</span>
                            </th>
                            <th class="text-thead">{{ item.ngayNopDl }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="margin-top-100"></div>
            <hr />
            <div class="layout-btn-xemchitiet">
                <CustomButton
                    label="Đóng"
                    size="small"
                    type="info"
                    @click="closeModalXemchitiet"
                />
            </div>
        </el-dialog>

        <!-- ************ Modal Chỉnh sửa ************ -->
        <el-dialog
            :visible.sync="chinhSuaModalVisible"
            :fullscreen="true"
            @close="closeModalChinhsua"
            class="custom-dialog"
        >
            <span slot="title" class="custom-dialog-title">
                CHỈNH SỬA YÊU CẦU NỘP THỐNG KÊ THEO BIỂU MẪU
            </span>
            <hr />
            <div class="row mt-30">
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
                            :value="
                                selectedValue_Update.selectedValueUnitEducation_Update
                            "
                            @change="
                                handleESelectChange_Update(
                                    'ESelectUnitEducation_Update',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-4">
                    <label>Cấp học</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="
                                getDataESelect_Update.ESelectGradeLevel_Update_MockData
                            "
                            :placeholder="'Chọn cấp học'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenTruongHoc', 'value']"
                            :value="
                                selectedValue_Update.selectedValueGradeLevel_Update
                            "
                            @change="
                                handleESelectChange_Update(
                                    'ESelectGradeLevel_Update_MockData',
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
                            :reset="resetESelectSchool_Update"
                            @reset-completed="handleResetCompleted_Update"
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect_Update.ESelectSchool_Update"
                            :placeholder="'Chọn trường học'"
                            :filterable="true"
                            :multiple="true"
                            :collapse-tags="true"
                            :fields="['tenTruongHoc', 'maTruongHoc']"
                            :value="
                                selectedValue_Update.selectedValueSchool_Update
                            "
                            @change="
                                handleESelectChange_Update(
                                    'ESelectSchool_Update',
                                    ...$event
                                )
                            "
                        />
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-4">
                    <label>Tên báo cáo</label>
                    <div>
                        <el-input
                            placeholder="Nhập tên báo cáo ..."
                            v-model="
                                selectedValue_Update.selectedValueInput_Update
                            "
                            size="small"
                        ></el-input>
                    </div>
                </div>

                <div class="col-4">
                    <label>Loại báo cáo</label>
                    <div>
                        <ESelect
                            :reset="resetESelectSchool"
                            @reset-completed="handleResetCompleted"
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="
                                getDataESelect_Update.ESelectReportModal_Update_MockData
                            "
                            :placeholder="'Chọn loại báo cáo'"
                            :filterable="true"
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenBaoCao', 'value']"
                            :value="selectedValue.selectedValueReportModal"
                            @change="
                                handleESelectChange_Update(
                                    'ESelectReportModal_Update',
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
                            v-model="
                                selectedValue_Update.selectedValueStartDate_Update
                            "
                            class="custom-date-picker"
                        ></date-picker>
                        <div class="input-group-addon">đến</div>
                        <date-picker
                            :config="configDatePicker"
                            placeholder="Ngày kết thúc"
                            v-model="
                                selectedValue_Update.selectedValueEndDate_Update
                            "
                            class="custom-date-picker"
                        ></date-picker>
                    </div>
                </div>
            </div>
            <div class="margin-top-100"></div>
            <hr />
            <div class="layout-btn-xemchitiet">
                <CustomButton
                    label="Đóng"
                    size="small"
                    type="info"
                    @click="closeModalChinhsua"
                />
                <CustomButton
                    label="Chỉnh sửa"
                    size="small"
                    type="warning"
                    @click="handleUpdate"
                />
            </div>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import ESelect from '@/components/ESelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import { ESelectReport_MockData } from '@/mock_data'
import { mapState } from 'vuex'
import sendRequest from '@/services'
import Api from '@/constants/Api'
import { ESelectGradeLevel_MockData } from '@/mock_data'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
export default {
    name: 'NopThongKeTheoBieuMau',
    components: { CustomButton, ESelect, CustomBreadcrumb, datePicker },
    data() {
        return {
            fullscreenLoading: false,
            selected_file: null,
            tenFile: '',
            showCheckbox_TenBaoCao: true,
            showCheckbox_TrangThai: true,
            showCheckbox_DonViYeuCau: false,
            showCheckbox_TruongHocNop: true,
            showCheckbox_FileBieuMau: true,
            showCheckbox_NgayBatDau: false,
            showCheckbox_NgayKetThuc: false,
            showCheckbox_SoTruongDaNop: true,
            configDatePicker: {
                format: 'DD/MM/YYYY HH:mm:ss',
                useCurrent: false,
                showTodayButton: true,
                locale: 'vi'
            },

            resetESelectSchool: false,
            resetESelectSchool_Update: false,
            themYeuCauModalVisible: false,
            themFileBaoCaoModalVisible: false,
            xemChitietModalVisible: false,
            chinhSuaModalVisible: false,

            idModalUpdate: null,

            dataModalXemChitiet: [],
            dataModalThemFileBaoCao: {},
            request_Params: {
                start: 0,
                limit: 25
            },
            request_Header: {
                Authorization: ''
            },
            request_Data: {
                loaiBaoCao: null,
                tenBaoCao: null
            },
            checkList: [], // Giá trị được chọn của checkbox
            showCheckboxList: false, // Trạng thái hiển thị checkbox

            tableData: [],
            formValue: '', // value input
            ESelectReport_MockData: ESelectReport_MockData, // data select
            selectedValueReport: [], //value select

            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [], //truonghoc
                //input
                ESelectReportModal_MockData: ESelectReport_MockData
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [], //truonghoc
                selectedValueInput: '',
                selectedValueReportModal: [],
                selectedValueStartDate: '', //ngaybatdau,
                selectedValueEndDate: '' //ngayketthuc
            },

            getDataESelect_Update: {
                ESelectUnitEducation_Update: [], //donvi
                ESelectGradeLevel_Update_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool_Update: [], //truonghoc
                //input
                ESelectReportModal_Update_MockData: ESelectReport_MockData
            },

            selectedValue_Update: {
                selectedValueUnitEducation_Update: [], //donvi
                selectedValueGradeLevel_Update: [], //caphoc
                selectedValueSchool_Update: [], //truonghoc
                selectedValueInput_Update: '',
                selectedValueReportModal_Update: [],
                selectedValueStartDate_Update: '', //ngaybatdau,
                selectedValueEndDate_Update: '' //ngayketthuc
            }
        }
    },
    methods: {
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        handleResetCompleted_Update() {
            this.resetESelectSchool_Update = false
        },
        handleDisplayView() {
            this.showCheckboxList = !this.showCheckboxList // Hiển thị checkbox khi click vào nút
        },
        handleESelectChangeOutModal(options) {
            this.selectedValueReport = options.value
        },
        OpenModalThemYeuCau() {
            this.themYeuCauModalVisible = true
        },
        closeModalThemFileBaoCao() {
            this.themFileBaoCaoModalVisible = false
        },
        closeModalThemYeuCau() {
            this.themYeuCauModalVisible = false
        },
        closeModalXemchitiet() {
            this.xemChitietModalVisible = false
        },
        closeModalChinhsua() {
            this.chinhSuaModalVisible = false
        },
        handleOpenModalChinhsua(data) {
            this.idModalUpdate = data.id
            const modifiedData_ChonDonVi = data.donViNopList.map((item) => ({
                value: item.maDonVi,
                title: item.tenDonVi
            }))
            const modifiedData_ChonTruongHoc = data.truongHocNopList.map(
                (item) => ({
                    value: item.maTruongHoc,
                    title: item.tenTruongHoc
                })
            )

            this.selectedValue_Update.selectedValueUnitEducation_Update =
                modifiedData_ChonDonVi
            this.selectedValue_Update.selectedValueSchool_Update =
                modifiedData_ChonTruongHoc

            this.selectedValue_Update.selectedValueInput_Update = data.tenBaoCao
            const createSelectedValueGradeLevel = (capHoc) => {
                const modifiedGradeLevelData = ESelectGradeLevel_MockData.map(
                    (item) => {
                        if (item.value === capHoc) {
                            return { value: capHoc }
                        }
                        return item
                    }
                )

                return modifiedGradeLevelData
            }

            const selectedValueGradeLevel_Update = createSelectedValueGradeLevel(
                data.capHoc
            )
            console.log(selectedValueGradeLevel_Update)
            this.selectedValue_Update.selectedValueGradeLevel_Update =
                selectedValueGradeLevel_Update
            // Chuyển đổi ngày bắt đầu thành đối tượng moment
            const startDate = moment(data.ngayApDung, 'DD/MM/YYYY')
            const endDate = moment(data.ngayKetThuc, 'DD/MM/YYYY')

            const formattedStartDate = startDate.format('DD/MM/YYYY HH:mm:ss')
            const formattedEndDate = endDate.format('DD/MM/YYYY HH:mm:ss')

            this.selectedValue_Update.selectedValueStartDate_Update =
                formattedStartDate
            this.selectedValue_Update.selectedValueEndDate_Update =
                formattedEndDate

            this.chinhSuaModalVisible = true
        },
        async handleUpdate() {
            try {
                const id = this.idModalUpdate
                const donViNopList = this.customhandleESelectedChange(
                    this.selectedValue_Update.selectedValueUnitEducation_Update,
                    'selectedValueUnitEducation_Update'
                )
                const capHocNopList = this.customhandleESelectedChange(
                    this.selectedValue_Update.selectedValueGradeLevel_Update,
                    'selectedValueGradeLevel_Update'
                )
                const maTruongHocList = this.customhandleESelectedChange(
                    this.selectedValue_Update.selectedValueSchool_Update,
                    'selectedValueSchool_Update'
                )
                const loaiBaoCao = this.customhandleESelectedChange(
                    this.selectedValue_Update.selectedValueReportModal_Update,
                    'selectedValueReportModal_Update'
                )
                const tenBaoCao =
                    this.selectedValue_Update.selectedValueInput_Update
                const ngayApDung =
                    this.selectedValue_Update.selectedValueStartDate_Update
                const ngayKetThuc =
                    this.selectedValue_Update.selectedValueEndDate_Update
                await this.$confirm(
                    'Bạn có chắc chắn muốn Chỉnh sửa không?',
                    'Xác nhận',
                    {
                        confirmButtonText: 'Đồng ý',
                        cancelButtonText: 'Hủy',
                        type: 'warning'
                    }
                )
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }
                const request_Data = {
                    id: id,
                    capHocNopList: capHocNopList,
                    donViNopList: donViNopList,
                    loaiBaoCao: loaiBaoCao,
                    maTruongHocList: maTruongHocList,
                    ngayApDung: ngayApDung,
                    ngayKetThuc: ngayKetThuc,
                    tenBaoCao: tenBaoCao
                }
                const response = await sendRequest(
                    Api.baoCao.nopThongKeTheoBieuMau.updateNopBieuMau,
                    request_Data,
                    request_Header
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
                            message: 'Chỉnh sửa dữ liệu thành công',
                            type: 'success'
                        })
                    }, 1000)

                    this.getDataTable()
                    this.chinhSuaModalVisible = false
                } else {
                    this.$message({
                        message: 'Chỉnh sửa không hợp lệ',
                        type: 'warning'
                    })
                }

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },

        // xử lí việc mở khóa, khóa, xóa
        async handleAction(id, confirmMessage, successMessage, type) {
            try {
                await this.$confirm(confirmMessage, 'Xác nhận', {
                    confirmButtonText: 'Đồng ý',
                    cancelButtonText: 'Hủy',
                    type: 'warning'
                })

                const request_Header = {
                    token: this.authToken
                }

                const request_Data = {
                    id: id,
                    type: type
                }

                const response = await sendRequest(
                    Api.baoCao.nopThongKeTheoBieuMau.thaoTacDuLieu,
                    request_Data,
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
                            message: successMessage,
                            type: 'success'
                        })
                    }, 1000)

                    this.getDataTable()
                }

                console.log(response)
                console.log(id)
            } catch (error) {
                console.log(error)
            }
        },
        handleSynthetic() {
            console.log('Tong hop')
        },
        async handleLockUp(id) {
            const confirmMessage = 'Bạn có chắc chắn muốn Khóa không?'
            const successMessage = 'Khóa thành công'
            const type = 2

            await this.handleAction(id, confirmMessage, successMessage, type)
        },

        async handleUnLock(id) {
            const confirmMessage = 'Bạn có chắc chắn muốn Mở Khóa không?'
            const successMessage = 'Mở Khóa thành công'
            const type = 3

            await this.handleAction(id, confirmMessage, successMessage, type)
        },

        async handleDelete(id) {
            const confirmMessage = 'Bạn có chắc chắn muốn Xóa không?'
            const successMessage = 'Xóa thành công'
            const type = 1

            await this.handleAction(id, confirmMessage, successMessage, type)
        },

        async handleAddRequest() {
            try {
                const donViNopList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )
                const capHocNopList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const maTruongHocList = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )
                const loaiBaoCao = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueReportModal,
                    'selectedValueReportModal'
                )

                const ngayApDung = this.selectedValue.selectedValueStartDate
                const ngayKetThuc = this.selectedValue.selectedValueEndDate
                const tenBaoCao = this.selectedValue.selectedValueInput

                const conditionsValidateError = [
                    [donViNopList.length === 0, 'Vui lòng bổ sung đơn vị'],
                    [capHocNopList.length === 0, 'Vui lòng bổ sung cấp học'],
                    [loaiBaoCao.length === 0, 'Vui lòng bổ sung loại báo cáo'],
                    [tenBaoCao === '', 'Vui lòng bổ sung tên báo cáo'],
                    [ngayApDung === '', 'Vui lòng bổ sung Ngày bắt đầu'],
                    [ngayKetThuc === '', 'Vui lòng bổ sung Ngày kết thúc']
                ]

                for (const [condition, message] of conditionsValidateError) {
                    if (condition) {
                        this.$message.warning(message)
                        return
                    }
                }
                await this.$confirm(
                    'Bạn có chắc chắn muốn thêm mới không?',
                    'Xác nhận',
                    {
                        confirmButtonText: 'Đồng ý',
                        cancelButtonText: 'Hủy',
                        type: 'warning'
                    }
                )
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }
                const request_Data = {
                    capHocNopList: capHocNopList,
                    donViNopList: donViNopList,
                    loaiBaoCao: loaiBaoCao,
                    maTruongHocList: maTruongHocList,
                    ngayApDung: ngayApDung,
                    ngayKetThuc: ngayKetThuc,
                    tenBaoCao: tenBaoCao
                }
                const response = await sendRequest(
                    Api.baoCao.nopThongKeTheoBieuMau.themMoiBieuMau,
                    request_Data,
                    request_Header,
                    null
                )
                if (response.rc == 0) {
                    this.$message({
                        message: 'Thêm mới thành công',
                        type: 'success'
                    })
                    this.themFileBaoCaoModalVisible = true
                    this.dataModalThemFileBaoCao = response.item
                    console.log(this.dataModalThemFileBaoCao)
                } else {
                    this.$message.error('Thêm mới thất bại')
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async handleAddFile(id) {
            const selected_file = this.selected_file
            if (!selected_file) {
                this.$message({
                    message: 'File chưa chọn',
                    type: 'warning'
                })
                return
            }
            console.log('id', id)
            console.log('file', selected_file)
            const userId = this.authUser.username
            console.log('userId', userId)
            const roleId = this.authUser.role
            console.log('roleId', roleId)
            const maDonVi = this.authUser.ma_don_vi
            console.log('maDonVi', maDonVi)
        },
        onFileChange(e) {
            console.log('chọn file')
            const files = e.target.files
            this.tenFile = ''

            this.selected_file = files[0]

            if (files && files[0]) {
                this.file_name = e.target.files[0].name
                this.tenFile = this.file_name
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
                this.getDataESelect_Update.ESelectSchool_Update = response.rows
            } catch (error) {
                console.log(error)
            }
        },
        async handleSearch() {
            try {
                const tenBaoCao = this.formValue
                console.log(tenBaoCao)
                const loaiBaoCao = this.selectedValueReport
                console.log(loaiBaoCao)
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }
                const request_Params = {
                    ...this.request_Params,
                    start: 0,
                    limit: 25
                }
                const request_Data = {
                    ...this.request_Data,
                    tenBaoCao: tenBaoCao,
                    loaiBaoCao: loaiBaoCao
                }
                const response = await sendRequest(
                    Api.baoCao.nopThongKeTheoBieuMau.danhSachBieuMau,
                    request_Data,
                    request_Header,
                    request_Params
                )

                if (response.rc == 0) {
                    this.$message({
                        message: 'Lấy dữ liệu thành công',
                        type: 'success'
                    })
                    this.tableData = response.tableData
                }
            } catch (error) {
                console.log(error)
            }
        },
        handleDetail(truongHocNopList) {
            this.xemChitietModalVisible = true
            this.dataModalXemChitiet = truongHocNopList
            console.log(truongHocNopList)
        },
        async getDataTable() {
            try {
                const request_Header = {
                    ...this.request_Header,
                    token: this.authToken
                }
                const request_Params = {
                    ...this.request_Params,
                    start: 0,
                    limit: 25
                }
                const request_Data = {
                    ...this.request_Data,
                    loaiBaoCao: null,
                    tenBaoCao: null
                }
                const response = await sendRequest(
                    Api.baoCao.nopThongKeTheoBieuMau.danhSachBieuMau,
                    request_Data,
                    request_Header,
                    request_Params
                )
                this.tableData = response.tableData
            } catch (error) {
                console.log(error)
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
                case 'ESelectSchool':
                    this.selectedValue.selectedValueSchool = selectedOptions

                    break
                case 'ESelectReportModal':
                    this.selectedValue.selectedValueReportModal = selectedOptions
            }
        },

        handleESelectChange_Update(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitEducation_Update':
                    this.selectedValue_Update.selectedValueUnitEducation_Update =
                        selectedOptions
                    this.resetESelectSchool_Update = true
                    this.selectedValue_Update.selectedValueSchool_Update = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectGradeLevel_Update_MockData':
                    this.selectedValue_Update.selectedValueGradeLevel_Update =
                        selectedOptions
                    this.resetESelectSchool_Update = true
                    this.selectedValue_Update.selectedValueSchool_Update = []
                    this.getDataESelectSchool()
                    break
                case 'ESelectSchool_Update':
                    this.selectedValue_Update.selectedValueSchool_Update =
                        selectedOptions
                    break
                case 'ESelectReportModal_Update':
                    this.selectedValue_Update.selectedValueReportModal_Update =
                        selectedOptions
            }
        },
        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
                case 'selectedValueUnitEducation_Update':
                case 'selectedValueSchool':
                case 'selectedValueSchool_Update':
                    return options.map((option) => option.value)
                case 'selectedValueGradeLevel':
                case 'selectedValueGradeLevel_Update':
                    return options
                        .map((option) => option.value)
                        .join('')
                        .toString()
                        .split('')
                        .map(Number)
                case 'selectedValueReportModal':
                case 'selectedValueReportModal_Update':
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
        this.getDataTable()
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
.layout-btn {
    margin-top: 30px;
    margin-bottom: 5px;
}

.layout-table {
    background: #fff;
    padding: 20px 10px 20px 10px;
    border-radius: 4px;
}
.layout-table-btn {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0px 20px 0px;
}
.layout-checkbox {
    margin-bottom: 10px;
    display: flex;
}
.layout-checkbox span {
    font-size: 13px;
    margin-right: 20px;
    margin-left: 5px;
}
.layout-checkbox input {
    cursor: pointer;
}
.report-content {
    display: flex;

    align-items: center;
}

.report-content table {
    margin: 0 auto;
}

.report-content td {
    vertical-align: middle;
}
.layout-table .active {
    background: rgb(228, 235, 245);
}
.layout-table .no-underline {
    border: 0 !important;
}
.layout-table .no-underline:hover {
    cursor: pointer;
    background-color: #f8f9fa;
}

table thead tr {
    background: #f3f5f7;
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
}
.text-thead span {
    color: #da1313;
}
.text-tbody {
    font-size: 13px;
}
.custom-dialog-title {
    font-size: 22px;
    text-align: center;
    display: flex;
    margin: 0;
    padding: 0;
}
hr {
    border: 1px solid green;
    margin-bottom: 30px;
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
.custom-nav {
    color: black;
    background-color: #f3f5f7;
    font-size: 15px;
}
.margin-top-100 {
    margin-top: 100px;
}
.layout-btn-xemchitiet {
    display: flex;
    justify-content: flex-end;
}
</style>
