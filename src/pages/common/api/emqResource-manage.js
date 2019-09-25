import axios from '@/config/api.request'

export default {
	// 获取列表
	getEmqList(params) {
		return axios.request({
			url: 'emq/emq_list',
			method: 'post',
			data: params
		})
	},

	// 新增数据
	addEmqData(params) {
		return axios.request({
			url: 'emq/add_emq',
			method: 'post',
			data: params
		})
	},

	// 删除emq数据
	delEmqData(params) {
		return axios.request({
			url: 'emq/delete_emq/' + params,
			method: 'delete'
		})
	},

	// 修改emq数据
	updateEmqData(params) {
		return axios.request({
			url: 'emq/update_emq',
			method: 'post',
			data: params
		})
	}
}
