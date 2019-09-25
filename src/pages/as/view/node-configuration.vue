<template>
	<div class="robot-configuration">
		<div class="org-tree-wrap" v-loading="orgTreeDataLoading">
			<search-tree
				:data="orgTreeData"
				placeholder="输入关键词搜索..."
				@on-select-change="handleOrgTreeSelect"
			>
				<Icon type="ios-search" slot="suffix" />
			</search-tree>
		</div>
		<div class="content">
			<div class="robot-tree-wrap">
				<div class="robot-list">
					<el-radio-group v-model="robot" size="small" @change="robotChange">
						<el-radio-button
							v-for="(item,index) in robotList"
							:key="index"
							:label="item.key"
						>{{item.name}}</el-radio-button>
					</el-radio-group>
				</div>
				<div class="robot-tree" v-loading="robotTreeLoading">
					<el-input placeholder="输入关键字进行过滤" v-model="robotTreeFilterTxt"></el-input>

					<div class="tree-container">
						<el-tree
							class="filter-tree"
							:data="robotTreeData"
							:props="defaultProps"
							:filter-node-method="filterNode"
							empty-text="暂无数据"
							ref="robotTree"
              show-checkbox
              :load="loadRobotNext"
						></el-tree>
					</div>
				</div>
			</div>
			<div class="transfer-wrap">
				<div class="arrow-wrap">
					<el-button icon="el-icon-arrow-left" @click="removeFromDevice"></el-button>
					<el-button icon="el-icon-arrow-right" @click="addToDevice"></el-button>
				</div>
				<div class="arrow-wrap">
					<el-button icon="el-icon-d-arrow-left"></el-button>
					<el-button icon="el-icon-d-arrow-right"></el-button>
				</div>
			</div>
			<div class="device-tree-wrap" v-loading="deviceTreeLoading">
				<el-input placeholder="输入关键字进行过滤" v-model="deviceTreeFilterTxt"></el-input>

				<div class="tree-container">
					<el-tree
						class="filter-tree"
						:data="deviceTreeData"
						:props="defaultProps"
						:filter-node-method="filterNode"
						empty-text="暂无数据"
						ref="deviceTree"
					></el-tree>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { traversalTree } from '../assets/js/utils'
export default {
	name: 'robot-configuration',
	components: {},
	data() {
		return {
			//组织树
			orgSelect: '',
			orgTreeData: [],
			orgTreeDataLoading: true,

			//机器人列表
			robot: '',
			robotList: [{ name: '室外机器人', key: '1' }, { name: '室内机器人', key: '2' }, { name: '高清巡检', key: '3' }],

			//机器人节点树
			robotTreeFilterTxt: '',
			robotTreeData: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
      robotTreeLoading: false,
      
      //设备节点树
      deviceTreeData:[],
      deviceTreeFilterTxt:'',
      deviceTreeLoading:false

		}
	},
	computed: {},
	watch: {
		filterText(val) {
			this.$refs.robotTree.filter(val)
		}
	},
	created() {
		//组织树加载
		this.$api.common.getOrgTree({ iFlag: 0 }).then(res => {
			// this.orgTreeData = res.success ? res.data : [];
			// this.orgTreeDataLoading = false;
			if (res.success) {
				traversalTree(res.data, true, item => {
					item.expand = true
					// item.selected = true
					if (item.children.length === 0) {
						item.selected = true
					}
				})
				this.orgTreeData = res.data
				this.orgTreeDataLoading = false
			}
		})
	},
	mounted() {},
	activited() {},
	beforeUpdate() {},
	update() {},
	beforeDestory() {},
	methods: {
		//树点击事件
		handleOrgTreeSelect(node) {
			// console.log(node)
			this.orgSelect = node.length > 0 ? node.id : ''
		},
		//选择机器人事件
		robotChange() {
			// console.log(this.robot);
			this.robotTreeLoading = true
			this.getRobotTree()
		},
		//机器人节点树过滤节点
		filterNode(value, data) {
			if (!value) return true
			return data.label.indexOf(value) !== -1
    },
    //获取机器人节点树
		getRobotTree(robotID) {
			this.$api.robotConfiguration
				.getStaticData()
				.then(res => {
					console.log(res)
					// if (res.success) {
					// 	this.robotTreeLoading = false
					// 	this.robotTreeData = res.data
          // }
          this.robotTreeLoading = false
					this.robotTreeData = res.data.data
				})
    },
    //获取设备节点树
    getDeviceTree(robotID){

    },
    //单个节点添加
    addToDevice(){
      let selected = this.$refs.robotTree.getCheckedNodes();
      // console.log(selected)
      if(selected.length === 0){
         this.$message({
          message: '请选择要添加的测点',
          type: 'warning'
        });
        return
      }
    },
    //单个节点移除
    removeFromDevice(){
        let selected = this.$refs.deviceTree.getCheckedNodes();
      // console.log(selected)
      if(selected.length === 0){
         this.$message({
          message: '请选择要移除的测点',
          type: 'warning'
        });
        return
      }
    },
    //懒加载树事件
    loadRobotNext(){
      
    }
	}
}
</script>
<style lang="stylus" scoped>
$wrap-padding = 10px;

.robot-configuration {
  height: 100%;
  display: flex;

  >div {
    height: 100%;
  }

  .org-tree-wrap {
    width: 230px;
    overflow: auto;
    background: #fff;
    padding: $wrap-padding;
  }

  .content {
    flex: 1;
    margin-left: 10px;
    background: #fff;
    display: flex;
    padding: $wrap-padding;

    .robot-tree-wrap, .device-tree-wrap {
      width: 620px;
      border: 1px solid #E8E8E8;
      border-radius: 6px;
      padding: 5px;
      position relative

      .tree-container {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
            border: 1px solid #E8E8E8;
            border-top: none;
          }

     
    }

    .robot-tree-wrap {
      .robot-tree {
        height: calc(100% - 30px);
        padding: $wrap-padding 0;
        position: relative;
        //  .tree-container {
        //     position: absolute;
        //     top: 50px;
        //     left: 0;
        //     right: 0;
        //     bottom: 0;
        //     overflow: auto;
        //     border: 1px solid #E8E8E8;
        //     border-top: none;
        //   }
      }
    }


    .transfer-wrap {
      width: 150px;
      padding: $wrap-padding;
      display: flex;
      flex-direction: column;
      justify-content: center;

      /deep/ .el-button+.el-button{
        margin 0
      }

      .arrow-wrap {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }

    // .device-tree-wrap{
    //   .tree-container {
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         right: 0;
    //         bottom: 0;
    //         overflow: auto;
    //         border: 1px solid #E8E8E8;
    //         border-top: none;
    //         position: relative;
    //       }
    // }
  }
}
</style>