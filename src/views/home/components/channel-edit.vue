<template>
  <div class="Channel">
    <van-cell title="我的频道" class="myChannel" :border="false">
      <van-button size="mini" type="danger" plain round class="btnExit" @click="coleTab=!coleTab"
        >{{coleTab?'完成':'编辑'}}</van-button
      >
    </van-cell>
    <van-grid :border="false" gutter="10">
      <van-grid-item
        v-for="(value , index) in tabList"
        :key="value.id"
        class="tabBox"
      >
        <span slot="icon" class="van-grid-item__icon" v-show="coleTab && !findexLise.includes(value.id)">
          <van-icon name="clear" />
        </span>
        <span slot="text" :class="{ active: active===index }" @click="goTab(value,index)">{{value.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" class="myChannel2" :border="false"> </van-cell>
    <van-grid :border="false" gutter="10">
      <van-grid-item
        v-for="value in reChannel"
        :key="value.id"
        :text="value.name"
        icon="plus"
        @click="addTab(value)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getTab } from '@/api/action'
export default {
  name: 'Channel',
  props: {
    tabList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    this.AllList()
  },
  data() {
    return {
      ChannelList: [],
      coleTab: false,
      findexLise: [0]
    }
  },
  methods: {
    async AllList() {
      try {
        const { data } = await getTab()
        // console.log(data)
        this.ChannelList = data.data.channels
      } catch (err) {
        this.$toast.fail(err)
      }
    },
    addTab (val) {
    //   console.log(val)
      this.$emit('addBtn', val)
    },
    // 切换
    goTab (val, index) {
      // console.log(index)
      if (this.coleTab) {
        this.$emit('deleteTab', index)
      } else {
        this.$emit('goTab', index)
      }
    }
  },
  computed: {
    reChannel() {
      return this.ChannelList.filter((item) => {
        return (
          this.tabList.findIndex((userItem) => {
            return userItem.id === item.id
          }) === -1
        )
      })
    }
  }
}
</script>
<style lang="less" scoped>
.Channel {
  margin-top: 107px;
  .myChannel {
    font-size: 32px;
    .btnExit {
      padding: 0 25px;
      border: 1px solid #f85959;
      color: #f85959;
    }
  }
  .active{
    color:red;
  }
  .tabBox{
       /deep/.van-icon-clear::before {
           position: absolute;
           top: -60px;
           right: -120px;
       }
  }
  .myChannel2 {
    font-size: 32px;
    margin: 20px 0;
  }
  /deep/.van-grid-item__content {
    position: relative;
    width: 160px;
    height: 85px;
    border-radius: 8px;
    font-size: 24px;
    background-color: #f4f5f6;
    display: flex;
    color: #222222;
    flex-direction: row;
    padding: 0;
    .van-grid-item__text {
      font-size: 24px;
      margin-top: 0;
      margin-left: 10px;
      color: #222222;
    }
    .van-grid-item__icon {
      font-size: 10px;
    }
  }
  /deep/.van-icon-clear::before{
    color: #ccc;
  }
}
</style>
