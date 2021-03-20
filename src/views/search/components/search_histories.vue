<template>
  <div class="histories">
      <van-cell title="搜索历史">
        <div class="tab" v-if="deleteTab">
          <span @click="deleteAll">全部删除</span>
          &nbsp;&nbsp;
         <span @click="deleteTab=false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="deleteTab=true"/>
      </van-cell>
      <van-cell v-for="(item, index) in historiesList" :key="index" @click="deleteBtn(index)">{{ item }}
        <template #right-icon>
          <van-icon name="delete" class="delete-icon"  v-show="deleteTab"/>
        </template>
      </van-cell>
  </div>
</template>
<script>
// import { getItem } from '@/utils/storage'
export default {
  name: 'histories',
  props: {
    historiesList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 控制文字和图标显示
      deleteTab: false
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    // 全部删除按钮
    deleteAll () {
      this.$emit('deleteAll')
    },
    // 删除自己想删除的
    deleteBtn (index) {
      if (!this.deleteTab) {
        return this.$toast('请点击右上角删除按钮在进行删除')
      } else {
        this.$emit('deleteBtn', index)
      }
    }
  },
  computed: {},
  filters: {},
  watch: {
  },
  components: {}
}
</script>
<style lang='less' scoped>
.delete-icon{
  color: #969999;
}
</style>
