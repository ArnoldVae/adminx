<template>
	<div class="admin">
		<Menu mode="horizontal" theme="dark" active-name="common" @on-select="selectMenu">
			<MenuItem name="common">
				<Icon type="md-home" />
				主站
			</MenuItem>
			<MenuItem name="ac">
				<Icon type="md-options" />
				智辅
			</MenuItem>
			<MenuItem name="as">
				<Icon type="md-pulse" />
				巡检
			</MenuItem>
			<MenuItem name="fire">
				<Icon type="md-warning" />
				消防
			</MenuItem>
		</Menu>
		<a-spin size="large" :spinning="spinning" tip="模块加载中...">
			<div class="iframe-view-wrap">
				<template v-for="(item, index) in menuData">
					<iframe
						:key="item.moduleId"
						class="iframw-view"
						frameborder="0"
						width="100%"
						height="100%"
						scrolling="no"
						:src="frameSrcArr[index]"
						v-show="index === selectMenuIndex"
						@load="iframeLoad(index, item)"
						allowtransparency="true"
					></iframe>
				</template>
			</div>
		</a-spin>
	</div>
</template>
<script>
export default {
	name: 'admin',
	components: {},
	directives: {},
	filters: {},
	mixins: {},
	props: {},
	data() {
		return {
			// iframe地址
			location: '',
			iframeReset: true,
			spinning: true,
			maskLoading: true,
			menuData: [
				{
					iFlag: 0,
					iFontSize: null,
					iIsEnable: 1,
					iSort: 0,
					moduleId: 0,
					moduleType: 0,
					parentId: 0,
					vcCaption: '公用',
					vcExecuteObject: 'common/#',
					vcExecuteParams: null,
					vcImage: null,
					vcMemo: null
				},
				{
					iFlag: 0,
					iFontSize: null,
					iIsEnable: 2,
					iSort: 0,
					moduleId: 1,
					moduleType: 0,
					parentId: 0,
					vcCaption: '智辅',
					vcExecuteObject: 'ac/#',
					vcExecuteParams: null,
					vcImage: null,
					vcMemo: null
				},
				{
					iFlag: 0,
					iFontSize: null,
					iIsEnable: 1,
					iSort: 0,
					moduleId: 2,
					moduleType: 0,
					parentId: 0,
					vcCaption: '巡检',
					vcExecuteObject: 'as/#',
					vcExecuteParams: null,
					vcImage: null,
					vcMemo: null
				},
				{
					iFlag: 0,
					iFontSize: null,
					iIsEnable: 1,
					iSort: 0,
					moduleId: 3,
					moduleType: 0,
					parentId: 0,
					vcCaption: '消防',
					vcExecuteObject: 'fire/#',
					vcExecuteParams: null,
					vcImage: null,
					vcMemo: null
				}
			],
			selectMenuIndex: 0,
			frameSrcArr: [], //存放iframe src，初始全部为空
			title: '变电信息综合处理系统'
		}
	},
	computed: {},
	watch: {},
	created() {
		this.initModule()
	},
	mounted() {
		// this.selectMenu('as') // 触发维护
		this.selectMenu('common') // 触发点击，后面要改
	},
	activited() {},
	beforeUpdate() {},
	update() {},
	beforeDestory() {},
	methods: {
		async getPageModule() {
			let result = await this.$_api.navigation.getPageModule()
			if (result.success) {
				// this.menuData = result.data
				//遍历数据，改变src指向
				this.frameSrcArr = new Array(result.data.length)
				result.data.forEach(item => {
					item.vcExecuteObject = this.handleIframeSrc(item.vcExecuteObject, item.moduleType)
				})
				this.menuData = result.data
			} else {
				this.menuData = []
			}
		},
		async initModule() {
			this.frameSrcArr = new Array(this.menuData.length)
			this.menuData.forEach(item => {
				item.vcExecuteObject = this.handleIframeSrc(item.vcExecuteObject, item.moduleType)
			})
		},
		// 获取系统参数
		async getSystemParameter() {
			try {
				let result = await this.$_api.navigation.getSystemParameter({
					vcKey: 'appName'
				})
				if (result.success) {
					this.title = result.data.lists[0]['vcValue']
				} else {
					// this.title = ''
				}
			} catch (e) {
				console.error(e)
			}
		},
		//选择菜单项
		selectMenu(src) {
			console.log(src)
			let index = this.menuData.findIndex(item => {
				return item.vcExecuteObject.indexOf(src) != -1
			})

			this.maskLoading = true
			this.spinning = true
			this.selectMenuIndex = index
			// this.frameSrcArr.push('no-src.html');
			// this.frameSrcArr[index] = ''
			//当前选中索引对应的iframe首次赋给地址，有地址的无变化
			if (typeof this.frameSrcArr[index] === 'undefined') {
				this.frameSrcArr[index] = this.menuData[index].vcExecuteObject
			} else {
				this.maskLoading = false
				this.spinning = false
			}
		},
		iframeLoad(index, info) {
			this.spinning = false
			this.maskLoading = false
		},
		//处理iframe src
		handleIframeSrc(src, type) {
			if (src && src.indexOf('http') != -1) {
				return src
			} else {
				if (process.env.NODE_ENV == 'production') {
					// 全路径 404模板需要
					let pathname = window.location.pathname
					let folderPath = pathname.substring(0, pathname.lastIndexOf('/'))
					if (type == '0') {
						console.log(0, window.location.origin + folderPath + `/module/${src}`)
						return window.location.origin + folderPath + `/module/${src}`
					} else {
						console.log(1, window.location.origin + folderPath + `/${src}`)
						return window.location.origin + folderPath + `/${src}`
					}

					// 自动补全路径
					// return src
				}
				if (src && process.env.NODE_ENV == 'development') {
					let moduleName = src.split('/#')[0]
					let hashPath = src.split('/#')[1]
					return moduleName + '.html#' + hashPath
				}
			}
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
.admin {
	width: 1920px;
  	height: 100vh
  	// background: #0af;
  	background-size: 100% 100vh
  	overflow: hidden;

  	.ivu-menu-horizontal {
		display: flex;
    	justify-content: center;
    	height: 50px;
    	line-height: 50px;
	}

	.ivu-menu-dark {
		background: #001529;
	}

	.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu {
		color: #fff;
	}

	.ivu-menu-item-active.ivu-menu-item-selected {
		color: #fa0 !important;
	}

  	/deep/ .ant-spin-blur::after {
    	opacity: 0;
  	}

  	.iframe-view-wrap {
    	width: 100%;
    	height: calc(100vh - 50px);

	    .mask {
	      	width: 1920px;
	       	height: calc(100vh - 50px);
	      	background: #0af;
	      	background-size: 100% 1080px;
	      	position: absolute;
	      	z-index: 1;
	    }

	    iframe {
	       	height: calc(100vh - 50px);
	    }
  	}
}
</style>
