<template>
  <div class="search_container">
      <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
      <Result v-if="isResultShow" :searchTexts="searchText"></Result>
      <Tip v-else-if="searchText" :searchText="searchText"  @seachs="onSearch"></Tip>
      <Histories v-else :historiesList="historiesList" @deleteAll="deleteAll" @deleteBtn="deleteBtn"></Histories>
  </div>
</template>
<script>
import Tip from './components/search_tip'
import Result from './components/search_result'
import Histories from './components/search_histories'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'search_container',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      historiesList: getItem('his') || []
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      this.isResultShow = true
      this.searchText = val
      console.log(val)
      if (this.historiesList.indexOf(val) === -1) {
        this.historiesList.unshift(val)
        // 将数据存储在本地上
        setItem('his', this.historiesList)
      }
    },
    // 删除全部记录
    deleteAll () {
      this.historiesList = []
      setItem('his', [])
    },
    // 删除自己想删除的
    deleteBtn (index) {
      this.historiesList.splice(index, 1)
      setItem('his', this.historiesList)
    },
    // 返回操作
    onCancel () {
      this.$router.back()
    }
  },
  computed: {},
  filters: {},
  watch: {},
  components: {
    Tip,
    Result,
    Histories
  }
}
</script>
<style lang='less' scoped>
.van-search{
    background-color: #3296fa;
}
/deep/.van-search__action {
    background-color: #3296fa;
}
</style>
