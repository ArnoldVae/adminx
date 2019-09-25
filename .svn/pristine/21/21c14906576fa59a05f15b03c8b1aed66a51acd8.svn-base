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
	// 查询列表
	getEquipment(params) {
		return axios.request({
			url: 'fire_equipment/find_list',
			method: 'post',
			data: params
		})
	},
	// 保存装置
	saveEquipment(params) {
		return axios.request({
			url: 'fire_equipment/save',
			method: 'post',
			data: params
		})
	},
	// 修改装置
	updateEquipment(params) {
		return axios.request({
			url: 'fire_equipment/update',
			method: 'post',
			data: params
		})
	},
	// 删除装置
	delEquipment(params) {
		return axios.request({
			url: 'fire_equipment/del',
			method: 'post',
			data: params
		})
	}
}
