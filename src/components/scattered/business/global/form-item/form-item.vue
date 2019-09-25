<template>
	<div class="form-item" :style="{ width: width ? `${width}px` : 'auto', marginBottom: noMBottom ? '0' : '' }">
		<span v-html="title"></span>
		<div class="content-wrap">
			<Input
				v-if="type != 'select' && type != 'slot'"
				v-model="localValue"
				:placeholder="placeholder"
				:type="type"
				:number="type === 'number'"
				:autofocus="autofocus"
				:rows="rows - 0"
				:autosize="autosize"
				:clearable="clearable"
				:disabled="disabled"
				@on-enter="$emit('on-enter')"
				@on-change="$emit('on-change')"
				@on-focus="$emit('on-focus')"
				@on-blur="$emit('on-blur')"
				@on-keyup="$emit('on-keyup')"
				@on-keydown="$emit('on-keydown')"
				@on-keypress="$emit('on-keypress')"
				@on-search="$emit('on-search')"
				@on-clear="$emit('on-clear')"
			/>

			<Select
				v-if="type == 'select'"
				v-model="localValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:clearable="clearable"
				:filterable="filterable"
				@on-change="onChangeHandler"
				@on-clear="$emit('on-clear')"
				@on-query-change="onQueryChangeHandler"
				@on-open-change="onOpenChangeHandler"
			>
				<Option v-for="item in options" :value="item[setings.value] || item.value" :key="item[setings.value] || item.value">{{
					item[setings.label] || item.label
				}}</Option>
			</Select>

			<slot v-if="type == 'slot'"></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'form-item',
	components: {},
	props: {
		title: {
			type: String,
			default: '名称'
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		rows: {
			type: [String, Number],
			default: '2'
		},
		autosize: {
			type: Object,
			default() {
				return {
					minRows: 2,
					maxRows: 4
				}
			}
		},
		clearable: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		options: {
			type: [Object, Array],
			default() {
				return []
			}
		},
		setings: {
			type: Object,
			default() {
				return {}
			}
		},
		filterable: {
			type: Boolean,
			default: false
		},
		noMBottom: {
			type: Boolean,
			default: false
		},
		value: [String, Number],
		width: [String, Number]
	},
	model: {
		prop: 'value',
		event: 'value-change'
	},
	data() {
		return {
			localValue: ''
		}
	},
	computed: {},
	filters: {},
	watch: {
		value: {
			handler(newVal) {
				this.localValue = newVal
			},
			immediate: true
		},
		localValue(newVal) {
			this.$emit('value-change', newVal)
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// select change
		onChangeHandler(val) {
			this.$emit('on-change', val)
		},
		// select 搜索
		onQueryChangeHandler(val) {
			this.$emit('on-query-change', val)
		},
		// select 下拉 展开 or 关闭
		onOpenChangeHandler(val) {
			this.$emit('on-open-change', val)
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
.form-item {
  display: flex;
  height: 32px;
  margin-right: 20px;
  margin-bottom: 10px;

  > span {
    height: 32px;
    padding-left: 5px;
    padding-right: 8px;
    cursor: default;
    line-height: 32px;
  }

  .content-wrap {
    flex-grow: 1;

    .ivu-input-wrapper {
      min-width: 150px;
    }

    .ivu-select {
      min-width: 150px;
    }
  }
}
</style>
<style lang="stylus"></style>
