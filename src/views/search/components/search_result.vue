<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.aut_id" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearchS } from '@/api/search'
export default {
  name: 'result',
  props: {
    searchTexts: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchS({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchTexts // 搜索关键字
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // console.log(this.list)
        // 3. 设置加载状态结束
        this.loading = false

        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (err) {
        this.$toast('获取搜索失败')
      }
    }
  },
  computed: {},
  filters: {},
  watch: {},
  components: {}
}
</script>
<style lang='less' scoped>
</style>
