const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const Api = {
    auth: {
        login: {
            method: METHOD.POST,
            url: 'csdlgd-user/auth/login'
        },
        register: {
            method: METHOD.POST,
            url: 'auth/register'
        }
    },
    internal_api: {
        dm_DonVi: {
            method: METHOD.GET,
            url: 'internal-api/dmDonVi/filter'
        },
        dm_School: {
            method: METHOD.POST,
            url: 'internal-api/dmTruongHoc/filterSchool'
        }
    },
    thongKeTangGiam: {
        method: METHOD.POST,
        url: 'csdlgd-report-api/dasboard/thongketanggiam'
    },
    bieuDoTruongHoc: {
        bieuDoTongQuan: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/truongTron'
        },
        bieuDoChatLuongDaoTao: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/truonghocchatluong'
        },
        bietDoLoaiHinhDaoTao: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/truonghocloaihinhdaotao'
        }
    },
    bieuDoHocSinh: {
        bieuDoTongQuan: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/hocsinh'
        },
        bieuDoTrangThai: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/hocsinhtrangthai'
        },
        bieuDoGioiTinh: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/hocsinhgioitinh'
        },
        bieuDoLoaiHinhDaoTao: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/hocsinhloaihinhdaotao'
        },
        bieuDoKhuVuc: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/hocsinhkhuvuc'
        }
    },
    bieuDoCanBoGiaoVienNhanVien: {
        bieuDoTongQuan: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvcaphoc'
        },
        bieuDoTrinhDoChinh: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvtrinhdochinh'
        },
        bieuDoGioiTinh: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvgioitinh'
        },
        bieuDoLoaiHopDong: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvloaiHD'
        }
    },
    bieuDoPhanLoaiCanBo: {
        bieuDoTongQuan: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/phanLoaiCanBo'
        },
        bieuDoDoTuoi: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvloaidotuoi'
        },
        bieuDoLoaiHinhDaoTao: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvloaihinhdaotao'
        },
        bieuDoTrangThai: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/canbogvtrangthai'
        }
    },
    bieuDoPhoDiem: {
        bieuDoDanhGiaHocSinh: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/danhgiahocsinh'
        },
        bieuDoPhoDiemHocKy: {
            method: METHOD.POST,
            url: 'csdlgd-report-api/dasboard/ketquahoctap'
        }
    },
    banDo:{
        getData:{
            method: METHOD.POST,
            url: 'csdlgd-report-api/ioc/data'
        }
    },
    tiepNhanDuLieuQLNT: {
        cauHinhLichDongBo: {
            capSo: {
                method: METHOD.GET,
                url: 'csdlgd-admin/yeuCauDongBo/list'
            },
            toggleStatus: {
                method: METHOD.POST,
                url: 'csdlgd-admin/yeuCauDongBo/toggleStatus'
            },
            thayDoiNgay: {
                method: METHOD.PUT,
                url: 'csdlgd-admin/yeuCauDongBo'
            },
            capTruong: {
                method: METHOD.POST,
                url: 'csdlgd-admin/yeuCauDuLieuTruong/chdbdl'
            },
            toggleStatus_CapTruong: {
                method: METHOD.PUT,
                url: 'csdlgd-admin/yeuCauDuLieuTruong/chdbdl'
            },
            thayDoiNgay_CapTruong: {
                method: METHOD.PUT,
                url: 'csdlgd-admin/yeuCauDuLieuTruong/chdbdl'
            },
            themMoiLichDongBo_CapTruong: {
                method: METHOD.POST,
                url: 'csdlgd-admin/yeuCauDuLieuTruong/chdbdl-truong'
            }
        },
        baoCaoTinhHinhNopDuLieu: {
            capSo: {
                method: METHOD.POST,
                url: 'csdlgd-report-api/bao-cao-tinh-hinh-nop-du-lieu/theo-don-vi'
            },
            capTruong: {
                method: METHOD.POST,
                url: 'csdlgd-report-api/bao-cao-tinh-hinh-nop-du-lieu'
            }
        },
        lichSuTiepNhanDuLieu: {
            heThongDoiTac: {
                method: METHOD.GET,
                url: 'internal-api/heThongDoiTac/getMaDoiTacCha'
            },
            lichSuTiepNhanDuLieu: {
                method: METHOD.POST,
                url: 'csdlgd-report-api/history-syncdata/school'
            },
            chiTiet: {
                method: METHOD.GET,
                url: 'csdlgd-report-api/history-syncdata/school'
            },
            ketQuaNhan_Chitiet: {
                method: METHOD.GET,
                url: 'csdlgd-report-api/history-syncdata/school/detail-response'
            }
        }
    },
    ketChuyenDuLieuLenBo: {
        matKhauKetChuyen: {
            danhSachMatKetChuyen: {
                method: METHOD.POST,
                url: 'csdlgd-push/KetChuyenDL/filterMatKhauKc'
            },
            themMoiMatKhauKetChuyen: {
                method: METHOD.POST,
                url: 'csdlgd-push/KetChuyenDL/createMKKC'
            },
            editMatKhauKetChuyen: {
                method: METHOD.POST,
                url: 'csdlgd-push/KetChuyenDL/updatePassword'
            },
            importFile: {
                method: METHOD.POST,
                url: 'csdlgd-push/KetChuyenDL/importMatKhau'
            }
        },
        cauHinhDuyetDayDuLieuLenBo: {
            danhSachCauHinhDayDuLieuLenBo: {
                method: METHOD.POST,
                url: 'csdlgd-admin/duyetDayDuLieu/danhSach'
            },
            xoaDuLieu: (id) => {
                return {
                    method: METHOD.POST,
                    url: `csdlgd-admin/duyetDayDuLieu/delete/${id}`
                }
            },
            duyetDayDuLieu: {
                method: METHOD.POST,
                url: 'csdlgd-admin/duyetDayDuLieu/taoCauHinh'
            }
        },
        ketChuyenDuLieu: {
            danhSachKetChuyenDuLieu: {
                method: METHOD.POST,
                url: 'csdlgd-admin/yeuCauDuLieuTruong/search2'
            },
            xuatExcel: {
                method: METHOD.POST,
                url: 'xuat-excel-ket-chuyen-du-lieu'
            }
        },
        lichSuKetChuyen: {
            duLieuDoiTac: {
                method: METHOD.GET,
                url: 'internal-api/heThongDoiTac/filter'
            },
            danhSachLichSuKetChuyen: {
                method: METHOD.POST,
                url: 'csdlgd-push/LichSuDay/DanhSachTruong'
            },
            updateDayLai: {
                method: METHOD.POST,
                url: 'csdlgd-admin/dayLenBo/updateDayLai'
            },
            xuatExcel: {
                method: METHOD.POST,
                url: 'csdlgd-push/Export/dayDuLieuLenBo'
            },
            chiTietLoiDongBo: {
                method: METHOD.POST,
                url: 'csdlgd-push/LichSuDay/detail'
            },
            danhMucLoi: {
                method: METHOD.GET,
                url: 'csdlgd-admin/MoetErrorDev'
            }
        }
    },
    baoCao: {
        baoCaoEMIS: {
            danhSachBaoCao: {
                method: METHOD.GET,
                url: 'csdlgd-report-api/danhSachBaoCao'
            }
        },
        baoCaoEQMS: {
            danhSachBaoCao: {
                method: METHOD.GET,
                url: 'csdlgd-report-api/danhSachBaoCao'
            }
        },
        baoCaoChoSo: {
            danhSachBaoCao: {
                method: METHOD.GET,
                url: 'csdlgd-report-api/danhSachBaoCao'
            },
            xemBaoCao: {
                method: METHOD.POST,
                url: 'csdlgd-report-api/download-excel/get-report-link'
            }
        },
        nopThongKeTheoBieuMau: {
            danhSachBieuMau: {
                method: METHOD.POST,
                url: 'csdlgd-admin/nop-bieu-mau/filter'
            },
            themMoiBieuMau: {
                method: METHOD.POST,
                url: 'csdlgd-admin/nop-bieu-mau/create'
            },
            thaoTacDuLieu: {
                method: METHOD.POST,
                url: 'csdlgd-admin/nop-bieu-mau/action'
            },
            updateNopBieuMau: {
                method: METHOD.POST,
                url: 'csdlgd-admin/nop-bieu-mau/update'
            }
        }
    }
}

export default Api
