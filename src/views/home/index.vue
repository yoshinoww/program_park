<template>
    <div>


        <van-nav-bar class="app-nav-bar">
            <van-button
                    slot="title"
                    icon="search"
                    type="info"
                    round
                    class="search-btn"
                    to="/search"
            >搜一搜吧ヾ(＾∇＾)!
            </van-button>
        </van-nav-bar>


        <van-tabs v-model="active">
            <van-tab v-for="channel in userChannels"  :title="channel.name">
                <ArticleList :channel="channel"></ArticleList>
            </van-tab>
            <!--<div slot="nav-right"   style="width: 33px;flex-shrink: 0">

            </div>-->
            <div slot="nav-right" class="menu" @click="isChannelEditShow=true">
                <van-icon name="bars" />
            </div>
        </van-tabs>

        <van-popup
                v-model="isChannelEditShow"
                v-if="isChannelEditShow"
                closeable
                position="bottom"
                :style="{ height: '90%' }"
                get-container="body"
        >
                <ChannelEdit
                        :userChannels="userChannels"
                        :activeIndex="active"
                        @changeChannel="active=$event"
                        @close="isChannelEditShow=false"
                ></ChannelEdit>
        </van-popup>
    </div>
</template>

<script>
    import ArticleList from "@/views/home/components/ArticleList";
    import ChannelEdit from "@/views/home/components/ChannelEdit";
    import {mapState} from "vuex"
    import {getItem} from "@/utils/storage";

    export default {
        name: "Home",
        components:{
            ArticleList,ChannelEdit
        },
        computed:{
            ...mapState(["user"]),
        },
        data() {
            return {
                active: 0,
                userChannels:[],
                isChannelEditShow:false,
            };
        },
        methods: {
           loadChannels() {
              const  items=getItem("userChannels")
               if (items&&items.length!=0){
                   this.userChannels=items;
               }else {
                       this.userChannels.push({
                           name:"推荐",
                           id:"",
                       });
                   }
               }
        },
        created() {
             this.loadChannels();
        }
    }
</script>

<style scoped>
    .search-btn {
        width: 277px;
        height: 32px;
        background-color: #5babfb;
    }

    /deep/ .van-nav-bar__title {
        max-width: unset;
    }

    .search-btn .van-button__text {
        font-size: 14px;
        font-family: "FangSong";
    }

    .menu{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 44px;
        width: 33px;
        font-size: 26px;
      /*  position: fixed;
        right: 0;*/
    }
</style>