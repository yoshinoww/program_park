<template>
    <div class="main">

        <div class="user-head">

            <van-cell-group :border="false">
                <van-cell title="单元格" :border="false" value="个人信息" to="/userSetting?redirect=/my" center is-link>
                    <van-image
                            class="user-avatar"
                            round
                            slot="icon"
                            :src="userInfo.salt"
                    />
                    <div slot="title" class="username">{{user?userInfo.username:'未登录'}}</div>
                </van-cell>
            </van-cell-group>

        </div>

        <div class="user-body">
            <van-cell-group inset >
                <van-grid :border="false">
                    <van-grid-item class="body-data" @click="isAttentionListShow=true">
                        <div slot="text" class="content-center">
                            <div class="count">{{user?userInfo.attentionCount:'--'}}</div>
                            <div class="text">关注</div>
                        </div>
                    </van-grid-item>
                    <van-grid-item class="body-data">
                        <div slot="text" class="content-center">
                            <div class="count">{{user?userInfo.fanCount:'--'}}</div>
                            <div class="text">粉丝</div>
                        </div>
                    </van-grid-item>
                    <van-grid-item class="body-data">
                        <div slot="text" class="content-center">
                            <div class="count">{{user?userInfo.hands:'--'}}</div>
                            <div class="text">获赞</div>
                        </div>
                    </van-grid-item>
                    <van-grid-item class="body-data">
                        <div slot="text" class="content-center">
                            <div class="count">{{user?userInfo.commentCount:'--'}}</div>
                            <div class="text">评论</div>
                        </div>
                    </van-grid-item>
                </van-grid>

                <van-grid :column-num="4" class="body-content" :border="false">
                    <van-grid-item @click="$router.push('/mycollections?redirect=/my')" icon="star-o" text="收藏" class="content-item"/>
                    <van-grid-item @click="$router.push('/myhistories?redirect=/my')" icon="underway-o" class="content-item" text="历史"/>
                    <van-grid-item @click="$router.push('/myarticles?redirect=/my')" icon="notes-o" class="content-item" text="文章"/>
                    <van-grid-item @click="$router.push('/chat?redirect=/my')" icon="friends-o" class="content-item" text="聊天/客服"/>
                </van-grid>
            </van-cell-group>
        </div>



        <van-cell title="退出登陆" class="logout" v-if="user" @click="onLogout"/>
        <van-cell title="登陆" class="not-login-text" v-else @click="$router.push('/login?redirect=/my')"/>



    </div>
</template>

<script>
    import {mapState} from "vuex"
    import  store from "@/store/index"
    import {getUserInfo} from "@/api/user";
    import MyHistories from "@/views/my/components/MyHistories";
    import MyCollections from "@/views/my/components/MyCollections";
    import MyArticles from "@/views/my/components/MyArticles";
    import {logout} from "@/api/user";
    import {setItem} from "@/utils/storage";

    export default {
        name: "My",
        components: {
            MyHistories, MyCollections, MyArticles
        },
        data() {
            return {
                userInfo: {},
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
           onLogout() {
                this.$dialog.confirm({
                    title: '退出登录',
                    message: '您确认要退出登录吗？',
                })
              .then(() => {
                        // on confirm
                        this.$store.commit("setUser", null);
                        this.userInfo={};
                            logout();
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            async loadUserInfo() {
                const res = await getUserInfo();
                if (res.data.success){
                    this.userInfo = res.data.data.user;
                }else {
                    this.$toast("获取数据失败！");
                }

            },
        },
        created() {
            if (store.state.user){
                this.loadUserInfo();
            }
        }
    }
</script>

<style scoped>

    /*头部css*/
    .user-head {
        height: 78px;
        margin-top: 38px;
        padding-bottom: 5px;
        background-color: #f5f7f9;
    }

    /*头部图片css*/
    .user-avatar {
        width: 55px;
        height: 55px;
        border: 2px solid #fff;
        margin-right: 10px;
    }
    /*宫格边距margin*/
   /deep/ .user-body .van-cell-group{
        margin-left: 8px;
        margin-right: 8px;
       margin-bottom: 4px;
    }

   /*上四个宫格*/
    .body-data {
        height: 68px;
    }

    /*用户名*/
    .username {
        font-family: "Tahoma";
    }

    /*上，内容数量*/
    .body-data .count {
        font-size: 18px;
        font-weight:700;
    }
    /*上，内容文本*/
    .body-data .text {
        font-size: 14px;
        color:  #646566;;
    }
    /*上，整体*/
    .body-data .content-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /*下面四个宫格*/
    .body-content {
        height: 70px;
    }

    /*宫格每一项*/
    .body-content .content-item {
        height: 70px;
    }

    /*下，图标*/
    /deep/ .body-content .van-grid-item__icon {
        color: #eb5253;
        font-size: 28px;
    }

    /*已经登录后，未登录的样式*/
    .logout {
        text-align: center;
        color: #d86262;
        font-size: 16px;
    }



     /*与上面类似*/
    .not-login-text {
        font-size: 16px;
        color: #5babfb;
        text-align: center;
    }

    /*主*/
    .main {
        background-color: #f5f7f9;
    }
</style>