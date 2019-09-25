/*!
 * 创建java请求地址的axios实例
 */
import HttpRequest from './axios'
import settings from './settings'

const baseUrl = process.env.NODE_ENV === 'development' ? settings.javaBaseUrl.dev : settings.javaBaseUrl.pro

const axios = new HttpRequest(baseUrl)

export default axios
