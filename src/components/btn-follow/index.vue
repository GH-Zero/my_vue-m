<template>
<van-button
    v-if="article.is_followed"
    class="follow-btn"
    round
    size="small"
    @click="btnF"
    >已关注
</van-button>
<van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="btnF"
    >关注
</van-button>
</template>
<script>
// 引入发起请求的模块
import { getFollow, deleteFollow } from '@/api/user'
export default {
  name: 'btnFollow',
  props: {
    article: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
    async btnF () {
      console.log(this.article.is_followed)
      if (this.article.is_followed) {
        try {
          await getFollow({
            target: this.article.aut_id
          })
          this.$toast('取消关注成功')
          this.$emit('btnf', !this.article.is_followed)
        } catch (err) {
          this.$toast('取消关注失败')
        }
      } else {
        try {
          await deleteFollow(this.article.aut_id)
          this.$toast('关注成功')
          this.$emit('btnf', !this.article.is_followed)
        } catch (err) {
          this.$toast('关注失败')
        }
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
