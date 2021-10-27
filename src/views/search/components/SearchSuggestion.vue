<template>
    <div class="search-suggestion">
        <van-list
                v-model="loading"
                :finished="finished"
                loading-text=" "
                finished-text="没有数据了"
                @load="onLoad"
        >

            <van-cell
                    icon="search"
                    v-for="suggestion in suggestions"
                    @click="$emit('search',suggestion.title)"
            >
                <div slot="title" v-html="highlightSuggestion(suggestion.title)">

                </div>
            </van-cell>

        </van-list>

    </div>
</template>

<script>
    import {getSearchSuggestion} from "@/api/search";
    import Qs from "qs"
    import {debounce} from "lodash"

    export default {
        name: "SearchSuggestion",
        props: {
            searchText: {},
        },
        data() {
            return {
                suggestions: [],
                curPage: 1,
                loading: false,
                finished: false,
            }
        },
        watch: {
            searchText: {
                //immediate: true,
                handler: debounce(async function () {
                   // const res = await getSearchSuggestion(this.searchText, this.curPage)
                    this.curPage=1;
                    this.suggestions = [];
                    this.finished = false;
                   // this.onLoad();
                }, 500)
            }
        },
        methods: {
            highlightSuggestion(suggestion) {
                /*正则表达式构造函数
                参数： 1  字符串
                      2    匹配模式
                      返回值   正则对象
                * */

                return suggestion.replace(new RegExp(this.searchText, 'gi'), `<span style="color: red">${this.searchText}</span>`)
            },
            async onLoad() {
                const res = await getSearchSuggestion(this.searchText, this.curPage)

                this.suggestions.push(...res.data.data.map.list)
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (res.data.data.map.hasNext ===false) {
                    this.finished = true;
                }else {
                    this.curPage++;
                }
            },
        }
    }
</script>

<style scoped>

</style>