import axios from '@/config/api.request'

export default {
	// 获取变电站树
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	// 查询服务类型（新增协议）
	findServiceType(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: params
		})
	},
	// 查询服务列表
	findServiceListData(params) {
		return axios.request({
			url: 'asservice/selectbyConditionPage',
			method: 'post',
			data: params
		})
	},
	// 新增
	addService(params) {
		return axios.request({
			url: 'asservice/add',
			method: 'post',
			data: params
		})
	},
	// 修改
	changeService(params) {
		return axios.request({
			url: 'asservice/update',
			method: 'post',
			data: params
		})
	},
	// 删除
	delService(params) {
		return axios.request({
			url: 'asservice/delete',
			method: 'post',
			data: params
		})
	}
}
