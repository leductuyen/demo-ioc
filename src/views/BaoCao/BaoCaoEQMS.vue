<!--<template>-->
<!--    <div>-->
<!--        <CustomBreadcrumb :title="'BÁO CÁO'" :content="'BÁO CÁO EQMS'" />-->
<!--        <div class="content">-->
<!--            <div class="row">-->
<!--                <div class="col-4">-->
<!--                    <label>Đơn vị</label>-->
<!--                    <div>-->
<!--                        <ESelect-->
<!--                            style="width: 100%"-->
<!--                            no-match-text="Không tìm thấy bản ghi nào"-->
<!--                            no-data-text="danh sách lựa chọn trống"-->
<!--                            :clearable="true"-->
<!--                            :disabled="false"-->
<!--                            :data="this.dataChonDonVi_Store"-->
<!--                            :placeholder="'Chọn đơn vị'"-->
<!--                            :filterable="true"-->
<!--                            :multiple="false"-->
<!--                            :collapse-tags="true"-->
<!--                            :fields="['tenDonVi', 'maDonVi']"-->
<!--                            :value="selectedValue.selectedValueUnitEducation"-->
<!--                            @change="-->
<!--                                handleESelectChange(-->
<!--                                    'ESelectUnitEducation',-->
<!--                                    $event-->
<!--                                )-->
<!--                            "-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-2">-->
<!--                    <label>Cấp học <sup style="color: red">1</sup></label>-->
<!--                    <div>-->
<!--                        <ESelect-->
<!--                            style="width: 100%"-->
<!--                            no-match-text="Không tìm thấy bản ghi nào"-->
<!--                            no-data-text="danh sách lựa chọn trống"-->
<!--                            :clearable="true"-->
<!--                            :disabled="false"-->
<!--                            :data="getDataESelect.ESelectGradeLevel_MockData"-->
<!--                            :placeholder="'Chọn cấp học'"-->
<!--                            :filterable="true"-->
<!--                            :multiple="false"-->
<!--                            :collapse-tags="true"-->
<!--                            :fields="['tenTruongHoc', 'value']"-->
<!--                            :value="selectedValue.selectedValueGradeLevel"-->
<!--                            @change="-->
<!--                                handleESelectChange(-->
<!--                                    'ESelectGradeLevel_MockData',-->
<!--                                    $event-->
<!--                                )-->
<!--                            "-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-4">-->
<!--                    <label>Trường học</label>-->
<!--                    <div>-->
<!--                        <ESelect-->
<!--                            :reset="resetESelectSchool"-->
<!--                            @reset-completed="handleResetCompleted"-->
<!--                            style="width: 100%"-->
<!--                            no-match-text="Không tìm thấy bản ghi nào"-->
<!--                            no-data-text="danh sách lựa chọn trống"-->
<!--                            :clearable="true"-->
<!--                            :disabled="false"-->
<!--                            :data="getDataESelect.ESelectSchool"-->
<!--                            :placeholder="'Chọn trường học'"-->
<!--                            :filterable="true"-->
<!--                            :multiple="false"-->
<!--                            :collapse-tags="true"-->
<!--                            :fields="['tenTruongHoc', 'maTruongHoc']"-->
<!--                            :value="selectedValue.selectedValueSchool"-->
<!--                            @change="handleESelectChange('ESelectSchool', $event)"-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-2">-->
<!--                    <label>Năm học</label>-->
<!--                    <div>-->
<!--                        <ESelectYear-->
<!--                            v-model="selectedValue.selectedValueSchoolYear"-->
<!--                            placeholder="Chọn năm"-->
<!--                            size="small"-->
<!--                            :no-data-text="'Không có bản ghi nào'"-->
<!--                            :no-match-text="'Không tìm thấy bản ghi nào'"-->
<!--                        ></ESelectYear>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="layout-btn">-->
<!--                <div class="row d-flex justify-content-center align-items-center">-->
<!--                    <div class="col-1">-->
<!--                        <CustomButton-->
<!--                            label="Tìm kiếm"-->
<!--                            size="small"-->
<!--                            type="success"-->
<!--                            @click="handleSearch"-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="layout-table">-->
<!--            <div>-->
<!--                <nav>-->
<!--                    <div class="nav nav-tabs">-->
<!--                        <a-->
<!--                            v-for="(tab, index) in dataTableBaoCaoEQMS"-->
<!--                            :key="index"-->
<!--                            :class="{-->
<!--                                'nav-item': true,-->
<!--                                'nav-link': true,-->
<!--                                active: activeTab === index,-->
<!--                                'custom-a': activeTab !== index-->
<!--                            }"-->
<!--                            @click="changeTab(index)"-->
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
<!--                            <th class="text-thead-span">-->
<!--                                Tên báo cáo-->
<!--                                <span-->
<!--                                    v-if="-->
<!--                                        dataTableBaoCaoEQMS[activeTab] &&-->
<!--                                        dataTableBaoCaoEQMS[activeTab].category-->
<!--                                    "-->
<!--                                >-->
<!--                                    ({{-->
<!--                                        dataTableBaoCaoEQMS[activeTab].category-->
<!--                                    }})-->
<!--                                </span>-->
<!--                            </th>-->
<!--                            <th class="text-thead">Mã báo cáo</th>-->
<!--                            <th class="text-thead">Thao tác</th>-->
<!--                        </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                        <tr-->
<!--                            v-for="(report, index) in dataTableBaoCaoEQMS[-->
<!--                                activeTab-->
<!--                            ]?.children"-->
<!--                            :key="index"-->
<!--                        >-->
<!--                            <td class="text-tbody">{{ index + 1 }}</td>-->
<!--                            <td class="text-tbody-span">-->
<!--                                {{ report.tenBaoCao }}-->
<!--                            </td>-->
<!--                            <td class="text-tbody">{{ report.maBaoCao }}</td>-->
<!--                            <td class="text-tbody">-->
<!--                                <CustomButton-->
<!--                                    label="Xem trước File"-->
<!--                                    size="small"-->
<!--                                    type="primary"-->
<!--                                    @click="handleOpenFile(report.xlsxFile)"-->
<!--                                />-->
<!--                                <CustomButton-->
<!--                                    label="Tải xuống"-->
<!--                                    size="small"-->
<!--                                    type="info"-->
<!--                                    @click="-->
<!--                                        handleDownloadXlsxFile(-->
<!--                                            report.xlsxFile,-->
<!--                                            report.maBaoCao-->
<!--                                        )-->
<!--                                    "-->
<!--                                />-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                    </tbody>-->
<!--                </table>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="note">-->
<!--            <span style="color: blue"> Ghi chú: </span>-->
<!--            <span style="color: red">1-</span>-->
<!--            Tham số cấp học chỉ hỗ trợ cho việc tra cứu danh sách trường học.-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<!--<script>-->
<!--import ESelect from '@/components/ESelect.vue'-->
<!--import ESelectYear from '@/components/ESelectYear.vue'-->
<!--import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'-->
<!--import CustomButton from '@/components/CustomButton.vue'-->
<!--import {-->
<!--    ESelectGradeLevel_MockData,-->
<!--    dataBaoCaoEQMS_1_MockData,-->
<!--    dataBaoCaoEQMS_2_MockData-->
<!--} from '@/mock_data'-->
<!--import { mapState } from 'vuex'-->
<!--import sendRequest from '@/services'-->
<!--import Api from '@/constants/Api'-->

<!--export default {-->
<!--    name: 'BaoCaoEQMS',-->
<!--    components: { ESelect, CustomButton, CustomBreadcrumb, ESelectYear },-->
<!--    data() {-->
<!--        return {-->
<!--            msgError:-->
<!--                'Mẫu báo cáo chưa được cấu hình điều kiện. Vui lòng chọn chức năng Cấu hình Template trước khi Xuất dữ liệu báo cáo!',-->
<!--            msgSuccess: 'Lấy dữ liệu thành công',-->
<!--            resetESelectSchool: false,-->
<!--            request_Params: {-->
<!--                maPhongSelected: [],-->
<!--                maTruongSelected: [],-->
<!--                tenBaoCao: null,-->
<!--                namHoc: null-->
<!--            },-->
<!--            request_Header: {-->
<!--                Authorization: ''-->
<!--            },-->

<!--            activeTab: 0, // Index của tab đầu tiên được chọn mặc định-->
<!--            dataTableBaoCaoEQMS: [],-->
<!--            dataBaoCaoEQMS_1_MockData: dataBaoCaoEQMS_1_MockData,-->
<!--            dataBaoCaoEQMS_2_MockData: dataBaoCaoEQMS_2_MockData,-->
<!--            getDataESelect: {-->
<!--                ESelectUnitEducation: [], //donvi-->
<!--                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc-->
<!--                ESelectSchool: [], //truonghoc-->
<!--                ESelectShoolYear_MockData: [] //namhoc-->
<!--            },-->

<!--            selectedValue: {-->
<!--                selectedValueUnitEducation: [], //donvi-->
<!--                selectedValueGradeLevel: [], //caphoc-->
<!--                selectedValueSchool: [], //truonghoc-->
<!--                selectedValueSchoolYear: [] //namhoc-->
<!--            }-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        handleResetCompleted() {-->
<!--            this.resetESelectSchool = false-->
<!--        },-->
<!--        changeTab(index) {-->
<!--            console.log(index)-->
<!--            this.activeTab = index-->
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

<!--                case 'ESelectGradeLevel_MockData':-->
<!--                    this.selectedValue.selectedValueGradeLevel = selectedOptions-->
<!--                    this.resetESelectSchool = true-->
<!--                    this.selectedValue.selectedValueSchool = []-->
<!--                    this.getDataESelectSchool()-->
<!--                    break-->

<!--                case 'ESelectSchool':-->
<!--                    this.selectedValue.selectedValueSchool = selectedOptions-->
<!--                    break-->
<!--            }-->
<!--        },-->

<!--        async handleSearch() {-->
<!--            try {-->
<!--                const maPhongSelected = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueUnitEducation,-->
<!--                    'selectedValueUnitEducation'-->
<!--                )-->
<!--                const maTruongSelected = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueSchool,-->
<!--                    'selectedValueSchool'-->
<!--                )-->
<!--                const capHoc = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueGradeLevel,-->
<!--                    'selectedValueGradeLevel'-->
<!--                )-->

<!--                const request_Header = {-->
<!--                    ...this.request_Header,-->
<!--                    token: this.authToken-->
<!--                }-->

<!--                const namHoc = this.selectedValue.selectedValueSchoolYear-->
<!--                const currentYear = new Date().getFullYear()-->
<!--                const request_Params = {-->
<!--                    ...this.request_Params,-->
<!--                    maPhongSelected: maPhongSelected,-->
<!--                    maTruongSelected: maTruongSelected,-->
<!--                    tenBaoCao: 'baoCaoEQMS',-->
<!--                    capHoc: capHoc,-->
<!--                    namHoc: namHoc || currentYear-->
<!--                }-->
<!--                const response = await sendRequest(-->
<!--                    Api.baoCao.baoCaoEQMS.danhSachBaoCao,-->
<!--                    null,-->
<!--                    request_Header,-->
<!--                    request_Params-->
<!--                )-->
<!--                if (response) {-->
<!--                    const loading = this.$loading({-->
<!--                        lock: true,-->
<!--                        text: 'Loading',-->
<!--                        spinner: 'el-icon-loading',-->
<!--                        background: 'rgba(0, 0, 0, 0.7)'-->
<!--                    })-->
<!--                    setTimeout(() => {-->
<!--                        loading.close()-->
<!--                        this.$message({-->
<!--                            message: this.msgSuccess,-->
<!--                            type: 'success'-->
<!--                        })-->
<!--                    }, 1000)-->
<!--                }-->

<!--                this.dataTableBaoCaoEQMS = response-->
<!--                this.dataTableBaoCaoEQMS = this.dataTableBaoCaoEQMS.map(-->
<!--                    (item) => {-->
<!--                        return {-->
<!--                            ...item,-->
<!--                            children: [-->
<!--                                ...item.children,-->
<!--                                this.dataBaoCaoEQMS_1_MockData,-->
<!--                                this.dataBaoCaoEQMS_2_MockData-->
<!--                            ]-->
<!--                        }-->
<!--                    }-->
<!--                )-->
<!--                console.log(response)-->
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
<!--                const convertMaDonVi = maDonVi ? [maDonVi] : []-->

<!--                const capHoc = this.customhandleESelectedChange(-->
<!--                    this.selectedValue.selectedValueGradeLevel,-->
<!--                    'selectedValueGradeLevel'-->
<!--                )-->
<!--                const convertCapHoc = capHoc ? [capHoc] : []-->
<!--                const request_Header = {-->
<!--                    token: this.authToken-->
<!--                }-->
<!--                const request_Data = {-->
<!--                    capHoc: convertCapHoc,-->
<!--                    maDonVi: convertMaDonVi-->
<!--                }-->
<!--                const response = await sendRequest(-->
<!--                    Api.internal_api.dm_School,-->
<!--                    request_Data,-->
<!--                    request_Header,-->
<!--                    null-->
<!--                )-->
<!--                this.getDataESelect.ESelectSchool = response.rows-->
<!--            } catch (error) {-->
<!--                console.log(error)-->
<!--            }-->
<!--        },-->
<!--        async getDataTableBaoCaoEQMS() {-->
<!--            try {-->
<!--                const currentYear = new Date().getFullYear()-->
<!--                const request_Header = {-->
<!--                    ...this.request_Header,-->
<!--                    token: this.authToken-->
<!--                }-->
<!--                const request_Params = {-->
<!--                    ...this.request_Params,-->
<!--                    maPhongSelected: [],-->
<!--                    maTruongSelected: [],-->
<!--                    tenBaoCao: 'baoCaoEQMS',-->
<!--                    namHoc: currentYear-->
<!--                }-->
<!--                const response = await sendRequest(-->
<!--                    Api.baoCao.baoCaoEQMS.danhSachBaoCao,-->
<!--                    null,-->
<!--                    request_Header,-->
<!--                    request_Params-->
<!--                )-->

<!--                this.dataTableBaoCaoEQMS = response-->

<!--                this.dataTableBaoCaoEQMS = this.dataTableBaoCaoEQMS.map(-->
<!--                    (item) => {-->
<!--                        return {-->
<!--                            ...item,-->
<!--                            children: [-->
<!--                                ...item.children,-->
<!--                                this.dataBaoCaoEQMS_1_MockData,-->
<!--                                this.dataBaoCaoEQMS_2_MockData-->
<!--                            ]-->
<!--                        }-->
<!--                    }-->
<!--                )-->

<!--                console.log(this.dataTableBaoCaoEQMS)-->
<!--            } catch (error) {-->
<!--                console.log(error)-->
<!--            }-->
<!--        },-->
<!--        handleOpenFile(xlsxFile) {-->
<!--            if (xlsxFile === undefined) {-->
<!--                this.$message({-->
<!--                    message: this.msgError,-->
<!--                    type: 'error'-->
<!--                })-->
<!--                return-->
<!--            }-->

<!--            const url = `https://moetdb.dtsgroup.com.vn/view-excel?path=${encodeURIComponent(-->
<!--                xlsxFile-->
<!--            )}`-->
<!--            this.$confirm('Bạn muốn xem trước File', 'Thông báo', {-->
<!--                confirmButtonText: 'Đồng ý',-->
<!--                cancelButtonText: 'Hủy'-->
<!--            })-->
<!--                .then(() => {-->
<!--                    window.open(url, '_blank')-->
<!--                })-->
<!--                .catch(() => {-->
<!--                    // Xử lý khi người dùng từ chối tải xuống-->
<!--                })-->
<!--        },-->
<!--        handleDownloadXlsxFile(xlsxFile, maBaoCao) {-->
<!--            if (xlsxFile === undefined) {-->
<!--                this.$message({-->
<!--                    message: this.msgError,-->
<!--                    type: 'error'-->
<!--                })-->
<!--                return-->
<!--            }-->
<!--            const loading = this.$loading({-->
<!--                lock: true,-->
<!--                text: 'Đang tải xuống',-->
<!--                spinner: 'el-icon-loading',-->
<!--                background: 'rgba(0, 0, 0, 0.7)'-->
<!--            })-->
<!--            const linkDowndLoad = xlsxFile-->
<!--            setTimeout(() => {-->
<!--                loading.close()-->
<!--                this.$confirm(`Xác nhận tải ${maBaoCao}?`, 'Thông báo', {-->
<!--                    confirmButtonText: 'Đồng ý',-->
<!--                    cancelButtonText: 'Hủy'-->
<!--                })-->
<!--                    .then(() => {-->
<!--                        window.open(linkDowndLoad, '_blank')-->
<!--                    })-->
<!--                    .catch(() => {-->
<!--                        // Xử lý khi người dùng từ chối tải xuống-->
<!--                    })-->
<!--            }, 1000) // Chờ 1 giây trước khi hiển thị confirm dialog-->
<!--        },-->
<!--        customhandleESelectedChange(options, valueType) {-->
<!--            switch (valueType) {-->
<!--                case 'selectedValueUnitEducation':-->
<!--                case 'selectedValueSchool':-->
<!--                case 'selectedValueGradeLevel':-->
<!--                    return options.map((option) => option.value).join('')-->
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
<!--        }-->
<!--    },-->
<!--    mounted() {-->
<!--        this.getDataTableBaoCaoEQMS()-->
<!--        this.getDataESelectSchool()-->
<!--    }-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.content {-->
<!--    background: #fff;-->
<!--    padding: 10px 10px 10px 10px;-->
<!--    border-radius: 4px;-->
<!--    margin-bottom: 20px;-->
<!--}-->
<!--.content label {-->
<!--    display: inline-block;-->
<!--    max-width: 100%;-->
<!--    margin-bottom: 5px;-->
<!--    font-weight: 600;-->
<!--    font-size: 14px;-->
<!--}-->
<!--.content .title {-->
<!--    margin-bottom: 5px;-->
<!--    font-size: 18px;-->
<!--    color: #212529;-->
<!--}-->
<!--.layout-btn {-->
<!--    margin-top: 30px;-->
<!--    margin-bottom: 5px;-->
<!--}-->

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
<!--    border: 0 !important;-->
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

<!--/* .centered-table th,-->
<!--.centered-table td {-->
<!--    text-align: center;-->
<!--} */-->

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
<!--    text-align: center;-->
<!--}-->
<!--.text-thead-span span {-->
<!--    color: #da1313;-->
<!--}-->
<!--.text-tbody {-->
<!--    font-size: 13px;-->
<!--    text-align: center;-->
<!--}-->
<!--.text-body-span {-->
<!--    font-size: 13px;-->
<!--}-->
<!--.note {-->
<!--    padding: 20px 10px 5px 10px;-->
<!--}-->
<!--</style>-->
