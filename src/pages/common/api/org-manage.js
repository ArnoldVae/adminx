import axios from '@/config/api.request'

export default {
	// 获取组织结构 树
	getOrgTreeData(params) {
		return axios.request({
			url: 'org/find_org_tree',
			method: 'post',
			data: params
		})
	},
	// 新增 org/save_org
	addOrg(params) {
		return axios.request({
			url: 'org/save_org',
			method: 'post',
			data: params
		})
	},
	// 修改
	editOrg(params) {
		return axios.request({
			url: 'org/update_org',
			method: 'post',
			data: params
		})
	},
	// 删除 orgdel_org
	deleteOrg(params) {
		return axios.request({
			url: 'org/del_org',
			method: 'post',
			data: params
		})
	},

	// 获取站所组织结构字典
	getOrgDict(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: params
		})
	}
}
