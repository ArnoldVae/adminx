var CreateEdgeInteractor = function(graphView, type) {
	CreateEdgeInteractor.superClass.constructor.call(this, graphView)

	this._type = type
}
global.ht.Default.def(CreateEdgeInteractor, global.ht.graph.Interactor, {
	setUp: function() {
		CreateEdgeInteractor.superClass.setUp.call(this)

		this._autoMakeVisible = this._graphView.isAutoMakeVisible()
		this._graphView.setAutoMakeVisible(false)

		this._graphView.sm().cs()

		this._graphView.addTopPainter(this)
	},
	tearDown: function() {
		CreateEdgeInteractor.superClass.tearDown.call(this)

		this._graphView.setAutoMakeVisible(this._autoMakeVisible)

		this.clear()

		this._graphView.removeTopPainter(this)
	},

	clear: function() {
		this._target = null
		this._source = null
		this._logicalPoint = null
	},

	getDataAt: function(e) {
		if (global.ht.Default.isLeftButton(e) && global.ht.Default.getTouchCount(e) === 1) {
			var data = this._graphView.getDataAt(e)
			if (data instanceof global.ht.Node) {
				return data
			}
		}
		return null
	},

	handle_mousedown: function(e) {
		this.handle_touchstart(e)
	},
	handle_touchstart: function(e) {
		global.ht.Default.preventDefault(e)

		this.clear()

		this._source = this.getDataAt(e)
		if (this._source) {
			this.startDragging(e)
			this._graphView.getSelectionModel().setSelection(this._source)
		}
	},

	handleWindowMouseMove: function(e) {
		this.handleWindowTouchMove(e)
	},
	handleWindowTouchMove: function(e) {
		this.autoScroll(e)

		// clear
		this.redraw()

		var graphView = this._graphView
		this._logicalPoint = graphView.getLogicalPoint(e)

		var list = [this._source]
		if ((this._target = this.getDataAt(e))) {
			list.push(this._target)
		}
		graphView.sm().ss(list)

		// redraw
		this.redraw()
	},

	handleWindowMouseUp: function(e) {
		this.handleWindowTouchEnd(e)
	},
	handleWindowTouchEnd: function(e) {
		var graphView = this._graphView
		if (this._target) {
			var edge = new global.ht.Edge(this._source, this._target)

			edge.s('edge.type', this._type)
			edge.setParent(graphView.getCurrentSubGraph())

			graphView.dm().add(edge)
			graphView.sm().ss(edge)
		}

		resetDefault()
	},

	getSourcePosition: function() {
		if (!this._source) return null

		if (this._source instanceof global.ht.Node) {
			return this._source.getPosition()
		}
		var rect = this._graphView.getDataUIBounds(this._source)
		return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
	},

	redraw: function() {
		var p1 = this.getSourcePosition()
		var p2 = this._logicalPoint
		if (p1 && p2) {
			var rect = global.ht.Default.unionPoint(p1, p2)
			global.ht.Default.grow(rect, 1)
			this._graphView.redraw(rect)
		}
	},
	draw: function(g) {
		var p1 = this.getSourcePosition()
		var p2 = this._logicalPoint
		if (p1 && p2) {
			g.save()

			g.lineWidth = 1
			g.strokeStyle = '#1ABC9C'
			g.beginPath()
			g.moveTo(p1.x, p1.y)
			g.lineTo(p2.x, p2.y)
			g.stroke()

			g.restore()
		}
	}
})
