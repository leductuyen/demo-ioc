<template>
    <div>
        <CustomBreadcrumb
            :title="'TIẾP NHẬN DỮ LIỆU QLNT'"
            :content="'CẤU HÌNH LỊCH ĐỒNG BỘ CẤP SỞ'"
        />
        <div class="content">
            <div class="title">Năm học</div>
            <div class="row">
                <div class="col-3 d-flex justify-content-between">
                    <div>
                        <ESelectYear
                            v-model="selectedValueSchoolYear"
                            placeholder="Chọn năm"
                            size="small"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                        ></ESelectYear>
                    </div>
                    <div>
                        <CustomButton
                            label="Tìm kiếm"
                            @click="handleClickSearch"
                            size="small"
                            type="success"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-table">
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Năm học</th>
                        <th class="text-thead">Ngày bắt đầu</th>
                        <th class="text-thead">Ngày kết thúc</th>
                        <th class="text-thead">Ngày cập nhật</th>
                        <th class="text-thead">Trạng thái</th>
                        <th class="text-thead">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="tableData.length === 0">
                        <tr>
                            <td colspan="7" class="text-tbody">
                                Không có bản ghi nào.
                            </td>
                        </tr>
                    </template>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">{{ index + 1 }}</td>
                        <td class="text-tbody">{{ item.namHoc }}</td>
                        <td class="text-tbody">{{ item.dauNamTuNgay }}</td>
                        <td class="text-tbody">{{ item.dauNamToiNgay }}</td>
                        <td class="text-tbody">{{ item.updatedTime }}</td>
                        <td class="text-tbody">
                            <span v-if="item.status === 1"
                                ><CustomButton
                                    label="Đang hoạt động"
                                    size="small"
                                    type="success"
                            /></span>
                            <span v-if="item.status === 0"
                                ><CustomButton
                                    label="Ngừng hoạt động"
                                    size="small"
                                    type="danger"
                            /></span>
                        </td>
                        <td class="text-tbody">
                            <span>
                                <span v-if="item.status === 1" class="custom-btn">
                                    <CustomButton
                                        icon="el-icon-lock"
                                        label="Khóa"
                                        size="small"
                                        type="danger"
                                        @click="openModalLockUp"
                                    />
                                </span>
                                <span v-if="item.status === 0" class="custom-btn">
                                    <CustomButton
                                        icon="el-icon-lock"
                                        label="Mở Khóa"
                                        size="small"
                                        type="success"
                                        @click="openModalLockUp"
                                    />
                                </span>
                                <el-dialog
                                    :visible.sync="lockUpModalVisible"
                                    width="30%"
                                    title="Xác nhận thay đổi trạng thái"
                                    @close="closeModalLockUp"
                                    class="custom-dialog"
                                >
                                    <div class="custom-dialog-body">
                                        <span>
                                            <CustomButton
                                                label="Hủy"
                                                size="small"
                                                @click="closeModalLockUp"
                                            />
                                            <CustomButton
                                                label="Đồng ý"
                                                size="small"
                                                type="primary"
                                                @click="
                                                    handleClickChangeStatus(
                                                        item.id
                                                    )
                                                "
                                            />
                                        </span>
                                    </div>
                                </el-dialog>
                            </span>
                            <span>
                                <CustomButton
                                    icon="el-icon-edit"
                                    label="Chỉnh sửa"
                                    size="small"
                                    type="warning"
                                    @click="openModalUpdate"
                                />
                                <el-dialog
                                    :visible.sync="updateModalVisible"
                                    :title="`Cấu hình Chỉnh sửa năm ${selectedValueSchoolYear}`"
                                    width="30%"
                                    @close="closeModalUpdate"
                                >
                                    <div class="padding">
                                        <div class="span">
                                            <span>Thời gian đẩy dữ liệu</span>
                                        </div>
                                        <div class="input-group input-daterange">
                                            <date-picker
                                                :config="configDatePicker"
                                                placeholder="Ngày bắt đầu"
                                                v-model="item.dauNamTuNgay"
                                                @change="
                                                    updateSelectedValue(
                                                        item.dauNamTuNgay,
                                                        'startDate'
                                                    )
                                                "
                                                class="custom-date-picker"
                                            ></date-picker>
                                            <div class="input-group-addon">
                                                đến
                                            </div>
                                            <date-picker
                                                :config="configDatePicker"
                                                placeholder="Ngày kết thúc"
                                                v-model="item.dauNamToiNgay"
                                                @change="
                                                    updateSelectedValue(
                                                        item.dauNamToiNgay,
                                                        'endDate'
                                                    )
                                                "
                                                class="custom-date-picker"
                                            ></date-picker>
                                        </div>
                                        <hr />
                                        <div class="btn">
                                            <CustomButton
                                                label="Hủy"
                                                size="small"
                                                @click="closeModalUpdate"
                                            />
                                            <CustomButton
                                                label="Chỉnh sửa"
                                                type="warning"
                                                size="small"
                                                @click="
                                                    handleClickUpdate(item.id)
                                                "
                                            />
                                        </div>
                                    </div>
                                </el-dialog>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import datePicker from 'vue-bootstrap-datetimepicker'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import moment from 'moment'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import ESelectYear from '@/components/ESelectYear.vue'
import CustomButton from '@/components/CustomButton.vue'
import { mapState } from 'vuex'
import sendRequest from '@/services'
import Api from '@/constants/Api'
export default {
    name: 'capSoCauHinhLichDongBo',
    components: { CustomButton, ESelectYear, datePicker, CustomBreadcrumb },
    data() {
        return {
            configDatePicker: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
                showTodayButton: true,
                locale: 'vi'
            },
            lockUpModalVisible: false, // Biến điều khiển hiển thị modal Khóa
            updateModalVisible: false,
            tableData: [],
            selectedValue: {
                selectedValueStartDate: '',
                selectedValueEndDate: ''
            },
            selectedValueSchoolYear: null,
            request_Data: {
                ids: null,
                status: null
            },
            request_Params: {
                idSo: null,
                limit: 25,
                namHoc: 2022,
                start: 0,
                status: null
            },

            requestHeaders: {
                Authorization: ''
            }
        }
    },
    methods: {
        openModalLockUp() {
            this.lockUpModalVisible = true
        },
        closeModalLockUp() {
            this.lockUpModalVisible = false
        },
        openModalUpdate() {
            this.updateModalVisible = true
        },
        closeModalUpdate() {
            this.updateModalVisible = false
        },

        async getDataTable() {
            this.requestHeaders = {
                token: this.authToken
            }
            const currentYear = new Date().getFullYear()
            this.request_Params = {
                ...this.request_Params,
                idSo: this.authUser.province,
                namHoc: this.selectedValueSchoolYear || currentYear
            }

            const response = await sendRequest(
                Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo.capSo,
                null,
                this.requestHeaders,
                this.request_Params
            )

            if (response.rc == 0) {
                this.$message({
                    message: 'Danh sách dữ liệu',
                    type: 'success'
                })
                this.tableData = response.tableData
            } else if (response.rc == 2) {
                this.$message({
                    message: 'Danh sách dữ liệu trống',
                    type: 'error'
                })
            }
        },

        async handleClickSearch() {
            try {
                const request_Params_Update = {
                    ...this.request_Params,
                    namHoc: this.selectedValueSchoolYear
                }
                this.request_Params = request_Params_Update
                await this.getDataTable()
            } catch (error) {
                console.log(error)
            }
        },
        updateSelectedValue(newValue, field) {
            if (field === 'startDate') {
                this.selectedValue.selectedValueStartDate = newValue
            } else if (field === 'endDate') {
                this.selectedValue.selectedValueEndDate = newValue
            }
        },
        async handleClickChangeStatus(id) {
            try {
                const loading = this.$loading({
                    lock: true,
                    text: 'Đang thay đổi trạng thái',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const currentYear = new Date().getFullYear()
                const formatId = [id]
                this.request_Data = {
                    ...this.request_Data,
                    idSo: this.authUser.province,
                    status: 0,
                    ids: formatId,
                    namHoc: this.selectedValueSchoolYear || currentYear
                }
                this.requestHeaders = {
                    token: this.authToken
                }

                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo.toggleStatus,
                    this.request_Data,
                    this.requestHeaders,
                    null
                )

                await this.getDataTable()
                if (response.rc == 0) {
                    loading.close()
                    this.$message({
                        message: 'Thay đổi trạng thái thành công',
                        type: 'success'
                    })
                    this.lockUpModalVisible = false
                }
            } catch (error) {
                console.log(error)
            }
        },

        async handleClickUpdate(id) {
            try {
                const loading = this.$loading({
                    lock: true,
                    text: 'Đang thay đổi trạng thái',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                const tuNgay = this.selectedValue.selectedValueStartDate.join('')
                const denNgay = this.selectedValue.selectedValueEndDate.join('')

                const currentYear = new Date().getFullYear()
                const formatId = [id]
                const requestData = {
                    idSo: this.authUser.province,
                    status: null,
                    ids: formatId,
                    tuNgay: tuNgay,
                    denNgay: denNgay,
                    namHoc: this.selectedValueSchoolYear || currentYear
                }
                const requestHeaders = {
                    token: this.authToken
                }

                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo.thayDoiNgay,
                    requestData,
                    requestHeaders,
                    null
                )

                await this.getDataTable()

                if (response.rc === 0) {
                    loading.close()
                    this.$message({
                        message: 'Thay đổi trạng thái thành công',
                        type: 'success'
                    })
                    this.updateModalVisible = false
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
    computed: {
        ...mapState({
            authUser: (state) => state.auth.user
        }),
        ...mapState({
            authToken: (state) => state.auth.token
        })
    },
    mounted() {
        this.getDataTable()

        const currentYear = new Date().getFullYear()

        this.selectedValueSchoolYear = String(currentYear)
    },
    watch: {
        tableData: {
            handler(newVal) {
                const dauNamTuNgayValues = newVal.map((item) => item.dauNamTuNgay)
                const dauNamToiNgayValues = newVal.map(
                    (item) => item.dauNamToiNgay
                )
                this.selectedValue.selectedValueStartDate = dauNamTuNgayValues
                this.selectedValue.selectedValueEndDate = dauNamToiNgayValues
                // Thực hiện các hành động khác theo nhu cầu
            },
            deep: true
        }
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
    display: flex;
    background: #fff;
    padding: 20px 10px 20px 10px;
    border-radius: 4px;
    align-items: center;
}

.layout-table table {
    margin: 0 auto;
}

.layout-table td {
    vertical-align: middle;
}
.layout-table .active {
    background: rgb(228, 235, 245);
}
.layout-table .custom-a {
    border: 0 !important;
}
.layout-table .custom-a:hover {
    cursor: pointer;
    background-color: #f8f9fa;
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
}

.text-tbody {
    font-size: 13px;
    text-align: center;
}

.text-tbody .span {
    display: flex;
    font-size: 12px;
    margin-bottom: 5px;
}

.text-tbody .padding {
    padding: 0px 10px 20px 10px;
}
.text-tbody .custom-date-picker {
    height: 28px;
}

.text-tbody .custom-date-picker::placeholder {
    color: gainsboro;

    font-size: 13px;
    background-color: transparent;
    appearance: none;
}
.text-tbody .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
}
.text-tbody hr {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
}
.text-tbody .custom-btn {
    margin-right: 10px;
}
.text-tbody .btn {
    display: flex;

    padding: 0 !important;
    justify-content: flex-end;
    margin-top: 20px;
}
.custom-dialog-body {
    padding: 10px 0px 20px 0px;
}
.text-body-span {
    font-size: 12px;
}
</style>
