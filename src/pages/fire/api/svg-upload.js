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
	// 上传SVG图片
	uploadSvg(params, config) {
		return axios.request({
			url: 'svg/upload',
			method: 'post',
			config: config,
			// headers:config.header,
			data: params
		})
	},
	// 请求图片列表
	getSvgList(params) {
		return axios.request({
			url: 'svg/list',
			method: 'post',
			data: params
		})
	},
	// 删除SVG
	removeSvg(params) {
		return axios.request({
			url: 'svg/del',
			method: 'post',
			data: params
		})
	}
}
