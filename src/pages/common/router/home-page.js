import Main from '@common/view/main'
export default [
	{
		path: '/home-page',
		name: 'home-page',
		meta: {
			title: '主站管理',
			icon: 'md-home'
		},
		component: Main,
		children: [
			{
				path: 'main-station-manage',
				name: 'main-station-manage',
				meta: {
					title: '主站',
					icon: 'ios-home'
				},
				component: () => import('../view/main-station-manage')
			},
			{
				path: 'org-manage',
				name: 'org-manage',
				meta: {
					title: '组织结构',
					icon: 'md-grid'
				},
				component: () => import('../view/org-manage')
			},
			{
				path: 'station-manage',
				name: 'station-manage',
				meta: {
					title: '变电站',
					icon: 'ios-home-outline'
				},
				component: () => import('../view/station-manage')
			},
			{
				path: 'distribution-manage',
				name: 'distribution-manage',
				meta: {
					title: '配电所',
					icon: 'ios-home'
				},
				component: () => import(`../view/distribution-manage`)
			},
			{
				path: 'device-modeling',
				name: 'device-modeling',
				meta: {
					title: '设备',
					icon: 'md-cube'
					// notCache: false
				},
				component: () => import('../view/device-modeling')
			},
			{
				path: 'business-tree',
				name: 'business-tree',
				meta: {
					title: '业务结构',
					icon: 'ios-bookmark-outline'
				},
				component: () => import('../view/business-tree')
			}
		]
	}
]
