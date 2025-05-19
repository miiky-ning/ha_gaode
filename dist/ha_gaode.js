import "https://webapi.amap.com/loader.js"

const VERSION = "V5.1.2.3"
const CONFIG_DEVICE_TRACKER_INCLUDE = 'device_tracker_include'
const CONFIG_GAODE_KEY = 'gaode_key'
const CONFIG_GAODE_KEY_SECURITY_CODE = 'gaode_key_security_code'
const CONFIG_CENTER = 'center'
const CONFIG_DEFAULT_TRA_TIME = 'default_tra_time'

const ZONE = 'zone'
const DEVICE_TRACKER = 'device_tracker'
const OTHER = 'other'
const POLYGON_P = 0.001

const random_color = [
    "#00ff00",
    "#00ffff",
    "#4a86e8",
    "#0000ff",
    "#9900ff",
    "#ff00ff",
    "#ff0000",
    "#ff9900",
    "#20124d",
    "#660000",
]

// const zone_icon = {
//   type: 'image',
//   image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
//   clipOrigin: [194, 92],
//   clipSize: [50, 68],
//   size: [25, 34],
//   anchor: 'bottom-center',
//   angel: 0,
//   retina: true
// }

// const zone_text = {
//   direction: 'top',
//   offset: [0, -5],
//   style: {
//     fontSize: 13,
//     fontWeight: 'normal',
//     fillColor: '#fff',
//     padding: '2, 5',
//     backgroundColor: '#22884f'
//   }
// }

// const gps_icon = {
//   type: 'image',
//   image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
//   clipOrigin: [194, 92],
//   clipSize: [50, 68],
//   size: [25, 34],
//   anchor: 'bottom-center',
//   angel: 0,
//   retina: true
// }

// const gps_test = {
//   direction: 'top',
//   offset: [0, -5],
//   style: {
//     fontSize: 13,
//     fontWeight: 'normal',
//     fillColor: '#fff',
//     padding: '2, 5',
//     backgroundColor: '#ff2a00'
//   }
// }

const init_html = `
<style>
  .dxAmap {
    --ha-card-background: var(--card-background-color, var(--primary-background-color));
    --primary-text-color: var(--primary-text-color);
    --secondary-text-color: var(--secondary-text-color);
    --map-controls-background: rgba(30, 30, 30, 0.9);
    --map-controls-color: var(--primary-text-color);
    --map-controls-border: 1px solid var(--divider-color);
    --map-controls-radius: 8px;
    --map-controls-padding: 8px;
    --map-controls-margin: 8px;
    --map-button-background: var(--primary-color);
    --map-button-color: var(--text-primary-color);
    --map-button-hover: var(--primary-color);
    --map-table-border: 1px solid var(--divider-color);
    --map-table-header: var(--secondary-text-color);
    --map-table-row-hover: rgba(255, 255, 255, 0.05);
    position: relative;
    height: 100%;
    width: 100%;
  }

  .dxAmap .kanban {
    color: var(--primary-text-color);
    background:  rgba(var(--primary-background-color-rgb), 0.8);
    border: var(--map-controls-border);
    border-radius: var(--map-controls-radius);
    padding: var(--map-controls-padding);
    margin: var(--map-controls-margin);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 1000;
  }

  .flexContainer {
    display: flex;
    align-items: center;
  }

  .amap-marker {
    position: absolute;
    left: 0;
    top: 0;
  }

  .amap-marker-label {
    position: absolute;
    z-index: 2;
    background-color: var(--primary-color);
    color: var(--text-primary-color);
    white-space: nowrap;
    cursor: default;
    padding: 3px;
    font-size: 12px;
    line-height: 14px;
    border: 0;
    border-radius: 4px;
  }

  button {
    background-color: var(--map-button-background);
    color: var(--map-button-color);
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    margin: 2px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--map-button-hover);
    opacity: 0.9;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input[type="text"],
  input[type="datetime-local"] {
    background-color: var(--input-background-color, rgba(255, 255, 255, 0.05));
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 6px;
    margin: 4px 0;
    width: 100%;
    box-sizing: border-box;
  }

  input[type="checkbox"] {
    margin-right: 4px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    color: var(--primary-text-color);
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: var(--map-table-border);
  }

  tr:hover {
    background-color: var(--map-table-row-hover);
  }

  th {
    color: var(--map-table-header);
    font-weight: 500;
  }

  .section-title {
    font-size: 1.1em;
    margin: 8px 0;
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .error-text {
    color: var(--error-color);
    font-size: 0.9em;
  }
  .mapContainer {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 300;
  }
</style>
<div id="dxMapDiv" class="dxAmap" style="height: 100%">
  <div style="display: flex; height: 100%; position: relative;">
    <div style="height: 100%; width: 100%;" id="mapContainer" class="mapContainer"></div>
    
    <!-- Expanded Controls Panel -->
    <div id="maxDiv" class="kanban" style="width: 500px; max-height: 90vh; overflow-y: auto;">
      <div class="flexContainer" style="margin-bottom: 12px; justify-content: space-between;">
        <button id="containerMin" class="mdc-icon-button">
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <div style="font-size: 0.9em; color: var(--secondary-text-color)">版本：${VERSION}</div>
      </div>

      <div style="margin-bottom: 16px;">
        <div class="section-title">地图操作</div>
        <div style="margin-bottom: 8px; font-size: 0.9em;">
          点击坐标：<span id="click_ll_span" style="user-select: text;"></span>
        </div>
        <div style="margin-bottom: 8px;">
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center;">
              <ha-switch id="satellite_input" style="--switch-checked-color: var(--primary-color);"></ha-switch>
              <span style="margin-left: 8px; font-size: 0.9em;">卫星</span>
            </div>
            <div style="display: flex; align-items: center;">
              <ha-switch id="roadnet_input" style="--switch-checked-color: var(--primary-color);"></ha-switch>
              <span style="margin-left: 8px; font-size: 0.9em;">路网</span>
            </div>
            <div style="display: flex; align-items: center;">
              <ha-switch id="traffic_input" style="--switch-checked-color: var(--primary-color);"></ha-switch>
              <span style="margin-left: 8px; font-size: 0.9em;">交通</span>
            </div>
          </div>
        </div>
      </div>
      <div id="zoneDiv">
        <div class="flexContainer" style="margin-bottom: 8px; justify-content: space-between;">
          <div class="section-title">区域管理</div>
          <button id="zone_add" class="mdc-icon-button">
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <table id="zoneContainer" style="margin-bottom: 16px;"></table>

        <div style="display: none; margin-bottom: 16px;" id="zoneSet">
          <div class="section-title" style="margin-bottom: 8px;">区域设置</div>

          <div id="zone_id_div" style="margin-bottom: 8px; display: none;">
            <div style="font-size: 0.9em; margin-bottom: 4px;">ID</div>
            <input disabled id="entity_id_post_input" type="text" name="entity_id_post">
          </div>
          
          <div style="margin-bottom: 8px;">
            <div style="font-size: 0.9em; margin-bottom: 4px;">名称</div>
            <input id="friendly_name_input" type="text" name="friendly_name" placeholder="输入区域名称">
          </div>
          
          <div style="margin-bottom: 8px;">
            <div style="font-size: 0.9em; margin-bottom: 4px;">经纬度</div>
            <input id="ll_input" type="text" name="ll" placeholder="经度,纬度">
          </div>
          
          <div style="margin-bottom: 12px;">
            <div style="font-size: 0.9em; margin-bottom: 4px;">范围</div>
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <input id="radius_input" type="text" name="radius" placeholder="半径(米)" style="flex: 1;">
              <button id="change_to_polygon">多边形</button>
              <button id="change_to_radius">圆形</button>
            </div>
            <input style="display: none;" id="polygon_input" type="text" name="polygon">
          </div>
          
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="zoneSetCancel">取消</button>
            <button id="zoneSetCommit" style="background-color: var(--success-color);">保存</button>
          </div>
        </div>
      </div>

      <div id="gpsDiv">
        <div class="section-title" style="margin-bottom: 8px;">设备轨迹</div>
        <table id="gpsList" style="margin-bottom: 16px;"></table>
        
        <div style="display: none" id="gps_set">
          <div class="section-title" style="margin-bottom: 8px;">轨迹设置</div>

          <div style="display: none">
            <input id="gps_entity_id_post_input" type="text" name="gps_entity_id_post">
          </div>
          
          <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.9em; margin-bottom: 4px;">设备名称</div>
              <div id="gps_friendly_name_div" style="font-weight: 500;"></div>
            </div>
            <button id="gps_set_cancel">取消</button>
          </div>
          
          <div style="margin-bottom: 12px;">
            <div style="font-size: 0.9em; margin-bottom: 4px;">时间范围</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px;">
              <input id="trajectory_start_datetime" type="datetime-local">
              <input id="trajectory_end_datetime" type="datetime-local">
            </div>
            <div id="trajectory_error" class="error-text"></div>
          </div>
          
          <div style="display: flex; justify-content: flex-end;">
            <button id="gps_set_trajectory" style="background-color: var(--success-color);">绘制轨迹</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Minimized Controls Panel -->
    <div id="minDiv" class="kanban" style="display: none;">
      <button id="containerMax" class="mdc-icon-button">
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </button>
    </div>
  </div>
</div>
`

class Ha_gaode extends HTMLElement {
    constructor() {
        super()
        // this.attachShadow({ mode: 'closed' });
    }
    mapLoading = false
    zoneEdit = false
    gpsEdit = false
    trajectoryMode = false
    editMarker = null
    editMarkerCircle = null
    amap = null
    zoneObj = {}
    gpsObj = {}
    zoneMarkerObj = {}
    zoneMarkerCircleObj = {}
    gpsCache = {}
    gpsList = []
    searchMarker = null
    carMarker = null
    carPolyline = null
    carPassedPolyline = null
    set hass(hass) {
        console.log(hass)
        console.log(this.content)
        let that = this
        // Initialize the content if it's not there yet.
        if (!this.content) {
            this.innerHTML = init_html;
            this.content = this.querySelector("#dxMapDiv")
            that._loadMap(hass)
            that._drawOnce(hass)
        }
        this._handleHass(hass)
    }
    _get_marker_options(type, friendly_name, gcj02_longitude, gcj02_latitude) {
        let basic = {
            map: this.amap,
            name: friendly_name,
            position: [gcj02_longitude, gcj02_latitude],
            zooms: [3, 20],
            opacity: 1,
            label: {
                content: `<div>${friendly_name}</div>`,
                offset: new AMap.Pixel(0, -30),
                direction: 'center'
            }
        }
        return basic
    }
    _get_circle_options(type, radius, gcj02_longitude, gcj02_latitude) {
        let basic = {
            map: this.amap,
            center: [gcj02_longitude, gcj02_latitude],
            radius: radius,
            fillOpacity: 0.3,
            strokeColor: '#14b4fc',
            strokeOpacity: 0.3,
            fillColor: '#14b4fc',
            strokeWeight: 0
        }
        return basic
    }
    _get_polygon_options(type, polygon_arr) {
        const basic = {
            path: polygon_arr,
            strokeColor: "#14b4fc",
            strokeWeight: 6,
            strokeOpacity: 0.3,
            fillOpacity: 0.4,
            fillColor: '#14b4fc',
            draggable: false
        }
        return basic
    }
    _drawWindow(hass) {
        let that = this;
        let zoneContainer = this.querySelector("#zoneContainer")
        zoneContainer.innerHTML = ''
        var rootTr = document.createElement(`tr`)
        rootTr.innerHTML = `
      <td>名称</td>
      <td>经纬度</td>
      <td>范围</td>
      <td>操作</td>
    `
        zoneContainer.appendChild(rootTr)
        for(let zoneKey in this.zoneObj) {
            const zone = this.zoneObj[zoneKey]
            const { gcj02_longitude, gcj02_latitude, friendly_name, radius } = zone.attributes
            var trE = document.createElement(`tr`)
            var key = zoneKey.replaceAll('\.', '')
            let position = ''
            if (gcj02_longitude && gcj02_latitude) {
                position = gcj02_longitude + "," + gcj02_latitude
            }
            trE.innerHTML = `
          <td >${friendly_name}</td>
          <td style='cursor: pointer' id=${key + '_ll'}>${position}</td>
          <td >${parseInt(radius)}</td>
          <td>
            <button id=${key + '_edit'} dx_entity_id=${zoneKey}>编辑</button>
            <button ${key === 'zonehome' ? "disabled" : ""} id=${key + '_delete'} dx_entity_id=${zoneKey}>删除</button>
          </td>
      `
            zoneContainer.appendChild(trE)
            let zoneKeyLl = this.querySelector(`#${key}_ll`)
            zoneKeyLl.addEventListener('click', () => {
                this.amap.setCenter([gcj02_longitude, gcj02_latitude])
            });
            let zoneKeyEdit = this.querySelector(`#${key}_edit`)
            zoneKeyEdit.addEventListener('click', () => {
                const entityId = zoneKeyEdit.getAttribute('dx_entity_id')
                const zone = this.zoneObj[entityId]
                const { friendly_name, gcj02_longitude, gcj02_latitude, radius, dx_polygon } = zone.attributes
                var zomeForm = this._getZoneForm()
                zomeForm.entity_id_post_input.value = zone.entity_id
                zomeForm.friendly_name_input.value = friendly_name
                if (gcj02_longitude && gcj02_latitude) {
                    zomeForm.ll_input.value = gcj02_longitude + "," + gcj02_latitude
                }
                zomeForm.radius_input.value = radius
                if (dx_polygon) {
                    zomeForm.polygon_input.value = dx_polygon
                } else {
                    zomeForm.polygon_input.value = null
                }
                this._showZoneForm()
                this._drawMap(true)
            });

            let zoneKeyDelete = this.querySelector(`#${key}_delete`)
            zoneKeyDelete.addEventListener('click', async () => {
                const entityId = zoneKeyDelete.getAttribute('dx_entity_id')
                const arr = entityId.split('.')
                await hass.callWS({
                    type: "zone/delete",
                    zone_id: arr[1]
                })
            });
        }

        // GPS
        let gpsList = this.querySelector("#gpsList")
        gpsList.innerHTML = ''
        var rootTr = document.createElement(`tr`)
        rootTr.innerHTML = `
      <td>名称</td>
      <td>最新经纬度</td>
      <td>操作</td>
    `
        gpsList.appendChild(rootTr)
        for(let gpsKey in this.gpsObj) {
            const gps = this.gpsObj[gpsKey]
            const { gcj02_longitude, gcj02_latitude, friendly_name } = gps.attributes

            var trE = document.createElement(`tr`)
            var key = gpsKey.replaceAll('\.', '')
            trE.innerHTML = `
          <td >${friendly_name}</td>
          <td style='cursor: pointer' id=${key + '_ll'}>${gcj02_longitude + "," + gcj02_latitude}</td>
          <td>
            <button id=${key + '_oper'} dx_entity_id=${gpsKey}>操作</button>
          </td>
      `
            gpsList.appendChild(trE)
            let gpsView = this.querySelector(`#${key}_ll`)
            gpsView.addEventListener('click', () => {
                this.amap.setCenter([gcj02_longitude, gcj02_latitude])
            })
            let gpsOper = this.querySelector(`#${key}_oper`)
            gpsOper.addEventListener('click', () => {
                const entityId = gpsOper.getAttribute('dx_entity_id')
                const gps = this.gpsObj[entityId]
                const { friendly_name, gcj02_longitude, gcj02_latitude } = gps.attributes

                this._showGpsForm({
                    position: [gcj02_longitude, gcj02_latitude],
                    friendly_name: friendly_name,
                    entity_id: entityId,
                })

                var gpsForm = this._getGpsForm()
                gpsForm.gps_entity_id_post_input.value = gps.entity_id
                gpsForm.gps_friendly_name_div.innerHTML = friendly_name
            });
        }
    }
    _toTrajectory(arr) {
        const that = this
        if (arr.length > 0) {
            const carPolyline = new AMap.Polyline({
                map: this.amap,
                showDir:true,
                strokeColor: "#28F",
                strokeWeight: 6,
            });
            const carPassedPolyline = new AMap.Polyline({
                map: this.amap,
                strokeColor: "#AF5",  //线颜色
                strokeWeight: 6,      //线宽
            });
            const carMarker = new AMap.Marker({
                map: this.amap,
                position: arr[0],
                icon: "https://webapi.amap.com/images/car.png",
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true,
                angle: -90,
            })
            carMarker.on('moving', function (e) {
                console.log(e.passedPath)
                carPassedPolyline.setPath(e.passedPath)
            });
            that.amap.setZoomAndCenter(17, arr[0])
            carPolyline.setPath(arr)
            carMarker.moveAlong(arr, 200);
            that.trajectoryMode = true
        }
    }
    _closeTrajectory() {
        this.trajectoryMode = false
        this._drawMap()
    }
    _drawOnce(hass) {
        let change_to_polygon = this.querySelector("#change_to_polygon")
        let change_to_radius = this.querySelector("#change_to_radius")
        change_to_polygon.addEventListener('click', async () => {
            const { radius_input, polygon_input } = this._getZoneForm()
            radius_input.style.display = "none"
            polygon_input.style.display = "inline-block"
            const { gcj02_longitude, gcj02_latitude, dx_polygon } = this._getZoneFormValues()
            if (!dx_polygon) {
                const polygon_arr = []
                polygon_arr.push([(parseFloat(gcj02_longitude) + POLYGON_P).toFixed(6) + "," + (parseFloat(gcj02_latitude) + POLYGON_P).toFixed(6)])
                polygon_arr.push([(parseFloat(gcj02_longitude) + POLYGON_P).toFixed(6) + "," + (parseFloat(gcj02_latitude) - POLYGON_P).toFixed(6)])
                polygon_arr.push([(parseFloat(gcj02_longitude) - POLYGON_P).toFixed(6) + "," + (parseFloat(gcj02_latitude) - POLYGON_P).toFixed(6)])
                polygon_arr.push([(parseFloat(gcj02_longitude) - POLYGON_P).toFixed(6) + "," + (parseFloat(gcj02_latitude) + POLYGON_P).toFixed(6)])
                polygon_input.value = polygon_arr.join(';')
            }
            this._drawMap()
        })
        change_to_radius.addEventListener('click', async () => {
            const { radius_input, polygon_input } = this._getZoneForm()
            radius_input.style.display = "inline-block"
            polygon_input.style.display = "none"
            polygon_input.value = null
            this._drawMap()
        })
        let zone_add = this.querySelector("#zone_add")
        zone_add.addEventListener('click', async () => {
            var zomeForm = this._getZoneForm()
            zomeForm.entity_id_post_input.value = null
            zomeForm.friendly_name_input.value = null
            zomeForm.ll_input.value = null
            zomeForm.radius_input.value = null
            this._showZoneForm()
            this._drawMap(true)
        })
        let zoneSetCancel = this.querySelector("#zoneSetCancel")
        zoneSetCancel.addEventListener('click', () => {
            this._hideZoneForm()
            this._drawMap()
        })
        let zoneSetCommit = this.querySelector("#zoneSetCommit")
        zoneSetCommit.addEventListener('click', async () => {
            var valueObj = this._getZoneFormValues()
            const entity_id = valueObj.entity_id
            if (!valueObj.radius) {
                valueObj.radius = 0
            }
            if (entity_id) {
                // 编辑
                await hass.callApi('post', 'dx/zone/save', {
                    ...valueObj
                })
            } else {
                // 创建
                var v = {
                    name: valueObj.friendly_name,
                    latitude: 90,
                    longitude: 90,
                    radius: valueObj.radius,
                    passive: false
                }
                const zone_new = await hass.callWS({
                    type: "zone/create",
                    ...v
                })
                await hass.callApi('post', 'dx/zone/save', {
                    ...valueObj,
                    entity_id: 'zone.' + zone_new.id
                })
            }
            this._hideZoneForm()
            this._drawMap()
        })
        let radiusInput = this.querySelector("#radius_input")
        radiusInput.addEventListener('change', (e) => {
            this._drawMap()
        })
        let friendly_name_input = this.querySelector("#friendly_name_input")
        friendly_name_input.addEventListener('change', (e) => {
            this._drawMap()
        })
        let ll_input = this.querySelector("#ll_input")
        ll_input.addEventListener('change', (e) => {
            this._drawMap(true)
        })
        let containerMin = this.querySelector("#containerMin")
        let containerMax = this.querySelector("#containerMax")
        let minDiv = this.querySelector("#minDiv")
        let maxDiv = this.querySelector("#maxDiv")
        containerMin.addEventListener('click', (e) => {
            minDiv.style.display = 'block'
            maxDiv.style.display = 'none'
        })
        containerMax.addEventListener('click', (e) => {
            maxDiv.style.display = 'block'
            minDiv.style.display = 'none'
        })

        let gps_set_cancel = this.querySelector("#gps_set_cancel")
        gps_set_cancel.addEventListener('click', () => {
            this._hideGpsForm()
            this._drawMap()
        })
        let gpsSetTrajectory = this.querySelector("#gps_set_trajectory")
        gpsSetTrajectory.addEventListener('click', async() => {
            const { entity_id, trajectory_start_datetime_seconds, trajectory_end_datetime_seconds } = this._getGpsFormValues()
            let trajectory_error = this.querySelector("#trajectory_error")
            if (!trajectory_start_datetime_seconds || !trajectory_end_datetime_seconds) {
                trajectory_error.innerHTML = "轨迹时间必填!"
                return;
            } else {
                trajectory_error.innerHTML = null
            }
            let msg = await hass.callApi('get', `dx/gps/gps_list_from_db?entity_id=${entity_id}&start_time_seconds=${trajectory_start_datetime_seconds}&end_time_seconds=${trajectory_end_datetime_seconds}`)
            console.log(msg)
            var arr = []
            for (let i = 0; i < msg.length; i++) {
                const element = msg[i];
                arr.push([parseFloat(element.gcj02_longitude), element.gcj02_latitude])
            }
            this._toTrajectory(arr)
        });
        let satellite_input = this.querySelector("#satellite_input")
        satellite_input.addEventListener('change', (e) => {
            if (satellite_input.checked) {
                this.amap.add(this.satelliteLayer)
            } else {
                this.amap.remove(this.satelliteLayer)
            }
        })
        let roadnet_input = this.querySelector("#roadnet_input")
        roadnet_input.addEventListener('change', (e) => {
            if (roadnet_input.checked) {
                this.amap.add(this.roadnetLayer)
            } else {
                this.amap.remove(this.roadnetLayer)
            }
        })
        let traffic_input = this.querySelector("#traffic_input")
        traffic_input.addEventListener('change', (e) => {
            if (traffic_input.checked) {
                this.amap.add(this.trafficLayer)
            } else {
                this.amap.remove(this.trafficLayer)
            }
        })
    }
    _showGpsForm(obj) {
        this.amap.setCenter(obj.position)
        let gpsSet = this.querySelector("#gps_set")
        gpsSet.style = "display: block"
        this.gpsEdit = true
        const trajectory_start_datetime = this.querySelector("#trajectory_start_datetime")
        const trajectory_end_datetime = this.querySelector("#trajectory_end_datetime")
        // 设置结束时间为当前时间
        const endDate = new Date();
        trajectory_end_datetime.value = this.to_datetime_string(endDate);
		// 设置开始时间为今天0点
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        trajectory_start_datetime.value = this.to_datetime_string(startDate);
        if (this.config[CONFIG_DEFAULT_TRA_TIME]) {
            const date = new Date()
            trajectory_end_datetime.value = this.to_datetime_string(date);
            date.setTime(date.getTime() - this.config[CONFIG_DEFAULT_TRA_TIME] * 60 * 1000);
            trajectory_start_datetime.value = this.to_datetime_string(date);
        }
    }
    _hideGpsForm() {
        let gpsSet = this.querySelector("#gps_set")
        gpsSet.style = "display: none"
        this.gpsEdit = false
        this._clearGpsFormValues()
        this._closeTrajectory()
    }
    _drawEditModeMap(set_center) {
        this.amap.clearMap()
        const valueObj = this._getZoneFormValues()
        const { friendly_name, gcj02_longitude, gcj02_latitude, radius, dx_polygon } = valueObj
        let position;
        if (gcj02_longitude && gcj02_latitude) {
            position = [gcj02_longitude, gcj02_latitude]
        }
        if (set_center) {
            this.amap.setCenter(position)
        }
        if (position) {
            new AMap.Marker(this._get_marker_options(ZONE, friendly_name, gcj02_longitude, gcj02_latitude))
        }
        const polygon_arr = this._transform_polygon_2_array(dx_polygon)
        if (polygon_arr && position) {
            var b = new AMap.Polygon(this._get_polygon_options(ZONE, polygon_arr))
            this.amap.add(b)
            const polygon_input = this.querySelector("#polygon_input")
            const polyEditor = new AMap.PolyEditor(this.amap, b)
            polyEditor.on('adjust', function (event) {
                console.info('触发事件： adjust', event.target.w.path)
                let now_arr = []
                let now_path_arr = event.target.w.path
                for (let i = 0; i < now_path_arr.length; i++) {
                    const { lng, lat } = now_path_arr[i]
                    now_arr.push([lng.toFixed(6) + "," + lat.toFixed(6)])
                }
                polygon_input.value = now_arr.join(';')
            })
            polyEditor.open()
        } else if (radius && position) {
            new AMap.Circle(this._get_circle_options(ZONE, radius, gcj02_longitude, gcj02_latitude))
        }
    }
    _showZoneForm() {
        let zone_id_div = this.querySelector("#zone_id_div")
        let radius_input = this.querySelector("#radius_input")
        let polygon_input = this.querySelector("#polygon_input")

        const valueObj = this._getZoneFormValues()
        const { entity_id, dx_polygon } = valueObj
        if (!entity_id) {
            zone_id_div.style = "display: none"
        } else {
            zone_id_div.style = "display: block"
        }
        let zoneSet = this.querySelector("#zoneSet")
        zoneSet.style = "display: block"
        this.zoneEdit = true
        if (!dx_polygon || dx_polygon === '') {
            radius_input.style.display = "inline-block"
            polygon_input.style.display = "none"
        } else {
            radius_input.style.display = "none"
            polygon_input.style.display = "inline-block"
        }

    }
    _hideZoneForm() {
        let zoneSet = this.querySelector("#zoneSet")
        zoneSet.style = "display: none"
        this.zoneEdit = false
        this._clearZoneFormValues()
    }
    _getGpsForm() {
        return {
            gps_entity_id_post_input: this.querySelector("#gps_entity_id_post_input"),
            gps_friendly_name_div: this.querySelector("#gps_friendly_name_div"),
            trajectory_start_datetime: this.querySelector("#trajectory_start_datetime"),
            trajectory_end_datetime: this.querySelector("#trajectory_end_datetime"),
            trajectory_error: this.querySelector("#trajectory_error")
        }
    }
    _getZoneForm() {
        return {
            friendly_name_input: this.querySelector("#friendly_name_input"),
            ll_input: this.querySelector("#ll_input"),
            radius_input: this.querySelector("#radius_input"),
            entity_id_post_input: this.querySelector("#entity_id_post_input"),
            polygon_input: this.querySelector("#polygon_input"),
        }
    }
    _getZoneFormValues() {
        const { ll_input, entity_id_post_input, friendly_name_input, radius_input, polygon_input } = this._getZoneForm()
        const ll = ll_input.value
        const llArray = ll.split(",")
        return {
            entity_id: entity_id_post_input.value,
            friendly_name: friendly_name_input.value,
            gcj02_longitude: llArray[0],
            gcj02_latitude: llArray[1],
            radius: parseInt(radius_input.value),
            dx_polygon: polygon_input.value
        }
    }
    _getGpsFormValues() {
        const { gps_entity_id_post_input, trajectory_start_datetime, trajectory_end_datetime, trajectory_error } = this._getGpsForm()
        trajectory_error.innerHTML = null
        let trajectory_start_datetime_seconds = null
        if (trajectory_start_datetime.value) {
            trajectory_start_datetime_seconds = Math.floor(new Date(trajectory_start_datetime.value) / 1000);
        }
        let trajectory_end_datetime_seconds = null
        if (trajectory_end_datetime.value) {
            trajectory_end_datetime_seconds = Math.floor(new Date(trajectory_end_datetime.value) / 1000);
        }
        return {
            entity_id: gps_entity_id_post_input.value,
            trajectory_start_datetime_seconds,
            trajectory_end_datetime_seconds,
        }
    }
    _clearZoneFormValues() {
        const { entity_id_post_input, friendly_name_input, ll_input, radius_input, polygon_input } = this._getZoneForm()
        entity_id_post_input.value = null
        friendly_name_input.value = null
        ll_input.value = null
        radius_input.value = null
        polygon_input.value = null
    }
    _clearGpsFormValues() {
        const { gps_entity_id_post_input, gps_friendly_name_div, trajectory_start_datetime, trajectory_end_datetime, trajectory_error } = this._getGpsForm()
        gps_entity_id_post_input.value = null
        gps_friendly_name_div.innerHTML = null
        trajectory_start_datetime.value = null
        trajectory_end_datetime.value = null
        trajectory_error.innerHTML = null
    }
    _handleHass(hass) {
        let that = this
        let { states } = hass;
        let device_tracker_include = this.config[CONFIG_DEVICE_TRACKER_INCLUDE]
        let now_zone_list = []
        let now_gps_list = []
        let has_change = false;
        for(let stateKey in states) {
            if (stateKey.startsWith('zone')) {
                let entity = states[stateKey]
                let { longitude, latitude, gcj02_longitude, gcj02_latitude } = entity.attributes
                if (longitude && latitude) {
                    const old_zone = this.zoneObj[stateKey]
                    if (old_zone) {
                        if (old_zone.last_updated != entity.last_updated) {
                            has_change = true
                        }
                    } else {
                        has_change = true
                    }
                    this.zoneObj[stateKey] = entity
                }
                now_zone_list.push(stateKey)
            } else if (stateKey.startsWith('device_tracker')) {
                const entity = states[stateKey]
                const { entity_id, attributes } = entity
                if (device_tracker_include && device_tracker_include.length > 0) {
                    if (device_tracker_include.indexOf(entity_id) < 0) {
                        continue;
                    }
                }
                if (entity.attributes.source_type = 'gps') {
                    let { gcj02_longitude, gcj02_latitude } = attributes
                    if (gcj02_longitude && gcj02_latitude) {
                        const old_gps = this.gpsObj[stateKey]
                        if (old_gps) {
                            if (old_gps.last_updated != entity.last_updated) {
                                has_change = true
                            }
                        } else {
                            has_change = true
                        }
                        this.gpsObj[stateKey] = entity
                        now_gps_list.push(stateKey)
                    }
                }
            }
        }

        for (let zoneKey in this.zoneObj) {
            if (now_zone_list.indexOf(zoneKey) < 0) {
                delete this.zoneObj[zoneKey]
                has_change = true
            }
        }
        for (let gpsKey in this.gpsObj) {
            if (now_gps_list.indexOf(gpsKey) < 0) {
                delete this.gpsObj[gpsKey]
                has_change = true
            }
        }
        if (has_change) {
            that._drawWindow(hass)
            that._drawMap()
        }
    }
    _drawMap(set_center) {
        if (!this.amap) return
        if (this.trajectoryMode) return
        let that = this;
        if (that.zoneEdit) {
            this._drawEditModeMap(set_center)
        } else {
            that.amap.clearMap()
            for (let zoneKey in that.zoneObj) {
                let zone = that.zoneObj[zoneKey]
                let { gcj02_longitude, gcj02_latitude, friendly_name, radius, dx_polygon } = zone.attributes
                if (gcj02_longitude && gcj02_latitude) {
                    new AMap.Marker(this._get_marker_options(ZONE, friendly_name, gcj02_longitude, gcj02_latitude))
                }
                if (gcj02_longitude && gcj02_latitude && dx_polygon) {
                    const polygon_arr = this._transform_polygon_2_array(dx_polygon)
                    this.amap.add(new AMap.Polygon(this._get_polygon_options(ZONE, polygon_arr)))
                } else if (gcj02_longitude && gcj02_latitude && radius >= 0) {
                    new AMap.Circle(this._get_circle_options(ZONE, radius, gcj02_longitude, gcj02_latitude))
                }


            }
            for(let key in that.gpsObj) {
                let gps = that.gpsObj[key]
                let { gcj02_longitude, gcj02_latitude, friendly_name } = gps.attributes
                if (gcj02_longitude && gcj02_latitude) {
                    new AMap.Marker(this._get_marker_options(DEVICE_TRACKER, friendly_name, gcj02_longitude, gcj02_latitude))
                }
            }
        }
    }
    _configMap(hass) {
        const that = this;
        let mapContainer = this.querySelector("#mapContainer");
        if (mapContainer) {
            this.amap = new AMap.Map(mapContainer, {
                center: this._getCenter(hass),
                zoom: 16,
                resizeEnable: true,
                animateEnable: false,
                jogEnable: false
            });
            // 图层
            this.satelliteLayer= new AMap.TileLayer.Satellite();
            this.roadnetLayer = new AMap.TileLayer.RoadNet()
            this.trafficLayer = new AMap.TileLayer.Traffic()
            //异步加载插件
            let map_search_input = this.querySelector("#map_search_input");
            this.amap.plugin(['AMap.Autocomplete', 'AMap.PolyEditor'],function(){
                const auto = new AMap.Autocomplete({
                    input: map_search_input
                });
                auto.on('select', function (data) {
                    const { name, location } = data.poi
                    that.amap.setCenter(data.poi.location)
                    const searchMarker = that.searchMarker
                    if (searchMarker) {
                        that.map.remove(searchMarker)
                    }
                    that.searchMarker = new AMap.Marker(that._get_marker_options(OTHER, name, location.lng, location.lat))
                    // searchMarker
                })
            });
            // this.amap.plugin('')
            // 地图点击事件处理
            this.amap.on('click', function (e) {
                const lng = e.lnglat.lng
                const lat = e.lnglat.lat
                if (that.zoneEdit) {
                    const llInput = that.querySelector("#ll_input")
                    const polygon_input = that.querySelector("#polygon_input")
                    const polygon_value = polygon_input.value
                    if (polygon_value) {
                        const polygon_array = that._transform_polygon_2_array(polygon_value)
                        const old_llArray = llInput.value.split(",")
                        const old_lng = parseFloat(old_llArray[0])
                        const old_lat = parseFloat(old_llArray[1])
                        const diff_lng = lng - old_lng
                        const diff_lat = lat - old_lat
                        let new_arr = []
                        for (let i = 0; i < polygon_array.length; i++) {
                            const inner_arr = polygon_array[i]
                            new_arr.push((inner_arr[0] + diff_lng).toFixed(6) + "," + (inner_arr[1] + diff_lat).toFixed(6))
                        }
                        polygon_input.value = new_arr.join(';')
                    }
                    llInput.value = lng + "," + lat
                    that._drawMap()
                } else {
                    const click_ll_span = that.querySelector("#click_ll_span");
                    click_ll_span.innerHTML = lng + "," + lat
                    click_ll_span.style.color = random_color[Math.round(Math.random()*random_color.length - 1)]
                }
            })
            that._drawMap()
            that._drawWindow(hass)
            this.mapLoading = false;
        }
    }
    _loadMap(hass) {
        console.log("_loadMap...")
        if (this.mapLoading) {return}
        this.mapLoading = true
        if (this.amap) {
            this.amap.destroy()
            this.amap = null
            this.editZoneLayer = null
            this.zoneMarkerObj = {}
            this.zoneMarkerCircleObj = {}
            this._configMap(hass)
            return;
        }
        let config = this.config
        window._AMapSecurityConfig = {
            securityJsCode: config[CONFIG_GAODE_KEY_SECURITY_CODE],
        }
        AMapLoader.load({
            key: config[CONFIG_GAODE_KEY],       // 申请好的Web端开发者Key，首次调用 load 时必填
        }).then((AMap)=>{
            this._configMap(hass)
        }).catch((e)=>{
            console.error(e);  //加载错误提示
        });
    }
    setConfig(config) {
        if (!config[CONFIG_GAODE_KEY]) {
            throw new Error("请设置高德Key");
        }
        this.config = config;
    }
    _getCenter(hass) {
        let { states } = hass;
        let center = this.config[CONFIG_CENTER]
        // 中心点
        let entity = states[center]
        if (entity) {
            const { gcj02_latitude, gcj02_longitude } = entity.attributes;
            if (gcj02_latitude && gcj02_longitude) {
                return [gcj02_longitude, gcj02_latitude]
            }
        }
        return null
    }
    to_datetime_string(date) {
         if (!date) return '';
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        // return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    _transform_polygon_2_array(polygon) {
        console.log(polygon)
        if (!polygon || polygon === '') {
            return null
        }
        const return_arr = []
        const ll_arr = polygon.split(';')
        for (let i = 0; i < ll_arr.length; i++) {
            const ll = ll_arr[i].split(",")
            return_arr.push([parseFloat(ll[0]),parseFloat(ll[1])])
        }
        return return_arr
    }
}

customElements.define("dx-gaode-map-card", Ha_gaode);
