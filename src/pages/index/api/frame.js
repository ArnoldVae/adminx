// import axios from '@/config/api.request'

export default {
	// 获取模块
	getPageModule(params) {
		return axios.request({
			url: 'sys_module/getRoot',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取系统参数
	getSystemParameter(params) {
		return axios.request({
			url: 'sys_config/find_config',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取log参数
	getLogParameter(params) {
		return axios.request({
			url: 'sys_config/find_config',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
