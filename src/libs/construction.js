/**
 * 一些构造器
 */

export class ModalConfig {
	constructor() {
		this.show = false
		this.type = ''
		this.title = ''
	}

	set(show, type, title) {
		this.show = show
		if (type) this.type = type
		if (title) this.title = title
	}

	get() {
		return this
	}
}

export class PageConfig {
	constructor() {
		this.total = 0
		this.page = 1
		this.pageSize = 20
	}
}
