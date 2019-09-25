<script>
import commonMixin from '../base/mixins/common.js'
import { createSize } from '../base/factory.js'

export default {
	name: 'bm-navigation',
	render(h) {
		return h()
	},
	mixins: [commonMixin('control')],
	props: {
		anchor: {
			type: String,
			default: 'BMAP_ANCHOR_TOP_LEFT'
		},
		offset: {
			type: Object
		},
		type: {
			type: String,
			default: 'BMAP_NAVIGATION_CONTROL_LARGE'
		},
		showZoomInfo: {
			type: Boolean
		},
		enableGeolocation: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		anchor() {
			this.reload()
		},
		offset() {
			this.reload()
		},
		type() {
			this.reload()
		},
		showZoomInfo() {
			this.reload()
		}
	},
	methods: {
		load() {
			const { BMap, map, anchor, offset, type, showZoomInfo, enableGeolocation } = this
			this.originInstance = new BMap.NavigationControl({
				anchor: global[anchor],
				offset: offset && createSize(BMap, offset),
				type: global[type],
				showZoomInfo,
				enableGeolocation
			})
			map.addControl(this.originInstance)
		}
	}
}
</script>
