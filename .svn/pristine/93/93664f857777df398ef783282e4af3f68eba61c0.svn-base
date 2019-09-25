import axios from '@/config/api.request'
// import axiosnet from '@/libs/api.net.request'

export default {
	// 获取业务树 树形
	getBusinessTree(params) {
		return axios.request({
			url: 'bll/bll_firstlist',
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
	// 新增业务树 bll/save_bll
	addBusTree(params) {
		return axios.request({
			url: 'bll/save_bll',
			method: 'post',
			data: params
		})
	},
	// 编辑业务树
	editBusTree(params) {
		return axios.request({
			url: 'bll/update_bll',
			method: 'post',
			data: params
		})
	},
	//  删除业务树节点 bll/del_bll
	deleteBusTree(params) {
		return axios.request({
			url: `bll/del_bll/${params}`,
			method: 'delete'
			// params
		})
	},
	// 导入设备
	importDev(params) {
		return axios.request({
			url: 'bll/import_bll',
			method: 'post',
			data: params
		})
	},
	// 根据区域相位查询层级
	getHierarchyData(params) {
		return axios.request({
			url: 'bll/bll_datalist',
			method: 'post',
			data: params
		})
	},
	// 删除区域相位节点
	deleteAreaNode(params) {
		return axios.request({
			url: `bll/del_bll/${params}`,
			method: 'delete'
			// data:
		})
	},
	// 获取设备节点信息
	getDeviceNodes(params) {
		return axios.request({
			url: 'dev_info/get',
			method: 'post',
			data: params
		})
	},
	// 获取主类型
	getMainList(params) {
		return axios.request({
			url: '',
			method: 'post',
			data: params
		})
	},
	// 获取子类型
	getSubList(params) {
		return axios.request({
			url: '',
			method: 'post',
			data: params
		})
	},
	// 获取字典码公共接口
	getDictList(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: JSON.stringify(params)
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
	// 获取区域信息的详情
	getAreaInfo(params) {
		return axios.request({
			url: 'area/area_list',
			method: 'post',
			data: params
		})
	},
	// 编辑区域
	editAreaInfo(params) {
		return axios.request({
			url: 'area/update_area',
			method: 'post',
			data: params
		})
	},
	// 删除设备的节点
	editDeviceNode(params) {
		return axios.request({
			url: 'dev_node/del',
			method: 'post',
			data: params
		})
	},
	// 更新treeNode
	updateTreeNode(params) {
		return axios.request({
			url: 'bll/update_bll',
			method: 'post',
			data: params
		})
	},
	updateNodeInfo(params) {
		return axios.request({
			url: 'dev_node/update',
			method: 'post',
			data: params
		})
	},
	// 合并设备节点
	mergeDeviceNodes(params) {
		return axios.request({
			url: 'dev_node/mergeDevNodes',
			method: 'post',
			data: params
		})
	},
	//刷新JSON
	refreshJson(params) {
		return axios.request({
			url: 'bll/bll_listjsonfile',
			method: 'post',
			data: params
		})
	}
}
