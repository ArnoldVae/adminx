<template>
	<div class="node-association-modal">
		<Modal class="addNodeModalAss" title="关联节点" :value="value" fullscreen v-bind="$attrs" v-on="$listeners">
			<div slot="header" :style="{ overflow: 'hidden', lineHeight: `${20 / 22.5}rem` }">
				<h2 :style="{ width: 'initial', float: 'left' }">关联已配置节点</h2>
			</div>
			<Form :model="searchInfo" inline :label-width="10">
				<FormItem label="节点名称">
					<Input v-model="searchInfo.name" placeholder="输入节点名称搜索" clearable> </Input>
				</FormItem>
				<FormItem>
					<Button type="info" icon="md-search" class="search" @click="getNotConfiguredNode">查询</Button>
				</FormItem>
			</Form>
			<div class="content">
				<div class="left">
					<Tabs :value="activePane" @on-click="handleClickTabs">
						<TabPane label="子系统模型">
							<SearchTree
								:style="{ width: `${220 / 22.5}rem`, overflowY: 'auto' }"
								@on-select-change="handleSelectTypeNodes"
								ref="typeTree"
								clearable
								:data="treeData"
								placeholder="请输入关键词搜索..."
							>
								<Icon type="ios-search" slot="suffix" />
							</SearchTree>
						</TabPane>
						<Spin size="large" fix v-if="treeLoading"></Spin>
						<!-- <TabPane label="SMType类型" :disabled="true">
							<SearchTree
								:style="{ width: `${220 / 22.5}rem`, overflowY: 'auto' }"
								@on-select-change="handleSelectSmNodes"
								clearable
								:data="smData"
								placeholder="请输入关键词搜索..."
							>
								<Icon type="ios-search" slot="suffix" />
							</SearchTree>
						</TabPane> -->
					</Tabs>
				</div>
				<div class="right">
					<Table
						ref="addTable"
						:loading="addLoading"
						@on-selection-change="handleSelectChange"
						border
						height="550"
						highlight-row
						:columns="columns"
						:data="tableData"
					>
						<template slot-scope="{ row }" slot="sourceName">
							<template>
								<span>{{ getSourceTypeLabel(row.devNodesExtDtoList) }} </span>
							</template>
						</template>

						<template slot-scope="{ row, index }" slot="valueUnit">
							<span>{{ `${row.fvalue} / ${row.vcUnit}` }}</span>
						</template>

						<template slot-scope="{ row }" slot="assNodesOverview">
							<template v-for="item in row.devNodesExtDtoList">
								<div :key="item.nodeGUID">
									<!-- {{ `${item.vcName}(${item.fconfigValue},${item.iisTransValue},${item.vcTransDesc},${item.vcDesc})` }}<br/> -->
									<span v-if="item.smName">{{ item.smName }}</span
									>&nbsp;&nbsp;<span v-if="item.vcName">{{ item.vcName }}</span>
									<span style="float: right">
										[
										<span v-if="item.mathType != null">{{ item.mathType | getMathTypeLabel }}</span
										><span v-if="item.fmathParam != null">{{ `${item.fmathParam}` }}, </span>
										<span v-if="item.fconfigValue">{{ row.vcValueDesc | getLabel(item.fconfigValue) }}, </span>
										<span v-if="item.iisTransValue == '1'">"{{ item.vcTransDesc == null ? '' : item.vcTransDesc }}"</span>
										]
									</span>
									<br />
								</div>
							</template>
						</template>

						
					</Table>
					<Page
						@on-change="handleChangeModalPage"
						@on-page-size-change="handleChangeModalSize"
						:total="total"
						:current="page"
						:page-size="pageSize"
						show-sizer
						show-elevator
						show-total
					/>
				</div>
			</div>

			<div slot="footer">
				<Button type="text" size="large" @click="addNodeModalCancel">取消</Button>
				<Button type="primary" size="large" @click="addNodeModalOk">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
export default {
	name: 'node-association-modal',
	components: {},
	directives: {},
	filters: {
		// 获取配置值 label
		getLabel: function(descInfo, id) {
			let fValueList = []
			if (descInfo) {
				let arr = descInfo.split('|') || []
				for (var i = 0; i < arr.length; i++) {
					let key = arr[i].split(' ')[0]
					let label = arr[i].split(' ')[1]
					fValueList.push({
						id: key,
						label: label
					})
				}
			}
			let label = ''
			fValueList.forEach(item => {
				if (item.id == id) {
					label = item.label
				}
			})
			return label
		},
		getMathTypeLabel: function(value) {
			let label = ''
			let transValue = value + ''
			switch (transValue) {
				case '1':
					label = '+'
					break
				case '2':
					label = '-'
					break
				case '3':
					label = '*'
					break
				case '4':
					label = '/'
					break
			}
			return label
		}
	},
	mixins: {},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		unitId: {
			type: String,
			default: ''
		},
		success: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			fetch: this.$api.deviceModeling,
			// 添加节点相关
			addLoading: false,
			treeLoading: false,
			selectionAddRow: [],
			currentOperation: '',
			searchInfo: {
				name: ''
			},
			activePane: 0,
			treeData: [],
			smData: [],
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center',
					fixed: 'left'
				},
				{
					title: '数据来源',
					slot: 'sourceName',
					align: 'center',
					width: 150,
					
				},
				{
					title: '节点名称',
					key: 'vcName',
					align: 'center',
					width: 300,
					// fixed: 'left'
				},
				{
					title: '功能',
					key: 'functionName',
					align: 'center',
					width: 150
				},
				{
					title: '节点类型',
					key: 'iNodeTypeName',
					align: 'center',
					width: 100
				},
				/*{
					title: '来源',
					key: 'source',
					align: 'center',
					width: 100
				},*/
				{
					title: '值描述',
					key: 'vcValueDesc',
					align: 'center',
					width: 150
				},
				{
					title: '值/单位',
					slot: 'valueUnit',
					align: 'center',
					width: 100
				},
				{
					title: '识别类型',
					key: 'irecogtypeName',
					align: 'center',
					width: 150
				},
				{
					title: '表计类型',
					key: 'imetertypeName',
					align: 'center',
					width: 150
				},
				{
					title: '发热类型',
					key: 'ifevertypeName',
					align: 'center',
					width: 150
				},
				{
					title: '外观识别类型',
					key: 'isurfacetypeName',
					align: 'center',
					width: 150
				},
				{
					title: '状态识别类型',
					key: 'istatustypeName',
					align: 'center',
					width: 150
				},
				{
					title: '相位类型',
					key: 'iphasetypeName',
					align: 'center',
					width: 150
				},
				{
					title: '关联测点信息',
					slot: 'assNodesOverview',
					width: 450,
					align: 'left'
				}
			],
			tableData: [],
			page: 1,
			total: 0,
			pageSize: 20,
			nodeTypeList: [],
			sourceTypeList: [],
			FunctionIdList: [],
			identifyList: [],
			imetertypeList: [],
			ifevertypeList: [],
			isurfacetypeList: [],
			istatustypeList: [],
			iphasetypeList: []
		}
	},
	computed: {},
	watch: {
		value: {
			handler(val) {
				if (val) {
					this.$nextTick(() => {
						this.init()
					})
				}
			},
			immediate: true
		},
		success: {
			handler(val) {
				// console.log(val)
				if (val) {
					this.$nextTick(() => {
						this.addNodeResult()
					})
				}
			},
			immediate: true
		}
	},
	created() {},
	mounted() {},
	activited() {},
	beforeUpdate() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 初始化
		async init() {
			await this.getDeviceTypeTreeInfo()
			await this.dictListInit()
			await this.getNotConfiguredNode()
			
		},
		// 获取设备类型树信息
		async getDeviceTypeTreeInfo() {
			this.treeLoading = true
			this.addLoading = true
			this.treeData = []
			let result = await this.fetch.getDeviceTypeTreeInfo({
				treeType: 2,
				subSystemId: 0,
				type: 0
			})
			if (result.success) {
				let wrapData = {
					title: '全部子系统',
					flag: -1,
					id: '',
					expand: true,
					children: []
				}

				result.data.map(item => {
					wrapData.children.push(item)
				})

				this.treeData.push(wrapData)

				// 处理默认参数
				if (this.treeData[0].children[0]) {
					// 默认选中第一个父节点
					this.treeData[0]['selected'] = true
					// 默认展开第一层子系统前三个节点数据
					this.treeData[0].children.forEach((item, index) => {
						if (index < 1) item.expand = true
					})
					// 默认的请求参数 nodeType 0:子系统 1:设备类型
					this.nodeType = this.treeData[0]['flag']
					// 更新 当前节点id
					this.activeNodeId = this.treeData[0]['id']
					// 默认的请求参数 子系统id
					this.activeSubsystemId = this.treeData[0]['id']
				} else {
					this.nodeType = null
					this.activeSubsystemId = ''
				}
				this.treeLoading = false
			} else {
				this.treeLoading = false
			}
		},
		
		// 查询未配置智辅节点列表
		async getNotConfiguredNode() {

			this.tableData = []

			let scopeParams = {}

			if (this.activePane == 0) {
				// 判断当前选中的是子系统还是设备类型
				if (this.nodeType == 0) {
					scopeParams.subSystemId = this.activeSubsystemId
				} else {
					scopeParams.devTypeId = this.activeDeviceTypeId
				}
			}

			let result = await this.fetch.getNotConfiguredNode({
				unitId: this.unitId,
				currentPage: this.page,
				pageSize: this.pageSize,
				vcName: this.searchInfo.name,
				...scopeParams
			})
			if (result.success) {
				// console.log('查询未配置智辅节点列表', result)
				this.tableData = result.data.lists
				// 处理节点类型描述
				this.tableData.forEach(item => {
					this.nodeTypeList.map(sub => {
						item.nodeType == sub.id && (item.iNodeTypeName = sub.value)
						item.nodeType = item.nodeType + ''
					})
				})

				// 处理节点功能描述
				/*this.tableData.forEach(item => {
					this.FunctionIdList.map(sub => {
						item.functionId == sub.functionId && (item.functionName = sub.vcName)
					})
				})*/

				// 处理识别类型描述
				this.tableData.forEach(item => {
					this.identifyList.map(sub => {
						item.irecogtype == sub.dictID && (item.irecogtypeName = sub.vcName)
					})
				})

				// 处理表计类型描述
				this.tableData.forEach(item => {
					this.imetertypeList.map(sub => {
						item.imetertype == sub.dictID && (item.imetertypeName = sub.vcName)
					})
				})

				// 处理发热类型描述
				this.tableData.forEach(item => {
					this.ifevertypeList.map(sub => {
						item.ifevertype == sub.dictID && (item.ifevertypeName = sub.vcName)
					})
				})

				// 处理外观识别类型描述
				this.tableData.forEach(item => {
					this.isurfacetypeList.map(sub => {
						item.isurfacetype == sub.dictID && (item.isurfacetypeName = sub.vcName)
					})
				})

				// 处理状态识别类型描述
				this.tableData.forEach(item => {
					this.istatustypeList.map(sub => {
						item.istatustype == sub.dictID && (item.istatustypeName = sub.vcName)
					})
				})

				// 处理相位类型描述
				this.tableData.forEach(item => {
					this.iphasetypeList.map(sub => {
						item.iphasetype == sub.value && (item.iphasetypeName = sub.label)
					})
				})


				this.total = result.data.page.totalNum
				this.addLoading = false
			} else {
				this.tableData = []
				this.total = 0
				this.addLoading = false
			}
		},
		// 获取提取节点功能字典码
		async getNodeFunListExt(type) {
			let result = await this.$api.deviceModeling.getNodeFunList({
				devTypeId: type,
				currentPage: 1,
				pageSize: 200
			})
			if (result.success) {
				this.FunctionIdListExt = result.data.lists
			}
		},
		// 字典码初始化
		async dictListInit() {
			this.addLoading = true
			this.getNodeTypeList()
			this.getIdentifyList()
			this.getImetertypeList()
			this.getIfevertypeList()
			this.getIsurfacetypeList()
			this.getIstatustypeList()
			this.getIphasetypeList()
			this.getSourceTypeList()
		},
		// 获取节点类型枚举
		async getNodeTypeList() {
			let { data } = await this.$api.getLocalData()
			this.nodeTypeList = data.nodeTypeList
			// console.log(this.nodeTypeList)
		},
		// 识别类型字典吗
		async getIdentifyList() {
			let result = await this.$api.deviceModeling.getDictList({
				dictGroupID: 7006
			})
			if (result.success) {
				this.identifyList = result.data
			}
		},
		// 表计类型字典码
		async getImetertypeList() {
			let result = await this.$api.deviceModeling.getDictList({
				dictGroupID: 7007
			})
			if (result.success) {
				this.imetertypeList = result.data
			}
		},
		// 发热类型字典码
		async getIfevertypeList() {
			let result = await this.$api.deviceModeling.getDictList({
				dictGroupID: 7008
			})
			if (result.success) {
				this.ifevertypeList = result.data
			}
		},
		// 外观识别类型字典码
		async getIsurfacetypeList() {
			let result = await this.$api.deviceModeling.getDictList({
				dictGroupID: 7009
			})
			if (result.success) {
				this.isurfacetypeList = result.data
			}
		},
		// 状态识别类型字典码
		async getIstatustypeList() {
			let result = await this.$api.deviceModeling.getDictList({
				dictGroupID: 7013
			})
			if (result.success) {
				this.istatustypeList = result.data
			}
		},
		// 相位类型类型字典码
		async getIphasetypeList() {
			let { data } = await this.$api.getLocalData()
			this.iphasetypeList = data.iphasetypeList
		},
		// 数据来源字典码
		async getSourceTypeList() {
			let result = await this.$api.deviceModeling.getDictList({
				dictGroupID: 1006
			})
			if (result.success) {
				this.sourceTypeList = result.data
			}
		},

		// 获取当前数据来源类别
		getSourceTypeLabel: function(exlist) {
			let arr = []
			this.sourceTypeList.map(dict => {
				exlist.forEach(item => {
					if (dict.dictID == item.sourceType) {
						arr.push(dict.vcName)
					}
				})
			})
			let result = Array.from(new Set(arr))
			return result.join(', ')
		},
		// tabs点击事件
		handleClickTabs(name) {
			this.activePane = name
			// 更新列表
			this.page = 1
			this.pageSize = 20
			this.getNotConfiguredNode()
		},
		// 选择设备类型节点
		handleSelectTypeNodes(node) {
			if (JSON.stringify(node) == '[]') return
			// 更新 当前节点类型
			this.nodeType = node[0]['flag']
			// 更新 当前节点id
			this.activeNodeId = node[0]['id']
			if (node[0].flag == 0) {
				this.activeSubsystemId = node[0]['id']
				this.activeNodeId = node[0]['id']
			} else {
				this.activeDeviceTypeId = node[0]['id'].split('_')[1]
				this.activeNodeId = node[0]['id'].split('_')[1]
			}
			this.page = 1
			this.pageSize = 20
			this.getNotConfiguredNode()
		},
		handleSelectSmNodes(){},
		// 选择添加节点
		handleSelectChange(selection) {
			this.selectionAddRow = selection
		},
		// 弹窗分页跳转
		handleChangeModalPage(page) {
			this.page = page
			this.addLoading = true
			this.getNotConfiguredNode()
		},
		// 改变弹窗分页大小
		handleChangeModalSize(size) {
			this.pageSize = size
			this.addLoading = true
			this.getNotConfiguredNode()
		},
		
		// 添加节点取消
		addNodeModalCancel() {
			this.$emit('closeAssModal')
		},
		// 添加节点确认
		addNodeModalOk() {
			if (this.selectionAddRow.length == 0) {
				return this.$Message.error('请选中添加的节点进行操作！')
			}
			this.selectionAddRow.forEach( item => {
				item.handle = 'add'
				item.isConfig = '1'
			})

			this.$emit('updateTableData', this.selectionAddRow)
		},
		addNodeResult() {
			this.$Message.success('添加设备节点成功！')
			this.addNodeModalCancel()
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
.node-association-modal {

}
.addNodeModalAss {
	/deep/ .ivu-modal {
		// width: 1200px !important;
	}
	/deep/ .ivu-form-item:nth-of-type(1) {
		.ivu-form-item-label {
			width: 75px !important;
		}
		.ivu-form-item-content {
			margin-left: 75px !important;
		}
	}
	/deep/ .ivu-form-item:nth-of-type(2) {
		.ivu-form-item-label {
			width: initial !important;
		}
		.ivu-form-item-content {
			margin-left: initial !important;
		}
	}
	/deep/ .ivu-form-item {
		margin-bottom: 10px;
	}
	.content {
		display: flex;
		justify-content: flex-start;
		width: 100%;

		.left {
			width: 220px;
			/deep/ .ivu-tree {
				height: calc(100vh - 270px) !important;
				overflow-y: auto;
			}
			/deep/ .ivu-tabs-nav .ivu-tabs-tab {
				padding: 9px;
			}
			/deep/ .ivu-tabs-bar {
				margin-bottom: 5px;
			}

		}
		.right {
			width: calc(100vw - 255px) !important;
			margin-left: 10px;
			> .ivu-table-wrapper {
				height: calc(100vh - 240px) !important;
				> /deep/ .ivu-table {
					> .ivu-table-body {
						height: calc(100vh - 280px) !important;
					}
					.ivu-table-fixed-body {
						height: calc(100vh - 297px) !important;
					}
					> .ivu-table-tip {
						height: calc(100vh - 280px) !important;
						td {
							height: calc(100vh - 280px) !important;
						}
					}
				}
			}
			.ivu-page {
				display: flex;
				justify-content: center;
				margin-top: 10px;
			}
		}
	}
}
</style>