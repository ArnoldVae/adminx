<template>
	<div class="area-manage">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="treeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<!-- 右侧内容 -->
		<div class="right-content">
			<!-- 工具栏 -->
			<div class="tool-bar">
				<searche-Header-Wrapper>
					<div class="btn-box">
						<Button type="success" size="large" icon="md-add" @click="handleModalShow(0)">新增</Button>
						<Button type="primary" size="large" :icon="eye" @click="searchShow = !searchShow">筛选</Button>
					</div>
				</searche-Header-Wrapper>
			</div>
			<!-- 搜索栏 -->
			<transition name="el-fade-in-linear">
				<div class="search-bar" v-show="searchShow">
					<searche-Header-Wrapper>
						<form-item
							title="变电站"
							type="text"
							v-model="searchData.unitName"
							placeholder="输入变电站查询"
							@on-enter="searchArea"
							clearable
						></form-item>
						<form-item title="区域" type="text" v-model="searchData.vcName" placeholder="输入区域查询" @on-enter="searchArea" clearable></form-item>
						<form-item title="编码" type="text" v-model="searchData.vcCode" placeholder="输入编码查询" @on-enter="searchArea" clearable></form-item>
						<form-item
							title="主类型"
							type="select"
							v-model="minType"
							:options="searchMainTypeList"
							:setings="{ value: 'value', label: 'label' }"
						></form-item>
						<form-item
							title="子类型"
							type="select"
							v-model="subType"
							:options="searchSubTypeList"
							:setings="{ value: 'value', label: 'label' }"
						></form-item>
						<div style="width: 100%;">
							<Button type="info" size="large" icon="md-search" @click="searchArea">查询</Button>
							<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
							<Button type="error" size="large" icon="md-trash" @click="handleRemove(0)">批量删除</Button>
						</div>
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
					@on-selection-change="handleSelectAll"
					@on-row-dblclick="dblclick"
					:height="650"
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
		<Modal v-model="modalShow" :title="modalTitle" :mask-closable="false">
			<Form ref="add-form" :rules="ruleValidate" :model="addFormData" :label-width="70" label-position="right">
				<!-- 变电站 -->
				<FormItem label="变电站">
					<Input v-model="stationName" :disabled="true" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 区域 -->
				<FormItem label="区域" prop="vcName">
					<Input v-model="addFormData.vcName" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 编码 -->
				<FormItem label="编码" prop="vcCode">
					<Input v-model="addFormData.vcCode" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 主类型 -->
				<FormItem label="主类型">
					<RadioGroup v-model="addFormData.iMainType">
						<Radio v-for="item in mainTypeList" :label="item.value" :value="item.value" :key="item.value">{{ item.label }}</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 子类型 -->
				<FormItem label="子类型">
					<RadioGroup v-model="addFormData.iSubType">
						<Radio v-for="item in subTypeList" :label="item.value" :value="item.value" :key="item.value">{{ item.label }}</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 平面图url -->
				<FormItem label="平面图url">
					<Input v-model="addFormData.svgId" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 3D模型url -->
				<FormItem label="3D模型url">
					<Input v-model="addFormData.t3DId" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<!-- 状态 -->
				<FormItem label="状态">
					<RadioGroup v-model="addFormData.iIsEnable">
						<Radio label="1" value="1">启用</Radio>
						<Radio label="0" value="0">禁用</Radio>
					</RadioGroup>
				</FormItem>
				<!-- 排序 -->
				<FormItem label="排序" prop="iSort">
					<Input v-model="addFormData.iSort" style="width: 400px" placeholder="请输入..." />
				</FormItem>
				<!-- 备注 -->
				<FormItem label="备注">
					<Input v-model="addFormData.vcMemo" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入..." style="width: 400px" />
				</FormItem>
			</Form>

			<div slot="footer">
				<Button type="text" size="large" @click="handleModalCancel">取消</Button>
				<Button type="primary" size="large" @click="handleSaveArea(0)">确认</Button>
			</div>
		</Modal>
		<!-- 平面图url弹窗 -->
		<Modal v-model="platformModal" title="平面图url" footer-hide width="1000" :fullscreen="bigModal">
			<div class="svgBox">
				<div id="svgCon" class="svgCon" :key="svgKey"></div>
			</div>
			<div slot="footer">
				<Button type="warning" size="large" @click="modalShow = true">修改</Button>
			</div>
		</Modal>
		<!-- 3D模型url弹窗 -->
		<div class="3d-box">
			<Modal v-model="threeModal" title="3D模型url" footer-hide width="1000" :fullscreen="bigModal">
				<div class="svgBox">
					<div id="svgCon1" class="svgCon1" :key="svgKey"></div>
				</div>
				<div slot="footer">
					<Button type="warning" size="large" @click="modalShow = true">修改</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>
<script>
import mixinTolls from '@common/mixin/tools'
export default {
	name: 'area-manage',
	mixins: [mixinTolls],
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.areaManage,
			searchShow: true,
			bigModal: true,
			eye: 'md-eye',
			// 树数据
			treeData: [],
			// 查询条件数据
			searchData: {
				unitName: '',
				vcName: '',
				vcCode: ''
			},
			minType: 'all',
			subType: 'all',
			// 搜索主类型
			searchMainTypeList: [{ label: '全部', value: 'all' }],
			// 搜索子类型
			searchSubTypeList: [{ label: '全部', value: 'all' }],
			// 主类型 //1002 1003
			mainTypeList: [],
			// 子类型
			subTypeList: [],
			// 表格
			tableColumns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '变电站',
					key: 'unitName',
					width: '110',
					align: 'center'
				},
				{
					title: '区域',
					key: 'vcName',
					align: 'center',
					width: 120
				},
				{
					title: '编码',
					key: 'vcCode',
					width: '100',
					align: 'center'
				},
				{
					title: '主类型',
					key: 'minType',
					width: '110',
					align: 'center'
				},
				{
					title: '子类型',
					key: 'subType',
					width: '110',
					align: 'center'
				},
				{
					title: '平面图url',
					key: 'SvgID',
					align: 'center',
					width: '100',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									icon: 'ios-map-outline'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.platformModal = true
									}
								}
							})
						])
					}
				},
				{
					title: '3D模型url',
					key: 'T3DID',
					align: 'center',
					width: '90',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									icon: 'ios-map-outline'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.threeModal = true
									}
								}
							})
						])
					}
				},
				{
					title: '状态',
					key: 'iIsEnable',
					align: 'center',
					width: 80,
					render: (h, params) => {
						return h('div', [params.row.iIsEnable == '1' ? h('p', params.row.iIsEnable1) : h('b', params.row.iIsEnable1)])
					}
				},
				{
					title: '排序',
					key: 'iSort',
					align: 'center',
					Width: 80
				},
				{
					title: '备注',
					key: 'vcMemo',
					align: 'center',
					minWidth: 130
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
			// 表格数据
			tableData: [],
			// 表单验证
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }],
				vcCode: [{ required: true, message: '该项为必填项', trigger: 'blur' }, { pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }],
				iSort: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入排序数字', trigger: 'change' }]
			},
			// 添加的表单数据
			addFormData: {
				unitId: '',
				vcCode: '',
				vcName: '',
				iMainType: '0',
				iSubType: '0',
				svgId: '',
				t3DId: '',
				iParam1: '',
				iParam2: '',
				iParam3: '',
				vcParam1: '',
				vcParam2: '',
				vcParam3: '',
				iSort: '0',
				iIsEnable: '1',
				iFlag: '2',
				vcMemo: ''
			},
			removeList: [], // 批量删除
			orgId: '',
			unitId: '',
			areaId: '',
			modalShow: false, // 新增的弹窗
			upModalShow: false, // 修改的弹窗
			modalTitle: '新增',
			platformModal: false, // 平面图url弹窗
			threeModal: false, // 3D模型url弹窗
			isTree: true, // 判断有没有点击树
			isAdd: true, // 判断新增还是修改 设置禁用
			stationName: '',
			pageFlag: false,
			page: 1,
			pageSize: 20,
			total: 0,
			svgKey: 1
		}
	},
	computed: {},
	filters: {},
	watch: {
		modalShow(val) {
			// 监听弹窗关闭 关闭后重置弹窗内容
			if (!val) {
				for (let k in this.addFormData) {
					if (k != 'unitId') {
						this.addFormData[k] = ''
					}
				}
				this.addFormData.iIsEnable = '1'
				this.addFormData.iFlag = '2'
				this.$refs['add-form'].resetFields()
			}
		},
		upModalShow(val) {
			if (!val) {
				this.$refs['up-form'].resetFields()
			}
		},
		searchShow(val) {
			if (val) {
				this.eye = 'md-eye'
			} else {
				this.eye = 'md-eye-off'
			}
		},
		platformModal(val) {
			if (val) {
				this.htSvg(0)
			} else {
				this.svgKey++
				if (this.svgKey == 10) {
					this.svgKey = 1
				}
			}
		},
		threeModal(val) {
			if (val) {
				this.htSvg(1)
			} else {
				this.svgKey++
				if (this.svgKey == 10) {
					this.svgKey = 1
				}
			}
		},
		searchData: {
			handler(newVal) {
				// if (newVal.unitName == '' && newVal.vcName == '' && newVal.vcCode == '' && this.minType == 'all' && this.subType == 'all') {
				this.pageFlag = false
				// }
			},
			deep: true
		}
	},
	created() {
		this.getStationTree()
		this.findDic()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 递归
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
		// 条件查询
		searchArea() {
			if (
				this.searchData.unitName == '' &&
				this.searchData.vcName == '' &&
				this.searchData.vcCode == '' &&
				this.minType == 'all' &&
				this.subType == 'all'
			) {
				this.pageFlag = false
			} else {
				this.pageFlag = true
			}
			this.getAreaTable()
		},
		// 获取站点树
		async getStationTree() {
			let result = await this.axios.getUnitTree({ iFlag: 2 })
			if (result.code == 200) {
				this._forEach(result.data, true, item => {
					item.expand = true
				})
				if (result.data[0].flag == 0) {
					this.addFormData.unitId = ''
					this.orgId = result.data[0].id
				} else {
					this.orgId = ''
					this.addFormData.unitId = result.data[0].id
				}

				this.getAreaTable()
				this.treeData = result.data
			}
		},
		// 站点树点击事件
		handleStationTree(data) {
			if (data.length > 0) {
				// 第一次点击
				if (data[0].flag == 0) {
					// 如果不是变电站
					this.unitId = ''
					this.orgId = data[0].id
					this.isTree = true // 新增不能点击
				} else {
					// 是变电站
					this.unitId = data[0].id
					this.orgId = ''
					this.isTree = false
				}

				this.stationName = data[0].title

				this.getAreaTable()
			} else {
				this.isTree = true
			}
		},
		// 重置查询
		handleResetData() {
			this.searchData.unitName = ''
			this.searchData.vcName = ''
			this.searchData.vcCode = ''
			this.minType = 'all'
			this.subType = 'all'
			this.page = 1
			this.pageSize = 20
			this.getAreaTable()
		},
		// 添加按钮
		handleModalShow(data, params) {
			data == 0 ? (this.modalTitle = '新增') : (this.modalTitle = '修改')
			data == 0 ? (this.isAdd = true) : (this.isAdd = false)
			if (data == 0) {
				// 新增
				if (!this.isTree) {
					for (let k in this.addFormData) {
						this.addFormData[k] = ''
					}
					this.addFormData.unitId = this.unitId
					this.addFormData.iIsEnable = '1'
					this.addFormData.iMainType = this.mainTypeList[0].value + ''
					this.addFormData.iSubType = this.subTypeList[0].value + ''
					this.addFormData.iFlag = '2'
					this.addFormData.iSort = '0'
					this.modalShow = true
					console.log(this.mainTypeList)
				} else {
					this.$Message.warning('请选择左侧变电站')
				}
			} else if (data == 1) {
				this.areaId = params.row.areaId
				// 修改
				for (let k in this.addFormData) {
					this.addFormData[k] = params.row[k]
				}
				this.stationName = params.row.unitName
				this.modalShow = true
			}
		},
		// 双击表格修改弹窗
		dblclick(row) {
			let data = {
				row: row
			}
			this.handleModalShow(1, data)
		},
		// 获取表格数据
		async getAreaTable() {
			let params = {
				unitId: this.unitId,
				orgId: this.orgId,
				unitName: this.searchData.unitName,
				vcName: this.searchData.vcName,
				vcCode: this.searchData.vcCode,
				iMainType: this.minType == 'all' ? '' : this.minType,
				iSubType: this.subType == 'all' ? '' : this.subType,

				page: {
					currentPage: this.page,
					pageSize: this.pageSize
				}
			}
			if (!this.pageFlag) {
				params.unitName = ''
				params.vcName = ''
				params.vcCode = ''
				params.iMainType = ''
				params.iSubType = ''
			}
			let result = await this.axios.getAreaTable(JSON.stringify(params))
			if (result.code == 200) {
				result.data.lists.forEach(item => {
					item.iSort = item.iSort - 0
					if (item.iIsEnable == 1) {
						item.iIsEnable1 = '启用'
					} else if (item.iIsEnable == 0) {
						item.iIsEnable1 = '禁用'
					} else {
						item.iIsEnable1 = item.iIsEnable
					}
					for (let i = 0; i < this.mainTypeList.length; i++) {
						if (item.iMainType == this.mainTypeList[i].value) {
							item.minType = this.mainTypeList[i].label
						}
					}
					for (let j = 0; j < this.subTypeList.length; j++) {
						if (item.iSubType == this.subTypeList[j].value) {
							item.subType = this.subTypeList[j].label
						}
					}
				})

				this.tableData = result.data.lists
				this.total = result.data.page.totalNum
			}
		},
		// 弹窗保存
		handleSaveArea(data) {
			if (this.isAdd) {
				// 新增
				this.validateForm('add-form', () => {
					let params = JSON.parse(JSON.stringify(this.addFormData))
					params.iSort = params.iSort - 0
					this.axios.saveArea(JSON.stringify(params)).then(res => {
						if (res.code == 200) {
							this.modalShow = false
							this.$Message.success('保存成功')
							this.getAreaTable()
						}
					})
				})
			} else if (!this.isAdd) {
				// 修改
				this.validateForm('add-form', () => {
					let params = JSON.parse(JSON.stringify(this.addFormData))
					params.iSort = params.iSort - 0
					params.areaId = this.areaId
					this.axios.upArea(JSON.stringify(params)).then(res => {
						if (res.code == 200) {
							this.modalShow = false
							this.$Message.success('修改成功')
							this.getAreaTable()
						}
					})
				})
			}
		},
		// 弹窗取消
		handleModalCancel() {
			this.modalShow = false
			this.upModalShow = false
		},
		// 删除
		handleRemove(data, params) {
			if (data == 0) {
				// 批量删除
				if (this.removeList.length > 0) {
					this.$Modal.confirm({
						title: '删除',
						content: '确认删除所选项?',
						onOk: () => {
							this.axios.delArea(JSON.stringify(this.removeList)).then(res => {
								if (res.code == 200 && res.success) {
									this.getAreaTable()
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
				// 单个删除
				this.$Modal.confirm({
					title: '删除',
					content: '确认删除所选项?',
					onOk: () => {
						let removeData = [
							{
								areaId: params.row.areaId
							}
						]

						this.axios.delArea(JSON.stringify(removeData)).then(res => {
							if (res.code == 200 && res.success) {
								this.getAreaTable()
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
		// 全选
		handleSelectAll(selection) {
			this.removeList = []
			if (selection.length > 0) {
				for (let i = 0; i < selection.length; i++) {
					let obj = {}
					obj.areaId = selection[i].areaId
					this.removeList.push(obj)
				}
			}
		},
		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.getAreaTable()
		},
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getAreaTable()
		},
		// HT
		htSvg(flag) {
			let boxId = null
			let svgName = null
			if (flag == 0) {
				boxId = 'svgCon'
				svgName = 'dsqRoutineMap'
			} else {
				boxId = 'svgCon1'
				svgName = 'dsqRoutineMap'
			}
			let ht = (this._ht = global.ht)
			let dataModel = (this._dataModel = global.dataModel = new ht.DataModel())
			let graphView = (this._graphView = global.graphView = new ht.graph.GraphView(dataModel))
			const svgContanier = document.getElementById(boxId)
			graphView.addToDOM(svgContanier)
			graphView.setMovableFunc(function() {
				return false
			})
			ht.Default.xhrLoad('ht/storage/scenes/' + svgName + '.json', text => {
				const json = this._ht.Default.parse(text)
				dataModel.deserialize(json)
				graphView.fitContent(true)
				global.addEventListener('resize', function() {
					graphView.fitContent()
				})
				graphView.getSelectWidth = function() {
					return 0
				}
				graphView.setScrollBarSize(0)
			})
		},
		// 查询字典组列表
		findDic() {
			this.axios.findDicList({ dictGroupID: 1002 }).then(res => {
				if (res.data && res.code == 200) {
					console.log(res.data)
					for (let i = 0; i < res.data.length; i++) {
						let obj = { label: res.data[i].vcName, value: res.data[i].dictID + '' }
						this.mainTypeList.push(obj)
						this.searchMainTypeList.push(obj)
					}
				}
			})
			this.axios.findDicList({ dictGroupID: 1003 }).then(res => {
				if (res.data && res.code == 200) {
					for (let i = 0; i < res.data.length; i++) {
						let obj = { label: res.data[i].vcName, value: res.data[i].dictID + '' }
						this.subTypeList.push(obj)
						this.searchSubTypeList.push(obj)
					}
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
.area-manage {
  width: 100%;
  height: calc(100vh - 140px);

  .left-tree {
    width: 230px;
    height: calc(100% - 50px);
    background-color: #fff;
    border: 10px solid #fff;
    overflow: auto;
    float: left;
  }

  .right-content {
    width: calc(100% - 240px);
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
        height: calc(100% - 50px) !important;
      }

      /deep/.ivu-table-body, /deep/.ivu-table-overflowY {
        height: calc(100% - 40px) !important;
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
        bottom: 2px;

        .page-content {
          width: 800px;
          margin-left: 50%;
          transform: translateX(-35%);
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

  /deep/ .ivu-modal-wrap {
    .ivu-modal-body {
      padding: 0;
    }
  }
}

.svgBox {
  width: 100%;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  position: relative;

  .svgCon {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

/deep/.ivu-radio-wrapper {
  font-size: 14px !important;
}
</style>
