<!--<template>-->
<!--    <div>-->
<!--        <CustomBreadcrumb-->
<!--            :title="'BÁO CÁO'"-->
<!--            :content="'BÁO CÁO ĐƠN VỊ (BÁO CÁO CHO SỞ)'"-->
<!--        />-->

<!--        <div class="layout-table">-->
<!--            <div>-->
<!--                <nav>-->
<!--                    <div class="nav nav-tabs">-->
<!--                        <a-->
<!--                            v-for="(tab, index) in dataBaoCaoChoSoTable"-->
<!--                            :key="index"-->
<!--                            :class="{-->
<!--                                'nav-item': true,-->
<!--                                'nav-link': true,-->
<!--                                active: activeTab === index,-->
<!--                                'custom-a': activeTab !== index-->
<!--                            }"-->
<!--                            @click="toggleTab(index)"-->
<!--                        >-->
<!--                            {{ tab.category }}-->
<!--                        </a>-->
<!--                    </div>-->
<!--                </nav>-->
<!--            </div>-->
<!--            <div class="report-content">-->
<!--                <table class="table table-bordered table-hover centered-table">-->
<!--                    <thead>-->
<!--                        <tr>-->
<!--                            <th class="text-thead">STT</th>-->
<!--                            <th class="text-thead">Mã báo cáo</th>-->
<!--                            <th class="text-thead">-->
<!--                                Tên báo cáo-->
<!--                                <span-->
<!--                                    v-if="-->
<!--                                        dataBaoCaoChoSoTable[activeTab] &&-->
<!--                                        dataBaoCaoChoSoTable[activeTab].category-->
<!--                                    "-->
<!--                                >-->
<!--                                    ({{-->
<!--                                        dataBaoCaoChoSoTable[activeTab].category-->
<!--                                    }})-->
<!--                                </span>-->
<!--                            </th>-->

<!--                            <th class="text-thead">Thao tác</th>-->
<!--                        </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                        <tr-->
<!--                            v-for="(data, index) in dataBaoCaoChoSoTable[-->
<!--                                activeTab-->
<!--                            ]?.children"-->
<!--                            :key="index"-->
<!--                        >-->
<!--                            <td class="text-tbody">{{ index + 1 }}</td>-->
<!--                            <td class="text-tbody">{{ data.maBaoCao }}</td>-->
<!--                            <td class="text-tbody">{{ data.tenBaoCao }}</td>-->

<!--                            <td class="text-tbody">-->
<!--                                <CustomButton-->
<!--                                    label="Xem"-->
<!--                                    size="small"-->
<!--                                    type="success"-->
<!--                                    @click="-->
<!--                                        openModalView(data.collectionName, index)-->
<!--                                    "-->
<!--                                />-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                    </tbody>-->
<!--                </table>-->
<!--            </div>-->

<!--            &lt;!&ndash; ************ Modal View ************ &ndash;&gt;-->

<!--            <el-dialog-->
<!--                :visible.sync="viewModalVisible"-->
<!--                width="80%"-->
<!--                @close="closeModalView"-->
<!--            >-->
<!--                <span slot="title" class="custom-dialog-title">-->
<!--                    Thêm mới cấu hình lịch đồng bộ-->
<!--                    <span-->
<!--                        v-if="-->
<!--                            dataBaoCaoChoSoTable[activeTab] &&-->
<!--                            dataBaoCaoChoSoTable[activeTab].category-->
<!--                        "-->
<!--                    >-->
<!--                        ({{ dataBaoCaoChoSoTable[activeTab].category }})-->
<!--                    </span>-->
<!--                </span>-->
<!--                <div class="row">-->
<!--                    <div class="col-4" style="margin-top: 30px">-->
<!--                        <label>Đơn vị</label>-->
<!--                        <div>-->
<!--                            <ESelect-->
<!--                                :reset="resetESelectUnitEducation"-->
<!--                                @reset-completed="-->
<!--                                    handleResetUnitEducationCompleted-->
<!--                                "-->
<!--                                style="width: 100%"-->
<!--                                no-match-text="Không tìm thấy bản ghi nào"-->
<!--                                no-data-text="danh sách lựa chọn trống"-->
<!--                                :clearable="true"-->
<!--                                :disabled="false"-->
<!--                                :data="this.dataChonDonVi_Store"-->
<!--                                :placeholder="'Chọn đơn vị'"-->
<!--                                :filterable="true"-->
<!--                                :multiple="true"-->
<!--                                :collapse-tags="true"-->
<!--                                :fields="['tenDonVi', 'maDonVi']"-->
<!--                                :value="selectedValue.selectedValueUnitEducation"-->
<!--                                @change="-->
<!--                                    handleESelectChange(-->
<!--                                        'ESelectUnitEducation',-->
<!--                                        ...$event-->
<!--                                    )-->
<!--                                "-->
<!--                            />-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-4" style="margin-top: 30px">-->
<!--                        <label>Trường học</label>-->
<!--                        <div>-->
<!--                            <ESelect-->
<!--                                :reset="resetESelectSchool"-->
<!--                                @reset-completed="handleResetSchoolCompleted"-->
<!--                                style="width: 100%"-->
<!--                                no-match-text="Không tìm thấy bản ghi nào"-->
<!--                                no-data-text="danh sách lựa chọn trống"-->
<!--                                :clearable="true"-->
<!--                                :disabled="false"-->
<!--                                :data="getDataESelect.ESelectSchool"-->
<!--                                :placeholder="'Chọn trường học'"-->
<!--                                :filterable="true"-->
<!--                                :multiple="true"-->
<!--                                :collapse-tags="true"-->
<!--                                :fields="['tenTruongHoc', 'maTruongHoc']"-->
<!--                                :value="selectedValue.selectedValueSchool"-->
<!--                                @change="-->
<!--                                    handleESelectChange(-->
<!--                                        'ESelectSchool_MockData',-->
<!--                                        ...$event-->
<!--                                    )-->
<!--                                "-->
<!--                            />-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div-->
<!--                        v-if="capHocInViewModal == 4 || capHocInViewModal == 5"-->
<!--                        class="col-4"-->
<!--                        style="margin-top: 30px"-->
<!--                    >-->
<!--                        <label>Nhóm nhà trẻ mầm non</label>-->
<!--                        <div>-->
<!--                            <ESelect-->
<!--                                :reset="resetESelectGradeLevel"-->
<!--                                @reset-completed="handleResetGradeLevelCompleted"-->
<!--                                style="width: 100%"-->
<!--                                no-match-text="Không tìm thấy bản ghi nào"-->
<!--                                no-data-text="danh sách lựa chọn trống"-->
<!--                                :clearable="true"-->
<!--                                :disabled="false"-->
<!--                                :data="-->
<!--                                    getDataESelect.ESelectGradeLevel_MockData_BaoCaoEQMS-->
<!--                                "-->
<!--                                :placeholder="'Chọn trường học'"-->
<!--                                :filterable="true"-->
<!--                                :multiple="true"-->
<!--                                :collapse-tags="true"-->
<!--                                :fields="['tenTruongHoc', 'value']"-->
<!--                                :value="selectedValue.selectedValueGradeLevel"-->
<!--                                @change="-->
<!--                                    handleESelectChange(-->
<!--                                        'ESelectGradeLevel_MockData',-->
<!--                                        ...$event-->
<!--                                    )-->
<!--                                "-->
<!--                            />-->
<!--                        </div>-->
<!--                    </div>-->

<!--                    <div class="col-2" style="margin-top: 30px">-->
<!--                        <label>Năm học</label>-->
<!--                        <div>-->
<!--                            <ESelectYear-->
<!--                                v-model="selectedValue.selectedValueSchoolYear"-->
<!--                                placeholder="Chọn năm"-->
<!--                                size="small"-->
<!--                                :no-data-text="'Không có bản ghi nào'"-->
<!--                                :no-match-text="'Không tìm thấy bản ghi nào'"-->
<!--                            ></ESelectYear>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="layout-btn">-->
<!--                    <div class="padding">-->
<!--                        <CustomButton-->
<!--                            label="Xem báo cáo"-->
<!--                            size="small"-->
<!--                            type="primary"-->
<!--                            @click="handleModalView()"-->
<!--                        />-->
<!--                    </div>-->
<!--                    <div class="padding">-->
<!--                        <CustomButton-->
<!--                            label="Tải xuống"-->
<!--                            size="small"-->
<!--                            type="success"-->
<!--                            @click="handleDownloadXlsxFile()"-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--            </el-dialog>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--import CustomButton from '@/components/CustomButton.vue'-->
<!--import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'-->
<!--import ESelect from '@/components/ESelect.vue'-->
<!--import ESelectYear from '@/components/ESelectYear.vue'-->
<!--import sendRequest from '@/services'-->
<!--import Api from '@/constants/Api'-->
<!--import { mapState } from 'vuex'-->
<!--import { ESelectGradeLevel_MockData_BaoCaoEQMS } from '@/mock_data'-->
<!--export default {-->
<!--    name: 'BaoCaoDonVi',-->
<!--    components: { CustomButton, CustomBreadcrumb, ESelect, ESelectYear },-->
<!--    data() {-->
<!--        return {-->
<!--            activeTab: 0, // Index của tab đầu tiên được chọn mặc định,-->
<!--            viewModalVisible: false,-->
<!--            collectionNameInViewModal: null,-->
<!--            capHocInViewModal: 4,-->
<!--            resetESelectSchool: false,-->
<!--            resetESelectUnitEducation: false,-->
<!--            resetESelectGradeLevel: false,-->

<!--            request_Data: {-->
<!--                capHoc: null,-->
<!--                collectionName: null,-->
<!--                maDonVis: [],-->
<!--                maNhomCapHocs: [],-->
<!--                maTruongs: [],-->
<!--                namHoc: null-->
<!--            },-->
<!--            request_Params: {-->
<!--                tenBaoCao: null,-->
<!--                namHoc: null-->
<!--            },-->
<!--            request_Header: {-->
<!--                Authorization: ''-->
<!--            },-->

<!--            dataBaoCaoChoSoTable: [],-->
<!--            getDataESelect: {-->
<!--                ESelectUnitEducation: [], //donvi-->
<!--                ESelectSchool: [], //truonghoc-->
<!--                ESelectGradeLevel_MockData_BaoCaoEQMS:-->
<!--                    ESelectGradeLevel_MockData_BaoCaoEQMS, //caphoc_baoCaoEQMS-->
<!--                ESelectShoolYear: null //namhoc-->
<!--            },-->

<!--            selectedValue: {-->
<!--                selectedValueUnitEducation: [], //donvu-->
<!--                selectedValueSchool: [], //truonghoc-->
<!--                selectedValueGradeLevel: [], //caphoc-->
<!--                selectedValueSchoolYear: [] //namhoc-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        async openModalView(collectionName) {-->
<!--            this.collectionNameInViewModal = collectionName // Gán giá trị collectionName cho biến mới-->
<!--            this.viewModalVisible = true-->

<!--            await this.getDataESelectSchool()-->
<!--        },-->
<!--        handleResetSchoolCompleted() {-->
<!--            this.resetESelectSchool = false-->
<!--        },-->
<!--        handleResetUnitEducationCompleted() {-->
<!--            this.resetESelectUnitEducation = false-->
<!--        },-->
<!--        handleResetGradeLevelCompleted() {-->
<!--            this.resetESelectGradeLevel = false-->
<!--        },-->
<!--        closeModalView() {-->
<!--            this.resetESelectGradeLevel = true-->
<!--            this.selectedValue.selectedValueGradeLevel = []-->

<!--            this.resetESelectUnitEducation = true-->
<!--            this.selectedValue.selectedValueUnitEducation = []-->

<!--            this.selectedValue.selectedValueSchool = []-->
<!--            this.resetESelectSchool = true-->
<!--            this.viewModalVisible = false-->
<!--        },-->

<!--        toggleTab(index) {-->
<!--            this.activeTab = index-->
<!--            this.capHocInViewModal = this.dataBaoCaoChoSoTable[index].capHoc-->

<!--            this.selectedValue.selectedValueUnitEducation = []-->
<!--        },-->
<!--        async handleModalView() {-->
<!--            try {-->
<!--                const collectionName = this.collectionNameInViewModal-->
<!--                const capHoc = this.capHocInViewModal-->

<!--                const maDonVis = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueUnitEducation,-->
<!--                    'selectedValueUnitEducation'-->
<!--                )-->

<!--                const maTruongs = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueSchool,-->
<!--                    'selectedValueSchool'-->
<!--                )-->
<!--                const maNhomCapHocs = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueGradeLevel,-->
<!--                    'selectedGradeLevel'-->
<!--                )-->

<!--                const currentYear = new Date().getFullYear()-->
<!--                const namHoc_Update = this.selectedValue.selectedValueSchoolYear-->
<!--                if (maDonVis.length === 0) {-->
<!--                    this.$message({-->
<!--                        message: 'Vui lòng chọn Đơn vị Tìm kiếm',-->
<!--                        type: 'warning'-->
<!--                    })-->
<!--                    return-->
<!--                }-->
<!--                const request_Header = {-->
<!--                    token: this.authToken-->
<!--                }-->
<!--                const request_Data = {-->
<!--                    ...this.request_Data,-->
<!--                    capHoc: capHoc,-->
<!--                    collectionName: collectionName,-->
<!--                    maDonVis: maDonVis,-->
<!--                    maNhomCapHocs: maNhomCapHocs,-->
<!--                    maTruongs: maTruongs,-->
<!--                    namHoc: namHoc_Update || currentYear-->
<!--                }-->
<!--                const response = await sendRequest(-->
<!--                    Api.baoCao.baoCaoChoSo.xemBaoCao,-->
<!--                    request_Data,-->
<!--                    request_Header,-->
<!--                    null-->
<!--                )-->
<!--                if (response.rc == 0) {-->
<!--                    const loading = this.$loading({-->
<!--                        lock: true,-->
<!--                        text: 'Đang tổng hợp',-->
<!--                        spinner: 'el-icon-loading',-->
<!--                        background: 'rgba(0, 0, 0, 0.7)'-->
<!--                    })-->

<!--                    setTimeout(() => {-->
<!--                        this.$message({-->
<!--                            message: 'Danh sách báo cáo mở ở Tab khác',-->
<!--                            type: 'success',-->
<!--                            onClose: () => {-->
<!--                                const url = `https://moetdb.dtsgroup.com.vn/view-excel?path=${encodeURIComponent(-->
<!--                                    response.urlContext-->
<!--                                )}`-->
<!--                                window.open(url, '_blank')-->
<!--                            }-->
<!--                        })-->

<!--                        loading.close()-->
<!--                    }, 1000)-->
<!--                }-->
<!--            } catch (error) {-->
<!--                console.log(error)-->
<!--            }-->
<!--        },-->
<!--        async handleDownloadXlsxFile() {-->
<!--            try {-->
<!--                const collectionName = this.collectionNameInViewModal-->
<!--                const capHoc = this.capHocInViewModal-->

<!--                const maDonVis = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueUnitEducation,-->
<!--                    'selectedValueUnitEducation'-->
<!--                )-->

<!--                const maTruongs = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueSchool,-->
<!--                    'selectedValueSchool'-->
<!--                )-->
<!--                const maNhomCapHocs = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueGradeLevel,-->
<!--                    'selectedGradeLevel'-->
<!--                )-->

<!--                const currentYear = new Date().getFullYear()-->
<!--                const namHoc_Update = this.selectedValue.selectedValueSchoolYear-->
<!--                if (maDonVis.length === 0) {-->
<!--                    this.$message({-->
<!--                        message: 'Vui lòng chọn Đơn vị Tìm kiếm',-->
<!--                        type: 'warning'-->
<!--                    })-->
<!--                    return-->
<!--                }-->
<!--                const request_Header = {-->
<!--                    token: this.authToken-->
<!--                }-->
<!--                const request_Data = {-->
<!--                    ...this.request_Data,-->
<!--                    capHoc: capHoc,-->
<!--                    collectionName: collectionName,-->
<!--                    maDonVis: maDonVis,-->
<!--                    maNhomCapHocs: maNhomCapHocs,-->
<!--                    maTruongs: maTruongs,-->
<!--                    namHoc: namHoc_Update || currentYear-->
<!--                }-->
<!--                const response = await sendRequest(-->
<!--                    Api.baoCao.baoCaoChoSo.xemBaoCao,-->
<!--                    request_Data,-->
<!--                    request_Header,-->
<!--                    null-->
<!--                )-->

<!--                if (response.rc == 0) {-->
<!--                    const loading = this.$loading({-->
<!--                        lock: true,-->
<!--                        text: 'Đang tổng hợp',-->
<!--                        spinner: 'el-icon-loading',-->
<!--                        background: 'rgba(0, 0, 0, 0.7)'-->
<!--                    })-->

<!--                    const linkDowndLoad = `http://moetdb.dtsgroup.com.vn/${response.urlContext}`-->

<!--                    setTimeout(() => {-->
<!--                        loading.close()-->
<!--                        this.$confirm(`Xác nhận tải xuống ?`, 'Thông báo', {-->
<!--                            confirmButtonText: 'Đồng ý',-->
<!--                            cancelButtonText: 'Hủy'-->
<!--                        })-->
<!--                            .then(() => {-->
<!--                                window.open(linkDowndLoad, '_blank')-->
<!--                            })-->
<!--                            .catch(() => {-->
<!--                                // Xử lý khi người dùng từ chối tải xuống-->
<!--                            })-->
<!--                    }, 1000) // Chờ 1 giây trước khi hiển thị confirm dialog-->
<!--                }-->
<!--            } catch (error) {-->
<!--                console.log(error)-->
<!--            }-->
<!--        },-->

<!--        async getDataBaoCaoChoSoTable() {-->
<!--            try {-->
<!--                const request_Header = {-->
<!--                    ...this.request_Header,-->
<!--                    token: this.authToken-->
<!--                }-->
<!--                const request_Params = {-->
<!--                    ...this.request_Params,-->
<!--                    namHoc: 2019,-->
<!--                    tenBaoCao: 'baoCaoChoSo'-->
<!--                }-->
<!--                const response = await sendRequest(-->
<!--                    Api.baoCao.baoCaoChoSo.danhSachBaoCao,-->
<!--                    null,-->
<!--                    request_Header,-->
<!--                    request_Params-->
<!--                )-->

<!--                this.dataBaoCaoChoSoTable = response-->
<!--            } catch (error) {-->
<!--                console.log(error)-->
<!--            }-->
<!--        },-->
<!--        async getDataESelectSchool() {-->
<!--            try {-->
<!--                const maDonVi = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueUnitEducation,-->
<!--                    'selectedValueUnitEducation'-->
<!--                )-->
<!--                let capHoc = this.capHocInViewModal-->

<!--                if (!Array.isArray(capHoc)) {-->
<!--                    capHoc = [capHoc]-->
<!--                }-->

<!--                const request_Header = {-->
<!--                    ...this.request_Header,-->
<!--                    token: this.authToken-->
<!--                }-->
<!--                const request_Data = {-->
<!--                    capHoc: capHoc,-->
<!--                    maDonVi: maDonVi-->
<!--                }-->

<!--                const response = await sendRequest(-->
<!--                    Api.internal_api.dm_School,-->
<!--                    request_Data,-->
<!--                    request_Header,-->
<!--                    null-->
<!--                )-->
<!--                console.log(response)-->

<!--                this.getDataESelect.ESelectSchool = response.rows-->
<!--            } catch (error) {-->
<!--                console.log(error)-->
<!--            }-->
<!--        },-->
<!--        handleESelectChange(source, ...selectedOptions) {-->
<!--            switch (source) {-->
<!--                case 'ESelectUnitEducation':-->
<!--                    this.selectedValue.selectedValueUnitEducation =-->
<!--                        selectedOptions-->
<!--                    this.resetESelectSchool = true-->
<!--                    this.selectedValue.selectedValueSchool = []-->
<!--                    this.getDataESelectSchool()-->
<!--                    break-->
<!--                case 'ESelectSchool_MockData':-->
<!--                    this.selectedValue.selectedValueSchool = selectedOptions-->
<!--                    break-->
<!--                case 'ESelectGradeLevel_MockData':-->
<!--                    this.selectedValue.selectedValueGradeLevel = selectedOptions-->

<!--                    break-->
<!--            }-->
<!--        },-->
<!--        customhandleESelectedChange(options, valueType) {-->
<!--            switch (valueType) {-->
<!--                case 'selectedValueUnitEducation':-->
<!--                case 'selectedValueSchool':-->
<!--                case 'selectedGradeLevel':-->
<!--                    return options.map((option) => option.value)-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    computed: {-->
<!--        ...mapState({-->
<!--            authUser: (state) => state.auth.user-->
<!--        }),-->
<!--        ...mapState({-->
<!--            authToken: (state) => state.auth.token-->
<!--        }),-->
<!--        dataChonDonVi_Store() {-->
<!--            return JSON.parse(localStorage.getItem('data_ChonDonVi'))-->
<!--        },-->
<!--        dataChonTruongHoc_Store() {-->
<!--            return JSON.parse(localStorage.getItem('data_ChonTruongHoc'))-->
<!--        },-->
<!--        updatedESelectSchool() {-->
<!--            return this.dataChonTruongHoc_Store-->
<!--        }-->
<!--    },-->
<!--    mounted() {-->
<!--        this.getDataBaoCaoChoSoTable()-->
<!--        this.getDataESelectSchool()-->
<!--        // console.log(this.getDataESelect.ESelectSchool)-->
<!--    },-->
<!--    watch: {-->
<!--        updatedESelectSchool: {-->
<!--            handler: function (newData) {-->
<!--                // this.getDataESelect.ESelectSchool = newData-->
<!--                // console.log(this.getDataESelect.ESelectSchool)-->
<!--            },-->
<!--            immediate: true-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.layout-table {-->
<!--    background: #fff;-->
<!--    padding: 20px 10px 20px 10px;-->
<!--    border-radius: 4px;-->
<!--}-->
<!--.report-content {-->
<!--    display: flex;-->

<!--    align-items: center;-->
<!--}-->

<!--.report-content table {-->
<!--    margin: 0 auto;-->
<!--}-->

<!--.report-content td {-->
<!--    vertical-align: middle;-->
<!--}-->
<!--.layout-table .active {-->
<!--    background: #f3f5f7;-->
<!--}-->
<!--.layout-table .custom-a {-->
<!--    border: none !important;-->
<!--    font-size: 14px !important;-->
<!--}-->
<!--.layout-table .custom-a:hover {-->
<!--    cursor: pointer;-->
<!--    background-color: #f8f9fa;-->
<!--}-->

<!--table thead tr {-->
<!--    background: #f3f5f7;-->
<!--}-->
<!--.table {-->
<!--    white-space: nowrap;-->
<!--}-->
<!--.centered-table {-->
<!--    margin-left: auto;-->
<!--    margin-right: auto;-->
<!--}-->

<!--.centered-table th,-->
<!--.centered-table td {-->
<!--    text-align: center;-->
<!--}-->

<!--.table-bordered {-->
<!--    background-color: #fff;-->
<!--}-->

<!--.table-bordered th,-->
<!--.table-bordered td {-->
<!--    border: 1px solid #dee2e6;-->
<!--}-->
<!--.table-hover tbody tr:hover {-->
<!--    background-color: #f5f5f5;-->
<!--}-->

<!--.text-thead {-->
<!--    font-size: 13px;-->
<!--}-->
<!--.text-thead span {-->
<!--    color: #da1313;-->
<!--}-->
<!--.text-tbody {-->
<!--    font-size: 13px;-->
<!--}-->
<!--.layout-btn {-->
<!--    margin-top: 30px;-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    margin-bottom: 30px;-->
<!--}-->
<!--.layout-btn .padding {-->
<!--    padding: 20px;-->
<!--}-->
<!--</style>-->
