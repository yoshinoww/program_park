<template>
    <div>
        <van-cell title="全部评论"></van-cell>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <CommentItem
                    v-for="comment in commentList"
                    :key="comment.id"
                    @reply="test"
                    :comment="comment"
            ></CommentItem>
        </van-list>
    </div>
</template>

<script>
    import CommentItem from "@/views/articledetail/components/CommentItem";
    import {getOneComment} from "@/api/comment";

    export default {
        name: "CommentList",
        components: {
            CommentItem,
        },
        props: {
            articleId: {
                required: true,
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
            refreshData() {
                this.finished = false;
                this.curPage = 1;
                this.commentList = [];
            },
            async onLoad() {
                // 异步更新数据
                const res = await getOneComment(this.articleId, this.curPage);
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
            }

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