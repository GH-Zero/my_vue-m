<template>
  <div class="my_body">
    <div class="my-header" v-if="$store.state.user">
      <div class="my_top">
        <div class="my_left">
          <van-image
            class="imgage_box"
            round
            :src="userLIst.photo"
          />
          <p>{{userLIst.name}}</p>
        </div>
        <div class="my_right">
          <p class="exit_box">编辑资料</p>
        </div>
      </div>
      <div class="my_button">
        <div class="box">
          <span>{{userLIst.art_count}}</span>
          <i>头条</i>
        </div>
        <div class="box">
          <span>{{userLIst.follow_count}}</span>
          <i>关注</i>
        </div>
        <div class="box">
          <span>{{userLIst.fans_count}}</span>
          <i>粉丝</i>
        </div>
        <div class="box">
          <span>{{userLIst.like_count}}</span>
          <i>获赞</i>
        </div>
      </div>
    </div>
    <div class="my_top1" v-else @click="$router.push('/login')">
      <img src="../../assets/mobile.png" alt="" />
      <span>登录 / 注册</span>
    </div>
    <van-grid class="user_box" :column-num="2">
      <van-grid-item>
        <i slot="icon" class="iconfont iconfont1 iconshoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont iconfont2 iconlishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <div class="sead_box">
      <div class="matop"></div>
      <van-cell title="通知消息" class="sead sead1" is-link />
      <van-cell title="小智同学" class="sead" is-link />
    </div>
    <van-button
      type="default"
      style="color: #d86262"
      block
      @click="logout"
      v-if="$store.state.user"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getMyUser } from '../../api/user.js'
export default {
  name: 'my',
  data() {
    return {
      userLIst: []
    }
  },
  created() {
    if (this.$store.state.user) {
      this.getUser()
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '确定退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {})
    },
    async getUser() {
      try {
        const { data } = await getMyUser()
        // console.log(data)
        this.userLIst = data.data
        // console.log(this.userLIst)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my_top1 {
  width: 100%;
  height: 361px;
  background: url('../../assets/banner.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 130px;
    height: 130px;
    margin-bottom: 20px;
  }
  span {
    font-size: 28px;
    color: #fff;
  }
}
.my-header {
  width: 100%;
  height: 361px;
  background: url('../../assets/banner.png');
  background-size: cover;

  .my_top {
    width: 100%;
    height: 231px;
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    .my_left {
      display: flex;
      font-size: 30px;
      color: #fff;
      align-items: center;
      .imgage_box {
        height: 130px;
        width: 130px;
        border: 1px solid #fff;
        margin-top: 22px;
      }
      p {
        padding-left: 23px;
        margin-top: 75px;
      }
    }
    .my_right {
      display: flex;
      align-items: center;
      .exit_box {
        width: 115px;
        height: 32px;
        line-height: 36px;
        background-color: #fff;
        color: #666;
        font-size: 20px;
        font-style: none;
        border-radius: 15px;
        text-align: center;
        margin-top: 72px;
      }
    }
  }
  .my_button {
    display: flex;
    height: 130px;
    align-items: center;
    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      span {
        font-size: 33px;
      }
      i {
        font-size: 23px;
        font-style: normal;
      }
    }
  }
}
.user_box {
  padding: 0;
  height: 140px;
  .van-grid-item{
  height: 140px;
  }
  .iconfont {
    font-size: 45px;
  }
  .iconfont1 {
    color: #eb5253;
  }
  .iconfont2 {
    color: #ff9d1d;
  }
  span {
    font-size: 28px;
  }
}
.sead_box {
  .sead {
    display: flex;
    align-items: center;
    height: 100px;
  }
}
.sead_box {
  padding: 0;
  margin: 10px 0;
}
</style>
