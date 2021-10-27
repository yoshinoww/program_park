<template>
    <div  class="search-result">
        <van-list

                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <ArticleItem
                    v-for="article in results"
                    :article="article"
                    :key="article.id"
            ></ArticleItem>
        </van-list>
    </div>
</template>

<script>
    import {getSearchResults} from "@/api/search";
    import ArticleItem from "@/views/home/components/ArticleItem";
    import Qs from "qs"

    export default {
        name: "searchResult",
        components:{
            ArticleItem
        },
        props:{
        searchText:{

        }
        },
        data() {
            return {
                results: [],
                loading: false,
                finished: false,
                curPage:1,
            };
        },
        methods: {
             async  onLoad() {
                    const  res= await getSearchResults(this.searchText,this.curPage)
                    this.results.push(...res.data.data.map.items);
                 // 加载状态结束
                    this.loading = false;
                    // 数据全部加载完成
                    if (res.data.data.map.items.length==0) {
                        this.finished = true;
                    }else {
                        this.curPage++;
                    }

            },
        },
    }
</script>

<style scoped>
.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>