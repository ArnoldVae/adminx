import { createPoint } from './factory'

export const isPoint = obj => obj.lng && obj.lat
export const checkType = val => Object.prototype.toString.call(val).slice(8, -1)
export const tokebabCase = str => str.replace(/[A_Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '')
export const getPosition = (BMap, point) => (isPoint(point) ? createPoint(BMap, point) : point)

export function isIE() {
	if (!!window.ActiveXObject || 'ActiveXObject' in window) return true
	else return false
}

export function isMoz() {
	if (window.navigator.userAgent.indexOf('Gecko/') !== -1) return true
	else return false
}

export function loadScript(src, callback) {
	let $script = document.createElement('script')
	$script.setAttribute('type', 'text/javascript')
	global.document.body.appendChild($script)
	if (isIE()) {
		$script.onreadystatechange = function() {
			if (this.readyState == 'loaded' || this.readyState == 'complete') {
				callback && callback()
			}
		}
	} else {
		$script.onload = function() {
			callback && callback()
		}
	}
	$script.setAttribute('src', src)
}

// 获取某元素以浏览器左上角为原点的坐标
export function getNodeOffset(dom) {
	let top = dom.offsetTop
	let left = dom.offsetLeft
	let width = dom.offsetWidth
	let height = dom.offsetHeight
	// 累加父容器边距
	while ((dom = dom.offsetParent)) {
		top += dom.offsetTop
		left += dom.offsetLeft
	}
	return {
		left: left,
		top: top,
		right: document.body.offsetWidth - width - left,
		bottom: document.body.offsetHeight - height - top
	}
}
