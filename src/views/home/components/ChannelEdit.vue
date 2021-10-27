<template>
    <div class="channel-edit">
        <van-cell center >
            <div slot="title" class="channel-title">我的频道</div>
           <!-- <div slot="default">
                <van-button round size="mini" type="danger" class="btn-edit" plain @click="isEdit=!isEdit">{{!isEdit?"编辑":"完成"}}</van-button>
            </div>-->
            <van-switch v-model="isEdit" class="btn-edit"/>
        </van-cell>
        <van-grid :gutter="10" class="channel-item">
            <van-grid-item
                    :class="{active:index===activeIndex}"
                    v-for="(channel,index) in userChannels"
                    :text="channel.name"
                    :icon="(isEdit&&index!=0)?'clear':''"
                    @click="onUserChannelClick(channel)"
            />
        </van-grid>
        <van-cell center>
            <div slot="title" class="channel-title">频道推荐  <span style="font-size: 10px; color:#97a1aa">点击频道即可添加到我的频道</span></div>
        </van-cell>
        <van-grid :gutter="10" class="channel-item">
            <van-grid-item
                    v-for="channel in recommendedChannels"
                    :text="channel.name"
                    @click="onAddChannel(channel)"
            />
        </van-grid>
    </div>
</template>

<script>
    import {getAllChannels} from "@/api/channel"
    import store from "../../../store/index"
    import {setItem} from "@/utils/storage";
    import {mapState} from "vuex"
    export default {
        name: "ChannelEdit",
        props: {
            userChannels: {
                required: true,
            },
            activeIndex:{

            }
        },
        data() {
            return {
                allChannels: [],
                isEdit:false,
            }
        },
        computed: {
            ...mapState(["user"]),
            recommendedChannels() {
                return this.allChannels.filter((ac) => {
                    return !this.userChannels.find((uc) => {
                        return ac.id === uc.id;
                    })
                })
            },
        },
        watch:{
            userChannels:{
                handler(){
                    setItem("userChannels",this.userChannels);
                }
            }
        },
        methods: {
            async loadAllChannels() {
                const res = await getAllChannels();
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.allChannels = res.data.data.list;
            },
            onAddChannel(channel) {
                this.userChannels.push(channel);
            },
            onUserChannelClick(channel){
                if (this.isEdit){
                    if (channel.name==="推荐")return;
                    for (let i = 0; i < this.userChannels.length; i++) {
                        if (this.userChannels[i].id===channel.id){
                            if(i<=this.activeIndex) this.$emit("changeChannel",this.activeIndex-1);
                            this.userChannels.splice(i,1);
                            return;
                        }
                    }
                }else {
                    for (let i = 0; i <this.userChannels.length ; i++) {
                        if (this.userChannels[i].id===channel.id){
                            this.$emit("close");
                            this.$emit("changeChannel",i);
                        }
                    }
                }
            }
        },
        created() {
            this.loadAllChannels();
        }
    }
</script>

<style scoped>
    .channel-edit {
        margin-top: 54px;
    }

    .channel-item .van-grid-item {
        height: 45px;
    }

    /deep/ .channel-item .van-grid-item .van-grid-item__text {
        margin-top: 0;
        font-size: 14px;
    }

    /deep/ .channel-item .van-grid-item .van-grid-item__content {
        background-color: #f4f5f6;
    }

    .channel-edit .channel-title {
        font-size: 14px;
        color: #333333;
    }

    .btn-edit {

        font-size:20px;
    }
     /deep/ .van-grid-item__icon{
        position: absolute;
        right: -6px;
        top: -5px;
        font-size: 14px;
        z-index: 999;
        color: #ccc;
    }
    /deep/  .active  .van-grid-item__text{
        color: red;
    }
</style>