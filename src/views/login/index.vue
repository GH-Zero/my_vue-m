<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        clearable
        :rules="userRule.mobile"
        ><i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="userRule.code">
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
          <van-count-down
           v-if="isCountDownShow"
           slot="button"
           :time="1000 * 60"
           format="ss s"
           @finish="isCountDownShow = false" />
          <van-button v-else
           slot="button"
           round size="small" type="default"
          @click="onSendSms"
            >发送验证码</van-button
          >
      </van-field>
      <div class="login_box">
        <van-button block type="info" class="btn" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  data () {
    return {
      // 登录手机号和验证码
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 手机号和验证码验证
      userRule: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确手机号格式' }
        ],
        code: [
          { pattern: /^\d{6}$/, message: '请输入正确验证码' }
        ]
      },
      // 验证码倒计时
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        // console.log(data)
        this.$store.commit('setUser', data.data)
        this.$router.push('/')
      } catch (err) {
        console.dir(err)
        if (err.response.status === 400) {
          console.log('获取失败', err)
          this.$toast.fail('获取失败')
        } else {
          console.log('登录失败，请稍后重新登录')
          this.$toast.fail('获取失败，请稍后重新登录')
        }
      }
    },
    // 发送验证码按钮
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        console.log(err)
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  background-color: #6db4fb;
   border: none;
}

.iconfont {
    font-size: 37px;
  }
.send-sms-btn{
    font-size: 22px;
    color: #666666;
    background-color: #ededed;
    width: 163px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.line_box{
    height: 45px;
     background-color: #ededed;
     width: 5px;
}
.login_box{
    margin: 50px 20px;
}
</style>
