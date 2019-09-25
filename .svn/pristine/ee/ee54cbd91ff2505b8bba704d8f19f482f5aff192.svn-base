<template>
	<div class="element-table" ref="element-table">
		<el-table :data="data" style="width: 100%" v-bind="$attrs" v-on="$listeners" :empty-text="$attrs['empty-text'] ? $attrs['empty-text'] : '暂无数据'">
			<el-table-column v-if="$attrs['show-selection']" type="selection"></el-table-column>

			<el-table-column v-if="$attrs['show-index']" type="index"></el-table-column>

			<el-table-column
				v-for="(column, index) in columns"
				:key="(column, index)"
				ref="el-table-column"
				:type="column.type"
				:index="column.inde"
				:column-key="column.columnKey"
				:label="column.label"
				:prop="column.prop"
				:width="column.width"
				:min-width="column.minWidth"
				:fixed="column.fixed"
				:align="column.align ? column.align : 'center'"
				:class-name="column.className"
				:header-align="column.headerAlign ? column.headerAlign : 'center'"
			>
				<template slot-scope="scope">
					<!-- render -->
					<expand v-if="column.render" :render="column.render" :row="scope.row" :index="index" :column="column"> </expand>

					<!-- template -->
					<div v-else-if="column.editShow || column.deleteShow || column.addShow || column.switchShow">
						<com-button type="edit" v-if="column.editShow" size="large" @click.stop="$emit('on-edit', scope.row, scope.$index)"></com-button>
						<com-button type="delete" v-if="column.deleteShow" size="large" @click.stop="$emit('on-delete', scope.row, scope.$index)"></com-button>
						<com-button type="add" v-if="column.addShow" size="large" @click.stop="$emit('on-add', scope.row, scope.$index)"></com-button>
					</div>

					<!-- html code -->
					<span v-else v-html="scope.row[column.prop]"></span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import expand from './table-expand'
export default {
	name: 'element-table',
	components: {
		expand
	},
	props: {
		columns: {
			type: Array,
			default() {
				return []
			}
		},
		data: Array,
		expandAll: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	computed: {},
	filters: {},
	watch: {
		// columns: {
		//   handler(newVal) {
		//     if (newVal.length) {
		//       this.$nextTick(() => {
		//         let columns = this.$refs['el-table-column']
		//         /* console.log(columns, '------------------------');
		//         console.log(newVal); */
		//         newVal.forEach((item, index) => {
		//           let column = columns[index]
		//           console.log(item.label, " ==== ", column);
		//           Object.keys(item).forEach(itemKey => {
		//             // column.$el.setAttribute(itemKey, item['itemKey'])
		//             console.log(itemKey, ' === ', column[itemKey]);
		//             // column['data'][itemKey] = item[itemKey]
		//             console.log(column.data);
		//           })
		//         })
		//       })
		//     }
		//   },
		//   immediate: true
		// }
		data: {
			handler(newVal, oldVal) {
				if (newVal.length) {
					// 是否展开 树结构
					if (this.expandAll) {
						this.$nextTick(() => {
							const els = this.$refs['element-table'].getElementsByClassName('el-table__expand-icon')
							Array.prototype.forEach.call(els, item => {
								this.$nextTick(() => {
									if (!item.classList.contains('el-table__expand-icon--expanded')) {
										item.click()
									}
								})
							})
						})
					}
				}
			},
			immediate: true
		}
	},
	created() {
		// console.log('el-table $attrs：', this.$attrs, '=-------');
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {},
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
.element-table {
  width: 100%;
  position: relative;

  /deep/.el-table {
    .el-table__header-wrapper {
      tr {
        color: #515a6e;
      }

      th {
        background-color: #f8f8f9;
      }
    }
  }
}
</style>
<style lang="stylus"></style>
