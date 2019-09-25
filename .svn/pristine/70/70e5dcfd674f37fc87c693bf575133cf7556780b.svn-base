import axios from '@/config/api.request'
export default {
	// excel导入预览接口
	previewExcel(params) {
		return axios.request({
			url: 'tree/saveTreeNodeDHBefore',
			method: 'post',
			data: params
		})
	},

	// LN室外地面机器人JSON导入
	upLoadLnJson(params) {
		return axios.request({
			url: 'tree/importLNTree',
			method: 'post',
			data: params
		})
	},
	// 室内地面机器人EXCCEL
	uploadHomeEXCCEL(params) {
		return axios.request({
			url: 'tree/importTreeNodeDH',
			method: 'post',
			data: params
		})
	},
	// 导入树数据获取
	getUpLoad(params) {
		return axios.request({
			url: 'asarea/getOneLevelArea',
			method: 'post',
			data: params
		})
	},
	// 根据服务名称获取机器人
	getRobotData(params) {
		return axios.request({
			url: 'robot/findRobotByServiceID',
			method: 'post',
			data: params
		})
	},
	// 获取机器人视频类型列表
	getRobotList(params) {
		return axios.request({
			url: 'robot/findVsName',
			method: 'get',
			params
		})
	},
	// 编辑的时候显示的列表
	getVideoTypeList(params) {
		return axios.request({
			url: 'as/dev_info/query',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 保存编辑
	saveInfo(params) {
		return axios.request({
			url: 'robot/updateVideo',
			method: 'get',
			params
		})
	}
}
