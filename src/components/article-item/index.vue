<template>
    <van-cell class="articleList" :to="`article/${article.art_id}`" :articleId="article.art_id">
      <div slot="title">
          <span class="title van-multi-ellipsis--l2">{{ article.title }}</span>
             <div v-if="article.cover.type == 3" class="tree_img">
              <van-image
            :src='item'
            cover
            v-for="(item, index) in article.cover.images" :key="index" class="image"
          />
        </div>
        <div slot="label" class="footText">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTimes }}</span>
        </div>
      </div>
       <div class="one_img" v-if="article.cover.type == 1">
       <van-image
            :src='article.cover.images[0]'
            cover
          />
       </div>
    </van-cell>
</template>
<script>
export default {
  name: 'articleList',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.title{
  font-size: 32px;
  color: #3a3a3a;
  margin-bottom: 30px;
}
.tree_img{
   width: 100%;
    display: flex;
    justify-content: space-around;
    /deep/.van-image__img{
      width: 220px;
      height: 145px;
      box-sizing: border-box;
      margin-right: 15px;
    }
  }
.footText{
  position: relative;
  font-size: 20px;
  color: #bababa;
  bottom: -10px;
  span{
    margin-right: 28px;
  }
}
/deep/.van-image__img{
  width: 235px;
  height: 145px;
}
.van-cell__value {
   width: 235px;
  height: 145px;
  flex: unset;
}
</style>
