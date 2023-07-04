<template>
    <div>
        <CustomBreadcrumb
            :title="'TIẾP NHẬN DỮ LIỆU QLNT'"
            :content="'LỊCH SỬ TIẾP NHẬN DỮ LIỆU'"
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
                <div class="col-4">
                    <label>Trường học <sup style="color: red">*</sup></label>
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
                    <label>Năm học <sup style="color: red">*</sup></label>
                    <div>
                        <ESelectYear
                            v-model="selectedValue.selectedValueSchoolYear"
                            placeholder="Chọn năm"
                            size="small"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                        >
                        </ESelectYear>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-top: 20px">
                <div class="col-2">
                    <label>Ngày nhận dữ liệu</label>
                    <div>
                        <date-picker
                            :config="configDatePicker"
                            placeholder="Ngày bắt đầu"
                            v-model="selectedValue.selectedValueDate"
                            class="custom-date-picker"
                        ></date-picker>
                    </div>
                </div>
                <div class="col-2">
                    <label>Mã lần đẩy</label>
                    <div>
                        <el-input
                            placeholder="Nhập ..."
                            v-model="selectedValue.inputPasCode"
                            size="small"
                        ></el-input>
                    </div>
                </div>
                <div class="col-2">
                    <label>Đối tác</label>
                    <div>
                        <ESelectOne
                            :clearable="true"
                            :disabled="false"
                            :value="selectedValue.selectedValuePartner"
                            :data="
                                transformESelect(getDataESelect.ESelectPartner)
                            "
                            placeholder="Chọn một giá trị"
                            :filterable="true"
                            :collapseTags="false"
                            :fields="['label', 'value']"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                            @change="
                                handleESlectOneChange('ESelectPartner', $event)
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Trạng thái</label>
                    <div>
                        <ESelectOne
                            :clearable="true"
                            :disabled="false"
                            :value="selectedValue.selectedValueSyncState"
                            :data="getDataESelect.ESelectSyncState_MockData"
                            placeholder="Chọn một giá trị"
                            :filterable="true"
                            :collapseTags="false"
                            :fields="['tenTrangThai', 'value']"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                            @change="
                                handleESlectOneChange('ESelectSyncState', $event)
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Loại đồng bộ</label>
                    <div>
                        <ESelectOne
                            :clearable="true"
                            :disabled="false"
                            :value="selectedValue.selectedValueSynchronouStype"
                            :data="getDataESelect.ESelectSynchronouStype_MockData"
                            placeholder="Chọn một giá trị"
                            :filterable="true"
                            :collapseTags="false"
                            :fields="['tenLoaiDongBo', 'value']"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                            @change="
                                handleESlectOneChange(
                                    'ESelectSynchronouStype',
                                    $event
                                )
                            "
                        />
                    </div>
                </div>
                <div class="col-2">
                    <label>Loại đợt</label>
                    <div>
                        <ESelectOne
                            :clearable="true"
                            :disabled="false"
                            :value="selectedValue.selectedValueBatchType"
                            :data="getDataESelect.ESelectBatchType_MockData"
                            placeholder="Chọn một giá trị"
                            :filterable="true"
                            :collapseTags="false"
                            :fields="['tenLoaiDot', 'value']"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                            @change="
                                handleESlectOneChange('ESelectBatchType', $event)
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
            <chonSoLuongBanGhi @chonXongSoLuong="ChonSoLuongBanGhi($event)" />
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Mã lần đẩy</th>
                        <th class="text-thead">Đối tác</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Thời gian nhận</th>
                        <th class="text-thead">Thời gian xử lí</th>
                        <th class="text-thead">Loại đồng bộ</th>
                        <th class="text-thead">Năm đồng bộ</th>
                        <th class="text-thead">Loại đợt</th>
                        <th class="text-thead">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">{{ index + 1 }}</td>
                        <td class="text-tbody">{{ item.reqMessId }}</td>
                        <td class="text-tbody">{{ item.tenDoitac }}</td>
                        <td class="text-tbody">{{ item.tenTruongHoc }}</td>
                        <td class="text-tbody">{{ item.maTruongHoc }}</td>
                        <td class="text-tbody">
                            {{ item.timeDongBo }}
                        </td>
                        <td class="text-tbody">{{ item.timePhanHoi }}</td>
                        <td class="text-tbody">{{ item.timePhanHoi }}</td>
                        <td class="text-tbody">{{ item.timePhanHoi }}</td>
                        <td class="text-tbody">{{ item.timePhanHoi }}</td>
                        <td class="text-tbody">
                            <CustomButton
                                label=""
                                icon="el-icon-info"
                                type="primary"
                                @click="ModalChitiet(item.maGiaoDich)"
                                size="small"
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
        </div>

        <!-- ************ Modal Chi tiết ************ -->
        <el-dialog
            :visible.sync="chiTietModalVisible"
            width="100%"
            height="100%"
            @close="closeModalChitiet"
            :fullscreen="true"
        >
            <span slot="title" class="custom-dialog-title"
                >Thêm mới cấu hình lịch đồng bộ cấp Trường
            </span>
            <hr />
            <div slot="footer">
                <div class="custom-footer">
                    <div class="content-left">
                        <div class="dflex">
                            <div style="color: #606266">
                                {{ tableDataModal_Chitiet.maDoiTac }}
                            </div>
                        </div>
                        <div class="dflex">
                            <div class="span">Mã lần đẩy:</div>
                            <div>{{ tableDataModal_Chitiet.reqMessId }}</div>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div class="dflex">
                            <div class="span">Duration time phản hồi:</div>
                            <div>{{ tableDataModal_Chitiet.timePhanHoi }}</div>
                        </div>
                        <div class="dflex">
                            <div class="span">Dữ liệu đẩy lên:</div>
                            <div>
                                <CustomButton
                                    label="Xem chi tiết"
                                    size="mini"
                                    type="primary"
                                    @click="
                                        ModalDulieuDaylen_Chitiet(
                                            tableDataModal_Chitiet.maGiaoDich
                                        )
                                    "
                                />
                            </div>
                        </div>
                    </div>
                    <div class="content-right">
                        <div class="dflex">
                            <div class="span">Đợt đồng bộ:</div>
                            <div>
                                {{
                                    getLoaiDuLieu(
                                        tableDataModal_Chitiet.loaiDuLieu
                                    )
                                }}
                            </div>
                        </div>
                        <div class="dflex">
                            <div class="span">Dữ liệu nhận được:</div>

                            <div>
                                <CustomButton
                                    label="Xem chi tiết"
                                    size="mini"
                                    type="primary"
                                    @click="
                                        ModalDulieuDaylen_Chitiet(
                                            tableDataModal_Chitiet.maGiaoDich
                                        )
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layout-table-modal">
                    <table
                        class="table table-bordered table-hover centered-table"
                    >
                        <thead>
                            <tr>
                                <th class="text-thead">STT</th>
                                <th class="text-thead">Tên dữ liệu</th>
                                <th class="text-thead">Nhận thành công</th>
                                <th class="text-thead">Nhận thất bại</th>
                                <th class="text-thead">Kết quả nhận</th>
                                <th class="text-thead">Đồng bộ thành công</th>
                                <th class="text-thead">Đồng bộ thất bại</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(
                                    item, key
                                ) in tableDataModal_Chitiet.listDetail"
                                :key="key"
                            >
                                <td class="text-tbody">
                                    {{ key + 1 }}
                                </td>
                                <td class="text-tbody">
                                    {{ item.tableName }}
                                </td>
                                <td class="text-tbody">
                                    {{ item.numRecordRecievedSuccess }}
                                </td>
                                <td class="text-tbody">
                                    {{ item.numRecordRecievedError }}
                                </td>
                                <td class="text-tbody">
                                    <span v-if="item.numRecordRecievedError != 0">
                                        <CustomButton
                                            label=""
                                            size="small"
                                            type="primary"
                                            icon="el-icon-info"
                                            @click="
                                                ModalKetQuaNhan_ChiTiet(
                                                    item.id,
                                                    item.subId
                                                )
                                            "
                                        />
                                    </span>
                                    <span></span>
                                </td>
                                <td class="text-tbody">
                                    {{ item.numRecordSyncSuccess }}
                                </td>
                                <td class="text-tbody">
                                    {{ item.numRecordSyncError }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="margin-top-150"></div>
                    <hr />
                    <div class="layout-btn">
                        <CustomButton
                            label="Đóng"
                            size="small"
                            type="danger"
                            @click="closeModalChitiet"
                        />
                    </div>
                </div>
            </div>
        </el-dialog>

        <!-- ************ Modal Dữ liệu đẩy lên - Chi tiết ************ -->
        <el-dialog
            :visible.sync="duLieuDayLen_ChitietModalVisible"
            width="80%"
            @close="closeModalDuLieuDayLen_Chitiet"
            class="custom-dialog"
        >
            <span slot="title" class="custom-dialog-title">
                Chi tiết (Dữ liệu đẩy lên)
            </span>

            <textarea
                class="form-control"
                v-model="data_DuLieuDayLenChiTiet"
                style="height: 300px"
                rows="3"
            ></textarea>
        </el-dialog>

        <!-- ************ Modal Dữ liệu Nhận được - Chi tiết ************ -->
        <el-dialog
            :visible.sync="dulieuNhanDuoc_ChitietModalVisible"
            width="80%"
            @close="closeModalDulieuNhanDuoc_ChitietVisible"
            class="custom-dialog"
        >
            <span slot="title" class="custom-dialog-title">
                Chi tiết (Dữ liệu nhận được)
            </span>

            <textarea
                class="form-control"
                v-model="data_DuLieuNhanDuocChiTiet"
                style="height: 300px"
                rows="3"
            ></textarea>
        </el-dialog>

        <!-- ************ Modal Kết quả nhận -  Chi tiết ************ -->
        <el-dialog
            :visible.sync="ketQuaNhan_ChitietModalVisible"
            width="60%"
            @close="closeModalKetQuaNhan_Chitiet"
            class="custom-dialog"
        >
            <span slot="title" class="custom-dialog-title"> Chi tiết </span>
            <hr />
            <span>
                <div class="layout-table-modal">
                    <table
                        class="table table-bordered table-hover centered-table"
                    >
                        <thead>
                            <tr>
                                <th class="text-thead">STT</th>
                                <th class="text-thead">Mã học sinh</th>
                                <th class="text-thead">Trạng thái</th>
                                <th class="text-thead">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, i) in data_KetQuaNhan_Chitiet"
                                :key="i"
                            >
                                <td class="text-tbody">{{ i + 1 }}</td>
                                <td class="text-tbody">
                                    <div>{{ item.MaHocSinh }}</div>
                                </td>
                                <td class="text-tbody">
                                    {{
                                        parseInt(item.Status) === 1
                                            ? 'Thành công'
                                            : 'Thất bại'
                                    }}
                                </td>
                                <td class="text-tbody">
                                    {{ item.Message }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </span>
            <hr />
        </el-dialog>
    </div>
</template>
<script>
import CustomButton from '@/components/CustomButton.vue'
import ESelect from '@/components/ESelect.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import ESelectOne from '@/components/ESelectOne.vue'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import CustomPagination from '@/components/CustomPagination.vue'

import Api from '@/constants/Api'
import {
    ESelectBatchType_MockData,
    ESelectGradeLevel_MockData,
    ESelectSyncState_MockData,
    ESelectSynchronouStype_MockData
} from '@/mock_data'
import sendRequest from '@/services'
import { mapState } from 'vuex'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
export default {
    name: 'lichSuTiepNhanDuLieu',
    components: {
        ESelect,
        CustomButton,
        ESelectYear,
        ESelectOne,
        datePicker,
        CustomBreadcrumb,
        chonSoLuongBanGhi,
        CustomPagination
    },
    data() {
        return {
            resetESelectSchool: false,

            start: 0,
            total_rows: 0,
            currentPage: 1,
            limit: 25,
            soLuongBanGhiHienThi: 25,
            trangbatdau: false,

            tableData: [],
            tableDataModal_Chitiet: {},

            data_KetQuaNhan_Chitiet: [],
            data_DuLieuDayLenChiTiet: {},
            data_DuLieuNhanDuocChiTiet: {},
            chiTietModalVisible: false,
            ketQuaNhan_ChitietModalVisible: false,
            duLieuDayLen_ChitietModalVisible: false,
            dulieuNhanDuoc_ChitietModalVisible: false,
            request_Data: {
                capHoc: [],
                loaiDayDuLieu: '',
                loaiDot: '',
                maDoiTacCha: '',
                maDonVi: [],
                maGiaoDich: '',
                maTruongHoc: [],
                namDayDulieu: '',
                status: '',
                timeDayEnd: '',
                timeDayStart: ''
            },
            request_Params: {
                start: null,
                limit: null
            },
            request_Header: {
                Authorization: ''
            },
            configDatePicker: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
                showTodayButton: true,
                locale: 'vi'
            },
            pickerOptions: { format: 'DD/MM/YYYY' },

            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [], //truonghoc
                ESelectShoolYear_MockData: [], //namhoc
                //ngaynhandulieu
                //malanday
                ESelectPartner: [], //doitac
                ESelectSyncState_MockData: ESelectSyncState_MockData, //trangthai
                ESelectSynchronouStype_MockData: ESelectSynchronouStype_MockData, //loaidongbo
                ESelectBatchType_MockData: ESelectBatchType_MockData //loaidot
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [], //truonghoc
                selectedValueSchoolYear: [], //namhoc
                selectedValueDate: null, //ngaynhandulieu
                inputPasCode: '', //malanday
                selectedValuePartner: [], //doitac
                selectedValueSyncState: [], //trangthai
                selectedValueSynchronouStype: [], //loaidongbo
                selectedValueBatchType: [] //loaidot
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
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        closeModalKetQuaNhan_Chitiet() {
            this.ketQuaNhan_ChitietModalVisible = false
        },
        closeModalChitiet() {
            this.chiTietModalVisible = false
        },
        closeModalDuLieuDayLen_Chitiet() {
            this.duLieuDayLen_ChitietModalVisible = false
        },
        closeModalDulieuNhanDuoc_ChitietVisible() {
            this.dulieuNhanDuoc_ChitietModalVisible = false
        },
        transformESelect(data) {
            return data.map((item) => ({
                label: item,
                value: item
            }))
        },
        getLoaiDuLieu(loai) {
            var res = loai
            switch (loai) {
                case 1:
                    res = 'Sửa học sinh theo lô'
                    break
                case 2:
                    res = 'Sửa giáo viên theo lô'
                    break
                case 3:
                    res = 'Đẩy thông tin đầu năm'
                    break
                case 4:
                    res = 'Đẩy thông tin học sinh biến động'
                    break
                case 5:
                    res = 'Đẩy thông tin điểm'
                    break
                case 6:
                    res = 'Đẩy thông tin cuối năm'
                    break
                case 8:
                    res = 'Đẩy dữ liệu đầu năm (*)'
                    break
                default:
                    res = loai
            }
            return res
        },
        async ModalChitiet(id) {
            this.chiTietModalVisible = true // mở modal
            try {
                console.log('chi tiết', id)
                const request_Params = {
                    id: id
                }
                const request_Header = {
                    token: this.authToken
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.lichSuTiepNhanDuLieu.chiTiet,
                    null,
                    request_Header,
                    request_Params
                )
                this.tableDataModal_Chitiet = response.item
            } catch (error) {
                console.log(error)
            }
        },
        async ModalDulieuDaylen_Chitiet(id) {
            this.duLieuDayLen_ChitietModalVisible = true
            try {
                const request_Params = {
                    id: id,
                    type: 1
                }
                const request_Header = {
                    token: this.authToken
                }
                console.log('dữ liệu đẩy lên', id)
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.lichSuTiepNhanDuLieu
                        .ketQuaNhan_Chitiet,
                    null,
                    request_Header,
                    request_Params
                )
                console.log(response)

                this.data_DuLieuDayLenChiTiet = JSON.stringify(
                    JSON.parse(response.item.detail)
                )
            } catch (error) {
                console.log(error)
            }
        },
        async ModalDulieuNhanDuoc_Chitiet(id) {
            this.dulieuNhanDuoc_ChitietModalVisible = true
            try {
                console.log('dữ liệu nhận được', id)
                const request_Params = {
                    id: id,
                    type: 2
                }
                const request_Header = {
                    token: this.authToken
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.lichSuTiepNhanDuLieu
                        .ketQuaNhan_Chitiet,
                    null,
                    request_Header,
                    request_Params
                )
                this.data_DuLieuNhanDuocChiTiet = JSON.stringify(
                    JSON.parse(response.item.detail)
                )
            } catch (error) {
                console.log(error)
            }
        },
        async ModalKetQuaNhan_ChiTiet(id, subId) {
            this.ketQuaNhan_ChitietModalVisible = true
            try {
                console.log(id)
                console.log(subId)

                const request_Params = {
                    id: id,
                    subId: subId,
                    type: 3
                }
                const request_Header = {
                    token: this.authToken
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.lichSuTiepNhanDuLieu
                        .ketQuaNhan_Chitiet,
                    null,
                    request_Header,
                    request_Params
                )

                this.data_KetQuaNhan_Chitiet = JSON.parse(response.item.detail)
            } catch (error) {
                console.log(error)
            }
        },

        handleESlectOneChange(source, selectedOptions) {
            switch (source) {
                case 'ESelectPartner':
                    this.selectedValue.selectedValuePartner = selectedOptions
                    break
                case 'ESelectSyncState':
                    this.selectedValue.selectedValueSyncState = selectedOptions
                    break
                case 'ESelectSynchronouStype':
                    this.selectedValue.selectedValueSynchronouStype =
                        selectedOptions
                    break
                case 'ESelectBatchType':
                    this.selectedValue.selectedValueBatchType = selectedOptions
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
                case 'ESelectSchoolYear_MockData':
                    this.selectedValue.selectedValueSchoolYear = selectedOptions
                    break
                case 'ESelectSchool_MockData':
                    this.selectedValue.selectedValueSchool = selectedOptions
                    break
                case 'ESelectPartner':
                    this.selectedValue.selectedValuePartner = selectedOptions
                    break
                case 'ESelectSyncState_MockData':
                    this.selectedValue.selectedValueSyncState = selectedOptions
                    break
                case 'ESelectSynchronouStype_MockData':
                    this.selectedValue.selectedValueSynchronouStype =
                        selectedOptions
                    break
                case 'ESelectBatchType_MockData':
                    this.selectedValue.selectedValueBatchType = selectedOptions
                    break
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
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async handleSearch() {
            try {
                const maDonVi_Change = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )
                const capHoc_Change = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const maTruong_Change = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )
                if (maTruong_Change.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn Trường học',
                        type: 'error'
                    })
                    return
                }
                const namHoc_Change = parseInt(
                    this.selectedValue.selectedValueSchoolYear
                )
                const currentYear = new Date().getFullYear()
                const timeDayStart_Change = this.selectedValue.selectedValueDate
                const maGiaoDich_Change = this.selectedValue.inputPasCode
                const maDoiTacCha_Change =
                    this.selectedValue.selectedValuePartner.value
                const trangThai_Change =
                    this.selectedValue.selectedValueSyncState.value

                const loaiDayDuLieu_Change =
                    this.selectedValue.selectedValueSynchronouStype.value
                const loaiDot_Change =
                    this.selectedValue.selectedValueBatchType.value
                const start = this.start
                const limit = this.limit

                const request_Data = {
                    ...this.request_Data,
                    capHoc: capHoc_Change,
                    loaiDayDuLieu: loaiDayDuLieu_Change,
                    loaiDot: loaiDot_Change,
                    maDoiTacCha: maDoiTacCha_Change,
                    maDonVi: maDonVi_Change,
                    maGiaoDich: maGiaoDich_Change,
                    maTruongHoc: maTruong_Change,
                    namDayDulieu: namHoc_Change || currentYear,
                    status: trangThai_Change,
                    timeDayEnd: timeDayStart_Change,
                    timeDayStart: timeDayStart_Change,
                    start: start,
                    limit: limit
                }

                const request_Header = {
                    token: this.authToken
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.lichSuTiepNhanDuLieu
                        .lichSuTiepNhanDuLieu,
                    request_Data,
                    request_Header,
                    null
                )

                if (response.total === 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Không có dữ liệu',
                            type: 'error'
                        })
                    }, 1000)

                    return
                }
                if (response.rc == 0) {
                    setTimeout(() => {
                        loading.close()
                        this.$message({
                            message: 'Danh sách dữ liệu',
                            type: 'success'
                        })
                    }, 1000)
                }
                console.log(response)
                this.total_rows = response.total
                this.tableData = response.rows
                console.log(this.tableData)
            } catch (error) {
                console.log(error)
            }
        },
        async getDataESelectPartner() {
            try {
                const request_Data = {
                    ...this.request_Data,
                    trangThai: 1
                }
                const request_Header = {
                    token: this.authToken
                }
                const request_Params = {
                    ...this.request_Params,
                    start: 0,
                    limit: 9999
                }

                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.lichSuTiepNhanDuLieu.heThongDoiTac,
                    request_Data,
                    request_Header,
                    request_Params
                )
                this.getDataESelect.ESelectPartner = response.rows
            } catch (error) {
                console.log(error)
            }
        },
        customhandleESelectedChange(options, valueType) {
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
                case 'selectedValueStatus':
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
        this.getDataESelectPartner()
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
    margin-top: 20px;
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
}
.table-hover tbody tr:hover {
    background-color: #f5f5f5;
}

.text-thead {
    font-size: 13px;
    text-align: center;
    vertical-align: middle;
}
.text-tbody {
    font-size: 12px;
    vertical-align: middle;
}

.custom-date-picker,
.layout-btn-table .custom-date-picker {
    height: 32px;
}

.custom-date-picker::placeholder,
.custom-date-picker::placeholder {
    color: gainsboro;

    font-size: 13px;
    background-color: transparent;
    appearance: none;
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
}
.custom-footer {
    display: flex;
    justify-content: space-evenly;
}

.custom-footer .span {
    margin-right: 10px;
    color: black;
    font-size: 15px;
}
.custom-footer .dflex {
    display: flex;
    align-items: center;

    padding: 0px 0px 4px 0px;
}
.layout-table-modal {
    padding: 50px 0 0 0;
    max-height: 800px;
    overflow-x: auto;
    overflow-y: auto;
}
.margin-top-150 {
    margin-top: 150px;
}
.custom-input {
    height: 400px; /* Đặt chiều cao tùy ý */
    overflow-x: auto;
    overflow-y: auto;
}
</style>
