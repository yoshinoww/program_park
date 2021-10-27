<template>
    <div class="container">
        <van-cell-group inset>
            <van-cell class="main" @click="isDetailShow=true">
                <van-image
                        slot="icon"
                        class="user-avater"
                        round
                        fit="cover"
                        :src="message.avatar"
                />

                <div slot="title">
                    <div class="message-username">
                        {{message.username}}
                    </div>
                    <div class="message-time">
                        {{message.gmtCreate}}
                    </div>
                    <div class="message-content ">
                        {{message.content}}
                    </div>
                    <div class="message-origin">
                        {{message.originUsername}} : {{message.content1}}
                        <div>
                            from : {{message.title}}
                        </div>
                    </div>

                </div>

            </van-cell>
        </van-cell-group>
        <van-dialog :before-close="beforeClose" v-model="isDetailShow" :title="'发送给:'+message.username" show-cancel-button>
            <van-field
                    v-model="content"
                    rows="3"
                    autosize
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入评论"
                    show-word-limit
            />
        </van-dialog>

    </div>
</template>

<script>
    import {sendComment} from "@/api/comment";

    export default {
        name: "MessageItem",
        props:{
            message:{

            },
        },
        data(){
            return{
                isDetailShow:false,
                content:"",
            }
        },
        methods: {
            async beforeClose(action, done) { // 点击事件 - 备注按钮提示框
                if (action === 'confirm') { // 确认
                    const res = await sendComment({
                        "id3": this.message.authorId,
                        "id2": this.message.articleId,
                        "content": this.content,
                        "id4": this.message.parentId,
                        "id1": this.message.id,
                    });
                    done(); // 关闭提示框
                } else if (action === 'cancel') { // 取消
                    this.content = "";
                    done(); // 关闭提示框
                }
            },
        }
    }
</script>

<style scoped>
    /*最外围容器*/
    .container {
        line-height: unset;
        background-color: #f5f7f9;
        padding: 5px;
    }

    /*圆角*/
    .container .van-cell-group {
        margin: 0;
    }

    /*头像*/
    .user-avater {
        width: 50px;
        height: 50px;
        margin-right: 9px;
    }

    /*别人内容*/
    .message-content {
        font-size: 16px;
        color: #000;
        margin-left: -55px;
    }

    /*自己内容*/
    .message-origin {
        font-size: 14px;
        color: #000;
        margin-left: -55px;
        background-color: #f7f7f9;
        border-radius: 12px;
        padding-left: 10px;
    }

    /*时间*/
    .message-time {
        flex: unset;
        color: #AFAEB3;
        font-size: 12px;
        padding-bottom: 5px;
        margin-top: -6px;
    }

    /*别人用户名*/
    .message-username {
        padding-top: 7px;
        color: #141414;
        font-size: 18px;
    }

</style>