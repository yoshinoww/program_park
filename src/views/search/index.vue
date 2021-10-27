<template>
    <div class="search">
        <van-search
                v-model="searchText"
                placeholder="请输入搜索关键词━(ﾟ∀ﾟ)━!"
                show-action
                @search="onSearch(searchText)"
                @cancel="$router.back()"
                @focus="isResultShow=false"
        />


        <SearchResult :searchText="searchText"  v-if="isResultShow"></SearchResult>

        <SearchSuggestion
                v-else-if="searchText"
                :searchText="searchText"
                @search="onSearch"
        ></SearchSuggestion>

        <SearchHistory
                v-else :searchHistoryRecord="searchHistoryRecord"
                @search="onSearch"
                @removeHistories="searchHistoryRecord=$event"
        ></SearchHistory>

    </div>
</template>

<script>
    import SearchSuggestion from "@/views/search/components/SearchSuggestion";
    import SearchHistory from "@/views/search/components/SearchHistory";
    import SearchResult from "@/views/search/components/SearchResult";
    import {setItem} from "@/utils/storage";
    import {getItem} from "@/utils/storage";

    export default {
        name: "index",
        components:{
            SearchSuggestion,SearchHistory,SearchResult
        },
        data() {
            return {
                searchText: '',
                isResultShow:false,
                searchHistoryRecord:getItem("searchHistoryRecord")||[]
            };
        },
        methods: {
            onSearch(text) {
                this.searchText=text;
                this.isResultShow=true;

                let index=this.searchHistoryRecord.indexOf(text);
                if (index!==-1){
                    this.searchHistoryRecord.splice(index,1);
                }
                this.searchHistoryRecord.unshift(text);
            },
            onCancel() {
                console.log(12)
            },
        },
        watch:{
            searchHistoryRecord:{
                deep: true,
                handler(newvalue,oldvalue){
                    setItem("searchHistoryRecord", this.searchHistoryRecord);
                }
            }
        }

    }
</script>

<style scoped>

</style>