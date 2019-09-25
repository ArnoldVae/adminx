import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 获取树
	getTreeList(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	getTableList(params) {
		return axios.request({
			url: 'node/nodeNotCfg_list',
			method: 'post',
			data: params
		})
	}
}
