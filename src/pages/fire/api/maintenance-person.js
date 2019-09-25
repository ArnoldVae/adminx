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
	
	//获取维保变电站表格数据
	getUnitList(params) {
		return axios.request({
			url: 'maintenance/co/workunit_list',
			method: 'post',
			data: params
		})
	},

	//维保变电站删除
	delUnitList(params) {
		return axios.request({
			url: 'maintenance/co/workunit_del',
			method: 'post',
			data: params
		})
	},
	//维保变电站添加
	addUnitList(params) {
		return axios.request({
			url: 'maintenance/co/workunit_saveOrUpdate',
			method: 'post',
			data: params
		})
	},

	// 获取树结构
	getTreeData(params) {
		return axios.request({
			url: 'sys/dept/tree',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	
	// 获取维保单位维保人员
	getMaintenancePerson(params) {
		return axios.request({
			url: 'maintenance/co/user_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取表格数据
	getTableList(params) {
		return axios.request({
			url: 'maintenance/co/page',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 新增维保单位
	addMaintenanceDate(params) {
		return axios.request({
			url: 'maintenance/co/saveOrUpdate',
			method: 'post',
			data: JSON.stringify(params)
			// data:params
		})
	},
	// 删除维保单位
	delMaintenanceDate(params) {
		return axios.request({
			url: 'maintenance/co/del_co',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// headers: { 'Content-type': 'application/json; charset=utf-8' },
	// 获取部门所有人员
	getPersons(params) {
		return axios.request({
			url: 'sys/dept/user',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	
	//维保人员新增
	addPerson(params) {
		return axios.request({
			url: 'maintenance/co/user_saveOrUpdate',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	
	//维保人员删除
	delPerson(params) {
		return axios.request({
			url: 'maintenance/co/user_del',
			method: 'post',
			data: JSON.stringify(params)
		})
    }
}