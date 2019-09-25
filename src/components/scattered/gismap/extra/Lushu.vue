<script>
import commonMixin from '../base/mixins/common.js'
import { createIcon } from '../base/factory.js'
import { LuShu } from './Lushu.js'

export default {
	name: 'bm-lushu',
	render(h) {
		return h()
	},
	mixins: [commonMixin('lushu')],
	props: {
		path: {
			type: Array,
			default() {
				return []
			}
		},
		landmarkPois: {
			type: Array,
			default() {
				return []
			}
		},
		icon: {
			type: Object
		},
		speed: {
			type: Number,
			default: 4000
		},
		content: {
			type: String,
			default: ''
		},
		autoView: {
			type: Boolean,
			default: false
		},
		rotation: {
			type: Boolean,
			default: false
		},
		infoWindow: {
			type: Boolean,
			default: true
		},
		play: {
			type: Boolean,
			default: true
		},
		dispose: {
			type: Boolean
		}
	},
	watch: {
		path: {
			handler() {
				this.reload()
			},
			deep: true
		},
		landmarkPois: {
			handler() {
				this.reload()
			},
			deep: true
		},
		icon: {
			handler(val) {
				const { BMap, originInstance } = this
				const newMarker = createIcon(BMap, val)
				originInstance._opts.icon = newMarker
				originInstance._marker = newMarker
			},
			deep: true
		},
		speed(val) {
			const { originInstance } = this
			originInstance._opts.speed = val
		},
		content(val) {
			const { originInstance, infoWindow } = this
			val && infoWindow ? originInstance.showInfoWindow() : originInstance.hideInfoWindow()
			originInstance._opts.defaultContent = val
			originInstance._overlay && originInstance._overlay.setHtml(val)
		},
		autoView(val) {
			const { originInstance } = this
			originInstance._opts.autoView = val
		},
		rotation(val) {
			const { originInstance } = this
			originInstance._opts.enableRotation = val
		},
		infoWindow(val) {
			const { originInstance } = this
			originInstance && val ? originInstance.showInfoWindow() : originInstance.hideInfoWindow()
		},
		play(val) {
			const { originInstance } = this
			val && originInstance ? (this._isDisposed ? this.reload() : originInstance.start()) : !this._isEnd && originInstance.pause()
		},
		dispose(val) {
			val && this.lushuDispose()
		}
	},
	methods: {
		lushuDispose() {
			this._isDisposed = true
			this.originInstance.dispose()
		},
		load() {
			const { BMap, map, path, landmarkPois, icon, speed, content, autoView, rotation, infoWindow, play } = this
			const lushu = (this.originInstance = new LuShu(map, path, {
				enableRotation: rotation,
				landmarkPois,
				showInfoWindow: infoWindow,
				defaultContent: content,
				icon: icon && createIcon(BMap, icon),
				speed,
				autoView,
				onstart: e => {
					this._isDisposed = false
					this._isEnd = false
					this.$emit('start', e)
				},
				onstop: e => {
					this._isEnd = true
					this.$emit('stop', e)
				},
				onpause: e => this.$emit('pause', e)
			}))
			play && path.length && lushu.start(this)
			path.length && (infoWindow ? lushu.showInfoWindow() : lushu.hideInfoWindow())
		}
	}
}
</script>
