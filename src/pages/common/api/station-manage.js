import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 测试
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
	// 获取站点列表
	getStationList(params) {
		return axios.request({
			url: 'station/station_list',
			method: 'post',
			data: params
		})
	},
	// 根据ID获取站点列表
	getStationById(params) {
		return axios.request({
			url: 'station/get_station',
			method: 'post',
			data: params
		})
	},

	// 新增变电站
	saveStation(params) {
		return axios.request({
			url: 'station/save_station',
			method: 'post',
			data: params
		})
	},
	// 修改变电站
	updateStation(params) {
		return axios.request({
			url: 'station/update_station',
			method: 'post',
			data: params
		})
	},
	// 删除变电站
	delStation(params) {
		return axios.request({
			url: 'station/del_station',
			method: 'post',
			data: params
		})
	},
	// 接入站所--获取变电站
	getStation(params) {
		return axios.request({
			// url: 'dtu/dtu_list',
			url: 'dtu/dtu_noparamlist',
			method: 'post',
			data: params
		})
	},
	// 接入站所
	linkStation(params) {
		return axios.request({
			url: 'station/access_unit',
			method: 'post',
			data: params
		})
	},
	// 查询字典数据列表
	findDicList(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: params
		})
	}
}
