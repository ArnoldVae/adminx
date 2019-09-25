<template>
	<Modal v-model="mapShow" title="点击坐标拾取" fullscreen>
		<baidu-map
			class="map"
			style="display: flex; flex-direction: column"
			:center="center"
			:zoom="zoom"
			:maxZoom="maxZoom"
			:minZoom="minZoom"
			:scrollWheelZoom="scrollWheelZoom"
			@click="click"
			@mousemove="mousemove"
			v-if="mapShow"
		>
			<bm-view style="width: 100%; height:100px; flex: 1" v-if="mapShow"></bm-view>
			<bm-marker :position="markerPoint" :dragging="false" animation="BMAP_ANIMATION_DROP"></bm-marker>
		</baidu-map>

		<div slot="footer" class="location-foter">
			<div class="title-box">
				<span class="moveTitle">鼠标坐标:{{ zuobiao }}</span>
				<span class="clickTitle">选中坐标:{{ location.lng }} / {{ location.lat }}</span>
			</div>
			<Button type="text" size="large" @click="mapShow = false">取消</Button>
			<Button type="primary" size="large" @click="saveMap">确认</Button>
		</div>
	</Modal>
</template>
<script>
import { setTimeout } from 'timers'
export default {
	name: 'maps',
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
			center: { lng: 118.877951, lat: 32.313924 }, // 地图默认显示坐标
			markerPoint: { lng: 0, lat: 0 }, // 标注坐标
			zoom: 12, // 缩放
			maxZoom: 16,
			minZoom: 10,
			scrollWheelZoom: true, // 是否可以滚轮缩放
			mapShow: false,
			location: {
				// 坐标
				lng: 0,
				lat: 0
			},
			zuobiao: '0 / 0'
		}
	},
	computed: {},
	filters: {},
	watch: {
		showM: {
			handler() {
				this.mapShow = true
			}
		},
		mapShow(val) {
			if (val) {
				this.location.lng = 0
				this.location.lat = 0
				this.zuobiao = ''
				if (!this.isAdd && this.mapXy.dMapx && this.mapXy.dMapy) {
					setTimeout(() => {
						this.setMarker()
					}, 300)
				} else {
					this.markerPoint.lng = 0
					this.markerPoint.lat = 0
				}
			}
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		click(e) {
			this.location.lng = e.point.lng.toFixed(4)
			this.location.lat = e.point.lat.toFixed(4)
			this.markerPoint.lng = e.point.lng.toFixed(4)
			this.markerPoint.lat = e.point.lat.toFixed(4)
		},
		mousemove(e) {
			this.zuobiao = e.point.lng.toFixed(4) + ' / ' + e.point.lat.toFixed(4)
		},
		saveMap() {
			this.$emit('locations', this.location)
			this.mapShow = false
		},
		setMarker() {
			this.markerPoint.lng = this.mapXy.dMapx
			this.markerPoint.lat = this.mapXy.dMapy
		}
	}
}
</script>
<style lang="stylus" scoped>
.baidu-map-contaier {
  width: 98%;
  height: 98%;
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
