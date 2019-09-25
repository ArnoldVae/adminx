/*!
 * 创建.net请求地址的axios实例
 */
import HttpRequest from './axios'
import settings from './settings'

const baseUrl = process.env.NODE_ENV === 'development' ? settings.netBaseUrl.dev : settings.netBaseUrl.pro

const axios = new HttpRequest(baseUrl)

export default axios
