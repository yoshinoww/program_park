<template>
    <div class="article-item">
        <van-cell-group inset>
            <van-cell :to="{
                      path:'/article',
		              query:{
		              articleId: article.id,
		      }
        }">
                <div slot="title" class="item-title van-multi-ellipsis--l3">
                    {{article.title}}
                </div>
                <div slot="label">
                    <div v-if="article.photos!=null&&(article.photos.length==3||article.photos.length==2)" class="item-three-image">
                        <van-image
                                width="116"
                                height="73"
                                v-for="img in article.photos"
                                :src="img"
                                fit="cover"
                        />
                    </div>
                    <div class="item-bottom"  :class="{'item-bottom-void-spill':article.photos.length==1}">
                        <span>{{article.authorName}}</span>
                        <span>{{article.commentCount==''?0:article.commentCount}}评论</span>
                        <span>{{article.gmtCreate}}</span>
                    </div>

                </div>
                <div slot="default" v-if="article.photos!=null&&article.photos.length==1">
                    <van-image
                            width="116"
                            height="73"
                            :src="article.photos[0]"
                            fit="cover"
                    />
                </div>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "ArticleItem",
        props: {
            article: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .article-item .item-title {
        font-size: 16px;
        color: #3a3a3a;
    }

    .article-item /deep/ .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }

    .article-item .item-three-image {
        display: flex;
        flex-wrap: nowrap;
        padding-right: 2px;
        padding: 15px 0;

    }

    .article-item .item-bottom span {
        font-size: 11px;
        margin-right: 12px;
    }
    .article-item{
        padding: 0 5px 10px  5px ;
    }

    .article-item .van-cell-group{
        margin: 0;
    }
    .article-item  .van-cell{
        padding-left: 8px;
    }
    .van-cell__title{
        flex-direction: column;
        display: flex;
        justify-content: space-around;
    }

    .item-bottom-void-spill :not(:last-child){
        margin-right: 5px;
    }
</style>