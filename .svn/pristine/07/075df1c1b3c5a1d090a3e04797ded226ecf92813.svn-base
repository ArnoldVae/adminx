<template>
	<div class="business-tree" ref="business-tree">
		<div class="org-tree-wrapper">
			<!-- {{currentNodeId}} {{currentNodeName}} -->
			<div v-loading="orgTreeDataLoading">
				<search-tree ref="bus-org-search-tree" :data="orgTreeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
					<Icon type="ios-search" slot="suffix" />
				</search-tree>
			</div>
		</div>
		<div class="org-tree-wrapper">
			<div v-loading="busTreeLoading">
				<search-tree
					id="bus-search-tree"
					:load-data="loadData"
					ref="bus-bus-search-tree"
					:data="busTreeData"
					@on-select-change="handleBusTree"
					placeholder="输入关键词搜索..."
					:render="renderContent"
				>
					<Icon type="ios-search" slot="suffix" />
				</search-tree>
			</div>
		</div>
		<div class="table-wrapper">
			<!-- 头 -->
			<searche-header-wrapper>
				<com-button type="add" size="large" style="margin-right: 20px;" @click="handleAddBusTree('add')" :disabled="!isStation">新增</com-button>

				<com-button
					type="confirm"
					style="margin-right: 20px;"
					icon="ios-cloud-download-outline"
					size="large"
					@click="handleAddBusTree('import')"
					:disabled="!isStation"
					>导入设备</com-button
				>
				<!-- <com-button type="add" size="large" icon="md-sync" style="margin-right: 20px;" @click="refreshJson" :disabled="!isStation">刷新JSON文件</com-button> -->

				<com-button type="confirm" icon="ios-document-outline" size="large" @click="handleMergeNode" :disabled="!isStation" v-if="!isArea"
					>合并节点</com-button
				>

				<com-button v-if="false" type="delete" size="large" @click="handleBatchRemove">多选删除</com-button>
			</searche-header-wrapper>
			<!-- 表格 -->
			<div class="business-tree-main" v-loading="tableLoading">
				<div v-if="tableReset">
					<!-- <element-table
						v-show="false"
						ref="bus-tree-table"
						:columns="columns"
						:data="tableData"
						border
						row-key="bindId"
						default-expand-all
						highlight-current-row
						@on-edit="handlerEditRow"
						@on-delete="handlerDeleteRow"
						@current-change="handleTableRowChange"
						@row-click="row => handleTableRowClick('bus-tree-table', row)"
						:row-class-name="setRowClassName"
					></element-table> -->

					<el-table
						@row-dblclick="handleEditTreeNodeRow"
						empty-text="暂无数据"
						@selection-change="handleSelChange"
						height="500"
						v-if="isArea"
						:data="elTableData"
						border
						style="width: 100%"
					>
						<!-- <el-table-column
					      width="55"
					      type="selection"
					      align="center">
					    </el-table-column> -->
						<el-table-column label="名称" align="center">
							<template slot-scope="scope">
								<Input type="text" v-model="vcNameEdit" v-if="treeNodeEditIndex == scope.$index" />
								<span v-else>{{ scope.row.vcName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="绑定类型" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.iBindType == 1">区域</span>
								<span v-if="scope.row.iBindType == 2">设备</span>
								<span v-if="scope.row.iBindType == 3">相位</span>
							</template>
						</el-table-column>
						<el-table-column prop="vcCode" label="编码" align="center"></el-table-column>
						<el-table-column fixed="right" label="操作" align="center">
							<template slot-scope="scope">
								<div v-if="treeNodeEditIndex == scope.$index">
									<el-button type="primary" size="small" @click="handleSaveTreeNodeRow(scope.$index, scope.row)">保存</el-button>
									<el-button type="primary" size="small" @click="handleCancelTreeNodeRow(scope.$index, scope.row)">取消</el-button>
								</div>
								<div v-else>
									<el-button v-if="scope.row.iBindType != 3" type="text" @click="handleEdit(scope.row)">编辑</el-button>
									<el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>

					<el-table
						@row-dblclick="handleEditDevNodeRow"
						empty-text="暂无数据"
						@selection-change="handleSelChange"
						height="500"
						v-if="!isArea"
						:data="elTableData"
						border
						style="width: 100%"
					>
						<!-- <el-table-column
					      width="55"
					      type="selection"
					      align="center">
					    </el-table-column> -->
						<el-table-column align="center" type="selection" width="55"> </el-table-column>
						<el-table-column label="节点名称" align="center" width="150">
							<template slot-scope="scope">
								<Input type="text" v-model="nodeNameEdit" v-if="devNodeEditIndex == scope.$index" />
								<span v-else>{{ scope.row.vcName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="数据来源" align="center" width="150">
							<template slot-scope="scope">
								<!-- <span>{{ scope.row.sourceName }} {{ scope.row.source }}</span> -->
								<span>{{ getSourceTypeLabel(scope.row.exSourceTypeList) }} </span>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="sourceName" label="数据来源" align="center" width="80"> </el-table-column> -->
						<!-- <el-table-column prop="source" label="来源" align="center" width="100"> </el-table-column> -->
						<el-table-column label="节点类型" align="center" width="100">
							<template slot-scope="scope">
								<div v-if="devNodeEditIndex == scope.$index">
									<Select
										label-in-value
										@on-change="handleEditCommon(scope.$index, $event, 'nodeType')"
										v-model="nodeTypeEdit"
										placeholder="选择节点类型"
										clearable
									>
										<Option v-for="item in nodeTypeList" :value="item.id" :key="item.id" :label="item.value" />
									</Select>
								</div>
								<span v-else>
									<span v-if="scope.row.nodeType == 1">遥测</span>
									<span v-if="scope.row.nodeType == 2">遥信</span>
									<span v-if="scope.row.nodeType == 3">遥控</span>
									<span v-if="scope.row.nodeType == 4">遥调</span>
								</span>
							</template>
						</el-table-column>
						<!-- ### -->
						<el-table-column label="值描述" align="center" width="100">
							<template slot-scope="scope">
								<Input type="text" v-model="vcValueDescEdit" v-if="devNodeEditIndex == scope.$index" />
								<span v-else>{{ scope.row.vcValueDesc }}</span>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="vcUnit" label="值单位" align="center"></el-table-column> -->
						<el-table-column label="识别类型" align="center" width="120"
							>\
							<!-- @on-change="handleEditIdentify(index, $event)" -->
							<template slot-scope="scope">
								<Select
									label-in-value
									@on-change="handleEditCommon(scope.$index, $event, 'irecogtype')"
									v-if="devNodeEditIndex === scope.$index"
									v-model="irecogtypeEdit"
									placeholder="选择识别类型"
									clearable
								>
									<Option v-for="item in identifyList" :value="item.dictID" :key="item.dictID" :label="item.vcName" />
								</Select>
								<span v-else>{{ scope.row.irecogtypeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="表计类型" align="center" width="120">
							<template slot-scope="scope">
								<Select
									label-in-value
									@on-change="handleEditCommon(scope.$index, $event, 'imetertype')"
									v-if="devNodeEditIndex === scope.$index"
									v-model="imetertypeEdit"
									placeholder="选择表计类型"
									clearable
								>
									<Option v-for="item in imetertypeList" :value="item.dictID" :key="item.dictID" :label="item.vcName" />
								</Select>
								<span v-else>{{ scope.row.imetertypeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="发热类型" align="center" width="120">
							<template slot-scope="scope">
								<Select
									label-in-value
									@on-change="handleEditCommon(scope.$index, $event, 'ifevertype')"
									v-if="devNodeEditIndex === scope.$index"
									v-model="ifevertypeEdit"
									placeholder="选择发热类型"
									clearable
								>
									<Option v-for="item in ifevertypeList" :value="item.dictID" :key="item.dictID" :label="item.vcName" />
								</Select>
								<span v-else>{{ scope.row.ifevertypeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="外观识别类型" align="center" width="120">
							<template slot-scope="scope">
								<Select
									label-in-value
									@on-change="handleEditCommon(scope.$index, $event, 'isurfacetype')"
									v-if="devNodeEditIndex === scope.$index"
									v-model="isurfacetypeEdit"
									placeholder="选择外观识别类型"
									clearable
								>
									<Option v-for="item in isurfacetypeList" :value="item.dictID" :key="item.dictID" :label="item.vcName" />
								</Select>
								<span v-else>{{ scope.row.isurfacetypeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="状态识别类型" align="center" width="120">
							<template slot-scope="scope">
								<Select
									label-in-value
									@on-change="handleEditCommon(scope.$index, $event, 'istatustype')"
									v-if="devNodeEditIndex === scope.$index"
									v-model="istatustypeEdit"
									placeholder="选择状态识别类型"
									clearable
								>
									<Option v-for="item in istatustypeList" :value="item.dictID" :key="item.dictID" :label="item.vcName" />
								</Select>
								<span v-else>{{ scope.row.istatustypeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="相位类型" align="center" width="120">
							<template slot-scope="scope">
								<Select
									label-in-value
									@on-change="handleEditCommon(scope.$index, $event, 'iphasetype')"
									v-if="devNodeEditIndex === scope.$index"
									v-model="iphasetypeEdit"
									placeholder="选择相位类型"
									clearable
								>
									<Option v-for="item in iphasetypeList" :value="item.value" :key="item.value" :label="item.label" />
								</Select>
								<span v-else>{{ scope.row.iphasetypeName }}</span>
							</template>
						</el-table-column>

						<el-table-column label="操作" align="center" fixed="right" width="150">
							<template slot-scope="scope">
								<div v-if="devNodeEditIndex == scope.$index">
									<el-button type="primary" size="small" @click="handleSaveDevNodeRow(scope.$index, scope.row)">保存</el-button>
									<el-button type="primary" size="small" @click="handleCancelDevNodeRow(scope.$index, scope.row)">取消</el-button>
								</div>
								<div v-else>
									<el-button v-if="scope.row.iBindType != 3" type="text" @click="handleEdit(scope.row)">编辑</el-button>
									<el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>

					<div class="page-wrap">
						<Page
							@on-change="handleChangePage"
							@on-page-size-change="handleChangeSize"
							:total="total"
							:current="currentPage"
							:page-size="pageSize"
							show-sizer
							show-elevator
							show-total
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- 弹框 -->
		<Modal v-model="busModal.show" :title="busModal.title" :mask-closable="false" :width="modalWidth">
			<!-- 模态框 自定义 步骤条 -->
			<div slot="header">
				<Steps :current="stepsConfig.current" v-if="busModal.type != 'edit-bus-tree'">
					<Step v-for="item in stepsConfig.list" :key="item.title" :title="item.title" :content="item.content"></Step>
				</Steps>

				<p v-else>{{ busModal.title }}</p>
			</div>

			<!-- 表单组件 @@ -->
			<div v-show="busModal.type == 'add-bus-tree'">
				<com-form :ref="formName" v-model="busInfoForm" :items="busInfoFormItems">
					<template #test>
						<p style="font-size: 0.63222rem; margin-top: 0.05rem;">室内1000，室外2000</p>
					</template>
					<treeSelect @on-select-change="handleClickSTree" :options="busTreeData" :load-data="loadData" slot="tree-select-new"></treeSelect>
				</com-form>
			</div>

			<!-- 添加 区域表单 组件 -->
			<div v-show="busModal.type == 'add-area'">
				<add-area-form
					:dataObj="currentStation ? { name: currentStation.title, id: currentStation.id } : {}"
					:modalShow="busModal.show"
					:isSubmit="saveArea"
					:isCodeShow="addCodeShow"
					:dataProps="busInfoForm"
					@update-save="handleSaveArea"
				></add-area-form>
			</div>

			<!-- 添加 相位 表单 -->
			<div v-show="busModal.type == 'add-phase-position'">
				<com-form ref="phase-position-form" v-model="busInfoForm" :items="phasePositionFormItems"></com-form>
			</div>

			<!-- 添加设备 -->
			<div class="add-dev-wrapper" v-show="busModal.type == 'add-dev'">
				<!-- <h1>添加设备</h1> -->
				<add-dev-comp-b @add-dev-update="addDevUpdate" @handleBack="handleCancel"></add-dev-comp-b>
			</div>

			<!-- 导入 区域 || 设备 -->
			<div class="import-tree-wrapper" v-show="busModal.type == 'import-dev'">
				<div class="subs-tree-wrapper">
					<div>
						<search-tree ref="search-tree" :data="devTreeData" placeholder="输入关键词搜索..." @on-select-change="handleDSubs">
							<Icon type="ios-search" slot="suffix" />
						</search-tree>
					</div>
				</div>

				<div class="dev-list-wrapper" v-loading="devListLoading">
					<searche-header-wrapper>
						<form-item title="设备名称" type="text" v-model="devListParams.vcName" placeholder="输入场景名称搜索" :clearable="true" noMBottom>
						</form-item>

						<com-button type="search" @click="devListLoad"></com-button>
					</searche-header-wrapper>

					<div class="dev-list">
						<el-tree
							ref="import-tree"
							node-key="id"
							:data="devListData"
							:props="{ label: 'vcName' }"
							empty-text="暂无数据"
							check-strictly
							check-on-click-node
							show-checkbox
						></el-tree>
					</div>
				</div>
			</div>

			<!-- 修改业务树 -->
			<div v-show="busModal.type == 'edit-bus-tree'">
				<com-form ref="phase-position-form" v-model="busInfoForm" :items="editBusTreeFormItems"></com-form>
			</div>

			<!-- 底部 按钮 -->
			<div slot="footer">
				<com-button type="cancel" @click="busModal.set(false)"></com-button>

				<com-button type="confirm" v-if="!isAreaOrDev && busModal.type != 'edit-bus-tree'" @click="prevStep">上一步</com-button>

				<com-button v-if="!isAreaOrDev" type="confirm" @click="handlerModalConfirm(busModal.type)">确定</com-button>

				<com-button type="confirm" v-if="isAreaOrDev && busModal.type != 'edit-bus-tree'" @click="nextStep(busModal.type)">下一步</com-button>
			</div>
		</Modal>

		<!-- 设备 编辑界面 fullscreen-->
		<Modal :closable="false" class="editAndAddModal" v-model="editAndAddModal" footer-hide :mask-closable="false" :mask="false" :transfer="false">
			<div slot="header"></div>
			<div>
				<Icon @click="handleCancel" type="md-close" class="close" />
				<add-dev-comp-c @handleBack="handleCancelModal"></add-dev-comp-c>
			</div>
			<div slot="footer"></div>
		</Modal>

		<!-- 区域 相位编辑 -->
		<Modal
			@on-ok="addAndEditModalOk"
			@on-cancel="addAndEditModalCancel"
			class="addAndEditModal"
			v-model="addAndEditModal"
			title="编辑"
			:mask-closable="false"
			width="600"
		>
			<Form :rules="modalInfoRule" ref="modalInfo" :model="modalInfo" :label-width="90">
				<FormItem label="主类型" prop="main">
					<RadioGroup v-model="modalInfo.main">
						<Radio v-for="item in mainList" :label="item.dictID + ''" :key="item.dictID + ''">
							{{ item.vcName }}
						</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="子类型" prop="sub">
					<RadioGroup v-model="modalInfo.sub">
						<Radio v-for="item in subList" :label="item.dictID + ''" :key="item.dictID + ''">
							{{ item.vcName }}
						</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="区域" prop="area">
					<Input v-model="modalInfo.area" placeholder="输入区域信息"></Input>
				</FormItem>
				<FormItem label="平面图url" prop="p2d">
					<Input v-model="modalInfo.p2d" placeholder="输入平面图url"></Input>
				</FormItem>
				<FormItem label="3D模型url" prop="p3d">
					<Input v-model="modalInfo.p3d" placeholder="输入3D模型url"></Input>
				</FormItem>
				<FormItem label="排序" prop="sort">
					<Input type="text" v-model="modalInfo.sort" placeholder="输入排序数值"></Input>
				</FormItem>
				<FormItem label="状态" prop="enable" class="enable">
					<RadioGroup v-model="modalInfo.enable">
						<Radio v-for="item in modalInfoEnableList" :label="item.value + ''" :key="item.value + ''">
							{{ item.label }}
						</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="备注" prop="remark">
					<Input type="textarea" v-model="modalInfo.remark" placeholder="输入字典组备注" :autosize="{ minRows: 2, maxRows: 5 }" clearable></Input>
				</FormItem>
			</Form>

			<div slot="footer">
				<Button type="text" size="large" @click="addAndEditModalCancel">取消</Button>
				<Button type="primary" size="large" @click="addAndEditModalOk">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { ModalConfig } from '@/libs/construction'
import elementTable from '_b/element-table'
import mixinTolls from '@common/mixin/tools'
import { findComponentUpward, findComponentDownward } from '@/libs/assist'

import treeSelect from '@/components/scattered/business/tree-select'

import addAreaForm from '../area-manage/sub-area' // 添加区域的表单组件
import addDevCompB from './add-clone-b/add-ac-and-edit.vue' // 添加设备的组件
import addDevCompC from './edit-clone-c/add-ac-and-edit.vue' // 编辑设备的组件
import { close } from 'fs'

export default {
	name: 'business-tree',
	mixins: [mixinTolls],
	components: {
		elementTable,
		addAreaForm,
		addDevCompB,
		addDevCompC,
		treeSelect
	},
	props: {},
	data() {
		// render 模块名称 + 图标
		const renderIconName = (h, params) => {
			let row = params.row

			if (row.iBindType == 1) {
				return h('span', [
					h('i', {
						class: {
							'el-icon-folder-opened': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.vcName)
				])
			} else if (row.iBindType == 2) {
				return h('span', [
					h('i', {
						class: {
							'el-icon-collection-tag': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.vcName)
				])
			} else if (row.iBindType == 3) {
				return h('span', [
					h('i', {
						class: {
							'el-icon-notebook-2': true
						},
						style: {
							margin: '0 5px 0',
							display: 'inline-block',
							fontSize: '16px',
							color: '#ff9900'
						}
					}),
					h('span', row.vcName)
				])
			}
		}

		return {
			multipleSelection: [],
			keep: false,
			currentMenu: null,
			isMenu: false,
			buttonProps: {
				type: 'default',
				size: 'small'
			},
			orgTreeDataLoading: false,
			// 树节点双击编辑相关
			treeNodeEditIndex: -1,
			vcNameEdit: '',
			// 设备节点双击编辑相关
			devNodeEditIndex: -1,
			nodeNameEdit: '',
			nodeTypeList: [
				{
					id: 1,
					value: '遥测'
				},
				{
					id: 2,
					value: '遥信'
				},
				{
					id: 3,
					value: '遥控'
				},
				{
					id: 4,
					value: '遥调'
				}
			],
			nodeTypeEdit: '',
			irecogtypeEdit: '',
			imetertypeEdit: '',
			ifevertypeEdit: '',
			isurfacetypeEdit: '',
			istatustypeEdit: '',
			iphasetypeEdit: '',

			tableReset: true,
			// ##
			modalInfoEnableList: [
				{
					value: 1,
					label: '启用'
				},
				{
					value: 0,
					label: '禁用'
				}
			],
			modalInfo: {
				p2d: '',
				p3d: '',
				main: null,
				sub: null,
				area: null,
				enable: null,
				sort: null,
				remark: null,
				sub: null,

				number: null,
				name: null,
				groupName: null,
				identification: null
			},
			modalInfoRule: {
				// number: [{ pattern:/^[0-9]\d*$/, message: '请正确输入数字编号', trigger: 'change' }],
				area: [{ type: 'string', required: true, message: '请输入区域信息', trigger: 'blur' }]
				// identification: [{ validator: validateIdent, trigger: 'blur' }]
				// identification: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入标识数字', trigger: 'change' }],
				// sort: [{ pattern: /^[0-9]\d{0,3}$/, message: '请正确输入排序数字', trigger: 'change' }]
			},
			mainList: [],
			subList: [],
			addAndEditModal: false,
			// 编辑智辅与新增相关
			editAndAddModal: false,
			total: 0,
			currentPage: 1,
			pageSize: 20,
			http: this.$api.businessTree,
			areaHttp: this.$api.areaManage,
			enums: null,

			busModal: new ModalConfig(),
			// 左侧树 数据
			orgTreeData: [],

			// 导入 or 新建
			filterText: '',
			saveArea: false,

			devTreeData: [],
			devListData: [],
			devListParams: {
				vcName: ''
			},

			stepsConfig: {
				current: 0,
				list: []
			},

			// 添加 || 修改 组织
			formName: Symbol('org-info-form'),
			busInfoForm: {
				treeId: '',
				vcName: '',
				parentId: '0',
				unitId: '',
				iBindType: '',
				bindId: '',
				vcCode: ''
			},
			addCodeShow: false,
			busInfoFormItems: [
				{
					label: '父节点',
					prop: 'parentId',
					slot: 'tree-select-new',
					// type: 'tree-select',
					options: [],
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				},
				{
					label: '类型',
					prop: 'iBindType',
					type: 'radio',
					options: [],
					setings: { value: 'id', label: 'value' },
					rules: [{ required: true, message: '请选择必要的类型', trigger: 'change' }],
					disabled: false
				},
				{
					label: '编码',
					prop: 'vcCode',
					type: 'text',
					options: [],
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				},
				{
					label: '示例',
					slot: 'test'
				}
			],
			// 添加相位的 表单数据
			phasePositionFormItems: [
				{
					label: '名称',
					prop: 'vcName',
					type: 'radio',
					options: [],
					rules: [{ required: true, message: '请选择必要的名称', trigger: 'change' }]
				}
			],

			// 修改 业务树的表单
			editBusTreeFormItems: [
				{
					label: '名称',
					prop: 'vcName',
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				},
				{
					label: '父节点',
					prop: 'parentId',
					type: 'tree-select',
					options: [],
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }],
					disabled: true
				},
				// {
				// 	label: '编码',
				// 	prop: 'vcCode',
				// 	type: 'text',
				// 	options: [],
				// 	rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				// },
				{
					label: '类型',
					prop: 'iBindType',
					type: 'radio',
					options: [],
					setings: { value: 'id', label: 'value' },
					rules: [{ required: true, message: '请选择必要的类型', trigger: 'change' }],
					disabled: true
				}
			],

			// 表格
			columns: [
				{ label: '名称', prop: 'vcName', align: 'left', render: renderIconName },
				{ label: '绑定类型', prop: 'iBindTypeHtml' },
				{ label: '编码', prop: 'vcCode' },
				// { label: '备注', prop: 'vcMemo' },
				{ label: '操作', prop: 'action', width: 220, editShow: true, deleteShow: true }
			],
			tableData: [],
			addFlag: true,

			// 当前活动的数据
			currentStation: null, // 活动的 站点
			currentArea: null, // 活动的区域
			currentRow: null, // 表格活动行
			currentParentType: '', // 活动的上一步的类型
			currentSubSystem: null, // 活动的子系统
			currentType: null,
			prevHaveDataTreeNode: null,

			// 7.31更新
			busTreeData: [],
			busTreeData2: [],
			areaId: '',
			positionId: '',
			equId: '',
			nodeTreeId: '',
			elTableData: [],
			isArea: true,
			identifyList: [],
			imetertypeList: [],
			ifevertypeList: [],
			isurfacetypeList: [],
			istatustypeList: [],
			iphasetypeList: [],
			busTreeLoading: false,
			nextTreeData: [],
			iphasetypeList: [
				{
					value: 1,
					label: 'A相'
				},
				{
					value: 2,
					label: 'B相'
				},
				{
					value: 3,
					label: 'C相'
				}
			],
			devListLoading: false,
			tableLoading: false,
			currentNodeId: '',
			currentNodeName: '',
			// 数组来源
			sourceTypeList: []
		}
	},
	computed: {
		isAreaOrDev() {
			let modalType = this.busModal.type
			if (modalType == 'add-bus-tree') return true
			else return false
		},
		isStation() {
			if (this.currentStation) return true
			else return false
		},
		modalWidth() {
			let type = this.busModal.type
			let width = ''
			if (type == 'add-dev') width = 1400
			else if (type == 'import-dev') width = 800
			else width = 600
			return width
		}
	},
	filters: {},
	watch: {
		editAndAddModal(val) {
			if (!val) {
				if (this.isArea) {
					this.getHierarchyData()
				} else {
					this.getDeviceNodes()
				}
			}
		},
		isArea(val) {
			this.tableReset = false
			this.$nextTick(() => {
				this.tableReset = true
			})
		},
		currentStation(val) {
			if (val) {
				this.addFlag = true
				this.tableLoad()
				this.getBusTreeData()
			} else {
				this.tableData = []
			}
		},
		'busModal.show'(val) {
			if (!val) {
				this.initAtModalClose()
			} else {
				// 弹框展示
			}
		},
		'busModal.type'(newVal) {
			if (newVal == 'import-dev') {
				this.getSubSystemTreeData()
				this.devListLoad()
			}
		},
		filterText(newVal) {
			this.$refs['import-tree'].filter(newVal)
		},
		'busInfoForm.parentId'(newVal) {
			if (this.addFlag) {
				let arr = this._forEach(this.tableData)
				let val = arr.findIndex(item => item.id == newVal)
				if (val !== -1) {
					// this.busInfoForm.vcCode = arr[val].vcCode
				} else {
					this.busInfoForm.vcCode = ''
				}
			}
			this.addFlag = true

			if (newVal == 0) {
				if (this.busInfoFormItems.findIndex(item => item.label == '编码') == -1) {
					this.busInfoFormItems.push({
						label: '编码',
						prop: 'vcCode',
						type: 'text',
						options: [],
						rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
					})
					this.busInfoFormItems.push({
						label: '示例',
						slot: 'test'
					})
				}
			} else {
				if (this.busInfoFormItems.findIndex(item => item.label == '编码') >= 0) {
					this.busInfoFormItems.splice(2, 1)
					this.busInfoFormItems.splice(2, 1)
				}
			}
		},
		keep: {
			handler(val) {
				!val && (this.currentMenu.style.display = 'none')
			}
		}
		/*activeSTreeNode: {
			handler(newValue) {
				console.log(newValue)
				if (newValue == 0) {

					this.$set(this.busInfoFormItems, 2, {
						label: '编码1',
						prop: 'vcCode',
						type: 'text',
						options: [],
						rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
					})
				} else {
					this.$set(this.busInfoFormItems, 2, {
						label: '编码2',
						prop: 'vcCode',
						type: 'text',
						options: [],
						rules: [{ required: false, message: '该项为必填项', trigger: 'change' }]
					})
				}
			},
			immediate: true
		}*/
	},
	created() {
		this.getMainList()
		this.getSubList()
		this.getIdentifyList()
		this.getImetertypeList()
		this.getIfevertypeList()
		this.getIsurfacetypeList()
		this.getIstatustypeList()
		this.getIphasetypeList()
		this.getSourceTypeList()
		this.init()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 获取当前数据来源类别
		getSourceTypeLabel(exlist) {
			let arr = []
			this.sourceTypeList.map(dict => {
				if (exlist && exlist.length > 0) {
					exlist.forEach(item => {
						if (dict.dictID == item) {
							arr.push(dict.vcName)
						}
					})
				}
			})
			let result = Array.from(new Set(arr))
			return result.join(', ')
		},
		renderContent(h, { root, node, data }) {
			let _this = this
			return this.$createElement(
				'span',
				{
					// ref: `treeMenu${node.nodeKey}`,
					style: {
						display: 'inline-block',
						width: '100%'
					},
					on: {
						mouseenter(e) {
							if (data.pid == '0') {
								_this.currentMenu = e.target.querySelector('.vmenu')
								e.target.querySelector('.vmenu').style.display = 'inline-block'
							}
						},
						mouseleave(e) {
							if (data.pid == '0') {
								_this.currentMenu = e.target.querySelector('.vmenu')
								!_this.keep && (e.target.querySelector('.vmenu').style.display = 'none')
							}
						}
					}
				},
				[
					h(
						'span',
						{
							on: {
								click() {
									if (data.disabled) return
									_this.$refs['bus-bus-search-tree'].$refs.tree.handleSelect(data.nodeKey)
								}
							}
						},
						[
							h('Icon', {
								props: {
									type: 'ios-paper-outline'
								},
								style: {
									marginRight: '8px',
									display: 'none'
								}
							}),
							h(
								'span',
								{
									class: [
										'ivu-tree-title',
										{
											'ivu-tree-title-selected': data.selected
										}
									]
								},
								data.title
							)
						]
					),
					h(
						'span',
						{
							ref: `menu${node.nodeKey}`,
							style: {
								display: 'none',
								float: 'right',
								marginRight: '16px'
							},
							class: {
								'show-menu': this.isMenu,
								vmenu: true
							}
						},
						[
							h('Button', {
								props: Object.assign({}, this.buttonProps, {
									icon: 'ios-trash'
								}),
								style: {
									marginRight: '8px'
								},
								on: {
									click: () => {
										this.deleteToplevelTreeNode(data)
									}
								}
							})
						]
					)
				]
			)
		},
		// 删除根节点
		deleteToplevelTreeNode(data) {
			this.keep = true
			this.currentMenu.style.display = 'inline-block'

			// console.log(data)
			if (data.children.length != 0) {
				this.keep = false
				return this.$Message.warning('请先删除该节点下的子节点')
			}
			this.$Modal.confirm({
				title: '警告',
				content: '是否删除该根节点',
				onOk: () => {
					this.http.deleteAreaNode(data.treeId).then(result => {
						if (result.success) {
							this.$Message.success('删除根节点成功')
							this.getBusTreeData()
							this.keep = false
						} else {
							this.$Message.error('删除根节点失败')
							this.keep = false
						}
					})
				},
				onCancel: () => {
					this.keep = false
				}
			})
		},
		// 点击下拉树 **
		handleClickSTree(node) {
			this.activeSTreeNode = node[0]['treeId'] || ''
			if (node[0]['treeId'] == 0) {
				this.$set(this.busInfoFormItems, 2, {
					label: '编码',
					prop: 'vcCode',
					type: 'text',
					options: [],
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				})
			} else {
				this.$set(this.busInfoFormItems, 2, {
					label: '编码',
					prop: 'vcCode',
					type: 'text',
					options: [],
					rules: [{ required: false, message: '该项为必填项', trigger: 'change' }],
					disabled: true
				})
			}
		},
		handleEditCommon(index, iview, key) {
			if (iview) {
				this[`${key}Edit`] = iview.value
			} else {
				this[`${key}Edit`] = '0'
			}
		},
		async getNextNode(info) {
			this.nextTreeData = []
			let result = await this.http.getNextNode({
				parentId: info.treeId,
				unitId: this.currentStation.id
			})
			if (result.success) {
				this.nextTreeData = result.data
			} else {
				this.nextTreeData = []
			}
		},
		// 异步读取
		async loadData(item, callback) {
			await this.getNextNode(item)

			this.nextTreeData.forEach(item => {
				item.loading = false
			})

			callback(this.nextTreeData)
		},
		// 编辑树节点
		handleEditTreeNodeRow(row, column, event) {
			this.vcNameEdit = row.vcName

			let index = this.elTableData.findIndex(item => {
				return row.treeId == item.treeId
			})

			this.treeNodeEditIndex = index
		},
		// 保存树节点
		async handleSaveTreeNodeRow(index, row) {
			this.elTableData[index].vcName = this.vcNameEdit

			if (row.iBindType == 1 || row.iBindType == 2 || row.iBindType == 3) {
				// 获取id
				// let areaInfo = await this.updateTreeNode(row)
				// let id = areaInfo[0]['areaId']

				let result = await this.http.updateTreeNode({
					treeId: row.treeId,
					parentId: row.parentId,
					unitId: this.currentStation.id,
					iBindType: row.iBindType,
					vcName: this.elTableData[index].vcName
				})
				if (result.success) {
					this.$Message.success('编辑成功')
					this.getHierarchyData()
				} else {
					this.$Message.error('编辑失败')
				}
			}
			/*else if (row.iBindType == 3) {
				console.log('保存相位')
			}*/
			this.treeNodeEditIndex = -1
		},
		// 取消树节点
		handleCancelTreeNodeRow(idnex, row) {
			this.treeNodeEditIndex = -1
			this.vcNameEdit = ''
		},
		// 编辑设备节点
		handleEditDevNodeRow(row, column, event) {
			// 回显
			this.nodeNameEdit = row.vcName
			this.nodeTypeEdit = row.nodeType
			this.vcValueDescEdit = row.vcValueDesc
			this.irecogtypeEdit = row.irecogtype
			this.imetertypeEdit = row.imetertype
			this.ifevertypeEdit = row.ifevertype
			this.istatustypeEdit = row.istatustype
			this.iphasetypeEdit = row.iphasetype
			this.isurfacetypeEdit = row.isurfacetype

			let index = this.elTableData.findIndex(item => {
				return row.vcName == item.vcName
			})

			this.devNodeEditIndex = index
		},
		// 保存设备节点
		async handleSaveDevNodeRow(index, row) {
			// 保存
			this.elTableData[index].vcName = this.nodeNameEdit
			this.elTableData[index].nodeType = this.nodeTypeEdit
			this.elTableData[index].vcValueDesc = this.vcValueDescEdit
			this.elTableData[index].irecogtype = this.irecogtypeEdit
			this.elTableData[index].imetertype = this.imetertypeEdit
			this.elTableData[index].ifevertype = this.ifevertypeEdit
			this.elTableData[index].istatustype = this.istatustypeEdit
			this.elTableData[index].iphasetype = this.iphasetypeEdit
			this.elTableData[index].isurfacetype = this.isurfacetypeEdit

			let result = await this.http.updateNodeInfo({
				nodeId: row.nodeId,
				vcName: this.elTableData[index].vcName || '',
				nodeType: this.elTableData[index].nodeType || '',
				vcValueDesc: this.elTableData[index].vcValueDesc || '',
				irecogtype: this.elTableData[index].irecogtype || '',
				imetertype: this.elTableData[index].imetertype || '',
				ifevertype: this.elTableData[index].ifevertype || '',
				istatustype: this.elTableData[index].istatustype || '',
				iphasetype: this.elTableData[index].iphasetype || '',
				isurfacetype: this.elTableData[index].isurfacetype || ''
			})
			if (result.success) {
				this.$Message.success('编辑成功')
				this.getDeviceNodes()
			} else {
				this.$Message.error('编辑失败')
			}
			this.devNodeEditIndex = -1
		},
		// 取消树节点
		handleCancelDevNodeRow(idnex, row) {
			this.devNodeEditIndex = -1
			this.nodeNameEdit = ''
		},
		// 识别类型字典吗
		async getIdentifyList() {
			let result = await this.http.getDictList({
				dictGroupID: 7006
			})
			if (result.success) {
				this.identifyList = result.data
			}
		},
		// 表计类型字典码
		async getImetertypeList() {
			let result = await this.http.getDictList({
				dictGroupID: 7007
			})
			if (result.success) {
				this.imetertypeList = result.data
			}
		},
		// 发热类型字典码
		async getIfevertypeList() {
			let result = await this.http.getDictList({
				dictGroupID: 7008
			})
			if (result.success) {
				this.ifevertypeList = result.data
			}
		},
		// 外观识别类型字典码
		async getIsurfacetypeList() {
			let result = await this.http.getDictList({
				dictGroupID: 7009
			})
			if (result.success) {
				this.isurfacetypeList = result.data
			}
		},
		// 状态识别类型字典码
		async getIstatustypeList() {
			let result = await this.http.getDictList({
				dictGroupID: 7013
			})
			if (result.success) {
				this.istatustypeList = result.data
			}
		},
		// 相位类型类型字典码 ##2
		async getIphasetypeList() {
			let { data } = await this.$api.getLocalData()
			this.iphasetypeList = data.iphasetypeList
		},
		// 数据来源字典码
		async getSourceTypeList() {
			let result = await this.http.getDictList({
				dictGroupID: 1006
			})
			if (result.success) {
				this.sourceTypeList = result.data
			}
		},
		// 编辑区域
		async editAreaInfo() {
			let result = await this.http.editAreaInfo({
				areaId: this.modalInfo.id,
				svgId: this.modalInfo.p2d,
				t3DId: this.modalInfo.p3d,
				iMainType: this.modalInfo.main,
				iSubType: this.modalInfo.sub,
				vcName: this.modalInfo.area,
				iIsEnable: this.modalInfo.enable,
				iSort: this.modalInfo.sort,
				vcMemo: this.modalInfo.remark
			})
			if (result.success) {
				this.$Message.success('编辑成功')
				this.getHierarchyData()
			} else {
				this.$Message.error('编辑失败')
			}
			setTimeout(() => {
				this.addAndEditModal = false
			}, 200)
		},
		// 表单确认验证
		addAndEditModalOk() {
			let _this = this
			this.$refs['modalInfo'].validate(valid => {
				if (valid) {
					_this.editAreaInfo()
				} else {
					this.$Message.error('格式错误，请重新输入！')
				}
			})
			// setTimeout(() => {
			// this.$refs['modalInfo'].resetFields()
			// }, 200)
		},
		// 表单取消
		addAndEditModalCancel() {
			this.addAndEditModal = false
			this.$refs['modalInfo'].resetFields()
		},
		// 获取主类型
		async getMainList() {
			let result = await this.http.getDictList({
				dictGroupID: 1003
			})
			if (result.success) {
				this.mainList = result.data
			}
		},
		// 获取子类型
		async getSubList() {
			let result = await this.http.getDictList({
				dictGroupID: 1004
			})
			if (result.success) {
				this.subList = result.data
			}
		},
		// 选中状态 ~~
		handleSelChange(sel) {
			this.multipleSelection = sel
			console.log(this.multipleSelection)
		},
		// 获取合并节点参数
		getMergeNodeId(arr) {
			// console.log('获取合并节点参数', arr)
			let result = []
			arr.map(item => {
				result.push(item.nodeId)
			})
			return result.join(',')
		},
		// 合并操作
		handleMergeNode() {
			if (this.multipleSelection.length <= 0) {
				return this.$Message.warning('请选择要合并的节点')
			}
			let parpms = {
				devId: this.multipleSelection[0]['devId'] || '',
				// unitId: this.currentStation.id,
				mergeNodeIds: this.getMergeNodeId(this.multipleSelection)
			}
			this.mergeDeviceNodes(parpms)
		},
		// 合并设备节点 HTTP
		async mergeDeviceNodes(parpms) {
			try {
				let result = await this.http.mergeDeviceNodes(parpms)
				if (result.success) {
					this.$Message.success('合并成功')
					this.getDeviceNodes()
				}
			} catch (e) {
				this.$Message.error('操作失败')
				console.error(e)
			}
		},
		// 取消设备编辑模态框
		handleCancelModal() {
			if (!findComponentDownward(this, 'add-ac-and-edit3').currentNodeListIsNewest()) {
				this.$Modal.confirm({
					title: '警告',
					content: '当前有未保存节点数据，是否返回设备页？',
					onOk: () => {
						this.editAndAddModal = false
						findComponentDownward(this, 'add-ac-and-edit3').editIndex = -1
					}
				})
			} else {
				this.editAndAddModal = false
				findComponentDownward(this, 'add-ac-and-edit3').editIndex = -1
			}
		},
		// 单个删除
		handleDelete(row) {
			if (row.iBindType == 1 || row.iBindType == 2 || row.iBindType == 3) {
				this.$Modal.confirm({
					title: '警告',
					content: '确认删除吗？',
					onOk: () => {
						this.deleteAreaNode(row)
					}
				})
			} else {
				this.$Modal.confirm({
					title: '警告',
					content: '确认删除该节点吗？',
					onOk: () => {
						this.editDeviceNode(row.nodeId)
					}
				})
			}
		},
		// 获取设备信息
		async getDeviceInfo(id) {
			let result = await this.http.getDeviceInfo({
				devId: id
			})
			if (result.success) {
				return result.data
			} else {
				return {}
			}
		},
		// 获取区域信息 ##
		async getAreaInfo(info) {
			let result = await this.http.getAreaInfo({
				areaId: info.bindId,
				unitId: this.currentStation.id
			})

			if (result.success) {
				return result.data.lists
			} else {
				return []
			}
		},
		// 编辑设备
		async handleEdit(row) {
			// 弹出设备框
			if (row.iBindType == 1) {
				this.addAndEditModal = true
				let areaInfo = await this.getAreaInfo(row)

				this.modalInfo.id = areaInfo[0]['areaId']
				this.modalInfo.p2d = areaInfo[0]['svgId']
				this.modalInfo.p3d = areaInfo[0]['t3DId']
				this.modalInfo.main = areaInfo[0]['iMainType']
				this.modalInfo.sub = areaInfo[0]['iSubType']
				this.modalInfo.area = areaInfo[0]['vcName']
				this.modalInfo.enable = areaInfo[0]['iIsEnable']
				this.modalInfo.sort = areaInfo[0]['iSort']
				this.modalInfo.remark = areaInfo[0]['vcMemo']
			} else if (row.iBindType == 2) {
				let dev = await this.getDeviceInfo(row.bindId)

				if (!dev) {
					return this.$Message.error('当前设备信息为空')
				}

				// 编辑设备
				// this.action = 'edit'
				let vm = findComponentDownward(this, 'add-ac-and-edit3')
				// 操作标识
				vm.activeAction = 'edit'
				vm.nextTo = true
				// 更新请求参数
				vm.parentParams = {
					parentStationId: this.currentStation.id,
					parentNodeId: this.currentStation.id
				}
				// 默认表单数据
				vm.basicInfoXHR = dev
				// vm.getBasicInfoWeb()
				vm.getDeviceNodesInfo(dev.devId, dev.devTypeId)

				// 更新下一页所需参数
				// vm.parentTableData = this.tableData
				vm.parentTableData = []
				vm.parentIndex = 0
				this.editAndAddModal = true
			} else if (row.iBindType == 3) {
				// 编辑相位
			} else {
				// 编辑节点
				let dev = await this.getDeviceInfo(row.devId)

				// 编辑设备
				// this.action = 'edit'

				let vm = findComponentDownward(this, 'add-ac-and-edit3')
				// 操作标识
				vm.activeAction = 'edit'
				vm.nextTo = true
				// 更新请求参数
				vm.parentParams = {
					parentStationId: this.currentStation.id,
					parentNodeId: this.currentStation.id
				}
				// 默认表单数据
				vm.basicInfoXHR = dev
				// vm.getBasicInfoWeb()
				vm.getDeviceNodesInfo(dev.devId, dev.devTypeId)

				// 更新下一页所需参数
				// vm.parentTableData = this.tableData
				vm.parentTableData = []
				vm.parentIndex = 0
				this.editAndAddModal = true
			}
		},
		// 分页跳转
		handleChangePage(page) {
			this.currentPage = page
			if (this.isArea) {
				this.getHierarchyData()
			} else {
				this.getDeviceNodes()
			}
		},
		// 改变分页大小
		handleChangeSize(size) {
			this.pageSize = size
			if (this.isArea) {
				this.getHierarchyData()
			} else {
				this.getDeviceNodes()
			}
		},
		// 批量删除
		handleBatchRemove() {
			console.log('批量删除')
		},
		// 获取设备节点信息
		async getDeviceNodes() {
			this.tableLoading = true
			let result = await this.http.getDeviceNodes({
				devId: this.equId
			})
			this.isArea = false

			if (result.success) {
				if (!result.data) {
					this.elTableData = []
					this.total = 0
					this.tableLoading = false
					return
				}
				this.elTableData = result.data.devNodesList

				// 处理 null 数据
				this.elTableData.forEach(row => {
					Object.keys(row).forEach(td => {
						if (td === null) {
							td = ''
						}
					})
				})

				// 处理识别类型描述 ###
				this.elTableData.forEach(item => {
					this.identifyList.map(sub => {
						item.irecogtype == sub.dictID && (item.irecogtypeName = sub.vcName)
					})
				})

				// 处理表计类型描述
				this.elTableData.forEach(item => {
					this.imetertypeList.map(sub => {
						item.imetertype == sub.dictID && (item.imetertypeName = sub.vcName)
					})
				})

				// 处理发热类型描述
				this.elTableData.forEach(item => {
					this.ifevertypeList.map(sub => {
						item.ifevertype == sub.dictID && (item.ifevertypeName = sub.vcName)
					})
				})

				// 处理外观识别类型描述
				this.elTableData.forEach(item => {
					this.isurfacetypeList.map(sub => {
						item.isurfacetype == sub.dictID && (item.isurfacetypeName = sub.vcName)
					})
				})

				// 处理状态识别类型描述
				this.elTableData.forEach(item => {
					this.istatustypeList.map(sub => {
						item.istatustype == sub.dictID && (item.istatustypeName = sub.vcName)
					})
				})

				// 处理相位类型描述 ##3
				this.elTableData.forEach(item => {
					this.iphasetypeList.map(sub => {
						item.iphasetype == sub.value && (item.iphasetypeName = sub.label)
					})
				})

				this.total = result.data.devNodesList.length
			} else {
				this.elTableData = []
				this.total = 0
			}
			this.tableLoading = false
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
		async deleteAreaNode(row) {
			let result = await this.http.deleteAreaNode(row.treeId)
			if (result.success) {
				this.$Message.success('删除成功')
				await this.getHierarchyData()
				this.deleteDomTreeNode(this.busTreeData, row.pid, row.id)
			} else {
				this.$Message.error(result.msg)
			}
		},
		// 删除设备节点
		async editDeviceNode(id) {
			let result = await this.http.editDeviceNode({
				nodeId: id
			})
			if (result.success) {
				this.$Message.success('删除成功')
				this.getDeviceNodes()
			} else {
				this.$Message.error(result.msg)
			}
		},
		handleClick(row) {
			// console.log(row)
		},
		// ###
		async getHierarchyData() {
			this.tableLoading = true
			let page = {
				currentPage: this.currentPage,
				pageSize: this.pageSize
			}
			let result = await this.http.getHierarchyData({
				parentId: this.areaId,
				page
			})
			this.isArea = true
			if (result.success) {
				this.elTableData = result.data.lists
				this.total = result.data.page.totalNum
			} else {
				this.elTableData = []
				this.total = 0
			}
			this.tableLoading = false
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
			await this.handleLocalData()
			await this.getOrgTreeData()
			// await this.getBusTreeData()
		},

		async handleLocalData() {
			// 获取本地 定义的枚举 数据
			this.$api.getLocalData('enums.json').then(res => {
				this.enums = res.data
				// 设置 待选类型数据
				let addIBindTypeIndex = this.getTargetIndexByKey(this.busInfoFormItems, 'prop', 'iBindType')
				let editIBindTypeIndex = this.getTargetIndexByKey(this.editBusTreeFormItems, 'prop', 'iBindType')
				this.busInfoFormItems[addIBindTypeIndex].options = this.enums.businessTreeNodeList
				this.editBusTreeFormItems[editIBindTypeIndex].options = this.enums.businessTreeNodeList

				// 设置 待选 相位名称数据
				let phasePositionIndex = this.getTargetIndexByKey(this.phasePositionFormItems, 'prop', 'vcName')
				this.phasePositionFormItems[phasePositionIndex].options = this.enums.phasePositionList

				// 表格加载
				// this.tableLoad()
			})
		},

		// 组织树加载
		async getOrgTreeData() {
			this.orgTreeDataLoading = true
			this.areaHttp.getUnitTree({ iFlag: 2 }).then(res => {
				if (res.code == 200) {
					this.orgTreeData = this.mapSourceToData(res.data)

					this.getFirstStation(this.orgTreeData)
				}
				this.orgTreeDataLoading = false
			})
		},

		// 业务树加载 **
		async getBusTreeData() {
			this.busTreeLoading = true
			let params = {}
			if (this.currentStation) {
				;(params['unitId'] = this.currentStation.id), (params['parentId'] = 0)
			}
			let result = await this.http.getBusinessTree(params)
			if (result.code == 200) {
				this.busTreeData = result.data
				// this.busTreeData2 = result.data

				// 处理默认参数
				if (this.busTreeData[0] && this.busTreeData[0].children) {
					// 默认选中第一个父节点
					this.busTreeData[0]['selected'] = true
					this.busTreeData[0]['expand'] = true

					// 默认展开第一层节点前三个节点数据
					// this.busTreeData[0].children.forEach((item, index) => {
					// 	if (index < 1) item.expand = true
					// })

					if (this.busTreeData[0].iBindType == 1) {
						this.areaId = this.busTreeData[0]['treeId']
						this.currentPage = 1
						this.getHierarchyData()
						this.isArea = true
					} else if (this.busTreeData[0].iBindType == 2) {
						this.equId = this.busTreeData[0]['bindId']
						this.currentPage = 1
						this.getDeviceNodes()
						this.isArea = false
					} else if (this.busTreeData[0].iBindType == 3) {
						this.areaId = this.busTreeData[0]['treeId']
						this.currentPage = 1
						this.getHierarchyData()
						this.isArea = true
					}

					this.busTreeData = [{ id: '0', title: '无', treeId: '0', children: [] }, ...this.busTreeData]

					this.currentNodeId = this.busTreeData[1]['id'] || '0'
					this.currentNodeName = this.busTreeData[1]['title'] || '无'
					this.activeSTreeNode = this.busTreeData[1]['treeId'] || '0'
					// let arr = ,
				} else {
					this.busTreeData = [{ id: '0', title: '无', treeId: '0', children: [] }]
					this.currentNodeId = this.busTreeData[0]['id']
					this.currentNodeName = this.busTreeData[0]['title']
					this.activeSTreeNode = this.busTreeData[0]['treeId']
					this.elTableData = []
				}
			}
			this.busTreeLoading = false
			this.$nextTick(() => {
				setTimeout(() => {
					let dom = document.getElementById('bus-search-tree').childNodes[1].childNodes[0]
					if (dom.nodeType == 1) {
						dom.style.display = 'none'
					}
				}, 50)
			})
		},

		// 点击业务树 **
		handleBusTree(node) {
			if (JSON.stringify(node) == '[]') return
			// console.log('点击业务树id', node[0]['id'])

			if (node[0].iBindType == 1) {
				this.areaId = node[0]['treeId']
				this.currentPage = 1
				this.getHierarchyData()
				this.isArea = true
			} else if (node[0].iBindType == 2) {
				this.equId = node[0]['bindId']
				this.currentPage = 1
				this.getDeviceNodes()
				this.isArea = false
			} else if (node[0].iBindType == 3) {
				this.areaId = node[0]['treeId']
				this.currentPage = 1
				this.getHierarchyData()
				this.isArea = true
			}

			this.currentNodeId = node[0]['id']
			this.currentNodeName = node[0]['title']
			this.activeSTreeNode = node[0]['treeId']

			this.nodeTreeId = node[0]['treeId']
		},

		// 业务树表格加载
		tableLoad() {
			let params = {}
			if (this.currentStation) {
				params['unitId'] = this.currentStation.id // 根据活动 的 stationID 获取表格
				params['parentId'] = 0
			}

			this.http.getBusinessTree(params).then(res => {
				if (res.code == 200) {
					// this.tableData = this.mapSourceToData(res.data, 'table')
					this.tableData = res.data
					// 设置表单的 父节点字段 待选 业务
					let options = [
						{ id: '0', title: '无', treeId: '0', children: [] },
						...res.data.map(item => {
							item['expand'] = true
							return item
						})
					]

					let addParentIdIndex = this.getTargetIndexByKey(this.busInfoFormItems, 'prop', 'parentId')
					let editParentIdIndex = this.getTargetIndexByKey(this.editBusTreeFormItems, 'prop', 'parentId')

					this.busInfoFormItems[addParentIdIndex].options = options
					this.editBusTreeFormItems[editParentIdIndex].options = options
				}
			})
		},
		// 表格行的类名
		setRowClassName(data) {
			if (data.row.pid == 0) {
				return 'rootNode'
			}
		},

		// 树点击
		handleStationTree(node) {
			// 清空 已选的 表格 row
			// this.$nextTick(() => {
			// 	this.$refs['bus-tree-table'].$children[0].setCurrentRow()
			// })

			if (!this.prevHaveDataTreeNode) {
				this.currentStation && (this.currentStation.id && (this.prevHaveDataTreeNode = this.getNodeById(this.orgTreeData, this.currentStation.id)))
			}

			if (!node.length) {
				this.currentStation = null
				this.$refs['bus-org-search-tree'].$refs.tree.handleSelect(this.prevHaveDataTreeNode.nodeKey)
				return
			} else {
				this.prevHaveDataTreeNode = node[0]
			}

			if (node[0].flag == 1) {
				this.currentStation = node[0]
			} else this.currentStation = null
		},

		// 表格某一行 单选状态发生变化
		handleTableRowChange(currentRow, oldCurrentRow) {
			if (!currentRow) return

			this.currentRow = currentRow
			this.getStationNodeByUnitId(this.orgTreeData, currentRow.unitId)
		},

		// 表格修改某一行
		handlerEditRow(row, index) {
			this.addFlag = false
			this.setFormBySource(this.busInfoForm, row)
			this.busModal.set(true, 'edit-bus-tree', '编辑组织树')
		},

		// 表格删除 某一行 数据
		handlerDeleteRow(row, index) {
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认删除所选组织</p>`,
				onOk: () => {
					this.http.deleteBusTree(row.treeId).then(res => {
						if (res.code == '200') {
							this.$Message.success('删除成功')
							this.tableLoad()
						} else {
							this.$Message.warning(res.msg)
						}
					})
				}
			})
		},

		// 点击新增 **
		handleAddBusTree(type) {
			// 设置步骤条 信息
			let stepList = ''

			if (type == 'add') {
				stepList = [{ title: '步骤1', content: '选择业务树信息' }, { title: '步骤2', content: '完善信息' }]
				if (!this.busInfoFormItems[0].options.length || this.busInfoFormItems[0].options[0].id != 0) {
					let optios = [{ id: '0', title: '无', treeId: '0', children: [] }, ...this.busInfoFormItems[0].options]
					this.busInfoFormItems[0].options = optios
				}

				// 设备业务树的默认值
				// console.log(this.currentNodeId)
				// console.log(this.currentNodeName)
				findComponentDownward(this, 'tree-select').setSelectData(this.currentNodeId, this.currentNodeName)

				if (this.activeSTreeNode == 0) {
					this.$set(this.busInfoFormItems, 2, {
						label: '编码',
						prop: 'vcCode',
						type: 'text',
						options: [],
						rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
					})
				} else {
					this.$set(this.busInfoFormItems, 2, {
						label: '编码',
						prop: 'vcCode',
						type: 'text',
						options: [],
						rules: [{ required: false }],
						disabled: true
					})
				}

				// if (this.busInfoFormItems.findIndex(item => item.label == '编码') == -1) {

				// 	this.busInfoFormItems.push({
				// 		label: '编码',
				// 		prop: 'vcCode',
				// 		type: 'text',
				// 		options: [],
				// 		rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				// 	})
				// 	this.busInfoFormItems.push({
				// 		label: '示例',
				// 		slot: 'test'
				// 	})
				// }
			} else if (type == 'import') {
				if (this.busInfoFormItems[0].options[0].id == 0) {
					this.busInfoFormItems[0].options.splice(0, 1)
				}
				stepList = [{ title: '步骤1', content: '选择业务树父节点' }, { title: '步骤2', content: '选择设备导入' }]

				// 如果是导入设备 指定类型 为 设备 并禁用
				this.busInfoForm['iBindType'] = '2'

				let index = this.getTargetIndexByKey(this.busInfoFormItems, 'prop', 'iBindType')
				this.busInfoFormItems[index].disabled = true

				// { id: '0', title: '无', children: [] }  options
				this.busInfoFormItems[index]

				if (this.busInfoFormItems.findIndex(item => item.label == '编码') >= 0) {
					this.busInfoFormItems.splice(2, 1)
					this.busInfoFormItems.splice(2, 1)
				}
			}

			this.$set(this.stepsConfig, 'list', stepList)
			// 如果已选表格 row 将当前选中的 row 的数据带入 treeId
			if (this.currentRow) this.busInfoForm['parentId'] = this.currentRow.treeId

			this.busModal.set(true, 'add-bus-tree', '新增区域')
		},

		// 下一步
		nextStep(type) {
			this.validateComForm(this.formName, () => {
				this.currentParentType = type // 设置当前上一步
				let { iBindType } = this.busInfoForm
				let nextFlag = true
				let arr = this._forEach(this.tableData)
				// arr.forEach(item => {
				// 	if (item.vcCode == this.busInfoForm.vcCode) {
				// 		nextFlag = false
				// 	}
				// })

				if (nextFlag) {
					switch (iBindType) {
						case '1':
							this.busModal.set(true, 'add-area', '')
							break
						case '2': {
							let index = this.getTargetIndexByKey(this.busInfoFormItems, 'prop', 'iBindType')
							let isImportDev = this.busInfoFormItems[index].disabled // 如果选择类型的 radio 处于禁用状态 说明属于 导入设备
							if (isImportDev) {
								this.busModal.set(true, 'import-dev', '')
							} else {
								this.busModal.set(true, 'add-dev', '')
								this.handleAddACDeviceModal()
							}
							break
						}
						case '3':
							this.busModal.set(true, 'add-phase-position', '')
							break
					}

					this.$set(this.stepsConfig, 'current', 1)
				} else {
					// this.$Message.warning('编码不能重复')
				}
			})
		},

		// 上一步
		prevStep() {
			this.busModal.set(true, this.currentParentType, ` `) // 切换 表单内容类型 到 表单提交
			this.$set(this.stepsConfig, 'current', 0)
		},

		// 模态框确认
		handlerModalConfirm(type) {
			switch (type) {
				case 'add-area':
					this.saveArea = !this.saveArea
					break
				case 'add-phase-position':
					this.addPhasePosition()
					break
				case 'edit-bus-tree':
					this.editBusTree({ ...this.busInfoForm })
					break
				case 'import-dev':
					this.importDev()
					break
				case 'add-dev':
					this.handleSaveDev()
					break
			}
		},
		handleCancel() {
			if (!findComponentDownward(this, 'add-ac-and-edit2').currentNodeListIsNewest()) {
				this.$Modal.confirm({
					title: '警告',
					content: '当前有未保存节点数据，是否返回设备页？',
					onOk: () => {
						this.editAndAddModal = false
						findComponentDownward(this, 'add-ac-and-edit2').editIndex = -1
					}
				})
			} else {
				this.editAndAddModal = false
				findComponentDownward(this, 'add-ac-and-edit2').editIndex = -1
			}
		},
		// 新增智辅模态框
		handleAddACDeviceModal() {
			this.action = 'add'

			let vm = findComponentDownward(this, 'add-ac-and-edit2')
			// 操作标识
			vm.activeAction = 'add-ac'
			vm.nextTo = false
			// 更新请求参数
			vm.parentParams = {
				parentStationId: this.currentStation.id,
				parentNodeId: this.currentStation.id
			}

			// 清空表单数据
			// Object.keys(vm.basicInfo).forEach(item => {
			// 	vm.$set(vm.basicInfo, item, '')
			// })
			// 清空表格数据
			// vm.tableData = []
			// this.editAndAddModal = true
		},

		// 保存 区域
		handleSaveArea(res, form) {
			if (res.code != 200) {
				this.$Message.warning(`错误：${res.msg}`)
			} else {
				// 如果区域保存成功 相继发送 保存区域树的请求
				this.currentArea = form

				this.setBusInfoFormItemData('vcName', form.vcName) // 业务树 name = 上一步的 区域的 name
				this.setBusInfoFormItemData('unitId', this.currentStation.id) // 管理单元 = 当前活动 站的 id
				this.setBusInfoFormItemData('bindId', res.data)

				this.saveBusTree(this.busInfoForm)
			}
		},
		// 保存设备
		handleSaveDev() {
			let vm = findComponentDownward(this, 'add-ac-and-edit2')
			vm.handleSubmitAdd('basicInfo')
		},
		addDevUpdate(data, devTypeId) {
			let { parentId, iBindType, vcCode } = this.busInfoForm
			let { id: unitId } = this.currentStation

			let nodes = [
				{
					devId: devTypeId,
					vcName: data.devicename
				}
			]

			let params = {
				parentId,
				vcCode,
				unitId,
				iBindType,
				nodes
			}

			params.parentId = this.activeSTreeNode // ~

			this.http.importDev(params).then(res => {
				if (res.code == 200) {
					// console.log(params)
					this.$Message.success(`添加成功`)
					this.tableLoad()
					if (this.nodeTreeId == 0) {
						this.getBusTreeData()
					} else {
						this.setNode(this.busTreeData, res.data.parentId, res.data)
					}
					this.busModal.set(false)
				} else this.$Message.warning(res.msg)
			})
		},

		// 保存相位 add-phase-position
		addPhasePosition() {
			this.setBusInfoFormItemData('unitId', this.currentStation.id)
			// 校验 相位 表单的必填项
			this.validateComForm('phase-position-form', () => {
				let params = { ...this.busInfoForm }
				params.parentId = this.activeSTreeNode // ~
				this.saveBusTree(params)
			})
		},
		// 导入设备
		importDev() {
			let treeNodes = this.$refs['import-tree'].getCheckedNodes()
			let { parentId, iBindType } = this.busInfoForm
			let { id: unitId } = this.currentStation
			let nodes = treeNodes.map(item => {
				let { id: devId, vcName } = item
				return {
					devId,
					vcName
				}
			})

			let params = {
				parentId,
				unitId,
				iBindType,
				nodes
			}

			params.parentId = this.activeSTreeNode // ~

			if (!nodes.length) {
				this.$Message.warning('未选择设备节点')
				return
			}

			this.http.importDev(params).then(res => {
				// console.log('importDev', res)
				if (res.code == 200) {
					this.$Message.success(`添加成功`)
					this.tableLoad()
					this.getBusTreeData()
					this.busModal.set(false)
				} else this.$Message.warning(res.msg)
			})
		},
		// 找到并追加节点
		setNode(tree, id, inData) {
			// 找到对应的父节点
			let recursion = (tree, id, inData) => {
				tree.forEach(item => {
					if (item.id == id) {
						item.children = [...item.children, ...[inData]]
						// 展开
						item.expand = true
						// 更新联动列表
						this.handleBusTree([item])
						// console.log('找到并追加节点', item)
					}
					if (item.children && item.children.length > 0) {
						recursion(item.children, id, inData)
					}
				})
			}
			recursion(tree, id, inData)
		},
		// 保存业务树 **
		saveBusTree(params) {
			params.parentId = this.activeSTreeNode
			this.http.addBusTree(params).then(res => {
				if (res.code == '200') {
					this.$Message.success(`添加成功`)
					this.tableLoad()

					// 添加这个节点
					// console.log(this.busTreeData)
					// console.log(res.data)
					// console.log(this.activeSTreeNode)
					if (this.activeSTreeNode == 0) {
						this.getBusTreeData()
					} else {
						this.setNode(this.busTreeData, res.data.parentId, res.data)
					}

					this.busModal.set(false)
				} else {
					this.$Message.warning(res.msg)
				}
			})
		},

		// 修改业务树
		editBusTree(params) {
			this.http.editBusTree(params).then(res => {
				if (res.code == '200') {
					this.$Message.success(`修改成功`)
					this.tableLoad()
					this.getBusTreeData()
					this.busModal.set(false)
				} else {
					this.$Message.warning(res.msg)
				}
			})
		},

		// 获取子系统
		getSubSystemTreeData() {
			this.$api.deviceModeling
				.getDeviceTypeTreeInfo({
					treeType: 2,
					subSystemId: 0,
					type: 0
				})
				.then(res => {
					if (res.code == 200) {
						this.devTreeData = this.mapSourceToData(res.data)
					}
				})
		},

		// 加载 设备列表 @@
		devListLoad() {
			let { vcName } = this.devListParams

			let params = {
				currentPage: 1,
				pageSize: 5000,
				vcName,
				subSystemId: this.currentSubSystem ? this.currentSubSystem.id : '',
				devTypeId: this.currentType ? this.currentType.id.replace(/[^0-9]/gi, '') : '',
				unitId: this.currentStation.id
			}

			this.devListLoading = true
			this.$api.deviceModeling.getAllDeviceList(params).then(res => {
				if (res.code == 200) {
					this.devListData = res.data.lists
				} else this.$Message.warning(res.msg)
				this.devListLoading = false
			})
		},
		// 点击子系统的树
		handleDSubs(data) {
			if (!data.length) {
				this.currentSubSystem = null
				this.currentType = null

				this.devListLoad()
				return
			}

			if (data[0].flag == 0) {
				this.currentSubSystem = data[0]
				this.currentType = null
			} else if (data[0].flag == 1) {
				this.currentType = data[0]
				this.currentSubSystem = null
			}

			this.devListLoad()
		},

		// components tolls -------------------------------------------------------------------------------------------------------
		// 根据传入的 station id 获取到树节点 并选中 且排他
		getStationNodeByUnitId(source, unitId) {
			source.forEach(item => {
				if (item.id == unitId) {
					this.currentStation = item
					this.$set(item, 'selected', true)
				} else {
					if (item.selected) this.$set(item, 'selected', false)
					this.getStationNodeByUnitId(item.children, unitId)
				}
			})
		},
		// 获取树里面的第一个变电站
		getFirstStation(data) {
			let arr = []
			function temp(source) {
				for (let i = 0; i < source.length; i++) {
					if (source[i].flag == 1) {
						arr.push(source[i])
					}
					if (source[i].children.length > 0) {
						temp(source[i].children)
					}
				}
			}

			temp(data)

			this.currentStation = arr[0]
			arr[0] && this.$set(arr[0], 'selected', true)
		},
		// 获取 nodeKey 根据传入的 节点 id
		getNodeById(source, id) {
			let node = ''
			function temp(source) {
				source.forEach(item => {
					if (item.id == id) {
						node = item
					} else {
						temp(item.children, id)
					}
				})
			}

			temp(source, id)

			return node
		},
		// 在 模态框关闭时 初始化 一些配置
		initAtModalClose() {
			this.currentArea = null // 清空 活动 区域
			this.currentParentType = '' // 清空活动的 上一步 类型
			this.$set(this.stepsConfig, 'current', 0) // 初始化 步骤条

			// 初始化 类型选择的 禁用状态
			let index = this.getTargetIndexByKey(this.busInfoFormItems, 'prop', 'iBindType')
			this.busInfoFormItems[index].disabled = false

			// 清空活动的 设备 || 子系统
			this.currentSubSystem = null
			this.currentType = null
			this.devListData = []
			this.devTreeData = []

			// 清空 活动的 业务树表单
			let obj = {
				parentId: '0'
			}
			this.resetComForm(this['busInfoForm'], obj, this.formName)
			this.resetComForm(this['busInfoForm'], obj, 'phase-position-form')

			// 初始化设备模态框内容
			let vm = findComponentDownward(this, 'add-ac-and-edit2')
			Object.keys(vm.basicInfo).forEach(item => {
				vm.$set(vm.basicInfo, item, '')
			})
			// 清空表格数据
			vm.tableData = []
		},
		// 设置 添加业务树的 form 表单 单个项
		setBusInfoFormItemData(key, value) {
			this.$set(this.busInfoForm, key, value)
		},

		// 源数据映射为需要的数据
		mapSourceToData(source, type) {
			return source.map(item => {
				if (type === 'table') {
					let targetIndex = this.enums.businessTreeNodeList.findIndex(node => node.id == item['iBindType'])
					item['iBindTypeHtml'] = this.enums.businessTreeNodeList[targetIndex].value || ''
					item['iBindType'] = `${item['iBindType']}`
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
		//刷新JSON
		// refreshJson(){
		// 	this.http.refreshJson({unitId:this.currentStation.id}).then(res=>{
		// 		if(res.code == 200 && res.success){
		// 			this.$Message.success('JSON文件刷新成功');
		// 		}else{
		// 			 this.$Message.error(res.msg);
		// 		}
		// 	}).catch(error=>{
		// 		console.log(error.message)
		// 			this.$Message.error(error.message)
		// 			// this.$Message.error(error.response.data.msg)
		// 	})
		// }
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
/deep/ .el-table--border th , /deep/ .el-table th.is-leaf {
	border-bottom: 0.05444rem solid #EBEEF5 !important;
}
.business-tree {
  width: 100%;
  height: calc(100vh - 140px);
  flex-align();
  float: left;
  position: relative;

  	/deep/ .vmenu {
    	transition: all 1s ease;
	}

	/deep/ .show-menu {
	    display: inline-block!important;
	}

  .org-tree-wrapper {
    create-wrap(230px, 100%, true, true);
    margin-right: 10px;
    background-color: #fff;
    padding: 8px;
    position: relative;

	/deep/ .ivu-btn-icon-only.ivu-btn-small {
        height: 20px;
    }
    /deep/ .ivu-icon-ios-trash:before {
        position: relative;
        top: -2px;
    }

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

    /deep/ .business-tree-main {
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
  .add-ac-and-edit .device-node2 .ivu-table-wrapper {
    // height: calc(100vh - 475px) !important;

    > /deep/ .ivu-table {
      > .ivu-table-body {
        // height: calc(100vh - 600px) !important;

        .ivu-table-expanded-cell {
          // padding: 10px !important;
          // padding-left: 100px !important;
        }
      }

      > .ivu-table-tip {
        // height: calc(100vh - 600px) !important;

        td {
          // height: calc(100vh - 600px) !important;
        }
      }
    }
  }

  .ivu-table-wrapper.isAutoHeight {
    // height: calc(100vh - 530px) !important;

    > /deep/ .ivu-table {
      > .ivu-table-body {
        // height: calc(100vh - 570px) !important;

        .ivu-table-expanded-cell {
          // padding: 10px !important;
          // padding-left: 100px !important;
           // padding-top: 2px !important;
        }
      }

      > .ivu-table-tip {
        // height: calc(100vh - 570px) !important;

        td {
          // height: calc(100vh - 570px) !important;
        }
      }
    }
  }

  .page-action {
    display: none;
  }
}

/deep/ .el-table {
	height: calc(100% - 45px)!important;
}

.page-wrap {
	margin-top: 10px;
	display: flex;
	justify-content: center;

	.ivu-page {
		iview-page()
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
		position: initial !important
		overflow: initial !important

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
			content: "\F379" !important;
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
</style>
