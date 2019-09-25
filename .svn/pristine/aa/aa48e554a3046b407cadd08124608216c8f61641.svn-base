import axios from '@/config/api.request'

export default {
	// 获取变电站树 ~~
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	// 获取下一级节点
	getNextNode(params) {
		return axios.request({
			url: 'bll/bll_firstlist',
			method: 'post',
			data: params
		})
	},
	// 获取设备信息
	getDeviceInfo(params) {
		return axios.request({
			url: 'dev_info/get',
			method: 'post',
			data: params
		})
	},
	// 获取当前业务树(节点配置) ~~
	getNdTree(params) {
		return axios.request({
			// url: 'bll/bll_list',
			url: 'bll/bll_list_node',
			method: 'post',
			data: params
		})
	},
	// 获取高清视频文件树 ~~
	getVideoTree(params) {
		return axios.request({
			url: 'tree/tree_ca',
			method: 'post',
			data: params
		})
	},
	// 添加节点业务树 ~~
	addNodeBllTree(params) {
		return axios.request({
			url: 'bll/addNodeBllTree',
			method: 'post',
			data: params
		})
	},
	// 获取鲁能文件树
	getDataTree(params) {
		return axios.request({
			url: 'tree/findLNTree',
			method: 'post',
			data: params
		})
	},
	// 获取大华文件树
	getExcleData(params) {
		return axios.request({
			url: 'tree/tree_dh',
			method: 'post',
			data: params
		})
	},
	// 鲁能上传接口
	uploadApi(params, config) {
		return axios.request({
			// url: 'tree/save_json',
			url: 'tree/importLNTree',
			method: 'post',
			headers: config,
			data: params
		})
	},
	// 大华上传接口
	uploadExcleApi(params, config) {
		return axios.request({
			url: '/tree/save_excel',
			method: 'post',
			headers: config,
			data: params
		})
	},
	// 添加区域业务树
	addAreaBllTree(params) {
		return axios.request({
			url: 'bll/addAreaBllTree',
			method: 'post',
			data: params
		})
	},
	// 获取设备类型
	getDevTypeList(params) {
		return axios.request({
			url: 'dev_type/find',
			method: 'post',
			data: params
		})
	},
	// 添加设备业务树
	addDevBllTree(params) {
		return axios.request({
			url: 'bll/addDevBllTree',
			method: 'post',
			data: params
		})
	},
	// 巡检区域表格数据
	getTableTreeData(params) {
		return axios.request({
			url: 'asarea/findAsAreaTree',
			method: 'post',
			data: params
		})
	},
	// 添加巡检区域
	addAsArea(params) {
		return axios.request({
			url: 'asarea/addAsArea',
			method: 'post',
			data: params
		})
	},
	// 获取节点配置树数据
	getNodeConfigTree(params) {
		return axios.request({
			url: 'bll/bll_list',
			method: 'post',
			data: params
		})
	},
	// 获取任务组信息
	getTaskGroupDatas(params) {
		return axios.request({
			url: 'asTaskGroup/findAsTaskGroupAll',
			method: 'post',
			data: params
		})
	},
	// 删除区域以及关联的任务组
	delTaskAreaGroup(params) {
		return axios.request({
			url: 'asarea/delTaskAreaGroup',
			method: 'post',
			data: params
		})
	},
	// 编辑区域任务组信息
	editTaskGroup(params) {
		return axios.request({
			url: 'asarea/updateTaskGroup',
			method: 'post',
			data: params
		})
	},
	// 获取下一级节点
	getNextNode(params) {
		return axios.request({
			url: 'bll/bll_firstlist',
			method: 'post',
			data: params
		})
	},
	// 获取设备信息
	getDeviceInfo(params) {
		return axios.request({
			url: 'dev_info/get',
			method: 'post',
			data: params
		})
	}
}
