<template>
	<div class="fire-linkage-config">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="treeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索">
				<Icon type="ios-search" slot="suffix"/>
			</search-tree>
		</div>
		<div class="right-content">
			<!-- 表格区 -->
			<i-form :model="formInline" inline label-position="right">
				<transition name="el-fade-in-linear">
					<div class="search-bar">
						<searche-Header-Wrapper>
							<Button-group>
								<i-button @click="statChange('0')">未配置</i-button>
								<i-button @click="statChange('1')" type="primary">已配置</i-button>
							</Button-group>
						</searche-Header-Wrapper>
					</div>
				</transition>
			</i-form>
			<div class="table-content">
				<Table
					border
					ref="selection"
					:columns="tableColumns"
					:data="tableData"
					highlight-row
					@on-row-click="showRowData"
					height="600"
				></Table>
				<!--				 分页-->
				<div class="table-page">
					<div class="page-content">
						<Page
							@on-change="handleChangePage"
							@on-page-size-change="handleChangePageSize"
							:total="total"
							:current="page"
							:page-size="pageSize"
							simple
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="right-end">
			<div class="transfer">
				<div class="title">
					<h2>联动视频配置</h2>
				</div>
				<qfTransfer style="height: 400px" ref="qfTransfer" :tree-list="videoAllList"></qfTransfer>
			</div>
			<div class="source">
				<!--<i-button type="primary" @click="handleUploadBtn()">上传</i-button>-->
				<div class="title">
					<h2>联动灭火资源配置</h2>
				</div>

				<div class="source-content">
					<el-upload
						action="http://172.26.1.109:8080/dsa5200/fire_nodeinfo/cfg_link_node"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:file-list="fileList"
						:limit="1"
						:data="params"
						name="xfile"
						type="drag"
						:accept="accept"
						:auto-upload="false"
						ref="upload"
						:on-exceed="uploadLimited"
						:on-change="fileChange"
						:on-success="uploadIsOk"
						:on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</div>
			</div>
			<i-button type="primary" @click="submit()">确定</i-button>
		</div>
	</div>
</template>
<script>
	import qfTransfer from '../components/qf-transfer/qf-transfer'

	export default {
		name: 'fire-linkage-config',
		components: {
			qfTransfer
		},
		props: {},
		data() {
			return {
				isloaclFlag: true,
				params: {},
				fileList: [],
				dialogImageUrl: '',
				dialogVisible: false,
				isAllFlag: false,
				allCount: 0,
				targetKeys3: [],
				accept: '.gif', // 上传格式
				videoAllList: [],
				listStyle: {
					width: '300px',
					height: '300px'
				},
				axios: this.$api.svgConfig,
				treeData: [],
				formInline: {
					linkStat: '0',
					svgStat: '0'
				},
				unitId: '',
				orgId: '',
				isTree: false,
				isFile: false,
				stationName: '',
				modalShow: false,
				step: 0,
				file: null,
				loadingStatus: false,
				tableColumns: [
					{
						title: '设备名称',
						key: 'nodeName',
						width: 160,
						align: 'center'
					},
					{
						title: '节点名称',
						key: 'DevTypeName',
						align: 'center'
					},
					{
						title: '监视值',
						key: 'DevTypeName',
						align: 'center',
						render: (h, params) => {
							// console.log(params)
							const arr = []
							if (params.row.dropList&&params.row.dropList.length > 0) {
								params.row.dropList.forEach(item => {
									arr.push(
										h('Option', {
											props: {
												value: item
											}
										}, item)
									)
								})
							}

							return h('div', [
								h(
									'Select',
									{
										style: {
										},
										props: {
											value: params.row.DevTypeName
										},
										on: {
											'on-change': (event) => {
												// console.log(event)
											}
										}
									},
									[...arr]
									)
							])
						}
					},
					{
						title: '联动灭火资源',
						key: 'svgStat',
						align: 'center',
						render: (h, params) => {
							let titleColor = '#cccccc'
							titleColor = params.row.svgStat === '未配置' ? '#cccccc' : '#19be6b'
							return h('span', [
								h(
									'span',
									{
										style: {
											color: titleColor
										},
										props: {
											type: 'error',
											icon: 'md-trash'
										}
									},
									params.row.svgStat
								)
							])
						}
					},
					{
						title: '联动灭火视频',
						key: 'linkStat',
						align: 'center',
						render: (h, params) => {

							let titleColor = '#cccccc'
							titleColor = params.row.linkStat === '未配置' ? '#cccccc' : '#19be6b'
							return h('span', [
								h(
									'span',
									{
										style: {
											color: titleColor
										},
										props: {
											type: 'error',
											icon: 'md-trash'
										}
									},
									params.row.linkStat
								)
							])
						}
					}
					// {
					// 	title: '操作',
					//
					// 	key: 'action',
					// 	align: 'center',
					//
					// 	render: (h, params) => {
					// 		return h('div', [
					// 			h(
					// 				'Button',
					// 				{
					// 					props: {
					// 						type: 'error',
					// 						icon: 'md-trash'
					// 					},
					// 					on: {
					// 						click: () => {
					// 							this.handleRemove(params)
					// 						}
					// 					}
					// 				},
					// 				'删除'
					// 			)
					// 		])
					// 	}
					// }
				],
				selectRow: {},
				// 搜索下拉框
				typeList: [
					{
						code: '0',
						name: '未配置'
					},
					{
						code: '1',
						name: '已配置'
					}
				],
				tableData: [],
				// 分页信息
				total: 0,
				page: 1,
				pageSize: 14
			}
		},
		computed: {},
		filters: {},
		watch: {
			modalShow(val) {
				if (!val) {
					this.file = null
					this.isFile = false
					this.loadingStatus = false
					this.step = 0
				}
			}
		},
		created() {
			this.getStationTree()
		},
		mounted() {
		},
		activited() {
		},
		update() {
		},
		beforeDestory() {
		},
		methods: {
			uploadIsOk() {
				this.$Message.success('上传成功')
				this.$refs.upload.clearFiles()
				this.$refs.qfTransfer.clearList()
				this.getTable()
			},
			uploadLimited() {
				this.$message.warning(`当前限制选择 1 个文件`)
			},
			fileChange(file) {
				this.isloaclFlag = true
			},
			handleRemove(file, fileList) {
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url
				this.dialogVisible = true
			},
			// 点击表格查询配置信息
			showRowData(row, index) {
				this.selectRow = row
				let params = {
					unitId: this.unitId,
					nodeId: row.nodeId,
					nodeGUID: row.nodeGUID,
					devId: row.devId
				}
				this.$api.linkageConfig.getRowData(params).then(res => {
					this.$refs.qfTransfer.clearList()
					this.$refs.upload.clearFiles()
					let idList = []
					this.fileList = []
					if (res.data.preset.length > 0) {
						res.data.preset.forEach(item => {
							idList.push('devnode_' + item.devNodeId)
						})
						// console.log(idList)
						this.$refs.qfTransfer.setCheckedKey(idList)
					}
					if (res.data.svg.length > 0) {
						res.data.svg.forEach(item => {
							// var image = new Image();
							// image.src = item.filePath;
							// image.setAttribute("crossOrigin", "Anonymous")
							// image.onload = function(){
							// 	var a=getBase64Image(image)
							// 	console.log(a)
							// }

							this.fileList.push({
								url: item.filePath
							})
						})
					}
				})
			},
			// 查询状态改变重新渲染列表
			statChange(value) {
				let that = this
				this.formInline.linkStat = this.formInline.svgStat = value
				setTimeout(() => {
					that.getTable()
				}, 500)
			},
			returnThis() {
				return this
			},
			_forEach: function (data, isTrue, callback) {
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
				let result = await this.axios.getUnitTree({ iFlag: 2 })
				if (result.code == 200) {
					this._forEach(result.data, true, item => {
						item.expand = true
					})
					this.treeData = result.data
				}
			},
			// 站点树点击事件
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
				this.videoAllList = this.getMockData()
				this.$refs.qfTransfer.clearList()
				this.stationName = data[0].title
				this.getTable()
			},
			// 获取图片列表
			getTable() {
				if (!this.unitId) {
					this.$Message.warning('请选择变电站')
					return
				}
				let params = {
					unitId: this.unitId,
					currentPage: this.page,
					state: this.formInline.svgStat,
					pageSize: this.pageSize
				}
				this.$api.linkageConfig.getConfigAreaList(params).then(res => {
					this.isloaclFlag = false
					res.data.list.forEach(item => {
						item.dropList = item.valueDesc ? item.valueDesc.split('|') : []
					})
					this.tableData = res.data.list
					this.total = res.data.total
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
				this.getTable()
			},
			// 渲染穿梭框
			getMockData() {
				let mockData = [], num = 0
				this.$api.linkageConfig
					.getVideoList({
						unitId: this.unitId,
						actionType: 0,
						subSystemId: 1009,
						treeType: 5,
						type: 0
					})
					.then(res => {
						this.targetKeys3 = []
						if (res.data && res.data.length > 0) {
							res.data[0].children[0].children.forEach(item => {
								if (item.children) {
									item.children.forEach(i => {
										i.label = i.title
										i.key = i.id
										i.category = '0'
										i.label2 = i.title
									})
								}
								mockData.push({
									key: item.id,
									label: item.title,
									children: item.children,
									label2: item.title
								})
							})
							// this.videoAllList = res.data.lists
						}
					})
				return mockData
			},
			submit() {
				let nodeList = []
				// console.log(this.$refs.qfTransfer.getSelectedTree().getCheckedNodes())
				this.$refs.qfTransfer.getSelectedTree().getCheckedNodes().forEach(item => {
					if (item.children.length < 1) {
						// console.log(this.$refs.qfTransfer.getSelectedTree().getNode(item.key))
						// if (this.$refs.qfTransfer.getSelectedTree().getNode(item.key).level == 1) {
						//
						// }
						nodeList.push({
							videoDev: this.$refs.qfTransfer.getSelectedTree().getNode(item.key).parent.data.key.slice(4),
							videoNode: item.key.slice(8),
							videoParam: 0,
							category: item.category
						})
					}
				})
				if (nodeList.length < 1) {
					this.$Message.warning('请配置视频列表信息')
					return
				}
				let param = {
					unitId: this.unitId,
					nodeId: this.selectRow.nodeId,
					nodeGUID: this.selectRow.nodeGUID,
					devId: this.selectRow.devId,
					videoJson: JSON.stringify(nodeList)
				}
				this.params = param
				setTimeout(() => {
					// console.log(this.$refs.upload)
					if (this.isloaclFlag) {
						this.$refs.upload.submit()
					} else {
						const formData = new FormData()
						Object.keys(param).forEach((key) => {
							formData.append(key, param[key])
						})
						// let config = {
						// 	header: { 'Content-Type': 'multipart/form-data' }
						// }
						this.$api.linkageConfig.configSubmit(formData).then(res => {
							// console.log(res)
						})
					}
				}, 1000)
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
	.title {

	}

	.fire-linkage-config {
		width: 100%;
		// height: calc(100vh - 160px);

		.left-tree {
			width: 230px;
			height: calc(100vh - 150px);
			background-color: #fff;
			border: 10px solid #fff;
			overflow: auto;
			float: left;
		}

		.right-content {
			width: calc(100% - 1000px);
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

			.table-content {
				width: 100%;
				// flex: 1;
				// position: relative;

				/deep/ .ivu-table-wrapper {
					height: calc(100vh - 210px) !important;

					.ivu-table-body,
					.ivu-table-overflowY,
					.ivu-table-tip,
					.ivu-table-tip td {
						height: calc(100vh - 250px) !important;
					}
				}

				// /deep/.ivu-table-body, /deep/.ivu-table-overflowY {
				// 	height: calc(100% - 40px) !important;
				// }

				/deep/ .ivu-table {
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

				/deep/ tr.ivu-table-row-hover td {
					background-color: #F5F7FA;
				}

				/deep/ .ivu-btn {
					font-size: 14px;
				}

				.table-page {
					width: 100%;
					margin-top: -45px;
					margin-left 70%

					.page-content {
						width: 800px;
						transform: translateX(-50%);
					}
				}
			}
		}

		.right-end {
			width: 33.4444rem
			float: left;
			padding-left 6px
			.transfer {

			}

			.source {
				.source-header {

				}

				.source-content {
					border 1px solid #cccccc
					padding 20px
					overflow auto

					.card {
						width 200px
						height 200px
						border 1px solid #cccccc
						text-align center
						line-height 200px
						font-size xx-large

					}
				}

				.source-content {

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
</style>
