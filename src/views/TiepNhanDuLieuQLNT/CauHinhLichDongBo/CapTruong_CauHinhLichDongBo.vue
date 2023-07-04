<template>
    <div>
        <CustomBreadcrumb
            :title="'TIẾP NHẬN DỮ LIỆU QLNT'"
            :content="'CẤU HÌNH LỊCH ĐỒNG BỘ CẤP TRƯỜNG'"
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
                <div class="col-2">
                    <label> Trạng thái </label>
                    <div>
                        <ESelect
                            style="width: 100%"
                            no-match-text="Không tìm thấy bản ghi nào"
                            no-data-text="danh sách lựa chọn trống"
                            :clearable="true"
                            :disabled="false"
                            :data="getDataESelect.ESelectStatus"
                            :placeholder="'Chọn trạng thái'"
                            :filterable="true"
                            :multiple="false"
                            :collapse-tags="true"
                            :fields="['tenTrangThai', 'value']"
                            :value="selectedValue.selectedValueStatus"
                            @change="
                                handleESelectChange(
                                    'ESelectStatus_MockData',
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
                </div>
            </div>
        </div>

        <div class="layout-table">
            <div class="layout-btn-table">
                <div>
                    <chonSoLuongBanGhi
                        @chonXongSoLuong="ChonSoLuongBanGhi($event)"
                    />
                </div>
                <div>
                    <span class="margin-right-10">
                        <CustomButton
                            size="small"
                            label="Thêm mới"
                            type="primary"
                            @click="openModalAddNew"
                        />
                        <el-dialog
                            :visible.sync="addNewModalVisible"
                            width="80%"
                            title="Thêm mới cấu hình lịch đồng bộ cấp Trường"
                            @close="closeModalAddNew"
                            class="custom-dialog"
                        >
                            <hr />
                            <div v-if="statusModalAddNew === false">
                                <div class="row">
                                    <div class="col-4">
                                        <label class="label-addnew">Đơn vị</label>
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
                                                    selectedValue_addNew.selectedValueUnitEducation_addNew
                                                "
                                                @change="
                                                    handleESelectChange_addNew(
                                                        'ESelectUnitEducation_addNew',
                                                        ...$event
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <label class="label-addnew"
                                            >Cấp học</label
                                        >
                                        <div>
                                            <ESelect
                                                style="width: 100%"
                                                no-match-text="Không tìm thấy bản ghi nào"
                                                no-data-text="danh sách lựa chọn trống"
                                                :clearable="true"
                                                :disabled="false"
                                                :data="
                                                    getDataESelect.ESelectGradeLevel_MockData
                                                "
                                                :placeholder="'Chọn cấp học'"
                                                :filterable="true"
                                                :multiple="true"
                                                :collapse-tags="true"
                                                :fields="[
                                                    'tenTruongHoc',
                                                    'value'
                                                ]"
                                                :value="
                                                    selectedValue_addNew.selectedValueGradeLevel_addNew
                                                "
                                                @change="
                                                    handleESelectChange_addNew(
                                                        'ESelectGradeLevel_MockData_addNew',
                                                        ...$event
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <label class="label-addnew"
                                            >Trường học</label
                                        >
                                        <div>
                                            <ESelect
                                                :reset="resetESelectSchool_addNew"
                                                @reset-completed="
                                                    handleResetCompleted_addNew
                                                "
                                                style="width: 100%"
                                                no-match-text="Không tìm thấy bản ghi nào"
                                                no-data-text="danh sách lựa chọn trống"
                                                :clearable="true"
                                                :disabled="false"
                                                :data="
                                                    getDataESelect_addNew.ESelectSchool_addNew
                                                "
                                                :placeholder="'Chọn trường học'"
                                                :filterable="true"
                                                :multiple="true"
                                                :collapse-tags="true"
                                                :fields="[
                                                    'tenTruongHoc',
                                                    'maTruongHoc'
                                                ]"
                                                :value="
                                                    selectedValue_addNew.selectedValueSchool_addNew
                                                "
                                                @change="
                                                    handleESelectChange_addNew(
                                                        'ESelectSchool_MockData_addNew',
                                                        ...$event
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <label class="label-addnew"
                                            >Năm học</label
                                        >
                                        <div>
                                            <ESelectYear
                                                v-model="
                                                    selectedValue_addNew.selectedValueSchoolYear_addNew
                                                "
                                                placeholder="Chọn năm"
                                                size="small"
                                                :no-data-text="'Không có bản ghi nào'"
                                                :no-match-text="'Không tìm thấy bản ghi nào'"
                                            ></ESelectYear>
                                        </div>
                                    </div>
                                    <div class="layout-date-addNew">
                                        <label class="label-addnew">
                                            Thời hạn nộp
                                        </label>
                                        <div class="input-group input-daterange">
                                            <date-picker
                                                :config="configDatePicker"
                                                v-model="
                                                    selectedValueDate_addNew.selectedValueStartDate_addNew
                                                "
                                                placeholder="Ngày bắt đầu"
                                                class="custom-date-picker"
                                            ></date-picker>
                                            <div class="input-group-addon">
                                                đến
                                            </div>
                                            <date-picker
                                                :config="configDatePicker"
                                                v-model="
                                                    selectedValueDate_addNew.selectedValueEndDate_addNew
                                                "
                                                placeholder="Ngày kết thúc"
                                                class="custom-date-picker"
                                            ></date-picker>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="margin-top-100"></div>
                                <div class="layout-btn-addNew">
                                    <CustomButton
                                        label="Hủy"
                                        size="small"
                                        @click="closeModalAddNew"
                                    />
                                    <CustomButton
                                        label="Xác nhận thêm mới"
                                        size="small"
                                        @click="handleAddNew"
                                        type="primary"
                                    />
                                </div>
                            </div>

                            <div
                                v-if="statusModalAddNew === true"
                                class="layout-table-toggleLock"
                            >
                                <span
                                    >Danh sách trường học đã tồn tại cấu hình
                                </span>
                                <table
                                    class="table table-bordered table-hover centered-table"
                                >
                                    <thead>
                                        <tr>
                                            <th class="text-thead">STT</th>
                                            <th class="text-thead">Tên Trường</th>
                                            <th class="text-thead">Mã Trường</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                dataTableAddNew, index
                                            ) in tableData_addNew"
                                            :key="index"
                                        >
                                            <td class="text-tbody">
                                                {{
                                                    (start / limit) * limit +
                                                    index +
                                                    1
                                                }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableAddNew.tenTruongHoc }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableAddNew.maTruongHoc }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                                <div class="margin-top-100"></div>
                                <div class="layout-btn-addNew">
                                    <CustomButton
                                        label="Đóng"
                                        size="small"
                                        @click="closeModalAddNew"
                                    />
                                </div>
                            </div>
                        </el-dialog>
                    </span>
                    <span class="margin-right-10">
                        <CustomButton
                            size="small"
                            label="Khóa"
                            type="danger"
                            @click="openModalLockUpOneForAll"
                        />
                        <el-dialog
                            :visible.sync="lockUpOneForAllModalVisible"
                            :title="'Thông báo'"
                            width="80%"
                            @close="closeModalLockUpOneForAll"
                        >
                            <div class="title-black">
                                Hệ thống sẽ khóa
                                <span> {{ tabeData_lockUpOnForAll.length }}</span>
                                dữ liệu
                            </div>
                            <hr />
                            <div class="layout-table-toggleLock">
                                <table
                                    class="table table-bordered table-hover centered-table"
                                >
                                    <thead>
                                        <tr>
                                            <th class="text-thead">STT</th>
                                            <th class="text-thead">Tên Trường</th>
                                            <th class="text-thead">Mã Trường</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                dataTableLockUp, index
                                            ) in tabeData_lockUpOnForAll"
                                            :key="index"
                                        >
                                            <td class="text-tbody">
                                                {{
                                                    (start / limit) * limit +
                                                    index +
                                                    1
                                                }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableLockUp.tenTruongHoc }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableLockUp.maTruongHoc }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="margin-top100"></div>
                            <hr />
                            <div class="layout-btn-lockUp-OnForAll">
                                <CustomButton
                                    size="small"
                                    label="Hủy"
                                    @click="closeModalLockUpOneForAll"
                                />
                                <CustomButton
                                    size="small"
                                    type="danger"
                                    label="Khoá"
                                    @click="handleLockUpOneForAll"
                                />
                            </div>
                        </el-dialog>
                    </span>
                    <span class="margin-right-10">
                        <CustomButton
                            size="small"
                            label="Mở khóa"
                            type="success"
                            @click="openModalUnLockOneForAll"
                        />
                        <el-dialog
                            :visible.sync="unLockOnForAllModalVisible"
                            width="80%"
                            title="Mở khóa"
                            @close="closeModalUnLockOnForAll"
                        >
                            <div class="title-black">
                                Hệ thống sẽ mở khóa
                                <span>
                                    {{ tableData_unLockOneForAll.length }}</span
                                >
                                dữ liệu
                            </div>
                            <hr />
                            <div class="layout-table-toggleLock">
                                <table
                                    class="table table-bordered table-hover centered-table"
                                >
                                    <thead>
                                        <tr>
                                            <th class="text-thead">STT</th>
                                            <th class="text-thead">Tên Trường</th>
                                            <th class="text-thead">Mã Trường</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                dataTableUnLock, index
                                            ) in tableData_unLockOneForAll"
                                            :key="index"
                                        >
                                            <td class="text-tbody">
                                                {{
                                                    (start / limit) * limit +
                                                    index +
                                                    1
                                                }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableUnLock.tenTruongHoc }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableUnLock.maTruongHoc }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="margin-top100"></div>
                            <hr />
                            <div class="layout-btn-lockUp-OnForAll">
                                <CustomButton
                                    size="small"
                                    label="Hủy"
                                    @click="closeModalUnLockOnForAll"
                                />
                                <CustomButton
                                    size="small"
                                    type="primary"
                                    label="Mở Khoá"
                                    @click="handleUnLockOnForAll"
                                />
                            </div>
                        </el-dialog>
                    </span>
                    <span>
                        <CustomButton
                            size="small"
                            label="Chỉnh sửa"
                            type="warning"
                            @click="openModalUpdateOnForAll"
                        />
                        <el-dialog
                            :visible.sync="updateOnForAllModalVisible"
                            width="80%"
                            title="Thông báo"
                            @close="closeModalUpdateOnForAll"
                        >
                            <div class="title-black">
                                Hệ thống sẽ thay đổi thời gian tiếp nhận dữ liệu
                                của
                                <span>
                                    {{ tableData_updateOnForAll.length }}</span
                                >
                                trường sau
                            </div>
                            <hr />
                            <div class="span">
                                <span>Thời gian nộp</span>
                            </div>
                            <div style="margin-top: 20px"></div>
                            <div class="input-group input-daterange">
                                <date-picker
                                    :config="configDatePicker"
                                    placeholder="Ngày bắt đầu"
                                    v-model="
                                        seletedValueDate_updateOnForAll.selectedValueStartDate_updateOnForAll
                                    "
                                    class="custom-date-picker"
                                ></date-picker>
                                <div class="input-group-addon">đến</div>
                                <date-picker
                                    :config="configDatePicker"
                                    placeholder="Ngày kết thúc"
                                    v-model="
                                        seletedValueDate_updateOnForAll.selectedValueEndDate_updateOnForAll
                                    "
                                    class="custom-date-picker"
                                ></date-picker>
                            </div>

                            <div class="layout-table-toggleLock">
                                <table
                                    class="table table-bordered table-hover centered-table"
                                >
                                    <thead>
                                        <tr>
                                            <th class="text-thead">STT</th>
                                            <th class="text-thead">Tên Trường</th>
                                            <th class="text-thead">Mã Trường</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                dataTableUpdate, index
                                            ) in tableData_updateOnForAll"
                                            :key="index"
                                        >
                                            <td class="text-tbody">
                                                {{
                                                    (start / limit) * limit +
                                                    index +
                                                    1
                                                }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableUpdate.tenTruongHoc }}
                                            </td>
                                            <td class="text-tbody">
                                                {{ dataTableUpdate.maTruongHoc }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="margin-top100"></div>
                            <hr />
                            <div class="layout-btn-lockUp-OnForAll">
                                <CustomButton
                                    size="small"
                                    label="Hủy"
                                    @click="closeModalUpdateOnForAll"
                                />
                                <CustomButton
                                    size="small"
                                    type="warning"
                                    label="Chỉnh sửa"
                                    @click="handleUpdateOnForAll"
                                />
                            </div>
                        </el-dialog>
                    </span>
                </div>
            </div>
            <table class="table table-bordered table-hover centered-table">
                <thead>
                    <tr>
                        <th class="text-thead">
                            <input
                                type="checkbox"
                                v-model="selectAllChecked"
                                @change="handleSelectAll"
                            />
                        </th>
                        <th class="text-thead">STT</th>
                        <th class="text-thead">Đơn vị</th>
                        <th class="text-thead">Mã trường</th>
                        <th class="text-thead">Tên trường</th>
                        <th class="text-thead">Ngày bắt đầu</th>
                        <th class="text-thead">Ngày kết thúc</th>
                        <th class="text-thead">Trạng thái</th>
                        <th class="text-thead">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="tableData.length === 0">
                        <tr>
                            <td colspan="9" class="text-tbody">
                                Không có bản ghi nào.
                            </td>
                        </tr>
                    </template>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="text-tbody">
                            <input
                                type="checkbox"
                                :checked="item.isChecked"
                                @change="toggleCheckbox(item)"
                            />
                        </td>

                        <td class="text-tbody">
                            {{ (currentPage - 1) * limit + index + 1 }}
                        </td>
                        <td class="text-tbody">{{ item.tenDonVi }}</td>
                        <td class="text-tbody">{{ item.maTruongHoc }}</td>
                        <td class="text-tbody">{{ item.tenTruongHoc }}</td>
                        <td class="text-tbody">{{ item.tuNgay }}</td>
                        <td class="text-tbody">{{ item.denNgay }}</td>
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
                                        size="small"
                                        type="danger"
                                        label=""
                                        @click="openModalLockUp(index)"
                                    />
                                </span>
                                <el-dialog
                                    :visible.sync="lockUpModalVisible[index]"
                                    width="40%"
                                    title="Xác nhận thay đổi trạng thái"
                                    @close="closeModalLockUp(index)"
                                    class="custom-dialog"
                                >
                                    <table
                                        class="table table-bordered table-hover centered-table"
                                    >
                                        <thead>
                                            <tr>
                                                <th class="text-thead">STT</th>
                                                <th class="text-thead">
                                                    Tên trường
                                                </th>
                                                <th class="text-thead">
                                                    Mã trường
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-tbody">
                                                    {{
                                                        (start / limit) * limit +
                                                        index +
                                                        1
                                                    }}
                                                </td>
                                                <td class="text-tbody">
                                                    {{ item.tenTruongHoc }}
                                                </td>
                                                <td class="text-tbody">
                                                    {{ item.maTruongHoc }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="custom-dialog-body">
                                        <div class="btn">
                                            <CustomButton
                                                label="Hủy"
                                                size="small"
                                                @click="closeModalLockUp(index)"
                                            />
                                            <CustomButton
                                                label="Đồng ý"
                                                size="small"
                                                type="primary"
                                                @click="
                                                    handleClickChangeLockStatusOnLyOne(
                                                        item.maTruongHoc,
                                                        item.status
                                                    )
                                                "
                                            />
                                        </div>
                                    </div>
                                </el-dialog>
                                <span v-if="item.status === 0" class="custom-btn">
                                    <CustomButton
                                        icon="el-icon-unlock"
                                        size="small"
                                        type="success"
                                        label=""
                                        @click="openModalLockUp(index)"
                                    />
                                </span>
                            </span>
                            <span>
                                <span class="custom-btn">
                                    <CustomButton
                                        icon="el-icon-edit"
                                        size="small"
                                        type="warning"
                                        label=""
                                        @click="openModalUpdate(index)"
                                    />
                                </span>
                                <el-dialog
                                    :visible.sync="updateModalVisible[index]"
                                    title="Thông báo"
                                    width="50%"
                                    @close="closeModalUpdate(index)"
                                    class="custom-dialog"
                                >
                                    <div class="padding">
                                        <div class="span">
                                            <span>Thời gian nộp</span>
                                        </div>
                                        <div class="input-group input-daterange">
                                            <date-picker
                                                :config="configDatePicker"
                                                placeholder="Ngày bắt đầu"
                                                v-model="item.tuNgay"
                                                class="custom-date-picker"
                                            ></date-picker>
                                            <div class="input-group-addon">
                                                đến
                                            </div>
                                            <date-picker
                                                :config="configDatePicker"
                                                placeholder="Ngày kết thúc"
                                                v-model="item.denNgay"
                                                class="custom-date-picker"
                                            ></date-picker>
                                        </div>
                                        <hr />
                                        <table
                                            class="table table-bordered table-hover centered-table"
                                        >
                                            <thead>
                                                <tr>
                                                    <th class="text-thead">
                                                        STT
                                                    </th>
                                                    <th class="text-thead">
                                                        Tên trường
                                                    </th>
                                                    <th class="text-thead">
                                                        Mã trường
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="text-tbody">
                                                        {{
                                                            (start / limit) *
                                                                limit +
                                                            index +
                                                            1
                                                        }}
                                                    </td>
                                                    <td class="text-tbody">
                                                        {{ item.tenTruongHoc }}
                                                    </td>
                                                    <td class="text-tbody">
                                                        {{ item.maTruongHoc }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="margin-top100"></div>
                                        <hr />
                                        <div class="btn">
                                            <CustomButton
                                                label="Hủy"
                                                size="small"
                                            />
                                            <CustomButton
                                                label="Chỉnh sửa"
                                                type="warning"
                                                size="small"
                                                @click="
                                                    handleClickUpdateOnly(
                                                        item.maTruongHoc,
                                                        item.tuNgay,
                                                        item.denNgay
                                                    )
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
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import ESelect from '@/components/ESelect.vue'
import chonSoLuongBanGhi from '@/components/chonSoLuongBanGhi.vue'
import CustomBreadcrumb from '@/components/CustomBreadcrumb.vue'
import CustomPagination from '@/components/CustomPagination.vue'
import ESelectYear from '@/components/ESelectYear.vue'
import CustomButton from '@/components/CustomButton.vue'
import {
    ESelectGradeLevel_MockData,
    ESelectStatus_MockData_CapTruong
} from '@/mock_data'
import { mapState } from 'vuex'
import sendRequest from '@/services'
import Api from '@/constants/Api'

export default {
    name: 'capTruongCauHinhLichDongBo',
    components: {
        ESelect,
        CustomButton,
        ESelectYear,
        datePicker,
        CustomBreadcrumb,
        chonSoLuongBanGhi,
        CustomPagination
    },
    data() {
        return {
            resetESelectSchool: false,
            resetESelectSchool_addNew: false,

            start: 0,
            total_rows: 0,
            currentPage: 1,
            limit: 25,
            soLuongBanGhiHienThi: 25,
            trangbatdau: false,

            request_Data: {
                dsCapHoc: [],
                dsMaDonVi: [],
                dsMaTruong: [],
                maSo: null,
                namHoc: null,
                status: null
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

            lockUpModalVisible: {},
            updateModalVisible: {},
            addNewModalVisible: false,
            statusModalAddNew: false,
            lockUpOneForAllModalVisible: false,
            unLockOnForAllModalVisible: false,
            selectAllChecked: false,
            updateOnForAllModalVisible: false,
            selectedValueDate: {
                selectedValueStartDate: '',
                selectedValueEndDate: ''
            },
            selectedValueDate_addNew: {
                selectedValueStartDate_addNew: '',
                selectedValueEndDate_addNew: ''
            },
            seletedValueDate_updateOnForAll: {
                selectedValueStartDate_updateOnForAll: '',
                selectedValueEndDate_updateOnForAll: ''
            },

            tableData: [],
            tableData_addNew: [],
            tabeData_lockUpOnForAll: [],
            tableData_unLockOneForAll: [],
            tableData_updateOnForAll: [],

            getDataESelect: {
                ESelectUnitEducation: [], //donvi
                ESelectGradeLevel_MockData: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool: [], //truonghoc
                ESelectShoolYear_MockData: '', //namhoc
                ESelectStatus: ESelectStatus_MockData_CapTruong // trangthai
            },
            getDataESelect_addNew: {
                ESelectUnitEducation_addNew: [], //donvi
                ESelectGradeLevel_MockData_addNew: ESelectGradeLevel_MockData, //caphoc
                ESelectSchool_addNew: [], //truonghoc
                ESelectShoolYear_MockData_addNew: '' //namhoc
            },

            selectedValue: {
                selectedValueUnitEducation: [], //donvi
                selectedValueGradeLevel: [], //caphoc
                selectedValueSchool: [], //truonghoc
                selectedValueSchoolYear: [], //namhoc
                selectedValueStatus: [] //trangthai
            },
            selectedValue_addNew: {
                selectedValueUnitEducation_addNew: [], //donvi
                selectedValueGradeLevel_addNew: [], //caphoc
                selectedValueSchool_addNew: [], //truonghoc
                selectedValueSchoolYear_addNew: [] //namhoc
            }
        }
    },
    methods: {
        ChonSoLuongBanGhi(e) {
            this.total_rows = 0
            this.soLuongBanGhiHienThi = e.soluong
        },
        layLai(e) {
            this.start = e.start
            this.limit = e.limit
            this.currentPage = e.currentPage
            this.handleSearch()
        },
        checkTruocKhiTim() {
            this.trangbatdau = !this.trangbatdau
        },
        handleResetCompleted() {
            this.resetESelectSchool = false
        },
        handleResetCompleted_addNew() {
            this.resetESelectSchool_addNew = false
        },
        openModalLockUp(index) {
            this.tableData[index].isChecked = true
            this.$set(this.lockUpModalVisible, index, true)
        },
        closeModalLockUp(index) {
            this.tableData[index].isChecked = false
            this.$set(this.lockUpModalVisible, index, false)
        },
        openModalUpdate(index) {
            this.$set(this.updateModalVisible, index, true)
            this.tableData[index].isChecked = true
        },
        closeModalUpdate(index) {
            this.tableData[index].isChecked = false
            this.$set(this.updateModalVisible, index, false)
        },
        openModalAddNew() {
            this.addNewModalVisible = true
        },
        closeModalAddNew() {
            const loading = this.$loading({
                lock: true,
                text: 'Đang tải xuống',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
                loading.close()
            }, 1000) // Chờ 1 giây trước khi hiển thị confirm dialog

            this.addNewModalVisible = false
        },
        closeModalLockUpOneForAll() {
            this.lockUpOneForAllModalVisible = false
        },
        closeModalUnLockOnForAll() {
            this.unLockOnForAllModalVisible = false
        },
        closeModalUpdateOnForAll() {
            this.updateOnForAllModalVisible = false
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

                case 'ESelectStatus_MockData':
                    this.selectedValue.selectedValueStatus = selectedOptions
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
                const maDonVi_addNew = this.customhandleESelectedChange(
                    this.selectedValue_addNew.selectedValueUnitEducation_addNew,
                    'selectedValueUnitEducation_addNew'
                )
                const capHoc_addNew = this.customhandleESelectedChange(
                    this.selectedValue_addNew.selectedValueSchool_addNew,
                    'selectedValueSchool_addNew'
                )
                const option = []
                const optionsMaDonVi = option ? maDonVi : maDonVi_addNew
                const optionsCapHoc = option ? capHoc : capHoc_addNew
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    capHoc: optionsCapHoc,
                    maDonVi: optionsMaDonVi
                }
                const response = await sendRequest(
                    Api.internal_api.dm_School,
                    request_Data,
                    request_Header,
                    null
                )
                this.getDataESelect.ESelectSchool = response.rows
                this.getDataESelect_addNew.ESelectSchool_addNew = response.rows
            } catch (error) {
                console.log(error)
            }
        },
        handleESelectChange_addNew(source, ...selectedOptions) {
            switch (source) {
                case 'ESelectUnitEducation_addNew':
                    this.selectedValue_addNew.selectedValueUnitEducation_addNew =
                        selectedOptions
                    this.selectedValue_addNew.selectedValueSchool_addNew = []
                    this.resetESelectSchool_addNew = true
                    this.getDataESelectSchool()
                    break
                case 'ESelectGradeLevel_MockData_addNew':
                    this.selectedValue_addNew.selectedValueGradeLevel_addNew =
                        selectedOptions
                    this.selectedValue_addNew.selectedValueSchool_addNew = []
                    this.resetESelectSchool_addNew = true
                    this.getDataESelectSchool()
                    break
                case 'ESelectSchoolYear_MockData_addNew':
                    this.selectedValue_addNew.selectedValueSchoolYear_addNew =
                        selectedOptions
                    break
                case 'ESelectSchool_MockData_addNew':
                    this.selectedValue_addNew.selectedValueSchool_addNew =
                        selectedOptions
                    break
            }
        },
        toggleCheckbox(item) {
            item.isChecked = !item.isChecked // Thay đổi trạng thái của checkbox khi được chọn hoặc bỏ chọn
        },
        handleSelectAll() {
            this.tableData.forEach((item) => {
                item.isChecked = this.selectAllChecked // Đặt trạng thái của tất cả các checkbox bằng với checkbox "checkboxAll"
            })
        },

        async handleSearch() {
            try {
                const dsMaDonVi_Update = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueUnitEducation,
                    'selectedValueUnitEducation'
                )
                const dsCapHoc_Update = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueGradeLevel,
                    'selectedValueGradeLevel'
                )
                const dsMaTruong_Update = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueSchool,
                    'selectedValueSchool'
                )
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear

                const status_Update = this.customhandleESelectedChange(
                    this.selectedValue.selectedValueStatus,
                    'selectedValueStatus'
                )
                const limit = this.limit
                const start = this.start
                if (this.selectedValue.selectedValueUnitEducation.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn đơn vị tìm kiếm',
                        type: 'error'
                    })
                    return
                }
                const currentYear = new Date().getFullYear()
                const request_Data = {
                    dsCapHoc: dsCapHoc_Update,
                    dsMaDonVi: dsMaDonVi_Update,

                    dsMaTruong: dsMaTruong_Update,
                    maSo: this.authUser.province,
                    namHoc: namHoc_Update || currentYear,

                    status: status_Update
                }
                const request_Header = {
                    token: this.authToken
                }
                const request_Params = {
                    ...this.request_Params,
                    start: start,
                    limit: limit
                }

                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo.capTruong,
                    request_Data,
                    request_Header,
                    request_Params
                )

                if (response.rc == 0) {
                    this.$message({
                        message: 'Danh sách dữ liệu',
                        type: 'success'
                    })
                } else if (response.rc == 2) {
                    this.$message({
                        message: response.rd,
                        type: 'error'
                    })
                }
                this.total_rows = response.totalRows

                this.tableData = response.tableData.map((item) => {
                    return { ...item, isChecked: false }
                })
            } catch (error) {
                console.log(error)
            }
        },

        async handleClickChangeLockStatusOnLyOne(maTruongHoc, status) {
            try {
                const dsMaTruong_Update = maTruongHoc.split()
                const updatedStatus = status === 0 ? 1 : 0
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear
                const currentYear = new Date().getFullYear()
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data,
                    tuNgay: null,
                    denNgay: null,
                    statusUpdate: updatedStatus,
                    dsMaTruong: dsMaTruong_Update,
                    maSo: this.authUser.province,
                    namHoc: namHoc_Update || currentYear
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo
                        .toggleStatus_CapTruong,
                    request_Data,
                    request_Header,
                    null
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Đang tải xuống',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                if (response.rc == 0) {
                    const index = this.tableData.findIndex(
                        (item) => item.maTruongHoc === maTruongHoc
                    )
                    if (index !== -1) {
                        this.$set(this.lockUpModalVisible, index, false)
                    }
                    setTimeout(() => {
                        this.$message({
                            message: 'Thay đổi thành công',
                            type: 'success'
                        })

                        loading.close()
                    }, 1000) // Chờ 1 giây trước khi hiển thị confirm dialog
                    await this.handleSearch()
                }
            } catch (error) {
                console.log(error)
            }
        },

        async handleAddNew() {
            try {
                const dsMaTruong_addNew = this.customhandleESelectedChange(
                    this.selectedValue_addNew.selectedValueSchool_addNew,
                    'selectedValueSchool_addNew'
                )
                const ngayBatDau =
                    this.selectedValueDate_addNew.selectedValueStartDate_addNew
                const ngayKetThuc =
                    this.selectedValueDate_addNew.selectedValueEndDate_addNew
                const namHoc_addNew =
                    this.selectedValue_addNew.selectedValueSchoolYear_addNew
                if (dsMaTruong_addNew.length === 0) {
                    this.$message({
                        message: 'Vui lòng chọn trường',
                        type: 'error'
                    })
                    return
                }
                if (ngayBatDau === '' && ngayKetThuc === '') {
                    this.$message({
                        message: 'Vui lòng chọn ngày',
                        type: 'error'
                    })
                    return
                }
                const currentYear = new Date().getFullYear()
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    ngayBatDau: ngayBatDau,
                    ngayKetThuc: ngayKetThuc,
                    dsMaTruong: dsMaTruong_addNew,
                    maSo: this.authUser.province,
                    namHoc: namHoc_addNew || currentYear
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo
                        .themMoiLichDongBo_CapTruong,
                    request_Data,
                    request_Header,
                    null
                )

                if (response && response.rc == 1) {
                    this.$message({
                        message: response.rd,
                        type: 'error'
                    })
                    return
                }
                if (response && response.rc == -1) {
                    this.$message({
                        message: 'Đã tồn tại trong cấu hình',
                        type: 'error'
                    })
                    const maTruongHocArray = response.item

                    const foundItems = this.dataChonTruongHoc_Store.filter(
                        (item) => maTruongHocArray.includes(item.maTruongHoc)
                    )

                    this.tableData_addNew = foundItems
                    this.statusModalAddNew = true
                }
            } catch (error) {
                console.log(error)
            }
        },

        async handleClickUpdateOnly(maTruongHoc, tuNgay, denNgay) {
            try {
                const dsMaTruong_Update = maTruongHoc.split()
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear
                const currentYear = new Date().getFullYear()
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data,
                    tuNgay: tuNgay,
                    denNgay: denNgay,
                    statusUpdate: null,
                    dsMaTruong: dsMaTruong_Update,
                    maSo: this.authUser.province,
                    namHoc: namHoc_Update || currentYear
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo
                        .thayDoiNgay_CapTruong,
                    request_Data,
                    request_Header,
                    null
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Đang thay đổi',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                if (response.rc == 0) {
                    setTimeout(() => {
                        loading.close()
                    }, 1000)
                    this.$message({
                        message: 'Thay đổi thành công',
                        type: 'success'
                    })
                    const index = this.tableData.findIndex(
                        (item) => item.maTruongHoc === maTruongHoc
                    )
                    if (index !== -1) {
                        this.$set(this.updateModalVisible, index, false)
                    }
                    await this.handleSearch()
                }
            } catch (error) {
                console.log(error)
            }
        },

        openModalLockUpOneForAll() {
            const tabelData_LockUpOnForAll = this.tableData.filter(
                (item) => item.isChecked
            )
            if (tabelData_LockUpOnForAll.length === 0) {
                this.$message({
                    message: 'Vui lòng chọn Trường tìm kiếm trong bảng',
                    type: 'error'
                })
                return
            }
            this.lockUpOneForAllModalVisible = true
            this.tabeData_lockUpOnForAll = tabelData_LockUpOnForAll
        },
        openModalUnLockOneForAll() {
            const data_UnLockOnForAll = this.tableData.filter(
                (item) => item.isChecked
            )
            if (data_UnLockOnForAll.length === 0) {
                alert('Vui lòng chọn Trường học trong Bảng')
                return
            }
            this.unLockOnForAllModalVisible = true
            this.tableData_unLockOneForAll = data_UnLockOnForAll
        },
        async toggleLockStatus(statusUpdate) {
            const tabelData_LockUpOnForAll = this.tableData.filter(
                (item) => item.isChecked
            )
            const dsMaTruong_lockUp = tabelData_LockUpOnForAll.map(
                (item) => item.maTruongHoc
            )

            const namHoc_Update = this.selectedValue.selectedValueSchoolYear
            const currentYear = new Date().getFullYear()
            const request_Header = {
                token: this.authToken
            }
            const request_Data = {
                ...this.request_Data,
                tuNgay: null,
                denNgay: null,
                statusUpdate: statusUpdate,
                dsMaTruong: dsMaTruong_lockUp,
                maSo: this.authUser.province,
                namHoc: namHoc_Update || currentYear
            }

            const response = await sendRequest(
                Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo.toggleStatus_CapTruong,
                request_Data,
                request_Header,
                null
            )
            const loading = this.$loading({
                lock: true,
                text: 'Đang thay đổi',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            if (response.rc == 0) {
                setTimeout(() => {
                    loading.close()
                }, 1000)
                if (statusUpdate === 0) {
                    this.$message({
                        message: 'Khóa thành công',
                        type: 'success'
                    })
                } else if (statusUpdate === 1) {
                    this.$message({
                        message: 'Mở khóa thành công',
                        type: 'success'
                    })
                }

                await this.handleSearch()
                this.lockUpOneForAllModalVisible = false
                this.unLockOnForAllModalVisible = false
                this.selectAllChecked = false
            }
        },

        async handleLockUpOneForAll() {
            await this.toggleLockStatus(0)
        },

        async handleUnLockOnForAll() {
            await this.toggleLockStatus(1)
        },
        openModalUpdateOnForAll() {
            const data_updateOnForAll = this.tableData.filter(
                (item) => item.isChecked
            )
            if (data_updateOnForAll.length === 0) {
                this.$message({
                    message: 'Vui lòng chọn Trường tìm kiếm trong Bảng',
                    type: 'error'
                })
                return
            }
            this.updateOnForAllModalVisible = true
            this.tableData_updateOnForAll = data_updateOnForAll
        },
        async handleUpdateOnForAll() {
            try {
                const data_updateOnForAll = this.tableData.filter(
                    (item) => item.isChecked
                )
                const dsMaTruong_updateOneForAll = data_updateOnForAll.map(
                    (item) => item.maTruongHoc
                )
                const tuNgay_updateOnForAll =
                    this.seletedValueDate_updateOnForAll
                        .selectedValueStartDate_updateOnForAll
                const denNgay_updateOnForAll =
                    this.seletedValueDate_updateOnForAll
                        .selectedValueEndDate_updateOnForAll
                const namHoc_Update = this.selectedValue.selectedValueSchoolYear
                const currentYear = new Date().getFullYear()
                const request_Header = {
                    token: this.authToken
                }
                const request_Data = {
                    ...this.request_Data,
                    tuNgay: tuNgay_updateOnForAll,
                    denNgay: denNgay_updateOnForAll,
                    statusUpdate: null,
                    dsMaTruong: dsMaTruong_updateOneForAll,
                    maSo: this.authUser.province,
                    namHoc: namHoc_Update || currentYear
                }
                const response = await sendRequest(
                    Api.tiepNhanDuLieuQLNT.cauHinhLichDongBo
                        .thayDoiNgay_CapTruong,
                    request_Data,
                    request_Header
                )
                const loading = this.$loading({
                    lock: true,
                    text: 'Đang tải xuống',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                if (response.rc == 0) {
                    setTimeout(() => {
                        loading.close()
                    }, 1000)
                    this.$message({
                        message: 'Thay đổi ngày thành công',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: 'Có lỗi xảy ra',
                        type: 'error'
                    })
                }

                await this.handleSearch()
                this.updateOnForAllModalVisible = false
                this.selectAllChecked = false

                console.log(dsMaTruong_updateOneForAll)
            } catch (error) {
                console.log(error)
            }
        },
        customhandleESelectedChange(options, valueType) {
            switch (valueType) {
                case 'selectedValueUnitEducation':
                case 'selectedValueSchool':
                case 'selectedValueUnitEducation_addNew':
                case 'selectedValueSchool_addNew':
                    return options.map((option) => option.value)
                case 'selectedValueGradeLevel':
                case 'selectedValueGradeLevel_addNew':
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
        this.getDataESelectSchool()
        // console.log(this.dataChonTruongHoc_Store)
    },
    created() {
        this.tableData.forEach((item, index) => {
            this.$set(this.lockUpModalVisible, index, false)
            this.$set(this.updateModalVisible, index, false)
        })
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
    align-items: center;
    max-width: calc(100vw - 330px);
    margin: 0 auto;
    overflow-x: auto;
}
.layout-btn-table {
    display: flex;
    padding: 0px 0px 15px 0px;
    justify-content: space-between;
}
.layout-btn-table .margin-right-10 {
    margin-right: 10px;
}
.layout-btn-table .label-addnew {
    color: black;
}
.layout-btn-table .layout-date-addNew {
    padding: 20px 0px 10px 10px;
}
.layout-btn-table .margin-top-100 {
    margin-top: 100px;
}
.layout-btn-table .layout-btn-addNew {
    display: flex;
    justify-content: flex-end;
}
.layout-btn-table .title-black {
    color: black;
}
.layout-btn-table .layout-table-toggleLock {
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
}
.layout-btn-table .title-black span {
    color: red;
}
.layout-btn-table .layout-btn-lockUp-OnForAll {
    display: flex;
    justify-content: flex-end;
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
    font-size: 12px;
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
.text-tbody .custom-date-picker,
.layout-btn-table .custom-date-picker {
    height: 28px;
}

.text-tbody .custom-date-picker::placeholder,
.layout-btn-table .custom-date-picker::placeholder {
    color: gainsboro;

    font-size: 13px;
    background-color: transparent;
    appearance: none;
}
.text-tbody .input-group-addon,
.layout-btn-table .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
}
.text-tbody hr,
.layout-btn-table hr {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
}
.text-tbody .custom-btn {
    margin-right: 10px;
}
.text-tbody .title-span {
    display: flex;
}
.text-tbody .btn {
    display: flex;

    padding: 0 !important;
    justify-content: flex-end;
    margin-top: 20px;
}
.text-tbody .margin-top100,
.layout-btn-table .margin-top100 {
    margin-top: 100px;
}
.custom-dialog-body {
    padding: 10px 0px 20px 0px;
}

.text-body-span {
    font-size: 12px;
}
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
