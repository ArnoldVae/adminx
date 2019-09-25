import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 获取运维班树
	getTreeList(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	// 保存设备类型
	saveSmType(params) {
		return axios.request({
			url: 'smType/smType_save',
			method: 'post',
			data: params
		})
	},
	// 修改设备类型
	upSmType(params) {
		return axios.request({
			url: 'smType/smType_update',
			method: 'post',
			data: params
		})
	},
	// 查询设备类型
	getSmType(params) {
		return axios.request({
			url: 'smType/smType_list',
			method: 'post',
			data: params
		})
	},
	// 查询模型列表
	getDevType(params) {
		return axios.request({
			url: 'dev_type/find',
			method: 'post',
			data: params
		})
	}
}
