import axios from '@/config/api.request'

export default {
	// 查询子系统列表
	getSubstystemList(params) {
		return axios.request({
			url: 'sub_system/find',
			method: 'post',
			data: params
		})
	},
	// 新建子系统
	addSubsystem(params) {
		return axios.request({
			url: 'sub_system/save',
			method: 'post',
			data: params
		})
	},
	// 修改子系统
	updateSubsystem(params) {
		return axios.request({
			url: 'sub_system/update',
			method: 'post',
			data: params
		})
	},
	// 删除子系统
	deleteSubsystem(params) {
		return axios.request({
			url: 'sub_system/del',
			method: 'post',
			data: params
		})
	},
	//  获取子系统关联设备类型
	getSubsystemEquType(params) {
		return axios.request({
			url: 'sub_system/dev_type/find',
			method: 'post',
			data: params
		})
	},

	// 获取所有的设备类型 /dev_type/find
	getAllDevTypeList(params) {
		return axios.request({
			url: 'dev_type/find',
			method: 'post',
			data: params
		})
	},

	// 子系统关联设备类型
	subsRelevancyEquType(params) {
		return axios.request({
			url: 'sub_system/dev_type/link',
			method: 'post',
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
	}
}
