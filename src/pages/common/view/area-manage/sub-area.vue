<template>
	<div class="subArea">
		<com-form ref="add-form" v-model="addFormData" :items="addFormItems">
			<template #slot1>
				<Input v-model="dataObj.name" :disabled="true" placeholder="请输入..." />
			</template>
			<template #slot3>
				<!-- 主类型 -->
				<RadioGroup v-model="addFormData.iMainType">
					<Radio v-for="item in mainTypeList" :label="item.value" :value="item.value" :key="item.value">{{ item.label }}</Radio>
				</RadioGroup>
			</template>
			<template #slot4>
				<!-- 子类型 -->
				<RadioGroup v-model="addFormData.iSubType">
					<Radio v-for="item in subTypeList" :label="item.value" :value="item.value" :key="item.value">{{ item.label }}</Radio>
				</RadioGroup>
			</template>
			<template #slot5>
				<InputNumber v-model="addFormData.iSort"></InputNumber>
			</template>
		</com-form>
	</div>
</template>
<script>
import mixinTolls from '@common/mixin/tools'
export default {
	name: 'subArea',
	mixins: [mixinTolls],
	components: {},
	props: {
		dataObj: {
			type: Object
		},
		isSubmit: {
			type: Boolean
		},
		modalShow: {
			type: Boolean
		},
		dataProps: {
			type: Object
		},
		isCodeShow: {
			type: Boolean
		}
	},
	data() {
		return {
			axios: this.$api.areaManage,
			addFormItems: [
				{ label: '变电站', slot: 'slot1' },
				{ label: '主类型', slot: 'slot3' },
				{ label: '子类型', slot: 'slot4' },
				{
					label: '区域',
					prop: 'vcName',
					rules: [{ required: true, message: '该项为必填项', trigger: 'change' }]
				},
				{
					label: '平面图url',
					prop: 'svgId'
				},
				{
					label: '3D模型url',
					prop: 't3DId'
				},
				{ label: '排序', slot: 'slot5' },
				{
					label: '状态',
					prop: 'iIsEnable',
					type: 'radio',
					options: [{ value: '1', label: '启用' }, { value: '0', label: '禁用' }]
				},
				{ label: '备注', prop: 'vcMemo', type: 'textarea' }
			],
			addFormData: {
				areaId: '',
				unitId: this.dataObj.id,
				vcCode: '',
				vcName: '',
				iMainType: '0',
				iSubType: '0',
				svgId: '',
				t3DId: '',
				iParam1: '',
				iParam2: '',
				iParam3: '',
				vcParam1: '',
				vcParam2: '',
				vcParam3: '',
				iSort: 0,
				iIsEnable: '1',
				iFlag: '2',
				vcMemo: ''
			},
			mainTypeList: [],
			subTypeList: []
		}
	},
	computed: {},
	filters: {},
	watch: {
		isSubmit: {
			handler() {
				this.handleSaveArea()
			}
		},
		modalShow: {
			handler(val) {
				if (!val) {
					let obj = {
						iSort: 0,
						iIsEnable: '1',
						iFlag: '2',
						iMainType: '0',
						iSubType: '0',
						vcName: this.subTypeList[0].label
					}
					this.resetComForm(this['addFormData'], obj, 'add-form')
				} else {
					this.addFormData.iMainType = this.mainTypeList[0].value
					this.addFormData.iSubType = this.subTypeList[0].value
				}
			}
		},
		'addFormData.iSubType': {
			handler(val) {
				if (val) {
					this.subTypeList.forEach(item => {
						if (item.value == val) {
							this.$set(this.addFormData, 'vcName', item.label)
						}
					})
				}
			}
		},

		dataProps: {
			handler(newVal) {
				// console.log('父组件中的 formData 发生变化：', JSON.parse(JSON.stringify(newVal)))
				this.addFormData.vcCode = newVal.vcCode
			},
			deep: true
		}
	},
	created() {
		this.findDic()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		handleSaveArea(data) {
			this.addFormData.unitId = this.dataObj.id
			this.validateComForm('add-form', () => {
				// let addFormData = {...this.addFormData}
				// if(this.isCodeShow) addFormData.vcCode = null
				let params = JSON.parse(JSON.stringify(this.addFormData))
				let requestType = ''

				this.addFormData.areaId != '' ? (requestType = 'upArea') : (requestType = 'saveArea')

				// console.log('sub-area 子组件 请求方式：', requestType, ' -- 请求参数：', params)
				// console.log(this.isCodeShow)
				console.log(this.addFormData)
				console.log(params)
				this.axios[requestType](params).then(res => {
					if (requestType == 'saveArea') this.$set(this.addFormData, 'areaId', res.data)

					this.$emit('update-save', res, this.addFormData)
				})
			})
		},
		// 查询字典组列表
		findDic() {
			this.axios.findDicList({ dictGroupID: 1002 }).then(res => {
				if (res.data && res.code == 200) {
					for (let i = 0; i < res.data.length; i++) {
						let obj = { label: res.data[i].vcName, value: res.data[i].dictID + '' }
						this.mainTypeList.push(obj)
					}
				}
			})
			this.axios.findDicList({ dictGroupID: 1003 }).then(res => {
				if (res.data && res.code == 200) {
					let selectSubLabel = ''
					for (let i = 0; i < res.data.length; i++) {
						if (i == 0) {
							selectSubLabel = res.data[i].vcName
						}
						let obj = { label: res.data[i].vcName, value: res.data[i].dictID + '' }
						this.subTypeList.push(obj)
					}

					this.$set(this.addFormData, 'vcName', selectSubLabel)
				}
			})
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
.subArea
	width 100%
	height 100%
</style>
