<template>
	<div class="data-upload">
		<!-- 左侧树 -->
		<div class="left-tree">
			<search-tree :data="stationTree" @on-select-change="handleStationTree" placeholder="输入关键词搜索...">
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<div class="right-content">
			<div class="tab-box">
				<Tabs value="0" @on-click="handleTabs">
					<TabPane label="鲁能数据导入" name="0"></TabPane>
					<TabPane label="地面机器人导入" name="1"></TabPane>
					<TabPane label="高清视频" name="2"></TabPane>
				</Tabs>
			</div>
			<div class="lf-content" v-show="tabsType != 2">
				<Card style="width:100%;height:100%">
					<div class="upload-content">
						<p>{{ tabsName }}文件导入</p>
						<Steps class="steps" direction="vertical" :current="step">
							<Step title="步骤一" content="先选择左侧变电站"></Step>
							<Step title="步骤二" :content="fileType"></Step>
							<Step title="步骤三" content="选择完毕后点击 '导入' 按钮进行上传"></Step>
							<Step title="步骤四" content="等待导入成功"></Step>
						</Steps>
						<!-- 鲁能 -->
						<Upload type="drag" :before-upload="handleUpload" action :accept="accept" :format="Format" :disabled="!isTree" v-if="upShow">
							<div style="padding: 20px 0" @click="upClick">
								<Icon type="ios-add-circle-outline" size="52" style="color: #3399ff"></Icon>
								<p>选择导入文件</p>
							</div>
						</Upload>
						<!-- 大华 -->
						<Upload type="drag" :before-upload="handleUpload" action :accept="accept1" :format="Format1" :disabled="!isTree" v-if="!upShow">
							<div style="padding: 20px 0" @click="upClick">
								<Icon type="ios-add-circle-outline" size="52" style="color: #3399ff"></Icon>
								<p>选择导入文件</p>
							</div>
						</Upload>
						<div v-if="file !== null" class="up-box">
							待导入文件:
							<span>
								<div class="del" @click="removeFile">
									<i class="el-icon-delete"></i>
								</div>
								{{ file.name }}
							</span>
						</div>
						<Button class="upload-btn" type="success" icon="md-cloud-upload" @click="upload" :loading="loadingStatus" long>
							{{ loadingStatus ? '文件导入中 请稍后...' : '导入' }}
						</Button>
					</div>
				</Card>
			</div>
			<div class="rt-content">
				<Card style="width:100%;height:100%">
					<p>{{ tabsName }}数据展示</p>
					<div class="tree-box">
						<!-- <search-tree
              :data="treeData"
              placeholder="输入关键词搜索..."
              v-loading="treeLoading"
              element-loading-text="数据加载中"
            >
              <Icon type="ios-search" slot="suffix"/>
            </search-tree>-->
						<el-input placeholder="输入关键字进行搜索..." v-model="filterText"></el-input>
						<el-tree
							class="filter-tree"
							:data="treeData"
							:props="defaultProps"
							node-key="expandId"
							@node-click="handleFileTree"
							:default-expanded-keys="[1]"
							empty-text="暂无数据"
							v-loading="treeLoading"
							element-loading-text="数据加载中..."
							:indent="24"
							:filter-node-method="filterNode"
							ref="tree"
						></el-tree>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
	name: 'data-upload',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$api.systemsManage.dataUpload,
			filterText: '',
			unitId: '',
			isTree: false,
			treeLoading: false,
			stationTree: [],
			treeData: [],
			defaultProps: {
				children: 'children',
				label: 'title'
			},
			upShow: true,
			tabsType: 0,
			tabsName: '鲁能',
			fileType: '点击 选择导入文件 (.json格式文件)',
			modalShow: false,
			step: 0,
			file: null,
			loadingStatus: false,
			accept: '.json',
			Format: ['.json'],
			accept1: '.xlsx,.xls',
			Format1: ['.xlsx,.xls']
		}
	},
	computed: {},
	filters: {},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val)
		}
	},
	created() {
		this.getStationTree()
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
		// 获取组织树
		getStationTree() {
			this.axios.getUnitTree({ iFlag: 2 }).then(res => {
				if (res.code == 200 && res.data) {
					let flgaNum = 1
					this._forEach(res.data, true, item => {
						item.expand = true
						if (item.flag == flgaNum) {
							item.selected = true
							this.unitId = item.id
							this.isTree = !!this.unitId
							this.step = 1
							flgaNum = 'a'
						}
					})
					this.stationTree = res.data
					if (this.tabsType == 0) {
						this.getDataTree()
					} else {
						this.getExcleData()
					}
				}
			})
		},
		// 获取鲁能文件树
		getDataTree() {
			let params = {
				unitId: this.unitId
			}
			this.treeLoading = true
			this.axios
				.getDataTree(params)
				.then(res => {
					if (res.code == 200 && res.data.length > 0) {
						res.data[0].expand = true
						res.data[0].expandId = 1
						// res.data[0].id = 0
						this.treeData = res.data
						this.treeLoading = false
					} else {
						this.treeData = []
						this.treeLoading = false
					}
				})
				.catch(error => {
					this.treeData = []
					this.treeLoading = false
					this.$Message.error(error.response.data.msg)
				})
		},
		// 获取大华文件树
		getExcleData() {
			this.treeLoading = true

			this.axios
				.getExcleData({ unitId: this.unitId })
				.then(res => {
					if (res.code == 200 && res.data.length > 0) {
						res.data[0].expand = true
						res.data[0].expandId = 1
						this.treeData = res.data
						this.treeLoading = false
					} else {
						this.treeData = []
						this.treeLoading = false
					}
				})
				.catch(error => {
					this.treeData = []
					this.treeLoading = false
					this.$Message.error(error.response.data.msg)
				})
		},
		// 获取高清视频文件树
		getVideoData() {
			let params = {
				// unitId: "42389edde72d41f4bcd978b574eefbae"
				unitId: this.unitId
			}
			this.treeLoading = true
			this.axios
				.getVideoTree(params)
				.then(res => {
					if (res.code == 200 && res.data.length > 0) {
						res.data[0].expand = true
						res.data[0].expandId = 1
						this.treeData = res.data
						this.treeLoading = false
					} else {
						this.treeData = []
						this.treeLoading = false
					}
				})
				.catch(error => {
					this.treeData = []
					this.treeLoading = false
					this.$Message.error(error.response.data.msg)
				})
		},
		// 变电站树点击
		handleStationTree(data) {
			console.log(data)
			if (data[0].flag == 0) {
				// 如果不是变电站
				this.unitId = ''
				this.isTree = false // 新增不能点击
				this.step = 0
			} else {
				// 是变电站
				this.unitId = data[0].id
				this.isTree = true
				this.step = 1
				if (this.file) {
					this.step = 2
				}
				if (this.tabsType == 0) {
					this.getDataTree()
				} else if (this.tabsType == 1) {
					this.getExcleData()
				} else {
					this.getVideoData()
				}
			}
		},
		// 文件树点击
		handleFileTree(data) {
			console.log(data)
		},
		// 顶部tab点击
		handleTabs(name) {
			this.tabsType = name
			this.tabsName = name == 0 ? '鲁能' : name == 1 ? '地面机器人' : '高清视频'
			this.fileType = name == 0 ? '点击 选择导入文件 (.json格式文件)' : '点击 选择导入文件 (.xlsx .xls格式文件)'
			this.upShow = name == 0

			this.file = null
			this.isFile = false
			this.loadingStatus = false
			this.step = this.isTree ? 1 : 0
			this.treeData = []
			if (name == 0) {
				this.getDataTree()
			} else if (name == 1) {
				this.getExcleData()
			} else {
				this.getVideoData()
			}
		},
		// 选择文件
		handleUpload(file) {
			if (this.isTree) {
				// 添加文件
				this.file = file
				this.step = 2
				this.isFile = true
				return false
			} else {
				this.$Message.warning('请选择左侧变电站')
				this.step = 0
			}
		},
		// 移除文件
		removeFile() {
			this.file = null
			this.step = 1
			this.isFile = false
		},
		// 上传提交
		upload() {
			// 点击上传
			if (this.isFile) {
				this.step = 3
				this.loadingStatus = true
				let params = new FormData() // 创建form对象
				if (this.tabsType == 0) {
					// 鲁能
					if (this.file.name.substring(this.file.name.length - 4) == 'json' || this.file.name.substring(this.file.name.length - 4) == 'JSON') {
						params.append('multipartFile', this.file) // 通过append向form对象添加数据
						params.append('unitId', this.unitId) // 添加变电站id
						params.append('serviceId', 0)
						let config = { 'Content-Type': 'multipart/form-data' } // 添加请求头
						this.axios
							.uploadApi(params, config)
							.then(res => {
								if (res.code == 200) {
									this.file = null
									this.loadingStatus = false
									this.$Message.success({ duration: 3, content: '文件上传成功' })
									this.getDataTree()
									this.step = 1
								} else {
									this.file = null
									this.loadingStatus = false
									this.$Message.error(res.msg)
								}
							})
							.catch(error => {
								this.file = null
								this.loadingStatus = false
								this.$Message.error(error.response.data.msg)
							})
					} else {
						this.file = null
						this.isFile = false
						this.step = 0
						this.$Message.warning('请选择.json格式的文件')
					}
				} else {
					// 大华
					let fileName = this.file.name.substring(this.file.name.length - 3)
					let fileName1 = this.file.name.substring(this.file.name.length - 4)
					if (fileName == 'xls' || fileName == 'XLS' || fileName1 == 'xlsx' || fileName1 == 'XLSX') {
						params.append('file', this.file) // 通过append向form对象添加数据
						params.append('unitId', this.unitId) // 添加变电站id
						let config = { 'Content-Type': 'multipart/form-data' } // 添加请求头
						this.axios
							.uploadExcleApi(params, config)
							.then(res => {
								if (res.code == 200) {
									this.file = null
									this.loadingStatus = false
									this.$Message.success({ duration: 3, content: '文件上传成功' })
									this.getExcleData()
									this.step = 1
								} else {
									this.file = null
									this.loadingStatus = false
									this.$Message.error(res.msg)
								}
								// console.log(res)
							})
							.catch(error => {
								this.file = null
								this.loadingStatus = false
								this.$Message.error(error.response.data.msg)
							})
					} else {
						this.file = null
						this.isFile = false
						this.step = 0
						this.$Message.warning('请选择.xls或.xlsx格式的文件')
					}
				}
			} else {
				this.$Message.warning('请选择需要上传的文件')
			}
		},
		// 点击选择文件的验证
		upClick() {
			if (!this.isTree) {
				this.$Message.warning('请选择左侧变电站')
			}
		},
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
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
.data-upload {
  width: 100%;
  height: calc(100vh - 160px);

  .left-tree {
    width: 330px;
    height: 100%;
    background-color: #fff;
    border: 10px solid #fff;
    overflow: auto;
    float: left;
  }

  .right-content {
    width: calc(100% - 340px);
    height: 100%;
    float: left;
    margin-left: 10px;

    .tab-box {
      height: 50px;

      /deep/.ivu-tabs {
        height: 100%;
        background-color: #fff;

        .ivu-tabs-tab {
          border-radius: 5px;
          font-size: 16px;
          font-weight: 700;
        }

        .ivu-tabs-tab-active {
        }
      }

      /deep/.ivu-tabs-content {
        height: 100%;
      }
    }

    .lf-content {
      width: calc(30% - 5px);
      height: calc(100% - 50px);
      float: left;

      .upload-content {
        width: 100%;
        height: 100%;
        position: relative;
        margin-top: 10px;

        p {
          width: 100%;
          height: 50px;
          font-size: 18px;
          line-height: 30px;
          font-weight: 700;
        }

        .steps {
          margin-left: 20px;
        }

        /deep/.ivu-steps-content {
          font-size: 14px;
        }

        .up-box {
          margin-left: 50px;
          font-size: 16px;
          color: #515a6e;
          margin-top: 50px;

          span {
            font-size: 16px;
            margin-top: 20px;
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

        .upload-btn {
          margin-top: 50px;
          height: 40px;
          font-size: 18px;
        }
      }
    }

    .rt-content {
      width: calc(70% - 5px);
      height: calc(100% - 50px);
      margin-left: 10px;
      float: left;

      /deep/.ivu-card {
        overflow-y: auto;
      }

      p {
        width: 100%;
        height: 50px;
        font-size: 18px;
        line-height: 30px;
        font-weight: 700;
      }

      .tree-box {
        width: 100%;
        height: 100%;
        // margin-left 50%;
        // transform translateX(-70%);
      }
    }
  }
}
</style>
