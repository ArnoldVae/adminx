<template>
	<div v-show="show">
		<slot></slot>
	</div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createSize, createPoint } from '../base/factory.js'

export default {
	name: 'bm-info-window',
	mixins: [commonMixin('overlay')],
	props: {
		show: {
			type: Boolean
		},
		width: {
			type: Number
		},
		height: {
			type: Number
		},
		maxWidth: {
			type: Number
		},
		offset: {
			type: Object
		},
		position: {
			type: Object
		},
		title: {
			type: String
		},
		maximize: {
			type: Boolean
		},
		autoPan: {
			type: Boolean,
			default: true
		},
		closeOnClick: {
			type: Boolean,
			default: true
		},
		message: {
			type: String
		}
	},
	watch: {
		show(val) {
			val ? this.openInfoWindow() : this.closeInfoWindow()
		},
		width(val, oldVal) {
			val !== oldVal && this.originInstance.setWidth(val)
		},
		height(val, oldVal) {
			val !== oldVal && this.originInstance.setHeight(val)
		},
		maxWidth() {
			this.reload()
		},
		'offset.width'() {
			this.reload()
		},
		'offset.height'() {
			this.reload()
		},
		'position.lng'() {
			this.reload()
		},
		'position.lat'() {
			this.reload()
		},
		title(val, oldVal) {
			val !== oldVal && this.originInstance.setTitle(val)
		},
		maximize(val) {
			val ? this.originInstance.enableMaximize() : this.originInstance.disableMaximize()
		},
		autoPan(val) {
			val ? this.originInstance.enableAutoPan() : this.originInstance.disableAutoPan()
		},
		closeOnClick(val) {
			val ? this.originInstance.enableCloseOnClick() : this.originInstance.disableCloseOnClick()
		}
	},
	methods: {
		redraw() {
			this.originInstance && this.originInstance.redraw()
		},
		load() {
			const _this = this
			const { BMap, map, $parent, bindObserver, show, width, height, maxWidth, offset, title, maximize, autoPan, closeOnClick, message } = this
			const $content = this.$el
			const overlay = (this.originInstance = new BMap.InfoWindow($content, {
				width,
				height,
				maxWidth,
				title,
				offset: offset && createSize(BMap, offset),
				enableAutoPan: autoPan,
				enableCloseOnClick: closeOnClick,
				enableMessage: typeof message !== 'undefined',
				message
			}))
			maximize ? overlay.enableMaximize() : overlay.disableMaximize()
			bindEvents.call(this, this.originInstance)

			overlay.redraw()
			;[].forEach.call($content.querySelectorAll('img'), $img => {
				$img.onload = () => _this.observer.redraw()
			}) // use IIFE BMap.InfoWindow.redraw 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏

			bindObserver()
			this.$container = $parent.originInstance && $parent.originInstance.openInfoWindow ? $parent.originInstance : map
			show && this.openInfoWindow()
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
		},
		openInfoWindow() {
			const { BMap, originInstance, $container, position } = this
			$container.openInfoWindow(originInstance, createPoint(BMap, position))
		},
		closeInfoWindow() {
			this.$container.closeInfoWindow(this.originInstance)
		}
	}
}
</script>
