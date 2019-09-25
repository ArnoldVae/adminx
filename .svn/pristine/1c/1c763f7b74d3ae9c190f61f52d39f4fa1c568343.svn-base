<template>
	<div class="PSvgcontainer">
		<!-- 搜索框 -->
		<Input class="Input" v-model="InputValue" @on-enter="inputEnter(InputValue)" placeholder="请输入名称  回车搜索" style="width: 260px">
			<Button slot="append" @click="resetClick"> 重置 </Button>
		</Input>
		<!-- 保存 返回按钮 -->
		<Button class="btn" type="primary" @click="getTreeView">一键保存</Button>
		<Button class="btn returnBtn" @click="returnList" type="warning">返回列表</Button>
		<div id="svgCon" class="svgCon"></div>
		<!-- 对话框 -->
		<Modal v-model="isDialog" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
			<p>Content of dialog</p>
			<p>Content of dialog</p>
			<p>Content of dialog</p>
		</Modal>
	</div>
</template>
<script>
import CreateEdgeInteractor from './CreateEdgeInteractor'
import CreateShapeInteractor from './CreateShapeInteractor'
import axios from 'axios'
export default {
	name: 'svgConfig',
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
			loadDatas: [],
			item: {},
			palette_config: {
				scene: {
					name: '场景',
					items: []
				},
				video: {
					name: '视频',
					items: []
				},
				dev: {
					name: '设备',
					items: []
				},
				root: {
					name: '机器人',
					items: []
				}
			},
			InputValue: '',
			isDialog: false,
			paletteDataModel: {},
			nodeInfo: [],
			localHt: null,
			dataModel: null,
			g2d: null,
			palette: null,
			rulerFrame: null,
			borderPane: null,
			topSplit: null,
			leftSplit: null,
			treeView: null,
			propertyPane: null,
			rightSplit: null,
			mainSplit: null,
			paletteNode: null,
			dialog: null,
			quickFinder: null,
			isFulfil: [],
			loading: null,
			shapeInteractor: null,
			edgeInteractor: null,
			rightAngleInteractor: null,
			toolbar_config: [
				{
					id: 'edit',
					unfocusable: true,
					toolTip: '编辑',
					groupId: 'bar',
					icon: {
						width: 16,
						height: 16,
						comps: [
							{
								type: 'image',
								name: 'symbols/toolbarIcon/select.json',
								color: {
									func: function(item) {
										return item.selected ? '#1E90FF' : '#000'
									}
								}
							}
						]
					},
					action: function() {
						g2d.setEditable(true)
					}
				},
				{
					id: 'edge',
					unfocusable: true,
					toolTip: '连线',
					groupId: 'bar',
					icon: {
						width: 16,
						height: 16,
						comps: [
							{
								type: 'image',
								name: 'symbols/toolbarIcon/edge.json',
								color: {
									func: function(item) {
										return item.selected ? '#1E90FF' : '#000'
									}
								}
							}
						]
					},
					action: function() {
						g2d.setInteractors([edgeInteractor])
						g2d.sm().cs()
					}
				},
				{
					id: 'rightAngle',
					unfocusable: true,
					toolTip: '直角连线',
					groupId: 'bar',
					icon: {
						width: 16,
						height: 16,
						comps: [
							{
								type: 'image',
								name: 'symbols/toolbarIcon/right-angle.json',
								color: {
									func: function(item) {
										return item.selected ? '#1E90FF' : '#000'
									}
								}
							}
						]
					},
					action: function() {
						g2d.setInteractors([rightAngleInteractor])
						g2d.sm().cs()
					}
				},
				{
					id: 'polyline',
					unfocusable: true,
					toolTip: '多边形',
					groupId: 'bar',
					icon: {
						width: 16,
						height: 16,
						comps: [
							{
								type: 'image',
								name: 'symbols/toolbarIcon/polygon.json',
								color: {
									func: function(item) {
										return item.selected ? '#1E90FF' : '#000'
									}
								}
							}
						]
					},
					action: function() {
						g2d.setInteractors([shapeInteractor])
						g2d.sm().cs()
					}
				}
			],
			datamodel_config: {
				v: '6.2.8',
				p: {
					background: 'rgb(61,61,61)',
					layers: ['0', 1],
					autoAdjustIndex: true,
					hierarchicalRendering: true
				},
				d: []
			}
		}
	},
	created() {
		this.getChang()
	},
	beforeMount() {},
	mounted() {
		let _this = this

		_this.svgHt()
		// _this.initPalette()
		_this.initGraphView()
		_this.initTreeView()
		_this.initPropertyView()
		// _this.lodeSvgHt();
	},
	watch: {},
	methods: {
		ok() {
			this.isDialog = false
		},
		cancel() {
			this.isDialog = false
		},

		// 重置按钮 清空搜索框
		resetClick() {
			this.InputValue = ''
			// 重置ht组件
			this.palette.dm().clear()
			this.initPalette()
			// msg.close()
		},

		// 添加控制是否可以拖拽属性
		isDrag(vcSourceId, isFalse) {
			let dev = this.palette_config.dev.items
			let video = this.palette_config.video.items
			let scene = this.palette_config.scene.items
			// 设备数据查找
			let devIndex = dev.findIndex(item => item.devId == vcSourceId)
			if (devIndex != -1) {
				dev[devIndex].draggable = isFalse
				// console.log(dev[devIndex]);
			}
			// 视频数据查找
			let videoIndex = video.findIndex(item => item.devId == vcSourceId)
			if (videoIndex != -1) {
				video[videoIndex].draggable = isFalse
				// console.log(video[videoIndex]);
			}
			// 场景数据查找
			let sceneIndex = scene.findIndex(item => item.sceneId == vcSourceId)
			if (sceneIndex != -1) {
				scene[sceneIndex].draggable = isFalse
				// console.log(scene[sceneIndex]);
			}
		},

		// 遍历以以拖拽设备列表
		resetData() {
			let nodeInfo = this.nodeInfo
			for (let i = 0; i < nodeInfo.length; i++) {
				let element = nodeInfo[i].vcSourceId
				this.isDrag(element, false)
			}

			this.initPalette()
			this.lodeSvgHt()
		},

		// 搜索框
		inputEnter(val) {
			let arr = []
			// 查找搜索的内容
			for (let name in this.palette_config) {
				// console.log(this.palette_config[name])
				let obj = this.palette_config[name]
				if (obj.items.length) {
					for (let j = 0; j < obj.items.length; j++) {
						let element = obj.items[j]
						if (element.vcName.search(val) != -1) {
							arr.push({ ...element, isType: obj.name })
						}
					}
				}
			}
			// 重置ht组件
			this.palette.dm().clear()
			let dmPalette = this.palette.dm()
			let group = new global.ht.Group()
			// 是否展开
			group.setExpanded(true)
			group.setName('搜索结果')
			dmPalette.add(group)
			for (let i = 0; i < arr.length; i++) {
				let item = arr[i]
				let node = new global.ht.Node()
				node.setName(item.vcName)
				if (item.isType == '设备') {
					if (item.vcIcon && item.vcIcon != '' && item.vcIcon != null && item.vcIcon != 'null') {
						node.setImage(`symbols/QIF/${item.vcIcon}.json`)
					} else {
						node.setImage('ht/storage/symbols/basic/dev.png')
					}
					node.a('nType', 3)
					node.setTag(item.devId)
				} else if (item.isType == '视频') {
					if (item.vcIcon && item.vcIcon != '' && item.vcIcon != null && item.vcIcon != 'null') {
						node.setImage(`symbols/QIF/${item.vcIcon}.json`)
					} else {
						node.setImage('ht/storage/assets/svg/Dark_icons_qiujiOnline.png')
					}
					node.a('nType', 2)
					node.setTag(item.devId)
				} else if (item.isType == '场景') {
					node.setImage('ht/storage/assets/svg/Dark_icons_qiujiAlarm.png')
					node.a('nType', 1)
					node.setTag(item.sceneId)
				} else if (item.isType == '机器人') {
					node.setImage('ht/storage/assets/svg/robot-img.png')
					node.a('nType', 4)
				}
				node.item = item

				node.s({
					// 设置节点显示图片为填充的方式，这样不同比例的图片也不会因为拉伸而导致变形
					'image.stretch': item.stretch || 'centerUniform',
					// 设置节点是否可被拖拽
					draggable: item.draggable === undefined ? true : item.draggable
				})
				node.a(item)
				// 文本类型
				if (item.type === global.ht.Text) {
					node.s({
						text: 'Text',
						'text.align': 'center',
						'text.vAlign': 'middle',
						'text.font': '32px Arial'
					})
				}
				// 将节点设置为 group 组的孩子
				group.addChild(node)
				dmPalette.add(node)
			}
			// //重置组件图元
			this.palette.redraw()
		},

		svgHt() {
			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new ht.DataModel())
			dataModel.deserialize(this.datamodel_config)
			let g2d = (this.g2d = new localHt.graph.GraphView(dataModel))
			// 组件面板
			let palette = (this.palette = new localHt.widget.Palette())

			let border = new localHt.widget.BorderPane()
			let topSplit = (this.topSplit = new localHt.widget.SplitView(border, palette, 'v', 33))
			// 刻度尺
			let rulerFrame = (this.rulerFrame = new localHt.widget.RulerFrame(g2d))
			// 工具条
			// let toolbar = (this.toolbar = new ht.widget.Toolbar(this.toolbar_config))
			// toolbar.getSelectBackground = function() {
			// 	return 'rgb(240,239,238)'
			// }
			// toolbar.enableToolTip()

			// console.log(new CreateShapeInteractor())
			// 创建交互器对象
			// let shapeInteractor = (this.shapeInteractor = new CreateShapeInteractor(g2d, localHt.Shape))
			// let edgeInteractor = (this.edgeInteractor = new CreateEdgeInteractor(g2d))
			// let rightAngleInteractor = ( this.rightAngleInteractor = new CreateEdgeInteractor(g2d, 'v.h'))

			// 编辑区域
			let borderPane = (this.borderPane = new localHt.widget.BorderPane())
			// borderPane.setTopView(toolbar)
			borderPane.setTopHeight(25)
			borderPane.setCenterView(rulerFrame)

			let leftSplit = (this.leftSplit = new localHt.widget.SplitView(topSplit, borderPane, 'h', 260))
			// 树组件
			let treeView = (this.treeView = new localHt.widget.TreeView(dataModel))
			// 属性面板
			let propertyPane = (this.propertyPane = new localHt.widget.PropertyPane(dataModel))
			let rightSplit = (this.rightSplit = new localHt.widget.SplitView(propertyPane, treeView, 'v', 0.4))
			// 场景主面板
			let mainSplit = (this.mainSplit = new localHt.widget.SplitView(leftSplit, rightSplit, 'h', -260))
			// let quickFinder = (this.quickFinder = new localHt.QuickFinder(dataModel, 'name'))

			g2d.setEditable(true)
			g2d.setLayers(['0', 1])

			// 加载图纸
			this.$api.svgConfig.getHt(this.propRow.vcUrl).then(res => {
				let json = ht.Default.parse(res)
				dataModel.deserialize(json)
				g2d.fitContent(true)
			})
			// global.ht.Default.xhrLoad(`${globalRequestConfig.target}/${globalRequestConfig.javaModule}${this.propRow.vcUrl}`, res => {
			// 	let json = ht.Default.parse(res);
			// 	dataModel.deserialize(json);
			// });

			// 选中导航栏中的“默认编辑模式”
			function resetDefault() {
				toolbar.handleClick(toolbar.getItemById('edit'))
			}

			if (g2d.getEditInteractor()) {
				g2d.getEditInteractor().setStyle('anchorVisible', false)
			}
			dataModel.each(function(data) {
				if (!(data instanceof localHt.Edge)) data.setLayer(1)
			})
			const svgContanier = document.getElementById('svgCon')
			mainSplit.addToDOM(svgContanier)

			//右侧树节点显示筛选
			this.treeView.setVisibleFunc(function(data) {
				return data.a('vc_SourceID') != undefined
			})

			g2d.fitContent(true)
		},

		// 添加节点
		addNode(name, info, dmPalette) {
			// for (let name in this.palette_config) {
			// let info = this.palette_config[name]
			// console.log(info);
			// 组件面板用ht.Group展示分组，ht.Node展示按钮元素
			let group = new global.ht.Group()
			group.setName(name)
			dmPalette.add(group) // 将节点添加到 palette 的数据容器中
			// if (name === '设备') group.setExpanded(true)
			// setTimeout(() => {
			// if (info.length) {
			info.forEach(function(item) {
				// 新建 ht.Node 类型节点
				let node = new global.ht.Node()
				node.setName(item.vcName)
				if (name == '设备') {
					if (item.vcIcon && item.vcIcon != '' && item.vcIcon != null && item.vcIcon != 'null') {
						node.setImage(`symbols/QIF/${item.vcIcon}.json`)
					} else {
						node.setImage('assets/libs/ht/storage/symbols/basic/dev.png')
					}
					node.a('nType', 3)
					node.setTag(item.devId)
				} else if (name == '视频') {
					if (item.vcIcon && item.vcIcon != '' && item.vcIcon != null && item.vcIcon != 'null') {
						node.setImage(`symbols/QIF/${item.vcIcon}.json`)
					} else {
						node.setImage('assets/libs/ht/storage/assets/svg/Dark_icons_qiujiOnline.png')
					}
					node.a('nType', 2)
					node.setTag(item.devId)
				} else if (name == '场景') {
					node.setImage('assets/libs/ht/storage/assets/svg/Dark_icons_qiujiAlarm.png')
					node.a('nType', 1)
					node.setTag(item.sceneId)
				} else if (name == '机器人') {
					node.setImage('assets/libs/ht/storage/assets/svg/robot-img.png')
					node.a('nType', 4)
				}
				node.item = item

				node.s({
					// 设置节点显示图片为填充的方式，这样不同比例的图片也不会因为拉伸而导致变形
					'image.stretch': item.stretch || 'centerUniform',
					// 设置节点是否可被拖拽
					draggable: item.draggable === undefined ? true : item.draggable
				})
				node.a(item)
				// 文本类型
				if (item.type === global.ht.Text) {
					node.s({
						text: 'Text',
						'text.align': 'center',
						'text.vAlign': 'middle',
						'text.font': '32px Arial'
					})
				}
				// 将节点设置为 group 组的孩子
				group.addChild(node)
				dmPalette.add(node)
			})

			// }
			// return dmPalette
		},

		// 获取左面板的数据
		async getChang() {
			this.loading = this.$loading({
				lock: true,
				text: '数据量较大，请耐心等待！',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)',
				customClass: 'loadingClass'
			})

			try {
				// 以拖拽过的图元
				let nodeInfoRes = await this.$api.svgConfig.getSvgNodeInfo({ unitId: this.id, pageId: this.pageId })
				this.nodeInfo = nodeInfoRes.data
				console.log(this.nodeInfo)
			} catch (err) {
				console.log(err)
			}

			try {
				// 设备
				let devRes = await this.$api.svgConfig.getDev(this.id)
				this.palette_config.dev.items = devRes.data
				console.log(this.palette_config.dev.items)
			} catch (err) {
				console.log(err)
			}
			try {
				// 场景
				let sceneRes = await this.$api.svgConfig.getScene(this.id)
				this.palette_config.scene.items = sceneRes.data
				console.log(this.palette_config.scene.items)
			} catch (err) {
				console.log(err)
			}
			try {
				// 视频
				let videoRes = await this.$api.svgConfig.getVideo(this.id)
				this.palette_config.video.items = videoRes.data
				console.log(this.palette_config.video.items)
			} catch (err) {
				console.log(err)
			}

			this.resetData()
		},
		// 初始化组件面板中的内容
		initPalette() {
			let dmPalette = this.palette.dm()
			setTimeout(() => {
				for (let name in this.palette_config) {
					let info = this.palette_config[name]
					// console.log(info);
					// 组件面板用ht.Group展示分组，ht.Node展示按钮元素
					let group = new global.ht.Group()
					group.setName(info.name)
					dmPalette.add(group) // 将节点添加到 palette 的数据容器中
					// if (name === '设备') group.setExpanded(true)
					if (info.items.length) {
						info.items.forEach(function(item) {
							// 新建 ht.Node 类型节点
							let node = new global.ht.Node()
							node.setName(item.vcName)
							if (info.name == '设备') {
								if (item.vcIcon && item.vcIcon != '' && item.vcIcon != null && item.vcIcon != 'null') {
									node.setImage(`symbols/QIF/${item.vcIcon}.json`)
								} else {
									node.setImage('assets/libs/ht/storage/symbols/basic/dev.png')
								}
								node.a('nType', 3)
								node.setTag(item.devId)
							} else if (info.name == '视频') {
								if (item.vcIcon && item.vcIcon != '' && item.vcIcon != null && item.vcIcon != 'null') {
									node.setImage(`symbols/QIF/${item.vcIcon}.json`)
								} else {
									node.setImage('assets/libs/ht/storage/assets/svg/Dark_icons_qiujiOnline.png')
								}
								node.a('nType', 2)
								node.setTag(item.devId)
							} else if (info.name == '场景') {
								node.setImage('assets/libs/ht/storage/assets/svg/Dark_icons_qiujiAlarm.png')
								node.a('nType', 1)
								node.setTag(item.sceneId)
							} else if (info.name == '机器人') {
								node.setImage('assets/libs/ht/storage/assets/svg/robot-img.png')
								node.a('nType', 4)
							}
							node.item = item

							node.s({
								// 设置节点显示图片为填充的方式，这样不同比例的图片也不会因为拉伸而导致变形
								'image.stretch': item.stretch || 'centerUniform',
								// 设置节点是否可被拖拽
								draggable: item.draggable === undefined ? true : item.draggable
							})
							node.a(item)
							// 文本类型
							if (item.type === global.ht.Text) {
								node.s({
									text: 'Text',
									'text.align': 'center',
									'text.vAlign': 'middle',
									'text.font': '32px Arial'
								})
							}
							// 将节点设置为 group 组的孩子
							group.addChild(node)
							dmPalette.add(node)
						})
					}
				}
			}, 0)
			this.loading.close()
			// this.$Message.destroy()
		},
		// 初始化拓扑图
		initGraphView() {
			let group
			// 判断是否为触屏可 Touch 方式交互
			if (this.localHt.Default.isTouchable) {
				// 重写此方法可以禁用 HTML5 原生的 Drag 和 Drop 事件并启用模拟的拖拽事件
				this._palette.handleDragAndDrop = (e, state) => {
					// 判断交互事件所处位置是否在View组件之上
					if (this.localHt.Default.containedInView(e, this.g2d)) {
						if (state === 'between') {
							e.preventDefault()
						} else if (state === 'end') {
							// 当 state 为 end 时，判断e是否在 graphView 的范围内，如果是，则创建 Node
							this.handleDrop(e)
						}
					}
				}
			} else {
				this.g2d.getView().addEventListener('dragover', e => {
					e.dataTransfer.dropEffect = 'copy'
					e.preventDefault()
					this.g2d.setEditable(true)
					// 从palette面板上拖拽到拓扑图上，还未放开鼠标时 经过group则加一个边框
					let data = this.g2d.getDataAt(e)

					if (data instanceof this.localHt.Group || (data && data.getParent() instanceof this.localHt.Group)) {
						group = data.getParent() instanceof this.localHt.Group ? data.getParent() : data
						group.s({
							'border.color': 'red',
							'border.width': 1
						})
					} else {
						if (group) group.s('border.width', 0)
					}
				})
				let _this = this
				this.g2d.getView().addEventListener('drop', function(e) {
					_this.handleDrop(e)
				})
				// 点击事件
				this.palette.getView().addEventListener('click', function(e) {
					// _this.handleClick(e);
				})
			}
			// 删除图元信息
			this.dataModel.mm(e => {
				if (e.kind == 'remove') {
					// 图纸上的图元删除 改变左侧组件图元可以拖拽
					let tag = this.palette.getDataModel().getDataByTag(e.data._attrObject.vc_SourceID)
					console.log(tag)
					tag._styleMap.draggable = true
					// 重置组件图元
					this.palette.redraw()
					this.isDrag(e.data._attrObject.vc_SourceID, true)
				}
			})
		},
		// 初始化树组件
		initTreeView() {
			// 重载树组件上的文本显示

			this.treeView.getLabel = function(data) {
				if (data instanceof global.ht.Text) {
					return data.s('text')
				} else if (data instanceof global.ht.Shape) {
					return data.getName() || '不规则图形'
				}
				return data.getName() || '节点'
			}
			// 重载树组件上的图标显示
			let oldGetIconFunc = this.treeView.getIcon
			this.treeView.getIcon = function(data) {
				if (data instanceof global.ht.Text) {
					return 'ht/storage/symbols/text.json'
				}
				let img = data.getImage()
				return img || oldGetIconFunc.apply(this, arguments)
			}
		},
		// 初始化属性组件
		initPropertyView() {
			this.propertyPane.setHeaderLabels(['属性', '值'])
			let propertyView = this.propertyPane.getPropertyView()
			let dev_properties = [
				{ name: 'nodeid', displayName: '节点ID' },
				{ name: 'name', displayName: '名称', editable: true },
				{ name: 'tag', displayName: 'tag标签', accessType: 'attr', editable: true },
				{ name: 'i_NodeType', displayName: '图元类型', accessType: 'attr' },
				{ name: 'vc_SourceID', displayName: '源ID', accessType: 'attr', editable: true },
				{ name: 'iParam1', displayName: '参数1', accessType: 'attr', editable: true },
				{ name: 'iParam2', displayName: '参数2', accessType: 'attr', editable: true },
				{ name: 'iParam3', displayName: '参数3', accessType: 'attr', editable: true },
				{ name: 'sort', displayName: '排序', accessType: 'attr', editable: true },
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
						let rotation = data.getRotation()
						return rotation
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
				},
				{
					categoryName: '事件',
					displayName: '单击',
					name: 'click',
					editable: true
				}
				// {
				// 	categoryName: '事件',
				// 	displayName: '弹窗',
				// 	name: 'dialog',
				// 	valueType: 'attr',
				// 	editable: true,
				// 	// getValue: data => {
				// 	// 	return this.isDialog
				// 	// }
				// 	drawPropertyValue: (g, property, value, rowIndex, x, y, w, h, data, view) => {
				// 		console.log('11111111111')
				// 	}
				// }
			]
			// let edge_properties = [
			// 	// 连线的属性
			// 	{
			// 		name: 'edge.width',
			// 		displayName: '宽度',
			// 		accessType: 'style',
			// 		valueType: 'number',
			// 		editable: true
			// 	},
			// 	{
			// 		name: 'edge.color',
			// 		displayName: '颜色',
			// 		accessType: 'style',
			// 		valueType: 'color',
			// 		editable: true,

			// 	}
			// ]

			// propertyView.addPropertyChangeListener(data => {
			// 	console.log(data)
			// 	if (data.newValue == 15) {

			// 		this.isDialog = true
			// 	}
			// })
			this.dataModel.sm().ms(function() {
				// 监听选中变化事件
				propertyView.setProperties(null)
				let data = global.dataModel.sm().ld()

				if (data == null || !data.a('vc_SourceID')) {
					global.dataModel.getSelectionModel().removeSelection(data)
					return
				}
				if (data instanceof global.ht.Data) {
					// data 类型，所有的节点都基于这个类型
					propertyView.addProperties(dev_properties)
				}
				// if (data instanceof global.ht.Edge) {
				// 	// 连线类型
				// 	propertyView.addProperties(edge_properties)
				// }
			})
		},

		// 组件点击事件
		handleClick(e) {
			e.preventDefault()
			let paletteNode = this.palette
				.dm()
				.sm()
				.ld()
			if (paletteNode) {
				let arr = []
				this.treeView.getRowDatas()._as.map(val => {
					arr.push(val._attrObject.vc_SourceID)
				})
				let index = arr.findIndex(item => item == paletteNode.item.devId)
				if (index == -1) {
					paletteNode._styleMap.draggable = true
				}
			}
		},

		// 被拖拽的元素在目标元素上同时鼠标放开触发的事件
		handleDrop(e) {
			e.preventDefault()
			// 获取 palette 面板上最后选中的节点
			let paletteNode = this.palette
				.dm()
				.sm()
				.ld()
			if (paletteNode) {
				let item = paletteNode.item
				let image = paletteNode.getImage()

				// 获取事件下的节点
				// let  datas = thi._g2d.getDataAt(e, null, 5);
				let node = new this.localHt.Node()
				node.setImage(image)
				node.setName(item.vcName)
				// node.setTag(item.vcName);
				node.p(this.g2d.lp(e))
				node.setSize(3, 3)
				node.s('label', '')
				node.setLayer(1)
				node.a('pageId', this.pageId)

				node.a('i_Type', paletteNode.a('nType'))
				if (paletteNode.a('nType') == 1) {
					node.a('i_NodeType', '场景')
					node.a('vc_SourceID', item.sceneId)
					node.a('vc_Path', image)
				} else if (paletteNode.a('nType') == 2) {
					node.a('i_NodeType', '视频')
					node.a('vc_SourceID', item.devId)
					node.a('vc_Path', image)
				} else if (paletteNode.a('nType') == 3) {
					node.a('i_NodeType', '设备')
					node.a('vc_SourceID', item.devId)
					node.a('vc_Path', image)
				} else if (paletteNode.a('nType') == 4) {
					node.a('i_NodeType', '机器人')
					node.a('vc_SourceID', item.robotId)
					node.a('vc_Path', image)
				}
				// 设置当前图元不可再拖拽
				paletteNode._styleMap.draggable = false
				this.isDrag(paletteNode._tag, false)

				this.g2d.dm().add(node)
				this.g2d.sm().ss(node)
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

		// 图元的信息添加上dataModel中
		lodeSvgHt() {
			// this.loadDatas = res.data
			// res.data.map(item => {
			// 	//设置初始图元是否可拖拽
			// 	let tag = this.palette.getDataModel().getDataByTag(item.vcSourceId)
			// 	tag._styleMap && (tag._styleMap.draggable = false)
			// })
			// reslove()
			this.nodeInfo.forEach(item => {
				// console.log(item)
				let node = new this.localHt.Node()
				node.setImage(item.vcPath)
				// node.setTag(item.vcName);
				node.setPosition(parseFloat(item.fPageX), parseFloat(item.fPageY))
				node.setRotation(item.fPageZ ? parseFloat(item.fPageZ) : 0)
				node.setName(item.vcName)
				node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
				node.a('vc_SourceID', item.vcSourceId)
				node.a('vc_Path', item.vcPath)
				node.a('i_Type', item.iNodeType)

				if (item.iNodeType == 1) {
					node.a('i_NodeType', '场景')
				} else if (item.iNodeType == 2) {
					node.a('i_NodeType', '视频')
				} else if (item.iNodeType == 3) {
					node.a('i_NodeType', '设备')
				} else if (item.iNodeType == 4) {
					node.a('i_NodeType', '机器人')
				}

				node.a('pageId', this.pageId)
				node.a('sort', item.iOrder)
				node.a('iParam1', item.iParam1)
				node.a('iParam2', item.iParam2)
				node.a('iParam3', item.iParam3)
				node.setLayer(1)
				node.s('label', '')

				this.dataModel.add(node)
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
.PSvgcontainer {
  position: relative;
  width: 100%;
  height: 100%;

  .btn {
    position: absolute;
    top: 0;
    right: 120px;
    width: 140px;
    line-height: 13px;
    height: 24px;
    z-index: 99999;
    font-size: 14px;
    border-radius: 0;
  }

  .Input {
    position: absolute;
    top: 0;
    z-index: 99999;
  }

  .returnBtn {
    width: 120px;
    right: 0;
  }

  .svgCon {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  /deep/.ivu-input {
    border: 0.06444rem solid #dcdee2;
  }

  /deep/.ivu-input-group-append {
    border: 0.06444rem solid #dcdee2;
  }
}
</style>
