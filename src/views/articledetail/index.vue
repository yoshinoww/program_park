<template>
    <div>
        <van-nav-bar
                class="app-nav-bar"
                title="文章详情"
                left-arrow
                @click-left="$router.back()"
        />

        <div class="main-content">
            <div class="article-title">
                <span>{{article.title}}</span>
            </div>

            <van-cell center>
                <van-image
                        class="author-image"
                        :src="article.authorAveter"
                        round
                        slot="icon"
                />
                <div slot="title" class="article-author">
                    {{article.authorName}}
                </div>
                <div slot="label" class="article-time">{{article.gmtCreate}}</div>
                <div slot="default">
                    <van-button round size="small" @click="onAttention" class="follow-btn"
                                :type="article.isAttention==true?'default':'info'">
                        {{article.isAttention==true?"取消关注":"＋关注"}}
                    </van-button>
                </div>
            </van-cell>

            <div
                    class="markdown-body"
                    ref="articleContent"
            >
                {{article.content}}
            </div>

            <CommentList
                    ref="ref_comment"
                    @reply2="replyClick"
                    :articleId="this.$route.query.articleId"
            >
            </CommentList>
        </div>


        <van-cell class="article-bottom">
            <div slot="title">
                <van-button round size="small" class="comment-btn" @click="writeComment">写评论
                </van-button>
            </div>
            <div slot="default" class="main-icon">
                <van-icon name="comment-o" :info="article.commentCount" color="#777"></van-icon>
                <van-icon @click="onCollect" :name="article.isCollection==true?'star':'star-o'" color="#777"></van-icon>
                <van-icon @click="onLike" :name="article.isLike==true?'good-job':'good-job-o'" color="#777"></van-icon>

            </div>
        </van-cell>


        <van-popup
                get-container="body"
                v-model="isSendCommentShow"
                v-if="isSendCommentShow"
                position="bottom"
                :style="{ height: ' 24%' }"
        >
            <SendComment :article="article" @close="onSendCommentClose"></SendComment>
        </van-popup>

        <van-popup
                get-container="body"
                v-model="isReplyShow"
                v-if="isReplyShow"
                position="bottom"
                :style="{ height: ' 80%' }"
        >
            <CommentReply
                    :user="user"
                    :article="article"
                    @close="isReplyShow=false"
                    :curOneComment="curOneComment"
                    @updateCommentCount="article.commentCount++"
            ></CommentReply>
        </van-popup>

    </div>
</template>

<script>
    import {ImagePreview} from "vant"
    import {mapState} from "vuex"
    import  store from "@/store/index"
    import "./style/github-markdown.css"
    import CommentList from "@/views/articledetail/components/CommentList";
    import SendComment from "@/views/articledetail/components/SendComment";
    import CommentReply from "@/views/articledetail/components/CommentReply";
    import {getArticleById} from "@/api/article";
    import {likeArticle} from "@/api/article";
    import {attentionArticle} from "@/api/article";
    import {collectArticle} from "@/api/article";

    export default {
        name: "ArticleDetail",
        components: {
            CommentList, SendComment, CommentReply,
        },
        data() {
            return {
                isSendCommentShow: false,
                isReplyShow: false,
                article: {},
                curOneComment: {},
            }
        },
        computed:{
            ...mapState(["user"]),
        },
        mounted() {
            const content = this.$refs.articleContent;
            let imgs = content.querySelectorAll("img");
            let paths = [];
            imgs.forEach((img, index) => {
                paths.push(img.src);
                img.onclick = function () {
                    ImagePreview({
                        images: [
                            ...paths
                        ],
                        startPosition: index,
                    })

                }
            })
        },
        created() {
            this.loadArticle();
        },
        methods: {
            writeComment(){
                if (!this.user){
                    this.$router.push({
                        path:"/login",
                        query:{
                            redirect:`/article?articleId=`+this.article.id,
                        }
                    })
                    return;
                }
                this.isSendCommentShow=true;
            },
            onSendCommentClose(){
                this.$refs.ref_comment.refreshData();
                this.isSendCommentShow=false;
            },

            replyClick(comment) {
                console.log(comment)
                this.curOneComment = comment;
                this.isReplyShow = true;

            },
            async loadArticle() {
                const res = await getArticleById(this.$route.query.articleId);
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                console.log(res)
                this.article = res.data.data.article;
            },
            async onLike() {
                if (!this.user){
                    this.$router.push({
                        path:"/login",
                        query:{
                            redirect:`/article?articleId=`+this.article.id,
                            // redirect:`/article?articleId=1453007645853683714`
                        }
                    });
                    return;
                }
                const res = await likeArticle(this.article.id)
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.article.isLike = !this.article.isLike;
                if (this.article.isLike) this.$toast("谢谢点赞！o（＾∀＾）o ")
            },
            async onAttention() {
                if (!this.user){
                    this.$router.push({
                        path:"/login",
                        query:{
                            redirect:`/article?articleId=`+this.article.id,
                            // redirect:`/article?articleId=1453007645853683714`
                        }
                    });
                    return;
                }
                const res =  await attentionArticle(this.article.authorId);
                console.log(res)
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.article.isAttention = !this.article.isAttention;
                if (this.article.isAttention) this.$toast("关注成功！。(⌒∇⌒。)")

            },

            async onCollect() {
                if (!this.user){
                    this.$router.push({
                        path:"/login",
                        query:{
                            redirect:`/article?articleId=`+this.article.id,
                            // redirect:`/article?articleId=1453007645853683714`
                        }
                    });
                    return;
                }
                const res = await collectArticle(this.article.id);
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.article.isCollection = !this.article.isCollection;
                if (this.article.isCollection) this.$toast("收藏成功！୧(﹒︠ᴗ﹒︡)୨")

            }
        }
    }
</script>

<style scoped>
    .article-title {
        font-size: 20px;
        color: #3a3a3a;
        padding: 14px;
        display: flex;
        flex-wrap: wrap;
        z-index: 999;
    }

    .article-author {
        height: 11px;
        color: #333333;
    }

    .article-time {
        height: 8px;
    }

    .author-image {
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }

    .follow-btn {
        width: 85px;
        height: 29px;
    }

    .article-author {

    }

    .van-cell__title {
        margin-bottom: 5px;
    }

    .markdown-body {
        margin: 0 10px;
    }


    .article-bottom {
        display: flex;
        position: fixed;
        bottom: 0;
        align-items: center;
        background-color: white;
        height: 40px;
        border-top: #000000 2px;
    }

    .article-bottom .comment-btn {
        width: 160px;
        height: 35px;
    }

    .article-bottom .main-icon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
    }

    .article-bottom .main-icon .van-info {
        margin-top: 6px;
        font-size: 7px;
    }


    .main-content {
        position: fixed;
        left: 0;
        right: 0;
        top: 40px;
        bottom: 40px;
        overflow-y: auto;
    }
</style>