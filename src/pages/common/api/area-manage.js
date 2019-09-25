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
	// 获取站点树
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	// 查询区域列表
	getAreaTable(params) {
		return axios.request({
			url: 'area/area_list',
			method: 'post',
			data: params
		})
	},
	// 新增区域列表
	saveArea(params) {
		return axios.request({
			url: 'area/save_area',
			method: 'post',
			data: params
		})
	},
	// 修改区域列表
	upArea(params) {
		return axios.request({
			url: 'area/update_area',
			method: 'post',
			data: params
		})
	},
	// 删除区域列表
	delArea(params) {
		return axios.request({
			url: 'area/del_area',
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
