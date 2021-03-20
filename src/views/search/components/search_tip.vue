<template>
  <div class="tip">
      <van-cell
      icon="search"
      v-for="(item, index) in tabLIst"
      :key="index">
        <div slot="title" v-html="heightG(item)" @click="$emit('seachs', item)"></div>
      </van-cell>
  </div>
</template>
<script>
import { getSeachT } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'tip',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tabLIst: [],
      action: ''
    }
  },
  created () {},
  mounted () {},
  methods: {
    async searchTab (val) {
      try {
        const { data } = await getSeachT(val)
        // console.log(data)
        this.tabLIst = data.data.options
      } catch (err) {
        this.$toast('获取搜索失败')
      }
    },
    heightG (val) {
      const text = `<span style="color:#3296fa">${this.action}</span>`
      const reg = new RegExp(this.action, 'gi')
      return val.replace(reg, text)
      // return 111
    }
  },
  computed: {},
  filters: {},
  watch: {
    searchText: {
      handler: debounce(function(val) {
        this.action = val
        // console.log(val)
        this.searchTab(val)
      }, 200),
      immediate: true
    }
  },
  components: {}
}
</script>
<style lang='less' scoped>

</style>
