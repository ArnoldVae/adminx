<template>
	<div class="inspection-service">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="stationTree" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<!-- 右侧内容 -->
		<div class="right-content">
			<!-- 工具栏 -->
			<div class="tool-bar">
				<searche-Header-Wrapper>
					<div class="btn-box">
						<Button type="success" size="large" icon="md-add" @click="addService">新增</Button>
						<Button type="primary" size="large" :icon="eye" @click="searchShowClick">筛选</Button>
					</div>
				</searche-Header-Wrapper>
			</div>
			<transition name="el-fade-in-linear">
				<div class="search-bar" v-show="searchShow">
					<searche-Header-Wrapper>
						<form-item
							title="服务名称"
							type="text"
							v-model="searchData"
							placeholder="输入服务名称"
							@on-enter="searchStation"
							clearable
							noMBottom
						></form-item>
						<Button type="info" size="large" icon="md-search" @click="searchStation">查询</Button>
						<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
					</searche-Header-Wrapper>
				</div>
			</transition>

			<!-- 表格 -->
			<div class="table-content">
				<Table border ref="selection" :columns="tableColumns" :data="tableData" height="650" :loading="loading"></Table>
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
		</div>

		<Modal v-model="addModal" :title="modalTitle" :mask-closable="false" footer-hide :width="modalWidth" @on-cancel="closeClick('up-form')">
			<Form ref="up-form" :rules="ruleValidate" :model="addFormData" :label-width="100" label-position="right">
				<FormItem label="服务名称" prop="vcName">
					<Input v-model="addFormData.vcName" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="协议" prop="intType">
					<Select v-model="addFormData.intType" placeholder="请选择协议类型" style="width: 400px;">
						<Option v-for="(item, index) in dealData" :key="index" :value="item.dictID">{{ item.vcName }}</Option>
					</Select>
				</FormItem>
				<FormItem label="服务地址" prop="vcIp">
					<Input v-model="addFormData.vcIp" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="服务端口" prop="iPort">
					<Input v-model="addFormData.iPort" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="web端口" prop="intWebPort">
					<Input v-model="addFormData.intWebPort" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="数据库地址" prop="vcDbip">
					<Input v-model="addFormData.vcDbip" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="数据库端口" prop="intDbport">
					<Input v-model="addFormData.intDbport" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="数据库用户名" prop="vcDbuser">
					<Input v-model="addFormData.vcDbuser" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="数据库密码" prop="vcDbpassword">
					<Input v-model="addFormData.vcDbpassword" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="状态" prop="intIsEnable">
					<Select v-model="addFormData.intIsEnable" placeholder="请选择状态" style="width: 400px">
						<Option value="1">启用</Option>
						<Option value="0">停用</Option>
					</Select>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSaveStation('up-form')" style="float: right;">确定</Button>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
export default {
	name: 'inspection-service',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.inspectionService,
			dealData: [], // 协议数据数组
			stationTree: [], // 变电站树数据
			isTree: false,
			step: 0,
			eye: 'md-eye',
			searchShow: true,
			searchData: '', // 服务名称
			tableColumns: [
				{ title: '服务名称', key: 'vcName', width: '150', align: 'center', tooltip: true },
				{ title: '服务ID', key: 'vcKey', width: '150', align: 'center' },
				{ title: '协议', key: 'typeStr', width: '120', align: 'center' },
				{ title: '服务地址', key: 'vcIp', width: '120', align: 'center' },
				{ title: '服务端口', key: 'iPort', width: '100', align: 'center' },
				{ title: 'web端口', key: 'intWebPort', width: '100', align: 'center' },
				{ title: '数据库地址', key: 'vcDbip', width: '120', align: 'center' },
				{ title: '数据库端口', key: 'intDbport', width: '110', align: 'center' },
				{ title: '数据库用户名', key: 'vcDbuser', width: '125', align: 'center' },
				{ title: '数据库密码', key: 'vcDbpassword', width: '110', align: 'center' },
				{ title: '状态', key: 'intIsEnableN', width: '100', align: 'center' },
				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: '210',
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: { type: 'warning', icon: 'ios-create-outline' },
									style: { marginRight: '5px' },
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
									props: { type: 'error', icon: 'md-trash' },
									on: {
										click: () => {
											this.handleModalShow(0, params)
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
			total: 0,
			page: 1,
			pageSize: 10,
			addModal: false,
			modalTitle: '新增',
			addFormData: {
				// 新增表单数据
				vcName: '', // 服务名称
				intType: '', // 协议
				vcIp: '', // 服务地址
				iPort: '', // 服务端口
				intWebPort: '', // web端口
				vcDbip: '', // 数据库地址
				intDbport: '', // 数据库端口,
				vcDbuser: '', // 数据库名
				vcDbpassword: '', // 数据库密码
				intIsEnable: '', // 状态
				vcKey: '' // 服务ID
			},
			// 表单验证
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				intType: [{ required: true, message: '该项为必选项', trigger: 'change' }],
				vcIp: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				iPort: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				intIsEnable: [{ required: true, message: '该项为必选项', trigger: 'blur' }]
			},
			unitId: '',
			str: 'add',
			changeId: '', // 修改数据的id
			loading: false
		}
	},
	computed: {
		modalWidth() {
			let width = ''
			width = 540
			return width
		}
	},
	filters: {},
	watch: {},
	created() {
		this.getUnitData()
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
		// 获取变电站树
		getUnitData() {
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
						this.findServiceListData()
					}
				}
			})
		},
		// 变电站树点击
		handleStationTree(data) {
			if (data[0].flag == 0) {
				// 如果不是变电站
				this.unitId = ''
				this.isTree = false // 新增不能点击
				this.step = 0
			} else {
				// 是变电站
				this.unitId = data[0].id
				this.isTree = true
				this.step = 1
				if (this.file) {
					this.step = 2
				}
			}
			if (this.unitId != '') {
				this.findServiceListData()
			}
		},
		// 查询服务列表
		findServiceListData() {
			this.loading = true
			let datas = {
				page: {
					pageSize: this.pageSize,
					pageNum: this.page
				},
				asServiceinfoEntity: {
					unitId: this.unitId,
					vcName: this.searchData
				}
			}
			this.axios.findServiceListData(datas).then(res => {
				if ((res.code = 200)) {
					res.data.pagedModelList.forEach(item => {
						if (item.intIsEnable == 1) {
							item.intIsEnableN = '启用'
						} else if (item.intIsEnable == 0) {
							item.intIsEnableN = '停用'
						}
					})
					this.tableData = res.data.pagedModelList
					this.total = res.data.totalCount
					this.loading = false
				}
			})
		},
		// 修改||删除
		handleModalShow(num, data) {
			// console.log( data.row )
			if (num == 1) {
				this.modalTitle = '编辑'
				this.addFormData.vcName = data.row.vcName
				this.addFormData.intType = data.row.intType.toString()
				this.addFormData.vcIp = data.row.vcIp
				this.addFormData.iPort = data.row.iPort.toString()
				this.addFormData.intWebPort = data.row.intWebPort
				this.addFormData.vcDbip = data.row.vcDbip
				this.addFormData.intDbport = data.row.intDbport
				this.addFormData.vcDbuser = data.row.vcDbuser
				this.addFormData.vcDbpassword = data.row.vcDbpassword
				this.addFormData.intIsEnable = data.row.intIsEnable.toString()
				this.addFormData.vcKey = data.row.vcKey
				this.str = 'edit'
				this.changeId = data.row.id
				this.axios.findServiceType({ dictGroupID: 7001 }).then(res => {
					if (res.code == 200) {
						res.data.forEach(item => {
							item.dictID = item.dictID.toString()
						})
						this.dealData = res.data
						this.addModal = true
					}
				})
				// console.log( this.addFormData )
			} else if (num == 0) {
				// console.log( data )
				// console.log( data.row.id )
				this.$Modal.confirm({
					title: '确认',
					content: `<p>是否确认删除该服务</p>`,
					onOk: () => {
						this.axios.delService({ id: data.row.id }).then(res => {
							if (res.code == 200) {
								this.$Message.success('删除成功')
								this.findServiceListData()
							}
						})
					}
				})
			}
		},
		// 新增||修改 确定按钮点击
		handleSaveStation(name) {
			// console.log(  this.addFormData.iPort )
			this.$refs[name].validate(valid => {
				if (valid) {
					this.addFormData.unitId = this.unitId
					this.addFormData.serviceId = ''
					// this.addFormData.vcKey = ''
					this.addFormData.intConfigUpdateTime = ''
					this.addFormData.intDataUpdateTime = ''
					this.addFormData.intStatus = ''
					this.addFormData.intFlag = ''
					this.addFormData.vcMemo = ''
					// console.log( this.addFormData )
					if (this.str == 'add') {
						this.postAddService()
					} else if (this.str == 'edit') {
						this.postChangeService()
					}
				}
			})
		},
		// 发送修改请求
		postChangeService() {
			this.addFormData.id = this.changeId
			this.axios.changeService(this.addFormData).then(res => {
				if (res.code == 200) {
					this.$Message.success('修改成功')
					this.addModal = false
					this.closeClick('up-form')
					this.findServiceListData()
				}
			})
		},
		// 发送新增请求
		postAddService() {
			this.axios.addService(this.addFormData).then(res => {
				if (res.code == 200) {
					this.$Message.success('添加成功')
					this.addModal = false
					this.closeClick('up-form')
					this.findServiceListData()
				}
			})
		},
		// 点击新增按钮
		addService() {
			this.modalTitle = '新增'
			this.str = 'add'
			this.axios.findServiceType({ dictGroupID: 7001 }).then(res => {
				if (res.code == 200) {
					res.data.forEach(item => {
						item.dictID = item.dictID.toString()
					})
					this.dealData = res.data
					this.addModal = true
				}
			})
		},
		// 关闭
		closeClick(name) {
			this.$refs[name].resetFields()
			this.addModal = false
		},
		// 查询
		searchStation() {
			this.findServiceListData()
		},
		// 重置
		handleResetData() {
			this.searchData = ''
			this.findServiceListData()
		},
		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.findServiceListData()
		},
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.findServiceListData()
		},
		searchShowClick() {
			this.searchShow = !this.searchShow
			if (this.searchShow) {
				this.eye = 'md-eye'
			} else {
				this.eye = 'md-eye-off'
			}
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
.inspection-service{
	width: 100%;
	// height: calc(100vh - 160px);

	.left-tree {
		width: 250px;
		height: 100%;
		height: calc(100vh - 150px) !important;
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

		.tool-bar {
			.btn-box {
				.ivu-btn {
					margin-right: 10px;
				}
			}
		}

		.search-bar {
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
		  // flex: 1;
		  // position: relative;

		  /deep/ .ivu-table-wrapper {
	       	height: calc(100vh - 330px) !important;
			.ivu-table-body,
			.ivu-table-overflowY,
			.ivu-table-tip,
			.ivu-table-tip td {
				height: calc(100vh - 370px) !important;
			}

	      }

		  // /deep/.ivu-table-body, /deep/.ivu-table-overflowY {
		  //   height: calc(100% - 40px) !important;
		  // }

		  /deep/tr.ivu-table-row-hover td {
		    background-color: #F5F7FA;
		  }

		  /deep/.ivu-btn {
		    font-size: 14px;
		  }

		  .table-page {
		    width: 100%;
		    // position: absolute;
		    margin-top: 15px;
		    bottom: -15px;

		    .page-content {
		      width: 800px;
		      margin-left: 50%;
		      transform: translateX(-35%);
		    }
		  }
		}

	}

}
</style>
