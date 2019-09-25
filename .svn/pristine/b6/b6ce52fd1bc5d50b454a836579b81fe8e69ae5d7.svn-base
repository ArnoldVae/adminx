import axios from '@/config/api.request'

export default {
	// 获取场景树 scene/find_scene_tree
	getSceneTree(params) {
		return axios.request({
			url: 'scene/find_scene_tree',
			method: 'post',
			data: params
		})
	},
	// 新增场景组织
	addSceneOrg(params) {
		return axios.request({
			url: 'scene/save_scene_org',
			method: 'post',
			data: params
		})
	},
	// 获取单个 场景组织 信息
	getSceneOrgInfo(params) {
		return axios.request({
			url: `scene/find_org_byId/${params}`,
			method: 'get'
		})
	},
	// 修改场景组织信息
	editSceneOrg(params) {
		return axios.request({
			url: 'scene/update_scene_org',
			method: 'post',
			data: params
		})
	},
	// 删除场景组织
	deleteSceneOrg(params) {
		return axios.request({
			url: `scene/del_scene_org/${params}`,
			method: 'delete'
		})
	},

	// 获取设备树信息
	getDevTreeByUnitId(params) {
		return axios.request({
			url: 'scene/find_dev_tree',
			method: 'post',
			data: params
		})
	},

	// 获取场景信息
	getSceneData(params) {
		return axios.request({
			url: 'scene/scene_list',
			method: 'post',
			data: params
		})
	},

	// 新增场景 信息
	addSceneInfo(params) {
		return axios.request({
			url: 'scene/save_scene_dev',
			method: 'post',
			data: params
		})
	},
	// 获取场景下的 设备信息
	// getSceneDevList(params) {
	// 	return axios.request({
	// 		url: `scene/find_scene_dev/${params}`,
	// 		method: 'get'
	// 		// data: params
	// 	})
	// },
	getSceneDevList(params) {
		return axios.request({
			url: 'scene/find_scene_dev',
			method: 'post',
			data: params
		})
	},
	// 修改场景
	editSceneInfo(params) {
		return axios.request({
			url: 'scene/update_scene_dev',
			method: 'post',
			data: params
		})
	},
	// 删除场景
	deleteSceneInfo(params) {
		return axios.request({
			url: `scene/del_scene_info/${params}`,
			method: 'delete'
		})
	}
}
