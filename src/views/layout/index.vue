<template>
    <div>
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="guide-o" to="/creation">创作</van-tabbar-item>
            <van-tabbar-item icon="chat-o" to="/message">消息</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {
                active: 0,
            };
        },
    }
</script>

<style scoped>

</style>