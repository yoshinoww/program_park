<template>
    <div>
        <van-nav-bar
                class="app-nav-bar"
                title="个人设置"
                left-arrow
                @click-left="$router.back()"
        />

        <input
                type="file"
                accept="image/*"
                hidden
                ref="file"
                @change="onFileChange"
        >

        <van-cell title="头像" center is-link style="padding-bottom: 0" @click="$refs.file.click()">
            <van-image
                    class="user-avater"
                    slot="default"
                    round
                    fit="cover"
                    :src="userInfo.salt"
            />
        </van-cell>

        <van-cell title="昵称" @click="isEditNicknameShow=true" is-link :value="userInfo.username" center
                  class="user-name"></van-cell>

        <van-cell title="邮箱" class="user-email" is-link :value="userInfo.email" center></van-cell>


        <van-popup
                v-model="isEditNicknameShow"
                round position="top"
                :style="{ height: '30%' }">
            <EditNickname  @edit="eclose($event)" @close="isEditNicknameShow=false"></EditNickname>
        </van-popup>

        <van-popup
                v-if="isEditPhotoShow"
                v-model="isEditPhotoShow"
                position="bottom"
                :style="{ height: '100%' }"
        >
            <EditUserPhoto :file="file"  @edit="pclose($event)"  @close="isEditPhotoShow=false"/>
        </van-popup>

    </div>
</template>

<script>
    import EditNickname from "@/views/UserSetting/components/EditNickname";
    import EditUserPhoto from "@/views/UserSetting/components/EditUserPhoto";
    import {getUserInfo} from "@/api/user";

    export default {
        name: "UserInfo",
        components: {
            EditNickname, EditUserPhoto
        },
        data() {
            return {
                isEditNicknameShow: false,
                isEditPhotoShow: false,
                file: null,
                userInfo: {},
            }
        },
        methods: {
            onFileChange(e) {
                this.isEditPhotoShow = true;
                this.file = this.$refs.file.files[0];
            },
            async loadUserInfo() {
                const res = await getUserInfo()
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.userInfo = res.data.data.user;
            },
            eclose(name) {
                this.isEditNicknameShow = false;
                this.userInfo.username = name;
                this.$toast("昵称修改成功")
            },
            pclose(path) {
                this.isEditPhotoShow = false;
                this.userInfo.salt = path;
                this.$toast("头像修改成功")

            }
        },
        created() {
            this.loadUserInfo();
        }
    }
</script>

<style scoped>
    .user-avater {
        height: 40px;
        width: 40px;
    }

    .user-name {
        height: 50px;
    }

    .user-email {
        height: 50px;
    }
</style>