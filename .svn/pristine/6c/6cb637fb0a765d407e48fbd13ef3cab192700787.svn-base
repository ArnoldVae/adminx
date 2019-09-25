<template>
	<div class="module-managa">
		<searche-header-wrapper>
			<div class="form-container">
				<!-- 模块名称 -->
				<form-item title="模块名称" type="text" v-model="params.moduleName" placeholder="输入模块名称搜索" :clearable="true"></form-item>
				<!-- 执行对象 -->
				<form-item title="执行对象" type="text" placeholder="输入执行对象搜索" v-model="params.executeTarget" :clearable="true"></form-item>

				<!-- 模块类型 -->
				<form-item
					title="模块类型"
					type="select"
					v-model="params.moduleType"
					:options="[{ value: 'all', label: '全部' }, ...enums.moduleType]"
					:setings="{ value: 'value', label: 'vcName' }"
				></form-item>

				<!-- 模块功能类型 -->
				<!-- <form-item title="模块功能类型" type="slot" class="module-group-tree-wrapper">
          <tree-select
            v-model="params.parentId"
            :options="[{ id: 'all', title: '全部', children: [] }, ...(moduleGroupSourceTree != '' ? JSON.parse(moduleGroupSourceTree) : [])]"
            style="width: 220px;"
          ></tree-select>
        </form-item>-->

				<!-- 是否启用 -->
				<is-enabler-select v-model="params.mdStatus"></is-enabler-select>

				<!-- 查询按钮 -->
				<div style="width: 100%;">
					<com-button size="large" type="search" style="margin-right: 20px;" @click="tableLoad"></com-button>
					<com-button size="large" type="reset" style="margin-right: 50px;" @click="resetData"></com-button>
					<com-button size="large" type="add" style="margin-right: 20px;" @click="addModuleHandler('module')">新增模块</com-button>
					<!-- <com-button
            size="large"
            type="add"
            style="margin-right: 20px;"
            @click="addModuleHandler('moduleGroup')"
          >新增模块组</com-button>-->
				</div>
			</div>
		</searche-header-wrapper>
		<!-- 表格 -->
		<main class="table-main">
			<div>
				<element-table
					ref="module-tree-table"
					:columns="columns"
					:data="data"
					border
					row-key="id"
					@row-click="row => handleTableRowClick('module-tree-table', row)"
					default-expand-all
					:row-class-name="setRowClassName"
				></element-table>
			</div>
		</main>

		<!-- 添加 or 修改的 模态框 -->
		<Modal v-model="moduleModal.show" :title="moduleModal.title" class-name="add-edit-module-modal" width="650" :mask-closable="false">
			<Form :model="moduleForm" :rules="ruleValidate" :label-width="80" ref="module-form">
				<div class="flex-box">
					<!-- 模块功能类型 必填 -->
					<FormItem label="父节点" prop="parentId" :rules="[{ required: true, message: '该项为必填项', trigger: 'change' }]">
						<Input v-model="moduleForm.parentId" style="display: none;" />

						<tree-select
							v-model="moduleForm.parentId"
							:options="moduleGroupSourceTree != '' ? JSON.parse(moduleGroupSourceTree) : []"
						></tree-select>
					</FormItem>
					<!-- 模块名称 必填 -->
					<FormItem label="模块名称" prop="mdName" :rules="[{ required: true, message: '该项为必填项', trigger: 'change' }]" class="isMust">
						<Input v-model="moduleForm.mdName" placeholder="请输入..." />
					</FormItem>

					<!-- 模块类型 必填 -->
					<FormItem label="模块类型" prop="mdType" :rules="[{ validator: validateInput, trigger: 'change' }]" class="isMust">
						<Select v-model="moduleForm.mdType" :disabled="itemIsDis">
							<Option v-for="item in enums.moduleType" :value="`${item.value}`" :key="item.value">{{ item.vcName }}</Option>
						</Select>
					</FormItem>

					<!-- 执行对象 必填 -->
					<FormItem label="执行对象" prop="executeTarget" :rules="[{ validator: validateInput, trigger: 'change' }]" class="isMust">
						<Input v-model="moduleForm.executeTarget" placeholder="请输入..." :disabled="itemIsDis" />
					</FormItem>

					<!-- 执行参数 -->
					<FormItem label="执行参数" prop="executeParams">
						<Input v-model="moduleForm.executeParams" placeholder="请输入..." :disabled="itemIsDis" />
					</FormItem>

					<!-- 排列序号 -->
					<FormItem label="排序" prop="sortIndex" class="isMust">
						<Input v-model="moduleForm.sortIndex" placeholder="请输入..." width="200px" />
					</FormItem>

					<!-- 图片-->
					<FormItem label="图标">
						<Input v-model="moduleForm.imgUrl" placeholder="请输入..." width="200px" />
					</FormItem>
				</div>

				<!-- 是否启用 -->
				<FormItem label="是否启用" prop="mdStatus">
					<RadioGroup v-model="moduleForm.mdStatus">
						<Radio :label="1">启用</Radio>
						<Radio :label="0">禁用</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 备注 -->
				<FormItem label="备注">
					<Input v-model="moduleForm.textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入..." />
				</FormItem>
			</Form>

			<modal-footer slot="footer" @on-cancel="$set(moduleModal, 'show', false)" @on-confirm="handleSubmit('module-form')"></modal-footer>
		</Modal>

		<!-- 模块组的操作 模态框 -->
		<Modal v-model="moduleGroupModal.show" :title="moduleGroupModal.title" class-name="module-group-modal" :mask-closable="false">
			<Form ref="module-group-form" :model="moduleGroupForm" :label-width="100">
				<FormItem label="名称" prop="name" :rules="[{ required: true, message: '该项为必填项', trigger: 'change' }]">
					<Input v-model="moduleGroupForm.name" />
				</FormItem>

				<FormItem label="所属模块区域" prop="parentId" :rules="[{ required: true, message: '该项为必填项', trigger: 'change' }]">
					<Input v-model="moduleGroupForm.parentId" style="display: none;" />

					<tree-select
						v-model="moduleGroupForm.parentId"
						:options="[{ id: '0', title: '无', children: [] }, ...(moduleGroupSourceTree != '' ? JSON.parse(moduleGroupSourceTree) : [])]"
						:disabled="isNotParentGroup"
					></tree-select>
				</FormItem>

				<FormItem label="模块区域类型">
					<Select v-model="moduleGroupForm.moduleGroupTypeId">
						<Option v-for="item in enums.moduleAreaType" :value="`${item.value}`" :key="item.value">{{ item.vcName }}</Option>
					</Select>
				</FormItem>

				<FormItem label="排序">
					<Input v-model="moduleGroupForm.sort" type="number" />
				</FormItem>

				<FormItem label="是否启用">
					<RadioGroup v-model="moduleGroupForm.isEnable">
						<Radio :label="1">启用</Radio>
						<Radio :label="0">禁用</Radio>
					</RadioGroup>
				</FormItem>

				<FormItem label="备注">
					<Input v-model="moduleGroupForm.vcMemo" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入..." />
				</FormItem>
			</Form>

			<modal-footer slot="footer" @on-cancel="$set(moduleGroupModal, 'show', false)" @on-confirm="modulGroupConfirm('module-group-form')"></modal-footer>
		</Modal>
	</div>
</template>
<script>
import TreeSelect from '_c/business/tree-select'
import enums from './enums.json'
import elementTable from '_b/element-table'
import mixinTolls from '@common/mixin/tools'
export default {
	name: 'module-managa',
	mixins: [mixinTolls],
	components: {
		TreeSelect,
		elementTable
	},
	props: {},
	data() {
		// render 创建 操作
		const renderAction = (h, params) => {
			return h('div', [
				h('com-button', {
					style: {
						marginRight: '10px'
					},
					attrs: {
						type: 'edit',
						size: 'large'
					},
					on: {
						click: e => {
							e.stopPropagation()

							params.row.isGroup == 0 ? this.editModuleGroupHandler(params.row) : this.editModuleHandler(params.row)
						}
					}
				}),
				h('com-button', {
					attrs: {
						type: 'delete',
						size: 'large'
					},
					on: {
						click: e => {
							e.stopPropagation()

							let reqParams = null
							let requestType = ''
							let text = ''

							if (params.row.isGroup == 0) {
								reqParams = { moduleGroupId: params.row.id.replace(/[^0-9]/gi, '') - 0 }
								requestType = 'deleteModuleGroup'
								text = '模块组'
							} else {
								reqParams = { moduleId: params.row.id - 0 }
								requestType = 'deleteModule'
								text = '模块'
							}

							this.$Modal.confirm({
								title: '确认',
								content: `<p>是否确认删除${text}</p>`,
								onOk: () => {
									this.http[requestType](reqParams).then(res => {
										if (res.code == '200') {
											this.tableLoad()
											this.$Message.success(`删除${text}成功`)
										} else {
											this.$Message.warning(res.msg)
										}
									})
								}
							})
						}
					}
				})
			])
		}
		// render 模块名称 + 图标
		const renderIconName = (h, params) => {
			let row = params.row
			if (row.parentId == 0) {
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
					h('span', row.mdName)
				])
			} else {
				return h('span', [
					h('i', {
						class: {
							'el-icon-menu': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.mdName)
				])
			}
		}

		return {
			enums,
			http: this.$api.moduleManaga,

			// 模块组
			moduleGroupModal: {
				show: false,
				type: '',
				title: ''
			},
			moduleGroupForm: {
				moduleGroupId: '',
				name: '',
				parentId: '0',
				moduleGroupTypeId: '0',
				sort: '0',
				isEnable: 1,
				vcMemo: ''
			},

			// 模块
			moduleModal: {
				show: false,
				type: '',
				title: ''
			},
			params: {
				moduleName: '',
				executeTarget: '',
				moduleType: 'all',
				parentId: 'all',
				mdStatus: 'all'
			},
			mdFunTypeAllLiist: [], // 所有功能类型 lsit
			mdDirAllList: [], // 所有模块文件夹

			moduleForm: {
				mdName: '',
				mdType: '0',
				executeTarget: '',
				executeParams: '',
				parentId: '0',
				sortIndex: '0',
				flag: '',
				imgUrl: '',
				BigImgUrl: '',
				mdStatus: 1,
				textarea: '',
				moduleID: ''
			},
			// 搜索 && 表单 枚举数据
			mdTypeList: [], // 模块类型 list
			mdFunTypeSourceList: '', // 模块功能类型 list source
			mdFunTypeList: [], // 模块功能类型 list 数据
			mdDirList: [], // 模块文件夹 list
			isMdDirDis: true, // 模块文件夹 disabled falg
			itemIsDis: false, // 当模块功能类型选择 无 时禁用掉部分 input
			moduleGroupSourceTree: '',
			isNotParentGroup: false,

			// 树表格 数据
			columns: [
				{ label: '模块名称', prop: 'mdName', align: 'left', width: 220, render: renderIconName },
				{ label: '模块类型', prop: 'mdType', width: 120 },
				{ label: '执行对象', prop: 'executeTarget' },
				{ label: '执行参数', prop: 'executeParams', width: 200 },
				// { label: '模块功能类型', prop: 'mdFunType', width: 200 },
				{ label: '排序', prop: 'sortIndex', width: 60 },
				{ label: '状态', prop: 'mdStatusHtml', width: 100 },
				{ label: '备注', prop: 'textarea' },
				{ label: '操作', prop: 'action', width: 240, render: renderAction }
			],
			ruleValidate: {
				sortIndex: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^[0-9]\d*$/, message: '请正确输入数字排序', trigger: 'change' }
				]
			},
			data: []
		}
	},
	computed: {},
	filters: {},
	watch: {
		'moduleModal.show'(val) {
			let obj = {
				mdStatus: 1,
				mdType: '0',
				sortIndex: '0',
				parentId: '0'
			}
			if (!val) this.initFormDataAtClose(this.moduleForm, obj, 'module-form')
		},
		'moduleGroupModal.show'(val) {
			let obj = {
				isEnable: 1,
				parentId: '0',
				moduleGroupTypeId: '0',
				sort: '0'
			}
			if (!val) this.initFormDataAtClose(this.moduleGroupForm, obj, 'module-group-form')
		}
	},
	created() {
		this.init()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 初始化调用
		init() {
			// 获取表格数据
			this.tableLoad()

			//  获取 模块组 树形数据
			// this.getTreeModuleGroup()
		},
		// 初始化 form 表单
		initFormDataAtClose(source, obj, form) {
			if (form) this.$refs[form].resetFields()

			for (let k in source) {
				if (
					Object.keys(obj).findIndex(item => {
						return item == k
					}) == -1
				) {
					source[k] = ''
				} else {
					source[k] = obj[k]
				}
			}
		},
		// 模块 模态框 form 验证规则 ---------
		validateInput(rule, value, callback) {
			if (this.itemIsDis) {
				callback()
			} else if (value != '') {
				callback()
			} else {
				callback(new Error('该项为必填项'))
			}
		},
		// 重置 查询条件
		resetData() {
			let obj = {
				moduleType: 'all',
				parentId: 'all',
				mdStatus: 'all'
			}
			this.initFormDataAtClose(this.params, obj)
			this.tableLoad()
		},
		// 获取表格数据 && 查询
		tableLoad() {
			let localParams = this.params

			let params = {
				vcCaption: localParams.moduleName, // 模块名称查询
				vcExecuteObject: localParams.executeTarget, // 执行对象查询
				moduleType: localParams.moduleType, // 模块类型查询
				parentId: localParams.parentId, // 模块功能类型
				iIsEnable: localParams.mdStatus // 是否启用
			}

			params = this.deleteObjNullItem(params)

			for (let k in params) {
				if (k == 'moduleType' || k == 'parentId' || k == 'iIsEnable') params[k] = params[k] - 0
			}

			if (Object.keys(params).length > 0) {
				params['isSearch'] = 1
			} else {
				params['isSearch'] = 0
			}

			this.http.getTreeInfoList(params).then(res => {
				if (res.code == '200') {
					this.data = this.mapSourceToData(res.data)
					// console.log(this.data)
					let dataObj = JSON.parse(JSON.stringify(res.data)) ? JSON.parse(JSON.stringify(res.data)) : []
					dataObj.unshift({ id: '0', title: '无', children: [] })
					this.moduleGroupSourceTree = JSON.stringify(this.filterModuleGroupTree(dataObj))
				}
			})
		},
		// 表格行的类名
		setRowClassName(data) {
			if (data.row.parentId == 0) {
				return 'rootNode'
			}
		},

		// 源数据映射为需要的数据
		mapSourceToData(source) {
			return source.map(item => {
				let mdType = ''
				this.enums.moduleType.forEach(v => {
					if (v.value == item.moduleType) mdType = v.vcName
				})

				let mdStatusHtml = item['iIsEnable'] == 1 ? this.returnHtmlString('span', '启用', '#19be6b') : this.returnHtmlString('span', '禁用', '#ff9900')

				let obj = {
					id: item.id,
					pid: item.pid,
					mdName: item.text,
					mdType,
					executeTarget: item.vcExecuteObject,
					executeParams: item.vcExecuteParams,
					parentId: item.parentId, // 模块功能类型
					sortIndex: item.iSort, // 序号
					mdStatus: item.iIsEnable, // 状态
					mdStatusHtml, // 状态样式
					textarea: item.vcMemo, // 备注
					isGroup: item.isGroup,
					source: item,
					expand: true
				}
				if (item.children.length == 0) {
					return { ...obj, children: [] }
				} else {
					return {
						...obj,
						children: this.mapSourceToData(item.children)
					}
				}
			})
		},

		// 添加 模块 && 模块组 按钮
		addModuleHandler(type) {
			switch (type) {
				case 'module':
					this.setModalShow('moduleModal', 'add', '添加模块')
					break
				case 'moduleGroup':
					this.setModalShow('moduleGroupModal', 'add', '添加模块组')
					break
			}
		},

		// 修改 模块 handle
		editModuleHandler(row) {
			let data = row.source
			let obj = {
				mdName: data.title,
				mdType: data.moduleType,
				executeTarget: data.vcExecuteObject,
				executeParams: data.vcExecuteParams,
				parentId: data.parentId || '',
				sortIndex: data.iSort,
				imgUrl: data.vcImage,
				mdStatus: data.iIsEnable - 0,
				textarea: data.vcMemo,
				moduleID: data.id
			}
			Object.keys(obj).forEach(key => {
				this.$set(this.moduleForm, key, obj[key])
			})
			this.setModalShow('moduleModal', 'edit', '编辑模块')
		},
		// 修改模块组
		editModuleGroupHandler(row) {
			let data = row.source

			let obj = {
				name: data.text,
				parentId: data.pid.replace(/[^0-9]/gi, ''),
				moduleGroupTypeId: '0',
				sort: data.iSort,
				isEnable: data.iIsEnable - 0,
				vcMemo: data.vcMemo,
				moduleGroupId: data.id.replace(/[^0-9]/gi, '') - 0
			}

			if (obj.parentId == 0) {
				this.isNotParentGroup = true
			} else {
				this.isNotParentGroup = false
			}

			Object.keys(obj).forEach(key => {
				this.$set(this.moduleGroupForm, key, obj[key])
			})

			this.setModalShow('moduleGroupModal', 'edit', '编辑模块组')
		},

		// 模块 弹框 确认
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					const localForm = this.moduleForm

					let params = {
						vcCaption: localForm.mdName, //  模块名称
						moduleType: localForm.mdType - 0, //  模块类型
						vcExecuteObject: localForm.executeTarget, // 执行对象
						vcExecuteParams: localForm.executeParams, // 启动参数
						parentId: localForm.parentId - 0, // 组 id
						iSort: localForm.sortIndex, // 排列序号
						vcImage: localForm.imgUrl, // 模块图标
						iIsEnable: localForm.mdStatus, // 是否启用
						vcMemo: localForm.textarea // 备注
					}

					let text = ''
					this.moduleModal.type == 'add'
						? ((params['isSave'] = 0), (text = '添加'))
						: ((params['isSave'] = 1), (params['moduleId'] = localForm.moduleID), (text = '编辑'))

					// console.log('模块操作 模态框参数：', params)

					this.http.addOrEditModuleRequest(params).then(res => {
						if (res.code == '200') {
							this.$Message.success(`${text}模块成功`)
							this.tableLoad()
							this.setModalShow('moduleModal', '', '', false)
						} else {
							this.$Message.warning(res.msg)
						}
					})
				} else {
					this.$Message.warning('有必填项未填写, 请填写完整')
				}
			})
		},
		// 模块组 弹框 确认
		modulGroupConfirm(name) {
			this.$refs[name].validate(valid => {
				const localForm = this.moduleGroupForm
				const type = this.moduleGroupModal.type

				if (valid) {
					let params = {
						parentId: localForm.parentId - 0,
						vcName: localForm.name,
						iSort: localForm.sort - 0,
						iIsEnable: localForm.isEnable,
						iType: localForm.moduleGroupTypeId - 0,
						vcMemo: localForm.vcMemo
					}
					let text = ''
					type == 'add'
						? ((params['isSave'] = 0), (text = '添加'))
						: ((params['isSave'] = 1), (text = '编辑'), (params['moduleGroupId'] = localForm.moduleGroupId))

					// console.log('编辑模块组 params:', params)

					this.http.addOrEditModuleGroup(params).then(res => {
						if (res.code == '200') {
							this.$Message.success(`${text}模块组成功`)
							this.tableLoad()
							// this.getTreeModuleGroup()
							this.setModalShow('moduleGroupModal', '', '', false)
						} else this.$Message.warning(res.msg)
					})
				} else {
					this.$Message.warning('有必填项未填写, 请填写完整')
				}
			})
		},

		// 清除 obj 的空属性
		deleteObjNullItem(obj) {
			for (let k in obj) {
				if (obj[k] == '' || obj[k] == 'all') {
					delete obj[k]
				}
			}
			return obj
		},

		// 设置 指定 modal 的属性字段
		setModalShow(source, type, title, open) {
			this.$set(this[source], 'show', true)
			this.$set(this[source], 'type', type)
			this.$set(this[source], 'title', title)

			if (open === false) this.$set(this[source], 'show', false)
		},

		// 过滤模块分组数据
		filterModuleGroupTree(data) {
			return data.map(item => {
				let obj = {
					id: item.id + '',
					pid: item.pid,
					title: item.title,
					source: item,
					expand: true
				}
				if (item.children.length == 0) {
					return { ...obj, children: [] }
				} else {
					return {
						...obj,
						children: this.filterModuleGroupTree(item.children)
					}
				}
			})
		},
		// 获取模块组 tree 数据
		getTreeModuleGroup() {
			this.http.getTreeModuleGroup().then(res => {
				if (res.code == '200') {
					// this.moduleGroupSourceTree = JSON.stringify(this.filterModuleGroupTree(res.data))
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
.module-managa {
  height: 100%;

  .form-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    /deep/.ivu-select-dropdown {
      z-index: 1000;
    }
  }

  /deep/ .table-main {
    position: relative;
    width: 100%;
    height: calc(100% - 114px);
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
    }
  }
}
</style>
<style lang="stylus">
.add-edit-module-modal {
  .ivu-modal-body {
    padding-left: 30px;
    padding-right: 30px;
  }

  .flex-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .ivu-form-item {
      width: 49%;
    }

    .labelLong {
      .ivu-form-item-label {
        text-align: left;
        padding-right: 0;
        transform: translateX(-24px);
        white-space: nowrap !important;
      }
    }
  }

  .isMust {
    .ivu-form-item-label {
      &::before {
        content: '*';
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed4014;
      }
    }
  }
}
.table-main {
  height: calc(100vh - 300px) !important;
}
</style>
