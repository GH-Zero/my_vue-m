<template>
    <div class="arrtList">
    <van-pull-refresh v-model="isLoading"
     success-duration="1000"
     success-text="刷新成功"
     @refresh="onRefresh"
     class="shuaxin"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item :article="item" v-for="(item, index) in list" :key="index"></article-item>
      </van-list>
    </van-pull-refresh>
    </div>
</template>
<script>
import { getPin } from '@/api/action'
import articleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    'article-item': articleItem
  },
  props: {
    cherk: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      //   下拉刷新
      isLoading: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getPin({
          channel_id: this.cherk.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // console.log(data.data)
        const { results } = data.data
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    // 下拉刷新函数
    async onRefresh () {
      try {
        const { data } = await getPin({
          channel_id: this.cherk.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        // 加载状态结束
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.arrtList{
  height: 79vh;
  overflow-y: auto;
}
</style>
