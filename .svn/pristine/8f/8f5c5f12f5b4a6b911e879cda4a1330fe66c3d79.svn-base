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
	// 查询表格列表数据
	getTableList(params) {
		return axios.request({
			url: 'fire/company/list',
			method: 'post',
			data: params
		})
	},
	// 添加/修改表格数据
	addFireDate(params) {
		return axios.request({
			url: 'fire/company/saveOrUpdate',
			method: 'post',
			data: params
		})
	},
	// 删除表格数据
	delFireDate(params) {
		return axios.request({
			url: 'fire/company/del',
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
