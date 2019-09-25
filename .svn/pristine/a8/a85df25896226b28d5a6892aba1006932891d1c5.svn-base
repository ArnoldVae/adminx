import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 测试
	test(params) {
		return axios.request({
			url: 'scene/find_tree_scene',
			method: 'post',
			data: qs.stringify(params)
		})
	},
	// 获取图纸
	getHt(params) {
		return axios.request({
			url: params,
			method: 'get'
		})
	},
	// 编辑页面
	// getEditor(params) {
	// 	return axios.request({
	// 		url: 'equpment/find_equipment',
	// 		method: 'post',
	// 		data: params
	// 	})
	// },
	getEditor(params) {
		return axios.request({
			url: 'htp/find_htp_source',
			method: 'post',
			data: params
		})
	},

	// 视频
	getVideo(params) {
		return axios.request({
			url: 'htp/find_video/' + params,
			method: 'post'
			// data: params
		})
	},
	// 场景
	getScene(params) {
		return axios.request({
			url: 'htp/find_scene/' + params,
			method: 'post'
			// data: params
		})
	},
	// 设备
	getDev(params) {
		return axios.request({
			url: 'htp/find_dev/' + params,
			method: 'post'
			// data: params
		})
	},
	// 获取设备模型
	getDevModel(params) {
		return axios.request({
			url: 'htp/find_devType/' + params,
			method: 'post'
		})
	},
	// 根据模型获取设备
	getDevSon(params) {
		return axios.request({
			url: 'htp/find_devByTypeId/' + params,
			method: 'post'
		})
	},
	// 获取配置页面的场景 设备
	geSvgEquipment() {
		return axios.request({
			url: 'htp/',
			method: 'post',
			data: params
		})
	},
	// 获取图纸信息 find_htp_age
	getSvgPaperInfo(params) {
		return axios.request({
			url: 'htp/find_htp_age',
			method: 'post',
			data: params
		})
	},
	// 获取保存图纸 save_htp_age
	getSvgPaperSave(params, config) {
		return axios.request({
			url: 'htp/save_htp_age',
			method: 'post',
			config: config,
			data: params
		})
	},
	// 修改图纸信息 update_htp_age
	getSvgPaperUpData(params, config) {
		return axios.request({
			url: 'htp/update_htp_age',
			method: 'post',
			config: config,
			data: params
		})
	},
	// 删除图纸信息 del_htp_age
	getSvgPaperDele(params) {
		return axios.request({
			url: 'htp/del_htp_age/' + params,
			method: 'delete'
		})
	},
	// 获取图元信息 find_htp_nodes
	getSvgNodeInfo(params) {
		return axios.request({
			url: 'htp/find_htp_nodes',
			method: 'post',
			data: params
		})
	},
	// getSvgNodeInfo(params) {
	// 	return axios.request({
	// 		url: 'htp/find_htp_source',
	// 		method: 'post',
	// 		data: params
	// 	})
	// },

	// 保存图元  save_htp_nodes
	getSvgNodeSaveInfo(params) {
		return axios.request({
			url: 'htp/save_htp_nodes',
			method: 'post',
			data: params
		})
	},
	// 修改图元信息   update_htp_nodes
	getSvgNodeUpData(params) {
		return axios.request({
			url: 'htp/update_htp_nodes',
			method: 'post',
			data: params
		})
	},
	// 删除图元信息   del_htp_nodes
	getSvgNodeDele(params) {
		return axios.request({
			url: 'htp/del_htp_nodes',
			method: 'post',
			data: params
		})
	},
	getNode() {
		return axios.request({
			url: 'localdata/node.json',
			method: 'get'
		})
	},
	// 获取站点树
	getUnitTree(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	}
}
