<template>
	<div class="device-modeling">
		<device-modeling-content v-if="contentReady"> </device-modeling-content>
	</div>
</template>
<script>
import deviceModelingContent from './device-modeling-content'
export default {
	name: 'device-modeling',
	components: {
		deviceModelingContent
	},
	props: {},
	data() {
		return {
			// 手动清除缓存
			contentReady: true
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.contentReady = false
			vm.$nextTick(() => {
				vm.contentReady = true
			})
		})
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
.device-modeling {
	// width: 1856px;
	// position: relative;
}
</style>
<style lang="stylus">
.content-wrapper.ivu-layout-content {
	// overflow: hidden;
}
</style>
