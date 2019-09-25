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
	//防区table列表
	gettableList(params) {
		return axios.request({
			url: 'protectarea/firePrtctAreaRpInfoList',
			method: 'post',
			data: params
		})
    },
    //防区列表
    getareaList(params){
        return axios.request({
			url: 'protectarea/list',
			method: 'post',
			data: params
		})
    },
    //应急预案
    getContingency(params){
        return axios.request({
			url: 'fireRpInfo/fireRpInfoSimpleList',
			method: 'post',
			data: params
		})
    },
    //防区信息保存
    getprareinfoSave(params){
        return axios.request({
			url: 'fireRpCfg/fireRpCfgSaveOrUpdate',
			method: 'post',
			data: params
		})
	},
	//防护区信息删除
	deleData(params){
		return axios.request({
			url: 'fireRpCfg/fireRpCfgDel',
			method: 'post',
			data: params
		})
	},
	//防护区设备列表查询
	getequSearchDatas(params){
		return axios.request({
			url: 'protectareadev/list',
			method: 'post',
			data: params
		})
	},
	//防护区设备类型查询
	getEqumentType(params){
		return axios.request({
			url: 'dev_type/findDevTypeBySubSysType',
			method: 'post',
			data: params
		})
	},
	//防护区设备名称查询
	getEqumentName(params){
		return axios.request({
			url: 'dev_info/findDevInfoBySubSysType',
			method: 'post',
			data: params
		})
	},
	//防护区设备删除
	deletableequList(params){
		return axios.request({
			url: 'protectareadev/delPrtctareaDev',
			method: 'post',
			data: params
		})
	},
	//防护区设备保存
	saveequList(params){
		return axios.request({
			url: 'protectareadev/saveOrUpdate',
			method: 'post',
			data: params
		})
	}

}
