


<template>
  <div class="keyWordCon">
    <Input type="text" v-model="keySearch" placeholder="请输入搜索关键字" class="input" @on-focus="get()">
      <Icon type="ios-search" slot="suffix" v-show="iconShow"/>
    </Input>
    <div class="keyList" v-if="listShow">
      <Menu width="auto" mode="vertical">
        <MenuItem :name="item.id" v-for="(item,index) in filteritemListCon" :key="index">
          <p @click="list(item)">{{item.vcName}}</p>
        </MenuItem>
      </Menu>
    </div>
  </div>
</template>

<script>
import pinyin from 'pinyin2'
export default {
	name: 'keyWord',
	data() {
		return {
			keySearch: ''
			// listShow:true
		}
	},
	props: {
		keyworditmList: {
			type: Array,
			default() {
				return []
			}
		},
		iconShow: {
			type: Boolean,
			default: true
		},
		listShow: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		keyworditmList(val) {
			this.$nextTick(() => {
				if (val) {
					this.convertToPinyin(val)
				}
			})
		},
		iconShow(val) {
			if (val) {
				this.iconShow = val
			}
		},
		listShow(val) {
			if (val) {
				// console.log(val);
				this.listShow = val
			}
		}
	},
	created() {
		// this.convertToPinyin()
	},
	methods: {
		get() {
			this.listShow=true
		},
		list(its) {
			this.$emit('pAreaId', its)
			this.keySearch=its.vcName
			this.listShow=false
		},
		convertToPinyin(datas) {
			// console.log(datas);
			datas.forEach(
				(item => {
					// console.log(item);
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
	computed: {
		filteritemListCon() {
			if( this.keyworditmList){
					let result = []
			return (result = this.keyworditmList.filter(item => {
				if (this.keySearch == '') {
					return true
				} else if (/^[\u4e00-\u9fa5]+$/gi.test(this.keySearch) && item.name.includes(this.keySearch) && this.keySearch != '') {
					item.name.match(this.keySearch)
					return true
				} else if (escape(this.keySearch).indexOf('%u') < 0 && item.py.includes(this.keySearch.toLowerCase()) && this.keySearch != '') {
					item.name.match(this.name)
					return true
				}
			}))
			}
		}
	}
}
</script>

<style lang='stylus' scoped>
.keyWordCon {
  width: 100%;
  height: 100%;
  position absolute;
  top:10px;
  left:0px;
  input {
    width: 90%;
    height: 30px;
  }

  .keyList {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    overflow-y: auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
    /deep/ .ivu-input-wrapper{
        width:90%;
    }
  /deep/ .ivu-tabs-nav {
    width: 100% !important;

    /deep/ .ivu-tabs-tab {
      width: 50%;
      text-align: center;
      -webkit-user-select: none;
    }
  }
}

/deep/.ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}

/deep/.ivu-menu-item {
  padding: 0;
	text-align:left;
}
</style>