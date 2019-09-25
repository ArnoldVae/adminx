<script>
export default {
	name: 'bm-context-menu-item',
	render(h) {
		return h()
	},
	props: {
		text: {
			type: String
		},
		callback: {
			type: Function,
			default: function() {}
		},
		id: {
			type: String
		},
		iconUrl: {
			type: String
		},
		disabled: {
			type: Boolean
		},
		separator: {
			type: Boolean
		}
	},
	watch: {
		text() {
			this.reload()
		},
		callback() {
			this.reload()
		},
		id() {
			this.reload()
		},
		iconUrl() {
			this.reload()
		},
		disabled() {
			this.reload()
		},
		separator() {
			this.reload()
		}
	},
	methods: {
		reload() {
			this.$parent.map && this.$parent.load()
		}
	}
}
</script>
