<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint } from '../base/factory.js'

export default {
	name: 'bm-polygon',
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
		fillColor: {
			type: String
		},
		strokeWeight: {
			type: Number
		},
		strokeOpacity: {
			type: Number
		},
		fillOpacity: {
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
		fillColor(val, oldVal) {
			val !== oldVal && this.originInstance.setFillColor(val)
		},
		strokeWeight(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeWeight(val)
		},
		strokeOpacity(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeOpacity(val)
		},
		fillOpacity(val, oldVal) {
			val !== oldVal && this.originInstance.setFillOpacity(val)
		},
		massClear(val) {
			val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear()
		},
		editing(val) {
			val ? this.originInstance.enableEditing() : this.originInstance.disableEditing()
		},
		clicking(val) {
			val && this.reload()
		}
	},
	methods: {
		load() {
			const { BMap, map, points, strokeColor, fillColor, strokeWeight, strokeOpacity, fillOpacity, strokeStyle, massClear, editing, clicking } = this
			const overlay = (this.originInstance = new BMap.Polygon(points.map(item => createPoint(BMap, { lng: item.lng, lat: item.lat })), {
				strokeColor,
				fillColor,
				strokeWeight,
				strokeOpacity,
				fillOpacity,
				strokeStyle,
				enableMassClear: massClear,
				// enableEditing: editing,
				enableClicking: clicking
			}))
			map.addOverlay(overlay)
			bindEvents.call(this, this.originInstance)
			editing && overlay.enableEditing()
		}
	}
}
</script>
