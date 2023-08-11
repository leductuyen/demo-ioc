import Vue from 'vue'
import VueRouter from 'vue-router'

// <!-- ************ Auth ************ -->
import ForgotPasswordVue from '@/views/ForgotPassword.vue'
import SignUpVue from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'
import LoginSSO from '@/views/LoginSSO.vue'

// <!-- ************ Trang chủ ************ -->
import DashBoard from '@/views/DashBoard.vue'
import TongQuanChung from '@/views/TongQuan/TongQuanChung'
import TruongHoc from '@/views/TongQuan/TruongHoc'
import CanBoGiaoVien from '@/views/TongQuan/CanBoGiaoVien'
import HocSinh from '@/views/TongQuan/HocSinh'
import ThongTinDiemDanh from '@/views/TongQuan/ThongTinDiemDanh'
import ThongTinYTeHocSinh from '@/views/TongQuan/ThongTinYTeHocSinh'

// TiepNhanDuLieuQLNT
import CapSo_CauHinhLichDongBo from '@/views/TiepNhanDuLieuQLNT/CauHinhLichDongBo/CapSo_CauHinhLichDongBo'
import CapTruong_CauHinhLichDongBo from '@/views/TiepNhanDuLieuQLNT/CauHinhLichDongBo/CapTruong_CauHinhLichDongBo'
import CapSo_BCTinhHinhNopDuLieu from '@/views/TiepNhanDuLieuQLNT/BCTinhHinhNopDuLieu/CapSo_BCTinhHinhNopDuLieu'
import CapTruong_BCTinhHinhNopDuLieu from '@/views/TiepNhanDuLieuQLNT/BCTinhHinhNopDuLieu/CapTruong_BCTinhHinhNopDuLieu'
import LichSuTiepNhanDuLieu from '@/views/TiepNhanDuLieuQLNT/LichSuTiepNhanDuLieu/LichSuTiepNhanDuLieu'

//KetChuyenDuLieuLenBo
import MatKhauKetChuyen from '@/views/KetChuyenDuLieuLenBo/MatKhauKetChuyen'
import CauHinhDuyetDayDuLieuLenBo from '@/views/KetChuyenDuLieuLenBo/CauHinhDuyetDayDuLieuLenBo'
import KetChuyenDuLieu from '@/views/KetChuyenDuLieuLenBo/KetChuyenDuLieu'
import LichSuDayDuLieuLenBo from '@/views/KetChuyenDuLieuLenBo/LichSuDayDuLieuLenBo'

//BaoCao
import BaoCaoEMIS from '@/views/BaoCao/BaoCaoEMIS'
import BaoCaoDonVi from '@/views/BaoCao/BaoCaoDonVi.vue'
import BaoCaoDong from '@/views/BaoCao/BaoCaoDong.vue' //
import BaoCaoEQMS from '@/views/BaoCao/BaoCaoEQMS.vue'
import NopThongKeTheoBieuMau from '@/views/BaoCao/NopThongKeTheoBieuMau'

//DuBaoIoc
import DuBaoSoLuongGiaoVien from '@/views/DuBaoIoc/DuBaoSoLuongGiaoVien.vue'
import HocSinhBienDong from '@/views/DuBaoIoc/HocSinhBienDong.vue'
import KetQuaHocTapCuaHocSinh from '@/views/DuBaoIoc/KetQuaHocTapCuaHocSinh.vue'

Vue.use(VueRouter)

const routes = [
    // <!-- ************ Auth ************ -->
    {
        path: '/sso/login.html',
        name: 'LoginSSO',
        component: LoginSSO,
        meta: {
            title: 'LoginSSO'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/sign-up',
        name: 'Sign-up',
        component: SignUpVue,
        meta: {
            title: 'Sign Up'
        }
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: ForgotPasswordVue,
        meta: {
            title: 'Forgot Password'
        }
    },

    // <!-- ************ Trang chủ ************ -->
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: TongQuanChung, // router trang chủ
        meta: {
            title: 'Dash Board'
            // requiresAuth: true
        }
    },
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            title: 'Redirect'
        }
    },

    {
        path: '/dashboard/school',
        name: 'School',
        component: TruongHoc,
        meta: {
            title: 'Trường học'
        }
    },
    {
        path: '/dashboard/teacher',
        name: 'Teacher',
        component: CanBoGiaoVien,
        meta: {
            title: 'Cán bộ giáo viên'
        }
    },

    {
        path: '/dashboard/student',
        name: 'Student',
        component: HocSinh,
        meta: {
            title: 'Học sinh'
        }
    },
    {
        path: '/dashboard/attendance',
        name: 'AttentDance',
        component: ThongTinDiemDanh,
        meta: {
            title: 'Thông tin điểm danh'
        }
    },
    {
        path: '/dashboard/student_medical_information',
        name: 'StudentMedicalInformation',
        component: ThongTinYTeHocSinh,
        meta: {
            title: 'Thông tin Y Tế Học Sinh'
        }
    },

    // <!-- ************ TiepNhanDuLieuQLNT ************ -->

    //  CauHinhLichDongBo
    {
        path: '/Configure-sync-calendar',
        name: 'ConfigureSyncCalendar',
        component: {
            render() {
                // Lấy giá trị type từ route
                const type = this.$route.query.type || 1

                if (type == 1) {
                    return <CapSo_CauHinhLichDongBo />
                } else if (type == 2) {
                    return <CapTruong_CauHinhLichDongBo />
                } else {
                    return <div>Thành phần không tồn tại</div>
                }
            }
        },
        meta: {
            title: ''
        }
    },

    //BCTinhHinhNopDuLieu
    {
        path: '/report-sync-status',
        name: 'ReportSyncStatus',
        component: {
            render() {
                // Lấy giá trị type từ route
                const type = this.$route.query.type || 1

                if (type == 1) {
                    return <CapSo_BCTinhHinhNopDuLieu />
                } else if (type == 2) {
                    return <CapTruong_BCTinhHinhNopDuLieu />
                } else {
                    return <div>Thành phần không tồn tại</div>
                }
            }
        },
        meta: {
            title: ''
        }
    },

    //LichSuTiepNhanDuLieu
    {
        path: '/Data-transfer-schedule',
        name: 'DataTransferSchedule',
        component: LichSuTiepNhanDuLieu,
        meta: {
            title: 'Lịch sử tiếp nhận dữ liệu'
        }
    },
    // <!-- ************ TiepNhanDuLieuQLNT ************ -->

    // <!-- ************ KetChuyenDuLieuLenBo ************ -->

    //MatKhauKetChuyen
    {
        path: '/pass-data-transfer',
        name: 'PassDataTransfer',
        component: MatKhauKetChuyen,
        meta: {
            title: 'Mật khẩu kết chuyển'
        }
    },

    //CauHinhDuyetDayDuLieuLenBo
    {
        path: '/config-moet-transfer-permission',
        name: 'ConfigMoetTransferPermission',
        component: CauHinhDuyetDayDuLieuLenBo,
        meta: {
            title: 'Cấu hình duyệt/đẩy dữ liệu lên Bộ'
        }
    },

    //KetChuyenDuLieu
    {
        path: '/Request-data-by-school',
        name: 'RequestDataBySchool',
        component: KetChuyenDuLieu,
        meta: {
            title: 'Kết chuyển dữ liệu'
        }
    },

    //LichSuDayDuLieuLenBo
    {
        path: '/moet-transfer-history',
        name: 'MoetTransferHistory',
        component: LichSuDayDuLieuLenBo,
        meta: {
            title: 'Lịch sử đẩy dữ liệu lên Bộ'
        }
    },

    // <!-- ************ KetChuyenDuLieuLenBo ************ -->

    // <!-- ************ BaoCao ************ -->

    //BaoCaoEMIS
    {
        path: '/Report-to-the-ministry',
        name: 'ReportToTheMinistry',
        component: BaoCaoEMIS,
        meta: {
            title: 'Báo Cáo EMIS'
        }
    },
    //BaoCaoDonVi
    {
        path: '/Report-to-the-department',
        name: 'ReportToTheDepartment',
        component: BaoCaoDonVi,
        meta: {
            title: 'Báo Cáo Đơn vị'
        }
    },
    //BaoCaoDong
    {
        path: '/report-emis',
        name: 'ReportEmis',
        component: BaoCaoDong,
        meta: {
            title: 'Báo Cáo Động'
        }
    },
    //BaoCaoEQMS
    {
        path: '/Report-eqms',
        name: 'ReportEQMS',
        component: BaoCaoEQMS,
        meta: {
            title: 'Báo Cáo EQMS'
        }
    },

    //NopThongKeTheoKieuMau
    {
        path: '/Submit_statistical_sample',
        name: 'SubmitStatisticalSample',
        component: NopThongKeTheoBieuMau,
        meta: {
            title: 'Nộp thống kê theo kiểu mẫu'
        }
    },

    // <!-- ************ DỰ Báo IOC ************ -->
    {
        path: '/forecast/teacher',
        name: 'ForecastTeacher',
        component: DuBaoSoLuongGiaoVien,
        meta: {
            title: 'Dự báo số lượng giáo viên'
        }
    },
    {
        path: '/student-fluctuating',
        name: 'StudentFluctuating',
        component: HocSinhBienDong,
        meta: {
            title: 'Học sinh biến động'
        }
    },
    {
        path: '/forecast/student',
        name: 'ForecastStudent',
        component: KetQuaHocTapCuaHocSinh,
        meta: {
            title: 'Kết quả học tập của học sinh'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Đồng bộ CSDL`
    const token = localStorage.getItem('token')

    if (!token && to.path !== '/login') {
        // Nếu không có token và đang không ở trang login, chuyển hướng đến path login
        next('/login')
    } else {
        next()
    }
})
export default router
