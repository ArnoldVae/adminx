<template>
  <div class="protectCon">
    <!-- 左侧树 -->
    <div class="left-tree">
      <search-tree :data="treeData" @on-select-change="handleStationTree" placeholder="输入关键词搜索">
        <Icon type="ios-search" slot="suffix"/>
      </search-tree>
    </div>
    <!-- 防护区信息 -->
    <div class="protectZone-info">
      <div class="info-add">
        <div class="info-title">防护区信息</div>
        <el-button @click="infoadd" type="success" size="small" icon="el-icon-plus">新增</el-button>
      </div>
      <div class="info-table">
        <el-table
          :data="infoData"
          style="width: 100%"
          empty-text="暂无数据"
          height="709"
          @row-dblclick="protectRowClcik"
          :row-class-name="tableRowClassName"
          :row-style="rowClass"
          border
        >
          <el-table-column prop="vcName" label="防护区名称" align="center" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.rowShow" class="prarea">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="protectInp"
									 @keyup.native="btKeyUp"
                  @focus="get($event,'信息')"
                  @blur="noGet($event,'信息')"
                ></el-input>
              </span>
              <span v-else>{{ scope.row.vcName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="frpInfoVcName" label="应急预案" align="center" width="155">
            <template slot-scope="scope">
              <el-select
                v-model="contingencyValue"
                placeholder="请选择"
                v-if="scope.row.rowShow"
                no-data-text="无数据"
              >
                <el-option
                  v-for="item in pareaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.frpInfoVcName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="intSort" label="排序" align="center" width="103">
            <template slot-scope="scope">
              <el-input size="small" v-model="sortName" placeholder="排序" v-if="scope.row.rowShow"></el-input>
              <span v-else>{{ scope.row.intSort }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.rowShow">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-check"
									:disabled='disabledShow'
                  @click="save(scope.row, scope.$index)"
                >保存</el-button>
                <el-button
                  type="info"
                  size="small"
                  icon="el-icon-close"
                  @click="scope.row.rowShow=false"
                >取消</el-button>
              </div>
              <div v-else>
                <el-button
                  @click="Edit(scope.row,scope.$index)"
                  type="warning"
                  size="small"
                  icon="el-icon-edit-outline"
                >修改</el-button>
                <el-button
                  @click="Delete(scope.row, scope.$index)"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="info-pages">
          <Page
            @on-change="handleChangePage"
            @on-page-size-change="handleChangePageSize"
            :total="totals"
            :current="curIndex"
            :page-size="pageSize"
            show-elevator
            show-total
            show-sizer
          />
        </div>
      </div>
    </div>
    <!-- 防护区设备 -->
    <div class="protectZone-equ">
			<div class='equtitle'>
			<div class="title">防护区内设备配置</div>
			<div class="areaTitle">{{areaName}}</div>
			</div>
      <div class="equ-search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="设备类型">
            <el-select v-model="formInline.equType" placeholder="请输入设备类型" no-data-text="无数据">
              <el-option
                :label="item.vcName"
                :value="item.devTypeId"
                :key="item.devTypeId"
                v-for="item in equtypeList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="formInline.equName" placeholder="请输入设备名称"></el-input>
          </el-form-item>
          <div class="equ-button">
            <el-button type="primary" size="small" icon="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button @click="equadd" type="success" size="small" icon="el-icon-plus">新增</el-button>
          </div>
        </el-form>
      </div>
      <div class="equ-table">
        <el-table :data="equData" style="width: 100%" empty-text="暂无数据" height="709" border>
          <el-table-column prop="typeStr" label="设备类型" align="center" width="130">
            <template slot-scope="scope">
              <el-select
                v-model="typeValue"
                placeholder="请选择"
                v-if="scope.row.equrowShow"
                no-data-text="无数据"
                @change="equChange"
              >
                <el-option
                  v-for="item in equOptions"
                  :key="item.devTypeId"
                  :label="item.vcName"
                  :value="item.devTypeId"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.typeStr }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="vcName" label="设备名称" align="center" width="165">
            <template slot-scope="scope">
              <span v-if="scope.row.equrowShow" class="equArea">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="equInp"
                  @focus="get($event,'设备')"
                  @blur="noGet($event,'设备')"
                ></el-input>
                <div
                  class="equList"
                  v-if="equmentShow"
                  :style="{'top':equTop+'px','left':equLeft+'px'}"
                >
                  <Menu width="auto" mode="vertical">
                    <MenuItem :name="item.id" v-for="(item, index) in filterequList" :key="index">
                      <p @click="equlistClick(item)">{{ item.vcName }}</p>
                    </MenuItem>
                  </Menu>
                </div>
              </span>
              <span v-else>{{ scope.row.vcName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="intSortId" label="排序" align="center" width="65" class="longSortid">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="equsortName"
                v-if="scope.row.equrowShow"
                class="equsortName"
              ></el-input>
              <span v-else>{{ scope.row.intSortId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="vcParam1" label="参数1" align="center" width="65">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="param1Name"
                class="param1Name"
                v-if="scope.row.equrowShow"
              ></el-input>
              <span v-else>{{ scope.row.vcParam1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="vcParam2" label="参数2" align="center" width="65">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="param2Name"
                class="param2Name"
                v-if="scope.row.equrowShow"
              ></el-input>
              <span v-else>{{ scope.row.vcParam2 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="vcParam3" label="参数3" align="center" width="65">
            <template slot-scope="scope">
              <el-input
                size="small"
                class="param3Name"
                v-model="param3Name"
                v-if="scope.row.equrowShow"
              ></el-input>
              <span v-else>{{ scope.row.vcParam3 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center" width="178">
            <template slot-scope="scope">
              <div v-if="scope.row.equrowShow">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-check"
                  @click="equSave(scope.row, scope.$index)"
                >保存</el-button>
                <el-button
                  type="info"
                  size="small"
                  icon="el-icon-close"
                  @click="scope.row.equrowShow=false"
                >取消</el-button>
              </div>
              <div v-else>
                <el-button
                  @click="equEdit(scope.row,scope.$index)"
                  type="warning"
                  size="small"
                  icon="el-icon-edit-outline"
                >修改</el-button>
                <el-button
                  @click="equDelete(scope.row, scope.$index)"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="equ-pages">
          <Page
            @on-change="handleChangePageEqu"
            @on-page-size-change="handleChangePageSizeEqu"
            :total="equtotals"
            :current="equcurIndex"
            :page-size="equpageSize"
            show-elevator
            show-total
            show-sizer
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pinyin from 'pinyin2'
import searchList from './components/keyword/searchList'
export default {
	name: 'protect-zone',
	components: {
		searchList
	},
	props: {},
	data() {
		return {
			axios: this.$api.protectZone,
			unitId: '',
			treeData: [],
			//防护区信息
			infoData: [],
			protectInp: '',
			contingencyValue: '',
			sortName: '',
			pareaOptions: [],
			pareaList: [],
			pareaTop: 45,
			pareaLeft: 0,
			pareaRowid: '',
			disabledShow:false,
			// 防护区信息分页相关数据
			curIndex: 1,
			pageSize: 10,
			totals: 0,
			pareaShow: false,
			protectAreaId: '',
			rowHightShow: false,
			currentRowIndex: '',
			//防护区设备===========
			formInline: {
				equName: '',
				equType: ''
			},
			equData: [],
			equOptions: [],
			equList: [],
			equInp: '',
			typeValue: '',
			equsortName: '',
			param1Name: '',
			param2Name: '',
			param3Name: '',
			equmentShow: false,
			areaName:"防护区名称",
			// 防护区设备分页相关数据
			equcurIndex: 1,
			equpageSize: 10,
			equtotals: 0,
			equTop: 45,
			equLeft: 2,
			equtypeList: [],
			equDevId: ''
		}
	},

	filters: {},
	watch: {
	},
	created() {
		this.getStationTree()
		this.getContingency()
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
		// 获取站点树
		async getStationTree() {
			let result = await this.axios.getUnitTree({ iFlag: 3 })
			if (result.code == 200) {
				
				let flgaNum = 1
				this._forEach(result.data, true, item => {
					item.expand = true
					if (item.flag == flgaNum) {
						this.unitId = item.id
						item.selected = true
						flgaNum = 'a'
					}
				})
				this.treeData = result.data
				this.gettableList()
				this.getEqutypeData()
				// this.getEquDatas()/
			}
		},
		// 站点树点击事件
		handleStationTree(data) {
      this.curIndex= 1
			this.pageSize= 10
			this.unitId = data[0].id
			this.areaName="防护区名称"
      this.rowHightShow=false
			this.formInline.equName = ''
			this.formInline.equType = ''
			this.currentRowIndex = ''
			this.infoData = []
			this.equData = []
			this.gettableList()
			this.getEqutypeData()
			// this.getEquDatas()
		},
		//拼音
		convertToPinyin() {
			if (this.pareaList) {
				this.pareaList.forEach(
					(item => {
						const _pinyin = pinyin(item.vcName, {
							style: pinyin.STYLE_NORMAL //全拼风格
						})
						item.pinyin = _pinyin.join('').toLowerCase()
						item.py = _pinyin
							.map(item => {
								return item[0].substr(0, 1)
							})
							.join('')
							.toLowerCase()
					}).bind(this)
				)
			}
			if (this.equList) {
				this.equList.forEach(
					(item => {
						const _pinyin = pinyin(item.vcName, {
							style: pinyin.STYLE_NORMAL //全拼风格
						})
						item.pinyin = _pinyin.join('').toLowerCase()
						item.py = _pinyin
							.map(item => {
								return item[0].substr(0, 1)
							})
							.join('')
							.toLowerCase()
					}).bind(this)
				)
			}
		},
		//防护区信息
		//信息table
		gettableList() {
			this.areaName="防护区名称"
			this.rowHightShow=false
			this.currentRowIndex=''
			this.equData=[]
			this.axios
				.gettableList({
					currentPage: this.curIndex,
					pageSize: this.pageSize,
					unitId: this.unitId
				})
				.then(res => {
					if (res.code == 200) {
						this.infoData = []
						this.totals = res.data.total
						if (res.data.list) {
							res.data.list.forEach(item => {
								item['rowShow'] = false
							})
							this.infoData = res.data.list
						}
					}
				})
		},
		//区域列表
		getareaList() {
			this.axios
				.getareaList({
					unitId: this.unitId
				})
				.then(res => {
					if (res.code == 200) {
						this.pareaList = []
						if (res.data.length == 0) {
							this.pareaList.push({
								id: 0,
								vcName: '暂无数据'
							})
						} else {
							res.data.forEach(item => {
								this.pareaList.push({
									vcName: item.vcName,
									id: item.protectAreaId,
									protectAreaId: item.protectAreaId
								})
							})
						}
						this.convertToPinyin()
					}
				})
		},
		//应急预案
		getContingency() {
			this.axios
				.getContingency({
					page: {
						pageSize: 1000,
						pageNum: 1
					}
				})
				.then(res => {
					if (res.code == 200) {
						let arr = res.data.list
						this.pareaOptions = []
						arr.forEach(item => {
							this.pareaOptions.push({
								label: item.vcName,
								value: item.frpid
							})
						})
					}
				})
		},
		//点击防护区列表
		parelistClick(val) {
			// if (val) {
			// 	this.protectInp = val.vcName
			// 	this.protectAreaId = val.protectAreaId
			// 	this.pareaShow = false
			// 	this.contingencyValue = ''
			// 	this.sortName = ''
			// }
		},
		//吧所以index存入每行
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex
		},
		//防护区信息行内信息
		rowClass({ row, rowIndex }) {
			if (this.currentRowIndex === row.index) {
				return { border: 'solid 1px #3dffef', 'background-color': 'rgba(185, 221, 249, 0.75)' }
			}
		},
		//双击点击防护区信息列表
		protectRowClcik(row, column, event) {
			this.areaName=row.vcName
			this.rowHightShow = true
			this.currentRowIndex = row.index
			this.equData = []
			this.formInline.equName = ''
			this.formInline.equType = ''
			this.protectAreaId = row.protectAreaId
			this.equcurIndex = 1
			this.equpageSize = 10
			this.getEquTable()
		},
		//获取焦点
		get(ev, type) {
			if (ev.type == 'focus') {
				if (type == '信息') {
					
				} else {
					// console.log(this.devTypeId);
					console.log(this.equInp);
					this.equOptions.forEach(item => {
						if (item.vcName == this.typeValue) {
							this.devTypeId = item.devTypeId
						}
					})
					this.equmentShow = true
					// this.getEqunameDatas()
				}
			}
		},
		//失去焦点
		noGet(ev, type) {
			if (ev.type == 'blur') {
				if (type == '信息') {
					// setTimeout(()=>{
					//   this.pareaShow = false
					// },150)
				} else {
					setTimeout(() => {
						this.equmentShow = false
					}, 150)
				}
			}
		},
		//新增
		infoadd() {
			if (this.unitId == '') {
				this.$message({
					message: '请选择左侧变电站!!!',
					type: 'warning'
				})
			} else {
				this.infoData.forEach((item, idx) => {
					if (item.rowShow) {
						this.infoData[idx].rowShow = false
					}
				})
				this.pareaShow = false
				this.protectInp = ''
				this.currentRowIndex = ''
				this.sortName = ''
				this.contingencyValue = ''
				this.areaName="防护区名称"
				this.equData = []
				this.infoData.push({
					vcName: '',
					frpInfoVcName: '',
					intSort: '',
					rowShow: true
				})
				if (this.infoData.length > 9) {
					this.pareaTop = -190
				} else {
					this.pareaTop = 45
				}
			}
		},
		//限制input框输入特殊符号
		btKeyUp(e){
			 e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,"");
		},
		//保存
		save(row, index) {
				this.pareaShow = false
				this.disabledShow=true
					this.axios
				.getprareinfoSave({
					id: row.id,
					unitid: this.unitId,
					cfgId:row.cfgId,
					vcName: this.protectInp,
					frpid: this.contingencyValue,
					fireareaid: this.protectAreaId || row.protectAreaId,
					intSort: this.sortName
				})
				.then(res => {
					this.disabledShow=false
					if (res.code == 200) {
						this.$message({
							message: '保存成功!!!',
							type: 'success'
						})

						this.pareaOptions.forEach(item => {
							if (this.contingencyValue == item.value) {
								this.contingencyValue = item.label
							}
						})
						this.infoData[index].rowShow = false
						this.infoData[index].vcName = this.protectInp
						this.infoData[index].intSort = this.sortName
						this.infoData[index].frpInfoVcName = this.contingencyValue
						this.gettableList()
					} else if (res.code == '024') {
						this.$message({
							message: res.msg,
							type: 'warning'
						})
					}
				})
				// }
		},
		//删除
		Delete(rows, index) {
			if (!rows.id) {
				this.infoData.splice(index, 1)
			} else {
				this.axios
					.deleData({
						cfgId: rows.cfgId,
						fireareaid:  rows.protectAreaId
					})
					.then(res => {
						if (res.code == 200) {
							if (res.code == 200) {
								this.infoData.splice(index, 1)
								this.$message({
									message: '删除成功!!!',
									type: 'success'
								})
							}
						}
					})
			}
		},
		//修改
		Edit(rows, index) {
			this.infoData.forEach((items, idx) => {
				if (items.rowShow && items.id != rows.id) {
					this.infoData[idx].rowShow = false
				}
			})
			this.pareaShow = false
			this.disabledShow=false
			this.infoData[index].rowShow = true
			this.protectInp = rows.vcName
			this.contingencyValue = rows.frpInfoVcName
			this.sortName = rows.intSort
			this.pareaOptions.forEach(item => {
				if (this.contingencyValue == item.label) {
					this.contingencyValue = item.value
				}
			})
			if (index > 8) {
				this.pareaTop = -190
			} else {
				this.pareaTop = 45
			}
		},
		//分页
		handleChangePage(val) {
			this.curIndex = val
			this.gettableList()
		},
		handleChangePageSize(val) {
			this.pageSize = val
			this.gettableList()
		},
		//防护区-设备----------------------------------------------
		//查询
		onSubmit() {
			if (this.equData.length == 0) {
				this.$message({
					message: '请双击选择防护区信息列表!!!',
					type: 'warning'
				})
				this.formInline.equName = ''
				this.formInline.equType = ''
			} else {
				this.equcurIndex = 1
				this.getEquTable()
			}
		},
		//新增
		equadd() {
			if (this.rowHightShow != true) {
				this.$message({
					message: '请双击点击防护区信息列表',
					type: 'warning'
				})
			} else {
				this.equData.forEach((item, idx) => {
					if (item.equrowShow) {
						this.equData[idx].equrowShow = false
					}
				})
				if (this.equData.length > 9) {
					this.equTop = -190
				} else {
					this.equTop = 45
				}
				this.equInp = ''
				this.typeValue = ''
				this.equsortName = ''
				this.param1Name = ''
				this.param2Name = ''
				this.param3Name = ''
				this.equList = []
				// console.log(this.equList);
				this.equmentShow = false
				this.equData.push({
					vcName: '',
					typeStr: '',
					intSortId: '',
					vcParam1: '',
					vcParam2: '',
					vcParam3: '',
					equrowShow: true
				})
			}
		},
		//设备类型点击
		equChange(val) {
			this.devTypeId = val
			this.equInp = ''
			this.equsortName = ''
			this.param1Name = ''
			this.param2Name = ''
			this.param3Name = ''
			this.getEqunameDatas()
		},
		//加载设备名称
		getEqunameDatas() {
			this.axios
				.getEqumentName({
					unitId: this.unitId,
					subSysInfoIntType: 10060003,
					devTypeId: this.devTypeId
				})
				.then(res => {
					if (res.code == 200) {
						this.equList = []
						if (res.data) {
							let equDatas = res.data
							equDatas.forEach(item => {
								this.equList.push({
									id: item.devId,
									vcName: item.vcName,
									sourceType: item.sourceType,
									devId: item.devId
								})
							})
						}
						this.convertToPinyin()
					}
				})
		},
		//加载设备类型
		getEqutypeData() {
			this.axios
				.getEqumentType({
					currentPage: 1,
					pageSize: 10000,
					subSysInfoIntType: 10060003,
					unitId: this.unitId
				})
				.then(res => {
					if (res.code == 200) {
						if (res.data) {
							this.equOptions = this.equtypeList = res.data.list
						}
					}
				})
		},
		//修改
		equEdit(rows, index) {
      if(rows){
          this.equData.forEach((item, idx) => {
          if (item.equrowShow) {
            this.equData[idx].equrowShow = false
          }
        })
        this.equData[index].equrowShow = true
        this.equInp = rows.vcName
        this.equDevId = rows.devId
        this.typeValue = rows.typeStr
        this.equsortName = rows.intSortId
        this.param1Name = rows.vcParam1
        this.param2Name = rows.vcParam2
        this.param3Name = rows.vcParam3
        //控制下拉框的位置
        if (index > 8) {
          this.equTop = -190
        } else {
          this.equTop = 45
        }
        this.loadGetequName(rows.typeStr)
      }
    },
    //修改是加载设备名称
    loadGetequName(name){
    
      this.equOptions.forEach(item=>{
        if(name==item.vcName){
         	this.devTypeId=item.devTypeId
        }
      })
      this.getEqunameDatas()
    },
		//匹配设备名称
		matchEquName(val) {
			if (val) {
				let str = ''
				this.equList.forEach(item => {
					if (item.vcName == val) {
						str = item.vcName
					}
        })
				return str
			}
		},
		//保存
		equSave(rows, index) {
			if (this.matchEquName(this.equInp) != this.equInp) {
				this.$message({
					message: '请选择下拉数据!!!',
					type: 'warning'
				})
			}else{
        	this.axios
				.saveequList({
					id: rows.areaDevId,
					unitId: this.unitId,
					protectAreaId: this.protectAreaId,
					devId: this.equDevId,
					intSort: this.equsortName,
					vcParam1: this.param1Name,
					vcParam2: this.param2Name,
					vcParam3: this.param3Name
				})
				.then(res => {
					if (res.code == 200) {
						this.$message({
							message: '保存成功!!!',
							type: 'success'
						})
						this.equOptions.forEach(item => {
							if (item.devTypeId == this.typeValue) {
								this.typeValue = item.vcName
							}
						})
						this.equData[index].vcName = this.equInp
						this.equData[index].typeStr = this.typeValue
						this.equData[index].intSortId = this.equsortName
						this.equData[index].vcParam1 = this.param1Name
						this.equData[index].vcParam2 = this.param2Name
						this.equData[index].vcParam3 = this.param3Name
						this.equData[index].equrowShow = false
						this.getEquTable()
					} else if (res.code == '024') {
						this.$message({
							message: res.msg,
							type: 'warning'
						})
					}
				})
      }
		
		},
		//删除
		equDelete(rows, index) {
			if (!rows.areaDevId) {
				this.equData.splice(index, 1)
			} else {
				this.equData.splice(index, 1)
				this.axios
					.deletableequList({
						id: rows.areaDevId
					})
					.then(res => {
						if (res.code == 200) {
							this.$message({
								message: '删除成功!!!',
								type: 'success'
							})
						}
					})
			}
		},
		//点击设备
		equlistClick(items) {
			this.equInp = items.vcName
			this.equDevId = items.devId
			// this.equmentShow = false
		},
		//加载设备列表
		getEquTable() {

			this.axios
				.getequSearchDatas({
					currentPage: this.equcurIndex,
					pageSize: this.equpageSize,
					unitId: this.unitId,
					protectAreaId: this.protectAreaId,
					vcName: this.formInline.equName,
					devTypeId: this.formInline.equType
				})
				.then(res => {
					if ((res.code = 200)) {
						// this.rowHightShow=false
						this.equtotals = res.data.total
						if (res.data.list.length == 0) {
							this.$message({
								message: '暂无数据，请手动添加!!!',
								type: 'warning'
							})
						} else {
							res.data.list.forEach(item => {
								item['equrowShow'] = false
							})
							this.equData = res.data.list
						}
					}
				})
		},
		//防护设备分页
		handleChangePageEqu(val) {
			this.equcurIndex = val
			this.getEquTable()
		},
		handleChangePageSizeEqu(val) {
			this.equpageSize = val
			this.getEquTable()
		}
	},
	computed: {
		filterprotectareaList() {
			let result = []
			return (result = this.pareaList.filter(item => {
				if (this.protectInp == '') {
					return true
				} else if (/^[\u4e00-\u9fa5]+$/gi.test(this.protectInp) && item.vcName.includes(this.protectInp) && this.protectInp != '') {
					item.vcName.match(this.protectInp)
					return true
				} else if (escape(this.protectInp).indexOf('%u') < 0 && item.py.includes(this.protectInp.toLowerCase()) && this.protectInp != '') {
					item.vcName.match(this.vcName)
					return true
				}
			}))
		},
		filterequList() {
			let result = []
			return (result = this.equList.filter(item => {
				if (this.equInp == '') {
					return true
				} else if (/^[\u4e00-\u9fa5]+$/gi.test(this.equInp) && item.vcName.includes(this.equInp) && this.equInp != '') {
					item.vcName.match(this.equInp)
					return true
				} else if (escape(this.equInp).indexOf('%u') < 0 && item.py.includes(this.equInp.toLowerCase()) && this.equInp != '') {
					item.vcName.match(this.vcName)
					return true
				}
			}))
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
.protectCon {
  width: 100%;
  height: 100%;
  display: flex;

  .left-tree {
    width: 230px;
    height: calc(100vh - 140px);
    background-color: #fff;
    border: 1px solid #fff;
    overflow: auto;
    margin-right: 10px;
  }

  .protectZone-info {
    width: 650px;
    height: calc(100vh - 140px);
    background-color: #fff;
    border: 1px solid #fff;
    overflow: auto;
    margin-right: 10px;

    .info-add {
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: relative;

      .info-title {
        width: 100%;
        // height:20px;
        // line-height:20px;
        font-size: 20px;
      }

      .el-button {
        position: absolute;
        top: 5px;
        right: 0;
        // margin-left: 10px;
      }
    }

    .info-table {
      width: 100%;
      height: calc(100% - 40px);

      // border:1px solid red;
      /deep/ .el-table {
        height: calc(100% - 40px) !important;

        th {
          background-color: #f8f8f9;
        }

        .el-table__empty-block {
          // height:809px !important;
        }

        .el-table__row {
          cursor: pointer;
          user-select: none;
        }

        
				/deep/.el-input--mini .el-input__inner{
						height: 24px !important;
					line-height: 24px;
				}
				/deep/ .el-select .el-input .el-input__inner {
					height: 24px !important;
					line-height: 24px;
				}
				/deep/.el-input--small .el-input__inner{
					height: 24px !important;
					line-height: 24px;
				}

        /deep/.el-input__icon {
          line-height: 5px;
        }
      }

      .prarea {
        .protectareaList {
          position: absolute;
          // left: 0;
          // top: 46px;
          background-color: #fff;
          width: 183px;
          height: 200px;
          overflow: auto;
          border: 1px solid #eee;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

          .ivu-menu .ivu-menu-item {
            text-align: left;
            margin-left: 8px;
            padding: 0;
          }

          .ivu-menu-vertical.ivu-menu-light:after {
            background: none;
          }
        }
      }
    }

    .info-pages {
      width: 100%;
      height: 37px;
      text-align: center;
      overflow: auto;

      /deep/ .ivu-page {
        margin-top: 5px;
      }
    }
  }

  .protectZone-equ {
    width: calc(100% - 880px);
    height: calc(100vh - 140px);
    background-color: #fff;
    border: 1px solid #fff;
    overflow: auto;
		.equtitle {
        font-size: 20px;
				width:100%;
				height:30px;
				.title{
					float:left;
				}
				.areaTitle{
					float:right;
					margin-right:10px;
				}
      }
    .equ-search {
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: relative;
      display: flex;

      

      /deep/ .el-form {
        width: 550px;
        display: flex;
				// border:1px solid red;
        .el-form-item {
          // width: 219px;
          // margin-right: 0;
					margin-bottom:0;
					height:100%;
          display: flex;

          .el-form-item__label {
            width: 100px;
						text-align:left;
          }
        }
      }

      .equ-button {
        position: absolute;
        top: 0px;
        right: 0;
      }
				/deep/ .el-form-item__content .el-input .el-input__inner{
					height: 32px !important;
					line-height: 32px;
				}
				
					
      
				/deep/ .el-select .el-input .el-input__inner {
					height: 32px !important;
					line-height: 32px;
				}
				
      /deep/.el-input__icon {
        line-height: 5px;
      }
    }

    .equ-table {
      width: 100%;
      height: calc(100% - 70px);

      /deep/ .el-table {
        height: calc(100% - 42px) !important;

        th {
          background-color: #f8f8f9;
        }

        .el-table__header {
          width: 100% !important;
          table-layout: inherit;
        }

        .el-table__empty-block {
          // height:809px !important;
          width: 100% !important;
        }

        .el-table__body {
          width: 100% !important;
        }
      }

       /deep/.el-input--mini .el-input__inner{
						height: 24px !important;
					line-height: 24px;
				}
				/deep/ .el-select .el-input .el-input__inner {
					height: 24px !important;
					line-height: 24px;
				}
				/deep/.el-input--small .el-input__inner{
					height: 24px !important;
					line-height: 24px;
				}
      /deep/.el-input__icon {
        line-height: 5px;
      }

      /deep/ .el-table .equsortName .el-input__inner {
        padding: 0;
        text-align: center;
        height: 24px !important;
        line-height: 24px;
      }
      /deep/ .el-table .param3Name .el-input__inner {
        padding: 0;
        text-align: center;
        height: 24px !important;
        line-height: 24px;
      }

      /deep/ .el-table .param2Name .el-input__inner {
        padding: 0;
        text-align: center;
        height: 24px !important;
        line-height: 24px;
      }
		
      /deep/ .el-table .param1Name .el-input__inner {
        padding: 0;
        text-align: center;
        height: 24px !important;
        line-height: 24px;
      }

      .equArea {
        .equList {
          position: absolute;
          // left: 0;
          // top: 46px;
          background-color: #fff;
          width: 190px;
          height: 200px;
          overflow-y: auto;
          border: 1px solid #eee;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

          .ivu-menu .ivu-menu-item {
            text-align: left;
            margin-left: 8px;
            padding: 0;
          }
        }
      }

      .equ-pages {
        width: 100%;
        height:37px;
        text-align: center;
        overflow: auto;

        /deep/ .ivu-page {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
