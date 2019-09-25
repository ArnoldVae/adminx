<template>
	<div>
		<div class="right-content">
			<transition name="el-fade-in-linear">
				<div class="search-bar">
					<searche-Header-Wrapper>
						<form-item
							title="预案名称"
							type="text"
							v-model="searchData.vcName"
							placeholder="输入预案名称"
							@on-enter="searchStation"
							clearable
							noMBottom
						></form-item>
						<form-item
							title="类型"
							type="select"
							v-model="searchData.intType"
							:options="typeList"
							:setings="{ value: 'dictID', label: 'vcName' }"
							noMBottom
						></form-item>
						<form-item
							title="等级"
							type="select"
							v-model="searchData.intLevel"
							:options="levelList"
							:setings="{ value: 'value', label: 'label' }"
							noMBottom
						></form-item>
						<Button type="info" size="large" icon="md-search" @click="searchStation">查询</Button>
						<Button
							class="reset"
							type="primary"
							size="large"
							icon="md-refresh"
							@click="handleResetData"
						>重置</Button>
						<Button type="success" size="large" icon="md-add" @click="handleModalShow">新增</Button>
					</searche-Header-Wrapper>
				</div>
			</transition>

			<!-- 表格 -->
			<div class="table-content">
				<Table border ref="selection" :columns="tableColumns" :data="tableData" height="650">
					<template slot-scope="{ row}" slot="img">
						<div class="showPicture">
							<img class="pictureShow" :src="row.vcPictureAbsDir+row.vcPicture" alt />
							<div class="img-modal">
								<img :src="row.vcPictureAbsDir+row.vcPicture" alt />
							</div>
						</div>
					</template>
				</Table>
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

		<!-- 新增、编辑弹窗 -->
		<Modal
			v-model="modaleditShow"
			:title="tt"
			center
			class="edit-modal"
			:mask-closable="false"
			@on-visible-change="close"
		>
			<Form
				ref="editFormRef"
				:rules="ruleValidate"
				:model="editFormData"
				:label-width="80"
				label-position="right"
			>
				<div class="search-bar">
					<searche-Header-Wrapper>
						<FormItem label="预案名称" prop="vcName">
							<Input v-model="editFormData.vcName" placeholder="输入预案名称" style="width: 170px" />
						</FormItem>
						<FormItem label="类型" prop="intType">
							<Select v-model="editFormData.intType" style="width: 170px" placeholder="请选择类型">
								<Option v-for="item in typeList" :key="item.dictID" :value="item.dictID">{{item.vcName}}</Option>
							</Select>
						</FormItem>
						<FormItem label="级别" prop="intLevel">
							<Select v-model="editFormData.intLevel" style="width: 170px" placeholder="请选择级别">
								<Option v-for="item in levelList" :key="item.value" :value="item.value">{{item.label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="备注" prop="vcMemo">
							<Input
								type="textarea"
								v-model="editFormData.vcMemo"
								placeholder="请输入..."
								style="width: 500px"
							/>
						</FormItem>
					</searche-Header-Wrapper>
				</div>
				<div class="info">
					<div class="info-left">
						<el-row class="mingxi">
							<el-col>
								预案明细
								<Button @click="add" type="success" size="large" icon="md-add" style="float: right">新增</Button>
								<Button type="info" style="margin: 0 20px;float: right" size="large" @click="up">上移</Button>
								<Button type="primary" size="large" @click="down" style="float: right">下移</Button>
							</el-col>
						</el-row>
						<div class="info-body">
							<el-table
								:data="editFormData.fireRpItemDtoList"
								style="width: 100%"
								height="300"
								empty-text="暂无数据"
								:highlight-current-row="isCurrent"
								border
								@row-click="rowClick"
							>
								<el-table-column type="index" width="30"></el-table-column>

								<el-table-column prop="vcItemContext">
									<template slot-scope="scope">
										<el-input
											@blur="leave(scope.row,scope.$index)"
											type="textarea"
											size="small"
											v-model="plan"
											placeholder="请输入内容"
											v-if="scope.row.rowShow"
										></el-input>
										<span v-else>{{ scope.row.vcItemContext }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="action" label="操作" align="center" width="178">
									<template slot-scope="scope">
										<div v-if="!scope.row.rowShow">
											<el-button
												@click="Edit(scope.row,scope.$index)"
												type="warning"
												size="small"
												icon="el-icon-edit-outline"
											>编辑</el-button>
											<el-button
												@click="Delete(scope, scope.$index)"
												type="danger"
												size="small"
												icon="el-icon-delete"
											>删除</el-button>
										</div>
										<div v-else>
											<el-button
												@click="confir(scope, scope.$index)"
												type="success"
												size="small"
												icon="el-icon-success"
											>完成</el-button>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
					<div class="info-right">
						<el-row>
							<el-col>新增/修改操作流程图（点击）</el-col>
						</el-row>
						<div class="info-right-bottom">
							<Upload
								type="drag"
								:before-upload="handleUpload"
								:default-file-list="fileLists"
								action="https://jsonplaceholder.typicode.com/posts/"
							>
								<div>
									<img
										class="img"
										v-if="(editFormData.vcPictureAbsDir+editFormData.vcPicture)"
										:src="(editFormData.vcPictureAbsDir+editFormData.vcPicture)"
										alt
									/>
									<img class="uploadImg" v-else src="../assets/img/upload.png" alt />
								</div>
							</Upload>
						</div>
					</div>
				</div>
			</Form>
			<div slot="footer" style="text-align:center">
				<Button type="info" style="margin-right: 20px" size="large" @click="planCancel">取消</Button>
				<Button type="primary" size="large" @click="planSave">保存</Button>
			</div>
		</Modal>
	</div>
</template>
<script>

export default {
	name: 'fire-part',
	components: {},
	props: {},
	data() {
		return {
			tt: '应急预案新增',
			isAdd: true,
			itemIds: [],
			forData: [],
			file: {},
			fileList: [],
			isCurrent: false,
			typeList: [],// 类型下拉框
			levelList: [// 级别下拉框
				{
					value: 1,
					label: '一级'
				},
				{
					value: 2,
					label: '二级'
				},
				{
					value: 3,
					label: '三级'
				}
			],
			searchData: {//查询条件
				vcName: '',// 维保单位名称
				intType: '',
				intLevel: ''
			}, 
			axios: this.$api.contingencyPlan,
			treeData: [],
			unitId: '',
			orgId: '',
			isTree: false,
			isFile: false,
			stationName: '',
			modalShow: false,
			modaleditShow: false,
			step: 0,
			file: null,
			accept: '.svg',
			Format: ['.svg'],
			tableColumns: [
				{
					title: '预案名称',
					key: 'vcName',
					align: 'center',
					maxWidth: 230
				},
				{
					title: '类型',
					key: 'typeStr',
					align: 'center',
					width: 260
				},
				{
					title: '级别',
					key: 'levelStr',
					width: 160,
					align: 'center'
				},
				{
					title: '处置流程图',
					key: 'vcPicture',
					align: 'center',
					width: 200,
					slot: 'img'
				},
				{
					title: '备注',
					key: 'vcMemo',
					minWidth: 200,
					align: 'center'
				},
				{
					title: '操作',

					key: 'action',
					align: 'center',
					width: 230,
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'warning',
										icon: 'ios-create-outline'
									},
									on: {
										click: () => {
											this.editModalShow(params)
										}
									}
								},
								'编辑'
							),
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
			// 表单验证
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				intType: [{ required: true, message: '该项为必填项', trigger: 'change',type:'number' }],
				intLevel: [{ required: true, message: '该项为必填项', trigger: 'change',type:'number' }]
			},
			//编辑表单数据
			editFormData: {
				vcName: '',
				intType: '',
				intLevel: '',
				vcMemo: '',
				id: '',
				frpid: '',
				fireRpItemDtoList: []
			},
			planData: [],
			options: [],
			plan: '',
			// 分页信息
			total: 3,
			page: 1,
			pageSize: 20,
			modalShow: false,

			fileLists: []
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getDate()
		this.getTable()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//点击表格
		rowClick(row) {
			this.isCurrent = true
			this.forData = row
			// console.log(row)
		},

		//上移
		up() {
			if (this.forData.length == 0) {
				this.$Message.info({
					content: '请点击列表信息!!!',
					duration: 3
				})
			} else {
				let index = this.editFormData.fireRpItemDtoList.findIndex((item, index) => {
					return item == this.forData
				})
				if (index - 1 >= 0) {
					let temp = this.editFormData.fireRpItemDtoList[index]
					this.$set(this.editFormData.fireRpItemDtoList, index, this.editFormData.fireRpItemDtoList[index - 1])
					this.$set(this.editFormData.fireRpItemDtoList, index - 1, temp)
				}
			}
		},
		
		//下移
		down() {
			if (this.forData.length == 0) {
				this.$Message.info({
					content: '请点击列表信息!!!',
					duration: 3
				})
			} else {
				let index = this.editFormData.fireRpItemDtoList.findIndex((item, index) => {
					return item == this.forData
				})
				if (index + 1 <= this.editFormData.fireRpItemDtoList.length - 1) {
					let temp = this.editFormData.fireRpItemDtoList[index]
					this.$set(this.editFormData.fireRpItemDtoList, index, this.editFormData.fireRpItemDtoList[index + 1])
					this.$set(this.editFormData.fireRpItemDtoList, index + 1, temp)
				}
			}
		},

		//取消按钮
		planCancel() {
			this.editFormData = {
				vcName: '',
				intType: '',
				intLevel: '',
				vcMemo: '',
				id: '',
				frpid: '',
				fireRpItemDtoList: []
			}
			this.modaleditShow = false
		},

		//	关闭弹窗
		close() {
			if (!this.modaleditShow) {
				this.$refs.editFormRef.resetFields()
				this.editFormData = {
					vcName: '',
					intType: '',
					intLevel: '',
					vcMemo: '',
					id: '',
					frpid: '',
					fireRpItemDtoList: []
				}
				this.fileLists = []
			}
		},

		//添加、修改保存
		planSave() {
			this.$refs.editFormRef.validate(async valid => {
				if (!valid) return

				let formData = new FormData()
				formData.append('file', this.file)
				formData.append('vcName', this.editFormData.vcName)
				formData.append('intType', this.editFormData.intType)
				formData.append('intLevel', this.editFormData.intLevel)
				formData.append('frpid', this.editFormData.frpid)
				formData.append('id', this.editFormData.id)
				formData.append('vcMemo', this.editFormData.vcMemo)
				let array = []
				this.editFormData.fireRpItemDtoList.forEach((item, index) => {
					let obj = {
						frpid: this.editFormData.frpid,
						id: item.id,
						intFlag: item.intFlag,
						intSort: index + 1,
						vcItemContext: item.vcItemContext,
						vcMemo: item.vcMemo
					}
					array.push(obj)
				})

				formData.append('fireRpItemStr', JSON.stringify(array))
				if (this.isAdd) {
					let res = await this.axios.editTableDate(formData)
					if (res.success) {
						this.itemIds = []
						this.getTable()

						this.modaleditShow = false
					}
				} else {
					formData.append('fireRpItemDelStr', JSON.stringify(this.itemIds))
					let res = await this.axios.editTableDate(formData)
					if (res.success) {
						this.itemIds = []
						this.getTable()

						this.modaleditShow = false
					}
				}
			})
		},

		//编辑完成
		confir(params, index) {
			this.editFormData.fireRpItemDtoList[index].rowShow = false
		},

		//删除应急预案
		Delete(params, index) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除所选项?',
				onOk: () => {
					this.itemIds.push({ id: params.row.id })
					this.editFormData.fireRpItemDtoList.splice(index, 1)
					// console.log(this.itemIds)
					this.forData = []
				},
				onCancel: () => {}
			})
		},

		//修改应急预案
		Edit(row, index) {
			this.editFormData.fireRpItemDtoList.forEach((item, idx) => {
				if (item.rowShow) {
					this.editFormData.fireRpItemDtoList[idx].rowShow = false
				}
			})

			this.plan = row.vcItemContext
			this.editFormData.fireRpItemDtoList[index].rowShow = true
		},

		//失去焦点
		leave(item, index) {
			this.editFormData.fireRpItemDtoList[index].vcItemContext = this.plan //应急预案
			this.editFormData.fireRpItemDtoList[index].rowShow = false
		},

		//新增预案
		add() {
			this.editFormData.fireRpItemDtoList.forEach((item, idx) => {
				if (item.rowShow) {
					// this.editFormData.fireRpItemDtoList[idx].rowShow = false
					item.rowShow = false
				}
			})
			this.editFormData.fireRpItemDtoList.push({
				plan: '',
				rowShow: true
			})
			this.plan = ''
		},

		// 查询
		searchStation() {
			this.getTable()
		},

		// 重置
		handleResetData() {
			this.searchData.vcName = ''
			this.searchData.intType = ''
			this.searchData.intLevel = ''
			this.getTable()
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

		//获取所有消防类型
		getDate() {
			this.axios.getContingencyPlanDate({ dictGroupID: 9004 }).then(res => {
				if (res.code == 200) {
					this.typeList = res.data.lists[0].dictDataList
				}
			})
		},

		// 获取表格数据列表
		getTable() {
			let params = {
				currentPage: this.page,
				pageSize: this.pageSize,
				vcName: this.searchData.vcName,
				intType: this.searchData.intType,
				intLevel: this.searchData.intLevel
			}
			this.axios.getTableList(params).then(res => {
				if (res.code == 200) {
					this.tableData = res.data.list
					this.total = res.data.total
					// console.log(this.tableData)
				}
			})
		},

		// 删除
		handleRemove(params) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除所选项?',
				onOk: () => {
					this.axios.delTableDate({ id: params.row.id }).then(res => {
						if (res.code == 200) {
							this.$Message.success('删除成功')
							this.page = 1
							this.getTable()
						} else {
							this.$Message.warning(res.msg)
						}
					})
				},
				onCancel: () => {}
			})
		},

		//编辑按钮
		async editModalShow(params) {
			this.tt = '应急预案编辑'
			this.isAdd = false
			let param = {
				frpid: params.row.frpid
			}
			let res = await this.axios.getAllContingencyPlanDate(param)
			if (res.success) {
				this.editFormData = JSON.parse(JSON.stringify(params.row))
				// console.log(this.editFormData)
				this.editFormData.fireRpItemDtoList = res.data.list

				this.editFormData.fireRpItemDtoList.forEach((subItem, i) => {
					subItem['rowShow'] = false
				})

				this.modaleditShow = true
			}
		},

		// 添加按钮
		handleModalShow() {
			this.tt = '应急预案新增'
			this.isAdd = true
			this.modaleditShow = true
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
		},

		handlePreview(file) {},
		handleUpload(file) {
			this.file = file
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
.fire-part {
  width: 100%;

  // height: calc(100vh - 160px);
  .left-tree {
    width: 240px;
    height: calc(100vh - 194px);
    background-color: #fff;
    border: 10px solid #fff;
    overflow: auto;
    float: left;
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

    .table-content {
      width: 100%;

      // flex: 1;
      // position: relative;
      /deep/ .ivu-table-wrapper {
        height: calc(100vh - 268px) !important;

        .ivu-table-body, .ivu-table-overflowY, .ivu-table-tip, .ivu-table-tip td {
          height: calc(100vh - 270px) !important;
        }
      }

      // /deep/.ivu-table-body, /deep/.ivu-table-overflowY {
      // height: calc(100% - 40px) !important;
      // }
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
        bottom: 20px;

        .page-content {
          width: 800px;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}

.upload-content {
  width: 100%;
  height: 100%;
  position: relative;

  .steps {
    margin-left: 30px;
    margin-bottom: 30px;
  }

  .up-box {
    margin-left: 50px;
    font-size: 16px;
    color: #515a6e;
    margin-top: 30px;

    span {
      font-size: 16px;
      margin-top: 10px;
      color: #464c5b;
      font-weight: 700;
      display: block;

      .del {
        float: left;
        display: inline-block;
        width: 30px;
        text-align: center;
        font-size: 18px;
        line-height: 100%;
        color: #2b85e4;
        cursor: pointer;

        &:hover {
          color: #ed4014;
        }
      }
    }
  }

  .btn1 {
    width: 400px;
    margin: 10px 10px 10px 50px;
  }
}

.axis-form-item {
  .icon-wrapper {
    width: 80px;
    height: 32px;
    flex-align(center, center);
    margin-left: 10px;

    .ivu-icon {
      font-size: 24px;
      cursor: pointer;

      &:hover {
        color: #2d8cf0;
      }
    }
  }

  /deep/.ivu-form-item-content {
    display: flex;

    .ivu-input-wrapper {
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
}

/deep/ .ivu-btn-error {
  margin-left: 10px;
}

.reset {
  margin: 0 10px;
}

.edit-modal {
  /deep/ .ivu-modal {
    width: 1406px !important;

    .search-header-wrapper {
      padding: 0 !important;
      margin-bottom: 0;
    }

    .ivu-modal-content {
      height: 768px !important;
      position: relative;

      .ivu-modal-footer {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
      }
    }
  }
}

// /deep/ .ivu-modal-header {
// background-color: #4e89bb;
// color: #fff;
// }
/deep/ .el-table thead {
  display: none;
}

/deep/ .lastForm .content-wrap .ivu-input-wrapper {
  width: 27.37rem !important;

  .ivu-input {
    max-height: 54.9997px;
  }
}

/deep/ .ivu-modal-content {
  top: -50px !important;
}

.info {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  height: 555px;

  /deep/ .ivu-upload-drag {
    height: 489px !important;

    // padding: 5px;
    .img {
      height: 489px;
      width: 100%;
    }

    .uploadImg {
      position: relative;
      top: 200px;
      width: 40%;
      height: 60px;
    }
  }

  /deep/ .ivu-upload-list-file {
    position: relative;
    font-size: 14px;
    bottom: 60px;
  }

  .info-left {
    width: 64%;
    // height: 200px;
    border: 1px solid #ccc;

    /deep/ .el-textarea__inner {
      min-height: 51px !important;
    }

    .mingxi {
      padding: 5px;
      border-bottom: 1px solid #ccc;
      font-weight: 700;
      font-size: 14px;
      background-color: #f8f8f9;

      .el-col {
        line-height: 32px;
      }
    }

    /deep/ .el-table__body-wrapper {
      height: 483px !important;
    }

    .info-body {
      height: 85%;

      .el-table {
        height: 484px !important;
      }

      /deep/ textarea.ivu-input {
        border: none !important;
        outline: none !important;
        border-left: 1px solid #ccc !important;
      }

      .el-col:first-child {
        text-align: center;
        height: 100%;
        width: 58.25px;

        // line-height: 50px;
        button {
          width: 100%;
        }
      }

      .el-row {
        height: 100%;
        border: 1px solid #ccc !important;
      }
    }
  }

  .info-right {
    width: 34%;
    border: 1px solid #ccc;

    .el-row {
      padding: 5px;
      border-bottom: 1px solid #ccc;
      font-weight: 700;
      font-size: 14px;
      background-color: #f8f8f9;

      .el-col {
        line-height: 32px;
      }
    }
  }
}

.img-modal {
  position: fixed;
  top: 235px;
  left: 1120px;
  width: 456px;
  height: 489px;
  display: none;

  img {
    width: 100%;
    height: 100%;
    s;
  }
}

.pictureShow {
  height: 80px;
  width: 100px;
}

.showPicture:hover {
  .img-modal {
    display: block;
  }
}
</style>
