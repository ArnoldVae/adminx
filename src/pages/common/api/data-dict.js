import axios from '@/config/api.request'

export default {
	// 获取数据字典列表
	getDataDictList(params) {
		return axios.request({
			url: 'sys_dict/group/find_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 新增数据字典组
	addDataDictList(params) {
		return axios.request({
			url: 'sys_dict/group/save',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 编辑数据字典组
	editDataDictList(params) {
		return axios.request({
			url: 'sys_dict/group/update',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 删除数据字典组
	deleteDataDictList(params) {
		return axios.request({
			url: 'sys_dict/group/del',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 新增数据字典
	addDataDict(params) {
		return axios.request({
			url: 'sys_dict/data/save',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 删除数据字典
	deleteDataDict(params) {
		return axios.request({
			url: 'sys_dict/data/ids/del',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 编辑数据字典
	editDataDict(params) {
		return axios.request({
			url: 'sys_dict/data/update',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
