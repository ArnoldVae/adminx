import Main from '@common/view/main'
export default [
	{
		path: '/drawings',
		name: 'drawings',
		meta: {
			title: '图纸管理',
			icon: 'ios-map',
			showAlways: true
		},
		component: Main,
		children: [
			{
				path: 'svg-addindex',
				name: 'SvgaddIndex',
				meta: {
					title: '图纸列表',
					icon: 'ios-image-outline'
				},
				component: () => import('../view/svg-index')
			}
		]
	}
]
