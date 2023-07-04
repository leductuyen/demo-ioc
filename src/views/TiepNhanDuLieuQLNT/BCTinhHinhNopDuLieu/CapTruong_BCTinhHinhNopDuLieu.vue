<template>
    <div>
        <CustomBreadcrumb
            :title="'TIẾP NHẬN DỮ LIỆU QLNT'"
            :content="'BÁO CÁO TÌNH HÌNH NỘP DỮ LIỆU THEO TRƯỜNG HỌC'"
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
            <div class="row" style="margin-top: 10px">
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
                    <label
                        >Loại dữ liệu
                        <sup style="color: red">*</sup>
                    </label>
                    <div>
                        <ESelectOne
                            :clearable="true"
                            :disabled="false"
                            :value="selectedValue.selectedValueDataType"
                            :data="getDataESelect.ESelectDataType_MockData"
                            placeholder="Chọn một giá trị"
                            :filterable="true"
                            :collapseTags="false"
                            :fields="['tenDulieu', 'value']"
                            :no-data-text="'Không có bản ghi nào'"
                            :no-match-text="'Không tìm thấy bản ghi nào'"
                            @change="
                                handleESlectOneChange(
                                    'ESelectDataType_MockData',
                                    $event
                                )
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
                    <div class="col-1">
                        <CustomButton
                            label="Xuất Excel"
                            size="small"
                            type="primary"
                            @click="openModalExportExcel"
                        />

                        <el-dialog
                            :visible.sync="exportExcelModalVisible"
                            width="30%"
                            title="Xác nhận xuất Excel"
                            @close="closeModalExportExcel"
                            class="centered-dialog"
                        >
                            <span>excel</span>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-table">
            <chonSoLuongBanGhi @chonXongSoLuong="ChonSoLuongBanGhi($event)" />
            <!-- table Tất cả -->
            <table
                v-if="dataTypeTable == -1"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th class="text-thead" rowspan="3">STT</th>
                        <th class="text-thead" rowspan="3">Mã trường</th>
                        <th class="text-thead" rowspan="3">Tên trường</th>
                        <th class="text-thead" rowspan="3">Đối tác</th>
                        <th class="text-thead" rowspan="3">Cấp học</th>
                        <th class="text-thead" rowspan="3">Đơn vị quản lý</th>
                        <th class="text-thead" colspan="6">Cán bộ - Giáo viên</th>
                        <th class="text-thead" colspan="5">Lớp</th>
                        <th class="text-thead" colspan="3">Học sinh</th>
                        <th class="text-thead" colspan="5">Kết quả học tập</th>
                    </tr>
                    <tr>
                        <th class="text-thead" rowspan="2">
                            Tổng số CB-GV trên QLNT
                        </th>
                        <th class="text-thead" rowspan="2">
                            Tổng số CB-GV đã nộp
                        </th>
                        <th class="text-thead" rowspan="2">Ngày nộp cuối</th>
                        <th class="text-thead" colspan="3">Đề án ngoại ngữ</th>
                        <th class="text-thead" rowspan="2">
                            Tổng số lớp trên QLNT
                        </th>
                        <th class="text-thead" colspan="3">Số lớp đã nộp</th>
                        <th class="text-thead" rowspan="2">Ngày nộp cuối</th>
                        <th class="text-thead" rowspan="2">
                            Tổng số HS trên QLNT
                        </th>
                        <th class="text-thead" rowspan="2">Tổng số HS đã nộp</th>
                        <th class="text-thead" rowspan="2">Ngày nộp cuối</th>
                        <th class="text-thead" colspan="3">
                            Số HS đã nộp có KQHT
                        </th>
                        <th class="text-thead" rowspan="2">
                            Số HS Tốt nghiệp
                            <sup style="color: red">(1)</sup>
                        </th>
                        <th rowspan="2">Ngày nộp cuối</th>
                    </tr>
                    <tr>
                        <th class="text-thead">Giáo viên ngoại ngữ</th>
                        <th class="text-thead">GV được BDNCNL Ngoại ngữ</th>
                        <th class="text-thead">GV được BDNCNL Sư phạm</th>
                        <th class="text-thead">Tổng</th>
                        <th class="text-thead">Số lớp ghép</th>
                        <th class="text-thead">Số lớp đơn</th>
                        <th class="text-thead">Học kỳ I</th>
                        <th class="text-thead">Học kỳ II</th>
                        <th class="text-thead">Cả năm</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ (start / limit) * limit + index + 1 }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tenTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maDoiTac }}
                        </td>
                        <td class="text-tbody">
                            <div v-if="item.capHoc == 1">Tiểu học</div>
                            <div v-else-if="item.capHoc == 2">THCS</div>
                            <div v-else-if="item.capHoc == 3">THPT</div>
                            <div v-else-if="item.capHoc == 4">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 5">Mẫu giáo</div>
                            <div v-else-if="item.capHoc == 6">GDTX</div>
                            <div v-else-if="item.capHoc == 45">Mầm non</div>
                            <div v-else-if="item.capHoc == 12">
                                Trường liên cấp TH+THCS
                            </div>
                            <div v-else-if="item.capHoc == 13">
                                Trường liên cấp TH+THPT
                            </div>
                            <div v-else-if="item.capHoc == 23">
                                Trường liên THCS+THPT
                            </div>
                            <div v-else-if="item.capHoc == 123">
                                Trường liên cấp TH+THCS+THPT
                            </div>
                        </td>
                        <td class="text-tbody">
                            {{ item.tenDonVi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlCanBo.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlCanBo.tongSoBanGhiDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlCanBo.ngayNopCuoi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlDeAnNgoaiNgu.soGvNgoaiNgu }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlDeAnNgoaiNgu.soGvCoQuaTrinhBdncnlnn }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlDeAnNgoaiNgu.soGvCoQuaTrinhBdncnlsp }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlLopHoc.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlLopHoc.tongSoBanGhiDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlLopHoc.soLopGhep }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlLopHoc.soLopDon }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlLopHoc.ngayNopCuoi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlHocSinh.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlHocSinh.tongSoBanGhiDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.dlHocSinh.ngayNopCuoi }}
                        </td>
                        <td class="text-tbody">
                            {{ getSoHocSinhTheoHocKy(item.dlKqht, 1) }}
                        </td>
                        <td class="text-tbody">
                            {{ getSoHocSinhTheoHocKy(item.dlKqht, 2) }}
                        </td>
                        <td class="text-tbody">
                            {{ getSoHocSinhTheoHocKy(item.dlKqht, 3) }}
                        </td>
                        <td class="text-tbody">
                            {{ getSoHocSinhTotNghiep(item.dlKqht) }}
                        </td>
                        <td class="text-tbody">
                            {{ getNgayNopCuoi(item.dlKqht) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- table Cán bộ -->
            <table
                v-if="dataTypeTable == 2"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Đối tác</th>
                        <th class="text-thead">Cấp học</th>
                        <th class="text-thead">Đơn vị</th>
                        <th class="text-thead">Tổng số CB-GV đã nộp từ QLNT</th>
                        <th class="text-thead">
                            Số CB-GV đang làm việc đã nộp năm học trước
                        </th>
                        <th class="text-thead">Số CB-GV đang làm việc đã nộp</th>
                        <th class="text-thead">Ngày nộp cuối</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ (currentPage - 1) * limit + index + 1 }}
                        </td>
                        <td class="text-tbody">{{ item.maTruong }}</td>
                        <td class="text-tbody">{{ item.tenTruong }}</td>
                        <td class="text-tbody">{{ item.maDoiTac }}</td>
                        <td class="text-tbody">
                            <div v-if="item.capHoc == 1">Tiểu học</div>
                            <div v-else-if="item.capHoc == 2">THCS</div>
                            <div v-else-if="item.capHoc == 3">THPT</div>
                            <div v-else-if="item.capHoc == 4">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 5">Mẫu giáo</div>
                            <div v-else-if="item.capHoc == 6">GDTX</div>
                            <div v-else-if="item.capHoc == 45">Mầm non</div>
                            <div v-else-if="item.capHoc == 12">
                                Trường liên cấp TH+THCS
                            </div>
                            <div v-else-if="item.capHoc == 13">
                                Trường liên cấp TH+THPT
                            </div>
                            <div v-else-if="item.capHoc == 23">
                                Trường liên THCS+THPT
                            </div>
                            <div v-else-if="item.capHoc == 123">
                                Trường liên cấp TH+THCS+THPT
                            </div>
                        </td>
                        <td class="text-tbody">{{ item.tenDonVi }}</td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiDaNopNamTruoc }}
                        </td>
                        <td class="text-tbody">{{ item.tongSoBanGhiDaNop }}</td>
                        <td class="text-tbody">{{ item.ngayNopCuoi }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- table Lớp học -->
            <table
                v-if="dataTypeTable == 3"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th rowspan="2" class="text-thead">STT</th>
                        <th rowspan="2" class="text-thead">Mã trường</th>
                        <th rowspan="2" class="text-thead">Tên trường</th>
                        <th rowspan="2" class="text-thead">Đối tác</th>
                        <th rowspan="2" class="text-thead">Cấp học</th>
                        <th rowspan="2" class="text-thead">Đơn vị</th>
                        <th rowspan="2" class="text-thead">
                            Tổng số lớp trên QLNT
                        </th>
                        <th colspan="4" class="text-thead">Số lớp đã nộp</th>
                        <th rowspan="2" class="text-thead">Ngày nộp cuối</th>
                    </tr>
                    <tr>
                        <th class="text-thead">Tổng năm học trước</th>
                        <th class="text-thead">Tổng</th>
                        <th class="text-thead">Số lớp ghép</th>
                        <th class="text-thead">Số lớp đơn</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">{{ item.stt }}</td>
                        <td class="text-tbody">{{ item.maTruong }}</td>
                        <td class="text-tbody">{{ item.tenTruong }}</td>
                        <td class="text-tbody">{{ item.maDoiTac }}</td>
                        <td class="text-tbody">{{ item.capHoc }}</td>
                        <td class="text-tbody">{{ item.tenDonVi }}</td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiDaNopNamTruoc }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.soLopGhep }}
                        </td>
                        <td class="text-tbody">
                            {{ item.soLopDon }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayNopCuoi }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- table Học sinh -->
            <table
                v-if="dataTypeTable == 4"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Đối tác</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Cấp học</th>
                        <th class="text-thead">Đơn vị</th>
                        <th class="text-thead">Tổng số HS đang học trên QLNT</th>
                        <th class="text-thead">
                            Số HS đang học đã nộp năm học trước
                        </th>
                        <th class="text-thead">Số HS đang học đã nộp</th>
                        <th class="text-thead">Ngày nộp cuối</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ item.stt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maDoiTac }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tenTruong }}
                        </td>
                        <td class="text-tbody">
                            <div v-if="item.capHoc == 1">Tiểu học</div>
                            <div v-else-if="item.capHoc == 2">THCS</div>
                            <div v-else-if="item.capHoc == 3">THPT</div>
                            <div v-else-if="item.capHoc == 4">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 5">Mẫu giáo</div>
                            <div v-else-if="item.capHoc == 6">GDTX</div>
                            <div v-else-if="item.capHoc == 45">Mầm non</div>
                            <div v-else-if="item.capHoc == 12">
                                Trường liên cấp TH+THCS
                            </div>
                            <div v-else-if="item.capHoc == 13">
                                Trường liên cấp TH+THPT
                            </div>
                            <div v-else-if="item.capHoc == 23">
                                Trường liên THCS+THPT
                            </div>
                            <div v-else-if="item.capHoc == 123">
                                Trường liên cấp TH+THCS+THPT
                            </div>
                        </td>
                        <td class="text-tbody">
                            {{ item.tenDonVi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiDaNopNamTruoc }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayNopCuoi }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- table Kết quả học tập -->
            <table
                v-if="dataTypeTable == 5"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Đối tác</th>
                        <th class="text-thead">Cấp học</th>
                        <th class="text-thead">Đơn vị</th>
                        <th class="text-thead">Tổng số HS đang học trên QLNT</th>
                        <th class="text-thead">Số HS đã nộp</th>
                        <th class="text-thead">Số HS đã nộp có KQHT</th>
                        <th class="text-thead">
                            Số HS tốt nghiệp <sup style="color: red">(1)</sup>
                        </th>
                        <th class="text-thead">Ngày nộp cuối</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ item.stt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tenTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maDoiTac }}
                        </td>
                        <td class="text-tbody">
                            <div v-if="item.capHoc == 1">Tiểu học</div>
                            <div v-else-if="item.capHoc == 2">THCS</div>
                            <div v-else-if="item.capHoc == 3">THPT</div>
                            <div v-else-if="item.capHoc == 4">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 5">Mẫu giáo</div>
                            <div v-else-if="item.capHoc == 6">GDTX</div>
                            <div v-else-if="item.capHoc == 45">Mầm non</div>
                            <div v-else-if="item.capHoc == 12">
                                Trường liên cấp TH+THCS
                            </div>
                            <div v-else-if="item.capHoc == 13">
                                Trường liên cấp TH+THPT
                            </div>
                            <div v-else-if="item.capHoc == 23">
                                Trường liên THCS+THPT
                            </div>
                            <div v-else-if="item.capHoc == 123">
                                Trường liên cấp TH+THCS+THPT
                            </div>
                        </td>
                        <td class="text-tbody">
                            {{ item.tenDonVi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiTrenQlnt }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoHocSinhDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoBanGhiDaNop }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tongSoHocSinhTotNghiep }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayNopCuoi }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- table Phòng học -->
            <table
                v-if="dataTypeTable == 14"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Đối tác</th>
                        <th class="text-thead">Cấp học</th>
                        <th class="text-thead">Đơn vị</th>
                        <th class="text-thead">Ngày nộp cuối</th>
                        <th class="text-thead">Ký hiệu</th>
                        <th class="text-thead">Tình trạng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ item.maTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tenTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maDoiTac }}
                        </td>
                        <td class="text-tbody">
                            <div v-if="item.capHoc == 1">Tiểu học</div>
                            <div v-else-if="item.capHoc == 2">THCS</div>
                            <div v-else-if="item.capHoc == 3">THPT</div>
                            <div v-else-if="item.capHoc == 4">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 5">Mẫu giáo</div>
                            <div v-else-if="item.capHoc == 6">GDTX</div>
                            <div v-else-if="item.capHoc == 45">Mầm non</div>
                            <div v-else-if="item.capHoc == 12">
                                Trường liên cấp TH+THCS
                            </div>
                            <div v-else-if="item.capHoc == 13">
                                Trường liên cấp TH+THPT
                            </div>
                            <div v-else-if="item.capHoc == 23">
                                Trường liên THCS+THPT
                            </div>
                            <div v-else-if="item.capHoc == 123">
                                Trường liên cấp TH+THCS+THPT
                            </div>
                        </td>
                        <td class="text-tbody">
                            {{ item.tenDonVi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayNopCuoi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.kyHieuBieuMau }}
                        </td>
                        <td class="text-tbody">
                            <div v-html="item.duLieuLoi"></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- table Đề án ngoại ngữ -->
            <table
                v-if="dataTypeTable == 16"
                class="table table-bordered table-hover centered-table"
            >
                <thead>
                    <tr>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Đối tác</th>
                        <th class="text-thead">Cấp học</th>
                        <th class="text-thead">Đơn vị</th>
                        <th class="text-thead">GV ngoại ngữ</th>
                        <th class="text-thead">GV được BDNCNL Ngoại ngữ</th>
                        <th class="text-thead">GV được BDNCNL Sư phạm</th>
                        <th class="text-thead">Ngày cuối nộp</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            {{ item.maTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.tenTruong }}
                        </td>
                        <td class="text-tbody">
                            {{ item.maDoiTac }}
                        </td>
                        <td class="text-tbody">
                            <div v-if="item.capHoc == 1">Tiểu học</div>
                            <div v-else-if="item.capHoc == 2">THCS</div>
                            <div v-else-if="item.capHoc == 3">THPT</div>
                            <div v-else-if="item.capHoc == 4">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 5">Nhà trẻ</div>
                            <div v-else-if="item.capHoc == 45">Mầm non</div>
                            <div v-else-if="item.capHoc == 12">
                                Trường liên cấp TH+THCS
                            </div>
                            <div v-else-if="item.capHoc == 13">
                                Trường liên cấp TH+THPT
                            </div>
                            <div v-else-if="item.capHoc == 23">
                                Trường liên THCS+THPT
                            </div>
                            <div v-else-if="item.capHoc == 123">
                                Trường liên cấp TH+THCS+THPT
                            </div>
                        </td>
                        <td class="text-tbody">
                            {{ item.tenDonVi }}
                        </td>
                        <td class="text-tbody">
                            {{ item.soGvNgoaiNgu }}
                        </td>
                        <td class="text-tbody">
                            {{ item.soGvCoQuaTrinhBdncnlnn }}
                        </td>
                        <td class="text-tbody">
                            {{ item.soGvCoQuaTrinhBdncnlsp }}
                        </td>
                        <td class="text-tbody">
                            {{ item.ngayNopCuoi }}
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
    </div>
</template>
<script>
import ESelect from '@/components/ESelect.vue'
import ESelectOne from '@/components/ESelectOne.vue'
import CustomButton from '@/components/CustomButton.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import {
    ESelectGradeLevel_MockData,
    ESelectSemester_MockData,
    ESelectDataType_MockData
} from '@/mock_data'
import { mapState } from 'vuex'
import sendRequest from '@/services'
import Api from '@/constants/Api'

export default {
    name: 'capTruongBCTinhHinhNopDuLieu',
    components: {
        ESelect,
        CustomButton,
        ESelectYear,
        ESelectOne,
        CustomPagination,
        chonSoLuongBanGhi,
        CustomBreadcrumb
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
            request_Header: {
                Authorization: ''
            },
            request_Data: {
                capHocList: [],
                hocKy: '',
                loaiDuLieu: null,
                maDonViList: [],
                maTruongHocList: [],
                namHoc: null,
                start: null,
                limit: null
            },
            tableData: [],
            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [], //truonghoc
                ESelectShoolYear_MockData: [], //namhoc
                ESelectSemester_MockData: ESelectSemester_MockData, //hocki
                ESelectDataType_MockData: ESelectDataType_MockData //loaidulieu
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [], //truonghoc
                selectedValueSchoolYear: [], //namhoc
                selectedValueSemester: [], //hocki
                selectedValueDataType: [] //loaidulieu
            },
            dataTypeTable: null, // hiển thị table theo kiểu dữ liệu
            exportExcelModalVisible: false
        }
    },
    methods: {
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        openModalExportExcel() {
            this.exportExcelModalVisible = true
        },
        closeModalExportExcel() {
            this.exportExcelModalVisible = false
        },
        handleESlectOneChange(source, selectedOptions) {
            switch (source) {
                case 'ESelectSemester_MockData':
                    this.selectedValue.selectedValueSemester = selectedOptions
                    break
                case 'ESelectDataType_MockData':
                    this.selectedValue.selectedValueDataType = selectedOptions
                    this.dataTypeTable =
                        this.selectedValue.selectedValueDataType.value // hiển thị table theo kiểu dữ liệu
                    this.tableData = [] // reset lại tableData mỗi lần select thay đổi
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
                const maDonViList_Change = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )
                const capHocList_Change = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const maTruongHocList_Change = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )
                const loaiDuLieu_Change =
                    this.selectedValue.selectedValueDataType.value
                const namHoc_Change = this.selectedValue.selectedValueSchoolYear
                const currentYear = new Date().getFullYear()
                const limit = this.limit
                const start = this.start

                if (this.dataTypeTable === null) {
                    this.$message({
                        message: 'Vui lòng chọn loại dữ liệu',
                        type: 'error'
                    })
                    return
                }
                const request_Data = {
                    ...this.request_Data,
                    maSo: this.authUser.province,
                    capHocList: capHocList_Change,
                    hocKy: '',
                    loaiDuLieu: loaiDuLieu_Change,
                    maDonViList: maDonViList_Change,
                    maTruongHocList: maTruongHocList_Change,
                    namHoc: namHoc_Change || currentYear,
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
                    Api.tiepNhanDuLieuQLNT.baoCaoTinhHinhNopDuLieu.capTruong,
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
        handleExportExcel() {},
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
            }
        },
        getCustomCapHoc(capHoc) {
            switch (capHoc) {
                case 1:
                    return 'Tiểu học'
                case 2:
                    return 'THCS'
                case 3:
                    return 'THPT'
                case 4:
                    return 'Nhà trẻ'
                case 5:
                    return 'Mẫu giáo'
                case 6:
                    return 'GDTX'
                case 45:
                    return 'Mầm non'
                case 12:
                    return 'Trường liên cấp TH+THCS'
                case 13:
                    return 'Trường liên cấp TH+THPT'
                case 23:
                    return 'Trường liên THCS+THPT'
                case 123:
                    return 'Trường liên cấp TH+THCS+THPT'
                default:
                    return ''
            }
        },
        getSoHocSinhTheoHocKy(e, a) {
            let hocKy = a
            let duLieu = e
            let result = ''

            for (let i = 0; i < duLieu.length; i++) {
                if (duLieu[i].hocKi == hocKy) {
                    result = duLieu[i].tongSoBanGhiDaNop
                }
            }
            return result
        },
        getSoHocSinhTotNghiep(e) {
            let duLieu = e
            let result = null
            for (let i = duLieu.length - 1; i >= 0; i--) {
                if (duLieu[i].hocKi == 3 && duLieu[i].tongSoHocSinhTotNghiep) {
                    result = duLieu[i].tongSoHocSinhTotNghiep
                    return result
                }
                if (duLieu[i].hocKi == 2 && duLieu[i].tongSoHocSinhTotNghiep) {
                    result = duLieu[i].tongSoHocSinhTotNghiep
                    return result
                }
                if (duLieu[i].hocKi == 1 && duLieu[i].tongSoHocSinhTotNghiep) {
                    result = duLieu[i].tongSoHocSinhTotNghiep
                    return result
                }
            }
            return result
        },
        getNgayNopCuoi(e) {
            let duLieu = e
            let result = null
            for (let i = duLieu.length - 1; i >= 0; i--) {
                if (duLieu[i].hocKi == 3 && duLieu[i].ngayNopCuoi) {
                    result = duLieu[i].ngayNopCuoi
                    return result
                }
                if (duLieu[i].hocKi == 2 && duLieu[i].ngayNopCuoi) {
                    result = duLieu[i].ngayNopCuoi

                    return result
                }
                if (duLieu[i].hocKi == 1 && duLieu[i].ngayNopCuoi) {
                    result = duLieu[i].ngayNopCuoi
                    return result
                }
            }
            return result
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
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
}
.text-tbody {
    font-size: 12px;
}
</style>
