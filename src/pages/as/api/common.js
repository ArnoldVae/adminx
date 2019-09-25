/**巡检模块公用的接口 */
import axios from '@/config/api.request';

export default {
	//组织结构树公共接口
	//param-0 只获取到组织
	//param-2 获取到变电站一级
	getOrgTree(param) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: param
		})
	}
}
