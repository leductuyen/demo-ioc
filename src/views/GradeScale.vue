<template>
    <div class="school">
        <div class="header">
            <div class="left">
                <div>
                    <el-icon name="s-custom" class="icon"></el-icon>
                </div>
                <div class="title">Phổ điểm</div>
            </div>
            <div class="right">
                <CustomButton label="Chi tiết" size="small" type="success" />
            </div>
        </div>

        <div class="layout-card">
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Phổ điểm học kì I</div>
                        </div>
                        <div class="card-body">
                            <LineChart
                                :data_LineChart="dataBieuDoPhoDiemHKI_PhoDiem"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Phổ điểm học kì II</div>
                        </div>
                        <div class="card-body">
                            <LineChart
                                :data_LineChart="dataBieuDoPhoDiemHKII_PhoDiem"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                ĐÁNH GIÁ HỌC SINH HỌC KỲ I (THCS,THPT)
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoDanhGiaHocSinhKyI_PhoDiem
                                "
                                :xaxis_categories="xaxisCategories.danhGiaHocSinh"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                ĐÁNH GIÁ HỌC SINH HỌC KỲ II (THCS,THPT)
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoDanhGiaHocSinhKyII_PhoDiem
                                "
                                :xaxis_categories="xaxisCategories.danhGiaHocSinh"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                ĐÁNH GIÁ HỌC SINH CẢ NĂM (THCS,THPT)
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoDanhGiaHocSinhCaNam_PhoDiem
                                "
                                :xaxis_categories="xaxisCategories.danhGiaHocSinh"
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
import LineChart from '@/components/LineChart.vue'
import StackedColumnChart from '@/components/StackedColumnChart.vue'
import { Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    name: 'gradeScale',
    components: {
        'el-icon': Icon,
        CustomButton,
        StackedColumnChart,
        LineChart
    },
    data() {
        return {
            xaxisCategories: {
                danhGiaHocSinh: ['Giỏi', 'Khá', 'T.B', 'Yếu', 'Kém', 'Khác'],
                gioiTinh: ['Nam', 'Nữ'],
                loaiHinhDaoTao: ['Công lập', 'Tư Thục', 'Dân lập'],
                khuVuc: ['B.Giới-H.Đảo', 'Đô thị', 'Đồng bằng', 'M.Núi-V.Sâu']
            }
        }
    },
    props: {
        dataBieuDoPhoDiemHKI_PhoDiem: {
            type: Array,
            required: true
        },
        dataBieuDoPhoDiemHKII_PhoDiem: {
            type: Array,
            required: true
        },
        dataBieuDoDanhGiaHocSinhKyI_PhoDiem: {
            type: Array,
            required: true
        },
        dataBieuDoDanhGiaHocSinhKyII_PhoDiem: {
            type: Array,
            required: true
        },
        dataBieuDoDanhGiaHocSinhCaNam_PhoDiem: {
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
