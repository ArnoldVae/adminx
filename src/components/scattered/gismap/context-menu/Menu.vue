<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'

export default {
	name: 'bm-context-menu',
	mixins: [commonMixin('contextMenu')],
	props: {
		width: {
			type: Number
		}
	},
	methods: {
		load() {
			const { BMap, map, $parent, width } = this
			const parent = (this.parent = $parent.originInstance || map)
			this.originInstance && parent.removeContextMenu(this.originInstance)
			const menu = (this.originInstance = new BMap.ContextMenu())
			for (const item of this.$children) {
				if (item.separator) {
					menu.addSeparator()
					continue
				}
				const menuItem = new BMap.MenuItem(
					item.text,
					function(point, pixel) {
						item.callback({ point, pixel, BMap, map, target: parent })
					},
					{
						width,
						id: item.id,
						iconUrl: item.iconUrl
					}
				)
				menu.addItem(menuItem)
				item.disabled ? menuItem.disable() : menuItem.enable()
				item.originInstance = menuItem
			}
			bindEvents.call(this, this.originInstance)
			parent.addContextMenu(menu)
		}
	}
}
</script>
