<template>
	<div class="dev-interface">
		<div class="tool-bar">
			<searche-Header-Wrapper>
				<form-item
					title="名称"
					type="text"
					v-model="searchData.vcName"
					placeholder="输入主站名称查询"
					@on-enter="searchStation"
					clearable
					noMBottom
				></form-item>
				<Button type="info" size="large" icon="md-search" @click="searchStation">查询</Button>
				<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>
			</searche-Header-Wrapper>
		</div>
		<div class="table-content">
			<Table border :columns="tableColumns" :data="tableData" :height="650"></Table>
			<div class="table-page">
				<div class="page-content">
					<Page
						@on-change="handleChangePage"
						@on-page-size-change="handleChangePageSize"
						:total="total"
						:current="page"
						:page-size="pageSize"
						show-elevator
						show-total
						show-sizer
					/>
				</div>
			</div>
		</div>
		<!-- 编辑弹窗 -->
		<Modal v-model="modalShow" title="编辑" :mask-closable="false">
			<Form ref="up-form" :rules="ruleValidate" :model="FormData" :label-width="80" label-position="right">
				<!-- 名称 -->
				<FormItem label="模型名称" prop="title">
					<Input v-model="FormData.title" disabled style="width: 400px" />
				</FormItem>
				<FormItem label="模型ID" prop="typeId">
					<Input v-model="FormData.typeId" disabled style="width: 400px" />
				</FormItem>
				<FormItem label="文件名称" prop="name">
					<Input v-model="FormData.name" placeholder="请输入..." style="width: 400px" />
				</FormItem>
				<FormItem label="展示类型" prop="displayType">
					<Input v-model="FormData.displayType" disabled style="width: 360px" />
					<Button icon="md-build" @click="selectModal(FormData.mode)"></Button>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="text" size="large" @click="handleModalCancel">取消</Button>
				<Button type="primary" size="large" :loading="btnLoading" @click="handleSaveArea">确认</Button>
			</div>
		</Modal>
		<!-- 类型弹窗 -->
		<Modal v-model="modalShow1" title="选择展示类型" :mask-closable="false" width="500">
			<Table :columns="columns1" :data="interfaceList" :show-header="false" @on-row-click="tableClick"></Table>
			<div class="selectTitle">选中的展示类型</div>
			<div class="selectedBox">
				<span v-for="(item, index) in temporary" :key="index" class="selectItem">
					{{ item.title }}
					<Icon class="item-icon" type="md-close" @click="removeItem(item)" />
				</span>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="handleSelectCancel">取消</Button>
				<Button type="primary" size="large" :loading="btnLoading" @click="handleSaveSelect">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
	name: 'dev-interface',
	components: {
		draggable
	},
	props: {},
	data() {
		return {
			axios: this.$api.systemsManage.devInterface,
			modalShow: false,
			modalShow1: false,
			btnLoading: false,
			searchData: {
				vcName: ''
			},
			pageFlag: false,
			FormData: {
				title: '',
				typeId: '',
				name: '',
				displayType: '',
				mode: []
			},
			ruleValidate: {},
			tableColumns: [
				{
					title: '模型名称',
					key: 'title',
					align: 'center',
					width: '300px'
				},
				{
					title: '模型ID',
					key: 'typeId',
					align: 'center'
				},
				{
					title: '文件名称',
					key: 'name',
					align: 'center'
				},
				{
					title: '展示类型',
					key: 'displayType',
					align: 'center'
				},
				{
					title: '操作',

					key: 'action',
					align: 'center',
					width: 150,
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'warning',
										icon: 'ios-create-outline'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.handleModalShow(params)
										}
									}
								},
								'编辑'
							)
						])
					}
				}
			],
			tableData: [],
			total: 0,
			page: 1,
			pageSize: 20,
			columns1: [
				{
					title: 'Name',
					key: 'title',
					align: 'center'
				}
			],
			interfaceList: [],
			selectList: [],
			temporary: []
		}
	},
	computed: {},
	filters: {},
	watch: {
		modalShow(val) {
			if (!val) {
				for (let key in this.addFormData) {
					this.addFormData[key] = ''
				}
			}
		},
		searchData: {
			handler(newVal) {
				this.pageFlag = false
			},
			deep: true
		}
	},
	created() {
		this.getEnums()
		this.getTable()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取列表数据
		getTable() {
			let data = [
				{
					typeId: 1014,
					title: '温湿度',
					name: 'humiture',
					mode: [
						{
							title: '定制化',
							name: 'customization',
							icon: 'layout'
						},
						{
							title: '表格',
							name: 'table',
							icon: 'table'
						}
					]
				},
				{
					typeId: 1012,
					title: '铁芯夹件',
					name: 'accumulator',
					mode: [
						{
							title: '表格',
							name: 'table',
							icon: 'table'
						},
						{
							title: '光字牌',
							name: 'plate',
							icon: 'profile'
						}
					]
				}
			]
			// data.forEach(item => {
			// 	if (item.mode.length > 0) {
			// 		let titles = []
			// 		item.mode.forEach(element => {
			// 			titles.push(element.title)
			// 		})
			// 		item.displayType = titles.join(',')
			// 	} else {
			// 		item.displayType = null
			// 	}
			// })
			// this.tableData = data
			let params = {
				currentPage: this.page,
				isPage: 1,
				pageSize: this.pageSize,
				vcName: ''
			}
			this.axios.getDevTypeList(params).then(res => {
				console.log(res)
				if (res.code == 200 && res.data.lists) {
					res.data.lists.forEach(item => {
						item.typeId = item.devTypeId
						item.title = item.vcName
						item.name = ''
						item.mode = []
					})
					this.tableData = res.data.lists
					this.page = res.data.page.currentPage
					this.pageSize = res.data.page.pageSize
					this.total = res.data.page.totalNum
				}
			})
		},
		//获取枚举
		getEnums() {
			this.$api.getLocalData('enums.json').then(res => {
				console.log(res.data.interfaceList)
				this.interfaceList = res.data.interfaceList
			})
		},
		// 条件查询
		searchStation() {
			if (this.searchData.vcName == '') {
				this.pageFlag = false
			} else {
				this.pageFlag = true
			}
			this.getTable()
		},
		// 重置查询
		handleResetData() {
			this.searchData.vcName = ''
			this.page = 1
			this.pageSize = 20
			this.getTable()
		},
		// 编辑按钮
		handleModalShow(params) {
			this.modalShow = true
			console.log(params)
			this.FormData = params.row
		},
		// 保存
		handleSaveArea() {},
		// 取消
		handleModalCancel() {
			this.modalShow = false
		},
		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.getTable()
		},
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
		},
		//展示方式弹窗
		selectModal(data) {
			this.modalShow1 = true
			this.selectList = data
			this.temporary = JSON.parse(JSON.stringify(this.selectList))
			console.log(data)
		},
		//选择展示方式
		tableClick(row) {
			let flag = true
			this.temporary.forEach(item => {
				if (item.name == row.name) {
					flag = false
					return
				}
			})
			if (flag) {
				this.temporary.push(row)
			}
		},
		//移除展示方式
		removeItem(data) {
			this.temporary.forEach((item, index) => {
				if (item.name == data.name) {
					this.temporary.splice(index, 1)
				}
			})
		},
		//展示方式弹窗确定
		handleSaveSelect() {
			this.selectList = JSON.parse(JSON.stringify(this.temporary))
			let titles = []
			this.selectList.forEach(item => {
				titles.push(item.title)
			})
			this.FormData.displayType = titles.join(',')
			this.FormData.mode = this.selectList
			console.log(this.FormData)

			this.modalShow1 = false
		},
		//展示方式弹窗取消
		handleSelectCancel() {
			this.modalShow1 = false
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
.dev-interface {
  width: 100%;
  height: calc(100vh - 160px);
  float: left;
  display: flex;
  flex-direction: column;

  .tool-bar {
    .btn-box {
      .ivu-btn {
        margin-right: 10px;
      }
    }

    .ivu-btn {
      margin-right: 10px;
    }

    .search-header-wrapper .form-item span {
      font-size: 14px;
    }

    .ivu-input-wrapper input {
      font-size: 14px;
    }
  }

  .table-content {
    width: 100%;
    flex: 1;
    position: relative;

    .ivu-table-wrapper {
      width: 100%;
      position: absolute;
      top: 0;
      height: calc(100% - 30px) !important;
    }

    /deep/.ivu-table-body, /deep/.ivu-table-overflowY {
      height: calc(100% - 40px) !important;
    }

    /deep/tr.ivu-table-row-hover td {
      background-color: #F5F7FA;
    }

    /deep/.ivu-table {
      b {
        color: #19be6b;
        font-weight: 400;
      }

      p {
        color: #ff9900;
      }
    }

    /deep/.ivu-btn {
      font-size: 14px;
    }

    .table-page {
      width: 100%;
      position: absolute;
      bottom: -15px;

      .page-content {
        width: 800px;
        margin-left: 50%;
        transform: translateX(-35%);
      }
    }
  }
}

/deep/.ivu-radio-wrapper {
  font-size: 14px !important;
}

.selectTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #17233d;
  font-weight: 700;
  margin-top: 10px;
  border-bottom: 1px solid #dcdee2;
}

.selectedBox {
  width: 100%;
  height: 40px;
  overflow-y: auto;
  margin-top: 20px;
  box-sizing: border-box;

  .selectItem {
    display: block;
    box-sizing: border-box;
    width: 105px;
    margin-left: 5px;
    float: left;
    margin-bottom: 5px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 14px;
    border: 1px solid #2d8cf0;
    border-radius: 8px;
    position: relative;
    background-color: #2d8cf0;
    color: #fff;

    .item-icon {
      position: absolute;
      border-radius: 10px;
      top: 1px;
      right: 1px;
      color: #fff;

      &:hover {
        background-color: #ed4014;
        cursor: pointer;
      }
    }
  }
}

/deep/.ivu-input-disabled {
  color: #515a6e;

  &:hover {
    cursor: default;
  }
}

/deep/ .ivu-table-row-hover td {
  cursor: pointer;
}
</style>
