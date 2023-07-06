<template>
    <div>
        <CustomBreadcrumb
            :title="' KẾT CHUYỂN DỮ LIỆU LÊN BỘ'"
            content="LỊCH SỬ ĐẨY DỮ LIỆU LÊN BỘ"
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
                <div class="col-2">
                    <label>Giai đoạn</label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect.ESelectStage_MockData"
                            :placeholder="'Chọn trường học'"
                            :filterable="true"
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenGiaiDoan', 'value']"
                            :value="selectedValue.selectedValueStage"
                            @change="
                                handleESelectChange(
                                    'ESelectStage_MockData',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Đối tác </label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect.ESelectBusinessPartner_MockData"
                            :placeholder="'Chọn đối tác'"
                            :filterable="true"
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenDoiTac', 'maDoiTac']"
                            :value="selectedValue.selectedValueBusinessPartner"
                            @change="
                                handleESelectChange(
                                    'ESelectBusinessPartner',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Loại dữ liệu</label>
                    <div>
                        <div>
                            <ESelect
                                style="width: 100%"
                                no-match-text="Không tìm thấy bản ghi nào"
                                no-data-text="danh sách lựa chọn trống"
                                :clearable="true"
                                :disabled="false"
                                :data="getDataESelect.ESelectDataKind_MockData"
                                :placeholder="'Chọn đối tác'"
                                :filterable="true"
                                :multiple="false"
                                :collapse-tags="true"
                                :fields="['name', 'id']"
                                :value="selectedValue.selectedValueDataKind"
                                @change="
                                    handleESelectChange('ESelectDataKind', $event)
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <label>Trạng thái</label>
                    <div>
                        <div>
                            <ESelect
                                style="width: 100%"
                                no-match-text="Không tìm thấy bản ghi nào"
                                no-data-text="danh sách lựa chọn trống"
                                :clearable="true"
                                :disabled="false"
                                :data="getDataESelect.ESelectStatus_MockData"
                                :placeholder="'Chọn đối tác'"
                                :filterable="true"
                                :multiple="false"
                                :collapse-tags="true"
                                :fields="['name', 'id']"
                                :value="selectedValue.selectedValueStatus"
                                @change="
                                    handleESelectChange('ESelectStatus', $event)
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
        <div class="layout-btn-table">
            <div>
                <chonSoLuongBanGhi @chonXongSoLuong="ChonSoLuongBanGhi($event)" />
            </div>
            <div>
                <div class="col-1">
                    <CustomButton
                        label="Đẩy lại"
                        size="small"
                        type="primary"
                        @click="handlePushAgain"
                    />
                </div>
            </div>
        </div>
        <div class="layout-table">
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead" rowspan="2">STT</th>
                        <th class="text-thead" rowspan="2">Trường học</th>
                        <th class="text-thead" rowspan="2">Mã trường</th>
                        <th class="text-thead" rowspan="2">Cấp học</th>
                        <th class="text-thead" rowspan="2">Đối tác</th>
                        <th class="text-thead" rowspan="2">Năm Học</th>
                        <th class="text-thead" rowspan="2">Học kỳ</th>
                        <th class="text-thead" rowspan="2">Giai đoạn</th>
                        <th class="text-thead" rowspan="2">Loại dữ liệu</th>
                        <th class="text-thead" rowspan="4">Thời gian đẩy</th>
                        <th class="text-thead" rowspan="2">Trạng thái</th>
                        <th class="text-thead" colspan="4">Bản ghi</th>
                        <th class="text-thead" rowspan="2">Xem lỗi</th>
                        <th class="text-thead" rowspan="2">Trạng thái đồng bộ</th>
                        <th class="text-thead" rowspan="2">
                            <input
                                type="checkbox"
                                id="checkbox-all"
                                v-model="selectAll"
                                @change="handleSelectAll"
                            />
                        </th>
                    </tr>
                    <tr>
                        <th class="text-tbody">Nhận từ QLNT</th>
                        <th class="text-tbody">Đẩy lên bộ *</th>

                        <th class="text-tbody">Thành công</th>
                        <th class="text-tbody">Thất bại</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ (currentPage - 1) * limit + index + 1 }}
                        </td>
                        <td class="text-tbody">{{ item.tenTruong }}</td>
                        <td class="text-tbody">{{ item.maTruong }}</td>
                        <td class="text-tbody">{{ getCapHoc(item.capHoc) }}</td>
                        <td class="text-tbody">{{ item.maDoiTac }}</td>
                        <td class="text-tbody">
                            {{ item.namHoc }}-{{ parseInt(item.namHoc) + 1 }}
                        </td>

                        <td class="text-tbody">
                            <span v-if="item.hocKy == 1">Học kỳ I</span>
                            <span v-if="item.hocKy == 2">Học kỳ II</span>
                            <span v-if="item.hocKy == 3">Cả năm</span>
                        </td>
                        <td class="text-tbody">
                            <span v-if="item.maGiaiDoan == 'GK1'">Giữa kỳ I</span>
                            <span v-if="item.maGiaiDoan == 'GK2'"
                                >Giữa kỳ II</span
                            >
                            <span v-if="item.maGiaiDoan == 'CK1'">Cuối kỳ I</span>
                            <span v-if="item.maGiaiDoan == 'CK2'"
                                >Cuối kỳ II</span
                            >
                        </td>
                        <td class="text-tbody">
                            {{ getBuocHienTai(item.buocHienTai) }}
                        </td>
                        <td class="text-tbody">{{ item.timeStart }}</td>
                        <td class="text-tbody">
                            {{ getTrangThaiDay(item.trangThai) }}
                        </td>
                        <td class="text-tbody">
                            {{ item.banGhiNhan }}
                        </td>
                        <td class="text-tbody">
                            {{ item.banGhiGui }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongThanhCong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongThatBai + item.tongHopLoi }}
                        </td>
                        <td class="text-tbody">
                            <div v-if="item.tongThatBai + item.tongHopLoi > 0">
                                <CustomButton
                                    label=""
                                    type="primary"
                                    size="small"
                                    icon="el-icon-info"
                                    @click="
                                        handleModalInfo(
                                            item.messageId,
                                            item.id,
                                            item
                                        )
                                    "
                                />
                            </div>
                        </td>
                        <td class="text-tbody">
                            <span v-if="item.error"
                                >{{ item.error }} /
                                {{ item.errorDescription }}</span
                            >
                        </td>
                        <td class="text-tbody">
                            <input
                                type="checkbox"
                                :id="'checkbox-' + index"
                                :checked="isSelected(item.id)"
                                @click="handleCheckboxClick(item.id)"
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
        <div class="layout-note">
            <div class="row">
                <div class="col-md-12">
                    <p><b>Ghi chú:</b></p>
                </div>
            </div>
        </div>
        <!-- ************ Modal Info************ -->
        <el-dialog
            :visible.sync="infoModalVisible"
            @close="closeModalInfo"
            class="custom-dialog"
            :fullscreen="true"
        >
            <span slot="title" class="custom-dialog-title">
<!--                Đẩy dữ liệu học sinh - Trường: {{ titleModal?.tenTruong }} - [{{-->
<!--                    titleModal?.maTruong-->
<!--                }}] - Năm học: {{ titleModal?.namHoc }} - -->
<!--                {{ titleModal?.namHoc + 1 }}-->
                <hr />
            </span>
            <el-tabs type="border-card">
                <el-tab-pane label="1. Lỗi đẩy lên bô">
                    <label
                        style="
                            padding-left: 20px;
                            padding-top: 7px;
                            font-weight: 70;
                        "
                        for=""
                        ><i
                            style="color: red"
                            class="fas fa-exclamation-triangle"
                        ></i>
                        <i
                            >Để xử lý lỗi, vui lòng tra cứu
                            <span style="color: blue; font-weight: 700"
                                >Danh mục lỗi đẩy lên Bộ</span
                            >
                            theo "<span style="font-weight: 700">Mã lỗi</span> "
                            và "<span style="font-weight: 700">Mô tả</span>" để
                            xem nguyên nhân và cách xử lý!</i
                        ></label
                    >
                    <table
                        class="table table-bordered table-hover centered-table"
                    >
                        <thead>
                            <tr>
                                <th class="text-thead">STT</th>
                                <th class="text-thead">Tên học sinh</th>
                                <th class="text-thead">Mã học sinh</th>
                                <th class="text-thead">Trạng thái</th>
                                <th class="text-thead">Mã lỗi</th>
                                <th class="text-thead">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(
                                    itemModal, index
                                ) in tableDataModalLoiDayLenBo"
                                :key="index"
                            >
                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    {{ index + 1 }}
                                </td>
                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    {{ itemModal.name }}
                                </td>
                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    {{ itemModal.clientId }}
                                </td>

                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    Thất bại
                                </td>
                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    {{ itemModal.name }}
                                </td>
                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    Mã lỗi
                                </td>
                                <td
                                    v-if="
                                        itemModal.errorDescription !==
                                        'Không có lỗi'
                                    "
                                >
                                    Giá trị không tồn tại trong thư mục
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="2. Lỗi đồng bộ">
                    <table
                        class="table table-bordered table-hover centered-table"
                    >
                        <thead>
                            <tr>
                                <th class="text-thead">STT</th>
                                <th class="text-thead">Mã lỗi</th>
                                <th class="text-thead">Tên đối tượng</th>
                                <th class="text-thead">clientId</th>
                                <th class="text-thead">Mô tả lỗi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(
                                    itemModal, index
                                ) in tableDataModalLoiDongBo"
                                :key="index"
                            >
                                <td class="text-tbody">
                                    {{ index + 1 }}
                                </td>
                                <td class="text-tbody">
                                    {{ itemModal.error }}
                                </td>
                                <td class="text-tbody">
                                    {{ itemModal.name }}
                                </td>
                                <td class="text-tbody">
                                    {{ itemModal.clientId }}
                                </td>
                                <td class="text-tbody">
                                    {{ itemModal.errorDescription }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="3. Danh mục lỗi">
                    <div class="layout-table-modal">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã lỗi</th>
                                    <th>Mô tả của bộ</th>
                                    <th>Nguyên nhân</th>
                                    <th>Cách xử lý</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(
                                        itemModal, index
                                    ) in tableDataModalDanhMucLoi"
                                    :key="index"
                                >
                                    <td>
                                        {{ index + 1 }}
                                    </td>
                                    <td>
                                        {{ itemModal.errorCode }}
                                    </td>
                                    <td>
                                        {{ itemModal.errorDescription }}
                                    </td>
                                    <td>
                                        {{ itemModal.rootCause }}
                                    </td>
                                    <td>
                                        {{ itemModal.solution }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="layout-btn-modal">
                        <CustomButton
                            label="Đóng"
                            size="small"
                            type="info"
                            @click="closeModalInfo"
                        />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<script>
import CustomButton from '@/components/CustomButton.vue'
import ESelect from '@/components/ESelect.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import ESelectOne from '@/components/ESelectOne.vue'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import {
    ESelectGradeLevel_MockData,
    ESelectSchool_MockData,
    ESelectSemester_MockData,
    ESelectUnitEducation_MockData,
    ESelectStage_MockData,
    ESelectBusinessPartner_MockData,
    ESelectDataKind_MockData,
    ESelectStatus_MockData,
    ESelectChooseDataType_MockData
} from '@/mock_data'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import Api from '@/constants/Api'
import sendRequest from '@/services'
import { mapState } from 'vuex'

export default {
    name: 'LichSuDayDuLieuLenBo',
    components: {
        ESelect,
        CustomButton,
        CustomBreadcrumb,
        ESelectOne,
        ESelectYear,
        chonSoLuongBanGhi,
        CustomPagination
    },
    data() {
        return {
            selectAll: false, // Trạng thái chọn tất cả checkbox
            selectedIds: [], // Mảng lưu trữ item.id của các checkbox được chọ
            start: 0,
            total_rows: 0,
            currentPage: 1,
            limit: 25,
            soLuongBanGhiHienThi: 25,
            trangbatdau: false,

            infoModalVisible: false,
            resetESelectSchool: false,
            configDatePicker: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
                showTodayButton: true,
                locale: 'vi'
            },
            request_Data: {
                hocKy: null,
                limit: 25,
                loaiYeuCau: null,
                maCapHocs: [],
                maDoiTacs: [],
                maTruongs: [],
                maDonVis: [],
                maGiaiDoanKqht: null,

                namHoc: null,
                start: 0,
                trangThai: null
            },
            tableData: [],
            titleModal: null,
            tableDataModalLoiDongBo: [],
            tableDataModalDanhMucLoi: [],
            tableDataModalLoiDayLenBo: [],
            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [], //truonghoc
                ESelectShoolYear: [], //namhoc
                ESelectSemester_MockData: ESelectSemester_MockData, //hocky
                ESelectStage_MockData: ESelectStage_MockData, //giaidoan
                ESelectBusinessPartner_MockData: ESelectBusinessPartner_MockData, //doitac
                ESelectDataKind_MockData: ESelectDataKind_MockData, //loaidulieu
                ESelectStatus_MockData: ESelectStatus_MockData //trangthai
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [], //truonghoc
                selectedValueSchoolYear: [], //namhoc
                selectedValueSemester: [], //hocky
                selectedValueStage: [], //giaidoan
                selectedValueBusinessPartner: [], //doitac
                selectedValueDataKind: [], //loaidulieu
                selectedValueStatus: [] //trangthai
            }
        }
    },
    methods: {
        closeModalInfo() {
            this.infoModalVisible = false
            this.tableDataModalLoiDongBo = []
            this.tableDataModalLoiDongBo = []
        },
        handleCheckboxClick(itemId) {
            const index = this.selectedIds.indexOf(itemId)

            if (index === -1) {
                this.selectedIds.push(itemId)
            } else {
                this.selectedIds.splice(index, 1)
            }

            // Kiểm tra nếu tất cả các checkbox đã được chọn, thì cập nhật giá trị của selectAll
            this.selectAll = this.selectedIds.length === this.tableData.length
        },
        handleSelectAll() {
            // Cập nhật giá trị của tất cả các checkbox trong vòng lặp dựa trên giá trị của selectAll
            if (this.selectAll) {
                this.selectedIds = this.tableData.map((item) => item.id)
            } else {
                this.selectedIds = []
            }
        },
        isSelected(itemId) {
            // Kiểm tra xem itemId có nằm trong selectedIds hay không
            return this.selectedIds.includes(itemId)
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
        getTrangThaiDay(loai) {
            var res = loai
            switch (loai) {
                case 0:
                    res = 'Chờ đẩy'
                    break
                case 1:
                    res = 'Đang đẩy'
                    break
                case 2:
                    res = 'Đẩy thành công'
                    break
                case 3:
                    res = 'Đẩy lỗi'
                    break
                case 4:
                    res = 'Cần đẩy lại'
                    break
                case 5:
                    res = 'Thiếu mật khẩu kết chuyển'
                    break
                case 9:
                    res = 'Chờ tổng hợp'
                    break
                case 10:
                    res = 'Đang tổng hợp'
                    break
                case 11:
                    res = 'Tổng hợp xong'
                    break
                case 12:
                    res = 'Tổng hợp lỗi'
                    break
                case 13:
                    res = 'Hoàn thành'
                    break
                case 6:
                    res = 'Tài khoản kết chuyển không chính xác'
                    break
                default:
                    res = 'Chưa rõ'
            }
            return res
        },
        getBuocHienTai(buocHienTai) {
            const DataGetLoaiDuLoai = [
                { name: 'Trường học', key: '1' },
                { name: 'Cán bộ', key: '2' },
                { name: 'Lớp học', key: '3' },
                { name: 'Học sinh', key: '4' },
                { name: 'KQ học tập', key: '5' },
                { name: 'HT c.trình MN', key: '7' },
                { name: 'Xét tốt nghiệp', key: '8' },
                { name: 'Nhập điểm thi lại', key: '9' },
                { name: 'ĐG chuẩn nghề nghiệp', key: '14' }
            ]

            const foundItem = DataGetLoaiDuLoai.find(
                (item) => item.key === String(buocHienTai)
            )
            return foundItem ? foundItem.name : ''
        },

        getCapHoc(loai) {
            var res = loai
            switch (loai) {
                case 1:
                    res = 'Cấp 1'
                    break
                case 2:
                    res = 'Cấp 2'
                    break
                case 3:
                    res = 'Cấp 3'
                    break
                case 4:
                    res = 'Nhà trẻ'
                    break
                case 5:
                    res = 'Mẫu giáo'
                    break
                case 6:
                    res = 'GDTX'
                    break
                case 12:
                    res = 'Liên cấp 1+2'
                    break
                case 13:
                    res = 'Liên cấp 1+3'
                    break
                case 23:
                    res = 'Liên cấp 2+3'
                    break
                case 123:
                    res = 'Liên cấp 1+2+3'
                    break
                default:
                    res = loai
            }
            return res
        },

        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        async handleModalInfo(messageId, id, titleModal) {
            try {
                this.titleModal = titleModal
                this.infoModalVisible = true
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    messageId: messageId,
                    idBcQuaTrinh: id
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.lichSuKetChuyen.chiTietLoiDongBo,
                    request_Data,
                    request_Header,
                    null
                )
                this.tableDataModalLoiDongBo =
                    response.item.errTransForm.body.result.items.item
                this.tableDataModalLoiDayLenBo =
                    response.response.body.result.items.item
            } catch (error) {
                console.log(error)
            }
        },
        async getDataModalTableDanhMucLoi() {
            const request_Header = {
                token: this.authToken
            }
            const response = await sendRequest(
                Api.ketChuyenDuLieuLenBo.lichSuKetChuyen.danhMucLoi,
                null,
                request_Header,
                null
            )

            this.tableDataModalDanhMucLoi = response.rows
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
                    this.selectedValue.selectedValueChooseDataType =
                        selectedOptions
                    break
                case 'ESelectStage_MockData':
                    this.selectedValue.selectedValueStage = selectedOptions
                    break
                case 'ESelectBusinessPartner':
                    this.selectedValue.selectedValueBusinessPartner =
                        selectedOptions
                    break
                case 'ESelectDataKind':
                    this.selectedValue.selectedValueDataKind = selectedOptions
                    break
                case 'ESelectStatus':
                    this.selectedValue.selectedValueStatus = selectedOptions
            }
        },
        async handleSearch() {
            try {
                const maDonVis = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )

                const maCapHocs = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )

                const maTruongs = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )
                console.log(this.selectedValue.selectedValueSchool)
                console.log(maTruongs)
                const namHoc = this.selectedValue.selectedValueSchoolYear
                const currentYear = new Date().getFullYear()
                const hocKy = parseInt(
                    this.selectedValue.selectedValueSemester.value
                )

                const maGiaiDoanKqht = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueStage,
                    'selectedValueStage'
                ).join()
                const maDoiTacs = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueBusinessPartner,
                    'selectedValueBusinessPartner'
                )
                const loaiYeuCau = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueDataKind,
                    'selectedValueDataKind'
                ).join('')
                const trangThai = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueStatus,
                    'selectedValueStatus'
                ).join()
                const start = this.start
                const limit = this.limit
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    hocKy: hocKy,
                    limit: limit,
                    loaiYeuCau: loaiYeuCau || null,
                    maCapHocs: maCapHocs,
                    maDoiTacs: maDoiTacs,
                    maDonVis: maDonVis,
                    maTruongs: maTruongs,
                    maGiaiDoanKqht: maGiaiDoanKqht || null,

                    namHoc: namHoc || currentYear,
                    start: start,
                    trangThai: trangThai || null
                }

                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.lichSuKetChuyen
                        .danhSachLichSuKetChuyen,
                    request_Data,
                    request_Header
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                if (response.code == 200) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu',
                            type: 'success'
                        })
                        this.tableData = response.rows
                        this.total_rows = response.total
                    }, 1000)
                } else {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: response.message,
                            type: 'error'
                        })
                        this.total_rows = 0
                        this.tableData = []
                    }, 1000)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async handlePushAgain() {
            try {
                const selectedIds = this.selectedIds

                if (selectedIds.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn dữ liệu trong bảng',
                        type: 'error'
                    })
                    return
                }
                // Tiến hành xử lý logic với các item.id đã lấy được
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    listId: selectedIds
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.lichSuKetChuyen.updateDayLai,
                    request_Data,
                    request_Header,
                    null
                )

                if (response.rc == 0) {
                    this.$message({
                        type: 'success',
                        message:
                            'Yêu cầu đẩy dữ liệu đang ở trạng thái chờ tổng hợp dữ liệu'
                    })
                    this.handleSearch()
                }
            } catch (error) {
                console.log(error)
            }
        },
        handleExportExcel() {
            if (this.tableData.length === 0) {
                this.$message({
                    message: 'Danh sách dữ liệu trống',
                    type: 'error'
                })
                return
            }
            this.$confirm(
                'Xác nhận tải xuống dữ liệu. Vui lòng chờ trong thời gian tải xuống',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }
            )
                .then(async () => {
                    const maDonVis = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueUnitEducation,
                        'selectedValueUnitEducation'
                    )

                    const maCapHocs = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueGradeLevel,
                        'selectedValueGradeLevel'
                    )

                    const maTruongs = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueSchool,
                        'selectedValueSchool'
                    )

                    const namHoc = this.selectedValue.selectedValueSchoolYear
                    const currentYear = new Date().getFullYear()
                    const hocKy = parseInt(
                        this.selectedValue.selectedValueSemester.value
                    )

                    const maGiaiDoanKqht = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueStage,
                        'selectedValueStage'
                    ).join()
                    const maDoiTacs = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueBusinessPartner,
                        'selectedValueBusinessPartner'
                    )
                    const loaiYeuCau = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueDataKind,
                        'selectedValueDataKind'
                    ).join('')
                    const trangThai = this.customhandleESelectedChange(
                        this.selectedValue.selectedValueStatus,
                        'selectedValueStatus'
                    ).join()
                    const start = this.start
                    const limit = this.limit
                    const request_Header = {
                        token: this.authToken
                    }
                    // const request_Data = {
                    //     hocKy: hocKy,
                    //     limit: limit,
                    //     loaiYeuCau: loaiYeuCau || null,
                    //     maCapHocs: maCapHocs,
                    //     maDoiTacs: maDoiTacs,
                    //     maDonVis: maDonVis,
                    //     maGiaiDoanKqht: maGiaiDoanKqht || null,
                    //     maTruongHoc: null,
                    //     maTruongs: maTruongs,
                    //     namHoc: namHoc || currentYear,
                    //     start: start,
                    //     trangThai: trangThai || null
                    // }
                    const request_Data = {
                        hocKy: 1,
                        limit: 25,
                        loaiYeuCau: null,
                        maCapHocs: [],
                        maDoiTacs: [],
                        maDonVis: [],
                        maGiaiDoanKqht: null,
                        maTruongHoc: null,
                        maTruongs: [],
                        namHoc: 2022,
                        start: 0,
                        trangThai: null
                    }
                    const response = await sendRequest(
                        Api.ketChuyenDuLieuLenBo.lichSuKetChuyen.xuatExcel,
                        request_Data,
                        request_Header,
                        null
                    )
                    const blob = new Blob([response], {
                        type: 'application/octet-stream'
                    })

                    // Tạo URL tạm thời từ đối tượng Blob
                    const blobURL = URL.createObjectURL(blob)
                    console.log(blobURL)
                    // Tạo một thẻ a để tải xuống file
                    const downloadLink = document.createElement('a')
                    downloadLink.href = blobURL
                    downloadLink.download = 'filename.xlsx' // Đặt tên file tùy ý

                    // Tự động nhấp vào liên kết để tải xuống file
                    downloadLink.click()

                    // Giải phóng URL tạm thời
                    URL.revokeObjectURL(blobURL)
                    // const url = URL.createObjectURL(blob)
                    // const link = document.createElement('a')
                    // link.href = url
                    // link.setAttribute('download', 'file_name.extension') // Đặt tên và đuôi file tại đây
                    // document.body.appendChild(link)
                    // link.click()
                    // document.body.removeChild(link)
                    // URL.revokeObjectURL(url)
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    })
                })
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
        async getDataESelectStage() {
            try {
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    trangThai: 1
                }
                const request_Params = {
                    start: 0,
                    limit: 9999
                }
                const response = await sendRequest(
                    Api.ketChuyenDuLieuLenBo.lichSuKetChuyen.duLieuDoiTac,
                    request_Data,
                    request_Header,
                    request_Params
                )
                this.getDataESelect.ESelectBusinessPartner_MockData =
                    response.rows
            } catch (error) {
                console.log(error)
            }
        },
        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
                case 'selectedValueSchool':
                case 'selectedValueStage':
                case 'selectedValueBusinessPartner':
                case 'selectedValueDataKind':
                case 'selectedValueStatus':
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
        this.getDataESelectStage()
        this.getDataModalTableDanhMucLoi()
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
.layout-btn-table {
    padding: 20px 0px 5px 10px;
    justify-content: space-between;
    display: flex;
    background: #fff;
    max-width: calc(100vw - 330px);
    margin: 0 auto;
    overflow-x: auto;
}
.layout-btn-search {
    margin-top: 15px;
    margin-bottom: 5px;
}
.layout-table {
    background: #fff;
    padding: 20px 10px 5px 10px;
    border-radius: 4px;
    max-width: 1173px;
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
    vertical-align: middle;
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
.layout-table-modal {
    overflow-x: auto;
}
.layout-btn-modal {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
