import axios from '@/config/api.request'

export default {
	// 获取站点树
	getVideoList(params) {
		return axios.request({
			url: '/sub_system/tree',
			method: 'post',
			data: params
		})
	},
	// 获取地区配置列表
	getConfigAreaList(params) {
		return axios.request({
			url: '/fire_nodeinfo/node_list',
			method: 'post',
			data: params
		})
	},
	// 获取地区配置列表
	getRowData(params) {
		return axios.request({
			url: '/fire_nodeinfo/node_data',
			method: 'post',
			data: params
		})
	},
	// 信息提交
	configSubmit(params) {
		return axios.request({
			url: '/fire_nodeinfo/cfg_link_node',
			method: 'post',
			data: params
		})
	}
}
