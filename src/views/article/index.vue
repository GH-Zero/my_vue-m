<template>
  <div class="article-container markdown-body">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleList.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | relativeTimes }}
          </div>
          <btnFollow  class="follow-btn" :article="articleList" @btnf="articleList.is_followed = $event"></btnFollow>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="articleList.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="typeStatus === 400">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <Comment></Comment>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="articleList.comm_count? articleList.comm_count : 0" color="#777" />
      <van-icon :color="like" name="star-o"  @click="btnLike"/>
      <van-icon color="#777" name="good-job-o" @click="btnGood"/>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticle, getLike, geNotLike, getGood, geNotGood } from '@/api/article'
import { ImagePreview } from 'vant'
import btnFollow from '@/components/btn-follow'
import Comment from './components/comment.vue'
import './css/markdown-css.css'
// 引入时间筛选器
import '../../utils/dayjs'
export default {
  name: 'ArticleIndex',
  components: {
    btnFollow,
    Comment
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
      typeStatus: 0
    }
  },
  data() {
    return {
      articleList: [],
      loading: true,
      // 存储图片
      imagePage: [],
      // 设置收藏
      like: '#777'
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getArticles()
  },
  mounted() {},
  methods: {
    // 获取请求
    async getArticles() {
      try {
        const { data } = await getArticle(this.articleId)
        this.articleList = data.data
        console.log(this.articleList)
        setTimeout(() => {
          const artContent = this.$refs['article-content']
          const img = artContent.querySelectorAll('img')
          img.forEach((e, i) => {
            this.imagePage.push(e.src)
            img[i].onclick = () => {
              ImagePreview({
                images: this.imagePage,
                closeable: true,
                startPosition: i
              })
            }
          })
        }, 0)
        this.loading = false
      } catch (err) {
        this.$toast('获取失败')
        this.typeStatus = 404
      }
    },
    // 返回按钮
    onClickLeft() {
      this.$router.go(-1)
    },
    // 对文章的收藏
    async btnLike() {
      if (this.articleList.is_collected) {
        try {
          await getLike(this.articleList.art_id)
          this.$toast('取消收藏成功')
          this.articleList.is_collected = !this.articleList.is_collected
          this.like = '#777'
        } catch (err) {
          this.$toast('取消收藏失败')
        }
      } else {
        try {
          await geNotLike(this.articleList.art_id)
          this.like = 'red'
          this.$toast('收藏成功')
        } catch (err) {
          this.$toast('收藏失败')
        }
      }
    },
    // 对文章的点赞
    async btnGood () {
      if (this.articleList) {
        try {
          await getGood({
            target: this.articleList.art_id
          })
          this.$toast('取消点赞成功')
        } catch (err) {
          this.$toast('取消点赞失败')
        }
      } else {
        try {
          await await geNotGood({
            target: this.articleList.art_id
          })
          this.$toast('点赞成功')
        } catch (err) {
          this.$toast('点赞失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
  .image-view {
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/.van-icon-arrow-left::before {
    // 返回按钮
    color: #fff;
  }
  .shou {
  background-color: red;
  }
}
</style>
