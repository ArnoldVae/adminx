<style scoped>
.expand-row {
	margin-bottom: 16px;
}
</style>
<template>
	<div>
		<Table :columns="childColumns" :data="childData"></Table>
	</div>
</template>
<script>
export default {
	props: {
		row: Object
	},
	data() {
		return {
			childColumns: [
				{
					title: '测点名称',
					key: 'name',
					align: 'center'
				},
				{
					title: '测点类型',
					key: 'age',
					align: 'center'
				},
				{
					title: '状态',
					key: 'address',
					align: 'center'
				}
				// {
				// 	title: '操作',
				// 	key: 'action',
				// 	align: 'center',
				// 	render: (h, params) => {
				// 		return h('div', [
				// 			h(
				// 				'Button',
				// 				{
				// 					props: {
				// 						type: 'error',
				// 						icon: 'md-trash'
				// 					},
				// 					on: {
				// 						click: () => {
				// 							this.delsubList(params)
				// 						}
				// 					}
				// 				},
				// 				'删除'
				// 			)
				// 		])
				// 	}
				// }
			],
			childData: [
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					date: '2016-10-03'
				},
				{
					name: 'Jim Green',
					age: 24,
					address: 'London No. 1 Lake Park',
					date: '2016-10-01'
				},
				{
					name: 'Joe Black',
					age: 30,
					address: 'Sydney No. 1 Lake Park',
					date: '2016-10-02'
				},
				{
					name: 'Jon Snow',
					age: 26,
					address: 'Ottawa No. 2 Lake Park',
					date: '2016-10-04'
				}
			]
		}
	},
	created() {},
	methods: {
		// 删除子表格数据
		delsubList(data) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除所选项?',
				onOk: () => {
					this.$Message.success('删除成功')
				},
				onCancel: () => {}
			})
		}
	}
}
</script>
