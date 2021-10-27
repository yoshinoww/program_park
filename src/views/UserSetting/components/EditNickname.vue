<template>
    <div>
        <van-nav-bar
                title="修改昵称"
                right-text="完成"
                left-arrow
                @click-left="$emit('close')"
                @click-right="commitInfo"
        />
        <div class="main">
            <van-field
                    v-model="username"
                    rows="1"
                    autosize
                    label="新昵称:"
                    type="textarea"
                    maxlength="10"
                    placeholder="好好取哦！━(ﾟ∀ﾟ)━!"
                    show-word-limit
            />
        </div>
    </div>
</template>

<script>
    import {updateUserInfo} from "@/api/user";

    export default {
        name: "EditNickname",
        data() {
            return {
                username: '',
            }
        },
        methods: {
            async commitInfo() {
                if (this.username.length==0){
                    this.$toast("不可以为空哦！");
                    return;
                }
                const res = await updateUserInfo({
                    "username":this.username,
                });
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.$emit("edit",this.username);
            },

        }
    }
</script>

<style scoped>

</style>