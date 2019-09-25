export default {
	data() {
		return {}
	},
	methods: {
		// 过滤 element-tree 放法
		filterNode(value, data) {
			if (!value) return true
			return data.vcName.indexOf(value) !== -1
		},
		// 设置选中的节点
		handleSetCheckedKeys(name, arr) {
			if (!name || !this.$refs[name]) return
			this.$refs[name].setCheckedKeys(arr)
		}
	}
}
