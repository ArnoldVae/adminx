<template>
	<div id="newSubConfigTree">
		<div class="ht-box" ref="newSubConfigTree"></div>
		<Modal v-model="isDialog" title="设备选择" :mask-closable="false" :styles="{ top: '20px' }" width="80%" footer-hide>
			<device-modeling-modal v-if="isDialog" @callBack="callBack" />
		</Modal>
	</div>
</template>

<script>
import deviceModelingModal from './device-modeling-modal'
export default {
	name: '',
	components: { deviceModelingModal },
	props: {
		url: {
			type: String
		},
		id: {
			type: String
		},
		pageId: {
			type: String
		},
		iPageType: {
			type: String
		},
		propRow: {
			type: Object
		}
	},
	data() {
		return {
			dataModel: null,
			graphView: null,
			rulerFrame: null,
			leftTabView: null,
			rightFormPane: null,
			propertyView: null,
			rightListView: null,
			leftData: {},
			nodeInfo: [],
			sceneListView: null, // 场景list
			videoListView: null, // 视频list
			devTreeView: null, // 设备tree
			materialListView: null, // 素材list
			searchItem: {
				label: '搜索',
				icon: 'assets/img/search.png',
				textField: {
					width: 250
				}
			},
			datamodel_config: {
				v: '6.2.8',
				p: {
					background: 'rgb(61,61,61)',
					layers: ['0', 1],
					autoAdjustIndex: true,
					hierarchicalRendering: true
				},
				d: []
			},
			isDialog: false,
			dialogVal: null,
			oldDialogVal: null,
			newDialogVal: null,
			hasChanged: false
		}
	},
	computed: {},
	filters: {},
	watch: {
		dialogVal(newVal, oldVal) {
			this.oldDialogVal = oldVal
			this.newDialogVal = newVal
		}
	},
	created() {
		this.getLeftData()
	},
	mounted() {
		this.init()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		init() {
			this.dataModel = new ht.DataModel()
			// 绘制dataModel配置
			this.dataModel.deserialize(this.datamodel_config)
			this.graphView = new ht.graph.GraphView(this.dataModel)
			this.graphView.setEditable(true)
			this.leftTabView = new ht.widget.TabView()
			this.rightFormPane = new ht.widget.FormPane()
			this.propertyView = new ht.widget.PropertyView(this.dataModel)
			this.rightListView = new ht.widget.ListView(this.dataModel)
			// 刻度尺
			this.rulerFrame = new ht.widget.RulerFrame(this.graphView)

			this.loadPaper()
			this.splitInit()
			this.leftTabInit()
			this.initPropertyView()
			this.setRightTool()
			this.dataModelChange()

			ht.Default.setImage('loading', 'assets/img/loading.gif')
		},
		// 设置右侧工具栏（两个按钮）
		setRightTool() {
			let _this = this
			this.rightFormPane.addRow(
				[
					{
						button: {
							label: '一键保存',
							background: '#2d8cf0',
							// selectBackground: '',
							labelColor: '#fff',
							onClicked() {
								_this.getTreeView()
							}
						}
					},
					{
						button: {
							label: '返回列表',
							background: '#ff9900',
							labelColor: '#fff',
							onClicked() {
								console.log('aaa')
								_this.returnList()
							}
						}
					}
				],
				[0.5, 0.5],
				26
			)
		},
		// 加载图纸
		loadPaper() {
			console.log(this.propRow.vcUrl)
			let _this = this
			this.$api.svgConfig
				.getHt(this.propRow.vcUrl)
				.then(res => {
					let json = ht.Default.parse(res)
					_this.dataModel.deserialize(json)
					_this.graphView.fitContent(true)
				})
				.catch(err => console.log(err))
			this.loadSvgNodeInfo()
		},
		splitInit() {
			let mainSplit = new ht.widget.SplitView(this.leftTabView, this.rulerFrame, 'h', 300)
			let borderPane = new ht.widget.BorderPane()
			borderPane.setTopView(this.rightFormPane)
			borderPane.setTopHeight(34)
			this.rightFormPane.setVPadding(0)
			let rightCenterSplit = new ht.widget.SplitView(this.propertyView, this.rightListView, 'v', 0.5)
			borderPane.setCenterView(rightCenterSplit)
			let pageSplit = new ht.widget.SplitView(mainSplit, borderPane, 'h', 0.8)
			pageSplit.addToDOM(this.$refs.newSubConfigTree)
			window.addEventListener('resize', () => {
				pageSplit.invalidate(true)
			})
		},
		leftTabInit() {
			this.tabStyleSet(this.leftTabView)
			this.sceneListView = new ht.widget.ListView()
			this.videoListView = new ht.widget.ListView()
			this.devTreeView = new ht.widget.TreeView()
			this.materialListView = new ht.widget.ListView()
			// this.devTreeClickEv()

			// dragAndDrap(type, targetView)
			this.dragAndDrap('scene', this.sceneListView)
			this.dragAndDrap('video', this.videoListView)
			this.dragAndDrap('dev', this.devTreeView)
			this.dragAndDrap('material', this.materialListView)

			this.addTab(this.sceneListView, this.leftTabView, '场景', 'search_sence', true)
			this.addTab(this.videoListView, this.leftTabView, '视频', 'search_video', false)
			this.addTab(this.devTreeView, this.leftTabView, '设备', 'search_dev', false)
			this.addTab(this.materialListView, this.leftTabView, '素材', 'search_material', false)
		},
		tabStyleSet(tabView) {
			tabView.setSelectBackground('#ffaa00')
			tabView.setTabBackground('#001529')
			tabView.setLabelColor('#ffffff')
		},
		addTab(innerView, tabView, name, searchId, selected) {
			// 新建一个tab并使用borderPane分出搜索区和列表区
			let tab = new ht.Tab()
			let borderPane = new ht.widget.BorderPane()
			let searchItem = JSON.parse(JSON.stringify(this.searchItem))
			searchItem.id = searchId
			let toolBar = new ht.widget.Toolbar([searchItem])
			borderPane.setTopView(toolBar)
			borderPane.setCenterView(innerView)
			tab.setName(name)
			tab.setView(borderPane)
			// 添加tab并设置tab选中状态
			let tabModel = tabView.getTabModel()
			tabModel.add(tab)
			if (selected) {
				tabModel.getSelectionModel().setSelection(tab)
			}
			// 绑定搜索框的keyup事件
			toolBar.getItemById(searchId).element.getElement().onkeyup = function(e) {
				innerView.invalidateModel()
				if (name === '设备') {
					innerView.expandAll()
				}
			}
			// setVisibleFunc 设置可见过滤器
			innerView.setVisibleFunc(data => {
				// 树组件过滤：如果父元素不符合条件，则不再向下遍历其子元素
				if (data.hasChildren && data.hasChildren()) {
					return true
				}
				let text = toolBar.getValue(searchId)
				if (text) {
					return (
						data.getName() &&
						data
							.getName()
							.toLowerCase()
							.indexOf(text.toLowerCase()) >= 0
					)
				}
				return true
			})
			return tab
		},
		/**
		 * 获取左侧面板数据
		 */
		getLeftData() {
			this.loadScene()
			this.loadvideo()
			// this.loadDev()
			this.loadDevModel()
			this.loadMaterial()
		},
		async loadDev() {
			let res = await this.$api.svgConfig.getDev(this.id)
			this.leftData.dev = res.data
			this.addDataToLeft('dev', this.devTreeView)
		},
		async loadScene() {
			let res = await this.$api.svgConfig.getScene(this.id)
			this.leftData.scene = res.data
			this.addDataToLeft('scene', this.sceneListView)
		},
		async loadvideo() {
			let res = await this.$api.svgConfig.getVideo(this.id)
			this.leftData.video = res.data
			this.addDataToLeft('video', this.videoListView)
		},
		async loadMaterial() {
			let res = await this.$api.getMaterial()
			this.leftData.material = res.data
			this.addDataToLeft('material', this.materialListView)
		},
		// 获取设备模型
		async loadDevModel() {
			let res = await this.$api.svgConfig.getDevModel(this.id)
			this.leftData.dev = res.data
			this.addDataToLeft('dev', this.devTreeView, true)
		},
		// 根据设备类型获取设备
		async loadDevByModel(data) {
			if (data.hasChildren()) return
			data.setIcon('loading')
			let devTypeId = data.a('item').devTypeId
			let res = await this.$api.svgConfig.getDevSon(devTypeId)
			data.setIcon('')
			this.leftData.dev = res.data
			this.addDataToLeft('dev', this.devTreeView, false, data)
		},
		// 获取已拖拽过的图元
		async loadSvgNodeInfo() {
			let nodeInfoRes = await this.$api.svgConfig.getSvgNodeInfo({ unitId: this.id, pageId: this.pageId })
			this.nodeInfo = nodeInfoRes.data
			this.addSvgHt()
			// this.traverseData()
		},
		/**
		 * 左侧list/tree添加数据
		 * @parame String type 设备类型 scene, video, dev, robot, material
		 * @parame treeView/listView targetView 目标容器
		 * @parame Boolean 是否为父元素（设备树）
		 * @parame data 父元素的data
		 * nType 设备标识符 {场景：1，视频：2，设备：3，机器人：4，素材：5}
		 */
		addDataToLeft(type, targetView, isParent, parentData) {
			let targetModel = targetView.getDataModel()
			if (!this.leftData[type]) return
			this.leftData[type].forEach(item => {
				let data = new ht.Data()
				data.setName(item.vcName)
				// 把当前数据保存到自定义属性中
				data.a('item', item)

				if (type === 'dev') {
					if (!isParent && item.vcIcon && item.vcIcon !== 'null') {
						data.setIcon(`symbols/QIF/${item.vcIcon}.json`)
					} else if (!isParent) {
						data.setIcon('assets/libs/ht/storage/symbols/basic/dev.png')
					}

					if (parentData) {
						data.setParent(parentData)
					}
					data.a('nType', 3)
					data.setTag(item.devId)
				} else if (type === 'video') {
					if (item.vcIcon && item.vcIcon !== 'null') {
						data.setIcon(`symbols/QIF/${item.vcIcon}.json`)
					} else {
						data.setIcon('assets/libs/ht/storage/assets/svg/Dark_icons_qiujiOnline.png')
					}
					data.a('nType', 2)
					data.setTag(item.devId)
				} else if (type === 'scene') {
					data.setIcon('assets/libs/ht/storage/assets/svg/Dark_icons_qiujiAlarm.png')
					data.a('nType', 1)
					data.setTag(item.sceneId)
				} else if (type === 'robot') {
					data.setIcon('assets/libs/ht/storage/assets/svg/robot-img.png')
					data.a('nType', 4)
				} else if (type === 'material') {
					data.setIcon('assets/libs/ht/storage/assets/svg/robot-img.png')
					data.a('nType', 5)
					data.setTag(item.devId)
				}
				targetModel.add(data)
				if (isParent) {
					this.loadDevByModel(data)
				}
			})
		},
		// 给设备tree添加点击事件加载子项
		devTreeClickEv() {
			// 问题：无法区分设备模型和设备，当点击设备时也会发请求
			this.devTreeView.onDataClicked = (data, e) => {
				this.loadDevByModel(data)
			}
		},
		// 图元的信息添加入dataModel中
		addSvgHt() {
			this.nodeInfo.forEach(item => {
				let node = new ht.Node()
				if (item.vcPath.indexOf('ht') === 0) {
					node.setImage(`assets/libs/${item.vcPath}`)
				} else {
					node.setImage(item.vcPath)
				}
				node.setTag(item.vcSourceId)
				// 设置显示位置
				node.setPosition(parseFloat(item.fPageX), parseFloat(item.fPageY))
				// 设置旋转角度
				node.setRotation(item.fPageZ ? parseFloat(item.fPageZ) : 0)
				node.setName(item.vcName)
				node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
				node.a('vc_SourceID', item.vcSourceId)
				node.a('vc_Path', item.vcPath)
				node.a('i_Type', item.iNodeType)
				node.a('parentName', this.propRow.vcName)
				node.a('functionCode', item.functionCode)
				if (item.iNodeType === 1) {
					node.a('i_NodeType', '场景')
				} else if (item.iNodeType === 2) {
					node.a('i_NodeType', '视频')
				} else if (item.iNodeType === 3) {
					node.a('i_NodeType', '设备')
				} else if (item.iNodeType === 4) {
					node.a('i_NodeType', '机器人')
				} else if (item.iNodeType === 5) {
					node.a('i_NodeType', '素材')
				}

				node.a('pageId', this.pageId)
				node.a('sort', item.iOrder)
				node.a('iParam1', item.iParam1)
				node.a('iParam2', item.iParam2)
				node.a('iParam3', item.iParam3)
				node.setLayer(1)
				node.s('label', '')
				// node.s('draggable', false)
				this.dataModel.add(node)
				// 创建表单
				node.formPane = this.createFormPane(item.vcSourceId)
			})
			this.hasChanged = false
			this.graphView.fitContent(true)
		},
		// 初始化属性组件
		initPropertyView() {
			// this.propertyPane.setHeaderLabels(['属性', '值'])
			let _this = this
			let dev_properties = [
				{ name: 'parentName', displayName: '图纸名称', accessType: 'attr' },
				{ name: 'name', displayName: '名称', editable: true },
				// { name: 'tag', displayName: 'tag标签', accessType: 'attr', editable: true },
				{ name: 'i_NodeType', displayName: '图元类型', accessType: 'attr' },
				{ name: 'vc_SourceID', displayName: '源ID', accessType: 'attr' },
				{
					displayName: '绑定设备',
					name: 'click',
					accessType: 'attr',
					drawPropertyValue: (g, property, value, rowIndex, x, y, w, h, data, view) => {
						return _this.fillFormPane(data.formPane, w, h)
					}
				},
				{ name: 'iParam1', displayName: '参数1', accessType: 'attr', editable: true },
				{ name: 'iParam2', displayName: '参数2', accessType: 'attr', editable: true },
				{ name: 'iParam3', displayName: '参数3', accessType: 'attr', editable: true },
				{ name: 'sort', displayName: '排序', accessType: 'attr', editable: true },
				{ name: 'functionCode', displayName: '设备功能编码', accessType: 'attr', editable: true },
				{ name: 'vc_Path', displayName: '图元路径', accessType: 'attr' },
				{
					name: 'position',
					displayName: '位置',
					getValue: function(data) {
						let position = data.getPosition()
						return 'x: ' + parseInt(position.x) + ', y: ' + parseInt(position.y)
					}
				},
				{
					name: 'rotation',
					displayName: '旋转',
					getValue: function(data) {
						return data.getRotation()
					}
				},
				{
					displayName: '宽度',
					name: 'width',
					valueType: 'number',
					editable: true
				},
				{
					displayName: '高度',
					name: 'height',
					valueType: 'number',
					editable: true
				}
			]
			this.propertyView.addProperties(dev_properties)
		},
		fillFormPane(formP, w, h) {
			if (formP === undefined) {
				return
			}
			formP.setWidth(w)
			formP.setHeight(h)
			formP.setHGap(0)
			return formP.getView()
		},
		// 创建表单按钮
		createFormPane(tag) {
			// 创建表单面板
			let formPane = new ht.widget.FormPane()
			formPane.setPadding(0)
			let tField = new ht.widget.TextField()
			tField.setText('')
			tField.setDisabled(true)
			formPane.addRow(
				[
					{
						button: {
							label: '选择',
							icon: 'grid_icon',
							labelColor: '#fff',
							background: 'rgb(45, 140, 240)',
							onClicked: () => {
								this.isDialog = true
								this.dialogVal = tag
								// console.log('click', tag)
							}
						}
					}
				],
				[0.5, 0.1]
			)
			return formPane
		},
		// 弹框回调
		callBack(val) {
			if (val.shut) {
				this.isDialog = false
				this.dialogVal = null
			} else if (val.devRow) {
				this.isDialog = false
				let index = this.leftData.dev.findIndex(item => item.devId === val.devRow.devId)

				let currentData = this.leftData.dev[index]

				let node = this.dataModel.getDataByTag(this.dialogVal)
				if (index === -1) {
					node.setTag(val.devRow.devId)
					node.setName(val.devRow.vcName)
					node.a('i_Type', 3)
					node.a('i_NodeType', '设备')
					node.a('vc_SourceID', val.devRow.devId)
					node.formPane = this.createFormPane(val.devRow.devId)
				} else {
					if (!this.isExist(val.devRow.devId)) {
						node.setTag(val.devRow.devId)
						node.setName(val.devRow.vcName)
						node.a('i_Type', 3)
						node.a('i_NodeType', '设备')
						node.a('vc_SourceID', val.devRow.devId)
						node.formPane = this.createFormPane(val.devRow.devId)
						currentData.draggable = false
						let tagNode = this.leftTreeView.getDataModel().getDataByTag(val.devRow.devId)
						tagNode.s('draggable', false)
					} else {
						this.$Message.warning('该设备已经在图纸上已经存在！！！')
					}
				}
				// this.resetDataNode()
			}
		},
		/**
		 * 拖放事件绑定
		 */
		dragAndDrap(type, targetView) {
			let _this = this
			let currentDiv = null
			// let iconTreeView = this.iconTreeView
			let data = null
			let size = 24
			let allowDrap
			let wrap = document.getElementById('newSubConfigTree')
			targetView.handleDragAndDrop = (e, state) => {
				if (state === 'prepare') {
					data = targetView.getDataAt(e)
					targetView.sm().ss(data)
					allowDrap = !this.isExist(this.getIdByType(type, data))
					if (data && !data.hasChildren()) {
						if (!currentDiv) {
							currentDiv = document.createElement('div')
							currentDiv.style.position = 'fixed'
							currentDiv.style.width = size + 'px'
							currentDiv.style.height = size + 'px'
							currentDiv.style.borderWidth = '1px'
							currentDiv.style.borderStyle = 'solid'
							currentDiv.style.borderColor = '#dcdee2'
							let icon = data.getIcon()
							currentDiv.style.background = `url('${icon}') no-repeat center`
							currentDiv.style.backgroundSize = 'cover'
						}
						currentDiv.setAttribute('nodeTag', data.getTag())
					}
				} else if (state === 'begin') {
					if (currentDiv) {
						let pagePoint = ht.Default.getPagePoint(e)
						currentDiv.style.left = pagePoint.x - size + 'px'
						currentDiv.style.top = pagePoint.y - size + 'px'
						// document.body.appendChild(currentDiv)
						wrap.appendChild(currentDiv)
					}
				} else if (state === 'between') {
					if (currentDiv) {
						let pagePoint = ht.Default.getPagePoint(e)
						currentDiv.style.left = pagePoint.x - size / 2 + 'px'
						currentDiv.style.top = pagePoint.y - size / 2 + 'px'
					}
				} else {
					if (!allowDrap) {
						this.$Message.warning('该设备已被拖拽！！！')
						wrap.removeChild(currentDiv)
						currentDiv = null
						data = null
						return
					}
					if (ht.Default.containedInView(e, _this.graphView) && currentDiv) {
						// 调用下方创建node节点的方法
						_this.handleDrop(currentDiv.getAttribute('nodeTag'), e, targetView)
						wrap.removeChild(currentDiv)
						currentDiv = null
						data = null
					}
					if (currentDiv && !ht.Default.containedInView(e, _this.graphView)) {
						wrap.removeChild(currentDiv)
						currentDiv = null
						data = null
					}
					allowDrap = undefined
				}
			}
		},
		// 被拖拽的元素在目标元素上同时鼠标放开触发的事件
		handleDrop(paletteNode, e, targetView) {
			e.preventDefault()
			if (paletteNode) {
				// 根据拖拽的图元的tag进行查找节点
				let tagNode = targetView.getDataModel().getDataByTag(paletteNode)
				let item = tagNode.a('item')
				let image = tagNode.getIcon()

				// 获取事件下的节点
				let node = new ht.Node()
				node.setImage(image)
				node.setName(item.vcName)

				node.p(this.graphView.lp(e))
				node.setSize(10, 10)
				node.s('label', '')
				node.setLayer(1)
				node.a('pageId', this.pageId)
				node.a('parentName', this.propRow.vcName)
				node.a('functionCode', '')
				let tag = null
				node.a('i_Type', tagNode.a('nType'))
				if (tagNode.a('nType') === 1) {
					node.a('i_NodeType', '场景')
					tag = item.sceneId
					node.a('vc_SourceID', item.sceneId)
					node.setTag(item.sceneId)
					node.a('vc_Path', image)
				} else if (tagNode.a('nType') === 2) {
					node.a('i_NodeType', '视频')
					tag = item.devId
					node.a('vc_SourceID', item.devId)
					node.setTag(item.devId)
					node.a('vc_Path', image)
				} else if (tagNode.a('nType') === 3) {
					node.a('i_NodeType', '设备')
					tag = item.devId
					node.a('vc_SourceID', item.devId)
					node.setTag(item.devId)
					node.a('vc_Path', image)
				} else if (tagNode.a('nType') === 4) {
					node.a('i_NodeType', '机器人')
					tag = item.robotId
					node.a('vc_SourceID', item.robotId)
					node.setTag(item.robotId)
					node.a('vc_Path', image)
				} else if (tagNode.a('nType') === 5) {
					node.a('i_NodeType', '素材')
					tag = item.devId
					node.a('vc_SourceID', item.devId)
					node.setTag(item.devId)
					node.a('vc_Path', image)
				}
				// 设置当前图元不可再拖拽
				targetView.getDataModel().toDatas(data => {
					if (data.getTag() === paletteNode) {
						data.s('draggable', false)
					}
				})
				this.graphView.dm().add(node)
				this.graphView.sm().ss(node)
				// 创建表单
				node.formPane = this.createFormPane(tag)
			}
		},
		// 判断图元是否已经存在
		isExist(id) {
			let isExist = false
			this.dataModel.each(function(data) {
				if (id === data.a('vc_SourceID')) {
					isExist = true
				}
			})
			return isExist
		},
		// 根据type获取sourceID
		getIdByType(type, data) {
			let item = data.a('item')
			if (type === 'scene') {
				return item.sceneId
			} else if (type === 'dev') {
				return item.devId
			} else if (type === 'video') {
				return item.devId
			}
		},
		// 获取树结构的添加数据
		getTreeView() {
			let datasModel = []
			this.dataModel.each(function(data) {
				if (data.a('vc_SourceID')) {
					let datasNode = {
						pageId: data.a('pageId'),
						vcSourceId: data.a('vc_SourceID'),
						vcName: data.getName(),
						fPageX: data.getPosition().x,
						fPageY: data.getPosition().y,
						fPageZ: data.getRotation(),
						iWidth: data.getWidth(),
						iOrder: data.a('sort'),
						iHeight: data.getHeight(),
						vcPath: data.getImage(),
						iNodeType: data.a('i_Type'),
						functionCode: data.a('functionCode'),
						iParam1: data.a('iParam1'),
						iParam2: data.a('iParam2'),
						iParam3: data.a('iParam3')
					}
					datasModel.push(datasNode)
				}
			})
			let params = {
				pageId: this.pageId,
				lists: datasModel
			}
			// 数据保存
			this.$api.svgConfig.getSvgNodeSaveInfo(params).then(res => {
				if (res && res.code == 200) {
					this.$Message.success('保存成功')
				} else {
					this.$Message.warning('保存失败')
				}
			})
		},
		// 返回列表
		returnList() {
			let subFlag = false
			this.$emit('subChange', subFlag)
		},
		// 监听dataModel变化
		dataModelChange() {
			this.dataModel.addDataModelChangeListener(e => {
				this.hasChanged = true
			})
			this.dataModel.addDataPropertyChangeListener(e => {
				this.hasChanged = true
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

<style type="stylus" scoped>
.ht-box {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
