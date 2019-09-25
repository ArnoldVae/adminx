<template>
	<bm-overlay
		class="rich-container"
		v-show="show"
		:position="position"
		:offset="offset"
		:dragging="dragging"
		@load="load"
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
		<slot name="rich">
			<div class="rich">
				<slot name="richIcon">
					<div class="rich-icon" :style="iconStyle"></div>
				</slot>
				<slot name="richLabel" v-if="label !== ''">
					<div class="rich-label" :style="labelStyles">
						<div v-center v-text="label"></div>
					</div>
				</slot>
				<slot name="richBadge" v-if="badge !== 0">
					<div class="rich-badge" :style="badgeStyles">
						<p v-text="badge"></p>
					</div>
				</slot>
			</div>
		</slot>
		<slot></slot>
	</bm-overlay>
</template>

<style>
.rich-container {
	position: absolute;
	cursor: pointer;
	user-select: none;
}
.rich {
	position: relative;
	font-size: 12px;
}
.rich .rich-icon {
	background-repeat: no-repeat;
	background-size: cover;
	display: block;
	margin: 0 auto;
}
.rich .rich-label {
	position: relative;
	box-sizing: border-box;
	text-align: center;
	min-width: 100%;
	margin-left: 50%;
}
.rich .rich-label div {
	position: absolute;
	white-space: nowrap;
	padding: 2px 6px;
	margin-top: 5px;
	border-radius: 50px;
	background: rgba(41, 41, 41, 0.65);
	color: #fff;
}
.rich .rich-badge {
	position: absolute;
	top: -15px;
	left: 50%;
	box-sizing: border-box;
	margin-left: 10px;
	height: 20px;
	line-height: 20px;
	min-width: 20px;
	text-align: center;
	z-index: 100;
	border-radius: 50px;
	background: rgba(41, 41, 41, 0.65);
	color: #fff;
}
.rich .rich-badge p {
	float: left;
	width: 100%;
}
</style>

<script>
import Overlay from '../overlays/Overlay.vue'
export default {
	name: 'bm-rich-marker',
	components: { 'bm-overlay': Overlay },
	data() {
		return {
			iconStyle: {
				type: String,
				default: ''
			}
		}
	},
	props: {
		show: {
			type: Boolean,
			default: true
		},
		position: {
			type: Object
		},
		offset: {
			type: Object
		},
		icon: {
			type: Object
		},
		label: {
			type: String,
			default: ''
		},
		labelStyles: {
			type: String,
			default: ''
		},
		badge: {
			type: Number,
			default: 0
		},
		badgeStyles: {
			type: String,
			default: ''
		},
		dragging: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		'icon.url'(val, oldVal) {
			let height = 0
			let width = 0
			if (val !== oldVal) {
				if (this.icon && this.icon.size) {
					height = this.icon.size.height || height
					width = this.icon.size.width || width
				}
				this.iconStyle = `background-image: url(${val}); height: ${height}px; width: ${width}px;`
			}
		},
		'icon.size'(val, oldVal) {
			if (val !== oldVal) {
				let height = val.height || 0
				let width = val.width || 0
				this.iconStyle = `background-image: url(${this.icon.url || ''}); height: ${height}px; width: ${width}px;`
			}
		},
		'icon.size.width'(val, oldVal) {
			if (val !== oldVal) {
				let height = 0
				let width = val || 0
				if (this.icon && this.icon.size) {
					height = this.icon.size.height || height
				}
				this.iconStyle = `background-image: url(${this.icon.url || ''}); height: ${height}px; width: ${width}px;`
			}
		},
		'icon.size.height'(val, oldVal) {
			if (val !== oldVal) {
				let height = val || 0
				let width = 0
				if (this.icon && this.icon.size) {
					width = this.icon.size.width || width
				}
				this.iconStyle = `background-image: url(${this.icon.url || ''}); height: ${height}px; width: ${width}px;`
			}
		}
	},
	directives: {
		center: {
			bind(el) {
				el.style.marginLeft = `${-el.offsetWidth / 2}px`
			},
			inserted(el) {
				el.style.marginLeft = `${-el.offsetWidth / 2}px`
			},
			update(el) {
				el.style.marginLeft = `${-el.offsetWidth / 2}px`
			}
		}
	},
	methods: {
		load({ originInstance }) {
			this.originInstance = originInstance
			if (this.icon) {
				let height = 0
				let width = 0
				if (this.icon && this.icon.size) {
					height = this.icon.size.height || height
					width = this.icon.size.width || width
				}
				this.iconStyle = `background-image: url(${this.icon.url || ''}); height: ${height}px; width: ${width}px;`
			}
		}
	}
}
</script>
