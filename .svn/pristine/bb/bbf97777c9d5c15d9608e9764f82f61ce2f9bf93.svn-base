<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createSize, createPoint } from '../base/factory.js'

export default {
	name: 'bm-label',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		content: {
			type: String
		},
		offset: {
			type: Object
		},
		position: {
			type: Object
		},
		massClear: {
			type: Boolean,
			default: true
		},
		title: {
			type: String
		},
		zIndex: {
			type: Number
		},
		labelStyle: {
			type: Object
		}
	},
	watch: {
		content(val, oldVal) {
			val !== oldVal && this.originInstance.setContent(val)
		},
		'offset.width'(val, oldVal) {
			const { BMap, originInstance, offset } = this
			if (val !== oldVal) {
				originInstance.setOffset(createSize(BMap, { width: val, height: offset.height }))
			}
		},
		'offset.height'(val, oldVal) {
			const { BMap, originInstance, offset } = this
			if (val !== oldVal) {
				originInstance.setOffset(createSize(BMap, { width: offset.width, height: val }))
			}
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
		},
		massClear(val) {
			val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear()
		},
		title(val, oldVal) {
			val !== oldVal && this.originInstance.setTitle(val)
		},
		zIndex(val, oldVal) {
			val !== oldVal && this.originInstance.setZIndex(val)
		},
		labelStyle: {
			deep: true,
			handler(val, oldVal) {
				val !== oldVal && this.originInstance.setStyle(val)
			}
		}
	},
	methods: {
		load() {
			const { BMap, map, $parent, content, offset, position, massClear, title, zIndex, labelStyle } = this
			const overlay = (this.originInstance = new BMap.Label(content, {
				offset: offset && createSize(BMap, { width: offset.width, height: offset.height }),
				position: position && createPoint(BMap, { lng: position.lng, lat: position.lat }),
				enableMassClear: massClear
			}))
			try {
				$parent.originInstance.setLabel(overlay)
			} catch (error) {
				map.addOverlay(overlay)
			}
			title && overlay.setTitle(title)
			zIndex && overlay.setZIndex(zIndex)
			labelStyle && overlay.setStyle(labelStyle)
			bindEvents.call(this, this.originInstance)
		}
	}
}
</script>
