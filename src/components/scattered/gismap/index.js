import BaiduMap from './map/Map.vue'
import BmView from './map/MapView.vue'

import BmControl from './controls/Control.vue'
import BmNavigation from './controls/Navigation.vue'
import BmOverviewMap from './controls/OverviewMap.vue'
import BmScale from './controls/Scale.vue'
import BmCopyright from './controls/Copyright.vue'
import BmContextMenu from './context-menu/Menu.vue'
import BmContextMenuItem from './context-menu/Item.vue'
import BmOverlay from './overlays/Overlay.vue'
import BmMarker from './overlays/Marker.vue'
import BmLabel from './overlays/Label.vue'
import BmInfoWindow from './overlays/InfoWindow.vue'
import BmPolyline from './overlays/Polyline.vue'
import BmPolygon from './overlays/Polygon.vue'
import BmCircle from './overlays/Circle.vue'
import BmPointCollection from './overlays/PointCollection.vue'

import BmBoundary from './servers/Boundary.vue'

import BmLushu from './extra/Lushu.vue'
import BmCurveLine from './extra/CurveLine.vue'
import BmRectangleZoom from './extra/RectangleZoom.vue'
import BmDistanceTool from './extra/DistanceTool.vue'
import BmInfoBox from './extra/InfoBox.vue'
import BmRichMarker from './extra/RichMarker.vue'

export default {
	install(Vue) {
		Vue.component('baidu-map', BaiduMap)
		Vue.component('bm-view', BmView)

		Vue.component('bm-control', BmControl)
		Vue.component('bm-navigation', BmNavigation)
		Vue.component('bm-overview-map', BmOverviewMap)
		Vue.component('bm-scale', BmScale)
		Vue.component('bm-copyright', BmCopyright)

		Vue.component('bm-context-menu', BmContextMenu)
		Vue.component('bm-context-menu-item', BmContextMenuItem)

		Vue.component('bm-overlay', BmOverlay)
		Vue.component('bm-marker', BmMarker)
		Vue.component('bm-label', BmLabel)
		Vue.component('bm-info-window', BmInfoWindow)
		Vue.component('bm-polyline', BmPolyline)
		Vue.component('bm-polygon', BmPolygon)
		Vue.component('bm-circle', BmCircle)
		Vue.component('bm-point-collection', BmPointCollection)

		Vue.component('bm-boundary', BmBoundary)

		Vue.component('bm-lushu', BmLushu)
		Vue.component('bm-curve-line', BmCurveLine)
		Vue.component('bm-rectangle-zoom', BmRectangleZoom)
		Vue.component('bm-distance-tool', BmDistanceTool)
		Vue.component('bm-info-box', BmInfoBox)
		Vue.component('bm-rich-marker', BmRichMarker)
	}
}

export {
	BaiduMap,
	BmView,
	BmControl,
	BmNavigation,
	BmOverviewMap,
	BmScale,
	BmCopyright,
	BmContextMenu,
	BmContextMenuItem,
	BmOverlay,
	BmMarker,
	BmLabel,
	BmInfoWindow,
	BmPolyline,
	BmPolygon,
	BmCircle,
	BmPointCollection,
	BmBoundary,
	BmLushu,
	BmCurveLine,
	BmRectangleZoom,
	BmDistanceTool,
	BmInfoBox,
	BmRichMarker
}
