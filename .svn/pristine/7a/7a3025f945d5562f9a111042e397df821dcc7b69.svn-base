<template>
	<div class="data-config">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="stationTree" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<!-- 右侧树 -->
		<div class="right-tree">
			<!-- 头部tab -->
			<!-- <div class="tab-box">
				<Tabs value="0" @on-click="handleTabs">
					<TabPane label="室外机器人配置" name="0"></TabPane>
					<TabPane label="室内机器人配置" name="1"></TabPane>
					<TabPane label="高清摄像配置" name="2"></TabPane>
				</Tabs>
			</div> -->
			<div class="lf-content">
				<p>
					当前业务树
					<el-input placeholder="输入关键字进行搜索..." v-model="filterValue"></el-input>
				</p>
				<Card style="width:100%;height:100%">
					<div class="nTreeBox">
						<!-- lazy -->
						<!-- :load="loadNode" -->
						<el-tree
							class="profession-tree"
							:data="professionTreeData"
							:props="defaultProps"
							node-key="id"
							@node-click="handleFileTree"
							:default-expanded-keys="proTreeId"
							empty-text="暂无数据"
							v-loading="ndLoading"
							element-loading-text="数据加载中..."
							:indent="24"
							ref="Ntree"
							:filter-node-method="filterNode"
							:highlight-current="true"
						></el-tree>
					</div>
				</Card>
			</div>
			<!-- 底部对应选项卡 -->
			<div class="rt-content">
				<!-- <p>{{ tabsName }}数据展示<Button type="primary" @click="changeOKclick">确定</Button></p> -->
				<span>
					高清巡检数据展示&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b v-show="disabledGroup == '1'">未配置数量：{{ notConNumber }}</b>
				</span>

				<span>
					<RadioGroup v-model="disabledGroup">
						<Radio label="0">全部测点</Radio>
						<Radio label="1">未绑定测点</Radio>
						<Radio label="2">已绑定测点</Radio>
					</RadioGroup>
					<Button type="primary" @click="addNodeHttpData">提交</Button>
					<Button type="primary" @click="changeOKclick">添加已勾选节点</Button>
				</span>
				<span>
					<el-input placeholder="输入关键字进行搜索..." v-model="filterText"></el-input>
				</span>
				<Card style="width:100%;height:100%">
					<div class="tree-box">
						<el-tree
							:data="treeData"
							:props="defaultProps"
							node-key="id"
							@check-change="handleCheckChange"
							empty-text="暂无数据"
							v-loading="treeLoading"
							element-loading-text="数据加载中..."
							:indent="24"
							ref="tree"
							:filter-node-method="filterNode"
							show-checkbox
							:check-strictly="true"
							:default-checked-keys="defauleGnodeData"
							:default-expanded-keys="beforeStatusData"
						>
							<span class="custom-tree-node" slot-scope="{ node, data }" :ref="node.key">
								<span :style="{ marginLeft: '2px' }">{{ data.title }}{{ process(node, data) }}</span>
							</span>
						</el-tree>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'data-config',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.dataUpload,
			addType: '3',
			stationTree: [],
			filterText: '',
			filterValue: '',
			defaultProps: {
				children: 'children',
				label: 'title'
			},
			nowBusinessTree: {
				id: '',
				title: '',
				code: '',
				bId: ''
			}, // 当前点击业务树节点信息
			unitId: '',
			unitName: '', // 变电站名
			isTree: false,
			step: 0,
			tabsType: 2,
			professionTreeData: [], // 当前业务树
			treeData: [],
			copyTreeData: [],
			treeLoading: false,
			ndLoading: false,
			defauleGnodeData: [], // 已经添加的测点id数组--默认勾选
			beforeStatusData: [],
			proTreeId: [], // 添加前当前业务树展开状态id
			modal1: false,
			addNodeData: [], // 勾选数组
			addNodeFdata: [], // 勾选的父节点id数组
			modal2: false,
			devDataList: [], // 设备类型数组
			modal3: false,

			// 测点表单
			nodeFormData: {
				parentId: '', // 父节点
				nodeType: '1', // 节点类型
				feature: '', // 功能
				describe: '', // 描述
				isAddNode: '0', // 是否创建新节点
				iIsTransValue: '1', // 需要转换
				existNodeId: '',
				vcName: ''
			},
			disabledGroup: '0',
			iBindType: '', // 选择的父节点类型
			finallyAdd: [], // 批量添加节点的数组
			nextTreeData: [], // 懒加载获取到的数据
			notConNumber: 0 // 当前未配置总数
		}
	},
	computed: {
		modalWidth() {
			// 弹出框的宽
		}
	},
	filters: {},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val)
		},
		filterValue(val) {
			this.$refs.Ntree.filter(val)
		},
		disabledGroup(val) {
			this.beforeStatusData = []
			this.getVideoData()
		}
	},
	created() {
		this.getStationTree()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		process(node, data) {
			this.$nextTick(() => {
				if (data.flag == 0) {
					this.$refs[`${node.key}`].parentNode.getElementsByTagName('label')[0].style.display = 'none'
				} else {
					this.$refs[`${node.key}`].parentNode.getElementsByTagName('label')[0].style.display = 'inline-block'
				}
			})
		},
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
		// 获取组织树
		getStationTree() {
			this.axios.getUnitTree({ iFlag: 2 }).then(res => {
				if (res.code == 200 && res.data) {
					let flgaNum = 1
					this._forEach(res.data, true, item => {
						item.expand = true
						if (item.flag == flgaNum) {
							item.selected = true
							this.unitId = item.id
							this.unitName = item.title
							this.isTree = !!this.unitId
							this.step = 1
							flgaNum = 'a'
						}
					})
					this.stationTree = res.data
					// console.log( this.unitId )
					if (this.unitId != '') {
						this.getNdData()
						this.getVideoData()
					}
				}
			})
		},
		// 当前业务树懒加载 ~~
		async loadNode(item, resolve) {
			if (item.data.iBindType == 2) {
				await this.getDevNextData(item.data)
			} else {
				await this.getNextData(item.data)
			}
			resolve(this.nextTreeData)
		},
		// 获取下一级数据
		async getNextData(info) {
			this.nextTreeData = []
			let result = await this.axios.getNextNode({
				parentId: info.treeId,
				unitId: this.unitId
			})
			if (result.success) {
				this.nextTreeData = result.data
			}
		},
		// 获取设备级的测点数据
		async getDevNextData(info) {
			this.nextTreeData = []
			let result = await this.axios.getDeviceInfo({
				devId: info.bindId
			})
			// console.log('获取设备级的测点数据', result)
			if (result.success) {
				this.nextTreeData = result.data.devNodesList
				this.nextTreeData.forEach(item => {
					item.title = item.vcName
					item.treeId = 'asdasdasdasdsa'
				})
			}
		},
		// 获取当前业务树 ~~
		getNdData() {
			this.professionTreeData = []
			let par = {
				unitId: this.unitId
				// parentId: 0
			}
			this.ndLoading = true
			this.axios.getNdTree(par).then(res => {
				// console.log('获取当前业务树', res)
				if (res.code == 200 && res.data.length > 0) {
					this.professionTreeData = res.data
					if (this.professionTreeData[0] && this.professionTreeData[0].children) {
						this.professionTreeData[0]['expandId'] = 1
						this.professionTreeData[0]['expanded'] = true
					}

					this.ndLoading = false
				} else {
					this.treeData = []
					this.ndLoading = false
				}
			})
		},
		// 通过标识过滤
		filterTreeNode(treeData) {
			let result = []
			if (!treeData) {
				return false
			}
			result = treeData.filter(item => {
				if (item.mark) {
					return true
				} else {
					return false
				}
				if (item.children && item.children.length > 0) {
					this.filterTreeNode(item.children)
				}
			})

			// let recursion = (treeData) => {
			// 	treeData.map(item => {
			// 		if (item.mark) {
			// 			return true
			// 		} else {
			// 			return false
			// 		}
			// 		if (item.children && item.children.length > 0) {
			// 			recursion(treeData)
			// 		}
			// 	})
			// }
			// recursion(treeData)

			return result
		},
		// 给所有未绑定关联的父级节点添加标记
		setMark(tree, pid) {
			console.log(pid)
			tree.filter((node, index) => {
				if (node.id == pid) {
					console.log('找到')
					node.mark = true
					this.setMark(this.treeData, node.pid)
				} else {
					node.mark = false
				}
				if (node.children && node.children.length > 0) {
					this.setMark(node.children, pid)
				}
			})
		},
		// 获取高清巡检树 ##
		getVideoData() {
			let params = {
				unitId: this.unitId,
				intFlag: this.disabledGroup
			}
			this.treeLoading = true

			this.axios.getVideoTree(params).then(res => {
				if (res.code == 200 && res.data.length > 0) {
					res.data[0].expand = true
					res.data[0].expandId = 1
					this.treeData = res.data
					this.addTreePro()

					if (this.disabledGroup == 1) {
						// console.log('未配置的', this.treeData)

						// this.treeData = this.filterTreeNode(this.treeData)

						// console.log(this.treeData)
						let arr = []
						this.notConNumber = 0
						this.beforeStatusData = []
						this._forEach(this.treeData, true, item => {
							if (item.flag == 1) {
								this.beforeStatusData.push(item.pid)

								this.notConNumber = this.beforeStatusData.length
							}
						})

						// console.log(this.beforeStatusData)
						// this.beforeStatusData.forEach( item => {
						// 	console.log(item)
						// })
						// this.setMark(this.treeData, '303b8910b0154b59bf5da45d67dae7d4')

						// console.log(this.treeData)

						// this.treeData = this.filterTreeNode(this.treeData)

						// console.log(this.treeData)
					} else if (this.disabledGroup == 2) {
						this._forEach(this.treeData, true, item => {
							if (item.flag == 1) {
								this.defaultNodeS()
								this.beforeStatusData.push(item.pid)
							}
						})
					}
					this.treeLoading = false
				} else {
					this.treeData = []
					this.treeLoading = false
				}
			})
		},
		// 判断测点是否已绑定
		defaultNodeS() {
			this.defauleGnodeData = []
			this._forEach(this.treeData, true, item => {
				if (item.flag == 1) {
					this.defauleGnodeData.push(item.id)
					this.$set(item, 'disabled', true)
				} // item.children.length == 0
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
				this.unitName = data[0].title
				this.unitId = data[0].id
				this.isTree = true
				this.step = 1
				if (this.file) {
					this.step = 2
				}
				this.getNdData()
				this.getVideoData()
			}
		},
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		valueChange(data) {
			this.nodeFormData.existNodeId = data
		},
		// 当前业务树点击 ~~
		handleFileTree(data) {
			// console.log('ref', this.$refs['Ntree'])

			// console.log(data)
			this.proTreeId = []
			this.nowBusinessTree.id = data.id
			this.proTreeId.push(data.id)
			this.nowBusinessTree.title = data.vcName
			this.nowBusinessTree.code = data.vcCode
			this.nowBusinessTree.bId = data.bindId
			this.iBindType = data.iBindType
		},
		// 勾选节点
		handleCheckChange() {
			let res = this.$refs.tree.getCheckedNodes()
			// console.log(res)
			this.addNodeData = res
			if (res.length == 1) {
				if (this.addType == '1') {
					this.areaFormData.vcName = res[0].title
					// console.log(this.areaFormData.vcName)
				} else if (this.addType == '2') {
					this.equipmentFormData.vcName = res[0].title
				} else if (this.addType == '3') {
					this.nodeFormData.vcName = res[0].title
				}
			}
		},
		// 点击 添加已勾选节点
		changeOKclick() {
			let flag = true

			for (let i = 0, len = this.addNodeData.length - 1; i < len; i++) {
				if (this.addNodeData[i].pid != this.addNodeData[i + 1].pid) {
					this.$Message.warning('只可勾选同一父级节点的数据')
					flag = false
					return
				}
			}

			if (this.unitId == '') {
				this.$Message.warning('请勾选变电站')
				flag = false
				return
			} else if (this.nowBusinessTree.id == '') {
				this.$Message.warning('请选择父节点')
				flag = false
				return
			} else if (this.iBindType !== 2) {
				this.$Message.warning('请选择设备级父节点')
				flag = false
				return
			} else if (this.addNodeData.length < 1) {
				this.$Message.warning('请勾选节点')
				flag = false
				return
			}

			if (flag) {
				if (this.addNodeData.length == 1) {
					this.nodeFormData.vcName = this.addNodeData[0].title
				}
				this.lastOkclick()
			}
		},
		closeClick() {
			this.nodeFormData.feature = ''
			this.nodeFormData.describe = ''
			this.nodeFormData.iIsTransValue = '1'
			this.nodeFormData.isAddNode = '0'
		},
		// 给树添加测点属性
		addTreePro() {
			this._forEach(this.treeData, true, item => {
				if (item.flag == 1) {
					this.$set(item, 'showCheckbox', true)
				}
			})
		},
		// 确定添加节点
		lastOkclick() {
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认添加节点</p>`,
				onOk: () => {
					this.addNodeData.forEach(item => {
						item.devId = this.nowBusinessTree.bId
					})
					this.notConNumber -= this.addNodeData.length
					// console.log('确定添加节点', this.addNodeData)
					this.finallyAdd = this.finallyAdd.concat(this.addNodeData)
					// console.log('this.finallyAdd', this.finallyAdd)
					// this.addNodeHttpData()
					this.addNodeToTree()
					// this.nowBusinessTree.id = ''
					this.addNodeData = []
				}
			})
			this.addType = '3'
		},
		// 删除指定的节点
		deleteDomTreeNode(tree, pid, id) {
			let parent = ''
			// 找到对应的父节点
			let recursion = (tree, pid) => {
				tree.forEach(item => {
					if (item.id == pid) {
						parent = item
					}
					if (item.children && item.children.length > 0) {
						recursion(item.children, pid)
					}
				})
			}
			recursion(tree, pid, id)
			// 找到父节点下的index坐标 删除
			let index = parent.children.findIndex(item => {
				return item.id == id
			})
			parent.children.splice(index, 1)
		},
		// 找到并追加节点 ~~
		addNodeFn(tree, id, inData) {
			// console.log(tree)
			// let parent = ''
			// 找到对应的父节点
			let recursion = (tree, id, inData) => {
				tree.forEach(item => {
					if (item.id == id) {
						// console.log(item)
						item.children = [...item.children, ...inData]
					}
					if (item.children && item.children.length > 0) {
						recursion(item.children, id, inData)
					}
				})
			}
			recursion(tree, id, inData)
		},
		// 动态添加节点到当前业务树 ~~
		addNodeToTree() {
			// this._forEach( this.professionTreeData , true , item => {
			// 	console.log('动态添加节点到当前业务树', item)
			// 	if( item.id == this.nowBusinessTree.id ) {
			// 		this.addNodeData.forEach( item => {
			// 			item.nowTreePid = this.nowBusinessTree.bId
			// 		})
			// 		item.children = item.children.concat( this.addNodeData )
			// 	}
			// })
			//
			// console.log(this.addNodeData)
			this.addNodeFn(this.professionTreeData, this.nowBusinessTree.id, this.addNodeData)
			//

			this.addNodeData.forEach(item => {
				this.deleteDomTreeNode(this.treeData, item.pid, item.id)
			})
		},
		// 发送添加节点请求 ~~
		addNodeHttpData() {
			// console.log(this.nowBusinessTree.bId)
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认提交</p>`,
				onOk: () => {
					let nodeData = []
					if (this.finallyAdd.length > 1) {
						for (let i = 0, len = this.finallyAdd.length; i < len; i++) {
							nodeData.push({
								// devId: this.finallyAdd[i].nowTreePid,
								devId: this.finallyAdd[i].devId,
								functionId: 0,
								vcName: this.finallyAdd[i].title,
								nodeType: '1',
								isAddNode: '0',
								iIsTransValue: '1',
								oriNodeId: this.finallyAdd[i].id
							})
						}
					} else if (this.finallyAdd.length == 1) {
						nodeData = [
							{
								// devId: this.finallyAdd[0].nowTreePid,
								devId: this.finallyAdd[0].devId,
								functionId: 0,
								vcName: this.nodeFormData.vcName,
								nodeType: this.nodeFormData.nodeType,
								isAddNode: this.nodeFormData.isAddNode,
								iIsTransValue: this.nodeFormData.iIsTransValue,
								oriNodeId: this.finallyAdd[0].id
							}
						]
					}
					let addDevNode = {
						nodesSourceType: this.tabsType,
						devnodes: nodeData
						// devId: this.nowBusinessTree.bId
					}
					this.axios.addNodeBllTree(addDevNode).then(res => {
						if (res.code == 200) {
							this.$Message.success('提交成功')
							this.finallyAdd = []
							this.getNdData()
							this.getVideoData()
							// if( this.disabledGroup == '0' ) {
							// 	this.beforeTreeAdd()
							// }
						} else {
							this.$Message.warning(res.msg)
						}
					})
				}
			})
		},
		// 添加成功后，最右侧树展示添加前的位置
		beforeTreeAdd() {
			this.beforeStatusData = []
			this.beforeStatusData.push(this.addNodeData[0].pid)
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
.data-config{
	width: 100%;
	height: calc(100vh - 160px);

	.left-tree {
		width: 330px;
		height: 100%;
		background-color: #fff;
		border: 10px solid #fff;
		overflow: auto;
		float: left;
	}

	.right-tree{
		width: calc(100% - 340px);
		height: 100%;
		float: left;
		margin-left: 10px;

		.tab-box {
			height: 50px;

			/deep/.ivu-tabs {
				height: 100%;
				background-color: #fff;

		    .ivu-tabs-tab {
				  border-radius: 5px;
				  font-size: 16px;
				  font-weight: 700;
		    }

		    .ivu-tabs-tab-active {
		    }
		}

			/deep/.ivu-tabs-content {
				height: 100%;
			}
		}
	}

	.lf-content {
		width: calc(30% - 5px);
		height: calc(100% - 88px);
		float: left;

		/deep/.ivu-card {
			overflow-y: auto;
			border-top: 0;
		}

		p {
			width: 100%;
			height: 88px;
			display: block;
			font-size: 18px;
			line-height: 30px;
			font-weight: 700;
			background: #fff;
			padding: 10px;
		}

		.nTreeBox{
			width: 100%;
			height: 100%;
			overflow-y: auto;

		}
	}

	.rt-content {
		width: calc(70% - 5px);
		height: calc(100% - 150px);
		margin-left: 10px;
		float: left;

		/deep/.ivu-card {
			overflow-y: auto;
			border-top: 0;
		}

		> span {
			display: block;
			width: 100%;
			height: 50px;
			font-size: 18px;
			line-height: 30px;
			font-weight: 700;
			background: #fff;
			padding: 10px;
		}

		.ivu-btn{
			float: right;
			margin-right: 30px;
		}

		.tree-box {
			width: 100%;
			height: 100%;
			overflow-y: auto;
		}
	}

}

/deep/ .ivu-modal-body{
	padding-top: 45px;
}

/deep/ .el-tree-node.is-current>.el-tree-node__content{
	background: #d5e8f;
}
/deep/ .el-tree-node.is-current > .el-tree-node__content {
       background-color: #d5e8fc !important;
}
</style>
