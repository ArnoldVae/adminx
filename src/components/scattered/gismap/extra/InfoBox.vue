<template>
	<div v-show="show">
		<slot></slot>
	</div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'
import { InfoBoxFactory } from './InfoBox.js'
import { createSize, createPoint } from '../base/factory.js'
import bindEvents from '../base/bindEvent.js'

export default {
	name: 'bm-info-box',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	data() {
		return {
			show: false
		}
	},
	props: {
		offset: {
			type: Object,
			default() {
				return {
					width: 0,
					height: 0
				}
			}
		},
		boxClass: {
			type: String,
			default: 'infoBox'
		},
		boxStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		closeIconMargin: {
			type: String,
			default: '2px'
		},
		closeIconUrl: {
			type: String,
			default: '/assets/libs/gismap/images/close.png'
		},
		autoPan: {
			type: Boolean,
			default: true
		},
		align: {
			// INFOBOX_AT_TOP|INFOBOX_AT_BOTTOM
			type: String,
			default: 'INFOBOX_AT_TOP'
		},
		open: {
			type: Boolean,
			default: false
		},
		position: {
			type: Object
		}
	},
	watch: {
		'offset.width'(val, oldVal) {
			const { BMap, originInstance, offset } = this
			if (val !== oldVal) {
				originInstance._opts.offset = createSize(BMap, { width: val, height: offset.height })
				originInstance._adjustPosition(originInstance._point)
			}
		},
		'offset.height'(val, oldVal) {
			const { BMap, originInstance, offset } = this
			if (val !== oldVal) {
				originInstance._opts.offset = createSize(BMap, { width: offset.width, height: val })
				originInstance._adjustPosition(originInstance._point)
			}
		},
		boxClass(val, oldVal) {
			val !== oldVal && (this.originInstance._div.className = val)
		},
		boxStyle(val, oldVal) {
			val !== oldVal && this.originInstance.setStyles(val)
		},
		closeIconMargin(val, oldVal) {
			if (val !== oldVal) {
				this.originInstance._opts.closeIconMargin = val
				this.originInstance._closeIcon.style.margin = val
			}
		},
		closeIconUrl(val, oldVal) {
			if (val !== oldVal) {
				this.originInstance._opts.closeIconUrl = val
				this.originInstance._closeIcon.src = val
			}
		},
		autoPan(val) {
			val ? this.originInstance.enableAutoPan() : this.originInstance.disableAutoPan()
		},
		align(val, oldVal) {
			if (val !== oldVal) {
				this.originInstance._opts.align = this.getAlign(val)
				this.redraw()
			}
		},
		open(val) {
			if (val) {
				this._isClosed && this.originInstance.initialize(this.map)
				this.openInfoBox()
			} else {
				this.closeInfoBox()
			}
		},
		show(val) {
			val ? this.originInstance.show() : this.originInstance.hide()
		},
		'position.lng'(val, oldVal) {
			const { BMap, originInstance, position } = this
			if (val !== oldVal) {
				originInstance.setPosition(createPoint(BMap, { lng: val, lat: position.lat }))
			}
		},
		'position.lat'(val, oldVal) {
			const { BMap, originInstance, position } = this
			if (val !== oldVal) {
				originInstance.setPosition(createPoint(BMap, { lng: position.lng, lat: val }))
			}
		}
	},
	methods: {
		redraw() {
			this.originInstance && this.originInstance.draw()
		},
		getAlign(align) {
			const INFOBOX_ALIGN = {
				INFOBOX_AT_TOP: 1,
				// INFOBOX_AT_RIGHT: 2,
				INFOBOX_AT_BOTTOM: 3
				// INFOBOX_AT_LEFT: 4
			}
			return INFOBOX_ALIGN[align] || INFOBOX_ALIGN['INFOBOX_AT_TOP']
		},
		load() {
			this.initOverlay()
		},
		init(InfoBox) {
			const { BMap, map, $parent, offset, boxClass, boxStyle, closeIconMargin, closeIconUrl, autoPan, align, open } = this
			const $content = this.$el
			this.originInstance = new InfoBox(map, $content, {
				offset: offset && createSize(BMap, offset),
				boxClass,
				boxStyle,
				closeIconMargin,
				closeIconUrl,
				enableAutoPan: autoPan,
				align: this.getAlign(align)
			})
			bindEvents.call(this, this.originInstance)
			this.$container = $parent.originInstance && $parent.originInstance.getPosition ? $parent.originInstance : map
			if (open) {
				this.openInfoBox()
				this.show = true
			}
		},
		openInfoBox() {
			this._isClosed = false
			const { BMap, originInstance, $container, position } = this
			if (position && position.lng && position.lat) {
				originInstance.open(createPoint(BMap, { lng: position.lng, lat: position.lat }))
			} else {
				originInstance.open($container)
			}
			this.show = true
		},
		closeInfoBox() {
			this._isClosed = true
			this.originInstance.close()
			this.show = false
		},
		initOverlay() {
			const InfoBox = InfoBoxFactory(this.BMap)
			this.init(InfoBox)
		}
	}
}
</script>
