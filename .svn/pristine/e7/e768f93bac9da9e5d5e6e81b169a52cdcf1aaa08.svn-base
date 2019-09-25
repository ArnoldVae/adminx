<template>
	<div class="systems-config">
		<div class="systems-content">
			<div class="top-search">
				<searche-Header-Wrapper>
					<form-item
						title="关键字"
						type="text"
						v-model="searchData.searchKye"
						placeholder="输入关键字搜索"
						@on-enter="searchConfig"
						clearable
						noMBottom
					></form-item>
					<form-item
						title="描述"
						type="text"
						v-model="searchData.searchInfo"
						placeholder="输入描述搜索"
						@on-enter="searchConfig"
						clearable
						noMBottom
					></form-item>
					<form-item
						title="值"
						type="text"
						v-model="searchData.searchVal"
						placeholder="输入值搜索"
						@on-enter="searchConfig"
						clearable
						noMBottom
					></form-item>
					<form-item
						title="状态"
						type="select"
						v-model="searchData.searchSwitch"
						:options="cityList"
						:setings="{ value: 'value', label: 'label' }"
						noMBottom
					></form-item>

					<Button type="info" size="large" icon="md-search" @click="searchConfig(1)">查询</Button>
					<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
					<Button type="success" size="large" icon="md-add" @click="addDataConfig">新增</Button>
					<Button type="error" size="large" icon="md-trash" @click="removeConfig(0)">批量删除</Button>
				</searche-Header-Wrapper>
			</div>
			<div class="table-content">
				<Table
					border
					ref="selection"
					:columns="tableColumns"
					:data="tableData"
					@on-selection-change="selectAll"
					@on-row-dblclick="dblclick"
					:height="650"
				></Table>

				<div class="table-page">
					<div class="page-content">
						<Page
							@on-change="handleChangePage"
							@on-page-size-change="handleChangePageSize"
							:total="total"
							:current="page"
							:page-size="pageSize"
							show-elevator
							show-total
							show-sizer
							v-if="pageShow"
						/>
					</div>
				</div>
			</div>

			<!-- 新增弹窗 -->
			<Modal v-model="modalShow" title="新增" @on-ok="saveConfig(0)" :mask-closable="false">
				<Form ref="add-form" :rules="ruleValidate" :model="addFormData" :label-width="70" label-position="right">
					<!-- 关键字 -->
					<FormItem label="关键字" prop="vcKey">
						<Input v-model="addFormData.vcKey" placeholder="请输入..." style="width: 400px" />
					</FormItem>

					<!-- 描述 -->
					<FormItem label="描述" prop="vcDesc">
						<Input v-model="addFormData.vcDesc" placeholder="请输入..." style="width: 400px" />
					</FormItem>
					<!-- 值 -->
					<FormItem label="值" prop="vcValue">
						<Input v-model="addFormData.vcValue" placeholder="请输入..." style="width: 400px" />
					</FormItem>
					<!-- 是否启用 -->
					<FormItem label="状态">
						<RadioGroup v-model="addFormData.iIsEnable">
							<Radio label="1" value="1">启用</Radio>
							<Radio label="0" value="0">禁用</Radio>
						</RadioGroup>
					</FormItem>

					<!-- 标识 -->
					<FormItem label="标识" prop="iFlag">
						<Input v-model="addFormData.iFlag" style="width: 400px" placeholder="请输入..." />
					</FormItem>
					<FormItem label="排序" prop="iSort">
						<Input v-model="addFormData.iSort" style="width: 400px" placeholder="请输入..." />
					</FormItem>

					<!-- 备注 -->

					<FormItem label="备注" prop="vcMemo">
						<Input v-model="addFormData.vcMemo" placeholder="请输入..." style="width: 400px" />
					</FormItem>
				</Form>

				<div slot="footer">
					<Button type="text" size="large" @click="modalCancel">取消</Button>
					<Button type="primary" :loading="btnLoading" size="large" @click="saveConfig(0)">确认</Button>
				</div>
			</Modal>
			<!-- 修改弹窗 -->
			<Modal v-model="upModalShow" title="修改" @on-ok="saveConfig(1)" :mask-closable="false">
				<Form ref="up-form" :model="upFormData" :label-width="70" label-position="right" :rules="ruleValidate">
					<!-- 关键字 -->
					<FormItem label="关键字" prop="vcKey">
						<Input v-model="upFormData.vcKey" placeholder="请输入..." style="width: 400px" disabled />
					</FormItem>

					<!-- 描述 -->
					<FormItem label="描述" prop="vcDesc">
						<Input v-model="upFormData.vcDesc" placeholder="请输入..." style="width: 400px" />
					</FormItem>
					<!-- 值 -->
					<FormItem label="值" prop="vcValue">
						<Input v-model="upFormData.vcValue" placeholder="请输入..." style="width: 400px" />
					</FormItem>
					<!-- 是否启用 -->
					<FormItem label="状态">
						<RadioGroup v-model="upFormData.iIsEnable">
							<Radio label="1" value="1">启用</Radio>
							<Radio label="0" value="0">禁用</Radio>
						</RadioGroup>
					</FormItem>

					<!-- 标识 -->
					<FormItem label="标识" prop="iFlag">
						<Input v-model="upFormData.iFlag" style="width: 400px" placeholder="请输入..." />
					</FormItem>

					<FormItem label="排序" prop="iSort">
						<Input v-model="upFormData.iSort" style="width: 400px" placeholder="请输入..." />
					</FormItem>

					<!-- 备注 -->
					<FormItem label="备注" prop="vcMemo">
						<Input v-model="upFormData.vcMemo" placeholder="请输入..." style="width: 400px" />
					</FormItem>
				</Form>
				<div slot="footer">
					<Button type="text" size="large" @click="modalCancel">取消</Button>
					<Button type="primary" size="large" :loading="btnLoading" @click="saveConfig(1)">确认</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>
<script>
import mixinTolls from '../../mixin/tools'
export default {
	name: 'systems-config',
	components: {},
	mixins: [mixinTolls],
	props: {},
	data() {
		return {
			axios: this.$api.systemsConfig,
			pageFlag: false,
			btnLoading: false,
			ruleValidate: {
				// 表单验证
				vcKey: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,50}$/, message: '最多输入50字', trigger: 'change' }],
				vcValue: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,50}$/, message: '最多输入50字', trigger: 'change' }],
				vcDesc: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,50}$/, message: '最多输入50字', trigger: 'change' }],
				iFlag: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入标识数字', trigger: 'change' }],
				iSort: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入排序数字', trigger: 'change' }],
				vcMemo: [{ pattern: /^.{0,50}$/, message: '最多输入50字', trigger: 'change' }]
			},
			cityList: [
				// 搜索下拉框
				{
					value: 'all',
					label: '全部'
				},
				{
					value: '1',
					label: '启用'
				},
				{
					value: '0',
					label: '禁用'
				}
			],
			searchData: {
				searchKye: '', // 搜索关键字
				searchVal: '', // 搜索值
				searchInfo: '', // 搜索描述
				searchSwitch: 'all' // 搜索是否启用
			},

			tableColumns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '关键字',
					key: 'vcKey',
					align: 'center',
					minWidth: 100
				},
				{
					title: '描述',
					key: 'vcDesc',
					align: 'center',
					minWidth: 100
				},
				{
					title: '值',
					key: 'vcValue',
					align: 'center',
					minWidth: 100
				},
				{
					title: '状态',
					key: 'iIsEnable1',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('div', [params.row.iIsEnable == '1' ? h('p', params.row.iIsEnable1) : h('b', params.row.iIsEnable1)])
					}
				},
				{
					title: '标识',
					key: 'iFlag',
					align: 'center',
					width: 100
				},
				{
					title: '排序',
					key: 'iSort',
					align: 'center',
					width: 100
				},
				{
					title: '备注',
					key: 'vcMemo',
					align: 'center',
					minWidth: 100
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: 210,
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'warning',
										icon: 'ios-create-outline'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.upDataConfig(params)
										}
									}
								},
								'编辑'
							),

							h(
								'Button',
								{
									props: {
										type: 'error',
										icon: 'md-trash'
									},
									on: {
										click: () => {
											this.removeConfig(1, params)
										}
									}
								},
								'删除'
							)
						])
					}
				}
			],
			tableData: [], // 表格数据
			modalShow: false,
			upModalShow: false,
			addFormData: {
				// 添加的表单数据
				vcKey: '',
				vcDesc: '',
				vcValue: '',
				iIsEnable: '0',
				iFlag: '0',
				iSort: '',
				vcMemo: ''
			},
			upFormData: {
				// 修改的表单数据
			},
			removeList: [], // 准备批量删除的数据
			removeAll: [],
			// 分页数据
			pageShow: true,
			page: 1,
			total: 0,
			pageSize: 20
		}
	},
	computed: {},
	filters: {},
	watch: {
		modalShow(val) {
			// 监听弹窗关闭 关闭后重置弹窗内容
			if (!val) {
				this.$refs['add-form'].resetFields()
			}
		},
		upModalShow(val) {
			if (!val) {
				this.$refs['up-form'].resetFields()
			}
		},
		searchData: {
			handler(newVal) {
				// if (newVal.searchInfo == '' && newVal.searchKye == '' && newVal.searchSwitch == 'all' && newVal.searchVal == '') {
				this.pageFlag = false
				// } else {
				// this.pageFlag = false
				// }
			},
			deep: true
		}
	},
	created() {
		this.getTabel()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 重置查询
		handleResetData() {
			this.searchData.searchKye = '' // 搜索关键字
			this.searchData.searchVal = '' // 搜索值
			this.searchData.searchInfo = '' // 搜索描述
			this.searchData.searchSwitch = 'all' // 搜索是否启用
			this.page = 1
			this.pageSize = 20
			this.getTabel()
		},
		// 查找
		searchConfig() {
			this.pageFlag = true
			this.getTabel(1)
		},
		// 添加按钮
		addDataConfig() {
			this.addFormData.vcKey = ''
			this.addFormData.vcDesc = ''
			this.addFormData.vcValue = ''
			this.addFormData.iIsEnable = '1'
			this.addFormData.iFlag = '0'
			this.addFormData.iSort = ''
			this.addFormData.vcMemo = ''
			this.modalShow = true
		},
		// 表格修改
		upDataConfig(data) {
			console.log(data)
			this.upFormData = JSON.parse(JSON.stringify(data.row)) // 深拷贝
			this.upModalShow = true
		},
		// 双击表格修改弹窗
		dblclick(row) {
			let data = {
				row: row
			}
			this.upDataConfig(data)
		},
		// 弹窗保存
		saveConfig(data) {
			if (data == 0) {
				this.validateForm('add-form', () => {
					let num = new RegExp(/^.{0,50}$/)
					// if (
					// 	num.test(this.addFormData.vcKey) &&
					// 	num.test(this.addFormData.vcDesc) &&
					// 	num.test(this.addFormData.vcValue) &&
					// 	num.test(this.addFormData.vcMemo)
					// ) {
					this.btnLoading = true
					let params = {
						isSave: 0,
						vcKey: this.addFormData.vcKey,
						vcDesc: this.addFormData.vcDesc,
						vcValue: this.addFormData.vcValue,
						iIsEnable: this.addFormData.iIsEnable - 0,
						iFlag: this.addFormData.iFlag,
						vcMemo: this.addFormData.vcMemo,
						iSort: this.addFormData.iSort - 0,
						i_Type: 0
					}
					this.axios
						.saveConfig(params)
						.then(res => {
							if (res.code == 200 && res.success) {
								this.getTabel()
								this.$Message.success('保存成功')
								this.modalShow = false
							} else if (res.code == '-010') {
								this.$Message.error('关键字重复')
							} else {
								this.modalShow = false
								this.$Message.error(res.msg)
							}
							this.btnLoading = false
						})
						.catch(error => {
							console.log(error)
							this.btnLoading = false
						})
					// } else {
					// 	this.$Message.warning('字数超出限制')
					// }
				})
			} else {
				let reg = new RegExp(/^[0-9]\d{0,1}$/)
				// 	let num = new RegExp(/^.{0,50}$/)
				// 	if (
				// 		num.test(this.upFormData.vcDesc) &&
				// 		num.test(this.upFormData.vcValue) &&
				// 		num.test(this.upFormData.vcMemo)
				// 	) {
				this.validateForm('up-form', () => {
					this.btnLoading = true
					let params = {
						isSave: 1,
						vcKey: this.upFormData.vcKey,
						vcDesc: this.upFormData.vcDesc,
						vcValue: this.upFormData.vcValue,
						iIsEnable: this.upFormData.iIsEnable - 0,
						iFlag: this.upFormData.iFlag,
						iSort: this.upFormData.iSort - 0,
						vcMemo: this.upFormData.vcMemo
					}
					this.axios
						.saveConfig(params)
						.then(res => {
							if (res.code == 200 && res.success) {
								this.getTabel()
								this.$Message.success('保存成功')
								this.upModalShow = false
							}
							this.btnLoading = false
						})
						.catch(error => {
							console.log(error)
							this.btnLoading = false
						})
				})

				// 	} else {
				// 		this.$Message.warning('字数超出限制')
				// 	}
			}
		},
		// 弹窗取消
		modalCancel() {
			this.upModalShow = false
			this.modalShow = false
		},
		// 删除
		removeConfig(data, params) {
			if (data == 0) {
				if (this.removeList.length > 0) {
					// 批量删除
					this.$Modal.confirm({
						title: '删除',
						content: '确认删除所选项?',
						onOk: () => {
							this.axios.removeConfig(JSON.stringify(this.removeList)).then(res => {
								if (res.code == 200 && res.success) {
									this.getTabel()
									this.$Message.success('删除成功')
									this.removeList = []
								} else {
									this.$Message.warning(res.msg)
								}
							})
						},
						onCancel: () => {}
					})
				} else {
					this.$Message.warning('请选择删除项')
				}
			} else if (data == 1) {
				this.$Modal.confirm({
					title: '删除',
					content: '确认删除所选项?',
					onOk: () => {
						// 单个删除
						let removeData = [
							{
								vcKey: params.row.vcKey
							}
						]
						this.axios.removeConfig(JSON.stringify(removeData)).then(res => {
							if (res.code == 200 && res.success) {
								this.getTabel()
								this.$Message.success('删除成功')
							} else {
								this.$Message.warning(res.msg)
							}
						})
					},
					onCancel: () => {}
				})
			}
		},
		// 批量删除
		selectAll(selection) {
			this.removeList = []
			if (selection.length > 0) {
				for (let i = 0; i < selection.length; i++) {
					let obj = {}
					obj.vcKey = selection[i].vcKey
					this.removeList.push(obj)
				}
			}
		},

		// 请求表格数据
		async getTabel(type) {
			console.log(this.pageFlag)
			let params = {}

			if (!this.pageFlag) {
				params.page = {
					currentPage: type == 1 ? 1 : this.page,
					pageSize: this.pageSize
				}

				params.vcKey = ''
				params.vcValue = ''
				params.vcDesc = ''
				params.iIsEnable = ''
			} else {
				params.page = {
					currentPage: type == 1 ? 1 : this.page,
					pageSize: this.pageSize
				}
				params.vcKey = this.searchData.searchKye
				params.vcValue = this.searchData.searchVal
				params.vcDesc = this.searchData.searchInfo
				params.iIsEnable = this.searchData.searchSwitch == 'all' ? '' : this.searchData.searchSwitch - 0
			}
			let result = await this.axios.getConfig(JSON.stringify(params))
			if (result.code == 200 && result.data.lists) {
				result.data.lists.forEach(item => {
					if (item.iIsEnable == 1) {
						item.iIsEnable1 = '启用'
					} else if (item.iIsEnable == 0) {
						item.iIsEnable1 = '禁用'
					} else {
						item.iIsEnable1 = item.iIsEnable
					}
				})
				this.tableData = result.data.lists
				this.total = result.data.page.totalNum
			}
		},

		// 分页改变
		handleChangePage(page) {
			this.page = page
			this.getTabel()
		},
		// 分页条数改变
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			// this.getTabel()
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
.systems-config {
  width: 100%;
  min-width: 1400px;
  overflow: hidden;

  .systems-content {
    width: 100%;

    .top-search {
      width: 100%;

      .ivu-table-wrapper {
        overflow: visible;
      }

      .ivu-btn {
        margin: 0 5px;
      }

      /deep/.search-header-wrapper .form-item span {
        font-size: 14px;
      }

      /deep/.ivu-input-wrapper input {
        font-size: 14px;
      }
    }

    .table-content {
      width: 100%;
      margin-top: 10px;

      .ivu-table-wrapper {
        height: calc(100vh - 270px) !important;

        /deep/ .ivu-table-overflowY, /deep/ .ivu-table-tip, /deep/ .ivu-table-tip td {
          height: calc(100vh - 305px) !important;
        }

        /deep/.ivu-btn {
          font-size: 14px;
        }

        /deep/tr.ivu-table-row-hover td {
          background-color: #F5F7FA;
        }
      }

      .table-page {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 2px;

        .page-content {
          width: 800px;
          margin-left: 50%;
          transform: translateX(-25%);
        }
      }
    }

    /deep/.ivu-table {
      p {
        color: #19be6b;
      }

      b {
        font-weight: 400;
        color: #ff9900;
      }
    }
  }
}
</style>
