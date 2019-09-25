<template>
	<div class="baidu-map-contaier">
		<div v-if="!hasBmView" ref="view" style="width: 100%; height: 100%"></div>
		<slot></slot>
	</div>
</template>

<style>
.baidu-map-contaier {
	height: 100%;
	width: 100%;
	position: absolute;
}
</style>

<script>
import bindEvents from '../base/bindEvent.js'
import { checkType, isIE } from '../base/utils.js'
import { createPoint } from '../base/factory.js'

export default {
	name: 'bm-map',
	data() {
		return {
			hasBmView: false
		}
	},
	props: {
		center: {
			type: [Object, String]
		},
		zoom: {
			type: Number
		},
		minZoom: {
			type: Number
		},
		maxZoom: {
			type: Number
		},
		highResolution: {
			type: Boolean,
			default: true
		},
		mapClick: {
			type: Boolean,
			default: true
		},
		mapType: {
			type: String
		},
		dragging: {
			type: Boolean,
			default: true
		},
		scrollWheelZoom: {
			type: Boolean,
			default: false
		},
		doubleClickZoom: {
			type: Boolean,
			default: true
		},
		keyboard: {
			type: Boolean,
			default: true
		},
		inertialDragging: {
			type: Boolean,
			default: true
		},
		continuousZoom: {
			type: Boolean,
			default: true
		},
		pinchToZoom: {
			type: Boolean,
			default: true
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		theme: {
			type: String,
			default: ''
		},
		viewportMargins: {
			type: Array,
			default() {
				return [30, 20, 30, 20]
			}
		},
		viewports: {
			type: Array
		}
	},
	watch: {
		center(val, oldVal) {
			const { map, zoom } = this
			if (checkType(val) === 'String' && val !== oldVal) {
				map.centerAndZoom(val, zoom)
			}
		},
		'center.lng'(val, oldVal) {
			const { BMap, map, zoom, center } = this
			if (val !== oldVal && val >= -180 && val <= 180) {
				map.centerAndZoom(new BMap.Point(val, center.lat), zoom)
			}
		},
		'center.lat'(val, oldVal) {
			const { BMap, map, zoom, center } = this
			if (val !== oldVal && val >= -74 && val <= 74) {
				map.centerAndZoom(new BMap.Point(center.lng, val), zoom)
			}
		},
		zoom(val, oldVal) {
			const { map } = this
			if (val !== oldVal && val >= 6 && val <= 16) {
				map.setZoom(val)
			}
		},
		minZoom(val) {
			const { map } = this
			map.setMinZoom(val)
		},
		maxZoom(val) {
			const { map } = this
			map.setMaxZoom(val)
		},
		highResolution() {
			this.reset()
		},
		mapClick() {
			this.reset()
		},
		dragging(val) {
			const { map } = this
			val ? map.enableDragging() : map.disableDragging()
		},
		scrollWheelZoom(val) {
			const { map } = this
			val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
		},
		doubleClickZoom(val) {
			const { map } = this
			val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
		},
		keyboard(val) {
			const { map } = this
			val ? map.enableKeyboard() : map.disableKeyboard()
		},
		inertialDragging(val) {
			const { map } = this
			val ? map.enableInertialDragging() : map.disableInertialDragging()
		},
		continuousZoom(val) {
			const { map } = this
			val ? map.enableContinuousZoom() : map.disableContinuousZoom()
		},
		pinchToZoom(val) {
			const { map } = this
			val ? map.enablePinchToZoom() : map.disablePinchToZoom()
		},
		autoResize(val) {
			const { map } = this
			val ? map.enableAutoResize() : map.disableAutoResize()
		},
		theme() {
			this.reset()
		},
		viewportMargins(val) {
			this.map.setViewport(
				this.viewports.map(item => {
					if (item.lng && item.lat) {
						return createPoint(this.BMap, item)
					}
				}),
				{
					margins: val || []
				}
			)
		},
		viewports: {
			deep: true,
			handler(val) {
				this.map.setViewport(
					val.map(
						function(item) {
							if (item.lng && item.lat) {
								return createPoint(this.BMap, item)
							}
						}.bind(this)
					),
					{
						margins: this.viewportMargins || []
					}
				)
			}
		}
	},
	methods: {
		setMapOption() {
			const {
				map,
				minZoom,
				maxZoom,
				dragging,
				scrollWheelZoom,
				doubleClickZoom,
				keyboard,
				inertialDragging,
				continuousZoom,
				pinchToZoom,
				autoResize
			} = this
			minZoom && map.setMinZoom(minZoom)
			maxZoom && map.setMaxZoom(maxZoom)
			dragging ? map.enableDragging() : map.disableDragging()
			scrollWheelZoom ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
			doubleClickZoom ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
			keyboard ? map.enableKeyboard() : map.disableKeyboard()
			inertialDragging ? map.enableInertialDragging() : map.disableInertialDragging()
			continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom()
			pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom()
			autoResize ? map.enableAutoResize() : map.disableAutoResize()
		},
		init(BMap) {
			if (this.map) {
				return
			}
			let $el = this.$refs.view
			if ($el) {
				for (let $node of this.$slots.default || []) {
					if ($node.componentOptions && $node.componentOptions.tag === 'bm-view') {
						this.hasBmView = true
						$el = $node.elm
					}
				}
				const map = new BMap.Map($el, {
					enableHighResolution: this.highResolution,
					enableMapClick: this.mapClick
				})
				this.map = map
				global.map = map
				const { setMapOption, zoom, getCenterPoint } = this

				setMapOption()
				bindEvents.call(this, map)

				map.centerAndZoom(getCenterPoint(), zoom)
				this.viewportPoints &&
					this.viewportPoints.length > 0 &&
					this.map.setViewport(
						this.viewportPoints.map(item => {
							if (item.lng && item.lat) {
								return createPoint(this.BMap, item)
							}
						})
					)
				this.$emit('ready', { BMap, map })
			}
		},
		getCenterPoint() {
			const { center, BMap } = this
			switch (checkType(center)) {
				case 'String':
					return center
				case 'Object':
					return new BMap.Point(center.lng, center.lat)
				default:
					return new BMap.Point()
			}
		},
		initMap(BMap) {
			this.BMap = BMap
			this.init(BMap)
		},
		getMapScript() {
			if (!global.BMap) {
				global.BMap = {}
				global.BMap._preloader = new Promise(resolve => {
					global._initBaiduMap = function() {
						resolve(global.BMap)
						global.document.body.removeChild($script)
						global.BMap._preloader = null
						global._initBaiduMap = null
					}

					var $script = document.createElement('script')
					$script.setAttribute('type', 'text/javascript')
					global.document.body.appendChild($script)
					if (isIE()) {
						$script.onreadystatechange = function() {
							if (this.readyState == 'loaded' || this.readyState == 'complete') {
								global._initBaiduMap && global._initBaiduMap()
							}
						}
					} else {
						$script.onload = function() {
							global._initBaiduMap && global._initBaiduMap()
						}
					}
					$script.setAttribute('src', `${global.mapconfig.home}/offlinemap.js`)
				})
				return global.BMap._preloader
			} else if (!global.BMap._preloader) {
				return Promise.resolve(global.BMap)
			} else {
				return global.BMap._preloader
			}
		},
		getMapCss() {
			if (!global.BMap._preloaderLink) {
				global.BMap._preloaderLink = new Promise(resolve => {
					var $link = document.createElement('link')
					$link.setAttribute('rel', 'stylesheet')
					global.document.head.appendChild($link)
					$link.setAttribute('href', `${global.mapconfig.home}/css/offlinemap.css`)
					global.BMap._preloaderLink = 'loaded'
					resolve()
				})
			}
		},
		reset() {
			const { getMapScript, getMapCss, initMap } = this
			getMapScript()
				.then(getMapCss())
				.then(initMap)
		},
		centerAndZoom() {
			let center = this.getCenterPoint()
		}
	},
	beforeCreate() {
		global.mapconfig = {
			img_format: '.jpg',
			tiles_dir: 'webshare/MAPS/TILES',
			home: 'assets/libs/gismap/'
		}
		if (process.env.NODE_ENV == 'production') {
			global.mapconfig['tiles_dir'] = `${global.location.protocol}//${global.location.host}/${global.mapconfig['tiles_dir']}`
		} else {
			global.mapconfig['tiles_dir'] = `http://172.26.1.233:8085/${global.mapconfig['tiles_dir']}`
		}
	},
	mounted() {
		this.reset()
	}
}
</script>
