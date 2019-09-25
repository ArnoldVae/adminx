<template>
	<div class="device-config">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="treeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<div class="right-content">
			<!-- 工具栏 -->
			<!-- <div class="tool-bar">
        <searche-Header-Wrapper>
          <div class="btn-box">
            <Button type="success" size="large" icon="md-add" @click="handleModalShow(0)">新增</Button>
            <Button type="primary" size="large" :icon="eye" @click="searchShow = !searchShow">筛选</Button>
          </div>
        </searche-Header-Wrapper>
			</div>-->
			<!-- 搜索栏 -->
			<transition name="el-fade-in-linear">
				<div class="search-bar" v-show="searchShow">
					<searche-Header-Wrapper>
						<Button type="success" size="large" icon="md-add" @click="handleModalShow(0)">新增配置</Button>
						<form-item
							title="装置名称"
							type="text"
							v-model="searchData.vcName"
							placeholder="输入查询"
							@on-enter="searchStation"
							clearable
							noMBottom
						></form-item>
						<form-item
							title="状态"
							type="select"
							v-model="searchData.isEnable"
							:options="cityList"
							:setings="{ value: 'value', label: 'label' }"
							noMBottom
						></form-item>
						<form-item
							title="类型"
							type="select"
							v-model="searchData.type"
							:options="typeCityList"
							:setings="{ value: 'value', label: 'label' }"
							noMBottom
						></form-item>
						<Button type="info" size="large" icon="md-search" @click="searchStation">查询</Button>
						<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
					</searche-Header-Wrapper>
				</div>
			</transition>

			<!-- 表格区 -->
			<div class="table-content">
				<Table
					border
					ref="selection"
					:columns="tableColumns"
					:data="tableData"
					:height="700"
					@on-selection-change="handleSelectAll"
					@on-row-dblclick="dblclick"
				></Table>
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
		<!-- 新增弹窗 -->
		<Modal v-model="modalShow" :title="modalTitle" width="550" :mask-closable="false">
			<Form ref="add-form" :rules="ruleValidate" :model="formData" :label-width="80" label-position="right">
				<!-- 装置名称 -->
				<FormItem label="装置名称" prop="vcName">
					<Input v-model="formData.vcName" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 装置ID -->
				<FormItem label="装置ID" prop="equipmentID" v-if="!isAdd">
					<Input v-model="formData.equipmentID" disabled placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!--IP -->
				<FormItem label="IP" prop="vcIp">
					<Input v-model="formData.vcIp" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!--端口 -->
				<FormItem label="端口" prop="port">
					<Input v-model="formData.port" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 标识 -->
				<FormItem label="标识" prop="flag">
					<Input v-model="formData.flag" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 排序 -->
				<FormItem label="排序" prop="sort">
					<Input v-model="formData.sort" style="width: 400px" placeholder="请输入..." />
				</FormItem>
				<!-- 类型 -->
				<FormItem label="类型">
					<RadioGroup v-model="formData.type">
						<Radio label="0" value="0">消控装置</Radio>
						<Radio label="1" value="1">用户信息传输装置</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 客户端/服务端 -->
				<FormItem label="工作模式">
					<RadioGroup v-model="formData.server">
						<Radio label="0" value="0">客户端</Radio>
						<Radio label="1" value="1">服务端</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 在线状态 -->
				<!-- <FormItem label="在线状态">
					<RadioGroup v-model="formData.status">
						<Radio label="1" value="1">在线</Radio>
						<Radio label="0" value="0">离线</Radio>
					</RadioGroup>
				</FormItem>-->
				<!-- 状态 -->
				<FormItem label="状态">
					<RadioGroup v-model="formData.isEnable">
						<Radio label="1" value="1">启用</Radio>
						<Radio label="0" value="0">禁用</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 备注 -->
				<FormItem label="备注">
					<Input v-model="formData.vcMemo" placeholder="请输入..." style="width: 400px" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
				</FormItem>
			</Form>

			<div slot="footer">
				<Button type="text" size="large" @click="handleModalCancel">取消</Button>
				<Button type="primary" size="large" :loading="btnLoading" @click="handleModlSave(0)">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
// import mixinTolls from '@/mixin/tools'
export default {
	name: 'device-config',
	mixins: [],
	components: {},
	props: {},
	data() {
		return {
			// axios: this.$api.fireConfig.deviceConfig,
			searchShow: true, // 搜索栏显示隐藏
			btnLoading: false,
			treeData: [], // 左侧树数据
			eye: 'md-eye',
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
			typeCityList: [
				{
					value: 'all',
					label: '全部'
				},
				{
					value: '1',
					label: '用户信息传输装置'
				},
				{
					value: '0',
					label: '消控装置'
				}
			],
			unitId: null, // 变电站id
			orgId: null, // 组织id
			isTree: false, // 判断是否选择了变电站
			isAdd: true, // 判断是新增还是修改
			stationName: '', // 变电站名称
			// 搜索框搜索内容
			searchData: {
				vcName: '',
				isEnable: 'all',
				type: 'all'
			},
			tableColumns: [
				{
					title: '变电站',
					key: 'unitInfoName',
					align: 'center',
					width: 150
				},
				{
					title: '装置名称',
					key: 'vcName',
					align: 'center',
					minWidth: 180
				},
				{
					title: 'IP',
					key: 'vcIp',
					align: 'center',
					width: 150
				},
				{
					title: '端口',
					key: 'port',
					align: 'center',
					width: 100
				},
				{
					title: '在线状态',
					key: 'status',
					align: 'center',
					width: 95,
					render: (h, params) => {
						return h('div', [params.row.status == '1' ? h('p', params.row.status1) : h('b', params.row.status1)])
					}
				},
				{
					title: '状态',
					key: 'isEnable',
					align: 'center',
					width: 65,
					render: (h, params) => {
						return h('div', [params.row.isEnable == '1' ? h('p', params.row.isEnable1) : h('b', params.row.isEnable1)])
					}
				},

				{
					title: '工作模式',
					key: 'server',
					align: 'center',
					width: 95,
					render: (h, params) => {
						return h('div', [params.row.server == '1' ? h('b', params.row.server1) : h('p', params.row.server1)])
					}
				},
				{
					title: '类型',
					key: 'type',
					align: 'center',
					width: 150,
					render: (h, params) => {
						return h('div', [params.row.type == '1' ? h('i', params.row.type1) : h('i', params.row.type1)])
					}
				},
				{
					title: '标识',
					key: 'flag',
					align: 'center',
					width: 65
				},
				{
					title: '排序',
					key: 'sort',
					align: 'center',
					width: 65
				},
				{
					title: '备注',
					key: 'vcMemo',
					align: 'center',
					minWidth: 150,
					maxWidth: 250
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
											this.handleRemove(1, params)
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
			modalShow: false, // 弹窗显示
			modalTitle: '新增', // 弹窗标题
			formData: {
				unitID: '', // 站所ID
				vcName: '', // 装置名称
				equipmentID: '', // 装置ID
				status: '1', // 0： 离线  1：在线
				vcIp: '', // IP
				type: '0', // 类型 0：消控装置  1：用户信息传输装置
				server: '0', // 0： 作为客户端  1： 作为服务端
				port: '', // 端口
				isEnable: '1', // 0:禁用 1: 启用
				sort: '', // 排序
				vcMemo: '', // 冗余
				flag: '' // 标示
			},
			// 表单验证
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }],
				equipmentID: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				vcIp: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{
						pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
						message: '请输入正确的IP地址',
						trigger: 'blur'
					}
				],
				port: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					// { pattern: /^[0-9]\d{0,3}$/, message: '请正确输入端口号', trigger: 'change' }
					{ pattern: /^[0-9]*$/, message: '请正确输入端口号', trigger: 'change' }
				],
				flag: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入数字标识', trigger: 'change' }
				],
				sort: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入数字排序', trigger: 'change' }
				]
			},
			removeList: [], // 批量删除的列表
			// 分页信息
			total: 0,
			page: 1,
			pageSize: 20
		}
	},
	computed: {},
	filters: {},
	watch: {
		// 监听弹窗关闭 关闭后重置弹窗内容
		modalShow(val) {
			if (!val) {
				for (let k in this.formData) {
					this.formData[k] = ''
				}
				this.formData.status = '1'
				this.formData.type = '0'
				this.formData.server = '0'
				this.formData.isEnable = '1'
				this.$refs['add-form'].resetFields()
			}
		},
		// 搜索框的显示和隐藏 更换图标
		searchShow(val) {
			if (val) {
				this.eye = 'md-eye'
			} else {
				this.eye = 'md-eye-off'
			}
		}
	},
	created() {
		this.getStationTree()
		this.getTable()
	},
	mounted() {
		console.log(this.$api)
	},
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
		// 获取站点树
		async getStationTree() {
			let result = await this.$api.deviceCofig.getUnitTree({ iFlag: 2 })
			if (result.code == 200) {
				this._forEach(result.data, true, item => {
					item.expand = true
				})
				this.treeData = result.data
			}
		},
		// 左侧树点击
		handleStationTree(data) {
			if (data[0].flag == 0) {
				// 如果不是变电站
				this.unitId = ''
				this.orgId = data[0].id
				this.isTree = false // 新增不能点击
			} else {
				// 是变电站
				this.unitId = data[0].id
				this.orgId = ''
				this.isTree = true
			}
			this.getTable()
			this.stationName = data[0].title
		},
		// 查询
		searchStation() {
			this.getTable()
		},
		// 重置查询
		handleResetData() {
			this.searchData.vcName = ''
			this.searchData.isEnable = 'all'
			this.searchData.type = 'all'
			this.getTable()
		},
		// 获取表格数据
		getTable() {
			let params = {
				unitID: this.unitId,
				orgID: this.orgId,
				vcName: this.searchData.vcName,
				isEnable: this.searchData.isEnable == 'all' ? '' : this.searchData.isEnable,
				type: this.searchData.type == 'all' ? '' : this.searchData.type,
				currentPage: this.page,
				pageSize: this.pageSize
			}
			this.$api.deviceCofig.getEquipment(params).then(res => {
				if (res.code == 200 && res.data) {
					res.data.list.forEach(item => {
						item.status1 = item.status == '0' ? '离线' : '在线'
						item.type1 = item.type == '0' ? '消控装置' : '用户信息传输装置'
						item.server1 = item.server == '0' ? '客户端' : '服务端'
						item.isEnable1 = item.isEnable == '0' ? '禁用' : '启用'
					})
					this.tableData = res.data.list
					this.total = res.data.total
				}
			})
		},
		// 新增/修改
		handleModalShow(type, params) {
			// 新增
			if (type == 0) {
				this.modalTitle = '新增'
				if (this.isTree) {
					this.modalShow = true
					this.isAdd = true
					this.formData.unitID = this.unitId
				} else {
					this.$Message.warning('请选择左侧变电站')
				}
				// 修改
			} else {
				this.modalTitle = '修改'
				this.isAdd = false
				this.modalShow = true
				this.formData = JSON.parse(JSON.stringify(params.row))
				for (let k in this.formData) {
					if (k == 'port' || 'flag' || 'status' || 'type' || 'server' || 'isEnable' || 'sort') {
						this.formData[k] = this.formData[k] + ''
					}
				}
			}
		},
		// 弹窗保存
		handleModlSave() {
			if (this.isAdd) {
				// 新增
				this.validateForm('add-form', () => {
					this.btnLoading = true
					let params = JSON.parse(JSON.stringify(this.formData))
					this.axios
						.saveEquipment(params)
						.then(res => {
							if (res.code == 200) {
								this.modalShow = false
								this.$Message.success('保存成功')
								this.getTable()
							}
							this.btnLoading = false
						})
						.catch(error => {
							console.log(error)
							this.btnLoading = false
						})
				})
			} else {
				this.validateForm('add-form', () => {
					this.btnLoading = true
					let upData = JSON.parse(JSON.stringify(this.formData))
					let params = {}
					for (const key in upData) {
						if (key.indexOf('1') > -1) {
							continue
						} else {
							params[key] = upData[key]
						}
					}
					this.axios
						.updateEquipment(params)
						.then(res => {
							if (res.code == 200) {
								this.modalShow = false
								this.$Message.success('保存成功')
								this.getTable()
							}
							this.btnLoading = false
						})
						.catch(error => {
							console.log(error)
							this.btnLoading = false
						})
				})
			}
		},
		// 弹窗取消
		handleModalCancel() {
			this.modalShow = false
		},
		// 删除
		handleRemove(type, params) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除所选项?',
				onOk: () => {
					this.axios.delEquipment({ equipmentID: params.row.equipmentID }).then(res => {
						if (res.code == 200) {
							this.$Message.success('删除成功')
							this.getTable()
						} else {
							this.$Message.warning(res.msg)
						}
					})
				},
				onCancel: () => {}
			})
		},
		// 全选与单选
		handleSelectAll(selection) {
			this.removeList = []
			if (selection.length > 0) {
				for (let i = 0; i < selection.length; i++) {
					let obj = {}
					obj.equipmentID = selection[i].equipmentID
					this.removeList.push(obj)
				}
			}
		},
		// 双击表格
		dblclick(row) {
			let data = {
				row: row
			}
			this.handleModalShow(1, data)
		},
		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.getTable()
		},
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getTable()
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
.device-config {
  width: 100%;
  height: calc(100vh - 160px);

  .left-tree {
    width: 240px;
    height: calc(100% - 30px);
    background-color: #fff;
    border: 10px solid #fff;
    overflow: auto;
    float: left;
  }

  .right-content {
    width: calc(100% - 250px);
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

      /deep/.ivu-table {
        p {
          color: #19be6b;
        }

        b {
          font-weight: 400;
          color: #ff9900;
        }

        i {
          font-style: normal;
        }
      }

      /deep/tr.ivu-table-row-hover td {
        background-color: #F5F7FA;
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
          transform: translateX(-50%);
        }
      }
    }
  }
}

/deep/.ivu-radio-wrapper {
  font-size: 14px !important;
}

/deep/.ivu-input-disabled {
  color: #515a6e;
}
</style>
