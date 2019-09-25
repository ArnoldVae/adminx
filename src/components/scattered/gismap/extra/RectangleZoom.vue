<script>
import commonMixin from '../base/mixins/common.js'
import { RectangleZoom } from './RectangleZoom.js'

export default {
	name: 'bm-rectangle-zoom',
	render(h) {
		return h()
	},
	mixins: [commonMixin('overlay')],
	props: {
		isZoomIn: {
			type: Boolean,
			default: true
		},
		followText: {
			type: String,
			default: ''
		},
		strokeWeight: {
			type: Number,
			default: 2
		},
		strokeColor: {
			type: String,
			default: '#111'
		},
		maskStyle: {
			type: String,
			default: 'solid'
		},
		fillColor: {
			type: String,
			default: '#ccc'
		},
		opacity: {
			type: Number,
			default: 0.4
		},
		cursor: {
			type: String,
			default: 'crosshair'
		},
		open: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		isZoomIn(val) {
			this.setZoomType(val)
		},
		followText(val, oldVal) {
			val !== oldVal && this.originIntance && this.originIntance._followTitle && this.originIntance._followTitle.setContent(val)
		},
		strokeWeight(val, oldVal) {
			val !== oldVal && this.originIntance.setLineStroke(val)
		},
		strokeColor(val, oldVal) {
			val !== oldVal && this.originIntance.setStrokeColor(val)
		},
		maskStyle(val, oldVal) {
			val !== oldVal && this.originIntance.setLineStyle(val)
		},
		fillColor(val, oldVal) {
			val !== oldVal && this.originIntance.setFillColor(val)
		},
		opacity(val, oldVal) {
			val !== oldVal && this.originIntance.setOpacity(val)
		},
		cursor(val, oldVal) {
			val !== oldVal && this.originIntance.setCursor(val)
		},
		open(val) {
			val ? this.rectangleZoomOpen() : this.rectangleZoomClose()
		}
	},
	methods: {
		rectangleZoomOpen() {
			this.$emit('open')
			this.originIntance.open()
		},
		rectangleZoomClose() {
			this.$emit('close')
			this.originIntance.close()
		},
		setZoomType(isZoomIn) {
			this.originIntance && (this.originIntance._opts.zoomType = isZoomIn ? this.BMAP_ZOOM_IN : this.BMAP_ZOOM_OUT)
		},
		load() {
			this.BMAP_ZOOM_IN = 0
			this.BMAP_ZOOM_OUT = 1
			const { map, isZoomIn, followText, strokeWeight, strokeColor, maskStyle, fillColor, opacity, cursor, open } = this
			this.originIntance = new RectangleZoom(map, {
				zoomType: isZoomIn ? this.BMAP_ZOOM_IN : this.BMAP_ZOOM_OUT,
				followText,
				strokeWeight,
				strokeColor,
				style: maskStyle,
				fillColor,
				opacity,
				cursor,
				autoClose: false
			})
			open && this.rectangleZoomOpen()
		}
	}
}
</script>
