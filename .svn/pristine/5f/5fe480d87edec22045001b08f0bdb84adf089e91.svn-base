<template>
	<Modal v-model="mapShow" title="坐标拾取" fullscreen>
		<div id="allmap" ref="allmap"></div>
		<router-view></router-view>

		<div slot="footer" class="location-foter">
			<div class="title-box">
				<span class="moveTitle">当前坐标:{{ zuobiao }}</span>
				<span class="clickTitle">选中坐标:{{ location.lng }} / {{ location.lat }}</span>
			</div>
			<Button type="text" size="large" @click="mapShow = false">取消</Button>
			<Button type="primary" size="large" @click="saveMap">确认</Button>
		</div>
	</Modal>
</template>
<script>
export default {
	name: 'mymap',
	components: {},
	props: {
		showM: {
			type: Boolean
		},
		isAdd: {
			type: Boolean
		},
		mapXy: {
			type: Object
		}
	},
	data() {
		return {
			mapShow: false,
			location: {
				// 坐标
				lng: 0,
				lat: 0
			},
			zuobiao: '坐标'
		}
	},
	computed: {},
	filters: {},
	watch: {
		showM: {
			handler() {
				this.mapShow = true
				this.setMap()
			}
		},
		mapShow(val) {
			if (val) {
				this.location.lng = 0
				this.location.lat = 0
				this.zuobiao = ''
			}
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 地图弹窗
		showMpa(data) {
			this.mapShow = true
			this.setMap(data)
		},
		// 设置地图
		setMap(data) {
			let map = new BMap.Map('allmap', { enableMapClick: false })
			map.centerAndZoom(new BMap.Point(118.5276, 32.1153), 13)
			// map.centerAndZoom('南京', 12)

			// 地图缩放控件
			const topLeftControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })
			map.addControl(topLeftControl)

			const _this = this
			// 鼠标缩放
			map.enableScrollWheelZoom(true)
			// 移动获取经纬度
			map.addEventListener('onmousemove', function(e) {
				_this.zuobiao = parseFloat(e.point.lng).toFixed(4) + ' / ' + parseFloat(e.point.lat).toFixed(4)
			})
			if (!_this.isAdd) {
				if (_this.mapXy.dMapx && _this.mapXy.dMapy) {
					let point = new BMap.Point(_this.mapXy.dMapx, _this.mapXy.dMapy) // 设置新的标注
					let marker = new BMap.Marker(point) // 创建标注
					map.addOverlay(marker) // 将标注添加到地图中
				}
			}
			// 点击获取经纬度
			map.addEventListener('click', function(e) {
				_this.location.lng = parseFloat(e.point.lng).toFixed(4)
				_this.location.lat = parseFloat(e.point.lat).toFixed(4)

				if (map.getOverlays()) {
					let allOverlay = map.getOverlays() // 先删除之前的标注
					map.removeOverlay(allOverlay[0])
				}

				let point = new BMap.Point(e.point.lng, e.point.lat) // 设置新的标注
				let marker = new BMap.Marker(point) // 创建标注
				map.addOverlay(marker) // 将标注添加到地图中
			})
		},
		saveMap() {
			this.$emit('locations', this.location)
			this.mapShow = false
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
#allmap {
  height: 100%;
  overflow: hidden;
}

.location-foter {
  .title-box {
    float: left;
    font-size: 18px;
    color: #000;
    margin-left: 50%;
    transform: translateX(-50%);

    span {
      margin-right: 100px;
    }
  }
}
</style>
