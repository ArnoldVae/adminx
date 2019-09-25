<template>
	<div class="table-expand">
		<Button size="small" type="error" icon="md-trash" class="delete" @click="handleDeleteDicts">批量删除</Button>
		<Table border highlight-row :columns="columns" :data="rowData" height="500" @on-selection-change="handleSelectionChange">
			<template slot-scope="{ row }" slot="isEnabled">
				<span v-if="row.isEnabled == 1" :style="{ color: '#19be6b' }">启用</span>
				<span v-if="row.isEnabled == 0" :style="{ color: '#ff9900' }">停用</span>
			</template>
			<template slot-scope="{ row }" slot="action">
				<Button size="small" type="error" icon="ios-trash" class="delete" @click="handleDeleteDict(row)">删除</Button>
			</template>
		</Table>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'table-expand',
	props: {
		rowData: Array,
		rowGroupId: String
	},
	data() {
		return {
			$_dataDict: null,
			// 表格相关
			columns: [
				{ type: 'selection', width: 60, align: 'center' },
				{ title: '任务名称', key: 'taskName', align: 'center', tooltip: true },
				{ title: '任务类型', key: 'taskType', align: 'center' },
				{ title: '任务计划', key: 'planName', align: 'center', tooltip: true },
				{ title: '更新时间', key: 'updateTime', align: 'center' },
				{ title: '状态', slot: 'isEnabled', align: 'center' },
				{ title: '备注', key: 'vc_Memo', align: 'center' },
				{ title: '操作', slot: 'action', align: 'center' }
			],
			selectRow: [],
			axios: this.$api.systemsManage.taskingConfig
		}
	},
	created() {
		this.$_dataDict = findComponentUpward(this, 'tasking-config')
	},
	methods: {
		// 单个删除
		handleDeleteDict(row) {
			let delTask = {
				groupId: this.rowGroupId,
				taskList: [{ taskId: row.taskId }]
			}
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认删除该任务组</p>`,
				onOk: () => {
					this.axios.delTaskGroupInclude(delTask).then(res => {
						if (res.code == 200) {
							this.$Message.success('删除成功')
							this.$_dataDict.getPageTableData()
						}
					})
				}
			})
		},
		// 批量删除
		handleDeleteDicts() {
			let taskIdArr = []
			this.selectRow.forEach(item => {
				taskIdArr.push({
					taskId: item.taskId
				})
			})
			this.$Modal.confirm({
				title: '确认',
				content: `<p>是否确认删除该任务组</p>`,
				onOk: () => {
					this.axios.delTaskGroupInclude({ groupId: this.rowGroupId, taskList: taskIdArr }).then(res => {
						if (res.code == 200) {
							this.$Message.success('删除成功')
							this.selectRow = []
							this.$_dataDict.getPageTableData()
						}
					})
				}
			})
		},
		handleSelectionChange(val) {
			this.selectRow = val
		}
	}
}
</script>
<style lang="stylus" scoped>
.table-expand {
    overflow-y: auto;
    .add,.delete {
        margin: 5px
    }
    .ivu-table-wrapper {
        height: initial!important;
        /deep/ .ivu-table-body,
        /deep/ .ivu-table-overflowY,
        /deep/ .ivu-table-tip,
        /deep/ .ivu-table-tip td {
            height: initial!important;
        }
        /deep/ .ivu-table-tip,
        /deep/ .ivu-table-tip td {
            height: 48px!important;
        }
    }
}
</style>
