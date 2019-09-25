const path = require('path')
const resolve = dir => {
	return path.join(__dirname, dir)
}

let getPagesConfig = require('./pages.config.js')

let pages = {}
let projectname = process.argv[3] // 获取执行哪个文件(命令参数)

if (process.env.NODE_ENV == 'development') {
	pages = getPagesConfig.init()
} else {
	pages[projectname] = getPagesConfig.init()[projectname]
}

let outputDir = ''
if (projectname == 'index') {
	outputDir = 'dsa5200admin/'
} else {
	outputDir = 'dsa5200admin/module/' + projectname
}

// const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	// 兼容低版本浏览器依赖包（只处理当前包语言）
	transpileDependencies: [
		'webpack-dev-server/client',
		'echarts',
		'tree-table-vue'
	],
	//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
	filenameHashing: true,

	publicPath: './',

	outputDir,

	pages,

	lintOnSave: false,

	// 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
	devServer: {
		// proxy: 'localhost:3000',
		open: false, // 项目构建成功之后，自动弹出页面
		// host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
		port: 5000, // 默认8080
		https: false, // https协议
		hotOnly: false // webpack已经做好了
	},

	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('_c', resolve('src/components/scattered'))
			.set('_b', resolve('src/components/scattered/business'))
			.set('@index', resolve('src/pages/index')) // 框架
			.set('@common', resolve('src/pages/common')) // 公用
			.set('@ac', resolve('src/pages/ac')) // 智辅
			.set('@as', resolve('src/pages/as')) // 巡检
			.set('@fire', resolve('src/pages/fire')) // 消防
	},
	// 打包时不生成.map文件
	productionSourceMap: false,

	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
			analyzerPort: 5001
		}
	},

	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			},
			stylus: {
				// 导入全局 styl
				import: '~@/assets/style/index.styl'
			}
		},
		extract: false
	},

	assetsDir: 'pack',

	// GZ压缩
	/*configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({
						filename: '[path].br[query]',
						algorithm: 'brotliCompress',
						test: /\.(js|css|html|svg)$/,
						compressionOptions: { level: 11 },
						threshold: 10240,
						minRatio: 0.8,
						deleteOriginalAssets: false,
					}),
				]
			}
		}
	}*/

}
