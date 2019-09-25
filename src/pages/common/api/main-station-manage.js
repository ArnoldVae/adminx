import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 新增主站
	saveMainStation(params) {
		return axios.request({
			url: 'mainStation/save_main',
			method: 'post',
			data: params
		})
	},
	// 修改主站
	upMainStation(params) {
		return axios.request({
			url: 'mainStation/update_main',
			method: 'post',
			data: params
		})
	},
	// 删除主站
	delMainStation(params) {
		return axios.request({
			url: 'mainStation/del_main/' + params,
			method: 'delete'
			// data: params
		})
	},
	// 获取主站列表
	getMainStation(params) {
		return axios.request({
			url: 'mainStation/getAll_main',
			method: 'post',
			data: params
		})
	}
}
