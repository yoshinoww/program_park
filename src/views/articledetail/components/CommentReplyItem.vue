<template>
    <div >
        <van-cell>
            <van-image
                    class="comment-img"
                    slot="icon"
                    round
                    :src="comment.avatar"
            />
            <div slot="title" class="main-info" @click="sendTheComment">
                <div class="name">
                    <div class="name-time">
                        <span>{{comment.username}}</span>
                        <span class="time">{{comment.gmtCreate}}</span>
                    </div>

                    <div  class="content">{{comment.content}}</div>
                </div>
                <div slot="label" class="reply-origin">
                    @{{comment.originUsername}}:{{comment.content1}}

                </div>

            </div>
        </van-cell>
        <van-dialog :before-close="beforeClose" v-model="isDetailShow" :title="'发送给:'+comment.username"
                    show-cancel-button>
            <van-field
                    v-model="message"
                    rows="3"
                    center
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
            />
        </van-dialog>
    </div>
</template>

<script>
    import {sendComment} from "@/api/comment";

    export default {
        name: "CommentReplyItem",
        props: {
            comment: {},
            oneComment: {},
            article: {},
            user:{

            }
        },
        data() {
            return {
                isDetailShow: false,
                message: "",
            }
        },
        methods: {
            async beforeClose(action, done) { // 点击事件 - 备注按钮提示框
                if (action === 'confirm') { // 确认
                    const res = await sendComment({
                        "id3": this.article.authorId,
                        "id2": this.article.id,
                        "content": this.message,
                        "id4": this.oneComment.id,
                        "id1": this.comment.id,
                    });
                    if (!res.data.success){
                        this.$toast("获取数据失败！");
                        return;
                    }
                    this.$toast("评论发送成功!");
                    this.$emit("refreshData");
                    done(); // 关闭提示框
                } else if (action === 'cancel') { // 取消
                    this.message = "";
                    done(); // 关闭提示框
                }
            },
            sendTheComment(){
                if (!this.user){
                    this.$router.push({
                        path:"/login",
                        query:{
                            redirect:`/article?articleId=`+this.article.id,
                        }
                    })
                    return;
                }
                this.isDetailShow=true;
            }
        },

    }
</script>

<style scoped>
    .comment-img {
        width: 36px;
        height: 36px;
    }

    .name {
        font-size: 14px;
        color: #406599;
        width: 290px;
    }

    .content {
        font-size: 16px;
        color: #222;
    }

    .time {
        font-size: 12px;
        color: #cccccc;
    }

    .main-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .reply-button {
        margin-left: 227px;
        width: 65px;
        background-color: #ebebed;
        color: #9A99A9;
        font-size: 10px;
    }

    .reply-origin {
        background-color: #f6f6f6;
        width: 292px;
        padding-left: 10px;
        border-radius: 12px;
    }
    .name-time{
        display: flex;
        justify-content: space-between;
    }
</style>