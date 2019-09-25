import axios from '@/config/api.request'
export default {
	// 获取变电站列表
	getList(params) {
		return axios.request({
			url: 'devNode/findDevNodesInfo2',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取新增节点列表
	getNodeList(params) {
		return axios.request({
			url: 'devNode/findDevNodesNextDto',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取编辑节点列表
	getUpdateNodeList(params) {
		return axios.request({
			url: 'devNode/findDevNodesNextDtoModify',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取环境属性
	getEnvAttr(params) {
		return axios.request({
			url: 'as_dictB/data/find_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 删除
	delEnvConfig(params) {
		return axios.request({
			url: 'devNode/deleteAsUnitenvironmentById',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 保存新增
	addEnvConfig(params) {
		return axios.request({
			url: 'devNode/insertDevNodes',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 保存编辑
	editEnvConfig(params) {
		return axios.request({
			url: 'devNode/updateAsUnitenvironment',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 编辑时数据回显
	getDetailEnvConfig(params) {
		return axios.request({
			url: 'devNode/findDevNodesNextDtoModifyBf',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取组织树
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	}
}
