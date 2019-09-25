<template>
	<div class="subTable">
		<Row>
			<i-col span="12" v-if="domShow.vcName">
				<div class="title">
					测点名称:
					<span class="value">{{ row.vcName }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcNodeName">
				<div class="title">
					节点名称:
					<span class="value">{{ row.vcNodeName }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.iNodeType">
				<div class="title">
					测点类型:
					<span class="value">{{ row.iNodeType }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcUnit">
				<div class="title">
					单位:
					<span class="value">{{ row.vcUnit }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcDesc">
				<div class="title">
					描述:
					<span class="value">{{ row.vcDesc }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcEarlyAlarmRange">
				<div class="title">
					早期预警范围:
					<span class="value">{{ row.vcEarlyAlarmRange }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcNormalAlarmRange">
				<div class="title">
					一般报警范围:
					<span class="value">{{ row.vcNormalAlarmRange }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcMainAlarmRange">
				<div class="title">
					严重报警范围:
					<span class="value">{{ row.vcMainAlarmRange }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcFatalAlarmRange">
				<div class="title">
					危急报警范围:
					<span class="value">{{ row.vcFatalAlarmRange }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.vcDevName">
				<div class="title">
					设备名称:
					<span class="value">{{ row.vcDevName }}</span>
				</div>
			</i-col>
			<i-col span="12" v-if="domShow.iDevNodeID">
				<div class="title">
					设备节点ID:
					<span class="value">{{ row.iDevNodeID }}</span>
				</div>
			</i-col>
		</Row>
		<span v-if="titleShow">无变化</span>
	</div>
</template>
<script>
export default {
	name: 'subTable',
	components: {},
	props: {
		row: Object,
		nodeTypeList: Array,
		type: String,
		flag: Number
	},
	data() {
		return {
			domShow: {
				vcName: false,
				vcNodeName: false,
				iNodeType: false,
				vcUnit: false,
				vcDesc: false,
				vcEarlyAlarmRange: false,
				vcNormalAlarmRange: false,
				vcMainAlarmRange: false,
				vcFatalAlarmRange: false,
				vcDevName: false,
				iDevNodeID: false
			},
			titleShow: false
		}
	},
	computed: {},
	filters: {},
	watch: {
		row: {
			deep: true,
			handler(newVal, oldVal) {
				this.setInfo()
			}
		}
	},
	created() {
		if (this.row) {
			for (let k in this.row) {
				if (this.row[k]) {
					this.domShow[k] = true
				}
			}
		}
	},
	mounted() {
		this.setInfo()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 获取枚举
		setInfo() {
			// console.log(this.flag)
			if (this.row && !this.flag) {
				this.titleShow = false
				if (this.row.iNodeType) {
					// this.row.iNodeType = this.row.iNodeType
					for (let i = 0; i < this.nodeTypeList.length; i++) {
						if (this.nodeTypeList[i].id == this.row.iNodeType) {
							this.row.iNodeType = this.nodeTypeList[i].value
							return
						} else {
						}
					}
				}
			} else {
				if (this.flag == 1) {
					this.titleShow = true
				} else {
					this.titleShow = false
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
.title {
  display: block;
  float: left;
  width: 100%;
  color: #515a6e;
  text-align: left;

  .value {
    color: green;
  }
}
</style>
