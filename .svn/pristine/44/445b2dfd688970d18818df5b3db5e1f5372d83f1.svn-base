<template>
	<div class="table-expand">
		<div class="ass-nodes">
			<template v-for="(item, index) in rowData">
				<Card :key="item.nodeGUID">
					<p slot="title">
						{{ item.vcName }}
					</p>
					<a href="#" slot="extra" @click.prevent="handleDeleteAssNode(item, index)">
						<Icon type="ios-loop-strong"></Icon>
						删除
					</a>
					<Form ref="assNodeInfo" :rules="assNodeInfoRule" :model="assNodeInfo" :label-width="90">
						<FormItem label="计算方式">
							<RadioGroup @on-change="handleEditMathType(index, $event, true)" v-model="item.mathType">
								<Radio v-for="ctem in operatorList" :label="ctem.value + ''" :key="ctem.value">
									{{ ctem.label }}
								</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem :error="item.fmathParamError" label="计算参数" prop="fmathParam">
							<InputNumber
								:style="{ width: `${240 / 22.5}rem` }"
								@on-change="handleEditInput(index, 'fmathParam', $event)"
								:precision="2"
								:min="0"
								v-model="item.fmathParam"
								placeholder="编辑计算参数"
							>
							</InputNumber>
						</FormItem>
						<FormItem label="配置值" :style="{ marginBottom: 'initial' }">
							<Select
								label-in-value
								@on-change="handleEditFconfigValue(index, $event)"
								v-model="item.fconfigValue"
								placeholder="选择配置值"
								clearable
							>
								<Option
									v-for="item in getFValueList($data.$_addAcAndEdit.tableData[rowIndex]['vcValueDesc'])"
									:value="item.id + ''"
									:key="item.id"
									:label="`${item.label} ( ${item.id} )`"
								/>
							</Select>
							<p :style="{ marginTop: `${5 / 22.5}rem`, color: 'rgb(255, 12, 12)' }">
								配置值一对多必须填，一对一不填写
							</p>
						</FormItem>
						<FormItem label="是否值转换">
							<i-switch @on-change="handleEditNodeValueTransform(index, $event, true)" v-model="item.iisTransBoolean" size="large">
								<span slot="open">是</span>
								<span slot="close">否</span>
							</i-switch>
						</FormItem>
						<FormItem :error="item.vcTransDescError" label="值转换规则" prop="vcTransDesc">
							<Input @on-change="handleEditVcTransDesc(index, $event)" clearable v-model="item.vcTransDesc" placeholder="编辑值转换规则"></Input>
						</FormItem>
					</Form>
				</Card>
			</template>
		</div>
		<Button size="large" type="warning" ghost icon="md-add" class="add" @click="handleOpenAddacNodeAssModal">
			添加智辅测点
		</Button>
		<Button size="large" type="info" ghost icon="md-add" class="add" @click="handleOpenAddasNodeAssModal">
			添加巡检测点
		</Button>
		<Button size="large" type="success" ghost icon="md-add" class="add" @click="handleOpenAddxfNodeAssModal">
			添加消防测点
		</Button>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'add-ac-and-edit-table-expand',
	props: {
		rowData: Array,
		rowIndex: Number
	},
	data() {
		const validateFmathParam = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('错误错误~~~'))
			} else {
				callback()
			}
		}
		return {
			// 指定'device-modeling'组件
			$_addAcAndEdit: findComponentUpward(this, 'add-ac-and-edit2'),
			// 表格相关
			columns: [
				{
					type: 'selection',
					width: 50,
					align: 'center'
				},
				{
					title: '关联节点',
					key: 'vcName',
					align: 'center'
				},
				{
					title: '配置值',
					slot: 'fconfigValue',
					align: 'center'
				},
				{
					title: '是否值转换',
					slot: 'iisTransValue',
					align: 'center'
				},
				{
					title: '值转换规则',
					slot: 'vcTransDesc',
					align: 'center'
				},
				{
					title: '值描述',
					key: 'vcDesc',
					align: 'center'
				},
				{
					title: '计算方式',
					align: 'center'
				},
				{
					title: '计算参数',
					align: 'center'
				},
				{
					title: '操作',
					slot: 'action',
					align: 'center',
					width: 200
				}
			],
			selectionRow: [],

			// 编辑节点相关
			editIndex: -1,
			assNodeEdit: '',
			fconfigValueEdit: '',
			vcTransDescEdit: '',
			assNodeInfo: {
				fconfigValue: null,
				vcTransDesc: '',
				iisTransValue: true
			},
			assNodeInfoRule: {},
			fmathParamError: '',
			vcTransDescError: '',
			// 计算方式枚举
			operatorList: []
		}
	},
	created() {
		// 获取计算方式枚举列表
		this.getOperatorList()
		if (this.rowData && this.rowData.length > 0) {
			// 处理节点类型描述
			this.rowData.forEach((item, index) => {
				if (item.mathType == null) {
					item.mathType = '0'
				} else {
					item.mathType = item.mathType + ''
				}
				item.fconfigValue = item.fconfigValue + ''
				item.fmathParamError = ''
				item.vcTransDescError = ''
				if (item.mathType == null) {
					item.mathType = '0'
				}
				switch (item.iisTransValue) {
					case 0:
						item.iisTransName = '否'
						item.iisTransBoolean = false
						this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransName = '否'
						this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransBoolean = false
						break
					case 1:
						item.iisTransName = '是'
						item.iisTransBoolean = true
						this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransName = '是'
						this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransBoolean = true
						break
				}
			})
		}
	},
	mounted() {
		// 每次展开自动验证
		this.rowData.forEach((item, index) => {
			// 验证计算方式与计算参数
			this.handleEditMathType(index, this.rowData[index].mathType, false)
			// 验证是否值转换与值转换规则
			this.handleEditNodeValueTransform(index, this.rowData[index].iisTransBoolean, false)
		})
	},
	methods: {
		// 获取计算方式枚举
		async getOperatorList() {
			let { data } = await this.$api.getLocalData()
			this.operatorList = data.operatorList
		},
		// 打开添加智辅关联配置模态框
		async handleOpenAddacNodeAssModal() {
			this.$data.$_addAcAndEdit.currentSourceIndex = this.rowIndex
			this.$data.$_addAcAndEdit.handleAddacNode('handleAddacNodeAss')
		},
		// 打开添加巡检关联配置模态框
		async handleOpenAddasNodeAssModal() {
			this.$data.$_addAcAndEdit.currentSourceIndex = this.rowIndex
			this.$data.$_addAcAndEdit.handleAddasNode('handleAddasNodeAss')
		},
		// 打开添加消防关联配置模态框
		async handleOpenAddxfNodeAssModal() {
			this.$data.$_addAcAndEdit.currentSourceIndex = this.rowIndex
			this.$data.$_addAcAndEdit.handleAddxfNode('handleAddxfNodeAss')
		},
		// 选择关联节点
		handleSelectChangeAss(selection) {
			this.selectionRow = selection
		},
		// 批量删除关联节点 WEB
		async deleteAssNodesWeb() {
			this.selectionRow.map(item => {
				let nodeList = this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList']
				nodeList = this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'].filter(sub => {
					if (item.subId == sub.subId) {
						return false
					} else {
						return true
					}
				})
			})
			if (!this.$data.$_addAcAndEdit.tableData[this.rowIndex]['handle']) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['handle'] = 'edit'
			}
			return {
				success: true
			}
		},
		// 批量删除关联节点
		async handleDeleteAssNodes() {
			if (this.selectionRow.length == 0) {
				return this.$Message.error('请选中删除的节点进行操作！')
			}
			let result = await this.deleteAssNodesWeb()
			if (result.success) {
				this.$Message.success('删除节点成功！')
			} else {
				this.$Message.error('删除节点失败！')
			}
		},
		// 删除单个设备节点 WEB
		async deleteAssNodeWeb(row, index) {
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'].splice(index, 1)
			if (!this.$data.$_addAcAndEdit.tableData[this.rowIndex]['handle']) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['handle'] = 'edit'
			}
			console.log('删除单个设备节点', this.$data.$_addAcAndEdit.tableData)
			return {
				success: true
			}
		},
		// 删除单个关联节点
		async handleDeleteAssNode(row, index) {
			this.$Modal.confirm({
				title: '警告',
				content: '确认删除该关联节点吗？',
				onOk: () => {
					this.deleteAssNodeWeb(row, index).then(result => {
						if (result.success) {
							this.$Message.success('删除关联节点成功！')
						} else {
							this.$Message.error('删除关联节点失败！')
						}
					})
				}
			})
		},
		// 编辑状态关联节点信息输入
		handleEdit(row, index) {
			this.assNodeEdit = row.assNode
			this.fconfigValueEdit = parseFloat(row.fconfigValue)
			this.vcTransDescEdit = row.vcTransDesc
			this.editIndex = index
		},
		// 取消节点编辑
		handleCancelEdit(row, index) {
			this.editIndex = -1
		},
		// 编辑输入信息
		handleEditInput(index, key, iview) {
			if (this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].mathType != 0 && !iview) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fmathParamError = '选择计算方式后，计算参数不能为空！'
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].fmathParamError = '选择计算方式后，计算参数不能为空！'
				this.$data.$_addAcAndEdit.lastEditAssNodeParamError = true
			} else {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fmathParamError = ''
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].fmathParamError = ''
				this.$data.$_addAcAndEdit.lastEditAssNodeParamError = false
			}

			this.editAssNodesWeb()
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index][key] = iview
			this.$set(this.$data.$_addAcAndEdit.tableData[this.rowIndex], '_expanded', true)
		},
		// 编辑配置值
		handleEditFconfigValue(index, iview) {
			this.editAssNodesWeb()
			if (iview) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fconfigValue = iview.value
			} else {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fconfigValue = ''
			}

			this.$set(this.$data.$_addAcAndEdit.tableData[this.rowIndex], '_expanded', true)
		},
		// 编辑计算方式
		handleEditMathType(index, iview, isMark) {
			if (iview != 0 && !this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fmathParam) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fmathParamError = '选择计算方式后，计算参数不能为空！'
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].fmathParamError = '选择计算方式后，计算参数不能为空！'
				this.$data.$_addAcAndEdit.lastEditAssNodeParamError = true
			} else {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fmathParamError = ''
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].fmathParamError = ''
				this.$data.$_addAcAndEdit.lastEditAssNodeParamError = false
			}

			isMark && this.editAssNodesWeb()
			if (iview) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].mathType = iview
			} else {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].mathType = ''
			}
			this.$set(this.$data.$_addAcAndEdit.tableData[this.rowIndex], '_expanded', true)
		},
		// 实时验证值转换规则
		verifyVcTransDesc({ value }) {
			// 验证格式
			let blankNum = 0
			let verticalNum = 0
			for (var i = 0; i < value.length; i++) {
				if (value.charAt(i) == ' ') blankNum++
				if (value.charAt(i) == '|') verticalNum++
			}

			// 验证转换数据是否匹配数量
			let arrByVertical = value.split('|')
			let arrByBlank = []
			arrByVertical.forEach(item => {
				arrByBlank.push(item.split(' ')[0])
				arrByBlank.push(item.split(' ')[1])
			})
			let isMatching = true
			arrByBlank.forEach(item => {
				if (!item) {
					isMatching = false
				}
				if (!/^[0-9]+.?[0-9]*$/.test(item)) {
					isMatching = false
				}
			})

			// 验证数据格式是否为数字
			let NaNType = 0
			let arrByBlankString = arrByBlank.join('')
			for (var j = 0; j < arrByBlankString.length; j++) {
				if (arrByBlankString.charAt(j) != '.') {
					if (!/^[0-9]+.?[0-9]*$/.test(arrByBlankString.charAt(j))) {
						NaNType++
					}
				}
			}

			// 校验数量 浮点数类型校验
			if (isMatching == false) {
				return false
			}
			// 校验格式
			if (blankNum - verticalNum != 1) {
				return false
			} else {
				// INT类型校验
				if (NaNType > 0) {
					return false
				} else {
					return true
				}
			}
		},
		// 编辑值转换规则
		handleEditVcTransDesc(index, { target }) {
			if (this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransBoolean && !target.value) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = '开启值转换后，转换规则不能为空！'
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = '开启值转换后，转换规则不能为空！'
				this.$data.$_addAcAndEdit.lastEditAssNodeDescError = true
			} else if (target.value) {
				if (!this.verifyVcTransDesc(target)) {
					this.vcTransDescError = '转换规则格式错误!'
					this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = '转换规则格式错误'
					this.$data.$_addAcAndEdit.lastEditAssNodeDescError = true
				} else {
					this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = ''
					this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = ''
					this.$data.$_addAcAndEdit.lastEditAssNodeDescError = false
				}
			} else {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = ''
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = ''
				this.$data.$_addAcAndEdit.lastEditAssNodeDescError = false
			}

			this.editAssNodesWeb()
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDesc = target.value
			this.$set(this.$data.$_addAcAndEdit.tableData[this.rowIndex], '_expanded', true)
		},
		// 编辑值转换
		handleEditNodeValueTransform(index, iview, isMark) {
			if (iview && !this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDesc) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = '开启值转换后，转换规则不能为空！'
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = '开启值转换后，转换规则不能为空！'
				this.$data.$_addAcAndEdit.lastEditAssNodeDescError = true
			} else if (this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDesc) {
				// 验证格式
				let temp = {
					value: this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDesc
				}
				if (!this.verifyVcTransDesc(temp)) {
					this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = '转换规则格式错误!'
					this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = '转换规则格式错误!'
					this.$data.$_addAcAndEdit.lastEditAssNodeDescError = true
				} else {
					this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = ''
					this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = ''
					this.$data.$_addAcAndEdit.lastEditAssNodeDescError = false
				}
			} else {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDescError = ''
				this.$data.$_addAcAndEdit.tableData[this.rowIndex].vcTransDescError = ''
				this.$data.$_addAcAndEdit.lastEditAssNodeDescError = false
			}

			let current = {
				iisTransValue: 0,
				label: '',
				iisTransBoolean: false
			}
			if (iview) {
				current.iisTransValue = 1
				current.iisTransBoolean = true
				current.label = '是'
			} else {
				current.iisTransValue = 0
				current.iisTransBoolean = false
				current.label = '否'
			}
			isMark && this.editAssNodesWeb()
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransValue = current.iisTransValue
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransBoolean = current.iisTransBoolean
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].iisTransName = current.label
			this.$set(this.$data.$_addAcAndEdit.tableData[this.rowIndex], '_expanded', true)
		},
		// 编辑关联节点 WEB
		async editAssNodesWeb() {
			if (!this.$data.$_addAcAndEdit.tableData[this.rowIndex]['handle']) {
				this.$data.$_addAcAndEdit.tableData[this.rowIndex]['handle'] = 'edit'
			}
		},
		// 保存节点行数据
		async handleSave(index) {
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].assNode = this.assNodeEdit
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].fconfigValue = parseFloat(this.fconfigValueEdit)
			this.$data.$_addAcAndEdit.tableData[this.rowIndex]['devNodesExtDtoList'][index].vcTransDesc = this.vcTransDescEdit
			this.editIndex = -1
			let result = await this.editAssNodesWeb(this.rowData[index])
			if (result.success) {
				this.$Message.success('修改成功！')
			} else {
				this.$Message.error('修改失败！')
			}
		},
		// 获取配置值字典码
		getFValueList(descInfo) {
			let fValueList = []
			if (descInfo) {
				let arr = descInfo.split('|') || []
				for (var i = 0; i < arr.length; i++) {
					let key = arr[i].split(' ')[0]
					let label = arr[i].split(' ')[1]
					fValueList.push({
						id: key,
						label: label
					})
				}
			}
			return fValueList
		}
	}
}
</script>
<style lang="stylus" scoped>
.table-expand {
	display: flex;
	justify-content: flex-start !important;
	.ass-nodes {
		overflow: auto;
		display: flex;
		justify-content: flex-start !important;
		/deep/ .ivu-card {
			width: 365px;
			min-width: 250px;
			margin-left: 10px;
			.ivu-card-head {
				> p {
					width: 280px;
					overflow: initial;
					text-overflow: initial;
					white-space: initial;
				}
			}
		}
	}
	.add {
		margin-left: 10px;
	}
	/deep/ .ivu-btn-warning {
		background: #fff !important;
	}
}
</style>
