<template>
	<div class="tasking-config">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="stationTree" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>

		<!-- 右侧内容 -->
		<div class="right-content">
			<div class="form-operation">
				<searche-header-wrapper>
					<form-item title="任务组名称" type="text" v-model="searchInfo.name" placeholder="输入任务组名称搜索"></form-item>
					<form-item
						type="select"
						title="状态"
						class="enable"
						v-model="searchInfo.enable"
						placeholder
						:options="searchInfoEnableList"
						:setings="{ value: 'value', label: 'label' }"
					></form-item>
					<Button type="info" icon="md-search" class="search" @click="handleQueryTaskList('page')">查询</Button>
					<Button type="primary" icon="md-refresh" class="reset" @click="handleResetQueryTaskList('page')">重置</Button>
					<Button type="success" icon="md-add" class="add" @click="handleAddOrEditTask('1')">新增</Button>
				</searche-header-wrapper>
			</div>

			<div class="table">
				<Table height="670" border highlight-row :columns="tabColumns" :data="tableData">
					<template slot-scope="{ row }" slot="isEnabled">
						<span v-if="row.isEnabled == 1" :style="{ color: '#19be6b' }">启用</span>
						<span v-if="row.isEnabled == 0" :style="{ color: '#ff9900' }">停用</span>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<Button size="small" type="warning" icon="ios-create-outline" @click="handleAddOrEditTask('2', row)">编辑</Button>
						<Button size="small" type="error" icon="md-trash" class="delete" @click="deleteTaskGroup(row)">删除</Button>
					</template>
				</Table>

				<Page
					@on-change="handleChangePage"
					@on-page-size-change="handleChangeSize"
					:total="total"
					:current="page"
					:page-size="pageSize"
					show-sizer
					show-elevator
					show-total
				/>
			</div>
		</div>

		<!-- 弹框 -->
		<Modal v-model="addModal" :mask-closable="false" :width="modalWidth" :title="modalTitle" @on-cancel="closeClick('one-form')">
			<!-- 模态框 自定义 步骤条 -->
			<div slot="header">
				<Steps :current="stepsConfig.current">
					<Step v-for="item in stepsConfig.list" :key="item.title" :title="item.title" :content="item.content"></Step
				></Steps>
			</div>

			<Form ref="one-form" :rules="ruleValidate" :model="addFormData" :label-width="100" label-position="right" v-show="nextSign == 0">
				<FormItem label="变电站名称" prop="unitTitle">
					<Input v-model="addFormData.unitTitle" placeholder="请输入..." :disabled="true" />
				</FormItem>
				<FormItem label="任务组名称" prop="groupName">
					<Input v-model="addFormData.groupName" placeholder="请输入..." />
				</FormItem>
				<FormItem label="巡检类型" prop="taskTypeCode">
					<Select v-model="addFormData.taskTypeCode" placeholder="请选择巡检类型">
						<Option v-for="(item, index) in inspectionType.sumtype" :key="index" :value="item.dictID">{{ item.vcName }}</Option>
					</Select>
				</FormItem>
				<FormItem label="巡检子类型" prop="taskSubTypeCode">
					<Select v-model="addFormData.taskSubTypeCode" placeholder="请选择巡检类型">
						<Option v-for="(item, index) in inspectionType.subtype" :key="index" :value="item.dictID">{{ item.vcName }}</Option>
					</Select>
				</FormItem>
				<FormItem label="状态" prop="isEnabled">
					<Select v-model="addFormData.isEnabled" placeholder="请选择状态">
						<Option value="1">启用</Option>
						<Option value="0">停用</Option>
					</Select>
				</FormItem>
			</Form>

			<div class="relevanceTask" v-show="nextSign == 1">
				<div class="condition">
					<searche-header-wrapper style="padding: 0;">
						<form-item title="任务名称" type="text" placeholder="输入任务名称搜索" v-model="modalTaskTabFind.taskName"></form-item>
						<form-item title="任务类型" type="text" placeholder="输入任务类型搜索" v-model="modalTaskTabFind.taskType"></form-item>
						<form-item
							type="select"
							title="状态"
							class="enable"
							v-model="modalTaskTabFind.taskEnable"
							placeholder
							:options="searchInfoEnableList"
							:setings="{ value: 'value', label: 'label' }"
						></form-item>
						<Button type="info" icon="md-search" @click="handleQueryTaskList('modal')">查询</Button>
						<Button type="primary" icon="md-refresh" style="margin-left: 15px;" @click="handleResetQueryTaskList('modal')">重置</Button>
					</searche-header-wrapper>
				</div>
				<div class="taskTable">
					<!-- <Table  border highlight-row :columns="taskTabColumns" :data="taskTableData" @on-selection-change='handleSelectionChange'></Table> -->
					<el-table
						ref="multipleTable"
						:data="taskTableData"
						tooltip-effect="dark"
						style="width: 100%"
						@select="onTableSelect"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="70" align="center"></el-table-column>
						<el-table-column label="任务名称" width="300" align="center">
							<template slot-scope="scope">{{ scope.row.taskName }}</template>
						</el-table-column>
						<el-table-column prop="taskType" label="任务类型" width="150" align="center"></el-table-column>
						<el-table-column prop="planName" label="任务计划" width="300" align="center"></el-table-column>
						<el-table-column prop="updateTime" label="更新时间" width="180" align="center"></el-table-column>
						<el-table-column prop="enabled" label="状态" show-overflow-tooltip width="150" align="center"></el-table-column>
						<el-table-column prop="vc_Memo" label="备注" width="120" align="center"></el-table-column>
					</el-table>
					<Page
						@on-change="modalChangePage"
						@on-page-size-change="modalChangeSize"
						:total="taskTabPage.total"
						:current="taskTabPage.page"
						:page-size="taskTabPage.pageSize"
						show-sizer
						show-elevator
						show-total
						style="margin-top: 10px;display: flex;justify-content: center;align-items: center;"
					/>
				</div>
			</div>
			<!-- 底部 按钮 -->
			<div slot="footer">
				<com-button type="cancel" @click="closeClick('one-form')"></com-button>
				<com-button type="confirm" v-if="nextSign == 1" @click="prevClick">上一步</com-button>
				<com-button type="confirm" v-if="nextSign == 0" @click="nextClick('one-form')">下一步</com-button>
				<com-button type="confirm" v-if="nextSign == 1" @click="addTaskGroup">确定</com-button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { ModalConfig } from '@/libs/construction'
import expandRow from './table-expand'
export default {
	name: 'tasking-config',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.systemsManage.taskingConfig,
			addModal: false,
			stationTree: [], // 左侧树数据
			unitId: '',
			unitTitle: '',
			isTree: false,
			step: 0,
			searchInfo: {
				// 页面条件查询
				name: '',
				enable: 4
			},
			searchInfoEnableList: [{ value: 4, label: '全部' }, { value: 0, label: '停用' }, { value: 1, label: '启用' }],
			total: 0,
			page: 1,
			pageSize: 10,
			tableData: [], // 页面表格数据
			tabColumns: [
				{
					type: 'expand',
					width: 30,
					align: 'center',
					render: (h, params) => {
						return h(expandRow, {
							props: {
								rowData: params.row.taskList,
								rowGroupId: params.row.groupId
							}
						})
					}
				},
				{ title: '任务组名称', key: 'groupName', align: 'center' },
				{ title: '巡检类型', key: 'taskType', align: 'center' },
				{ title: '巡检子类型', key: 'taskSubType', align: 'center' },
				{ title: '状态', slot: 'isEnabled', align: 'center' },
				{ title: '操作', slot: 'action', align: 'center', width: 200 }
			],
			busModal: {
				modalPage: 'taskPage' // 控制弹框内容显示
			},
			stepsConfig: {
				current: 0,
				list: [{ title: '步骤1', content: '任务组信息' }, { title: '步骤2', content: '关联任务' }]
			},
			addFormData: {
				// 弹框表单绑定
				groupName: '',
				taskTypeCode: '',
				taskSubTypeCode: '',
				isEnabled: '',
				taskList: [],
				unitTitle: ''
			},
			ruleValidate: {
				// 弹框表单验证
				unitTitle: [{ required: true, message: '请在选择左侧变电站', trigger: 'blur' }],
				groupName: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				taskTypeCode: [{ required: true, message: '该项为必选项', trigger: 'blur' }],
				isEnabled: [{ required: true, message: '该项为必选项', trigger: 'blur' }]
			},
			inspectionType: {
				sumtype: [],
				subtype: []
			},
			nextSign: '0', // 底部按钮控制
			modalTaskTabFind: {
				// 弹框条件查询
				taskName: '',
				taskType: '',
				taskEnable: 4
			},
			taskTableData: [], // 弹框表格数据
			taskTabPage: {
				total: 0,
				page: 1,
				pageSize: 10
			},
			modalTitle: '新增',

			multipleSelectionAll: [], // 所有选中的数据包含跨页数据
			multipleSelection: [], // 当前页选中的数据
			idKey: 'taskId',
			id: '',
			groupId: '' // 任务组id
		}
	},
	computed: {
		modalWidth() {
			let type = this.busModal.modalPage
			let width = ''
			if (type == 'taskPage') width = 600
			else if (type == 'tablePage') width = 1400
			return width
		}
	},
	filters: {},
	watch: {},
	created() {
		this.getInspectionAreaTree()
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
		// 获取左侧树
		getInspectionAreaTree() {
			this.axios.getInspectionAreaTree({ iFlag: 2 }).then(res => {
				if (res.code == 200) {
					let flgaNum = 1
					this._forEach(res.data, true, item => {
						item.expand = true
						if (item.flag == flgaNum) {
							item.selected = true
							this.unitId = item.id
							this.unitTitle = item.title
							this.addFormData.unitTitle = item.title
							this.isTree = !!this.unitId
							this.step = 1
							flgaNum = 'a'
						}
					})
					this.stationTree = res.data
					if (this.unitId != '') {
						this.getPageTableData()
					}
				}
			})
		},
		// 左侧树点击
		handleStationTree(data) {
			if (data[0].flag == 1) {
				this.unitId = data[0].id
				this.addFormData.unitTitle = data[0].title
			}
			this.searchInfo.name = ''
			this.searchInfo.enable = 4
			this.getPageTableData()
		},
		// 查询
		handleQueryTaskList(sign) {
			if (sign == 'page') {
				this.getPageTableData()
			} else if (sign == 'modal') {
				this.getModalTaskTableData()
			}
		},
		// 获取页面表格数据
		getPageTableData() {
			let datas = {
				unitId: this.unitId,
				groupName: this.searchInfo.name,
				isEnabled: this.searchInfo.enable,
				currentPage: this.page,
				pageSize: this.pageSize
			}
			this.axios.getPageTableData(datas).then(res => {
				if (res.code == 200) {
					this.tableData = res.data.data.lists
					this.total = res.data.data.page.totalNum
				}
			})
		},
		// 重置
		handleResetQueryTaskList(sign) {
			if (sign == 'page') {
				this.searchInfo.name = ''
				this.searchInfo.enable = 4
				this.getPageTableData()
			} else if (sign == 'modal') {
				this.modalTaskTabFind.taskName = ''
				this.modalTaskTabFind.taskType = ''
				this.modalTaskTabFind.taskEnable = 4
				this.getModalTaskTableData()
			}
		},
		// 新增 || 编辑
		handleAddOrEditTask(num, row) {
			if (num == '1') {
				this.modalTitle = '新增'
				this.addModal = true
				this.getInspectionTypeDatas()
			} else if (num == '2') {
				this.modalTitle = '编辑'
				console.log(row.taskTypeCode)
				this.addFormData.unitTitle = this.unitTitle
				this.addFormData.groupName = row.groupName
				this.addFormData.taskTypeCode = row.taskTypeCode.toString()
				this.addFormData.taskSubTypeCode = row.taskSubTypeCode
				this.addFormData.isEnabled = row.isEnabled.toString()
				this.addFormData.taskList = row.taskList
				this.id = row.id
				this.groupId = row.groupId
				this.getInspectionTypeDatas()
				this.addModal = true
				console.log(this.addFormData.taskTypeCode)
			}
		},
		// 删除任务组
		deleteTaskGroup(row) {
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认删除该任务组</p>`,
				onOk: () => {
					this.axios.deleteTaskGroup({ groupId: row.groupId }).then(res => {
						if (res.code == 200) {
							this.$Message.success('删除成功')
							this.getPageTableData()
						}
					})
				}
			})
		},
		// 页面分页切换
		handleChangePage(page) {
			this.page = page
			this.getPageTableData()
		},
		// 页面更新分页条数
		handleChangeSize(size) {
			this.pageSize = size
			this.getPageTableData()
		},
		// 弹框分页切换
		modalChangePage(page) {
			this.taskTabPage.page = page
			this.getModalTaskTableData()
			this.changePageCoreRecordData()
		},
		// 弹框更新分页条数
		modalChangeSize(size) {
			this.taskTabPage.pageSize = size
			this.getModalTaskTableData()
			this.changePageCoreRecordData()
		},
		// 下一步
		nextClick(name) {
			console.log(this.addFormData)
			this.$refs[name].validate(valid => {
				if (valid) {
					this.nextSign = 1
					this.busModal.modalPage = 'tablePage'
					this.stepsConfig.current = 1
					this.getModalTaskTableData()
				}
			})
		},
		// 上一步
		prevClick() {
			this.nextSign = 0
			this.busModal.modalPage = 'taskPage'
			this.stepsConfig.current = 0
		},
		// 默认选中
		onTableSelect(rows, row) {
			// console.log(rows,'rows')
			// console.log(row,'row')
			let selected = rows.length && rows.indexOf(row) !== -1
			if (selected == true) {
				row.disabled = false
			} else if (selected == false) {
				row.disabled = true
			}
			// console.log(selected, 'selected')  // true就是选中，0或者false是取消选中
		},
		// 当选择项发生变化时
		handleSelectionChange(val) {
			console.log(val, 'val')
			this.multipleSelection = val
		},
		// 取消
		closeClick(name) {
			this.$refs[name].resetFields()
			this.addModal = false
			this.nextSign = 0
			this.busModal.modalPage = 'taskPage'
		},
		// 确定添加||编辑 任务组
		addTaskGroup() {
			var ctx = this
			if (ctx.modalTitle == '新增') {
				ctx.getAllSelectionData()
				let addInfo = {
					unitId: ctx.unitId,
					groupName: ctx.addFormData.groupName,
					taskTypeCode: ctx.addFormData.taskTypeCode,
					taskSubTypeCode: ctx.addFormData.taskSubTypeCode,
					isEnabled: ctx.addFormData.isEnabled,
					taskList: ctx.multipleSelectionAll
				}
				ctx.axios.addTaskGroup(addInfo).then(res => {
					if (res.code == 200) {
						ctx.$Message.success({
							content: '保存成功',
							duration: 1.5,
							onClose: function() {
								window.location.reload()
							}
						})
						ctx.closeClick('one-form')
						ctx.searchInfo.name = ''
						ctx.searchInfo.enable = 4
						ctx.getPageTableData()
					}
				})
			} else if (this.modalTitle == '编辑') {
				var ctx = this
				console.log(ctx.unitId)
				ctx.getAllSelectionData()
				let params = {
					id: ctx.id,
					groupId: ctx.groupId,
					unitId: ctx.unitId,
					groupName: ctx.addFormData.groupName,
					taskTypeCode: ctx.addFormData.taskTypeCode,
					taskSubTypeCode: ctx.addFormData.taskSubTypeCode,
					isEnabled: ctx.modalTaskTabFind.taskEnable,
					taskList: ctx.multipleSelectionAll
				}
				ctx.axios
					.editTaskGroupData(params)
					.then(res => {
						console.log(res)
						if (res.code == 200) {
							ctx.$Message.success({
								content: '保存成功',
								duration: 1.5,
								onClose: function() {
									window.location.reload()
								}
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		// 获取弹框巡检类型&&子类型数据
		getInspectionTypeDatas() {
			this.axios.getModalInspectionTypeData({ dictGroupID: 7010 }).then(res => {
				if (res.code == 200) {
					res.data.forEach(item => {
						item.dictID = item.dictID.toString()
					})
					this.inspectionType.sumtype = res.data
				}
			})
			this.axios.getModalInspectionTypeData({ dictGroupID: 7011 }).then(res => {
				if (res.code == 200) {
					this.inspectionType.subtype = res.data
				}
			})
		},
		// 获取弹框任务表格数据
		getModalTaskTableData() {
			var ctx = this
			let findTerm = {
				unitId: ctx.unitId,
				taskName: ctx.modalTaskTabFind.taskName,
				taskType: ctx.modalTaskTabFind.taskType,
				isEnabled: ctx.modalTaskTabFind.taskEnable,
				currentPage: ctx.taskTabPage.page,
				pageSize: ctx.taskTabPage.pageSize
			}
			ctx.axios.getAddModalTableData(findTerm).then(res => {
				if (res.code == 200) {
					ctx.taskTabPage.total = res.data.data.page.totalNum
					res.data.data.lists.forEach(item => {
						if (item.isEnabled == 0) {
							item.enabled = '停用'
						} else {
							item.enabled = '启用'
						}
					})
					ctx.taskTableData = res.data.data.lists
					// 默认选中
					setTimeout(() => {
						for (let i = 0, len = ctx.taskTableData.length; i < len; i++) {
							for (let j = 0; j < ctx.addFormData.taskList.length; j++) {
								if (ctx.addFormData.taskList[j].taskId == ctx.taskTableData[i].taskId) {
									ctx.$refs.multipleTable.toggleRowSelection(ctx.taskTableData[i], true)
								}
							}
						}
					}, 20)
					setTimeout(() => {
						ctx.setSelectRow()
					}, 40)
				}
			})
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
			this.$refs.multipleTable.clearSelection()
			for (var i = 0; i < this.taskTableData.length; i++) {
				if (selectAllIds.indexOf(this.taskTableData[i][idKey]) >= 0) {
					// 设置选中，记住table组件需要使用ref="multipleTable"
					this.$refs.multipleTable.toggleRowSelection(this.taskTableData[i], true)
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
			this.taskTableData.forEach(row => {
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
		// 得到选中的所有数据
		getAllSelectionData() {
			// 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
			this.changePageCoreRecordData()
			console.log(this.multipleSelectionAll, 'all')
			// this.params = this.multipleSelectionAll;
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
.tasking-config {
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

  .right-content {
    width: calc(100% - 270px);
    height: 100%;
    float: left;
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    .form-operation {
      .form-item {
        margin-bottom: initial;
      }

      .search, .add {
        float: left;
      }

      .add, .reset {
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
}
</style>
