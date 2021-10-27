<template>

    <div class="article-list">
        <van-pull-refresh
                v-model="isRefreshLoading"
                @refresh="onRefresh"
                success-text="刷新成功ヾ(＾∇＾)"
                success-duration="1000">

            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多数据了呢(」゜ロ゜)」"
                    @load="onLoad"
            >

                    <ArticleItem
                            v-for="article in articles"
                            :article="article"
                            :key="article.id"
                    ></ArticleItem>

            </van-list>

        </van-pull-refresh>
    </div>

</template>

<script>
    import {getUserArticlesByChannelId} from "@/api/article"
    import ArticleItem from "@/views/home/components/ArticleItem";

    export default {
        name: "ArticleList",
        components:{
            ArticleItem
        },
        props: {
            channel: {
                require: true,
            }
        },
        data() {
            return {
                articles: [],
                loading: false,
                finished: false,
                isRefreshLoading: false,
                curPage:1,
            };
        },
        methods: {
            async onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                const res = await getUserArticlesByChannelId(this.channel.id,this.curPage)
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.articles.push(...res.data.data.map.items)
                this.loading = false;
                // 数据全部加载完成
                if (res.data.data.map.hasNext==false) {
                    this.finished = true;
                }else {
                    this.curPage++;
                }
            },
            async onRefresh() {
                const res = await getUserArticlesByChannelId(this.channel.id,this.curPage)
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                if(res.data.data.map.hasNext==true){
                    this.curPage++;
                    this.articles.unshift(...res.data.data.map.items)
                    this.isRefreshLoading = false;
                }else {
                    this.isRefreshLoading = false;
                }

            }
        },
    }
</script>

<style scoped>
    .article-list {
        background-color: #f5f7f9;
        position: fixed;
        left: 0;
        right: 0;
        top: 86px;
        bottom: 50px;
        overflow-y: auto;
    }
</style>