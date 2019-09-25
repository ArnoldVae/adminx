export default {
	data() {
		return {
			contentHeight: 0
		}
	},
	methods: {
		// 设置模态框  --- 已由 construction 替代
		setModalConfig(source, show, type, title) {
			this.$set(this[source], 'show', show)
			if (type) this.$set(this[source], 'type', type)
			if (title) this.$set(this[source], 'title', title)
		},

		// 初始化 form 表单
		initFormDataAtClose(source, obj, form) {
			if (form) this.$refs[form].resetFields()
			for (let k in source) {
				if (
					Object.keys(obj).findIndex(item => {
						return item == k
					}) == -1
				) {
					source[k] = ''
				} else {
					source[k] = obj[k]
				}
			}
		},
		// 设置表单
		setFormBySource(form, source) {
			for (let k in form) {
				this.$set(form, k, `${source[k]}`)
			}
		},
		// 验证表单
		validateForm(name, callback) {
			if (!name || !this.$refs[name]) return
			this.$refs[name].validate(valid => {
				if (valid) {
					callback && callback()
				} else {
					this.$Message.warning('请完整正确填写')
				}
			})
		},

		// 验证公用表单
		validateComForm(name, callback) {
			if (!name || !this.$refs[name]) return
			this.$refs[name].$children[0].validate(valid => {
				if (valid) {
					callback && callback()
				} else {
					this.$Message.warning('请完整正确填写')
				}
			})
		},
		// 初始化化公用表单
		resetComForm(source, obj, form) {
			if (form) this.$refs[form].$children[0].resetFields()
			for (let k in source) {
				if (
					Object.keys(obj).findIndex(item => {
						return item == k
					}) == -1
				) {
					source[k] = ''
				} else {
					source[k] = obj[k]
				}
			}
		},

		// 返回 html 字段
		returnHtmlString(label, text, color) {
			return `<${label} style='color: ${color};'>${text}</${label}>`
		},

		// 动态获取指定区域的高度
		getComHeight(wrap, header) {
			return () => {
				let wrapH = this.$refs[wrap].offsetHeight
				let headerH = this.$refs[header].$el.offsetHeight
				this.contentHeight = wrapH - headerH - 50
			}
		},

		// 分页器改变
		PageChangeHandler(type, val) {
			switch (type) {
				case 'page':
					this.$set(this.pageConfig, 'page', val)
					this.tableLoad()
					break
				case 'pageSize':
					this.$set(this.pageConfig, 'pageSize', val)
					if (this.pageConfig.page == 1) this.tableLoad()
					break
			}
		},

		// 获取数组中指定 字段 所在 item 的索引
		getTargetIndexByKey(source, key, value) {
			return source.findIndex(item => item[key] == value)
		},

		// 过滤 element-tree 放法
		filterNode(value, data) {
			if (!value) return true
			return data.vcName.indexOf(value) !== -1
		},
		// 设置选中的节点
		handleSetCheckedKeys(name, arr) {
			if (!name || !this.$refs[name]) return
			this.$refs[name].setCheckedKeys(arr)
		},
		// 转换数据
		transforDataToObject(source) {
			return JSON.parse(JSON.stringify(source))
		},

		// 封装的 element-table 单击表格某一行 切换展开状态
		handleTableRowClick(name, row) {
			if (row.children.length) {
				this.$refs[name].$children[0].toggleRowExpansion(row)
			}
		},
		forTree(data, isTrue, callback) {
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
	}
}
