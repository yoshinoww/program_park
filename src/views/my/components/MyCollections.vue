<template>
    <div>
        <van-nav-bar
                class="app-nav-bar"
                title="我的收藏"
                left-arrow
                @click-left="$router.back()"
        />
        <van-list
                class="article-list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多数据了呢(」゜ロ゜)」"
                @load="onLoad"
        >

            <ArticleItem
                    v-for="article in articles"
                    :article="article"
            ></ArticleItem>

        </van-list>
    </div>
</template>

<script>
    import {getUserCollections} from "@/api/user";
    import ArticleItem from "@/views/home/components/ArticleItem";
    export default {
        name: "MyCollections",
        components:{
            ArticleItem
        },
        data(){
            return{
                articles:[],
                curPage:1,
                loading:false,
                finished:false,
            }
        },
        methods: {
            async onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                const res = await getUserCollections(this.curPage)
                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                this.articles.push(...res.data.data.map.items)
                this.loading = false;
                // 数据全部加载完成
                if (res.data.data.map.hasNext == false) {
                    this.finished = true;
                }else {
                    this.curPage++;
                }
            },
        },
    }
</script>

<style scoped>
    .article-list {
        background-color: #f5f7f9;
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
        bottom: 0px;
        overflow-y: auto;
    }
</style>