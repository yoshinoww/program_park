<template>
    <div>

        <van-list
                class="messages"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <MessageItem
                    v-for="message in messageList"
                    :message="message"
                    @click.native="detailMessage">

            </MessageItem>

        </van-list>



    </div>
</template>

<script>
    import MessageItem from "@/views/message/components/MessageItem";
    import {getUserMessages} from "@/api/comment";

    export default {
        name: "MyMessages",
        components: {
            MessageItem,
        },
        props: {},
        data() {
            return {
                loading: false,
                finished: false,
                messageList: [],
                curPage: 1,
            };
        },
        methods: {
            async onLoad() {
                const res = await getUserMessages(this.curPage);
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.messageList.push(...res.data.data.map.list);
                // 加载状态结束
                this.loading = false;


                // 数据全部加载完成
                if (res.data.data.map.list.length == 0) {
                    this.finished = true;
                }else {
                    this.curPage++;
                }
            },
            detailMessage() {
                this.isDetailShow = true;
            }
        },
    }
</script>

<style scoped>
    .messages {
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 48px;
        overflow-y: auto;
    }
</style>