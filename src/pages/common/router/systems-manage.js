import Main from '@common/view/main'
export default [
	{
		path: '/systems-manage',
		name: 'systems-manage',
		meta: {
			title: '系统配置',
			icon: 'ios-albums-outline'
		},
		component: Main,
		children: [
			{
				path: 'systems-config',
				name: 'systems-config',
				meta: {
					title: '运行参数',
					icon: 'ios-apps'
				},
				component: () => import('../view/systems-config')
			},
			{
				path: 'data-dict',
				name: 'data-dict',
				meta: {
					title: '字典',
					icon: 'md-book'
				},
				component: () => import('../view/data-dict')
			},
			{
				path: 'module-managa',
				name: 'module-managa',
				meta: {
					title: '模块',
					icon: 'ios-barcode'
				},
				component: () => import('../view/module-managa')
			},
			{
				path: 'subsystem',
				name: 'subsystem',
				meta: {
					title: '子系统',
					icon: 'md-cash'
				},
				component: () => import('../view/subsystem')
			},
			{
				path: 'device-type',
				name: 'device-type',
				meta: {
					title: '模型',
					icon: 'md-analytics'
				},
				component: () => import('../view/device-type')
			},
			{
				path: 'EMQResource-manage',
				name: 'EMQResource-manage',
				meta: {
					title: 'EMQ资源',
					icon: 'ios-cube'
				},
				component: () => import('../view/EMQResource-manage')
			},
			// {
			// 	path: 'template-manage',
			// 	name: 'template-manage',
			// 	meta: {
			// 		title: '模板管理',
			// 		icon: 'ios-photos'
			// 	},
			// 	component: () => import('../view/template-manage')
			// }
		]
	}
]
