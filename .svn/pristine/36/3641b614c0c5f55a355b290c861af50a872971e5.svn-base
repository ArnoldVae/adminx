<template>
	<div class="subsystem" ref="subsystem">
		<!-- 头 -->
		<searche-header-wrapper ref="searche-header-wrapper">
			<form-item type="text" v-model="searchParams.vcName" noMBottom></form-item>

			<is-enabler-select v-model="searchParams.isEnable" noMBottom></is-enabler-select>

			<com-button type="search" @click="tableLoad(1)"></com-button>

			<com-button type="reset" @click="reset"></com-button>

			<com-button type="add" @click="devModal.set(true, 'add', '添加模型')"></com-button>
		</searche-header-wrapper>

		<!-- 表格 -->
		<div class="table-main">
			<element-table :columns="columns" :data="tableData" border :height="contentHeight"></element-table>
			<!-- 分页 -->
			<Page
				style="margin-top: 10px;"
				:total="pageConfig.total"
				:current="pageConfig.page"
				:page-size="pageConfig.pageSize"
				show-sizer
				show-elevator
				show-total
				@on-change="handleChangePage"
				@on-page-size-change="PageChangeHandler('pageSize', $event)"
				v-if="pageShow"
			/>
		</div>

		<!-- 弹框 -->
		<Modal
			v-model="devModal.show"
			:title="devModal.title"
			:width="devModal.type == 'devFunction' ? 1400 : 500"
			:mask-closable="false"
		>
			<!-- 添加 || 修改 表单 -->
			<template v-if="devModal.type == 'add' || devModal.type == 'edit'">
				<com-form :labelWidth="95" ref="dev-info-form" v-model="devForm" :items="devFormItems"></com-form>
			</template>

			<!-- 关联子系统 -->
			<template v-else-if="devModal.type == 'linkSubs'">
				<div class="tree-wrapper">
					<div>
						<el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
						<el-tree
							ref="subs-list-tree"
							node-key="id"
							:data="subsList"
							:props="{ label: 'vcName' }"
							empty-text="暂无数据"
							show-checkbox
							check-strictly
							check-on-click-node
							:filter-node-method="filterNode"
						></el-tree>
					</div>
				</div>
			</template>

			<!-- 设备功能 -->
			<dev-function-table
				v-else-if="devModal.type == 'devFunction'"
				:devTypeId="currentDev ? currentDev.devTypeId : ''"
				:enums="enums"
				:parentModalShow="devModal.show"
			></dev-function-table>

			<modal-footer
				v-if="devModal.type != 'devFunction'"
				slot="footer"
				@on-cancel="devModal.set(false)"
				@on-confirm="handleModalConfirm(devModal.type, 'dev-info-form')"
			></modal-footer>
			<div v-else slot="footer"></div>
		</Modal>
		<subModuel v-model="subModuelShow" :subModuelData="subModuelData" @modalSwithc="modalSwithc"></subModuel>
	</div>
</template>
<script>
import devFunctionTable from './dev-function-table'
import elementTable from '_b/element-table'
import mixinTolls from '@common/mixin/tools.js'
import deviceMixin from '../device-mixins'
import subModuel from './sub-moudel'
import { ModalConfig, PageConfig } from '@/libs/construction'
export default {
	name: 'subsystem',
	mixins: [mixinTolls, deviceMixin],
	components: {
		elementTable,
		devFunctionTable,
		subModuel
	},
	props: {},
	data() {
		const renderOperation = (h, params) => {
			const row = params.row
			return h('div', [
				h('com-button', {
					attrs: {
						type: 'edit',
						size: 'large'
					},
					on: {
						click: () => {
							// 设置 模型 ID 禁用
							let targetIndex = this.getTargetIndexByKey(this.devFormItems, 'prop', 'devTypeId')
							this.devFormItems[targetIndex].disabled = true

							this.setFormBySource(this.devForm, row)
							this.devModal.set(true, 'edit', '编辑模型')
							this.setDevForm(row)
						}
					}
				}),
				h('com-button', {
					attrs: {
						type: 'delete',
						size: 'large'
					},
					on: {
						click: () => {
							this.$Modal.confirm({
								title: '确认',
								content: `<p>是否确认删除所选模型</p>`,
								onOk: () => {
									let params = {
										devTypeId: row.devTypeId
									}
									this.http
										.deleteDevType(params)
										.then(res => {
											if (res.code == '200') {
												this.$Message.success(`删除成功`)
												this.tableLoad()
											} else {
												this.$Message.warning(res.msg)
											}
										})
										.catch(err => {
											this.$Message.error(`错误：${err}`)
										})
								}
							})
						}
					}
				}),
				h(
					'com-button',
					{
						attrs: {
							type: 'confirm',
							size: 'large',
							icon: 'ios-aperture-outline'
						},
						on: {
							click: () => {
								this.currentDev = row
								this.devModal.set(true, 'devFunction', '模型功能')
							}
						}
					},
					'模型功能'
				),
				h(
					'com-button',
					{
						attrs: {
							type: 'confirm',
							size: 'large',
							icon: 'ios-browsers-outline'
						},
						on: {
							click: () => {
								this.handleRelevancySubsystem(row)
							}
						}
					},
					'关联子系统'
				),
				h(
					'com-button',
					{
						attrs: {
							type: 'confirm',
							size: 'large',
							icon: 'md-grid'
						},
						on: {
							click: () => {
								this.handleSetModule(row)
							}
						}
					},
					'展示类型'
				)
			])
		}
		return {
			http: this.$api.deviceType,
			enums: null,
			getComHeightMain: null,

			// 分页
			pageConfig: { total: 0, page: 1, pageSize: 20 },
			// 模态框
			devModal: new ModalConfig(),
			// 查询条件
			searchParams: {
				vcName: '',
				isEnable: 'all'
			},
			pageFlag: false,
			pageShow: true,
			subModuelShow: false,
			subModuelData: {},

			devForm: {
				devTypeId: '',
				vcName: '',
				vcCode: '',
				levelType: '',
				vcIcon: '',
				sort: 0,
				isEnable: '1',
				vcMemo: '',
				type: '0'
			},
			devFormItems: [
				{
					label: '名称',
					prop: 'vcName',
					rules: [
						{ required: true, message: '该项为必填项', trigger: 'change' },
						{ pattern: /^.{0,63}$/, message: '最多输入64字', trigger: 'change' }
					]
				},
				{
					label: '模型ID',
					prop: 'devTypeId',
					rules: [
						{ required: true, message: '该项为必填项', trigger: 'change' },
						{ pattern: /^[0-9]\d*$/, message: '请正确输入数字ID', trigger: 'change' },
						{ pattern: /^.{0,10}$/, message: '最多输入10位', trigger: 'change' }
					],
					disabled: false
				},
				{
					label: '编码',
					prop: 'vcCode',
					rules: [{ pattern: /^.{0,63}$/, message: '最多输入64字', trigger: 'change' }]
				},
				{
					label: '类型',
					prop: 'type',
					type: 'select',
					setings: { value: 'id', label: 'value' },
					options: []
				},
				{
					label: '设备等级',
					prop: 'levelType',
					type: 'select',
					setings: { value: 'id', label: 'value' },
					options: [],
					rules: [{ required: true, message: '该项为必选项', trigger: 'blur' }]
				},
				{ label: '默认图标', prop: 'vcIcon', rules: [{ pattern: /^.{0,31}$/, message: '最多输入32字', trigger: 'change' }] },
				{ label: '排序', prop: 'sort', rules: [{ pattern: /^[0-9]\d*$/, message: '请正确输入排序数字', trigger: 'change' }] },
				{
					label: '状态',
					prop: 'isEnable',
					type: 'radio',
					options: [
						{
							value: '1',
							label: '启用'
						},
						{
							value: '0',
							label: '禁用'
						}
					],
					rules: [{ required: true, message: '该项为必选项', trigger: 'change' }]
				},
				{ label: '备注', prop: 'vcMemo', type: 'textarea', rules: [{ pattern: /^.{0,63}$/, message: '最多输入64字', trigger: 'change' }] }
			],

			columns: [
				{ label: '模型名称', prop: 'vcName' },
				{ label: '模型ID', prop: 'devTypeId' },
				{ label: '设备等级', prop: 'levelType1' },
				{ label: '编码', prop: 'vcCode' },
				{ label: '类型', prop: 'typeHtml', width: 80 },
				{ label: '默认图标', prop: 'vcIcon', width: 140 },
				{ label: '排序', prop: 'sort', width: 80 },
				{ label: '状态', prop: 'isEnableHtml', width: 120 },
				{ label: '备注', prop: 'vcMemo' },
				{ label: '操作', prop: 'operation', width: 600, render: renderOperation }
			],
			tableData: [],
			LevelTypeList: [],

			// 关联子系统
			filterText: '',
			subsList: [],
			currentDev: null
		}
	},
	computed: {},
	filters: {},
	watch: {
		'devModal.show'(val) {
			if (!val) {
				if (this.devModal.type == 'add' || this.devModal.type == 'edit') {
					let obj = {
						sort: 0,
						isEnable: '1',
						type: '0'
					}
					this.devForm.levelType = this.devFormItems[4].options[0].id

					this.resetComForm(this.devForm, obj, 'dev-info-form')

					// 设置 模型 ID 可用用
					let targetIndex = this.getTargetIndexByKey(this.devFormItems, 'prop', 'devTypeId')
					this.devFormItems[targetIndex].disabled = false
				} else if (this.devModal.type == 'linkSubs') {
					this.handleSetCheckedKeys('subs-list-tree', [])
					this.filterText = ''
				}
			}
		},
		filterText(newVal) {
			this.$refs['subs-list-tree'].filter(newVal)
		},
		searchParams: {
			handler(newVal, oldVal) {
				console.log(newVal)
				if (newVal.isEnable == 'all' && newVal.vcName == '') {
					this.pageFlag = false
				} else {
					// this.pageFlag = false
				}
			},
			deep: true
		}
	},
	created() {
		// 初始化
		this.init()
	},
	mounted() {
		//  监听窗口变化
		this.getComHeightMain = this.getComHeight('subsystem', 'searche-header-wrapper')
		this.$nextTick(() => {
			this.getComHeightMain()
		})
		window.addEventListener('resize', this.getComHeightMain)
	},
	activited() {},
	update() {},
	beforeDestroy() {},
	methods: {
		// 初始化
		init() {
			// 获取本地 定义的枚举 数据
			this.$api.getLocalData().then(res => {
				this.enums = res.data

				// 设置 待选类型数据
				let targetIndex = this.getTargetIndexByKey(this.devFormItems, 'prop', 'type')
				this.devFormItems[targetIndex].options = this.enums.devTypeList
				console.log(this.enums.devTypeList)

				// 加载 table
				this.tableLoad()
			})

			// 子系统列表
			this.getAllSubsystemList()

			this.getDict()
			// console.log(this.LevelTypeOptions)
		},
		reset() {
			let obj = {
				isEnable: 'all'
			}
			this.initFormDataAtClose(this.searchParams, obj)
			this.tableLoad()
		},
		// 加载 table
		tableLoad(type) {
			if (type == 1) {
				this.pageFlag = true
			}
			// let { page: currentPage, pageSize } = this.pageConfig
			// let { vcName, isEnable } = this.searchParams

			let params = {}
			;(params.isPage = 1),
				(params.currentPage = type == 1 ? 1 : this.pageConfig.page),
				(params.pageSize = this.pageConfig.pageSize),
				(params.vcName = this.searchParams.vcName),
				(params.isEnable = this.searchParams.isEnable == 'all' ? '' : this.searchParams.isEnable - 0),
				(params.findFlag = 1)

			if (!this.pageFlag) {
				console.log(params)
				params.vcName = ''
				params.isEnable = ''
			}
			this.http.getDevTypeList(params).then(res => {
				if (res.code == '200') {
					let data = res.data
					this.$set(this.pageConfig, 'total', data.page.totalNum)
					this.pageConfig.total = data.page.totalNum

					this.tableData = data.lists.map(item => {
						item['isEnableHtml'] =
							item['isEnable'] == 1 ? this.returnHtmlString('span', '启用', '#19be6b') : this.returnHtmlString('span', '禁用', '#ff9900')

						item['isEnable'] = `${item['isEnable'] || 0}`

						for (let i = 0; i < this.LevelTypeList.length; i++) {
							if (item.levelType == this.LevelTypeList[i].id) {
								item.levelType1 = this.LevelTypeList[i].value
							}
						}

						let index = this.enums.devTypeList.findIndex(v => v.id == item['type'])
						if (index != -1) item['typeHtml'] = this.enums.devTypeList[index].value

						return item
					})
				}
			})
		},
		// 获取所有子系统
		async getAllSubsystemList() {
			let params = {
				currentPage: 1,
				pageSize: 50000
			}

			let res = await this.http.getAllSubsystemList(params)

			if (res.code == '200') {
				this.subsList = res.data.lists.map(item => {
					item['id'] = item['subSystemId']
					return item
				})
			}
		},
		// 点击关联子系统
		handleRelevancySubsystem(row) {
			if (!this.subsList.length) {
				this.$Message.error('暂无子系统可选')
				return
			}
			this.currentDev = row

			let params = {
				devTypeId: row.devTypeId
			}
			// 获取当前模型所关联的 子系统 并在 tree 中选中
			this.http.getDevTypeRelevancySub(params).then(res => {
				if (res.code == '200') {
					this.devModal.set(true, 'linkSubs', '关联子系统')
					let arr = res.data.lists.map(item => {
						return item.subSystemId
					})

					this.$nextTick(() => {
						this.handleSetCheckedKeys('subs-list-tree', arr)
					})
				} else {
					this.$Message.warning('获取关联的子系统失败')
				}
			})
		},
		// 模态框确认
		handleModalConfirm(type, name) {
			if (type == 'add' || type == 'edit') {
				this.validateComForm(name, () => {
					this.addOrEditInfo(type)
				})
			} else if (this.devModal.type == 'linkSubs') {
				this.relevancySubsystemConfirm()
			}
		},
		// 增加 || 修改模型信息
		async addOrEditInfo(type) {
			let params = { ...this.devForm }
			let text = ''
			let requestType = ''
			type == 'add' ? ((text = '添加'), (requestType = 'addDevType')) : ((text = '编辑'), (requestType = 'editDevType'))

			params['isEnable'] = params['isEnable'] - 0
			params['type'] = Number(params['type'])

			const res = await this.http[requestType](params)
			if (res.code == '200') {
				this.$Message.success(`${text}成功`)
				this.devModal.set(false)
				this.tableLoad()
			} else this.$Message.warning(res.msg)
		},

		// 关联子系统 确认
		relevancySubsystemConfirm() {
			let params = {
				devTypeId: this.currentDev.devTypeId,
				subSystemIds: this.$refs['subs-list-tree'].getCheckedKeys()
			}

			this.http
				.devTypeRelevancySub(params)
				.then(res => {
					if (res.code == '200') {
						this.$Message.success('关联成功')
						this.devModal.set(false)
					} else {
						this.$Message.warning(res.msg)
					}
				})
				.catch(err => {
					this.$Message.error(`错误：${err}`)
				})
		},
		// 分页改变
		handleChangePage(page) {
			// if (this.pageFlag) {
			this.pageConfig.page = page
			this.tableLoad()
			// } else {
			// 	this.pageConfig.page = 1
			// 	this.tableLoad()
			// 	this.pageFlag = true
			// 	this.pageShow = false
			// 	setTimeout(() => {
			// 		this.pageShow = true
			// 	}, 50)
			// }
		},
		getDict() {
			this.http.findDicList({ dictGroupID: 1004 }).then(res => {
				if (res.code == 200 && res.data) {
					for (let i = 0; i < res.data.length; i++) {
						// let obj = { label: res.data[i].vcName, value: i + '' }
						let obj = { value: res.data[i].vcName, id: res.data[i].dictID + '' }
						this.devFormItems[4].options.push(obj)
						this.LevelTypeList.push(obj)
					}
					this.devForm.levelType = this.devFormItems[4].options[0].id
				}
			})
		},
		setDevForm(row) {
			// console.log(row)
			// this.devForm.levelType = row.levelType+''
		},
		handleSetModule(row) {
			this.subModuelData = row
			this.subModuelShow = true
			// console.log(row)
		},
		modalSwithc(data) {
			this.subModuelShow = data
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		window.removeEventListener('resize', this.getComHeightMain)
		next()
	}
}
</script>
<style lang="stylus" scoped>
.subsystem {
  height: 100%;

  /deep/ .table-main {
    .ivu-page {
      flex-align(center);
    }
  }
}

.tree-wrapper {
  height: 400px;
  position: relative;

  > div {
    height: 100%;
    overflow-y: auto;
    padding-top: 36px;
  }

  /deep/ .el-input {
    position: absolute;
    top: 0;
    z-index: 99;

    .el-input__inner {
      height: 34px;
    }
  }
}

.table-main {
  height: calc(100vh - 220px);
}
</style>
