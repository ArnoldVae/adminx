<template>
	<Modal v-model="modalShow" title="导入设备" :mask-closable="false">
		<div class="upload-content">
			<Steps class="steps" :current="step" title="文件导入步骤">
				<Step title="步骤一" content="择导入文件 (支持xls,xlsx格式的文件)"></Step>
				<Step title="步骤二" content="选择完毕后点击 '导入' 按钮进行导入"></Step>
				<Step title="步骤三" content="等待导入完成"></Step>
			</Steps>
			<Upload type="drag" :before-upload="handleUpload" action :accept="accept" :format="Format">
				<div style="padding: 20px 0">
					<Icon type="ios-add-circle-outline" size="52" style="color: #3399ff"></Icon>
					<p>选择导入文件</p>
				</div>
			</Upload>
			<div v-if="file !== null" class="up-box">
				待导入文件:
				<span>
					<div class="del" @click="removeFile">
						<!-- <Icon type="md-trash" /> -->
						<i class="el-icon-delete"></i>
					</div>
					{{ file.name }}
				</span>
			</div>
		</div>
		<div slot="footer">
			<Button type="text" size="large" @click="handleModalCancel">取消</Button>
			<Button class="btn2" type="primary" size="large" icon="md-cloud-upload" @click="upload" :loading="loadingStatus">{{
				loadingStatus ? '导入设备中 请稍后...' : '导入'
			}}</Button>
		</div>
	</Modal>
</template>
<script>
import { setTimeout } from 'timers'
export default {
	name: 'upload-modal',
	components: {},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		unitid: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			modalShow: false,
			axios: this.$api.deviceModeling,
			isFile: false,
			step: 0,
			file: null,
			loadingStatus: false,
			accept: '.xls,.xlsx',
			Format: ['.xls', '.xlsx']
		}
	},
	computed: {},
	filters: {},
	watch: {
		value: {
			handler(newVal) {
				this.modalShow = newVal
			}
		},
		modalShow: {
			handler(newVal) {
				this.$emit('subShow', this.modalShow)
				this.file = null
				this.step = 0
				this.isFile = false
			}
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 选择文件
		handleUpload(file) {
			// 添加文件
			this.file = file
			this.step = 1
			this.isFile = true
			return false
		},
		// 移除文件
		removeFile() {
			this.file = null
			this.step = 0
			this.isFile = false
		},
		// 上传提交
		upload() {
			// 点击上传
			if (this.isFile) {
				let fileName = this.file.name.substring(this.file.name.length - 3)
				let fileName1 = this.file.name.substring(this.file.name.length - 4)
				if (fileName == 'xls' || fileName == 'XLS' || fileName1 == 'xlsx' || fileName1 == 'XLSX') {
					this.loadingStatus = true
					this.step = 2
					let params = new FormData() // 创建form对象
					params.append('file', this.file) // 通过append向form对象添加数据
					params.append('unitId', this.unitid) // 添加变电站id
					let config = {
						header: { 'Content-Type': 'multipart/form-data' }
					}
					this.axios
						.devUpload(params, config)
						.then(res => {
							if (res.code == 200) {
								this.file = null
								this.loadingStatus = false
								this.$Message.success({ duration: 5, content: '导入成功' })
								this.modalShow = false
								this.step = 1
								this.$emit('uploadSuccess', true)
							} else {
								this.$Message.error(res.msg)
								this.file = null
								this.loadingStatus = false
								this.modalShow = false
								this.step = 1
							}
						})
						.catch(error => {
							this.file = null
							this.loadingStatus = false
							this.modalShow = false
							this.step = 1
							this.$Message.error(error.response.data.msg)
						})
				} else {
					this.file = null
					this.isFile = false
					this.step = 0
					this.$Message.warning('请选择.xls或.xlsx格式的文件')
				}
			} else {
				this.$Message.warning('请选择需要上传的文件')
			}
		},
		// 弹窗取消
		handleModalCancel() {
			this.modalShow = false
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
</style>
