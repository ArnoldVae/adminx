import axios from '@/config/api.request'

export default {
	// 获取巡检区域根节点树
	getInspectionAreaTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	// 获取新增弹框表格数据
	getAddModalTableData(params) {
		return axios.request({
			url: 'asTaskGroup/findAsTaskAll',
			method: 'post',
			data: params
		})
	},
	// 获取弹框巡检类型&&子类型数据
	getModalInspectionTypeData(params) {
		return axios.request({
			url: 'as_dictB/data/find_list',
			method: 'post',
			data: params
		})
	},
	// 获取页面表格数据
	getPageTableData(params) {
		return axios.request({
			url: 'asTaskGroup/findAsTaskGroupAll',
			method: 'post',
			data: params
		})
	},
	// 新增任务组
	addTaskGroup(params) {
		return axios.request({
			url: 'asTaskGroup/addAsGroup',
			method: 'post',
			data: params
		})
	},
	// 删除任务组
	deleteTaskGroup(params) {
		return axios.request({
			url: 'asTaskGroup/delTaskGRoup',
			method: 'post',
			data: params
		})
	},
	// 删除任务组下的任务
	delTaskGroupInclude(params) {
		return axios.request({
			url: 'asTaskGroup/delTaskGroupTask',
			method: 'post',
			data: params
		})
	},
	// 编辑任务组数据
	editTaskGroupData(params) {
		return axios.request({
			url: 'asTaskGroup/updateTaskGroup',
			method: 'post',
			data: params
		})
	}
}
