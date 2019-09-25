<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint, createIcon } from '../base/factory.js'
import { CurveLine } from './CurveLine.js'

export default {
	name: 'bm-curve-line',
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
		},
		// icons	Array<IconSequence>	配置贴合折线的图标
		editingIcon: {
			type: Object
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
		},
		editingIcon: {
			deep: true,
			handler(val, oldVal) {
				const { BMap, originInstance } = this
				if (val !== oldVal) {
					originInstance && originInstance.setEditingIcon(createIcon(BMap, val))
				}
			}
		}
	},
	methods: {
		load() {
			const { BMap, map, points, strokeColor, strokeWeight, strokeOpacity, strokeStyle, massClear, editing, clicking, editingIcon } = this
			const overlay = (this.originInstance = new CurveLine(points.map(item => createPoint(BMap, { lng: item.lng, lat: item.lat })), {
				strokeColor,
				strokeWeight,
				strokeOpacity,
				strokeStyle,
				enableMassClear: massClear,
				// enableEditing: editing,
				enableClicking: clicking,
				editingIcon: editingIcon && createIcon(BMap, editingIcon)
			}))
			map.addOverlay(overlay)
			bindEvents.call(this, this.originInstance)
			editing && overlay.enableEditing()
		}
	}
}
</script>
