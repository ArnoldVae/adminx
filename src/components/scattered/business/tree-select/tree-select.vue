<template>
	<div class="tree-select">
		<Select v-model="localValue" :label="selectLabel" v-if="createSelect" v-bind="$attrs">
			<Tree v-bind="$attrs" v-on="$listeners" :data="options" @on-select-change="treeSelectHandler" v-if="createSelect"></Tree>
		</Select>
	</div>
</template>
<script>
export default {
	name: 'tree-select',
	components: {},
	props: {
		value: [String, Array],
		options: {
			type: [Array, Object],
			default() {
				return []
			}
		}
	},
	model: {
		prop: 'value',
		event: 'value-change'
	},
	data() {
		return {
			localValue: '',
			selectLabel: '',
			createSelect: true
		}
	},
	computed: {},
	filters: {},
	watch: {
		localValue(newVal) {
			this.$emit('value-change', newVal)
		},
		value: {
			handler(newVal) {
				this.localValue = newVal

				if (!newVal) {
					this.selectLabel = ''
					this.createSelect = false
					this.$nextTick(() => {
						this.createSelect = true
					})
				}

				if (newVal && this.options.length) {
					let result = this.getNodeById(this.localValue, this.options)
					if (result) this.setSelectData(result.id, result.title)
				}
			},
			immediate: true
		},
		options(val) {
			if (this.localValue) {
				let result = this.getNodeById(this.localValue, val)
				if (result) this.setSelectData(result.id, result.title)
			}
			// console.log('----- id:', result.id, 'title: ---', result.title, '父组件传递的 value：', this.value)
		}
	},
	created() {
		// console.log("tress-select", this.$attrs);
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		treeSelectHandler(data) {
			if (!data.length > 0) return
			this.setSelectData(data[0].id, data[0].title)
			// this.$emit('on-select-change', data)
		},
		setSelectData(id, title) {
			this.localValue = id
			this.selectLabel = title

			this.createSelect = false
			this.$nextTick(() => {
				this.createSelect = true
			})
		},
		// 根据传入的 id 获取 指定的 树节点
		getNodeById(id, data) {
			let result = null
			let recursion = (id, data) => {
				for (let i = 0; i < data.length; i++) {
					let item = data[i]
					if (item.id == id) {
						result = item
						break
					} else if (item.children && item.children.length) {
						recursion(id, item.children)
					}
				}
			}
			recursion(id, data)
			return result
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
.tree-select {
  /deep/.ivu-select-dropdown {
    padding-left: 10px;
	max-height: 500px;
  }
}
</style>
<style lang="stylus"></style>
