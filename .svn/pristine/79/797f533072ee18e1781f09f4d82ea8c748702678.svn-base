import axios from '@/config/api.request'

export default {
	// 获取树形 表格数据
	getTreeInfoList(params) {
		return axios.request({
			url: 'sys_module/find_module_tree',
			method: 'post',
			data: params
		})
	},
	// 添加 or 修改 模块
	addOrEditModuleRequest(params) {
		return axios.request({
			url: 'sys_module/save_module',
			method: 'post',
			data: params
		})
	},

	// 获取单个模块 信息
	getModuleInfo(params) {
		return axios.request({
			url: 'module/find_module',
			method: 'post',
			data: params
		})
	},

	// 删除模块
	deleteModule(params) {
		return axios.request({
			url: 'sys_module/del_module',
			method: 'post',
			data: params
		})
	},

	// 模块组 -----------------------
	// 添加 || 修改 模块组
	addOrEditModuleGroup(params) {
		return axios.request({
			url: 'sys_module/save_module_group',
			method: 'post',
			data: params
		})
	},
	// 删除模块组
	deleteModuleGroup(params) {
		return axios.request({
			url: 'sys_module/del_module_group',
			method: 'post',
			data: params
		})
	},

	// 修改 模块 || 模块组的状态
	changeModuleOrGroupStatus(params) {
		return axios.request({
			url: 'sys_module/moduleIsEnable',
			method: 'post',
			data: params
		})
	},

	// 获取 属性模块组 sys_module/find_group_tree
	getTreeModuleGroup(params) {
		return axios.request({
			url: 'sys_module/find_group_tree',
			method: 'post',
			data: params
		})
	}
}
