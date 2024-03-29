const ____factory = function() {
	/**
	 * CurveLine类的构造函数
	 * @class 弧线类，实现效果的<b>入口</b>。
	 * 实例化该类后，即可返回一个弧线的Polyline对象，使用方法同<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/Polyline" target="_blank">Polyline</a>
	 * 即可调用map.addOverlay方法添加到地图当中
	 *
	 * @constructor
	 * @param {Array<Point>} Array<Point> Point数组对象
	 * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项参考<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB/PolylineOptions" target="_blank">PolylineOptions</a><br />
	 * @param {Json Object} opts.editingIcon 可选的输入参数，非必填项。可输入选项
	 *
	 * @example <b>参考示例：</b><br />
	 * var map = new BMap.Map("container");<br />map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);<br/>var points = [new BMap.Point(116.432045,39.910683), new BMap.Point(116.388522,39.985964), <br/>new BMap.Point(117.218862,39.141468), new BMap.Point(121.485947,31.510083)];
	 * <br />var curve = new BMapLib.CurveLine(points, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5}); //新建弧线覆盖物对象
	 * <br />map.addOverlay(curve); //添加到地图
	 * <br/>curve.enableEditing(); //开启编辑功能
	 */
	function CurveLine(points, opts) {
		var BMap = window.BMap
		if (!BMap) {
			throw Error('Baidu Map JS API is not ready yet!')
		}
		var curvePoints = getCurvePoints(points)
		var polyline = new BMap.Polyline(curvePoints, opts)
		var icon = opts.editingIcon instanceof BMap.Icon ? opts.editingIcon : new BMap.Icon(`${global.mapconfig.home}/images/circle.png`, new BMap.Size(16, 16))
		var markers = []

		polyline.addEventListener('lineupdate', function() {
			if (this.isEditing) {
				this.enableEditing()
			}
		})

		polyline.cornerPoints = points
		polyline.editMarkers = [] // 编辑功能的顶点

		/**
		 * 重写弧线的编辑功能
		 */
		polyline.enableEditing = function() {
			var self = this

			if (self.map) {
				self.disableEditing()
				for (var i = 0; i < self.cornerPoints.length; i++) {
					var marker = new BMap.Marker(self.cornerPoints[i], {
						icon: icon,
						enableDragging: true,
						raiseOnDrag: true
					})
					marker.addEventListener('dragend', function() {
						self.cornerPoints.length = 0
						for (var i = 0; i < self.editMarkers.length; i++) {
							self.cornerPoints.push(self.editMarkers[i].getPosition())
						}
						var curvePoints = getCurvePoints(self.cornerPoints)
						self.setPath(curvePoints)
					})
					marker.index = i
					self.editMarkers.push(marker)
					self.map.addOverlay(marker)
					markers.push(marker)
				}
			}
			self.isEditing = true
		}

		/**
		 * 重写弧线的编辑功能
		 */
		polyline.disableEditing = function() {
			this.isEditing = false
			// 清空之前的编辑点
			for (var i = 0; i < this.editMarkers.length; i++) {
				this.map.removeOverlay(this.editMarkers[i])
				this.editMarkers[i] = null
			}
			this.editMarkers.length = 0
		}

		/**
		 * 获取弧线的坐标点
		 */
		polyline.getPath = function() {
			return curvePoints
		}

		polyline.setEditingIcon = function(icon) {
			for (var i = 0, _marker; (_marker = markers[i]); i++) {
				_marker.setIcon(icon)
			}
		}

		// polyline.points = points; //弧线的坐标顶点
		// polyline.enableEditing = enableEditing;
		// polyline.disableEditing = disableEditing;
		// polyline.getPath = getPath;
		return polyline
	}

	/**
	 * 根据弧线的坐标节点数组
	 */
	function getCurvePoints(points) {
		var curvePoints = []
		for (var i = 0; i < points.length - 1; i++) {
			var p = getCurveByTwoPoints(points[i], points[i + 1])
			if (p && p.length > 0) {
				curvePoints = curvePoints.concat(p)
			}
		}
		return curvePoints
	}

	/**
	 * 根据两点获取曲线坐标点数组
	 * @param Point 起点
	 * @param Point 终点
	 */
	function getCurveByTwoPoints(obj1, obj2) {
		var BMap = window.BMap
		var curveCoordinates = []
		if (!obj1 || !obj2 || !(obj1 instanceof BMap.Point) || !(obj2 instanceof BMap.Point)) {
			return null
		}

		var B1 = function(x) {
			return 1 - 2 * x + x * x
		}
		var B2 = function(x) {
			return 2 * x - 2 * x * x
		}
		var B3 = function(x) {
			return x * x
		}

		var count = 30 // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
		var t, h, h2, lat3, lng3, t2
		var i = 0
		var inc = 0

		if (typeof obj2 == 'undefined') {
			if (typeof curveCoordinates != 'undefined') {
				curveCoordinates = []
			}
			return
		}

		var lat1 = parseFloat(obj1.lat)
		var lat2 = parseFloat(obj2.lat)
		var lng1 = parseFloat(obj1.lng)
		var lng2 = parseFloat(obj2.lng)

		// 计算曲线角度的方法
		if (lng2 > lng1) {
			if (parseFloat(lng2 - lng1) > 180) {
				if (lng1 < 0) {
					lng1 = parseFloat(180 + 180 + lng1)
				}
			}
		}

		if (lng1 > lng2) {
			if (parseFloat(lng1 - lng2) > 180) {
				if (lng2 < 0) {
					lng2 = parseFloat(180 + 180 + lng2)
				}
			}
		}
		t2 = 0
		if (lat2 == lat1) {
			t = 0
			h = lng1 - lng2
		} else if (lng2 == lng1) {
			t = Math.PI / 2
			h = lat1 - lat2
		} else {
			t = Math.atan((lat2 - lat1) / (lng2 - lng1))
			h = (lat2 - lat1) / Math.sin(t)
		}
		if (t2 == 0) {
			t2 = t + Math.PI / 5
		}
		h2 = h / 2
		lng3 = h2 * Math.cos(t2) + lng1
		lat3 = h2 * Math.sin(t2) + lat1

		for (i = 0; i < count + 1; i++) {
			curveCoordinates.push(new BMap.Point(lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc), lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc)))
			inc = inc + 1 / count
		}
		return curveCoordinates
	}
	return CurveLine
}
export const CurveLine = ____factory()
