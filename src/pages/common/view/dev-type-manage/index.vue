<template>
	<div class="dev-type-manage">
		<div class="top-search">
			<searche-Header-Wrapper>
				<form-item title="测点组名称" type="text" v-model="searchData.vcName" placeholder="输入测点组名称查询" noMBottom></form-item>
				<Button type="info" size="large" icon="md-search" @click="searchConfig">查询</Button>
				<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
				<Button type="success" size="large" icon="md-add" @click="handleModalShow(0)">新增</Button>
			</searche-Header-Wrapper>
		</div>
		<!-- 表格区 -->
		<div class="table-content">
			<Table border ref="selection" :columns="tableColumns" :data="tableData" :height="650"></Table>
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
		<Modal v-model="modalShow" :title="modalTitle" class="add-modal" :mask-closable="false">
			<Form ref="add-form" :rules="ruleValidate" :model="formData" :label-width="120" label-position="right">
				<!-- 网关名称 -->
				<FormItem label="测点组类型名称" prop="vcName">
					<Input v-model="formData.vcName" />
				</FormItem>
				<!-- 测点组类型ID -->
				<FormItem label="模型名称" prop="SmTypeID">
					<Input v-model="formData.SmTypeID" />
				</FormItem>
				<!-- 默认图标 -->
				<FormItem label="默认图标" prop="vcIcon">
					<Input v-model="formData.vcIcon" />
				</FormItem>
				<!-- 关联模型ID -->
				<FormItem label="关联设备类型" prop="DevTypeID">
					<Select v-model="formData.DevTypeID">
						<Option v-for="item in devList" :key="item.id" :value="item.id">{{ item.name }}</Option>
					</Select>
				</FormItem>
				<!-- 状态 -->
				<FormItem label="状态">
					<RadioGroup v-model="formData.iIsEnable">
						<Radio label="1" value="1">启用</Radio>
						<Radio label="0" value="0">禁用</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 状态 -->
				<FormItem label="排序" prop="iSort">
					<Input v-model="formData.iSort" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="text" size="large" @click="handleModalCancel">取消</Button>
				<Button type="primary" size="large" @click="handleSaveStation">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
export default {
	name: 'dev-type-manage',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.acConfig.devTypeManage,
			modalShow: false,
			modalTitle: '新增',
			isAdd: true,
			formData: {
				vcName: '',
				SmTypeID: '',
				vcIcon: '',
				DevTypeID: '',
				iIsEnable: '1',
				iSort: ''
			},
			searchData: { vcName: '' },
			devList: [
				{ name: '设备1', id: '1' },
				{ name: '设备2', id: '2' },
				{ name: '设备3', id: '3' },
				{ name: '设备4', id: '4' },
				{ name: '设备5', id: '5' }
			],
			tableColumns: [
				{
					title: '测点名称',
					key: 'vcName',
					minWidth: 110,
					align: 'center'
				},
				{
					title: '测点组类型ID',
					key: 'SmTypeID',
					minWidth: 110,
					maxWidth: 250,
					align: 'center'
				},
				{
					title: '模型名称',
					key: 'DevTypeID',
					minWidth: 110,
					maxWidth: 250,
					align: 'center'
				},
				{
					title: '默认图标',
					key: 'vcIcon',
					minWidth: 110,
					maxWidth: 200,
					align: 'center'
				},
				{
					title: '状态',
					key: 'iIsEnable1',
					width: 100,
					align: 'center',
					render: (h, params) => {
						return h('div', [params.row.iIsEnable == '1' ? h('p', params.row.iIsEnable1) : h('b', params.row.iIsEnable1)])
					}
				},
				{
					title: '排序',
					key: 'iSort',
					width: 100,
					align: 'center'
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: 140,
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
										// marginRight: '15px'
									},
									on: {
										click: () => {
											this.handleModalShow(1, params)
										}
									}
								},
								'编辑'
							)
						])
					}
				}
			],
			tableData: [
				{ vcName: 'test1', SmTypeID: 'testId', vcIcon: 'null', DevTypeID: '1', iIsEnable: '1', iSort: '0' },
				{ vcName: 'test2', SmTypeID: 'testId', vcIcon: 'null', DevTypeID: '2', iIsEnable: '0', iSort: '1' },
				{ vcName: 'test3', SmTypeID: 'testId', vcIcon: 'null', DevTypeID: '1', iIsEnable: '1', iSort: '2' }
			],
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }],
				DevTypeID: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				iSort: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入排序数字', trigger: 'change' }]
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
				for (let key in this.formData) {
					this.formData[key] = ''
				}
				this.formData.iIsEnable = '1'
			}
		}
	},
	created() {
		this.tableData.forEach(item => {
			item.iIsEnable1 = item.iIsEnable == 1 ? '启用' : '禁用'
			// this.devList.forEach(element => {
			// 	if (item.DevTypeID == element.id) {
			// 		item.DevTypeID1 = element.name
			// 	}
			// })
		})
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 查询
		searchConfig() {
			console.log(this.searchData)
		},
		// 重置查询
		handleResetData() {
			for (let key in this.searchData) {
				this.searchData[key] = ''
			}
		},
		// 编辑/修改弹窗
		handleModalShow(type, params) {
			if (type == 0) {
				this.modalTitle = '新增'
				this.isAdd = true
			} else {
				this.modalTitle = '编辑'
				this.isAdd = false
				console.log(params)
				let dataObj = JSON.parse(JSON.stringify(params.row))
				for (let key in dataObj) {
					this.formData[key] = dataObj[key]
				}
			}
			this.modalShow = true
		},
		handleModalCancel() {
			this.modalShow = false
		},
		handleSaveStation() {
			this.$refs['add-form'].validate(valid => {
				if (valid) {
					this.$Message.success('Success!')
					if (this.isAdd) {
						let params = JSON.parse(JSON.stringify(this.formData))
						this.tableData.push(params)
					} else {
					}

					this.modalShow = false
				} else {
					this.$Message.error('Fail!')
				}
			})
		},
		handleChangePage(page) {
			this.page = page
		},
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
.dev-type-manage {
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
</style>
