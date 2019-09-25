<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint } from '../base/factory.js'

export default {
	name: 'bm-point-collection',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		points: {
			type: Array
		},
		shape: {
			type: String,
			default: 'BMAP_POINT_SHAPE_CIRCLE'
		},
		color: {
			type: String
		},
		size: {
			type: String,
			default: 'BMAP_POINT_SIZE_NORMAL'
		}
	},
	watch: {
		points: {
			deep: true,
			handler(val) {
				if (this.originInstance) {
					this.originInstance.clear()
					this.originInstance.setPoints(val)
				}
			}
		},
		shape(val, oldVal) {
			const { originInstance, size, color } = this
			val !== oldVal &&
				originInstance.setStyles({
					shape: global[val],
					color,
					size: global[size]
				})
		},
		color(val, oldVal) {
			const { originInstance, shape, size } = this
			val !== oldVal &&
				originInstance.setStyles({
					shape: global[shape],
					color: val,
					size: global[size]
				})
		},
		size(val, oldVal) {
			const { originInstance, shape, color } = this
			val !== oldVal &&
				originInstance.setStyles({
					shape: global[shape],
					color,
					size: global[val]
				})
		}
	},
	methods: {
		load() {
			const { BMap, map, points, shape, color, size } = this
			this.originInstance = new BMap.PointCollection(points.map(item => createPoint(BMap, { lng: item.lng, lat: item.lat })), {
				shape: global[shape],
				color,
				size: global[size]
			})
			map.addOverlay(this.originInstance)
			bindEvents.call(this, this.originInstance)
		}
	}
}
</script>
