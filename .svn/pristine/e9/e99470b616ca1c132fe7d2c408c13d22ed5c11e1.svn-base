<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint } from '../base/factory.js'

export default {
	name: 'bm-polyline',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		points: {
			type: Array
		},
		strokeColor: {
			type: String
		},
		strokeWeight: {
			type: Number
		},
		strokeOpacity: {
			type: Number
		},
		strokeStyle: {
			type: String
		},
		massClear: {
			type: Boolean,
			default: true
		},
		editing: {
			type: Boolean,
			default: false
		},
		clicking: {
			type: Boolean,
			default: true
		}
		// icons	Array<IconSequence>	配置贴合折线的图标
	},
	watch: {
		points: {
			deep: true,
			handler() {
				this.reload()
			}
		},
		strokeColor(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeColor(val)
		},
		strokeWeight(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeWeight(val)
		},
		strokeOpacity(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeOpacity(val)
		},
		strokeStyle(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeStyle(val)
		},
		massClear(val) {
			val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear()
		},
		editing(val) {
			val ? this.originInstance.enableEditing() : this.originInstance.disableEditing()
		},
		clicking() {
			this.reload()
		}
	},
	methods: {
		load() {
			const { BMap, map, points, strokeColor, strokeWeight, strokeOpacity, strokeStyle, massClear, editing, clicking } = this
			const overlay = (this.originInstance = new BMap.Polyline(points.map(item => createPoint(BMap, { lng: item.lng, lat: item.lat })), {
				strokeColor,
				strokeWeight,
				strokeOpacity,
				strokeStyle,
				enableMassClear: massClear,
				enableEditing: editing,
				enableClicking: clicking
			}))
			map.addOverlay(overlay)
			bindEvents.call(this, this.originInstance)
		}
	}
}
</script>
