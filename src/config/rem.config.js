import { setTimeout } from 'timers'
// 基准大小
// const baseSize = 22.5
const baseSize = 1920 / (1024 / 12)
// 设置 rem 函数

function setRem() {
	// (勿删除)当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
	// const scale = document.documentElement.clientWidth / 1920
	// (勿删除)设置页面根节点字体大小
	// document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
	// 简化版
	document.documentElement.style.fontSize = document.documentElement.clientWidth / (1920 / baseSize) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
let tid = null
window.addEventListener(
	'resize',
	function() {
		clearTimeout(tid) //防止执行两次
		tid = setTimeout(setRem, 300)
	},
	false
)

/*window.onload = window.onresize = document.onresize = function() {
	setTimeout(() => {
		setRem()
	}, 300)
}*/

/** 这个文件用来动态的给根目录html设置fontSize
 * 在main的js内引入这个文件
 * 然后再npm安装postcss-pxtorem这个插件
 * 接着到.postcssrc.js内添加配置
 * plugins对象内添加
 *    "postcss-pxtorem":{
      "rootValue": 100,
      "propList": ["*"],
      "selectorBlackList": ["iview-"]
      }
      其中selectorBlackList数组是用来过滤掉第三方UI库的类名的或者不打算用rem的元素的类名
 * 然后可以直接写px 自动转换成rem了
 */
