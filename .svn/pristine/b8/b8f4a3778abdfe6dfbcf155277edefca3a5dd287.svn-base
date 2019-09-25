<script>
import { createSize } from '../base/factory.js'
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'

export default {
	name: 'bm-overview-map',
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
		size: {
			type: Object
		},
		isOpen: {
			type: Boolean
		}
	},
	watch: {
		anchor() {
			this.reload()
		},
		offset() {
			this.reload()
		},
		size() {
			this.reload()
		},
		isOpen() {
			this.reload()
		}
	},
	methods: {
		load() {
			const { BMap, map, anchor, offset, size, isOpen } = this
			this.originInstance = new BMap.OverviewMapControl({
				anchor: global[anchor],
				offset: createSize(BMap, offset),
				size: createSize(BMap, size || { width: 300, height: 300 }),
				isOpen
			})
			bindEvents.call(this, this.originInstance)
			map.addControl(this.originInstance)
		}
	}
}
</script>
