<template>
	<div class="search-header-wrapper">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: 'search-header-wrapper',
	components: {},
	props: {},
	data() {
		return {}
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
.search-header-wrapper {
  width: 100%;
  padding: 15px 20px 15px 20px;
  margin-bottom: 10px;
  // border-bottom: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
}
</style>
<style lang="stylus"></style>
