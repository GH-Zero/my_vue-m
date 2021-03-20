<template>
  <div class="my_body">
    <van-nav-bar class="index_box" fixed>
      <van-button class="seach_box" slot="title" round type="info" icon="search" @click="searchTab"
        >搜索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable class="tabList" animated>
      <van-tab
        :title="item.name"
        class="tob_box"
        v-for="item in listView"
        :key="item.id"
      >
       <ArticleList :cherk="item"></ArticleList>
      </van-tab>
      <div class="hanbaog" slot="nav-right" @click="btnApp" >
        <van-icon name="wap-nav" />
      </div>
      <div class="placehodle" slot="nav-right"></div>
    </van-tabs>
    <van-popup v-model="show" position="bottom" close-icon-position="top-left" closeable :style="{ height: '100%' }" >
    <Channel :tabList="listView" @addBtn="addBtn" :active="active" @goTab="goTab" @deleteTab="deleteTab"></Channel>
    </van-popup>
  </div>
</template>

<script>
import { getInfo, addTab } from '../../api/action'
import ArticleList from './components/article-list'
import Channel from './components/channel-edit'
import { mapState } from 'vuex'
import { setItem, getItem } from '../../utils/storage'
export default {
  name: 'home',
  created() {
    this.getView()
  },
  data () {
    return {
      active: 0,
      listView: [],
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async getView() {
      if (this.user || !getItem('pindao')) {
        try {
          const { data } = await getInfo()
          // console.log(data.data.channels)
          this.listView = data.data.channels
        } catch (err) {
          this.$toast.fail(err)
        }
      } else {
        this.listView = getItem('pindao')
      }
    },
    async btnApp () {
      this.show = true
    },
    // 添加频道
    async addBtn (val) {
      this.listView.push(val)
      if (this.user) {
        // 发起请求
        try {
          await addTab([{
            id: val.id, // 频道 id
            seq: this.listView.length // 频道的 序号
          }])
        } catch (err) {
          this.$toast('添加频道失败')
        }
      } else {
      //  存在本地
        setItem('pindao', this.listView)
      }
    },
    // 频道切换
    goTab (index) {
      this.active = index
      // console.log(this.active)
      this.show = false
    },
    // 删除频道
    async deleteTab (val) {
      if (val !== 0) {
        if (val < this.active) {
          this.active = this.active - 1
        }
        this.listView.splice(val, 1)
        setItem('pindao', this.listView)
      }
    },
    // 点击搜索
    searchTab () {
      this.$router.push('/search')
    }
  },
  components: {
    ArticleList,
    Channel
  }
}
</script>

<style lang="less" scoped>
.my_body {
    margin-bottom: 100px;
    position: fixed;
    top: 96px;
    right: 0;
    left: 0;
    bottom: 2px;
    z-index: 3;
    overflow-y: auto;
  .index_box {
    /deep/.van-nav-bar__title {
      max-width: unset !important;
    }
    .seach_box {
      width: 555px;
      height: 65px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 33px;
        color: #fff;
      }
    }
  }
  /deep/.van-tabs__nav--line {
    position: fixed;
    height: 80px;
    z-index: 3;
    left: 0;
    right: 0;
  }
  /deep/.van-tab {
    width: 200px;
    height: 80px;
    border-right: 1px solid #edeff3;
  }
  /deep/.van-tabs__nav--complete {
    padding: 0;
  }
  /deep/.van-tabs__line {
    width: 32px;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;
  }
  /deep/.van-tab--active {
    color: #333 !important;
  }
  /deep/.van-tab {
    color: #7777;
  }
  .hanbaog {
    position: fixed;
    right: 0;
    top: 92px;
    width: 60px;
    height: 82px;
    background-color: #fff;
    border-left: 1px solid #c8c8c8;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .placehodle {
      flex-shrink: 0;
      width: 60px;
      height: 82px;
    //   background-color: pink;
    }
}
</style>
