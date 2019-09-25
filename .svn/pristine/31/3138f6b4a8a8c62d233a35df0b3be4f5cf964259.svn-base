<template>
	<div class="dev-function-table">
		<!-- 头 -->
		<com-button style="margin-bottom: 10px;" type="add" @click="devFunctionModal.set(true, 'add', '添加功能')"></com-button>
		<!-- 表格 -->
		<div class="table-main">
			<element-table :columns="columns" :data="tableData" border :height="500" @on-edit="handleOnEdit" @on-delete="handleOnDelete"></element-table>
			<!-- 分页 -->
			<Page
				style="margin-top: 10px;"
				:total="pageConfig.total"
				:current="pageConfig.page"
				:page-size="pageConfig.pageSize"
				show-sizer
				show-elevator
				show-total
				@on-change="PageChangeHandler('page', $event)"
				@on-page-size-change="PageChangeHandler('pageSize', $event)"
			/>
		</div>

		<!-- 编辑框 -->
		<Modal v-model="devFunctionModal.show" :title="devFunctionModal.title" :mask-closable="false">
			<!-- 添加 || 编辑表单 -->
			<com-form ref="dev-function-info-form" v-model="devFunctionForm" :items="devFunctionFormItems">
				<template #vcCodeSlot>
					<Input v-model="devFunctionForm.vcCode" disabled />
				</template>
				<template #descTest>
					<p class="descTest">1 开 | 0 关</p>
				</template>
			</com-form>

			<modal-footer
				slot="footer"
				@on-cancel="devFunctionModal.set(false)"
				@on-confirm="handleModalConfirm(devFunctionModal.type, 'dev-function-info-form')"
			></modal-footer>
		</Modal>
	</div>
</template>
<script>
import elementTable from '_b/element-table'
import mixinTolls from '@common/mixin/tools'
import { ModalConfig, PageConfig } from '@/libs/construction'

export default {
	name: 'dev-function-table',
	mixins: [mixinTolls],
	components: {
		elementTable
	},
	props: {
		devTypeId: [Number, String],
		enums: Object,
		parentModalShow: Boolean
	},
	data() {
		return {
			http: this.$api.deviceType,

			// 模态框
			devFunctionModal: new ModalConfig(),
			devFunctionForm: {
				devTypeId: this.devTypeId,
				functionId: '',
				id: '',
				nodeType: '',
				vcDesc: '',
				vcMemo: '',
				vcName: '',
				vcUnit: '',
				vcCode: ''
			},
			devFunctionFormItems: [
				{
					label: '功能名称',
					prop: 'vcName',
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				},
				// {
				// 	label: '功能ID',
				// 	prop: 'functionId',
				// 	type: 'number',
				// 	rules: [{ required: true, message: '该项为必填项', trigger: 'change' }],
				// },
				// {
				// 	label: '编码',
				// 	prop: 'vcCode',
				// 	disabled: true
				// },
				{
					label: '编码',
					prop: 'vcCodeSlot',
					slot: 'vcCodeSlot'
				},
				{ label: '单位', prop: 'vcUnit' },
				{
					label: '四遥类型',
					prop: 'nodeType',
					type: 'select',
					options: this.enums.nodeTypeList,
					setings: { value: 'id', label: 'value' },
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				},
				{ label: '功能描述', prop: 'vcDesc', type: 'textarea' },
				{ label: '描述格式 :', slot: 'descTest' },
				{ label: '备注', prop: 'vcMemo', type: 'textarea' }
			],

			// 表格
			columns: [
				{ label: '功能名称', prop: 'vcName', width: 240 },
				{ label: '编码', prop: 'vcCode', width: 240 },
				{ label: '功能描述', prop: 'vcDesc' },
				{ label: '单位', prop: 'vcUnit', width: 100 },
				{ label: '四遥类型', prop: 'nodeTypeHtml', width: 100 },
				{ label: '备注', prop: 'vcMemo' },
				{ label: '操作', prop: 'operation', editShow: true, deleteShow: true, width: 240 }
			],
			tableData: [],

			// 分页
			pageConfig: new PageConfig()
		}
	},
	computed: {},
	filters: {},
	watch: {
		devTypeId: {
			handler(val) {
				this.$set(this.devFunctionForm, 'devTypeId', val)
			},
			immediate: true
		},
		parentModalShow: {
			handler(val) {
				if (!val) {
					this.tableData = []
					this.pageConfig = new PageConfig()
				} else {
					this.init()
				}
			},
			immediate: true
		},
		'devFunctionModal.show'(val) {
			if (!val) {
				let obj = {
					devTypeId: this.devTypeId,
					nodeType: ''
				}
				this.resetComForm(this.devFunctionForm, obj, 'dev-function-info-form')
			}
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//   初始化
		init() {
			// 表格加载
			this.tableLoad()
		},
		// 表格加载
		tableLoad() {
			let { page: currentPage, pageSize } = this.pageConfig
			let params = {
				devTypeId: this.devTypeId,
				currentPage,
				pageSize
			}
			this.http.getDevTypeFuntionList(params).then(res => {
				if (res && res.code == '200') {
					this.$set(this.pageConfig, 'total', res.data.page.totalNum)
					this.tableData = res.data.lists.map(item => {
						let targetIndex = this.enums.nodeTypeList.findIndex(funI => funI.id == item['nodeType'])

						item['functionId'] = `${item['functionId']}`
						item['nodeTypeHtml'] = item['nodeType'] != null ? this.enums.nodeTypeList[targetIndex].value : ''
						item['nodeType'] = `${item['nodeType'] != null ? item['nodeType'] : ''}`

						return item
					})
				}
			})
		},
		// 表格编辑
		handleOnEdit(row) {
			this.setFormBySource(this.devFunctionForm, row)

			this.devFunctionModal.set(true, 'edit', '编辑功能')
		},
		// 表格删除
		handleOnDelete(row) {
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认删除所选设备功能</p>`,
				onOk: () => {
					let { functionId, devTypeId } = row
					let copyTableData = JSON.parse(JSON.stringify(this.tableData))
					let targetIndex = copyTableData.findIndex(item => functionId == item.functionId && devTypeId == item.devTypeId)
					let params = {
						functionId: copyTableData[targetIndex].functionId
					}
					this.http
						.delDevTable(params)
						.then(res => {
							if (res.code == '200') {
								this.$Message.success(`删除成功`)
								this.tableLoad()
							}
						})
						.catch(err => {
							this.$Message.error(`错误：${err}`)
						})
				}
			})
		},
		// 弹框确认
		handleModalConfirm(type, name) {
			this.validateComForm(name, () => {
				let copyTableData = JSON.parse(JSON.stringify(this.tableData))
				let text = ''

				if (type == 'edit') {
					text = '编辑'
					let targetIndex = copyTableData.findIndex(
						item => this.devFunctionForm.functionId == item.functionId && this.devFunctionForm.devTypeId == item.devTypeId
					)
					// 如果是编辑 找到对应的活动 table 中的 item 并将其值 改变为 form 表单中的数值
					this.setFormBySource(copyTableData[targetIndex], this.devFunctionForm)
					for (const key in copyTableData[targetIndex]) {
						if (copyTableData[targetIndex][key] == 'undefined') {
							copyTableData[targetIndex][key] = ''
						}
					}

					this.http
						.upDevTable(copyTableData[targetIndex])
						.then(res => {
							if (res.code == '200') {
								this.$Message.success(`${text}成功`)
								this.tableLoad()
								this.devFunctionModal.set(false)
							} else this.$Message.warning(res.msg)
						})
						.catch(err => {
							this.$Message.error(`错误：${err}`)
						})
				} else if (type == 'add') {
					text = '添加'
					let copyForm = JSON.parse(JSON.stringify(this.devFunctionForm))
					let params = copyForm
					;(params.devTypeId = this.devFunctionForm.devTypeId),
						(params.functionId = ''),
						this.http
							.saveDevTable(params)
							.then(res => {
								if (res.code == '200') {
									this.$Message.success(`${text}成功`)
									this.tableLoad()
									this.devFunctionModal.set(false)
								} else this.$Message.warning(res.msg)
							})
							.catch(err => {
								this.$Message.error(`错误：${err}`)
							})
				}
			})
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
.dev-function-table
	/deep/ .table-main
		.ivu-page
			flex-align(center)
.descTest
	font-size 14px
	color #ed4014
</style>
<style lang="stylus"></style>
