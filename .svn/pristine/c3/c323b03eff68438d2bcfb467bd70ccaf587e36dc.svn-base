<template>
	<div class="data-task">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree ref="bus-org-search-tree" :data="stationTree" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<!-- 右侧表 -->
		<div class="right-tab">
			<!-- 头 -->
			<searche-header-wrapper>
				<com-button type="add" size="large" style="margin-right: 40px;" @click="handleAddBusTree">新增</com-button>
			</searche-header-wrapper>
			<!-- 表格 -->
			<div class="tab-map">
				<div>
					<element-table
						ref="bus-tree-table"
						:columns="columns"
						:data="tableData"
						border
						row-key="id"
						default-expand-all
						highlight-current-row
						@on-edit="handlerEditRow"
						@on-delete="handlerDeleteRow"
						@current-change="handleTableRowChange"
						:row-class-name="setRowClassName"
					></element-table
					><!-- @row-click="row => handleTableRowClick('bus-tree-table', row)" -->
				</div>
			</div>
		</div>

		<!-- 弹框 -->
		<Modal v-model="modal" :mask-closable="false" footer-hide width="800" @on-cancel="closeClick('area-form')">
			<Form ref="area-form" :model="taskModalData" :label-width="80" :rules="ruleValidate" label-position="right">
				<!-- 巡检区域 -->
				<FormItem label="巡检区域" prop="areaValue">
					<el-input v-model="taskModalData.areaValue" size="small" placeholder="请输入..." style="width: 390px" />
				</FormItem>
				<!-- 节点配置 -->
				<FormItem label="节点配置" prop="treeSelect">
					<el-input placeholder="请选择..." v-model="taskModalData.treeSelect" :disabled="true" size="small" style="width: 390px;">
						<el-button slot="append" @click="inptOn">{{ addSelext }}</el-button>
					</el-input>
					<div class="selsctTreeBox" v-show="treeBox">
						<div class="treeData">
							<el-tree
								class="filter-tree"
								:data="options"
								:props="defaultProps"
								node-key="id"
								@check-change="handleCheckChange"
								empty-text="暂无数据"
								v-loading="treeLoading"
								element-loading-text="数据加载中..."
								:indent="24"
								ref="tree"
								:filter-node-method="filterNode"
								show-checkbox
								:check-strictly="true"
							></el-tree>
						</div>
					</div>
				</FormItem>
				<div class="form-operation">
					<searche-header-wrapper>
						<form-item title="任务组名称" type="text" v-model="searchInfo.name" placeholder="输入任务组名称搜索"></form-item>
						<form-item
							type="select"
							title="状态"
							class="enable"
							v-model="searchInfo.enable"
							placeholder=""
							:options="searchInfoEnableList"
							:setings="{ value: 'value', label: 'label' }"
						>
						</form-item>
						<Button type="info" icon="md-search" class="search" @click="handleQueryTaskList()">查询</Button>
						<Button type="primary" icon="md-refresh" class="reset" @click="handleResetQueryTaskList()" style="margin-left: 10px;">重置</Button>
					</searche-header-wrapper>
				</div>
				<div class="table">
					<!-- <Table ref='demTabData' height="200" border highlight-row :columns="tabColumns" :data="modalTableData" @on-selection-change='handleSelectionChange'></Table> -->
					<el-table ref="table" :data="modalTableData" height="200" empty-text="暂无数据" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="groupName" label="任务组名称"></el-table-column>
						<el-table-column prop="taskType" label="巡检类型"></el-table-column>
						<el-table-column prop="taskSubType" label="巡检子类型"></el-table-column>
						<el-table-column prop="isEnabled" label="状态"></el-table-column>
					</el-table>
					<Page
						@on-change="handleChangePage"
						@on-page-size-change="handleChangeSize"
						:total="total"
						:current="page"
						:page-size="pageSize"
						show-sizer
						show-elevator
						show-total
						style="margin-top: 10px;
						display: flex;
						justify-content: center;
						align-items: center;"
					/>
				</div>
				<FormItem>
					<Button type="primary" @click="lastOkclick('area-form')" style="float: right;margin-right: 20px;">确定</Button>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
import elementTable from '_b/element-table'
export default {
	name: 'data-task',
	components: {
		elementTable
	},
	props: {},
	data() {
		// render 模块名称 + 图标
		const renderIconName = (h, params) => {
			let row = params.row

			if (row.iBindType == 1) {
				return h('span', [
					h('i', {
						class: {
							'el-icon-folder-opened': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.vcName)
				])
			} else if (row.iBindType == 2) {
				return h('span', [
					h('i', {
						class: {
							'el-icon-collection-tag': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.vcName)
				])
			} else if (row.iBindType == 3) {
				return h('span', [
					h('i', {
						class: {
							'el-icon-notebook-2': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.vcName)
				])
			}
		}

		return {
			axios: this.$api.systemsManage.dataUpload,
			stationTree: [],
			treeBox: false,
			isTree: false,
			step: 0,
			treeLoading: false,
			defaultProps: {
				children: 'children',
				label: 'title'
			},
			unitId: '',
			unitName: '',
			modal: false, // 弹框控制
			options: [], // 弹框树控件数据
			treeOdatas: [], // 勾选弹框树集合
			treeIdsData: [], // 弹框树勾选层的id
			addSelext: '选择',

			taskModalData: {
				areaValue: '',
				treeSelect: ''
			},
			ruleValidate: {
				areaValue: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				treeSelect: [{ required: true, message: '该项为必选项', trigger: 'blur' }]
			},

			// 表格
			tableData: [],
			columns: [
				{ label: '名称', prop: 'vcName', align: 'left', render: renderIconName },
				{ label: '绑定类型', prop: 'bindType' },
				{ label: '编码', prop: 'vcCode' },
				{ label: '操作', prop: 'action', width: 220, editShow: true, deleteShow: true }
			],
			searchInfo: {
				// 页面条件查询
				name: '',
				enable: 4
			},
			searchInfoEnableList: [{ value: 4, label: '全部' }, { value: 0, label: '停用' }, { value: 1, label: '启用' }],
			modalTableData: [],
			total: 0,
			page: 1,
			pageSize: 10,
			multipleSelectionAll: [], // 所有选中的数据包含跨页数据
			multipleSelection: [], // 当前页选中的数据
			idKey: 'groupId'
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getStationTree()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		_forEach: function(data, isTrue, callback) {
			var arr = []
			for (var i = 0; i < data.length; i++) {
				arr.push(data[i])
			}
			while (arr.length) {
				var _p = arr.shift()
				if (callback(_p) == false) {
					return
				}
				if (isTrue && _p.children) {
					for (var j = _p.children.length - 1; j >= 0; j--) {
						arr.unshift(_p.children[j])
					}
				}
			}
		},
		// 获取弹框树数据
		getModalTreeData() {
			let params = {
				unitId: this.unitId
			}
			this.treeLoading = true
			this.axios.getNodeConfigTree(params).then(res => {
				if (res.code == 200) {
					// this.modal = true
					let pp
					this.options = res.data
					this._forEach(this.options, true, items => {
						this.$set(items, 'disabled', true)
						this._forEach(this.options, true, item => {
							if (item.children !== undefined && item.children !== null && item.children.length == 0) {
								pp = item.parentId
								this._forEach(this.options, true, ite => {
									if (ite.id == pp) {
										ite.disabled = false
										pp = ite.parentId
										this._forEach(this.options, true, it => {
											if (it.id == pp) {
												it.disabled = false
											}
										})
									}
								})
							}
						})
					})
					this.treeLoading = false
				} else {
					this.options = []
					this.treeLoading = false
				}
			})
		},
		// 变电站树点击
		handleStationTree(data) {
			console.log(data[0].flag)
			console.log(data[0])
			if (data[0].flag == 0) {
				// 如果不是变电站
				this.unitId = ''
				this.isTree = false // 新增不能点击
				this.step = 0
			} else if (data[0].flag == 1) {
				// 是变电站
				this.unitName = data[0].title
				this.unitId = data[0].id
				this.isTree = true
				this.step = 1
				if (this.file) {
					this.step = 2
				}
				this.getTableData()
			}
		},
		// 获取组织树
		getStationTree() {
			this.axios.getUnitTree({ iFlag: 2 }).then(res => {
				if (res.code == 200 && res.data) {
					let flgaNum = 1
					this._forEach(res.data, true, item => {
						item.expand = true
						if (item.flag == flgaNum) {
							item.selected = true
							this.unitId = item.id
							this.isTree = !!this.unitId
							this.step = 1
							flgaNum = 'a'
						}
					})
					this.stationTree = res.data
					if (this.unitId != '') {
						this.getTableData()
					}
				}
			})
		},
		// 获取表格数据
		getTableData() {
			this.tableData = []
			let params = {
				unitid: this.unitId
			}
			this.treeLoading = true
			this.axios.getTableTreeData(params).then(res => {
				if (res.code == 200 && res.data.length > 0) {
					res.data[0].expand = true
					res.data[0].expandId = 1
					// res.data[0].id = 0
					console.log(res.data)
					this.tableData = res.data
					this._forEach(this.tableData, true, item => {
						if (item.iBindType == 1) {
							this.$set(item, 'bindType', '区域')
						} else if (item.iBindType == 2) {
							this.$set(item, 'bindType', '设备')
						}
					})
					this.treeLoading = false
				} else {
					this.tableData = []
					this.treeLoading = false
				}
			})
		},
		// 发送添加巡检区域请求
		addAsArea() {
			this.treeOdatas.forEach(item => {
				this.treeIdsData.push(item.id)
			})
			let addAs = {
				unitID: this.unitId,
				vcName: this.taskModalData.areaValue,
				treeIDs: this.treeIdsData,
				taskGroupID: []
			}
			this.multipleSelectionAll.forEach(item => {
				addAs.taskGroupID.push(item.groupId)
			})
			this.axios.addAsArea(addAs).then(res => {
				this.treeIdsData = []
				if (res.code == 200) {
					this.$Message.success('添加成功')
					this.taskModalData.areaValue = ''
					this.taskModalData.treeSelect = ''
					this.getTableData()
				} else {
					this.$Message.warning(res.msg)
					this.taskModalData.areaValue = ''
					this.taskModalData.treeSelect = ''
				}
			})
		},
		// 点击确定按钮
		lastOkclick(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.treeBox = false
					this.modal = false
					this.getAllSelectionData()
					this.addAsArea()
				}
			})
		},
		closeClick(name) {
			this.addSelext = '选择'
			this.$refs[name].resetFields()
			this.treeBox = false
			this.modal = false
			this.options = []
			// this.taskModalData.areaValue = ''
			// this.taskModalData.treeSelect = ''
		},
		// 点击新增
		handleAddBusTree() {
			this.modal = true
			this.getModalTreeData()
			this.getTaskGroupDatas()
		},
		// 勾选节点
		handleCheckChange() {
			let res = this.$refs.tree.getCheckedNodes()
			let arr = ''
			res.forEach(item => {
				arr += `${item.title},`
			})
			console.log(res)
			console.log(arr)
			this.taskModalData.treeSelect = arr
			this.treeOdatas = res
		},
		// 表格编辑某一行数据
		handlerEditRow(row, index) {
			console.log(row)
		},
		// 表格删除 某一行 数据
		handlerDeleteRow(row, index) {
			console.log(row)
			// this.$Modal.confirm({
			// 	title: '确认',
			// 	content: `<p>是否确认删除所选组织</p>`,
			// 	onOk: () => {
			// 		this.axios.delTaskAreaGroup().then(res => {
			//
			// 		})
			// 	}
			// })
		},
		// 表格某一行 单选状态发生变化
		handleTableRowChange(currentRow, oldCurrentRow) {
			if (!currentRow) return

			this.currentRow = currentRow
			this.getStationNodeByUnitId(this.orgTreeData, currentRow.unitId)
		},
		// 表格行的类名
		setRowClassName(data) {
			if (data.row.pid == 0) {
				return 'rootNode'
			}
		},
		// 根据传入的 station id 获取到树节点 并选中 且排他
		getStationNodeByUnitId(source, unitId) {
			source.forEach(item => {
				if (item.id == unitId) {
					this.currentStation = item
					this.$set(item, 'selected', true)
				} else {
					if (item.selected) this.$set(item, 'selected', false)
					this.getStationNodeByUnitId(item.children, unitId)
				}
			})
		},
		inptOn() {
			this.treeBox = !this.treeBox
			if (this.treeBox) {
				this.addSelext = '确定'
			} else if (!this.treeBox) {
				this.addSelext = '选择'
			}
		},
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		// 点击弹框查询按钮
		handleQueryTaskList() {
			this.getTaskGroupDatas()
		},
		// 点击弹框重置按钮
		handleResetQueryTaskList() {
			this.searchInfo.name = ''
			this.searchInfo.enable = 4
			this.getTaskGroupDatas()
		},
		// 获取任务组表格信息
		getTaskGroupDatas() {
			let datas = {
				unitId: this.unitId,
				groupName: this.searchInfo.name,
				isEnabled: this.searchInfo.enable,
				currentPage: this.page,
				pageSize: this.pageSize
			}
			this.axios.getTaskGroupDatas(datas).then(res => {
				if (res.code == 200) {
					this.modalTableData = res.data.data.lists
					this.total = res.data.data.page.totalNum
					setTimeout(() => {
						this.setSelectRow()
					}, 10)
				}
			})
		},
		// 弹框分页切换
		handleChangePage(page) {
			this.changePageCoreRecordData()
			this.page = page
			this.getTaskGroupDatas()
		},
		// 弹框更新分页条数
		handleChangeSize(size) {
			this.changePageCoreRecordData()
			this.pageSize = size
			this.getTaskGroupDatas()
		},

		// 设置选中的方法
		setSelectRow() {
			if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
				return
			}
			// 标识当前行的唯一键的名称
			let idKey = this.idKey
			let selectAllIds = []
			let that = this
			this.multipleSelectionAll.forEach(row => {
				selectAllIds.push(row[idKey])
			})
			this.$refs.table.clearSelection()
			for (var i = 0; i < this.modalTableData.length; i++) {
				if (selectAllIds.indexOf(this.modalTableData[i][idKey]) >= 0) {
					// 设置选中，记住table组件需要使用ref="table"
					this.$refs.table.toggleRowSelection(this.modalTableData[i], true)
				}
			}
		},
		// 记忆选择核心方法
		changePageCoreRecordData() {
			// 标识当前行的唯一键的名称
			let idKey = this.idKey
			let that = this
			// 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
			if (this.multipleSelectionAll.length <= 0) {
				this.multipleSelectionAll = this.multipleSelection
				return
			}
			// 总选择里面的key集合
			let selectAllIds = []
			this.multipleSelectionAll.forEach(row => {
				selectAllIds.push(row[idKey])
			})
			let selectIds = []
			// 获取当前页选中的id
			this.multipleSelection.forEach(row => {
				selectIds.push(row[idKey])
				// 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
				if (selectAllIds.indexOf(row[idKey]) < 0) {
					that.multipleSelectionAll.push(row)
				}
			})
			let noSelectIds = []
			// 得到当前页没有选中的id
			this.modalTableData.forEach(row => {
				if (selectIds.indexOf(row[idKey]) < 0) {
					noSelectIds.push(row[idKey])
				}
			})
			noSelectIds.forEach(id => {
				if (selectAllIds.indexOf(id) >= 0) {
					for (let i = 0; i < that.multipleSelectionAll.length; i++) {
						if (that.multipleSelectionAll[i][idKey] == id) {
							// 如果总选择中有未被选中的，那么就删除这条
							that.multipleSelectionAll.splice(i, 1)
							break
						}
					}
				}
			})
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		getAllSelectionData() {
			this.changePageCoreRecordData()
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
.data-task{
	width: 100%;
	height: calc(100vh - 160px);

	.left-tree {
		width: 250px;
		height: 100%;
		background-color: #fff;
		border: 10px solid #fff;
		overflow: auto;
		float: left;
	}

	.right-tab{
		width: calc(100% - 260px);
		height: 100%;
		float: left;
		margin-left: 10px;

		.tab-map{
			position: relative;
			width: 100%;
			height: calc(100% - 72px);
			background-color: #fff;
			border-top: 1px solid #dcdee2;

			> div {
				width: 100%;
				height: 100%;
				overflow-y: auto;
				overflow-x: hidden;
			}

			.element-table {
				position: initial !important;

				.el-table {
					position: initial !important;
					padding-top: 44px;
				}

				.el-table__header-wrapper {
					position: absolute;
					top: 0;
					z-index: 999;
				}

				// /deep/.cell{
				// 	.com-button:first-child{
				// 		display: none;
				// 	}
				// }

			}

		}
	}

}

/deep/ .ivu-modal-body{
	padding-top: 45px;

	.selsctTreeBox{
		width: 100%;
		height: 100%
		background: #fff;
		position: absolute;
		left: 0;
		top: 35px;
		z-index: 1;

		.treeData{
			width: 390px;
			height: 300px;
			overflow-y: auto;
		}
		.btnBox{
			width: 390px;
			height: 25px;

			/deep/ .ivu-btn{
				float: right;
				margin-top: 10px;
				margin-right: 10px;
			}
		}

		/deep/.form-operation {
			.form-item {
				margin-bottom: initial;
			}
			.search{
				float: left;
			}
			.reset {
				margin-left: 10px;
			}
		}

		.table {
			> .ivu-table-wrapper {
				height: calc(100vh - 265px) !important;
				> .ivu-table {
					> .ivu-table-body {
						height: calc(100vh - 305px) !important;
					}
					> .ivu-table-tip {
						height: calc(100vh - 305px) !important;
						td {
							height: calc(100vh - 305px) !important;
						}
					}
				}
			}
			.ivu-page {
				margin-top: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.delete {
				margin-left: 5px;
			}
			/deep/ .ivu-table-expanded-cell {
				padding: 18px;
				padding-top: 0;
			}
		}

	}

	// .selsctTreeBox{
	// 	width: 390px;
	// 	height: 300px;
	// 	background: #fff;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 35px;
	// 	overflow-y: auto;
	//
	//
	// }
}
</style>
