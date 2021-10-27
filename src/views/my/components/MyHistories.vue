<template>
    <div>
        <van-nav-bar
                class="app-nav-bar"
                title="历史文章"
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
    import {getUserHistories} from "@/api/user";
    import ArticleItem from "@/views/home/components/ArticleItem";
    export default {
        name: "MyHistories",
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
                const res = await getUserHistories(this.curPage)

                if (!res.data.success){
                    this.$toast("获取数据失败！");
                    return;
                }
                console.log(res.data.data.map.hasNext)
                this.articles.push(...res.data.data.map.list)
                this.loading = false;
                // 数据全部加载完成
                if (res.data.data.map.hasNext === false) {
                    console.log(123);
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