import Vue from 'vue'
import Vuex from 'vuex'

import example from '@index/store/modules/example'
import getters from '@index/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		example
	},
	getters
})

export default store
