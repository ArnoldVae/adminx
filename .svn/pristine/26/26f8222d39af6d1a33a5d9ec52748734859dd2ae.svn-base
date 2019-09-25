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
	// 获取列表
	getDtuList(params) {
		return axios.request({
			url: 'dtu/dtu_list',
			method: 'post',
			data: params
		})
	},
	// 获取列表 (增加了两个字段)
	getDtuListPlus(params) {
		return axios.request({
			url: 'dtu/dtuUnitEmq_list',
			method: 'post',
			data: params
		})
	},
	// 修改网关
	upDut(params) {
		return axios.request({
			url: 'dtu/dtu_update',
			method: 'post',
			data: params
		})
	}
}
