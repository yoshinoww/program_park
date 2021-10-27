<template>
    <div>
        <van-cell title="全部评论"></van-cell>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <CommentReplyItem
                    v-for="comment in commentList"
                    :key="comment.id"
                    :comment="comment"
                    :article="article"
                    :oneComment="oneComment"
                    @refreshData="refreshData"
                    :user="user"
            ></CommentReplyItem>
        </van-list>


    </div>
</template>

<script>
    import CommentReplyItem from "@/views/articledetail/components/CommentReplyItem";
    import {getTwoComment, sendComment} from "@/api/comment";


    export default {
        name: "CommentReplyList",
        components: {
            CommentReplyItem,
        },
        props: {
            oneComment: {},
            article: {},
            user:{

            }
        },
        data() {
            return {
                commentList: [],
                loading: false,
                finished: false,
                curPage: 1,
            };
        },
        methods: {
            test: function () {
                alert(123)
            },
            refreshData() {
                // console.log(1231);
                this.curPage = 1;
                this.finished = false;
                this.commentList = [];
                this.$emit("updateCommentCount");
                //this.onLoad();
            },
            async onLoad() {
                // 异步更新数据
                const res = await getTwoComment(this.oneComment.id, this.curPage);
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.commentList.push(...res.data.data.map.list);
                // 数据全部加载完成
                if (res.data.data.map.hasNext1 === false) {
                    this.finished = true;
                } else {
                    this.curPage++;
                }
                // 加载状态结束
                this.loading = false;
            },
            test(id) {
                this.$emit("reply2", id);
            },

        },
        mounted() {

        }
    }
</script>

<style scoped>
    .comment-title {
        font-weight: 500;
        font-size: 25px;
        margin-left: 20px;
    }
</style>