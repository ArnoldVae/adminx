import axios from '@/config/api.request'

export default {
	// 获取站点树
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	//防区列表
	getareaList(params) {
		return axios.request({
			url: 'protectarea/list',
			method: 'post',
			data: params
		})
	},
	//子系统
	getSubList(params) {
		return axios.request({
			url: 'sys_dict/group/find_list',
			method: 'post',
			data: params
		})
	},
	//节点列表
	getSubNodeList(params) {
		return axios.request({
			url: 'firFlowchart/fireFlowchart_list',
			method: 'post',
			data: params
		})
	},
	//所以节点
	getNodeDatas(params) {
		return axios.request({
			url: 'fire_nodeinfo/findEx/fireNodeQryList',
			method: 'post',
			data: params
		})
	},
	//保存数据
	saveNodeData(params) {
		return axios.request({
			url: 'firFlowchart/fireFlowchart_save',
			method: 'post',
			data: params
		})
	},
	//删除节点
	deleteData(params) {
		return axios.request({
			url: 'firFlowchart/fireFlowchart_del',
			method: 'post',
			data: params
		})
	}
}
