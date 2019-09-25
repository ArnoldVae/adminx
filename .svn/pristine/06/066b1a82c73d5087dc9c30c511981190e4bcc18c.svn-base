<template>
	<div class="main-station-manage">
		<div class="tool-bar">
			<searche-Header-Wrapper>
				<div class="btn-box">
					<Button type="success" size="large" icon="md-add" @click="handleModalShow(0)">新增</Button>
				</div>
				<form-item
					title="主站名称"
					type="text"
					v-model="searchData.vcName"
					placeholder="输入主站名称查询"
					@on-enter="searchStation"
					clearable
					noMBottom
				></form-item>
				<form-item
					title="主站层级"
					type="select"
					v-model="searchData.iType"
					:options="cityList"
					:setings="{ value: 'value', label: 'label' }"
					noMBottom
				></form-item>

				<Button type="info" size="large" icon="md-search" @click="searchStation">查询</Button>
				<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
			</searche-Header-Wrapper>
		</div>
		<div class="table-content">
			<Table border :columns="tableColumns" :data="tableData" @on-row-dblclick="dblclick" :height="650"></Table>
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
					/>
				</div>
			</div>
		</div>
		<!-- 新增弹窗 -->
		<Modal v-model="modalShow" :title="modalTitle" :mask-closable="false">
			<Form ref="add-form" :rules="ruleValidate" :model="addFormData" :label-width="90" label-position="right">
				<!-- 主站名称 -->
				<FormItem label="主站名称" prop="vcName">
					<Input v-model="addFormData.vcName" placeholder="请输入..." />
				</FormItem>
				<!-- 主站类型 -->
				<FormItem label="主站层级">
					<RadioGroup v-model="addFormData.iType">
						<Radio label="0" value="0">下级</Radio>
						<Radio label="1" value="1">本级</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 主站ID -->
				<FormItem label="主站ID" prop="mainStationId">
					<Input v-model="addFormData.mainStationId" :disabled="mainFlag" />
				</FormItem>
				<!-- ip -->
				<FormItem label="IP" prop="vcIp">
					<Input v-model="addFormData.vcIp" placeholder="请输入..." />
				</FormItem>
				<!-- 端口 -->
				<FormItem label="端口" prop="iPort">
					<Input v-model="addFormData.iPort" placeholder="请输入..." />
				</FormItem>
				<!-- 排序 -->
				<FormItem label="标识" prop="iFlag">
					<Input v-model="addFormData.iFlag" placeholder="请输入..." />
				</FormItem>
				<!-- 标识 -->
				<FormItem label="排序" prop="iSort">
					<Input v-model="addFormData.iSort" placeholder="请输入..." />
				</FormItem>
				<!-- 备注 -->
				<FormItem label="备注" prop="vcMemo">
					<Input v-model="addFormData.vcMemo" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入..." />
				</FormItem>
			</Form>

			<div slot="footer">
				<Button type="text" size="large" @click="handleModalCancel">取消</Button>
				<Button type="primary" size="large" :loading="btnLoading" @click="handleSaveArea">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import mixinTolls from '@common/mixin/tools'
export default {
	name: 'main-station-manage',
	mixins: [mixinTolls],
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.mainStationManage,
			modalShow: false,
			btnLoading: false,
			modalTitle: '新增',
			isAdd: true,
			addFormData: {
				vcName: '',
				mainStationId: '',
				iType: '0',
				vcIp: '',
				iPort: '',
				iFlag: '',
				iSort: '',
				vcMemo: ''
			},
			searchData: {
				vcName: '',
				iType: 'all'
			},
			pageFlag: false,
			mainFlag: false,
			cityList: [
				// 搜索下拉框
				{
					value: 'all',
					label: '全部'
				},
				{
					value: '1',
					label: '本级'
				},
				{
					value: '0',
					label: '下级'
				}
			],
			tableColumns: [
				{ title: '主站名称', key: 'vcName', minWidth: 150, maxWidth: 200, align: 'center' },
				{ title: '主站ID', key: 'mainStationId', minWidth: 200, align: 'center' },
				{
					title: '主站层级',
					key: 'iType1',
					width: '150',
					align: 'center',
					render: (h, params) => {
						return h('div', [params.row.iType == '1' ? h('p', params.row.iType1) : h('b', params.row.iType1)])
					}
				},
				{ title: 'IP', key: 'vcIp', width: '200', align: 'center' },
				{ title: '端口', key: 'iPort', width: 150, align: 'center' },
				{ title: '排序', key: 'iSort', width: '100', align: 'center' },
				{ title: '标识', key: 'iFlag', width: '100', align: 'center' },
				{ title: '备注', key: 'vcMemo', minWidth: 100, maxWidth: 200, align: 'center' },
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
											this.handleModalShow(1, params)
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
											this.handleRemove(params)
										}
									}
								},
								'删除'
							)
						])
					}
				}
			],
			tableData: [],
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,63}$/, message: '最多输入64字', trigger: 'change' }],
				iPort: [{ pattern:/^[0-9]\d{0,9}$/, message: '请正确输入数字端口号', trigger: 'change' }],
				iSort: [{ pattern: /^[0-9]\d{0,4}$/, message: '请正确输入5位以内数字排序', trigger: 'change' }],
				iFlag: [{ pattern: /^[0-9]\d{0,4}$/, message: '请正确输入5位以内数字标识', trigger: 'change' }],
				mainStationId: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^[0-9a-zA-Z]*$/g, message: '主站ID仅支持字母和数字格式', trigger: 'change' },
					{ pattern: /^.{0,63}$/, message: '最多输入64字', trigger: 'change' }
				],
				vcIp: [
					{
						pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
						message: '请输入正确的IP地址',
						trigger: 'blur'
					}
				],
				vcMemo:[{ pattern: /^.{0,63}$/, message: '最多输入64字', trigger: 'change' }]
			},
			total: 0,
			page: 1,
			pageSize: 20
		}
	},
	computed: {},
	filters: {},
	watch: {
		modalShow(val) {
			if (!val) {
				for (let key in this.addFormData) {
					this.addFormData[key] = ''
				}
				this.addFormData.iType = '0'
				this.$refs['add-form'].resetFields()
			}
		},
		searchData: {
			handler(newVal) {
				this.pageFlag = false
			},
			deep: true
		},
		'addFormData.iType'(val) {
			if (val == 1) {
				this.mainFlag = true
				this.ruleValidate.mainStationId = []
				if (this.isAdd) {
					this.addFormData.mainStationId = ''
					// this.$refs['add-form'].resetFields()
				}
			} else if (val == 0 && this.isAdd) {
				this.mainFlag = false
				this.ruleValidate.mainStationId = [{ required: true, message: '该项为必填项', trigger: 'blur' }]
			}
		}
	},
	created() {
		this.getTable()
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
		// 获取表格
		getTable(type) {
			let params = {}
			if (!this.pageFlag) {
				params.vcName = ''
				params.iType = ''
				params.currentPage = type == 1 ? 1 : this.page
				params.pageSize = this.pageSize
			} else {
				params.vcName = this.searchData.vcName
				params.iType = this.searchData.iType == 'all' ? '' : this.searchData.iType
				params.currentPage = type == 1 ? 1 : this.page
				params.pageSize = this.pageSize
			}

			this.axios.getMainStation(params).then(res => {
				if (res.code == 200) {
					res.data.lists.forEach(item => {
						item.iType1 = item.iType == 1 ? '本级' : '下级'
					})
					this.tableData = res.data.lists
					this.total = res.data.page.totalNum
				} else {
					this.$Message.warning(res.msg)
				}
			})
		},
		// 条件查询
		searchStation() {
			if (this.searchData.vcName == '' && this.searchData.iType == 'all') {
				this.pageFlag = false
			} else {
				this.pageFlag = true
			}
			this.getTable(1)
		},
		// 重置查询
		handleResetData() {
			this.searchData.vcName = ''
			this.searchData.iType = 'all'
			this.page = 1
			this.pageSize = 20
			this.getTable()
		},
		// 新增按钮
		handleModalShow(type, params) {
			if (type == 0) {
				// 新增
				this.modalTitle = '新增'
				this.modalShow = true
				this.mainFlag = false
				this.isAdd = true
			} else {
				// 修改
				this.modalTitle = '修改'
				this.modalShow = true
				this.mainFlag = true
				this.isAdd = false
				// this.addFormData
				for (let key in this.addFormData) {
					this.addFormData[key] = params.row[key]
				}
				this.addFormData.iType = params.row.iType + ''
			}
		},
		// 双击表格修改
		dblclick(row) {
			let params = {
				row: row
			}
			this.handleModalShow(1, params)
		},

		// 保存
		handleSaveArea() {
			if (this.isAdd) {
				let noRepeat = true
				this.tableData.forEach(item => {
					if (item.vcName == this.addFormData.vcName) {
						this.$Message.error('主站名称不能重复')
						noRepeat = false
					}
				})
				if (noRepeat) {
					this.validateForm('add-form', () => {
						this.btnLoading = true
						let params = this.addFormData
						this.axios
							.saveMainStation(params)
							.then(res => {
								if (res.code == 200) {
									this.getTable()
									this.modalShow = false
								} else {
									this.$Message.warning(res.msg)
								}
								this.btnLoading = false
							})
							.catch(error => {
								this.btnLoading = false
								this.modalShow = false
								this.$Message.error(error.response.data.msg)
								console.log(error.response)
							})
					})
				}
			} else {
				this.validateForm('add-form', () => {
					this.btnLoading = true
					let params = this.addFormData
					this.axios
						.upMainStation(params)
						.then(res => {
							if (res.code == 200) {
								this.getTable()
								this.modalShow = false
							} else {
								this.$Message.warning(res.msg)
							}
							this.btnLoading = false
						})
						.catch(error => {
							this.btnLoading = false
							this.modalShow = false
							this.$Message.error(error.response.data.msg)
							console.log(error.response)
						})
				})
			}
		},
		// 取消
		handleModalCancel() {
			this.modalShow = false
		},
		// 删除
		handleRemove(params) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除所选项?',
				onOk: () => {
					this.axios.delMainStation(params.row.mainStationId).then(res => {
						if (res.code == 200) {
							this.getTable()
							this.$Message.success('删除成功')
						} else {
							this.$Message.warning(res.msg)
						}
					})
				},
				onCancel: () => {}
			})
		},
		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.getTable()
		},
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
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
.main-station-manage {
  width: 100%;
  height: calc(100vh - 160px);
  float: left;
  display: flex;
  flex-direction: column;

  .tool-bar {
    .btn-box {
      .ivu-btn {
        margin-right: 10px;
      }
    }

    .ivu-btn {
      margin-right: 10px;
    }

    .search-header-wrapper .form-item span {
      font-size: 14px;
    }

    .ivu-input-wrapper input {
      font-size: 14px;
    }
  }

  .table-content {
    width: 100%;
    flex: 1;
    position: relative;

    .ivu-table-wrapper {
      width: 100%;
      position: absolute;
      top: 0;
      height: calc(100% - 30px) !important;
    }

    /deep/.ivu-table-body, /deep/.ivu-table-overflowY {
      height: calc(100% - 40px) !important;
    }

    /deep/tr.ivu-table-row-hover td {
      background-color: #F5F7FA;
    }

    /deep/.ivu-table {
      b {
        color: #19be6b;
        font-weight: 400;
      }

      p {
        color: #ff9900;
      }
    }

    /deep/.ivu-btn {
      font-size: 14px;
    }

    .table-page {
      width: 100%;
      position: absolute;
      bottom: -15px;

      .page-content {
        width: 800px;
        margin-left: 50%;
        transform: translateX(-35%);
      }
    }
  }
}

/deep/.ivu-radio-wrapper {
  font-size: 14px !important;
}
</style>
