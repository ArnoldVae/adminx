<script>
import commonMixin from '../base/mixins/common.js'
import { createSize, createBounds } from '../base/factory.js'

export default {
	name: 'bm-copyright',
	render(h) {
		return h()
	},
	mixins: [commonMixin('control')],
	props: {
		anchor: {
			type: String
		},
		offset: {
			type: Object
		},
		copyright: {
			type: Array
		}
	},
	watch: {
		anchor() {
			this.reload()
		},
		offset() {
			this.reload()
		},
		copyright() {
			this.reload()
		}
	},
	methods: {
		load() {
			const { BMap, map, anchor, offset, updateCopyrightList } = this
			this.originInstance = new BMap.CopyrightControl({
				anchor: global[anchor],
				offset: offset && createSize(BMap, offset)
			})
			updateCopyrightList()
			map.addControl(this.originInstance)
		},
		updateCopyrightList() {
			const { BMap, map } = this
			const { removeCopyright, getCopyrightCollection } = this.originInstance
			const copyrightList = getCopyrightCollection()
			copyrightList &&
				copyrightList.forEach(item => {
					removeCopyright(item.id)
				})
			this.copyright &&
				this.copyright.forEach(item => {
					this.originInstance.addCopyright({
						id: item.id,
						content: item.content,
						bounds: item.bounds ? createBounds(BMap, item.bounds) : map.getBounds()
					})
					this.originInstance.getCopyrightCollection()
				})
		}
	}
}
</script>
