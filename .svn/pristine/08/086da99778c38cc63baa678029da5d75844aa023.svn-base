<template>
	<div class="com-button">
		<Button :icon="icon ? icon : localIcon" :type="localType" v-bind="$attrs" v-on="$listeners">
			<span v-if="!isSlot">{{ localText }}</span>
			<slot v-else></slot>
		</Button>
	</div>
</template>
<script>
export default {
	name: 'com-button',
	components: {},
	props: {
		type: {
			type: String,
			default: 'default'
		},
		text: String,
		icon: String
	},
	data() {
		return {
			localIcon: '',
			localType: '',
			localText: '',
			isSlot: false
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		/**
		 * default 默认
		 * add 增加
		 * delete 删除
		 * edit 修改
		 * search 搜索
		 * reset 重置
		 * cancel 取消
		 * confirm 确认
		 */
		switch (this.type) {
			case 'default':
				this.setItem('', 'default', '默认')
				break
			case 'add':
				this.setItem('md-add', 'success', '新增')
				break
			case 'delete':
				this.setItem('md-trash', 'error', '删除')
				break
			case 'edit':
				this.setItem('ios-create-outline', 'warning', '编辑')
				break
			case 'search':
				this.setItem('md-search', 'info', '查询')
				break
			case 'reset':
				this.setItem('md-refresh', 'primary', '重置')
				break
			case 'cancel':
				this.setItem('', 'text', '取消')
				break
			case 'confirm':
				this.setItem('', 'primary', '确认')
				break
		}
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		setItem(icon, type, text) {
			this.localIcon = icon
			this.localType = type
			this.localText = text
			if (Object.keys(this.$slots).length > 0) this.isSlot = true
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
.com-button {
  display: inline-block;
  margin-right: 10px;
}
</style>
<style lang="stylus"></style>
