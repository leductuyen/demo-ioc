<template>
    <div class="school">
        <div class="header">
            <div class="left">
                <div>
                    <el-icon name="s-custom" class="icon"></el-icon>
                </div>
                <div class="title">Cán bộ - Giáo viên - Nhân viên</div>
            </div>
            <div class="right">
                <CustomButton label="Chi tiết" size="small" type="success" />
            </div>
        </div>

        <div class="layout-card">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ CBGV - SỐ LƯỢNG CBGV</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :data_PieChart="dataBieuDoTongQuan_CBGVNV"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ CBGV - TRẠNG THÁI</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoTrangThai_CBGVNV
                                "
                                :xaxis_categories="xaxisCategories.trangThai"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ CBGV - TRÌNH ĐỘ CHÍNH
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoTrinhDoChinh_CBGVNV
                                "
                                :xaxis_categories="xaxisCategories.trinhDoChinh"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ CBGV - ĐỘ TUỔI</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="dataBieuDoDoTuoi_CBGVNV"
                                :xaxis_categories="xaxisCategories.doTuoi"
                            />
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ CBGV - GIỚI TÍNH</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoGioiTinh_CBGVNV
                                "
                                :xaxis_categories="xaxisCategories.gioiTinh"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ CBGV - LOẠI HỢP ĐỒNG</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoLoaiHopDong_CBGVNV
                                "
                                :xaxis_categories="xaxisCategories.loaiHopDong"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CustomButton from '@/components/CustomButton.vue'
import PieChart from '@/components/PieChart.vue'
import StackedColumnChart from '@/components/StackedColumnChart.vue'
import { Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    name: 'educatorProfile',
    components: {
        'el-icon': Icon,
        CustomButton,
        PieChart,
        StackedColumnChart
    },
    data() {
        return {
            xaxisCategories: {
                trinhDoChinh: [
                    'Tiến sĩ',
                    'Thạc sĩ',
                    'Đại học',
                    'Cao đẳng',
                    'Trung cấp'
                ],
                gioiTinh: ['Nam', 'Nữ'],
                loaiHopDong: ['HĐKXĐ thời hạn', 'HĐXĐ thời hạn', 'HĐLĐ'],
                doTuoi: [
                    '<20',
                    '20-29',
                    '30-39',
                    '40-49',
                    '50-54',
                    '55-59',
                    '>60'
                ],
                trangThai: ['Đang làm việc', 'Chuyển đến', 'Chuyển đi', 'Khác']
            }
        }
    },
    props: {
        dataBieuDoTongQuan_CBGVNV: {
            type: Array,
            required: true
        },
        dataBieuDoTrinhDoChinh_CBGVNV: {
            type: Array,
            required: true
        },
        dataBieuDoGioiTinh_CBGVNV: {
            type: Array,
            required: true
        },
        dataBieuDoLoaiHopDong_CBGVNV: {
            type: Array,
            required: true
        },
        dataBieuDoDoTuoi_CBGVNV: {
            type: Array,
            required: true
        },
        dataBieuDoTrangThai_CBGVNV: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.school {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 15px;
    padding-left: 6px;
    padding-right: 6px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0px 12px 0px;
}
.header .left {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: blue;
    font-weight: 700;
}
.header .left .icon {
    font-size: 18px;
    color: blue;
    font-weight: 700;
    margin-right: 5px;
}
.header .right {
    margin-left: 6px;
}

.layout-card {
    padding: 0px 10px 20px 10px;
}
.layout-card .card-header {
    background: #f2f3f8;
    height: 25px;
    color: black;
    padding: 5px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
.layout-card .card-header .title {
    margin: -5px 0px 0px 10px;
    color: #070707;

    text-transform: uppercase;
    font-weight: bold;
}
.layout-card .card-body {
    padding: 5px;
    background: white;
    border: #f2f3f8 2px solid;
    height: 300px;
}
</style>
