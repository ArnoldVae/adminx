import axios from '@/config/api.request'

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
	// 上传文件
	uploadFile(params, config) {
		return axios.request({
			url: 'fire_nodeinfo/excel/import',
			method: 'post',
			config: config,
			// headers:config.header,
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
	},
	// 获取文件列表
	getDataList(params) {
		return axios.request({
			url: 'fire_nodeinfo/excelInfo/find',
			method: 'post',
			data: params
		})
	},
	upTableData(params) {
		return axios.request({
			url: 'fire_nodeinfo/excelInfo/update',
			method: 'post',
			data: params
		})
	}
}
