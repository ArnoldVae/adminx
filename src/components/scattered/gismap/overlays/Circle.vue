<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint } from '../base/factory.js'

export default {
	name: 'bm-circle',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		center: {
			type: Object
		},
		radius: {
			type: Number
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
		'center.lng'(val, oldVal) {
			const { BMap, originInstance, isEditing, disableEditing, enableEditing, center, editing } = this
			if (!isEditing) {
				disableEditing()
				if (val !== oldVal && val >= -180 && val <= 180) {
					originInstance.setCenter(createPoint(BMap, { lng: val, lat: center.lng }))
				}
				editing && enableEditing()
			}
		},
		'center.lat'(val, oldVal) {
			const { BMap, originInstance, isEditing, disableEditing, enableEditing, center, editing } = this
			if (!isEditing) {
				disableEditing()
				if (val !== oldVal && val >= -74 && val <= 74) {
					originInstance.setCenter(createPoint(BMap, { lng: center.lng, lat: val }))
				}
				editing && enableEditing()
			}
		},
		radius(val) {
			const { originInstance, isEditing, disableEditing, enableEditing, editing } = this
			if (!isEditing) {
				disableEditing()
				originInstance.setRadius(val)
				editing && enableEditing()
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
		strokeStyle(val, oldVal) {
			val !== oldVal && this.originInstance.setStrokeStyle(val)
		},
		massClear(val) {
			val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear()
		},
		editing(val) {
			val ? this.enableEditing() : this.disableEditing()
		},
		clicking() {
			this.reload()
		}
	},
	methods: {
		dragStartHandler() {
			this.isEditing = true
		},
		dragEndHandler() {
			this.isEditing = false
			this.bindEditingNodeEvents()
		},
		bindEditingNodeEvents() {
			const { originInstance, editingKey, dragStartHandler, dragEndHandler } = this
			originInstance[editingKey].forEach($node => {
				$node.addEventListener('dragstart', dragStartHandler)
				$node.addEventListener('dragend', dragEndHandler)
			})
		},
		enableEditing() {
			const { originInstance, bindEditingNodeEvents } = this
			originInstance.enableEditing()
			bindEditingNodeEvents()
		},
		disableEditing() {
			this.originInstance.disableEditing()
		},
		getEditingKey(overlay) {
			const stack = []
			overlay.enableEditing()
			setTimeout(() => {
				for (const key in overlay) {
					if (overlay[key] && overlay[key].length == 2) {
						stack.push(key)
					}
				}
				overlay.disableEditing()
				for (const key in overlay) {
					if (overlay[key] && overlay[key].length == 0 && ~stack.indexOf(key)) {
						this.editingKey = key
					}
				}
			}, 0)
		},
		load() {
			const {
				BMap,
				map,
				center,
				radius,
				strokeColor,
				fillColor,
				strokeWeight,
				strokeOpacity,
				fillOpacity,
				strokeStyle,
				massClear,
				editing,
				clicking,
				getEditingKey,
				editingKey,
				enableEditing,
				disableEditing
			} = this
			this.originInstance && map.removeOverlay(this.originInstance)
			const overlay = (this.originInstance = new BMap.Circle(createPoint(BMap, { lng: center.lng, lat: center.lat }), radius, {
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
			// 解决Circle无法双向绑定的问题
			!editingKey && getEditingKey(overlay)
			setTimeout(() => {
				editing ? enableEditing() : disableEditing()
			}, 0)
		}
	}
}
</script>
