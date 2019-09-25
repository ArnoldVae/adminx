<template>
	<div class="com-form">
		<Form :label-width="labelWidth" :model="localData">
			<FormItem v-for="item in items" :label="item.label" :key="item.prop" :prop="item.prop" :rules="item.rules">
				<!-- input 控件 -->
				<Input
					v-if="detectType(item.type, item.slot)"
					v-model="localData[item.prop]"
					:type="item.type || 'text'"
					:autosize="item.autosize ? item.autosize : { minRows: 2, maxRows: 5 }"
					:placeholder="item.placeholder ? item.placeholder : `请输入${item.label}`"
					:disabled="item.disabled"
				/>

				<!-- 单选 -->
				<RadioGroup v-if="item.type == 'radio'" v-model="localData[item.prop]">
					<Radio
						v-for="radioItem in item.options"
						:key="radioItem[transKey(item, 'value')]"
						:label="radioItem[transKey(item, 'value')]"
						:disabled="item.disabled"
						>{{ radioItem[transKey(item, 'label')] }}</Radio
					>
				</RadioGroup>

				<!-- 下拉选择 -->
				<Select
					v-if="item.type == 'select'"
					v-model="localData[item.prop]"
					:placeholder="item.placeholder ? item.placeholder : `请选择`"
					:disabled="item.disabled"
				>
					<Option v-for="selectItem in item.options" :key="selectItem[transKey(item, 'value')]" :value="selectItem[transKey(item, 'value')]">{{
						selectItem[transKey(item, 'label')]
					}}</Option>
				</Select>

				<!-- 下拉树 -->
				<Input v-if="item.type == 'tree-select'" v-model="localData[item.prop]" style="display: none;" :disabled="item.disabled" />
				<tree-select
					v-if="item.type == 'tree-select'"
					v-model="localData[item.prop]"
					:options="JSON.parse(JSON.stringify(item.options))"
					:placeholder="item.placeholder ? item.placeholder : `请选择`"
					:disabled="item.disabled"
				></tree-select>

				<!-- 多选框 -->
				<CheckboxGroup v-if="item.type == 'checkbox'" v-model="localData[item.prop]">
					<Checkbox v-for="checkItem in item.options" :key="checkItem[transKey(item, 'value')]" :label="checkItem[transKey(item, 'value')]">{{
						checkItem[transKey(item, 'label')]
					}}</Checkbox>
				</CheckboxGroup>

				<!-- slot -->
				<slot v-if="item.slot" :name="item.slot"></slot>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import TreeSelect from '_b/tree-select'
export default {
	name: 'com-form',
	components: {
		TreeSelect
	},
	props: {
		data: Object,
		items: Array,
		labelWidth: {
			type: [Number, String],
			default: 80
		}
	},
	model: {
		prop: 'data',
		event: 'form-item-change'
	},
	data() {
		return {}
	},
	computed: {
		localData() {
			return this.data
		}
	},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// tools ------------------------
		transKey(source, key) {
			if (source.setings) {
				return source.setings[key]
			} else {
				return key
			}
		},
		detectType(type, slot) {
			if (type != 'radio' && type != 'select' && type != 'tree-select' && type != 'checkbox' && !slot) return true
			else return false
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
<style lang="stylus" scoped></style>
<style lang="stylus"></style>
