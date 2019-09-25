<template>
	<div class="transfer-main">
		<el-row>
			<el-col :span="12">
				<div class="transfer-main-left">
					<div class="title">
						所有视频
					</div>
					<el-input placeholder="请输入关键字" v-model="filterText"><i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<div class="content">
						<el-tree
							ref="tree"
							:data="treeList"
							empty-text="查询无数据"
							show-checkbox
							node-key="key"
							@check="selectConfig"
							:props="defaultProps"
							:filter-node-method="filterNode"
						>
						</el-tree>
						<!--						<Tree :data="treeList" show-checkbox></Tree>-->
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="transfer-main-left">
					<div class="title">
						已选择视频
					</div>
					<div class="content2">
						<el-tree
							ref="tree2"
							:data="selectedTree"
							node-key="key"
							:props="defaultProps2"
							default-expand-all
							empty-text="暂无配置的视频信息"
						>
						</el-tree>
					</div>
				</div>
			</el-col>
		</el-row>
		<Modal
			v-model="modalShow"
			@on-cancel="modalClose"
			title="选择"
			:footer-hide="true"
			:mask-closable="false">
			<div class="square">
				<div class="square-inner grid">
					<div @click="selectDiv(div)" v-for="(div,index) in creenList" :key="index">{{div.value}}</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: 'markdown_page',
		props: {
			treeList: {
				type: Array,
				required: true
			}
		},
		components: {},
		data() {
			return {
				filterText: '',
				content: '',
				checkAllFlag: false,
				checkNodeList: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				defaultProps2: {
					children: 'children',
					label: 'label2'
				},
				selectedTree: [],
				nodeData: {},
				creenList: [],
				creenNum: 16,
				selectedListConfig: {},
				modalShow: false
			}
		},
		created() {
			for (let i = 0; i < this.creenNum; i++) {
				this.creenList[i] = {
					code: i + 1,
					value: i + 1,
					class: ''
				}
			}
		},
		mounted() {

		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val)
			}
		},
		methods: {
			// 全选逻辑添加
			handleCheckAll() {
				this.checkNodeList = []
				this.treeList.forEach(item => {
					this.checkNodeList.push(item.key)
				})
				if (this.checkAllFlag) {
					this.$refs.tree.setCheckedKeys(this.checkNodeList)
					this.selectedTree = this.treeList
				} else {
					this.$refs.tree.setCheckedKeys([])
					this.selectedTree = []
				}
			},
			// 数组转换成已配置树
			getArray(data, param) {
				let newArr = []
				// 拷贝树参数
				newArr = JSON.parse(JSON.stringify([...param.halfCheckNodes]))
				// 针对勾选树子节点渲染已配置树结构逻辑处理
				newArr.map(i => i.children = i.children.filter(item => param.checkKey.some(i => i == item.key)))
				// 针对勾选树父节点渲染已配置树结构逻辑处理
				newArr.unshift(...(param.checkNode.filter(item => item.children.length > 0 || !item.id)))
				return newArr
			},
			// 配置选择页面
			selectConfig(data, node) {
				this.nodeData = data
				// console.log(node)
				this.selectedListConfig = node
				// // 弹出层逻辑处理
				// if (node.checkedKeys.some(item => data.key == item)) {
				// 	this.modalShow = true
				// } else {
				// 	this.checkChange()
				// }
				this.checkChange()
			},
			// 点击树复选框同时渲染已配置树列操作
			checkChange() {
				// console.log(this.treeList)
				this.nodeData.children = this.nodeData.children.length > 0 ? this.nodeData.children : []
				const param = {
					checkKey: JSON.parse(JSON.stringify([...this.selectedListConfig.checkedKeys])),
					halfCheckNodes: JSON.parse(JSON.stringify([...this.selectedListConfig.halfCheckedNodes])),
					checkNode: JSON.parse(JSON.stringify([...this.selectedListConfig.checkedNodes])),
					halfCheckedKey: JSON.parse(JSON.stringify([...this.selectedListConfig.halfCheckedKeys]))
				}
				// 根据树形结构回写树结构
				this.selectedTree = this.getArray(this.nodeData, param)
				this.checkAllFlag = this.checkAllNum() == this.$refs.tree.getCheckedKeys().length
			},
			//  勾选判断全选逻辑处理
			checkAllNum() {
				let num = 0
				this.treeList.forEach(item => {
					num++
					if (item.children) {
						item.children.forEach(i => {
								num++
							}
						)
					}
				})
				return num
			},
			// 树的模糊查询方法
			filterNode(value, data, node) {
				// 如果什么都没填就直接返回
				if (!value) return true
				// 如果传入的value和data中的label相同说明是匹配到了
				if (data.label.indexOf(value) !== -1) {
					return true
				}
				// 否则要去判断它是不是选中节点的子节点
				return this.checkBelongToChooseNode(value, data, node)
			},
			// 判断传入的节点是不是选中节点的子节点
			checkBelongToChooseNode(value, data, node) {
				const level = node.level
				// 如果传入的节点本身就是一级节点就不用校验了
				if (level === 1) {
					return false
				}
				// 先取当前节点的父节点
				let parentData = node.parent
				// 遍历当前节点的父节点
				let index = 0
				while (index < level - 1) {
					// 如果匹配到直接返回
					if (parentData.data.label.indexOf(value) !== -1) {
						return true
					}
					// 否则的话再往上一层做匹配
					parentData = parentData.parent
					index++
				}
				// 没匹配到返回false
				return false
			},
			// 清空已勾选数据
			clearList() {
				this.selectedTree = []
				this.$refs.tree.setCheckedKeys([])
			},
			// 回写勾选函数
			setCheckedKey(idList) {
				const idArr = idList
				this.$refs.tree.setCheckedKeys(idArr)
				let nodeList = []
				let halfNodeList = []
				let halfNodeIdList = []
				idArr.forEach(item => {
					if (this.$refs.tree.getNode(item).parent.level == 1) {
						let isAllflag = this.$refs.tree.getNode(item).parent.data.children.every(item => idArr.indexOf(item.id) > -1)
						if (!isAllflag) {
							halfNodeIdList.push(this.$refs.tree.getNode(item).parent.data.key)
							halfNodeList.push(this.$refs.tree.getNode(item).parent.data)
						}
					}
					// if(this.$refs.tree.getNode(item))
				})
				idList.forEach(item => {
					let isHalf = halfNodeIdList.some(i => i == this.$refs.tree.getNode(item).parent.data.key)
					if (!isHalf) {
						idList.push(this.$refs.tree.getNode(item).parent.data.key)
					}
				})
				// 数组去重 nodeList赋值
				distinct(idList, idList[0]).forEach(item => {
					nodeList.push(this.$refs.tree.getNode(item).data)
				})
				let param = {
					checkedKeys: distinct(idList, idList[0]),
					halfCheckedNodes: halfNodeList,
					checkedNodes: nodeList,
					halfCheckedKeys: halfNodeIdList
				}
				this.nodeData = this.$refs.tree.getNode(idArr[0]).data
				this.selectedListConfig = param
				// console.log(this.selectedListConfig)
				this.checkChange()
			},
			// 弹窗关闭
			modalClose() {
				if (this.$refs.tree.getNode(this.nodeData.key).level == 1) {
					this.$refs.tree.setCheckedKeys(this.$refs.tree.getCheckedKeys().filter(item => this.nodeData.children.every(i => i.key == item)))
				} else {
					this.$refs.tree.setCheckedKeys(this.$refs.tree.getCheckedKeys().filter(item => item != this.nodeData.key))
				}
				// this.$refs.tree.setCheckedKeys(this.$refs.tree.getCheckedKeys().filter(item => )
			},
			// div选中
			selectDiv(item) {
				if (this.nodeData.children.length > 0) {
					this.nodeData.children.forEach(i => {
						i.label2 = i.label + '--' + item.value
						i.category = item.value
					})
				} else {
					this.nodeData.label2 = this.nodeData.label + '--' + item.value
					this.nodeData.category = item.value
				}
				this.modalShow = false
				this.checkChange()
			},
			//
			getSelectedTree() {
				return this.$refs.tree
			}
		}
	}
	function distinct(a, b) {
		let arr = a.concat(b)
		let result = []
		let obj = {}

		for (let i of arr) {
			if (!obj[i]) {
				result.push(i)
				obj[i] = 1
			}
		}

		return result
	}
</script>

<style lang="stylus" scoped>
	.el-tree{
		overflow auto
		width 400px
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr); /* 相当于 1fr 1fr 1fr */
		grid-template-rows: repeat(4, 1fr); /* fr单位可以将容器分为几等份 */
		grid-gap: 1%; /* grid-column-gap 和 grid-row-gap的简写 */
		grid-auto-flow: row;
	}

	.grid {
		div {
			color: #fff;
			cursor pointer
			font-size: 50px;
			line-height: 2;
			text-align: center;
			background: linear-gradient(to bottom, #f5f6f6 0%, #dbdce2 21%, #b8bac6 49%, #dddfe3 80%, #f5f6f6 100%);
			border 2px solid #fff
		}

		div:hover {
			color #00aaff
			border 2px solid #00aaff
		}
	}

	.transfer-main {
		width: 100%;

		.el-row {
			.el-col {
				padding 10px

				.transfer-main-left {
					width: 100%;
					border: 1px solid #d7dde4;
					height 550px
					border-top-right-radius 6px
					border-top-left-radius 6px

					.title {
						line-height 45px
						padding 0 10px
						background-color: #f7f7f7;
						border-bottom 1px solid #d7dde4
						border-top-right-radius 6px
						border-top-left-radius 6px
						height 45px
					}

					.content {
						height 463px
						overflow auto
						background white
					}

					.content2 {
						height 503px
						overflow auto
						background white
					}
				}
			}
		}

	}
</style>
