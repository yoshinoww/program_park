<template>
    <div>

        <van-nav-bar
                class="app-nav-bar"
                right-text="发布"
                title="创作文章"
                @click-right="onSend"
        />


        <van-cell is-link @click="isChooseChannelShow=true" center class="creation-channel" label="请选择频道">
            <div slot="title">
                {{selectedChannel}}
            </div>
        </van-cell>


        <van-field v-model="articleTitle" placeholder="请输入文章标题"/>
        <van-cell title="请输入文章封面，最多三张哦！"/>
        <input
                type="file"
                accept="image/*"
                hidden
                ref="file0"
                @change="onFileChange()"
        >
        <input
                type="file"
                accept="image/*"
                hidden
                ref="file1"
                @change="onFileChange()"
        >
        <input
                type="file"
                accept="image/*"
                hidden
                ref="file2"
                @change="onFileChange()"
        >
        <van-cell title="点击+选择图片" center>
            <div class="add-icon" slot="default">
                <van-icon name="plus" @click="onImage(0)"/>
                <van-icon name="plus" @click="onImage(1)"/>
                <van-icon name="plus" @click="onImage(2)"/>
            </div>
        </van-cell>

        <div class="article-image">
            <img :src="images[0]">
            <img :src="images[1]">
            <img :src="images[2]">
        </div>


        <van-field
                class="creation-content"
                v-model="content"
                rows="30"
                type="textarea"
                maxlength="1000"
                placeholder="请输入文章内容!暂不提供上传html文件功能"
                show-word-limit
        />

        <div class="help"></div>
        <van-popup
                v-model="isChooseChannelShow"
                position="bottom"
                :style="{height: '80%'}"
                v-if="isChooseChannelShow"
        >
            <van-picker
                    title="请选择频道"
                    show-toolbar
                    :columns="channelsToName"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                    @change="onChange"
            />
        </van-popup>

    </div>
</template>

<script>
    import {getAllChannels} from "@/api/channel";
    import {releaseArticle} from "@/api/article";
    import  store from "@/store/index"
    import axios from "axios"

    export default {
        name: "Creation",
        created() {
            this.loadChannels();
        },
        data() {
            return {
                channels: [],
                selectedChannel:"暂时没选择频道(⊙ᗜ⊙)",
                isChooseChannelShow: false,
                content: "",
                images: [],
                files: [],
                nowImageIndex: 0,
                articleTitle: "",
            };
        },
        computed: {
            channelsToName() {
                let channels = [];
                this.channels.forEach(e => channels.push(e.name));
                return channels;
            }
        },
        methods: {
            async onSend() {
                if (this.selectedChannel === "暂时没选择频道(⊙ᗜ⊙)") {
                    this.$toast('请选择文章所属的频道！');
                    return;
                }
                if(this.articleTitle===""){
                    this.$toast('文章标题不可为空!');
                    return;
                }
                if(this.content===""){
                    this.$toast('文章正文不可为空!');
                    return;
                }

                let id = this.channels.find(e => e.name === this.selectedChannel).id;
                let message = new FormData();
                message.append("channelId", id)
                message.append("title", this.articleTitle)
                message.append("content", this.content)
                let titleImages = new FormData();
                for (let i = 0; i < 3; i++) {  //循环获取上传个文件
                    if (this.files[i] != undefined)
                        message.append("files", this.files[i]);
                }
                //titleImages.append("files", this.files)
                const res = await releaseArticle(
                    message
                );
                if (res.data.success){
                    this.$toast("文章发布成功！");
                    let articleId= res.data.data.articleId;
                    this.$router.push({
                        path:'/article',
                        query:{
                            articleId ,
                        }});
                }else {
                    this.$toast("获取数据失败!");
                }

            },
            onConfirm(value, index) {
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.selectedChannel = value;
                this.isChooseChannelShow = false;
            },
            onChange(picker, value, index) {
                //this.selectedChannel = value;
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
            },
            onCancel() {
                //this.$toast('取消');
                this.isChooseChannelShow = false;
            },

            onImage(index) {
                this.nowImageIndex = index;
                this.$refs["file" + this.nowImageIndex].click();
            },

            onFileChange(e) {
                this.files[this.nowImageIndex] = this.$refs["file" + this.nowImageIndex].files[0];
                this.images.splice(this.nowImageIndex, 1, window.URL.createObjectURL(this.files[this.nowImageIndex]))

            },
            async loadChannels() {
                const res = await getAllChannels();
                this.channels = res.data.data.list;
            }
        },
    }
</script>

<style scoped>

    /*.creation-content {
        position: fixed;
        left: 0;
        right: 0;
        top: 600px;
        bottom: 48px;
        overflow-y: auto;
    }*/

    /deep/ .van-nav-bar__text {
        color: #fff;
    }

    .creation-channel {
        padding-top: 0;
        padding-bottom: 0;
    }


    .article-image img {
        max-width: 100%
    }


    .add-icon {
        display: flex;
        justify-content: space-around;
    }

    .help {
        height: 48px;
    }
</style>