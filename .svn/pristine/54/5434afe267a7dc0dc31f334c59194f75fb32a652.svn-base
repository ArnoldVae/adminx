<script>
import commonMixin from '../base/mixins/common.js'
import { DistanceTool } from './DistanceTool.js'
import { createIcon } from '../base/factory.js'

export default {
	name: 'bm-distance-tool',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		followText: {
			type: String,
			default: '单击确定地点，双击结束'
		},
		unit: {
			// metric|us
			type: String,
			default: 'metric'
		},
		lineColor: {
			type: String,
			default: '#ff6319'
		},
		lineStroke: {
			type: Number,
			default: 2
		},
		opacity: {
			type: Number,
			default: 0.8
		},
		lineStyle: {
			// solid|dashed
			type: String,
			default: 'solid'
		},
		secIcon: {
			type: Object
		},
		closeIcon: {
			type: Object
		},
		cursor: {
			type: String
		},
		open: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		followText(val, oldVal) {
			val !== oldVal && (this.originInstance._opts.followText = val)
		},
		unit(val, oldVal) {
			val !== oldVal && (this.originInstance._opts.unit = val)
		},
		lineColor(val, oldVal) {
			val !== oldVal && (this.originInstance._opts.lineColor = val)
		},
		lineStroke(val, oldVal) {
			val !== oldVal && (this.originInstance._opts.lineStroke = val)
		},
		opacity(val, oldVal) {
			val !== oldVal && (this.originInstance._opts.opacity = val)
		},
		lineStyle(val, oldVal) {
			val !== oldVal && (this.originInstance._opts.lineStyle = val)
		},
		secIcon: {
			deep: true,
			handler(val) {
				this.originInstance.setSecIcon(createIcon(this.BMap, val))
			}
		},
		closeIcon: {
			deep: true,
			handler(val) {
				this.originInstance._opts.closeIcon = createIcon(this.BMap, val)
			}
		},
		cursor(val, oldVal) {
			val !== oldVal && this.originInstance._setCursor(val)
		},
		open(val) {
			val ? this.distanceToolOpen() : this.distanceToolClose()
		}
	},
	methods: {
		distanceToolOpen() {
			this.$emit('open')
			this.originInstance.open()
		},
		distanceToolClose() {
			this.$emit('close')
			this.originInstance.close()
		},
		load() {
			const { BMap, map, followText, unit, lineColor, lineStroke, opacity, secIcon, closeIcon, cursor, open } = this
			this.originInstance = new DistanceTool(map, {
				followText,
				unit,
				lineColor,
				lineStroke,
				opacity,
				secIcon: secIcon && createIcon(BMap, secIcon),
				closeIcon: closeIcon && createIcon(BMap, closeIcon),
				cursor
			})
			open && this.distanceToolOpen()
		}
	}
}
</script>
