import axios from '@/config/api.request'

export default {
	// 获取所有的设备类型 /dev_type/find
	getDevTypeList(params) {
		return axios.request({
			url: 'dev_type/find',
			method: 'post',
			data: params
		})
	},
	//  新建设备类型
	addDevType(params) {
		return axios.request({
			url: 'dev_type/save',
			method: 'post',
			data: params
		})
	},
	// 修改设备类型
	editDevType(params) {
		return axios.request({
			url: 'dev_type/update',
			method: 'post',
			data: params
		})
	},
	// 删除设备类型
	deleteDevType(params) {
		return axios.request({
			url: 'dev_type/del',
			method: 'post',
			data: params
		})
	},
	// 获取所有子系统列表
	getAllSubsystemList(params) {
		return axios.request({
			url: 'sub_system/find',
			method: 'post',
			data: params
		})
	},
	// 获取设备类型关联的子系统
	getDevTypeRelevancySub(params) {
		return axios.request({
			url: 'dev_type/sub_system/find',
			method: 'post',
			data: params
		})
	},
	// 设备类型关联子系统
	devTypeRelevancySub(params) {
		return axios.request({
			url: 'dev_type/sub_system/link',
			method: 'post',
			data: params
		})
	},

	// 查询设备类型功能列表
	getDevTypeFuntionList(params) {
		return axios.request({
			url: 'dev_type/dev_fun/find',
			method: 'post',
			data: params
		})
	},

	// 修改设备类型功能列表
	editDevTypeFunction(params) {
		return axios.request({
			url: 'dev_function/modify',
			method: 'post',
			data: params
		})
	},
	saveDevTable(params) {
		return axios.request({
			url: 'dev_function/save',
			method: 'post',
			data: params
		})
	},
	upDevTable(params) {
		return axios.request({
			url: 'dev_function/update',
			method: 'post',
			data: params
		})
	},
	delDevTable(params) {
		return axios.request({
			url: 'dev_function/del',
			method: 'post',
			data: params
		})
	},
	findDicList(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: params
		})
	},
	//展示形式列表查询
	findMoudleList(params) {
		return axios.request({
			url: 'dev_type/findDevTypeShowModes',
			method: 'post',
			data: params
		})
	},
	saveMoudle(params) {
		return axios.request({
			url: 'dev_type/saveDevTypeShowMode',
			method: 'post',
			data: params
		})
	},
	uploadMoudle(params) {
		return axios.request({
			url: 'dev_type/updateDevTypeShowModes',
			method: 'post',
			data: params
		})
	},
	delMoudle(params) {
		return axios.request({
			url: 'dev_type/delDevTypeShowMode',
			method: 'post',
			data: params
		})
	}
}
