<template>
	<div class="env-config">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="treeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<!-- 右侧内容 -->
		<div class="right-content">
			<!-- 搜索栏 -->
			<transition name="el-fade-in-linear">
				<div class="search-bar">
					<searche-Header-Wrapper>
						<Button type="success" size="large" icon="md-add" @click="addOrEditEnvConfig('add')">新增</Button>
						<span class="status">状态：</span>
						<el-select v-model="status" @change="selectStatus" placeholder="请选择状态">
							<el-option value="0" label="禁用">禁用</el-option>
							<el-option value="1" label="启用">启用</el-option>
						</el-select>
						<Button type="info" size="large" icon="md-search" @click="getStationTable" style="margin-left: 10px;">查询</Button>
						<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
					</searche-Header-Wrapper>
				</div>
			</transition>
			<!-- 表格区 -->
			<div class="table-content">
				<el-table border :data="tableData" style="width: 100%;" height="700" :header-cell-style="tableHeaderColor" empty-text="暂无数据">
					<el-table-column label="变电站名称" width="300" align="center">
						<template slot-scope="scope">{{ scope.row.unitName || '--' }}</template>
					</el-table-column>
					<el-table-column label="环境属性" width="200" align="center">
						<template slot-scope="scope">{{ scope.row.typeName || '--' }}</template>
					</el-table-column>
					<el-table-column label="监测节点" align="center">
						<template slot-scope="scope">{{ scope.row.nodeName || '--' }}</template>
					</el-table-column>
					<el-table-column label="状态" width="200" align="center">
						<template slot-scope="scope">{{ scope.row.status || '--' }}</template>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<Button type="warning" icon="ios-create-outline" @click="addOrEditEnvConfig('edit', scope.row)">编辑</Button>
							<Button type="error" icon="md-trash" class="del" style="margin-left: 10px;" @click="del(scope.row)">删除</Button>
						</template>
					</el-table-column>
				</el-table>
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
		<!-- 模态框 -->
		<Modal v-model="showM" :title="modelTitle" width="800" footer-hide :styles="{ top: '20px' }">
			<div class="node-content">
				<el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="100px" class="demo-ruleForm">
					<el-form-item label="变电站名称">
						<el-input v-model="formValidate.unitName" class="ipt" disabled></el-input>
					</el-form-item>
					<el-form-item label="环境属性" prop="envAttr">
						<el-select v-model="formValidate.envAttr" class="ipt" placeholder="请选择环境属性" @change="selectEnvAttr" no-data-text="暂无数据">
							<el-option v-for="item in envAttrLists" v-model="item.dictID" :key="item.id" :label="item.vcName"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="formValidate.status" placeholder="请选择状态" class="ipt" @change="selectStatus" no-data-text="暂无数据">
							<el-option label="禁用" value="0"></el-option>
							<el-option label="启用" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<!-- <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="变电站名称" prop="unitName">
            <Input
              v-model="formValidate.unitName"
              placeholder="请输入变电站名称"
              style="width: 300px"
              disabled
            ></Input>
          </FormItem>
          <FormItem label="环境属性" prop="envAttr">
            <Select v-model="formValidate.envAttr" placeholder="请选择环境属性" style="width: 300px" @on-change="selectEnvAttr">
              <Option
                v-model="item.dictID"
                v-for="item in envAttrLists"
                :key="item.index"
              >{{item.vcName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status" placeholder="请选择状态" style="width: 100px" @on-change="selectStatus">
              <Option value="0">禁用</Option>
              <Option value="1">启用</Option>
            </Select>
          </FormItem>
				</Form>-->
				<div class="search-box">
					<span class="node-name">节点名称：</span>
					<el-input v-model="nodeName" class="ipt" @change="changeHandle(nodeName)"></el-input>
					<Button type="info" size="large" icon="md-search" style="margin-left: 20px;" @click="getNodeList">查询</Button>
				</div>
				<div class="list">
					<el-table
						:data="nodeList"
						border
						style="width: 100%;"
						height="500"
						:header-cell-style="tableHeaderColor"
						ref="multipleTable"
						empty-text="暂无数据"
					>
						<el-table-column label width="100" align="center">
							<template slot-scope="scope">
								<el-radio v-model="radio" :label="scope.row.nodeId" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
							</template>
						</el-table-column>
						<el-table-column label="设备类型" width="180" align="center">
							<template slot-scope="scope">{{ scope.row.devType || '--' }}</template>
						</el-table-column>
						<el-table-column label="设备名称" align="center" width="200">
							<template slot-scope="scope">{{ scope.row.devName || '--' }}</template>
						</el-table-column>
						<el-table-column label="节点名称" align="center">
							<template slot-scope="scope">{{ scope.row.devNodeName || '--' }}</template>
						</el-table-column>
					</el-table>
					<div class="table-page">
						<div class="page-content">
							<Page
								@on-change="handleChangeNodePage"
								@on-page-size-change="handleChangeNodePageSize"
								:total="nodeTotal"
								:current="nodePage"
								:page-size="nodePageSize"
								show-elevator
								show-total
								show-sizer
							/>
						</div>
					</div>
				</div>
				<div slot="footer" class="footer">
					<Button type="text" size="large" @click="closeModal">取消</Button>
					<Button type="primary" size="large" class="confirm" @click="saveInfo('formValidate')">确认</Button>
				</div>
				<!-- <div class="seatch-box">
          <el-radio-group v-model="radio" @change="handleNodeType">
            <el-radio v-model="radio" label="0">查询全部节点</el-radio>
            <el-radio v-model="radio" label="1">查询已配置节点</el-radio>
          </el-radio-group>
          <label for style="font-size: 14px;margin-left: 10px;">节点名称：</label>
          <el-input
            placeholder="输入节点名称搜索"
            style="width: 300px;"
            v-model="nodeName"
            @change="changeHandle(nodeName)"
          ></el-input>
          <Button
            type="info"
            size="large"
            icon="md-search"
            @click="getNodeList"
            style="margin-left: 10px;"
          >查询</Button>
				</div>-->
				<!-- <el-table
          ref="multipleTable"
          :data="nodeList"
          tooltip-effect="dark"
          style="width: 100%"
          @select="onTableSelect"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80" align="center">
            <template slot="header" slot-scope="scope"></template>
          </el-table-column>
          <el-table-column label="设备类型" width="120" align="center">
            <template slot-scope="scope">{{ scope.row.devType }}</template>
          </el-table-column>
          <el-table-column label="设备名称" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.devName }}</template>
          </el-table-column>
          <el-table-column label="节点名称" width="180" align="center">
            <template slot-scope="scope">{{ scope.row.devNodeName }}</template>
          </el-table-column>
          <el-table-column label="环境属性" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.nodeType"
                placeholder="请选择"
                :disabled="scope.row.disabled"
              >
                <el-option value="温度">温度</el-option>
                <el-option value="湿度">湿度</el-option>
                <el-option value="风速">风速</el-option>
              </select>
            </template>
          </el-table-column>
				</el-table>-->

				<!-- <div class="table-page">
          <div class="page-content">
            <Page
              @on-change="handleChangeNodePage"
              @on-page-size-change="handleChangeNodePageSize"
              :total="nodeTotal"
              :current="page"
              :page-size="pageSize"
              show-elevator
              show-total
              show-sizer
            />
          </div>
				</div>-->
			</div>
		</Modal>
	</div>
</template>
<script>
import { async } from 'q'
import mixinTolls from '@common/mixin/tools'
import TreeSelect from '_b/tree-select'
import { debuglog } from 'util'
import { setTimeout } from 'timers'
export default {
	name: 'env-config',
	mixins: [mixinTolls],
	components: {
		TreeSelect
	},
	props: {},
	data() {
		return {
			multipleSelectionAll: [], // 所有选中的数据包含跨页数据
			multipleSelection: [], // 当前页选中的数据
			idKey: 'nodeId', // 标识列表数据中每一行的唯一键的名称
			showM: false, // 控制模态框的显示与隐藏
			axios: this.$api.systemsManage.dataEnvManage,
			http: this.$api.stationsManage.distributionManage,
			// 树数据
			treeData: [],
			tableData: [], // 变电站列表
			nodeList: [], // 节点列表
			temperature: '', // 温度
			humidity: '', // 湿度
			windSpeed: '', // 风速
			tempQtoId: '',
			humQtoId: '',
			windSpeedQtoId: '',
			value: '',
			orgTitle: '',
			orgId: '',
			radio: '0',
			nodeType: 0,
			nodeName: '',
			isTree: true, // 判断有没有点击树
			pageFlag: false,
			page: 1,
			pageSize: 10,
			total: 0,
			nodePage: 1,
			nodePageSize: 10,
			nodeTotal: 0, // 节点总数
			unitId: '', // 变电站id
			// unitName: '',//变电站名字
			envAttrList: [],
			params: [],
			modelTitle: '',
			formValidate: {
				unitName: '500KV三汊湾变', // 变电站名称
				envAttr: '', // 环境属性
				status: '' // 状态
			},
			ruleValidate: {
				unitName: [{ required: true, message: '变电站名称不能为空', trigger: 'blur' }],
				envAttr: [{ required: true, message: '环境属性不能为空', trigger: 'change' }],
				status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
			},
			disabled: false,
			status: '',
			envAttrLists: [],
			radio: '',
			dictID: '',
			nodeId: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getStationTree()
		// this.findDic()
	},
	mounted() {},

	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getCurrentRow(val) {
			// console.log(val)
			this.nodeId = val.nodeId
		},

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
		// 获取组织树
		// async getStationTree() {
		//   let result = await this.http.getUnitTree({ iFlag: 2 })
		//   if (result.code == 200) {
		//     this._forEach(result.data, true, item => {
		//       item.expand = true
		//     })
		//     this.treeData = result.data
		//     // this.addFormData.orgId = result.data[0].id
		//     this.orgId = result.data[0].id
		//     this.getStationTable()
		//   }
		// },
		getStationTree() {
			this.http.getUnitTree({ iFlag: 2 }).then(res => {
				if (res.code == 200 && res.data) {
					let flgaNum = 1
					this._forEach(res.data, true, item => {
						item.expand = true
						if (item.flag == flgaNum) {
							item.selected = true
							this.orgId = item.id
							// this.unitName = item.title
							this.isTree = !!this.orgId
							this.step = 1
							flgaNum = 'a'
						}
					})
					this.treeData = res.data
					this.getStationTable()
					// if( this.orgId != '' ) {
					// 	if (this.tabsType == 0) {
					// 		this.getLnData()
					// 	} else if (this.tabsType == 1) {
					// 		this.getDhData()
					// 	} else {
					// 		this.getVideoData()
					// 	}
					// }
				}
			})
		},
		// 站点树点击事件
		handleStationTree(data) {
			// console.log(data, '11')
			this.orgTitle = data[0].title
			// this.addFormData.orgId = data[0].id
			this.orgId = data[0].id
			this.formValidate.unitName = data[0].text
			this.isTree = false
			this.status = ''
			this.getStationTable()
		},
		selectStatus(val) {
			this.status = val
		},
		// 查询
		searchStation() {
			// if (this.searchData.vcName == '' && this.searchData.iVoltageLevelId == 'all') {
			//   this.pageFlag = false
			// } else {
			//   this.pageFlag = true
			// }
			// console.log(this.searchData.vcName, 'vc')
			this.getStationTable()
		},
		// 重置查询
		handleResetData() {
			this.status = ''
			this.getStationTable()
		},
		// 获取变电站列表数据
		getStationTable() {
			this.axios
				.getList({
					unitId: this.orgId,
					// orgId: '5590fe39849940a5aadff8105f7ed1d5',
					// unitName: this.searchData.vcName,
					iIsEnable: this.status,
					currentPage: this.page,
					pageSize: this.pageSize
				})
				.then(res => {
					// console.log(res.data, 'd')
					let data = res.data.data.lists
					this.tableData = data
					this.total = res.data.data.page.totalNum
					this.tableData.map(item => {
						if (item.iIsEnable == 0) {
							item.status = '禁用'
						} else if (item.iIsEnable == 1) {
							item.status = '启用'
						}
					})
				})
				.catch(err => {
					console.log(err)
				})
		},
		// 获取环境属性列表
		getEnvAttr() {
			this.axios
				.getEnvAttr({
					dictGroupID: '7020'
				})
				.then(res => {
					if (res.code == 200) {
						this.envAttrLists = res.data
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		// 选择环境属性
		selectEnvAttr(val) {
			this.dictID = val
		},
		// 点击新增或者编辑按钮
		addOrEditEnvConfig(type, row) {
			this.$refs.formValidate.resetFields()
			this.radio = ''
			this.showM = true
			this.getEnvAttr()
			this.nodeName = ''
			if (type == 'add') {
				this.modelTitle = '新增'
				this.formValidate.envAttr = ''
				this.formValidate.status = ''
				this.nodeId = ''
				this.getNodeList()
			} else if (type == 'edit') {
				this.modelTitle = '编辑'
				this.getNodeList()
				// 获取详情
				this.axios
					.getDetailEnvConfig({
						id: row.id
					})
					.then(res => {
						if (res.code == 200) {
							// console.log(res.data);
							this.radio = res.data.nodeId
							this.formValidate.status = res.data.iIsEnable.toString()
							this.formValidate.envAttr = res.data.nodeTypeName
							this.unitId = res.data.unitId
							this.status = res.data.iIsEnable.toString()
							this.dictID = res.data.iType
							this.nodeId = res.data.nodeId

							// for(let i = 0 ; i < this.tableData.length ; i++){
							//   if(this.tableData[i].nodeId == res.data.nodeId){
							//     console.log(this.tableData[i])
							//     console.log(i,'i')
							//     this.radio = this.tableData.indexOf(this.tableData[i]);
							//     console.log(this.radio)
							//   }
							// }
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		// 保存环境配置
		saveInfo(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					if (this.modelTitle == '新增') {
						if (this.nodeId == '') {
							this.$Message.warning({
								content: '请选择节点',
								duration: 1.5
							})
							return
						}
						this.axios
							.addEnvConfig({
								unitId: this.orgId,
								nodeId: this.nodeId,
								nodeType: this.dictID,
								iIsEnable: this.status
							})
							.then(res => {
								console.log(this.radio)
								if (res.code == 200) {
									this.$Message.success('添加成功')
									this.showM = false
									this.status = ''
									this.getStationTable()
								}
							})
							.catch(err => {
								console.log(err)
							})
					} else if (this.modelTitle == '编辑') {
						this.axios
							.editEnvConfig({
								unitId: this.unitId,
								iType: this.dictID,
								iIsEnable: this.status,
								nodeId: this.nodeId
							})
							.then(res => {
								// console.log(res);
								if (res.code == 200) {
									this.$Message.success('修改成功')
									this.showM = false
									this.status = ''
									this.getStationTable()
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
				} else {
					this.$Message.warning('有必填项未填，请填写完整!')
				}
			})
		},
		// 删除
		del(row) {
			this.$Modal.confirm({
				title: '确认',
				content: `<p>确认删除?</p>`,
				onOk: () => {
					this.axios
						.delEnvConfig({
							id: row.id
						})
						.then(res => {
							console.log(res)
							if (res.code == 200) {
								this.$Message.success('删除成功')
								this.getStationTable()
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			})
		},
		// 获取节点列表
		getNodeList() {
			if (this.modelTitle == '新增') {
				this.axios
					.getNodeList({
						unitId: this.orgId,
						// unitId: '8177a787a28b4f86a103fac9a023db05',
						devNodeName: this.nodeName,
						currentPage: this.nodePage,
						pageSize: this.nodePageSize
					})
					.then(res => {
						// console.log(res.data, 'node')
						var data = res.data.data
						this.nodeList = data.lists
						// console.log(this.nodeList,'node')
						// for (let i = 0, len = ctx.nodeList.length; i < len; i++) {
						//   if (ctx.nodeList[i].nodeType == null) {
						//     ctx.nodeList[i].disabled = true
						//   } else {
						//     ctx.nodeList[i].disabled = false
						//     setTimeout(() => {
						//       ctx.$refs.multipleTable.toggleRowSelection(ctx.nodeList[i], true)
						//     }, 0)
						//     // ctx.envAttrList.push(ctx.nodeList[i])
						//   }
						//   if (ctx.nodeList[i].nodeType == 1) {
						//     ctx.nodeList[i].nodeType = '温度'
						//   } else if (ctx.nodeList[i].nodeType == 2) {
						//     ctx.nodeList[i].nodeType = '湿度'
						//   } else if (ctx.nodeList[i].nodeType == 3) {
						//     ctx.nodeList[i].nodeType = '风速'
						//   }
						// }
						// console.log(ctx.envAttrList, 'envlist')
						this.nodeTotal = data.page.totalNum
						// console.log(ctx.nodeList, 'node')
						setTimeout(() => {
							this.setSelectRow()
						}, 20)
					})
					.catch(err => {
						console.log(err)
					})
			} else if (this.modelTitle == '编辑') {
				this.axios
					.getUpdateNodeList({
						unitId: this.orgId,
						// unitId: '8177a787a28b4f86a103fac9a023db05',
						devNodeName: this.nodeName,
						currentPage: this.nodePage,
						pageSize: this.nodePageSize
					})
					.then(res => {
						this.nodeList = res.data.data.lists
						this.nodeTotal = res.data.data.page.totalNum
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		// 获取节点名称
		changeHandle(val) {
			// console.log(val)
			this.nodeName = val
		},
		// 关闭模态框
		closeModal() {
			this.showM = false
			this.status = ''
		},
		// 获取节点类型
		handleNodeType(val) {
			// console.log(val)
			this.nodeType = val
			this.getNodeList()
		},
		// 默认选中
		onTableSelect(rows, row) {
			console.log(rows, 'rows')
			console.log(row, 'row')
			let selected = rows.length && rows.indexOf(row) !== -1
			if (selected == true) {
				row.disabled = false
			} else if (selected == false) {
				row.disabled = true
			}
			// console.log(selected, 'selected')  // true就是选中，0或者false是取消选中
		},

		// 当选择项发生变化时
		// handleSelectionChange(val) {
		// var ctx = this;
		// console.log(ctx.envAttrList, 'cc')
		// for (var j = 0, len = ctx.envAttrList.length; j < len; j++) {
		//   if (ctx.envAttrList[j].nodeType == '温度') {
		//     ctx.tempQtoId = ctx.envAttrList[j].qtoId
		//   } else if (ctx.envAttrList[j].nodeType == '湿度') {
		//     ctx.humQtoId = ctx.envAttrList[j].qtoId
		//   } else if (ctx.envAttrList[j].nodeType == '风速') {
		//     ctx.windSpeedQtoId = ctx.envAttrList[j].qtoId
		//   }
		// }
		// console.log(ctx.windSpeedQtoId, ctx.humQtoId, ctx.tempQtoId, 'wr')
		// for (let i = 0, len = val.length; i < len; i++) {
		//   if (val[i].nodeType == '温度') {
		//     val[i].qtoId = ctx.tempQtoId
		//   } else if (val[i].nodeType == '湿度') {
		//     val[i].qtoId = ctx.humQtoId
		//   } else if (val[i].nodeType == '风速') {
		//     val[i].qtoId = ctx.windSpeedQtoId
		//   }
		// }
		// console.log(val, 'sel')
		// ctx.multipleSelection = val;
		// ctx.params = val;
		// },

		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.getStationTable()
		},
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getStationTable()
		},
		// 节点列表分页
		handleChangeNodePage(page) {
			// console.log(page)
			this.nodePage = page
			this.getNodeList()
			this.changePageCoreRecordData()
		},
		// 节点列表分页条数
		handleChangeNodePageSize(pageSize) {
			// console.log(pageSize)
			this.nodePageSize = pageSize
			this.changePageCoreRecordData()
			this.getNodeList()
		},
		// 设置选中的方法
		setSelectRow() {
			if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
				return
			}
			// 标识当前行的唯一键的名称
			let idKey = this.idKey
			let selectAllIds = []
			let that = this
			this.multipleSelectionAll.forEach(row => {
				selectAllIds.push(row[idKey])
			})
			this.$refs.multipleTable.clearSelection()
			for (var i = 0; i < this.nodeList.length; i++) {
				if (selectAllIds.indexOf(this.nodeList[i][idKey]) >= 0) {
					// 设置选中，记住table组件需要使用ref="table"
					this.$refs.multipleTable.toggleRowSelection(this.nodeList[i], true)
				}
			}
		},
		// 记忆选择核心方法
		changePageCoreRecordData() {
			// 标识当前行的唯一键的名称
			let idKey = this.idKey
			let that = this
			// 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
			if (this.multipleSelectionAll.length <= 0) {
				this.multipleSelectionAll = this.multipleSelection
				return
			}
			// 总选择里面的key集合
			let selectAllIds = []
			this.multipleSelectionAll.forEach(row => {
				selectAllIds.push(row[idKey])
			})
			let selectIds = []
			// 获取当前页选中的id
			this.multipleSelection.forEach(row => {
				selectIds.push(row[idKey])
				// 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
				if (selectAllIds.indexOf(row[idKey]) < 0) {
					that.multipleSelectionAll.push(row)
				}
			})
			let noSelectIds = []
			// 得到当前页没有选中的id
			this.nodeList.forEach(row => {
				if (selectIds.indexOf(row[idKey]) < 0) {
					noSelectIds.push(row[idKey])
				}
			})
			noSelectIds.forEach(id => {
				if (selectAllIds.indexOf(id) >= 0) {
					for (let i = 0; i < that.multipleSelectionAll.length; i++) {
						if (that.multipleSelectionAll[i][idKey] == id) {
							// 如果总选择中有未被选中的，那么就删除这条
							that.multipleSelectionAll.splice(i, 1)
							break
						}
					}
				}
			})
		},
		// 得到选中的所有数据
		getAllSelectionData() {
			// 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
			this.changePageCoreRecordData()
			// console.log(this.multipleSelectionAll,'all')
			this.params = this.multipleSelectionAll
		},
		// 修改table header的背景色
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'color: #515a6e;background: #f8f8f9;'
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
.env-config {
  width: 100%;
  height: calc(100vh - 160px);

  .left-tree {
    width: 230px;
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
      height: 650px;

      // .ivu-table-wrapper {
      //   width: 100%;
      //   position: absolute;
      //   top: 0;
      //   height: calc(100% - 30px) !important;
      // }

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
        margin-top:15px;
        bottom: -15px;

        .page-content {
          width: 800px;
          margin-left: 50%;
          transform: translateX(-35%);
        }
      }

      /deep/.el-table__empty-block {
        // height: 650px;
      }
    }

    .status {
      font-size: 14px;
      line-height: 38px;
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

    // /deep/.el-table thead{
    // color: #
    // }
    .ivu-spin-fix {
      z-index: 999;

      /deep/.ivu-spin-text {
        font-size: 22px;

        /deep/i {
          font-size: 30px !important;
        }
      }
    }

    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }

      50% {
        transform: rotate(180deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .demo-spin-col {
      height: 100px;
      position: relative;
      border: 1px solid #eee;
    }
  }
}

.axis-form-item {
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

  /deep/.ivu-form-item-content {
    display: flex;

    .ivu-input-wrapper {
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
}

/deep/.ivu-radio-wrapper {
  font-size: 14px !important;
}

.node-content {
  height: 800px;

  .ipt{
    width: 200px;
  }

  .search-box {
    height: 30px;
    font-size: 16px;
    line-height: 30px;

    .node-name {
      display: inline-block;
      font-size: 14px;
      line-height: 30px;
      margin: 0 2px 0 26px;
    }
  }

  .table-page {
    margin-top: 10px;
  }

  /deep/.ivu-page-total {
    margin-left: 40px;
  }

  .list {
    margin-top: 20px;
  }

  .footer {
    width: 200px;
    margin-left: 610px;

    .confirm {
      margin-left: 10px;
    }
  }
}

/deep/.el-table__empty-block {
  // height: 450px;
}

/deep/.el-input__inner {
  height: 38px;
}

/deep/.el-table tr:nth-of-type(1) th .cell .el-checkbox .el-checkbox__input {
  display: none;
}

/deep/ .el-table {
	height: calc(100vh - 270px)!important;
}
</style>
