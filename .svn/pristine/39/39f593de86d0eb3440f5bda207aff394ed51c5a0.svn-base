//遍历标准树结构，并在回调函数中对树结构内容进行操作
export function traversalTree(data, isTrue, callback) {
	var arr = []
	for (var i = 0; i < data.length; i++) {
		arr.push(data[i])
	}
	while (arr.length) {
		var _p = arr.shift()
		if (callback(_p) == false) {
			return
		}
		if (isTrue && _p.children) {
			for (var j = _p.children.length - 1; j >= 0; j--) {
				arr.unshift(_p.children[j])
			}
		}
	}
}
