<template>
	<div class="sync-compared">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="treeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<div class="right-content">
			<div class="search-bar">
				<searche-Header-Wrapper>
					<!-- <form-item
            title="测点名称"
            type="text"
            v-model="searchData.vcName"
            placeholder="输入测点名称查询"
            clearable
            noMBottom
          ></form-item>
          <Button type="info" size="large" icon="md-search" @click="handlesearch">查询</Button>
					<Button type="primary" size="large" icon="md-refresh" @click="handleResetData">重置</Button>-->
					<!-- <form-item
						title="变化类型"
						type="select"
						v-model="searchData.iVoltageLevelId"
						:options="cityList"
						:setings="{ value: 'value', label: 'label' }"
						noMBottom
					></form-item>-->
					<div class="rt-tabs">
						<p>变化类型:</p>
						<span
							@click="changeTab(item)"
							v-for="(item, idx) in tabList"
							:key="idx"
							:class="item.active == true ? 'myTabs active' : 'myTabs'"
						>
							{{
							item.name
							}}
						</span>
					</div>
				</searche-Header-Wrapper>
			</div>
			<!-- 表格区 -->
			<div class="table-content">
				<Table
					border
					ref="selection"
					v-loading="loading"
					:columns="tableColumns"
					:data="tableData"
					height="780"
				></Table>
				<!-- 分页 -->
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
		</div>
	</div>
</template>
<script>
import subTable from './subTable'
export default {
	name: 'sync-compared',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.syncCompared,
			pageFlag: false,
			loading: false,
			searchData: {
				vcName: ''
			},
			treeData: [],
			dtuId: '',
			tableColumns: [
				{
					title: '测点名称',
					key: 'vcName',
					width: 150,
					align: 'center'
				},
				{
					title: '测点编码',
					key: 'vcNodeCode',
					minWidth: 100,
					maxWidth: 200,
					align: 'center'
				},
				{
					title: '变化类型',
					key: 'operType1',
					width: 100,
					align: 'center'
				},
				{
					title: '原信息',
					key: 'preInfo',
					minWidth: 150,
					align: 'center',
					render: (h, params) => {
						return h(subTable, {
							props: {
								row: params.row.preInfo,
								nodeTypeList: this.nodeTypeList
								// type: this.selectTab + '',
								// flag: params.row.flag
							}
						})
					}
				},
				{
					title: '变更后信息',
					key: 'postInfo',
					minWidth: 150,
					align: 'center',
					render: (h, params) => {
						return h(subTable, {
							props: {
								row: params.row.postInfo,
								nodeTypeList: this.nodeTypeList,
								type: this.selectTab + '',
								flag: params.row.flag
							}
						})
					}
				}
			],
			tableData: [], //表格数据
			tabList: [
				//变化类型
				{
					active: true,
					value: 1,
					name: '新增'
				},
				{
					active: false,
					value: 2,
					name: '删除'
				},
				{
					active: false,
					value: 0,
					name: '修改'
				}
			],
			nodeTypeList: [],
			selectTab: 1, //选中的变化类型
			total: 0,
			page: 1,
			pageSize: 20
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getLocal()
		this.getGatewayTree()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		_forEach: function(data, isTrue, callback) {
			var arr = []
			for (var i = 0; i < data.length; i++) {
				arr.push(data[i])
			}
			while (arr.length) {
				var _p = arr.shift()
				if (callback(_p) == false) {
					return
				}
				if (isTrue && _p.children) {
					for (var j = _p.children.length - 1; j >= 0; j--) {
						arr.unshift(_p.children[j])
					}
				}
			}
		},
		// 获取网关树
		getGatewayTree() {
			this.axios.getTreeList({ iFlag: 3 }).then(res => {
				if (res.code == 200 && res.data) {
					let flgaNum = 2
					this._forEach(res.data, true, item => {
						item.expand = true
						if (item.flag == flgaNum) {
							this.dtuId = item.dtuId
							item.selected = true
							flgaNum = 'a'
						}
					})
					this.treeData = res.data
					this.getTable()
				}
			})
		},
		// 树点击
		handleStationTree(data) {
			// console.log(data)
			if (data && data.length > 0) {
				if (data[0].flag == 2) {
					this.dtuId = data[0].id
					this.getTable()
				} else {
					this.dtuId = ''
					this.tableData = []
				}
			}
		},
		//变化类型tab点击
		changeTab(tar) {
			this.tabList.forEach(item => {
				item.active = false
			})
			tar.active = true
			this.selectTab = tar.value
			;(this.page = 1), (this.pageSize = 20)
			this.tableData = []
			this.getTable()
		},
		getLocal() {
			this.$api.getLocalData().then(res => {
				this.nodeTypeList = res.data.nodeTypeList
			})
		},
		//分页
		handleChangePage(page) {
			this.page = page
			this.getTable()
		},
		//分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getTable()
		},

		// 获取表格
		getTable(type) {
			let params = {
				// page: {
				// 	pageNum: this.page,
				// 	pageSize: this.pageSize
				// },
				// acSmtypeEntity: {
				dtuId: this.dtuId,
				flag: this.selectTab,
				currentPage: this.page,
				pageSize: this.pageSize
				// }
			}
			this.loading = true
			this.axios
				.getTableList(params)
				.then(res => {
					if (res.code == 200) {
						this.tableData = res.data.lists
						this.tableData.forEach(item => {
							item.operType1 = this.selectTab == 1 ? '新增' : this.selectTab == 0 ? '修改' : this.selectTab == 2 ? '删除' : ''
						})
						this.total = res.data.page.totalNum
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(err => {
					this.loading = false
				})
		}
	}
}
</script>
<style lang="stylus" scoped>
.sync-compared {
  width: 100%;

  // height: calc(100vh - 140px);
  .left-tree {
    width: 320px;
    height: calc(100vh - 190px);
    background-color: #fff;
    border: 10px solid #fff;
    overflow: auto;
    float: left;
  }

  .right-content {
    width: calc(100% - 330px);
    height: 100% !important;
    float: left;
    margin-left: 10px;

    .search-bar {
      .ivu-btn {
        margin-right: 10px;
      }

      .search-header-wrapper .form-item span {
        font-size: 14px;
      }

      .ivu-input-wrapper input {
        font-size: 14px;
      }

      .rt-tabs { // 顶部tabs
        height: 35px;
        line-height: 35px;
        float: left;

        p {
          float: left;
          font-size: 16px;
          margin-right: 10px;
        }

        .myTabs {
          display: inline-block;
          height: 100%;
          padding: 0 25px;
          border-radius: 5px;
          margin-right: 5px;
          text-align: center;
          font-size: 16px;
          background: #dcdee2;
          cursor: pointer;
        }

        .active {
          background: #2d8cf0;
          color: #fff;
          transform: translate3d(-2px, -2px, 0px);
          transition: all 0.3s ease;
        }
      }
    }

    .table-content {
      width: 100%;

      // position: relative;
      /deep/ .ivu-table-wrapper {
        height: calc(100vh - 265px) !important;

        .ivu-table-body, .ivu-table-overflowY, .ivu-table-tip, .ivu-table-tip td {
          height: calc(100vh - 305px) !important;
        }
      }

      /deep/.ivu-table {
        p {
          color: #19be6b;
        }

        b {
          font-weight: 400;
          color: #ff9900;
        }

        i {
          font-style: normal;
        }
      }

      /deep/tr.ivu-table-row-hover td {
        background-color: #F5F7FA;
      }

      /deep/.ivu-btn {
        font-size: 14px;
      }

      .table-page {
        width: 100%;
        margin-top: 10px;

        // position: absolute;
        // bottom: -15px;
        .page-content {
          width: 800px;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
