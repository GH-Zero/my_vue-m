<template>
  <div class="layout_context">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/" >
          <i  slot="icon" class="iconfont iconshouye"></i>
          <span>首页</span>
      </van-tabbar-item>
     <van-tabbar-item to="/wq" >
          <i slot="icon" class="iconfont iconwenda"></i>
          <span>问答</span>
      </van-tabbar-item>
    <van-tabbar-item to="/view">
          <i slot="icon" class="iconfont iconshipin"></i>
          <span>视频</span>
      </van-tabbar-item>
     <van-tabbar-item to="/my">
          <i slot="icon" class="iconfont iconwode"></i>
          <span>{{$store.state.user?'我的':'未登'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.layout_context i{
  font-size: 35px;
}
</style>
