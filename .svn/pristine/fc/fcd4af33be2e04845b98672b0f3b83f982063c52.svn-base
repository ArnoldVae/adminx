<template>
	<div class="data-robot" ref="data-robot">
		<div class="org-tree-wrapper">
			<div v-loading="orgTreeDataLoading">
				<search-tree ref="bus-org-search-tree" :data="orgTreeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
					<Icon type="ios-search" slot="suffix" />
				</search-tree>
			</div>
		</div>
		<div class="org-tree-wrapper">
			<div v-loading="busTreeLoading">
				<search-tree ref="bus-bus-search-tree" :data="busTreeData" @on-select-change="handleBusTree" placeholder="输入关键词搜索...">
					<Icon type="ios-search" slot="suffix" />
				</search-tree>
			</div>
		</div>
		<div class="right-content">
			<transition name="el-fade-in-linear">
				<div class="search-bar" v-show="tableDiv">
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
			<!-- 服务点击serviceDiv -->
			<div class="table-content service" v-show="serviceDiv">
				<el-button>机器人</el-button>
				<el-button>测点</el-button>
				<el-button>任务</el-button>
				<el-button>计划</el-button>
				<el-button>视频</el-button>
			</div>
			<!-- 机器人查视频 serviceFlag-->
			<RobotContent v-if="serviceFlag" :myRobotId="myRobotId" :myUnitId="unitId"></RobotContent>
			<!-- 表格 -->
			<div class="table-content" v-show="tableDiv">
				<Table border ref="selection" :columns="tableColumns" :data="tableData" :height="900" :loading="loading"></Table>
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
		<!-- 对话框 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>确认上传？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="onDialog(point)">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 导入 -->
		<Modal v-model="upLoad" width="900" title="文件导入" footer-hide>
			<Tabs active-key="key1" style="min-height:400px">
				<Tab-pane label="LN室外地面机器人JSON" key="key1">
					<div class="upload-content ln-upload" style="height:auto;">
						<div class="org-tree-wrapper left-tree">
							<div v-loading="lNJsonLoading">
								<search-tree :data="lNJsonTreeData" placeholder="输入关键词搜索...">
									<Icon type="ios-search" slot="suffix" />
								</search-tree>
							</div>
						</div>
						<!-- <i-input
							type="text"
							v-model="lnVcCode"
							placeholder="请输入编码(室内1000至室外2000)"
							style="width:200px"
							@on-blur="lnJsonBlur"
						></i-input>-->
						<div class="slect-Json">
							<div>
								<Upload type="select" :before-upload="handleLnJsonUpload" action :accept="lnJson">
									<div>
										<i-button size="large" type="success">选择文件</i-button>
									</div>
								</Upload>
							</div>

							<div v-if="lnJsonFile !== null" class="up-out-box">
								待上传文件:
								<span>
									<div class="del" @click="removeLnJsonFile">
										<i class="el-icon-delete"></i>
									</div>
									{{ lnJsonFile.name }}
								</span>
							</div>
						</div>

						<div class="upload-json">
							<Button class="btn2" type="success" size="large" icon="md-cloud-upload" @click="lnJsonUpload" :loading="lnJsonloading">{{
								lnJsonloading ? '文件上传中 请稍后...' : '上传'
							}}</Button>
						</div>
					</div>
				</Tab-pane>
				<Tab-pane label="室内地面机器人EXCEL" key="key2">
					<div class="special-content">
						<div class="org-tree-wrapper left-tree">
							<div v-loading="excelTreeLoading">
								<search-tree :data="upLoadTreeData" placeholder="输入关键词搜索...">
									<Icon type="ios-search" slot="suffix" />
								</search-tree>
							</div>
						</div>

						<div class="upload-content excel-upload">
							<div>
								<Upload type="select" :before-upload="handleUpload" action :accept="accept">
									<div>
										<i-button size="large" type="success">选择文件</i-button>
									</div>
								</Upload>
								<div v-if="file !== null" class="up-out-box">
									待上传文件:
									<span>
										<div class="del" @click="removeFile">
											<i class="el-icon-delete"></i>
										</div>
										{{ file.name }}
									</span>
								</div>
							</div>
							<div class="upload-footer">
								<Button class="btn2" type="success" size="large" icon="md-cloud-upload" @click="upload" :loading="loadingStatus">{{
									loadingStatus ? '文件上传中 请稍后...' : '上传'
								}}</Button>
							</div>
						</div>
					</div>
				</Tab-pane>
				<Tab-pane label="YJH室内地面机器人JSON" key="key3">
					<div class="upload-content" v-if="false">
						<Steps class="steps" :current="step" title="文件上传步骤" direction="vertical">
							<Step title="步骤一" content="先选择左侧变电站"></Step>
							<Step title="步骤二" content="点击选择导入文件"></Step>
							<Step title="步骤三" content="选择完毕后点击'导入'按钮进行上传"></Step>
							<Step title="步骤四" content="等待导入成功"></Step>
						</Steps>
						<Upload type="drag" :before-upload="handleUpload" action>
							<div style="padding: 20px 0">
								<Icon type="ios-add-circle-outline" size="52" style="color: #3399ff"></Icon>
								<p>选择上传文件</p>
							</div>
						</Upload>
						<div v-if="file !== null" class="up-box">
							待上传文件:
							<span>
								<div class="del" @click="removeFile">
									<i class="el-icon-delete"></i>
								</div>
								{{ file.name }}
							</span>
						</div>
					</div>
				</Tab-pane>
				<Tab-pane label="YJH室外地面机器人JSON" key="key4">
					<div class="upload-content" v-if="false">
						<Steps class="steps" :current="step" title="文件上传步骤" direction="vertical">
							<Step title="步骤一" content="先选择左区域名称"></Step>
							<Step title="步骤二" content="点击选择上传文件"></Step>
							<Step title="步骤三" content="选择完毕后点击'上传'按钮进行上传"></Step>
							<Step title="步骤四" content="等待上传成功"></Step>
						</Steps>
						<Upload type="drag" :before-upload="handleUpload" action>
							<div style="padding: 20px 0">
								<Icon type="ios-add-circle-outline" size="52" style="color: #3399ff"></Icon>
								<p>选择上传文件</p>
							</div>
						</Upload>
						<div v-if="file !== null" class="up-box">
							待上传文件:
							<span>
								<div class="del" @click="removeFile">
									<i class="el-icon-delete"></i>
								</div>
								{{ file.name }}
							</span>
						</div>
					</div>
				</Tab-pane>
			</Tabs>
		</Modal>
	</div>
</template>
<script>
import RobotContent from './robot'
import { ModalConfig } from '@/libs/construction'
import elementTable from '_b/element-table'
import mixinTolls from '@common/mixin/tools'
import { findComponentUpward, findComponentDownward } from '@/libs/assist'

import treeSelect from '@/components/business/tree-select'
import { close } from 'fs'
import { setTimeout } from 'timers'

export default {
	name: 'data-robot',
	mixins: [mixinTolls],
	components: {
		elementTable,
		treeSelect,
		RobotContent
	},
	props: {},
	data() {
		return {
			lNJsonLoading: false,
			lNJsonTreeData: [],
			// excelRobotId: '',
			point: 0,
			dialogVisible: false,
			excelServiceId: '',
			excelTreeLoading: false,
			lnServiceId: '',
			// lnVcCode: '',
			accept: '.xlsx',
			lnJson: '.json',
			// excelVcCode: '',
			upParentId: '',
			// uptreeId: '',
			// upFlag: false,
			loadingStatus: false,
			lnJsonloading: false,
			upLoadTreeData: [],
			myRobotId: '',
			serviceFlag: false,
			UploadUnitId: '',
			tableDiv: true,
			serviceDiv: false,
			transData: [],
			axios: this.$api.systemsManage.inspectionService,
			unitId: '',
			upLoad: false,
			loading: false,
			tableColumns: [
				{ title: '服务名称', key: 'vcName', width: '150', align: 'center', tooltip: true },
				{ title: '服务ID', key: 'vcKey', width: '150', align: 'center' },
				{ title: '协议', key: 'typeStr', width: '120', align: 'center' },
				{ title: '服务地址', key: 'vcIp', width: '120', align: 'center' },
				{ title: '服务端口', key: 'iPort', width: '100', align: 'center' },
				{ title: 'web端口', key: 'initWebPort', width: '100', align: 'center' },
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
											this.handleModalShow(params)
										}
									}
								},
								'导入'
							)
						])
					}
				}
			],
			step: 0,
			file: null,
			lnJsonFile: null,
			isFile: false,
			lnJsonIsFile: false,
			page: 1,
			pageSize: 10,
			searchData: '',
			orgTreeDataLoading: false,

			tableReset: true,
			addAndEditModal: false,

			total: 0,
			currentPage: 1,

			http: this.$api.businessTree,
			areaHttp: this.$api.areasManage.areaManage,
			dataHttp: this.$api.systemsManage.dataRobot,
			enums: null,
			// 左侧树 数据
			orgTreeData: [],
			tableData: [],
			addFlag: true,

			busTreeData: [],
			areaId: '',
			busTreeLoading: false
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.init()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		openVideo() {
			this.serviceFlag = true
			this.tableDiv = false
			this.serviceDiv = false
		},

		lnJsonUpload() {
			// 点击上传
			// if (this.lnVcCode == '') {
			// 	this.$Message.warning({ duration: 3, content: '请输入编码(室内1000至室外2000)' })
			// 	return
			// }
			if (!this.lnJsonIsFile) {
				this.$Message.warning('请选择需要上传的文件')
				return
			}
			this.point = 0
			this.dialogVisible = true
		},

		// lnJsonBlur() {
		// 	let reg = /^[0-9]*[1-9][0-9]*$/g
		// 	if (!reg.test(this.lnVcCode)) {
		// 		this.lnVcCode = ''
		// 		this.$Message.error('请输入1000至2000之间的整数')
		// 	}
		// 	let num = parseFloat(this.lnVcCode)
		// 	if (num < 1000 || num > 2000) {
		// 		this.$Message.error('请输入1000至2000之间的整数')
		// 		this.lnVcCode = ''
		// 	}
		// },

		//上传提交
		onDialog(point) {
			this.dialogVisible = false
			if (point == 1) {
				//excel上传
				this.loadingStatus = true
				let params = new FormData()
				params.append('file', this.file)
				params.append('unitId', this.unitId)
				params.append('parentId', '0')
				// params.append('areaId', this.uptreeId)
				// params.append('vcCode', this.excelVcCode)
				params.append('vcCode', '1200')
				params.append('serviceId', this.excelServiceId)
				this.dataHttp
					.uploadHomeEXCCEL(params)
					.then(res => {
						if (res.code == 200) {
							this.file = null
							this.loadingStatus = false
							this.upLoadTreeData = []
							this.$Message.success({ duration: 3, content: '文件上传成功' })
						} else if (res.code == null) {
							this.$Message.error({ duration: 4, content: '同一区域只能上传一次文件，请重新选择区域上传' })
							this.loadingStatus = false
						} else {
							this.$Message.error(res.msg)
							this.loadingStatus = false
						}
					})
					.catch(err => {
						this.$Message.error('上传失败')
						this.loadingStatus = false
					})
			}
			if (point == 0) {
				// LNJSON上传
				this.lnJsonloading = true
				let params = new FormData() // 创建form对象
				params.append('multipartFile', this.lnJsonFile)
				params.append('unitId', this.unitId)
				params.append('serviceId', this.lnServiceId)
				params.append('vcCode', '2300')
				this.dataHttp
					.upLoadLnJson(params)
					.then(res => {
						if (res.code == 200) {
							this.lnJsonFile = null
							this.lnJsonloading = false
							this.lNJsonTreeData = []
							// this.lnVcCode = ''
							this.$Message.success({ duration: 3, content: '文件上传成功' })
						} else {
							this.$Message.error(res.msg)
							this.lnJsonloading = false
						}
					})
					.catch(err => {
						this.$Message.error(err)
						this.lnJsonloading = false
					})
			}
		},

		upload() {
			// if (!this.upFlag) {
			// 	this.$Message.warning('请在左边选择一个区域')
			// 	return
			// }
			if (!this.isFile) {
				this.$Message.warning('请选择需要上传的文件')
				return
			}

			this.point = 1
			this.dialogVisible = true
		},

		// 弹窗取消
		handleModalCancel() {
			this.upLoad = false
		},

		// 处理excel预览数据
		mapExcelData(source) {
			return source.map(item => {
				item['title'] = item.text
				if (item.children.length != 0) {
					item['children'] = this.mapExcelData(item.children)
					return item
				} else {
					return item
				}
			})
		},

		// 获取excel预展示数据
		previewExcel(file) {
			this.excelTreeLoading = true
			let params = new FormData()
			params.append('file', file)
			params.append('unitId', this.unitId)
			params.append('parentId', '0')
			this.dataHttp
				.previewExcel(params)
				.then(res => {
					if (res.code == 200) {
						this.upLoadTreeData = this.mapExcelData(res.data)
						this.excelTreeLoading = false
					} else {
						this.$Message.error(res.msg)
					}
				})
				.catch(err => {
					this.$Message.error(err)
				})
		},
		// 选择文件
		handleUpload(file) {
			// 添加文件
			this.file = file
			this.isFile = true
			this.$Message.info({ duration: 6, content: '室内地面机器人EXCEL业务树导入编码将从1200开始' })
			this.previewExcel(file)
			return false
		},

		mapJsonToData(source) {
			return source.map(item => {
				item['title'] = item.text
				if (!item.children) {
					return item
				} else {
					item['children'] = this.mapJsonToData(item.children)
					return item
				}
			})
		},

		// 读取LNJSON文件数据
		buildJsonData(file) {
			this.lNJsonLoading = true
			let reader = new FileReader()
			reader.readAsText(file)
			let that = this
			// 读取成功
			reader.onload = function(e) {
				let Arr = []
				Arr.push(JSON.parse(e.target.result))
				let lNJsonArr = Arr[0].children
				that.lNJsonTreeData = that.mapJsonToData(lNJsonArr)
				that.lNJsonLoading = false
			}
			reader.onerror = function() {
				that.$Message.error({ duration: 3, content: '无法展示JSON文件' })
			}
		},

		// LN室内JSON导入选择文件
		handleLnJsonUpload(file) {
			this.lnJsonFile = file
			this.lnJsonIsFile = true
			this.buildJsonData(file)
			this.$Message.info({ duration: 6, content: 'LN室外地面机器人JSON业务树导入编码将从2300开始' })
			return false
		},

		removeLnJsonFile() {
			this.lnJsonFile = null
			this.lnJsonIsFile = false
			this.lNJsonTreeData = []
			this.lNJsonLoading = false
		},

		// 移除文件
		removeFile() {
			this.file = null
			this.upLoadTreeData = []
			this.excelTreeLoading = false
			this.isFile = false
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

		handleChangePage(page) {
			this.page = page
			this.getAreaTable()
		},

		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getAreaTable()
		},

		// 导入
		handleModalShow(data) {
			this.upLoad = true
			// EXCEL导入
			this.upLoadTreeData = []
			this.loadingStatus = false
			this.file = null
			this.isFile = false
			this.upParentId = ''
			// this.uptreeId = ''
			// this.excelVcCode = ''
			// this.upFlag = false
			this.excelServiceId = data.row.serviceId
			// LNJSON导入
			// this.lnVcCode = ''
			this.lNJsonTreeData = []
			this.lnJsonFile = null
			this.lnJsonIsFile = false
			this.lnJsonloading = false
			this.lnServiceId = data.row.serviceId
		},

		// 简单的树映射
		_forEach(dataVal) {
			let arr = []
			function fun(val) {
				for (let i = 0; i < val.length; i++) {
					arr.push({ id: val[i].id, vcCode: val[i].vcCode })
					if (val[i].children) {
						fun(val[i].children)
					}
				}
			}
			fun(dataVal)
			return arr
		},
		// 初始化
		async init() {
			await this.getOrgTreeData()
		},

		// 组织树加载
		async getOrgTreeData() {
			this.orgTreeDataLoading = true
			this.areaHttp.getUnitTree({ iFlag: 2 }).then(res => {
				if (res.code == 200) {
					this.orgTreeData = this.mapSourceToData(res.data)
					// this.getFirstStation(this.orgTreeData)
					this._forEach(res.data, true, item => {
						if (item.flag == flgaNum) {
							this.unitId = item.id
						}
					})
					if (this.unitId != '') {
						this.findServiceListData()
					}
				}
				this.orgTreeDataLoading = false
			})
		},

		getAreaTable() {
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
			this.axios
				.findServiceListData(datas)
				.then(res => {
					if ((res.code = 200)) {
						this.tableData = [...res.data.pagedModelList]
						this.total = res.data.totalCount
						this.loading = false
					}
				})
				.catch(res => {
					this.loading = false
				})
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
			this.axios
				.findServiceListData(datas)
				.then(res => {
					if ((res.code = 200)) {
						this.transData = [...res.data.pagedModelList]
						this.tableData = [...res.data.pagedModelList]
						this.busTreeLoading = true
						this.busTreeData[0].children = this.transData.map(item => {
							return {
								title: item.vcName,
								serviceId: item.serviceId,
								text: item.vcName,

								checked: false,
								pinyin: null,
								pinyinHead: null,
								phoneticize: null,
								pName: null,
								children: []
							}
						})
						this.busTreeData = this.mapSourceToData(this.busTreeData)
						this.busTreeLoading = false
						res.data.pagedModelList.forEach(item => {
							if (item.intIsEnable == 1) {
								item.intIsEnableN = '启用'
							} else if (item.intIsEnable == 0) {
								item.intIsEnableN = '停用'
							}
						})
						this.total = res.data.totalCount
						this.loading = false
					} else {
						this.$Message.error(res.msg)
						this.tableData = []
						this.loading = false
					}
				})
				.catch(res => {
					this.tableData = []
					this.loading = false
				})
		},

		// 点击业务树
		handleBusTree(node) {
			if (node.length != 0) {
				if (node[0].nodeKey == 0) {
					// 点击的是变电站
					this.tableDiv = true
					this.serviceDiv = false
					this.serviceFlag = false
				} else if (node[0].robotId) {
					// 点击的是机器人
					this.tableDiv = false
					this.serviceDiv = false
					this.myRobotId = node[0].robotId
					// this.serviceFlag = true
					this.tableDiv = false
					this.serviceDiv = false
					this.serviceFlag = false // 销毁组件
					this.$nextTick(() => {
						this.serviceFlag = true // 重建组件
					})
				} else {
					// 点击的是服务
					this.tableDiv = false
					this.serviceFlag = false
					this.serviceDiv = true
					this.getRobotData(node)
				}
			}
		},

		// 根据服务查机器人
		getRobotData(node) {
			this.dataHttp
				.getRobotData({
					serviceId: node[0].serviceId
				})
				.then(res => {
					let childrens = res.data.map(item => {
						return {
							title: item.vcName,
							serviceId: item.serviceId,
							normalVideoId: item.normalVideoId,
							robotId: item.robotId,
							text: item.vcName,

							checked: false,
							pinyin: null,
							pinyinHead: null,
							phoneticize: null,
							pName: null,
							children: []
						}
					})
					for (let item of this.busTreeData[0].children) {
						if (item.nodeKey == node[0].nodeKey) {
							this.$set(item, 'children', childrens)
							break
						}
					}
					this.busTreeData = this.mapSourceToData(this.busTreeData)
				})
		},

		// 室内地面机器人excel导入点击区域树
		// handleTree(node) {
		// 	console.log(node)
		// 	if (node.length != 0) {
		// 		if (node[0].nodeKey !== 0) {
		// 			this.upParentId = node[0].parentId
		// 			// this.uptreeId = node[0].treeId
		// 			// this.excelVcCode = node[0].vcCode
		// 			this.upFlag = true
		// 		} else {
		// 			this.upParentId = ''
		// 			// this.uptreeId = ''
		// 			// this.excelVcCode = ''
		// 			this.upFlag = false
		// 		}
		// 	} else {
		// 		this.upParentId = ''
		// 		// this.uptreeId = ''
		// 		// this.excelVcCode = ''
		// 		this.upFlag = false
		// 	}
		// },

		// 获取区域
		// getUpLoadArea() {
		// 	this.excelTreeLoading = true
		// 	this.dataHttp.getUpLoad({ unitId: this.UploadUnitId }).then(res => {
		// 		this.upLoadTreeData[0].children = res.data.map(item => {
		// 			return {
		// 				title: item.vcName,
		// 				unitId: item.unitId,
		// 				treeId: item.treeId,
		// 				parentId: item.parentId,
		// 				vcCode: item.vcCode,
		// 				text: item.vcName,

		// 				checked: false,
		// 				pinyin: null,
		// 				pinyinHead: null,
		// 				phoneticize: null,
		// 				pName: null,
		// 				children: []
		// 			}
		// 		})
		// 		this.upLoadTreeData = this.mapSourceToData(this.upLoadTreeData)
		// 		this.excelTreeLoading = false
		// 	})
		// },

		// 树点击
		handleStationTree(node) {
			if (node.length != 0) {
				if (node[0].flag == 1) {
					// 是变电站
					this.unitId = node[0].id
					this.busTreeData = [...node]
					// this.upLoadTreeData = [...node]
					this.findServiceListData()
					this.UploadUnitId = node[0].id
					this.tableDiv = true
					this.serviceDiv = false
					this.serviceFlag = false
					// this.getUpLoadArea()
				}
			}
		},

		// 源数据映射为需要的数据
		mapSourceToData(source, type) {
			return source.map(item => {
				if (type === 'table') {
					// let targetIndex = this.enums.businessTreeNodeList.findIndex(node => node.id == item['iBindType'])
					// item['iBindTypeHtml'] = this.enums.businessTreeNodeList[targetIndex].value || ''
					// item['iBindType'] = `${item['iBindType']}`
				} else {
					item['expand'] = true
				}

				if (item.children.length == 0) {
					return item
				} else {
					item['children'] = this.mapSourceToData(item.children, type)
					return item
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
.data-robot {
  width: 100%;
  height: calc(100vh - 140px);
  flex-align();
  float: left;
  position: relative;

  .org-tree-wrapper {
    create-wrap(230px, 100%, true, true);
    margin-right: 10px;
    background-color: #fff;
    padding: 8px;
    position: relative;

    > div {
      overflow-y: auto;
      width: 100%;
      height: 100%;
      padding-top: 35px;
    }

    /deep/.ivu-input-wrapper {
      width: 214px;
      z-index: 99;
      top: 8px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
    }
  }

  .table-wrapper {
    width: calc(100% - 480px);
    height: 100%;

    /deep/ .data-robot-main {
      position: relative;
      width: 100%;
      height: calc(100% - 72px);
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
}

.axis-form-item {
  display: flex;

  .icon-wrapper {
    width: 80px;
    height: 32px;
    flex-align(center, center);
    margin-left: 10px;

    .ivu-icon {
      font-size: 24px;
      cursor: pointer;

      &:hover {
        color: #2d8cf0;
      }
    }
  }

  .ivu-input-wrapper {
    &:first-of-type {
      margin-right: 10px;
    }
  }
}

.import-tree-wrapper {
  height: 500px;
  position: relative;
  display: flex;

  .subs-tree-wrapper {
    create-wrap(250px, 100%, true, true);
    margin-right: 10px;
    background-color: #fff;
    padding: 8px;
    position: relative;

    > div {
      overflow-y: auto;
      width: 100%;
      height: 100%;
      padding-top: 35px;
    }

    /deep/.ivu-input-wrapper {
      width: 234px;
      z-index: 99;
      top: 8px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
    }
  }

  .dev-list-wrapper {
    create-wrap(calc(100% - 260px), 100%, true, true);

    > .dev-list {
      height: calc(100% - 72px);
      overflow-y: auto;
    }
  }
}

/deep/ .add-dev-wrapper {
  .add-ac-and-edit .device-node .ivu-table-wrapper {
    height: calc(100vh - 475px) !important;

    > /deep/ .ivu-table {
      > .ivu-table-body {
        height: calc(100vh - 515px) !important;

        .ivu-table-expanded-cell {
          padding: 10px !important;
          padding-left: 100px !important;
        }
      }

      > .ivu-table-tip {
        height: calc(100vh - 515px) !important;

        td {
          height: calc(100vh - 515px) !important;
        }
      }
    }
  }

  .ivu-table-wrapper.isAutoHeight {
    height: calc(100vh - 530px) !important;

    > /deep/ .ivu-table {
      > .ivu-table-body {
        height: calc(100vh - 570px) !important;

        .ivu-table-expanded-cell {
          padding: 10px !important;
          padding-left: 100px !important;
          /* padding-top: 2px !important; */
        }
      }

      > .ivu-table-tip {
        height: calc(100vh - 570px) !important;

        td {
          height: calc(100vh - 570px) !important;
        }
      }
    }
  }

  .page-action {
    display: none;
  }
}

/deep/ .el-table {
  height: calc(100% - 45px) !important;
}

.page-wrap {
  margin-top: 10px;
  display: flex;
  justify-content: center;

  .ivu-page {
    iview-page();
  }
}

/deep/ .editAndAddModal {
  /deep/ .ivu-modal-mask {
    position: initial !important;
    top: initial !important;
    bottom: initial !important;
    left: initial !important;
    right: initial !important;
    background-color: initial !important;
    height: initial !important;
    z-index: initial !important;
  }

  /deep/ .ivu-modal-wrap {
    position: initial !important;
    overflow: initial !important;

    .ivu-modal {
      position: absolute !important;
      top: initial !important;
      width: 100% !important;
      z-index: 999;
      left: 0px;
    }

    .ivu-modal-header {
      border-bottom: initial !important;
      padding: initial !important;
      line-height: initial !important;
    }

    .ivu-modal-body {
      padding: initial !important;
      font-size: initial !important;
      line-height: initial !important;
    }

    .ivu-icon-ios-close::before {
      content: '\F379' !important;
    }

    .close {
      position: absolute;
      top: 3px;
      right: 3px;
      font-size: 27px;
      cursor: pointer;
    }

    .close:hover {
      color: #000;
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

.right-content {
  width: calc(100% - 420px);
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
        transform: translateX(-35%);
      }
    }
  }
}

.upload-content {
  width: 100%;
  height: 100%;
  position: relative;

  .steps {
    margin-left: 30px;
    margin-bottom: 30px;
  }

  .up-box {
    margin-left: 50px;
    font-size: 16px;
    color: #515a6e;
    margin-top: 30px;

    span {
      font-size: 16px;
      margin-top: 10px;
      color: #464c5b;
      font-weight: 700;
      display: block;

      .del {
        float: left;
        display: inline-block;
        width: 30px;
        text-align: center;
        font-size: 18px;
        line-height: 100%;
        color: #2b85e4;
        cursor: pointer;

        &:hover {
          color: #ed4014;
        }
      }
    }
  }

  .btn1 {
    width: 400px;
    margin: 10px 10px 10px 50px;
  }
}

.service {
  border: 1px solid yellow;
}

.special-content {
  display: flex;
  justify-content: space-between;
}

.upload-footer {
  float: right;
}

.left-tree {
  width: 40%;
}

.up-out-box {
  font-size: 16px;
  color: #515a6e;
  margin-top: 30px;

  span {
    font-size: 16px;
    margin-top: 10px;
    color: #464c5b;
    font-weight: 700;
    display: block;

    .del {
      float: left;
      display: inline-block;
      width: 30px;
      text-align: center;
      font-size: 18px;
      line-height: 100%;
      color: #2b85e4;
      cursor: pointer;

      &:hover {
        color: #ed4014;
      }
    }
  }
}

.ln-upload {
  display: flex;
  justify-content: space-between;
}

.excel-upload {
  margin-left: 50px;
  display: flex;
  width: 400px;
  justify-content: space-between;
}
</style>
