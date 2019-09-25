<template>
	<div class="is-enabler-select">
		<form-item title="状态" type="select" v-model="localValue" :options="options" v-on="$listeners" v-bind="$attrs"></form-item>
	</div>
</template>
<script>
export default {
	name: 'is-enabler-select',
	components: {},
	props: {
		value: {
			type: [String, Number],
			defaule: 'all'
		}
	},
	model: {
		prop: 'value',
		event: 'value-change'
	},
	data() {
		return {
			localValue: '',
			options: [{ value: 'all', label: '全部' }, { value: '1', label: '启用' }, { value: '0', label: '禁用' }]
		}
	},
	computed: {},
	filters: {},
	watch: {
		value: {
			handler(newVal) {
				this.localValue = newVal
			},
			immediate: true
		},
		localValue(newVal) {
			this.$emit('value-change', newVal)
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {},
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
<style lang="stylus" scoped></style>
<style lang="stylus"></style>
