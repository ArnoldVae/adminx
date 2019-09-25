import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 测试
	test(params) {
		// return axios.post("scene/find_tree_scene"), qs.stringify(params)
		return axios.request({
			url: 'scene/find_tree_scene',
			method: 'post',
			data: qs.stringify(params)
		})
	},
	// 请求列表数据
	getConfig(params) {
		return axios.request({
			url: 'sys_config/find_config',
			method: 'post',
			data: params
		})
	},
	// 新增和修改配置
	saveConfig(params) {
		return axios.request({
			url: 'sys_config/save_config',
			method: 'post',
			data: params
		})
	},
	// 删除配置
	removeConfig(params) {
		return axios.request({
			url: 'sys_config/del_config',
			method: 'post',
			data: params
		})
	}
}
