<template>
  <div>
    <div id='map' style="width: 97%">
    </div>
    <div class="filter-ctrl" style="display: none">
      <input
          id="filter-input"
          type="text"
          name="filter"
          placeholder="Filter by name"
      />
    </div>
  </div>
</template>
<script>
import goongjs from '@goongmaps/goong-js';

export default {
  props: ['item'],
  data() {
    return {
      GOONG_API_KEY: 'wyVjlIPeQZeeR5lErnC8dPD9dY9TEmLkh85sNyvq',

      lng: null,
      lat: null,
      locations: [],
      map: null,
      i: null,
      markers: [],
      centerLocation: [103.97673640728587, 22.38922740116539],
      dataMap: {
        quan_huyen: [],
        truong_hoc: []
      }
    }
  },
  mounted() {
    console.log('mounted bản đồ...')
    console.log('Dữ liệu gán cho bản đồ:')
    // this.setDataFromProps();
    // this.setDataMap();
    // this.initMarker(this.locations);
  },
  watch: {
    item(val) {
      if (val) {
        console.log("Dữ liệu bản đồ thay đổi")
        console.log('Khởi tạo bản đồ:')
        this.setDataFromProps()
      } else {
        console.log('Xóa bản đồ')
        this.removeDataMap();
      }
    },
  },
  methods: {
    removeDataMap() {
      console.log('removeDataMap')
      let map = this.map;
      this.map = null;
      console.log(map)
      if (map) {
        if (map.getLayer('national-park')) map.removeLayer('national-park');
        map.removeSource('national-park');
        if (map.getLayer('places')) {
          map.removeLayer('places')
          map.removeSource('places')
        }
        map.remove();
      }
      // map = null;
      this.map = null;
    },
    setDataFromProps() {
      if (this.item) {
        let dataQuanHuyen = [];
        let quanHuyens = this.item.quanHuyens;
        for (let i = 0; i < quanHuyens.length; i++) {
          let obj = {
            "properties": {
              "name": quanHuyens[i].tenQuanHuyen,
            },
            'type': 'Feature',
            'geometry': {
              'coordinates': [quanHuyens[i].border],
              'type': "Polygon"
            },
          }
          dataQuanHuyen.push(obj)
          this.dataMap.quan_huyen = dataQuanHuyen;
          // this.initMarker(this.dataMap.truong_hoc);
        }
        let dataTruongHocs = [];
        let truongHocs = this.item.truongHocs;
        for (let i = 0; i < truongHocs.length; i++) {
          if (truongHocs[i].location && truongHocs[i].location.length) {
            let lag = truongHocs[i].location[0]
            let lat = truongHocs[i].location[1]
            let obj = {
              'type': 'Feature',
              'properties': {
                'description':
                    '<p>Trường: '+truongHocs[i].tenTruongHoc+'</p>',
                'icon': 'school',
                'capHoc': truongHocs[i].capHoc
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [lat, lag]
              }
            }
            let objSchool =
                {
                  'type': 'Feature',
                  'properties': {
                    'description':
                        '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                    'icon': this.getIconSchool(truongHocs[i].capHoc),
                    'iconSize': [30, 30],
                    'capHoc': truongHocs[i].capHoc
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [lat, lag]
                  }
                }
            dataTruongHocs.push(obj)
          }
        }
        this.dataMap.truong_hoc = dataTruongHocs
        this.setDataMap();
      }
    },
    getIconSchool(capHoc) {
      let res = '';
      if (capHoc == 1) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconStudent.png'
      }
      if (capHoc == 12) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconSchool.png'
      }
      if (capHoc == 123) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongCap3.png'
      }
      if (capHoc == 23) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongCap3.png'
      }
      if (capHoc == 3) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongCap3.png'
      }
      if (capHoc == 4) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongMamNon2.png'
      }
      if (capHoc == 5) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongMamNon2.png'
      }
      if (capHoc == 45) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongMamNon2.png'
      }
      if (capHoc == 12345) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongMamNon2.png'
      }
      if (capHoc == 1234) {
        res = 'https://csdl.dtsgroup.com.vn/images/iconTruongMamNon2.png'
      }
      return res;
    },
    setDataMap() {
      console.log(this.item)
      goongjs.accessToken = this.GOONG_API_KEY;
      this.map = new goongjs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_light_v2.json',
        center: [103.97673640728587, 22.38922740116539],
        zoom: 8,
      });
      this.setGeoJSON();
    },
    setGeoJSON() {
      console.log('set GeoJSON')
      let map = this.map;
      let that = this;
      console.log(that.dataMap.quan_huyen)
      map.on('load', function () {
        map.addSource('national-park', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': that.dataMap.quan_huyen
          }
        });
        map.on('click', 'national-park', function (e) {
          new goongjs.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
        });
        map.addLayer({
          'id': 'national-park',
          'type': 'fill',
          'source': 'national-park',
          'paint': {
            'fill-color': '#888888',
            'fill-opacity': 0.4
          },
          'filter': ['==', '$type', 'Polygon']
        });
        // that.dataMap.truong_hoc.forEach(function (marker) {
        //   var el = document.createElement('div');
        //   el.className = 'marker';
        //   el.style.backgroundImage = 'url('+that.getIconSchool(marker.properties.capHoc)+')';
        //   el.style.width = '35px';
        //   el.style.height ='35px';
        //   el.style.backgroundSize = 'contain';
        //   el.style.backgroundRepeat = 'no-repeat';
        //   el.addEventListener('click', function () {
        // console.log('click marker')
        //   });
        //   new goongjs.Marker(el)
        //       .setLngLat(marker.geometry.coordinates)
        //       .addTo(map);
        // });
        map.addSource('places', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': that.dataMap.truong_hoc
          }
        });
        map.addLayer({
          'id': 'places',
          'type': 'symbol',
          'source': 'places',
          'layout': {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
          }
        });
        map.on('click', 'places', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new goongjs.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
        });
        map.on('mouseenter', 'places', function () {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'places', function () {
          map.getCanvas().style.cursor = '';
        });

      });
    },
    flyTo() {
      let map = this.map;
      map.flyTo({
        center: [
          103.9767364 + (Math.random() - 10) * 0.1,
          21.3892274 + (Math.random() - 10) * 0.1
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    },
    initMarker(location) {
      console.log('initMarker')
      console.log(location)
      this.markers = [];
      location.forEach(e => {
        const marker = new goongjs.Marker()
            .setLngLat(e.coord)
            .addTo(this.map);
        this.markers.push(marker)
      })
    },
  }
}
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.goong-map {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  gap: 10px;
  z-index: 998;
  padding: 20px 25px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 0.5px solid rgb(221, 221, 221);
}

.goong-map-nav-bar {
  display: flex;
  gap: 10px;
  align-items: center;
}

.goong-map-side-bar {
  display: flex;
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  gap: 10px;
  z-index: 997;
  width: 350px;
  padding-left: 15px;
  padding-top: 20px;
  background-color: white;
  flex-direction: column;
}

.goong-map-coordinates {
  display: flex;
  gap: 10px;
  height: 40px;
  align-items: center;
}

.goong-map-locations {
  width: 220px;
}

input {
  width: 150px;
  height: 30px;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgb(54, 148, 255);
  padding-left: 5px;
}

button {
  width: 100px;
  height: 30px;
  color: white;
  border: 1px solid rgb(54, 148, 255);
  background-color: rgb(54, 148, 255);
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  width: 40px;
  height: 30px;
  background-color: red;
  border: 1px solid red;
}

.edit-btn {
  width: 40px;
  height: 30px;
  background-color: orange;
  border: 1px solid orange;
}
</style>