<template>
	<div
		@click.native="$emit('click', $event)"
		@dblclick.native="$emit('dblclick', $event)"
		@rightclick.native="$emit('rightclick', $event)"
		@contextmenu.native="$emit('contextmenu', $event)"
		@dragend.native="$emit('dragend', $event)"
		@dragging.native="$emit('dragging', $event)"
		@dragstart.native="$emit('dragstart', $event)"
		@mousedown.native="$emit('mousedown', $event)"
		@mouseover.native="$emit('mouseover', $event)"
		@mouseup.native="$emit('mouseup', $event)"
	>
		<slot></slot>
	</div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'
import { OverlayFactory } from './Overlay.js'
import { createSize, createPoint } from '../base/factory.js'
import bindEvents from '../base/bindEvent.js'

export default {
	name: 'bm-overlay',
	mixins: [commonMixin('overlay')],
	props: {
		panel: {
			type: String,
			default: 'labelPane'
		},
		position: {
			type: Object
		},
		offset: {
			type: Object,
			default() {
				return { width: 0, height: 0 }
			}
		},
		dragging: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		panel() {
			this.reload()
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
		dragging(val) {
			val ? this.originInstance.enableDragging() : this.originInstance.disableDragging()
		}
	},
	methods: {
		load() {
			this.initOverlay()
		},
		init(Overlay) {
			const { BMap, map, $el, position, offset, dragging } = this
			const $content = $el
			if (position.lng && position.lat) {
				const overlay = (this.originInstance = new Overlay($content, createPoint(BMap, position), {
					offset: offset && createSize(BMap, { width: offset.width, height: offset.height }),
					enableDragging: dragging
				}))
				bindEvents.call(this, this.originInstance)
				map.addOverlay(overlay)
				this.$emit('load', { BMap, map, originInstance: this.originInstance })
				// bindObserver()
			}
		},
		initOverlay() {
			this.originInstance && this.map.removeOverlay(this.originInstance)
			const Overlay = OverlayFactory(this.BMap)
			this.init(Overlay)
		},
		bindObserver() {
			const MutationObserver = global.MutationObserver
			if (!MutationObserver) {
				return
			}
			const { originInstance, $el } = this
			this.observer = new MutationObserver(() => originInstance.redraw())
			this.observer.observe($el, {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			})
		}
	}
}
</script>
