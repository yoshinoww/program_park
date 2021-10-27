<template>
    <div>
        <van-nav-bar
                title="消息"
                class="app-nav-bar"
        />
        <MyMessages></MyMessages>
    </div>
</template>

<script>
    import SendMessage from "@/views/message/components/Chat";
    import MyMessages from "@/views/message/components/MyMessages";
    import {getUserMessages} from "@/api/comment";

    export default {
        name: "Message",
        components: {
            SendMessage, MyMessages
        },
        data() {
            return {
            }
        },
        methods: {

        },
        created() {
           // this.loadUserMessages();
        }
    }
</script>

<style scoped>
    .messages {

    }
</style>