import axios from '@/config/api.request'
import qs from 'qs'

export default {
	//
	test(params) {
		return axios.request({
			url: 'scene/find_tree_scene',
			method: 'post',
			data: qs.stringify(params)
		})
	},
	// 获取组织树
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},

	// 新增配电所
	saveStation(params) {
		return axios.request({
			url: 'dstation/insert',
			method: 'post',
			data: params
		})
	},
	// 修改配电所
	updateStation(params) {
		return axios.request({
			url: 'dstation/update',
			method: 'post',
			data: params
		})
	},
	// 删除配电所
	delStation(params) {
		return axios.request({
			url: 'dstation/del',
			method: 'post',
			data: params
		})
	},
	// 获取配电所
	getStationList(params) {
		return axios.request({
			url: 'dstation/find',
			method: 'post',
			data: params
		})
	}
}
