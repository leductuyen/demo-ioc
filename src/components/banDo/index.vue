<template>
  <div style="display: contents">
    <l-map
        style="height: 100%; min-height: 60vh"
        :zoom="zoom"
        :center="center"
    >
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
      />
      <l-marker
          v-for="(marker, index) in danh_sach_cac_truong"
          :key="index"
          :icon="getIcon(marker)"
          :lat-lng="marker.location"
      >
        <l-tooltip>
          {{ marker.tenTruongHoc }} - [{{ marker.maTruongHoc }}]<br/>
          Giáo viên: {{ marker.soLuongCanBoGiaoVien }}<br/>
          Lớp học: {{ marker.soLuongLopHoc }}<br/>
          Học sinh: {{ marker.soLuongHocSinh }}<br/>
          Học sinh bỏ học: {{ marker.soLuongHocSinhNghiHoc }}
        </l-tooltip>
      </l-marker>
      <l-geo-json :geojson="geojson" :options="options"></l-geo-json>
    </l-map>
    <div
        v-show="thongTinBanDo.tenQuanHuyen != ''"
        ref="thongTinVungChon"
        class="thongTinVungChon"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <h5>
            <b>{{ thongTinBanDo.tenQuanHuyen }}</b>
          </h5>
          <p>
            Số lượng Trường học:
            <span>{{
                thongTinBanDo.soLuongTruongHoc.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng CBGV:
            <span>{{
                thongTinBanDo.soLuongCanBoGiaoVien.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng CBGV nam:
            <span>{{
                thongTinBanDo.soLuongCanBoGiaoVienNam.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng CBGV nữ:
            <span>{{
                thongTinBanDo.soLuongCanBoGiaoVienNu.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng Học sinh:
            <span>{{
                thongTinBanDo.soLuongHocSinh.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng Học sinh nam:
            <span>{{
                thongTinBanDo.soLuongHocSinhNam.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng Học sinh nữ:
            <span>{{
                thongTinBanDo.soLuongHocSinhNu.toLocaleString()
              }}</span>
          </p>
          <p>
            Số lượng Học sinh nghỉ học:
            <span>{{
                thongTinBanDo.soLuongHocSinhNghiHoc.toLocaleString()
              }}</span>
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  LMap,
  LPopup,
  LTileLayer,
  LControlLayers,
  LControlScale,
  LMarker,
  LTooltip,
  LControl,
  LGeoJson
} from 'vue2-leaflet'

export default {
  props: ['item'],
  name: 'banDo',
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LMarker,
    LTooltip,
    LGeoJson
  },
  watch: {
    item(newVal) {
      console.log(newVal)
      if (newVal) {
        this.ganDuLieuBanDo(newVal)
      }
    }
  },
  computed: {
    options() {
      var defaultStyle = {
        weight: 2,
        opacity: 0.8,
        color: '#0033FF',
        fillOpacity: 0.2
      }
      return {
        style: function style(feature) {
          return defaultStyle
        },
        onEachFeature: (feature, layer) => {
          var self = this
          layer.on('mouseover', () => {
            layer.setStyle({
              color: this.getColor(feature),
              weight: 2
            })
          })
          layer.on('mouseout', () => {
            layer.setStyle(defaultStyle)
            let thongTinBanDo = {
              soLuongCanBoGiaoVien: '',
              soLuongCanBoGiaoVienNam: '',
              soLuongCanBoGiaoVienNu: '',
              soLuongDiemTruong: '',
              soLuongHocSinh: '',
              soLuongHocSinhNam: '',
              soLuongHocSinhNghiHoc: '',
              soLuongHocSinhNu: '',
              soLuongTruongHoc: '',
              tenQuanHuyen: ''
            }
            this.ganDuLieuThongTin(thongTinBanDo)
          })
          layer.on('mouseover', (e) => {
            this.ganDuLieuThongTin(feature.properties)
          })
          layer.on('mouseout', function (e) {
            // L.popup().openOn(self.$refs.myMapRef.mapObject);
          })
          layer.on('click', (e) => {
            console.log(feature.properties)
            var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent(
                    '<p style="color: #878575; font-size: 12px; margin-bottom: 0;">' +
                    feature.properties.tenQuanHuyen +
                    '</>'
                )
                .openOn(self.$refs.myMapRef.mapObject)
          })
        }
      }
    }
  },
  data() {
    return {
      danh_sach_cac_truong: [],
      url: 'https://{s}.openmaptitles.org/languages/en/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 9.5,
      tileProviders: [
        {
          name: 'Mặc định',
          nameEn: 'macDinh',
          visible: true,
          attribution: 'Hệ thống IOC CSDL Ngành Giáo dục',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          locale:'vi'
        },
        {
          name: 'Đơn giản',
          nameEn: 'donGian',
          visible: false,
          attribution: 'Hệ thống IOC CSDL Ngành Giáo dục',
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        },
        {
          name: 'Vệ tinh',
          nameEn: 'veTinh',
          visible: false,
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Hệ thống IOC CSDL Ngành Giáo dục'
        },
        {
          name: 'Dark mode',
          nameEn: 'darkMode',
          visible: false,
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution: 'Hệ thống IOC CSDL Ngành Giáo dục'
        },
        {
          name: 'Địa hình',
          nameEn: 'diaHinh',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: 'Hệ thống IOC CSDL Ngành Giáo dục'
        }
      ],
      center: [22.311075060526896, 104.10620129208274],
      thongTinBanDo: {
        soLuongCanBoGiaoVien: '',
        soLuongCanBoGiaoVienNam: '',
        soLuongCanBoGiaoVienNu: '',
        soLuongDiemTruong: '',
        soLuongHocSinh: '',
        soLuongHocSinhNam: '',
        soLuongHocSinhNghiHoc: '',
        soLuongHocSinhNu: '',
        soLuongTruongHoc: '',
        tenQuanHuyen: ''
      },
      geojson: {
        type: 'FeatureCollection',
        features: []
      },
      hienThiHocSinhNghiHoc: false,
      iconTruongCap1: L.icon({
        iconUrl: 'images/iconStudent.png',
        iconSize: [20, 30],
        iconAnchor: [20, 16]
      }),
      iconTruongCap2: L.icon({
        iconUrl: 'images/iconSchool.png',
        iconSize: [20, 30],
        iconAnchor: [20, 16]
      }),
      iconTruongCap3: L.icon({
        iconUrl: 'images/iconTruongCap3.png',
        iconSize: [30, 20],
        iconAnchor: [20, 16]
      }),
      iconTruongMamNon: L.icon({
        iconUrl: 'images/iconTruongMamNon2.png',
        iconSize: [25, 35],
        iconAnchor: [20, 16]
      }),
      iconUser: L.icon({
        iconUrl: 'images/iconUser.png',
        iconSize: [20, 30],
        iconAnchor: [20, 16]
      }),
      iconWarning: L.icon({
        iconUrl: 'images/iconWarning.png',
        iconSize: [20, 30],
        iconAnchor: [20, 16]
      }),
      iconCenterCity: L.icon({
        iconUrl: 'images/trungTamThanhPho4.png',
        iconSize: [30, 20],
        iconAnchor: [20, 20]
      })
    }
  },
  // async created () {
  //   let response = await fetch('https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson');
  //   let demo = await response.json();
  //   console.log('Ban đầu:')
  //   console.log(demo)
  // },
  mounted() {
    console.log('mounted bản đồ...')
  },
  methods: {
    getIcon(e) {
      // console.log('getIcon')
      // console.log(e)
      let data = e
      if (data.capHoc == 1) {
        if (
            this.hienThiHocSinhNghiHoc &&
            data.soLuongHocSinhNghiHoc > 0
        ) {
          return this.iconWarning
        }
        return this.iconTruongCap1
      } else if (data.capHoc == 2 || data.capHoc == 12) {
        if (
            this.hienThiHocSinhNghiHoc &&
            data.soLuongHocSinhNghiHoc > 0
        ) {
          return this.iconWarning
        }
        return this.iconTruongCap2
      } else if (data.capHoc == 3) {
        if (
            this.hienThiHocSinhNghiHoc &&
            data.soLuongHocSinhNghiHoc > 0
        ) {
          return this.iconWarning
        }
        return this.iconTruongCap3
      } else if (
          data.capHoc == 4 ||
          data.capHoc == 5 ||
          data.capHoc == 45
      ) {
        if (
            this.hienThiHocSinhNghiHoc &&
            data.soLuongHocSinhNghiHoc > 0
        ) {
          return this.iconWarning
        }
        return this.iconTruongMamNon
      } else if (
          this.hienThiHocSinhNghiHoc &&
          data.soLuongHocSinhNghiHoc > 0
      ) {
        return this.iconWarning
      } else {
        return this.iconUser
      }
    },
    ganDuLieuThongTin(e) {
      this.thongTinBanDo = e
    },
    getColor() {
      return '#F00'
    },
    ganDuLieuBanDo(e) {
      if (!this.item) {
        return
      }
      this.geojson.features = []
      // console.log(this.item)
      let data = JSON.parse(JSON.stringify(this.item))
      // console.log('ganDuLieuBanDo')
      // console.log(this.geojson)
      let quanHuyens = data.quanHuyens
      let truongHocs = data.truongHocs

      for (let i = 0; i < truongHocs.length; i++) {
        if (truongHocs[i].location.length > 0) {
          this.danh_sach_cac_truong.push(truongHocs[i])
        }
      }
      // console.log('trường:')
      // console.log(this.danh_sach_cac_truong)
      for (let i = 0; i < quanHuyens.length; i++) {
        let obj = {
          type: 'Feature',
          id: '01',
          properties: {
            tenQuanHuyen: quanHuyens[i].tenQuanHuyen,
            soLuongCanBoGiaoVien: quanHuyens[i].soLuongCanBoGiaoVien,
            soLuongCanBoGiaoVienNam:
            quanHuyens[i].soLuongCanBoGiaoVienNam,
            soLuongCanBoGiaoVienNu:
            quanHuyens[i].soLuongCanBoGiaoVienNu,
            soLuongDiemTruong: quanHuyens[i].soLuongDiemTruong,
            soLuongHocSinh: quanHuyens[i].soLuongHocSinh,
            soLuongHocSinhNam: quanHuyens[i].soLuongHocSinhNam,
            soLuongHocSinhNu: quanHuyens[i].soLuongHocSinhNu,
            soLuongHocSinhNghiHoc:
            quanHuyens[i].soLuongHocSinhNghiHoc,
            soLuongTruongHoc: quanHuyens[i].soLuongTruongHoc
          },
          geometry: {
            type: 'Polygon',
            coordinates: [quanHuyens[i].border]
          }
        }
        this.geojson.features.push(obj)
      }
      // console.log('Sau cùng:')
      // console.log(this.geojson)
    }
  }
}
</script>
<style scoped>
.thongTinVungChon {
  position: absolute;
  top: 90px;
  right: 0;
  border: 2px solid rgb(212, 247, 54);
  border-radius: 6px;
  min-height: 150px;
  z-index: 400;
  width: 25%;
  min-width: 200px;
  color: blue;
  background-color: rgba(255, 219, 58, 0.7);
}
</style>
