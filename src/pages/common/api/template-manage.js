import axios from '@/config/api.request'
import qs from 'qs'

export default {
	// 查询字典数据列表
	findDicList(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: params
		})
	}
}
