<template>
    <div class="school">
        <div class="header">
            <div class="left">
                <div>
                    <el-icon name="s-custom" class="icon"></el-icon>
                </div>
                <div class="title">Học sinh</div>
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
                            <div class="title">
                                THỐNG KÊ HỌC SINH - SỐ LƯỢNG HỌC SINH
                            </div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="labelSoLuongTruong"
                                :data_PieChart="dataBieuDoTongQuan_HocSinh"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Học Lực Học sinh thcs</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="xaxisCategories_TongQuanChung.hocLuc"
                                :data_PieChart="
                                    getBieuDoHLHS(
                                        dataBieuDohocSinh_HocLuc,
                                        'THCS'
                                    )
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">Học Lực Học sinh thpt</div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="xaxisCategories_TongQuanChung.hocLuc"
                                :data_PieChart="
                                    getBieuDoHLHS(
                                        dataBieuDohocSinh_HocLuc,
                                        'THPT'
                                    )
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ HỌC SINH - GIỚI TÍNH</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoGioiTinh_HocSinh
                                "
                                :xaxis_categories="xaxisCategories.gioiTinh"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ HỌC SINH - LOẠI HÌNH ĐÀO TẠO
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoLoaiHinhDaoTao_HocSinh
                                "
                                :xaxis_categories="xaxisCategories.loaiHinhDaoTao"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">THỐNG KÊ HỌC SINH - KHU VỰC</div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoKhuVuc_HocSinh
                                "
                                :xaxis_categories="xaxisCategories.khuVuc"
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
import {
    ESelectGradeLevel_MockData,
    xaxisCategories_TongQuanChung
} from '@/mock_data'
import { Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    name: 'schoolC',
    components: {
        'el-icon': Icon,
        CustomButton,
        PieChart,
        StackedColumnChart
    },
    data() {
        return {
            xaxisCategories_TongQuanChung: xaxisCategories_TongQuanChung,
            labelSoLuongTruong: [
                'Mầm non',
                'Tiểu học',
                'THCS',
                'THPT',
                'Liên cấp',
                'GDTX',
                'Liên cấp 2+3',
                'Khác'
            ],
            xaxisCategories: {
                trangThai: ['Đang học', 'Chuyển trường'],
                gioiTinh: ['Nam', 'Nữ'],
                loaiHinhDaoTao: ['Công lập', 'Tư Thục', 'Dân lập'],
                khuVuc: ['B.Giới-H.Đảo', 'Đô thị', 'Đồng bằng', 'M.Núi-V.Sâu']
            }
        }
    },
    methods: {
        getBieuDoHLHS(data, capHoc) {
            let result = [0, 0, 0, 0, 0, 0]
            // console.log('Data map biểu đồ học lực học sinh:')
            // console.log(data)
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == capHoc) {
                        result = data[i].data
                    }
                }
            }
            // console.log('Dữ liệu là:')
            // console.log(result)
            return result
        }
    },
    props: {
        dataBieuDoTongQuan_HocSinh: {
            type: Array,
            required: true
        },
        dataBieuDoTrangThai_HocSinh: {
            type: Array,
            required: true
        },
        dataBieuDoGioiTinh_HocSinh: {
            type: Array,
            required: true
        },
        dataBieuDoLoaiHinhDaoTao_HocSinh: {
            type: Array,
            required: true
        },
        dataBieuDoKhuVuc_HocSinh: {
            type: Array,
            required: true
        },
        dataBieuDohocSinh_HocLuc: {
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
