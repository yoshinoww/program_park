<template>
    <div>
        <van-cell>
            <van-image
                    class="comment-img"
                    slot="icon"
                    round
                    :src="comment.avatar"
            />

            <div slot="title" class="main-info">

                <div class="name">
                    <div class="name-time">
                         <span>
                          {{comment.username}}
                          </span>

                        <span class="time">
                        {{comment.gmtCreate}}
                    </span>
                    </div>

                    <div class="content">{{comment.content}}</div>
                </div>

                <van-button
                        size="mini"
                        class="reply-button"
                        round
                        @click="$emit('reply',comment)"
                >
                    {{comment.childrenCnt}}回复
                </van-button>

            </div>
        </van-cell>
    </div>
</template>

<script>
    export default {
        name: "CommentItem",
        props: {
            comment: {}
        }
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
        /*margin-left: 130px;*/
    }

    .main-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 290px;
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

    .name-time {
        display: flex;
        justify-content: space-between;
    }
</style>