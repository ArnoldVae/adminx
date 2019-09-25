import axios from 'axios'

import dataDict from './data-dict'
import systemsConfig from './systems-config'
import deviceModeling from './device-modeling'
import businessTree from './business-tree'
import areaManage from './area-manage'
import moduleManaga from './module-managa'
import dataUpload from './data-upload'
import emqResourceManage from './emqResource-manage'
import inspectionService from './inspection-service'
import taskingConfig from './tasking-config'
import dataEnvManage from './data-envManage'
import dataRobot from './data-robot'
import devInterface from './dev-interface'
import subsystem from './subsystem'
import deviceType from './device-type'
import mainStationManage from './main-station-manage'
import orgManage from './org-manage'
import stationManage from './station-manage'
import distributionManage from './distribution-manage'
import sceneConfig from './scene-config'
import linkageConfig from './linkage-config'
import svgConfig from './svg-config'
import templateManage from './template-manage'

const getLocalData = (file = 'enums.json') => {
	return axios(`assets/data/static-data/${file}`)
}

//图纸素材
const getMaterial = (params = 'material.json') => {
	return axios(`assets/data/static-data/${params}`)
}

export default {
	getLocalData,
	dataDict,
	systemsConfig,
	deviceModeling,
	businessTree,
	areaManage,
	moduleManaga,
	dataUpload,
	emqResourceManage,
	dataEnvManage,
	inspectionService,
	taskingConfig,
	dataRobot,
	devInterface,
	subsystem,
	deviceType,
	mainStationManage,
	orgManage,
	stationManage,
	distributionManage,
	sceneConfig,
	linkageConfig,
	svgConfig,
	getMaterial,
	templateManage
}
