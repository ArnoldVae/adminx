<template>
	<div class="edge-computing">
		<div class="top-search">
			<searche-Header-Wrapper>
				<form-item title="网关名称" type="text" v-model="searchData.vcName" placeholder="输入网关名称查询" noMBottom></form-item>
				<!-- <form-item title="网关编码" type="text" v-model="searchData.dtuId" placeholder="输入网关编码查询" noMBottom></form-item> -->
				<Button type="info" size="large" icon="md-search" @click="searchConfig">查询</Button>
				<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
			</searche-Header-Wrapper>
		</div>
		<!-- 表格区 -->
		<div class="table-content">
			<Table border ref="selection" :columns="tableColumns" :data="tableData" @on-row-dblclick="dblclick" :height="650"></Table>
			<!-- 分页 -->
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
		<Modal v-model="modalShow" title="编辑" width="850" class="add-modal" :mask-closable="false">
			<Form ref="up-form" :rules="ruleValidate" :model="formData" :label-width="110" label-position="right">
				<Row>
					<i-col span="11">
						<!-- 网关名称 -->
						<FormItem label="网关名称" prop="vcName">
							<Input v-model="formData.vcName" disabled />
						</FormItem>
					</i-col>
					<!-- <i-col span="12">
						<FormItem label="网关编码" prop="vcCode">
							<Input v-model="formData.vcCode" disabled />
						</FormItem>
					</i-col> -->
					<i-col span="12">
						<!-- 网关ID -->
						<FormItem label="网关编码" prop="dtuId">
							<Input v-model="formData.dtuId" disabled />
						</FormItem>
					</i-col>
					<!-- ### -->
					<i-col span="11">
						<!-- 管理单元ID -->
						<FormItem label="站所名称" prop="unitId">
							<Input v-model="formData.unitName" disabled />
						</FormItem>
					</i-col>
					<i-col span="12">
						<!-- 接入时间 -->
						<FormItem label="接入时间" prop="iPrevSyncTime">
							<Input v-model="formData.iPrevSyncTime1" disabled />
						</FormItem>
					</i-col>
					<i-col span="11">
						<!-- 同步时间 -->
						<FormItem label="同步时间" prop="iLastSyncTime">
							<Input v-model="formData.iLastSyncTime1" disabled />
						</FormItem>
					</i-col>
					<i-col span="12">
						<!-- 同步作业ID -->
						<FormItem label="同步作业ID" prop="vcLastjobid">
							<Input v-model="formData.vcLastjobid" disabled />
						</FormItem>
					</i-col>
					<i-col span="11">
						<!-- EMQ资源ID -->
						<FormItem label="EMQ资源名称" prop="emqId">
							<Input v-model="formData.emqName" disabled />
						</FormItem>
					</i-col>
					<i-col span="12">
						<!-- 用户名 -->
						<FormItem label="用户名" prop="vcEmqUser">
							<Input v-model="formData.vcEmqUser" disabled />
						</FormItem>
					</i-col>
					<i-col span="11">
						<!-- 密码 -->
						<FormItem label="密码" prop="vcEmqPwd">
							<Input v-model="formData.vcEmqPwd" disabled />
						</FormItem>
					</i-col>
					<i-col span="12">
						<!-- 在线状态 -->
						<FormItem label="在线状态">
							<Input v-model="formData.iStatus1" disabled />
						</FormItem>
					</i-col>
					<i-col span="11">
						<!-- 排序 -->
						<FormItem label="排序" prop="iSort">
							<Input v-model="formData.iSort" placeholder="请输入..." />
						</FormItem>
					</i-col>
					<i-col span="12">
						<!-- 状态 -->
						<FormItem label="启动状态">
							<RadioGroup v-model="formData.iIsEnable">
								<Radio label="1" value="1">启用</Radio>
								<Radio label="0" value="0">禁用</Radio>
							</RadioGroup>
						</FormItem>
					</i-col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="text" size="large" @click="handleModalCancel">取消</Button>
				<Button type="primary" size="large" @click="handleSaveStation">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
console.log(document.getElementsByTagName('html'))
export default {
	name: 'edge-computing',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.edgeComputing,
			modalShow: false,
			pageFlag: false,
			searchData: { vcName: '' },
			// 表格
			tableColumns: [
				{
					title: '网关名称',
					key: 'vcName',
					width: 200,
					align: 'center'
				},
				// {
				// 	title: '网关编码',
				// 	key: 'vcCode',
				// 	width: 140,
				// 	align: 'center'
				// },
				{
					title: '网关编码',
					key: 'dtuId',
					width: 150,
					align: 'center'
				},
				{
					title: '站所名称',
					key: 'unitName',
					width: 150,
					align: 'center'
				},
				{
					title: '在线状态',
					key: 'iStatus1',
					width: '95',
					render: (h, params) => {
						return h('div', [params.row.iStatus == '1' ? h('p', params.row.iStatus1) : h('b', params.row.iStatus1)])
					},
					align: 'center'
				},
				{
					title: '启动状态',
					key: 'iIsEnable1',
					width: '95',
					render: (h, params) => {
						return h('div', [params.row.iIsEnable == '1' ? h('p', params.row.iIsEnable1) : h('b', params.row.iIsEnable1)])
					},
					align: 'center'
				},
				{
					title: '接入时间',
					key: 'iPrevSyncTime1',
					width: '110',
					align: 'center'
				},
				{
					title: '同步时间',
					key: 'iLastSyncTime1',
					width: '110',
					align: 'center'
				},
				{
					title: '同步作业ID',
					key: 'vcLastjobid',
					width: '150',
					align: 'center'
				},
				{
					title: 'EMQ资源名称',
					key: 'emqName',
					width: '150',
					align: 'center'
				},
				{
					title: '用户名',
					key: 'vcEmqUser',
					width: '130',
					align: 'center'
				},
				{
					title: '密码',
					key: 'vcEmqPwd',
					width: '130',
					align: 'center'
				},
				{
					title: '排序',
					key: 'iSort',
					width: '100',
					align: 'center'
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'warning',
										size: 'small',
										icon: 'ios-create-outline'
									},
									style: {
										// marginRight: '15px'
									},
									on: {
										click: () => {
											this.handleModalShow(params)
										}
									}
								},
								'编辑'
							)
						])
					}
				}
			],
			// 表格数据
			tableData: [],
			formData: {
				vcName: '',
				// vcCode: '',
				dtuId: '',
				unitName: '',
				iStatus: '',
				iIsEnable: '',
				iPrevSyncTime: '',
				iLastSyncTime: '',
				vcLastjobid: '',
				emqName: '',
				VcEmqUser: '',
				VcEmqPwd: '',
				iSort: ''
			},
			// 表单验证
			ruleValidate: {
				iSort: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入排序数字', trigger: 'change' }]
				// dtuId: [{ required: true, message: '该项为必填项', trigger: 'blur' }]
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
				this.$refs['up-form'].resetFields()
			}
		},
		searchData: {
			handler(newVal) {
				this.pageFlag = false
			},
			deep: true
		}
	},
	created() {
		this.init()
		let num = window.devicePixelRatio
		if (num != 1) {
			this.$notify({
				title: '提示',
				message: '您的浏览器目前处于缩放状态,页面可会会出现错位现象,请使用键盘Ctrl键+0键,恢复默认100%缩放比例后刷新网页.',
				type: 'warning',
				duration: 0
			})
		}
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		init() {
			this.getTable()
		},
		// 搜索按钮
		searchConfig() {
			this.pageFlag = true
			this.getTable(1)
		},
		// 重置搜索
		handleResetData() {
			for (let key in this.searchData) {
				this.searchData[key] = ''
			}
			this.getTable()
		},
		// 获取表格数据
		getTable(type) {
			let params = {}
			if (!this.pageFlag) {
				params.page = {
					pageNum: type == 1 ? 1 : this.page,
					pageSize: this.pageSize
				}

				params.acDtuinfoEntity = {
					vcName: '',
					dtuId: ''
				}
			} else {
				params.page = {
					pageNum: type == 1 ? 1 : this.page,
					pageSize: this.pageSize
				}
				params.acDtuinfoEntity = {
					vcName: this.searchData.vcName
					// dtuId: this.searchData.dtuId
				}
			}

			console.log(params)

			this.axios
				.getDtuListPlus({
					vcName: this.searchData.vcName,
					// dtuId: this.searchData.dtuId,
					page: params.page
				})
				.then(res => {
					if (res.code == 200 && res.data) {
						this.tableData = res.data.lists
						this.total = res.data.page.totalNum
						this.tableData.forEach(item => {
							item.iCreateTime1 = item.iCreateTime && item.iCreateTime > 1500000000 ? this.strToymd(item.iCreateTime) : null
							item.iLastSyncTime1 = item.iLastSyncTime && item.iLastSyncTime > 1500000000 ? this.strToymd(item.iLastSyncTime) : null
							item.iStatus1 = item.iStatus == 1 ? '在线' : '离线'
							item.iIsEnable1 = item.iIsEnable == 1 ? '启用' : '禁用'
						})
					}
				})

			/* this.axios.getDtuList(params).then(res => {
				if (res.code == 200 && res.data) {
					this.tableData = res.data.pagedModelList
					this.total = res.data.totalCount
					this.tableData.forEach(item => {
						// item.iPrevSyncTime = 1563005906
						// item.iLastSyncTime = 1563005933
						item.iPrevSyncTime1 = (item.iPrevSyncTime && item.iPrevSyncTime >1500000000)? this.strToymd(item.iPrevSyncTime) : null
						item.iLastSyncTime1 = (item.iLastSyncTime && item.iLastSyncTime >1500000000) ? this.strToymd(item.iLastSyncTime) : null
						item.iStatus1 = item.iStatus == 1 ? '在线' : '离线'
						item.iIsEnable1 = item.iIsEnable == 1 ? '启用' : '禁用'
					})
				}
			}) */
		},
		// 修改按钮
		handleModalShow(params) {
			let rowData = JSON.parse(JSON.stringify(params.row))
			for (let key in this.formData) {
				this.$set(this.formData, key, rowData[key])
			}
			this.formData.iIsEnable = rowData.iIsEnable + ''
			this.formData.iPrevSyncTime1 = this.formData.iPrevSyncTime ? this.strToymd(this.formData.iPrevSyncTime) : null
			this.formData.iLastSyncTime1 = this.formData.iLastSyncTime ? this.strToymd(this.formData.iLastSyncTime) : null
			this.formData.iStatus1 = this.formData.iStatus == 1 ? '在线' : '离线'
			this.modalShow = true
		},
		// 双击表格修改弹窗
		dblclick(row) {
			let data = {
				row: row
			}
			this.handleModalShow(data)
		},
		// 弹窗取消
		handleModalCancel() {
			this.modalShow = false
		},
		// 弹窗保存
		handleSaveStation() {
			this.$refs['up-form'].validate(valid => {
				if (valid) {
					let params = {
						dtuId: this.formData.dtuId,
						iSort: this.formData.iSort,
						iIsEnable: this.formData.iIsEnable
					}
					this.axios.upDut(params).then(res => {
						if (res.code == 200) {
							this.getTable()
						} else {
							this.$message.warning(res.msg)
						}
					})

					this.modalShow = false
				} else {
					this.$Message.error('请输入正确排序')
				}
			})
		},
		// 分页改变
		handleChangePage(page) {
			this.page = page
			this.getTable()
		},
		// 分页条数改变
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			// this.getTable()
		},
		// 时间戳转ymd
		strToymd(time, up) {
			// 遍历时间 处理格式
			let date = new Date(time * 1000)
			let Y = date.getFullYear() + '-'
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
			let D = date.getDate() + ' '
			let h = date.getHours() + ':'
			let m = date.getMinutes() + ':'
			let s = date.getSeconds()
			let b = Y + M + D + h + m + s
			return b
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
.edge-computing {
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;

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
        color: #ff9900;
        font-weight: 400;
      }

      p {
        color: #19be6b;
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

.add-modal {
  /deep/.ivu-radio-wrapper {
    font-size: 14px;
  }

  /deep/.ivu-input-default {
    font-size: 14px;
  }

  /deep/.ivu-input-disabled {
    color: #515a6e;
  }
}
</style>
