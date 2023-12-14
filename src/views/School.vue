<template>
    <div class="school">
        <div class="header">
            <div class="left">
                <div>
                    <el-icon name="school" class="icon"></el-icon>
                </div>
                <div class="title">Trường học</div>
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
                                THỐNG KÊ TRƯỜNG HỌC - SỐ LƯỢNG TRƯỜNG
                            </div>
                        </div>
                        <div class="card-body">
                            <PieChart
                                :label="labelSoLuongTruong"
                                :data_PieChart="dataBieuDoTongQuan_TruongHoc"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ TRƯỜNG HỌC - CHẤT LƯỢNG ĐÀO TẠO
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    customSort(
                                        dataBieuDoChatLuongDaoTao_TruongHoc
                                    )
                                "
                                :xaxis_categories="
                                    xaxisCategories.chatLuongDaoTao
                                "
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ TRƯỜNG HỌC - LOẠI HÌNH ĐÀO TẠO
                            </div>
                        </div>
                        <div class="card-body">
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    customSort(dataBieuDoLoaiHinhDaoTao_TruongHoc)
                                "
                                :xaxis_categories="xaxisCategories.loaiHinhDaoTao"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="title">
                                THỐNG KÊ TRƯỜNG HỌC - SỐ LƯỢNG LỚP HỌC
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- <PieChart
                                :label="labelSoLuongTruong"
                                :data_PieChart="dataBieuDoDashboard_LopHoc"
                            /> -->
                            <StackedColumnChart
                                :data_StackedColumnChart="
                                    dataBieuDoDashboard_LopHoc
                                "
                                :xaxis_categories="
                                    xaxisCategories.dashboardLopHoc
                                "
                            />
                            <!-- <StackedColumnChart
                                :data_StackedColumnChart="
                                    customSort(dataBieuDoLoaiHinhDaoTao_TruongHoc)
                                "
                                :xaxis_categories="xaxisCategories.loaiHinhDaoTao"
                            /> -->
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
    name: 'schoolC',
    components: {
        'el-icon': Icon,
        CustomButton,
        PieChart,
        StackedColumnChart
    },
    data() {
        return {
            labelSoLuongTruong: [
                'Mầm non',
                'Tiểu học',
                'THCS',
                'THPT',
                'GDTX',
                'Liên cấp 1+2',
                'Liên cấp 2+3',
                'Khác'
            ],
            xaxisCategories: {
                chatLuongDaoTao: [
                    'C.Lượng tối thiểu',
                    'Chuẩn mức 1',
                    'Chuẩn mức 2'
                ],
                loaiHinhDaoTao: ['Công lập', 'Tư thục', 'Dân lập'],
                dashboardLopHoc: []
            }
        }
    },
    mounted() {
        this.customSort()
    },
    methods: {
        customSort(arr) {
            const order = [
                'MN',
                'TH',
                'THCS',
                'THPT',
                'GDTX',
                'LC12',
                'LC23',
                'LCK'
            ]
            const sortedArray = []

            for (const name of order) {
                const obj = arr?.find((item) => item.name === name)
                if (obj) {
                    sortedArray.push(obj)
                }
            }

            return sortedArray
        }
    },
    props: {
        dataBieuDoTongQuan_TruongHoc: {
            type: Array,
            required: true
        },
        dataBieuDoChatLuongDaoTao_TruongHoc: {
            type: Array,
            required: true
        },
        dataBieuDoLoaiHinhDaoTao_TruongHoc: {
            type: Array,
            required: true
        },
        dataBieuDoDashboard_LopHoc: {
            type: Array,
            required: true
        }
    },
    watch: {
        dataBieuDoLoaiHinhDaoTao_TruongHoc(newValue) {
            console.log('bbbbbbbbb', newValue)
        },
        dataBieuDoDashboard_LopHoc(newValue) {
            console.log('asasa', newValue)
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
