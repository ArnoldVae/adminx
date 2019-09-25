import axios from '@/config/api.request'

export const getRouterReq = access => {
	return axios.request({
		url: 'get_router',
		params: {
			access
		},
		method: 'get'
	})
}
