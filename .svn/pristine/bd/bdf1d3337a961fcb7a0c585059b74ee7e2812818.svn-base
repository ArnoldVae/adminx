<template>
	<div class="device-config">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="treeData" @on-select-change="handleStationTree">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<div class="right-content">
			<!-- 表格区 -->
			<div class="table-content">
				<Table
					border
					ref="selection"
					:columns="tableColumns"
					:data="tableData"
					:height="700"
					@on-selection-change="selectionChange"
				></Table>
				<!-- 分页 -->
				<div class="table-page" style="text-align: center;">
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
export default {
	name: 'device-config',
	mixins: [],
	components: {},
	props: {},
	data() {
		return {
			unitId: '',
			btnLoading: false,
			treeData: [], // 左侧树数据
			tableColumns: [
				{
					title: '维保单位',
					key: 'mtcName',
					align: 'center',
					width: 110
				},
				{
					title: '维保变电站',
					key: 'unitName',
					align: 'center',
					width: 150
				},
				{
					title: '维保时间',
					key: 'imtcTime',
					align: 'center',
					width: 150
				},
				{
					title: '操作',
					key: 'idCard',
					align: 'center',
					width: 180,
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'error',
										icon: 'md-trash'
									},
									on: {
										click: () => {
											this.handleRemove(params)
										}
									}
								},
								'删除'
							)
						])
					}
				}
			],
			tableData: [],

			// 分页信息
			total: 0,
			page: 1,
			pageSize: 20,
			deptId: '', //部门id
			mtcCoId: ''
		}
	},
	computed: {},
	filters: {},
	watch: {
		deptId(val) {
			this.$emit('deptId', val)
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//删除
		handleRemove() {
			let params = {
				unitId: this.unitId,
				mtcCoId: this.mtcCoId
			}

			this.$Modal.confirm({
				title: '删除',
				content: '确认删除所选项?',
				onOk: async () => {
					let res = await this.$api.maintenancePerson.delUnitList(params)
						if (res.code == 200) {
							this.$Message.success('删除成功')
							this.page = 1
							this.getTable()
						} else {
							this.$Message.warning(res.msg)
						}
				},
				onCancel: () => {}
			})
		},

		//表格数据选中改变
		selectionChange(selection) {
			this.$emit('addp', selection)
		},

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

		// 获取树结构
		async getStationTree(param) {
			this.mtcCoId = param.mtcCoId

			let result = await this.$api.maintenancePerson.getUnitTree({ iFlag: 3 })
			if (result.code == 200) {
				let flgaNum = 1
				this._forEach(result.data, true, item => {
					item.expand = true
					if (item.flag == flgaNum) {
						item.selected = true
						flgaNum = 'a'
					}
				})
				this.treeData = result.data
				this.unitId = this.treeData[0].children[0].children[0].children[0].children[0].id
				this.$emit('unitId', this.unitId)
				this.getTable()
			}
		},

		// 左侧树点击
		handleStationTree(data) {
			this.unitId = data[0].id
			this.getTable()
			this.$emit('unitId', this.unitId)
		},

		// 获取表格数据
		getTable() {
			let params = {
				unitId: this.unitId,
				mtcCoId: this.mtcCoId
			}
			this.$api.maintenancePerson.getUnitList(params).then(res => {
				if (res.code == 200) {
					this.tableData = res.data
					this.total = res.data.total
				}
			})
		},

		// 分页切换
		handleChangePage(page) {
			this.page = page
			this.getTable()
		},
		
		// 分页条数
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getTable()
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
.device-config {
  width: 100%;
  height: calc(100vh - 550px);

  .left-tree {
    width: 240px;
    height: calc(100% - 30px);
    background-color: #f8f8f9;
    border: 1px solid #ccc;
    margin: -1px 0 0 -1px;
    overflow: auto;
    float: left;

    /deep/ .ivu-input-wrapper {
      display: none;
    }
  }

  .right-content {
    width: calc(100% - 250px);
    height: 100%;
    float: left;
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    .tool-bar {
      .btn-box {
        .ivu-btn {
          margin-right: 10px;
        }
      }
    }

    /deep/ .content-wrap {
      width: 130px;
    }

    .search-bar {
      .ivu-btn {
        margin-left: 9px !important;
      }

      .search-header-wrapper {
        padding: 20px 10px 10px 0;
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
        position: absolute;
        bottom: -15px;

        .page-content {
          width: 800px;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}

/deep/.ivu-radio-wrapper {
  font-size: 14px !important;
}

/deep/.ivu-input-disabled {
  color: #515a6e;
}
</style>
