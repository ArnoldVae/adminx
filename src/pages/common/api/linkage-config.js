import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 获取运维班树
	getTreeList(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	// 获取子系统设备树
	getLinkTree(params) {
		return axios.request({
			url: 'sub_system/tree',
			method: 'post',
			data: params
		})
	},
	// 获取场景树
	getSceneTree(params) {
		return axios.request({
			url: 'scene/find_scene_tree',
			method: 'post',
			data: params
		})
	},
	// 根据条件查询联动列表
	getLinkTableByType(params) {
		return axios.request({
			url: 'link/get_link_nodes',
			method: 'post',
			data: params
		})
	},
	// 新增保存联动
	addSaveLink(params) {
		return axios.request({
			url: 'link/add_link',
			method: 'post',
			data: params
		})
	},
	// 修改保存联动
	upSaveLink(params) {
		return axios.request({
			url: 'link/update_link',
			method: 'post',
			data: params
		})
	},
	// 删除主表联动
	delLink(params) {
		return axios.request({
			url: 'link/delete_link/' + params,
			method: 'delete'
		})
	},
	// 删除子表联动
	delSubLink(params) {
		return axios.request({
			url: 'link/delete_node',
			method: 'post',
			data: params
		})
	},
	// 获取电视墙解码服务
	getService() {
		return axios.request({
			url: 'link/get_service',
			method: 'get'
		})
	}
}
