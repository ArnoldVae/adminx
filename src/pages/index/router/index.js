import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import admin from './admin'

const router = new Router({
	routes: [...admin]
})

router.beforeEach((to, from, next) => {
	next()
})
router.afterEach(to => {
	if (to.meta.title) window.document.title = to.meta.title
	window.scrollTo(0, 0)
})

export default router
