import Main from '@common/view/main'
export default [
	{
		path: '/business-config',
		name: 'business-config',
		meta: {
			title: '业务配置',
			icon: 'md-settings'
		},
		component: Main,
		children: [
			{
				path: 'scene-config',
				name: 'scene-config',
				meta: {
					title: '场景管理',
					icon: 'ios-barcode-outline'
				},
				component: () => import(`../view/scene-config`)
			},
			{
				path: 'linkage-config',
				name: 'linkage-config',
				meta: {
					title: '联动管理',
					icon: 'ios-link'
				},
				component: () => import(`../view/linkage-config`)
			}
		]
	}
]
