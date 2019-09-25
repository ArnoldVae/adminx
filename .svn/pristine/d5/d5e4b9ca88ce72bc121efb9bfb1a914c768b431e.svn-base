<style scoped>
.expand-row {
	margin-bottom: 16px;
}
</style>
<template>
	<div>
		<Table :columns="childColumns" :data="data1"></Table>
	</div>
</template>
<script>
export default {
	props: {
		row: Object
	},
	data() {
		return {
			axios: this.$api.linkageConfig,
			searchType: 0, // 0客户端，1场景 2电视墙    默认0
			childColumns: [
				{
					title: '站端',
					key: 'stationName',
					align: 'center'
				},
				{
					title: '设备',
					key: 'devName',
					align: 'center'
				},
				{
					title: '节点',
					key: 'nodeName',
					align: 'center'
				},
				{
					title: '参数',
					key: 'fParam11',
					align: 'center'
				},
				{
					title: '客户端屏幕',
					key: 'clientScreenId',
					align: 'center'
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'error',
										icon: 'md-trash'
									},
									on: {
										click: () => {
											this.delsubList(params)
										}
									}
								},
								'删除'
							)
						])
					}
				}
			],
			data1: []
		}
	},
	created() {
		this.handleData()
	},
	methods: {
		handleData() {
			// 判断是客户端还是电视墙
			if (this.row.linkNode.length > 0 && this.row.linkNode[0].linkClientId) {
				this.data1 = this.row.linkNode
				this.data1.forEach(item => {
					// 子表如果不是视频 就将客户端屏幕处理为 -
					item.clientScreenId = item.clientScreenId ? item.clientScreenId : '-'
					if (item.iType == 0) {
						// 如果是告知
						if (item.vcValueDesc) {
							// 设置表格联动值
							let index = item.fParam1
							index == 65535 || !index ? (index = 0) : (index = item.fParam1)
							let swArr = item.vcValueDesc.split('|')
							if (swArr.length == 1) {
								item.fParam11 = item.vcValueDesc.split('|')[0].split(' ')[1]
							} else {
								item.fParam11 = item.vcValueDesc.split('|')[index].split(' ')[1]
							}
						}
					} else if (item.iType == 1) {
						// 如果是报警联动
						if (item.fParam1 == 0) {
							item.fParam11 = '正常'
						} else if (item.fParam1 == 1) {
							item.fParam11 = '危机报警'
						} else if (item.fParam1 == 2) {
							item.fParam11 = '严重报警'
						} else if (item.fParam1 == 3) {
							item.fParam11 = '一般报警'
						} else {
							item.fParam11 = item.iAlarmLevel
						}
					} else if (item.iType == 2) {
						item.fParam11 = '-'
					}
					if (item.clientScreenId != '-') {
						item.fParam11 = '-'
					}
				})

				this.searchType = 0
			} else if (this.row.linkNode.length > 0 && this.row.linkNode[0].linkTvId) {
				this.childColumns[3].title = '预置位'
				this.childColumns[4].title = '解码输出'
				this.data1 = this.row.linkNode
				this.data1.forEach(item => {
					item.clientScreenId = item.decSubScreenId ? item.decScreenId + '-' + item.decSubScreenId : item.decScreenId
					item.fParam11 = item.presetName
				})
				this.searchType = 2
			} else if (this.row.linkNode.length > 0 && this.row.linkNode[0].linkSceneId) {
				this.childColumns[3].title = '场景'
				this.row.linkNode.forEach(item => {
					item.fParam11 = item.sceneName
					item.clientScreenId = '-'
					item.devName = '-'
					item.nodeName = '-'
				})
				this.data1 = this.row.linkNode
				this.searchType = 1
			}
		},
		// 删除子表格数据
		delsubList(data) {
			this.$Modal.confirm({
				title: '提示',
				content: '确定要删除联动节点以及被联动节点吗?',
				onOk: () => {
					let params = {}
					if (data.row.linkClientId) {
						params.linkClientId = data.row.linkClientId
					} else if (data.row.linkSceneId) {
						params.linkSceneId = data.row.linkSceneId
					} else if (data.row.linkTvId) {
						params.linkTvId = data.row.linkTvId
					}
					this.axios.delSubLink(params).then(res => {
						if (res.code == 200) {
							this.$parent.$parent.$parent.getLintTable() // 父链
							this.$Message.success('删除成功')
						} else {
							this.$Message.error(res.msg)
						}
					})
				}
			})
		}
	}
}
</script>
