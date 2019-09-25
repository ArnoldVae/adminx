<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'
import { createPoint, createSize, createIcon, createLabel } from '../base/factory.js'
import bindEvents from '../base/bindEvent.js'

export default {
	name: 'bm-marker',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		position: {
			type: Object
		},
		offset: {
			type: Object
		},
		icon: {
			type: Object
		},
		massClear: {
			type: Boolean,
			default: true
		},
		dragging: {
			type: Boolean,
			default: false
		},
		clicking: {
			type: Boolean,
			default: true
		},
		raiseOnDrag: {
			type: Boolean,
			default: false
		},
		draggingCursor: {
			type: String
		},
		rotation: {
			type: Number
		},
		shadow: {
			type: Object
		},
		title: {
			type: String
		},
		label: {
			type: String
		},
		top: {
			type: Boolean
		},
		animation: {
			type: [String, null],
			default: null
		},
		zIndex: {
			type: Number,
			default: 0
		}
	},
	watch: {
		'position.lng'(val, oldVal) {
			const { BMap, originInstance, position, renderByParent } = this
			if (val !== oldVal && val <= 180 && val >= -180) {
				originInstance && originInstance.setPosition(createPoint(BMap, { lng: val, lat: position.lat }))
			}
			renderByParent && parent.reload()
		},
		'position.lat'(val, oldVal) {
			const { BMap, originInstance, position, renderByParent, $parent } = this
			if (val !== oldVal && val >= -74 && val <= 74) {
				originInstance && originInstance.setPosition(createPoint(BMap, { lng: position.lng, lat: val }))
			}
			renderByParent && $parent.reload()
		},
		'offset.width'(val, oldVal) {
			const { BMap, originInstance, offset } = this
			if (val !== oldVal) {
				originInstance && originInstance.setOffset(createSize(BMap, { width: val, height: offset.height }))
			}
		},
		'offset.height'(val, oldVal) {
			const { BMap, originInstance, offset } = this
			if (val !== oldVal) {
				originInstance && originInstance.setOffset(createSize(BMap, { width: offset.width, height: val }))
			}
		},
		icon: {
			deep: true,
			handler(val, oldVal) {
				const { BMap, originInstance, rotation } = this
				if (val !== oldVal) {
					originInstance && originInstance.setIcon(createIcon(BMap, val))
					rotation && originInstance.setRotation(rotation)
				}
			}
		},
		massClear(val) {
			val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear()
		},
		dragging(val) {
			val ? this.originInstance.enableDragging() : this.originInstance.disableDragging()
		},
		clicking() {
			this.reload()
		},
		raiseOnDrag() {
			this.reload()
		},
		draggingCursor(val, oldVal) {
			val !== oldVal && this.originInstance.setDraggingCursor(val)
		},
		rotation(val, oldVal) {
			val !== oldVal && this.originInstance.setRotation(val)
		},
		shadow(val) {
			this.originInstance.setShadow(val)
		},
		title(val, oldVal) {
			val !== oldVal && this.originInstance.setTitle(val)
		},
		label() {
			this.reload()
		},
		top(val, oldVal) {
			val !== oldVal && this.originInstance.setTop(val)
		},
		animation(val, oldVal) {
			val !== oldVal && this.originInstance.setAnimation(val)
		},
		zIndex(val, oldVal) {
			val !== oldVal && this.originInstance.setZIndex(val)
		}
	},
	methods: {
		load() {
			const {
				BMap,
				map,
				renderByParent,
				$parent,
				position,
				offset,
				icon,
				massClear,
				dragging,
				clicking,
				raiseOnDrag,
				draggingCursor,
				rotation,
				shadow,
				title,
				label,
				top,
				animation,
				zIndex
			} = this
			const overlay = (this.originInstance = new BMap.Marker(createPoint(BMap, { lng: position.lng, lat: position.lat }), {
				offset: offset && createSize(BMap, offset),
				icon: icon && createIcon(BMap, icon),
				enableMassClear: massClear,
				enableDragging: dragging,
				enableClicking: clicking,
				raiseOnDrag,
				draggingCursor,
				rotation,
				shadow,
				title
			}))
			label && overlay && overlay.setLabel(BMap, createLabel(BMap, label))
			top && overlay && overlay.setTop(top)
			zIndex && overlay && overlay.setZIndex(zIndex)
			bindEvents.call(this, overlay)
			if (renderByParent) {
				$parent.reload()
			} else {
				map.addOverlay(overlay)
			}
			overlay.setAnimation(global[animation])
		}
	}
}
</script>
