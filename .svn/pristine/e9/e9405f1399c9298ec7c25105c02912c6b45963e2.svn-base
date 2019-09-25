<template>
	<div class="robot-content">
		<Tabs value="station" type="card" :animated="false" @on-click="handleSelectTab">
			<TabPane label="测点" name="station">测点</TabPane>
			<TabPane label="任务" name="task">任务</TabPane>
			<TabPane label="计划" name="plan">计划</TabPane>
			<TabPane label="视频" name="video">
				<div class="list">
					<el-table :data="robotData" border :header-cell-style="tableHeaderColor" empty-text="暂无数据">
						<el-table-column label="视频类别" align="center">
							<template slot-scope="scope">{{ scope.row.type }}</template>
						</el-table-column>
						<el-table-column label="设备名称" align="center">
							<template slot-scope="scope">{{ scope.row.devName }}</template>
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<Button type="warning" icon="ios-create-outline" @click="editRobotVideo(scope.row)">编辑</Button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</TabPane>
		</Tabs>
		<Modal v-model="robotModal" title="编辑" width="900" @on-ok="handleSaveRobotEdit">
			<div class="robot-search">
				<span>设备名称：</span>
				<el-input style="width: 170px;" v-model="devName"></el-input>
				<span>视频类型：</span>
				<el-select style="width: 170px;" placeholder="请选择" v-model="robotVideoType">
					<el-option label="可见光视频" value="0"></el-option>
					<el-option label="红外线视频" value="1"></el-option>
				</el-select>
				<span>状态：</span>
				<el-select style="width: 120px;" placeholder="请选择" v-model="robotStatus">
					<el-option label="禁用" value="0"></el-option>
					<el-option label="启用" value="1"></el-option>
				</el-select>
				<Button type="info" size="large" icon="md-search" style="margin-left: 10px;" @click="getVideoTypeList">查询</Button>
				<Button type="primary" size="large" icon="md-refresh" class="robot-reset" @click="handleRobotReset">重置</Button>
			</div>
			<el-table border :data="pagedModelList" :header-cell-style="tableHeaderColor" empty-text="暂无数据">
				<el-table-column label width="100" align="center">
					<template slot-scope="scope">
						<el-radio v-model="radio" :label="scope.row.devId" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
					</template>
				</el-table-column>
				<el-table-column label="设备名称" align="center">
					<template slot-scope="scope">{{ scope.row.vcName }}</template>
				</el-table-column>
				<el-table-column label="设备编号" width="200" align="center">
					<template slot-scope="scope">{{ scope.row.vcCode }}</template>
				</el-table-column>
				<el-table-column label="视频类型" align="center">
					<template slot-scope="scope">{{ scope.row.intParam2 }}</template>
				</el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">{{ scope.row.iIsEnabled }}</template>
				</el-table-column>
			</el-table>
			<div class="page-content">
				<Page
					@on-change="handleChangePage"
					@on-page-size-change="handleChangePageSize"
					:total="total"
					:current="pageNum"
					:page-size="pageSize"
					show-elevator
					show-sizer
					show-total
				/>
			</div>
		</Modal>
	</div>
</template>
<script>
export default {
	name: 'robot-content',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.systemsManage.dataRobot,
			robotModal: false,
			devName: '', // 设备名称
			robotStatus: '', // 状态
			robotVideoType: '', // 视频类型
			robotData: [{ type: '可见光视频', typeCode: 0 }, { type: '红外线视频', typeCode: 1 }],
			pageNum: 1,
			pageSize: 10,
			total: 0,
			radio: '',
			pagedModelList: [],
			robotId: '',
			devId: '',
			typeCode: ''
		}
	},
	props: ['myRobotId', 'myUnitId'],
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 获取机器人列表
		getRobotList() {
			this.axios
				.getRobotList({
					id: this.myRobotId
				})
				.then(res => {
					if (res.code == 200) {
						var tableData = [{ type: '可见光视频', typeCode: 0 }, { type: '红外线视频', typeCode: 1 }]
						tableData[0].devName = res.data.normaVsName
						tableData[0].id = res.data.normalVideoId
						tableData[1].devName = res.data.infraVsName
						tableData[1].id = res.data.infraVideoId
						this.robotData = tableData
					}
				})
				.catch(err => {})
		},
		// 点击编辑获取列表
		getVideoTypeList() {
			this.axios
				.getVideoTypeList({
					unitId: this.myUnitId,
					vsName: this.devName,
					vcParams2: this.robotVideoType,
					status: this.robotStatus,
					pageNumber: 1,
					pageSize: 10
				})
				.then(res => {
					if (res.code == 200) {
						this.pagedModelList = res.data.pagedModelList
						this.total = res.data.totalCount
						this.pagedModelList.map(item => {
							if (item.intParam2 == 0) {
								item.intParam2 = '可见光视频'
							} else if (item.intParam2 == 1) {
								item.intParam2 = '红外线视频'
							}
							if (item.iIsEnabled == 0) {
								item.iIsEnabled = '禁用'
							} else if (item.iIsEnabled == 1) {
								item.iIsEnabled = '启用'
							}
						})
					}
				})
				.catch(err => {})
		},
		// tab切换
		handleSelectTab(name) {
			if (name == 'video') {
				this.getRobotList()
			}
		},
		// 点击编辑按钮 编辑机器人视频
		editRobotVideo(row) {
			this.robotModal = true
			this.radio = row.id
			this.typeCode = row.typeCode
			this.getVideoTypeList()
		},
		getCurrentRow(val) {
			this.devId = val.devId
		},
		// 重置
		handleRobotReset() {
			this.devName = ''
			this.robotStatus = ''
			this.robotVideoType = ''
			this.getVideoTypeList()
		},
		// 保存编辑
		handleSaveRobotEdit() {
			this.axios
				.saveInfo({
					robotId: this.myRobotId,
					videoType: this.typeCode,
					devId: this.devId
				})
				.then(res => {
					if (res.code == 200) {
						this.$Message.success({
							content: '修改成功',
							duration: 4
						})
						this.getRobotList()
					} else {
						this.$Message.err(res.msg)
					}
				})
				.catch(err => {})
		},
		// 分页
		handleChangePage(page) {
			this.pageNum = page
			this.getVideoTypeList()
		},
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getVideoTypeList()
		},
		// 修改table header的背景色
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'color: #515a6e;background: #f8f8f9;'
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
.robot-content {
}

.robot-search {
  margin-bottom: 10px;
  height: 40px;

  span {
    font-size: 14px;
    line-height: 40px;
    margin-left: 10px;
  }

  .robot-reset {
    margin-left: 10px;
  }
}

.page-content {
  margin: 10px 0 0 150px;
}
</style>
