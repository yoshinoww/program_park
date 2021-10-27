<template>
    <div>
        <van-nav-bar
                title="好几条评论"
                left-arrow
                @click-left="$emit(`close`)"
        />
        <CommentItem
                :comment="curOneComment"
                @click.native="sendTheComment"
        ></CommentItem>

        <CommentReplyList :user="user" @updateCommentCount="updateCommentCount" :oneComment="curOneComment"
                          ref="oneChild" :article="article"></CommentReplyList>

        <van-dialog :before-close="beforeClose" v-model="isDetailShow" :title="'发送给:'+curOneComment.username"
                    show-cancel-button>
            <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入评论"
                    show-word-limit
                    confirm="confirm"
            />
        </van-dialog>
    </div>
</template>

<script>
    import CommentReplyList from "@/views/articledetail/components/CommentReplyList";
    import CommentReplyItem from "@/views/articledetail/components/CommentReplyItem";
    import CommentItem from "@/views/articledetail/components/CommentItem";
    import {sendComment} from "@/api/comment";

    export default {
        name: "CommentReply",
        props: {
            curOneComment: {},
            article: {},
            user: {}
        },
        methods: {
            async beforeClose(action, done) { // 点击事件 - 备注按钮提示框
                if (action === 'confirm') { // 确认
                    const res = await sendComment({
                        "id3": this.article.authorId,
                        "id2": this.article.id,
                        "content": this.message,
                        "id4": this.curOneComment.id,
                        "id1": this.curOneComment.id,
                    })
                    if (!res.data.success){
                        this.$toast("获取数据失败！");
                        return;
                    }
                    this.$refs.oneChild.refreshData();


                    this.message = "",
                        done(); // 关闭提示框
                } else if (action === 'cancel') { // 取消
                    this.message = "",
                        done(); // 关闭提示框
                }
            },


            sendTheComment() {
                if (!this.user) {
                    this.$router.push({
                        path: "/login",
                        query: {
                            redirect: `/article?articleId=` + this.article.id,
                        }
                    })
                    return;
                }
                ;
                this.isDetailShow = true;
            },
            updateCommentCount() {
                this.curOneComment.childrenCnt++;
                this.$emit("updateCommentCount");
            }
        },

        data() {
            return {
                isDetailShow: false,
                message: "",
            }
        },
        components: {
            CommentReplyList, CommentReplyItem, CommentItem
        },
    }
</script>

<style scoped>

</style>